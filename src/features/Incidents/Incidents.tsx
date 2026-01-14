import { useState } from "react";
import { IncidentList } from "./IncidentList";
import { IncidentDetail } from "./IncidentDetail";

import type { Incident } from "@/api/types";

import "./incidents.css";
import { Button } from "@/components/ui/Button";

export function Incidents() {
  const [selectedId, setSelectedId] = useState<Incident["id"] | undefined>();
  return (
    <div className={`incidents-container ${selectedId ? "with-detail" : ""}`}>
      <div className="incidents-list-wrapper">
        <div className="incidents-list-header">
          <h2>Incidents</h2>
        </div>
        <IncidentList
          onSelect={setSelectedId}
          selectedIncidentId={selectedId}
        />
      </div>

      {selectedId && (
        <div className="incident-detail-wrapper">
          <Button variant="link" onClick={() => setSelectedId(undefined)}>
            Close
          </Button>
          <IncidentDetail incidentId={selectedId} />
        </div>
      )}
    </div>
  );
}
