export type Priority = "high" | "medium" | "low";
export type CampaignDifficulty = 1 | 2 | 3;
export type CampaignStatus = "urgent" | "blocker" | "review" | "in-progress" | "pending-info" | "backlog" | "scheduled" | "ga-ready" | "final-check" | "awaiting-feedback";

export interface Campaign {
  id: string;
  clientName: string;
  contactName: string;
  status: CampaignStatus;
  priority: Priority;
  difficulty: CampaignDifficulty;
  assignedTo?: string;
  reviewDate: string;
  avatars: string[];
  completedDate?: string; // ISO date if completed
  score?: number; // 1-10 campaign quality score
  startDate?: string; // ISO date
}

export interface ClientDetails {
  id: string;
  name: string;
  acceptanceRate: number;
  monthlyContractValue: number;
  totalContractValue: number;
  campaignsCompleted: number;
  campaignsTotal: number;
  logo?: string;
}

export interface CalendarEvent {
  id: string;
  clientName: string;
  date: string;
  priority: Priority;
  type: "meeting" | "deadline" | "review";
}

export const teamMembers = [
  { id: "all", name: "All Team" },
  { id: "sarah", name: "Sarah Jenkins" },
  { id: "alex", name: "Alex Chen" },
  { id: "emily", name: "Emily Davis" },
  { id: "chris", name: "Chris Wilson" },
  { id: "michael", name: "Michael Brown" },
];

