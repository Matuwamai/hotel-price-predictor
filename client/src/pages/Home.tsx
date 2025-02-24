import { useState } from "react";
import Reata from "../assets/download.jpeg"
import Kafico from "../assets/download (1).jpeg"


const hotels = [
  {
    id: 1,
    name: "Reata Apartment Hotel",
    rating: 4.6,
    reviews: 5,
    price: "Ksh 13,112",
    discount: "23% less than usual",
    image: Reata, // Replace with actual image URL
    location: "Nairobi, Kenya",
  },
  {
    id: 2,
    name: "Kafico Hotel",
    rating: 4.2,
    reviews: 17,
    price: "Ksh 8,500",
    discount: "10% off",
    image: Kafico,
    location: "Nairobi, Kenya",
  },
];

export default function HomePage() {
  const [dates, setDates] = useState({ checkIn: "Feb 26", checkOut: "Feb 27" });

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      {/* Date Selection */}
      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
        <button className="flex items-center gap-2">
          <FaRegCalendarAlt /> {dates.checkIn} - {dates.checkOut}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mt-4 overflow-x-auto">
        <button className="px-4 py-2 bg-gray-700 rounded-lg flex items-center gap-2">
          <IoFilterSharp /> Price
        </button>
        <button className="px-4 py-2 bg-gray-700 rounded-lg">Offers</button>
        <button className="px-4 py-2 bg-gray-700 rounded-lg">Guest rating</button>
      </div>

      {/* Hotel Listings */}
      <div className="mt-6 space-y-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-yellow-400 text-sm">
                {hotel.rating} ⭐ ({hotel.reviews})
              </p>
              <div className="flex items-center gap-2 mt-2">
                <MdOutlineLocationOn />
                <span className="text-gray-400 text-sm">{hotel.location}</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xl font-bold">{hotel.price}</span>
                <span className="text-blue-400 text-sm">{hotel.discount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
