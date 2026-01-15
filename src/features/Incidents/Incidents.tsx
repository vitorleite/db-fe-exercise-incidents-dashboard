import { useEffect, useMemo, useState } from "react";
import { IncidentList } from "./IncidentList";
import { IncidentDetail } from "./IncidentDetail";
import { IncidentCreateForm } from "./IncidentCreateForm";

import type { Incident } from "@/api/types";

import styles from "./incidents.module.css";
import { Button } from "@/components/ui";

export function Incidents() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedId, setSelectedId] = useState<Incident["id"] | undefined>();

  const showDrawer = useMemo(() => {
    return isCreating || !!selectedId;
  }, [isCreating, selectedId]);

  return (
    <div
      className={`${styles.incidentsContainer} ${showDrawer ? styles.withDrawer : ""}`}
    >
      <div className={styles.incidentsListWrapper}>
        <div className={styles.incidentsListHeader}>
          <h2>Incidents</h2>
          <Button
            size="small"
            onClick={() => {
              setIsCreating(true);
              setSelectedId(undefined);
            }}
            data-testid="create-incident-button"
          >
            Create Incident
          </Button>
        </div>
        <IncidentList
          onSelect={setSelectedId}
          selectedIncidentId={selectedId}
        />
      </div>

      {selectedId && !isCreating && (
        <div className={styles.incidentContentWrapper}>
          <>
            <Button variant="link" onClick={() => setSelectedId(undefined)}>
              Close
            </Button>
            <IncidentDetail id={selectedId} />
          </>
        </div>
      )}

      {isCreating && (
        <div className={styles.incidentContentWrapper}>
          <IncidentCreateForm
            onSuccess={(newId) => {
              setIsCreating(false);
              setSelectedId(newId);
            }}
            onCancel={() => setIsCreating(false)}
          />
        </div>
      )}
    </div>
  );
}
