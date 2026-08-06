"use client";
import React from "react";
export function RobotMovingCountDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="flex justify-center">
        <svg viewBox="0 0 400 150" className="w-full max-w-[400px] h-auto">
          <text x="200" y="50" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">RobotMovingCount</text>
          <text x="200" y="100" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">核心算法示意图</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">算法核心步骤可视化</figcaption>
    </figure>
  );
}
