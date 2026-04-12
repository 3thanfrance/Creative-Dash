import { campaigns } from "@/data/mockData";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

export function OpsWorkload() {
  const counts = { 1: 0, 2: 0, 3: 0 };
  campaigns.forEach((c) => counts[c.difficulty]++);
  const total = counts[1] + counts[2] + counts[3];
  const weightedScore = counts[1] * 1 + counts[2] * 2 + counts[3] * 3;
  const maxScore = total * 3;
  const loadPct = maxScore > 0 ? Math.round((weightedScore / maxScore) * 100) : 0;

  let alertLevel: "green" | "yellow" | "red";
  let alertLabel: string;
  let AlertIcon: typeof CheckCircle;
  let meterColor: string;

  if (total >= 10 || loadPct >= 75) {
    alertLevel = "red"; alertLabel = "CODE RED"; AlertIcon = AlertCircle; meterColor = "bg-priority-high";
  } else if (total >= 6 || loadPct >= 50) {
    alertLevel = "yellow"; alertLabel = "CODE YELLOW"; AlertIcon = AlertTriangle; meterColor = "bg-priority-medium";
  } else {
    alertLevel = "green"; alertLabel = "ALL CLEAR"; AlertIcon = CheckCircle; meterColor = "bg-priority-low";
  }

  const pct1 = total > 0 ? Math.round((counts[1] / total) * 100) : 0;
  const pct2 = total > 0 ? Math.round((counts[2] / total) * 100) : 0;
  const pct3 = total > 0 ? Math.round((counts[3] / total) * 100) : 0;

  return (
    <div className="flex items-center gap-2">
      <AlertIcon className={`w-3.5 h-3.5 shrink-0 ${
        alertLevel === "red" ? "text-priority-high" :
        alertLevel === "yellow" ? "text-priority-medium" : "text-priority-low"
      }`} />
      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0 ${
        alertLevel === "red" ? "bg-priority-high text-primary-foreground" :
        alertLevel === "yellow" ? "bg-priority-medium text-foreground" :
        "bg-priority-low text-primary-foreground"
      }`}>
        {alertLabel}
      </span>
      <div className="flex items-center gap-1 h-2 rounded-full overflow-hidden bg-secondary w-20 shrink-0">
        {pct1 > 0 && <div className="h-full bg-priority-low" style={{ width: `${pct1}%` }} />}
        {pct2 > 0 && <div className="h-full bg-priority-medium" style={{ width: `${pct2}%` }} />}
        {pct3 > 0 && <div className="h-full bg-priority-high" style={{ width: `${pct3}%` }} />}
      </div>
      <span className="text-[10px] text-muted-foreground shrink-0">{total} in ops</span>
    </div>
  );
}
