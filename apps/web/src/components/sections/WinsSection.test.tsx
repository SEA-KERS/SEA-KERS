import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WinsSection from "./WinsSection";

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

describe("WinsSection home preview", () => {
  it("showcases the three highest-value wins and links to the archive", () => {
    render(<WinsSection />);

    expect(
      screen.getByRole("heading", { name: "The strongest wins" }),
    ).toBeInTheDocument();

    const viewAll = screen.getByRole("link", {
      name: /View all 20 win records/i,
    });
    expect(viewAll).toHaveAttribute("href", "/wins");

    for (const name of [
      /MSME 5\.0 Hackathon/,
      /HAL Aerothon 2025/,
      /Hackverse Mumbai/,
    ]) {
      expect(screen.getAllByRole("link", { name })).toBeTruthy();
    }
  });

  it("renders the podium links in topByPrize order", () => {
    render(<WinsSection />);

    const podiumLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("aria-label")?.includes("View the full win record"));

    expect(podiumLinks.map((link) => link.getAttribute("aria-label"))).toEqual([
      expect.stringMatching(/MSME 5\.0 Hackathon/),
      expect.stringMatching(/HAL Aerothon 2025/),
      expect.stringMatching(/Hackverse Mumbai/),
    ]);
  });

  it("deep-links each podium win to its record hash on the wins page", () => {
    render(<WinsSection />);

    expect(screen.getByRole("link", { name: /MSME 5\.0 Hackathon/ })).toHaveAttribute(
      "href",
      "/wins#win-15",
    );
    expect(screen.getByRole("link", { name: /HAL Aerothon 2025/ })).toHaveAttribute(
      "href",
      "/wins#win-08",
    );
    expect(screen.getByRole("link", { name: /Hackverse Mumbai/ })).toHaveAttribute(
      "href",
      "/wins#win-05",
    );
  });
});
