import { useState, useEffect } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Menu = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/products');
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;
        if (category !== 'All') {
            result = result.filter(p => p.category === category);
        }
        if (searchTerm) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setFilteredProducts(result);
    }, [category, searchTerm, products]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-coffee-200 border-t-coffee-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-bold text-coffee-950 mb-2">Our Menu</h2>
                    <p className="text-coffee-600">Discover your perfect brew from our curated selection</p>
                </div>

                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative flex-grow md:flex-grow-0">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400" />
                        <input
                            type="text"
                            placeholder="Search coffee..."
                            className="bg-white border-2 border-coffee-100 rounded-2xl pl-12 pr-4 py-3 w-full focus:border-coffee-400 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                {['All', 'Hot', 'Cold', 'Dessert'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-8 py-3 rounded-2xl font-bold transition-all ${category === cat
                                ? 'bg-coffee-800 text-white shadow-lg scale-105'
                                : 'bg-white text-coffee-600 hover:bg-coffee-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-coffee-100">
                    <p className="text-coffee-400 text-lg">No matches found for your selection.</p>
                </div>
            )}
        </div>
    );
};

export default Menu;
