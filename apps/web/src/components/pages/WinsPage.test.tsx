import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import WinsPage, { type TrackFilter } from "./WinsPage";

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

/** Mirrors the route wiring: search params feed the filter controls, the hash
 *  drives the expanded record, and every interaction reports back through the
 *  callbacks so the page stays fully controlled. */
function Harness({
  initialTrack = "ALL",
  initialQ = "",
  initialExpandedId = null,
}: {
  initialTrack?: TrackFilter;
  initialQ?: string;
  initialExpandedId?: string | null;
}) {
  const [track, setTrack] = useState<TrackFilter>(initialTrack);
  const [q, setQ] = useState(initialQ);
  const [expandedId, setExpandedId] = useState<string | null>(initialExpandedId);

  return (
    <WinsPage
      track={track}
      q={q}
      expandedId={expandedId}
      onTrackChange={setTrack}
      onSearchChange={setQ}
      onToggleExpand={setExpandedId}
    />
  );
}

describe("WinsPage archive", () => {
  it("renders all win records ranked by prize value", () => {
    render(<Harness />);
    expect(
      screen.getByRole("heading", { name: "Challenges conquered" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/20 records/i)).toBeInTheDocument();
  });

  it("filters records by track", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: "HAL" }));

    expect(screen.getByText(/1 record/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /HAL Aerothon 2025/ }),
    ).toBeInTheDocument();
  });

  it("searches records by query", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const search = screen.getByRole("searchbox", { name: "Search challenges" });
    await user.type(search, "Darshan");

    expect(screen.getByText(/4 records/i)).toBeInTheDocument();
    expect(screen.queryByText(/Hackverse Mumbai/)).not.toBeInTheDocument();
  });

  it("expands a record inline to show the full detail", async () => {
    const user = userEvent.setup();
    render(<Harness />);

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

  it("reflects a hash deep-link by expanding that record on load", () => {
    render(<Harness initialExpandedId="win-08" />);

    const row = screen
      .getByRole("heading", { level: 2, name: /HAL Aerothon 2025/ })
      .closest("article");
    expect(row).toBeInTheDocument();
    expect(
      within(row!).getByText(/aerial target identification/i),
    ).toBeInTheDocument();
  });

  it("drives the filter controls from the track and query props", () => {
    render(<Harness initialTrack="HAL" initialQ="EO/IR" />);

    expect(screen.getByRole("button", { name: "HAL" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("searchbox")).toHaveValue("EO/IR");
    expect(screen.getByText(/1 record/i)).toBeInTheDocument();
  });
});
