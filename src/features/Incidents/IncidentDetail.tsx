import { Button, EmptyState, LoadingSkeleton } from "@/components/ui";
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
  const { data: incident, isLoading, error, refetch } = useIncidentQuery(id);
  const updateMutation = useUpdateIncidentMutation();

  if (isLoading) {
    return (
      <>
        <LoadingSkeleton size="large" width="75%" margin="lg" />
        <LoadingSkeleton count={2} size="small" width="25%" />

        <LoadingSkeleton size="large" width="55%" margin="lg" />
        <LoadingSkeleton count={1} size="small" />

        <LoadingSkeleton size="large" width="30%" margin="lg" />
        <LoadingSkeleton count={3} size="small" width="45%" />
      </>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Error loading incident"
        description={error.message}
        action={
          <Button variant="link" onClick={() => refetch()}>
            Try again
          </Button>
        }
      />
    );
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
