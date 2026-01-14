import { useIncidentsQuery } from "@/features/Incidents/hooks/useIncidentsQuery";

import { Loading } from "@/components/ui";
import { IncidentListItem } from "./components";
import { Incident } from "@/api/types";

interface IncidentListProps {
  onSelect: (incidentId: Incident["id"]) => void;
  selectedIncidentId?: Incident["id"];
}

export function IncidentList({
  onSelect,
  selectedIncidentId,
}: IncidentListProps) {
  const { data: incidents, isLoading, error } = useIncidentsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading incidents: {error.message}</div>;
  }

  return (
    <div className="incident-list-items">
      {incidents?.map((incident) => (
        <IncidentListItem
          key={incident.id}
          incident={incident}
          onClick={() => onSelect(incident.id)}
          isSelected={incident.id === selectedIncidentId}
        />
      ))}
    </div>
  );
}
