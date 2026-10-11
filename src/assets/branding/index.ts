/**
 * Official ACCREVIA logo assets (optimised from the master artwork).
 * The artwork must never be redrawn, recoloured or cropped in code - only sized and positioned.
 *
 * - horizontal   : compact lockup (ring + wordmark) for the header and footer
 * - fullDark     : full logo on dark (ring, wordmark, TECHNOLOGIES, tagline) for the hero, two widths for srcset
 *
 * To update a logo, re-export the optimised file with the same name (see README.md in this folder).
 */
import horizontal from "./logo-horizontal.webp";
import fullDark720 from "./logo-full-dark-720.webp";
import fullDark1440 from "./logo-full-dark-1440.webp";

export const brandAssets = {
  horizontal: { src: horizontal, width: 960, height: 207 },
  fullDark: {
    src: fullDark1440,
    srcSet: `${fullDark720} 720w, ${fullDark1440} 1440w`,
    width: 1440,
    height: 834,
    /** Vertical position of the black-hole centre inside the full logo (0-1), used to align the hero environment. */
    ringCenterY: 0.37,
  },
} as const;
