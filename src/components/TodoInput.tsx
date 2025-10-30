import { useState } from "react";
import { useDispatch } from "react-redux";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  TextField,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Tooltip,
  IconButton,
  CircularProgress, // ← ADD THIS
  Chip, // ← ADD THIS
  Stack, // ← ADD THIS
} from "@mui/material";
import { addTodoAsync } from "../store/todosSlice";
// import { AppDispatch } from "../store";
import { breakdownTask } from "../lib/openai"; // ← ADD THIS

export default function TodoInput() {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [dueDate, setDueDate] = useState(today);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  //   const dispatch = useDispatch<AppDispatch>();
  const dispatch = useDispatch<any>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodoAsync({ text: input.trim(), priority, dueDate }));
      setInput("");
      setPriority("Medium");
      setDueDate(new Date().toISOString().split("T")[0]); // reset to today
      setAiSuggestions([]); // Clear suggestions after adding
    }
  };
  const handleAIBreakdown = async () => {
    if (!input.trim()) return;

    setIsLoadingAI(true);
    try {
      const suggestions = await breakdownTask(input.trim());
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error("AI breakdown failed:", error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleAddSuggestion = (suggestion: string) => {
    dispatch(addTodoAsync({ text: suggestion, priority, dueDate }));
    // Remove the added suggestion from the list
    setAiSuggestions(aiSuggestions.filter((s) => s !== suggestion));
  };

  const handleAddAllSuggestions = () => {
    aiSuggestions.forEach((suggestion) => {
      dispatch(addTodoAsync({ text: suggestion, priority, dueDate }));
    });
    setAiSuggestions([]);
    setInput("");
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Enter a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* AI Breakdown Button */}
        <Tooltip title="AI Task Breakdown">
          <span>
            <IconButton
              color="secondary"
              onClick={handleAIBreakdown}
              disabled={!input.trim() || isLoadingAI}
              sx={{
                bgcolor: "secondary.light",
                "&:hover": { bgcolor: "secondary.main" },
                color: "white",
              }}
            >
              {isLoadingAI ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <AutoAwesomeIcon />
              )}
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", mb: 2, gap: 8 }}
      >
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="priority_label">Priority</InputLabel>
          <Select
            labelId="priority_label"
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ minWidth: 140 }}
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }} // ensures label stays above
          size="small"
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AutoAwesomeIcon color="secondary" />
              <strong>AI Suggestions:</strong>
            </Box>
            <Button size="small" onClick={handleAddAllSuggestions}>
              Add All
            </Button>
          </Box>

          <Stack direction="column" spacing={1}>
            {aiSuggestions.map((suggestion, index) => (
              <Chip
                key={index}
                label={suggestion}
                onClick={() => handleAddSuggestion(suggestion)}
                onDelete={() => handleAddSuggestion(suggestion)}
                deleteIcon={<span>Add →</span>}
                sx={{
                  justifyContent: "space-between",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
