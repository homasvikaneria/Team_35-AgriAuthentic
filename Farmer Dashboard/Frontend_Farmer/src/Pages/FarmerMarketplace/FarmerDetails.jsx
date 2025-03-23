import React, { useEffect, useState } from 'react';
import { PhoneCall, Info, MapPin, Clock, Leaf, Users, Ruler } from 'lucide-react';
import axios from 'axios';

function FarmerDetails() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('https://agriauthenic-poc-backend.onrender.com/farmer');
        setFarmers(response.data || []); // Ensure response.data is an array
      } catch (error) {
        console.error('Error fetching farmer data:', error);
        setFarmers([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="p-6 rounded-lg bg-white shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
            <span className="mt-4 text-base font-medium text-green-700">Loading marketplace data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-800 py-7 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Farmer's Marketplace</h1>
            <p className="text-green-200 text-lg md:text-xl">Connect with farmers & support sustainable agriculture</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {farmers.length > 0 ? (
            farmers.map((farmer) => (
              <div
                key={farmer._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Farmer Card Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 flex items-center text-2xl">
                  <div className="bg-white p-2 rounded-full shadow-md mr-4">
                    <Leaf className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{farmer.farmerName}</h3>
                    <p className="text-green-200 text-sm">{farmer.farmerEmail}</p>
                  </div>
                </div>

                {/* Farmer Card Body */}
                <div className="p-6">
                  {/* Farmer Address */}
                  <div className="flex items-start mb-5">
                    <MapPin size={20} className="text-green-600 mr-3 mt-1" />
                    <div>
                      <p className="text-green-700 text-sm">
                        {farmer.farmerAddress?.address}, {farmer.farmerAddress?.city}, {farmer.farmerAddress?.state}
                      </p>
                    </div>
                  </div>

                  {/* Farm Address */}
                  <div className="flex items-start mb-5">
                    <MapPin size={20} className="text-green-600 mr-3 mt-1" />
                    <div>
                      {Array.isArray(farmer.farmAddress) && farmer.farmAddress.map((add) => (
                        <p key={add._id} className="text-green-700 text-sm">
                          {add.address}, {add.city}, {add.state}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Farm Size */}
                  <div className="flex items-center mb-5">
                    <Ruler size={20} className="text-green-600 mr-3" />
                    <p className="text-green-700 text-sm">
                      <span className="font-medium">Farm Size:</span> {farmer.farmSizes && farmer.farmSizes.length > 0 ? farmer.farmSizes[0] : 'N/A'} acres
                    </p>
                  </div>

                  {/* Primary Crops */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Primary Crops</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(farmer.primaryCrops) && farmer.primaryCrops.map((crop, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-800 transition-all duration-200 flex-1 text-sm">
                      <Info size={16} /> Details
                    </button>
                    <a
                      href={`tel:${farmer.farmerPhone}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-green-700 rounded-lg border border-green-300 hover:bg-green-100 transition-all duration-200 flex-1 text-sm"
                    >
                      <PhoneCall size={16} /> Contact
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">
                <MapPin size={32} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-green-800 mb-2">No Farmers Available</h3>
                <p className="text-green-600 text-sm">We're expanding our network. Check back soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerDetails;