import React, { useEffect, useState } from 'react';
import { PhoneCall, Info, MapPin, User, Crop, Clock, Award } from 'lucide-react';
import axios from 'axios';
import { NavLink, Outlet } from 'react-router-dom';

function Marketplace() {

  return (
    <>

      <div className="flex items-center justify-between mx-5">
        <nav className="bg-gray-100 h-13 flex justify-center items-center mx-2 space-x-4 p-4 rounded-md shadow-md">
          <NavLink
            to="/marketplace/farmers"
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-2 text-gray-700 font-medium transition-all duration-300 
          ${isActive ? 'bg-white border border-none text-green-600 rounded-md' : 'hover:bg-gray-200 rounded-md'}`
            }
          >
            {({ isActive }) => <Package size={20} className={isActive ? "text-green-600" : "text-gray-700"} />}
            Famrmer's details
          </NavLink>

          <NavLink
            to="/marketplace/market"
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-2 text-gray-700 font-medium transition-all duration-300 
          ${isActive ? 'bg-white border border-none text-green-600 rounded-md' : 'hover:bg-gray-200 rounded-md'}`
            }
          >
            {({ isActive }) => <ShoppingBag size={20} className={isActive ? "text-green-600" : "text-gray-700"} />}
            Market Prices
          </NavLink>
          <NavLink
            to="/marketplace/news"
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-2 text-gray-700 font-medium transition-all duration-300 
          ${isActive ? 'bg-white border border-none text-green-600 rounded-md' : 'hover:bg-gray-200 rounded-md'}`
            }
          >
            {({ isActive }) => <ShoppingBag size={20} className={isActive ? "text-green-600" : "text-gray-700"} />}
            News
          </NavLink>
        </nav>
      </div>
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
}

export default Marketplace; 