import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import Navbar from '../components/Navbar';

const Cart = () => {
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const [loading, setLoading] = useState(false);

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.totalPrice || 0), 0);
    };

    const handleCheckout = async () => {
        setLoading(true);

        const cartData = {
            products: cart.map(({ id, name, price, totalPrice, addons }) => ({
                productId: id,
                name,
                price,
                totalPrice,
                addons
            })),
            totalPrice: calculateTotalPrice(),
        };

        try {
            const response = await fetch('http://localhost:5000/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cartData),
            });

            const data = await response.json();
            alert(response.ok ? 'Checkout successful!' : `Checkout failed: ${data.message}`);
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred. Please try again!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Checkout</h2>

                <div className="space-y-4">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={index} className="flex justify-between border-b pb-4">
                                <div className="flex-1">
                                    <h4 className="text-lg font-medium text-gray-800">{item.name}</h4>
                                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                    <p className="text-sm text-gray-600">Total: ${item.totalPrice}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No items in cart</p>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold text-blue-600">Total Price: ${calculateTotalPrice()}</h3>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={handleCheckout}
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={loading || cart.length === 0}
                    >
                        {loading ? 'Processing...' : 'Complete Checkout'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
