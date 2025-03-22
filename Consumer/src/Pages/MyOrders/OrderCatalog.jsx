import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ScaleLoader } from "react-spinners"
import NavbarMarket from '../Header/NavbarMarket';


const OrderCatalog = () => {
    // Sample orders data (replace with actual data from API)
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch orders from API (example)
    useEffect(() => {
        // Replace with actual API call
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://agriauthenic-poc-backend.onrender.com/order/consumer/64b50c9e1c9d440000a1b2c2');
                setOrders(response.data.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Format date and time
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
                        <div className="max-w-lg mx-auto">
                            <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

                            {/* Orders List */}
                            <div className="space-y-4">
                                {orders?.map((order) => (
                                    <Link
                                        to={`/shop/myorders/${order?._id}`} // Navigate to order detail page
                                        key={order?._id}
                                        className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-semibold">Order #{order?._id}</h2>
                                                <p className="text-sm text-gray-500">
                                                    Ordered on: {formatDate(order?.orderDetail.orderTime)}
                                                </p>
                                            </div>
                                            <div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${order?.orderDetail.deliveryStatus === 'Delivered'
                                                        ? 'bg-green-100 text-green-600'
                                                        : order?.orderDetail.deliveryStatus === 'Shipped'
                                                            ? 'bg-blue-100 text-blue-600'
                                                            : 'bg-yellow-100 text-yellow-600'
                                                        }`}
                                                >
                                                    {order?.orderDetail.deliveryStatus}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-gray-600">
                                                Total Amount: <span className="font-semibold">₹{order?.orderDetail?.orderAmount?.toFixed(2)}</span>
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
};

export default OrderCatalog;