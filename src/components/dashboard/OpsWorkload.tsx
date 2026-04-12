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
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Settings className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Ops Workload</h2>
      </div>
      <div className="space-y-3">
        {bars.map((b) => (
          <div key={b.level}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground font-medium">Grade {b.level} — {b.label}</span>
              <span className="font-semibold text-foreground">{b.count}</span>
            </div>
            <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
              <div
                className={`h-full rounded-full ${b.color} transition-all`}
                style={{ width: `${total > 0 ? (b.count / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
        <span className="text-muted-foreground">Total in Ops</span>
        <span className="font-bold text-foreground">{total}</span>
      </div>
    </div>
  );
}
