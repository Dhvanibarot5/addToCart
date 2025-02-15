export default function ProductList({ products, addToCart }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded-lg shadow-md">
          <img src={product.image} alt={product.name} className="w-full h-42 object-cover mb-2 rounded" />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">₹{product.price}</p>
          <button onClick={() => addToCart(product)} className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
