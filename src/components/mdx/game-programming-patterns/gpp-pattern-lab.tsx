"use client";

import { useRef, useState, useCallback } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const C = { bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)", primary: "var(--text-primary)", secondary: "var(--text-secondary)", accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)" } as const;
const T = TEACHING_BEAT_MS;

const VW = 900; const VH = 420;

// ═══════════ Ch01 游戏架构：系统点亮 ═══════════
const ARCH_STEPS: readonly TeachingStep[] = [
  { label: "loop", caption: "① 游戏循环在中心：每帧驱动全部系统" },
  { label: "render", caption: "② 渲染系统：把世界状态画到屏幕" },
  { label: "physics", caption: "③ 物理系统：碰撞与刚体模拟" },
  { label: "audio", caption: "④ 音频系统：音效与混音" },
  { label: "ai", caption: "⑤ AI 系统：决策树与寻路" },
  { label: "input", caption: "⑥ 输入系统：读取外设" },
  { label: "script", caption: "⑦ 脚本系统：数据驱动行为" },
];
const ARCH_LABEL: Record<string, string> = Object.fromEntries(ARCH_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function ArchViz({ fault }: { fault: boolean }) {
  const loopRef = useRef<SVGGElement>(null);
  const sysRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null)];
  const timeline = useTeachingTimeline({
    steps: ARCH_STEPS,
    build: (tl) => {
      tl.add(loopRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("loop", 0);
      sysRefs.forEach((r, i) => {
        tl.add(r.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * (i + 1));
        tl.label(ARCH_STEPS[i + 1].label, T * (i + 1));
      });
    },
  });
  const systems = [
    { x: 120, y: 70, label: "Rendering", color: C.success },
    { x: 450, y: 60, label: "Physics", color: C.warning },
    { x: 700, y: 100, label: "Audio", color: C.danger },
    { x: 100, y: 260, label: "AI", color: "#8b5cf6" },
    { x: 500, y: 300, label: "Input", color: C.accent },
    { x: 720, y: 280, label: "Scripting", color: "#ec4899" },
  ];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="游戏系统架构动画。游戏循环在中心，每帧驱动渲染、物理、音频、AI、输入、脚本六个系统。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>游戏系统架构</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>各系统在每帧循环中协作</text>
        <g ref={loopRef} style={{ opacity: 0 }}>
          <rect x={370} y={160} width={160} height={60} rx={30} fill={C.accent} opacity={0.9} />
          <text x={450} y={196} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.bg}>Game Loop</text>
        </g>
        {systems.map((s, i) => (
          <g key={s.label} ref={sysRefs[i]} style={{ opacity: 0 }}>
            <line x1={s.x + (s.x>450?-60:60)} y1={s.y} x2={370 + (s.x>450?160:0)} y2={190} stroke={C.border} strokeWidth={1} opacity={0.5} />
            <rect x={s.x-60} y={s.y-20} width={120} height={40} rx={20} fill={s.color} opacity={0.15} stroke={s.color} strokeWidth={1.5} />
            <text x={s.x} y={s.y+4} textAnchor="middle" fontSize={11} fontWeight={600} fill={s.color}>{s.label}</text>
          </g>
        ))}
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 可变时间步长导致物理表现不一致。修法：固定时间步 + 累计剩余时间</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={ARCH_LABEL} caption="游戏循环是心脏：每帧按顺序驱动所有系统，各系统只负责自己的领域。" />
    </>
  );
}

