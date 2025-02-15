import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const products = [
  {
    id: 1,
    image:
      "https://imgs.search.brave.com/L3iN4AUxtuFMQR6lhJtWTJ9GmBuDVRLsIgKwRs9VBCg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1wc2Qv/ZmxvYXRpbmctbWFj/Ym9vay1wcm8tbGFw/dG9wLTE2LWluY2gt/c2NyZWVuLXJlYWxp/c3RpYy1lZGl0YWJs/ZS1tb2NrdXBfMzg0/MjA1LTg3Mi5qcGc_/c2VtdD1haXNfaHli/cmlk",
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    image:
      "https://imgs.search.brave.com/edsDTkMiuNXuuhj1hN3_9FxuHHXCFMLA5W2uZFENGto/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM3/MTI4MzY0Ni9waG90/by9pcGhvbmUtMTMt/cHJvLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1Ca2RCZ0V3/N3BrQmRWeUItRnhy/U2phQnl3QWpieUJN/T2pSR3IyZUlKS09B/PQ",
    name: "Smartphone",
    price: 25000,
  },
  {
    id: 3,
    image:
      "https://imgs.search.brave.com/4njfuprWV-P1qgmNybPVOgxi4BPIWtE-iRgsMISRLCU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzEyLzEyLzI3/LzM2MF9GXzkxMjEy/MjczNF9kc25La3F3/cDFVYTNvRkw2TEdG/YkJWOHpBdktVQ3BZ/WS5qcGc",
    name: "Headphones",
    price: 3000,
  },
  {
    id: 4,
    image:
      "https://imgs.search.brave.com/O6PpgVj2gevZQGgvTg8E8oNQ0IEmYsGZHXltx3YS44w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzYwLzY4LzM3/LzM2MF9GXzY2MDY4/MzcxOF9xbzBxMVYy/UnVMTzU2UzdjdTRW/TWIwNzhtMTBVNldX/OC5qcGc",
    name: "Smartwatch",
    price: 8000,
  },
];

export default function AddToCart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item)));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
    </div>
  );
}
