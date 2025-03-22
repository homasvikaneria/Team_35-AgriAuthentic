import React from 'react'
import FarmerBanner from '../../assets/FarmerBanner.jpg'
import farmerDetail from '../../assets/farmerDetail.jpg'
import { Link } from "react-router-dom";


const KisanConnect = () => {
    return (
        <>
            <div className='container mx-auto'>


                <div className='flex justify-center'>
                    <img src={FarmerBanner} alt="" className='rounded-2xl' />
                </div>
                <div className='flex justify-center gap-3 mt-5 flex-wrap mx-20'>
                    <Link to="/shop/kisan">
                        <img src={farmerDetail} alt="" className='rounded-2xl hover:scale-110 duration-300 hover:shadow-xl cursor-pointer ' />
                    </Link>
                    <img src={farmerDetail} alt="" className='rounded-2xl hover:scale-110 duration-300 hover:shadow-xl cursor-pointer ' />
                    <img src={farmerDetail} alt="" className='rounded-2xl hover:scale-110 duration-300 hover:shadow-xl cursor-pointer ' />
                    <img src={farmerDetail} alt="" className='rounded-2xl hover:scale-110 duration-300 hover:shadow-xl cursor-pointer ' />
                    <img src={farmerDetail} alt="" className='rounded-2xl hover:scale-110 duration-300 hover:shadow-xl cursor-pointer ' />
                    <img src={farmerDetail} alt="" className='rounded-2xl hover:scale-110 duration-300 hover:shadow-xl cursor-pointer ' />
                    <img src={farmerDetail} alt="" className='rounded-2xl hover:scale-110 duration-300 hover:shadow-xl cursor-pointer ' />
                    <img src={farmerDetail} alt="" className='rounded-2xl hover:scale-110 duration-300 hover:shadow-xl cursor-pointer ' />

                </div>
            </div>
        </>
    )
}

export default KisanConnect