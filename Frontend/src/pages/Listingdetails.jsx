import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import ReviewDetail from "./Review";
import { toast } from "react-toastify";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/api/listings/${listing._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Deleted!");
      navigate("/");

    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
const role = user?.role;


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Loading hostel details...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Hostel Not Found</h2>
          <p className="text-gray-500 mb-6">The hostel you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl mr-3">
                R
              </div>
              <span className="text-2xl font-bold text-gray-800">Roommate</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-indigo-600 font-medium flex items-center transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Listings
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Main Image */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            <img
              src={listing.images[selectedImage]}
              className="w-full h-full object-cover"
              alt="hostel main"
            />
            <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="text-gray-600 text-sm font-medium">
                {selectedImage + 1} / {listing.images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50">
            {listing.images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`cursor-pointer rounded-lg overflow-hidden border-4 transition-all ${
                  selectedImage === i 
                    ? 'border-indigo-600 shadow-md' 
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  className="w-full h-24 object-cover"
                  alt={`thumbnail ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Location */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-3">{listing.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-medium">{listing.city}</span>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About this hostel</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{listing.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Amenities & Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {listing.amenities.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                  >
                    <svg className="w-5 h-5 mr-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </div>
            <ReviewDetail/>

            {/* Owner Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Listed By</h2>
              <div className="flex items-center">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-4">
                  {listing.owner?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">{listing.owner?.name}</p>
                  <p className="text-gray-500 text-sm">Property Owner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-800">₹{listing.price}</span>
                  <span className="text-gray-600 text-lg ml-2">/month</span>
                </div>
              </div>

              {/* Contact Button */}
               {role === "user" && (
              <button className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg mb-4">
                Contact Owner
              </button>
               )}

              <div className="border-t pt-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-800">{listing.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Rent</span>
                    <span className="font-medium text-gray-800">₹{listing.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amenities</span>
                    <span className="font-medium text-gray-800">{listing.amenities.length}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {role === "owner" && ( 
                <div className="border-t pt-6 space-y-3">
                <button
                  onClick={() => navigate(`/editlisting/${listing._id}`)}
                  className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-all flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Listing
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Listing
                </button>
              </div>
              )}
              
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl mr-3">
                  R
                </div>
                <span className="text-2xl font-bold text-white">Roommate</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your trusted platform for finding comfortable and affordable hostel accommodations.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Browse Hostels</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">List Your Property</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Roommate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ListingDetail;