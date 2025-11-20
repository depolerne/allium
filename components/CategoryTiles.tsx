"use client";
import Image from "next/image";
import { useShopStore } from "../store/useShopStore";
import type { Category } from "../lib/types";

type Tile = {
  category: Category;
  title: string;
  image: string;
};

const tiles: Tile[] = [
  { category: "bouquets", title: "Букеты", image: "/1.jpg" },
  { category: "vases", title: "Вазы", image: "/2.jpeg" },
  { category: "decorations", title: "Декор", image: "/4.webp" },
  { category: "gifts", title: "Подарки", image: "/2.jpeg" },
  { category: "sets", title: "Сеты", image: "/4.webp" },
  { category: "corporate", title: "Корпоративные", image: "/3.jpg" },
];

export default function CategoryTiles() {
  const { toggleCategory, selectedCategories } = useShopStore();

  const goToCatalog = () => {
    const el = document.querySelector("#catalog");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onClick = (c: Category) => {
    if (!selectedCategories.includes(c)) toggleCategory(c);
    goToCatalog();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 mt-4">
      
    </section>
  );
}