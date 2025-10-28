import "../styles/Todo.css";
import React, { useState, useEffect } from "react";
import { Container, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../store/todosSlice";
import { AppDispatch } from "../store";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

export default function Todo() {
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const dispatch = useDispatch<AppDispatch>();

  // Fetch todos when component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          My Todos
        </Typography>
        <TodoInput />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList />
      </Paper>
    </Container>
  );
}