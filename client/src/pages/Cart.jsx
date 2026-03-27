import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
    const { cart, removeFromCart, updateQty, totalPrice } = useCart();
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-4xl font-black text-coffee-950 mb-12 flex items-center gap-4">
                <FiShoppingBag className="text-coffee-600" /> My Bag
            </h2>

            {cart.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[40px] shadow-sm border-2 border-dashed border-coffee-100">
                    <p className="text-coffee-400 text-xl font-bold mb-8 italic">Your coffee cup is currently empty...</p>
                    <Link to="/menu" className="btn-primary inline-flex items-center gap-2">
                        <FiArrowLeft /> Start Browsing
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item._id} className="bg-white p-6 rounded-[30px] shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:shadow-xl transition-all duration-300">
                                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />

                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="text-xl font-black text-coffee-950 mb-1">{item.name}</h3>
                                    <p className="text-coffee-500 font-bold text-sm tracking-wide uppercase">{item.category}</p>
                                </div>

                                <div className="flex items-center bg-coffee-50 rounded-2xl p-1">
                                    <button
                                        onClick={() => updateQty(item._id, item.qty - 1)}
                                        className="p-2 text-coffee-600 hover:bg-white rounded-xl transition-all"
                                    >
                                        <FiMinus size={16} />
                                    </button>
                                    <span className="w-10 text-center font-black text-coffee-950">{item.qty}</span>
                                    <button
                                        onClick={() => updateQty(item._id, item.qty + 1)}
                                        className="p-2 text-coffee-600 hover:bg-white rounded-xl transition-all"
                                    >
                                        <FiPlus size={16} />
                                    </button>
                                </div>

                                <div className="text-center sm:text-right min-w-[80px]">
                                    <p className="text-lg font-black text-coffee-800">${(item.price * item.qty).toFixed(2)}</p>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                >
                                    <FiTrash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-coffee-950 text-white p-10 rounded-[40px] shadow-2xl sticky top-28">
                            <h3 className="text-2xl font-black mb-8 border-b border-coffee-800 pb-4">Summary</h3>

                            <div className="space-y-4 mb-10 text-coffee-300">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-white">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping</span>
                                    <span className="font-bold text-green-400">FREE</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Tax</span>
                                    <span className="font-bold text-white">$0.00</span>
                                </div>
                                <div className="h-px bg-coffee-800 my-4"></div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-xl font-black text-white">Total</span>
                                    <span className="text-3xl font-black text-coffee-400">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-coffee-600 hover:bg-coffee-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
