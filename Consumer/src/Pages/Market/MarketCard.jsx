import React from "react";
import axios from "axios";
import { toast } from "sonner"; 
// import { useCartStore } from "../../store/cartStore.js";
import { Link } from "react-router-dom";

export const MarketCard = ({ data }) => {

  const postToBasket = async (productID) => {
    try {
      const response = await axios.post("http://localhost:4009/basket/add", {
        consumerId: "64b50c9e1c9d440000a1b2c2",
        productId: productID,
        quantity: 1,
      });

      console.log("Product added to basket:", response.data);
      toast.success("Product added to basket!"); // Show success toast
      return response.data;
    } catch (err) {
      console.error("Error adding product to basket:", err.message);
      toast.error("Failed to add product to basket."); // Show error toast
    }
  };

  const product = {
    id: data?.id?.$oid,
    name: data.productName,
    image: data.imageLink,
    deliveryTime: "11 MINS",
    weight: "(0.95-1.05) kg",
    price: data.productPrice,
    originalPrice: data.productPrice,
    discount: "20",
  };

  const { name, image, deliveryTime, weight, price, originalPrice, discount } = product;

  // const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (id) => {
    console.log(id);
    postToBasket(id); // Add product to the basket via API
    addItem(product); // Add product to the local cart state
  };

  return (
    <div className="relative w-[200px] h-[278px] bg-white shadow-md rounded-lg p-2 border border-gray-200">
      <Link to={`/shop2/product/${product?.id}`}>
        {discount && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-tl-lg">
            {discount}% OFF
          </div>
        )}

        <img
          src={image}
          alt={name}
          className="w-full h-[120px] object-cover rounded-md"
          loading="lazy"
        />

        <div className="pt-5">
          {/* Add level here instead of discount */}
          <div className="flex items-center text-gray-500 text-xs mt-1">⏱️ {deliveryTime} MINS</div>
          <h2 className="text-sm font-semibold mt-1">{name}</h2>
          <p className="text-xs text-gray-500">{weight}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between pt-8">
        <div>
          <span className="text-lg font-bold text-black">₹{price}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through ml-1">₹{originalPrice}</span>
          )}
        </div>

        <button
          onClick={() => handleAddToCart(product?.id)} // Fixed onClick handler
          className="border border-green-500 text-green-500 px-3 py-1 text-xs rounded-lg hover:bg-green-500 hover:text-white transition"
        >
          ADD
        </button>
      </div>
    </div>
  );
};