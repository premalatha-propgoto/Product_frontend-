import React, { useState, useEffect } from "react";

export default function EditModal({ product, closeModal, saveEdit }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setId(product.id || "");
      setTitle(product.title || "");
      setDescription(product.description || "");
      setCategory(product.category || "");
      setPrice(product.price || "");
      setDiscount(product.discount_percentage || 0);
      setStock(product.stock || 0);
    }
  }, [product]);

  const handleSave = () => {
    const newErrors = {};
    if (!id) newErrors.id = "ID is required";
    if (!title) newErrors.title = "Title is required";
    if (!price) newErrors.price = "Price is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    saveEdit({
      id,
      title,
      description,
      category,
      price,
      discount,
      stock,
    });

    closeModal();
  };

  if (!product) return null;

  return (
    <div className="modal" onClick={closeModal} style={{ display: "flex" }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Product</h3>

        <label>ID*</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        {errors.id && <span style={{ color: "red" }}>{errors.id}</span>}

        <label>Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Price*</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {errors.price && <span style={{ color: "red" }}>{errors.price}</span>}

        <label>Discount (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <div style={{ marginTop: "12px" }}>
          <button onClick={handleSave} style={{ marginRight: "6px" }}>
            Save
          </button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}