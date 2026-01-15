import { useState } from "react";
import { IncidentList } from "./IncidentList";
import { IncidentDetail } from "./IncidentDetail";

import type { Incident } from "@/api/types";

import styles from "./incidents.module.css";
import { Button } from "@/components/ui";

export function Incidents() {
  const [selectedId, setSelectedId] = useState<Incident["id"] | undefined>();

  return (
    <div
      className={`${styles.incidentsContainer} ${selectedId ? styles.withDetail : ""}`}
    >
      <div className={styles.incidentsListWrapper}>
        <div className={styles.incidentsListHeader}>
          <h2>Incidents</h2>
        </div>
        <IncidentList
          onSelect={setSelectedId}
          selectedIncidentId={selectedId}
        />
      </div>

      {selectedId && (
        <div className={styles.incidentDetailWrapper}>
          <Button variant="link" onClick={() => setSelectedId(undefined)}>
            Close
          </Button>
          <IncidentDetail id={selectedId} />
        </div>
      )}
    </div>
  );
}
