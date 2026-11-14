import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ContactSection from "./ContactSection";
import NewsroomSection from "./NewsroomSection";

describe("ContactSection form", () => {
  const originalLocation = window.location;

  afterEach(() => {
    Object.defineProperty(window, "location", { value: originalLocation, configurable: true });
  });

  it("hands the message to the visitor's email client instead of dropping it", () => {
    const location = { href: "" };
    Object.defineProperty(window, "location", { value: location, configurable: true });

    render(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Asha" } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "asha@example.org" } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: "Let's build" } });
    fireEvent.click(screen.getByRole("button", { name: /Initiate Collaboration/ }));

    expect(location.href).toMatch(/^mailto:ogmanoja@gmail\.com\?subject=/);
    const body = decodeURIComponent(location.href.split("&body=")[1]);
    expect(body).toContain("Let's build");
    expect(body).toContain("asha@example.org");
    expect(screen.getByRole("heading", { name: "Almost there" })).toBeInTheDocument();
  });
});

describe("NewsroomSection", () => {
  it("renders every article as a keyboard-reachable external link", () => {
    render(<NewsroomSection />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    for (const link of links) {
      expect(link).toHaveAttribute("href", expect.stringMatching(/^https:\/\//));
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(screen.queryByText(/MSME/)).not.toBeInTheDocument();
  });
});
