"use client";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Leaf, Palette, Smile, ChevronLeft, ChevronRight, Clock, Gift, Sparkles, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const featureSets = [
    [
      { icon: <BadgeCheck size={18} />, title: "Качество и сервис", desc: "Наши флористы собирают букеты вручную и с любовью." },
      { icon: <Leaf size={18} />, title: "Осознанный подход", desc: "Используем устойчивые практики и экологичную упаковку." },
      { icon: <Palette size={18} />, title: "Стиль и индивидуальность", desc: "Создаём букеты, отражающие ваш вкус и настроение." },
      { icon: <Smile size={18} />, title: "Удовольствие от покупки", desc: "Делаем процесс покупки простым и приятным." },
    ],
    [
      { icon: <Clock size={18} />, title: "Доставка в день заказа", desc: "Быстро привозим по городу — радость не ждёт." },
      { icon: <Gift size={18} />, title: "Персональные открытки", desc: "Добавим послание, которое скажет больше, чем слова." },
      { icon: <Sparkles size={18} />, title: "Премиальная упаковка", desc: "Эстетичные материалы и аккуратная подача." },
      { icon: <ShieldCheck size={18} />, title: "Гарантия качества", desc: "Если что-то не так — решим быстро и заботливо." },
    ],
  ];

  const [setIndex, setSetIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const visible = featureSets[setIndex];

  const triggerZoom = () => {
    setZoom(true);
    setTimeout(() => setZoom(false), 500);
  };

  const prev = () => {
    setSetIndex((i) => (i - 1 + featureSets.length) % featureSets.length);
    triggerZoom();
  };
  const next = () => {
    setSetIndex((i) => (i + 1) % featureSets.length);
    triggerZoom();
  };

  return (
    <section className="relative border-b border-[var(--accent-strong)]/60 bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Заголовок */}
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1]">
            Your Floral <span className="brand-gradient-text">Wonderland</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--accent)]">
            Откройте allium: где мастерство флористов встречается с вашими эмоциями.
          </p>
        </div>

        {/* Основная композиция: текст — изображение — текст */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Левая колонка описания */}
          <div className="order-2 md:order-1 space-y-4">
            {visible.slice(0, 2).map((f, i) => (
              <div
                key={i}
                className="group rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] p-4 shadow-sm transition hover:bg-[var(--accent-strong)]/15 hover:shadow-md hover:scale-[1.02]"
              >
                <div className="inline-flex items-center gap-2 text-[var(--accent-strong)]">
                  {f.icon}
                  <span className="text-sm font-semibold">{f.title}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--accent)]">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Центральная колонка с букетом */}
          <div className="order-1 md:order-2 relative flex items-center justify-center">
            {/* Пастельная подложка */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[68%] rounded-2xl bg-[var(--hero-tint)] backdrop-blur-sm" />
            <Image
              src="/main.png"
              alt="Hero Bouquet"
              width={640}
              height={800}
              className={`relative z-10 w-full max-w-[420px] h-auto object-cover transition-transform duration-500 ease-out ${zoom ? 'scale-[1.06]' : 'scale-100'}`}
            />
            {/* Кнопка Shop Now */}
            <Link
              href="#catalog"
              className="absolute z-10 bottom-4  left-1/2 -translate-x-1/2 rounded-full border border-[var(--accent-strong)]/60 bg-[var(--buy-button-bg)] text-[var(--foreground)] px-4 py-2 text-sm shadow-sm hover:opacity-90 transition"
            >
              Shop Now
            </Link>
            {/* Стрелки для переключения преимуществ */}
            <button
              aria-label="Предыдущие преимущества"
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center justify-center rounded-full p-2 border border-[var(--accent-strong)]/60 bg-[var(--background)] text-[var(--foreground)] shadow-sm hover:bg-[var(--accent-strong)]/15 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              aria-label="Следующие преимущества"
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center justify-center rounded-full p-2 border border-[var(--accent-strong)]/60 bg-[var(--background)] text-[var(--foreground)] shadow-sm hover:bg-[var(--accent-strong)]/15 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Правая колонка описания */}
          <div className="order-3 md:order-3 space-y-4">
            {visible.slice(2, 4).map((f, i) => (
              <div
                key={i}
                className="group rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] p-4 shadow-sm transition hover:bg-[var(--accent-strong)]/15 hover:shadow-md hover:scale-[1.02]"
              >
                <div className="inline-flex items-center gap-2 text-[var(--accent-strong)]">
                  {f.icon}
                  <span className="text-sm font-semibold">{f.title}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--accent)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Логотипы-плейсхолдеры снизу */}
       
      </div>
    </section>
  );
}