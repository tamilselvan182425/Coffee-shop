import { useState, useEffect } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { FiPlus, FiGrid, FiShoppingBag, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';

const AdminDashboard = () => {
    const [view, setView] = useState('products'); // 'products' or 'orders'
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Hot',
        description: '',
        image: '',
        stock: ''
    });
    const [editId, setEditId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const productsRes = await API.get('/products');
            const ordersRes = await API.get('/orders');
            setProducts(productsRes.data);
            setOrders(ordersRes.data);
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await API.put(`/products/${editId}`, formData);
                toast.success('Product updated!');
            } else {
                await API.post('/products', formData);
                toast.success('Product added!');
            }
            setShowModal(false);
            setEditId(null);
            setFormData({ name: '', price: '', category: 'Hot', description: '', image: '', stock: '' });
            fetchData();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleEdit = (product) => {
        setEditId(product._id);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description,
            image: product.image,
            stock: product.stock
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/products/${id}`);
                toast.success('Product removed');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}`, { status });
            toast.success(`Order set to ${status}`);
            fetchData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-coffee-200 border-t-coffee-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar */}
                <aside className="lg:w-64 space-y-4">
                    <button
                        onClick={() => setView('products')}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${view === 'products' ? 'bg-coffee-950 text-white shadow-xl translate-x-2' : 'bg-white text-coffee-600 hover:bg-coffee-50'}`}
                    >
                        <FiGrid /> Products
                    </button>
                    <button
                        onClick={() => setView('orders')}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${view === 'orders' ? 'bg-coffee-950 text-white shadow-xl translate-x-2' : 'bg-white text-coffee-600 hover:bg-coffee-50'}`}
                    >
                        <FiShoppingBag /> Orders
                    </button>

                    <div className="pt-10 border-t border-coffee-100">
                        <div className="bg-coffee-100 p-6 rounded-[30px] text-center">
                            <p className="text-[10px] font-black text-coffee-500 uppercase tracking-widest mb-1">Total Revenue</p>
                            <p className="text-2xl font-black text-coffee-950">
                                ${orders.reduce((acc, o) => acc + o.totalPrice, 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-grow">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-4xl font-black text-coffee-950 capitalize">{view} Management</h2>
                        {view === 'products' && (
                            <button
                                onClick={() => { setShowModal(true); setEditId(null); setFormData({ name: '', price: '', category: 'Hot', description: '', image: '', stock: '' }); }}
                                className="btn-primary flex items-center gap-2"
                            >
                                <FiPlus /> Add Product
                            </button>
                        )}
                    </div>

                    {view === 'products' ? (
                        <div className="bg-white rounded-[40px] shadow-sm border border-coffee-50 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-coffee-50 text-coffee-500 text-[10px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="px-8 py-5">Product</th>
                                        <th className="px-8 py-5">Category</th>
                                        <th className="px-8 py-5">Price</th>
                                        <th className="px-8 py-5">Stock</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-coffee-50">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-coffee-50/30 transition-colors">
                                            <td className="px-8 py-5 flex items-center gap-4">
                                                <img src={product.image} className="w-12 h-12 rounded-xl object-cover" />
                                                <span className="font-bold text-coffee-950">{product.name}</span>
                                            </td>
                                            <td className="px-8 py-5 text-coffee-600 font-medium">{product.category}</td>
                                            <td className="px-8 py-5 font-black text-coffee-900">${product.price.toFixed(2)}</td>
                                            <td className="px-8 py-5 text-coffee-600">{product.stock}</td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(product)} className="p-2 text-coffee-500 hover:bg-coffee-100 rounded-lg"><FiEdit2 /></button>
                                                    <button onClick={() => handleDelete(product._id)} className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.length === 0 ? <p className="text-center py-20 text-coffee-400 font-bold italic">No orders recorded yet.</p> : orders.map((order) => (
                                <div key={order._id} className="bg-white p-8 rounded-[40px] shadow-sm border border-coffee-50 flex flex-wrap justify-between items-center gap-6">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-black text-coffee-950">Order #{order._id.slice(-6)}</h4>
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-coffee-500">Customer: {order.user?.name} | Total: ${order.totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {order.status === 'Pending' && (
                                            <button onClick={() => handleUpdateStatus(order._id, 'Preparing')} className="bg-blue-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-600 transition-all text-sm">Prepare</button>
                                        )}
                                        {order.status === 'Preparing' && (
                                            <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-600 transition-all text-sm flex items-center gap-2"><FiCheck /> Deliver</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* Product Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] bg-coffee-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-[50px] overflow-hidden shadow-2xl relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-8 right-8 text-coffee-400 hover:text-coffee-950"
                        >
                            <FiTrash2 size={24} />
                        </button>

                        <form onSubmit={handleSubmit} className="p-12">
                            <h3 className="text-3xl font-black text-coffee-950 mb-8">{editId ? 'Edit Product' : 'Add New Brew'}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Product Name</label>
                                    <input name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-500 transition-all" required />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Price ($)</label>
                                    <input name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-500 transition-all" required />
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Category</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-500 transition-all">
                                        <option value="Hot">Hot</option>
                                        <option value="Cold">Cold</option>
                                        <option value="Dessert">Dessert</option>
                                    </select>
                                </div>
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Stock</label>
                                    <input name="stock" type="number" value={formData.stock} onChange={handleInputChange} className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-500 transition-all" required />
                                </div>
                            </div>
                            <div className="space-y-2 text-left mb-6">
                                <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Image URL</label>
                                <input name="image" value={formData.image} onChange={handleInputChange} className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-500 transition-all" required />
                            </div>
                            <div className="space-y-2 text-left mb-10">
                                <label className="text-[10px] font-black text-coffee-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-coffee-50 rounded-2xl px-6 py-4 outline-none border-2 border-transparent focus:border-coffee-500 transition-all h-32 resize-none" required></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full py-5 text-xl shadow-2xl">
                                {editId ? 'Save Changes' : 'Confirm Brew'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
