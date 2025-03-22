// Team_35-AgriAuthentic/Consumer/src/components/Verification/Certification.jsx
// Verification/Product_Verification/src/Components/Certification.jsx
// Product_Verification/src/Components/Certification.jsx
// Product_Verification/src/Components/ProductVerification.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Tractor, Award } from "lucide-react";
import LevelThree from "./LevelThree";
import LevelTwo from "./LevelTwo";
import LevelOne from "./LevelOne";

const Certification = () => {
  const [activeTab, setActiveTab] = useState("One");
  const navigate = useNavigate();


  return (
    <div className=" flex flex-col items-center -mt-8">
  

      {/* Tab Navigation */}
      <div className="flex mt-6 bg-gray-100 p-2 rounded-lg  w-[770px] justify-between">
        <button
          className={`flex items-center h-[25px]  px-22 py-4 rounded-md transition-all text-sm font-medium ${activeTab === "One"
              ? "bg-white shadow text-black "
              : "text-gray-500"
            }`}
          onClick={() => setActiveTab("One")}
        >
          <Award className="w-4 h-4 mr-2" /> Level 1
        </button>

        <button
          className={`flex items-center h-[25px]  px-22 py-4 rounded-md transition-all text-sm font-medium ${activeTab === "Two"
              ? "bg-white shadow text-black"
              : "text-gray-500"
            }`}
          onClick={() => setActiveTab("Two")}
        >
          <Award className="w-4 h-4 mr-2" /> Level 2
        </button>

        <button
          className={`flex items-center h-[25px]  px-22 py-4 rounded-md transition-all text-sm font-medium ${activeTab === "Three"
              ? "bg-white shadow text-black"
              : "text-gray-500"
            }`}
          onClick={() => setActiveTab("Three")}
        >
          <Award className="w-4 h-4 mr-2" /> Level 3
        </button>
      </div>

      {/* Page Content */}
      <div className="mt-6 w-[770px]  pt-8 pr-8 pl-8  bg-white rounded-lg border-[0.2px] border-[rgba(0,0,0,0.1)] mb-6 ">
        {activeTab === "One" && <LevelOne />}
        {activeTab === "Two" && <LevelTwo />}
        {activeTab === "Three" && <LevelThree />}
      </div>
      
    </div>
  );
};

export default Certification;
