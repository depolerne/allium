"use client";
import Image from "next/image";

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
              <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full opacity-25  bg-[#C8BFB4]" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-20  bg-[#C8BFB4]" />

              <div className="relative z-10 max-w-xl">
                <h2 className="text-2xl text-white md:text-3xl font-bold tracking-tight animate-fadeInUp">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm md:text-base text-zinc-300 animate-fadeInUp" style={{animationDelay: "80ms"}}>
                  {s.caption}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="#catalog"
                    className="rounded-xl bg-black text-white px-4 py-2 text-sm hover:bg-zinc-800 transition shadow-sm"
                  >
                    Смотреть каталог
                  </a>
                  <a
                    href="#explore"
                    className="rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-200 px-4 py-2 text-sm hover:bg-zinc-800 transition"
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