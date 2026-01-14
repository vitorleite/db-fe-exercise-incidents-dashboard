import type { IncidentStatus } from "@/api/types";

interface StatusSelectProps {
  value: IncidentStatus;
  onChange: (status: IncidentStatus) => void;
  disabled?: boolean;
  id?: string;
}

const STATUS_OPTIONS: IncidentStatus[] = ["Open", "In Progress", "Resolved"];

export function StatusSelect({
  value,
  onChange,
  disabled = false,
  id,
}: StatusSelectProps) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as IncidentStatus)}
      disabled={disabled}
    >
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
