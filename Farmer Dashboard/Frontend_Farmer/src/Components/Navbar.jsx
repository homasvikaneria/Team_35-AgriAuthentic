import { Leaf } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <>
            <div className=' flex items-center justify-between mx-2'>
                <div className=" flex items-center">
                    <Leaf color="#2ba829" size={28} />
                    <h1 className=' text-green-600  font-semibold text-2xl text-center items-center flex'>
                        AgriAuthentic
                    </h1>
                </div>
                <div className="p-4 flex space-x-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg transition ${isActive ? "text-green-700 font-semibold" : "text-black font-semibold hover:text-gray-600"
                            }`
                        }
                    >
                       AI Dashboard
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg transition ${isActive ? "text-green-700 font-semibold" : "text-black font-semibold hover:text-gray-600"
                            }`
                        }
                    >
                        Products & Orders
                    </NavLink>
                    <NavLink
                        to="/marketplace"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg transition-all duration-500 ${isActive ? "text-green-700 font-semibold" : "text-black font-semibold hover:text-gray-600"
                            }`
                        }
                    >
                        Marketplace
                    </NavLink>
                    <NavLink
                        to="/analytics"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg transition ${isActive ? "text-green-700 font-semibold" : "text-black font-semibold hover:text-gray-600"
                            }`
                        }
                    >
                        Analytics
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg transition ${isActive ? "text-green-700 font-semibold" : "text-black font-semibold hover:text-gray-600"
                            }`
                        }
                    >
                        Profile
                    </NavLink>
                </div>
                <div className="">
                    login / signup
                </div>
            </div>
        </>
    )
}

export default Navbar