// ═══════════ Ch02 Command：类图 + 序列图 ═══════════
const CMD_STEPS: readonly TeachingStep[] = [
  { label: "iface", caption: "① Command 接口：声明 execute() 与 undo()" },
  { label: "concrete", caption: "② JumpCommand 实现接口，绑定 Player 接收者" },
  { label: "receiver", caption: "③ Player 接收者：知道如何执行实际操作" },
  { label: "invoker", caption: "④ InputHandler 调用者：把输入转成命令" },
  { label: "seq", caption: "⑤ 序列：create → execute() → player.jump() 解耦" },
];
const CMD_LABEL: Record<string, string> = Object.fromEntries(CMD_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function CommandViz({ fault }: { fault: boolean }) {
  const ifaceRef = useRef<SVGGElement>(null);
  const concreteRef = useRef<SVGGElement>(null);
  const receiverRef = useRef<SVGGElement>(null);
  const invokerRef = useRef<SVGGElement>(null);
  const seqRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: CMD_STEPS,
    build: (tl) => {
      tl.add(ifaceRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("iface", 0);
      tl.add(concreteRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("concrete", T);
      tl.add(receiverRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("receiver", T * 2);
      tl.add(invokerRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("invoker", T * 3);
      tl.add(seqRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("seq", T * 4);
    },
  });
  const cx = 180;
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Command 模式类图与序列图动画。接口、具体命令、接收者、调用者逐步点亮，最后演示 create、execute、jump 消息序列。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Command 模式：UML 类图 + 序列图</text>
        <g ref={ifaceRef} style={{ opacity: 0 }}>
          <rect x={cx-80} y={60} width={160} height={56} rx={6} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
          <text x={cx} y={80} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.accent}>«interface»</text>
          <text x={cx} y={96} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Command</text>
          <text x={cx} y={112} textAnchor="middle" fontSize={11} fill={C.secondary}>+ execute() ; + undo()</text>
        </g>
        <g ref={concreteRef} style={{ opacity: 0 }}>
          <line x1={cx-20} y1={140} x2={cx-20} y2={116} stroke={C.success} strokeWidth={1.5} strokeDasharray="5,3" />
          <polygon points={`${cx-24},${120} ${cx-20},${116} ${cx-16},${120}`} fill={C.success} />
          <rect x={cx-80} y={140} width={160} height={56} rx={6} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
          <text x={cx} y={160} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>JumpCommand</text>
          <text x={cx} y={178} textAnchor="middle" fontSize={11} fill={C.secondary}>- receiver: Player</text>
          <text x={cx} y={194} textAnchor="middle" fontSize={11} fill={C.success}>+ execute()</text>
        </g>
        <g ref={receiverRef} style={{ opacity: 0 }}>
          <line x1={cx} y1={196} x2={cx} y2={220} stroke={C.warning} strokeWidth={1} />
          <rect x={cx-80} y={220} width={160} height={50} rx={6} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
          <text x={cx} y={240} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Player</text>
          <text x={cx} y={260} textAnchor="middle" fontSize={11} fill={C.warning}>+ jump() ; + fire()</text>
        </g>
        <g ref={invokerRef} style={{ opacity: 0 }}>
          <rect x={cx-80} y={300} width={160} height={50} rx={6} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
          <text x={cx} y={320} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>InputHandler</text>
          <text x={cx} y={340} textAnchor="middle" fontSize={11} fill={C.accent}>+ handleInput(): Command</text>
        </g>
        <g ref={seqRef} style={{ opacity: 0 }}>
          <text x={560} y={60} fontSize={12} fontWeight={600} fill={C.primary}>执行序列</text>
          <line x1={480} y1={80} x2={480} y2={380} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
          <line x1={600} y1={80} x2={600} y2={380} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
          <line x1={720} y1={80} x2={720} y2={380} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
          <text x={480} y={76} textAnchor="middle" fontSize={11} fill={C.primary}>InputHandler</text>
          <text x={600} y={76} textAnchor="middle" fontSize={11} fill={C.primary}>Command</text>
          <text x={720} y={76} textAnchor="middle" fontSize={11} fill={C.primary}>Player</text>
          <line x1={500} y1={100} x2={580} y2={100} stroke={C.accent} strokeWidth={1.5} />
          <polygon points={`${576},${96} ${580},${100} ${576},${104}`} fill={C.accent} />
          <text x={540} y={94} textAnchor="middle" fontSize={11} fill={C.accent}>create</text>
          <line x1={500} y1={140} x2={580} y2={140} stroke={C.success} strokeWidth={1.5} />
          <polygon points={`${576},${136} ${580},${140} ${576},${144}`} fill={C.success} />
          <text x={540} y={134} textAnchor="middle" fontSize={11} fill={C.success}>execute()</text>
          <line x1={620} y1={180} x2={700} y2={180} stroke={C.warning} strokeWidth={1.5} />
          <polygon points={`${696},${176} ${700},${180} ${696},${184}`} fill={C.warning} />
          <text x={660} y={174} textAnchor="middle" fontSize={11} fill={C.warning}>player.jump()</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 硬编码：直接在输入处理中调用 player.jump()，无法重绑定/回放/撤销</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={CMD_LABEL} caption="输入被转成命令对象：调用者与执行者解耦，才能支持撤销、重放、AI 与按键重绑定。" />
    </>
  );
}

// ═══════════ Ch07 State：状态机图 ═══════════
const STATE_STEPS: readonly TeachingStep[] = [
  { label: "idle", caption: "① 角色处于 Idle：按空格触发跳跃" },
  { label: "jump", caption: "② 跳转 Jumping：落地回到 Idle" },
  { label: "run", caption: "③ 跳转 Running：停止回 Idle" },
  { label: "attack", caption: "④ 跳转 Attacking：攻击结束回 Idle" },
];
const STATE_LABEL: Record<string, string> = Object.fromEntries(STATE_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function StateViz({ fault }: { fault: boolean }) {
  const idleRef = useRef<SVGGElement>(null);
  const jumpRef = useRef<SVGGElement>(null);
  const runRef = useRef<SVGGElement>(null);
  const atkRef = useRef<SVGGElement>(null);
  const lineRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null)];
  const timeline = useTeachingTimeline({
    steps: STATE_STEPS,
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
      tl.label("attack", T * 3);
    },
  });
  const states = [
    { x: 120, y: 160, ref: idleRef, label: "Idle", event: "按空格" },
    { x: 330, y: 80, ref: jumpRef, label: "Jumping", event: "落地" },
    { x: 330, y: 260, ref: runRef, label: "Running", event: "停止" },
    { x: 540, y: 160, ref: atkRef, label: "Attacking", event: "攻击结束" },
  ];
  const lines = [
    { from: 0, to: 1, ref: lineRefs[0] },
    { from: 0, to: 2, ref: lineRefs[1] },
    { from: 0, to: 3, ref: lineRefs[2] },
  ];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="State 模式状态机图动画。Idle、Jumping、Running、Attacking 四个状态逐个点亮，转换箭头带事件标签。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>State 模式：状态机图</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>每个状态封装自己的行为，转换由事件触发</text>
        <defs><marker id="st-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={C.border} /></marker></defs>
        {lines.map((l, i) => {
          const a = states[l.from]; const b = states[l.to];
          return (
            <g key={i} ref={l.ref} style={{ opacity: 0 }}>
              <line x1={a.x+55} y1={a.y} x2={b.x-55} y2={b.y} stroke={C.border} strokeWidth={1.5} markerEnd="url(#st-arrow)" />
              <text x={(a.x+b.x)/2} y={(a.y+b.y)/2-10} textAnchor="middle" fontSize={11} fill={C.secondary}>{a.event}</text>
            </g>
          );
        })}
        {states.map((s) => (
          <g key={s.label} ref={s.ref} style={{ opacity: 0 }}>
            <rect x={s.x-55} y={s.y-22} width={110} height={44} rx={22} fill={C.accent} opacity={0.15} stroke={C.accent} strokeWidth={1.5} />
            <text x={s.x} y={s.y+4} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>{s.label}</text>
          </g>
        ))}
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 条件爆炸：用 switch 处理所有状态组合，代码膨胀且难以维护</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={STATE_LABEL} caption="状态封装行为，转换由事件触发——增删状态无需改动其他状态。" />
    </>
  );
}

