import { User } from "@/api";
import { useUsersQuery } from "@/hooks/useUsersQuery";

interface UserDisplayProps {
  userId: User["id"] | null;
  children?: (user: User) => React.ReactNode;
  fallback?: React.ReactNode;
}

export function UserDisplay({
  userId,
  children,
  fallback = "Unassigned",
}: UserDisplayProps) {
  const { data: users } = useUsersQuery();

  if (!userId) {
    return <>{fallback}</>;
  }

  const user = users?.find((user) => user.id === userId);
  if (!user) {
    return <>{userId}</>;
  }

  return <>{children ? children(user) : user.name}</>;
}
