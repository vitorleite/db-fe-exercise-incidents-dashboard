import { IncidentSeverity, IncidentStatus } from "./types";

export const STATUS_OPTIONS: IncidentStatus[] = [
  "Open",
  "In Progress",
  "Resolved",
];

export const SEVERITY_OPTIONS: IncidentSeverity[] = [
  "Low",
  "Medium",
  "High",
  "Critical",
];
