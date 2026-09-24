"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = "champagne-luxury" | "soft-blush" | "sage-contemporary";

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
    name: "Champagne Luxury",
    tagline: "Warm, Festive & Regal",
    colors: {
      bg: "#FFF9EF",
      accent: "#C9A45C",
      cta: "#6B1E2E",
    },
  },
  {
    id: "soft-blush",
    name: "Soft Blush",
    tagline: "Feminine, Fresh & Romantic",
    colors: {
      bg: "#FFFFFF",
      accent: "#C8A45D",
      cta: "#8A3D52",
    },
  },
  {
    id: "sage-contemporary",
    name: "Sage & Gold",
    tagline: "Calm, Sophisticated & Natural",
    colors: {
      bg: "#FAF5EA",
      accent: "#B8944D",
      cta: "#2E4633",
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
      const savedTheme = (localStorage.getItem(THEME_STORAGE_KEY) ||
        localStorage.getItem("aurelia_jewellery_theme")) as ThemeType | null;
      if (
        savedTheme &&
        (savedTheme === "champagne-luxury" ||
          savedTheme === "soft-blush" ||
          savedTheme === "sage-contemporary")
      ) {
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
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
