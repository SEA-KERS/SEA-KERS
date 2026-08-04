import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "./HomePage";

vi.mock("./Navbar", () => ({
  default: ({ activeTab }: { activeTab: string }) => <output data-testid="active-tab">{activeTab}</output>,
}));
vi.mock("./Hero", () => ({ default: () => null }));
vi.mock("./WinsSection", () => ({ default: () => null }));
vi.mock("./ProjectsSection", () => ({ default: () => null }));
vi.mock("./TeamSection", () => ({ default: () => null }));
vi.mock("./MissionSection", () => ({ default: () => null }));
vi.mock("./Footer", () => ({ default: () => null }));
vi.mock("./JoinModal", () => ({ default: () => null }));

describe("HomePage URL hash navigation", () => {
  beforeEach(() => window.history.replaceState(null, "", "/"));

  it("derives the initial tab from a direct wins hash", () => {
    window.history.replaceState(null, "", "/#wins-section");
    render(<HomePage />);
    expect(screen.getByTestId("active-tab")).toHaveTextContent("wins");
  });

  it("updates for hashchange and defaults unknown hashes to all", () => {
    render(<HomePage />);
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