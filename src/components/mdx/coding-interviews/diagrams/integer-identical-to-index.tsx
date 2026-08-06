"use client";
import React from "react";
export function IntegerIdenticalToIndexDiagram() {
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="flex justify-center"><svg viewBox="0 0 500 200" className="w-full max-w-[500px] h-auto"><text x="250" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">数组中数值和下标相等的元素</text>{[0,1,2,3,4].map(i => <g key={i}><rect x={40+i*90} y="60" width="70" height="50" rx="4" fill={i===3?"var(--accent)":"var(--bg)"} stroke="var(--border)" /><text x={75+i*90} y="90" textAnchor="middle" fontSize="13" fill="var(--text-primary)">{[-3,-1,1,3,5][i]}</text><text x={75+i*90} y="130" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">i={i}</text></g>)}</svg></div><figcaption className="mt-2 text-center text-sm text-secondary">单调递增数组中，用 numbers[i]-i 不下降性质二分</figcaption></figure>;
}
