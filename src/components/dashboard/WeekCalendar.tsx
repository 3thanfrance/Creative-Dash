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
    <div className="rounded-xl border border-border bg-card p-4">
      <h2 className="text-lg font-semibold text-foreground mb-3">5-Day Outlook</h2>
      <div className="grid grid-cols-5 gap-2">
        {days.map((day, i) => {
          const events = calendarEvents.filter((e) => e.date === iso(day));
          const isToday = i === 0;
          return (
            <div
              key={i}
              className={`rounded-lg p-3 min-h-[100px] ${
                isToday ? "bg-accent border-2 border-primary" : "bg-secondary"
              }`}
            >
              <p className={`text-xs font-medium mb-2 ${isToday ? "text-primary" : "text-muted-foreground"}`}>
                {fmt(day)}
              </p>
              <div className="space-y-1.5">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className={`${priorityBarColor[ev.priority]} rounded-md px-2 py-1.5 text-xs font-medium text-primary-foreground flex items-center gap-1.5`}
                  >
                    <span className="truncate">{ev.clientName}</span>
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
