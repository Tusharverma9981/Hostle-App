import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    description: "",
    amenities: ""
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/api/listings/${id}`);

        setForm({
          title: res.data.title,
          city: res.data.city,
          price: res.data.price,
          description: res.data.description,
          amenities: res.data.amenities.join(", ")
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/api/listings/${id}`,
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

      alert("Listing updated!");
      navigate("/");

    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">Edit Hostel</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="title" value={form.title} onChange={handleChange} className="border p-2 w-full" />

        <input name="city" value={form.city} onChange={handleChange} className="border p-2 w-full" />

        <input name="price" type="number" value={form.price} onChange={handleChange} className="border p-2 w-full" />

        <textarea name="description" value={form.description} onChange={handleChange} className="border p-2 w-full" />

        <input name="amenities" value={form.amenities} onChange={handleChange} className="border p-2 w-full" />

        <button className="bg-green-600 text-white p-2 w-full">
          Update Listing
        </button>

      </form>
    </div>
  );
};

export default EditListing;
