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
  { label: "pool", caption: "① 对象池：预分配固定槽位（弹幕池）" },
  { label: "acquire", caption: "② acquire()：取空闲槽初始化，零堆分配" },
  { label: "release", caption: "③ release()：复位并标记空闲" },
  { label: "benefit", caption: "④ 收益：无碎片、无 GC、无分配——高频对象不碰堆" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppObjectPoolLab() {
  const poolRef = useRef<SVGGElement>(null);
  const acquireRef = useRef<SVGGElement>(null);
  const releaseRef = useRef<SVGGElement>(null);
  const benefitRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(poolRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("pool", 0);
      tl.add(acquireRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("acquire", T);
      tl.add(releaseRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("release", T * 2);
      tl.add(benefitRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("benefit", T * 3);
    },
  });
  const slots = ["⚪ 空闲", "🔴 使用中", "⚪ 空闲", "🔴 使用中", "⚪ 空闲", "⚪ 空闲"];
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Optimization Pattern · Object Pool</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Object Pool — 预分配，别现造</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Object Pool 模式定制图解：预分配固定槽位，acquire 取空闲、release 复位放回。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>短命对象不 new 不 delete——从池里取、用、还</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>预分配固定槽位，控制碎片与运行时分配</text>

          <g ref={poolRef} style={{ opacity: 0 }}>
            <rect x={80} y={80} width={740} height={110} rx={12} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={450} y={106} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT}>BulletPool（预分配 6 个槽）</text>
            {slots.map((s, i) => (
              <g key={i}>
                <rect x={100 + i * 120} y={120} width={110} height={48} rx={8} fill={s.includes("使用") ? WARN : OK} opacity={0.12} stroke={s.includes("使用") ? WARN : OK} strokeWidth={1.4} />
                <text x={155 + i * 120} y={149} textAnchor="middle" fontSize={11} fill={INK}>{s}</text>
              </g>
            ))}
          </g>

          <g ref={acquireRef} style={{ opacity: 0 }}>
            <rect x={120} y={220} width={240} height={60} rx={10} fill="var(--bg)" stroke={ACCENT} strokeWidth={1.5} />
            <text x={240} y={246} textAnchor="middle" fontSize={12} fontWeight={600} fill={ACCENT}>发射：acquire()</text>
            <text x={240} y={268} textAnchor="middle" fontSize={11} fill={MUTE}>取空闲槽 → 初始化 → 使用</text>
          </g>

          <g ref={releaseRef} style={{ opacity: 0 }}>
            <rect x={440} y={220} width={240} height={60} rx={10} fill="var(--bg)" stroke={OK} strokeWidth={1.5} />
            <text x={560} y={246} textAnchor="middle" fontSize={12} fontWeight={600} fill={OK}>爆炸：release()</text>
            <text x={560} y={268} textAnchor="middle" fontSize={11} fill={MUTE}>复位状态 → 标记空闲</text>
          </g>

          <g ref={benefitRef} style={{ opacity: 0 }}>
            <rect x={80} y={320} width={740} height={44} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.2} />
            <text x={450} y={346} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>同一块内存反复使用：0 次 malloc、0 次 free、0 碎片——GC 压力归零</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="池子预分配好，运行时只做取-还：高频对象永远不碰堆分配。" />
      </div>
    </div>
  );
}
