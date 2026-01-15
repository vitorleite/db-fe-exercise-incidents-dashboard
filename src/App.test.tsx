import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the app title", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: "Team Incident Dashboard - Starter Project",
      }),
    ).toBeInTheDocument();
  });

  it("renders the the list of incidents from seed data", async () => {
    render(<App />);

    // incidents are rendered
    const items = await screen.findAllByTestId("incident-list-item", {
      exact: false,
    });

    expect(items).toHaveLength(4);
  });

  it("filters incidents by severity", () => {
    render(<App />);

    const severityFilterSelect = screen.getByLabelText("Filter by severity");
    expect(severityFilterSelect).toBeInTheDocument();

    fireEvent.change(severityFilterSelect, { target: { value: "Critical" } });
    const items = screen.getAllByTestId("incident-list-item", {
      exact: false,
    });

    expect(items).toHaveLength(1);
  });

  it("filters incidents by status", () => {
    render(<App />);

    const statusFilterSelect = screen.getByLabelText("Filter by status");
    expect(statusFilterSelect).toBeInTheDocument();

    fireEvent.change(statusFilterSelect, { target: { value: "Open" } });
    const items = screen.getAllByTestId("incident-list-item", {
      exact: false,
    });

    expect(items).toHaveLength(2);
  });

  it("filters incidents by title", () => {
    render(<App />);

    const nameFilterInput = screen.getByLabelText("Filter incidents by name");
    expect(nameFilterInput).toBeInTheDocument();

    fireEvent.change(nameFilterInput, { target: { value: "database" } });
    const items = screen.getAllByTestId("incident-list-item", {
      exact: false,
    });

    expect(items).toHaveLength(1);
  });

  it("shows validation errors when creating incident without required fields", async () => {
    render(<App />);

    const createButton = screen.getByTestId("create-incident-button");
    fireEvent.click(createButton);

    // form appears, submit without filling fields
    const submitButton = screen.getByTestId("submit-incident-button");
    fireEvent.click(submitButton);

    // validation appears
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/description is required/i),
    ).toBeInTheDocument();
  });

  it("creates a new incident and displays it in the list", async () => {
    render(<App />);

    // 4 incidents from api
    let items = screen.getAllByTestId("incident-list-item", { exact: false });
    expect(items).toHaveLength(4);

    const createButton = screen.getByTestId("create-incident-button");
    fireEvent.click(createButton);

    // fill required fields, others go with defaults
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    fireEvent.change(titleInput, { target: { value: "Test Incident" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test incident description" },
    });

    const submitButton = screen.getByTestId("submit-incident-button");
    fireEvent.click(submitButton);

    // wait for the incident to appear in the list
    expect(await screen.findByText("Test Incident")).toBeInTheDocument();

    // verify count is now 5
    items = screen.getAllByTestId("incident-list-item", {
      exact: false,
    });
    expect(items).toHaveLength(5);
  });

  it("updates an incident status and reflects in the list", async () => {
    render(<App />);

    // click an incident
    const firstIncident = screen.getByText("Database connection timeout");
    fireEvent.click(firstIncident);

    // find status in the detail view
    const statusSelect = await screen.findByLabelText("Change incident status");
    expect(statusSelect).toHaveValue("Open");

    // change status to "In Progress"
    fireEvent.change(statusSelect, { target: { value: "In Progress" } });

    // wait for update and verify status
    await waitFor(() => {
      const incidentItem = screen.getByTestId("incident-list-item-inc-1");
      expect(incidentItem).toHaveTextContent("In Progress");
    });
  });
});
