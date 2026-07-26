"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh14ComponentFailure>：组件模式反例复位动画（GPP 第14章 · 图3）。
 *
 * 故事：Physics/AI/Render 三个组件。
 *  ① 正常：组件通过消息总线通信，互不知道对方存在
 *  ② 反例：组件之间硬引用（Physics 持有 AI* 指针）
 *  ③ 反例结果：组件重新耦合，拆了等于没拆 ✗
 *  ④ 复位：通过消息/共享状态通信，不持有引用
 *  ⑤ 复位结果：组件解耦恢复 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const COMPONENTS = [
  { id: "physics", label: "Physics", x: 140 },
  { id: "ai", label: "AI", x: 360 },
  { id: "render", label: "Render", x: 580 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：Physics/AI/Render 组件通过消息总线通信，互不知道对方存在" },
  { label: "hardref", caption: "反例：组件之间硬引用——Physics 持有 AI* 指针，AI 持有 Render* 指针" },
  { label: "coupled", caption: "反例结果：组件重新耦合，改 AI 接口 Physics 也编译失败，拆了等于没拆 ✗" },
  { label: "reset", caption: "复位：通过消息/共享状态通信，组件不持有引用" },
  { label: "decoupled", caption: "复位结果：组件解耦恢复，只发消息不持有引用 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh14ComponentFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const busRef = useRef<SVGGElement | null>(null);
  const hardrefRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：3 个组件 + 消息总线
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(busRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② hardref（t: T→2T）：硬引用连线（红）出现
      tl.add(hardrefRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.label("hardref", T);

      // ③ coupled（t: 2T→3T）：判定✗
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.label("coupled", T * 2);

      // ④ reset（t: 3T→4T）：硬引用淡出，消息总线恢复（绿）
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(hardrefRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      tl.label("reset", T * 3);

      // ⑤ decoupled（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("decoupled", T * 4);
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
          aria-label="组件模式反例复位动画。Physics AI Render 三个组件。正常时组件通过消息总线通信互不知道对方存在。反例是组件之间硬引用 Physics 持有 AI 指针 AI 持有 Render 指针，组件重新耦合改 AI 接口 Physics 也编译失败拆了等于没拆。复位是通过消息或共享状态通信组件不持有引用，组件解耦恢复只发消息不持有引用。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：组件硬引用 → 耦合重现
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            组件解耦的关键：不持有引用，只发消息
          </text>

          {/* 场景：3 个组件 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {COMPONENTS.map((c) => (
              <g key={c.id}>
                <rect x={c.x - 55} y="90" width="110" height="50" rx="10" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.5" />
                <text x={c.x} y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">{c.label}</text>
              </g>
            ))}
          </g>

          {/* 消息总线（绿） */}
          <g ref={busRef} style={{ opacity: 0 }}>
            <rect x="160" y="180" width="400" height="36" rx="18" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="360" y="203" textAnchor="middle" fontSize="11" fontWeight="600" fill={OK_COLOR}>消息总线 / 共享状态</text>
            {COMPONENTS.map((c) => (
              <line key={c.id} x1={c.x} y1="140" x2={c.x} y2="180" stroke={OK_COLOR} strokeWidth="1.2" opacity="0.6" />
            ))}
            <text x="360" y="240" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Physics 发 "位置更新" → Render 收 → 互不持有引用</text>
          </g>

          {/* 硬引用连线（红） */}
          <g ref={hardrefRef} style={{ opacity: 0 }}>
            <line x1="195" y1="115" x2="305" y2="115" stroke={FAIL_COLOR} strokeWidth="2.5" />
            <text x="250" y="105" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>AI* ptr</text>
            <line x1="415" y1="115" x2="525" y2="115" stroke={FAIL_COLOR} strokeWidth="2.5" />
            <text x="470" y="105" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>Render* ptr</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="280" width="560" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="96" y="307" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 硬引用让组件重新耦合，拆了等于没拆</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="280" width="560" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="96" y="307" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 消息/共享状态 → 组件解耦恢复</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="80" y="340" width="560" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="96" y="363" fontSize="11" fontWeight="700" fill={OK_COLOR}>组件之间不持有引用，只通过消息/共享状态通信</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：组件硬引用（持有对方指针）让耦合重现。复位：通过消息总线或共享状态通信，组件互不知道对方存在。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：组件之间硬引用（持有对方指针）让耦合重现，拆了等于没拆；通过消息总线或共享状态通信，组件互不知道对方存在。
      </figcaption>
    </figure>
  );
}
