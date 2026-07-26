"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh04ObserverTradeoff>：观察者模式取舍对照动画（GPP 第4章 · 图2）。
 *
 * 故事：物理引擎检测到 EnemyDied，要通知成就/音效/AI 三个系统。
 *  ① 场景：物理引擎 + 3 个观察者
 *  ② 基线（硬编码直调）：物理引擎直接调用 3 个系统，箭头纠缠
 *  ③ 基线新增观察者：要改物理引擎代码加调用 ✗
 *  ④ 候选（订阅广播）：物理引擎只广播 EnemyDied，观察者自行订阅
 *  ⑤ 候选新增观察者：只需订阅，物理引擎零改动 ✓
 *  ⑥ 对照：广播让发送方不知道有谁在听，新增接收者不用改发送方
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const OBSERVERS = [
  { id: "ach", name: "成就系统", y: 100 },
  { id: "aud", name: "音效系统", y: 152 },
  { id: "ai", name: "AI 系统", y: 204 },
];
const NEW_OBS = { id: "new", name: "新观察者", y: 256 };

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "物理引擎检测到 EnemyDied，要通知成就/音效/AI 三个系统" },
  { label: "baseline", caption: "基线（硬编码直调）：物理引擎直接调用 3 个系统，箭头纠缠" },
  { label: "baseline-add", caption: "基线新增观察者：要改物理引擎代码加一条调用 ✗" },
  { label: "candidate", caption: "候选（订阅广播）：物理引擎只广播 EnemyDied，观察者自行订阅" },
  { label: "candidate-add", caption: "候选新增观察者：只需订阅，物理引擎代码零改动 ✓" },
  { label: "insight", caption: "对照：广播让发送方不知道有谁在听，新增接收者不用改发送方" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh04ObserverTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const baselineBadgeRef = useRef<SVGGElement | null>(null);
  const candidateBadgeRef = useRef<SVGGElement | null>(null);
  const directArrowRefs = useRef<Record<string, SVGLineElement | null>>({});
  const broadcastArrowRefs = useRef<Record<string, SVGLineElement | null>>({});
  const newObsRef = useRef<SVGGElement | null>(null);
  const newDirectRef = useRef<SVGLineElement | null>(null);
  const newBroadcastRef = useRef<SVGLineElement | null>(null);
  const senderNoteRefs = useRef<Record<string, SVGTextElement | null>>({});
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② baseline（t: T→2T）：基线徽章 + 3 条直调箭头（实线红）
      tl.add(baselineBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      OBSERVERS.forEach((o, i) => {
        tl.add(directArrowRefs.current[o.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.1 + i * T * 0.12);
      });
      tl.add(senderNoteRefs.current["direct"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.5);
      tl.label("baseline", T);

      // ③ baseline-add（t: 2T→3T）：新观察者出现 + 第 4 条直调箭头 + 发送方标红
      tl.add(newObsRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(newDirectRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.label("baseline-add", T * 2);

      // ④ candidate（t: 3T→4T）：切候选——基线徽章/直调箭头/坏判定淡出，广播箭头（虚线绿）出现
      tl.add(baselineBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(senderNoteRefs.current["direct"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      OBSERVERS.forEach((o) => tl.add(directArrowRefs.current[o.id]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3));
      tl.add(newDirectRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(candidateBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.2);
      OBSERVERS.forEach((o, i) => {
        tl.add(broadcastArrowRefs.current[o.id]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.3 + i * T * 0.12);
      });
      tl.add(senderNoteRefs.current["broadcast"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.6);
      tl.label("candidate", T * 3);

      // ⑤ candidate-add（t: 4T→5T）：新观察者订阅（虚线绿）+ 发送方零改动（绿）
      tl.add(newBroadcastRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.2);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.5);
      tl.label("candidate-add", T * 4);

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
            <span aria-hidden="true">⚖️</span>
            取舍对照
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="观察者模式取舍对照动画。物理引擎检测到 EnemyDied 要通知成就音效AI三个系统。基线硬编码直调：物理引擎直接调用三个系统箭头纠缠，新增观察者要改物理引擎代码加一条调用。候选订阅广播：物理引擎只广播 EnemyDied 观察者自行订阅，新增观察者只需订阅物理引擎代码零改动。对照：广播让发送方不知道有谁在听，新增接收者不用改发送方。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：硬编码直调 vs 订阅广播
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            广播让发送方不知道有谁在听，新增接收者不用改发送方
          </text>

          {/* 方式徽章 */}
          <g ref={baselineBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 硬编码直调</text>
          </g>
          <g ref={candidateBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 订阅广播</text>
          </g>

          {/* 场景 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {/* 发送方：物理引擎 */}
            <rect x="60" y="160" width="150" height="80" rx="12" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="2" />
            <text x="135" y="192" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">⚙️ 物理引擎</text>
            <text x="135" y="212" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">检测到 EnemyDied</text>
            <text ref={(el) => { senderNoteRefs.current["direct"] = el; }} x="135" y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR} style={{ opacity: 0 }}>直接调用 N 个系统</text>
            <text ref={(el) => { senderNoteRefs.current["broadcast"] = el; }} x="135" y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR} style={{ opacity: 0 }}>只广播 EnemyDied</text>

            {/* 观察者标签 */}
            <text x="360" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">观察者</text>

            {/* 3 个基础观察者 */}
            {OBSERVERS.map((o) => (
              <g key={o.id}>
                <rect x="360" y={o.y} width="150" height="36" rx="7" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.3" />
                <text x="435" y={o.y + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">{o.name}</text>
                {/* 直调箭头（实线红） */}
                <line ref={(el) => { directArrowRefs.current[o.id] = el; }} x1="210" y1="195" x2="358" y2={o.y + 18} stroke={WARN_COLOR} strokeWidth="1.8" style={{ opacity: 0 }} />
                {/* 广播箭头（虚线绿） */}
                <line ref={(el) => { broadcastArrowRefs.current[o.id] = el; }} x1="210" y1="195" x2="358" y2={o.y + 18} stroke={OK_COLOR} strokeWidth="1.2" strokeDasharray="5 3" style={{ opacity: 0 }} />
              </g>
            ))}

            {/* 新观察者 */}
            <g ref={newObsRef} style={{ opacity: 0 }}>
              <rect x="360" y={NEW_OBS.y} width="150" height="36" rx="7" fill={ACCENT} fillOpacity="0.16" stroke={ACCENT} strokeWidth="1.5" />
              <text x="435" y={NEW_OBS.y + 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>{NEW_OBS.name}</text>
            </g>
            <line ref={newDirectRef} x1="210" y1="195" x2="358" y2={NEW_OBS.y + 18} stroke={WARN_COLOR} strokeWidth="1.8" style={{ opacity: 0 }} />
            <line ref={newBroadcastRef} x1="210" y1="195" x2="358" y2={NEW_OBS.y + 18} stroke={OK_COLOR} strokeWidth="1.2" strokeDasharray="5 3" style={{ opacity: 0 }} />
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="320" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="347" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 硬编码直调：每加一个观察者都要改物理引擎代码</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="320" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="347" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 订阅广播：新增观察者只需订阅，物理引擎零改动</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="320" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="345" fontSize="13" fontWeight="700" fill={OK_COLOR}>发送方只管广播、接收方自行订阅 → 二者解耦</text>
            <text x="76" y="367" fontSize="11" fill="var(--text-secondary)">代价：广播是"一对多"，发送方不知道谁在听、调试更难追踪</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（硬编码直调）发送方与每个接收方纠缠，新增要改发送方；候选（订阅广播）二者解耦，新增零改动。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：硬编码直调让发送方与每个接收方纠缠，新增接收方要改发送方；订阅广播让二者解耦，新增接收方零改动。
      </figcaption>
    </figure>
  );
}