// ═══════════ Ch09 Game Loop：循环流程 ═══════════
const LOOP_STEPS: readonly TeachingStep[] = [
  { label: "input", caption: "① ProcessInput：读取键盘/鼠标/手柄输入" },
  { label: "update", caption: "② Update：推进世界状态（物理/AI/动画）" },
  { label: "render", caption: "③ Render：绘制当前帧到屏幕" },
  { label: "cycle", caption: "④ 循环回跳：每帧重复，游戏运行" },
];
const LOOP_LABEL: Record<string, string> = Object.fromEntries(LOOP_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function GameLoopViz({ fault }: { fault: boolean }) {
  const inputRef = useRef<SVGGElement>(null);
  const updateRef = useRef<SVGGElement>(null);
  const renderRef = useRef<SVGGElement>(null);
  const cycleRef = useRef<SVGGElement>(null);
  const arwRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null)];
  const timeline = useTeachingTimeline({
    steps: LOOP_STEPS,
    build: (tl) => {
      tl.add(inputRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("input", 0);
      tl.add(arwRefs[0].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      tl.add(updateRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("update", T);
      tl.add(arwRefs[1].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2);
      tl.add(renderRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("render", T * 2);
      tl.add(cycleRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("cycle", T * 3);
    },
  });
  const phases = [
    { x: 150, ref: inputRef, label: "ProcessInput", desc: "读取外设输入", icon: "⌨️" },
    { x: 380, ref: updateRef, label: "Update", desc: "推进世界状态", icon: "⚙️" },
    { x: 610, ref: renderRef, label: "Render", desc: "绘制当前帧", icon: "🎨" },
  ];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="游戏循环流程图动画。ProcessInput、Update、Render 三个阶段逐个点亮，最后点亮循环回跳箭头。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>游戏循环：处理输入 → 更新 → 渲染</text>
        <defs><marker id="gl-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={C.accent} /></marker></defs>
        {phases.map((p, i) => (
          <g key={p.label} ref={p.ref} style={{ opacity: 0 }}>
            <rect x={p.x-80} y={140} width={160} height={100} rx={12} fill={C.accent} opacity={0.12} stroke={C.accent} strokeWidth={1.5} />
            <text x={p.x} y={172} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.primary}>{p.label}</text>
            <text x={p.x} y={198} textAnchor="middle" fontSize={11} fill={C.secondary}>{p.desc}</text>
            <text x={p.x} y={222} textAnchor="middle" fontSize={32}>{p.icon}</text>
            {i < 2 && <g ref={arwRefs[i]} style={{ opacity: 0 }}><line x1={p.x+80} y1={190} x2={phases[i+1].x-80} y2={190} stroke={C.accent} strokeWidth={2} markerEnd="url(#gl-arrow)" /></g>}
          </g>
        ))}
        <g ref={cycleRef} style={{ opacity: 0 }}>
          <path d={`M ${phases[2].x} ${240} L ${phases[2].x} ${300} L ${phases[0].x} ${300} L ${phases[0].x} ${240}`} fill="none" stroke={C.success} strokeWidth={1.5} strokeDasharray="5,3" markerEnd="url(#gl-arrow)" />
          <text x={(phases[0].x+phases[2].x)/2} y={320} textAnchor="middle" fontSize={11} fill={C.success}>⭮ 循环（每帧）</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 可变时间步长导致物理抖动量不守恒。修法：固定时间步 + 累计剩余时间</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={LOOP_LABEL} caption="三个步骤每帧循环；Update 与 Render 分离让渲染频率可独立控制。" />
    </>
  );
}

// ═══════════ Ch14 Component：组合架构 ═══════════
const COMP_STEPS: readonly TeachingStep[] = [
  { label: "container", caption: "① GameObject 容器：管理生命周期与组件增删" },
  { label: "input", caption: "② InputComponent：处理输入" },
  { label: "physics", caption: "③ PhysicsComponent：碰撞与刚体" },
  { label: "graphics", caption: "④ GraphicsComponent：渲染模型" },
  { label: "audio", caption: "⑤ AudioComponent + HealthComponent：音效与血量" },
  { label: "ai", caption: "⑥ AIComponent + 组件间消息通信" },
];
const COMP_LABEL: Record<string, string> = Object.fromEntries(COMP_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function ComponentViz({ fault }: { fault: boolean }) {
  const boxRef = useRef<SVGGElement>(null);
  const compRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null)];
  const msgRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: COMP_STEPS,
    build: (tl) => {
      tl.add(boxRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("container", 0);
      compRefs.slice(0, 3).forEach((r, i) => {
        tl.add(r.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * (i + 1));
        tl.label(COMP_STEPS[i + 1].label, T * (i + 1));
      });
      compRefs.slice(3, 5).forEach((r, i) => {
        tl.add(r.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4);
      });
      tl.label("audio", T * 4);
      tl.add(compRefs[5].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 5);
      tl.add(msgRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 5);
      tl.label("ai", T * 5);
    },
  });
  const comps = [
    { x: 210, y: 155, label: "InputComponent", color: C.accent, desc: "处理输入" },
    { x: 400, y: 155, label: "PhysicsComponent", color: C.warning, desc: "碰撞刚体" },
    { x: 530, y: 155, label: "GraphicsComponent", color: C.success, desc: "渲染模型" },
    { x: 210, y: 240, label: "AudioComponent", color: C.danger, desc: "音效管理" },
    { x: 400, y: 240, label: "HealthComponent", color: "#8b5cf6", desc: "血量状态" },
    { x: 530, y: 240, label: "AIComponent", color: "#ec4899", desc: "行为决策" },
  ];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Component 模式架构图动画。GameObject 容器先点亮，随后六个组件逐个点亮，最后组件间消息通信线点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Component 模式：用组合替代继承</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>GameObject 作为容器，持有多个 Component 实例</text>
        <g ref={boxRef} style={{ opacity: 0 }}>
          <rect x={180} y={80} width={540} height={280} rx={14} fill={C.elevated} stroke={C.accent} strokeWidth={2} />
          <text x={450} y={110} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.accent}>GameObject</text>
          <text x={450} y={130} textAnchor="middle" fontSize={11} fill={C.secondary}>容器 · 管理生命周期 · 组件间消息转发</text>
        </g>
        {comps.map((c, i) => (
          <g key={c.label} ref={compRefs[i]} style={{ opacity: 0 }}>
            <rect x={c.x} y={c.y} width={160} height={60} rx={8} fill={c.color} opacity={0.12} stroke={c.color} strokeWidth={1.5} />
            <text x={c.x + 80} y={c.y + 24} textAnchor="middle" fontSize={11} fontWeight={600} fill={c.color}>{c.label}</text>
            <text x={c.x + 80} y={c.y + 44} textAnchor="middle" fontSize={11} fill={C.secondary}>{c.desc}</text>
          </g>
        ))}
        <g ref={msgRef} style={{ opacity: 0 }}>
          <line x1={370} y1={185} x2={400} y2={185} stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
          <line x1={560} y1={185} x2={530} y2={185} stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
          <line x1={370} y1={270} x2={400} y2={270} stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
          <line x1={560} y1={270} x2={530} y2={270} stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 上帝类：一个类包含所有功能，上万行代码。修法：按功能拆分为独立 Component</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={COMP_LABEL} caption="组件各司其职，GameObject 只做容器；新能力 = 新组件，不破坏已有代码。" />
    </>
  );
}

