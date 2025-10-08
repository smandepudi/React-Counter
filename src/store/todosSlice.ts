import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodosState {
  todos: { id: number; text: string; completed: boolean, priority: "Low" | "Medium" | "High", dueDate: string }[];
  filter: "all" | "active" | "completed";
}

const initialState: TodosState = {
  todos: [],
  filter: "all",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{text: string; priority: string; dueDate: string}>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority || "Medium",
        dueDate: action.payload.dueDate,
      };
      state.todos.push(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, setFilter } = todosSlice.actions;

// Selectors
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectFilter = (state: RootState) => state.todos.filter;

// derived selector for filtered todos
export const selectFilteredTodos = (state: RootState) => {
  const { todos, filter } = state.todos;
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
};

export default todosSlice.reducer;
