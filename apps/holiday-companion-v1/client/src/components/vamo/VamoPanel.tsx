import { type ReactNode } from "react";

interface VamoPanelProps {
  children: ReactNode;
  className?: string;
}

export default function VamoPanel({ children, className = "" }: VamoPanelProps) {
  return (
    <section
      className={`rounded-[2rem] border border-white/10 bg-white/[0.07] text-white shadow-xl ${className}`}
    >
      {children}
    </section>
  );
}
