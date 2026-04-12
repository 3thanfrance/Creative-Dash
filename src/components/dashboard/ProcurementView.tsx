import { procurementItems, type ProcurementItem } from "@/data/mockData";
import { Package, Truck, AlertCircle, CheckCircle, Clock } from "lucide-react";

const statusConfig: Record<ProcurementItem["status"], { icon: typeof Package; color: string; bg: string; label: string }> = {
  "pending-order": { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", label: "Pending Order" },
  "ordered": { icon: Package, color: "text-primary", bg: "bg-primary/10", label: "Ordered" },
  "in-transit": { icon: Truck, color: "text-priority-medium", bg: "bg-priority-medium/10", label: "In Transit" },
  "stuck": { icon: AlertCircle, color: "text-priority-high", bg: "bg-priority-high/10", label: "Stuck" },
  "received": { icon: CheckCircle, color: "text-priority-low", bg: "bg-priority-low/10", label: "Received" },
};

export function ProcurementView() {
  const grouped = {
    stuck: procurementItems.filter((p) => p.status === "stuck"),
    "pending-order": procurementItems.filter((p) => p.status === "pending-order"),
    ordered: procurementItems.filter((p) => p.status === "ordered"),
    "in-transit": procurementItems.filter((p) => p.status === "in-transit"),
    received: procurementItems.filter((p) => p.status === "received"),
  };

  const totalActive = procurementItems.filter((p) => p.status !== "received").length;
  const stuckCount = grouped.stuck.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Procurement Pipeline</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{totalActive} active</span>
          {stuckCount > 0 && (
            <span className="text-[10px] font-bold text-priority-high bg-priority-high/10 px-2 py-0.5 rounded-full">
              {stuckCount} STUCK
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        {(Object.entries(grouped) as [ProcurementItem["status"], ProcurementItem[]][]).map(([status, items]) => {
          if (items.length === 0) return null;
          const config = statusConfig[status];
          const Icon = config.icon;
          return (
            <div key={status}>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{config.label}</span>
                <span className="text-[10px] text-muted-foreground">{items.length}</span>
              </div>
              <div className="grid gap-1.5 ml-5">
                {items.map((item) => (
                  <div key={item.id} className={`rounded-lg border border-border ${config.bg} px-3 py-2 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono font-bold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                        {item.referenceCode}
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{item.contactName}</p>
                        <p className="text-[10px] text-muted-foreground">{item.clientName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.expectedDate && (
                        <p className={`text-[10px] font-medium ${
                          item.status === "stuck" ? "text-priority-high" : "text-muted-foreground"
                        }`}>
                          ETA: {new Date(item.expectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-[9px] text-muted-foreground italic max-w-[180px] truncate">{item.notes}</p>
                      )}
                    </div>
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