# QuickSort Diagram Refactoring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the QuickSortDiagram layout, dimensions, elements sizing, and spacing to resolve R1-R12 violations and achieve clean SVG check validation.

**Architecture:** We scale the SVG viewBox to 960x340 and increase panel widths to 280px. Grid box widths are set to 28px with 8px gaps, fully satisfying R5 and R1/R9 padding guidelines.

**Tech Stack:** React, Next.js, SVG, Tailwind CSS, TypeScript

---

### Task 1: Refactor QuickSortDiagram layout coordinates and sizes

**Files:**
- Modify: `src/components/mdx/diagrams/QuickSortDiagram.tsx`

**Step 1: Write the implementation changes**

Replace the existing coordinates, panel placements, box sizes, gap sizes, and viewBox settings with:
- `VW = 960, VH = 340`
- `PW = 280, PH = 120, PTOP = 90`
- `BW = 28, BH = 28, BG = 8`
- `P1 = 24, P2 = 340, P3 = 656`
- Update `rx` helper formula: `(n, total, px) => px + (PW - (total * BW + (total - 1) * BG)) / 2 + n * (BW + BG)`
- Update panel titles, rectangles, text coordinates, line coordinates, and footer separator line/labels offsets.

**Step 2: Verify compiling and build**

Run: `pnpm build`
Expected: Successfully compiles and finishes TypeScript without errors.

**Step 3: Create temporary page check file**

Write `/Users/luozichu/Repositories/learn/remuse/scripts/svg-check-quicksort.txt`:
```txt
/learn/grokking-algorithms-2e/core-intuitions/quicksort
```

**Step 4: Run target page SVG check**

Run: `SVG_CHECK_PAGES_FILE=scripts/svg-check-quicksort.txt node scripts/check-svg-overlaps.mjs`
Expected: `[1/1] quicksort ... OK`, exit code is 0 (no HIGH errors).

**Step 5: Clean up temporary files**

Run: `rm scripts/svg-check-quicksort.txt`

**Step 6: Commit changes**

```bash
git add src/components/mdx/diagrams/QuickSortDiagram.tsx
git commit -m "feat: refactor QuickSortDiagram layout dimensions and compliance"
```
