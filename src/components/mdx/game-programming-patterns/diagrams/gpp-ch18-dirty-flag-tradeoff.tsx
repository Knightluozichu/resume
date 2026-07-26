"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh18DirtyFlagTradeoff>：脏标志模式取舍对照动画（GPP 第18章 · 图2）。
 *
 * 故事：Root 下有 A/B/C/D 四个子节点，各自缓存世界变换。
 *  ① 场景图建立
 *  ② 基线（每次重算）：父节点一动，4 个子节点立刻全部重算（计数 4）
 *  ③ 再动一次 → 又重算 4 次，累计 8（浪费）
 *  ④ 候选（标脏延迟）：移动只标脏（红灯），不重算（计数 0）
 *  ⑤ 再动 → 仍只标脏，两次移动被合并
 *  ⑥ 渲染读取 → 沿链重算一次（4 节点），灯转绿，计数 4
 *  ⑦ 对照：同样移动 2 次，每次重算 8 次 vs 标脏延迟 4 次，省一半
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const CHILDREN = [
  { id: "a", label: "Child A", cx: 160 },
  { id: "b", label: "Child B", cx: 310 },
  { id: "c", label: "Child C", cx: 460 },
  { id: "d", label: "Child D", cx: 610 },
];

const ROOT_Y = 92;
const CHILD_Y = 176;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "场景图：Root 下有 A/B/C/D 四个子节点，各自缓存世界变换" },
  { label: "eager1", caption: "基线（每次重算）：父节点一动，4 个子节点的世界变换立刻全部重算" },
  { label: "eager2", caption: "再动一次 → 又重算 4 次，累计 8 次——一帧内多次修改就是重复计算" },
  { label: "dirty1", caption: "候选（标脏延迟）：移动只给子节点标脏（红灯），不重算，计数 0" },
  { label: "dirty2", caption: "再动 → 仍只标脏，两次移动被合并，不重复重算" },
  { label: "read", caption: "渲染读取时才沿链重算一次（4 个节点），灯转绿，计数 4" },
  { label: "insight", caption: "对照：同样移动 2 次——每次重算要 8 次，标脏延迟只要 4 次，省一半" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh18DirtyFlagTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const rootRef = useRef<SVGGElement | null>(null);
  const eagerBadgeRef = useRef<SVGGElement | null>(null);
  const dirtyBadgeRef = useRef<SVGGElement | null>(null);
  const recomputeFlashRefs = useRef<Record<string, SVGRectElement | null>>({});
  const dirtyLightRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const cleanLightRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const counterRefs = useRef<Record<string, SVGGElement | null>>({});
  const readArrowRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：场景淡入
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② eager1（t: T→2T）：基线徽章出现，Root 移动，4 子节点闪烁重算，计数=4
      tl.add(eagerBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(rootRef.current!, { x: [0, 24], duration: T * 0.4, ease: "inOut(2)" }, T);
      CHILDREN.forEach((c, i) => {
        tl.add(recomputeFlashRefs.current[c.id]!, { opacity: [0, 0.5, 0], duration: T * 0.6, ease: "out(3)" }, T * 1.2 + i * T * 0.08);
      });
      tl.add(counterRefs.current["c4"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("eager1", T);

      // ③ eager2（t: 2T→3T）：Root 再移动，再闪烁，计数 4→8
      tl.add(rootRef.current!, { x: [24, 0], duration: T * 0.4, ease: "inOut(2)" }, T * 2);
      CHILDREN.forEach((c, i) => {
        tl.add(recomputeFlashRefs.current[c.id]!, { opacity: [0, 0.5, 0], duration: T * 0.6, ease: "out(3)" }, T * 2.2 + i * T * 0.08);
      });
      tl.add(counterRefs.current["c4"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.5);
      tl.add(counterRefs.current["c8"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("eager2", T * 2);

      // ④ dirty1（t: 3T→4T）：切到候选——基线徽章淡出、候选徽章淡入、计数清零，Root 移动，4 子节点亮红灯
      tl.add(eagerBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(counterRefs.current["c8"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(counterRefs.current["c0"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.2);
      tl.add(dirtyBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.2);
      tl.add(rootRef.current!, { x: [0, 24], duration: T * 0.4, ease: "inOut(2)" }, T * 3.2);
      CHILDREN.forEach((c, i) => {
        tl.add(dirtyLightRefs.current[c.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.4 + i * T * 0.08);
      });
      tl.label("dirty1", T * 3);

      // ⑤ dirty2（t: 4T→5T）：Root 再移动，灯仍红（合并），计数仍 0
      tl.add(rootRef.current!, { x: [24, 0], duration: T * 0.4, ease: "inOut(2)" }, T * 4);
      CHILDREN.forEach((c, i) => {
        tl.add(dirtyLightRefs.current[c.id]!, { opacity: [1, 0.6, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.2 + i * T * 0.08);
      });
      tl.label("dirty2", T * 4);

      // ⑥ read（t: 5T→6T）：渲染读取箭头出现，沿链重算，红灯转绿，计数 0→4
      tl.add(readArrowRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 5);
      CHILDREN.forEach((c, i) => {
        tl.add(dirtyLightRefs.current[c.id]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 5.2 + i * T * 0.1);
        tl.add(cleanLightRefs.current[c.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 5.2 + i * T * 0.1);
      });
      tl.add(counterRefs.current["c0"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 5.5);
      tl.add(counterRefs.current["c4b"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 5.6);
      tl.label("read", T * 5);

      // ⑦ insight（t: 6T→6.6T）：对照结论浮现
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 6);
      tl.label("insight", T * 6);
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
          aria-label="脏标志模式取舍对照动画。场景图 Root 下有 A B C D 四个子节点各自缓存世界变换。基线每次重算：父节点一动四个子节点立刻全部重算，移动两次累计重算八次。候选标脏延迟：移动只标脏不重算，两次移动合并，渲染读取时才沿链重算一次共四次。对照同样移动两次，每次重算八次，标脏延迟四次，省一半。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：每次重算 vs 标脏延迟
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            脏标志把 N 次变化合并为读取时 1 次重算
          </text>

          {/* 方式徽章 */}
          <g ref={eagerBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 每次重算</text>
          </g>
          <g ref={dirtyBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 标脏延迟</text>
          </g>

          {/* 场景图 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {/* Root */}
            <g ref={rootRef}>
              <rect x="280" y={ROOT_Y - 18} width="160" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.5" />
              <text x="360" y={ROOT_Y + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">Root（父节点）</text>
            </g>

            {/* 子节点 + 连线 + 灯 */}
            {CHILDREN.map((c) => (
              <g key={c.id}>
                <line x1="360" y1={ROOT_Y + 18} x2={c.cx} y2={CHILD_Y - 16} stroke="var(--border)" strokeWidth="1" opacity="0.5" />
                <rect x={c.cx - 60} y={CHILD_Y - 16} width="120" height="32" rx="6" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
                <text x={c.cx} y={CHILD_Y + 4} textAnchor="middle" fontSize="11" fill="var(--text-primary)">{c.label}</text>
                {/* 重算闪烁（红） */}
                <rect ref={(el) => { recomputeFlashRefs.current[c.id] = el; }} x={c.cx - 60} y={CHILD_Y - 16} width="120" height="32" rx="6" fill={WARN_COLOR} style={{ opacity: 0 }} />
                {/* 脏灯（红）/ 干净灯（绿） */}
                <circle ref={(el) => { dirtyLightRefs.current[c.id] = el; }} cx={c.cx + 48} cy={CHILD_Y - 16} r="6" fill={WARN_COLOR} stroke="var(--elevated)" strokeWidth="1.5" style={{ opacity: 0 }} />
                <circle ref={(el) => { cleanLightRefs.current[c.id] = el; }} cx={c.cx + 48} cy={CHILD_Y - 16} r="6" fill={OK_COLOR} stroke="var(--elevated)" strokeWidth="1.5" style={{ opacity: 0 }} />
              </g>
            ))}

            {/* 渲染读取箭头 */}
            <g ref={readArrowRef} style={{ opacity: 0 }}>
              <text x="360" y={CHILD_Y + 46} textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>↓ 渲染读取 world → 沿链重算一次</text>
            </g>
          </g>

          {/* 计数器（多个状态切换） */}
          <g>
            <rect x="60" y="250" width="600" height="56" rx="10" fill="rgba(255,255,255,0.03)" stroke="var(--border)" strokeWidth="1.4" />
            <text x="76" y="272" fontSize="11" fontWeight="700" fill="var(--text-secondary)">重算次数（累计）</text>
            <g ref={(el) => { counterRefs.current["c4"] = el; }} style={{ opacity: 0 }}>
              <text x="76" y="296" fontSize="14" fontWeight="700" fill={WARN_COLOR}>✗ 即时重算：4 次（移动 1 次 × 4 子节点）</text>
            </g>
            <g ref={(el) => { counterRefs.current["c8"] = el; }} style={{ opacity: 0 }}>
              <text x="76" y="296" fontSize="14" fontWeight="700" fill={WARN_COLOR}>✗ 即时重算：8 次（移动 2 次 × 4 子节点）——大量浪费</text>
            </g>
            <g ref={(el) => { counterRefs.current["c0"] = el; }} style={{ opacity: 0 }}>
              <text x="76" y="296" fontSize="14" fontWeight="700" fill={OK_COLOR}>✓ 标脏延迟：0 次（只标脏，未重算）</text>
            </g>
            <g ref={(el) => { counterRefs.current["c4b"] = el; }} style={{ opacity: 0 }}>
              <text x="76" y="296" fontSize="14" fontWeight="700" fill={OK_COLOR}>✓ 标脏延迟：4 次（读取时一次性重算，合并 2 次移动）</text>
            </g>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="330" width="600" height="64" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="356" fontSize="13" fontWeight="700" fill={OK_COLOR}>同样移动 2 次：每次重算 = 8 次，标脏延迟 = 4 次，省一半</text>
            <text x="76" y="378" fontSize="11" fill="var(--text-secondary)">一帧内修改越多，标脏延迟省得越多；代价是必须记得设脏，忘了就读到过期值</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（每次重算）移动两次要重算 8 次；候选（标脏延迟）移动时只标脏，渲染读取时才沿链重算一次共 4 次，省一半。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：每次重算让 N 次变化产生 N×子节点次计算；标脏延迟把 N 次变化合并为读取时 1 次重算。
      </figcaption>
    </figure>
  );
}
