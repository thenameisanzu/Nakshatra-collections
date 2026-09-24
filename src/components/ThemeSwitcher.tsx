"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, THEMES, ThemeType } from "@/context/ThemeContext";
import { Sparkles, Check, ChevronDown } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = THEMES.find((t) => t.id === theme) || THEMES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 border"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-medium)",
          color: "var(--text-primary)",
        }}
        aria-label="Change Visual Theme"
      >
        <div className="flex items-center gap-1">
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
            style={{ backgroundColor: current.colors.accent }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10 -ml-1"
            style={{ backgroundColor: current.colors.cta }}
          />
        </div>
        <span className="hidden sm:inline-block font-sans tracking-wide">
          {current.name}
        </span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-2xl p-2 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{
            backgroundColor: "var(--bg-surface-elevated)",
            borderColor: "var(--border-medium)",
          }}
        >
          <div className="px-3 py-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--accent-gold)" }}>
              Storefront Theme
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              Select your aesthetic mood
            </p>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            {THEMES.map((opt) => {
              const isSelected = opt.id === theme;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all duration-150 group"
                  style={{
                    backgroundColor: isSelected ? "var(--tag-bg)" : "transparent",
                    color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Swatches */}
                    <div className="flex items-center">
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10 shadow-xs"
                        style={{ backgroundColor: opt.colors.bg }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10 -ml-1.5 shadow-xs"
                        style={{ backgroundColor: opt.colors.accent }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10 -ml-1.5 shadow-xs"
                        style={{ backgroundColor: opt.colors.cta }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{opt.name}</div>
                      <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {opt.tagline}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-4 w-4 shrink-0" style={{ color: "var(--accent-cta)" }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
