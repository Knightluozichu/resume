"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh20SpatialPartitionGrid>：空间分区网格机制动画（GPP 第20章 · 图1）。
 *
 * 核心：按空间位置把对象组织进网格/树结构，使"找邻居/碰撞"只检查局部区域，
 * 把 O(n²) 降到接近 O(n)。
 *
 * 场景：战场上若干单位要两两检测碰撞。朴素做法是全部两两比较（O(n²)）。把战场划成网格，
 * 每个单位登记到所在格，碰撞只检查同格/相邻格的单位。
 *
 * 节拍：
 *  ① 战场划成 6×6 网格
 *  ② 8 个单位登记到所在格
 *  ③ 朴素：全部两两比较，需 28 次（O(n²)）
 *  ④ 选中一个单位，高亮它所在格 + 相邻格（候选集）
 *  ⑤ 只查候选格里的单位，只要 2 次（接近 O(n)）
 *  ⑥ 用空间结构提前剪枝：只查可能相遇的局部对象
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const NAIVE_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const GRID_N = 6;
const CELL = 52;
const GRID_X = 60;
const GRID_Y = 90;

type Unit = { id: number; col: number; row: number; emoji: string };
const UNITS: readonly Unit[] = [
  { id: 0, col: 1, row: 1, emoji: "⚔️" },
  { id: 1, col: 1, row: 2, emoji: "🛡️" },
  { id: 2, col: 2, row: 1, emoji: "🏹" },
  { id: 3, col: 4, row: 3, emoji: "⚔️" },
  { id: 4, col: 4, row: 4, emoji: "🛡️" },
  { id: 5, col: 5, row: 4, emoji: "🏹" },
  { id: 6, col: 3, row: 5, emoji: "⚔️" },
  { id: 7, col: 0, row: 4, emoji: "🏹" },
];

const N = UNITS.length;
const NAIVE_PAIRS = (N * (N - 1)) / 2; // 28
const SEL = UNITS[0];
const CAND_COUNT = UNITS.filter(
  (u) => u.id !== SEL.id && Math.abs(u.col - SEL.col) <= 1 && Math.abs(u.row - SEL.row) <= 1,
).length; // 2

function cellCenter(col: number, row: number) {
  return { x: GRID_X + col * CELL + CELL / 2, y: GRID_Y + row * CELL + CELL / 2 };
}

// 候选格：选中单位所在格 + 8 邻格
const CANDIDATE_CELLS: { col: number; row: number }[] = [];
for (let dc = -1; dc <= 1; dc++) {
  for (let dr = -1; dr <= 1; dr++) {
    const c = SEL.col + dc;
    const r = SEL.row + dr;
    if (c >= 0 && c < GRID_N && r >= 0 && r < GRID_N) CANDIDATE_CELLS.push({ col: c, row: r });
  }
}

