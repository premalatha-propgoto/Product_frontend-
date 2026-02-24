export default function SearchBar({
  searchKeyword,
  setSearchKeyword,
  categories,
  selectedCategory,
  setSelectedCategory,
  openAdd
}) {
  return (
    <div className="header">
      <h2>Products</h2>

      <input
        placeholder="Search title, price or category"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <button onClick={openAdd}>Add Product</button>
    </div>
  );
}