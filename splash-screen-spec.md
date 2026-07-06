# Splash Screen — Build Spec
**Extension to: Mohamed Gaber Portfolio Build Spec**
**Handoff document for AI implementation (Opus / Gemini in Antigravity)**

---

## 0. Purpose

A brief loading/intro sequence that plays once when the site first loads, before the Hero section appears. It should feel like **powering on a circuit board** — consistent with the site's existing PCB/system-log identity (the `DEVICE MODEL: MG-GRAD-2026` panel, `SYSTEM LOGIC BELOW`, the terminal shutdown log in Contact). This is the "boot" to that "shutdown."

**Hard constraint: keep it short.** 1.5–2.5 seconds total, skippable, and never shown again after the first visit in a session. A splash screen that overstays its welcome reads as an ego animation, not craftsmanship — the goal is a polished half-second impression, not a movie intro.

---

## 1. Concept

A **power-on sequence** for the "Gaber Board" — as if the browser is a device booting up. Three quick beats:

1. **Power trace draw** (0.0s–0.8s): A single circuit trace draws itself from the center of the screen outward (same stroke-dasharray technique as the scroll-spine trace on the main site), connecting to 3–4 small pad nodes arranged around a center point.
2. **Node light-up + logo reveal** (0.8s–1.4s): As the trace reaches each pad, it lights up (`--olive-signal` glow), and the center resolves into the "MG" chip-mark logo (same style as the nav logo), like a chip seating into its socket.
3. **System log flicker + fade** (1.4s–2.2s): One or two lines of mono system-log text flicker in beneath the logo (e.g., `> initializing board...` → `> profile loaded: M. GABER`), then the whole splash fades out (opacity + slight scale-down) to reveal the Hero underneath.

Optional: a thin loading bar rendered as a **trace filling with current** (a horizontal line that fills left-to-right in `--olive-signal`) instead of a generic progress bar — reinforces the electrical metaphor without adding new visual language.

---

## 2. Visual Spec (reuses existing tokens — no new colors/fonts)

| Element | Spec |
|---|---|
| Background | `--bg-base` (#12140F), full-viewport, fixed position, covers everything including nav |
| Trace lines | `--olive-signal` (#A8C24C), 1.5–2px stroke, same style as main-site scroll spine |
| Center logo mark | Reuse the existing "MG" chip-mark component from the nav (don't create a new logo treatment) |
| System log text | IBM Plex Mono, `--text-muted` fading to `--olive-signal` on the active line, ~0.85rem |
| Loading bar (optional) | 2px height, `--olive-signal` fill on `--bg-panel` track, centered, ~200px wide |

No copper accent here — copper is reserved for Data/Analytics moments on the main site; keep the splash purely olive/signal to avoid diluting that color-coding rule.

---

## 3. Copy (keep it to 2 lines max, mono, terminal style)

```
> initializing board...
> profile loaded: M. GABER
```

Avoid cute overwriting like "compiling awesomeness" — the rest of the site's system-log copy (About panel, Contact shutdown log) is dry and literal, and the splash should match that tone, not turn jokey.

---

## 4. Behavior Rules

- **Show once per session.** Use `sessionStorage` (not `localStorage` — per-tab/session is enough, don't need cross-session persistence) to flag that the splash has played; skip it on internal navigation or refresh within the same session if that's acceptable, or simply gate it to first paint only and not worry about SPA re-renders since this is a single-page site.
- **Skippable:** clicking/tapping anywhere, or pressing any key, immediately jumps to the fade-out step. Never trap the user.
- **Respect `prefers-reduced-motion`:** if set, skip straight to a simple 300ms fade-in of the Hero with no trace-draw animation at all — do not attempt a "reduced" version of the trace animation, just cut to the destination.
- **No layout shift:** splash sits in a fixed-position overlay (`position: fixed; inset: 0; z-index: high`) so it never affects the Hero's own layout/mount timing underneath.
- **Never block interaction longer than ~2.5s.** If fonts or images are still loading when the splash would end, fade out anyway — don't extend the splash to wait on asset loading, that risks it feeling like a stall rather than a flourish.

---

## 5. Implementation Notes

- Build as a single component, e.g. `SplashScreen.jsx`, mounted at the top of `App.jsx`, conditionally rendered based on a `showSplash` state (`true` on first mount, set to `false` after the sequence or on skip).
- Animate with Framer Motion (already used elsewhere per the main spec) — an `AnimatePresence` wrapping the splash component makes the exit fade trivial.
- The trace-draw can reuse the same SVG path + `stroke-dashoffset` technique as the main `CircuitTrace.jsx` component — don't build a second, different animation system for this if the existing one can be reused with a different path shape.
- Keep the whole thing dependency-free beyond what's already in the project (no new animation libraries just for this).

---

## 6. Quick Checklist

- [ ] Total duration 1.5–2.5s, no longer
- [ ] Skippable via click/tap/keypress
- [ ] Shows once per session only (sessionStorage flag)
- [ ] Reuses existing tokens/logo/fonts — no new colors or type introduced
- [ ] Reduced-motion users get instant/simple fade, not a stripped-down animation
- [ ] Doesn't block on asset loading past the max duration
- [ ] Copy stays dry/technical, matches tone of rest of site (no jokey "loading awesomeness" language)
