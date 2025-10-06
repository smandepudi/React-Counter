import "../styles/Todo.css";
import React, { useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Todo() {

  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          My Todos
        </Typography>
        <TodoInput/>
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList/>
      </Paper>
    </Container>
  );
}
