import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/register", form);
      alert("Registered successfully!");
        navigate("/login");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />

        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />

        <select name="role" onChange={handleChange} className="border p-2 w-full">
          <option value="user">User</option>
          <option value="owner">Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-blue-600 text-white p-2 w-full">
          Register
        </button>

      </form>
    </div>
  );
};

export default Register;