// ═══════════ Ch03 Flyweight：共享池 ═══════════
const FW_STEPS: readonly TeachingStep[] = [
  { label: "factory", caption: "① FlyweightFactory：按 key 管理共享对象池" },
  { label: "pool", caption: "② 共享池：Oak/Pine/Birch/Grass/Rock 各一份" },
  { label: "c1", caption: "③ Client 1 共享 Tree:Oak：只传位置/缩放等外部状态" },
  { label: "c2", caption: "④ Client 2 共享同一份 Tree:Oak，省内存" },
  { label: "c3", caption: "⑤ Client 3 继续共享：N 棵树只需 1 份内部状态" },
];
const FW_LABEL: Record<string, string> = Object.fromEntries(FW_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function FlyweightViz({ fault }: { fault: boolean }) {
  const factoryRef = useRef<SVGGElement>(null);
  const poolRef = useRef<SVGGElement>(null);
  const cRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null)];
  const timeline = useTeachingTimeline({
    steps: FW_STEPS,
    build: (tl) => {
      tl.add(factoryRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("factory", 0);
      tl.add(poolRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("pool", T);
      cRefs.forEach((r, i) => {
        tl.add(r.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * (i + 2));
        tl.label(FW_STEPS[i + 2].label, T * (i + 2));
      });
    },
  });
  const clients = [
    { y: 80, pos: "x=10, y=20, scale=1" },
    { y: 150, pos: "x=30, y=40, scale=1.5" },
    { y: 220, pos: "x=5, y=80, scale=0.8" },
  ];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Flyweight 模式享元对象池动画。工厂、共享池、三个客户端逐个点亮，展示内部状态共享与外部状态分离。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Flyweight 模式：共享对象池</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>内部状态（共享） + 外部状态（上下文传入）</text>
        <g ref={factoryRef} style={{ opacity: 0 }}>
          <rect x={40} y={80} width={200} height={280} rx={10} fill={C.elevated} stroke={C.accent} strokeWidth={2} />
          <text x={140} y={108} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.accent}>FlyweightFactory</text>
          <text x={140} y={128} textAnchor="middle" fontSize={11} fill={C.secondary}>getFlyweight(key)</text>
        </g>
        <g ref={poolRef} style={{ opacity: 0 }}>
          {["Tree:Oak", "Tree:Pine", "Tree:Birch", "Grass", "Rock"].map((l, i) => (
            <g key={i}>
              <rect x={60} y={150+i*38} width={160} height={32} rx={6} fill={C.success} opacity={0.15} stroke={C.success} strokeWidth={1} />
              <text x={140} y={171+i*38} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.success}>{l}</text>
            </g>
          ))}
        </g>
        {clients.map((cl, i) => (
          <g key={i} ref={cRefs[i]} style={{ opacity: 0 }}>
            <rect x={360} y={cl.y} width={160} height={50} rx={8} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
            <text x={440} y={cl.y+20} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Client {i+1}</text>
            <text x={440} y={cl.y+40} textAnchor="middle" fontSize={11} fill={C.warning}>{cl.pos}</text>
            <text x={320} y={cl.y+25} textAnchor="middle" fontSize={14} fill={C.success}>⬅ 共享</text>
          </g>
        ))}
        <text x={140} y={380} textAnchor="middle" fontSize={11} fill={C.secondary}>内部状态（共享，不可变）</text>
        <text x={440} y={380} textAnchor="middle" fontSize={11} fill={C.warning}>外部状态（每个客户端不同）</text>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 未区别内部/外部状态：每个对象独立存储全部数据，内存爆炸。修法：提取共享部分到 Flyweight</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={FW_LABEL} caption="一万棵橡树只占一份内部状态的内存；位置、缩放等外部状态由客户端持有。" />
    </>
  );
}

