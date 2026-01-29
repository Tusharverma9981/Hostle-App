import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    description: "",
    amenities: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/listings",
        {
          ...form,
          amenities: form.amenities.split(",").map(a => a.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Listing added!");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Error creating listing");
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Add Hostel</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="title"
          placeholder="Hostel name"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="amenities"
          placeholder="Amenities (comma separated)"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white p-2 w-full">
          Add Listing
        </button>

      </form>
    </div>
  );
};

export default AddListing;
