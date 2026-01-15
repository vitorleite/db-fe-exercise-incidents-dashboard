import { useState } from "react";
import { type IncidentSeverity, SEVERITY_OPTIONS } from "@/api";

import { useCreateIncidentMutation } from "./hooks";

import { Button } from "@/components/ui";
import { UserSelect } from "@/components";

import styles from "./IncidentCreateForm.module.css";

interface CreateIncidentFormProps {
  onSuccess: (incidentId: string) => void;
  onCancel: () => void;
}

export function IncidentCreateForm({
  onSuccess,
  onCancel,
}: CreateIncidentFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<IncidentSeverity>("Medium");
  const [assigneeId, setAssigneeId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateIncidentMutation();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    createMutation.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        severity,
        assigneeId,
      },
      {
        onSuccess: (newIncident) => {
          onSuccess(newIncident.id);
        },
      },
    );
  };

  return (
    <div className={styles.createForm}>
      <h2>Create New Incident</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formField}>
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of the incident"
            className={errors.title ? styles.inputError : ""}
          />
          {errors.title && (
            <span className={styles.errorMessage}>{errors.title}</span>
          )}
        </div>

        <div className={styles.formField}>
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed description of the incident"
            rows={4}
            className={errors.description ? styles.inputError : ""}
          />
          {errors.description && (
            <span className={styles.errorMessage}>{errors.description}</span>
          )}
        </div>

        <div className={styles.formField}>
          <label htmlFor="severity">Severity</label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as IncidentSeverity)}
          >
            {SEVERITY_OPTIONS.map((sev) => (
              <option key={sev} value={sev}>
                {sev}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formField}>
          <label htmlFor="assignee">Assignee</label>
          <UserSelect
            id="assignee"
            value={assigneeId}
            onChange={setAssigneeId}
          />
        </div>

        {createMutation.error && (
          <div className={styles.formError}>
            Failed to create incident. Please try again.
          </div>
        )}

        <div className={styles.formActions}>
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createMutation.isPending}
            data-testid="submit-incident-button"
          >
            Create Incident
          </Button>
        </div>
      </form>
    </div>
  );
}
