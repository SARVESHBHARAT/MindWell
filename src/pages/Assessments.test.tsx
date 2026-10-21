import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Assessments from "./Assessments";

describe("Assessments", () => {
  it("disables Next until an answer is selected", () => {
    render(<Assessments />);
    localStorage.clear();
    fireEvent.click(screen.getByRole("button", { name: "Start PHQ-9 Assessment" }));

    const next = screen.getByRole("button", { name: "Next" });
    expect(next).toBeDisabled();

    fireEvent.click(screen.getByRole("radio", { name: "Several days" }));
    expect(next).not.toBeDisabled();
  });

  it("completes a PHQ-9 assessment and shows the score interpretation", async () => {
    render(<Assessments />);
    localStorage.clear();
    fireEvent.click(screen.getByRole("button", { name: "Start PHQ-9 Assessment" }));

    // Answer all 9 questions with "More than half the days" (value 2) => score 18/27
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByRole("radio", { name: "More than half the days" }));
      const buttonText = i === 8 ? "Complete" : "Next";
      fireEvent.click(screen.getByRole("button", { name: buttonText }));
    }

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Assessment Results" })).toBeInTheDocument();
    });

    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("out of 27")).toBeInTheDocument();
    expect(screen.getByText("Moderately Severe")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Take Another Assessment" })).toBeInTheDocument();
  });
});
