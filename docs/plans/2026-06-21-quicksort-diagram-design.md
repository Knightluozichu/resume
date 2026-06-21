# Design Doc: Grokking Algorithms QuickSortDiagram Layout Refactoring

**Date**: 2026-06-21  
**Status**: Approved  
**Topic**: QuickSortDiagram layout spacing and font compliance (REM-X)

---

## 1. Problem Description

The existing `QuickSortDiagram` component has critical violations under the project's SVG layout rules (`docs/diagram-layout-rules.md`):
1. **R3 Violation**: `viewBox` width is `740px` (which is fine), but the three horizontal panels are each only `PW = 216px` wide.
2. **R5 Violation**: Within the panels, 7 element boxes of width `38px` and gap `4px` total `290px` in width, which overflows the 216px panel boundaries. The gap of `4px` is less than the mandatory `8px`.
3. **R4 Violation**: Text elements inside the boxes (e.g. Pivot) and footers risk font sizes being too small (less than 10px).
4. **R1/R2 Margins**: Vertical spacing does not maintain the required top/bottom padding constraints ($\ge 24px$ for text to boundary, $\ge 32px$ for borders to boundary).

---

## 2. Selected Approach (Approach A: Widen ViewBox)

We scale up the SVG container dynamically to fit the side-by-side comparative layout comfortably without shrinking font sizes or visual clarity.

### Dimensions Specification
*   **viewBox**: `0 0 960 340` (Width: `960px`, Height: `340px`).
*   **Top Margin**: Title at `y = 40` (fontSize 16px), margin = `24px` (satisfies R1).
*   **Bottom Margin**: Footer at `y = 312` (fontSize 12px), margin = `28px` (satisfies R2).
*   **Panel Width**: `PW = 280px`, `PH = 120px` (satisfies R9).
*   **Panel Placements**:
    *   Left panel: `x = 24` to `304`.
    *   Middle panel: `x = 340` to `620`.
    *   Right panel: `x = 656` to `936`.
    *   Symmetric side margins of `24px` and inter-panel spacing of `36px`.
*   **Elements Inside Panels**:
    *   Box width: `BW = 28px`, Box height: `BH = 28px`.
    *   Gap: `BG = 8px` (satisfies R5).
    *   Total group width: `244px`. Centered in the `280px` panel with `18px` padding on each side (satisfies R1/R9).
    *   Subheader labels: `y = 102` (height `26px`).
    *   Boxes: `y = 148` (height `28px`).
*   **Footer**:
    *   Horizontal dashed line at `y = 250`.
    *   Performance labels at `y = 274`, values at `y = 292`.
    *   Final conclusion text at `y = 312`.

---

## 3. Implementation Steps

1. Modify `src/components/mdx/diagrams/QuickSortDiagram.tsx` to implement the new coordinates and sizes.
2. Remove any hardcoded text or element sizes that violate layout rules.
3. Validate by running `pnpm build` and `pnpm svg-check`.
