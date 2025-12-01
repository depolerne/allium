"use client";
import Image from "next/image";
 
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
 

export default function HeroShowcase() {
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

  

  return (
    <section className="mx-auto max-w-6xl px-4 mt-6">
      <div className="relative overflow-hidden rounded-2xl  bg-[var(--background)] h-[350px] sm:h-[420px] md:h-[320px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === i ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-[50%]  md:h-[320px] p-4 md:p-14 flex flex-col justify-center items-center md:items-start">
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-center md:text-left">{s.title}</h1>
                <p className="mt-2 text-sm md:text-base text-[var(--accent)] text-center md:text-left">{s.caption}</p>
                <div className="mt-4">
                  <button
                    onClick={() => goToCatalog()}
                    className="rounded-full border border-[var(--accent-strong)]/60 bg-[var(--buy-button-bg)] text-[var(--foreground)] px-5 py-2 text-sm hover:opacity-90"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="relative w-full h-full">
                <Image src={s.image} alt={s.title} width={960} height={720} className="w-full h-full object-cover fit-cover transition-transform duration-500 hover:scale-[1.02]" priority />
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

      
    </section>
  );
}
