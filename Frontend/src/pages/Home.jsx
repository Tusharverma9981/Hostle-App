import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/api/listings");
        setListings(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <p className="p-10">Loading listings...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6 font-bold">Available Hostels</h1>
        

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
        onClick={() => navigate(`/addlisting`)}
        className="bg-blue-600 text-white px-3 py-1 rounded ml-2"
        >
        create listing
        </button>
        {listings.map((item) => (
          <div key={item._id} onClick={() => navigate(`/listing/${item._id}`)}
 className="border rounded-lg p-4 shadow">

            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-600">{item.city}</p>
            <p className="font-bold mt-2">₹{item.price}/month</p>

            <div className="mt-2 flex flex-wrap gap-2">
              {item.amenities.map((a, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded text-sm">
                  {a}
                </span>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
