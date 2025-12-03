import React, { createContext, useContext, useState } from 'react';

const AgroContext = createContext();

export const useAgro = () => useContext(AgroContext);

export const AgroProvider = ({ children }) => {
    // User State
    const [user, setUser] = useState(null);

    // Product State (Initial Mock Data)
    const [products, setProducts] = useState([
        { id: 1, name: 'Fresh Tomatoes', price: 40, unit: 'kg', farmer: 'Rajesh Kumar', farmerId: 999, location: 'Nashik, MH', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
        { id: 2, name: 'Organic Potatoes', price: 30, unit: 'kg', farmer: 'Suresh Patil', farmerId: 888, location: 'Pune, MH', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80' },
        { id: 3, name: 'Sweet Corn', price: 15, unit: 'pc', farmer: 'Amit Singh', farmerId: 777, location: 'Nagpur, MH', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80' },
        { id: 4, name: 'Fresh Carrots', price: 50, unit: 'kg', farmer: 'Priya Deshmukh', farmerId: 666, location: 'Satara, MH', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80' },
        { id: 5, name: 'Green Spinach', price: 20, unit: 'bunch', farmer: 'Rahul Verma', farmerId: 555, location: 'Mumbai, MH', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80' },
        { id: 6, name: 'Red Onions', price: 35, unit: 'kg', farmer: 'Vijay Kale', farmerId: 444, location: 'Nashik, MH', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80' },
    ]);

    // Cart State
    const [cart, setCart] = useState([]);

    // Actions
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        setCart([]);
    };

    const updateUser = (updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() };
        setProducts([...products, newProduct]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart(prevCart => prevCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <AgroContext.Provider value={{
            user,
            products,
            cart,
            login,
            logout,
            updateUser,
            addProduct,
            updateProduct,
            deleteProduct,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            clearCart,
            getCartTotal
        }}>
            {children}
        </AgroContext.Provider>
    );
};
