import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TeamPage from "./TeamPage";

describe("TeamPage roster", () => {
  it("lists every member in a descriptive vertical index", () => {
    render(<TeamPage />);
    expect(
      screen.getByRole("heading", { name: "The crew" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/12 members/i)).toBeInTheDocument();

    for (const name of ["Kashvi V", "Pramoda S R", "Sharan Reddy", "Sujan P"]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });

  it("links each member to their LinkedIn profile", () => {
    render(<TeamPage />);
    expect(
      screen.getAllByRole("link", { name: "Connect on LinkedIn" }),
    ).toHaveLength(12);
  });

  it("highlights the member targeted by the hash deep-link", () => {
    render(<TeamPage activeMemberId="pramoda-s-r" />);

    const row = screen
      .getByRole("heading", { name: "Pramoda S R" })
      .closest("article");
    expect(row).toHaveClass("bg-(--card)");
    expect(row).toHaveAttribute("id", "pramoda-s-r");

    const otherRow = screen
      .getByRole("heading", { name: "Kashvi V" })
      .closest("article");
    expect(otherRow).not.toHaveClass("bg-(--card)");
  });
});
