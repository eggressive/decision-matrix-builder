# Project TODO

These items were moved from GitHub issue #10. They are feature ideas and quality-of-life improvements, not bugs.

- [ ] **Add a React Error Boundary** — Wrap `<App />` so one bad matrix doesn't crash the entire app with a white screen.
- [ ] **Auto-normalize criterion weights** — Let users enter relative weights (e.g. 5, 3, 2) and auto-normalize behind the scenes instead of forcing manual sum-to-1.
- [ ] **Add basic smoke tests** — React Testing Library mount test for `App` + dummy matrix creation; would have caught the `scores` undefined crash.
- [ ] **Add prop-types or basic TypeScript** — Untyped component props allow prop-mismatch bugs.
- [ ] **Memoize expensive computations** — `calculateTotalScore`, `rankOptions`, and scoring-grid totals recompute on every render. `useMemo` for larger matrices.
- [ ] **Optimize MatrixEditor ranking** — O(n²) ranking in results section needs `useMemo` extraction.

---
*Converted from GitHub issue #10 on 2026-05-08*
