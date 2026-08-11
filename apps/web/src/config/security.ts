/** security.txt metadata served by /security.txt and /.well-known/security.txt.
 *  The Contact value must be a private reporting channel, never a public issue
 *  tracker. SECURITY_TXT_EXPIRES is guarded by a test that fails when the date
 *  approaches, forcing renewal before the served value goes stale. */
export const SECURITY_CONTACT_URL =
  "https://github.com/SEA-KERS/SEA-KERS/security/advisories/new";

export const SECURITY_TXT_EXPIRES = "2027-12-31T00:00:00.000Z";

export const SECURITY_TXT_BODY = [
  `Contact: ${SECURITY_CONTACT_URL}`,
  `Expires: ${SECURITY_TXT_EXPIRES}`,
  "Preferred-Languages: en",
  "",
  "# Team SEA-KERS security contact",
  "# Please report vulnerabilities privately via a GitHub issue.",
].join("\n");
