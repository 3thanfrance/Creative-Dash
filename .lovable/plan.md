

# UI-to-Database Query Reference Document

I'll generate a clean, organized PDF/Markdown document that maps every unique data point in the Command Center to a sample SQL query. The document will be structured by tab and component, making it easy to hand off to a backend engineer.

## Document Structure

**Section 1 — Schema Overview**
- Entity relationship diagram (text-based)
- Table definitions: `clients`, `campaigns`, `team_members`, `calendar_events`
- Enum types: `campaign_status`, `priority`, `difficulty`

**Section 2 — Dashboard Tab Queries**
1. 5-Day Outlook — events with client name, time, priority, type
2. Bounty Board — unassigned campaigns list
3. Bounty Board preview detail — single campaign lookup
4. Claim bounty mutation — UPDATE assigned_to
5. Unassigned count badge
6. Ops Workload — total active, D1/D2/D3 counts, per-rep load, weighted load %
7. Ops Workload — alert level computation logic
8. Priority Queue — campaigns filtered by assignee + client, grouped by priority
9. Priority Queue — deadline urgency flags (overdue, due soon)

**Section 3 — Clients Tab Queries**
10. Client list with contract values and ops owner
11. Acceptance rate per client
12. Delivery rate (delivered vs rejected intros)
13. Completion rate (campaigns completed / total)
14. Conversion rate
15. Avg spend per campaign
16. Active intros count + delivered/rejected breakdown
17. Next upcoming deadline per client
18. Stage breakdown pills (status distribution per client)

**Section 4 — Me Tab Queries**
19. Total completed campaigns (for current user)
20. Conversion rate (score >= 7 threshold)
21. Avg spend per campaign across my clients
22. Acceptance rate across my clients
23. Avg quality score
24. Avg completion time (days)
25. Client distribution pie chart data
26. My Active campaigns list
27. Final QA — campaigns in `final-check` status

**Section 5 — Expanded Calendar Queries**
28. Monthly calendar events grid
29. Client activity summary (event counts per client per month)

**Section 6 — Mutation Queries**
30. Claim bounty
31. Update campaign status
32. Reassign campaign

## Output
A well-formatted Markdown file saved to `/mnt/documents/` covering all 31+ queries, each with:
- **UI element** it powers (with component name)
- **What it shows** (plain English)
- **Sample SQL**
- **Notes** on thresholds, derived logic, or joins

