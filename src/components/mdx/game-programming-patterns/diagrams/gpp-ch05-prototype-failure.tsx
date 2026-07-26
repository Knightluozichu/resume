"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh05PrototypeFailure>：原型模式反例复位动画（GPP 第5章 · 图3）。
 *
 * 故事：原型克隆出 A 和 B 两个恶魔。
 *  ① 正常：浅复制——A 和 B 共享同一个可变背包对象
 *  ② 反例：给 A 的背包加物品
 *  ③ 反例结果：B 的背包也变了（共享！）✗ 两个克隆反向耦合
 *  ④ 复位：深拷贝——每个克隆拥有自己的背包
 *  ⑤ 复位结果：给 A 加物品，B 不受影响 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "浅复制：克隆 A 和 B 共享同一个可变背包对象" },
  { label: "add-item", caption: "反例：给 A 的背包加物品" },
  { label: "polluted", caption: "反例结果：B 的背包也变了（共享同一对象）✗ 两个克隆反向耦合" },
  { label: "deep-copy", caption: "复位：深拷贝——每个克隆拥有自己的背包" },
  { label: "independent", caption: "复位结果：给 A 加物品，B 不受影响 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh05PrototypeFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const sharedBagRef = useRef<SVGGElement | null>(null);
  const separateBagsRef = useRef<SVGGElement | null>(null);
  const itemRef = useRef<SVGGElement | null>(null);
  const bagBTextRef = useRef<SVGTextElement | null>(null);
  const bBoxRef = useRef<SVGRectElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：A + B + 共享背包
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(sharedBagRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② add-item（t: T→2T）：物品出现在 A 的背包（共享）
      tl.add(itemRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("add-item", T);

      // ③ polluted（t: 2T→3T）：B 的背包文本变化（红），B 标红，判定✗
      tl.add(bagBTextRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(bBoxRef.current!, { stroke: [FAIL_COLOR, FAIL_COLOR], duration: T * 0.3, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.label("polluted", T * 2);

      // ④ deep-copy（t: 3T→4T）：共享背包淡出，各自背包出现，B 转绿，物品淡出
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(sharedBagRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      tl.add(itemRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      tl.add(bagBTextRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      tl.add(separateBagsRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.3);
      tl.add(bBoxRef.current!, { stroke: [OK_COLOR, OK_COLOR], duration: T * 0.3, ease: "out(3)" }, T * 3.5);
      tl.label("deep-copy", T * 3);

      // ⑤ independent（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("independent", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧪</span>
            反例与复位
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="原型模式反例复位动画。浅复制让克隆 A 和 B 共享同一个可变背包对象，给 A 的背包加物品时 B 也被影响，两个克隆反向耦合。复位是深拷贝让每个克隆拥有自己的背包，给 A 加物品 B 不受影响。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：浅复制共享可变背包 → 克隆互相牵连
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            可变子对象要深拷贝，不能让克隆共享
          </text>

          {/* 场景 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {/* 克隆 A */}
            <rect x="80" y="100" width="180" height="110" rx="12" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.8" />
            <text x="170" y="126" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">👹 克隆 A</text>
            <text x="170" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">背包：</text>
            <text x="170" y="170" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">物品1</text>
            <text x="170" y="196" textAnchor="middle" fontSize="11" fill={ACCENT}>原型克隆出来</text>

            {/* 物品（加到 A） */}
            <g ref={itemRef} style={{ opacity: 0 }}>
              <text x="230" y="170" fontSize="12">🗡️</text>
            </g>

            {/* 克隆 B */}
            <rect ref={bBoxRef} x="460" y="100" width="180" height="110" rx="12" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.8" />
            <text x="550" y="126" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">👹 克隆 B</text>
            <text x="550" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">背包：</text>
            <text x="550" y="170" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">（空）</text>
            {/* B 被污染后的文本（红） */}
            <text ref={bagBTextRef} x="550" y="170" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>物品1 ← 被牵连!</text>
            <text x="550" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原型克隆出来</text>
          </g>

          {/* 共享背包（浅复制） */}
          <g ref={sharedBagRef} style={{ opacity: 0 }}>
            <rect x="290" y="240" width="140" height="40" rx="8" fill={FAIL_COLOR} fillOpacity="0.14" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="360" y="264" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>🎒 共享背包（1 个）</text>
            <line x1="170" y1="210" x2="330" y2="240" stroke={FAIL_COLOR} strokeWidth="1.4" strokeDasharray="4 3" />
            <line x1="550" y1="210" x2="390" y2="240" stroke={FAIL_COLOR} strokeWidth="1.4" strokeDasharray="4 3" />
          </g>

          {/* 各自背包（深拷贝） */}
          <g ref={separateBagsRef} style={{ opacity: 0 }}>
            <text x="170" y="262" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>🎒 A 的背包</text>
            <text x="550" y="262" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>🎒 B 的背包</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="300" width="560" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="96" y="327" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 浅复制：A 加物品，B 的背包也变了（共享可变对象）</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="300" width="560" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="96" y="327" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 深拷贝：A 加物品，B 不受影响（各自背包）</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="80" y="356" width="560" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="96" y="379" fontSize="11" fontWeight="700" fill={OK_COLOR}>克隆时对可变子对象深拷贝，让每个克隆拥有独立状态</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：浅复制让克隆共享可变背包，修改一个牵连其他。复位：深拷贝，每个克隆拥有独立状态。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：浅复制让多个克隆共享同一个可变子对象，修改一个会牵连其他克隆；克隆时对可变子对象做深拷贝，让每个克隆拥有独立状态。
      </figcaption>
    </figure>
  );
}
