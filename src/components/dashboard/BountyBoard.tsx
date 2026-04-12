import { bountyBoard } from "@/data/mockData";
import { Target } from "lucide-react";

export function BountyBoard() {
  return (
    <div className="rounded-lg border border-dashed border-primary/30 bg-accent/20 px-3 py-2">
      <div className="flex items-center gap-2 mb-1.5">
        <Target className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold text-foreground">Bounty Board</span>
        <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
          {bountyBoard.length} open
        </span>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {bountyBoard.map((c) => (
          <div
            key={c.id}
            className="bg-card rounded-md px-2.5 py-1.5 border border-border hover:border-primary/50 transition-colors cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span className="text-xs font-semibold text-foreground">{c.clientName}</span>
            <span className={`text-[8px] px-1 py-0.5 rounded font-medium ${
              c.priority === "medium" ? "bg-priority-medium text-foreground" : "bg-priority-low text-primary-foreground"
            }`}>
              {c.priority}
            </span>
            <span className="text-[9px] text-muted-foreground">D{c.difficulty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
