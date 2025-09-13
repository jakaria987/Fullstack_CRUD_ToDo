import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [todos, setTodos] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [id, setId] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateAge, setUpdateAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age) return alert("name or age is empty");

    axios
      .post("http://localhost:3000/addTodo", {
        name,
        age,
      })
      .then((res) => {
        console.log(res);
        alert("added task");
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong ");
      });

    setTodos([...todos, { id: Date.now(), name, age }]);
    setName("");
    setAge("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteTask/${id}`)
      .then((res) => {
        console.log(res);
        alert("Deleted task");
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong ");
      });
    // setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditModal = (todo) => {
    setId(todo._id);
    setUpdateName(todo.name);
    setUpdateAge(todo.age);
    setEditModal(true);
  };
  const handleUpdate = () => {
    axios
      .patch(`http://localhost:3000/updateTask/${id}`, {
        name: updateName,
        age: updateAge,
      })
      .then((res) => {
        console.log(res);
        alert("Updated task");
        setEditModal(false);
      })
      .catch((err) => {
        console.log(err);
        alert("something went wrong ");
      });
  };

  function getAllTask() {
    axios
      .get("http://localhost:3000/getAllTodo")
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllTask();
  }, [todos]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add User Name & Age
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 shadow-md hover:shadow-lg transition"
          >
            Add user list
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="text-center font-bold py-3 text-red-400">
            No Todos yet
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-md text-white animate-fadeIn"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-white">
                    User Details
                  </h2>
                  <button
                    onClick={() => handleEditModal(todo)}
                    className="text-green-600 hover:text-green-400 font-bold transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-400 hover:text-red-600 transition font-bold "
                  >
                    Delete
                  </button>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 border-t border-gray-700 pt-3">
                  <p className="text-gray-200 font-bold">Name</p>
                  <p className="text-gray-300">{todo.name}</p>

                  <p className="mt-2 text-green-400 font-semibold">Age</p>
                  <p className="text-gray-300">{todo.age}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {editModal && (
          <div className="w-[500px] h-[500px]  p-15 bg-gray-800 mx-auto absolute top-5 rounded-xl">
            {/* <button
              onClick={() => {
                setEditModal(false);
              }}
              className="mb-5 font-bold text-2xl hover:text-white transition"
            >
              X
            </button> */}
            <input
              type="text"
              placeholder="Update name"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <input
              type="text"
              placeholder="Update age"
              value={updateAge}
              onChange={(e) => setUpdateAge(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition mt-5"
            />
            <button
              onClick={handleUpdate}
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 shadow-md hover:shadow-lg transition mt-10"
            >
              Update user list
            </button>
            <button
              onClick={() => {
                setEditModal(false);
              }}
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 shadow-md hover:shadow-lg transition mt-10"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
