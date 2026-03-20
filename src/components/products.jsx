import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import ProductList from "./product_list";
import AddModal from "./add_modal";
import EditModal from "./edit_modal";
import Header from "./Header";
import Pagination from "./pagination";
import Snackbar from "./snackbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [snackbar, setSnackbar] = useState({ show: false, message: "" });

  const limit = 15;

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/get_products", {
        params: {
          page: currentPage,
          limit,
          keyword: search.trim(),
          category,
        },
      });

      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
      const uniqueCategories = [
        ...new Set(res.data.data.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [currentPage, search, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditingProduct(null);
    setEditModalOpen(false);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/product/${id}`);
      fetchProducts();
      setSnackbar({ show: true, message: "Product deleted successfully!" });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const saveAddProduct = async (newProduct) => {
    try {
      await axios.post("http://localhost:5000/product", newProduct);
      fetchProducts();
      closeAddModal();
      setSnackbar({ show: true, message: "Product added successfully!" });
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  const saveEditProduct = async (updatedProduct) => {
    try {
      await axios.post(
        `http://localhost:5000/product/${updatedProduct.id}`,
        updatedProduct,
      );
      fetchProducts();
      closeEditModal();
      setSnackbar({ show: true, message: "Product updated successfully!" });
    } catch (err) {
      console.error("Edit product error:", err);
    }
  };

  return (
    <div>
      <Header
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        openAddModal={openAddModal}
      />
      <div className="container" style={{ marginTop: "90px" }}>
        <ProductList
          products={products}
          openEdit={openEditModal}
          deleteProduct={deleteProduct}
        />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {addModalOpen && (
        <AddModal closeModal={closeAddModal} saveAdd={saveAddProduct} />
      )}

      {editModalOpen && editingProduct && (
        <EditModal
          product={editingProduct}
          closeModal={closeEditModal}
          saveEdit={saveEditProduct}
        />
      )}

      <Snackbar
        show={snackbar.show}
        message={snackbar.message}
        setShow={(show) => setSnackbar({ ...snackbar, show })}
      />
    </div>
  );
}
