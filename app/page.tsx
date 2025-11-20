"use client";
import Header from "../components/Header";
import HeroShowcase from "../components/HeroShowcase";
import Filters from "../components/Filters";

import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { useFilteredProducts } from "../store/useShopStore";
import Features from "../components/Features";
import Trending from "../components/Trending";

export default function Home() {
  const list = useFilteredProducts();
  return (
    <div className="min-h-screen ">
      <Header />

      <HeroShowcase />
      <Trending />
      <Categories />
      <Filters />
      <section id="catalog" className="mx-auto max-w-6xl px-4 py-6">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <Features />
    </div>
  );
}
