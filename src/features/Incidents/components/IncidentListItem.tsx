import { Incident } from "@/api";
import { formatDate } from "@/utils/formatDate";

import { UserDisplay, SeverityBadge } from "@/components";
import styles from "./incidentListItem.module.css";

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
      className={`${styles.incidentListItem} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className={styles.incidentListItemHeader}>
        <h3>{incident.title}</h3>
        <SeverityBadge severity={incident.severity} />
      </div>
      <div className={styles.incidentListItemDetails}>
        <div>{incident.status}</div>
        <UserDisplay userId={incident.assigneeId} />
        <div>{formatDate(incident.createdAt)}</div>
      </div>
    </div>
  );
}
