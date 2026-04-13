import { useState } from "react";
import { bountyBoard, type Campaign, campaigns } from "@/data/mockData";
import { Target, X, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function BountyBoard({ onClaim }: { onClaim?: (campaign: Campaign) => void }) {
  const [selected, setSelected] = useState<Campaign | null>(null);

  const handleClaim = (campaign: Campaign) => {
    onClaim?.(campaign);
    setSelected(null);
    toast({
      title: "Bounty Claimed",
      description: `${campaign.referenceCode} added to your priority queue.`,
    });
  };

  return (
    <div className="rounded-lg border border-dashed border-primary/30 bg-accent/10 px-3 py-1.5 relative">
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
              onClick={() => setSelected(c)}
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

      {/* Preview overlay */}
      {selected && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg p-3 mx-2">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-mono font-bold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                  {selected.referenceCode}
                </span>
                <span className="text-xs font-semibold text-foreground">{selected.clientName}</span>
                <span className={`text-[7px] px-1.5 py-0.5 rounded font-medium ${
                  selected.priority === "medium" ? "bg-priority-medium text-foreground" : "bg-priority-low text-primary-foreground"
                }`}>
                  D{selected.difficulty}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{selected.contactName}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2.5">
            {selected.deadlineDate && (
              <span>Deadline: <span className="text-foreground font-medium">{new Date(selected.deadlineDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span></span>
            )}
            <span>Review: <span className="text-foreground font-medium">{new Date(selected.reviewDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span></span>
          </div>

          <button
            onClick={() => handleClaim(selected)}
            className="w-full flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold py-1.5 rounded-md hover:bg-primary/90 transition-colors"
          >
            Claim Bounty <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
