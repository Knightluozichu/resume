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

const VIZ: Record<string, (p: { fault: boolean }) => React.ReactNode> = {
  "01": ArchViz, "02": CommandViz, "07": StateViz, "09": GameLoopViz, "14": ComponentViz,
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