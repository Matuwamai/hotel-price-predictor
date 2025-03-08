import { useEffect, useState } from "react";
import axios from "axios";

interface Hotel {
  title: string;
  name: string;
  address?: string;
  coords?: [number, number]; // Latitude, Longitude
  details?: {
    placetype?: number;
    parent_name?: string;
  };
}

const Home = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("Hilton"); // Default search

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/hotels?name=${search}`);
        setHotels(response.data);
      } catch (err: any) {
        console.error("Error fetching hotels:", err);
        setError("Failed to fetch hotel data");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [search]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hotel Search</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter hotel name"
        className="p-2 border rounded mb-4"
      />

      {loading && <p>Loading hotels...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="text-gray-600">{hotel.address || "No address provided"}</p>
            {hotel.coords && (
              <p className="text-sm text-gray-500">
                Location: {hotel.coords[0]}, {hotel.coords[1]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
