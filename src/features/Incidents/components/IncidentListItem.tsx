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
      <div className="incident-list-item-details">
        <div>{incident.status}</div>
        <div>{incident.severity}</div>
        <div>{incident.assigneeId}</div>
        <div>{incident.createdAt}</div>
      </div>
    </div>
  );
}
