import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/todosSlice"; // <-- import here
import { selectFilteredTodos } from "../store/todosSlice";

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Checkbox,
  ListItemButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoList() {
  const dispatch = useDispatch();

  const todos = useSelector(selectFilteredTodos);

  console.log("Todos:", todos);

  if (todos.length === 0) return <p>No todos yet!</p>;

  return (
    <List>
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <ListItem
            disablePadding
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              mb: 1,
              boxShadow: 1,
              transition: "all 0.2s ease",
              "&:hover": { boxShadow: 3, transform: "scale(1.01)" },
              opacity: todo.completed ? 0.7 : 1,
            }}
          >
            <ListItemButton
              onClick={() => dispatch(toggleTodo(todo.id))}
              sx={{ borderRadius: 2, pr: 8 }} // leave space for delete icon
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": `todo-${todo.id}` }}
                />
              </ListItemIcon>

              <ListItemText
                id={`todo-${todo.id}`}
                primary={
                  <Typography component="span"
                    sx={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      fontWeight: 500,
                    }}
                  >
                    {todo.text}
                  </Typography>
                }
                secondary={
                  <Box component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 0.5,
                    }}
                  >
                    <Chip component="span"
                      label={todo.priority}
                      size="small"
                      color={
                        todo.priority === "High"
                          ? "error"
                          : todo.priority === "Medium"
                          ? "warning"
                          : "success"
                      }
                      sx={{ fontWeight: 500 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Due: {todo.dueDate}
                    </Typography>
                  </Box>
                }
              />
            </ListItemButton>

            <IconButton
              edge="end"
              aria-label="delete todo"
              onClick={() => dispatch(deleteTodo(todo.id))}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}
