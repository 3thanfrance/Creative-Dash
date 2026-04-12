import { campaigns } from "@/data/mockData";
import { Settings } from "lucide-react";

export function OpsWorkload() {
  const counts = { 1: 0, 2: 0, 3: 0 };
  campaigns.forEach((c) => {
    counts[c.difficulty]++;
  });
  const total = counts[1] + counts[2] + counts[3];

  const bars = [
    { level: 1, label: "Easy", count: counts[1], color: "bg-priority-low" },
    { level: 2, label: "Medium", count: counts[2], color: "bg-priority-medium" },
    { level: 3, label: "Hard", count: counts[3], color: "bg-priority-high" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Ops Workload</h2>
        <span className="ml-auto text-xs font-bold text-foreground">{total} total</span>
      </div>
      <div className="space-y-2">
        {bars.map((b) => (
          <div key={b.level}>
            <div className="flex justify-between text-[10px] mb-0.5">
              <span className="text-muted-foreground font-medium">Grade {b.level} — {b.label}</span>
              <span className="font-semibold text-foreground">{b.count}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className={`h-full rounded-full ${b.color} transition-all`}
                style={{ width: `${total > 0 ? (b.count / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
