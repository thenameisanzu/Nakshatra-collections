"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";
import { Check, ChevronDown, Palette, Sparkles } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return (
      <div className="h-9 w-9 sm:w-28 rounded-full border opacity-50" style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-surface)" }} />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Liquid Glass Floating Theme Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all duration-300 liquid-glass liquid-glass-hover active:scale-95 cursor-pointer shadow-xs"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={`Current Theme: ${current.name}. Click to switch theme.`}
      >
        {/* Swatch Trio */}
        <div className="flex items-center">
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-black/15 shadow-2xs"
            style={{ backgroundColor: current.colors.bg }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-black/15 shadow-2xs -ml-1"
            style={{ backgroundColor: current.colors.accent }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full ring-1 ring-black/15 shadow-2xs -ml-1"
            style={{ backgroundColor: current.colors.cta }}
          />
        </div>

        <span className="hidden sm:inline-block font-sans tracking-wide text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>
          {current.name}
        </span>

        <ChevronDown
          className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:opacity-100"
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            color: "var(--text-primary)",
          }}
        />
      </button>

      {/* Floating 3-Theme Selector Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-3xl p-3 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-200 liquid-glass"
          style={{
            backgroundColor: "var(--bg-surface-elevated)",
            borderColor: "var(--border-medium)",
          }}
        >
          {/* Header */}
          <div className="px-3 py-2 border-b mb-1.5 flex items-center justify-between" style={{ borderColor: "var(--border-subtle)" }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                3 Visual Themes
              </p>
              <p className="text-xs font-serif-luxury mt-0.5" style={{ color: "var(--text-secondary)" }}>
                Select Storefront Atmosphere
              </p>
            </div>
            <Sparkles className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
          </div>

          {/* Theme Options */}
          <div className="flex flex-col gap-1.5">
            {THEMES.map((opt) => {
              const isSelected = opt.id === theme;
              return (
                <button
                  key={opt.id}
                  role="option"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between rounded-2xl p-2.5 text-left transition-all duration-200 group/item cursor-pointer hover:translate-x-1"
                  style={{
                    backgroundColor: isSelected ? "var(--tag-bg)" : "transparent",
                    border: isSelected ? "1px solid var(--accent-gold)" : "1px solid transparent",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Visual Color Swatch Capsule */}
                    <div
                      className="flex items-center p-1 rounded-full border shadow-2xs"
                      style={{
                        backgroundColor: opt.colors.bg,
                        borderColor: "rgba(0,0,0,0.12)",
                      }}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full shadow-xs"
                        style={{ backgroundColor: opt.colors.accent }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full -ml-1.5 shadow-xs"
                        style={{ backgroundColor: opt.colors.cta }}
                      />
                    </div>

                    <div>
                      <div
                        className="text-xs font-semibold tracking-wide font-serif-luxury"
                        style={{
                          color: isSelected ? "var(--accent-cta)" : "var(--text-primary)",
                        }}
                      >
                        {opt.name}
                      </div>
                      <div className="text-[10px] tracking-wider" style={{ color: "var(--text-muted)" }}>
                        {opt.tagline}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      className="flex h-5 w-5 items-center justify-center rounded-full text-white shadow-xs"
                      style={{ backgroundColor: "var(--accent-cta)" }}
                    >
                      <Check className="h-3 w-3 stroke-3" />
                    </div>
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
