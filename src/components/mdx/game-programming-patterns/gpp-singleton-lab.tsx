"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

/**
 * <GppSingletonLab> —— Ch06 Singleton 模式定制图解。
 * 视觉隐喻「全局访问点」：中心单例盒子是唯一实例，六个子系统沿径向连线
 * 汇聚到它——直观呈现"所有人找同一个对象"。右侧分解两个独立问题：
 * "唯一性约束"与"全局访问便利"，结尾给出替代方案。
 * 单 accent（amber）+ 中性底，无 emoji，label 打在动画起始时刻。
 */

const T = TEACHING_BEAT_MS;
const ACCENT = "#E5A54B"; // amber
const OK = "#3FB97F";
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";

const STEPS: readonly TeachingStep[] = [
  { label: "instance", caption: "① 中心：唯一实例 GameManager（静态 instance + 私有构造）" },
  { label: "systems", caption: "② 六个子系统通过 getInstance() 汇聚访问同一实例" },
  { label: "problem", caption: "③ 问题拆解：'唯一性'与'全局访问'是两个独立问题" },
  { label: "global", caption: "④ 全局变量风险：隐藏依赖、测试困难、初始化时机失控" },
  { label: "alt", caption: "⑤ 替代方案：依赖注入 / 参数传递，保留必要时的类静态成员" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

const VW = 900;
const VH = 420;

export function GppSingletonLab() {
  const instRef = useRef<SVGGElement>(null);
  const sysRefs = Array.from({ length: 6 }, () => useRef<SVGGElement>(null));
  const probRef = useRef<SVGGElement>(null);
  const globalRef = useRef<SVGGElement>(null);
  const altRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(instRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("instance", 0);
      sysRefs.forEach((r, i) => tl.add(r.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T));
      tl.label("systems", T);
      tl.add(probRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("problem", T * 2);
      tl.add(globalRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("global", T * 3);
      tl.add(altRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("alt", T * 4);
    },
  });

  const center = { x: 330, y: 200 };
  const systems = [
    { label: "UI", x: 100, y: 90 },
    { label: "AI", x: 560, y: 90 },
    { label: "Audio", x: 100, y: 300 },
    { label: "Physics", x: 560, y: 300 },
    { label: "Scripting", x: 70, y: 195 },
    { label: "Rendering", x: 590, y: 195 },
  ];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Design Pattern · Revisited</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Singleton — 把"唯一"与"好找"拆成两个问题</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Singleton 模式定制图解：中心唯一实例，六个子系统汇聚访问，右侧分解唯一性与全局访问两个问题，最后给出替代方案。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>所有系统都去找同一个对象——这就是便利，也是隐患</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>唯一性约束 ≠ 全局访问便利：两者可以分开处理</text>

          {/* ═══ 左区：唯一实例辐射 ═══ */}
          <g ref={instRef} style={{ opacity: 0 }}>
            <rect x={center.x-85} y={center.y-70} width={170} height={140} rx={12} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={center.x} y={center.y-36} textAnchor="middle" fontSize={13} fontWeight={700} fill={ACCENT}>GameManager</text>
            <line x1={center.x-75} y1={center.y-24} x2={center.x+75} y2={center.y-24} stroke={LINE} strokeWidth={1} />
            <text x={center.x} y={center.y-2} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill={MUTE}>- instance</text>
            <text x={center.x} y={center.y+18} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill={MUTE}>- score: int</text>
            <line x1={center.x-75} y1={center.y+28} x2={center.x+75} y2={center.y+28} stroke={LINE} strokeWidth={1} />
            <text x={center.x} y={center.y+50} textAnchor="middle" fontSize={11} fontWeight={600} fill={ACCENT}>+ getInstance()</text>
          </g>
          {systems.map((s, i) => (
            <g key={s.label} ref={sysRefs[i]} style={{ opacity: 0 }}>
              <line x1={s.x} y1={s.y} x2={center.x} y2={center.y} stroke={LINE} strokeWidth={1} strokeDasharray="4,3" />
              <rect x={s.x-42} y={s.y-18} width={84} height={36} rx={8} fill="var(--bg)" stroke={LINE} strokeWidth={1.2} />
              <text x={s.x} y={s.y+4} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK}>{s.label}</text>
            </g>
          ))}
          <g ref={sysRefs[0]} style={{ opacity: 0 }}>
            <text x={180} y={82} textAnchor="middle" fontSize={11} fill={MUTE}>getInstance()</text>
          </g>

          {/* ═══ 右区：问题分解 + 替代 ═══ */}
          <g ref={probRef} style={{ opacity: 0 }}>
            <text x={700} y={90} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>两个独立问题</text>
            <rect x={540} y={106} width={140} height={70} rx={10} fill="var(--bg)" stroke={ACCENT} strokeWidth={1.5} />
            <text x={610} y={134} textAnchor="middle" fontSize={11} fontWeight={600} fill={ACCENT}>① 唯一性约束</text>
            <text x={610} y={156} textAnchor="middle" fontSize={11} fill={MUTE}>限制类只有一个实例</text>
            <rect x={720} y={106} width={140} height={70} rx={10} fill="var(--bg)" stroke={LINE} strokeWidth={1.5} />
            <text x={790} y={134} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK}>② 全局访问</text>
            <text x={790} y={156} textAnchor="middle" fontSize={11} fill={MUTE}>处处方便取用</text>
          </g>
          <g ref={globalRef} style={{ opacity: 0 }}>
            <rect x={540} y={196} width={320} height={86} rx={10} fill="#E5675C" opacity={0.08} stroke="#E5675C" strokeWidth={1.4} />
            <text x={556} y={222} fontSize={11} fontWeight={700} fill="#E5675C">全局变量的三个代价</text>
            <text x={556} y={244} fontSize={11} fill={MUTE}>隐藏依赖：代码到处可用，测试无从注入</text>
            <text x={556} y={264} fontSize={11} fill={MUTE}>初始化失控：惰性初始化时机不受你控制</text>
          </g>
          <g ref={altRef} style={{ opacity: 0 }}>
            <rect x={540} y={300} width={320} height={70} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.4} />
            <text x={556} y={326} fontSize={11} fontWeight={700} fill={OK}>替代方案</text>
            <text x={556} y={348} fontSize={11} fill={MUTE}>依赖注入 / 参数传递：唯一性保留，访问走显式通道</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="把'只有一个'（静态成员）与'到处能拿'（全局变量）分开——你常常只需要前者。" />
      </div>
    </div>
  );
}