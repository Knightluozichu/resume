"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh02CommandFailure>：命令模式反例复位动画（GPP 第2章 · 图3）。
 *
 * 故事：Bjørn 在 x=1。执行「移到 x=3」命令并记录"之前位置"；随后又一个动作把 Bjørn 移到 x=5。
 *  ① 初始：Bjørn 在 x=1
 *  ② 执行「移到 x=3」→ Bjørn 到 x=3；两种命令分别记录：存引用（→共享对象）/ 存快照（=1）
 *  ③ 又一个动作把 Bjørn 移到 x=5 → 存引用的记录变质为 5，存快照仍是 1
 *  ④ 反例：撤销"存引用"命令 → 读到变质的 5 → 停在 x=5 ✗
 *  ⑤ 复位：撤销"存快照"命令 → 读到 1 → 回到 x=1 ✓
 *  ⑥ 结论：命令该记住"执行时的值"，而非"会变的引用"
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const POS: Record<number, number> = { 1: 180, 3: 340, 5: 500 };

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "初始：Bjørn 在 x=1" },
  { label: "exec", caption: "执行「移到 x=3」→ Bjørn 到 x=3；存引用命令记下共享对象，存快照命令记下 1" },
  { label: "move-again", caption: "又一个动作把 Bjørn 移到 x=5 → 存引用的记录变质为 5，存快照仍是 1" },
  { label: "bug-undo", caption: "反例：撤销“存引用”命令 → 读到变质的 5 → 停在 x=5，不变量被破坏 ✗" },
  { label: "fix-undo", caption: "复位：撤销“存快照”命令 → 读到执行时的 1 → 正确回到 x=1 ✓" },
  { label: "insight", caption: "命令该记住“执行时的值”（快照），而非“会变的引用”" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh02CommandFailure() {
  const stageRef = useRef<SVGGElement | null>(null);
  const bjornRef = useRef<SVGGElement | null>(null);
  const bjornCircleRef = useRef<SVGCircleElement | null>(null);
  const refCardRef = useRef<SVGGElement | null>(null);
  const snapCardRef = useRef<SVGGElement | null>(null);
  const refPrevStaleRef = useRef<SVGTextElement | null>(null);
  const undoRefBadgeRef = useRef<SVGGElement | null>(null);
  const undoSnapBadgeRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：轨道 + Bjørn（x=1）淡入
      tl.add(stageRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② exec（t: T→2T）：Bjørn 1→3，两个命令卡片出现
      tl.add(bjornRef.current!, { x: [POS[1], POS[3]], duration: T * 0.6, ease: "inOut(2)" }, T * 1.1);
      tl.add(refCardRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.4);
      tl.add(snapCardRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.6);
      tl.label("exec", T);

      // ③ move-again（t: 2T→3T）：Bjørn 3→5，存引用记录变质（红）
      tl.add(bjornRef.current!, { x: [POS[3], POS[5]], duration: T * 0.6, ease: "inOut(2)" }, T * 2.1);
      tl.add(refPrevStaleRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("move-again", T * 2);

      // ④ bug-undo（t: 3T→4T）：撤销存引用 → Bjørn 停在 5（变红），判定✗
      tl.add(undoRefBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(bjornCircleRef.current!, { stroke: [FAIL_COLOR, FAIL_COLOR], duration: T * 0.3, ease: "out(3)" }, T * 3.3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.5);
      tl.label("bug-undo", T * 3);

      // ⑤ fix-undo（t: 4T→5T）：撤销存快照 → Bjørn 5→1（转绿），判定✓
      tl.add(undoRefBadgeRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 4);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 4);
      tl.add(undoSnapBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(bjornRef.current!, { x: [POS[5], POS[1]], duration: T * 0.6, ease: "inOut(2)" }, T * 4.2);
      tl.add(bjornCircleRef.current!, { stroke: [OK_COLOR, OK_COLOR], duration: T * 0.3, ease: "out(3)" }, T * 4.6);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.7);
      tl.label("fix-undo", T * 4);

      // ⑥ insight（t: 5T→5.6T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
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
          aria-label="命令模式反例复位动画。Bjørn 在 x 等于 1，执行移到 x 等于 3 命令并记录之前位置，随后又一个动作把 Bjørn 移到 x 等于 5。反例：撤销存引用命令，引用已变质为 5，错误地停在 x 等于 5，不变量被破坏。复位：撤销存快照命令，读到执行时的 1，正确回到 x 等于 1。命令该记住执行时的值而非会变的引用。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：撤销命令存引用 vs 存快照
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            命令该记住“执行时的值”，而非“会变的引用”
          </text>

          {/* 轨道 + Bjørn */}
          <g ref={stageRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">Bjørn 位置</text>
            <line x1="140" y1="130" x2="560" y2="130" stroke="var(--border)" strokeWidth="1.4" />
            {[1, 3, 5].map((p) => (
              <text key={p} x={POS[p]} y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">x={p}</text>
            ))}
            <g ref={bjornRef} style={{ transform: `translateX(${POS[1]}px)` }}>
              <circle ref={bjornCircleRef} cx="0" cy="112" r="16" fill={ACCENT} fillOpacity="0.2" stroke={ACCENT} strokeWidth="2" />
              <text x="0" y="118" textAnchor="middle" fontSize="14">🧝</text>
            </g>

            {/* 存引用命令卡片 */}
            <g ref={refCardRef} style={{ opacity: 0 }}>
              <rect x="80" y="180" width="280" height="76" rx="10" fill={FAIL_COLOR} fillOpacity="0.07" stroke={FAIL_COLOR} strokeWidth="1.5" />
              <text x="96" y="202" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>MoveCommand · 存引用（反例）</text>
              <text x="96" y="224" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">prev → 共享位置对象</text>
              <text ref={refPrevStaleRef} x="96" y="244" fontSize="11" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>⚠ 引用变质 → 读到 5</text>
            </g>

            {/* 存快照命令卡片 */}
            <g ref={snapCardRef} style={{ opacity: 0 }}>
              <rect x="380" y="180" width="280" height="76" rx="10" fill={OK_COLOR} fillOpacity="0.07" stroke={OK_COLOR} strokeWidth="1.5" />
              <text x="396" y="202" fontSize="11" fontWeight="700" fill={OK_COLOR}>MoveCommand · 存快照（正确）</text>
              <text x="396" y="224" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">prev = 1（执行时快照）</text>
              <text x="396" y="244" fontSize="11" fill="var(--text-secondary)">定值，不随目标改变</text>
            </g>

            {/* 撤销徽章 */}
            <g ref={undoRefBadgeRef} style={{ opacity: 0 }}>
              <rect x="80" y="276" width="280" height="30" rx="7" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1.4" />
              <text x="220" y="296" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>撤销（存引用）→ 读到 5</text>
            </g>
            <g ref={undoSnapBadgeRef} style={{ opacity: 0 }}>
              <rect x="380" y="276" width="280" height="30" rx="7" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.4" />
              <text x="520" y="296" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>撤销（存快照）→ 读到 1</text>
            </g>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="330" width="580" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="96" y="357" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 撤销失败：恢复到变质的 x=5，“可复现执行前状态”不变量被破坏</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="330" width="580" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="96" y="357" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 撤销正确：用快照值 1，恢复到执行前的 x=1</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="80" y="330" width="580" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="96" y="355" fontSize="13" fontWeight="700" fill={OK_COLOR}>命令必须保存执行时刻的快照值，不能保存会变的共享引用</text>
            <text x="96" y="377" fontSize="11" fill="var(--text-secondary)">目标随后被再修改时，引用已变质；快照是定值，撤销才可复现</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：撤销命令存引用，目标再变化后引用变质，撤销恢复到错误状态。修复：命令保存执行时刻的快照值。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：撤销命令若保存对可变目标的引用，目标再次变化后撤销会恢复到错误状态；命令应保存执行时刻的快照值。
      </figcaption>
    </figure>
  );
}
