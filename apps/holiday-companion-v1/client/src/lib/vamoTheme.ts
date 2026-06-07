export type VamoTheme = "dark" | "light";

export const DEFAULT_VAMO_THEME: VamoTheme = "dark";

export const VAMO_THEME_OPTIONS: Array<{
  id: VamoTheme;
  label: string;
  description: string;
  status: "active" | "planned";
}> = [
  {
    id: "dark",
    label: "Dark mode",
    description: "Default Vamo look for V1 and best match to the mobile reference.",
    status: "active",
  },
  {
    id: "light",
    label: "Light mode",
    description: "Planned for early V2 after dark mode is stable.",
    status: "planned",
  },
];

export function getVamoThemeLabel(theme: VamoTheme) {
  return VAMO_THEME_OPTIONS.find((option) => option.id === theme)?.label ?? "Dark mode";
}
