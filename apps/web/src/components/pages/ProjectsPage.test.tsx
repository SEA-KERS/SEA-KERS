import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectsPage from "./ProjectsPage";

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

describe("ProjectsPage coming soon", () => {
  it("renders the 'Showcase' heading", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { name: "Showcase" }),
    ).toBeInTheDocument();
  });

  it("renders the prominent Coming Soon showcase", () => {
    render(<ProjectsPage />);
    expect(
      screen.getAllByText(/Coming Soon/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: /Public Repositories & Interactive Demos Under Preparation/i,
      }),
    ).toBeInTheDocument();
  });

  it("does not render the removed category filters and project rows", () => {
    render(<ProjectsPage />);
    expect(screen.queryByRole("button", { name: "Infrastructure" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "AI & Robotics" })).not.toBeInTheDocument();
    expect(screen.queryByText(/NEON_MESH PROTOCOL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/KODEX_SENTINEL/i)).not.toBeInTheDocument();
  });
});
