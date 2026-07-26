"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh14ComponentEntity>：实体-组件组合机制动画（GPP 第14章 · 图1）。
 *
 * 核心：把一个实体拆成若干可独立复用的组件（输入/物理/图形/AI…），用组合代替庞大的继承类树。
 *
 * 场景：游戏角色 Bjørn 不再是一个巨型 Bjørn 类，而是一个容器，装着 InputComponent、
 * PhysicsComponent、GraphicsComponent、AIComponent。换一个角色只需换组件组合。
 *
 * 节拍：
 *  ① 实体 Entity（Bjørn）是容器，本身几乎不含逻辑
 *  ② 装配 InputComponent：读输入，写出本帧意图
 *  ③ 装配 PhysicsComponent：读意图，算位置/碰撞
 *  ④ 装配 GraphicsComponent：读位置，画 sprite
 *  ⑤ 组件按约定通信：Input →（意图）→ Physics →（位置）→ Graphics
 *  ⑥ 换组件搭配即换角色：Input 换成 AI 就是 NPC；用组合代替巨型继承类
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;

type ComponentDef = { id: string; name: string; emoji: string; color: string; duty: string; x: number; y: number };

const COMPONENTS: readonly ComponentDef[] = [
  { id: "input", name: "InputComponent", emoji: "🎮", color: "#5AA9E6", duty: "读输入，写本帧意图", x: 84, y: 144 },
  { id: "physics", name: "PhysicsComponent", emoji: "⚙️", color: "#E5B567", duty: "读意图，算位置/碰撞", x: 260, y: 144 },
  { id: "graphics", name: "GraphicsComponent", emoji: "🖼️", color: "#C792EA", duty: "读位置，画 sprite", x: 84, y: 252 },
  { id: "ai", name: "AIComponent", emoji: "🧠", color: "#3FB97F", duty: "为 NPC 决策（替代 Input）", x: 260, y: 252 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "entity", caption: "实体 Entity（Bjørn）只是一个容器，本身几乎不含逻辑" },
  { label: "input", caption: "装配 InputComponent：读取输入，写出本帧意图" },
  { label: "physics", caption: "装配 PhysicsComponent：读取意图，计算位置与碰撞" },
  { label: "graphics", caption: "装配 GraphicsComponent：读取位置，画出 sprite/动画" },
  { label: "communicate", caption: "组件按约定通信：Input →（意图）→ Physics →（位置）→ Graphics" },
  { label: "insight", caption: "换组件搭配即换角色：Input 换成 AI 就是 NPC；用组合代替巨型继承类，组件可复用可解耦" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh14ComponentEntity() {
  const entityRef = useRef<SVGGElement | null>(null);
  const compRefs = useRef<Record<string, SVGGElement | null>>({});
  const flowRef = useRef<SVGGElement | null>(null);
  const aiSwapRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① entity（t: 0→T）：容器浮现
      tl.add(entityRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("entity", 0);

      // ② input（t: T→2T）
      tl.add(compRefs.current["input"]!, { opacity: [0, 1], scale: [0.7, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("input", T);

      // ③ physics（t: 2T→3T）
      tl.add(compRefs.current["physics"]!, { opacity: [0, 1], scale: [0.7, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("physics", T * 2);

      // ④ graphics（t: 3T→4T）
      tl.add(compRefs.current["graphics"]!, { opacity: [0, 1], scale: [0.7, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("graphics", T * 3);

      // ⑤ communicate（t: 4T→5T）：通信箭头亮起
      tl.add(flowRef.current!, { opacity: [0, 1], duration: T * 0.7, ease: "out(3)" }, T * 4);
      tl.label("communicate", T * 4);

      // ⑥ insight（t: 5T→6T）：AI 替换 + 结论
      tl.add(aiSwapRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 5);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5.2);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧩</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="组件模式机制动画。实体 Bjørn 只是一个容器，本身几乎不含逻辑。依次装配 InputComponent 读输入写意图、PhysicsComponent 读意图算位置与碰撞、GraphicsComponent 读位置画 sprite。组件按约定通信：Input 把意图写给 Physics，Physics 把位置写给 Graphics，组件互不直接依赖。换组件搭配即换角色：把 Input 换成 AIComponent 就是 NPC。用组合代替巨型继承类树，组件可复用可解耦。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="gpp14-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={ACCENT} />
            </marker>
          </defs>

          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            组件：实体 = 可复用组件的组合
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            用组合代替巨型继承类；换角色只需换组件搭配
          </text>

          {/* Entity 容器 */}
          <g ref={entityRef} style={{ opacity: 0 }}>
            <rect x="60" y="80" width="380" height="300" rx="14" fill="var(--text-secondary)" fillOpacity="0.04" stroke="var(--border)" strokeWidth="1.6" strokeDasharray="6 4" />
            <text x="80" y="106" fontSize="13" fontWeight="700" fill="var(--text-primary)">🧝 实体 Entity（Bjørn）</text>
            <text x="80" y="124" fontSize="11" fill="var(--text-secondary)">容器：装一组组件，本身几乎不含逻辑</text>
          </g>

          {/* 组件卡片 */}
          {COMPONENTS.map((c) => (
            <g key={c.id} ref={(el) => { compRefs.current[c.id] = el; }} style={{ opacity: 0 }}>
              <rect x={c.x} y={c.y} width={160} height={92} rx="10" fill={c.color} fillOpacity="0.12" stroke={c.color} strokeWidth="1.5" />
              <text x={c.x + 14} y={c.y + 26} fontSize="16">{c.emoji}</text>
              <text x={c.x + 40} y={c.y + 24} fontSize="11" fontWeight="700" fill="var(--text-primary)">{c.name}</text>
              <text x={c.x + 14} y={c.y + 50} fontSize="11" fill="var(--text-secondary)">{c.duty}</text>
              <text x={c.x + 14} y={c.y + 70} fontSize="11" fill={OK_COLOR}>● 已装配</text>
            </g>
          ))}

          {/* 通信箭头 */}
          <g ref={flowRef} style={{ opacity: 0 }}>
            {/* Input → Physics（意图） */}
            <line x1="244" y1="190" x2="258" y2="190" stroke={ACCENT} strokeWidth="2" markerEnd="url(#gpp14-arrow)" />
            <text x="251" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>意图</text>
            {/* Physics → Graphics（位置） */}
            <path d="M 300 236 Q 260 250 210 250" fill="none" stroke={ACCENT} strokeWidth="2" markerEnd="url(#gpp14-arrow)" />
            <text x="252" y="262" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>位置</text>
            <text x="80" y="366" fontSize="11" fontWeight="700" fill={ACCENT}>组件互不直接依赖，只按约定通信</text>
          </g>

          {/* AI 替换高亮 */}
          <g ref={aiSwapRef} style={{ opacity: 0 }}>
            <rect x="256" y="248" width={168} height={100} rx="12" fill="none" stroke={OK_COLOR} strokeWidth="2.4" strokeDasharray="5 3" />
            <text x="470" y="120" fontSize="11" fontWeight="700" fill={OK_COLOR}>把 Input 换成 AI</text>
            <text x="470" y="140" fontSize="11" fill="var(--text-secondary)">→ 同一实体变成 NPC</text>
            <text x="470" y="162" fontSize="11" fill="var(--text-secondary)">换角色 = 换组件搭配</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="396" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="420" fontSize="12" fontWeight="700" fill={OK_COLOR}>用组合代替庞大的继承类树，避免"巨型类"</text>
            <text x="56" y="440" fontSize="11" fill="var(--text-secondary)">组件通过共享状态/消息按约定通信，互不直接依赖 → 可复用、可解耦</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="实体只是容器，行为来自装配的组件。组件按约定通信、互不依赖，换角色只需换组件搭配——用组合代替继承。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        组件（Component）：把一个实体拆成若干可独立复用的组件（输入、物理、图形、AI…），
        实体只是容纳组件的容器。用组合代替庞大的继承类树，避免"巨型类"与继承层次的纠缠。
      </figcaption>
    </figure>
  );
}
