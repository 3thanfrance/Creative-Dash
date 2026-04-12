import { useState } from "react";
import { LayoutDashboard, Calendar, Users } from "lucide-react";
import { WeekCalendar } from "@/components/dashboard/WeekCalendar";
import { PriorityBuckets } from "@/components/dashboard/PriorityBuckets";
import { BountyBoard } from "@/components/dashboard/BountyBoard";
import { CalendarView } from "@/components/dashboard/CalendarView";
import { ClientsView } from "@/components/dashboard/ClientsView";
import { PersonalAnalytics } from "@/components/dashboard/PersonalAnalytics";

type Tab = "dashboard" | "calendar" | "clients";

const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "calendar", label: "Calendar", icon: Calendar },
  { key: "clients", label: "Clients", icon: Users },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
            Command Center
          </h1>
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4 space-y-3">
        {activeTab === "dashboard" && (
          <>
            <WeekCalendar />
            <BountyBoard />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2">
                <PriorityBuckets />
              </div>
              <PersonalAnalytics />
            </div>
          </>
        )}
        {activeTab === "calendar" && <CalendarView />}
        {activeTab === "clients" && <ClientsView />}
      </main>
    </div>
  );
}
