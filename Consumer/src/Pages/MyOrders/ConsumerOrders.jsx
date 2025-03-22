import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Header/Navbar';
import axios from 'axios';
import { ScaleLoader } from "react-spinners"
import NavbarMarket from '../Header/NavbarMarket';


const ConsumerOrders = () => {

    const { orderId } = useParams()
    console.log(orderId)

    const [orderData, setOrderDetail] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    const fetchmyOrder = async () => {
        try {
            const response = await axios.get(`https://agriauthenic-poc-backend.onrender.com/order/${orderId}`);
            if (response.data.success) {
                setOrderDetail(response.data.data);
                console.log(response.data.data)
            }
        } catch (err) {
            console.log(err.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchmyOrder()
    }, [])


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Adjust format as needed
    };


    return (
        <>
            <NavbarMarket />
            {
                isLoading ? (<div className="text-center py-80">
                    <ScaleLoader color="#00C951" />
                </div>) : (
                    <div className="min-h-screen bg-gray-50 p-6">
                        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                            <h1 className="text-2xl font-semibold mb-6">Order Details</h1>

                            {/* Order Summary */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order ID:</span>
                                        <span className="font-medium">{orderData._id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Time:</span>
                                        <span className="font-medium">{formatDate(orderData?.orderDetail?.orderTime)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Expected Delivery:</span>
                                        <span className="font-medium">{formatDate(orderData?.orderDetail?.expectedDelivery)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Delivery Status:</span>
                                        <span className="font-medium text-green-600">{orderData?.orderDetail?.deliveryStatus}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ordered Products */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>
                                <div className="space-y-4">
                                    {orderData?.orderDetail?.orderedProducts.map((product) => (
                                        <div key={product._id} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium">{product?.item?.productName}</h3>
                                                    <p className="text-sm text-gray-500">{product?.item?.productDescription}</p>
                                                </div>
                                                <span className="text-gray-600">₹{product?.item?.productPrice}</span>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-sm text-gray-500">Tags: {product?.item?.tags?.join(', ')}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Amount */}
                            <div className="flex justify-between border-t pt-4">
                                <span className="text-xl font-semibold">Total Amount:</span>
                                <span className="text-xl font-semibold">₹{orderData?.orderDetail?.orderAmount?.toFixed(2)}</span>
                            </div>

                            {/* Back to Orders Button */}
                            <div className="mt-8">
                                <Link
                                    to="/shop/myorders"
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Back to Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default ConsumerOrders;