"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh03FlyweightTradeoff>：享元模式取舍对照动画（GPP 第3章 · 图2）。
 *
 * 故事：一片森林 10,000 棵树，每棵需要 mesh/texture/material/position。
 *  ① 场景：每棵树需要 4 份数据
 *  ② 基线（朴素）：每棵树存全部 4 份 → 内存 14.3 GB（随数量线性暴涨）
 *  ③ 候选（享元）：把 mesh/texture/material 抽出来共享一份（内在）
 *  ④ 候选结果：每棵树只留 position（外在）→ 内存 1.95 MB（几乎不涨）
 *  ⑤ 对照：内在可共享、外在由上下文提供 → 用共享换内存
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const NAIVE_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const FIELDS = ["mesh", "texture", "material", "position"];

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "一片森林 10,000 棵树，每棵需要 mesh/texture/material/position 四份数据" },
  { label: "naive", caption: "基线（朴素）：每棵树存全部 4 份 → 内存 14.3 GB，随数量线性暴涨" },
  { label: "extract", caption: "候选（享元）：把 mesh/texture/material 抽出来，共享一份（内在状态）" },
  { label: "flyweight", caption: "候选结果：每棵树只留 position（外在状态）→ 内存 1.95 MB，几乎不涨" },
  { label: "insight", caption: "对照：内在状态可共享、外在状态由上下文提供 → 用共享换内存" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh03FlyweightTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const naiveBadgeRef = useRef<SVGGElement | null>(null);
  const flyBadgeRef = useRef<SVGGElement | null>(null);
  const fieldBoxRefs = useRef<Record<string, SVGGElement | null>>({});
  const sharedRef = useRef<SVGGElement | null>(null);
  const memBarRef = useRef<SVGRectElement | null>(null);
  const memNaiveRef = useRef<SVGGElement | null>(null);
  const memFlyRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：森林 + 字段面板淡入
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② naive（t: T→2T）：朴素徽章出现，4 字段全红（每棵一份），内存条拉长到最大
      tl.add(naiveBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      FIELDS.forEach((f, i) => {
        tl.add(fieldBoxRefs.current[`naive-${f}`]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.1 + i * T * 0.1);
      });
      tl.add(memBarRef.current!, { width: [8, 320], duration: T * 0.7, ease: "out(3)" }, T * 1.2);
      tl.add(memNaiveRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("naive", T);

      // ③ extract（t: 2T→3T）：切候选——朴素徽章/红色字段/朴素内存淡出，共享 TreeModel 浮现
      tl.add(naiveBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(memNaiveRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      FIELDS.forEach((f) => {
        if (f !== "position") tl.add(fieldBoxRefs.current[`naive-${f}`]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      });
      tl.add(flyBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(sharedRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2.3);
      tl.label("extract", T * 2);

      // ④ flyweight（t: 3T→4T）：内存条缩到最小（绿），flyweight 内存文本出现
      tl.add(memBarRef.current!, { width: [320, 10], duration: T * 0.6, ease: "out(3)" }, T * 3.1);
      tl.add(memFlyRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.4);
      tl.label("flyweight", T * 3);

      // ⑤ insight（t: 4T→4.6T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 4);
      tl.label("insight", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚖️</span>
            取舍对照
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="享元模式取舍对照动画。一片森林一万棵树，每棵需要 mesh texture material position 四份数据。基线朴素方式每棵树存全部四份，内存 14.3 GB 随数量线性暴涨。候选享元方式把 mesh texture material 抽出来共享一份作为内在状态，每棵树只留 position 作为外在状态，内存 1.95 MB 几乎不涨。对照：内在状态可共享、外在状态由上下文提供，用共享换内存。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：每对象存全部 vs 共享内在状态
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            内在（mesh/texture/material）共享一份，外在（position）每棵独有
          </text>

          {/* 方式徽章 */}
          <g ref={naiveBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={NAIVE_COLOR} fillOpacity="0.14" stroke={NAIVE_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={NAIVE_COLOR}>基线 · 每棵存全部</text>
          </g>
          <g ref={flyBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 享元共享内在</text>
          </g>

          {/* 场景 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {/* 森林 */}
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">森林 · 10,000 棵树</text>
            {[100, 160, 220, 280, 340, 400, 460].map((x, i) => (
              <text key={x} x={x} y={120 + (i % 3) * 14} fontSize="20" opacity="0.8">🌲</text>
            ))}

            {/* 每棵树存什么（朴素：4 字段全红） */}
            <text x="60" y="190" fontSize="11" fontWeight="700" fill="var(--text-secondary)">每棵树存储的内容</text>
            {FIELDS.map((f, i) => (
              <g key={f} ref={(el) => { fieldBoxRefs.current[`naive-${f}`] = el; }} style={{ opacity: 0 }}>
                <rect x={60 + i * 92} y="200" width={84} height={34} rx="6"
                  fill={f === "position" ? OK_COLOR : NAIVE_COLOR} fillOpacity="0.15"
                  stroke={f === "position" ? OK_COLOR : NAIVE_COLOR} strokeWidth="1.4" />
                <text x={102 + i * 92} y="221" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{f}</text>
              </g>
            ))}
            <text x="60" y="252" fontSize="11" fill="var(--text-secondary)">朴素：四个字段每棵各存一份，大量重复</text>

            {/* 共享 TreeModel（享元） */}
            <g ref={sharedRef} style={{ opacity: 0 }}>
              <rect x="430" y="180" width="250" height="90" rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="2" />
              <text x="446" y="202" fontSize="11" fontWeight="700" fill={ACCENT}>🌳 共享 TreeModel（仅 1 份）</text>
              <text x="446" y="224" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">mesh · texture · material</text>
              <text x="446" y="244" fontSize="11" fill="var(--text-secondary)">≈ 1500 KB，不随数量变（内在）</text>
              <text x="446" y="262" fontSize="11" fill={ACCENT}>所有树的内在状态都指向这里</text>
            </g>

            {/* 内存条 */}
            <text x="60" y="300" fontSize="11" fontWeight="700" fill="var(--text-secondary)">内存占用（10,000 棵）</text>
            <rect x="60" y="310" width="320" height="18" rx="4" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1" />
            <rect ref={memBarRef} x="60" y="310" width="8" height="18" rx="4" fill={OK_COLOR} fillOpacity="0.5" stroke={OK_COLOR} strokeWidth="1.2" />
            <g ref={memNaiveRef} style={{ opacity: 0 }}>
              <text x="392" y="324" fontSize="12" fontWeight="700" fontFamily="monospace" fill={NAIVE_COLOR}>14.3 GB ✗</text>
            </g>
            <g ref={memFlyRef} style={{ opacity: 0 }}>
              <text x="80" y="324" fontSize="12" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>1.95 MB ✓</text>
            </g>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="350" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="375" fontSize="13" fontWeight="700" fill={OK_COLOR}>内在状态共享一份，外在状态每棵独有 → 内存从 14.3 GB 降到 1.95 MB</text>
            <text x="76" y="397" fontSize="11" fill="var(--text-secondary)">判据：内在可共享、外在由上下文提供 → 用共享换内存；代价是共享对象不可变</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（朴素）每棵存全部，内存随数量线性暴涨；候选（享元）内在共享、外在独有，内存几乎不涨。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：朴素方式每棵树存全部状态，内存随数量线性暴涨；享元方式让内在状态共享一份、外在状态每棵独有，内存几乎不随数量增长。
      </figcaption>
    </figure>
  );
}
