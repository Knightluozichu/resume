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

// ═══════════ Ch10 Update Method：逐实体更新 ═══════════
const UM_STEPS: readonly TeachingStep[] = [
  { label: "world", caption: "① 游戏世界：维护所有实体（敌人/弹幕/粒子）" },
  { label: "e1", caption: "② 每帧遍历：敌人 A 调用 update() 推进自身状态" },
  { label: "e2", caption: "③ 敌人 B / 弹幕 / 粒子逐个 update()" },
  { label: "loop", caption: "④ 下一帧继续：所有实体同步推进" },
];
const UM_LABEL: Record<string, string> = Object.fromEntries(UM_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function UpdateMethodViz({ fault }: { fault: boolean }) {
  const worldRef = useRef<SVGGElement>(null);
  const entRefs = [useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null), useRef<SVGGElement>(null)];
  const loopRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: UM_STEPS,
    build: (tl) => {
      tl.add(worldRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("world", 0);
      tl.add(entRefs[0].current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      tl.label("e1", T);
      entRefs.slice(1).forEach((r, i) => tl.add(r.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2));
      tl.label("e2", T * 2);
      tl.add(loopRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("loop", T * 3);
    },
  });
  const ents = [
    { x: 140, label: "敌人 A", state: "追击中 → 已更新", icon: "👾" },
    { x: 320, label: "敌人 B", state: "巡逻中 → 已更新", icon: "👾" },
    { x: 500, label: "弹幕", state: "飞行中 → 已更新", icon: "💥" },
    { x: 680, label: "粒子", state: "消散中 → 已更新", icon: "✨" },
  ];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Update Method 模式动画。游戏世界先点亮，随后每个实体逐个调用 update，最后循环说明点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Update Method：每帧逐个更新实体</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>世界每帧遍历实体列表，调用每个实体的 update()</text>
        <g ref={worldRef} style={{ opacity: 0 }}>
          <rect x={40} y={80} width={820} height={90} rx={12} fill={C.accent} opacity={0.08} stroke={C.accent} strokeWidth={2} />
          <text x={450} y={112} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.accent}>GameWorld</text>
          <text x={450} y={134} textAnchor="middle" fontSize={11} fill={C.secondary}>实体列表：敌人 ×2 · 弹幕 ×1 · 粒子 ×1</text>
          <text x={450} y={156} textAnchor="middle" fontSize={11} fill={C.secondary}>update(): for each entity → entity.update()</text>
        </g>
        {ents.map((e, i) => (
          <g key={e.label} ref={entRefs[i]} style={{ opacity: 0 }}>
            <rect x={e.x-80} y={220} width={160} height={90} rx={10} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
            <text x={e.x} y={252} textAnchor="middle" fontSize={26}>{e.icon}</text>
            <text x={e.x} y={278} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>{e.label}</text>
            <text x={e.x} y={298} textAnchor="middle" fontSize={11} fill={C.success}>{e.state}</text>
          </g>
        ))}
        <g ref={loopRef} style={{ opacity: 0 }}>
          <text x={VW/2} y={360} textAnchor="middle" fontSize={11} fill={C.secondary}>下一帧：再次遍历全部实体 → 世界状态连续推进（帧率无关，时间步一致）</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 实体状态更新依赖帧率：慢机器上角色移动更慢。修法：update(dt) 传入时间步长</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={UM_LABEL} caption="把每个实体自己的行为放进 update()：世界只负责遍历，实体自己决定如何推进。" />
    </>
  );
}

