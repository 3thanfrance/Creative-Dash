import { campaigns } from "@/data/mockData";
import { AlertTriangle, CheckCircle, AlertCircle, Activity } from "lucide-react";

export function OpsWorkload() {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
  campaigns.forEach((c) => counts[c.difficulty]++);
  const total = counts[1] + counts[2] + counts[3];
  const weightedScore = counts[1] * 1 + counts[2] * 2 + counts[3] * 3;
  const maxScore = total * 3;
  const loadPct = maxScore > 0 ? Math.round((weightedScore / maxScore) * 100) : 0;

  let alertLevel: "green" | "yellow" | "red";
  let alertLabel: string;
  let AlertIcon: typeof CheckCircle;

  if (total >= 10 || loadPct >= 75) {
    alertLevel = "red"; alertLabel = "CODE RED"; AlertIcon = AlertCircle;
  } else if (total >= 6 || loadPct >= 50) {
    alertLevel = "yellow"; alertLabel = "CODE YELLOW"; AlertIcon = AlertTriangle;
  } else {
    alertLevel = "green"; alertLabel = "ALL CLEAR"; AlertIcon = CheckCircle;
  }

  const pct1 = total > 0 ? Math.round((counts[1] / total) * 100) : 0;
  const pct2 = total > 0 ? Math.round((counts[2] / total) * 100) : 0;
  const pct3 = total > 0 ? Math.round((counts[3] / total) * 100) : 0;

  const alertColorMap = {
    red: { badge: "bg-priority-high text-primary-foreground", icon: "text-priority-high", glow: "shadow-[0_0_12px_hsl(var(--priority-high)/0.3)]" },
    yellow: { badge: "bg-priority-medium text-foreground", icon: "text-priority-medium", glow: "shadow-[0_0_12px_hsl(var(--priority-medium)/0.3)]" },
    green: { badge: "bg-priority-low text-primary-foreground", icon: "text-priority-low", glow: "shadow-[0_0_12px_hsl(var(--priority-low)/0.3)]" },
  };

  const colors = alertColorMap[alertLevel];

  return (
    <div className={`rounded-xl border border-border bg-card p-3 ${colors.glow}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${colors.icon}`} />
          <span className="text-xs font-semibold text-foreground">Ops Workload</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertIcon className={`w-3.5 h-3.5 ${colors.icon}`} />
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.badge}`}>
            {alertLabel}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Total active */}
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground leading-none">{total}</p>
          <p className="text-[9px] text-muted-foreground mt-0.5">Active</p>
        </div>

        {/* Load meter */}
        <div className="flex-1">
          <div className="flex justify-between text-[9px] text-muted-foreground mb-1">
            <span>Load</span>
            <span className="font-semibold text-foreground">{loadPct}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden bg-secondary">
            <div
              className={`h-full rounded-full transition-all ${
                alertLevel === "red" ? "bg-priority-high" :
                alertLevel === "yellow" ? "bg-priority-medium" : "bg-priority-low"
              }`}
              style={{ width: `${loadPct}%` }}
            />
          </div>
        </div>

        {/* Difficulty split */}
        <div className="flex items-center gap-2">
          {[
            { label: "D1", count: counts[1], pct: pct1, color: "bg-priority-low" },
            { label: "D2", count: counts[2], pct: pct2, color: "bg-priority-medium" },
            { label: "D3", count: counts[3], pct: pct3, color: "bg-priority-high" },
          ].map((d) => (
            <div key={d.label} className="text-center">
              <div className="flex items-center gap-1 mb-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${d.color}`} />
                <span className="text-[9px] font-semibold text-foreground">{d.label}</span>
              </div>
              <p className="text-xs font-bold text-foreground">{d.count}</p>
              <p className="text-[8px] text-muted-foreground">{d.pct}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
