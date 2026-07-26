"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh03FlyweightForest>：享元内在/外在状态共享机制动画（GPP 第3章 · 图1）。
 *
 * 核心：把对象拆成可共享的内在状态 + 由上下文提供的外在状态，用共享换内存。
 *
 * 场景：一片森林要渲染海量树。每棵树的网格/纹理/材质（内在状态）完全相同，只有位置
 * （外在状态）不同。享元让所有树共享同一份 TreeModel，各自只保存位置。
 *
 * 节拍：
 *  ① 建立共享 TreeModel（内在状态 mesh·texture·material，只需 1 份）
 *  ② 生成海量 Tree 实例，各自只存位置（外在状态）
 *  ③ 所有实例都指向同一份 TreeModel → 共享内在状态
 *  ④ 朴素：每棵存全部，10,000 棵内存暴涨到 ~14.3 GB
 *  ⑤ 享元：共享内在，10,000 棵只要 ~2 MB
 *  ⑥ 判据：内在可共享、外在上文给 → 用共享换内存
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const NAIVE_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const INTRINSIC_KB = 1500;
const COUNT = 10000;
const NAIVE_GB = "14.3 GB";
const FLY_MB = "2.0 MB";

// 实例点阵（示意 48 棵）
const SHOWN = 48;
const COLS = 12;
const GRID_X = 300;
const GRID_Y = 96;

