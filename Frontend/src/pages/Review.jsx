import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchListing();
    fetchReviews();
  }, [id]);

  const fetchListing = async () => {
    const res = await api.get(`/api/listings/${id}`);
    setListing(res.data);
  };

  const fetchReviews = async () => {
    const res = await api.get(`/api/reviews/${id}`);
    setReviews(res.data);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/api/reviews/${id}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComment("");
      setRating(5);
      fetchReviews();

    } catch (err) {
      toast.error("login to submit review");
    }
  };

   const handleDeleteReview = async (reviewId) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/api/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchReviews(); // refresh list after delete

  } catch (err) {
    toast.error("Failed to delete review");
  }
};

  if (!listing) return <p className="p-10">Loading...</p>;

 


  return (
    <div className="p-10 max-w-3xl mx-auto">

      {/* Images */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {listing.images.map((img, i) => (
          <img key={i} src={img} className="rounded object-cover" />
        ))}
      </div>

      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <p className="text-gray-600">{listing.city}</p>
      <p className="text-xl font-semibold mt-2">₹{listing.price}/month</p>

      <p className="mt-4">{listing.description}</p>

      <h3 className="mt-6 font-semibold">Amenities</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {listing.amenities.map((a, i) => (
          <span key={i} className="bg-gray-200 px-2 py-1 rounded">
            {a}
          </span>
        ))}
      </div>

      {/* ===== REVIEWS SECTION ===== */}

      <h2 className="text-2xl mt-10 mb-4 font-semibold">Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet</p>
      )}

      <div className="space-y-4">
       {reviews.map((r) => (
  <div key={r._id} className="border p-3 rounded flex justify-between items-start">

    <div>
      <p className="font-semibold">
        {r.user?.name} ⭐ {r.rating}/5
      </p>
      <p>{r.comment}</p>
    </div>

    <button
      onClick={() => handleDeleteReview(r._id)}
      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
    >
      Delete
    </button>

  </div>
))}

      </div>

      {/* ===== ADD REVIEW ===== */}

      <form onSubmit={handleReviewSubmit} className="mt-6 space-y-3">

        <select
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Submit Review
        </button>

      </form>

    </div>
  );
};

export default ReviewDetail;
