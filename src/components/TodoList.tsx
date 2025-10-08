import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/todosSlice"; // <-- import here
import { selectFilteredTodos } from "../store/todosSlice";

import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoList() {
  const dispatch = useDispatch();

  const todos = useSelector(selectFilteredTodos);

  console.log("Todos:", todos);

  if (todos.length === 0) return <p>No todos yet!</p>;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {todos.map((todo) => (
        <Card
          key={todo.id}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 1,
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: "background.paper",
            opacity: todo.completed ? 0.7 : 1,
            transition: "all 0.2s ease",
            "&:hover": { boxShadow: 4, transform: "scale(1.01)" },
          }}
        >
          {/* Left: Checkbox + text + secondary info */}
          <Checkbox
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            inputProps={{ "aria-label": `toggle todo ${todo.text}` }}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: 0.5,
              flex: 1,
              padding: 0,
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  fontWeight: 500,
                }}
              >
                {todo.text}
              </Typography>
            </Box>
            {/* Secondary info: priority swatch + due date */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  mt: 0.5,
                  bgcolor:
                    todo.priority === "High"
                      ? "error.main"
                      : todo.priority === "Medium"
                      ? "warning.main"
                      : "success.main",
                }}
              />
              <Typography variant="caption" color="text.secondary">
                Due: {todo.dueDate}
              </Typography>
            </Box>
          </CardContent>

          <CardActions>
            <IconButton
              aria-label="delete todo"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