// ═══════════ Ch04 Observer：订阅发布 ═══════════
const OB_STEPS: readonly TeachingStep[] = [
  { label: "subject", caption: "① Subject 主题：维护观察者列表" },
  { label: "obs-a", caption: "② Observer A（UI）订阅主题" },
  { label: "obs-b", caption: "③ Observer B（成就）+ C（分析）订阅" },
  { label: "obs-d", caption: "④ Observer D（音频）订阅" },
  { label: "notify", caption: "⑤ notify()：向全部观察者广播 update()" },
];
const OB_LABEL: Record<string, string> = Object.fromEntries(OB_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function ObserverViz({ fault }: { fault: boolean }) {
  const subjectRef = useRef<SVGGElement>(null);
  const obsRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null)];
  const notifyRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: OB_STEPS,
    build: (tl) => {
      tl.add(subjectRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("subject", 0);
      obsRefs.forEach((r, i) => {
        const stepIdx = i === 0 ? 1 : i === 1 || i === 2 ? 2 : 3;
        tl.add(r.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * stepIdx);
        tl.label(OB_STEPS[stepIdx].label, T * stepIdx);
      });
      tl.add(notifyRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("notify", T * 4);
    },
  });
  const obs = ["Observer A: UI", "Observer B: Achievements", "Observer C: Analytics", "Observer D: Audio"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Observer 模式订阅发布动画。主题先点亮，四个观察者逐个订阅，最后 notify 广播箭头点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Observer 模式：订阅发布通知流</text>
        <defs><marker id="ob-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={C.accent} /></marker></defs>
        <g ref={subjectRef} style={{ opacity: 0 }}>
          <rect x={340} y={70} width={220} height={60} rx={10} fill={C.accent} opacity={0.9} />
          <text x={450} y={96} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.bg}>Subject（主题）</text>
          <text x={450} y={116} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.85)">+ attach(obs) ; + detach(obs) ; + notify()</text>
        </g>
        {obs.map((l, i) => (
          <g key={l} ref={obsRefs[i]} style={{ opacity: 0 }}>
            <rect x={190+i*140} y={180} width={130} height={50} rx={8} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
            <text x={255+i*140} y={200} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.primary}>{l.split(":")[0]}</text>
            <text x={255+i*140} y={220} textAnchor="middle" fontSize={11} fill={C.success}>{l.split(":")[1]}</text>
          </g>
        ))}
        <g ref={notifyRef} style={{ opacity: 0 }}>
          {obs.map((_, i) => (
            <line key={i} x1={340+i*140+65} y1={130} x2={255+i*140} y2={180} stroke={C.accent} strokeWidth={1.5} markerEnd="url(#ob-arrow)" />
          ))}
          <text x={450} y={280} textAnchor="middle" fontSize={11} fill={C.secondary}>notify() 遍历观察者列表，逐个调用 update()</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 观察者太多或通知太频繁导致性能问题。修法：事件队列异步处理，或合并批量通知</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={OB_LABEL} caption="主题变化自动通知所有观察者：UI、成就、分析、音频各自响应，互不干扰。" />
    </>
  );
}

