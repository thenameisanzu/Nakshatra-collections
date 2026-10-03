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
    name: "Champagne & Gold",
    tagline: "Warm, Regal & Festive",
    colors: {
      bg: "#FFFDF9",
      accent: "#C5A059",
      cta: "#721C24",
    },
  },
  {
    id: "soft-blush",
    name: "Rose Gold Blush",
    tagline: "Feminine, Romantic & Fresh",
    colors: {
      bg: "#FFF8F8",
      accent: "#C98A7D",
      cta: "#8B3A4F",
    },
  },
  {
    id: "sage-contemporary",
    name: "Emerald & Gold",
    tagline: "Imperial, Calm & Sophisticated",
    colors: {
      bg: "#F7FAF7",
      accent: "#C5A059",
      cta: "#1B4332",
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
