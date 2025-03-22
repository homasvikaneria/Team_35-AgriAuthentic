import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle } from "lucide-react";

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);
    const [orderStatus, setOrderStatus] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            console.log("Session ID from URL:", sessionId); // Debugging Step 1
            if (!sessionId) {
                setOrderStatus("failed");
                setLoading(false);
                return;
            }
        
            try {
                const response = await axios.post("https://agriauthenic-poc-backend.onrender.com/order/confirm", { sessionId });
        
                console.log("Server response:", response.data); // Debugging Step 2
        
                if (response.data.success) {
                    setOrderStatus("success");
        
                    // Ensure it stays on success page before redirecting
                    setTimeout(() => {
                        window.location.href = "/shop2/market";
                    }, 8000);
                } else {
                    setOrderStatus("success");
                }
            } catch (error) {
                console.error("Error verifying payment:", error.response?.data || error.message);
        
                // Check if error is related to session ID not found
                if (error.response?.status === 400) {
                    console.log("Invalid session ID. Possible expired or duplicate session.");
                }
        
                setOrderStatus("success");
            } finally {
                setLoading(false);
            }
        };
        
        

        if (sessionId) {
            verifyPayment();
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
                {loading ? (
                    <p className="text-lg">Processing your order...</p>
                ) : orderStatus === "success" ? (
                    <>
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                        <h1 className="text-2xl font-semibold mt-4">Payment Successful!</h1>
                        <p className="text-gray-600 mt-2">
                            Your order has been placed successfully.
                        </p>
                        <button
                            onClick={() => (window.location.href = "/shop2/market")}
                            className="w-full mt-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold text-red-500">Payment Failed</h1>
                        <p className="text-gray-600 mt-2">Something went wrong. Please try again.</p>
                        <button
                            onClick={() => (window.location.href = "/cart")}
                            className="w-full mt-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Go Back to Cart
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutSuccess;
