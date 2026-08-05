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
vi.mock("../sections/WinsSection", () => ({ default: () => null }));
vi.mock("../sections/ProjectsSection", () => ({ default: () => null }));
vi.mock("../sections/TeamSection", () => ({ default: () => null }));
vi.mock("../sections/MissionSection", () => ({ default: () => null }));
vi.mock("../sections/StatsBand", () => ({ default: () => null }));

const renderHome = async () => {
  await act(async () => {
    render(<HomePage />);
  });
};

describe("HomePage URL hash navigation", () => {
  beforeEach(() => window.history.replaceState(null, "", "/"));

  it("derives the initial tab from a direct wins hash", async () => {
    window.history.replaceState(null, "", "/#wins-section");
    await renderHome();
    expect(screen.getByTestId("active-tab")).toHaveTextContent("wins");
  });

  it("updates for hashchange and defaults unknown hashes to all", async () => {
    await renderHome();
    act(() => {
      window.history.pushState(null, "", "/#team-section");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByTestId("active-tab")).toHaveTextContent("team");

    act(() => {
      window.history.pushState(null, "", "/#unknown");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByTestId("active-tab")).toHaveTextContent("all");
  });
});
