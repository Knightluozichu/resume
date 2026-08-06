"use client";

import React from "react";

export function FindInMatrixSearchDiagram() {
  const matrix = [
    [1, 2, 8, 9],
    [2, 4, 9, 12],
    [4, 7, 10, 13],
    [6, 8, 11, 15],
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="flex justify-center">
        <svg viewBox="0 0 500 420" className="w-full max-w-[500px] h-auto">
          <text x="250" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">二维数组：右上角开始查找</text>
          {matrix.map((row, ri) => row.map((val, ci) => (
            <g key={`${ri}-${ci}`}>
              <rect x={40 + ci * 100} y={60 + ri * 80} width="80" height="60" rx="4"
                fill={ri === 0 && ci === 3 ? "var(--accent)" : "var(--bg)"}
                stroke={ri === 0 && ci === 3 ? "var(--accent)" : "var(--border)"}
                strokeWidth={ri === 0 && ci === 3 ? 2 : 1} />
              <text x={80 + ci * 100} y={97 + ri * 80} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">{val}</text>
            </g>
          )))}
          <text x="250" y="400" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">二维数组中的查找：从右上角开始，向左减小，向下增大，每次排除一行或一列，O(m+n) 时间</text>
        </svg>
      </div>
    </figure>
  );
}
