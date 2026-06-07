import type { CSSProperties } from "react";

export type VamoTheme = "dark" | "light";

export const DEFAULT_VAMO_THEME: VamoTheme = "dark";

const VAMO_THEME_STORAGE_KEY = "vamo_theme";

export const VAMO_THEME_OPTIONS: Array<{
  id: VamoTheme;
  label: string;
  description: string;
}> = [
  {
    id: "dark",
    label: "Dark mode",
    description: "Default Vamo look for V1 and closest match to the mobile reference.",
  },
  {
    id: "light",
    label: "Light mode",
    description: "Cleaner daytime mode inspired by the light dashboard and planner references.",
  },
];

export function getStoredVamoTheme(): VamoTheme {
  if (typeof window === "undefined") {
    return DEFAULT_VAMO_THEME;
  }

  const storedTheme = window.localStorage.getItem(VAMO_THEME_STORAGE_KEY);

  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return DEFAULT_VAMO_THEME;
}

export function saveStoredVamoTheme(theme: VamoTheme) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(VAMO_THEME_STORAGE_KEY, theme);
}

export function getVamoThemeStyle(theme: VamoTheme): CSSProperties {
  if (theme === "light") {
    return {
      "--vamo-bg": "#f8fafc",
      "--vamo-bg-soft": "#ffffff",
      "--vamo-bottom-nav": "rgba(255,255,255,0.94)",

      "--vamo-text": "#0f172a",
      "--vamo-text-inverse": "#ffffff",
      "--vamo-muted": "#64748b",
      "--vamo-muted-strong": "#334155",

      "--vamo-card": "#ffffff",
      "--vamo-card-soft": "#f1f5f9",
      "--vamo-card-strong": "#e2e8f0",
      "--vamo-border": "rgba(15,23,42,0.12)",
      "--vamo-border-strong": "rgba(15,23,42,0.22)",
      "--vamo-input": "#ffffff",
      "--vamo-overlay": "rgba(15,23,42,0.32)",

      "--vamo-primary": "#335c81",
      "--vamo-primary-soft": "rgba(51,92,129,0.12)",
      "--vamo-primary-text": "#ffffff",

      "--vamo-info": "#2563eb",
      "--vamo-info-soft": "rgba(37,99,235,0.12)",
      "--vamo-info-text": "#1e3a8a",

      "--vamo-success": "#059669",
      "--vamo-success-soft": "rgba(5,150,105,0.12)",
      "--vamo-success-text": "#065f46",

      "--vamo-warning": "#d97706",
      "--vamo-warning-soft": "rgba(217,119,6,0.14)",
      "--vamo-warning-text": "#92400e",

      "--vamo-danger": "#dc2626",
      "--vamo-danger-soft": "rgba(220,38,38,0.12)",
      "--vamo-danger-text": "#991b1b",

      "--vamo-hero-overlay": "rgba(0,0,0,0.42)",
      "--vamo-shadow": "0 18px 40px rgba(15,23,42,0.12)",
    } as CSSProperties;
  }

  return {
    "--vamo-bg": "#050505",
    "--vamo-bg-soft": "#000000",
    "--vamo-bottom-nav": "rgba(0,0,0,0.92)",

    "--vamo-text": "#ffffff",
    "--vamo-text-inverse": "#020617",
    "--vamo-muted": "#a1a1aa",
    "--vamo-muted-strong": "#d4d4d8",

    "--vamo-card": "rgba(255,255,255,0.07)",
    "--vamo-card-soft": "rgba(255,255,255,0.05)",
    "--vamo-card-strong": "rgba(255,255,255,0.12)",
    "--vamo-border": "rgba(255,255,255,0.12)",
    "--vamo-border-strong": "rgba(255,255,255,0.22)",
    "--vamo-input": "#0a0a0a",
    "--vamo-overlay": "rgba(0,0,0,0.72)",

    "--vamo-primary": "#60a5fa",
    "--vamo-primary-soft": "rgba(96,165,250,0.14)",
    "--vamo-primary-text": "#020617",

    "--vamo-info": "#60a5fa",
    "--vamo-info-soft": "rgba(96,165,250,0.14)",
    "--vamo-info-text": "#bfdbfe",

    "--vamo-success": "#34d399",
    "--vamo-success-soft": "rgba(52,211,153,0.14)",
    "--vamo-success-text": "#bbf7d0",

    "--vamo-warning": "#fbbf24",
    "--vamo-warning-soft": "rgba(251,191,36,0.14)",
    "--vamo-warning-text": "#fde68a",

    "--vamo-danger": "#f87171",
    "--vamo-danger-soft": "rgba(248,113,113,0.14)",
    "--vamo-danger-text": "#fecaca",

    "--vamo-hero-overlay": "rgba(0,0,0,0.42)",
    "--vamo-shadow": "0 22px 48px rgba(0,0,0,0.45)",
  } as CSSProperties;
}

export function getVamoThemeLabel(theme: VamoTheme) {
  return VAMO_THEME_OPTIONS.find((option) => option.id === theme)?.label ?? "Dark mode";
}
