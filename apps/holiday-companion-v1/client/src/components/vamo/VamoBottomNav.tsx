import { CalendarDays, Home, UserCircle } from "lucide-react";

export type VamoTab = "home" | "planner" | "profile";

interface VamoBottomNavProps {
  activeTab: VamoTab;
  onTabChange: (tab: VamoTab) => void;
}

const navItems: Array<{
  id: VamoTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: "home",
    label: "Home",
    icon: Home,
  },
  {
    id: "planner",
    label: "Planner",
    icon: CalendarDays,
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserCircle,
  },
];

export default function VamoBottomNav({
  activeTab,
  onTabChange,
}: VamoBottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--vamo-border)] bg-[var(--vamo-bottom-nav)] backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-3 px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? "bg-[var(--vamo-primary)] text-[var(--vamo-primary-text)]"
                  : "text-[var(--vamo-muted)] hover:bg-[var(--vamo-card)] hover:text-[var(--vamo-text)]"
              }`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
