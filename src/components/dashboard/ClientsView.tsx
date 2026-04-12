import { clients, campaigns } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Calendar, User, TrendingUp, AlertCircle } from "lucide-react";

export function ClientsView() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Client & Contract Details</h2>
      <div className="grid gap-3">
        {clients.map((client) => {
          const completionPct = Math.round((client.campaignsCompleted / client.campaignsTotal) * 100);
          const avgSpend = client.campaignsTotal > 0
            ? Math.round(client.totalContractValue / client.campaignsTotal)
            : 0;
          const deliveryRate = (client.introsDelivered + client.introsRejected) > 0
            ? Math.round((client.introsDelivered / (client.introsDelivered + client.introsRejected)) * 100)
            : 0;
          const conversionRate = client.campaignsTotal > 0
            ? Math.round((client.campaignsCompleted / client.campaignsTotal) * 100)
            : 0;

          // Stage breakdown from active campaigns
          const clientCampaigns = campaigns.filter((c) => c.clientName === client.name);
          const stages: Record<string, number> = {};
          clientCampaigns.forEach((c) => {
            const label = c.status.replace("-", " ");
            stages[label] = (stages[label] || 0) + 1;
          });

          const deadlineSoon = new Date(client.nextDeadline) <= new Date("2026-04-16");

          return (
            <div key={client.id} className="rounded-xl border border-border bg-card p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <p className="text-xs text-muted-foreground">
                      {client.campaignsCompleted}/{client.campaignsTotal} campaigns
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{client.opsOwner}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">
                    ${client.monthlyContractValue.toLocaleString()}/mo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${client.totalContractValue.toLocaleString()} total
                  </p>
                </div>
              </div>

              {/* Key metrics row */}
              <div className="grid grid-cols-5 gap-3 mb-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Acceptance</span>
                    <span className={`font-semibold ${
                      client.acceptanceRate >= 75 ? "text-priority-low" :
                      client.acceptanceRate >= 50 ? "text-priority-medium" : "text-priority-high"
                    }`}>
                      {client.acceptanceRate}%
                    </span>
                  </div>
                  <Progress value={client.acceptanceRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={`font-semibold ${
                      deliveryRate >= 75 ? "text-priority-low" :
                      deliveryRate >= 50 ? "text-priority-medium" : "text-priority-high"
                    }`}>
                      {deliveryRate}%
                    </span>
                  </div>
                  <Progress value={deliveryRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Completion</span>
                    <span className="font-semibold text-foreground">{completionPct}%</span>
                  </div>
                  <Progress value={completionPct} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Conversion</span>
                    <span className="font-semibold text-primary">{conversionRate}%</span>
                  </div>
                  <Progress value={conversionRate} className="h-2" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Avg $/Campaign</div>
                  <p className="text-sm font-bold text-foreground">${avgSpend.toLocaleString()}</p>
                </div>
              </div>

              {/* Bottom row: active intros, stage breakdown, deadline */}
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-semibold text-foreground">{client.activeIntros} active intros</span>
                  <span className="text-[10px] text-muted-foreground">
                    ({client.introsDelivered} delivered · {client.introsRejected} rejected)
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <Calendar className={`w-3 h-3 ${deadlineSoon ? "text-priority-high" : "text-muted-foreground"}`} />
                  <span className={`text-[10px] font-semibold ${deadlineSoon ? "text-priority-high" : "text-muted-foreground"}`}>
                    Next: {new Date(client.nextDeadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Stage breakdown pills */}
              {Object.keys(stages).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {Object.entries(stages).map(([stage, count]) => (
                    <span key={stage} className="text-[9px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
                      {stage} ({count})
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}