import React, { useState } from "react";
import { Todo } from "./types";


const TodoApp: React.FC = () => {
    // State to manage the list of todos
    const [todos, setTodos] = useState<Todo[]>([]);

    // State to manage the input field
    const [newTodo, setNewTodo] = useState<string>(" ");

    // Function that adds a new todo
    const addTodo = () => {
        if (newTodo.trim() === " ") return; // Prevent empty todos

        const newTask: Todo = {
            id: Date.now(), // Unique identifier
            text: newTodo,
            completed: false,
        };

        setTodos([...todos, newTask]);  // Adds a new todo to the list
        setNewTodo(" "); // Reset the input field
    };

    // Toggle completion status
    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        )
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div style={{textAlign: "center", maxWidth: "400px", margin: "auto"}}>
            <h2>To-Do List</h2>

            {/* Input field and add button */}
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a task..." />
            <button onClick={addTodo}>Add</button>

            {/* Display list of todos*/}
            <ul style={{listStyle: "none", padding: 0}}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            marginBottom: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        >
                        
                    <span onClick={() => toggleTodo(todo.id)} style = {{cursor: "pointer" }}>
                        {todo.text}
                    </span>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;