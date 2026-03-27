import { FiPlus, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(`${product.name} added to cart!`, {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    return (
        <div className="card group relative flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link to={`/product/${product._id}`} className="bg-white text-coffee-950 p-3 rounded-full hover:bg-coffee-500 hover:text-white transition-all shadow-lg active:scale-90">
                        <FiEye size={20} />
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className="bg-coffee-600 text-white p-3 rounded-full hover:bg-coffee-700 transition-all shadow-lg active:scale-90"
                    >
                        <FiPlus size={20} />
                    </button>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-coffee-800 uppercase tracking-widest shadow-sm">
                    {product.category}
                </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-coffee-950 group-hover:text-coffee-600 transition-colors">
                        {product.name}
                    </h3>
                    <span className="text-lg font-black text-coffee-800">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <p className="text-coffee-700 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-[11px] font-semibold text-coffee-400">
                            {product.stock > 0 ? 'INSTOCK' : 'OUT OF STOCK'}
                        </span>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="text-xs font-bold text-coffee-600 hover:text-coffee-800 underline underline-offset-4 transition-colors"
                    >
                        Quick Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
