import React from 'react'
import LandingTower1 from '../assets/LandingTower1.png'
import Unique from '../assets/Unique.png'
import FarmerButtton from '../assets/Farmer Buttton.png'
import shopnowbutton from '../assets/shop now button.png'
import FarmerOffer from '../assets/FarmerOffer.png'
import consumerOffer from '../assets/consumerOffer.png'
import Levels from '../assets/Levels.png'
import NavbarBusiness from './Header/NavbarBusiness'
import { Link } from "react-router-dom";



const BusinessLanding = () => {
    return (
        <>
            <NavbarBusiness />
            <div className='relative'>
                <img src={LandingTower1} alt="Landing Tower" className='' />
                <Link to="">
                    <img src={FarmerButtton} alt="Farmer Button" className='absolute right-89 top-76 scale-110 mix-blend-mode: plus-darker hover:scale-125 duration-150 cursor-pointer' />
                </Link>
                <Link to="/market">
                <img src={shopnowbutton} alt="Farmer Button" className='absolute right-89 top-90 scale-110 mix-blend-mode: plus-darker hover:scale-125 duration-150 cursor-pointer' />
                </Link>
                <img src={Unique} alt="Farmer Button" className='absolute right-82 top-127 scale-110 mix-blend-mode: plus-darker hover:scale-105 duration-150 cursor-pointer' />
            </div>

            <div className='p-20 flex '>
                <div className='m-3'>
                    <img src={FarmerOffer} alt="" className='rounded-2xl hover:scale-105 duration-150 hover:shadow-xl cursor-pointer mb-5' width={400} />
                    <img src={consumerOffer} alt="" className='rounded-2xl hover:scale-105 duration-150 hover:shadow-xl cursor-pointer' width={400} />
                </div>

                <div className='bg-gray-50 w-full rounded-3xl flex'>
                    <img src={Levels} alt="" className='duration-150 hover:shadow-xl'/>
                </div>

            </div>

        </>
    )
}

export default BusinessLanding