export const campaigns: Campaign[] = [
  { id: "1", clientName: "MagicSchool", contactName: "Sarah Jenkins (Prospect)", status: "urgent", priority: "high", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-04-13", avatars: ["DY", "SJ"], startDate: "2026-03-20", score: 8 },
  { id: "2", clientName: "Fermat", contactName: "Alex Chen (Prospect)", status: "blocker", priority: "high", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-04-14", avatars: ["HA", "AC"], startDate: "2026-03-25", score: 7 },
  { id: "3", clientName: "MagicSchool", contactName: "Michael Brown (Prospect)", status: "review", priority: "high", difficulty: 1, assignedTo: "michael", reviewDate: "2026-04-14", avatars: ["DY", "MB"], startDate: "2026-04-01", score: 9 },
  { id: "4", clientName: "Accrual", contactName: "Emily Davis (Prospect)", status: "in-progress", priority: "medium", difficulty: 2, assignedTo: "emily", reviewDate: "2026-04-16", avatars: ["HA", "ED"], startDate: "2026-03-28" },
  { id: "5", clientName: "Omni", contactName: "Chris Wilson (Prospect)", status: "pending-info", priority: "medium", difficulty: 3, assignedTo: "chris", reviewDate: "2026-04-17", avatars: ["DY", "CW"], startDate: "2026-04-02" },
  { id: "6", clientName: "Ashby", contactName: "Jessica Lee (Prospect)", status: "backlog", priority: "low", difficulty: 1, assignedTo: "emily", reviewDate: "2026-04-19", avatars: ["HA", "JL"], startDate: "2026-04-05" },
  { id: "7", clientName: "Portless", contactName: "David Clark (Prospect)", status: "scheduled", priority: "low", difficulty: 2, assignedTo: "chris", reviewDate: "2026-04-20", avatars: ["DY", "DC"], startDate: "2026-04-06" },
  { id: "8", clientName: "Rippling", contactName: "Q2 Launch Campaign", status: "ga-ready", priority: "low", difficulty: 3, assignedTo: "alex", reviewDate: "2026-04-18", avatars: ["DY"], startDate: "2026-03-15", score: 6 },
  { id: "9", clientName: "Fermat", contactName: "Website Redesign - Phase 1", status: "awaiting-feedback", priority: "low", difficulty: 2, assignedTo: "alex", reviewDate: "2026-04-21", avatars: ["HA"], startDate: "2026-04-01" },
];

// Completed campaigns for personal analytics (mock historical data for "sarah")
export const completedCampaigns: Campaign[] = [
  { id: "h1", clientName: "MagicSchool", contactName: "Spring Push", status: "review", priority: "low", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-03-01", avatars: ["SJ"], completedDate: "2026-03-05", score: 8, startDate: "2026-02-15" },
  { id: "h2", clientName: "Fermat", contactName: "Brand Awareness", status: "review", priority: "medium", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-03-10", avatars: ["SJ"], completedDate: "2026-03-12", score: 7, startDate: "2026-02-20" },
  { id: "h3", clientName: "Accrual", contactName: "Launch Video", status: "review", priority: "low", difficulty: 1, assignedTo: "sarah", reviewDate: "2026-02-20", avatars: ["SJ"], completedDate: "2026-02-22", score: 9, startDate: "2026-02-10" },
  { id: "h4", clientName: "MagicSchool", contactName: "Winter Campaign", status: "review", priority: "high", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-02-01", avatars: ["SJ"], completedDate: "2026-02-03", score: 8, startDate: "2026-01-15" },
  { id: "h5", clientName: "Omni", contactName: "Product Demo", status: "review", priority: "medium", difficulty: 1, assignedTo: "sarah", reviewDate: "2026-01-15", avatars: ["SJ"], completedDate: "2026-01-18", score: 6, startDate: "2026-01-05" },
  { id: "h6", clientName: "Ashby", contactName: "Hiring Campaign", status: "review", priority: "low", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-03-20", avatars: ["SJ"], completedDate: "2026-03-22", score: 9, startDate: "2026-03-08" },
  { id: "h7", clientName: "Fermat", contactName: "SEO Push", status: "review", priority: "medium", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-01-28", avatars: ["SJ"], completedDate: "2026-02-01", score: 7, startDate: "2026-01-10" },
  { id: "h8", clientName: "MagicSchool", contactName: "App Launch", status: "review", priority: "high", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-03-28", avatars: ["SJ"], completedDate: "2026-03-30", score: 8, startDate: "2026-03-10" },
];

export const bountyBoard: Campaign[] = [
  { id: "b1", clientName: "Stripe", contactName: "New Integration Campaign", status: "backlog", priority: "low", difficulty: 2, reviewDate: "2026-04-25", avatars: [] },
  { id: "b2", clientName: "Notion", contactName: "Q2 Brand Push", status: "backlog", priority: "low", difficulty: 1, reviewDate: "2026-04-28", avatars: [] },
  { id: "b3", clientName: "Linear", contactName: "Product Launch Support", status: "backlog", priority: "medium", difficulty: 3, reviewDate: "2026-04-15", avatars: [] },
  { id: "b4", clientName: "Vercel", contactName: "Developer Outreach", status: "backlog", priority: "low", difficulty: 1, reviewDate: "2026-04-30", avatars: [] },
];

export const clients: ClientDetails[] = [
  { id: "c1", name: "MagicSchool", acceptanceRate: 72, monthlyContractValue: 15000, totalContractValue: 180000, campaignsCompleted: 8, campaignsTotal: 15 },
  { id: "c2", name: "Fermat", acceptanceRate: 45, monthlyContractValue: 8500, totalContractValue: 102000, campaignsCompleted: 5, campaignsTotal: 12 },
  { id: "c3", name: "Accrual", acceptanceRate: 88, monthlyContractValue: 12000, totalContractValue: 144000, campaignsCompleted: 10, campaignsTotal: 12 },
  { id: "c4", name: "Omni", acceptanceRate: 60, monthlyContractValue: 6000, totalContractValue: 72000, campaignsCompleted: 3, campaignsTotal: 8 },
  { id: "c5", name: "Ashby", acceptanceRate: 91, monthlyContractValue: 20000, totalContractValue: 240000, campaignsCompleted: 14, campaignsTotal: 16 },
  { id: "c6", name: "Rippling", acceptanceRate: 55, monthlyContractValue: 25000, totalContractValue: 300000, campaignsCompleted: 6, campaignsTotal: 20 },
  { id: "c7", name: "Portless", acceptanceRate: 78, monthlyContractValue: 9500, totalContractValue: 114000, campaignsCompleted: 7, campaignsTotal: 10 },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", clientName: "MagicSchool", date: "2026-04-13", priority: "high", type: "meeting" },
  { id: "e2", clientName: "Fermat", date: "2026-04-13", priority: "high", type: "review" },
  { id: "e3", clientName: "Accrual", date: "2026-04-14", priority: "medium", type: "meeting" },
  { id: "e4", clientName: "Omni", date: "2026-04-15", priority: "medium", type: "meeting" },
  { id: "e5", clientName: "Rippling", date: "2026-04-17", priority: "low", type: "deadline" },
  { id: "e6", clientName: "Ashby", date: "2026-04-16", priority: "low", type: "meeting" },
  { id: "e7", clientName: "Portless", date: "2026-04-18", priority: "low", type: "review" },
  { id: "e8", clientName: "MagicSchool", date: "2026-04-20", priority: "medium", type: "meeting" },
  { id: "e9", clientName: "Fermat", date: "2026-04-22", priority: "low", type: "deadline" },
  { id: "e10", clientName: "Stripe", date: "2026-04-25", priority: "low", type: "meeting" },
];

export const statusColors: Record<CampaignStatus, { bg: string; text: string }> = {
  "urgent": { bg: "bg-priority-high", text: "text-primary-foreground" },
  "blocker": { bg: "bg-priority-high", text: "text-primary-foreground" },
  "review": { bg: "bg-primary", text: "text-primary-foreground" },
  "in-progress": { bg: "bg-priority-medium", text: "text-foreground" },
  "pending-info": { bg: "bg-priority-medium", text: "text-foreground" },
  "backlog": { bg: "bg-muted", text: "text-muted-foreground" },
  "scheduled": { bg: "bg-priority-low", text: "text-primary-foreground" },
  "ga-ready": { bg: "bg-priority-low", text: "text-primary-foreground" },
  "final-check": { bg: "bg-primary", text: "text-primary-foreground" },
  "awaiting-feedback": { bg: "bg-priority-medium", text: "text-foreground" },
};
