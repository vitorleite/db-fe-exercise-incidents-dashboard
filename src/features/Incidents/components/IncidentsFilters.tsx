import { IncidentSeverity, IncidentStatus } from "@/api";
import { Filters } from "../types";

import styles from "../incidents.module.css";

interface IncidentFiltersProps {
  filters: Filters;
  onFiltersChange: (newFilters: Filters) => void;
}

export function IncidentFilters({
  filters,
  onFiltersChange,
}: IncidentFiltersProps) {
  return (
    <div className={styles.incidentFilters}>
      <input
        type="text"
        placeholder="Search incidents..."
        value={filters.search}
        onChange={(e) =>
          onFiltersChange({ ...filters, search: e.target.value })
        }
      />

      <select
        value={filters.status}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            status: e.target.value as IncidentStatus | "all",
          })
        }
      >
        <option value="all">All Statuses</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <select
        value={filters.severity}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            severity: e.target.value as IncidentSeverity | "all",
          })
        }
      >
        <option value="all">All Severities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>
    </div>
  );
}
