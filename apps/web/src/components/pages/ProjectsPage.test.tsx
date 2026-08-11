import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("ProjectsPage archive", () => {
  it("renders the re-titled project index", () => {
    render(<ProjectsPage />);
    expect(
      screen.getByRole("heading", { name: "What we build" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/6 specifications/i)).toBeInTheDocument();
    expect(screen.queryByText(/Our repositories/i)).not.toBeInTheDocument();
  });

  it("filters projects by group", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    await user.click(screen.getByRole("button", { name: "AI & Robotics" }));

    expect(screen.getByText(/3 specifications/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "KODEX_SENTINEL" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "EDGE_VISION CORE" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/NEON_MESH PROTOCOL/)).not.toBeInTheDocument();
  });

  it("searches projects across the spec text", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const search = screen.getByRole("searchbox", { name: "Search projects" });
    await user.type(search, "smart contract");

    expect(screen.getByText(/1 specification/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "KODEX_SENTINEL" }),
    ).toBeInTheDocument();
  });

  it("expands a project inline to reveal metrics and stack", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const title = screen.getByRole("heading", { name: "NEON_MESH PROTOCOL" });
    const row = title.closest("article");
    expect(row).toBeInTheDocument();
    expect(within(row!).queryByText(/12\.4K\+/)).not.toBeInTheDocument();

    await user.click(within(row!).getByRole("button"));

    expect(await within(row!).findByText(/12\.4K\+/)).toBeInTheDocument();
    expect(within(row!).getByText("Repository link coming soon")).toBeInTheDocument();
  });
});
