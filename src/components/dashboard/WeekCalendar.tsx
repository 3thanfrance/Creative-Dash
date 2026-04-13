import { calendarEvents } from "@/data/mockData";
import { Maximize2 } from "lucide-react";

const priorityBarColor: Record<string, string> = {
  high: "bg-priority-high",
  medium: "bg-priority-medium",
  low: "bg-priority-low",
};

export function WeekCalendar({ onExpand }: { onExpand?: () => void }) {
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
    <div
      className="rounded-xl border border-border bg-card p-3 cursor-pointer hover:border-primary/40 transition-colors"
      onClick={onExpand}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-foreground">5-Day Outlook</h2>
        {onExpand && (
          <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </div>
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
                    className={`${priorityBarColor[ev.priority]} rounded px-1.5 py-1 text-[10px] font-medium text-primary-foreground`}
                  >
                    <span className="truncate block">{ev.clientName}</span>
                    {ev.time && (
                      <span className="text-[8px] opacity-80 block">{ev.time}</span>
                    )}
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
