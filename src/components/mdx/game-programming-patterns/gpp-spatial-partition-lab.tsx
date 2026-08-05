"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const T = TEACHING_BEAT_MS;
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";
const WARN = "#E5675C";
const VW = 900;
const VH = 420;

const ACCENT = "#3FB97F"; // emerald
const STEPS: readonly TeachingStep[] = [
  { label: "brute", caption: "① 暴力检测：每对实体两两检测 O(N²)" },
  { label: "grid", caption: "② 空间网格：世界切格，实体登记到所在格" },
  { label: "query", caption: "③ 邻格查询：只测同格/邻格，大幅剪枝" },
  { label: "move", caption: "④ 移动后更新所在格，查询始终精确" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppSpatialPartitionLab() {
  const bruteRef = useRef<SVGGElement>(null);
  const gridRef = useRef<SVGGElement>(null);
  const queryRef = useRef<SVGGElement>(null);
  const moveRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(bruteRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("brute", 0);
      tl.add(gridRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("grid", T);
      tl.add(queryRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("query", T * 2);
      tl.add(moveRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("move", T * 3);
    },
  });
  const dots = [
    { x: 120, y: 140 }, { x: 210, y: 110 }, { x: 300, y: 170 }, { x: 190, y: 230 },
    { x: 520, y: 130 }, { x: 640, y: 160 }, { x: 580, y: 240 }, { x: 700, y: 220 },
  ];
  const target = { x: 240, y: 150 };
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Optimization Pattern · Spatial Partition</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Spatial Partition — 只查邻居，不查全世界</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Spatial Partition 模式定制图解：暴力检测 vs 空间网格邻格查询。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>按空间分区，只查可能相邻的候选集</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>把 O(N²) 降到 O(N + 碰撞对数)</text>

          <g ref={bruteRef} style={{ opacity: 0 }}>
            <rect x={50} y={80} width={340} height={230} rx={10} fill="var(--bg)" stroke={WARN} strokeWidth={1.5} />
            <text x={220} y={106} textAnchor="middle" fontSize={12} fontWeight={600} fill={WARN}>✗ 暴力：两两检测 28 对</text>
            {dots.slice(0, 4).map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={8} fill={WARN} opacity={0.8} />
            ))}
            {dots.slice(0, 4).map((d1, i) => dots.slice(0, 4).map((d2, j) => {
              if (i >= j) return null;
              return <line key={`${i}-${j}`} x1={d1.x} y1={d1.y} x2={d2.x} y2={d2.y} stroke={WARN} strokeWidth={0.6} opacity={0.4} />;
            }))}
          </g>

          <g ref={gridRef} style={{ opacity: 0 }}>
            <rect x={430} y={80} width={420} height={230} rx={10} fill="var(--bg)" stroke={ACCENT} strokeWidth={1.5} />
            <text x={640} y={106} textAnchor="middle" fontSize={12} fontWeight={600} fill={ACCENT}>✓ 网格：3×3 划分</text>
            {[1, 2, 3].map(i => <line key={`v${i}`} x1={430 + i * 105} y1={90} x2={430 + i * 105} y2={310} stroke={LINE} strokeWidth={0.8} />)}
            {[1, 2, 3].map(i => <line key={`h${i}`} x1={430} y1={90 + i * 58} x2={850} y2={90 + i * 58} stroke={LINE} strokeWidth={0.8} />)}
            {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={7} fill={OK} opacity={0.8} />)}
          </g>

          <g ref={queryRef} style={{ opacity: 0 }}>
            <circle cx={target.x} cy={target.y} r={14} fill={WARN} opacity={0.3} stroke={WARN} strokeWidth={2} />
            <text x={660} y={140} textAnchor="middle" fontSize={11} fill={WARN}>← 只检测同格</text>
            <text x={700} y={240} textAnchor="middle" fontSize={11} fill={WARN}>邻格共 2 个</text>
            <rect x={430} y={330} width={420} height={38} rx={8} fill={OK} opacity={0.1} stroke={OK} strokeWidth={1.2} />
            <text x={640} y={354} textAnchor="middle" fontSize={11} fontWeight={600} fill={OK}>平均每格 1-2 实体：全图只需检测 ~4 对而非 28 对</text>
          </g>

          <g ref={moveRef} style={{ opacity: 0 }}>
            <rect x={50} y={330} width={340} height={38} rx={8} fill={ACCENT} opacity={0.1} stroke={ACCENT} strokeWidth={1.2} />
            <text x={220} y={354} textAnchor="middle" fontSize={11} fontWeight={600} fill={ACCENT}>实体移动后更新所在格，查询始终精确</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="世界切格、实体归格、查询只碰邻格——海量实体也只需局部计算。" />
      </div>
    </div>
  );
}
