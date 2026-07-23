import { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import JoinModal from "./JoinModal";

function ModalHarness() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Open join form</button>
      <JoinModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

describe("JoinModal", () => {
  it("connects visible labels to every form control", async () => {
    render(<JoinModal isOpen onClose={() => undefined} />);

    expect(screen.getByLabelText("Name or handle")).toHaveAttribute("name", "handle");
    expect(screen.getByLabelText("Email address")).toHaveAttribute("name", "email");
    expect(screen.getByLabelText("Primary discipline")).toHaveAttribute("name", "role");
    expect(screen.getByLabelText("Proof of work URL")).toHaveAttribute("name", "proofOfWork");
  });

  it("closes with Escape and restores focus to its trigger", async () => {
    const user = userEvent.setup();
    render(<ModalHarness />);
    const trigger = screen.getByRole("button", { name: "Open join form" });

    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Join the collective" })).toBeInTheDocument();
    await user.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("has no automatically detectable accessibility violations", async () => {
    const { container } = render(<JoinModal isOpen onClose={() => undefined} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it("does not claim to submit data without a transport", () => {
    render(<JoinModal isOpen onClose={() => undefined} />);
    fireEvent.submit(screen.getByRole("button", { name: "Check submission availability" }).closest("form")!);
    expect(screen.getByRole("status")).toHaveTextContent("not been sent or stored");
  });
});