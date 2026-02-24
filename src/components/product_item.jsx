import React from "react";

export default function ProductItem({ product, openEdit, deleteProduct }) {
  return (
    <div className="product-box">
      <img src="/default.jpg" alt={product.title} />

      <h4>{product.title}</h4>
      <p>{product.category}</p>
      <p>${product.price}</p>

      {/* Text buttons for edit and delete */}
      <div className="product-buttons">
        <button
          className="edit-btn"
          onClick={() => openEdit(product)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteProduct(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}