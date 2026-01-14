import { useQuery } from "@tanstack/react-query";
import type { User } from "@/api";

export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    },
  });
}
