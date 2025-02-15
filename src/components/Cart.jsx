export default function Cart({ cart, removeFromCart, updateQuantity }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mt-6">Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between p-4 border rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-300 px-2 py-1 rounded">
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-300 px-2 py-1 rounded">
                  +
                </button>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-700">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
        </div>
      )}
    </div>
  );
}
