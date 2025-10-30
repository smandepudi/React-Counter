import "../styles/Todo.css";
import React, { useState, useEffect } from "react";
import { Container, Paper, Typography, Box, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodos } from "../store/todosSlice";
// import { AppDispatch } from "../store";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

export default function Todo() {
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const dispatch = useDispatch<any>();
  const todos = useSelector(selectTodos);

  // Fetch todos when component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Calculate counts
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

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

        {/* Todo Count */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {completedCount} of {totalCount} completed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activeCount} active
            </Typography>
          </Box>
          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "action.hover",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                bgcolor:
                  progressPercentage === 100 ? "success.main" : "primary.main",
              },
            }}
          />
        </Box>
        <TodoInput />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList />
      </Paper>
    </Container>
  );
}
