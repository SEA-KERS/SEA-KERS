import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "./HomePage";

vi.mock("../layout/Navbar", () => ({
  default: ({ activeTab }: { activeTab: string }) => (
    <output data-testid="active-tab">{activeTab}</output>
  ),
}));
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

describe("HomePage URL hash navigation", () => {
  beforeEach(() => window.history.replaceState(null, "", "/"));

  it("derives the initial tab from a direct wins hash", async () => {
    window.history.replaceState(null, "", "/#wins");
    await renderHome();
    expect(screen.getByTestId("active-tab")).toHaveTextContent("wins");
  });

  it("updates for hashchange and defaults unknown hashes to all", async () => {
    await renderHome();
    act(() => {
      window.history.pushState(null, "", "/#team");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByTestId("active-tab")).toHaveTextContent("team");

    act(() => {
      window.history.pushState(null, "", "/#unknown");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByTestId("active-tab")).toHaveTextContent("all");
  });

  it("finds section anchor during lazy component load via Suspense fallback", async () => {
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
