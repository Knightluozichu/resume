"use client";

import React from "react";

export function ConstuctArrayPrefixSuffixDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="flex justify-center">
        <svg viewBox="0 0 700 220" className="w-full max-w-[700px] h-auto">
          {/* 前缀积 */}
          <text x="350" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">前缀积扫描（从左到右）</text>
          {[0,1,2,3,4].map((i, idx) => (
            <g key={idx}>
              <rect x={50 + i*120} y="50" width="100" height="40" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" />
              <text x={100 + i*120} y="75" textAnchor="middle" fontSize="13" fill="var(--text-primary)">A[{i}]</text>
              <text x={100 + i*120} y="120" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">B[{i}] = 前缀{i}</text>
            </g>
          ))}
          <line x1="50" y1="95" x2="650" y2="95" stroke="var(--border)" strokeWidth="1" strokeDasharray="4" />
          <text x="350" y="150" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">后缀积扫描（从右到左）</text>
          {[0,1,2,3,4].map((i, idx) => (
            <g key={idx}>
              <rect x={50 + i*120} y="160" width="100" height="40" rx="6" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" />
              <text x={100 + i*120} y="185" textAnchor="middle" fontSize="13" fill="var(--text-primary)">A[{i}]</text>
            </g>
          ))}
          <line x1="50" y1="200" x2="650" y2="200" stroke="var(--border)" strokeWidth="1" strokeDasharray="4" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">前缀积从左到右，后缀积从右到左，两次扫描构建乘积数组</figcaption>
    </figure>
  );
}
