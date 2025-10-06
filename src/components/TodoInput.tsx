import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Box } from "@mui/material";
import { addTodo } from "../store/todosSlice";

export default function TodoInput() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input.trim()));
      setInput("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", mb: 2 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Enter a new todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ ml: 2 }}>
        Add
      </Button>
    </Box>
  );
}
