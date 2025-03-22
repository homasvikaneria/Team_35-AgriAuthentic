import React, { useEffect, useState } from 'react';
import Navbar from '../Header/Navbar';
import { ChevronLeft } from 'lucide-react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ScaleLoader } from "react-spinners"
import NavbarMarket from '../Header/NavbarMarket';


const Cart = () => {
    const [userBasket, setUserBasket] = useState([]);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const fetchBasket = async () => {
        try {
            const response = await axios.get(`https://agriauthenic-poc-backend.onrender.com/basket/64b50c9e1c9d440000a1b2c2`);
            if (response.data.success) {
                setUserBasket(response.data.data);
                console.log(response.data.data);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const postOrder = async () => {
        try {
            const response = await axios.post("https://agriauthenic-poc-backend.onrender.com/order", {
                consumerId: '64b50c9e1c9d440000a1b2c2',
            });

            if (userBasket.length === 0) {
                alert("Your basket is empty. Add items before checkout.");
                return;
            }

            if (response.data.success) {
            
                window.location.href = response.data.checkoutUrl;
            } else {
                alert("Failed to initiate payment.");
            }
        } catch (err) {
            console.log(err.message);
            alert("An error occurred while processing your order.");
        }
    };


    useEffect(() => {
        fetchBasket();
    }, []);

    
    let totalPrice = userBasket?.reduce((acc, crr) => acc + Math.round(Number(crr.product?.productPrice)), 0);

    if (isLoading) {
        return <div className="text-center py-80">
            <ScaleLoader color="#00C951" />
        </div>;
    }


    
    if (userBasket.length === 0 && !checkoutSuccess) {
        return (
            <>
                <NavbarMarket />
                <div className="max-w-4xl mx-auto pt-28">
                    <div className="bg-white rounded-lg border p-8 text-center">
                        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
                        <Link to="/shop2/market">
                            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                Browse Marketplace
                            </button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }


    return (
        <>
            {checkoutSuccess ? (

                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
                        <div className="flex justify-center">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <h1 className="text-2xl font-semibold mt-4">Order Placed Successfully!</h1>
                        <p className="text-gray-600 mt-2">
                            Thank you for your purchase. Your order has been successfully placed and is being processed.
                        </p>
                        <button
                            onClick={() => (window.location.href = '/shop2/market')}
                            className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            ) : (
                
                <div>
                    <Navbar />
                    <div className="w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mt-12">
                        <Link to="/shop/market">
                            <button
                                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
                            >
                                <ChevronLeft size={20} />
                                <span>Back to Marketplace</span>
                            </button>
                        </Link>
                        <h2 className="text-xl font-semibold mb-4">Basket</h2>
                        <p className="text-gray-600 mb-6">1 items in your cart</p>

                       
                        {userBasket?.map((item) => (
                            <div className="bg-[#ebffef89] p-3 rounded-2xl m-3" key={item._id}>
                                <div className="flex items-center justify-between mb-6">
                                    <div className='flex  gap-4'>
                                        <img src={item?.product?.imageLink} alt="" width={100} className='rounded-2xl' />

                                        <div>
                                            <h3 className="font-medium">{item?.product?.productName}</h3>
                                            <p className="text-sm text-gray-500">Green Valley Farm</p>
                                            
                                            <div className="space-y-2 mb-6 mt-2">
                                                <div className="flex gap-4">
                                                    <span className="text-gray-600">₹{item?.product?.productPrice}</span>
                                                    <span className="text-sm text-gray-500">₹2.50/kg</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex items-center gap-2 bg-red-500 text-white p-2 rounded-xl text-sm font-bold cursor-pointer">
                                        Remove
                                    </div>
                                </div>


                            </div>
                        ))}

                        
                        <div className="flex justify-between border-t pt-4">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold">₹{totalPrice}</span>
                        </div>

                        
                        <button
                            className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            onClick={postOrder}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;