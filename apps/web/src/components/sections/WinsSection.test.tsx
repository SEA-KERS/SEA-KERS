import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import WinsSection from "./WinsSection";

describe("WinsSection win dialog", () => {
  it("opens from a win image with a labelled modal and restores focus on Escape", async () => {
    const onSelectProject = vi.fn();
    const user = userEvent.setup();
    render(<WinsSection onSelectProject={onSelectProject} />);

    const imageTriggers = screen.getAllByRole("button", {
      name: /View images of/i,
    });
    const firstImageTrigger = imageTriggers[0];
    await user.click(firstImageTrigger);

    const dialog = await screen.findByRole("dialog", { name: /Code Red 2.0/ });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(
      within(dialog).getByRole("region", { name: /images/i }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(firstImageTrigger).toHaveFocus();
  });

  it("opens from the view-details link and navigates to the matching project", async () => {
    const onSelectProject = vi.fn();
    const user = userEvent.setup();
    render(<WinsSection onSelectProject={onSelectProject} />);

    await user.click(
      screen.getAllByRole("button", { name: /View details for/i })[0],
    );

    const dialog = await screen.findByRole("dialog", { name: /Code Red 2.0/ });
    await user.click(
      within(dialog).getByRole("button", { name: "View matching project" }),
    );

    expect(onSelectProject).toHaveBeenCalledWith("moondream-voice");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