const STEPS: readonly TeachingStep[] = [
  { label: "grid", caption: "战场划成 6×6 网格，用来按空间位置组织对象" },
  { label: "units", caption: "8 个单位各自登记到所在格" },
  { label: "naive", caption: "朴素：全部单位两两比较，需 28 次（O(n²) = 8×7/2）" },
  { label: "select", caption: "选中 ⚔️ 单位：高亮它所在格 + 相邻格（候选集）" },
  { label: "local", caption: "只查候选格里的单位，只要 2 次——把 O(n²) 降到接近 O(n)" },
  { label: "insight", caption: "用空间结构提前剪枝：只查可能相遇的局部对象，避免全量两两比较" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh20SpatialPartitionGrid() {
  const gridRef = useRef<SVGGElement | null>(null);
  const unitsRef = useRef<SVGGElement | null>(null);
  const naiveRef = useRef<SVGGElement | null>(null);
  const naiveBarRef = useRef<SVGRectElement | null>(null);
  const candidateRef = useRef<SVGGElement | null>(null);
  const localRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const selCenter = cellCenter(SEL.col, SEL.row);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① grid（t: 0→T）：网格浮现
      tl.add(gridRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("grid", 0);

      // ② units（t: T→2T）：单位浮现
      tl.add(unitsRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T);
      tl.label("units", T);

      // ③ naive（t: 2T→3T）：朴素对比条暴涨
      tl.add(naiveRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(naiveBarRef.current!, { width: [10, 200], duration: T * 0.7, ease: "out(3)" }, T * 2.2);
      tl.label("naive", T * 2);

      // ④ select（t: 3T→4T）：候选格高亮 + 选中环
      tl.add(candidateRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("select", T * 3);

      // ⑤ local（t: 4T→5T）：网格对比条（极小）浮现
      tl.add(localRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("local", T * 4);

      // ⑥ insight（t: 5T→6T）：结论浮现
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🗺️</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="空间分区机制动画。战场划成 6x6 网格，8 个单位各自登记到所在格。朴素做法是全部单位两两比较，需 28 次，是 O n 平方。选中一个单位后高亮它所在格与相邻格作为候选集，只查候选格里的单位，只要 2 次，把 O n 平方降到接近 O n。用空间结构提前剪枝，只查可能相遇的局部对象，避免全量两两比较。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            空间分区：只查局部，把 O(n²) 降到接近 O(n)
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            单位登记到网格，碰撞只检查同格/相邻格——提前剪枝"和谁可能相遇"
          </text>

          {/* 网格 */}
          <g ref={gridRef} style={{ opacity: 0 }}>
            {Array.from({ length: GRID_N }).map((_, row) =>
              Array.from({ length: GRID_N }).map((__, col) => (
                <rect
                  key={`${col},${row}`}
                  x={GRID_X + col * CELL}
                  y={GRID_Y + row * CELL}
                  width={CELL}
                  height={CELL}
                  fill="var(--text-secondary)"
                  fillOpacity="0.03"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
              )),
            )}
          </g>

          {/* 候选格高亮 */}
          <g ref={candidateRef} style={{ opacity: 0 }}>
            {CANDIDATE_CELLS.map((c) => (
              <rect
                key={`cand-${c.col},${c.row}`}
                x={GRID_X + c.col * CELL}
                y={GRID_Y + c.row * CELL}
                width={CELL}
                height={CELL}
                fill={OK_COLOR}
                fillOpacity="0.14"
                stroke={OK_COLOR}
                strokeWidth="1.8"
              />
            ))}
            <circle cx={selCenter.x} cy={selCenter.y} r="20" fill="none" stroke={ACCENT} strokeWidth="2.6" />
          </g>

          {/* 单位 */}
          <g ref={unitsRef} style={{ opacity: 0 }}>
            {UNITS.map((u) => {
              const { x, y } = cellCenter(u.col, u.row);
              return (
                <text key={u.id} x={x} y={y + 6} textAnchor="middle" fontSize="18">
                  {u.emoji}
                </text>
              );
            })}
          </g>

          {/* 右侧对比面板 */}
          <rect x="420" y="90" width="270" height="200" rx="12" fill="var(--text-secondary)" fillOpacity="0.04" stroke="var(--border)" strokeWidth="1.4" />
          <text x="440" y="116" fontSize="12" fontWeight="700" fill="var(--text-primary)">碰撞检测次数对比（{N} 个单位）</text>

          {/* 朴素 */}
          <g ref={naiveRef} style={{ opacity: 0 }}>
            <text x="440" y="146" fontSize="11" fill={NAIVE_COLOR}>朴素：全部两两比较</text>
            <text x="648" y="166" textAnchor="end" fontSize="12" fontWeight="700" fontFamily="monospace" fill={NAIVE_COLOR}>{NAIVE_PAIRS} 次</text>
            <text x="440" y="186" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">O(n²) = {N}×{N - 1}/2</text>
          </g>
          <rect x="440" y="152" width="10" height="18" rx="4" fill={NAIVE_COLOR} fillOpacity="0.15" stroke={NAIVE_COLOR} strokeWidth="1" strokeDasharray="3 3" />
          <rect ref={naiveBarRef} x="440" y="152" width="10" height="18" rx="4" fill={NAIVE_COLOR} fillOpacity="0.35" stroke={NAIVE_COLOR} strokeWidth="1.2" />

          {/* 网格 */}
          <g ref={localRef} style={{ opacity: 0 }}>
            <text x="440" y="216" fontSize="11" fill={OK_COLOR}>网格：只查候选格</text>
            <rect x="440" y="222" width={Math.max(12, (CAND_COUNT / NAIVE_PAIRS) * 200)} height="18" rx="4" fill={OK_COLOR} fillOpacity="0.45" stroke={OK_COLOR} strokeWidth="1.2" />
            <text x="648" y="236" textAnchor="end" fontSize="12" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>{CAND_COUNT} 次</text>
            <text x="440" y="256" fontSize="11" fill="var(--text-secondary)">选中 {SEL.emoji}：候选 {CAND_COUNT} 个邻居</text>
            <text x="440" y="276" fontSize="11" fontWeight="700" fill={OK_COLOR}>单位越多，网格越省（接近 O(n)）</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="410" width="600" height="40" rx="8" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x="360" y="435" textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              用空间结构提前剪枝：只查可能相遇的局部对象，避免全量两两比较
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="空间分区按位置把对象组织进网格，查邻居/碰撞只看同格与相邻格，把朴素的 O(n²) 两两比较降到接近 O(n)。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        空间分区（Spatial Partition）：按空间位置把对象组织进网格（或四叉树等）结构。
        查询邻居/碰撞时只检查同一格及相邻格里的对象，从而把朴素的 O(n²) 两两比较
        降到接近 O(n)。
      </figcaption>
    </figure>
  );
}
