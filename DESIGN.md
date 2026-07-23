# SEA-KERS Design System

## Direction

SEA-KERS should feel like professional engineering software: precise, calm,
credible, and fast. Prefer generous whitespace, clean geometry, flat surfaces,
and an 8px spacing rhythm. Every element should have a clear purpose.

Avoid gradients, glassmorphism, glow, neon treatments, decorative grids, heavy
shadows, excessive borders, and ornamental animation.

## Brand mark

The caret is the primary brand element. It sits above one primary-blue ocean
arc. The mark uses only:

- caret: `#FFFFFF`
- arc: `#4361EE`
- dark presentation tile: `#0D0D0D`

Do not add gradients or secondary color fields to the logo.

The hero may reconstruct the mark with particles:

- preserve the SVG viewBox coordinates so the static and particle marks align exactly;
- use smaller, denser caret particles and larger arc particles;
- select 650 to 2,200 particles from connection and device capability;
- keep animation at 30fps;
- pause while offscreen or while the document is hidden;
- retain the static SVG for reduced motion and initial rendering;
- never use glow or blur.

## Color tokens

### Light mode

| Token | Value | Use |
| --- | --- | --- |
| `background` | `#F8F9FC` | Page background |
| `foreground` | `#11131A` | Primary text |
| `card` / `popover` | `#FFFFFF` | Elevated surfaces |
| `muted` | `#EEF1F6` | Quiet surfaces |
| `muted-foreground` | `#5D6474` | Secondary text |
| `primary` | `#4361EE` | Main action and brand |
| `primary-hover` | `#3651D4` | Main action hover |
| `primary-soft` | `#E9EDFF` | Selected states |
| `secondary` | `#7209B7` | Supporting emphasis |
| `secondary-soft` | `#F4EAFB` | Supporting surface |
| `accent` | `#F72585` | Sparse emphasis |
| `accent-text` | `#D8176C` | Accessible accent text |
| `accent-soft` | `#FDE8F2` | Accent surface |
| `border` | `#D9DEE8` | Dividers and outlines |
| `input` | `#8B94A7` | Form borders |
| `ring` | `#4361EE` | Keyboard focus |
| `destructive` | `#B42318` | Errors and destructive actions |
| `success` | `#127A46` | Success |
| `warning` | `#A15C00` | Warning text |

### Dark mode

| Token | Value |
| --- | --- |
| `background` | `#0D0D0D` |
| `foreground` | `#F4F6FB` |
| `card` | `#141419` |
| `popover` / `muted` | `#1A1A2E` |
| `muted-foreground` | `#AEB4C2` |
| `primary-text` / `ring` | `#8EA2FF` |
| `primary-soft` | `#1B2344` |
| `secondary-text` | `#C89BFF` |
| `secondary-soft` | `#291636` |
| `accent-text` | `#FF70AD` |
| `accent-soft` | `#351426` |
| `border` | `#343746` |
| `input` | `#62697D` |
| `destructive` | `#FF8277` |
| `success` | `#68D39A` |
| `warning` | `#F6C344` |

Use primary, secondary, and accent as flat fields. Do not blend them.

## Typography

- Headings: Space Grotesk, weights 500 through 700.
- UI and body: Inter, weights 400 through 700.
- Use sentence case for interface copy.
- Keep body text at least 16px where space allows and never below 14px.
- Keep paragraphs near 65 characters per line.

## Layout and geometry

- Base spacing unit: 8px.
- Content width: 1280px maximum.
- Section padding: 64px small screens, 80px large screens.
- Control height: at least 44px.
- Radius: 8px for controls, 12px for cards, 14px for dialogs.
- Borders: 1px and semantic; do not outline every nested surface.
- Shadows: reserved for dialogs and temporary overlays.

## Components

- Navigation uses one clear active state and remains keyboard accessible.
- Buttons use primary fill, neutral outline, or quiet treatment.
- Cards use a flat surface, one border, and no decorative shadow.
- Inputs always have a visible label, adequate padding, and a strong focus ring.
- Tags are compact metadata, not primary actions.
- Dialogs require a heading, Escape handling, focus trapping, and focus restore.
- Images reserve dimensions and use responsive sources.

## Motion

Normal transitions last 150 to 250ms and use opacity or transform. Motion must
clarify state, not delay work. Respect `prefers-reduced-motion` everywhere.

## Accessibility

Target WCAG 2.2 AA:

- normal text contrast at least 4.5:1;
- large text contrast at least 3:1;
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