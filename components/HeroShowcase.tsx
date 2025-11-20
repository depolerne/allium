"use client";
import Image from "next/image";
import { useShopStore } from "../store/useShopStore";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "../lib/types";

type MiniTile = {
  title: string;
  image: string;
  action:
    | { type: "category"; value: string }
    | { type: "price"; value: [number, number] };
};

const miniTiles: MiniTile[] = [
  { title: "Цветы", image: "/6.webp", action: { type: "category", value: "flowers" } },
  { title: "Вазы", image: "/vase.webp", action: { type: "category", value: "vases" } },
  { title: "Декор", image: "/dekor.jpg", action: { type: "category", value: "decorations" } },
  { title: "Подарки", image: "/podarok.webp", action: { type: "category", value: "gifts" } },
  { title: "Сеты", image: "/sets.jpg", action: { type: "category", value: "sets" } },
  { title: "Букеты", image: "/bukets.webp", action: { type: "category", value: "bouquets" } },
];

export default function HeroShowcase() {
  const { setPriceRange, minPrice, maxPrice, toggleCategory } = useShopStore();
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      id: "h1",
      title: "Скидки до 30% на выбранные товары",
      caption: "Букеты, вазы и подарки",
      image: "/5.webp",
      category: "flowers",
    },
    {
      id: "h2",
      title: "Букеты недели",
      caption: "Нежные композиции со скидкой",
      image: "/5.webp",
      category: "bouquets",
    },
    {
      id: "h3",
      title: "Вазы и декоры",
      caption: "Минимализм и стиль",
      image: "/5.webp",
      category: "vases",
    },
    {
      id: "h4",
      title: "Подарочные наборы",
      caption: "Удобно и красиво",
      image: "/5.webp",
      category: "gifts",
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 3000);
    return () => {
      if (timer.current) {
        window.clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [isHovered, slides.length]);

  const goToCatalog = () => {
    const el = document.querySelector("#catalog");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const applyAction = (a: MiniTile["action"]) => {
    if (a.type === "price") {
      const [from, to] = a.value;
      setPriceRange([Math.max(minPrice, from), Math.min(maxPrice, to)]);
    } else {
      toggleCategory(a.value as Category);
    }
    goToCatalog();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 mt-6">
      <div className="relative overflow-hidden rounded-2xl  bg-[var(--background)] min-h-[16rem] md:min-h-[360px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === i ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex">
              <div className="relative w-[50%] p-14 md:p-14 flex flex-col justify-center">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">{s.title}</h1>
                <p className="mt-2 text-sm md:text-base text-[var(--accent)]">{s.caption}</p>
                <div className="mt-4">
                  <button
                    onClick={() => goToCatalog()}
                    className="rounded-full border border-[var(--accent-strong)]/60 bg-[var(--buy-button-bg)] text-[var(--foreground)] px-5 py-2 text-sm hover:opacity-90"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="relative w-full">
                <Image src={s.image} alt={s.title} width={960} height={720} className="w-full h-64 md:h-[360px] object-cover fit-cover transition-transform duration-500 hover:scale-[1.02]" priority />
                {/* <div className="absolute inset-0 bg-[var(--hero-tint)] pointer-events-none" /> */}
              </div>
            </div>
          </div>
        ))}

        <button
          aria-label="Предыдущий слайд"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-2"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Следующий слайд"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-2"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {miniTiles.map((t, idx) => (
            <button
              key={idx}
              onClick={() => applyAction(t.action)}
              className={`group w-full rounded-2xl overflow-hidden border bg-[var(--background)] transition ${
                slides[index]?.category === (t.action.type === "category" ? (t.action.value as string) : "")
                  ? "border-[var(--accent-strong)] bg-[var(--accent-strong)]/10 scale-[1.02]"
                  : "border-[var(--accent-strong)] hover:bg-[var(--accent-strong)]/10 hover:scale-[1.01]"
              }`}
            >
              <div className="relative">
                <Image src={t.image} alt={t.title} width={160} height={120} className="w-full h-24 sm:h-28 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[var(--tile-tint)] opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
              <div className="px-2 py-2 text-center text-xs">{t.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
