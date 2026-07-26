"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh11BytecodeTradeoff>：字节码模式取舍对照动画（GPP 第11章 · 图2）。
 *
 * 故事：法术行为如何表达。
 *  ① 场景：一个法术的行为定义
 *  ② 基线（硬编码）：行为写死在代码里，改行为要改代码、重新编译 ✗
 *  ③ 候选（字节码）：行为是一段数据（指令序列），改行为只需改数据、无需编译 ✓
 *  ④ 对照：字节码把行为变成数据，可配置、可下发
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "一个法术的行为需要被定义（如：治疗量 = 0 + 1）" },
  { label: "hardcoded", caption: "基线（硬编码）：行为写死在代码里，改行为要改代码、重新编译、重新部署 ✗" },
  { label: "bytecode", caption: "候选（字节码）：行为是一段数据（指令序列），改行为只需改数据、无需编译 ✓" },
  { label: "insight", caption: "对照：字节码把行为变成数据，可配置、可下发，连策划都能调" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh11BytecodeTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const hardcodedBadgeRef = useRef<SVGGElement | null>(null);
  const bytecodeBadgeRef = useRef<SVGGElement | null>(null);
  const hardcodedBoxRef = useRef<SVGGElement | null>(null);
  const bytecodeBoxRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② hardcoded（t: T→2T）：硬编码徽章 + 代码框（红）+ 判定✗
      tl.add(hardcodedBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(hardcodedBoxRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("hardcoded", T);

      // ③ bytecode（t: 2T→3T）：切候选——硬编码淡出，字节码徽章 + 数据框（绿）+ 判定✓
      tl.add(hardcodedBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(hardcodedBoxRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(bytecodeBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(bytecodeBoxRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("bytecode", T * 2);

      // ④ insight（t: 3T→3.6T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("insight", T * 3);
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
          aria-label="字节码模式取舍对照动画。一个法术的行为需要被定义。基线硬编码：行为写死在代码里，改行为要改代码重新编译重新部署。候选字节码：行为是一段数据即指令序列，改行为只需改数据无需编译。对照：字节码把行为变成数据，可配置可下发，连策划都能调。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：硬编码行为 vs 字节码（行为即数据）
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            字节码把行为变成数据，可配置、可下发、无需编译
          </text>

          {/* 方式徽章 */}
          <g ref={hardcodedBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 硬编码行为</text>
          </g>
          <g ref={bytecodeBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 字节码</text>
          </g>

          {/* 场景 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">法术行为的定义</text>
          </g>

          {/* 硬编码框（红） */}
          <g ref={hardcodedBoxRef} style={{ opacity: 0 }}>
            <rect x="60" y="100" width="600" height="100" rx="10" fill={WARN_COLOR} fillOpacity="0.07" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="124" fontSize="11" fontWeight="700" fill={WARN_COLOR}>硬编码：法术 = 写死的代码</text>
            <text x="76" y="152" fontSize="12" fontFamily="monospace" fill="var(--text-primary)">void cast() {"{ health = 0 + 1; }"}</text>
            <text x="76" y="182" fontSize="11" fill="var(--text-secondary)">改行为 → 改代码 → 重新编译 → 重新部署</text>
          </g>

          {/* 字节码框（绿） */}
          <g ref={bytecodeBoxRef} style={{ opacity: 0 }}>
            <rect x="60" y="100" width="600" height="100" rx="10" fill={OK_COLOR} fillOpacity="0.07" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="124" fontSize="11" fontWeight="700" fill={OK_COLOR}>字节码：法术 = 一段数据（指令序列）</text>
            <text x="76" y="152" fontSize="12" fontFamily="monospace" fill="var(--text-primary)">[LITERAL 0, LITERAL 1, ADD, SET_HEALTH]</text>
            <text x="76" y="182" fontSize="11" fill="var(--text-secondary)">改行为 → 改数据即可，无需编译，可运行时下发</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="230" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="257" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 硬编码：行为写死，改行为要重新编译</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="230" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="257" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 字节码：行为即数据，改数据即生效</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="325" fontSize="13" fontWeight="700" fill={OK_COLOR}>字节码让行为像数据一样灵活：可配置、可组合、可热更</text>
            <text x="76" y="347" fontSize="11" fill="var(--text-secondary)">代价：需要虚拟机、比原生代码慢、调试更难</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（硬编码）改行为要重新编译；候选（字节码）行为即数据，改数据即生效、可下发。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：硬编码行为把逻辑写死在代码里，改行为要重新编译；字节码把行为变成数据，可配置、可运行时下发，连策划都能调整。代价是需要虚拟机、比原生慢、调试更难。
      </figcaption>
    </figure>
  );
}
