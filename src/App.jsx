import { useMemo, useState, useCallback } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductGrid from "./components/Product/ProductGrid";
import Filters from "./components/Filters/Filters";
import Cart from "./components/Cart/Cart";

function App() {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const [cart, setCart] = useState([]);


  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, search, category, sort]);


  const handleAddToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        if (existing.qty >= product.stock) return prev;

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          qty: 1,
        },
      ];
    });
  }, []);

  const handleQtyChange = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.min(qty, item.stock) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app">
      <h1>Mini E-Commerce</h1>

      <Filters
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onClear={() => {
          setSearch("");
          setCategory("all");
          setSort("");
        }}
      />

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      )}
      <h2>Cart</h2>

      <Cart
        cart={cart}
        onQtyChange={handleQtyChange}
        onRemove={handleRemove}
      />

    </div>
  );
}

export default App;
