import { IncidentSeverity, IncidentStatus } from "@/api";

export interface Filters {
  status: IncidentStatus | "all";
  severity: IncidentSeverity | "all";
  search: string;
}
