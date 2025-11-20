"use client";
import Link from "next/link";
import { Heart, Search, ShoppingBag, User, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useShopStore } from "../store/useShopStore";

export default function Header() {
  const { setSearch, favorites, cart } = useShopStore();
  const favCount = Array.isArray(favorites) ? favorites.length : 0;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // прочитать текущую тему
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("allium-theme", next); } catch (_) {}
    setTheme(next);
  };

  return (
    <header className="sticky top-0 z-20 bg-[#C8BFB4] backdrop-blur border-b border-[var(--accent-strong)]/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4 text-[var(--foreground)]">
        <Link href="/" className="text-2xl font-semibold tracking-tight  hover:opacity-90 transition">
          allium
        </Link>
        <div className="flex-1" />
        <div className="relative w-full max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent)]">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--accent)] pl-10 pr-3 h-10 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-strong)] focus:border-[var(--accent-strong)]/60"
          />
        </div>
        <nav className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Переключить тему"
            title="Переключить тему"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition text-[var(--foreground)]"
          >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            <span className="text-sm">{theme === "light" ? "Светлая" : "Тёмная"}</span>
          </button>
          <Link
            href="/favorites"
            className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition"
            title="Избранное"
          >
            <Heart size={20} />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs rounded-full bg-[var(--badge-bg)] text-[var(--badge-fg)] px-1 shadow-sm">
                {favCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition"
            title="Корзина"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs rounded-full bg-[var(--badge-bg)] text-[var(--badge-fg)] px-1 shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="#"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition"
            title="Профиль"
          >
            <User size={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
}