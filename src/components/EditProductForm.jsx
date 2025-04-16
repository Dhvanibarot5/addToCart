import { useState } from "react";

export default function EditProductForm({ product, onSave, onCancel }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <label className="block mb-2 font-semibold">Name</label>
      <input
        name="name"
        value={editedProduct.name}
        onChange={handleChange}
        className="border px-3 py-2 w-full mb-4"
      />

      <label className="block mb-2 font-semibold">Price</label>
      <input
        name="price"
        type="number"
        value={editedProduct.price}
        onChange={handleChange}
        className="border px-3 py-2 w-full mb-4"
      />

      <label className="block mb-2 font-semibold">Image URL</label>
      <input
        name="image"
        value={editedProduct.image}
        onChange={handleChange}
        className="border px-3 py-2 w-full mb-4"
      />

      <div className="flex justify-between">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
