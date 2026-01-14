import { Incident } from "@/api";

interface IncidentListItemProps {
  incident: Incident;
  onClick: () => void;
}

export function IncidentListItem({ incident, onClick }: IncidentListItemProps) {
  return (
    <div
      className="incident-list-item"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <h4>{incident.title}</h4>
      <div>{incident.assigneeId}</div>
    </div>
  );
}
