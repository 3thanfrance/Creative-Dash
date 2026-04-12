import { useState } from "react";
import { calendarEvents } from "@/data/mockData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const priorityColor: Record<string, string> = {
  high: "bg-priority-high text-primary-foreground",
  medium: "bg-priority-medium text-foreground",
  low: "bg-priority-low text-primary-foreground",
};

export function CalendarView() {
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

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={() => setMonthOffset((o) => o - 1)}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold text-foreground">{monthLabel}</h2>
        <Button variant="ghost" size="icon" onClick={() => setMonthOffset((o) => o + 1)}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-xs font-medium text-muted-foreground py-2">{d}</div>
        ))}
        {cells.map((day, i) => {
          const events = day ? calendarEvents.filter((e) => e.date === iso(day)) : [];
          return (
            <div
              key={i}
              className={`min-h-[80px] rounded-lg p-1.5 ${
                day ? "bg-secondary/50 hover:bg-accent/50 transition-colors" : ""
              }`}
            >
              {day && (
                <>
                  <span className="text-xs font-medium text-muted-foreground">{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {events.map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[10px] rounded px-1 py-0.5 truncate ${priorityColor[ev.priority]}`}
                      >
                        {ev.clientName}
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
  );
}
