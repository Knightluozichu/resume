"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const T = TEACHING_BEAT_MS;
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";
const VW = 900;
const VH = 420;

const ACCENT = "#E5A54B"; // amber
const STEPS: readonly TeachingStep[] = [
  { label: "base", caption: "① Sandbox 基类：提供受保护操作（playSound/spawnParticle/damageTarget）" },
  { label: "sub", caption: "② 子类继承基类，在 activate() 里组合调用这些操作" },
  { label: "engine", caption: "③ 引擎调用 power.activate()：子类只与沙箱打交道" },
  { label: "benefit", caption: "④ 收益：子类不触碰引擎 API——解耦 + 安全边界" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppSubclassSandboxLab() {
  const baseRef = useRef<SVGGElement>(null);
  const subRef = useRef<SVGGElement>(null);
  const engineRef = useRef<SVGGElement>(null);
  const benefitRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(baseRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("base", 0);
      tl.add(subRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("sub", T);
      tl.add(engineRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("engine", T * 2);
      tl.add(benefitRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("benefit", T * 3);
    },
  });
  const ops = ["playSound()", "spawnParticle()", "damageTarget()"];
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Behavioral Pattern · Subclass Sandbox</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Subclass Sandbox — 子类只会在沙箱里玩</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Subclass Sandbox 模式定制图解：基类提供受保护操作，子类组合调用，引擎只调用激活方法。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>引擎把"能做的事"收进沙箱基类，子类只负责组合</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>子类不碰引擎 API——安全边界 + 解耦一次到位</text>

          <g ref={baseRef} style={{ opacity: 0 }}>
            <rect x={60} y={80} width={300} height={220} rx={12} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={210} y={110} textAnchor="middle" fontSize={13} fontWeight={700} fill={ACCENT}>Superpower（沙箱基类）</text>
            <text x={210} y={130} textAnchor="middle" fontSize={11} fill={MUTE}>protected: 可调操作</text>
            <line x1={70} y1={142} x2={350} y2={142} stroke={LINE} strokeWidth={1} />
            {ops.map((op, i) => (
              <text key={op} x={80} y={172 + i * 30} fontSize={12} fontFamily="var(--font-mono)" fill={INK}>{op}</text>
            ))}
            <text x={80} y={276} fontSize={11} fill={MUTE}>abstract activate()</text>
          </g>

          <g ref={subRef} style={{ opacity: 0 }}>
            <line x1={360} y1={160} x2={400} y2={160} stroke={OK} strokeWidth={2} />
            <polygon points={`${396},${154} ${400},${160} ${396},${166}`} fill={OK} />
            <rect x={400} y={80} width={300} height={220} rx={12} fill="var(--bg)" stroke={OK} strokeWidth={2} />
            <text x={550} y={110} textAnchor="middle" fontSize={13} fontWeight={700} fill={OK}>FireballPower（子类）</text>
            <text x={550} y={130} textAnchor="middle" fontSize={11} fill={MUTE}>override activate()</text>
            <line x1={410} y1={142} x2={690} y2={142} stroke={LINE} strokeWidth={1} />
            <text x={420} y={172} fontSize={12} fontFamily="var(--font-mono)" fill={INK}>playSound("fire")</text>
            <text x={420} y={202} fontSize={12} fontFamily="var(--font-mono)" fill={INK}>spawnParticle("flame")</text>
            <text x={420} y={232} fontSize={12} fontFamily="var(--font-mono)" fill={INK}>damageTarget(25)</text>
          </g>

          <g ref={engineRef} style={{ opacity: 0 }}>
            <rect x={740} y={120} width={130} height={90} rx={10} fill="var(--bg)" stroke={LINE} strokeWidth={1.5} />
            <text x={805} y={150} textAnchor="middle" fontSize={12} fontWeight={600} fill={INK}>引擎</text>
            <text x={805} y={172} textAnchor="middle" fontSize={11} fill={MUTE}>power.activate()</text>
            <text x={805} y={194} textAnchor="middle" fontSize={11} fill={MUTE}>子类只碰沙箱</text>
          </g>

          <g ref={benefitRef} style={{ opacity: 0 }}>
            <rect x={60} y={330} width={810} height={44} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.3} />
            <text x={465} y={357} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>改引擎 API 只需改沙箱基类一处——所有子类自动适配，不会漏改</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="子类能做的所有事都来自沙箱——引擎改动被隔离在基类，子类零波及。" />
      </div>
    </div>
  );
}
