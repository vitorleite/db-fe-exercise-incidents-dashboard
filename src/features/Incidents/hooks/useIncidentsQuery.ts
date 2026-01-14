import { useQuery } from "@tanstack/react-query";
import type { Incident } from "@/api";
import { incidentKeys } from "./queryKeys";

export function useIncidentsQuery() {
  return useQuery<Incident[]>({
    queryKey: incidentKeys.all,
    queryFn: async () => {
      const response = await fetch("/api/incidents");
      if (!response.ok) {
        throw new Error("Failed to fetch incidents");
      }
      return response.json();
    },
  });
}
