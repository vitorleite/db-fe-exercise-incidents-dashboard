import { Loading } from "@/components/ui";
import { Incident } from "@/api/types";

import { useIncidentQuery, useUpdateIncidentMutation } from "./hooks";
import {
  IncidentDescription,
  IncidentMeta,
  IncidentStatusHistory,
  IncidentTitle,
} from "./components";

interface IncidentDetailProps {
  id: Incident["id"];
}

export function IncidentDetail({ id }: IncidentDetailProps) {
  const { data: incident, isLoading, error } = useIncidentQuery(id);
  const updateMutation = useUpdateIncidentMutation();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="incident-detail-error">Error: {error.message}</div>;
  }

  if (!incident) {
    return null;
  }

  return (
    <div className="incidentDetail">
      <IncidentTitle title={incident.title} />

      <IncidentMeta
        incident={incident}
        isUpdating={updateMutation.isPending}
        onStatusChange={(status) =>
          updateMutation.mutateAsync({ id, data: { status } })
        }
        onAssigneeChange={(assigneeId) =>
          updateMutation.mutateAsync({ id, data: { assigneeId } })
        }
      />

      <h3>Description</h3>
      <IncidentDescription description={incident.description} />

      <h3>Status History</h3>
      <IncidentStatusHistory history={incident.statusHistory} />
    </div>
  );
}
