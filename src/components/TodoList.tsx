import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/todosSlice"; // <-- import here
import { selectFilteredTodos } from "../store/todosSlice";

import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  ListItemSecondaryAction,
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
          <ListItem>
            <Checkbox
              edge="start"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <ListItemText
              primary={todo.text}
              sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                color="error"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}
