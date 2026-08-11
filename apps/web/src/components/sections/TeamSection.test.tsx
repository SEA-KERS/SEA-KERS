import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import TeamSection from "./TeamSection";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("TeamSection spotlight dialog", () => {
  it("opens from a roster card with a labelled modal and restores focus on Escape", async () => {
    const user = userEvent.setup();
    render(<TeamSection />);

    const rosterCard = screen.getByRole("button", {
      name: "Open spotlight for Kashvi V",
    });
    await user.click(rosterCard);

    const dialog = await screen.findByRole("dialog", { name: /Kashvi V/ });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(
      within(dialog).getByRole("link", { name: /Connect on LinkedIn/i }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(rosterCard).toHaveFocus();
  });

  it("opens from a roster card and closes via the close button", async () => {
    const user = userEvent.setup();
    render(<TeamSection />);

    await user.click(
      screen.getByRole("button", { name: "Open spotlight for Pramoda S R" }),
    );

    const dialog = await screen.findByRole("dialog", { name: /Pramoda S R/ });
    await user.click(
      within(dialog).getByRole("button", { name: "Close spotlight" }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