// ═══════════ Ch11 Bytecode：指令解释 ═══════════
const BC_STEPS: readonly TeachingStep[] = [
  { label: "code", caption: "① 游戏脚本：数据驱动定义行为（设法术伤害）" },
  { label: "compile", caption: "② 编译器把脚本转成字节码指令流" },
  { label: "run", caption: "③ 解释器逐条取指执行（取操作数 → 执行）" },
  { label: "state", caption: "④ 执行结果改变虚拟状态机/角色属性" },
];
const BC_LABEL: Record<string, string> = Object.fromEntries(BC_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function BytecodeViz({ fault }: { fault: boolean }) {
  const codeRef = useRef<SVGGElement>(null);
  const compileRef = useRef<SVGGElement>(null);
  const runRef = useRef<SVGGElement>(null);
  const stateRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: BC_STEPS,
    build: (tl) => {
      tl.add(codeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("code", 0);
      tl.add(compileRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("compile", T);
      tl.add(runRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("run", T * 2);
      tl.add(stateRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("state", T * 3);
    },
  });
  const instrs = ["LITERAL 25", "SET_HEALTH", "SET_SPEED 1.5", "CALL set_fire"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Bytecode 模式动画。脚本、编译、解释执行、状态变化四阶段依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Bytecode：数据驱动的指令解释</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>脚本 → 字节码 → 解释执行 → 状态变化</text>
        <g ref={codeRef} style={{ opacity: 0 }}>
          <rect x={40} y={80} width={240} height={140} rx={10} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
          <text x={160} y={108} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.warning}>法术脚本</text>
          <text x={56} y={140} textAnchor="middle" fontSize={11} fontFamily="monospace" fill={C.primary}>health = 25</text>
          <text x={56} y={162} textAnchor="middle" fontSize={11} fontFamily="monospace" fill={C.primary}>speed *= 1.5</text>
          <text x={56} y={184} textAnchor="middle" fontSize={11} fontFamily="monospace" fill={C.primary}>cast fire</text>
        </g>
        <g ref={compileRef} style={{ opacity: 0 }}>
          <text x={360} y={110} textAnchor="middle" fontSize={18} fill={C.accent}>⟶</text>
          <text x={360} y={132} textAnchor="middle" fontSize={11} fill={C.secondary}>编译</text>
          <rect x={420} y={80} width={200} height={140} rx={10} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
          <text x={520} y={108} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.accent}>字节码指令流</text>
          {instrs.map((ins, i) => (
            <text key={ins} x={432} y={140+i*22} fontSize={11} fontFamily="monospace" fill={C.primary}>{i+1}. {ins}</text>
          ))}
        </g>
        <g ref={runRef} style={{ opacity: 0 }}>
          <text x={740} y={110} textAnchor="middle" fontSize={18} fill={C.success}>⟶</text>
          <text x={740} y={132} textAnchor="middle" fontSize={11} fill={C.secondary}>取指执行</text>
          <rect x={700} y={150} width={160} height={70} rx={10} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
          <text x={780} y={178} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.success}>VM 解释器</text>
          <text x={780} y={200} textAnchor="middle" fontSize={11} fill={C.secondary}>while (ip &lt; code.len)</text>
        </g>
        <g ref={stateRef} style={{ opacity: 0 }}>
          <rect x={40} y={250} width={820} height={70} rx={10} fill={C.success} opacity={0.08} stroke={C.success} strokeWidth={1.6} />
          <text x={450} y={280} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.success}>效果：角色 health=25 · speed×1.5 · 附加火焰</text>
          <text x={450} y={302} textAnchor="middle" fontSize={11} fill={C.secondary}>改技能 = 改数据脚本，无需重编译引擎——内容创作者可独立迭代</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 直接硬编码行为逻辑：每次加技能都要改引擎代码。修法：编译成字节码数据驱动</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={BC_LABEL} caption="游戏内容以数据（字节码）形式分发，引擎只提供解释器——加内容不动代码。" />
    </>
  );
}

// ═══════════ Ch12 Subclass Sandbox：沙箱基类 ═══════════
const SS_STEPS: readonly TeachingStep[] = [
  { label: "sandbox", caption: "① Sandbox 基类：提供受保护的「可调操作」" },
  { label: "sub", caption: "② 子类在 activate() 里组合调用这些操作" },
  { label: "run", caption: "③ 引擎调用 activate()：子类只与沙箱打交道" },
];
const SS_LABEL: Record<string, string> = Object.fromEntries(SS_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function SubclassSandboxViz({ fault }: { fault: boolean }) {
  const sandboxRef = useRef<SVGGElement>(null);
  const subRef = useRef<SVGGElement>(null);
  const runRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: SS_STEPS,
    build: (tl) => {
      tl.add(sandboxRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("sandbox", 0);
      tl.add(subRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("sub", T);
      tl.add(runRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("run", T * 2);
    },
  });
  const ops = ["playSound()", "spawnParticle()", "damageTarget()"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Subclass Sandbox 模式动画。沙箱基类先点亮，子类继承并组合操作，最后引擎调用激活流程点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Subclass Sandbox：基类给操作，子类给组合</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>子类只调用沙箱提供的保护操作，不直接触碰引擎</text>
        <g ref={sandboxRef} style={{ opacity: 0 }}>
          <rect x={50} y={80} width={300} height={220} rx={12} fill={C.bg} stroke={C.accent} strokeWidth={2} />
          <text x={200} y={112} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.accent}>Superpower（沙箱基类）</text>
          <text x={200} y={132} textAnchor="middle" fontSize={11} fill={C.secondary}>protected: 可调操作</text>
          <line x1={60} y1={144} x2={340} y2={144} stroke={C.border} strokeWidth={1} />
          {ops.map((op, i) => (
            <text key={op} x={70} y={176+i*34} fontSize={12} fontFamily="monospace" fill={C.primary}>{op}</text>
          ))}
          <text x={70} y={280} fontSize={11} fill={C.secondary}>abstract activate()</text>
        </g>
        <g ref={subRef} style={{ opacity: 0 }}>
          <line x1={350} y1={160} x2={390} y2={160} stroke={C.success} strokeWidth={2} />
          <polygon points={`${386},${154} ${390},${160} ${386},${166}`} fill={C.success} />
          <rect x={390} y={80} width={300} height={220} rx={12} fill={C.bg} stroke={C.success} strokeWidth={2} />
          <text x={540} y={112} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.success}>FireballPower（子类）</text>
          <text x={540} y={132} textAnchor="middle" fontSize={11} fill={C.secondary}>override activate()</text>
          <line x1={400} y1={144} x2={680} y2={144} stroke={C.border} strokeWidth={1} />
          <text x={410} y={176} fontSize={12} fontFamily="monospace" fill={C.primary}>playSound("fire");</text>
          <text x={410} y={210} fontSize={12} fontFamily="monospace" fill={C.primary}>spawnParticle("flame");</text>
          <text x={410} y={244} fontSize={12} fontFamily="monospace" fill={C.primary}>damageTarget(25);</text>
        </g>
        <g ref={runRef} style={{ opacity: 0 }}>
          <rect x={720} y={120} width={140} height={90} rx={10} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
          <text x={790} y={150} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.warning}>引擎</text>
          <text x={790} y={172} textAnchor="middle" fontSize={11} fill={C.secondary}>power.activate()</text>
          <text x={790} y={194} textAnchor="middle" fontSize={11} fill={C.secondary}>子类只碰沙箱</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 子类直接调用引擎 API：耦合爆炸、改引擎要改所有技能。修法：把引擎操作收进沙箱基类</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={SS_LABEL} caption="引擎把所有「能做的事」放进沙箱基类，子类只需组合这些操作实现自己的效果。" />
    </>
  );
}

