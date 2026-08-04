# SEA-KERS Design System

## Direction

SEA-KERS should feel like a premium digital magazine or movie poster rather
than a SaaS application. The design leads with storytelling, composition,
typography, and whitespace; borders, gradients, and UI chrome recede. Every
section is intentionally composed — no two consecutive sections share a
layout — and every screen holds one clear focal point, a single "hero
moment".

The experience communicates confidence, technical excellence, and creativity.

Keywords: editorial, cinematic, premium, modern, architectural, intentional,
spacious, layered, high contrast, bold.

## Brand mark

The caret is the primary brand element. It sits above one ocean arc. The mark
uses only:

- caret: `#FFFFFF`
- arc: `#0C1E8B` (accent blue)
- dark presentation tile: `#030624`

Do not add gradients or secondary color fields to the logo.

The hero may reconstruct the mark with particles:

- preserve the SVG viewBox coordinates so the static and particle marks align exactly;
- use smaller, denser caret particles and larger arc particles;
- select 650 to 2,200 particles from connection and device capability;
- keep animation at 30fps;
- pause while offscreen or while the document is hidden;
- retain the static SVG for reduced motion and initial rendering;
- never use glow or blur.

## Color palette

The palette is fixed and small. The interface is mostly neutral; accent
colors appear sparingly for emphasis. Never color everything.

| Role | Value | Use |
| --- | --- | --- |
| Deep Crimson | `#DA261C` | Primary accent, primary actions |
| Dark Burgundy | `#741511` | Supporting emphasis |
| Accent Blue | `#0C1E8B` | Sparse secondary accent, focus |
| Background | `#030624` | Dark cinematic navy |
| White | `#FFFFFF` | Light surfaces, text on dark |
| Light Gray | `#EAEAEA` | Quiet surfaces, thin borders |
| Dark Gray | `#222222` | Primary text on light |

Tokens marked "derived" below are neutral or tinted mixes of the palette
chosen to meet WCAG 2.2 AA contrast.

### Light mode

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#FFFFFF` | Page background |
| `foreground` | `#222222` | Primary text |
| `card` / `popover` | `#FFFFFF` | Floating content boxes |
| `muted` | `#EAEAEA` | Quiet surfaces |
| `muted-foreground` | `#555555` | Secondary text (derived) |
| `primary` | `#DA261C` | Main action and emphasis |
| `primary-hover` | `#B51E15` | Main action hover (darker crimson) |
| `primary-foreground` | `#FFFFFF` | Text on primary |
| `primary-soft` | `#FBEAE8` | Crimson-tinted callout surface (derived) |
| `secondary` | `#741511` | Supporting emphasis |
| `secondary-soft` | `#F3E8E7` | Burgundy-tinted surface (derived) |
| `accent` | `#0C1E8B` | Sparse emphasis and links |
| `accent-foreground` | `#FFFFFF` | Text on accent |
| `accent-soft` | `#E9ECF7` | Blue-tinted surface (derived) |
| `border` | `#EAEAEA` | Thin dividers only where needed |
| `input` | `#D8D8D8` | Form borders (derived) |
| `ring` | `#0C1E8B` | Keyboard focus |
| `destructive` | `#A3130C` | Errors and destructive actions (derived) |
| `success` | `#1E7A46` | Status only (semantic, outside accents) |
| `warning` | `#A15C00` | Status only (semantic, outside accents) |

### Dark mode

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#030624` | Page background |
| `foreground` | `#F5F5F7` | Primary text |
| `card` / `popover` | `#0E1133` | Elevated surfaces (derived) |
| `muted` | `#171A40` | Quiet surfaces (derived) |
| `muted-foreground` | `#A6A9BE` | Secondary text (derived) |
| `primary` | `#F0453B` | Main action and emphasis (lightened crimson) |
| `primary-hover` | `#D42219` | Main action hover |
| `primary-foreground` | `#FFFFFF` | Text on primary |
| `primary-soft` | `#3A1715` | Crimson-tinted surface (derived) |
| `secondary` | `#B85A53` | Supporting emphasis (lightened burgundy) |
| `secondary-soft` | `#2E1816` | Burgundy-tinted surface (derived) |
| `accent` | `#6F80E8` | Sparse emphasis (lightened blue) |
| `accent-soft` | `#131A4A` | Blue-tinted surface (derived) |
| `border` | `#2A2E55` | Thin dividers (derived) |
| `input` | `#3A3F6B` | Form borders (derived) |
| `ring` | `#8B9BFF` | Keyboard focus (derived) |
| `destructive` | `#FF7A72` | Errors and destructive actions |
| `success` | `#68D39A` | Status only |
| `warning` | `#F6C344` | Status only |

