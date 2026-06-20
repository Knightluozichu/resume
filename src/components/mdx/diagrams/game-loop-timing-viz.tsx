"use client";

import { useState } from "react";

const VIEW_W = 700;
const VIEW_H = 380;

export function GameLoopTimingViz() {
  const [fps, setFps] = useState(60);
  const [physicsSteps, setPhysicsSteps] = useState(1);

  const frameTime = 1000 / fps; // ms
  const fixedDt = 16.67; // 1/60s = 16.67ms per physics step
  const barW = 500;
  const barH = 36;
  const barX = 140;
  const startY = 80;

  const stages = [
    { label: "输入采样", cost: 1.5, color: "fill-accent-glow stroke-accent" },
    { label: "物理固定步(" + physicsSteps + "次)", cost: fixedDt * physicsSteps / 2, color: "fill-warning/20 stroke-warning" },
    { label: "玩法/脚本", cost: frameTime * 0.12, color: "fill-success/20 stroke-success" },
    { label: "动画更新", cost: 2.5, color: "fill-accent/20 stroke-accent" },
    { label: "渲染提交", cost: frameTime * 0.30, color: "fill-accent-glow stroke-accent" },
    { label: "GPU/等待", cost: frameTime * 0.20, color: "fill-warning/10 stroke-warning" },
  ];

  const totalCost = stages.reduce((s, c) => s + c.cost, 0);
  const isOverBudget = totalCost > frameTime;

  const scale = barW / frameTime;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-4">
      <figcaption className="mb-3">
        <p className="text-xs font-medium text-accent">帧时间预算</p>
        <h4 className="text-base font-semibold text-primary">
          一帧 16.67ms 里装了哪些系统
        </h4>
      </figcaption>

      <div className="mb-3 flex flex-wrap gap-4 text-xs">
        <label className="flex items-center gap-2">
          目标帧率:
          <select value={fps} onChange={(e) => setFps(Number(e.target.value))} className="rounded-control border border-border bg-bg px-2 py-1 text-xs text-primary">
            <option value={30}>30 FPS</option>
            <option value={60}>60 FPS</option>
            <option value={120}>120 FPS</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          物理压力:
          <select value={physicsSteps} onChange={(e) => setPhysicsSteps(Number(e.target.value))} className="rounded-control border border-border bg-bg px-2 py-1 text-xs text-primary">
            <option value={1}>正常 (1 step)</option>
            <option value={2}>中等 (2 steps)</option>
            <option value={4}>高负载 (4 steps)</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto rounded-card border border-border bg-bg">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="帧预算可视化" className="block w-full min-w-[600px]">
          {/* Frame budget line */}
          <line
            x1={barX + frameTime * scale}
            y1={startY - 20}
            x2={barX + frameTime * scale}
            y2={startY + stages.length * 42 + 40}
            className="stroke-danger"
            strokeWidth="2"
            strokeDasharray="6,3"
          />
          <text x={barX + frameTime * scale + 8} y={startY + 10} className="fill-danger text-[11px] font-semibold">{frameTime.toFixed(1)}ms 预算</text>

          {/* Stage bars */}
          {stages.map((stage, i) => {
            const y = startY + i * 42;
            const w = Math.max(8, stage.cost * scale);
            return (
              <g key={stage.label}>
                <text x={barX - 8} y={y + 22} textAnchor="end" className="fill-secondary text-[11px]">{stage.label}</text>
                <rect x={barX} y={y + 6} width={w} height={barH} rx="4" className={stage.color} strokeWidth="1" opacity="0.85" />
                <text x={barX + w + 6} y={y + 26} className="fill-secondary text-[10px]">{stage.cost.toFixed(1)}ms</text>
              </g>
            );
          })}

          {/* Total bar */}
          <rect x={barX} y={startY + stages.length * 42 + 20} width={Math.min(frameTime * scale, totalCost * scale)} height="6" rx="3" className={isOverBudget ? "fill-danger/60" : "fill-success/60"} />
          <text x={barX} y={startY + stages.length * 42 + 50} className={`text-[11px] font-semibold ${isOverBudget ? "fill-danger" : "fill-success"}`}>
            {isOverBudget
              ? `超预算 ${(totalCost - frameTime).toFixed(1)}ms → 会掉帧！`
              : `剩余 ${(frameTime - totalCost).toFixed(1)}ms → 预算健康`}
          </text>

          {/* Watch annotation */}
          <text x={barX} y={startY + stages.length * 42 + 72} className="fill-secondary text-[10px]">
            把帧率改成 120 看看物理步数涨了之后怎么溢出的
          </text>
        </svg>
      </div>
    </figure>
  );
}
