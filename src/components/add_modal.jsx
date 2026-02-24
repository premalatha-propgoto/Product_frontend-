import React, { useState } from "react";

export default function AddModal({ closeModal, saveAdd }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [brand, setBrand] = useState("");

  const [errors, setErrors] = useState({});

  const handleAdd = () => {
    // Validate required fields
    const newErrors = {};
    if (!id) newErrors.id = "ID is required";
    if (!price) newErrors.price = "Price is required";
    if (!discount && discount !== 0) newErrors.discount = "Discount is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Call parent save function
    saveAdd({
      id,
      title,
      description,
      category,
      price,
      discount,
      stock,
      rating,
      brand,
    });

    closeModal();
  };

  return (
    <div className="modal" onClick={closeModal} style={{ display: "flex" }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Add Product</h3>

        <input
          type="text"
          placeholder="ID*"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        {errors.id && <span style={{ color: "red" }}>{errors.id}</span>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Price*"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <span style={{ color: "red" }}>{errors.price}</span>}

        <input
          type="number"
          step="0.01"
          placeholder="Discount %*"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        {errors.discount && <span style={{ color: "red" }}>{errors.discount}</span>}

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <div style={{ marginTop: "12px" }}>
          <button onClick={handleAdd} style={{ marginRight: "6px" }}>
            Add
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}