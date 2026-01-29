import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/api/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!listing) return <p className="p-10">Not found</p>;

  const handleDelete = async () => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/api/listings/${listing._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Deleted!");
    navigate("/");

  } catch (err) {
    alert("Delete failed");
  }
};


  return (
    <div className="p-10 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p className="text-gray-600">{listing.city}</p>

      <p className="text-xl font-semibold mt-2">
        ₹{listing.price}/month
      </p>

      <p className="mt-4">{listing.description}</p>

      <h3 className="mt-6 font-semibold">Amenities</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {listing.amenities.map((a, i) => (
          <span key={i} className="bg-gray-200 px-2 py-1 rounded">
            {a}
          </span>
        ))}
      </div>
                <button
        onClick={() => navigate(`/editlisting/${listing._id}`)}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
        Edit
        </button>

        <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-3 py-1 rounded ml-2"
        >
        Delete
        </button>

      <p className="mt-6  text-sm text-gray-500">
        Posted by: {listing.owner?.name}
      </p>

    </div>
  );
};

export default ListingDetail;
