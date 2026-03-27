import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-coffee-950 text-coffee-100 shadow-xl sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <span className="text-coffee-500">☕</span> COFFEE<span className="text-coffee-500">HAVEN</span>
                </Link>

                <div className="hidden md:flex gap-8 items-center font-medium">
                    <Link to="/" className="hover:text-coffee-400 transition-colors">Home</Link>
                    <Link to="/menu" className="hover:text-coffee-400 transition-colors">Menu</Link>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="hover:text-coffee-400 transition-colors">Dashboard</Link>
                    )}
                </div>

                <div className="flex items-center gap-5">
                    <Link to="/cart" className="relative p-2 hover:bg-coffee-900 rounded-full transition-all">
                        <FiShoppingCart size={22} />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-coffee-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cart.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/orders" className="flex items-center gap-2 hover:text-coffee-400 transition-colors">
                                <FiUser size={20} />
                                <span className="hidden sm:inline">{user.name}</span>
                            </Link>
                            <button onClick={handleLogout} className="p-2 hover:bg-coffee-900 rounded-full text-red-400 transition-all">
                                <FiLogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-coffee-600 hover:bg-coffee-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
