"use client";
import { useShopStore } from "../store/useShopStore";
import type { Category, Recipient } from "../lib/types";
import { useState, useRef } from "react";

const baseCategories: Category[] = [
  "flowers",
  "vases",
  "decorations",
  "gifts",
  "sets",
  "bouquets",
];

const categoryLabels: Record<Category, string> = {
  flowers: "Цветы",
  vases: "Вазы",
  decorations: "Декорации",
  corporate: "Корпоративные",
  newyear: "Новый год",
  gifts: "Подарки",
  sets: "Сеты",
  bouquets: "Букеты",
};

const familyRecipients: Recipient[] = ["wife", "mom", "children"];

export default function Categories() {
  const {
    selectedCategories,
    toggleCategory,
    clearCategories,
    selectedRecipients,
    toggleRecipient,
  } = useShopStore();

  const [openKey, setOpenKey] = useState<null | "decorations" | "gifts">(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenKey(null), 150);
  };

  const isCatActive = (c: Category) => Array.isArray(selectedCategories) && selectedCategories.includes(c);
  const isSubActive = (c: Category) => isCatActive(c);
  const isFamilyActive = familyRecipients.some((r) => selectedRecipients.includes(r));
  const isFriendsActive = selectedRecipients.includes("friend");

  const toggleFamilyGroup = () => {
    const allSelected = familyRecipients.every((r) => selectedRecipients.includes(r));
    familyRecipients.forEach((r) => {
      const shouldToggle = allSelected || !selectedRecipients.includes(r);
      if (shouldToggle) toggleRecipient(r);
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 mt-6">
      {/* <div className="flex justify-end items-center mb-3">
    
        <button
          className="text-sm text-zinc-600 hover:text-zinc-900"
          onClick={() => clearCategories()}
        >
          Сбросить
        </button>
      </div> */}

      <div className="flex items-stretch gap-2 justify-between">
        {baseCategories.map((c) => {
          const active = isCatActive(c);
          const hasDropdown = c === "decorations" || c === "gifts";
          return (
            <div
              key={c}
              className="relative group flex-1 min-w-[120px]"
              onMouseEnter={() => {
                cancelClose();
                setOpenKey(hasDropdown ? (c as "decorations" | "gifts") : null);
              }}
              onMouseLeave={() => {
                if (hasDropdown) scheduleClose();
              }}
            >
              <button
                onClick={() => {
                  clearCategories();
                  toggleCategory(c);
                }}
                aria-haspopup={hasDropdown ? "menu" : undefined}
                aria-expanded={hasDropdown ? openKey === c : undefined}
                className={`w-full text-center rounded-xl border px-3 py-2 text-sm transition ${
                  active
                    ? "border-[var(--accent-strong)]/60 bg-[var(--background)]/20 text-[var(--foreground)] shadow-sm"
                    : "border-[var(--accent-strong)]/60  bg-[var(--background)] hover:bg-[var(--accent-strong)]/15"
                }`}
              >
                {categoryLabels[c]}
              </button>

              {hasDropdown && openKey === c && (
                <div
                  className="absolute left-0 top-full mt-2 z-30 w-56 rounded-xl border border-[var(--accent-strong)]/60 bg-[var(--background)] shadow-lg p-2"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  {c === "decorations" && (
                    <div>
                      <button
                        onClick={() => {
                          clearCategories();
                          toggleCategory("corporate");
                        }}
                        className={`flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm transition ${
                          isSubActive("corporate") ? "bg-[var(--accent-strong)]/20 text-[var(--foreground)]" : "hover:bg-[var(--accent-strong)]/15"
                        }`}
                      >
                        <span>{categoryLabels["corporate"]}</span>
                        {isSubActive("corporate") && <span>✓</span>}
                      </button>
                      <button
                        onClick={() => {
                          clearCategories();
                          toggleCategory("newyear");
                        }}
                        className={`mt-1 flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm transition ${
                          isSubActive("newyear") ? "bg-[var(--accent-strong)]/20 text-[var(--foreground)]" : "hover:bg-[var(--accent-strong)]/15"
                        }`}
                      >
                        <span>{categoryLabels["newyear"]}</span>
                        {isSubActive("newyear") && <span>✓</span>}
                      </button>
                    </div>
                  )}
                  {c === "gifts" && (
                    <div>
                      <button
                        onClick={toggleFamilyGroup}
                        className={`flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm transition ${
                          isFamilyActive ? "bg-[var(--accent-strong)]/20 text-[var(--foreground)]" : "hover:bg-[var(--accent-strong)]/15"
                        }`}
                      >
                        <span>Для семьи</span>
                        {isFamilyActive && <span>✓</span>}
                      </button>
                      <button
                        onClick={() => toggleRecipient("friend")}
                        className={`mt-1 flex w-full items-center justify-between rounded-sm px-2 py-2 text-sm transition ${
                          isFriendsActive ? "bg-[var(--accent-strong)]/20 text-[var(--foreground)]" : "hover:bg-[var(--accent-strong)]/15"
                        }`}
                      >
                        <span>Для друзей</span>
                        {isFriendsActive && <span>✓</span>}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}