// ═══════════ Ch05 Prototype：克隆层次 ═══════════
const PT_STEPS: readonly TeachingStep[] = [
  { label: "iface", caption: "① Prototype 接口：声明 clone() 方法" },
  { label: "monster", caption: "② 怪物原型：Skeleton / Goblin / Dragon 继承接口" },
  { label: "item", caption: "③ 道具原型：Item_Sword 也实现 clone()" },
  { label: "clone", caption: "④ 新怪物 = prototype.clone()：免子类爆炸快速生成" },
];
const PT_LABEL: Record<string, string> = Object.fromEntries(PT_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function PrototypeViz({ fault }: { fault: boolean }) {
  const ifaceRef = useRef<SVGGElement>(null);
  const protoRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null)];
  const cloneRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: PT_STEPS,
    build: (tl) => {
      tl.add(ifaceRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("iface", 0);
      protoRefs.slice(0, 3).forEach((r, i) => {
        tl.add(r.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      });
      tl.label("monster", T);
      tl.add(protoRefs[3].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2);
      tl.label("item", T * 2);
      tl.add(cloneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("clone", T * 3);
    },
  });
  const protos = ["Monster_Skeleton", "Monster_Goblin", "Monster_Dragon", "Item_Sword"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Prototype 模式克隆层次动画。接口、四个具体原型、克隆说明依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Prototype 模式：原型克隆</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>通过克隆现有对象创建新实例，避免子类爆炸</text>
        <g ref={ifaceRef} style={{ opacity: 0 }}>
          <rect x={60} y={80} width={140} height={50} rx={8} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
          <text x={130} y={100} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.accent}>«interface»</text>
          <text x={130} y={120} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Prototype</text>
          <text x={130} y={140} textAnchor="middle" fontSize={11} fill={C.accent}>+ clone()</text>
        </g>
        {protos.map((l, i) => {
          const x = 60 + (i%2) * 220; const y = 180 + Math.floor(i/2) * 80;
          return (
            <g key={l} ref={protoRefs[i]} style={{ opacity: 0 }}>
              <line x1={x+100-20} y1={y} x2={130} y2={130} stroke={C.success} strokeWidth={1.5} strokeDasharray="5,3" />
              <polygon points={`${x+100-24},${134} ${x+100-20},${130} ${x+100-16},${134}`} fill={C.success} />
              <rect x={x} y={y} width={200} height={60} rx={8} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
              <text x={x+100} y={y+24} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.primary}>{l}</text>
              <text x={x+100} y={y+44} textAnchor="middle" fontSize={11} fill={C.success}>health=100, speed=2.5</text>
            </g>
          );
        })}
        <g ref={cloneRef} style={{ opacity: 0 }}>
          <rect x={40} y={350} width={820} height={40} rx={10} fill={C.success} opacity={0.08} stroke={C.success} strokeWidth={1.6} />
          <text x={450} y={375} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.success}>新怪物 = prototype.clone() → 修改属性 → 快速生成</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 深拷贝 vs 浅拷贝陷阱：引用类型成员被共享修改。修法：实现深拷贝或使用写时复制</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={PT_LABEL} caption="每种怪物只需一个原型实例，运行时克隆并按需修改——新增怪物类型不再需要新子类。" />
    </>
  );
}

