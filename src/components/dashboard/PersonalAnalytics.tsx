import { completedCampaigns, campaigns, bountyBoard, finalQACampaigns, clients } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Target, Clock, DollarSign, Star, CheckCircle, ClipboardCheck, Calendar } from "lucide-react";

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
    { icon: CheckCircle, label: "Completed", value: totalCompleted.toString(), color: "text-priority-low" },
    { icon: TrendingUp, label: "Conversion", value: `${conversionRate}%`, color: "text-primary" },
    { icon: DollarSign, label: "Avg $/Campaign", value: `$${avgSpend.toLocaleString()}`, color: "text-priority-medium" },
    { icon: Target, label: "Acceptance", value: `${acceptanceRate}%`, color: "text-priority-low" },
    { icon: Star, label: "Avg Score", value: `${avgScore}/10`, color: "text-primary" },
    { icon: Clock, label: "Avg Time", value: `${avgDays}d`, color: "text-priority-medium" },
  ];

  const myActive = campaigns.filter((c) => c.assignedTo === "sarah");
  const availableBounties = bountyBoard;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">My Performance</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-2.5 text-center">
            <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
            <p className="text-lg font-bold text-foreground leading-tight">{s.value}</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      {/* Final QA Section */}
      {finalQACampaigns.length > 0 && (
        <div className="rounded-xl border border-[hsl(210,60%,70%)]/30 bg-[hsl(210,60%,95%)]/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardCheck className="w-4 h-4 text-[hsl(210,60%,55%)]" />
            <h3 className="text-sm font-semibold text-foreground">Final QA</h3>
            <span className="text-[10px] text-muted-foreground">Submitted — awaiting acceptance</span>
            <span className="text-[10px] font-bold text-[hsl(210,60%,55%)] bg-[hsl(210,60%,90%)]/30 px-1.5 py-0.5 rounded-full ml-auto">
              {finalQACampaigns.length}
            </span>
          </div>
          <div className="grid gap-1.5">
            {finalQACampaigns.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-card rounded-lg px-3 py-2 border border-border">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono font-bold text-muted-foreground bg-secondary px-1 py-0.5 rounded">
                    {c.referenceCode}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{c.clientName}</p>
                    <p className="text-[10px] text-muted-foreground">{c.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {c.deadlineDate && (
                    <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                      <Calendar className="w-2.5 h-2.5" />
                      <span>{new Date(c.deadlineDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                  )}
                  <span className="text-[9px] text-muted-foreground">
                    Submitted {new Date(c.reviewDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= c.difficulty ? "bg-foreground" : "bg-border"}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Client Distribution */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Client Distribution</h3>
          <div className="flex items-center gap-3">
            <div className="w-[120px] h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
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
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-[10px] text-foreground">{entry.name}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto font-medium">
                    {Math.round((entry.value / totalCompleted) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Active */}
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            My Active <span className="text-muted-foreground font-normal">({myActive.length})</span>
          </h3>
          <div className="space-y-1.5">
            {myActive.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono font-bold text-muted-foreground bg-background px-1 py-0.5 rounded">
                    {c.referenceCode}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{c.clientName}</p>
                    <p className="text-[10px] text-muted-foreground">{c.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {c.deadlineDate && (
                    <span className="text-[9px] text-muted-foreground">
                      {new Date(c.deadlineDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  )}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${i <= c.difficulty ? "bg-foreground" : "bg-border"}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Bounties */}
        <div className="rounded-xl border border-dashed border-primary/30 bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Available Bounties <span className="text-muted-foreground font-normal">({availableBounties.length})</span>
          </h3>
          <div className="space-y-1.5">
            {availableBounties.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-accent/30 rounded-lg px-3 py-2 cursor-pointer hover:bg-accent/60 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono font-bold text-muted-foreground bg-background px-1 py-0.5 rounded">
                    {c.referenceCode}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{c.contactName.split("(")[0].trim()}</p>
                    <p className="text-[10px] text-muted-foreground">{c.clientName}</p>
                  </div>
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