import React from 'react'
import Navbar from '../Header/Navbar'
import { ChevronLeft } from 'lucide-react';
import { Link } from "react-router-dom";


const KisanDetail = () => {
    return (
        <>
            <Navbar />

            <div className='container mx-auto pt-16 px-26'>

                <Link to="/shop/market">
                    <button
                        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ChevronLeft size={20} />
                        <span>Back to Marketplace</span>
                    </button>
                </Link>

                <div className='flex gap-4'>
                    <div className=''>
                        <img src="https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/KisanCommunityImage/20230531133339Farmer%20Image%2022_5.jpg?tr=f-webp" alt="" width={200} className='rounded-xl border-3 border-green-500' />
                    </div>

                    <div className='m-5'>
                        <h1 className='font-semibold text-3xl border-b-3 border-green-500'>Wale Kiran Arjun</h1>


                        <div className='mt-5'>
                            <div className='text-lg'>• <b>Total Area</b> : 5</div>
                            <div className='text-lg'>• <b>Area Under Cultivation</b> : 5</div>
                            <div className='text-lg'>• <b>Crop Cycle</b> : Tomato, Onion and Cabbage</div>
                            <div className='text-lg'>• <b>Agriculture Method</b> : Modern and traditional methods</div>
                        </div>

                    </div>


                </div>


                <div className=' mt-5 leading-6 text-xl bg-green-50 p-5 rounded-xl border-4 border-green-500 text-gray-700'>
                    Hello, I'm Wale Kiran Arjun, a farmer with several years of experience. My family has a long history of farming, and I'm proud to carry on this tradition. I started farming about 10 years ago and have been actively involved in agricultural practices ever since. When I first started farming, I focused on cultivating onions and tomatoes. It took me about a year to learn the ins and outs of these crops and effectively harvest them. Challenges are inevitable in farming, and I have faced some natural issues along the way. However, with perseverance and the support of my family, I overcame these challenges. In my family, everyone plays a role in farming. We all work on the farm, dedicating our time and efforts to ensure its success. I have siblings who also contribute to farming, and together, we make a strong team. I am happily married, and my wife is involved in various aspects of farm management, providing valuable support. We have children who are also actively engaged in farming. They assist with various tasks and are gaining hands-on experience in the agricultural sector. It's wonderful to see the younger generation taking an interest in this field.
                </div>

            </div>
        </>
    )
}

export default KisanDetail