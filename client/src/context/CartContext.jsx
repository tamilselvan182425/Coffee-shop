import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart && storedCart !== 'undefined') {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
                localStorage.removeItem('cart');
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === product._id ? { ...exist, qty: exist.qty + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item._id !== id));
    };

    const updateQty = (id, qty) => {
        if (qty < 1) return;
        setCart(
            cart.map((item) =>
                item._id === id ? { ...item, qty } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