// ═══════════ Ch06 Singleton：唯一实例 ═══════════
const SG_STEPS: readonly TeachingStep[] = [
  { label: "class", caption: "① GameManager 类：静态实例 + 私有构造" },
  { label: "access", caption: "② 子系统通过 getInstance() 获取同一实例" },
  { label: "sharing", caption: "③ 全部系统共享一份全局状态" },
];
const SG_LABEL: Record<string, string> = Object.fromEntries(SG_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function SingletonViz({ fault }: { fault: boolean }) {
  const classRef = useRef<SVGGElement>(null);
  const accessRef = useRef<SVGGElement>(null);
  const shareRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: SG_STEPS,
    build: (tl) => {
      tl.add(classRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("class", 0);
      tl.add(accessRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("access", T);
      tl.add(shareRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("sharing", T * 2);
    },
  });
  const subs = ["UI System", "AI System", "Audio System", "Physics System", "Scripting", "Rendering"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Singleton 模式唯一实例动画。GameManager 类图先点亮，六个子系统访问线依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Singleton 模式：确保全局唯一实例</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>静态实例 + 私有构造 + 全局访问点</text>
        <g ref={classRef} style={{ opacity: 0 }}>
          <rect x={330} y={80} width={240} height={130} rx={12} fill={C.bg} stroke={C.accent} strokeWidth={2} />
          <text x={450} y={110} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.accent}>GameManager</text>
          <line x1={340} y1={120} x2={560} y2={120} stroke={C.border} strokeWidth={1} />
          <text x={450} y={140} textAnchor="middle" fontSize={11} fill={C.secondary}>- instance: GameManager</text>
          <text x={450} y={160} textAnchor="middle" fontSize={11} fill={C.secondary}>- score: int</text>
          <text x={450} y={180} textAnchor="middle" fontSize={11} fill={C.secondary}>- player: Player</text>
          <line x1={340} y1={188} x2={560} y2={188} stroke={C.border} strokeWidth={1} />
          <text x={450} y={206} textAnchor="middle" fontSize={11} fill={C.accent}>+ getInstance(): GameManager</text>
        </g>
        <g ref={accessRef} style={{ opacity: 0 }}>
          {subs.map((l, i) => {
            const x = 50 + (i%3) * 200; const y = 260 + Math.floor(i/3) * 60;
            return (
              <g key={l}>
                <rect x={x} y={y} width={170} height={40} rx={8} fill={C.bg} stroke={C.warning} strokeWidth={1} />
                <text x={x+85} y={y+24} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.primary}>{l}</text>
                <line x1={x+85} y1={y} x2={450} y2={210} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
              </g>
            );
          })}
        </g>
        <g ref={shareRef} style={{ opacity: 0 }}>
          <text x={450} y={390} textAnchor="middle" fontSize={11} fill={C.secondary}>所有子系统通过 GameManager.getInstance() 访问同一实例</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 全局状态使测试困难、并发不安全。修法：使用依赖注入或用参数传递，减少全局依赖</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={SG_LABEL} caption="全局唯一实例方便各处访问，但隐藏依赖会让测试与并发变难——用前需权衡。" />
    </>
  );
}

