import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import { FiChevronLeft, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) {
            addToCart(product);
        }
        toast.success(`${product.name} (${qty}) added to cart!`);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-coffee-200 border-t-coffee-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) return <div className="text-center py-20 text-coffee-600 font-bold">Product not found.</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-coffee-600 font-bold mb-8 hover:text-coffee-950 transition-colors"
            >
                <FiChevronLeft /> Back to Menu
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="rounded-[40px] overflow-hidden shadow-2xl scale-95 hover:scale-100 transition-transform duration-500">
                    <img src={product.image} alt={product.name} className="w-full h-[600px] object-cover" />
                </div>

                <div className="flex flex-col">
                    <span className="text-coffee-600 font-black tracking-widest uppercase text-sm mb-4">
                        {product.category}
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black text-coffee-950 mb-6 leading-tight">
                        {product.name}
                    </h1>
                    <p className="text-coffee-700 text-lg mb-8 leading-relaxed max-w-xl">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-4 mb-10">
                        <span className="text-4xl font-black text-coffee-800">
                            ${product.price.toFixed(2)}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-coffee-300"></div>
                        <span className="text-sm font-bold text-coffee-500 tracking-wide uppercase">
                            Free Shipping
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center bg-white border-2 border-coffee-100 rounded-2xl p-2 shadow-sm">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="p-3 text-coffee-600 hover:bg-coffee-50 rounded-xl transition-all"
                            >
                                <FiMinus size={20} />
                            </button>
                            <span className="w-12 text-center font-black text-xl text-coffee-950">{qty}</span>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="p-3 text-coffee-600 hover:bg-coffee-50 rounded-xl transition-all"
                            >
                                <FiPlus size={20} />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="btn-primary flex-grow md:flex-grow-0 flex items-center justify-center gap-3 px-10 py-5 group shadow-2xl"
                        >
                            <FiShoppingBag size={22} className="group-hover:rotate-12 transition-transform" />
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-12 flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-bold text-coffee-400 uppercase tracking-widest">
                            {product.stock > 0 ? `${product.stock} items currently in stock` : 'Sold out - Back soon'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
