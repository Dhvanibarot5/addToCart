import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const products = [
  { id: 1, image: "https://imgs.search.brave.com/jOFZx983W2AqT5bQM-Jg2kFlLDWn2ALGdzjUiZ2u6Og/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzI0LzgyLzMz/LzM2MF9GXzEwMjQ4/MjMzMzFfRmdwVmM0/eTQySW5uUWFuN3F3/VUh1NmdzZWhPdEFV/am0uanBn", name: "Laptop", price: 50000 },
  { id: 2, image: "https://imgs.search.brave.com/fJXQ0q91zlL4OLQCHqW8KNnDiwO4mIxUVS6HfIypxx8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM3/MTY5NTQwNC9waG90/by9pcGhvbmUtMTMt/cHJvLWdyYXBoaXRl/LWdyYXkuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUk0a0k3/RmNpSFNVWEdSb3J1/bkZpY0xwVl81Qmli/cjJMajRCWjloSlFu/TTA9", name: "iPhone", price: 25000 },
  { id: 3, image: "https://imgs.search.brave.com/5sx3GxhMm_B1J6rAkrCtmY2il0vdX8W_8rrRcpPUQmI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzcxLzg3LzU4/LzM2MF9GXzk3MTg3/NTg3M19uR2QxclhU/QXNuUjdPZHp0dHhq/ZHVFSUxHaDIwenBv/Si5qcGc", name: "Headphones", price: 3000 },
  { id: 4, image: "https://imgs.search.brave.com/O6PpgVj2gevZQGgvTg8E8oNQ0IEmYsGZHXltx3YS44w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzYwLzY4LzM3/LzM2MF9GXzY2MDY4/MzcxOF9xbzBxMVYy/UnVMTzU2UzdjdTRW/TWIwNzhtMTBVNldX/OC5qcGc", name: "Smartwatch", price: 8000 },
];

export default function AddToCart() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item)));
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center text-white">
          <h1 className="text-xl font-bold">Shopping Cart</h1>
          <div className="relative">
            <span className="mr-2">Cart</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>
        </div>
      </nav>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <ProductList products={products} addToCart={addToCart} />
        <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      </div>
    </div>
  );
}
