import React, { useEffect, useState } from "react";
import axios from "axios";

function FarmerProfile() {
  const [farmer, setFarmer] = useState({
    farmerName: "",
    farmerEmail: "",
    farmerPhone: "",
    farmAddress: { address: "", city: "", state: "", zipcode: "", country: "" },
    farmerAddress: { address: "", city: "", state: "", zipcode: "", country: "" },
    farmsSize: [],
    totalFarms: "",
    primaryCrops: [],
    profileSetup: false
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await axios.get("https://agriauthenic-poc-backend.onrender.com/farmer/123"); // Sample ID
        setFarmer(response.data);
      } catch (error) {
        console.error("Error fetching farmer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, parent) => {
    const { name, value } = e.target;
    setFarmer((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("https://agriauthenic-poc-backend.onrender.com/farmer/update", farmer);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="p-6 rounded-lg bg-white shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
            <span className="mt-4 text-base font-medium text-green-700">Loading profile data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Farmer Profile Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Farmer Name */}
          <div>
            <label className="block text-green-700 font-medium">Farmer Name</label>
            <input
              type="text"
              name="farmerName"
              value={farmer.farmerName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Farmer Email */}
          <div>
            <label className="block text-green-700 font-medium">Email</label>
            <input
              type="email"
              name="farmerEmail"
              value={farmer.farmerEmail}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Farmer Phone */}
          <div>
            <label className="block text-green-700 font-medium">Phone</label>
            <input
              type="tel"
              name="farmerPhone"
              value={farmer.farmerPhone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Farm Address */}
          <div>
            <label className="block text-green-700 font-medium">Farm Address</label>
            <input
              type="text"
              name="address"
              value={farmer.farmAddress.address}
              onChange={(e) => handleNestedChange(e, "farmAddress")}
              placeholder="Street Address"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              <input
                type="text"
                name="city"
                value={farmer.farmAddress.city}
                onChange={(e) => handleNestedChange(e, "farmAddress")}
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="state"
                value={farmer.farmAddress.state}
                onChange={(e) => handleNestedChange(e, "farmAddress")}
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="zipcode"
                value={farmer.farmAddress.zipcode}
                onChange={(e) => handleNestedChange(e, "farmAddress")}
                placeholder="Zip Code"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Farmer Address */}
          <div>
            <label className="block text-green-700 font-medium">Farmer Address</label>
            <input
              type="text"
              name="address"
              value={farmer.farmerAddress.address}
              onChange={(e) => handleNestedChange(e, "farmerAddress")}
              placeholder="Street Address"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="grid grid-cols-3 gap-2 mt-2">
              <input
                type="text"
                name="city"
                value={farmer.farmerAddress.city}
                onChange={(e) => handleNestedChange(e, "farmerAddress")}
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="state"
                value={farmer.farmerAddress.state}
                onChange={(e) => handleNestedChange(e, "farmerAddress")}
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="zipcode"
                value={farmer.farmerAddress.zipcode}
                onChange={(e) => handleNestedChange(e, "farmerAddress")}
                placeholder="Zip Code"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition"
              disabled={saving}
            >
              {saving ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FarmerProfile;