// ═══════════ Ch13 Type Object：类型对象 ═══════════
const TO_STEPS: readonly TeachingStep[] = [
  { label: "type", caption: "① 类型对象：定义怪物的共享属性（生命/速度/技能）" },
  { label: "inst", caption: "② 实例引用类型：每个怪物只存自己的位置/状态" },
  { label: "share", caption: "③ 实例从类型对象读取属性：改类型=改所有实例" },
];
const TO_LABEL: Record<string, string> = Object.fromEntries(TO_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function TypeObjectViz({ fault }: { fault: boolean }) {
  const typeRef = useRef<SVGGElement>(null);
  const instRef = useRef<SVGGElement>(null);
  const shareRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: TO_STEPS,
    build: (tl) => {
      tl.add(typeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("type", 0);
      tl.add(instRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("inst", T);
      tl.add(shareRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("share", T * 2);
    },
  });
  const types = [{ label: "GoblinType", hp: "hp=60", spd: "speed=3", skill: "投掷" }];
  const insts = [
    { label: "Goblin A", x: 120, pos: "x=10, y=20, hp=42" },
    { label: "Goblin B", x: 340, pos: "x=30, y=80, hp=60" },
    { label: "Goblin C", x: 560, pos: "x=50, y=15, hp=55" },
  ];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Type Object 模式动画。类型对象先点亮，三个实例随后点亮，最后共享属性说明点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Type Object：类型对象共享定义</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>实例引用类型对象，共享属性只有一份</text>
        <g ref={typeRef} style={{ opacity: 0 }}>
          <rect x={300} y={80} width={300} height={120} rx={12} fill={C.bg} stroke={C.accent} strokeWidth={2} />
          <text x={450} y={108} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.accent}>{types[0].label}</text>
          <line x1={310} y1={118} x2={590} y2={118} stroke={C.border} strokeWidth={1} />
          <text x={330} y={144} fontSize={11} fontFamily="monospace" fill={C.primary}>{types[0].hp}</text>
          <text x={440} y={144} fontSize={11} fontFamily="monospace" fill={C.primary}>{types[0].spd}</text>
          <text x={550} y={144} fontSize={11} fontFamily="monospace" fill={C.primary}>技能:{types[0].skill}</text>
          <text x={450} y={176} textAnchor="middle" fontSize={11} fill={C.secondary}>类型对象（共享，一份）</text>
        </g>
        {insts.map((ins, i) => (
          <g key={ins.label} ref={instRef} style={{ opacity: 0 }}>
            <rect x={ins.x-90} y={240} width={180} height={80} rx={10} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
            <text x={ins.x} y={270} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.primary}>{ins.label}</text>
            <text x={ins.x} y={296} textAnchor="middle" fontSize={11} fontFamily="monospace" fill={C.success}>{ins.pos}</text>
          </g>
        ))}
        <g ref={shareRef} style={{ opacity: 0 }}>
          <path d={`M 400 200 L ${insts[0].x} 240 M 450 200 L ${insts[1].x} 240 M 500 200 L ${insts[2].x} 240`} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
          <text x={VW/2} y={360} textAnchor="middle" fontSize={11} fill={C.secondary}>实例只存自身状态；把 GoblinType.hp 改成 80，所有哥布林同时变强</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 每个怪物独立存全部属性：加新怪种要写大量重复类。修法：类型对象共享定义</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={TO_LABEL} caption="类型即数据：把「是什么」存成对象，运行时改类型就能改变所有实例。" />
    </>
  );
}

