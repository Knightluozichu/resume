# 《算法图解》SOP

## Scope

- Book: Grokking Algorithms, Second Edition / 算法图解
- Track: 算法系列 · 初级
- Source: Manning official book page and public table of contents mirrors.
- Target shape: less prose, more SVG/step animation, each chapter accepted before the next generated block is treated as complete.

## Linear-Style Work Items

1. Design: 13-chapter map, review slug prefix `ga2-`, reusable `AlgorithmPlayground`.
2. Implementation: add chapter MDX, register component, add review questions, add learning path entry.
3. Code review: MDX validity, TypeScript/ESLint on touched files, link checks, production build.
4. Teaching review: every chapter includes a visual lab, step animation, concrete pitfall, exercise, and review link.
5. Issue loop: fix any validation or teaching issues before merging.
6. Release: merge feature branch to `main`, run deploy script, verify health check.

## Visual Contract

- Every chapter gets one primary `AlgorithmPlayground` and one step-by-step sequence.
- Interactions must fit mobile and desktop without overlapping labels.
- Animations use `animotor` easing helpers through the React component.
- Text stays compact: objectives, visual steps, traps, exercises, glossary.
