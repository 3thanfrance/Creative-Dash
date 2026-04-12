import { bountyBoard, statusColors } from "@/data/mockData";
import { Target } from "lucide-react";

export function BountyBoard() {
  return (
    <div className="rounded-xl border-2 border-dashed border-primary/30 bg-accent/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Bounty Board</h2>
        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
          {bountyBoard.length} unassigned
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {bountyBoard.map((c) => {
          const style = statusColors[c.status];
          return (
            <div key={c.id} className="bg-card rounded-lg p-3 border border-border shadow-sm hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-sm text-foreground">{c.clientName}</h4>
                <span className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded font-medium">
                  Diff {c.difficulty}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{c.contactName}</p>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-muted-foreground">
                  Review: {new Date(c.reviewDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                  c.priority === "medium" ? "bg-priority-medium text-foreground" : "bg-priority-low text-primary-foreground"
                }`}>
                  {c.priority}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
