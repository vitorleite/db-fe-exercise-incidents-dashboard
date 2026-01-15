import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { Incidents } from "./features/Incidents/Incidents";
import { Button } from "./components/ui";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const resetData = async () => {
    await fetch("/api/reset", {
      method: "POST",
    });
    queryClient.invalidateQueries();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>Team Incident Dashboard - Starter Project</h1>
        <div className="app-actions">
          <Button onClick={resetData}>Reset data</Button>
        </div>
        <main>
          <Incidents />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
