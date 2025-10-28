import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodoAsync, deleteTodoAsync, updateTodoAsync } from "../store/todosSlice";
import { selectFilteredTodos } from "../store/todosSlice";
import { AppDispatch } from "../store";

import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Checkbox,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector(selectFilteredTodos);

  // Track which todo is being edited
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  console.log("Todos:", todos);
  
  const handleEdit = (todo: any) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  const handleSave = (id: number) => {
    if (editText.trim() === "") return;
    dispatch(updateTodoAsync({ id, text: editText }));
    setEditingId(null);
  };

  if (todos.length === 0) return <p>No todos yet!</p>;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;
        return (
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
              onChange={() => dispatch(toggleTodoAsync(todo.id))}
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
                {isEditing ? (
                  <TextField
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => handleSave(todo.id)} // save when focus leaves
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave(todo.id); // save on Enter
                    }}
                    size="small"
                    autoFocus
                  />
                ) : (
                  <Typography
                    onClick={() => handleEdit(todo)}
                    variant="body1"
                    sx={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {todo.text}
                  </Typography>
                )}
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
                onClick={() => dispatch(deleteTodoAsync(todo.id))}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}