import React from 'react'
import Navbar from '../Header/Navbar'
import { Link } from "react-router-dom";
import { Star, Leaf, MapPin, Car as Farm, Sprout } from 'lucide-react';
import NavbarMarket from '../Header/NavbarMarket';
import TopRated from '../../assets/topratedFarmers.jpg'


const KisanDetail = () => {
    return (
        <>
            <NavbarMarket />

            <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex flex-col items-center justify-center p-6 ">
                <div className=''>
                    <img src={TopRated} alt="" className='rounded-2xl' />
                </div>
                <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">

                    <div className="absolute top-0 left-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1587334207407-deb137a955ba?w=150')] opacity-20 rounded-br-full"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1582515073490-39981397c445?w=150')] opacity-20 rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1601976245669-0f51d0dca13c?w=150')] opacity-20 rounded-tr-full"></div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150')] opacity-20 rounded-tl-full"></div>

                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">

                            <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=400"
                                    alt="Farmer"
                                    className="w-full h-full object-cover"
                                />
                            </div>


                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-4">
                                    <h1 className="text-3xl font-bold text-green-700">Wale Kiran Arjun</h1>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                                        <Leaf className="w-4 h-4" />
                                        Level 2 Certification
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-yellow-500 font-medium">Top Rated Farmer Of The Week</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4].map((star) => (
                                            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-green-600" />
                                        <span>Total Area: <strong>5 acres</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Farm className="w-5 h-5 text-green-600" />
                                        <span>Area Under Cultivation: <strong>5 acres</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Sprout className="w-5 h-5 text-green-600" />
                                        <span>Crop Cycle: <strong>Tomato, Onion and Cabbage</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Leaf className="w-5 h-5 text-green-600" />
                                        <span>Agriculture Method: <strong>Modern and traditional methods</strong></span>
                                    </div>
                                </div>


                                <p className="text-gray-600 leading-relaxed">
                                    Hello, I'm Wale Kiran Arjun, a farmer with several years of experience. My family has a long history of farming,
                                    and I'm proud to carry on this tradition. I started farming about 10 years ago and have been actively involved in
                                    agricultural practices ever since. When I first started farming, I focused on cultivating onions and tomatoes. It
                                    took me about a year to learn the ins and outs of these crops and effectively harvest them. Challenges are inevitable
                                    in farming, and I have faced some natural issues along the way. However, with perseverance and the support of my family,
                                    I overcame these challenges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default KisanDetail


