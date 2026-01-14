import { useIncidentsQuery } from "@/features/Incidents/hooks/useIncidentsQuery";

import { useMemo, useState } from "react";

import type { Incident } from "@/api/types";
import type { Filters } from "./types";

import { Loading } from "@/components/ui";
import { IncidentListItem, IncidentFilters } from "./components";

interface IncidentListProps {
  onSelect: (incidentId: Incident["id"]) => void;
  selectedIncidentId?: Incident["id"];
}

export function IncidentList({
  onSelect,
  selectedIncidentId,
}: IncidentListProps) {
  const { data: incidents, isLoading, error } = useIncidentsQuery();

  const [filters, setFilters] = useState<Filters>({
    status: "all",
    severity: "all",
    search: "",
  });

  const filteredIncidents = useMemo(() => {
    if (!incidents) return [];

    return incidents?.filter((incident) => {
      const matchesStatus =
        filters.status === "all" || incident.status === filters.status;
      const matchesSeverity =
        filters.severity === "all" || incident.severity === filters.severity;
      const matchesSearch =
        incident.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        incident.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      return matchesStatus && matchesSeverity && matchesSearch;
    });
  }, [incidents, filters]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading incidents: {error.message}</div>;
  }

  return (
    <>
      <IncidentFilters filters={filters} onFiltersChange={setFilters} />
      <div className="incident-list-items">
        {filteredIncidents?.map((incident) => (
          <IncidentListItem
            key={incident.id}
            incident={incident}
            onClick={() => onSelect(incident.id)}
            isSelected={incident.id === selectedIncidentId}
          />
        ))}
      </div>
    </>
  );
}
