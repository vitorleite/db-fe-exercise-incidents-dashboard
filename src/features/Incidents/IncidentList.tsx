import { useIncidentsQuery } from "@/features/Incidents/hooks/useIncidentsQuery";

import { IncidentListItem } from "./components";
import { Incident } from "@/api/types";

interface IncidentListProps {
  onSelect: (incidentId: Incident["id"]) => void;
}

export function IncidentList({ onSelect }: IncidentListProps) {
  const { data: incidents, isLoading, error } = useIncidentsQuery();

  if (isLoading) {
    return <div>Loading incidents...</div>;
  }

  if (error) {
    return <div>Error loading incidents: {error.message}</div>;
  }

  return (
    <>
      <h2>Incidents ({incidents?.length})</h2>
      <div className="incident-list-items">
        {incidents?.map((incident) => (
          <IncidentListItem
            key={incident.id}
            incident={incident}
            onClick={() => onSelect(incident.id)}
          />
        ))}
      </div>
    </>
  );
}
