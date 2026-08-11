import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProjectsPage, {
  FILTER_GROUPS,
  type FilterGroup,
} from "./ProjectsPage";

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

/** Mirrors the route wiring: the filter group + query feed the archive, the
 *  hash drives the expanded project, and interactions report back through the
 *  callbacks so the page stays fully controlled. */
function Harness({
  initialGroup = FILTER_GROUPS[0],
  initialQ = "",
  initialExpandedId = null,
}: {
  initialGroup?: FilterGroup;
  initialQ?: string;
  initialExpandedId?: string | null;
}) {
  const [group, setGroup] = useState<FilterGroup>(initialGroup);
  const [q, setQ] = useState(initialQ);
  const [expandedId, setExpandedId] = useState<string | null>(initialExpandedId);

  return (
    <ProjectsPage
      group={group}
      q={q}
      expandedId={expandedId}
      onGroupChange={setGroup}
      onSearchChange={setQ}
      onToggleExpand={setExpandedId}
    />
  );
}

describe("ProjectsPage archive", () => {
  it("renders the re-titled project index", () => {
    render(<Harness />);
    expect(
      screen.getByRole("heading", { name: "What we build" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/6 specifications/i)).toBeInTheDocument();
    expect(screen.queryByText(/Our repositories/i)).not.toBeInTheDocument();
  });

  it("filters projects by group", async () => {
    const user = userEvent.setup();
    render(<Harness />);

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
    render(<Harness />);

    const search = screen.getByRole("searchbox", { name: "Search projects" });
    await user.type(search, "smart contract");

    expect(screen.getByText(/1 specification/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "KODEX_SENTINEL" }),
    ).toBeInTheDocument();
  });

  it("expands a project inline to reveal metrics and stack", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const title = screen.getByRole("heading", { name: "NEON_MESH PROTOCOL" });
    const row = title.closest("article");
    expect(row).toBeInTheDocument();
    expect(within(row!).queryByText(/12\.4K\+/)).not.toBeInTheDocument();

    await user.click(within(row!).getByRole("button"));

    expect(await within(row!).findByText(/12\.4K\+/)).toBeInTheDocument();
    expect(within(row!).getByText("Repository link coming soon")).toBeInTheDocument();
  });

  it("expands the project requested by the hash deep-link on load", () => {
    render(<Harness initialExpandedId="neon-mesh" />);

    const row = screen
      .getByRole("heading", { level: 2, name: "NEON_MESH PROTOCOL" })
      .closest("article");
    expect(row).toBeInTheDocument();
    expect(within(row!).getByText(/12\.4K\+/)).toBeInTheDocument();
  });

  it("does not expand a hash deep-link when no project matches", () => {
    render(<Harness initialExpandedId="does-not-exist" />);

    const row = screen
      .getByRole("heading", { level: 2, name: "NEON_MESH PROTOCOL" })
      .closest("article");
    expect(within(row!).queryByText(/12\.4K\+/)).not.toBeInTheDocument();
  });

  it("drives the filter controls from the group and query props", () => {
    render(
      <Harness initialGroup={FILTER_GROUPS[1]} initialQ="cross-chain" />,
    );

    expect(
      screen.getByRole("button", { name: "Infrastructure" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("searchbox")).toHaveValue("cross-chain");
    expect(screen.getByText(/1 specification/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "HYPER_RELAY INTEROP" }),
    ).toBeInTheDocument();
  });
});
