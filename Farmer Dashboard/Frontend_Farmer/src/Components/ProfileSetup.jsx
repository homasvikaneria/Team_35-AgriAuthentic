import React, { useState } from 'react';
import { Check, ArrowRight, User, MapPin, CreditCard } from 'lucide-react';

const FarmerProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    farmerName: '',
    farmerPhone: '',
    farmerAddress: {
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: ''
    },
    farmAddress: [{
      address: '',
      city: '',
      state: '',
      zipcode: '',
      country: ''
    }],
    farmSizes: [''],
    totalFarms: 1,
    primaryCrops: [''],
    subscriptionModel: 'basic'
  });

  // Handle input changes for farmer info
  const handleFarmerInfoChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle input changes for farm addresses
  const handleFarmAddressChange = (index, field, value) => {
    const updatedFarmAddresses = [...formData.farmAddress];
    updatedFarmAddresses[index] = {
      ...updatedFarmAddresses[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      farmAddress: updatedFarmAddresses
    });
  };

  // Handle farm size changes
  const handleFarmSizeChange = (index, value) => {
    const updatedFarmSizes = [...formData.farmSizes];
    updatedFarmSizes[index] = value;
    
    setFormData({
      ...formData,
      farmSizes: updatedFarmSizes
    });
  };

  // Handle crop changes
  const handleCropChange = (index, value) => {
    const updatedCrops = [...formData.primaryCrops];
    updatedCrops[index] = value;
    
    setFormData({
      ...formData,
      primaryCrops: updatedCrops
    });
  };

  // Add new farm
  const addFarm = () => {
    setFormData({
      ...formData,
      farmAddress: [
        ...formData.farmAddress,
        { address: '', city: '', state: '', zipcode: '', country: '' }
      ],
      farmSizes: [...formData.farmSizes, ''],
      totalFarms: formData.totalFarms + 1
    });
  };

  // Add new crop
  const addCrop = () => {
    setFormData({
      ...formData,
      primaryCrops: [...formData.primaryCrops, '']
    });
  };

  // Remove farm
  const removeFarm = (index) => {
    if (formData.farmAddress.length > 1) {
      const updatedFarmAddresses = [...formData.farmAddress];
      const updatedFarmSizes = [...formData.farmSizes];
      
      updatedFarmAddresses.splice(index, 1);
      updatedFarmSizes.splice(index, 1);
      
      setFormData({
        ...formData,
        farmAddress: updatedFarmAddresses,
        farmSizes: updatedFarmSizes,
        totalFarms: formData.totalFarms - 1
      });
    }
  };

  // Remove crop
  const removeCrop = (index) => {
    if (formData.primaryCrops.length > 1) {
      const updatedCrops = [...formData.primaryCrops];
      updatedCrops.splice(index, 1);
      
      setFormData({
        ...formData,
        primaryCrops: updatedCrops
      });
    }
  };

  // Update subscription model
  const handleSubscriptionChange = (model) => {
    setFormData({
      ...formData,
      subscriptionModel: model
    });
  };

  // Form submission
  const handleSubmit = () => {
    // Here you would send the data to your backend
    console.log("Submitting farmer profile:", formData);
    // Mock API call
    setTimeout(() => {
      alert("Profile successfully created!");
    }, 1000);
  };

  // Next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Previous step
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Progress bar */}
        <div className="bg-green-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Complete Your Farmer Profile</h2>
            <div className="flex items-center space-x-2">
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-white text-green-600' : 'bg-green-400 text-white'}`}>
                {currentStep > 1 ? <Check size={16} /> : '1'}
              </span>
              <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-white' : 'bg-green-400'}`}></div>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-white text-green-600' : 'bg-green-400 text-white'}`}>
                {currentStep > 2 ? <Check size={16} /> : '2'}
              </span>
              <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-white' : 'bg-green-400'}`}></div>
              <span className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-white text-green-600' : 'bg-green-400 text-white'}`}>
                3
              </span>
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="p-6">
          {/* Step 1: Farmer Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="text-green-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleFarmerInfoChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="farmerPhone"
                    value={formData.farmerPhone}
                    onChange={handleFarmerInfoChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="1234567890"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="text-green-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Residence Address</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="farmerAddress.address"
                      value={formData.farmerAddress.address}
                      onChange={handleFarmerInfoChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="123 Farm Lane"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="farmerAddress.city"
                        value={formData.farmerAddress.city}
                        onChange={handleFarmerInfoChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Farmville"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="farmerAddress.state"
                        value={formData.farmerAddress.state}
                        onChange={handleFarmerInfoChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Iowa"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="farmerAddress.zipcode"
                        value={formData.farmerAddress.zipcode}
                        onChange={handleFarmerInfoChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="50001"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        name="farmerAddress.country"
                        value={formData.farmerAddress.country}
                        onChange={handleFarmerInfoChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="United States"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Farm Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                {/* <Farm className="text-green-600" size={24} /> */}
                <h3 className="text-xl font-semibold text-gray-800">Farm Details</h3>
              </div>
              
              <div className="space-y-8">
                {formData.farmAddress.map((farm, index) => (
                  <div key={index} className="p-6 border border-green-200 rounded-lg bg-green-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-medium text-gray-800">Farm #{index + 1}</h4>
                      {formData.farmAddress.length > 1 && (
                        <button 
                          onClick={() => removeFarm(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Farm Size (acres)</label>
                        <input
                          type="number"
                          value={formData.farmSizes[index]}
                          onChange={(e) => handleFarmSizeChange(index, e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="100"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Farm Address</label>
                        <input
                          type="text"
                          value={farm.address}
                          onChange={(e) => handleFarmAddressChange(index, 'address', e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="456 Crop Road"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">City</label>
                          <input
                            type="text"
                            value={farm.city}
                            onChange={(e) => handleFarmAddressChange(index, 'city', e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Harvestville"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-2">State</label>
                          <input
                            type="text"
                            value={farm.state}
                            onChange={(e) => handleFarmAddressChange(index, 'state', e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Iowa"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Postal Code</label>
                          <input
                            type="text"
                            value={farm.zipcode}
                            onChange={(e) => handleFarmAddressChange(index, 'zipcode', e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="50002"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-2">Country</label>
                          <input
                            type="text"
                            value={farm.country}
                            onChange={(e) => handleFarmAddressChange(index, 'country', e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="United States"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={addFarm}
                  className="flex items-center justify-center w-full py-2 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50"
                >
                  + Add Another Farm
                </button>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Primary Crops</h3>
                </div>
                
                <div className="space-y-4">
                  {formData.primaryCrops.map((crop, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={crop}
                        onChange={(e) => handleCropChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Corn, Wheat, Soybeans"
                        required
                      />
                      
                      {formData.primaryCrops.length > 1 && (
                        <button 
                          onClick={() => removeCrop(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    onClick={addCrop}
                    className="flex items-center justify-center w-full py-2 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:bg-green-50"
                  >
                    + Add Another Crop
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Subscription Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="text-green-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">Choose Your Subscription</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${formData.subscriptionModel === 'basic' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200'}`}
                  onClick={() => handleSubscriptionChange('basic')}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium">Basic</h4>
                    {formData.subscriptionModel === 'basic' && <Check className="text-green-600" size={20} />}
                  </div>
                  <p className="text-2xl font-bold mb-2">$9.99<span className="text-sm text-gray-500 font-normal">/month</span></p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Weather forecasts</li>
                    <li>• Basic crop analytics</li>
                    <li>• Market price updates</li>
                  </ul>
                </div>
                
                <div 
                  className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${formData.subscriptionModel === 'pro' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200'}`}
                  onClick={() => handleSubscriptionChange('pro')}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium">Pro</h4>
                    {formData.subscriptionModel === 'pro' && <Check className="text-green-600" size={20} />}
                  </div>
                  <p className="text-2xl font-bold mb-2">$24.99<span className="text-sm text-gray-500 font-normal">/month</span></p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• All Basic features</li>
                    <li>• Soil health monitoring</li>
                    <li>• Pest & disease alerts</li>
                    <li>• Yield optimization</li>
                  </ul>
                </div>
                
                <div 
                  className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${formData.subscriptionModel === 'enterprise' ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200'}`}
                  onClick={() => handleSubscriptionChange('enterprise')}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium">Enterprise</h4>
                    {formData.subscriptionModel === 'enterprise' && <Check className="text-green-600" size={20} />}
                  </div>
                  <p className="text-2xl font-bold mb-2">$49.99<span className="text-sm text-gray-500 font-normal">/month</span></p>
                  <ul className="space-y-2 text-gray-600">
                    <li>• All Pro features</li>
                    <li>• AI crop recommendations</li>
                    <li>• Equipment management</li>
                    <li>• Advanced analytics</li>
                    <li>• Priority support</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="px-6 py-4 bg-gray-50 flex justify-between">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              Next <ArrowRight size={16} className="ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Complete Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerProfileSetup;