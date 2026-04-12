import { completedCampaigns, clients } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Target, Clock, DollarSign, Star, CheckCircle } from "lucide-react";

const COLORS = [
  "hsl(270, 80%, 55%)",
  "hsl(290, 80%, 60%)",
  "hsl(310, 80%, 55%)",
  "hsl(200, 70%, 50%)",
  "hsl(170, 60%, 45%)",
  "hsl(40, 96%, 53%)",
  "hsl(0, 72%, 51%)",
];

export function PersonalAnalytics() {
  const myCampaigns = completedCampaigns; // all assigned to "sarah"

  const totalCompleted = myCampaigns.length;

  // Conversion rate: campaigns with score >= 7 / total
  const converted = myCampaigns.filter((c) => (c.score ?? 0) >= 7).length;
  const conversionRate = totalCompleted > 0 ? Math.round((converted / totalCompleted) * 100) : 0;

  // Average spend: use client data to estimate
  const avgSpend = (() => {
    const clientNames = [...new Set(myCampaigns.map((c) => c.clientName))];
    const relevantClients = clients.filter((cl) => clientNames.includes(cl.name));
    if (relevantClients.length === 0) return 0;
    const totalAvg = relevantClients.reduce((sum, cl) => {
      return sum + (cl.campaignsTotal > 0 ? cl.totalContractValue / cl.campaignsTotal : 0);
    }, 0);
    return Math.round(totalAvg / relevantClients.length);
  })();

  // Acceptance rate from clients I work with
  const myClientNames = [...new Set(myCampaigns.map((c) => c.clientName))];
  const myClients = clients.filter((cl) => myClientNames.includes(cl.name));
  const acceptanceRate = myClients.length > 0
    ? Math.round(myClients.reduce((s, c) => s + c.acceptanceRate, 0) / myClients.length)
    : 0;

  // Average score
  const scored = myCampaigns.filter((c) => c.score != null);
  const avgScore = scored.length > 0
    ? (scored.reduce((s, c) => s + (c.score ?? 0), 0) / scored.length).toFixed(1)
    : "N/A";

  // Average campaign time in days
  const withDates = myCampaigns.filter((c) => c.startDate && c.completedDate);
  const avgDays = withDates.length > 0
    ? Math.round(
        withDates.reduce((s, c) => {
          const start = new Date(c.startDate!).getTime();
          const end = new Date(c.completedDate!).getTime();
          return s + (end - start) / (1000 * 60 * 60 * 24);
        }, 0) / withDates.length
      )
    : 0;

  // Pie chart: campaigns per client
  const clientCounts: Record<string, number> = {};
  myCampaigns.forEach((c) => {
    clientCounts[c.clientName] = (clientCounts[c.clientName] || 0) + 1;
  });
  const pieData = Object.entries(clientCounts).map(([name, value]) => ({ name, value }));

  const stats = [
    { icon: CheckCircle, label: "Campaigns Completed", value: totalCompleted.toString(), color: "text-priority-low" },
    { icon: TrendingUp, label: "Conversion Rate", value: `${conversionRate}%`, color: "text-primary" },
    { icon: DollarSign, label: "Avg Spend/Campaign", value: `$${avgSpend.toLocaleString()}`, color: "text-priority-medium" },
    { icon: Target, label: "Acceptance Rate", value: `${acceptanceRate}%`, color: "text-priority-low" },
    { icon: Star, label: "Avg Campaign Score", value: `${avgScore}/10`, color: "text-primary" },
    { icon: Clock, label: "Avg Campaign Time", value: `${avgDays} days`, color: "text-priority-medium" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h2 className="text-sm font-semibold text-foreground mb-3">My Performance</h2>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-secondary/50 rounded-lg p-2.5 text-center">
            <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
            <p className="text-lg font-bold text-foreground leading-tight">{s.value}</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground mb-2">Client Distribution</h3>
        <div className="flex items-center gap-4">
          <div className="w-[120px] h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={55}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-1">
            {pieData.map((entry, i) => (
              <div key={entry.name} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-[10px] text-foreground">{entry.name}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {Math.round((entry.value / totalCompleted) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
