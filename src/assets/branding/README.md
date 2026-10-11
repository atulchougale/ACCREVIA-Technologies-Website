# Branding assets

Optimised web versions of the official ACCREVIA logo artwork. The master PNG files are large (3-6 MB each) and are kept
outside the repository; only these web-ready WebP exports and the icons in `public/` are committed.

| File                                                          | Master artwork used       | Used by                                  |
| ------------------------------------------------------------- | ------------------------- | ---------------------------------------- |
| `logo-horizontal.webp`                                        | horizontal lockup on dark | Header, footer                           |
| `logo-full-dark-720.webp` / `-1440.webp`                      | full logo on dark         | Hero (responsive `srcset`)               |
| `public/favicon.ico`, `favicon-32.png`                        | logo icon on dark         | Browser tab                              |
| `public/apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | logo icon on dark         | Mobile / app icons                       |
| `public/og-image.jpg` (1200x630)                              | full logo on dark         | LinkedIn, WhatsApp, Facebook, X previews |

Only margins of empty black and a stray corner watermark were trimmed from the masters. The artwork itself is untouched.
To replace a logo, export the new artwork to the same file name (keep the dark background) and the site updates.
