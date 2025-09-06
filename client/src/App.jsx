import React, { useEffect, useState } from "react";
import axios from 'axios';

const Todo = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [todos, setTodos] = useState([{ name: "jakaria" }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !age) return;

        setTodos([...todos, { id: Date.now(), name, age }]);
        setName("");
        setAge("");
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    function allTask() {
        axios.get("http://localhost:3000/getAllTodo").then((res) => {
            setTodos(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        allTask()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Todo List
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition"
                    >
                        Add Todo
                    </button>
                </form>

                {/* List */}
                <ul className="mt-6 space-y-4">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="bg-gray-50 border p-4 rounded-xl shadow-sm"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Todo #{todo.id}
                                </h2>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                >
                                    Delete
                                </button>
                            </div>

                            {/* Bottom Section */}
                            <div className="mt-4 border-t pt-3">
                                <p className="text-gray-800 font-semibold">Name</p>
                                <p className="text-gray-600">{todo.name}</p>

                                <p className="mt-2 text-gray-800 font-semibold">Age</p>
                                <p className="text-gray-600">{todo.age}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
