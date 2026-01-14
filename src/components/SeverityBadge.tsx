import { IncidentSeverity } from "@/api";

import styles from "./SeverityBadge.module.css";

interface SeverityBadgeProps {
  severity: IncidentSeverity;
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const severityMap: Record<IncidentSeverity, string> = {
    Low: "severityLow",
    Medium: "severityMedium",
    High: "severityHigh",
    Critical: "severityCritical",
  };

  const severityClass = severityMap[severity] || "severityNone";

  return (
    <span className={`${styles.severityBadge} ${styles[severityClass]}`}>
      {severity}
    </span>
  );
}
