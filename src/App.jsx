import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import EditProductForm from "./components/EditProductForm";

export default function AddToCart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.round(item.price * 80), 
          image: item.image,
        }));
        setProducts(mapped);
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const startEditing = (product) => {
    setEditingProduct(product);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center text-white">
          <h1 className="text-xl font-bold">Shopping Cart</h1>
          <div className="relative">
            <span className="mr-2">Cart</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
        </div>
      </nav>

      <div className="p-6 max-w-3xl mx-auto">
        {editingProduct ? (
          <EditProductForm
            product={editingProduct}
            onSave={updateProduct}
            onCancel={() => setEditingProduct(null)}
          />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <ProductList
              products={products}
              addToCart={addToCart}
              onEdit={startEditing}
            />
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          </>
        )}
      </div>
    </div>
  );
}
