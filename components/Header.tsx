"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Search, ShoppingBag, User, Sun, Moon, X, Globe, Instagram, Facebook, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useShopStore } from "../store/useShopStore";

export default function Header() {
  const { setSearch, favorites, cart, products, addToCart, removeFromCart, toggleFavorite } = useShopStore();
  const favCount = Array.isArray(favorites) ? favorites.length : 0;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const [theme, setTheme] = useState<string>(() => (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme")) || "light");
  const [lang, setLang] = useState<string>(() => {
    if (typeof document !== "undefined") {
      const saved = (() => { try { return localStorage.getItem("allium-lang") } catch { return null } })();
      const initial = saved || "ru";
      document.documentElement.setAttribute("lang", initial);
      return initial;
    }
    return "ru";
  });
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const update = () => setHeaderHeight(headerRef.current ? headerRef.current.offsetHeight : 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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

  const openFavorites = () => { setFavoritesOpen(true); setMobileSearchOpen(false); };
  const closeFavorites = () => setFavoritesOpen(false);
  const openCart = () => { setCartOpen(true); setMobileSearchOpen(false); };
  const closeCart = () => setCartOpen(false);
  const applyLang = (l: string) => {
    setLang(l);
    if (typeof document !== "undefined") document.documentElement.setAttribute("lang", l);
    try { localStorage.setItem("allium-lang", l); } catch {}
    setLangOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-20 bg-[var(--background)] backdrop-blur border-b border-[var(--accent-strong)]/60">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 text-[var(--foreground)]">
        <Link href="/" className="text-2xl font-semibold tracking-tight  hover:opacity-90 transition">
          allium
        </Link>
        <button type="button" onClick={() => setMenuOpen(true)} className="sm:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-[var(--accent-strong)]/20 transition" aria-label="Меню">
          <Menu size={18} />
        </button>
        <button type="button" onClick={openMobileSearch} className="sm:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-[var(--accent-strong)]/20 transition" aria-label="Поиск">
          <Search size={18} />
        </button>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Меню"
          title="Меню"
          className="hidden sm:inline-flex items-center justify-center rounded-xl p-2 hover:bg-[var(--accent-strong)]/20 transition ml-1"
        >
          <Menu size={18} />
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
        <nav className="flex items-center gap-2 sm:gap-3">
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
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Выбрать язык"
              title="Язык"
              className="inline-flex items-center gap-2 rounded-xl px-2 sm:px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition text-[var(--foreground)]"
            >
              <Globe size={20} />
              <span className="hidden sm:inline text-sm uppercase">{lang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 z-50 min-w-[160px] rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--panel-bg)] shadow-md p-1">
                <button type="button" onClick={() => applyLang("ru")} className={`w-full text-left px-3 py-2 rounded-lg ${lang === "ru" ? "bg-[var(--accent-strong)]/15" : ""}`}>Русский</button>
                <button type="button" onClick={() => applyLang("en")} className={`w-full text-left px-3 py-2 rounded-lg ${lang === "en" ? "bg-[var(--accent-strong)]/15" : ""}`}>English</button>
                <button type="button" onClick={() => applyLang("az")} className={`w-full text-left px-3 py-2 rounded-lg ${lang === "az" ? "bg-[var(--accent-strong)]/15" : ""}`}>Azərbaycanca</button>
              </div>
            )}
          </div>
          <button
            onClick={openFavorites}
            className="relative inline-flex items-center gap-2 rounded-xl px-2 sm:px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition"
            title="Избранное"
            aria-haspopup="dialog"
          >
            <Heart size={20} />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs rounded-full bg-[var(--badge-bg)] text-[var(--badge-fg)] px-1 shadow-sm">
                {favCount}
              </span>
            )}
          </button>
          <button
            onClick={openCart}
            className="relative inline-flex items-center gap-2 rounded-xl px-2 sm:px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition"
            title="Корзина"
            aria-haspopup="dialog"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs rounded-full bg-[var(--badge-bg)] text-[var(--badge-fg)] px-1 shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-xl px-2 sm:px-3 py-2 hover:bg-[var(--accent-strong)]/20 transition"
            title="Профиль"
          >
            <User size={20} />
          </Link>
        </nav>
      </div>

      {mobileSearchOpen && (
        <div className="fixed left-0 right-0 bottom-0 z-40 bg-[var(--background)]" style={{ top: headerHeight }}>
          <div className="mx-auto max-w-6xl px-3 pt-3">
            <div className="rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--panel-bg)] p-2 flex items-center gap-2">
              <span className="text-[var(--accent)]"><Search size={18} /></span>
              <input
                ref={mobileSearchRef}
                type="text"
                placeholder="Поиск..."
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 rounded-md bg-transparent text-[var(--foreground)] placeholder-[var(--accent)] h-10 text-sm outline-none"
              />
              <button type="button" onClick={closeMobileSearch} className="inline-flex items-center justify-center rounded-md p-2 hover:bg-[var(--accent-strong)]/20 transition" aria-label="Закрыть">
                <X size={16} />
              </button>
            </div>
          </div>
          <button className="absolute inset-0" onClick={closeMobileSearch} aria-hidden="true" />
        </div>
      )}

      {menuOpen && (
        <div className="fixed left-0 right-0 bottom-0 z-50 bg-[var(--background)]" style={{ top: headerHeight }}>
          <div className="mx-auto max-w-3xl px-4 pt-6">
            <div className="rounded-2xl border border-[var(--accent-strong)]/60 bg-[var(--panel-bg)] shadow-xl">
              <div className="flex items-center justify-between p-3 border-b border-[var(--accent-strong)]/40">
                <h2 className="text-base font-semibold">Меню</h2>
                <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-[var(--accent-strong)]/20 transition" onClick={() => setMenuOpen(false)} aria-label="Закрыть">
                  <X size={16} />
                </button>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link href="/#catalog" className="rounded-xl border border-[var(--accent-strong)]/60 px-4 py-3 hover:bg-[var(--accent-strong)]/10 transition">Каталог</Link>
                  <Link href="/#about" className="rounded-xl border border-[var(--accent-strong)]/60 px-4 py-3 hover:bg-[var(--accent-strong)]/10 transition">О нас</Link>
                  <Link href="/#contacts" className="rounded-xl border border-[var(--accent-strong)]/60 px-4 py-3 hover:bg-[var(--accent-strong)]/10 transition">Контакты</Link>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button type="button" onClick={toggleTheme} className="rounded-xl border border-[var(--accent-strong)]/60 px-4 py-3 hover:bg-[var(--accent-strong)]/10 transition">
                    {theme === "light" ? "Тёмная тема" : "Светлая тема"}
                  </button>
                  <div className="sm:col-span-2 flex items-center gap-2 justify-center sm:justify-start">
                    <button type="button" onClick={() => applyLang("ru")} className={`rounded-xl border border-[var(--accent-strong)]/60 px-3 py-2 ${lang === "ru" ? "bg-[var(--accent-strong)]/15" : "hover:bg-[var(--accent-strong)]/10"}`}>RU</button>
                    <button type="button" onClick={() => applyLang("en")} className={`rounded-xl border border-[var(--accent-strong)]/60 px-3 py-2 ${lang === "en" ? "bg-[var(--accent-strong)]/15" : "hover:bg-[var(--accent-strong)]/10"}`}>EN</button>
                    <button type="button" onClick={() => applyLang("az")} className={`rounded-xl border border-[var(--accent-strong)]/60 px-3 py-2 ${lang === "az" ? "bg-[var(--accent-strong)]/15" : "hover:bg-[var(--accent-strong)]/10"}`}>AZ</button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 justify-center">
                  <Link href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-[var(--accent-strong)]/20 transition" aria-label="Instagram"><Instagram size={20} /></Link>
                  <Link href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-[var(--accent-strong)]/20 transition" aria-label="TikTok">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 6.5c1.1 1.1 2.4 1.8 3.9 2v3.1c-1.9-.1-3.7-.7-5.3-1.8v6.2c0 3.8-3.1 6.8-6.9 6.8-1.9 0-3.6-.8-4.9-2.1A6.86 6.86 0 0 1 2 16.1c0-3.8 3.1-6.8 6.9-6.8.3 0 .6 0 .9.1v3.5c-.3-.1-.6-.1-.9-.1-1.8 0-3.3 1.4-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.4 3.3-3.3V2h3.7c.3 1.7 1 3.1 1.6 4.5Z"/></svg>
                  </Link>
                  <Link href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-[var(--accent-strong)]/20 transition" aria-label="Facebook"><Facebook size={20} /></Link>
                </div>
              </div>
            </div>
          </div>
          <button className="absolute inset-0" onClick={() => setMenuOpen(false)} aria-hidden="true" />
        </div>
      )}

      {/* Favorites Modal */}
      {favoritesOpen && (
        <div className="fixed left-0 right-0 bottom-0 z-50 bg-[var(--background)]" style={{ top: headerHeight }}>
          <div className="mx-auto max-w-3xl px-4 pt-6">
            <div className="rounded-2xl border border-[var(--accent-strong)]/60 bg-[var(--panel-bg)] shadow-xl">
              <div className="flex items-center justify-between p-3 border-b border-[var(--accent-strong)]/40">
                <h2 className="text-base font-semibold">Избранное</h2>
                <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-[var(--accent-strong)]/20 transition" onClick={closeFavorites} aria-label="Закрыть">
                  <X size={16} />
                </button>
              </div>
              <div className="p-3">
                {Array.isArray(favorites) && favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.filter((p) => favorites.includes(p.id)).map((p) => (
                      <div key={p.id} className="flex items-center gap-3 rounded-xl border border-[var(--accent-strong)]/60 p-2 bg-[var(--background)]">
                        <Image src={p.image} alt={p.title} width={72} height={72} className="h-18 w-18 rounded-lg object-cover" />
                        <div className="flex-1">
                          <div className="text-sm font-medium truncate">{p.title}</div>
                          <div className="text-xs text-[var(--accent)]">{p.price} ₼</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => toggleFavorite(p.id)} className="rounded-full p-2 border border-[var(--accent-strong)]/60 hover:bg-[var(--accent-strong)]/15 transition" aria-label="Убрать из избранного">
                            <Heart size={16} />
                          </button>
                          <button onClick={() => addToCart(p.id)} className="rounded-xl bg-[var(--buy-button-bg)] text-[var(--foreground)] px-3 py-2 text-xs hover:opacity-90 transition">
                            В корзину
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--accent)]">Список избранного пуст.</p>
                )}
              </div>
            </div>
          </div>
          <button className="absolute inset-0" onClick={closeFavorites} aria-hidden="true" />
        </div>
      )}

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed left-0 right-0 bottom-0 z-50 bg-[var(--background)]" style={{ top: headerHeight }}>
          <div className="mx-auto max-w-3xl px-4 pt-6">
            <div className="rounded-2xl border border-[var(--accent-strong)]/60 bg-[var(--panel-bg)] shadow-xl">
              <div className="flex items-center justify-between p-3 border-b border-[var(--accent-strong)]/40">
                <h2 className="text-base font-semibold">Корзина</h2>
                <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-[var(--accent-strong)]/20 transition" onClick={closeCart} aria-label="Закрыть">
                  <X size={16} />
                </button>
              </div>
              <div className="p-3">
                {Object.keys(cart).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(cart).map(([id, qty]) => {
                      const product = products.find((p) => p.id === id);
                      if (!product) return null;
                      return (
                        <div key={id} className="flex items-center gap-3 rounded-xl border border-[var(--accent-strong)]/60 p-2 bg-[var(--background)]">
                          <Image src={product.image} alt={product.title} width={72} height={72} className="h-18 w-18 rounded-lg object-cover" />
                          <div className="flex-1">
                            <div className="text-sm font-medium truncate">{product.title}</div>
                            <div className="text-xs text-[var(--accent)]">{product.price} ₼</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => removeFromCart(id)} className="rounded-lg border border-[var(--accent-strong)]/60 px-2 py-1" aria-label="Убавить">−</button>
                            <span className="w-8 text-center">{qty}</span>
                            <button onClick={() => addToCart(id)} className="rounded-lg border border-[var(--accent-strong)]/60 px-2 py-1" aria-label="Добавить">+</button>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between border-t border-[var(--accent-strong)]/60 pt-3">
                      <div className="text-sm font-semibold">Итого: {Object.entries(cart).reduce((sum, [id, qty]) => {
                        const p = products.find((x) => x.id === id);
                        return sum + (p ? p.price * qty : 0);
                      }, 0)} ₼</div>
                      <button className="rounded-xl bg-[var(--buy-button-bg)] text-[var(--foreground)] px-4 py-2 text-sm">Оформить заказ</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[var(--accent)]">Корзина пуста.</p>
                )}
              </div>
            </div>
          </div>
          <button className="absolute inset-0" onClick={closeCart} aria-hidden="true" />
        </div>
      )}
    </header>
  );
}
