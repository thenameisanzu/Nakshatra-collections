"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";
import { Check, Palette, Sparkles } from "lucide-react";

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
      <div className="h-8.5 w-8.5 rounded-full border opacity-50" style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-surface)" }} />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sleek Minimalist Palette Icon Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all duration-300 liquid-glass hover:border-[color:var(--accent-gold)] active:scale-95 cursor-pointer shadow-2xs"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={`Store Theme: ${current.name}. Click to switch theme palette.`}
      >
        <Palette className="h-4 w-4 transition-transform group-hover:rotate-12" style={{ color: "var(--text-secondary)" }} />
        
        {/* Active Theme Color Micro-Indicator */}
        <span
          className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 shadow-xs transition-colors"
          style={{
            backgroundColor: current.colors.cta,
            borderColor: "var(--bg-primary)",
          }}
        />
      </button>

      {/* Floating 6-Theme Selector Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2.5 w-72 max-w-[calc(100vw-2rem)] rounded-3xl p-3 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-200 liquid-glass"
          style={{
            backgroundColor: "var(--bg-surface-elevated)",
            borderColor: "var(--border-medium)",
          }}
        >
          {/* Header */}
          <div className="px-3 py-2 border-b mb-1.5 flex items-center justify-between" style={{ borderColor: "var(--border-subtle)" }}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                Storefront Palette
              </p>
              <p className="text-xs font-serif mt-0.5" style={{ color: "var(--text-secondary)" }}>
                Select Color Theme (6)
              </p>
            </div>
            <Sparkles className="h-4 w-4" style={{ color: "var(--accent-gold)" }} />
          </div>

          {/* Theme Options */}
          <div className="flex flex-col gap-1 max-h-[340px] overflow-y-auto no-scrollbar">
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
                        className="h-3 w-3 rounded-full shadow-xs"
                        style={{ backgroundColor: opt.colors.accent }}
                      />
                      <span
                        className="h-3 w-3 rounded-full -ml-1.5 shadow-xs"
                        style={{ backgroundColor: opt.colors.cta }}
                      />
                    </div>

                    <div>
                      <div
                        className="text-xs font-semibold tracking-wide font-serif"
                        style={{
                          color: isSelected ? "var(--accent-cta)" : "var(--text-primary)",
                        }}
                      >
                        {opt.name}
                      </div>
                      <div className="text-[9.5px] tracking-wider opacity-70" style={{ color: "var(--text-muted)" }}>
                        {opt.tagline}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      className="flex h-4.5 w-4.5 items-center justify-center rounded-full text-white shadow-xs"
                      style={{ backgroundColor: "var(--accent-cta)" }}
                    >
                      <Check className="h-2.5 w-2.5 stroke-3" />
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
