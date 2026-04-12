import { useState } from "react";
import { campaigns, teamMembers, statusColors, type Campaign, type Priority } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const buckets: { key: Priority; label: string; dot: string; border: string }[] = [
  { key: "high", label: "HIGH PRIORITY", dot: "bg-priority-high", border: "border-priority-high" },
  { key: "medium", label: "MEDIUM", dot: "bg-priority-medium", border: "border-priority-medium" },
  { key: "low", label: "LOW", dot: "bg-priority-low", border: "border-priority-low" },
];

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      <span className="text-xs text-muted-foreground mr-1">Difficulty</span>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${i <= level ? "bg-foreground" : "bg-border"}`}
        />
      ))}
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const statusStyle = statusColors[campaign.status];
  return (
    <div className="bg-card rounded-lg p-3 border border-border shadow-sm">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-semibold text-sm text-foreground">{campaign.clientName}</h4>
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${statusStyle.bg} ${statusStyle.text}`}>
          {campaign.status.replace("-", " ")}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{campaign.contactName}</p>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-1.5">
          {campaign.avatars.map((a, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center border-2 border-card"
            >
              {a}
            </div>
          ))}
        </div>
        <DifficultyDots level={campaign.difficulty} />
      </div>
    </div>
  );
}

export function PriorityBuckets() {
  const [selectedMember, setSelectedMember] = useState("all");

  const filtered = selectedMember === "all"
    ? campaigns
    : campaigns.filter((c) => c.assignedTo === selectedMember);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">Priority Queue</h2>
        <Select value={selectedMember} onValueChange={setSelectedMember}>
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {teamMembers.map((m) => (
              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {buckets.map((bucket) => {
          const items = filtered.filter((c) => c.priority === bucket.key);
          return (
            <div key={bucket.key} className={`rounded-xl border-2 ${bucket.border} bg-secondary/50 p-3`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-3 h-3 rounded-full ${bucket.dot}`} />
                <span className="text-xs font-bold uppercase tracking-wide text-foreground">
                  {bucket.label}
                </span>
              </div>
              <div className="space-y-2">
                {items.length === 0 && (
                  <p className="text-xs text-muted-foreground italic">No campaigns</p>
                )}
                {items.map((c) => (
                  <CampaignCard key={c.id} campaign={c} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
