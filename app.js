import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetch("https://todo-backend-fyfo.onrender.com/api/todos")
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => console.error("Error:", err));
    }, []);

    const addTodo = () => {
        if (newTodo.trim() === "") return;

        fetch("https://todo-backend-fyfo.onrender.com/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newTodo }),
            })
            .then((res) => res.json())
            .then((data) => {
                setTodos([...todos, data]);
                setNewTodo("");
            })
            .catch((err) => console.error("Error:", err));
    };

    const toggleTodo = (id) => {
        const todo = todos.find((t) => t.id === id);

        fetch(`https://todo-backend-fyfo.onrender.com/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !todo.completed }),
            })
            .then((res) => res.json())
            .then((updatedTodo) => {
                setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
            })
            .catch((err) => console.error("Error:", err));
    };

    const deleteTodo = (id) => {
        fetch(`https://todo-backend-fyfo.onrender.com/api/todos/${id}`, {
                method: "DELETE",
            })
            .then(() => {
                setTodos(todos.filter((t) => t.id !== id));
            })
            .catch((err) => console.error("Error:", err));
    };

    return ( <
        div className = "App" >
        <
        h1 > 📝To - Do List < /h1>

        <
        div className = "add-todo" >
        <
        input type = "text"
        value = { newTodo }
        onChange = {
            (e) => setNewTodo(e.target.value) }
        onKeyPress = {
            (e) => e.key === "Enter" && addTodo() }
        placeholder = "Πρόσθεσε νέα εργασία..." /
        >
        <
        button onClick = { addTodo } > Προσθήκη < /button> <
        /div>

        <
        ul className = "todo-list" > {
            todos.map((todo) => ( <
                li key = { todo.id }
                className = { todo.completed ? "completed" : "" } >
                <
                span onClick = {
                    () => toggleTodo(todo.id) } > { todo.text } < /span> <
                button onClick = {
                    () => deleteTodo(todo.id) } > 🗑️ < /button> <
                /li>
            ))
        } <
        /ul> <
        /div>
    );
}

export default App;