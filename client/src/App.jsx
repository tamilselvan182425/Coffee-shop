import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import ProductDetails from './pages/ProductDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="menu" element={<Menu />} />
                            <Route path="product/:id" element={<ProductDetails />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="cart" element={<Cart />} />

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route path="checkout" element={<Checkout />} />
                                <Route path="orders" element={<Orders />} />
                            </Route>

                            {/* Admin Routes */}
                            <Route element={<ProtectedRoute adminOnly={true} />}>
                                <Route path="admin" element={<AdminDashboard />} />
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
