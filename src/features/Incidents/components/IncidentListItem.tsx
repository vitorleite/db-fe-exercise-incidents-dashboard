import { Incident } from "@/api";
import { formatDate } from "@/utils/formatDate";

import { UserDisplay } from "@/components";

interface IncidentListItemProps {
  incident: Incident;
  onClick: () => void;
  isSelected?: boolean;
}

export function IncidentListItem({
  incident,
  onClick,
  isSelected = false,
}: IncidentListItemProps) {
  return (
    <div
      className={`incident-list-item ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <h4>{incident.title}</h4>
      <div className="incident-list-item-details">
        <div>{incident.status}</div>
        <div>{incident.severity}</div>
        <div>
          <UserDisplay userId={incident.assigneeId} />
        </div>
        <div>{formatDate(incident.createdAt)}</div>
      </div>
    </div>
  );
}
