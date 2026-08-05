import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";

const props = {
  activeTab: "all" as const,
  setActiveTab: vi.fn(),
  theme: "dark" as const,
  toggleTheme: vi.fn(),
};

describe("Navbar", () => {
  it("renders the desktop navigation links", () => {
    render(<Navbar {...props} />);
    const nav = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(nav).toBeInTheDocument();
    for (const label of ["Wins", "Projects", "Team", "About"]) {
      expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
    }
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });

  it("opens and closes the mobile menu from the toggle", async () => {
    const user = userEvent.setup();
    render(<Navbar {...props} />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const mobileNav = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    for (const label of ["Wins", "Projects", "Team", "About"]) {
      expect(
        within(mobileNav).getByRole("link", { name: new RegExp(label) }),
      ).toBeInTheDocument();
    }

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });

  it("navigates from the mobile menu and closes it", async () => {
    const user = userEvent.setup();
    render(<Navbar {...props} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const mobileNav = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    await user.click(within(mobileNav).getByRole("link", { name: /Projects/ }));

    expect(props.setActiveTab).toHaveBeenCalledWith("projects");
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });

  it("closes the mobile menu on Escape and returns focus to the toggle", async () => {
    const user = userEvent.setup();
    render(<Navbar {...props} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });

  it("closes the mobile menu when clicking outside the header", async () => {
    const user = userEvent.setup();
    render(<Navbar {...props} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    await user.pointer({ keys: "[MouseLeft]", target: document.body });

    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" }),
    ).not.toBeInTheDocument();
  });
});
