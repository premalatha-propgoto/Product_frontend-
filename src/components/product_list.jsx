import ProductItem from "./product_item";
export default function ProductList({ products, openEdit, deleteProduct }) {
  return (
    <div id="products">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((p) => (
          <ProductItem
            key={p.id}
            product={p}
            openEdit={openEdit}
            deleteProduct={deleteProduct}
          />
        ))
      )}
    </div>
  );
}