Use crimson, burgundy, and accent blue as flat fields. Do not blend them.

## Typography

- Display and headlines: Space Grotesk, weights 500 through 700.
- UI and body: Inter, weights 400 through 700.
- Typography carries the visual weight: large headlines, bold uppercase
  labels, small descriptive text, wide spacing.
- Push hierarchy aggressively; never make everything the same size.
- Section labels: bold uppercase with wide letter spacing (about 0.16em) and
  small size.
- Headlines: display scale from 48px up to 96px, tight leading, slight
  negative tracking on the largest sizes.
- Body text at least 16px where space allows and never below 14px; keep
  paragraphs near 65 characters per line.
- Sentence case for interface copy; uppercase is reserved for labels and
  kickers.

## Layout and geometry

- Asymmetry is the default: alternate left-heavy and right-heavy
  compositions; no two consecutive sections share an identical layout.
- Negative space is encouraged; large margins beat filling every pixel.
- Allow intentional overlap: images behind text, floating content blocks over
  imagery, cards extending outside containers.
- Every screen contains at least one visual focal point.
- Base spacing unit: 8px. Section padding: 64px small screens, 96px large.
- Content width: 1280px maximum.
- Prefer rectangles; radius 8px to 16px. Cut corners, offset blocks, and
  floating panels are welcome; avoid pill shapes.
- Depth comes from composition — overlap, transparent overlays, colored
  rectangles, image masks, clipped sections — not shadows.
- Borders are thin and semantic; remove borders that carry no meaning.
- Control height: at least 44px.

## Imagery

- Photography is part of the layout, not an afterthought: large, aggressively
  cropped, overlapping neighboring sections, extending behind text, and
  anchoring compositions.
- Never place images inside generic rounded cards. Prefer image → overlay →
  floating content block.
- Images reserve dimensions and use responsive sources.

## Components

- Cards are editorial callouts, not dashboard widgets: large image, floating
  content box, accent block. No generic card grids.
- Navigation stays minimal: generous spacing, thin typography, underline or
  color transition on hover, no oversized buttons, one clear active state,
  keyboard accessible.
- Buttons: primary solid crimson; secondary outlined. Hover: slightly darker
  with a small translateY(-2px). No glow, no gradients.
- Inputs always have a visible label, adequate padding, and a strong focus
  ring.
- Tags are compact metadata, not primary actions.
- Dialogs require a heading, Escape handling, focus trapping, and focus
  restore.

## Motion

- Normal transitions last 250 to 500ms.
- Preferred: fade, slide, parallax, image reveal, text reveal, hover lift.
- Never use bounce, spin, elastic, flash, or overly dramatic effects.
- Motion must clarify, not distract. Respect `prefers-reduced-motion`
  everywhere.

## Accessibility

Target WCAG 2.2 AA:

- normal text contrast at least 4.5:1; large text at least 3:1;
- small crimson text on tinted or gray surfaces must use `#B51E15` or darker
  to hold 4.5:1;
- visible keyboard focus on every interactive element;
- 44px minimum control targets;
- semantic headings, landmarks, labels, and buttons;
- color never carries meaning alone;
- dialogs expose `role="dialog"` and `aria-modal="true"`;
- browser-only behavior stays inside effects or event handlers for safe SSR.

## Asset delivery

- Use SVG for logos and icons.
- Use AVIF for photographs with WebP or JPEG fallback where needed.
- Provide explicit width and height for every raster image.
- Social preview: 1200x630 PNG or JPEG.
- Apple touch icon: 180x180 PNG.
- Favicon: one ICO containing 16x16, 32x32, and 48x48 sizes.
