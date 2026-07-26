"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh12SubclassSandbox>：子类沙箱边界机制动画（GPP 第12章 · 图1）。
 *
 * 核心：基类提供一组受保护的"沙箱操作"，子类只通过组合这些操作来定义行为，从而把子类
 * 与引擎其余部分隔离。
 *
 * 场景：Superpower 基类提供受保护操作 move / playSound / spawnParticles。子类 SkyLaunch、
 * Dive 只调用这些操作，绝不直接碰物理引擎/音频系统/粒子系统。
 *
 * 节拍：
 *  ① 沙箱 + 基类提供的受保护操作（move/playSound/spawnParticles）
 *  ② 子类 SkyLaunch、Dive 在沙箱内
 *  ③ 子类只组合这些操作定义行为（SkyLaunch = move + playSound）
 *  ④ 引擎子系统在沙箱外，只有基类能跨越围栏调用
 *  ⑤ 子类被挡在沙箱内，不能直连引擎
 *  ⑥ 子类依赖收敛到基类一处 → 与引擎解耦
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const OPERATIONS = [
  { name: "move(x, y, z)", emoji: "🏃" },
  { name: "playSound(id)", emoji: "🔊" },
  { name: "spawnParticles(id)", emoji: "✨" },
];

const SUBCLASSES = [
  { name: "SkyLaunch", emoji: "🚀", uses: "move(0,10,0) + playSound(\"launch\")" },
  { name: "Dive", emoji: "🤿", uses: "move(0,-8,0) + spawnParticles(\"splash\")" },
];

const ENGINE_SYSTEMS = [
  { name: "物理引擎", emoji: "⚙️" },
  { name: "音频系统", emoji: "🎵" },
  { name: "粒子系统", emoji: "🎆" },
];

