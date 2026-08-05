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
  { label: "type", caption: "① 类型对象：定义怪物的共享属性（hp/speed/技能）——一份定义" },
  { label: "inst", caption: "② 实例引用类型：每个怪物只存自己的位置/状态" },
  { label: "share", caption: "③ 实例从类型对象读取属性：改类型 = 改所有实例" },
  { label: "benefit", caption: "④ 数据驱动：策划改数据文件即可定义新怪物种类" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppTypeObjectLab() {
  const typeRef = useRef<SVGGElement>(null);
  const instRef = useRef<SVGGElement>(null);
  const shareRef = useRef<SVGGElement>(null);
  const benefitRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(typeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("type", 0);
      tl.add(instRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("inst", T);
      tl.add(shareRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("share", T * 2);
      tl.add(benefitRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("benefit", T * 3);
    },
  });
  const insts = [
    { label: "哥布林 A", x: 180, pos: "x=10, y=20, hp=42" },
    { label: "哥布林 B", x: 400, pos: "x=30, y=80, hp=60" },
    { label: "哥布林 C", x: 620, pos: "x=50, y=15, hp=55" },
  ];
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Behavioral Pattern · Type Object</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Type Object — 种类是数据，实例是引用</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Type Object 模式定制图解：类型对象定义共享属性，实例只存自身状态并引用类型。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>"什么是哥布林"存成对象——改它，所有哥布林同时变</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>类型对象（共享定义） + 实例（各自状态）</text>

          <g ref={typeRef} style={{ opacity: 0 }}>
            <rect x={250} y={80} width={400} height={120} rx={12} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={450} y={108} textAnchor="middle" fontSize={13} fontWeight={700} fill={ACCENT}>GoblinType（类型对象）</text>
            <line x1={260} y1={118} x2={640} y2={118} stroke={LINE} strokeWidth={1} />
            <text x={290} y={144} fontSize={11} fontFamily="var(--font-mono)" fill={INK}>hp=60</text>
            <text x={430} y={144} fontSize={11} fontFamily="var(--font-mono)" fill={INK}>speed=3</text>
            <text x={570} y={144} fontSize={11} fontFamily="var(--font-mono)" fill={INK}>技能:投掷</text>
            <text x={450} y={174} textAnchor="middle" fontSize={11} fill={MUTE}>共享定义 · 一份数据 · 所有实例引用</text>
          </g>

          {insts.map((ins, i) => (
            <g key={ins.label} ref={instRef} style={{ opacity: 0 }}>
              <rect x={ins.x-90} y={240} width={180} height={80} rx={10} fill="var(--bg)" stroke={LINE} strokeWidth={1.5} />
              <text x={ins.x} y={270} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>{ins.label}</text>
              <text x={ins.x} y={296} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill={MUTE}>{ins.pos}</text>
            </g>
          ))}

          <g ref={shareRef} style={{ opacity: 0 }}>
            {insts.map((ins, i) => (
              <line key={i} x1={ins.x} y1={240} x2={450} y2={200} stroke={LINE} strokeWidth={1} strokeDasharray="4,3" />
            ))}
            <text x={450} y={360} textAnchor="middle" fontSize={11} fill={MUTE}>实例只存自身状态；把 GoblinType.hp 改成 80，所有哥布林同时变强</text>
          </g>

          <g ref={benefitRef} style={{ opacity: 0 }}>
            <rect x={60} y={376} width={780} height={40} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.3} />
            <text x={450} y={401} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>新怪物 = 新类型对象（数据文件）——引擎零改动，内容无限扩展</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="类型从「类」降级为「数据对象」——种类由内容定义，实例按需引用。" />
      </div>
    </div>
  );
}
