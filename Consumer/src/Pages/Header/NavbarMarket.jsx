import React, { useState, useEffect } from 'react';
import { Leaf, ShoppingCart } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';


const categories = [
    { icon: "https://cdn.zeptonow.com/production/inventory/banner/a767cf6e-9113-409b-b5ab-ac0d22a7db58.png", label: "Marketplace", link: "/shop/market" },
    { icon: "https://cdn.zeptonow.com/production/inventory/banner/3c9537eb-0d84-427a-ae63-3137f74ad6f0.png", label: "My Orders", link: "/shop/myorders" },
    { icon: "https://cdn.zeptonow.com/production/inventory/banner/8e8a58b9-f2d7-46fb-9634-930b016499fa.png", label: "Kisan Connect", link: "/shop/kisan" },
    { icon: "https://cdn.zeptonow.com/production/inventory/banner/c882779f-738d-46f8-8656-8ebb72246b46.png", label: "Product Verification", link: "/shop/verify" },
];

const NavbarMarket = () => {


    const [activeCategory, setActiveCategory] = useState(() => {

        const storedCategory = localStorage.getItem('activeCategory');
        return storedCategory ? storedCategory : "Marketplace";
    });

    useEffect(() => {
        localStorage.setItem('activeCategory', activeCategory);
    }, [activeCategory]);


    return (
        <>
            <div className='flex items-center justify-between mx-auto pt-2 bg-gradient-to-b from-green-200/50 to-transparent px-25'>
                <Link to="/">
                    <div className='flex gap-2 items-center p-4 cursor-pointer'>
                        <Leaf color='#00C951' />
                        <h1 className='text-2xl font-bold text-green-500'>AgriAuthentic</h1>
                    </div>
                </Link>

                <div className="border-gray-400">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center space-x-8 py-3 overflow-x-auto scrollbar-hide">

                            {categories.map((category, index) => (
                                <Link to={category.link}>
                                    <button
                                        key={index}
                                        className={`flex items-center space-x-1 pb-1 border-b-3 ${activeCategory === category.label
                                            ? 'border-purple-600 text-purple-600 font-bold'
                                            : 'border-transparent text-gray-600 hover:text-purple-600'
                                            } whitespace-nowrap transition-colors duration-200`}
                                        onClick={() => setActiveCategory(category.label)}
                                    >
                                        <img
                                            src={category.icon}
                                            alt=""
                                            width={30}
                                            className={`${activeCategory === category.label
                                                ? 'filter-purple-600' // Add a CSS class for active icon
                                                : 'filter-gray-600' // Add a CSS class for inactive icon
                                                }`}
                                        />
                                        <span>{category.label}</span>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

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
    );
};

export default NavbarMarket;