import { useState, useEffect } from 'react';
import API from '../api/axios';
import { FiClock, FiCheck, FiCoffee } from 'react-icons/fi';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders/user');
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders', error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <FiClock className="text-orange-500" />;
            case 'Preparing': return <FiCoffee className="text-blue-500 animate-pulse" />;
            case 'Delivered': return <FiCheck className="text-green-500" />;
            default: return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-coffee-200 border-t-coffee-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h2 className="text-4xl font-black text-coffee-950 mb-12">Order History</h2>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[40px] shadow-sm">
                    <p className="text-coffee-400 text-lg italic">No orders yet.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-[40px] shadow-sm border border-coffee-50 overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="p-8 border-b border-coffee-50 flex flex-wrap justify-between items-center gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-coffee-400 uppercase tracking-widest mb-1">Order ID</p>
                                    <p className="font-black text-coffee-950 text-sm">{order._id}</p>
                                </div>
                                <div className="flex items-center gap-3 bg-coffee-50 px-6 py-2 rounded-full">
                                    {getStatusIcon(order.status)}
                                    <span className="font-bold text-coffee-900">{order.status}</span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="space-y-4 mb-6">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="w-8 h-8 bg-coffee-100 text-coffee-600 flex items-center justify-center rounded-lg font-black text-xs">
                                                    {item.quantity}
                                                </span>
                                                <span className="font-bold text-coffee-900">{item.product?.name || 'Coffee Item'}</span>
                                            </div>
                                            <span className="text-coffee-400 font-bold">${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between items-end pt-6 border-t border-coffee-50">
                                    <p className="text-coffee-400 text-sm font-bold">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p className="text-2xl font-black text-coffee-950">Total: ${order.totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
