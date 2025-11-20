"use client";
import Link from "next/link";
import { Heart, Search, ShoppingBag, User, Sun, Moon, X } from "lucide-react";
import { useRef, useState } from "react";
import { useShopStore } from "../store/useShopStore";

export default function Header() {
  const { setSearch, favorites, cart } = useShopStore();
  const favCount = Array.isArray(favorites) ? favorites.length : 0;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const [theme, setTheme] = useState<string>(() => (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme")) || "light");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("allium-theme", next); } catch {}
    setTheme(next);
  };

  const openMobileSearch = () => {
    setMobileSearchOpen(true);
    setTimeout(() => mobileSearchRef.current?.focus(), 0);
  };
  const closeMobileSearch = () => setMobileSearchOpen(false);

  return (
    <header className="sticky top-0 z-20 bg-[var(--background)] backdrop-blur border-b border-[var(--accent-strong)]/60">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 text-[var(--foreground)]">
        <Link href="/" className="text-2xl font-semibold tracking-tight  hover:opacity-90 transition">
          allium
        </Link>
        <button type="button" onClick={openMobileSearch} className="sm:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-[var(--accent-strong)]/20 transition" aria-label="Поиск">
          <Search size={18} />
        </button>
        <div className="flex-1" />
        <div className="relative w-full max-w-md hidden sm:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent)]">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--accent)] pl-10 pr-3 h-9 sm:h-10 text-sm outline-none focus:ring-2 focus:ring-[var(--accent-strong)] focus:border-[var(--accent-strong)]/60"
          />
        </div>
        <nav className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Переключить тему"
            title="Переключить тему"
            className="inline-flex items-center gap-2 rounded-xl px-2 sm:px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition text-[var(--foreground)]"
          >
            {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            <span className="hidden sm:inline text-sm">{theme === "light" ? "Светлая" : "Тёмная"}</span>
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

      {mobileSearchOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--background)]/60">
          <div className="mx-auto max-w-6xl px-3 py-3 mt-12 bg-[var(--buy-button-bg)]">
            <div className="rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] p-2 flex items-center gap-2">
              <span className="text-[var(--accent)]"><Search size={18} /></span>
              <input
                ref={mobileSearchRef}
                type="text"
                placeholder="Поиск..."
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 rounded-md text-[var(--foreground)] placeholder-[var(--accent)] h-10 text-sm outline-none"
              />
              <button type="button" onClick={closeMobileSearch} className="inline-flex items-center justify-center rounded-md p-2 hover:bg-[var(--accent-strong)]/20 transition" aria-label="Закрыть">
                <X size={16} />
              </button>
            </div>
          </div>
          <button className="absolute inset-0" onClick={closeMobileSearch} aria-hidden="true" />
        </div>
      )}
    </header>
  );
}