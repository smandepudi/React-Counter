import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabase";
import type { RootState } from "./store";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  user_id?: string;
}

interface TodosState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  filter: "all",
  loading: false,
  error: null,
};

// Async thunks for Supabase operations

// Fetch all todos for current user
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  
  // Map database fields to our Todo type
  return data.map(todo => ({
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
    priority: todo.priority as "Low" | "Medium" | "High",
    dueDate: todo.due_date || "",
    user_id: todo.user_id
  }));
});

// Add a new todo
export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (payload: { text: string; priority: string; dueDate: string }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const newTodo = {
      user_id: user.id,
      text: payload.text,
      completed: false,
      priority: payload.priority || "Medium",
      due_date: payload.dueDate || null,
    };

    const { data, error } = await supabase
      .from("todos")
      .insert([newTodo])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      text: data.text,
      completed: data.completed,
      priority: data.priority as "Low" | "Medium" | "High",
      dueDate: data.due_date || "",
      user_id: data.user_id
    };
  }
);

// Update todo text
export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async (payload: { id: number; text: string }) => {
    const { data, error } = await supabase
      .from("todos")
      .update({ text: payload.text })
      .eq("id", payload.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

// Toggle todo completed status
export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodo",
  async (id: number) => {
    // First get the current todo
    const { data: todo, error: fetchError } = await supabase
      .from("todos")
      .select("completed")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Toggle it
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

// Delete a todo
export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) throw error;
    return id;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch todos
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      });

    // Add todo
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.unshift(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add todo";
      });

    // Update todo
    builder
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index].text = action.payload.text;
        }
      });

    // Toggle todo
    builder
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const todo = state.todos.find((t) => t.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
      });

    // Delete todo
    builder
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const { setFilter } = todosSlice.actions;

// Selectors
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectFilter = (state: RootState) => state.todos.filter;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;

// Derived selector for filtered todos
export const selectFilteredTodos = (state: RootState) => {
  const { todos, filter } = state.todos;
  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
};

export default todosSlice.reducer;