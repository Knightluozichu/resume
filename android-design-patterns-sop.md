# 《Android アプリ設計パターン入門》SOP

## Scope

- Book: Android アプリ設計パターン入門
- Track: Android · 中级
- Source: PEAKS book page and public table of contents.
- Target shape: less prose, chapter-specific diagrams, narrative Stepper, review questions.

## Work Items

1. Design: 10-chapter map, review slug prefix `adp-`, reusable but mode-specific `AndroidDesignLab`.
2. Implementation: add chapter MDX, register component, add review questions, connect Android intermediate stage.
3. Teaching gate: every chapter gets a distinct story diagram; Stepper must teach a real chapter scenario, not generic highlighting.
4. Code gate: MDX check, targeted ESLint, link check, production build, browser smoke for Android design pages.
5. Release: merge feature branch to `main`, deploy, health check.

## Visual Contract

- Each chapter chooses its own diagram mode and story: screen state, role boundary, pattern topology, error flow, test seam, refactor path, AAC chain, Kotlin collaboration, or team review map.
- Every chapter includes `AndroidDesignLab`, a narrative `Stepper`, at least two trap callouts, glossary, exercises, and a review link through `adp-*`.
- Animations use the shared `animotor` easing helper inside the React component.