const STEPS: readonly TeachingStep[] = [
  { label: "sandbox", caption: "沙箱：Superpower 基类提供一组受保护操作 move / playSound / spawnParticles" },
  { label: "subclasses", caption: "子类 SkyLaunch、Dive 生活在沙箱内" },
  { label: "compose", caption: "子类只组合这些操作定义行为：SkyLaunch = move + playSound" },
  { label: "engine", caption: "引擎子系统在沙箱外，只有基类能跨越围栏调用它们" },
  { label: "blocked", caption: "子类被挡在沙箱内，不能直连引擎 ✗" },
  { label: "insight", caption: "子类的依赖收敛到基类一处 → 与引擎其余部分解耦，子类更易复用与维护" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh12SubclassSandbox() {
  const sandboxRef = useRef<SVGGElement | null>(null);
  const subclassesRef = useRef<SVGGElement | null>(null);
  const composeRef = useRef<SVGGElement | null>(null);
  const engineRef = useRef<SVGGElement | null>(null);
  const blockedRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① sandbox（t: 0→T）：沙箱围栏 + 操作浮现
      tl.add(sandboxRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("sandbox", 0);

      // ② subclasses（t: T→2T）：子类卡片浮现
      tl.add(subclassesRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T);
      tl.label("subclasses", T);

      // ③ compose（t: 2T→3T）：组合高亮浮现
      tl.add(composeRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 2);
      tl.label("compose", T * 2);

      // ④ engine（t: 3T→4T）：引擎子系统 + 基类允许箭头浮现
      tl.add(engineRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("engine", T * 3);

      // ⑤ blocked（t: 4T→5T）：子类被挡（红 ✗）浮现
      tl.add(blockedRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("blocked", T * 4);

      // ⑥ insight（t: 5T→6T）：结论浮现
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">📦</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="子类沙箱机制动画。Superpower 基类提供一组受保护的沙箱操作 move、playSound、spawnParticles。子类 SkyLaunch 和 Dive 生活在沙箱内，只组合调用这些操作来定义行为，例如 SkyLaunch 组合 move 加 playSound。引擎子系统物理、音频、粒子在沙箱外，只有基类能跨越围栏调用它们，子类被挡在沙箱内不能直连引擎。这样子类的依赖收敛到基类一处，与引擎其余部分解耦，子类更易复用与维护。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="gpp12-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={OK_COLOR} />
            </marker>
            <marker id="gpp12-arrow-block" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <path d="M2,2 L8,8 M8,2 L2,8" stroke={WARN_COLOR} strokeWidth="1.6" />
            </marker>
          </defs>

          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            子类沙箱：子类只组合基类提供的受保护操作
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            基类把引擎能力收敛成一组操作，子类在沙箱内组合它们，不直接碰引擎
          </text>

          {/* 沙箱围栏 + 基类操作 */}
          <g ref={sandboxRef} style={{ opacity: 0 }}>
            <rect x="50" y="80" width="420" height="300" rx="16" fill={ACCENT} fillOpacity="0.04" stroke={ACCENT} strokeWidth="2" strokeDasharray="8 5" />
            <text x="70" y="106" fontSize="12" fontWeight="700" fill={ACCENT}>📦 沙箱（Superpower 基类提供的受保护操作）</text>
            <text x="70" y="134" fontSize="11" fontWeight="700" fill="var(--text-secondary)">受保护操作（protected）：</text>
            {OPERATIONS.map((op, i) => {
              const x = 70 + i * 130;
              return (
                <g key={op.name}>
                  <rect x={x} y="142" width={120} height={40} rx="7" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.4" />
                  <text x={x + 12} y="160" fontSize="12">{op.emoji}</text>
                  <text x={x + 34} y="166" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{op.name}</text>
                </g>
              );
            })}
          </g>

          {/* 子类卡片 */}
          <g ref={subclassesRef} style={{ opacity: 0 }}>
            <text x="70" y="216" fontSize="11" fontWeight="700" fill="var(--text-secondary)">子类（在沙箱内组合操作）：</text>
            {SUBCLASSES.map((sc, i) => {
              const y = 226 + i * 70;
              return (
                <g key={sc.name}>
                  <rect x="70" y={y} width="380" height="56" rx="9" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.4" />
                  <text x="86" y={y + 24} fontSize="12" fontWeight="700" fill="var(--text-primary)">{sc.emoji} {sc.name}</text>
                  <text x="86" y={y + 44} fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">调用：{sc.uses}</text>
                </g>
              );
            })}
          </g>

          {/* 组合高亮（move + playSound） */}
          <g ref={composeRef} style={{ opacity: 0 }}>
            <rect x="66" y="138" width={120 + 8} height={48} rx="9" fill="none" stroke={ACCENT} strokeWidth="2.4" />
            <rect x="196" y="138" width={120 + 8} height={48} rx="9" fill="none" stroke={ACCENT} strokeWidth="2.4" />
            <text x="70" y="204" fontSize="11" fontWeight="700" fill={ACCENT}>🚀 SkyLaunch 组合 move + playSound（不碰引擎）</text>
          </g>

          {/* 引擎子系统（围栏外）+ 基类允许箭头 */}
          <g ref={engineRef} style={{ opacity: 0 }}>
            <text x="510" y="106" fontSize="11" fontWeight="700" fill="var(--text-secondary)">引擎子系统（沙箱外）</text>
            {ENGINE_SYSTEMS.map((sys, i) => {
              const y = 130 + i * 76;
              return (
                <g key={sys.name}>
                  <rect x="510" y={y} width="170" height="56" rx="9" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.4" />
                  <text x="526" y={y + 24} fontSize="12" fontWeight="700" fill="var(--text-primary)">{sys.emoji} {sys.name}</text>
                  <text x="526" y={y + 44} fontSize="11" fill="var(--text-secondary)">只有基类能调用</text>
                  <line x1="470" y1={y + 28} x2="508" y2={y + 28} stroke={OK_COLOR} strokeWidth="1.6" markerEnd="url(#gpp12-arrow)" />
                </g>
              );
            })}
          </g>

          {/* 子类被挡（禁止直连引擎） */}
          <g ref={blockedRef} style={{ opacity: 0 }}>
            <line x1="450" y1="330" x2="508" y2="330" stroke={WARN_COLOR} strokeWidth="1.6" strokeDasharray="4 3" markerEnd="url(#gpp12-arrow-block)" />
            <text x="452" y="352" fontSize="11" fontWeight="700" fill={WARN_COLOR}>子类不能直连引擎 ✗</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="396" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="420" fontSize="12" fontWeight="700" fill={OK_COLOR}>子类的世界被限制在基类给的操作集合里</text>
            <text x="56" y="440" fontSize="11" fill="var(--text-secondary)">对引擎的依赖收敛到基类一处 → 与引擎解耦，子类更易复用与维护</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基类提供受保护的沙箱操作，子类只组合这些操作定义行为，绝不直连引擎。所有对引擎的依赖收敛到基类一处。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        子类沙箱（Subclass Sandbox）：基类提供一组受保护的"沙箱操作"（如移动、播放音效、
        生成粒子），子类只通过组合这些操作来定义自己的行为，绝不直接依赖引擎的其余部分。
      </figcaption>
    </figure>
  );
}
