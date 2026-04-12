import { completedCampaigns, campaigns, bountyBoard, clients } from "@/data/mockData";
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
  const myCampaigns = completedCampaigns;
  const totalCompleted = myCampaigns.length;

  const converted = myCampaigns.filter((c) => (c.score ?? 0) >= 7).length;
  const conversionRate = totalCompleted > 0 ? Math.round((converted / totalCompleted) * 100) : 0;

  const avgSpend = (() => {
    const clientNames = [...new Set(myCampaigns.map((c) => c.clientName))];
    const relevantClients = clients.filter((cl) => clientNames.includes(cl.name));
    if (relevantClients.length === 0) return 0;
    const totalAvg = relevantClients.reduce((sum, cl) => {
      return sum + (cl.campaignsTotal > 0 ? cl.totalContractValue / cl.campaignsTotal : 0);
    }, 0);
    return Math.round(totalAvg / relevantClients.length);
  })();

  const myClientNames = [...new Set(myCampaigns.map((c) => c.clientName))];
  const myClients = clients.filter((cl) => myClientNames.includes(cl.name));
  const acceptanceRate = myClients.length > 0
    ? Math.round(myClients.reduce((s, c) => s + c.acceptanceRate, 0) / myClients.length)
    : 0;

  const scored = myCampaigns.filter((c) => c.score != null);
  const avgScore = scored.length > 0
    ? (scored.reduce((s, c) => s + (c.score ?? 0), 0) / scored.length).toFixed(1)
    : "N/A";

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

  // Active campaigns assigned to me
  const myActive = campaigns.filter((c) => c.assignedTo === "sarah");
  const availableBounties = bountyBoard;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">My Performance</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <s.icon className={`w-5 h-5 mx-auto mb-1.5 ${s.color}`} />
            <p className="text-xl font-bold text-foreground leading-tight">{s.value}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Client Distribution */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Client Distribution</h3>
          <div className="flex items-center gap-4">
            <div className="w-[140px] h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={60}
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
            <div className="flex-1 space-y-1.5">
              {pieData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-xs text-foreground">{entry.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto font-medium">
                    {Math.round((entry.value / totalCompleted) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Active Campaigns */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            My Active <span className="text-muted-foreground font-normal">({myActive.length})</span>
          </h3>
          <div className="space-y-2">
            {myActive.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                <div>
                  <p className="text-xs font-semibold text-foreground">{c.clientName}</p>
                  <p className="text-[10px] text-muted-foreground">{c.contactName}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= c.difficulty ? "bg-foreground" : "bg-border"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Bounties */}
        <div className="rounded-xl border border-dashed border-primary/30 bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Available Bounties <span className="text-muted-foreground font-normal">({availableBounties.length})</span>
          </h3>
          <div className="space-y-2">
            {availableBounties.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-accent/30 rounded-lg px-3 py-2 cursor-pointer hover:bg-accent/60 transition-colors">
                <div>
                  <p className="text-xs font-semibold text-foreground">{c.contactName.split(" - ")[0]}</p>
                  <p className="text-[10px] text-muted-foreground">{c.clientName}</p>
                </div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                  c.priority === "medium" ? "bg-priority-medium text-foreground" : "bg-priority-low text-primary-foreground"
                }`}>
                  D{c.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
