import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WinsSection from "./WinsSection";

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
});
