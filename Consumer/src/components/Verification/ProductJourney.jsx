// Verification/Product_Verification/src/Components/SampleProductJourney.jsx
// Verification/Product_Verification/src/Components/ProductJourney.jsx
import React, { useState, useEffect } from "react";
import { CheckCircle, Coffee, Leaf, Sprout, Wheat, FlaskRound, Package, Award, Truck } from 'lucide-react';

const ProductJourney = () => {
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
  
  const totalSteps = journeyData.length;
  
  useEffect(() => {
    // Slower animation through the journey steps
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        } else {
          // Reset after a pause at the end
          setTimeout(() => setActiveStep(0), 2000);
          return prev;
        }
      });
    }, 4000); // Slower interval (4 seconds per step)
    
    return () => clearInterval(interval);
  }, [totalSteps]);

  // Calculate path points for the curve
  const getPathPoints = () => {
    const points = [];
    for (let i = 0; i < totalSteps; i++) {
      const xPos = 100 + (800 / (totalSteps - 1)) * i;
      
      // Create a wavy curve by alternating y-positions
      // Middle point for the path (dots will show here)
      const yPos = 100;
      
      points.push({ x: xPos, y: yPos });
    }
    return points;
  };

  // Calculate icon positions - adjusted heights as requested
  const getIconPositions = () => {
    const positions = [];
    for (let i = 0; i < totalSteps; i++) {
      const xPos = 100 + (800 / (totalSteps - 1)) * i;
      
      // Keep upper icons at same height, move lower icons a bit higher
      const yPos = i % 2 === 0 ? 40 : 150;  // Lower icons at 140 instead of 160
      
      positions.push({ x: xPos, y: yPos });
    }
    return positions;
  };

  const pathPoints = getPathPoints();
  const iconPositions = getIconPositions();
  
  // Generate SVG path string for curved line
  const generateCurvedPath = (points) => {
    if (points.length < 2) return "";
    
    let path = `M${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      
      // Calculate control points for smooth curve
      const controlX = (current.x + next.x) / 2;
      
      // Alternating control point heights to create a wave
      const controlY1 = i % 2 === 0 ? 140 : 60;  // First control point
      const controlY2 = i % 2 === 0 ? 60 : 140;  // Second control point
      
      path += ` C${controlX},${controlY1} ${controlX},${controlY2} ${next.x},${next.y}`;
    }
    
    return path;
  };

  const svgPath = generateCurvedPath(pathPoints);

  return (
    <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto">
      <h2 className="text-[17px] -ml-[40px] -mt-[40px] font-semibold text-green-700 mb-6">Product Journey</h2>
      
      {/* Journey Visualization */}
      <div className="relative h-72 -ml-[40px] w-195 -mt-2 mb-10 border border-gray-100 rounded-lg p-4 shadow-sm">
        {/* Curved Path SVG */}
        <svg 
          className="absolute inset-0 h-full w-full" 
          viewBox="0 0 1000 200" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background curved path */}
          <path
            d={svgPath}
            fill="none"
            stroke="rgba(74, 222, 128, 0.2)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Animated path that grows */}
          <path
            d={svgPath}
            fill="none"
            stroke="rgba(74, 222, 128, 0.8)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={1000 - (activeStep / (totalSteps - 1)) * 1000}
            style={{ transition: "stroke-dashoffset 3s ease" }}
          />
          
          {/* Glowing dots along the path - these stay on the curve */}
          {pathPoints.map((point, index) => (
            <circle 
              key={index}
              cx={point.x} 
              cy={point.y} 
              r="8" 
              style={{
                fill: activeStep >= index ? "rgba(74, 222, 128, 0.8)" : "rgba(74, 222, 128, 0.2)",
                filter: activeStep >= index ? "drop-shadow(0 0 8px rgba(74, 222, 128, 0.8))" : "none",
                transition: "all 1s ease"
              }}
            />
          ))}
        </svg>

        {/* Journey icons - positioned away from the path */}
        <div className="relative h-full">
          {iconPositions.map((point, index) => {
            const step = journeyData[index];
            const Icon = step.icon;
            
            // Calculate percentage positions for CSS
            const xPos = `${(point.x / 1000) * 100}%`;
            const yPos = `${(point.y / 200) * 100}%`;
            
            return (
              <div 
                key={index}
                className="absolute flex flex-col items-center transition-all duration-1000"
                style={{ 
                  left: xPos, 
                  top: yPos, 
                  transform: "translate(-50%, -50%)",
                  opacity: activeStep >= index ? 1 : 0.3
                }}
              >
                {/* Icon circle */}
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-1000 ${
                  activeStep >= index ? "ring-2 ring-green-200" : ""
                }`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <Icon 
                      className={`h-6 w-6 transition-all duration-1000 ${
                        activeStep >= index ? "text-green-600" : "text-gray-400"
                      }`} 
                    />
                  </div>
                </div>
                
                {/* Label - positioned differently based on whether icon is top or bottom */}
                <div className={`text-center ${index % 2 === 0 ? "-mt-16" : "mt-4"}`}>
                  <p className={`text-xs font-medium transition-all duration-1000 ${
                    activeStep >= index ? "text-green-700" : "text-gray-400"
                  }`}>
                    {step.stage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <h2 className="text-[17px] -ml-[40px] -mt-[20px] font-semibold text-green-700 mb-5">Journey Details</h2>
      
{/* Journey Details Cards */}
<div className="space-y-5">
  {journeyData.map((step, index) => (
    <div 
      key={index}
      className="bg-white border border-gray-200 rounded-lg p-6 flex items-center shadow-md w-195 h-22 -ml-[40px] -mt-2"
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

export default ProductJourney;