// ═══════════ Ch08 Double Buffer：缓冲交换 ═══════════
const DB_STEPS: readonly TeachingStep[] = [
  { label: "write", caption: "① 写入 Buffer A：新帧数据" },
  { label: "read", caption: "② Buffer B 供读取：上一帧数据" },
  { label: "swap", caption: "③ 交换：swap() 后 A 变可读、B 变可写" },
  { label: "cycle", caption: "④ 四步循环：写入→交换→读取→重复" },
];
const DB_LABEL: Record<string, string> = Object.fromEntries(DB_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function DoubleBufferViz({ fault }: { fault: boolean }) {
  const writeRef = useRef<SVGGElement>(null);
  const readRef = useRef<SVGGElement>(null);
  const swapRef = useRef<SVGGElement>(null);
  const cycleRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: DB_STEPS,
    build: (tl) => {
      tl.add(writeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("write", 0);
      tl.add(readRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("read", T);
      tl.add(swapRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("swap", T * 2);
      tl.add(cycleRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("cycle", T * 3);
    },
  });
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Double Buffer 双缓冲交换动画。写入缓冲、读取缓冲、交换箭头、四阶段流程依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Double Buffer 模式：交换缓冲区</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>写缓冲区 + 读缓冲区，交换避免撕裂</text>
        <g ref={writeRef} style={{ opacity: 0 }}>
          <rect x={120} y={90} width={200} height={160} rx={10} fill={C.bg} stroke={C.accent} strokeWidth={2} />
          <text x={220} y={120} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.accent}>Buffer A</text>
          <line x1={130} y1={130} x2={310} y2={130} stroke={C.border} strokeWidth={1} />
          {[0,1,2,3,4,5].map(i => <rect key={i} x={130+i*30} y={140} width={28} height={28} rx={3} fill={C.accent} opacity={0.3} />)}
          <text x={220} y={195} textAnchor="middle" fontSize={11} fill={C.secondary}>当前帧数据</text>
          <text x={220} y={215} textAnchor="middle" fontSize={11} fill={C.accent}>⬆ 写入中</text>
        </g>
        <g ref={swapRef} style={{ opacity: 0 }}>
          <text x={420} y={170} textAnchor="middle" fontSize={20} fill={C.warning}>⇄ swap</text>
          <text x={420} y={195} textAnchor="middle" fontSize={11} fill={C.secondary}>每帧交换</text>
        </g>
        <g ref={readRef} style={{ opacity: 0 }}>
          <rect x={520} y={90} width={200} height={160} rx={10} fill={C.bg} stroke={C.success} strokeWidth={2} />
          <text x={620} y={120} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.success}>Buffer B</text>
          <line x1={530} y1={130} x2={710} y2={130} stroke={C.border} strokeWidth={1} />
          {[0,1,2,3,4,5].map(i => <rect key={i} x={530+i*30} y={140} width={28} height={28} rx={3} fill={C.success} opacity={0.3} />)}
          <text x={620} y={195} textAnchor="middle" fontSize={11} fill={C.secondary}>上一帧数据</text>
          <text x={620} y={215} textAnchor="middle" fontSize={11} fill={C.success}>⬇ 读取中</text>
        </g>
        <g ref={cycleRef} style={{ opacity: 0 }}>
          <rect x={120} y={280} width={600} height={70} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
          {["1. 写入 Buffer A", "2. 交换 swap()", "3. 读取 Buffer B", "4. 重复"].map((l, i) => (
            <g key={l}>
              <rect x={130+i*150} y={290} width={140} height={30} rx={6} fill={C.elevated} stroke={C.accent} strokeWidth={1} />
              <text x={200+i*150} y={310} textAnchor="middle" fontSize={11} fill={C.primary}>{l}</text>
              {i < 3 && <text x={270+i*150} y={308} textAnchor="middle" fontSize={14} fill={C.border}>→</text>}
            </g>
          ))}
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 单缓冲区：写入时被读取显示半帧数据（撕裂）。修法：双缓冲隔离读写操作</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={DB_LABEL} caption="读写各用一块缓冲，每帧交换角色——显示永远不会看到写了一半的帧。" />
    </>
  );
}

const VIZ: Record<string, (p: { fault: boolean }) => React.ReactNode> = {
  "01": ArchViz, "02": CommandViz, "03": FlyweightViz, "04": ObserverViz, "05": PrototypeViz,
  "06": SingletonViz, "07": StateViz, "08": DoubleBufferViz, "09": GameLoopViz, "14": ComponentViz,
};

export function GppPatternLab({ chapter }: { chapter: string }) {
  const Viz = VIZ[chapter] ?? ArchViz;
  const [fault, setFault] = useState(false);
  const reset = useCallback(() => setFault(false), []);
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 模式动画演示</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <Viz fault={fault} />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <label className="flex cursor-pointer items-center gap-3">
            <button onClick={() => setFault(!fault)} className="relative h-5 w-9 rounded-full border border-border transition-colors" style={{ background: fault ? C.accent : C.elevated }} aria-label="注入常见误区">
              <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: fault ? "translateX(16px)" : "translateX(0)" }} />
            </button>
            <span className="text-xs" style={{ color: C.secondary }}>注入常见误区</span>
          </label>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>
      </div>
    </div>
  );
}