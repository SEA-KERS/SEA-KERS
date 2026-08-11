import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectsSection from "./ProjectsSection";

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

describe("ProjectsSection home preview", () => {
  it("uses the 'What we build' title and shows the featured projects", () => {
    render(<ProjectsSection />);

    expect(
      screen.getByRole("heading", { name: "What we build" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Our repositories/i)).not.toBeInTheDocument();

    for (const name of [
      /NEON_MESH PROTOCOL/,
      /KODEX_SENTINEL/,
      /ZK_PULSE SHIELD/,
    ]) {
      expect(screen.getAllByRole("link", { name })).toBeTruthy();
    }
  });

  it("links to the full project archive", () => {
    render(<ProjectsSection />);
    const viewAll = screen.getByRole("link", {
      name: /View all 6 project specifications/i,
    });
    expect(viewAll).toHaveAttribute("href", "/projects");
  });
});