// ═══════════ Ch15 Event Queue：事件队列 ═══════════
const EQ_STEPS: readonly TeachingStep[] = [
  { label: "producer", caption: "① 生产者：产生事件（音效、伤害、动画触发）" },
  { label: "queue", caption: "② 事件入队：环形缓冲排队等待" },
  { label: "consumer", caption: "③ 消费者：按序取出并处理事件" },
  { label: "decouple", caption: "④ 解耦：生产/消费速率不同也能平滑衔接" },
];
const EQ_LABEL: Record<string, string> = Object.fromEntries(EQ_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function EventQueueViz({ fault }: { fault: boolean }) {
  const prodRef = useRef<SVGGElement>(null);
  const queueRef = useRef<SVGGElement>(null);
  const consRef = useRef<SVGGElement>(null);
  const decoupleRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: EQ_STEPS,
    build: (tl) => {
      tl.add(prodRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("producer", 0);
      tl.add(queueRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("queue", T);
      tl.add(consRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("consumer", T * 2);
      tl.add(decoupleRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("decouple", T * 3);
    },
  });
  const events = ["🔊 音效:命中", "💥 伤害:25", "🎬 动画:受击", "🩸 粒子:血花", "📊 成就:击杀"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Event Queue 模式动画。生产者、事件队列、消费者、解耦说明依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Event Queue：生产者-队列-消费者</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>事件不直接调用，先入队再按序处理</text>
        <g ref={prodRef} style={{ opacity: 0 }}>
          <rect x={40} y={100} width={200} height={140} rx={12} fill={C.bg} stroke={C.warning} strokeWidth={2} />
          <text x={140} y={130} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.warning}>生产者</text>
          <text x={140} y={156} textAnchor="middle" fontSize={11} fill={C.secondary}>碰撞检测</text>
          <text x={140} y={180} textAnchor="middle" fontSize={11} fill={C.secondary}>输入系统</text>
          <text x={140} y={204} textAnchor="middle" fontSize={11} fill={C.secondary}>AI 决策</text>
          <text x={140} y={228} textAnchor="middle" fontSize={11} fill={C.secondary}>post(event)</text>
        </g>
        <g ref={queueRef} style={{ opacity: 0 }}>
          <text x={450} y={112} textAnchor="middle" fontSize={13} fill={C.accent}>⟶ enqueue ⟶</text>
          <rect x={330} y={130} width={240} height={90} rx={10} fill={C.bg} stroke={C.accent} strokeWidth={2} />
          <text x={450} y={156} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.accent}>事件队列（环形缓冲）</text>
          {events.slice(0, 3).map((ev, i) => (
            <text key={ev} x={450} y={180+i*18} textAnchor="middle" fontSize={11} fill={C.primary}>{ev}</text>
          ))}
        </g>
        <g ref={consRef} style={{ opacity: 0 }}>
          <text x={750} y={112} textAnchor="middle" fontSize={13} fill={C.success}>⟵ dequeue ⟵</text>
          <rect x={660} y={130} width={200} height={90} rx={12} fill={C.bg} stroke={C.success} strokeWidth={2} />
          <text x={760} y={156} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.success}>消费者</text>
          <text x={760} y={180} textAnchor="middle" fontSize={11} fill={C.secondary}>音频系统</text>
          <text x={760} y={204} textAnchor="middle" fontSize={11} fill={C.secondary}>每帧取出处理</text>
        </g>
        <g ref={decoupleRef} style={{ opacity: 0 }}>
          <rect x={40} y={260} width={820} height={60} rx={10} fill={C.success} opacity={0.08} stroke={C.success} strokeWidth={1.6} />
          <text x={450} y={288} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.success}>解耦：生产者瞬时入队不阻塞，消费者按自己的节奏处理</text>
          <text x={450} y={308} textAnchor="middle" fontSize={11} fill={C.secondary}>即使某帧事件爆发，也只是队列变长——不丢事件、不卡帧</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 直接同步调用：某帧事件过多导致处理卡顿。修法：事件入队，按帧摊开处理</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={EQ_LABEL} caption="事件先入队、后处理：生产者与消费者彻底解耦，突发负载被队列吸收。" />
    </>
  );
}

