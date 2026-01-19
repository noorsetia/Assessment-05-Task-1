import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";

const API_URL = "https://backendapi-cwp7.onrender.com/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title)  => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const res = await fetch(API_URL, {
      method: "POST", 
      headers: { "Content-Type":
        "application/json" },
      body: JSON.stringify({title:trimmedTitle}),
    });

    const newTodo = await res.json();
    if (!newTodo || !newTodo.title) return ;
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    const updatedTodo = await res.json();
    setTodos(
      todos.map((todo) => todo._id === id ? updatedTodo : todo)
    );
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {method: "DELETE" });

    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="app">
      <h1>Todo App </h1>

      <AddTodoForm onAdd={addTodo} />
      {loading && <p>Loading... </p>}
      {error && <p>{error}</p>}

      <TodoList
      title="Active"
      todos={activeTodos}
      onToggle={toggleTodo}
      onDelete={deleteTodo} 
      />

      <TodoList
      title="Completed"
      todos={completedTodos}
      onToggle={toggleTodo}
      onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
