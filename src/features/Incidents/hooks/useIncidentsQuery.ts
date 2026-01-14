import { useQuery } from "@tanstack/react-query";
import type { Incident } from "@/api";

export function useIncidentsQuery() {
  return useQuery<Incident[]>({
    queryKey: ["incidents"],
    queryFn: async () => {
      const response = await fetch("/api/incidents");
      if (!response.ok) {
        throw new Error("Failed to fetch incidents");
      }
      return response.json();
    },
  });
}
