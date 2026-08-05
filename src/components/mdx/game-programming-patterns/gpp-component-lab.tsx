"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const T = TEACHING_BEAT_MS;
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";
const WARN = "#E5675C";
const VW = 900;
const VH = 420;

const ACCENT = "#5A9AE6"; // cobalt
const STEPS: readonly TeachingStep[] = [
  { label: "container", caption: "① GameObject 容器：持有组件列表，管理生命周期" },
  { label: "split", caption: "② 单体类拆解：Input/Physics/Graphics 各成组件" },
  { label: "compose", caption: "③ 组合：实体按需装配组件——组合优于继承" },
  { label: "comm", caption: "④ 组件间通信：经容器转发消息，避免直接耦合" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppComponentLab() {
  const boxRef = useRef<SVGGElement>(null);
  const splitRef = useRef<SVGGElement>(null);
  const composeRef = useRef<SVGGElement>(null);
  const commRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(boxRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("container", 0);
      tl.add(splitRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("split", T);
      tl.add(composeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("compose", T * 2);
      tl.add(commRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("comm", T * 3);
    },
  });
  const comps = [
    { x: 150, label: "InputComponent", desc: "键盘/手柄输入" },
    { x: 360, label: "PhysicsComponent", desc: "碰撞与刚体" },
    { x: 570, label: "GraphicsComponent", desc: "渲染模型动画" },
    { x: 150, label: "AudioComponent", desc: "音效播放" },
    { x: 360, label: "HealthComponent", desc: "血量状态" },
    { x: 570, label: "AIComponent", desc: "行为决策" },
  ];
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Decoupling Pattern · Component</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Component — 实体是组件拼出来的，不是继承出来的</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Component 模式定制图解：GameObject 容器持有多个组件，单体类拆解为领域组件，实体按需装配。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>单体类的解药：把每个领域切成独立组件，实体按需组合</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>组合优于继承——新增能力 = 挂新组件，不破坏已有代码</text>

          <g ref={boxRef} style={{ opacity: 0 }}>
            <rect x={70} y={80} width={660} height={250} rx={14} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={400} y={110} textAnchor="middle" fontSize={13} fontWeight={700} fill={ACCENT}>GameObject（容器）</text>
            <text x={400} y={130} textAnchor="middle" fontSize={11} fill={MUTE}>管理生命周期 · 组件增删 · 消息转发</text>
          </g>

          {comps.map((c, i) => (
            <g key={c.label} ref={splitRef} style={{ opacity: 0 }}>
              <rect x={c.x-70} y={155 + (i % 2) * 80} width={140} height={60} rx={8} fill={ACCENT} opacity={0.1} stroke={ACCENT} strokeWidth={1.4} />
              <text x={c.x} y={181 + (i % 2) * 80} textAnchor="middle" fontSize={11} fontWeight={600} fill={ACCENT}>{c.label}</text>
              <text x={c.x} y={201 + (i % 2) * 80} textAnchor="middle" fontSize={11} fill={MUTE}>{c.desc}</text>
            </g>
          ))}

          <g ref={composeRef} style={{ opacity: 0 }}>
            <rect x={770} y={100} width={110} height={60} rx={10} fill={OK} opacity={0.1} stroke={OK} strokeWidth={1.4} />
            <text x={825} y={124} textAnchor="middle" fontSize={11} fontWeight={600} fill={OK}>组合</text>
            <text x={825} y={144} textAnchor="middle" fontSize={11} fill={MUTE}>实体=组件集</text>
            <rect x={770} y={180} width={110} height={60} rx={10} fill={WARN} opacity={0.08} stroke={WARN} strokeWidth={1.2} />
            <text x={825} y={204} textAnchor="middle" fontSize={11} fontWeight={600} fill={WARN}>继承树</text>
            <text x={825} y={224} textAnchor="middle" fontSize={11} fill={MUTE}>多维度爆炸</text>
          </g>

          <g ref={commRef} style={{ opacity: 0 }}>
            <rect x={70} y={350} width={810} height={40} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.2} />
            <text x={475} y={375} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>组件间通信：经容器转发消息，组件互不认识——解耦的关键</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="实体 = 组件容器：每个组件管一个领域，新能力挂新组件——继承树的爆炸在组合面前消失。" />
      </div>
    </div>
  );
}
