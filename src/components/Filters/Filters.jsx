export default function Filters({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClear,
}) {
  return (
    <div className="filters">
      <input
        placeholder="Search products"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sort by price</option>
        <option value="asc">Low → High</option>
        <option value="desc">High → Low</option>
      </select>

      <button onClick={onClear}>Clear</button>
    </div>
  );
}
