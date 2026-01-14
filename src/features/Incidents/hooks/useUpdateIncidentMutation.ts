import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Incident } from "@/api";
import { incidentKeys } from "./queryKeys";

interface UpdateIncidentData {
  id: Incident["id"];
  data: Partial<Pick<Incident, "status" | "assigneeId">>;
}

export function useUpdateIncidentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateIncidentData) => {
      const response = await fetch(`/api/incidents/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update incident");
      }

      return response.json();
    },

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: incidentKeys.detail(id) });
      await queryClient.cancelQueries({ queryKey: incidentKeys.all });

      const previousIncident = queryClient.getQueryData<Incident>(
        incidentKeys.detail(id),
      );
      const previousIncidents = queryClient.getQueryData<Incident[]>(
        incidentKeys.all,
      );

      if (previousIncident) {
        queryClient.setQueryData<Incident>(incidentKeys.detail(id), {
          ...previousIncident,
          ...data,
        });
      }

      if (previousIncidents) {
        queryClient.setQueryData<Incident[]>(
          incidentKeys.all,
          previousIncidents.map((incident) =>
            incident.id === id ? { ...incident, ...data } : incident,
          ),
        );
      }

      return { previousIncident, previousIncidents };
    },

    onError: (_err, { id }, context) => {
      if (context?.previousIncident) {
        queryClient.setQueryData<Incident>(
          incidentKeys.detail(id),
          context.previousIncident,
        );
      }

      if (context?.previousIncidents) {
        queryClient.setQueryData<Incident[]>(
          incidentKeys.all,
          context.previousIncidents,
        );
      }
    },

    onSettled: (_data, _error, { id }) => {
      queryClient.invalidateQueries({ queryKey: incidentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: incidentKeys.all });
    },
  });
}
