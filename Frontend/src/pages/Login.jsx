import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
        navigate("/");
      console.log(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />

        <button className="bg-green-600 text-white p-2 w-full">
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;
