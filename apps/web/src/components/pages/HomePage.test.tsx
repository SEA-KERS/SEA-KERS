import { act, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "./HomePage";

vi.mock("../layout/Navbar", () => ({ default: () => null }));
vi.mock("../layout/Footer", () => ({ default: () => null }));
vi.mock("../hero/Hero", () => ({ default: () => null }));
vi.mock("../sections/NewsroomSection", () => ({ default: () => <section id="newsroom" /> }));
vi.mock("../sections/TeamSection", () => ({ default: () => <section id="team" /> }));
vi.mock("../sections/ContactSection", () => ({ default: () => <section id="contact" /> }));
vi.mock("../sections/StatsBand", () => ({ default: () => <section id="wins" /> }));

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

    const newsroomAnchor = document.getElementById("newsroom");
    expect(newsroomAnchor).toBeInTheDocument();

    const teamAnchor = document.getElementById("team");
    expect(teamAnchor).toBeInTheDocument();

    const contactAnchor = document.getElementById("contact");
    expect(contactAnchor).toBeInTheDocument();
  });
});
