import { clients } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

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
          const conversionRate = client.campaignsTotal > 0
            ? Math.round((client.campaignsCompleted / client.campaignsTotal) * 100)
            : 0;
          return (
            <div key={client.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {client.campaignsCompleted}/{client.campaignsTotal} campaigns completed
                  </p>
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
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Acceptance Rate</span>
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
                  <div className="text-xs text-muted-foreground mb-1">Avg Spend/Campaign</div>
                  <p className="text-sm font-bold text-foreground">${avgSpend.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
