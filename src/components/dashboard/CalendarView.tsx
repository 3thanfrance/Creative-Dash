import { useState } from "react";
import { calendarEvents, clients } from "@/data/mockData";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const priorityColor: Record<string, string> = {
  high: "bg-priority-high text-primary-foreground",
  medium: "bg-priority-medium text-foreground",
  low: "bg-priority-low text-primary-foreground",
};

const typeIcon: Record<string, string> = {
  meeting: "📅",
  deadline: "⏰",
  review: "📋",
};

export function CalendarView({ onBack }: { onBack?: () => void }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const base = new Date("2026-04-01");
  base.setMonth(base.getMonth() + monthOffset);

  const year = base.getFullYear();
  const month = base.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel = base.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  while (cells.length % 7 !== 0) cells.push(null);

  const iso = (day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const monthEvents = calendarEvents.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const clientEventCounts: Record<string, number> = {};
  monthEvents.forEach((e) => {
    clientEventCounts[e.clientName] = (clientEventCounts[e.clientName] || 0) + 1;
  });

  const clientSummary = Object.entries(clientEventCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => {
      const client = clients.find((c) => c.name === name);
      return { name, count, client };
    });

  return (
    <div className="space-y-3">
      {onBack && (
        <Button variant="ghost" size="sm" onClick={onBack} className="text-xs text-muted-foreground">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Dashboard
        </Button>
      )}

      <div className="rounded-xl border border-border bg-card p-3">
        <h3 className="text-xs font-semibold text-foreground mb-2">
          Client Activity — {monthLabel}
        </h3>
        {clientSummary.length === 0 ? (
          <p className="text-[10px] text-muted-foreground italic">No events this month</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {clientSummary.map(({ name, count, client }) => (
              <div key={name} className="flex items-center gap-1.5 bg-secondary rounded-md px-2 py-1">
                <span className="text-[10px] font-semibold text-foreground">{name}</span>
                <span className="text-[9px] bg-primary/10 text-primary px-1 py-0.5 rounded-full font-medium">
                  {count}
                </span>
                {client && (
                  <span className="text-[9px] text-muted-foreground">
                    {client.campaignsCompleted}/{client.campaignsTotal}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setMonthOffset((o) => o - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-sm font-semibold text-foreground">{monthLabel}</h2>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setMonthOffset((o) => o + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-[10px] font-medium text-muted-foreground py-1">{d}</div>
          ))}
          {cells.map((day, i) => {
            const events = day ? calendarEvents.filter((e) => e.date === iso(day)) : [];
            return (
              <div
                key={i}
                className={`min-h-[72px] rounded-lg p-1 ${
                  day ? "bg-secondary/50 hover:bg-accent/50 transition-colors" : ""
                }`}
              >
                {day && (
                  <>
                    <span className="text-[10px] font-medium text-muted-foreground">{day}</span>
                    <div className="mt-0.5 space-y-0.5">
                      {events.map((ev) => (
                        <div
                          key={ev.id}
                          className={`text-[9px] rounded px-1 py-0.5 truncate ${priorityColor[ev.priority]}`}
                          title={`${ev.type}: ${ev.clientName}`}
                        >
                          {typeIcon[ev.type] || ""} {ev.clientName}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