// ═══════════ Ch16 Service Locator：服务定位 ═══════════
const SL_STEPS: readonly TeachingStep[] = [
  { label: "register", caption: "① 服务（音频/渲染/网络）注册到定位器" },
  { label: "request", caption: "② 客户端向定位器请求服务，不必知道实现" },
  { label: "dispatch", caption: "③ 定位器返回服务实例：解耦客户端与具体实现" },
];
const SL_LABEL: Record<string, string> = Object.fromEntries(SL_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function ServiceLocatorViz({ fault }: { fault: boolean }) {
  const regRef = useRef<SVGGElement>(null);
  const reqRef = useRef<SVGGElement>(null);
  const dispRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: SL_STEPS,
    build: (tl) => {
      tl.add(regRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("register", 0);
      tl.add(reqRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("request", T);
      tl.add(dispRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("dispatch", T * 2);
    },
  });
  const services = ["AudioService", "RenderService", "NetworkService", "SaveService"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Service Locator 模式动画。服务注册、客户端请求、定位器分发三步依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Service Locator：全局服务访问点</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>服务注册到定位器，客户端按名获取，无需知道实现</text>
        <g ref={regRef} style={{ opacity: 0 }}>
          <rect x={60} y={90} width={300} height={220} rx={12} fill={C.bg} stroke={C.accent} strokeWidth={2} />
          <text x={210} y={122} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.accent}>ServiceLocator</text>
          <text x={210} y={142} textAnchor="middle" fontSize={11} fill={C.secondary}>服务注册表</text>
          <line x1={70} y1={154} x2={350} y2={154} stroke={C.border} strokeWidth={1} />
          {services.map((s, i) => (
            <text key={s} x={80} y={182+i*30} fontSize={11} fontFamily="monospace" fill={C.primary}>▸ {s}</text>
          ))}
        </g>
        <g ref={reqRef} style={{ opacity: 0 }}>
          <rect x={500} y={110} width={200} height={80} rx={10} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
          <text x={600} y={140} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.warning}>客户端（关卡/UI/逻辑）</text>
          <text x={600} y={170} textAnchor="middle" fontSize={11} fill={C.secondary}>locator.get("Audio")</text>
          <line x1={500} y1={150} x2={360} y2={150} stroke={C.border} strokeWidth={1.5} strokeDasharray="4,3" />
          <text x={430} y={140} textAnchor="middle" fontSize={11} fill={C.accent}>请求</text>
        </g>
        <g ref={dispRef} style={{ opacity: 0 }}>
          <line x1={360} y1={180} x2={500} y2={180} stroke={C.success} strokeWidth={1.5} />
          <polygon points={`${496},${176} ${500},${180} ${496},${184}`} fill={C.success} />
          <text x={430} y={196} textAnchor="middle" fontSize={11} fill={C.success}>返回实例</text>
          <rect x={60} y={330} width={820} height={50} rx={10} fill={C.success} opacity={0.08} stroke={C.success} strokeWidth={1.6} />
          <text x={450} y={358} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.success}>换实现（如 Audio 从 OpenAL 换成 DirectSound）只需改注册，客户端代码不动</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 客户端直接 new 服务：换实现要改所有调用点。修法：统一走 ServiceLocator 获取</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={SL_LABEL} caption="定位器是服务的「电话簿」：客户端只认名字，具体实现可随时替换。" />
    </>
  );
}

