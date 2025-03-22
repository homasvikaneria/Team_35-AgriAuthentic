// Team_35-AgriAuthentic/Verification/vite-project/src/Components/ProductJourney.jsx
// Verification/Product_Verification/src/Components/SampleProductJourney.jsx
// Verification/Product_Verification/src/Components/ProductJourney.jsx
import React, { useState, useEffect } from "react";
import { CheckCircle, Coffee, Leaf, Sprout, Wheat, FlaskRound, Package, Award, Truck } from 'lucide-react';

const SampleProductJourney = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Journey data with appropriate steps and details
  const journeyData = [
    {
      stage: "Seed Selection",
      date: "2024-11-01",
      description: "Heirloom seeds selected for planting",
      verified: true,
      icon: Coffee
    },
    {
      stage: "Cultivation",
      date: "2024-11-15",
      description: "Seeds planted using traditional methods",
      verified: true,
      icon: Sprout
    },
    {
      stage: "Growth Monitoring",
      date: "2024-12-15",
      description: "Plants monitored for natural growth",
      verified: true,
      icon: Leaf
    },
    {
      stage: "Harvesting",
      date: "2025-02-10",
      description: "Crops harvested at optimal ripeness",
      verified: true,
      icon: Wheat
    },
    {
      stage: "Processing",
      date: "2025-02-12",
      description: "Minimal processing to preserve nutrients",
      verified: true,
      icon: Wheat
    },
    {
      stage: "Quality Testing",
      date: "2025-02-13",
      description: "Tested for purity and nutritional content",
      verified: true,
      icon: FlaskRound
    },
    {
      stage: "Packaging",
      date: "2025-02-15",
      description: "Packed in eco-friendly materials",
      verified: true,
      icon: Package
    },
    {
      stage: "Certification",
      date: "2025-02-20",
      description: "Certified as Level 3 Organic Product",
      verified: true,
      icon: Award
    },
    {
      stage: "Distribution",
      date: "2025-03-01",
      description: "Shipped to distribution centers",
      verified: true,
      icon: Truck
    }
  ];

  return (
    <div>
      <h2 className="text-[17px] -ml-[16px] -mt-[20px] font-semibold text-green-700 mb-5">Journey Details</h2>
      <div className="space-y-5">
        {journeyData.map((step, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 flex items-center shadow-md w-195 h-22 -ml-[16px] -mt-2"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100">
              {step.verified ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <step.icon className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div className="ml-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-md font-semibold text-gray-850">{step.stage}</h3>
                {step.verified && (
                  <span className="text-sm text-green-600 font-medium mt-0.5 ml-1">Verified</span>
                )}
              </div>
              <p className="text-gray-900 text-sm">{step.date}</p>
              <p className="text-gray-900 text-sm">{step.description}</p>
            </div>
          </div>

        ))}
      </div>

    </div>

  );
};

export default SampleProductJourney;