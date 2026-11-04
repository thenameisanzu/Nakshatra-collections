"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = "minimal-clean";

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
    id: "minimal-clean",
    name: "Warm Ivory & 18K Molten Gold Atelier",
    tagline: "Warm Alabaster Silk, Royal Espresso Bronze & 18K Champagne Gold",
    colors: {
      bg: "#FAF7F2",
      accent: "#C59B4E",
      cta: "#241815",
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
  const [theme] = useState<ThemeType>("minimal-clean");

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, "minimal-clean");
      document.documentElement.setAttribute("data-theme", "minimal-clean");
    } catch {
      document.documentElement.setAttribute("data-theme", "minimal-clean");
    }
  }, []);

  const setTheme = () => {
    document.documentElement.setAttribute("data-theme", "minimal-clean");
  };

  const currentThemeConfig = THEMES[0];

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
