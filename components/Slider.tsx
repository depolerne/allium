"use client";

const slides = [
  {
    id: 1,
    title: "Свежие букеты к любому случаю",
    caption: "Собираем вручную. Доставка день-в-день.",
    image: "/test1.png",
    bg: "bg-brand",
  },
  {
    id: 2,
    title: "Минимализм, стиль и внимание к деталям",
    caption: "Создаём композиции, которые запоминаются.",
    image: "/test2.png",
    bg: "bg-brand",
  },
  {
    id: 3,
    title: "Подарочные наборы и корпоративные решения",
    caption: "Брендируем под ваш стиль и события.",
    image: "/test2.png",
    bg: "bg-brand",
  },
];

export default function Slider() {
  return (
    <div className="mx-auto max-w-6xl px-4 mt-6">
      <div className="relative overflow-hidden rounded-2xl ">
        <div className="flex animate-slide">
          {slides.map((s) => (
            <div
              key={s.id}
              className={`${s.bg} relative min-w-full flex items-center justify-between px-8 py-8`}
            >
              {/* Мягкие фоновые пятна */}
              <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full bg-[var(--accent-strong)]/25" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[var(--accent-strong)]/20" />

              <div className="relative z-10 max-w-xl">
                <h2 className="text-2xl text-[var(--foreground)] md:text-3xl font-bold tracking-tight animate-fadeInUp">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm md:text-base text-[var(--accent)] animate-fadeInUp" style={{animationDelay: "80ms"}}>
                  {s.caption}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="#catalog"
                    className="rounded-xl bg-[var(--buy-button-bg)] text-[var(--foreground)] px-4 py-2 text-sm hover:opacity-90 transition shadow-sm"
                  >
                    Смотреть каталог
                  </a>
                  <a
                    href="#explore"
                    className="rounded-xl border border-[var(--accent-strong)] bg-[var(--background)] text-[var(--foreground)] px-4 py-2 text-sm hover:bg-[var(--accent-strong)]/20 transition"
                  >
                    Узнать больше
                  </a>
                </div>
              </div>

              {/* <div className="relative z-10">
                <Image
                  src={s.image}
                  alt={s.title}
                  width={220}
                  height={160}
                  className="rounded-xl shadow-sm animate-float"
                />
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}