import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AgroContext = createContext();

export const useAgro = () => useContext(AgroContext);

export const AgroProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const API_URL = 'http://localhost:5000';

    // Initial Load
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, cartRes] = await Promise.all([
                    axios.get(`${API_URL}/products`),
                    axios.get(`${API_URL}/cart`)
                ]);
                setProducts(productsRes.data);
                setCart(cartRes.data);

                // Check for persisted user in localStorage (optional, for session persistence)
                const savedUser = localStorage.getItem('agro_user');
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchData();
    }, []);

    // Actions
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('agro_user', JSON.stringify(userData));
    };

    const registerOrLogin = async (userData) => {
        try {
            // Check if user exists
            const res = await axios.get(`${API_URL}/users?phone=${userData.phone}`);
            const existingUser = res.data.find(u => u.type === userData.type);

            if (existingUser) {
                console.log('Logging in existing user:', existingUser);
                login(existingUser);
            } else {
                // Register new user
                const newUser = { ...userData, id: String(Date.now()) };
                await axios.post(`${API_URL}/users`, newUser);
                console.log('Registering new user:', newUser);
                login(newUser);
            }
        } catch (error) {
            console.error("Error in registerOrLogin:", error);
            alert("Failed to login/register. Please check if server is running.");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('agro_user');
    };

    const updateUser = async (updatedData) => {
        if (!user) return;
        try {
            const newUser = { ...user, ...updatedData };
            await axios.put(`${API_URL}/users/${user.id}`, newUser);
            setUser(newUser);
            localStorage.setItem('agro_user', JSON.stringify(newUser));
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const addProduct = async (product) => {
        try {
            const newProduct = { ...product, id: String(Date.now()) };
            const res = await axios.post(`${API_URL}/products`, newProduct);
            setProducts([...products, res.data]);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            await axios.patch(`${API_URL}/products/${id}`, updatedProduct);
            setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${API_URL}/products/${id}`);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const addToCart = async (product) => {
        try {
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
                await axios.put(`${API_URL}/cart/${existingItem.id}`, updatedItem);
                setCart(cart.map(item => item.id === product.id ? updatedItem : item));
            } else {
                const newItem = { ...product, quantity: 1 };
                const res = await axios.post(`${API_URL}/cart`, newItem);
                setCart([...cart, res.data]);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`${API_URL}/cart/${productId}`);
            setCart(cart.filter(item => item.id !== productId));
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const updateCartQuantity = async (productId, quantity) => {
        if (quantity < 1) return;
        try {
            const item = cart.find(i => i.id === productId);
            if (!item) return;
            const updatedItem = { ...item, quantity };
            await axios.put(`${API_URL}/cart/${productId}`, updatedItem);
            setCart(cart.map(i => i.id === productId ? updatedItem : i));
        } catch (error) {
            console.error("Error updating cart quantity:", error);
        }
    };

    const clearCart = async () => {
        try {
            await Promise.all(cart.map(item => axios.delete(`${API_URL}/cart/${item.id}`)));
            setCart([]);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <AgroContext.Provider value={{
            user,
            products,
            cart,
            login,
            registerOrLogin,
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
