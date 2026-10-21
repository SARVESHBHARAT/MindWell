import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("records a mood check-in to localStorage and shows confirmation", () => {
    render(<Dashboard />);

    fireEvent.click(screen.getAllByRole("button", { name: "8" })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Submit Check-in" }));

    expect(screen.getByText("Check-in recorded for today")).toBeInTheDocument();
    expect(screen.getByText(/Mood 8\/10 saved/)).toBeInTheDocument();

    const history = JSON.parse(localStorage.getItem("mindwell_checkins") || "[]");
    expect(history.length).toBe(1);
    expect(history[0].mood).toBe(8);

    fireEvent.click(screen.getByRole("button", { name: "Check again tomorrow" }));
    expect(screen.getByRole("button", { name: "Submit Check-in" })).toBeInTheDocument();
  });
});
