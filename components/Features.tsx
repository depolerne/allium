"use client";
import { BadgeCheck, Leaf, Palette, Smile, Clock, Gift, Sparkles, ShieldCheck } from "lucide-react";
import { useState } from "react";

const featureSets = [
  [
    { icon: <BadgeCheck size={18} />, title: "Качество и сервис", desc: "Флористы собирают вручную и с любовью." },
    { icon: <Leaf size={18} />, title: "Осознанный подход", desc: "Экологичная упаковка и устойчивые практики." },
    { icon: <Palette size={18} />, title: "Стиль и индивидуальность", desc: "Создаём букеты, отражающие ваш вкус." },
    { icon: <Smile size={18} />, title: "Удобная покупка", desc: "Быстрый и приятный процесс." },
  ],
  [
    { icon: <Clock size={18} />, title: "Доставка в день заказа", desc: "Радость не ждёт." },
    { icon: <Gift size={18} />, title: "Персональные открытки", desc: "Добавим тёплое послание." },
    { icon: <Sparkles size={18} />, title: "Премиальная упаковка", desc: "Эстетика и аккуратная подача." },
    { icon: <ShieldCheck size={18} />, title: "Гарантия качества", desc: "Решаем вопросы быстро и заботливо." },
  ],
];

export default function Features() {
  const [setIndex, setSetIndex] = useState(0);
  const visible = featureSets[setIndex];
  return (
    <section className="mx-auto max-w-6xl px-4 mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Почему allium</h2>
        <div className="inline-flex gap-2">
          <button onClick={() => setSetIndex(0)} className={`rounded-full px-3 py-1 text-xs border ${setIndex===0?"bg-[var(--accent-strong)]/20":""}`}>1</button>
          <button onClick={() => setSetIndex(1)} className={`rounded-full px-3 py-1 text-xs border ${setIndex===1?"bg-[var(--accent-strong)]/20":""}`}>2</button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visible.map((f, i) => (
          <div key={i} className="group rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] p-4 shadow-sm transition hover:bg-[var(--accent-strong)]/15">
            <div className="inline-flex items-center gap-2 text-[var(--accent-strong)]">
              {f.icon}
              <span className="text-sm font-semibold">{f.title}</span>
            </div>
            <p className="mt-2 text-sm text-[var(--accent)]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}