// ═══════════ Ch17 Data Locality：内存局部性 ═══════════
const DL_STEPS: readonly TeachingStep[] = [
  { label: "scatter", caption: "① 分散存储：每个实体携带全部属性，跳跃访问" },
  { label: "cache", caption: "② 缓存局部性差：频繁未命中，CPU 停顿等待内存" },
  { label: "contig", caption: "③ 连续存储：属性按列分离，逐块扫描" },
  { label: "fast", caption: "④ 顺序访问：预取命中，吞吐量大幅提升" },
];
const DL_LABEL: Record<string, string> = Object.fromEntries(DL_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function DataLocalityViz({ fault }: { fault: boolean }) {
  const scatterRef = useRef<SVGGElement>(null);
  const cacheRef = useRef<SVGGElement>(null);
  const contigRef = useRef<SVGGElement>(null);
  const fastRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: DL_STEPS,
    build: (tl) => {
      tl.add(scatterRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("scatter", 0);
      tl.add(cacheRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("cache", T);
      tl.add(contigRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("contig", T * 2);
      tl.add(fastRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("fast", T * 3);
    },
  });
  const ents = ["E1", "E2", "E3", "E4", "E5", "E6"];
  const mem = ["pos", "hp", "sprite", "pos", "hp", "sprite", "pos", "hp"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Data Locality 模式动画。分散存储、缓存未命中、连续存储、顺序访问四步依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Data Locality：让数据排列贴近访问模式</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>缓存局部性是游戏性能的隐形引擎</text>
        <g ref={scatterRef} style={{ opacity: 0 }}>
          <text x={60} y={86} fontSize={11} fontWeight={600} fill={C.danger}>✗ 分散存储（每实体一块）</text>
          <rect x={40} y={96} width={820} height={60} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
          {mem.map((m, i) => (
            <g key={i}>
              <rect x={48+i*100} y={104} width={92} height={44} rx={5} fill={C.warning} opacity={0.15} stroke={C.warning} strokeWidth={1} />
              <text x={94+i*100} y={130} textAnchor="middle" fontSize={11} fill={C.warning}>{m}</text>
            </g>
          ))}
        </g>
        <g ref={cacheRef} style={{ opacity: 0 }}>
          <rect x={40} y={170} width={820} height={40} rx={8} fill={C.danger} opacity={0.1} stroke={C.danger} strokeWidth={1.2} />
          <text x={450} y={196} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.danger}>遍历所有实体只取 pos → 每步跳 2 块内存 → 缓存几乎全未命中</text>
        </g>
        <g ref={contigRef} style={{ opacity: 0 }}>
          <text x={60} y={250} fontSize={11} fontWeight={600} fill={C.success}>✓ 连续存储（pos 数组单独一块）</text>
          <rect x={40} y={260} width={820} height={44} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
          {ents.map((e, i) => (
            <g key={e}>
              <rect x={48+i*130} y={266} width={122} height={32} rx={5} fill={C.success} opacity={0.15} stroke={C.success} strokeWidth={1} />
              <text x={109+i*130} y={287} textAnchor="middle" fontSize={11} fill={C.success}>{e}.pos</text>
            </g>
          ))}
        </g>
        <g ref={fastRef} style={{ opacity: 0 }}>
          <rect x={40} y={318} width={820} height={40} rx={8} fill={C.success} opacity={0.1} stroke={C.success} strokeWidth={1.2} />
          <text x={450} y={344} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.success}>顺序扫描一块连续内存 → 硬件预取生效 → 吞吐量可提升数倍</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 面向对象地把所有属性打包进一个对象：遍历时缓存抖动脉冲。修法：属性按列分离成数组</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={DL_LABEL} caption="把同属性的数据排成连续数组，遍历就变成顺序内存访问——缓存友好。" />
    </>
  );
}

// ═══════════ Ch18 Dirty Flag：脏标志 ═══════════
const DF_STEPS: readonly TeachingStep[] = [
  { label: "state", caption: "① 对象状态变化：位置/朝向改变" },
  { label: "dirty", caption: "② 置脏标志：标记「需要重算」" },
  { label: "ask", caption: "③ 询问时未变脏：直接返回缓存结果，零重算" },
  { label: "recompute", caption: "④ 询问时已变脏：重算并清标志" },
];
const DF_LABEL: Record<string, string> = Object.fromEntries(DF_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function DirtyFlagViz({ fault }: { fault: boolean }) {
  const stateRef = useRef<SVGGElement>(null);
  const dirtyRef = useRef<SVGGElement>(null);
  const askRef = useRef<SVGGElement>(null);
  const recomputeRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: DF_STEPS,
    build: (tl) => {
      tl.add(stateRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("state", 0);
      tl.add(dirtyRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("dirty", T);
      tl.add(askRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("ask", T * 2);
      tl.add(recomputeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("recompute", T * 3);
    },
  });
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Dirty Flag 模式动画。状态变化、置脏、缓存命中、重算四步依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Dirty Flag：变了才重算</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>用脏标志跳过未变化的重复计算</text>
        <g ref={stateRef} style={{ opacity: 0 }}>
          <rect x={40} y={80} width={300} height={90} rx={10} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
          <text x={190} y={108} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.warning}>Transform</text>
          <text x={190} y={134} textAnchor="middle" fontSize={11} fontFamily="monospace" fill={C.primary}>pos=(10,20) rot=45°</text>
          <text x={190} y={156} textAnchor="middle" fontSize={11} fill={C.secondary}>setPosition() 改变状态</text>
        </g>
        <g ref={dirtyRef} style={{ opacity: 0 }}>
          <text x={430} y={120} textAnchor="middle" fontSize={16} fill={C.danger}>⟶</text>
          <rect x={500} y={80} width={260} height={90} rx={10} fill={C.danger} opacity={0.1} stroke={C.danger} strokeWidth={2} />
          <text x={630} y={110} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.danger}>dirty = true ⚑</text>
          <text x={630} y={134} textAnchor="middle" fontSize={11} fill={C.secondary}>本地矩阵失效，等待重算</text>
          <text x={630} y={156} textAnchor="middle" fontSize={11} fill={C.secondary}>（无需立刻计算）</text>
        </g>
        <g ref={askRef} style={{ opacity: 0 }}>
          <rect x={40} y={210} width={380} height={90} rx={10} fill={C.success} opacity={0.1} stroke={C.success} strokeWidth={2} />
          <text x={230} y={240} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.success}>getLocalMatrix()：未变脏</text>
          <text x={230} y={264} textAnchor="middle" fontSize={11} fill={C.secondary}>直接返回缓存矩阵 ✓ 零开销</text>
          <text x={230} y={286} textAnchor="middle" fontSize={11} fill={C.secondary}>渲染器每帧询问都不重算</text>
        </g>
        <g ref={recomputeRef} style={{ opacity: 0 }}>
          <rect x={460} y={210} width={400} height={90} rx={10} fill={C.warning} opacity={0.12} stroke={C.warning} strokeWidth={2} />
          <text x={660} y={240} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.warning}>getLocalMatrix()：已变脏</text>
          <text x={660} y={264} textAnchor="middle" fontSize={11} fill={C.secondary}>重算矩阵 → 清 dirty 标志</text>
          <text x={660} y={286} textAnchor="middle" fontSize={11} fill={C.secondary}>只在真正需要时才花算力</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 每帧无条件重算矩阵：昂贵的 sin/cos 全浪费。修法：状态变化才置脏，询问时才重算</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={DF_LABEL} caption="渲染器每帧问「需要重算吗？」，绝大多数帧的答案都是否——省下大量无用计算。" />
    </>
  );
}

