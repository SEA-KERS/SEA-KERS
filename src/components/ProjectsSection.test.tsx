import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsSection from "./ProjectsSection";

function ProjectsHarness() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    "neon-mesh",
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setSelectedProjectId("neon-mesh")}
      >
        Select same project
      </button>
      <ProjectsSection
        selectedProjectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />
    </>
  );
}

describe("ProjectsSection", () => {
  it("can reopen the same project after the dialog closes", async () => {
    render(<ProjectsHarness />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: "Close project specification",
      }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Select same project" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
