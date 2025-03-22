import React, { useState } from 'react'
import { Leaf } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { Search } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { Link } from "react-router-dom";


const Navbar = () => {


    return (
        <>

            <div className='flex items-center justify-evenly mx-auto pt-2 bg-gradient-to-b from-green-200/50 to-transparent'>

                <Link to="/">
                    <div className='flex gap-2 items-center p-4 cursor-pointer'>
                        <Leaf color='#00C951' />
                        <h1 className='text-2xl font-bold text-green-500' >AgriAuthentic</h1>
                    </div>
                </Link>

                <Link to="/s">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="search"
                            className="w-full p-2.5 pl-10 pr-50 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                            placeholder="Search for products, brands, and more..."
                            required
                        />
                    </div>
                </Link>

                <div className="flex gap-5 mx-3">
                    <Link to="/shop/cart">
                        <div>
                            <ShoppingCart />
                        </div>
                    </Link>
                    <header>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </header>
                </div>

            </div>
        </>
    )
}

export default Navbar