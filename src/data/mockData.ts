export type Priority = "high" | "medium" | "low";
export type CampaignDifficulty = 1 | 2 | 3;
export type CampaignStatus = "urgent" | "blocker" | "review" | "in-progress" | "pending-info" | "backlog" | "scheduled" | "ga-ready" | "final-check" | "awaiting-feedback" | "procurement" | "delivered" | "rejected";

export interface Campaign {
  id: string;
  clientName: string;
  contactName: string;
  referenceCode: string;
  status: CampaignStatus;
  priority: Priority;
  difficulty: CampaignDifficulty;
  assignedTo?: string;
  reviewDate: string;
  deadlineDate?: string;
  avatars: string[];
  completedDate?: string;
  score?: number;
  startDate?: string;
}

export interface ClientDetails {
  id: string;
  name: string;
  acceptanceRate: number;
  monthlyContractValue: number;
  totalContractValue: number;
  campaignsCompleted: number;
  campaignsTotal: number;
  introsDelivered: number;
  introsRejected: number;
  activeIntros: number;
  opsOwner: string;
  nextDeadline: string;
  logo?: string;
}

export interface ProcurementItem {
  id: string;
  referenceCode: string;
  clientName: string;
  contactName: string;
  status: "ordered" | "in-transit" | "stuck" | "received" | "pending-order";
  orderedDate?: string;
  expectedDate?: string;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  clientName: string;
  date: string;
  time?: string;
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
  { id: "1", referenceCode: "MGS-12", clientName: "MagicSchool", contactName: "Sarah Jenkins (Prospect)", status: "urgent", priority: "high", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-04-13", deadlineDate: "2026-04-14", avatars: ["DY", "SJ"], startDate: "2026-03-20", score: 8 },
  { id: "2", referenceCode: "FRM-07", clientName: "Fermat", contactName: "Alex Chen (Prospect)", status: "blocker", priority: "high", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-04-14", deadlineDate: "2026-04-15", avatars: ["HA", "AC"], startDate: "2026-03-25", score: 7 },
  { id: "3", referenceCode: "MGS-14", clientName: "MagicSchool", contactName: "Michael Brown (Prospect)", status: "review", priority: "high", difficulty: 1, assignedTo: "michael", reviewDate: "2026-04-14", deadlineDate: "2026-04-16", avatars: ["DY", "MB"], startDate: "2026-04-01", score: 9 },
  { id: "4", referenceCode: "ACR-03", clientName: "Accrual", contactName: "Emily Davis (Prospect)", status: "in-progress", priority: "medium", difficulty: 2, assignedTo: "emily", reviewDate: "2026-04-16", deadlineDate: "2026-04-20", avatars: ["HA", "ED"], startDate: "2026-03-28" },
  { id: "5", referenceCode: "OMN-48", clientName: "Omni", contactName: "Chris Wilson (Prospect)", status: "pending-info", priority: "medium", difficulty: 3, assignedTo: "chris", reviewDate: "2026-04-17", avatars: ["DY", "CW"], startDate: "2026-04-02" },
  { id: "6", referenceCode: "ASH-22", clientName: "Ashby", contactName: "Jessica Lee (Prospect)", status: "backlog", priority: "low", difficulty: 1, assignedTo: "emily", reviewDate: "2026-04-19", avatars: ["HA", "JL"], startDate: "2026-04-05" },
  { id: "7", referenceCode: "PRT-11", clientName: "Portless", contactName: "David Clark (Prospect)", status: "scheduled", priority: "low", difficulty: 2, assignedTo: "chris", reviewDate: "2026-04-20", avatars: ["DY", "DC"], startDate: "2026-04-06" },
  { id: "8", referenceCode: "RPL-05", clientName: "Rippling", contactName: "Q2 Launch Campaign", status: "ga-ready", priority: "low", difficulty: 3, assignedTo: "alex", reviewDate: "2026-04-18", avatars: ["DY"], startDate: "2026-03-15", score: 6 },
  { id: "9", referenceCode: "FRM-09", clientName: "Fermat", contactName: "Website Redesign - Phase 1", status: "awaiting-feedback", priority: "low", difficulty: 2, assignedTo: "alex", reviewDate: "2026-04-21", avatars: ["HA"], startDate: "2026-04-01" },
];

export const completedCampaigns: Campaign[] = [
  { id: "h1", referenceCode: "MGS-08", clientName: "MagicSchool", contactName: "Spring Push", status: "review", priority: "low", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-03-01", avatars: ["SJ"], completedDate: "2026-03-05", score: 8, startDate: "2026-02-15" },
  { id: "h2", referenceCode: "FRM-04", clientName: "Fermat", contactName: "Brand Awareness", status: "review", priority: "medium", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-03-10", avatars: ["SJ"], completedDate: "2026-03-12", score: 7, startDate: "2026-02-20" },
  { id: "h3", referenceCode: "ACR-01", clientName: "Accrual", contactName: "Launch Video", status: "review", priority: "low", difficulty: 1, assignedTo: "sarah", reviewDate: "2026-02-20", avatars: ["SJ"], completedDate: "2026-02-22", score: 9, startDate: "2026-02-10" },
  { id: "h4", referenceCode: "MGS-06", clientName: "MagicSchool", contactName: "Winter Campaign", status: "review", priority: "high", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-02-01", avatars: ["SJ"], completedDate: "2026-02-03", score: 8, startDate: "2026-01-15" },
  { id: "h5", referenceCode: "OMN-32", clientName: "Omni", contactName: "Product Demo", status: "review", priority: "medium", difficulty: 1, assignedTo: "sarah", reviewDate: "2026-01-15", avatars: ["SJ"], completedDate: "2026-01-18", score: 6, startDate: "2026-01-05" },
  { id: "h6", referenceCode: "ASH-18", clientName: "Ashby", contactName: "Hiring Campaign", status: "review", priority: "low", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-03-20", avatars: ["SJ"], completedDate: "2026-03-22", score: 9, startDate: "2026-03-08" },
  { id: "h7", referenceCode: "FRM-02", clientName: "Fermat", contactName: "SEO Push", status: "review", priority: "medium", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-01-28", avatars: ["SJ"], completedDate: "2026-02-01", score: 7, startDate: "2026-01-10" },
  { id: "h8", referenceCode: "MGS-10", clientName: "MagicSchool", contactName: "App Launch", status: "review", priority: "high", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-03-28", avatars: ["SJ"], completedDate: "2026-03-30", score: 8, startDate: "2026-03-10" },
];

// Campaigns submitted for final QA (assigned to "sarah", awaiting acceptance)
export const finalQACampaigns: Campaign[] = [
  { id: "qa1", referenceCode: "MGS-11", clientName: "MagicSchool", contactName: "Holiday Promo Video", status: "final-check", priority: "medium", difficulty: 2, assignedTo: "sarah", reviewDate: "2026-04-12", deadlineDate: "2026-04-16", avatars: ["SJ"], startDate: "2026-03-25", score: 8 },
  { id: "qa2", referenceCode: "FRM-06", clientName: "Fermat", contactName: "Product Walkthrough", status: "final-check", priority: "high", difficulty: 3, assignedTo: "sarah", reviewDate: "2026-04-11", deadlineDate: "2026-04-14", avatars: ["SJ"], startDate: "2026-03-18", score: 7 },
  { id: "qa3", referenceCode: "ACR-02", clientName: "Accrual", contactName: "Onboarding Sequence", status: "final-check", priority: "low", difficulty: 1, assignedTo: "sarah", reviewDate: "2026-04-10", avatars: ["SJ"], startDate: "2026-03-30", score: 9 },
];

export const bountyBoard: Campaign[] = [
  { id: "b1", referenceCode: "STR-01", clientName: "Stripe", contactName: "Rachel Kim (VP Marketing)", status: "backlog", priority: "low", difficulty: 2, reviewDate: "2026-04-25", avatars: [] },
  { id: "b2", referenceCode: "NTN-01", clientName: "Notion", contactName: "Tyler Nguyen (Head of Growth)", status: "backlog", priority: "low", difficulty: 1, reviewDate: "2026-04-28", avatars: [] },
  { id: "b3", referenceCode: "LNR-01", clientName: "Linear", contactName: "Sam Patel (CMO)", status: "backlog", priority: "medium", difficulty: 3, reviewDate: "2026-04-15", deadlineDate: "2026-04-18", avatars: [] },
  { id: "b4", referenceCode: "VCL-01", clientName: "Vercel", contactName: "Maya Torres (Brand Lead)", status: "backlog", priority: "low", difficulty: 1, reviewDate: "2026-04-30", avatars: [] },
];

export const clients: ClientDetails[] = [
  { id: "c1", name: "MagicSchool", acceptanceRate: 72, monthlyContractValue: 15000, totalContractValue: 180000, campaignsCompleted: 8, campaignsTotal: 15, introsDelivered: 42, introsRejected: 12, activeIntros: 18, opsOwner: "Sarah Jenkins", nextDeadline: "2026-04-14" },
  { id: "c2", name: "Fermat", acceptanceRate: 45, monthlyContractValue: 8500, totalContractValue: 102000, campaignsCompleted: 5, campaignsTotal: 12, introsDelivered: 20, introsRejected: 18, activeIntros: 14, opsOwner: "Alex Chen", nextDeadline: "2026-04-15" },
  { id: "c3", name: "Accrual", acceptanceRate: 88, monthlyContractValue: 12000, totalContractValue: 144000, campaignsCompleted: 10, campaignsTotal: 12, introsDelivered: 35, introsRejected: 4, activeIntros: 8, opsOwner: "Emily Davis", nextDeadline: "2026-04-20" },
  { id: "c4", name: "Omni", acceptanceRate: 60, monthlyContractValue: 6000, totalContractValue: 72000, campaignsCompleted: 3, campaignsTotal: 8, introsDelivered: 15, introsRejected: 9, activeIntros: 12, opsOwner: "Chris Wilson", nextDeadline: "2026-04-17" },
  { id: "c5", name: "Ashby", acceptanceRate: 91, monthlyContractValue: 20000, totalContractValue: 240000, campaignsCompleted: 14, campaignsTotal: 16, introsDelivered: 55, introsRejected: 5, activeIntros: 6, opsOwner: "Emily Davis", nextDeadline: "2026-04-19" },
  { id: "c6", name: "Rippling", acceptanceRate: 55, monthlyContractValue: 25000, totalContractValue: 300000, campaignsCompleted: 6, campaignsTotal: 20, introsDelivered: 28, introsRejected: 22, activeIntros: 24, opsOwner: "Alex Chen", nextDeadline: "2026-04-18" },
  { id: "c7", name: "Portless", acceptanceRate: 78, monthlyContractValue: 9500, totalContractValue: 114000, campaignsCompleted: 7, campaignsTotal: 10, introsDelivered: 30, introsRejected: 8, activeIntros: 10, opsOwner: "Chris Wilson", nextDeadline: "2026-04-20" },
];

export const procurementItems: ProcurementItem[] = [
  { id: "p1", referenceCode: "PRO-001", clientName: "MagicSchool", contactName: "Sarah Jenkins", status: "in-transit", orderedDate: "2026-04-08", expectedDate: "2026-04-15", notes: "Gift box — FedEx tracking live" },
  { id: "p2", referenceCode: "PRO-002", clientName: "Fermat", contactName: "Alex Chen", status: "ordered", orderedDate: "2026-04-10", expectedDate: "2026-04-18" },
  { id: "p3", referenceCode: "PRO-003", clientName: "Omni", contactName: "Chris Wilson", status: "stuck", orderedDate: "2026-04-05", expectedDate: "2026-04-12", notes: "Vendor delayed — escalated" },
  { id: "p4", referenceCode: "PRO-004", clientName: "Accrual", contactName: "Emily Davis", status: "received", orderedDate: "2026-04-01", expectedDate: "2026-04-10" },
  { id: "p5", referenceCode: "PRO-005", clientName: "Rippling", contactName: "David Kim", status: "pending-order", notes: "Awaiting budget approval" },
  { id: "p6", referenceCode: "PRO-006", clientName: "Ashby", contactName: "Jessica Lee", status: "in-transit", orderedDate: "2026-04-09", expectedDate: "2026-04-16" },
  { id: "p7", referenceCode: "PRO-007", clientName: "Portless", contactName: "David Clark", status: "ordered", orderedDate: "2026-04-11", expectedDate: "2026-04-19" },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", clientName: "MagicSchool", date: "2026-04-13", time: "9:00 AM", priority: "high", type: "meeting" },
  { id: "e2", clientName: "Fermat", date: "2026-04-13", time: "2:30 PM", priority: "high", type: "review" },
  { id: "e3", clientName: "Accrual", date: "2026-04-14", time: "10:00 AM", priority: "medium", type: "meeting" },
  { id: "e4", clientName: "Omni", date: "2026-04-15", time: "11:30 AM", priority: "medium", type: "meeting" },
  { id: "e5", clientName: "Rippling", date: "2026-04-17", time: "5:00 PM", priority: "low", type: "deadline" },
  { id: "e6", clientName: "Ashby", date: "2026-04-16", time: "1:00 PM", priority: "low", type: "meeting" },
  { id: "e7", clientName: "Portless", date: "2026-04-18", time: "3:00 PM", priority: "low", type: "review" },
  { id: "e8", clientName: "MagicSchool", date: "2026-04-20", time: "10:30 AM", priority: "medium", type: "meeting" },
  { id: "e9", clientName: "Fermat", date: "2026-04-22", time: "4:00 PM", priority: "low", type: "deadline" },
  { id: "e10", clientName: "Stripe", date: "2026-04-25", time: "9:30 AM", priority: "low", type: "meeting" },
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
  "procurement": { bg: "bg-primary/80", text: "text-primary-foreground" },
  "delivered": { bg: "bg-priority-low", text: "text-primary-foreground" },
  "rejected": { bg: "bg-priority-high", text: "text-primary-foreground" },
};