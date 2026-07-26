"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh10UpdateMethodTradeoff>：更新方法取舍对照动画（GPP 第10章 · 图2）。
 *
 * 故事：Bjørn/Skeleton/Mage 三个对象都要推进。
 *  ① 场景：3 个对象，进度都是 0%
 *  ② 基线（阻塞行为）：Bjørn 的长行为阻塞主循环，它跑到 100%，其他两个卡在 0% ✗
 *  ③ 候选（逐帧 update）：每个对象每帧推进一点，三个一起到 100% ✓
 *  ④ 对照：逐帧 update 是协作式伪并发，主循环不阻塞
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const OBJECTS = [
  { id: "bjorn", name: "Bjørn", y: 96 },
  { id: "skeleton", name: "Skeleton", y: 166 },
  { id: "mage", name: "Mage", y: 236 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "Bjørn/Skeleton/Mage 三个对象都要推进，进度都是 0%" },
  { label: "blocking", caption: "基线（阻塞行为）：Bjørn 的长行为阻塞主循环，它跑到 100%，其他两个卡在 0% ✗" },
  { label: "update", caption: "候选（逐帧 update）：每个对象每帧推进一点，三个一起到 100% ✓" },
  { label: "insight", caption: "对照：逐帧 update 是协作式伪并发——每个对象演一帧、存状态、下帧继续" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh10UpdateMethodTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const blockingBadgeRef = useRef<SVGGElement | null>(null);
  const updateBadgeRef = useRef<SVGGElement | null>(null);
  const barRefs = useRef<Record<string, SVGRectElement | null>>({});
  const stuckRefs = useRef<Record<string, SVGTextElement | null>>({});
  const doneRefs = useRef<Record<string, SVGTextElement | null>>({});
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：3 个对象的进度条（0%）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② blocking（t: T→2T）：基线徽章 + Bjørn 跑到 100%，其他卡住（红）
      tl.add(blockingBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(barRefs.current["bjorn"]!, { width: [0, 400], duration: T * 0.7, ease: "out(3)" }, T * 1.1);
      tl.add(doneRefs.current["bjorn"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.add(stuckRefs.current["skeleton"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.5);
      tl.add(stuckRefs.current["mage"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.8);
      tl.label("blocking", T);

      // ③ update（t: 2T→3T）：切候选——基线徽章/卡住提示/坏判定淡出，三个条一起到 100%
      tl.add(blockingBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(stuckRefs.current["skeleton"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(stuckRefs.current["mage"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(updateBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(barRefs.current["bjorn"]!, { width: [400, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.1);
      tl.add(doneRefs.current["bjorn"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.1);
      OBJECTS.forEach((o, i) => {
        tl.add(barRefs.current[o.id]!, { width: [0, 400], duration: T * 0.6, ease: "out(3)" }, T * 2.3 + i * T * 0.1);
        tl.add(doneRefs.current[o.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7 + i * T * 0.1);
      });
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.9);
      tl.label("update", T * 2);

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
          aria-label="更新方法取舍对照动画。Bjørn Skeleton Mage 三个对象都要推进。基线阻塞行为：Bjørn 的长行为阻塞主循环，它跑到 100% 其他两个卡在 0%。候选逐帧 update：每个对象每帧推进一点，三个一起到 100%。对照：逐帧 update 是协作式伪并发，每个对象演一帧存状态下帧继续，主循环不阻塞。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：阻塞行为 vs 逐帧 update
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            逐帧 update 让每个对象轮流推进，主循环不阻塞
          </text>

          {/* 方式徽章 */}
          <g ref={blockingBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 阻塞行为</text>
          </g>
          <g ref={updateBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 逐帧 update</text>
          </g>

          {/* 场景：3 个对象的进度条 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {OBJECTS.map((o) => (
              <g key={o.id}>
                <text x="60" y={o.y + 14} fontSize="12" fontWeight="700" fill="var(--text-primary)">{o.name}</text>
                <rect x="160" y={o.y} width="400" height="24" rx="5" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.2" />
                <rect ref={(el) => { barRefs.current[o.id] = el; }} x="160" y={o.y} width="0" height="24" rx="5" fill={OK_COLOR} fillOpacity="0.4" stroke={OK_COLOR} strokeWidth="1.2" />
                <text ref={(el) => { doneRefs.current[o.id] = el; }} x="570" y={o.y + 17} fontSize="11" fontFamily="monospace" fill={OK_COLOR} style={{ opacity: 0 }}>100%</text>
                <text ref={(el) => { stuckRefs.current[o.id] = el; }} x="570" y={o.y + 17} fontSize="11" fontWeight="700" fontFamily="monospace" fill={WARN_COLOR} style={{ opacity: 0 }}>卡住!</text>
              </g>
            ))}
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="327" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 阻塞行为：Bjørn 的长行为阻塞主循环，其他对象卡住</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="327" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 逐帧 update：所有对象每帧推进一点，主循环不阻塞</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="360" width="600" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="382" fontSize="12" fontWeight="700" fill={OK_COLOR}>逐帧 update 是协作式伪并发：每个对象演一帧、存状态、下帧继续</text>
            <text x="76" y="401" fontSize="11" fill="var(--text-secondary)">代价：行为被切成帧片段更复杂、须显式保存续行状态</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（阻塞行为）一个对象阻塞全部；候选（逐帧 update）所有对象轮流推进、主循环不阻塞。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：阻塞行为让一个对象的长行为阻塞主循环、其他对象卡住；逐帧 update 让每个对象每帧只推进一小步、保存状态，主循环不阻塞、所有对象轮流推进。
      </figcaption>
    </figure>
  );
}
