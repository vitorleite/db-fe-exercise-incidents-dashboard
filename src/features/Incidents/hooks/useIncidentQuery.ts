import { useQuery } from "@tanstack/react-query";
import type { Incident } from "@/api";

export function useIncidentQuery(id: Incident["id"]) {
  return useQuery<Incident>({
    queryKey: ["incidents", id],
    queryFn: async () => {
      const response = await fetch(`/api/incidents/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch incident");
      }
      return response.json();
    },
    enabled: !!id,
  });
}
