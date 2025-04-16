export default function ProductList({ products, addToCart, onEdit }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.name} className="w-full mb-2" />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="mb-2">₹{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-800 text-white px-3 py-1 rounded mr-2"
          >
            Add to Cart
          </button>
          <button
            onClick={() => onEdit(product)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}
  