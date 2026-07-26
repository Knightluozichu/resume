"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh03FlyweightFailure>：享元模式反例复位动画（GPP 第3章 · 图3）。
 *
 * 故事：6 棵树，各自应有自己的位置（外在状态）。
 *  ① 正常：6 棵树各自散开，共享 TreeModel 只装 mesh/texture/material（无 position）
 *  ② 反例：把 position 误塞进共享 TreeModel
 *  ③ 反例结果：所有树共享同一位置 → 全部重叠在一处，森林变成一摞树 ✗
 *  ④ 复位：把 position 移出共享对象，作为外在状态留给每棵树
 *  ⑤ 复位结果：6 棵树各自散开 ✓，position 由上下文提供
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

// 每棵树各自的位置（外在状态）
const TREE_POSITIONS = [
  { x: 130, y: 210 },
  { x: 230, y: 250 },
  { x: 340, y: 200 },
  { x: 450, y: 260 },
  { x: 550, y: 220 },
  { x: 290, y: 290 },
];
// 反例时所有树共享的位置
const SHARED_POS = { x: 340, y: 240 };

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：6 棵树各自散开，共享 TreeModel 只装内在状态（无 position）" },
  { label: "inject", caption: "反例：把 position 误塞进共享的 TreeModel" },
  { label: "overlap", caption: "反例结果：所有树共享同一位置 → 全部重叠在一处，森林变成一摞树 ✗" },
  { label: "reset", caption: "复位：把 position 移出共享对象，作为外在状态留给每棵树" },
  { label: "scattered", caption: "复位结果：6 棵树各自散开 ✓，position 由上下文（每棵树）提供" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh03FlyweightFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const treeRefs = useRef<Record<number, SVGGElement | null>>({});
  const sharedPosRef = useRef<SVGTextElement | null>(null);
  const faultBadgeRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：森林散开 + 共享对象（无 position）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② inject（t: T→2T）：反例徽章出现，position 被塞进共享对象（红）
      tl.add(faultBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(sharedPosRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.3);
      tl.label("inject", T);

      // ③ overlap（t: 2T→3T）：6 棵树全部移到共享位置（重叠），判定✗
      TREE_POSITIONS.forEach((pos, i) => {
        tl.add(treeRefs.current[i]!, { x: [pos.x, SHARED_POS.x], y: [pos.y, SHARED_POS.y], duration: T * 0.6, ease: "inOut(2)" }, T * 2 + i * T * 0.05);
      });
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("overlap", T * 2);

      // ④ reset（t: 3T→4T）：position 移出共享对象，6 棵树移回各自位置
      tl.add(faultBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(sharedPosRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      TREE_POSITIONS.forEach((pos, i) => {
        tl.add(treeRefs.current[i]!, { x: [SHARED_POS.x, pos.x], y: [SHARED_POS.y, pos.y], duration: T * 0.6, ease: "inOut(2)" }, T * 3.2 + i * T * 0.05);
      });
      tl.label("reset", T * 3);

      // ⑤ scattered（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.3);
      tl.label("scattered", T * 4);
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
          aria-label="享元模式反例复位动画。正常时六棵树各自散开，共享 TreeModel 只装内在状态没有 position。反例是把 position 误塞进共享的 TreeModel，所有树共享同一位置，全部重叠在一处，森林变成一摞树。复位是把 position 移出共享对象作为外在状态留给每棵树，六棵树各自散开，position 由上下文提供。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：外在状态误塞共享对象 → 实例重叠
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            position 是外在状态，必须留在实例外，不能进共享对象
          </text>

          {/* 反例徽章 */}
          <g ref={faultBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={FAIL_COLOR} fillOpacity="0.14" stroke={FAIL_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>反例 · position 进共享</text>
          </g>

          {/* 森林场景 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <rect x="60" y="80" width="600" height="240" rx="12" fill="var(--text-secondary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1.3" />
            <text x="76" y="102" fontSize="11" fontWeight="700" fill="var(--text-secondary)">森林（6 棵树）</text>

            {/* 树（动画移动） */}
            {TREE_POSITIONS.map((pos, i) => (
              <g key={`tree-${i}`} ref={(el) => { treeRefs.current[i] = el; }} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
                <text x="0" y="0" textAnchor="middle" fontSize="24" opacity="0.9">🌲</text>
              </g>
            ))}

            {/* 共享对象标注 */}
            <rect x="60" y="330" width="300" height="70" rx="10" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.4" />
            <text x="76" y="352" fontSize="11" fontWeight="700" fill="var(--text-secondary)">共享 TreeModel 里有什么</text>
            <text x="76" y="372" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">mesh · texture · material</text>
            <text ref={sharedPosRef} x="76" y="392" fontSize="11" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>+ position ✗（外在状态误入）</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="380" y="330" width="280" height="70" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="396" y="356" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 6 棵树全重叠在一处</text>
            <text x="396" y="378" fontSize="11" fill="var(--text-secondary)">共享同一位置，森林变成一摞树</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="380" y="330" width="280" height="70" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="396" y="356" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 6 棵树各自散开</text>
            <text x="396" y="378" fontSize="11" fill="var(--text-secondary)">position 由上下文（每棵树）提供</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="412" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="435" fontSize="11" fontWeight="700" fill={OK_COLOR}>共享对象只装内在状态；外在状态留在实例外、由上下文提供</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：外在状态（position）误塞进共享对象，所有实例重叠。复位：position 留在实例外、由上下文提供。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：外在状态若误塞进共享的享元对象，所有实例会共享同一份外在状态而重叠；外在状态应留在每个实例外、由上下文提供。
      </figcaption>
    </figure>
  );
}
