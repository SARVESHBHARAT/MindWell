import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chat from "./Chat";

describe("Chat", () => {
  it("detects emergency keywords and surfaces crisis resources", async () => {
    render(<Chat />);

    const input = screen.getByPlaceholderText(
      "Type your message here... Press Enter to send",
    );
    fireEvent.change(input, { target: { value: "I want to kill myself" } });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(
      () => {
        expect(
          screen.getByText(/I'm concerned about what you're going through/i),
        ).toBeInTheDocument();
      },
      { timeout: 10000 },
    );

    const emergencyMessage = screen.getByText(
      /I'm concerned about what you're going through/i,
    );
    const messageContainer = emergencyMessage.closest(
      '[class*="ring-destructive"]',
    );
    expect(messageContainer).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Connect to Crisis Counselor" }));

    expect(screen.getByText("988 Suicide & Crisis Lifeline (US)")).toBeInTheDocument();
    expect(screen.getByText("Campus Crisis Line")).toBeInTheDocument();
    expect(screen.getByText("Crisis Text Line")).toBeInTheDocument();
  });
});
