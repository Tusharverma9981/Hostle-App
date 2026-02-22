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
    <div className="p-10 max-w-4xl mx-auto">

  {/* Images */}
  <div className="grid grid-cols-2 gap-4 mb-8">
    {listing.images.map((img, i) => (
      <img
        key={i}
        src={img}
        className="rounded-xl object-cover h-60 w-full shadow-md hover:scale-105 transition"
      />
    ))}
  </div>

  {/* Listing Info */}
  <h1 className="text-3xl font-bold text-gray-800">{listing.title}</h1>
  <p className="text-gray-500 mt-1">{listing.city}</p>

  <p className="text-2xl font-semibold text-blue-600 mt-3">
    ₹{listing.price}/month
  </p>

  <p className="mt-4 text-gray-600 leading-relaxed">
    {listing.description}
  </p>

  {/* Amenities */}
  <h3 className="mt-8 font-semibold text-lg text-gray-800">Amenities</h3>

  <div className="flex flex-wrap gap-2 mt-3">
    {listing.amenities.map((a, i) => (
      <span
        key={i}
        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
      >
        {a}
      </span>
    ))}
  </div>

  {/* ===== REVIEWS SECTION ===== */}

  <h2 className="text-2xl mt-12 mb-6 font-bold text-gray-800">
    ⭐ Reviews
  </h2>

  {reviews.length === 0 && (
    <p className="text-gray-500 bg-gray-100 p-4 rounded-lg">
      No reviews yet. Be the first to share your experience!
    </p>
  )}

  <div className="space-y-5">
    {reviews.map((r) => (
      <div
        key={r._id}
        className="bg-white shadow-md border border-gray-100 p-5 rounded-xl flex justify-between items-start hover:shadow-lg transition"
      >
        <div className="flex gap-4">

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            {r.user?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Content */}
          <div>
            <p className="font-semibold text-gray-800">
              {r.user?.name}
            </p>

            {/* Stars */}
            <div className="text-yellow-500 text-sm">
              {"⭐".repeat(r.rating)}
              <span className="text-gray-500 ml-2">{r.rating}/5</span>
            </div>

            <p className="mt-2 text-gray-600">{r.comment}</p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => handleDeleteReview(r._id)}
          className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg text-sm transition font-medium"
        >
          Delete
        </button>
      </div>
    ))}
  </div>

  {/* ===== ADD REVIEW ===== */}

  <form
    onSubmit={handleReviewSubmit}
    className="mt-10 bg-white shadow-md rounded-xl p-6 space-y-4 border"
  >
    <h3 className="text-lg font-semibold text-gray-800">
      Write a Review
    </h3>

    <select
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
      <option value="4">⭐⭐⭐⭐ Good</option>
      <option value="3">⭐⭐⭐ Average</option>
      <option value="2">⭐⭐ Poor</option>
      <option value="1">⭐ Bad</option>
    </select>

    <textarea
      placeholder="Share your experience..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      rows={4}
      required
    />

    <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg w-full font-semibold transition">
      Submit Review
    </button>
  </form>

</div>
  );
};

export default ReviewDetail;
