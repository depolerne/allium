"use client";
import Header from "../../components/Header";
import { useShopStore } from "../../store/useShopStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const { login, register } = useShopStore();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "login") {
      login(email.trim());
    } else {
      register(name.trim() || "Гость", email.trim());
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="rounded-2xl border border-[var(--accent-strong)]/60 bg-[var(--panel-bg)] shadow-xl">
          <div className="flex">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 px-4 py-3 text-sm rounded-tl-2xl ${tab === "login" ? "bg-[var(--accent-strong)]/15" : ""}`}
            >
              Вход
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 px-4 py-3 text-sm rounded-tr-2xl ${tab === "register" ? "bg-[var(--accent-strong)]/15" : ""}`}
            >
              Регистрация
            </button>
          </div>
          <form onSubmit={onSubmit} className="p-4 space-y-3">
            {tab === "register" && (
              <div>
                <label className="block text-sm mb-1">Имя</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] text-[var(--foreground)] h-10 px-3 text-sm outline-none"
                  type="text"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] text-[var(--foreground)] h-10 px-3 text-sm outline-none"
                type="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Пароль</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] text-[var(--foreground)] h-10 px-3 text-sm outline-none"
                type="password"
                required
              />
            </div>
            <button type="submit" className="w-full rounded-xl bg-[var(--buy-button-bg)] text-[var(--foreground)] px-4 py-2 text-sm">
              {tab === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
