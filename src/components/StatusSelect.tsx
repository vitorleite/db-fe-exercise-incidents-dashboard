import { type IncidentStatus, STATUS_OPTIONS } from "@/api";

interface StatusSelectProps {
  value: IncidentStatus;
  onChange: (status: IncidentStatus) => void;
  disabled?: boolean;
  id?: string;
}

export function StatusSelect({
  value,
  onChange,
  disabled = false,
  id,
}: StatusSelectProps) {
  return (
    <select
      id={id}
      aria-label="Change incident status"
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
