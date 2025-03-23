import React from 'react';
import { PhoneCall, Info, MapPin, User, Crop, Clock, Award, Package, ShoppingBag } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the translation hook

function Marketplace() {
  const { t } = useTranslation(); // Use the translation hook

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
            {t('marketplace.farmersDetails')} {/* Translated text */}
          </NavLink>

          <NavLink
            to="/marketplace/market"
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-2 text-gray-700 font-medium transition-all duration-300 
          ${isActive ? 'bg-white border border-none text-green-600 rounded-md' : 'hover:bg-gray-200 rounded-md'}`
            }
          >
            {({ isActive }) => <ShoppingBag size={20} className={isActive ? "text-green-600" : "text-gray-700"} />}
            {t('marketplace.marketPrices')} {/* Translated text */}
          </NavLink>

          <NavLink
            to="/marketplace/news"
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-2 text-gray-700 font-medium transition-all duration-300 
          ${isActive ? 'bg-white border border-none text-green-600 rounded-md' : 'hover:bg-gray-200 rounded-md'}`
            }
          >
            {({ isActive }) => <ShoppingBag size={20} className={isActive ? "text-green-600" : "text-gray-700"} />}
            {t('marketplace.news')} {/* Translated text */}
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