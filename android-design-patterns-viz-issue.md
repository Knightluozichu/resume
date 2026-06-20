# Issue: Android Design Patterns Viz Placeholder Bug

Labels: content, Bug

## Problem

The Android design patterns book used a single generic `AndroidDesignLab` for all 10 chapters. The visual grammar, glossary text, and Stepper story were too uniform, which made the chapters feel like placeholders rather than chapter-specific teaching material.

## Fix Scope

- Remove `AndroidDesignLab` usage from all Android design pattern chapters.
- Add chapter-specific diagram/demo components:
  - `AndroidScreenAnatomyDiagram`
  - `MvpVsMvvmCompareDiagram`
  - `RefactorStranglerDiagram`
  - `OssContributionMapDiagram`
  - `FluxUnidirectionalFlowDiagram`
  - `TeamArchitectureBoardDiagram`
  - `AacLifecycleStateMachine`
  - `KotlinUiStateDiagram`
  - `ArchitectureDecisionMatrixDiagram`
- Rewrite glossary entries with actual definitions.
- Keep visuals on DESIGN tokens: `bg-elevated`, `border`, `rounded-card`, no shadows, no hard-coded hex colors.

## Acceptance

- No `AndroidDesignLab` remains in `content/android-design-patterns`.
- Every chapter uses at least one named custom diagram/demo.
- `pnpm mdx-check`, targeted ESLint, `pnpm build`, and `pnpm link-check` pass.
- Browser smoke checks verify the 10 pages render the new SVG diagrams on desktop and mobile.
