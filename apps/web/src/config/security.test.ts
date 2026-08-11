import { describe, expect, it } from "vitest";
import {
  SECURITY_CONTACT_URL,
  SECURITY_TXT_BODY,
  SECURITY_TXT_EXPIRES,
} from "./security";

describe("security.txt metadata", () => {
  it("points Contact at a private reporting channel, not the public issue tracker", () => {
    expect(SECURITY_CONTACT_URL).toMatch(/security\/advisories\/new$/);
    expect(SECURITY_CONTACT_URL).not.toMatch(/\/issues$/);
    expect(SECURITY_TXT_BODY).toContain(`Contact: ${SECURITY_CONTACT_URL}`);
  });

  it("expires far enough in the future to force renewal before going stale", () => {
    const expires = Date.parse(SECURITY_TXT_EXPIRES);
    expect(Number.isNaN(expires)).toBe(false);
    expect(expires).toBeGreaterThan(Date.now() + 90 * 24 * 60 * 60 * 1000);
  });
});
