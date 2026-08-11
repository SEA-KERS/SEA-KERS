import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./HomePage";

vi.mock("../layout/Navbar", () => ({ default: () => null }));
vi.mock("../layout/Footer", () => ({ default: () => null }));
vi.mock("../hero/Hero", () => ({ default: () => null }));
vi.mock("../sections/WinsSection", () => ({ default: () => <section id="wins" /> }));
vi.mock("../sections/ProjectsSection", () => ({ default: () => <section id="projects" /> }));
vi.mock("../sections/TeamSection", () => ({ default: () => <section id="team" /> }));
vi.mock("../sections/MissionSection", () => ({ default: () => <section id="about" /> }));
vi.mock("../sections/StatsBand", () => ({ default: () => null }));

const renderHome = async () => {
  await act(async () => {
    render(<HomePage />);
  });
};

describe("HomePage section anchors", () => {
  it("finds every section anchor during lazy component load via Suspense fallback", async () => {
    await renderHome();
    const winsAnchor = document.getElementById("wins");
    expect(winsAnchor).toBeInTheDocument();

    const projectsAnchor = document.getElementById("projects");
    expect(projectsAnchor).toBeInTheDocument();

    const teamAnchor = document.getElementById("team");
    expect(teamAnchor).toBeInTheDocument();

    const aboutAnchor = document.getElementById("about");
    expect(aboutAnchor).toBeInTheDocument();
  });
});
