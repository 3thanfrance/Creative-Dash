import { useState } from "react";
import { campaigns, teamMembers, clients, statusColors, type Campaign, type Priority } from "@/data/mockData";
import { OpsWorkload } from "./OpsWorkload";
import { Calendar, AlertCircle } from "lucide-react";
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
  const isOverdue = campaign.deadlineDate && new Date(campaign.deadlineDate) <= new Date("2026-04-13");
  const deadlineSoon = campaign.deadlineDate && !isOverdue && new Date(campaign.deadlineDate) <= new Date("2026-04-16");

  return (
    <div className={`bg-card rounded-md p-2 border shadow-sm ${isOverdue ? "border-priority-high" : "border-border"}`}>
      <div className="flex justify-between items-start mb-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono font-bold text-muted-foreground bg-secondary px-1 py-0.5 rounded">
            {campaign.referenceCode}
          </span>
          <h4 className="font-semibold text-xs text-foreground">{campaign.clientName}</h4>
        </div>
        <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${statusStyle.bg} ${statusStyle.text}`}>
          {campaign.status.replace("-", " ")}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground mb-1 truncate">{campaign.contactName}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
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
          {campaign.deadlineDate && (
            <div className={`flex items-center gap-0.5 text-[9px] ${
              isOverdue ? "text-priority-high font-bold" : deadlineSoon ? "text-priority-medium font-semibold" : "text-muted-foreground"
            }`}>
              {(isOverdue || deadlineSoon) && <AlertCircle className="w-2.5 h-2.5" />}
              <Calendar className="w-2.5 h-2.5" />
              <span>{new Date(campaign.deadlineDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
          )}
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
  const [selectedClient, setSelectedClient] = useState("all");

  const uniqueClients = ["all", ...new Set(campaigns.map((c) => c.clientName))];

  const filtered = campaigns.filter((c) => {
    const memberMatch = selectedMember === "all" || c.assignedTo === selectedMember;
    const clientMatch = selectedClient === "all" || c.clientName === selectedClient;
    return memberMatch && clientMatch;
  });

  return (
    <div className="space-y-3">
      <OpsWorkload />
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <h2 className="text-sm font-semibold text-foreground">Priority Queue</h2>
          <div className="flex items-center gap-2 ml-auto">
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger className="w-[130px] h-7 text-xs bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {uniqueClients.map((c) => (
                  <SelectItem key={c} value={c}>{c === "all" ? "All Clients" : c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger className="w-[130px] h-7 text-xs bg-card">
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
    </div>
  );
}