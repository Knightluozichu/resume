"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const T = TEACHING_BEAT_MS;
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const ACCENT = "#5A9AE6";
const VW = 900;
const VH = 420;

const STEPS: readonly TeachingStep[] = [
  { label: "motive", caption: "① 动机：游戏是实时系统，代码必须持续运转——模式解决这类独特问题" },
  { label: "catalog", caption: "② 模式目录：本书按六大主题组织 20 个模式" },
  { label: "how", caption: "③ 阅读方式：先看问题，再想方案，对照反例" },
  { label: "path", caption: "④ 学习路径：从数据结构到集群，从单机到多机" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppIntroLab() {
  const motiveRef = useRef<SVGGElement>(null);
  const catalogRef = useRef<SVGGElement>(null);
  const howRef = useRef<SVGGElement>(null);
  const pathRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(motiveRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("motive", 0);
      tl.add(catalogRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("catalog", T);
      tl.add(howRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("how", T * 2);
      tl.add(pathRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("path", T * 3);
    },
  });
  const parts = ["数据结构", "单机机制", "集群架构", "功能应用"];
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Game Programming Patterns</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>引言——本书在解决什么问题</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="引言可视化：动机、模式目录、阅读方式、学习路径。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>游戏开发的设计模式——从"为什么"到"怎么用"</text>
          <g ref={motiveRef} style={{ opacity: 0 }}>
            <rect x={60} y={60} width={380} height={120} rx={12} fill="var(--bg)" stroke={ACCENT} strokeWidth={1.8} />
            <text x={250} y={90} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT}>① 动机：游戏的特殊性</text>
            <text x={250} y={116} textAnchor="middle" fontSize={11} fill={MUTE}>实时 · 持续运转 · 性能敏感</text>
            <text x={250} y={140} textAnchor="middle" fontSize={11} fill={MUTE}>模式解决"游戏才有的问题"</text>
            <text x={250} y={164} textAnchor="middle" fontSize={11} fill={MUTE}>而非通用软件工程问题</text>
          </g>
          <g ref={catalogRef} style={{ opacity: 0 }}>
            <rect x={470} y={60} width={380} height={120} rx={12} fill="var(--bg)" stroke={LINE} strokeWidth={1.8} />
            <text x={660} y={90} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>② 模式目录：20 个模式</text>
            {parts.map((p, i) => (
              <text key={p} x={660} y={116 + i * 18} textAnchor="middle" fontSize={11} fill={MUTE}>{p}</text>
            ))}
          </g>
          <g ref={howRef} style={{ opacity: 0 }}>
            <rect x={60} y={210} width={380} height={110} rx={12} fill="var(--bg)" stroke={LINE} strokeWidth={1.8} />
            <text x={250} y={240} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>③ 阅读方式</text>
            <text x={250} y={266} textAnchor="middle" fontSize={11} fill={MUTE}>先看问题 → 再想方案 → 对照反例</text>
            <text x={250} y={290} textAnchor="middle" fontSize={11} fill={MUTE}>每章：问题证据 → 术语 → 深读 → 练习</text>
          </g>
          <g ref={pathRef} style={{ opacity: 0 }}>
            <rect x={470} y={210} width={380} height={110} rx={12} fill="var(--bg)" stroke={LINE} strokeWidth={1.8} />
            <text x={660} y={240} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>④ 学习路径</text>
            <text x={660} y={266} textAnchor="middle" fontSize={11} fill={MUTE}>从基础结构到高级机制逐层深入</text>
            <text x={660} y={290} textAnchor="middle" fontSize={11} fill={MUTE}>每章独立可读，可跳读</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="本书是「问题驱动的模式目录」——每个模式解决一个游戏开发中的具体问题。" />
      </div>
    </div>
  );
}
