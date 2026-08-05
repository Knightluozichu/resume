"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

/**
 * <GppStateLab> —— Ch07 State 模式定制图解。
 * 视觉隐喻「状态球放射」：四个状态球按菱形排布，转移弧线带事件标签；
 * 右侧给出枚举/switch 与状态模式两方案的对比与转换触发说明。
 * 单 accent（deep rose）+ 中性底，无 emoji，label 打在动画起始时刻。
 */

const T = TEACHING_BEAT_MS;
const ACCENT = "#E56A7A"; // deep rose
const OK = "#3FB97F";
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";

const STEPS: readonly TeachingStep[] = [
  { label: "idle", caption: "① 角色处于 Idle：按空格触发跳跃" },
  { label: "jump", caption: "② 跳转 Jumping：落地回 Idle" },
  { label: "run", caption: "③ 跳转 Running：停止回 Idle" },
  { label: "atk", caption: "④ 跳转 Attacking：攻击结束回 Idle" },
  { label: "switch", caption: "⑤ 枚举 switch 的问题：条件膨胀 vs 状态类各自封装" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

const VW = 900;
const VH = 420;

export function GppStateLab() {
  const idleRef = useRef<SVGGElement>(null);
  const jumpRef = useRef<SVGGElement>(null);
  const runRef = useRef<SVGGElement>(null);
  const atkRef = useRef<SVGGElement>(null);
  const lineRefs = Array.from({ length: 4 }, () => useRef<SVGGElement>(null));
  const switchRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(idleRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("idle", 0);
      tl.add(lineRefs[0].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      tl.add(jumpRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("jump", T);
      tl.add(lineRefs[1].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2);
      tl.add(runRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("run", T * 2);
      tl.add(lineRefs[2].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3);
      tl.add(atkRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("atk", T * 3);
      tl.add(lineRefs[3].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4);
      tl.add(switchRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("switch", T * 4);
    },
  });

  const states = [
    { x: 190, y: 210, ref: idleRef, label: "Idle", d: "起始", event: "按空格" },
    { x: 420, y: 90, ref: jumpRef, label: "Jumping", d: "空中", event: "落地" },
    { x: 420, y: 330, ref: runRef, label: "Running", d: "移动", event: "停止" },
    { x: 650, y: 210, ref: atkRef, label: "Attacking", d: "出招", event: "攻击结束" },
  ];
  // 从 Idle(0) 出发的三条弧 + 右侧对比框
  const arcs = [
    { from: 0, to: 1, ref: lineRefs[0] },
    { from: 0, to: 2, ref: lineRefs[1] },
    { from: 0, to: 3, ref: lineRefs[2] },
  ];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Design Pattern · Revisited</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>State — 让每个状态自己决定该做什么</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="State 模式定制图解：四个状态球按菱形排布，从 Idle 出发的转移弧线带事件标签，右侧对比枚举 switch 与状态模式。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>同一个角色，四种行为——取决于当前处于哪个状态</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>事件触发转换，每个状态只关心自己负责的事件</text>

          <defs>
            <marker id="st-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill={LINE} />
            </marker>
          </defs>

          {arcs.map((a, i) => {
            const f = states[a.from]; const t = states[a.to];
            const mx = (f.x + t.x) / 2 + (i === 0 ? -60 : i === 1 ? -60 : 20);
            const my = (f.y + t.y) / 2 - (i === 0 ? 40 : i === 1 ? -40 : 0);
            return (
              <g key={i} ref={a.ref} style={{ opacity: 0 }}>
                <path d={`M ${f.x+48} ${f.y} Q ${mx} ${my} ${t.x-48} ${t.y}`} fill="none" stroke={LINE} strokeWidth={1.5} markerEnd="url(#st-arrow)" />
                <text x={(f.x+t.x)/2 + (i===0?-40:20)} y={(f.y+t.y)/2 - 16} textAnchor="middle" fontSize={11} fill={MUTE}>{f.event}</text>
              </g>
            );
          })}
          {states.map((s) => (
            <g key={s.label} ref={s.ref} style={{ opacity: 0 }}>
              <circle cx={s.x} cy={s.y} r={48} fill={ACCENT} opacity={0.1} stroke={ACCENT} strokeWidth={2} />
              <text x={s.x} y={s.y-4} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{s.label}</text>
              <text x={s.x} y={s.y+16} textAnchor="middle" fontSize={11} fill={MUTE}>{s.d}</text>
            </g>
          ))}

          <g ref={lineRefs[3]} style={{ opacity: 0 }}>
            <line x1={700} y1={270} x2={760} y2={330} stroke={LINE} strokeWidth={1} />
            <text x={758} y={346} textAnchor="middle" fontSize={11} fill={MUTE}>转换完成</text>
          </g>

          <g ref={switchRef} style={{ opacity: 0 }}>
            <rect x={60} y={340} width={360} height={50} rx={10} fill="#E5675C" opacity={0.08} stroke="#E5675C" strokeWidth={1.3} />
            <text x={240} y={364} textAnchor="middle" fontSize={11} fontWeight={700} fill="#E5675C">枚举 switch：条件膨胀，每个状态的行为挤在一个函数里</text>
            <rect x={480} y={340} width={380} height={50} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.3} />
            <text x={670} y={364} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>状态类：每个状态一个类，自己封装行为与转换</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="状态模式把'当前在哪个状态'变成可替换的对象——加状态不改旧状态代码。" />
      </div>
    </div>
  );
}