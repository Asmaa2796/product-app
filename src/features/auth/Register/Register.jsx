import { IconUserKey } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
  e.preventDefault();
  setLoading(true);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(formData);
  localStorage.setItem("users", JSON.stringify(users));

  toast.success("Registration successful");

  setTimeout(() => {
    setLoading(false);
    navigate("/login");
  }, 500);
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-12 col-12">
          <h2 className="my-4 text-center main-color">
          <IconUserKey size={42}/>
          <span className="d-block my-2">Register</span>
          </h2>

          <form className="form-group p-4 border shadow-sm rounded-3" onSubmit={handleRegister}>
            
            <label className="my-3">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              className="form-control"
              onChange={handleChange}
              required
            />

            <label className="my-3">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              className="form-control"
              onChange={handleChange}
              required
            />

            <label className="my-3">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              className="form-control"
              onChange={handleChange}
              required
            />

            <button
              disabled={loading}
              type="submit"
              className="mt-3 btn btn-dark btn-sm text-white py-2 px-4"
            >
              {loading ? "Loading..." : "Register"}
            </button>

            <div className="mt-2 text-sm">
              Have an account? <Link to="/login">Login</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;