import React from "react";
import { render } from "ink";
import { CmsApp } from "./ui/CmsApp.js";

export function launchTui(): void {
  render(<CmsApp />);
}
