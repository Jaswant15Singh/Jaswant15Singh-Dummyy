import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [render, setRender] = useState(false);

  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get("http://localhost:4000/api/v1/users");
      console.log(res);
      setUsers(res.data);
    };
    getAllData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/v1/users", input);
    setRender(true);
    setInput({
      name: "",
      email: "",
      age: "",
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/v1/users/${id}`);

    const newUsers = users.filter((item) => {
      return item._id !== id;
    });
    setUsers(newUsers);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-success mt-2">
          <h1 className="text-white text-center ">MERN CRUD APP</h1>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                name="name"
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
                value={input.name}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                name="email"
                value={input.email}
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Age
              </label>
              <input
                name="age"
                onChange={(e) => {
                  setInput({ ...input, [e.target.name]: e.target.value });
                }}
                value={input.age}
                type="number"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link to={`/edit/${user._id}`}>
                    <button  className="btn btn-info">Update</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-warning"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
