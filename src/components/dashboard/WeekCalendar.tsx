import { calendarEvents } from "@/data/mockData";

const priorityBarColor: Record<string, string> = {
  high: "bg-priority-high",
  medium: "bg-priority-medium",
  low: "bg-priority-low",
};

export function WeekCalendar() {
  const today = new Date("2026-04-13");
  const days = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const iso = (d: Date) => d.toISOString().split("T")[0];

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <h2 className="text-sm font-semibold text-foreground mb-2">5-Day Outlook</h2>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((day, i) => {
          const events = calendarEvents.filter((e) => e.date === iso(day));
          const isToday = i === 0;
          return (
            <div
              key={i}
              className={`rounded-md p-2 min-h-[70px] ${
                isToday ? "bg-accent border border-primary" : "bg-secondary/60"
              }`}
            >
              <p className={`text-[10px] font-medium mb-1.5 ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                {fmt(day)}
              </p>
              <div className="space-y-1">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className={`${priorityBarColor[ev.priority]} rounded px-1.5 py-1 text-[10px] font-medium text-primary-foreground truncate`}
                  >
                    {ev.clientName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
