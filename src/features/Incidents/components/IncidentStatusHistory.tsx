import { formatDate } from "@/utils/formatDate";
import type { StatusHistoryEntry } from "@/api/types";
import { UserDisplay } from "@/components";

import styles from "./IncidentStatusHistory.module.css";

interface StatusHistoryProps {
  history: StatusHistoryEntry[];
}

export function IncidentStatusHistory({ history = [] }: StatusHistoryProps) {
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime(),
  );

  if (sortedHistory.length === 0) {
    return <p className={styles.emptyState}>No status history available</p>;
  }

  return (
    <ul className={styles.statusHistory}>
      {sortedHistory.map((entry, index) => (
        <li key={index} className={styles.statusHistoryItem}>
          <div className={styles.statusHistoryStatus}>{entry.status}</div>
          <div className={styles.statusHistoryMeta}>
            <span>{formatDate(entry.changedAt)}</span>
            <UserDisplay userId={entry.changedBy} />
          </div>
        </li>
      ))}
    </ul>
  );
}
