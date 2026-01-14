import { useState } from "react";
import { IncidentList } from "./IncidentList";
import { IncidentDetail } from "./IncidentDetail";

import "./incidents.css";

export function Incidents() {
  const [selectedId, setSelectedId] = useState<string | undefined>();

  return (
    <div className={`incidents-container ${selectedId ? "with-detail" : ""}`}>
      <div className="incident-list-wrapper">
        <IncidentList
          onSelect={setSelectedId}
          selectedIncidentId={selectedId}
        />
      </div>

      {selectedId && (
        <div className="incident-detail-wrapper">
          <IncidentDetail incidentId={selectedId} />
        </div>
      )}
    </div>
  );
}
