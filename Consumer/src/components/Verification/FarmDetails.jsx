// Team_35-AgriAuthentic/Consumer/src/components/Verification/FarmDetails.jsx
// Team_35-AgriAuthentic/Verification/vite-project/src/Components/FarmDetails.jsx
import React from "react";
import { MapPin, Calendar, Ruler, Leaf } from "lucide-react";

const farmImages = [
  "https://plus.unsplash.com/premium_photo-1680344513126-76320e2f74a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3JvcHxlbnwwfHwwfHx8MA%3D%3D", 
  "https://images.unsplash.com/photo-1529313780224-1a12b68bed16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3JvcHxlbnwwfHwwfHx8MA%3D%3D", 
  "https://plus.unsplash.com/premium_photo-1663945779302-b46b12b6d811?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3JvcHxlbnwwfHwwfHx8MA%3D%3D", 
  "https://plus.unsplash.com/premium_photo-1661811677567-6f14477aa1fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFybXxlbnwwfHwwfHx8MA%3D%3D" 
];

const FarmDetails = () => {
  return (
    <div className="bg-white  p-6 rounded-lg  max-w-4xl mx-auto">
      <h2 className="text-[17px] -ml-[40px] -mt-[40px] font-semibold text-green-700">
        Farm Details
      </h2>
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm w-[410px] mt-4 -ml-[40px]">
        <h3 className="text-[16px] -mt-[11px] font-semibold text-gray-900">
          Sunrise Organic Farm
        </h3>

        <div className="mt-3 space-y-2">
          <div className="flex items-center text-gray-800 font-regular text-[15px]">
            <MapPin className="w-5 h-5 text-green-600 mr-2" />
            <span>Himachal Pradesh, India</span>
          </div>
          <div className="flex items-center text-gray-800 text-[15px]">
            <Calendar className="w-5 h-5 text-green-600 mr-2" />
            <span>Established 2010</span>
          </div>
          <div className="flex items-center text-gray-800 text-[15px]">
            <Ruler className="w-5 h-5 text-green-600 mr-2" />
            <span>Farm Size: 25 acres</span>
          </div>
        </div>

        <h4 className="text-[16px] font-semibold text-gray-900 mt-5">Farm Owner</h4>
        <div className="flex items-center mt-3">

          <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-700 font-semibold rounded-full text-[19px]">
            RS
          </div>
          <div className="ml-3 ">
            <h5 className="text-[15px] font-semibold text-gray-900 flex items-center">
              Rajan Sharma </h5>
              <p className="text-gray-700 text-sm -mt-1">Certified Natural Farmer</p>

          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm w-[350px]  ml-97 -mt-62">
        <h3 className="text-[16px]  font-semibold text-gray-900 -mt-[11px]">Farm Location</h3>
        <div className="mt-4 bg-gray-100 rounded-lg h-65 flex items-center justify-center relative">
          <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2">Coordinates: 32.084, 76.541</p>
      </div>


      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm w-[410px] -mt-23 -ml-[40px] ">
        <h3 className="text-[17px] -mt-[11px] font-semibold text-gray-900">Farming Practices</h3>
        <ul className="mt-3 space-y-2">
          {[
            "No pesticides",
            "Natural fertilizers",
            "Rainwater harvesting",
            "Crop rotation",
          ].map((practice, index) => (
            <li key={index} className="flex items-center text-gray-800 text-[15px]">
              <Leaf className="w-4 h-4 text-green-600 mr-2" />
              {practice}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm w-[776px] max-w-6xl mx-auto -ml-[40px] mt-6 -mb-5">
        <h3 className="text-[17px] -mt-[11px] font-semibold text-gray-900">Farm Gallery</h3>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {farmImages.map((src, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg w-40 h-40 flex items-center justify-center overflow-hidden"
            >
              <img
                src={src}
                alt={`Farm ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmDetails;
