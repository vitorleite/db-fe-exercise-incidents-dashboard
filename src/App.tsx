import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import { Incidents } from "./features/Incidents/Incidents";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>Team Incident Dashboard - Starter Project</h1>
        <main>
          <Incidents />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
