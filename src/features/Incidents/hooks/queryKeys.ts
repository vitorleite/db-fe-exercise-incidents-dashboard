import { Incident } from "@/api";

export const incidentKeys = {
  all: ["incidents"] as const,
  detail: (id: Incident["id"]) => ["incident", id] as const,
};
