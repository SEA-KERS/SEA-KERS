import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    hash,
    children,
    ...props
  }: {
    to: string;
    hash?: string;
    children: React.ReactNode;
  }) => (
    <a href={`${to}${hash ? `#${hash}` : ""}`} {...props}>
      {children}
    </a>
  ),
  useLocation: () => ({ pathname: "/", hash: "" }),
}));

const props = {
  theme: "dark" as const,
  toggleTheme: vi.fn(),
};

describe("Navbar", () => {
  it("renders the desktop navigation links pointing at their pages", () => {
    render(<Navbar {...props} />);
    const nav = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(nav).toBeInTheDocument();

    const winsLink = within(nav).getByRole("link", { name: "Wins" });
    const projectsLink = within(nav).getByRole("link", { name: "Projects" });
    const teamLink = within(nav).getByRole("link", { name: "Team" });
    const aboutLink = within(nav).getByRole("link", { name: "About" });

    expect(winsLink).toHaveAttribute("href", "/wins");
    expect(projectsLink).toHaveAttribute("href", "/projects");
    expect(teamLink).toHaveAttribute("href", "/team");
    expect(aboutLink).toHaveAttribute("href", "/#about");
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

  it("closes the mobile menu when a navigation link is activated", async () => {
    const user = userEvent.setup();
    render(<Navbar {...props} />);
    await user.click(screen.getByRole("button", { name: "Open menu" }));

    const mobileNav = screen.getByRole("navigation", {
      name: "Mobile navigation",
    });
    await user.click(within(mobileNav).getByRole("link", { name: /Projects/ }));

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
