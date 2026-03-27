import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiCreditCard, FiTruck } from 'react-icons/fi';

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;

        setLoading(true);
        try {
            await API.post('/orders', {
                items: cart.map(item => ({ product: item._id, quantity: item.qty })),
                totalPrice
            });
            toast.success('Order placed successfully!', { duration: 5000 });
            clearCart();
            navigate('/orders');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        navigate('/menu');
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h2 className="text-4xl font-black text-coffee-950 mb-12">Complete Order</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Shipping info */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-coffee-50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-coffee-100 text-coffee-600 rounded-2xl flex items-center justify-center">
                                <FiTruck size={24} />
                            </div>
                            <h3 className="text-xl font-black text-coffee-950">Delivery Address</h3>
                        </div>
                        <div className="space-y-4">
                            <input type="text" placeholder="House/Flat No." className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-400" />
                            <input type="text" placeholder="Street/Area" className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-400" />
                            <input type="text" placeholder="City" className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-400" />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-coffee-50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-coffee-100 text-coffee-600 rounded-2xl flex items-center justify-center">
                                <FiCreditCard size={24} />
                            </div>
                            <h3 className="text-xl font-black text-coffee-950">Payment Method</h3>
                        </div>
                        <div className="p-4 bg-coffee-50 rounded-2xl border-2 border-coffee-500 flex items-center justify-between">
                            <span className="font-bold text-coffee-900">Cash on Delivery</span>
                            <FiCheckCircle className="text-coffee-600" size={24} />
                        </div>
                        <p className="mt-4 text-xs text-coffee-400 font-bold uppercase tracking-widest pl-2">More options coming soon</p>
                    </div>
                </div>

                {/* Final Summary */}
                <div className="bg-white p-10 rounded-[50px] shadow-2xl border border-coffee-50 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-coffee-50 text-coffee-600 rounded-full flex items-center justify-center mb-8">
                        <FiShoppingBag size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-coffee-950 mb-2">Order Summary</h3>
                    <p className="text-coffee-500 mb-8">{cart.length} items ready to brew</p>

                    <div className="w-full space-y-4 mb-10 border-t border-b border-coffee-100 py-6">
                        <div className="flex justify-between font-bold text-coffee-600">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-coffee-600">
                            <span>Delivery</span>
                            <span className="text-green-500">FREE</span>
                        </div>
                        <div className="flex justify-between text-2xl font-black text-coffee-950 pt-2">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="btn-primary w-full py-6 text-xl shadow-2xl disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Place Order Now'}
                    </button>
                    <p className="mt-6 text-xs text-coffee-400 font-medium">By placing order you agree to our terms of service.</p>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
