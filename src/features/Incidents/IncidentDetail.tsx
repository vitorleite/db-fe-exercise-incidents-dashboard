import { Loading } from "@/components/ui";
import { useIncidentQuery } from "./hooks/useIncidentQuery";
import { formatDate } from "@/utils/formatDate";
import { UserDisplay } from "@/components/UserDisplay";
import { SeverityBadge } from "@/components";
import { StatusSelect } from "./components/StatusSelect";
import { useUpdateIncidentMutation } from "./hooks/useUpdateIncidentMutation";
import { UserSelect } from "./components/UserSelect";

interface IncidentDetailProps {
  incidentId: string;
}

export function IncidentDetail({ incidentId }: IncidentDetailProps) {
  const { data: incident, isLoading, error } = useIncidentQuery(incidentId);
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
    <div className="incident-detail">
      <div className="incident-detail-header">
        <h2>{incident.title}</h2>

        <div className="incident-detail-meta">
          <div className="detail-field">
            <label htmlFor="status">Status</label>
            <StatusSelect
              id="status"
              value={incident.status}
              onChange={(newStatus) => {
                updateMutation.mutate({
                  id: incidentId,
                  data: { status: newStatus },
                });
              }}
              disabled={updateMutation.isPending}
            />
          </div>

          <div className="detail-field">
            <label htmlFor="assignee">Assignee</label>
            <UserSelect
              id="assignee"
              value={incident.assigneeId}
              onChange={(newAssigneeId) => {
                updateMutation.mutate({
                  id: incidentId,
                  data: { assigneeId: newAssigneeId },
                });
              }}
              disabled={updateMutation.isPending}
            />
          </div>
        </div>
      </div>

      <div className="incident-detail-section">
        <h3>Description</h3>
        <p>{incident.description}</p>
      </div>

      <div className="incident-detail-section">
        <h3>Details</h3>
        <dl className="incident-detail-list">
          <dt>Severity</dt>
          <dd>
            <SeverityBadge severity={incident.severity} />
          </dd>

          <dt>Created</dt>
          <dd>{formatDate(incident.createdAt)}</dd>

          <dt>Updated</dt>
          <dd>{formatDate(incident.updatedAt)}</dd>
        </dl>
      </div>

      {incident.statusHistory && incident.statusHistory.length > 0 && (
        <div className="incident-detail-section">
          <h3>Status History</h3>
          <div className="incident-status-history">
            {incident.statusHistory.map((entry, index) => (
              <div key={index} className="status-history-entry">
                <div className="status-history-status">{entry.status}</div>
                <div className="status-history-time">
                  {formatDate(entry.changedAt)}
                </div>
                <div className="status-history-user">by {entry.changedBy}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
