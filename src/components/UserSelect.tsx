import { useUsersQuery } from "@/hooks/useUsersQuery";

interface UserSelectProps {
  value: string | null;
  onChange: (userId: string | null) => void;
  disabled?: boolean;
  id?: string;
}

export function UserSelect({
  value,
  onChange,
  disabled = false,
  id,
}: UserSelectProps) {
  const { data: users, isLoading } = useUsersQuery();

  return (
    <select
      id={id}
      aria-label="Change incident assignee"
      value={value || ""}
      onChange={(e) => onChange(e.target.value || null)}
      disabled={disabled || isLoading}
    >
      <option value="">Unassigned</option>
      {users?.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}