const STEPS: readonly TeachingStep[] = [
  { label: "model", caption: "建立共享 TreeModel：内在状态 mesh·texture·material，与上下文无关，只需 1 份（≈1500 KB）" },
  { label: "instances", caption: "生成海量 Tree 实例：每棵只保存位置 position（外在状态），各不相同" },
  { label: "share", caption: "所有实例都指向同一份 TreeModel——内在状态共享，不重复存储" },
  { label: "naive", caption: "朴素：每棵存全部，10,000 棵内存随数量线性暴涨到 ~14.3 GB" },
  { label: "flyweight", caption: "享元：共享内在状态，10,000 棵只要 ~2 MB——几乎不随数量增长" },
  { label: "insight", caption: "判据：内在状态可共享、外在状态由上下文传入 → 用共享换内存" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh03FlyweightForest() {
  const modelRef = useRef<SVGGElement | null>(null);
  const instancesRef = useRef<SVGGElement | null>(null);
  const shareRef = useRef<SVGGElement | null>(null);
  const naiveBadgeRef = useRef<SVGGElement | null>(null);
  const naiveBarRef = useRef<SVGRectElement | null>(null);
  const naiveLabelRef = useRef<SVGGElement | null>(null);
  const flyBadgeRef = useRef<SVGGElement | null>(null);
  const flyBarRef = useRef<SVGRectElement | null>(null);
  const flyLabelRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① model（t: 0→T）：共享 TreeModel 浮现
      tl.add(modelRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("model", 0);

      // ② instances（t: T→2T）：实例点阵浮现
      tl.add(instancesRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T);
      tl.label("instances", T);

      // ③ share（t: 2T→3T）：共享箭头亮起
      tl.add(shareRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 2);
      tl.label("share", T * 2);

      // ④ naive（t: 3T→4T）：朴素徽章 + 内存条暴涨
      tl.add(naiveBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(naiveBarRef.current!, { width: [8, 360], duration: T * 0.7, ease: "out(3)" }, T * 3.2);
      tl.add(naiveLabelRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.6);
      tl.label("naive", T * 3);

      // ⑤ flyweight（t: 4T→5T）：享元徽章 + 内存条极小
      tl.add(flyBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4);
      tl.add(flyBarRef.current!, { width: [8, 14], duration: T * 0.5, ease: "out(3)" }, T * 4.2);
      tl.add(flyLabelRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.5);
      tl.label("flyweight", T * 4);

      // ⑥ insight（t: 5T→6T）：判据浮现
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🌲</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="享元模式机制动画。一片森林渲染海量树：每棵树的网格、纹理、材质等内在状态完全相同，只有位置这个外在状态不同。先建立一份共享 TreeModel 保存内在状态，再生成海量 Tree 实例各自只存位置，所有实例都指向同一份 TreeModel 共享内在状态。朴素方案每棵存全部，一万棵内存暴涨到约 14.3 GB；享元方案共享内在状态，一万棵只要约 2 MB。判据是内在状态可共享、外在状态由上下文传入，用共享换内存。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="28" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            享元：共享内在状态，外在状态由上下文提供
          </text>
          <text x="32" y="48" fontSize="11" fill="var(--text-secondary)">
            所有树共享一份 TreeModel（内在），各自只存位置（外在）
          </text>

          {/* 共享 TreeModel（内在状态） */}
          <g ref={modelRef} style={{ opacity: 0 }}>
            <rect x="40" y="70" width="210" height="130" rx="12" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="2" />
            <text x="145" y="94" textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>
              🌳 TreeModel（共享 1 份）
            </text>
            <text x="56" y="120" fontSize="11" fill="var(--text-secondary)">内在状态 intrinsic：</text>
            <text x="56" y="138" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">mesh · texture · material</text>
            <text x="56" y="160" fontSize="11" fill="var(--text-secondary)">≈ {INTRINSIC_KB} KB（不随数量变）</text>
            <text x="56" y="182" fontSize="11" fill={ACCENT}>所有树都指向这同一份</text>
          </g>

          {/* 实例点阵（外在状态） */}
          <g ref={instancesRef} style={{ opacity: 0 }}>
            <text x={GRID_X} y="84" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
              Tree 实例（各自只存 position）
            </text>
            {Array.from({ length: SHOWN }).map((_, i) => {
              const col = i % COLS;
              const row = Math.floor(i / COLS);
              const x = GRID_X + col * 30;
              const y = GRID_Y + row * 24;
              return (
                <text key={`tree-${i}`} x={x} y={y + 14} fontSize="14" fill="var(--text-primary)" opacity="0.7">
                  🌲
                </text>
              );
            })}
            <text x={GRID_X} y={GRID_Y + Math.ceil(SHOWN / COLS) * 24 + 12} fontSize="11" fill="var(--text-secondary)">
              … 共 {COUNT.toLocaleString()} 棵（此处示意 {SHOWN} 棵）
            </text>
          </g>

          {/* 共享箭头 */}
          <g ref={shareRef} style={{ opacity: 0 }}>
            <path d={`M ${GRID_X - 6} 110 Q 270 110 250 130`} fill="none" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="4 3" />
            <path d={`M ${GRID_X - 6} 150 Q 268 150 250 150`} fill="none" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="4 3" />
            <path d={`M ${GRID_X - 6} 190 Q 270 190 250 170`} fill="none" stroke={ACCENT} strokeWidth="1.6" strokeDasharray="4 3" />
            <text x="262" y="222" fontSize="11" fontWeight="700" fill={ACCENT}>← 都指向共享内在</text>
          </g>

          {/* 内存对比 */}
          <text x="40" y="288" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            内存占用对比（{COUNT.toLocaleString()} 棵树）
          </text>
          {/* 朴素 */}
          <g ref={naiveBadgeRef} style={{ opacity: 0 }}>
            <text x="40" y="312" fontSize="11" fill={NAIVE_COLOR}>朴素：每棵存全部</text>
          </g>
          <rect x="180" y="302" width="8" height="16" rx="4" fill={NAIVE_COLOR} fillOpacity="0.15" stroke={NAIVE_COLOR} strokeWidth="1" strokeDasharray="3 3" />
          <rect ref={naiveBarRef} x="180" y="302" width="8" height="16" rx="4" fill={NAIVE_COLOR} fillOpacity="0.35" stroke={NAIVE_COLOR} strokeWidth="1.2" />
          <g ref={naiveLabelRef} style={{ opacity: 0 }}>
            <text x="552" y="314" fontSize="11" fontWeight="700" fontFamily="monospace" fill={NAIVE_COLOR}>{NAIVE_GB}</text>
          </g>
          {/* 享元 */}
          <g ref={flyBadgeRef} style={{ opacity: 0 }}>
            <text x="40" y="344" fontSize="11" fill={OK_COLOR}>享元：共享内在</text>
          </g>
          <rect ref={flyBarRef} x="180" y="334" width="8" height="16" rx="4" fill={OK_COLOR} fillOpacity="0.45" stroke={OK_COLOR} strokeWidth="1.2" />
          <g ref={flyLabelRef} style={{ opacity: 0 }}>
            <text x="202" y="346" fontSize="11" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>{FLY_MB}</text>
          </g>

          {/* 判据 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="380" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="404" fontSize="12" fontWeight="700" fill={OK_COLOR}>判据：内在状态可共享、外在状态由上下文传入 → 用共享换内存</text>
            <text x="56" y="424" fontSize="11" fill="var(--text-secondary)">内在（mesh/纹理）只存一份；外在（位置）每实例一份，开销极小</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="享元把状态拆成内在（可共享）与外在（上下文提供）。所有实例共享一份内在状态，从而用极小的外在开销支撑海量实例。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        享元（Flyweight）：把对象的状态拆成内在（可共享、与上下文无关，如网格/纹理）
        和外在（由上下文提供、各不相同，如位置）。所有对象共享同一份内在状态，
        从而用极小的外在开销支撑海量实例，以共享换内存。
      </figcaption>
    </figure>
  );
}
