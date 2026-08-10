# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site serves all external audiences at once: prospective team members,
recruiters and employers scouting talent, sponsors, and hackathon partners.
The shared job is verifying that Team SEA-KERS is a credible, world-class
engineering collective worth joining, hiring, funding, or partnering with.

## Product Purpose

The official Team SEA-KERS website showcases the team: hackathon victories,
engineering projects, the team roster, and its mission. Success means a
visitor finishes the page trusting the team's engineering credibility and
understanding what it builds and why.

## Positioning

An India-based collegiate engineering collective with no lab, funding, or
institutional advantage, competing on the world stage across AI, computer
vision, and robotics. Preview record: 20+ hackathon wins, ₹18L+ in
grants and prizes. The claim that disciplines engineering from outside the
establishment can beat the best is the story the site tells and must not
contradict.

## Operating Context

Single-page site: hero with stats, wins, projects, team roster, and about /
mission sections, plus light and dark themes. Deployed at team-seakers.com via
Cloudflare Workers; TanStack Start SSR with streaming. Visitors are technical,
so copy speaks an engineering dialect. The site is currently a preview
surface; no submission or backend channels exist.

## Capabilities and Constraints

- Single-page showcase with hash-linked section navigation
  (wins, projects, team, about) and a keyboard-accessible dialog component
- Theme toggle persisted in `localStorage`, defaulting to
  `prefers-color-scheme`
- Particle-reconstructed brand mark in the hero (behavior pinned in DESIGN.md)
- Collective intake dialog existed but submissions were never connected;
  per owner decision the form is being removed for now. Future intake
  channel undecided.
- All project GitHub/demo links and member social links are undefined — no
  real URLs exist to link to
- Strict TypeScript, pnpm, TanStack Start on Cloudflare Workers; WCAG 2.2 AA
  accessibility target committed in DESIGN.md

## Brand Commitments

- Name: Team SEA-KERS; domain team-seakers.com
- Copy in use: tagline "Curious minds. Persistent builders."; mission
  statement "Young minds innovating from India to the world."
- Brand mark: caret above an ocean arc (white caret `#FFFFFF`, arc `#0C1E8B`
  accent blue, dark `#030624` presentation tile); no gradients or secondary
  color fields on the logo
- Committed visual direction (owner-provided reference, August 2026): premium
  editorial and cinematic presentation — storytelling, composition,
  typography, and whitespace over borders, gradients, and UI chrome; fixed
  palette of deep crimson `#DA261C`, dark burgundy `#741511`, accent blue
  `#0C1E8B`, cinematic navy `#030624`, and neutrals white, light gray
  `#EAEAEA`, dark gray `#222222`. Fully specified in DESIGN.md, which remains
  authoritative.

## Evidence on Hand

Confirmed aspirational: all win records (hackathon names, placements,
locations, dates), team member names, handles, bios, project metrics, and
hero stats (20+ wins, $350K+, 12.4K+ nodes, 100% open source) are preview
content, not verified real-world facts. Avatars and project images are
placeholder stock photos from Unsplash. No real press, testimonials, data,
or deployed project links exist. Future work must not present these as
verified claims or add new fabricated specifics.

## Product Principles

1. Credibility by craft: the site is the team's professional face — an
   art-directed, editorial presentation that communicates confidence,
   technical excellence, and creativity earns the trust the team competes
   for.
2. Aspirational content stays framed as preview: nothing may read as a
   verified claim until the owner supplies real facts.
3. Mission before stack: "young minds innovating from India to the world"
   anchors messaging; technology areas (AI, computer vision, robotics) serve
   that story.
4. Discipline wins: rigorous, accessible, fast — the same standards the team
   claims in its projects apply to the site itself.

## Accessibility & Inclusion

WCAG 2.2 AA per DESIGN.md: 4.5:1 normal text contrast, 3:1 large text,
visible keyboard focus, 44px minimum control targets, semantic landmarks and
labels, dialogs with `role="dialog"` / `aria-modal="true"`, focus trap and
restore, and `prefers-reduced-motion` support everywhere.
