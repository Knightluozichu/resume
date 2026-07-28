"use client";

import { useMemo, useState, type ReactNode } from "react";
function Panel({ children }: { children: ReactNode }) {
  return <div className="border border-border bg-elevated p-4 sm:p-5">{children}</div>;
}

function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-2 text-center text-sm text-secondary">{children}</figcaption>;
}

function gcd(left: number, right: number) {
  let a = left;
  let b = right;
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function rotate(text: string, distance: number) {
  if (text.length === 0) return text;
  const d = ((distance % text.length) + text.length) % text.length;
  return text.slice(d) + text.slice(0, d);
}

function signature(word: string) {
  return [...word.toLowerCase()].sort().join("");
}

export function PP2ThreeProblemsMap() {
  const [problem, setProblem] = useState<"missing integer" | "vector rotation" | "anagrams">("vector rotation");
  const details = {
    "missing integer": ["find one absent 32-bit value", "partition the universe and count", "binary narrowing"],
    "vector rotation": ["rotate n items left by d", "compose reversals or cycles", "powerful primitives"],
    anagrams: ["group dictionary words", "canonical sorted-letter signature", "sort to bring equals together"],
  }[problem];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <Panel>
        <label className="text-sm font-semibold text-primary">one of the three problems<select className="mt-2 w-full border border-border bg-background p-2 text-primary" value={problem} onChange={(event) => setProblem(event.target.value as typeof problem)}><option>missing integer</option><option>vector rotation</option><option>anagrams</option></select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3"><div className="border border-accent p-3 text-accent"><div className="text-xs">problem</div><div className="mt-1">{details[0]}</div></div><div className="border border-warning p-3 text-warning"><div className="text-xs">representation</div><div className="mt-1">{details[1]}</div></div><div className="border border-success p-3 text-success"><div className="text-xs">aha insight</div><div className="mt-1">{details[2]}</div></div></div>
      </Panel>
      <Caption>Each little problem becomes simple only after choosing a view that exposes monotonicity, permutation structure, or canonical equality.</Caption>
    </figure>
  );
}
