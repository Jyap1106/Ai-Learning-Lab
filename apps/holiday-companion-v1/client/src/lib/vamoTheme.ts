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
    description: "Early light theme support for daytime viewing and future V2 polish.",
  },
];

export function getStoredVamoTheme(): VamoTheme {
  if (typeof window === "undefined") {
    return DEFAULT_VAMO_THEME;
  }

  const storedTheme = window.localStorage.getItem(VAMO_THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
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
      "--vamo-bottom-nav": "rgba(255,255,255,0.92)",
      "--vamo-text": "#0f172a",
      "--vamo-muted": "#64748b",
      "--vamo-card": "rgba(15,23,42,0.045)",
      "--vamo-card-strong": "rgba(15,23,42,0.08)",
      "--vamo-border": "rgba(15,23,42,0.12)",
      "--vamo-input": "#ffffff",
      "--vamo-primary": "#335c81",
      "--vamo-primary-text": "#ffffff",
      "--vamo-danger": "#dc2626",
    } as CSSProperties;
  }

  return {
    "--vamo-bg": "#050505",
    "--vamo-bg-soft": "#000000",
    "--vamo-bottom-nav": "rgba(0,0,0,0.9)",
    "--vamo-text": "#ffffff",
    "--vamo-muted": "#a1a1aa",
    "--vamo-card": "rgba(255,255,255,0.07)",
    "--vamo-card-strong": "rgba(255,255,255,0.12)",
    "--vamo-border": "rgba(255,255,255,0.12)",
    "--vamo-input": "#0a0a0a",
    "--vamo-primary": "#60a5fa",
    "--vamo-primary-text": "#020617",
    "--vamo-danger": "#f87171",
  } as CSSProperties;
}

export function getVamoThemeLabel(theme: VamoTheme) {
  return VAMO_THEME_OPTIONS.find((option) => option.id === theme)?.label ?? "Dark mode";
}
