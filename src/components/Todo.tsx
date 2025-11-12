import "../styles/Todo.css";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
  Container,
  Paper,
  Typography,
  Box,
  LinearProgress,
  TextField,
  InputAdornment,
  Divider,
  Skeleton,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodos, selectLoading } from "../store/todosSlice";
// import { AppDispatch } from "../store";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

export default function Todo() {
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch<any>();
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectLoading);


  // Fetch todos when component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Calculate counts
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

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
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={10} />
          ) : (
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="body2" color="text.secondary">
                {completedCount} of {totalCount} completed
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activeCount} active
              </Typography>
            </Box>
          )}
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
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        <Divider sx={{ mb: 3 }} />
        <TodoInput />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList searchQuery={searchQuery} />
      </Paper>
    </Container>
  );
}