// ═══════════ Ch19 Object Pool：对象池 ═══════════
const OP_STEPS: readonly TeachingStep[] = [
  { label: "alloc", caption: "① 新弹幕：从池中取出空闲对象（无 malloc）" },
  { label: "use", caption: "② 使用中：弹幕飞行并渲染" },
  { label: "free", caption: "③ 爆炸后放回池：标记空闲待复用" },
  { label: "reuse", caption: "④ 再次需要时复用同一块内存：零碎片零分配" },
];
const OP_LABEL: Record<string, string> = Object.fromEntries(OP_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function ObjectPoolViz({ fault }: { fault: boolean }) {
  const allocRef = useRef<SVGGElement>(null);
  const inUseRef = useRef<SVGGElement>(null);
  const freeSlotRef = useRef<SVGGElement>(null);
  const reuseSlotRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: OP_STEPS,
    build: (tl) => {
      tl.add(allocRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("alloc", 0);
      tl.add(inUseRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("use", T);
      tl.add(freeSlotRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("free", T * 2);
      tl.add(reuseSlotRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("reuse", T * 3);
    },
  });
  const slots = ["⚪ 空闲", "🔴 使用中", "⚪ 空闲", "🔴 使用中", "⚪ 空闲", "⚪ 空闲"];
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Object Pool 模式动画。取出、使用、放回、复用四步依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Object Pool：对象复用池</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>频繁创建销毁的对象从池中取还，避免内存碎片</text>
        <g ref={allocRef} style={{ opacity: 0 }}>
          <rect x={40} y={80} width={820} height={110} rx={12} fill={C.bg} stroke={C.accent} strokeWidth={2} />
          <text x={450} y={106} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.accent}>BulletPool（预分配 6 个槽）</text>
          {slots.map((s, i) => (
            <g key={i}>
              <rect x={60+i*130} y={120} width={120} height={50} rx={8} fill={s.includes("使用") ? C.danger : C.success} opacity={0.12} stroke={s.includes("使用") ? C.danger : C.success} strokeWidth={1.5} />
              <text x={120+i*130} y={150} textAnchor="middle" fontSize={11} fill={C.primary}>{s}</text>
            </g>
          ))}
        </g>
        <g ref={inUseRef} style={{ opacity: 0 }}>
          <rect x={120} y={220} width={220} height={70} rx={10} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
          <text x={230} y={248} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.warning}>发射：acquire()</text>
          <text x={230} y={272} textAnchor="middle" fontSize={11} fill={C.secondary}>取空闲槽 → 初始化 → 使用</text>
        </g>
        <g ref={freeSlotRef} style={{ opacity: 0 }}>
          <rect x={420} y={220} width={220} height={70} rx={10} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
          <text x={530} y={248} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.success}>爆炸：release()</text>
          <text x={530} y={272} textAnchor="middle" fontSize={11} fill={C.secondary}>复位状态 → 标记空闲</text>
        </g>
        <g ref={reuseSlotRef} style={{ opacity: 0 }}>
          <rect x={40} y={320} width={820} height={44} rx={10} fill={C.success} opacity={0.1} stroke={C.success} strokeWidth={1.4} />
          <text x={450} y={347} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.success}>同一块内存反复使用：0 次 malloc、0 次 free、0 碎片——GC 压力归零</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 高频 new/delete 弹幕对象：内存碎片 + GC 卡顿。修法：预分配池化复用</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={OP_LABEL} caption="池子预分配好，运行时只做「取-还」：高频对象永远不碰堆分配。" />
    </>
  );
}

// ═══════════ Ch20 Spatial Partition：空间分区 ═══════════
const SP_STEPS: readonly TeachingStep[] = [
  { label: "brute", caption: "① 暴力检测：每对实体两两检测 O(N²)" },
  { label: "grid", caption: "② 空间网格：把世界切成格子，实体登记到所在格" },
  { label: "query", caption: "③ 查询：只检测同格/邻格实体，大幅剪枝" },
  { label: "move", caption: "④ 实体移动后更新所属格：查询始终精确" },
];
const SP_LABEL: Record<string, string> = Object.fromEntries(SP_STEPS.map((s) => [s.label, s.caption ?? s.label]));

