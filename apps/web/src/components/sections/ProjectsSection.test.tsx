import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectsSection from "./ProjectsSection";

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

  it("deep-links each featured project to its hash on the projects page", () => {
    render(<ProjectsSection />);

    const neonMesh = screen.getByRole("link", { name: /NEON_MESH PROTOCOL/ });
    expect(neonMesh).toHaveAttribute("href", "/projects#neon-mesh");

    const kodex = screen.getByRole("link", { name: /KODEX_SENTINEL/ });
    expect(kodex).toHaveAttribute("href", "/projects#kodex-sentinel");

    const zkPulse = screen.getByRole("link", { name: /ZK_PULSE SHIELD/ });
    expect(zkPulse).toHaveAttribute("href", "/projects#zk-pulse");
  });

  it("links to the full project archive", () => {
    render(<ProjectsSection />);
    const viewAll = screen.getByRole("link", {
      name: /View all 6 project specifications/i,
    });
    expect(viewAll).toHaveAttribute("href", "/projects");
  });
});
