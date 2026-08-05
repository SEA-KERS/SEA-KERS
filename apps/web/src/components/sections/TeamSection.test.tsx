import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TeamSection from "./TeamSection";

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

  it("opens from a roster row and closes via the close button", async () => {
    const user = userEvent.setup();
    render(<TeamSection />);

    await user.click(
      screen.getByRole("button", { name: "Open spotlight for Sharan Reddy" }),
    );

    const dialog = await screen.findByRole("dialog", { name: /Sharan Reddy/ });
    await user.click(
      within(dialog).getByRole("button", { name: "Close spotlight" }),
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
