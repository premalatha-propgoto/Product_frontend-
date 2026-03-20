import React, { useEffect, useState } from "react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const productId = new URLSearchParams(window.location.search).get("id");
  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Product deleted successfully");
        window.location.href = "index.html";
      })
      .catch((err) => console.error(err));
  };
  const storeView = (id, title) => {
    fetch("http://localhost:5000/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: id,
        product_name: title,
      }),
    });
  };
  const loadProduct = (id) => {
    fetch(`http://localhost:5000/get_products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        storeView(data.id, data.title);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (productId) loadProduct(productId);
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "white",
          padding: "10px",
        }}
      >
        <h2>Product Details</h2>
      </div>

      <br />
      <br />
      <br />

      <div style={{ position: "relative" }}>
        <span
          onClick={() => deleteProduct(product.id)}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer",
            fontSize: "22px",
            color: "red",
          }}
        >
          🗑️
        </span>
        <img src="default.jpg" alt="product" style={{ width: "300px" }} />

        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <p>
          <b>Category:</b> {product.category}
        </p>
        <p>
          <b>Price:</b> {product.price}
        </p>
        <p>
          <b>Stock:</b> {product.stock}
        </p>
        <p>
          <b>Rating:</b> {product.rating}
        </p>

        <br />
        <button onClick={() => window.history.back()}>Back</button>
      </div>
    </div>
  );
};

export default ProductDetails;
