import { useEffect, useState } from "react";

const API_URL = "https://dummyjson.com/products?limit=20";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        const normalized = data.products.map((p) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          category: p.category,
          stock: p.stock,
        }));

        if (isMounted) setProducts(normalized);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}
