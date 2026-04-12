import { bountyBoard, statusColors } from "@/data/mockData";
import { Target } from "lucide-react";

export function BountyBoard() {
  return (
    <div className="rounded-xl border-2 border-dashed border-primary/30 bg-accent/30 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Bounty Board</h2>
        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
          {bountyBoard.length} unassigned
        </span>
      </div>
      <div className="space-y-1.5">
        {bountyBoard.map((c) => (
          <div key={c.id} className="bg-card rounded-lg px-3 py-2 border border-border shadow-sm hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-xs text-foreground truncate">{c.clientName}</h4>
                <span className={`text-[9px] shrink-0 px-1.5 py-0.5 rounded font-medium ${
                  c.priority === "medium" ? "bg-priority-medium text-foreground" : "bg-priority-low text-primary-foreground"
                }`}>
                  {c.priority}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{c.contactName}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded font-medium">
                D{c.difficulty}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {new Date(c.reviewDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
