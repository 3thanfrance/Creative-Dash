import { campaigns } from "@/data/mockData";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

export function OpsWorkload() {
  const counts = { 1: 0, 2: 0, 3: 0 };
  campaigns.forEach((c) => {
    counts[c.difficulty]++;
  });
  const total = counts[1] + counts[2] + counts[3];
  const weightedScore = (counts[1] * 1 + counts[2] * 2 + counts[3] * 3);
  const maxScore = total * 3;
  const loadPct = maxScore > 0 ? Math.round((weightedScore / maxScore) * 100) : 0;

  // Determine alert level
  let alertLevel: "green" | "yellow" | "red";
  let alertLabel: string;
  let AlertIcon: typeof CheckCircle;
  let meterColor: string;
  let bgGlow: string;

  if (total >= 10 || loadPct >= 75) {
    alertLevel = "red";
    alertLabel = "CODE RED";
    AlertIcon = AlertCircle;
    meterColor = "bg-priority-high";
    bgGlow = "border-priority-high/50 bg-priority-high/5";
  } else if (total >= 6 || loadPct >= 50) {
    alertLevel = "yellow";
    alertLabel = "CODE YELLOW";
    AlertIcon = AlertTriangle;
    meterColor = "bg-priority-medium";
    bgGlow = "border-priority-medium/50 bg-priority-medium/5";
  } else {
    alertLevel = "green";
    alertLabel = "ALL CLEAR";
    AlertIcon = CheckCircle;
    meterColor = "bg-priority-low";
    bgGlow = "border-priority-low/50 bg-priority-low/5";
  }

  const pct1 = total > 0 ? Math.round((counts[1] / total) * 100) : 0;
  const pct2 = total > 0 ? Math.round((counts[2] / total) * 100) : 0;
  const pct3 = total > 0 ? Math.round((counts[3] / total) * 100) : 0;

  return (
    <div className={`rounded-xl border-2 ${bgGlow} p-3`}>
      <div className="flex items-center gap-2 mb-2">
        <AlertIcon className={`w-4 h-4 ${
          alertLevel === "red" ? "text-priority-high" :
          alertLevel === "yellow" ? "text-priority-medium" : "text-priority-low"
        }`} />
        <h2 className="text-sm font-semibold text-foreground">Ops Workload</h2>
        <span className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
          alertLevel === "red" ? "bg-priority-high text-primary-foreground" :
          alertLevel === "yellow" ? "bg-priority-medium text-foreground" :
          "bg-priority-low text-primary-foreground"
        }`}>
          {alertLabel}
        </span>
      </div>

      {/* Main meter */}
      <div className="mb-2">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-muted-foreground">Load Intensity</span>
          <span className="font-bold text-foreground">{total} campaigns</span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full ${meterColor} transition-all duration-500`}
            style={{ width: `${loadPct}%` }}
          />
        </div>
      </div>

      {/* Difficulty split */}
      <div className="flex items-center gap-1 h-2 rounded-full overflow-hidden bg-secondary">
        {pct1 > 0 && <div className="h-full bg-priority-low transition-all" style={{ width: `${pct1}%` }} />}
        {pct2 > 0 && <div className="h-full bg-priority-medium transition-all" style={{ width: `${pct2}%` }} />}
        {pct3 > 0 && <div className="h-full bg-priority-high transition-all" style={{ width: `${pct3}%` }} />}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] text-muted-foreground">Easy {pct1}%</span>
        <span className="text-[9px] text-muted-foreground">Med {pct2}%</span>
        <span className="text-[9px] text-muted-foreground">Hard {pct3}%</span>
      </div>
    </div>
  );
}
