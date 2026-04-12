import { bountyBoard } from "@/data/mockData";
import { Target } from "lucide-react";

export function BountyBoard() {
  return (
    <div className="rounded-lg border border-dashed border-primary/30 bg-accent/10 px-3 py-1.5">
      <div className="flex items-center gap-2">
        <Target className="w-3 h-3 text-primary shrink-0" />
        <span className="text-[10px] font-semibold text-foreground shrink-0">Bounty Board</span>
        <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium shrink-0">
          {bountyBoard.length}
        </span>
        <div className="flex gap-1.5 overflow-x-auto ml-2">
          {bountyBoard.map((c) => (
            <div
              key={c.id}
              className="bg-card rounded px-2 py-1 border border-border hover:border-primary/50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span className="text-[8px] font-mono text-muted-foreground">{c.referenceCode}</span>
              <span className="text-[10px] font-semibold text-foreground">{c.contactName.split("(")[0].trim()}</span>
              <span className={`text-[7px] px-1 py-0.5 rounded font-medium ${
                c.priority === "medium" ? "bg-priority-medium text-foreground" : "bg-priority-low text-primary-foreground"
              }`}>
                D{c.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}