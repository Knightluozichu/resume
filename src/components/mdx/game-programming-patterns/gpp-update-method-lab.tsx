"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

/**
 * <GppUpdateMethodLab> —— Ch10 Update Method 模式定制图解。
 * 视觉隐喻「逐帧推进的实体队列」：GameWorld 每帧遍历实体列表，逐个调用
 * update(dt)——实体把长行为切成逐帧片段。单 accent（cobalt）+ 中性底。
 */

const T = TEACHING_BEAT_MS;
const ACCENT = "#5A9AE6"; // cobalt
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";

const STEPS: readonly TeachingStep[] = [
  { label: "world", caption: "① GameWorld：持有实体列表，每帧遍历调用 update(dt)" },
  { label: "e1", caption: "② 敌人 A：update(dt) 按 dt 推进追击状态" },
  { label: "e2", caption: "③ 敌人 B / 弹幕 / 粒子：逐个 update(dt)，同一帧内按序执行" },
  { label: "next", caption: "④ 下一帧继续：长行为（巡逻→追击→攻击）被切成逐帧片段" },
  { label: "caution", caption: "⑤ 注意：遍历中修改列表会踩空；休眠对象要跳过" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

const VW = 900;
const VH = 420;

export function GppUpdateMethodLab() {
  const worldRef = useRef<SVGGElement>(null);
  const entRefs = Array.from({ length: 4 }, () => useRef<SVGGElement>(null));
  const nextRef = useRef<SVGGElement>(null);
  const cautionRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(worldRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("world", 0);
      tl.add(entRefs[0].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      tl.label("e1", T);
      entRefs.slice(1).forEach((r) => tl.add(r.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2));
      tl.label("e2", T * 2);
      tl.add(nextRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("next", T * 3);
      tl.add(cautionRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("caution", T * 4);
    },
  });

  const ents = [
    { x: 150, label: "敌人 A", state: "追击中", icon: "追" },
    { x: 350, label: "敌人 B", state: "巡逻中", icon: "巡" },
    { x: 550, label: "弹幕", state: "飞行中", icon: "弹" },
    { x: 750, label: "粒子", state: "消散中", icon: "粒" },
  ];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Sequencing Pattern · Update Method</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Update Method — 让每个实体自己决定每帧做什么</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Update Method 模式定制图解：游戏世界每帧遍历实体列表逐个调用 update，长行为切成逐帧片段。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>世界只负责喊"这一帧开始了"，实体各自响应</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>长行为（巡逻→追击→攻击）被切成逐帧可恢复的更新片段</text>

          {/* GameWorld 容器 */}
          <g ref={worldRef} style={{ opacity: 0 }}>
            <rect x={60} y={90} width={780} height={90} rx={14} fill={ACCENT} opacity={0.08} stroke={ACCENT} strokeWidth={2} />
            <text x={450} y={118} textAnchor="middle" fontSize={13} fontWeight={700} fill={ACCENT}>GameWorld</text>
            <text x={450} y={140} textAnchor="middle" fontSize={11} fill={MUTE}>实体列表：敌人 ×2 · 弹幕 ×1 · 粒子 ×1</text>
            <text x={450} y={162} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill={MUTE}>update(): for each entity → entity.update(dt)</text>
          </g>

          {/* 实体列 */}
          {ents.map((e, i) => (
            <g key={e.label} ref={entRefs[i]} style={{ opacity: 0 }}>
              <rect x={e.x-70} y={230} width={140} height={100} rx={12} fill="var(--bg)" stroke={LINE} strokeWidth={1.5} />
              <text x={e.x} y={262} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{e.icon}</text>
              <text x={e.x} y={286} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK}>{e.label}</text>
              <text x={e.x} y={308} textAnchor="middle" fontSize={11} fill={OK}>update(dt) ✓</text>
            </g>
          ))}

          {/* 下一帧说明 */}
          <g ref={nextRef} style={{ opacity: 0 }}>
            <rect x={60} y={260} width={90} height={60} rx={10} fill="var(--bg)" stroke={ACCENT} strokeWidth={1.4} />
            <text x={105} y={284} textAnchor="middle" fontSize={11} fontWeight={600} fill={ACCENT}>每帧</text>
            <text x={105} y={304} textAnchor="middle" fontSize={11} fill={MUTE}>遍历</text>
            <path d="M 60 290 L 40 290 L 40 280 L 20 290 L 40 300 L 40 290" fill="none" stroke={ACCENT} strokeWidth={1.2} />
          </g>

          {/* 注意 */}
          <g ref={cautionRef} style={{ opacity: 0 }}>
            <rect x={60} y={360} width={780} height={40} rx={10} fill="#E5675C" opacity={0.08} stroke="#E5675C" strokeWidth={1.3} />
            <text x={450} y={385} textAnchor="middle" fontSize={11} fontWeight={700} fill="#E5675C">注意：遍历中增删实体列表会踩空；休眠/停用对象应跳过 update</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="把 AI 行为、物理、动画都做成 update(dt)：世界循环简单，实体各自负责自己的那一帧。" />
      </div>
    </div>
  );
}