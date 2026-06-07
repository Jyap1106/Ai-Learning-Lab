import { type ReactNode } from "react";

import { getVamoThemeStyle, type VamoTheme } from "@/lib/vamoTheme";

import VamoBottomNav, { type VamoTab } from "./VamoBottomNav";

interface VamoAppShellProps {
  activeTab: VamoTab;
  theme: VamoTheme;
  onTabChange: (tab: VamoTab) => void;
  children: ReactNode;
}

export default function VamoAppShell({
  activeTab,
  theme,
  onTabChange,
  children,
}: VamoAppShellProps) {
  return (
    <main
      style={getVamoThemeStyle(theme)}
      data-vamo-theme={theme}
      className="min-h-screen bg-[var(--vamo-bg)] text-[var(--vamo-text)]"
    >
      <div className="mx-auto min-h-screen max-w-md overflow-hidden bg-[var(--vamo-bg)] pb-24 shadow-2xl">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.13),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%),var(--vamo-bg-soft)]">
          {children}
        </div>
      </div>

      <VamoBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </main>
  );
}
