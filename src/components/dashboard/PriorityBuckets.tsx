import { useState } from "react";
import { campaigns, teamMembers, statusColors, type Campaign, type Priority } from "@/data/mockData";
import { OpsWorkload } from "./OpsWorkload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const buckets: { key: Priority; label: string; dot: string; border: string }[] = [
  { key: "high", label: "HIGH", dot: "bg-priority-high", border: "border-priority-high" },
  { key: "medium", label: "MED", dot: "bg-priority-medium", border: "border-priority-medium" },
  { key: "low", label: "LOW", dot: "bg-priority-low", border: "border-priority-low" },
];

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const statusStyle = statusColors[campaign.status];
  return (
    <div className="bg-card rounded-md p-2 border border-border shadow-sm">
      <div className="flex justify-between items-start mb-0.5">
        <h4 className="font-semibold text-xs text-foreground">{campaign.clientName}</h4>
        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${statusStyle.bg} ${statusStyle.text}`}>
          {campaign.status.replace("-", " ")}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground mb-1 truncate">{campaign.contactName}</p>
      <div className="flex justify-between items-center">
        <div className="flex -space-x-1">
          {campaign.avatars.map((a, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center border-2 border-card"
            >
              {a}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-0.5">
          {[1, 2, 3].map((i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= campaign.difficulty ? "bg-foreground" : "bg-border"}`} />
          ))}
        </div>
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
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <h2 className="text-sm font-semibold text-foreground">Priority Queue</h2>
        <OpsWorkload />
        <div className="ml-auto">
          <Select value={selectedMember} onValueChange={setSelectedMember}>
            <SelectTrigger className="w-[150px] h-8 text-xs bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {teamMembers.map((m) => (
                <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {buckets.map((bucket) => {
          const items = filtered.filter((c) => c.priority === bucket.key);
          return (
            <div key={bucket.key} className={`rounded-lg border ${bucket.border} bg-secondary/30 p-2`}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-2 h-2 rounded-full ${bucket.dot}`} />
                <span className="text-[10px] font-bold uppercase tracking-wide text-foreground">
                  {bucket.label}
                </span>
                <span className="text-[10px] text-muted-foreground ml-auto">{items.length}</span>
              </div>
              <div className="space-y-1.5">
                {items.length === 0 && (
                  <p className="text-[10px] text-muted-foreground italic">Empty</p>
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