function SpatialPartitionViz({ fault }: { fault: boolean }) {
  const bruteRef = useRef<SVGGElement>(null);
  const gridRef = useRef<SVGGElement>(null);
  const queryRef = useRef<SVGGElement>(null);
  const moveRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: SP_STEPS,
    build: (tl) => {
      tl.add(bruteRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("brute", 0);
      tl.add(gridRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("grid", T);
      tl.add(queryRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("query", T * 2);
      tl.add(moveRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("move", T * 3);
    },
  });
  const dots = [
    { x: 120, y: 140 }, { x: 210, y: 110 }, { x: 300, y: 170 }, { x: 190, y: 230 },
    { x: 520, y: 130 }, { x: 640, y: 160 }, { x: 580, y: 240 }, { x: 700, y: 220 },
  ];
  const target = { x: 240, y: 150 };
  const gridLines = [];
  for (let i = 1; i < 4; i++) { gridLines.push({ x: 100 + i * 110 }); gridLines.push({ y: 90 + i * 70 }); }
  return (
    <>
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Spatial Partition 模式动画。暴力检测、空间网格、邻格查询、移动更新四步依次点亮。可播放、暂停、单步、拖动进度。">
        <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Spatial Partition：空间网格加速查询</text>
        <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>只查邻格，把 O(N²) 降到 O(N+碰撞对数)</text>
        <g ref={bruteRef} style={{ opacity: 0 }}>
          <rect x={40} y={80} width={340} height={230} rx={10} fill={C.bg} stroke={C.danger} strokeWidth={1.5} />
          <text x={210} y={106} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.danger}>✗ 暴力：两两检测 28 对</text>
          {dots.slice(0, 4).map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={8} fill={C.warning} opacity={0.8} />
          ))}
          {dots.slice(0, 4).map((d1, i) => dots.slice(0, 4).map((d2, j) => {
            if (i >= j) return null;
            return <line key={`${i}-${j}`} x1={d1.x} y1={d1.y} x2={d2.x} y2={d2.y} stroke={C.danger} strokeWidth={0.6} opacity={0.4} />;
          }))}
        </g>
        <g ref={gridRef} style={{ opacity: 0 }}>
          <rect x={430} y={80} width={430} height={230} rx={10} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
          <text x={645} y={106} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.accent}>✓ 网格：3×3 划分</text>
          {gridLines.map((l, i) => l.x !== undefined
            ? <line key={`v${i}`} x1={l.x} y1={90} x2={l.x} y2={310} stroke={C.border} strokeWidth={0.8} />
            : <line key={`h${i}`} x1={430} y1={l.y} x2={860} y2={l.y} stroke={C.border} strokeWidth={0.8} />)}
          {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={7} fill={C.success} opacity={0.8} />)}
        </g>
        <g ref={queryRef} style={{ opacity: 0 }}>
          <circle cx={target.x} cy={target.y} r={14} fill={C.danger} opacity={0.3} stroke={C.danger} strokeWidth={2} />
          <text x={660} y={140} textAnchor="middle" fontSize={11} fill={C.warning}>← 只检测同格</text>
          <text x={700} y={240} textAnchor="middle" fontSize={11} fill={C.warning}>邻格共 2 个</text>
          <rect x={430} y={330} width={430} height={40} rx={8} fill={C.success} opacity={0.1} stroke={C.success} strokeWidth={1.2} />
          <text x={645} y={355} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.success}>平均每格 1-2 实体：全图只需检测 ~4 对而非 28 对</text>
        </g>
        <g ref={moveRef} style={{ opacity: 0 }}>
          <rect x={40} y={330} width={340} height={40} rx={8} fill={C.warning} opacity={0.1} stroke={C.warning} strokeWidth={1.2} />
          <text x={210} y={355} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.warning}>实体每帧移动后更新所在格，查询始终精确</text>
        </g>
        {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 实体不入网格：每次查询全图扫描 O(N²)。修法：登记到空间网格，按格查询</text>}
      </svg>
      <TimelineControls timeline={timeline} labelText={SP_LABEL} caption="世界切成网格，实体只和同格邻居比碰撞——海量实体也只需局部计算。" />
    </>
  );
}

const VIZ: Record<string, (p: { fault: boolean }) => React.ReactNode> = {
  "01": ArchViz, "02": CommandViz, "03": FlyweightViz, "04": ObserverViz, "05": PrototypeViz,
  "06": SingletonViz, "07": StateViz, "08": DoubleBufferViz, "09": GameLoopViz, "10": UpdateMethodViz,
  "11": BytecodeViz, "12": SubclassSandboxViz, "13": TypeObjectViz, "14": ComponentViz, "15": EventQueueViz,
  "16": ServiceLocatorViz, "17": DataLocalityViz, "18": DirtyFlagViz, "19": ObjectPoolViz, "20": SpatialPartitionViz,
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