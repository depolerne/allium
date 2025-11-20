"use client";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { useShopStore } from "../../store/useShopStore";

export default function FavoritesPage() {
  const { products, favorites } = useShopStore();
  const favList = Array.isArray(favorites) ? favorites : [];
  const favProducts = products.filter((p) => favList.includes(p.id));

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-2xl font-semibold mb-4">Избранное</h1>
        {favProducts.length === 0 ? (
          <p className="text-zinc-300">Список избранного пуст.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}