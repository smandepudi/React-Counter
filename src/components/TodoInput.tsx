import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { addTodo } from "../store/todosSlice";

export default function TodoInput() {
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [dueDate, setDueDate] = useState(today);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo({ text: input.trim(), priority, dueDate }));
      setInput("");
      setPriority("Medium");
      setDueDate(new Date().toISOString().split("T")[0]); // reset to today
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", mb: 2, gap: 2 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Enter a new todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
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
  );
}
