"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType =
  | "champagne-luxury"
  | "soft-blush"
  | "sage-contemporary"
  | "royal-sapphire"
  | "velvet-plum"
  | "terracotta-gold";

export interface ThemeOption {
  id: ThemeType;
  name: string;
  tagline: string;
  colors: {
    bg: string;
    accent: string;
    cta: string;
  };
}

export const THEMES: ThemeOption[] = [
  {
    id: "champagne-luxury",
    name: "Champagne Gold & Burgundy",
    tagline: "Ivory, Gold & Deep Burgundy (Top Choice)",
    colors: {
      bg: "#FFF9EF",
      accent: "#C9A45C",
      cta: "#6B1E2E",
    },
  },
  {
    id: "soft-blush",
    name: "Soft Blush & Gold",
    tagline: "Blush Pink, Champagne Gold & White",
    colors: {
      bg: "#FFFFFF",
      accent: "#C8A45D",
      cta: "#8A3D52",
    },
  },
  {
    id: "sage-contemporary",
    name: "Sage Green & Gold",
    tagline: "Sage, Warm Cream & Muted Gold",
    colors: {
      bg: "#FAF5EA",
      accent: "#B8944D",
      cta: "#2E4633",
    },
  },
  {
    id: "royal-sapphire",
    name: "Royal Sapphire & Gold",
    tagline: "Celestial Navy, Alabaster & Imperial Gold",
    colors: {
      bg: "#FAFAFD",
      accent: "#D4AF37",
      cta: "#122647",
    },
  },
  {
    id: "velvet-plum",
    name: "Velvet Plum & Pearl",
    tagline: "Warm Pearl, Amethyst Plum & Antique Gold",
    colors: {
      bg: "#FCF8F5",
      accent: "#D4A373",
      cta: "#5A183C",
    },
  },
  {
    id: "terracotta-gold",
    name: "Terracotta & Temple Gold",
    tagline: "Earthy Rust, Bisque & Kerala Temple Gold",
    colors: {
      bg: "#FDF7F2",
      accent: "#C59B4B",
      cta: "#8A341E",
    },
  },
];

const THEME_STORAGE_KEY = "nakshatra_jewellery_theme";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: ThemeOption[];
  currentThemeConfig: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("champagne-luxury");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
      const validTheme = THEMES.find((t) => t.id === savedTheme);
      if (validTheme) {
        setThemeState(validTheme.id);
        document.documentElement.setAttribute("data-theme", validTheme.id);
      } else {
        document.documentElement.setAttribute("data-theme", "champagne-luxury");
      }
    } catch {
      document.documentElement.setAttribute("data-theme", "champagne-luxury");
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    } catch (e) {
      console.error(e);
    }
  };

  const currentThemeConfig = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themes: THEMES, currentThemeConfig }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
