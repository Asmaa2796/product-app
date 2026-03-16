import { IconPasswordUser } from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true);

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("token", "Js5=9ph>~=cStokenXd3>@hlMhwB$");

    toast.success("Login successful");

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 500);
  } else {
    toast.error("Invalid email or password");
    setLoading(false);
  }
};

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-12 col-12">
          <h2 className="my-4 text-center main-color">
          <IconPasswordUser size={42}/>
          <span className="d-block my-2">Login</span>
          </h2>

          <form onSubmit={handleLogin} className="form-group p-4 shadow-sm rounded-3 border">

            <label className="my-3">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="my-3">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              type="submit"
              className="btn btn-dark btn-sm mt-3 text-white py-2 px-4"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <div className="mt-2 text-sm">
              Don't have an account? <Link to="/register">Register</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;