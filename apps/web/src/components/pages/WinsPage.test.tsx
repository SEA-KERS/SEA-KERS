import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import WinsPage from "./WinsPage";

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

describe("WinsPage archive", () => {
  it("renders all win records ranked by prize value", () => {
    render(<WinsPage />);
    expect(
      screen.getByRole("heading", { name: "Challenges conquered" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/20 records/i)).toBeInTheDocument();
  });

  it("filters records by track", async () => {
    const user = userEvent.setup();
    render(<WinsPage />);

    await user.click(screen.getByRole("button", { name: "HAL" }));

    expect(screen.getByText(/1 record/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /HAL Aerothon 2025/ }),
    ).toBeInTheDocument();
  });

  it("searches records by query", async () => {
    const user = userEvent.setup();
    render(<WinsPage />);

    const search = screen.getByRole("searchbox", { name: "Search challenges" });
    await user.type(search, "Darshan");

    expect(screen.getByText(/4 records/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hackverse Mumbai/)).not.toBeInTheDocument();
  });

  it("expands a record inline to show the full detail", async () => {
    const user = userEvent.setup();
    render(<WinsPage />);

    const record = screen.getByRole("heading", {
      name: /HAL Aerothon 2025/,
    });
    const row = record.closest("article");
    expect(row).toBeInTheDocument();
    expect(
      within(row!).queryByText(/target identification system/i),
    ).not.toBeInTheDocument();

    const toggle = within(row!).getByRole("button");
    await user.click(toggle);

    expect(
      await within(row!).findByText(/aerial target identification/i),
    ).toBeInTheDocument();
  });
});
