import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaStar } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Button from "../componets/Button";

// Fix Leaflet marker issue with default icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function HotelListing() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch hotels from API
  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hotels?location=Nairobi');
      const data = await response.json();
      console.log('Hotels Data:', data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };
  
  return (
    <div className="flex h-screen">
      {/* Filters Sidebar (Reduced Width) */}
      {!isMobile && (
        <div className="p-4 w-1/5 border-r hidden md:block bg-gray-100">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <Button className="w-full mb-2">Price</Button>
          <Button className="w-full mb-2">Offers</Button>
          <Button className="w-full mb-2">Guest Rating</Button>
        </div>
      )}

      {/* Hotel List Section */}
      <div className="p-4 w-full md:w-2/5 lg:w-1/3 overflow-y-auto">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="mb-6 p-4 border rounded-lg shadow-lg flex flex-col md:flex-row relative"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full md:w-40 h-40 rounded-lg object-cover"
              />
              <div className="p-4 flex-1">
                <h3 className="text-lg font-bold">{hotel.name}</h3>
                <div className="flex items-center text-yellow-500">
                  {[...Array(Math.round(hotel.rating))].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  <span className="text-gray-500 ml-2">({hotel.reviews})</span>
                </div>
                <p className="text-blue-600 font-semibold">Ksh {hotel.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading hotels...</p>
        )}
      </div>

      {/* Map Section (Takes More Space) */}
      {!isMobile && (
        <div className="hidden lg:block w-2/5 lg:w-1/2 border-l">
          <h2 className="text-lg font-semibold p-4">Map</h2>
          <MapContainer
            center={[-1.2921, 36.8219]}
            zoom={13}
            className="h-full w-full rounded-lg shadow"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {hotels.map((hotel) => (
              <Marker
                key={hotel.id}
                position={hotel.coordinates}
                icon={customIcon}
              >
                <Popup>
                  <strong>{hotel.name}</strong> <br />
                  {hotel.location} <br />
                  Ksh {hotel.price}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
