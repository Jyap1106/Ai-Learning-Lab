import { type ReactNode } from "react";

import VamoBottomNav, { type VamoTab } from "./VamoBottomNav";

interface VamoAppShellProps {
  activeTab: VamoTab;
  onTabChange: (tab: VamoTab) => void;
  children: ReactNode;
}

export default function VamoAppShell({
  activeTab,
  onTabChange,
  children,
}: VamoAppShellProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto min-h-screen max-w-md overflow-hidden bg-black pb-24 shadow-2xl">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(148,163,184,0.22),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_28%),#050505]">
          {children}
        </div>
      </div>

      <VamoBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </main>
  );
}
