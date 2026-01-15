import type { Incident, IncidentStatus } from "@/api/types";
import { SeverityBadge, StatusSelect, UserSelect } from "@/components";
import { formatDate } from "@/utils/formatDate";

import styles from "./IncidentMeta.module.css";

interface IncidentMetaProps {
  incident: Incident;
  onStatusChange: (status: IncidentStatus) => void;
  onAssigneeChange: (assigneeId: string | null) => void;
  isUpdating?: boolean;
}

export function IncidentMeta({
  incident,
  onStatusChange,
  onAssigneeChange,
  isUpdating = false,
}: IncidentMetaProps) {
  return (
    <dl className={styles.incidentMeta}>
      <div className={styles.metaItem}>
        <dt>Status</dt>
        <dd>
          <StatusSelect
            value={incident.status}
            onChange={onStatusChange}
            disabled={isUpdating}
          />
        </dd>
      </div>

      <div className={styles.metaItem}>
        <dt>Assignee</dt>
        <dd>
          <UserSelect
            value={incident.assigneeId}
            onChange={onAssigneeChange}
            disabled={isUpdating}
          />
        </dd>
      </div>

      <div className={styles.metaItem}>
        <dt>Severity</dt>
        <dd>
          <SeverityBadge severity={incident.severity} />
        </dd>
      </div>

      <div className={styles.metaItem}>
        <dt>Created</dt>
        <dd>{formatDate(incident.createdAt)}</dd>
      </div>

      <div className={styles.metaItem}>
        <dt>Updated</dt>
        <dd>{formatDate(incident.updatedAt)}</dd>
      </div>
    </dl>
  );
}
