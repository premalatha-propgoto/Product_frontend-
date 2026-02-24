import React from "react";
import "./header.css";

export default function Header({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  openAddModal,
}) {
  return (
    <div className="header">
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search title, price or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((c, idx) => (
          <option key={idx} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button onClick={openAddModal}>Add Product</button>
    </div>
  );
}