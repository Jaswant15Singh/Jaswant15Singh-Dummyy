import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
  });
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/v1/users/single/${id}`
      );
      console.log(res);
      setInput(res.data);
    };
    getAllData();
  }, [id]);

  const handleChange = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/v1/users/${id}`,input);
    navigate("/")
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 bg-success mt-2">
          <h1 className="text-white text-center ">UPDATE MERN CRUD APP</h1>
        </div>
        <div className="col-md-12">
          <form onSubmit={handleChange}>
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
                value={input.age}
                onChange={(e) => {
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  });
                }}
                type="number"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              UPDATE
            </button>
          </form>
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-info mt-2"
        >
          Home
        </button>
        
      </div>
    </div>
  );
};

export default Edit;
