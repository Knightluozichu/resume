"use client";

import { useState, useCallback } from "react";
const C = { bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)", primary: "var(--text-primary)", secondary: "var(--text-secondary)", accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)" } as const;

const VW = 900; const VH = 420;

// ─── Command 模式：UML 类图 + 序列图 ───
function CommandViz({ fault }: { fault: boolean }) {
  const cx = 180;
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Command 模式类图与序列图">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Command 模式：UML 类图 + 序列图</text>
      {/* 类图区域 */}
      {/* <<interface>> Command */}
      <rect x={cx-80} y={60} width={160} height={56} rx={6} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
      <text x={cx} y={80} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.accent}>«interface»</text>
      <text x={cx} y={96} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Command</text>
      <text x={cx} y={112} textAnchor="middle" fontSize={11} fill={C.secondary}>+ execute() ; + undo()</text>
      {/* ConcreteCommand */}
      <rect x={cx-80} y={140} width={160} height={56} rx={6} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
      <text x={cx} y={160} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>JumpCommand</text>
      <text x={cx} y={178} textAnchor="middle" fontSize={11} fill={C.secondary}>- receiver: Player</text>
      <text x={cx} y={194} textAnchor="middle" fontSize={11} fill={C.success}>+ execute()</text>
      {/* 虚线箭头：ConcreteCommand → Command */}
      <line x1={cx-20} y1={140} x2={cx-20} y2={116} stroke={C.success} strokeWidth={1.5} strokeDasharray="5,3" />
      <polygon points={`${cx-24},${120} ${cx-20},${116} ${cx-16},${120}`} fill={C.success} />
      {/* Receiver */}
      <rect x={cx-80} y={220} width={160} height={50} rx={6} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
      <text x={cx} y={240} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Player</text>
      <text x={cx} y={260} textAnchor="middle" fontSize={11} fill={C.warning}>+ jump() ; + fire()</text>
      {/* 关联箭头：ConcreteCommand → Receiver */}
      <line x1={cx} y1={196} x2={cx} y2={220} stroke={C.warning} strokeWidth={1} />
      {/* Invoker */}
      <rect x={cx-80} y={300} width={160} height={50} rx={6} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
      <text x={cx} y={320} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>InputHandler</text>
      <text x={cx} y={340} textAnchor="middle" fontSize={11} fill={C.accent}>+ handleInput(): Command</text>
      {/* 序列图区域 */}
      <text x={560} y={60} fontSize={12} fontWeight={600} fill={C.primary}>执行序列</text>
      {/* 生命线 */}
      <line x1={480} y1={80} x2={480} y2={380} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
      <line x1={600} y1={80} x2={600} y2={380} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
      <line x1={720} y1={80} x2={720} y2={380} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
      <text x={480} y={76} textAnchor="middle" fontSize={11} fill={C.primary}>InputHandler</text>
      <text x={600} y={76} textAnchor="middle" fontSize={11} fill={C.primary}>Command</text>
      <text x={720} y={76} textAnchor="middle" fontSize={11} fill={C.primary}>Player</text>
      {/* 箭头 1: create */}
      <line x1={500} y1={100} x2={580} y2={100} stroke={C.accent} strokeWidth={1.5} />
      <polygon points={`${576},${96} ${580},${100} ${576},${104}`} fill={C.accent} />
      <text x={540} y={94} textAnchor="middle" fontSize={11} fill={C.accent}>create</text>
      {/* 箭头 2: execute */}
      <line x1={500} y1={140} x2={580} y2={140} stroke={C.success} strokeWidth={1.5} />
      <polygon points={`${576},${136} ${580},${140} ${576},${144}`} fill={C.success} />
      <text x={540} y={134} textAnchor="middle" fontSize={11} fill={C.success}>execute()</text>
      {/* 箭头 3: action */}
      <line x1={620} y1={180} x2={700} y2={180} stroke={C.warning} strokeWidth={1.5} />
      <polygon points={`${696},${176} ${700},${180} ${696},${184}`} fill={C.warning} />
      <text x={660} y={174} textAnchor="middle" fontSize={11} fill={C.warning}>player.jump()</text>
      {/* 故障提示 */}
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 硬编码：直接在输入处理中调用 player.jump()，无法重绑定/回放/撤销</text>}
    </svg>
  );
}

// ─── State 模式：状态机图 ───
function StateViz({ fault }: { fault: boolean }) {
  const [curState, setCurState] = useState(0);
  const states = [
    { x: 120, y: 160, label: "Idle", event: "按空格" },
    { x: 330, y: 80, label: "Jumping", event: "落地" },
    { x: 330, y: 260, label: "Running", event: "停止" },
    { x: 540, y: 160, label: "Attacking", event: "攻击结束" },
  ];
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="State 模式状态机图">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>State 模式：状态机图</text>
      <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>点击状态切换，观察转换路径</text>
      {states.map((s, i) => {
        const isActive = i === curState;
        const isNext = fault && i === 1;
        return (
          <g key={s.label} onClick={() => setCurState(i)} className="cursor-pointer">
            <rect x={s.x-55} y={s.y-22} width={110} height={44} rx={22} fill={isActive ? C.accent : isNext ? C.danger : C.bg} stroke={isActive ? C.accent : isNext ? C.danger : C.border} strokeWidth={isActive?2:1.5} />
            <text x={s.x} y={s.y+4} textAnchor="middle" fontSize={12} fontWeight={600} fill={isActive||isNext?C.bg:C.primary}>{s.label}</text>
            {/* 转换箭头 */}
            {i < states.length - 1 && <line x1={s.x+55} y1={s.y} x2={states[i+1].x-55} y2={states[i+1].y} stroke={C.border} strokeWidth={1.5} markerEnd="url(#arrow)" />}
            {i < states.length - 1 && <text x={(s.x+states[i+1].x)/2} y={(s.y+states[i+1].y)/2-10} textAnchor="middle" fontSize={11} fill={C.secondary}>{s.event}</text>}
            {i > 0 && <text x={(s.x+states[i-1].x)/2} y={(s.y+states[i-1].y)/2-10} textAnchor="middle" fontSize={11} fill={C.secondary}>{states[i].event}</text>}
          </g>
        );
      })}
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={C.border} /></marker></defs>
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 条件爆炸：用 switch 处理所有状态组合，代码膨胀且难以维护</text>}
    </svg>
  );
}

// ─── Game Loop 模式：流程图 ───
function GameLoopViz({ fault }: { fault: boolean }) {
  const [phase, setPhase] = useState(0);
  const phases = [
    { x: 150, label: "ProcessInput", desc: "读取键盘/鼠标/手柄输入" },
    { x: 380, label: "Update", desc: "推进世界状态：物理/AI/动画" },
    { x: 610, label: "Render", desc: "绘制当前帧到屏幕" },
  ];
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Game Loop 流程图">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>游戏循环：处理输入 → 更新 → 渲染</text>
      <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>点击阶段推进，观察循环流程</text>
      {phases.map((p, i) => {
        const isActive = i === phase;
        const isNext = i === phase + 1;
        return (
          <g key={p.label} onClick={() => setPhase(i)} className="cursor-pointer">
            <rect x={p.x-80} y={140} width={160} height={100} rx={12} fill={isActive ? C.accent : C.bg} stroke={isActive ? C.accent : C.border} strokeWidth={isActive?2:1.5} />
            <text x={p.x} y={172} textAnchor="middle" fontSize={13} fontWeight={600} fill={isActive ? C.bg : C.primary}>{p.label}</text>
            <text x={p.x} y={198} textAnchor="middle" fontSize={11} fill={isActive ? "rgba(255,255,255,0.85)" : C.secondary}>{p.desc}</text>
            <text x={p.x} y={222} textAnchor="middle" fontSize={32} fill={isActive ? C.bg : C.border}>{i === 0 ? "⌨️" : i === 1 ? "⚙️" : "🎨"}</text>
            {i < 2 && <line x1={p.x+80} y1={190} x2={phases[i+1].x-80} y2={190} stroke={C.accent} strokeWidth={2} markerEnd="url(#gla)" />}
            {i < 2 && <text x={(p.x+phases[i+1].x)/2} y={180} textAnchor="middle" fontSize={11} fill={C.accent}>→</text>}
          </g>
        );
      })}
      {/* 循环箭头 */}
      <path d={`M ${phases[2].x} ${240} L ${phases[2].x} ${300} L ${phases[0].x} ${300} L ${phases[0].x} ${240}`} fill="none" stroke={C.success} strokeWidth={1.5} strokeDasharray="5,3" markerEnd="url(#gla)" />
      <text x={(phases[0].x+phases[2].x)/2} y={320} textAnchor="middle" fontSize={11} fill={C.success}>⭮ 循环（每帧）</text>
      <defs><marker id="gla" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={C.accent} /></marker></defs>
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 可变时间步长导致物理抖动量不守恒。修法：固定时间步 + 累计剩余时间</text>}
    </svg>
  );
}

// ─── Component 模式：架构图 ───
function ComponentViz({ fault }: { fault: boolean }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Component 模式架构图">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Component 模式：用组合替代继承</text>
      <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>GameObject 作为容器，持有多个 Component 实例</text>
      {/* GameObject 大框 */}
      <rect x={180} y={80} width={540} height={280} rx={14} fill={C.elevated} stroke={C.accent} strokeWidth={2} />
      <text x={450} y={110} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.accent}>GameObject</text>
      <text x={450} y={130} textAnchor="middle" fontSize={11} fill={C.secondary}>容器 · 管理生命周期 · 组件间消息转发</text>
      {/* 组件框 */}
      {[
        { x: 210, y: 155, w: 160, h: 60, label: "InputComponent", color: C.accent, desc: "处理键盘/鼠标输入" },
        { x: 400, y: 155, w: 160, h: 60, label: "PhysicsComponent", color: C.warning, desc: "碰撞检测与刚体" },
        { x: 530, y: 155, w: 160, h: 60, label: "GraphicsComponent", color: C.success, desc: "渲染模型与动画" },
        { x: 210, y: 240, w: 160, h: 60, label: "AudioComponent", color: C.danger, desc: "音效播放与管理" },
        { x: 400, y: 240, w: 160, h: 60, label: "HealthComponent", color: "#8b5cf6", desc: "血量与受伤状态" },
        { x: 530, y: 240, w: 160, h: 60, label: "AIComponent", color: "#ec4899", desc: "行为树与状态机" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={8} fill={c.color} opacity={0.12} stroke={c.color} strokeWidth={1.5} />
          <text x={c.x + c.w/2} y={c.y + 24} textAnchor="middle" fontSize={11} fontWeight={600} fill={c.color}>{c.label}</text>
          <text x={c.x + c.w/2} y={c.y + 44} textAnchor="middle" fontSize={11} fill={C.secondary}>{c.desc}</text>
        </g>
      ))}
      {/* 组件间通信线 */}
      <line x1={370} y1={185} x2={400} y2={185} stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
      <line x1={560} y1={185} x2={530} y2={185} stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
      <line x1={370} y1={270} x2={400} y2={270} stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
      <line x1={560} y1={270} x2={530} y2={270} stroke={C.border} strokeWidth={1} strokeDasharray="3,3" />
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 上帝类：一个类包含所有功能，上万行代码。修法：按功能拆分为独立 Component</text>}
    </svg>
  );
}

// ─── 游戏架构：系统图 ───
function ArchViz({ fault }: { fault: boolean }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="游戏系统架构图">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>游戏系统架构</text>
      <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>各系统在每帧循环中协作</text>
      {/* 中心：Game Loop */}
      <rect x={370} y={160} width={160} height={60} rx={30} fill={C.accent} opacity={0.9} />
      <text x={450} y={196} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.bg}>Game Loop</text>
      {/* 周围系统 */}
      {[
        { x: 120, y: 70, label: "Rendering", color: C.success },
        { x: 450, y: 60, label: "Physics", color: C.warning },
        { x: 700, y: 100, label: "Audio", color: C.danger },
        { x: 100, y: 260, label: "AI", color: "#8b5cf6" },
        { x: 500, y: 300, label: "Input", color: C.accent },
        { x: 720, y: 280, label: "Scripting", color: "#ec4899" },
      ].map((s, i) => {
        const angle = Math.atan2(s.y - 190, s.x - 450);
        return (
          <g key={i}>
            <rect x={s.x-60} y={s.y-20} width={120} height={40} rx={20} fill={s.color} opacity={0.15} stroke={s.color} strokeWidth={1.5} />
            <text x={s.x} y={s.y+4} textAnchor="middle" fontSize={11} fontWeight={600} fill={s.color}>{s.label}</text>
            <line x1={s.x + (s.x>450?-60:60)} y1={s.y} x2={370 + (s.x>450?160:0)} y2={190} stroke={C.border} strokeWidth={1} opacity={0.5} />
          </g>
        );
      })}
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 可变时间步长导致物理表现不一致。修法：固定时间步 + 累计剩余时间</text>}
    </svg>
  );
}

// ─── Flyweight 模式：享元对象池图 ───
function FlyweightViz({ fault }: { fault: boolean }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Flyweight 模式享元对象池">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Flyweight 模式：共享对象池</text>
      <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>内部状态（共享） + 外部状态（上下文传入）</text>
      {/* 享元工厂 */}
      <rect x={40} y={80} width={200} height={280} rx={10} fill={C.elevated} stroke={C.accent} strokeWidth={2} />
      <text x={140} y={108} textAnchor="middle" fontSize={13} fontWeight={600} fill={C.accent}>FlyweightFactory</text>
      <text x={140} y={128} textAnchor="middle" fontSize={11} fill={C.secondary}>getFlyweight(key)</text>
      {/* 共享池 */}
      {["Tree:Oak", "Tree:Pine", "Tree:Birch", "Grass", "Rock"].map((l, i) => (
        <g key={i}>
          <rect x={60} y={150+i*38} width={160} height={32} rx={6} fill={C.success} opacity={0.15} stroke={C.success} strokeWidth={1} />
          <text x={140} y={171+i*38} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.success}>{l}</text>
        </g>
      ))}
      {/* 客户端 */}
      <rect x={360} y={80} width={160} height={50} rx={8} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
      <text x={440} y={100} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Client</text>
      <text x={440} y={120} textAnchor="middle" fontSize={11} fill={C.warning}>x=10, y=20, scale=1</text>
      <rect x={360} y={150} width={160} height={50} rx={8} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
      <text x={440} y={170} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Client</text>
      <text x={440} y={190} textAnchor="middle" fontSize={11} fill={C.warning}>x=30, y=40, scale=1.5</text>
      <rect x={360} y={220} width={160} height={50} rx={8} fill={C.bg} stroke={C.warning} strokeWidth={1.5} />
      <text x={440} y={240} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Client</text>
      <text x={440} y={260} textAnchor="middle" fontSize={11} fill={C.warning}>x=5, y=80, scale=0.8</text>
      {/* 箭头 */}
      <text x={320} y={105} textAnchor="middle" fontSize={14} fill={C.success}>⬅ 共享</text>
      <text x={320} y={175} textAnchor="middle" fontSize={14} fill={C.success}>⬅ 共享</text>
      <text x={320} y={245} textAnchor="middle" fontSize={14} fill={C.success}>⬅ 共享</text>
      {/* 标签 */}
      <text x={140} y={340} textAnchor="middle" fontSize={11} fill={C.secondary}>内部状态（共享，不可变）</text>
      <text x={440} y={340} textAnchor="middle" fontSize={11} fill={C.warning}>外部状态（上下文，每个客户端不同）</text>
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 未区别内部/外部状态：每个对象独立存储全部数据，内存爆炸。修法：提取共享部分到 Flyweight</text>}
    </svg>
  );
}

// ─── Observer 模式：订阅发布图 ───
function ObserverViz({ fault }: { fault: boolean }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Observer 模式订阅发布图">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Observer 模式：订阅发布通知流</text>
      {/* Subject */}
      <rect x={340} y={70} width={220} height={60} rx={10} fill={C.accent} opacity={0.9} />
      <text x={450} y={96} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.bg}>Subject（主题）</text>
      <text x={450} y={116} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.85)">+ attach(obs) ; + detach(obs) ; + notify()</text>
      {/* 观察者列表 */}
      <text x={450} y={160} textAnchor="middle" fontSize={11} fill={C.secondary}>观察者列表</text>
      {["Observer A: UI", "Observer B: Achievements", "Observer C: Analytics", "Observer D: Audio"].map((l, i) => (
        <g key={i}>
          <rect x={190+i*140} y={180} width={130} height={50} rx={8} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
          <text x={255+i*140} y={200} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.primary}>{l.split(":")[0]}</text>
          <text x={255+i*140} y={220} textAnchor="middle" fontSize={11} fill={C.success}>{l.split(":")[1]}</text>
          {/* 通知箭头 */}
          <line x1={340+i*140+65} y1={130} x2={255+i*140} y2={180} stroke={C.accent} strokeWidth={1.5} markerEnd="url(#oba)" />
        </g>
      ))}
      <defs><marker id="oba" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill={C.accent} /></marker></defs>
      <text x={450} y={280} textAnchor="middle" fontSize={11} fill={C.secondary}>notify() 遍历观察者列表，逐个调用 update()</text>
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 观察者太多或通知太频繁导致性能问题。修法：事件队列异步处理，或合并批量通知</text>}
    </svg>
  );
}

// ─── Prototype 模式：克隆流程 ───
function PrototypeViz({ fault }: { fault: boolean }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Prototype 模式克隆流程">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Prototype 模式：原型克隆</text>
      <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>通过克隆现有对象创建新实例，避免子类爆炸</text>
      {/* 原型接口 */}
      <rect x={60} y={80} width={140} height={50} rx={8} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
      <text x={130} y={100} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.accent}>«interface»</text>
      <text x={130} y={120} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>Prototype</text>
      <text x={130} y={140} textAnchor="middle" fontSize={11} fill={C.accent}>+ clone()</text>
      {/* 具体原型 */}
      {["Monster_Skeleton", "Monster_Goblin", "Monster_Dragon", "Item_Sword"].map((l, i) => {
        const x = 60 + (i%2) * 220; const y = 180 + Math.floor(i/2) * 80;
        return (
          <g key={i}>
            <rect x={x} y={y} width={200} height={60} rx={8} fill={C.bg} stroke={C.success} strokeWidth={1.5} />
            <text x={x+100} y={y+24} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.primary}>{l}</text>
            <text x={x+100} y={y+44} textAnchor="middle" fontSize={11} fill={C.success}>health=100, speed=2.5</text>
            {/* 继承箭头 */}
            <line x1={x+100-20} y1={y} x2={130} y2={130} stroke={C.success} strokeWidth={1.5} strokeDasharray="5,3" />
            <polygon points={`${x+100-24},${134} ${x+100-20},${130} ${x+100-16},${134}`} fill={C.success} />
          </g>
        );
      })}
      {/* 克隆箭头 */}
      <text x={420} y={370} textAnchor="middle" fontSize={11} fill={C.success}>新怪物 = prototype.clone() → 修改属性 → 快速生成</text>
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 深拷贝 vs 浅拷贝陷阱：引用类型成员被共享修改。修法：实现深拷贝或使用写时复制</text>}
    </svg>
  );
}

// ─── Singleton 模式：唯一实例图 ───
function SingletonViz({ fault }: { fault: boolean }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Singleton 模式唯一实例">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Singleton 模式：确保全局唯一实例</text>
      <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>静态实例 + 私有构造 + 全局访问点</text>
      {/* 单例类 */}
      <rect x={330} y={80} width={240} height={130} rx={12} fill={C.bg} stroke={C.accent} strokeWidth={2} />
      <text x={450} y={110} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.accent}>GameManager</text>
      <line x1={340} y1={120} x2={560} y2={120} stroke={C.border} strokeWidth={1} />
      <text x={450} y={140} textAnchor="middle" fontSize={11} fill={C.secondary}>- instance: GameManager</text>
      <text x={450} y={160} textAnchor="middle" fontSize={11} fill={C.secondary}>- score: int</text>
      <text x={450} y={180} textAnchor="middle" fontSize={11} fill={C.secondary}>- player: Player</text>
      <line x1={340} y1={188} x2={560} y2={188} stroke={C.border} strokeWidth={1} />
      <text x={450} y={206} textAnchor="middle" fontSize={11} fill={C.accent}>+ getInstance(): GameManager</text>
      {/* 静态实例访问 */}
      {["UI System", "AI System", "Audio System", "Physics System", "Scripting", "Rendering"].map((l, i) => {
        const x = 50 + (i%3) * 200; const y = 260 + Math.floor(i/3) * 60;
        return (
          <g key={i}>
            <rect x={x} y={y} width={170} height={40} rx={8} fill={C.bg} stroke={C.warning} strokeWidth={1} />
            <text x={x+85} y={y+24} textAnchor="middle" fontSize={11} fontWeight={600} fill={C.primary}>{l}</text>
            <line x1={x+85} y1={y} x2={450} y2={210} stroke={C.border} strokeWidth={1} strokeDasharray="4,3" />
          </g>
        );
      })}
      <text x={450} y={390} textAnchor="middle" fontSize={11} fill={C.secondary}>所有子系统通过 GameManager.getInstance() 访问同一实例</text>
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 全局状态使测试困难、并发不安全。修法：使用依赖注入或用参数传递，减少全局依赖</text>}
    </svg>
  );
}

// ─── Double Buffer 模式：缓冲区交换 ───
function DoubleBufferViz({ fault }: { fault: boolean }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Double Buffer 双缓冲交换">
      <text x={VW/2} y={32} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>Double Buffer 模式：交换缓冲区</text>
      <text x={VW/2} y={52} textAnchor="middle" fontSize={11} fill={C.secondary}>写缓冲区 + 读缓冲区，交换避免撕裂</text>
      {/* 缓冲区 A */}
      <rect x={120} y={90} width={200} height={160} rx={10} fill={C.bg} stroke={C.accent} strokeWidth={2} />
      <text x={220} y={120} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.accent}>Buffer A</text>
      <line x1={130} y1={130} x2={310} y2={130} stroke={C.border} strokeWidth={1} />
      {[0,1,2,3,4,5].map(i => <rect key={i} x={130+i*30} y={140} width={28} height={28} rx={3} fill={C.accent} opacity={0.3} />)}
      <text x={220} y={195} textAnchor="middle" fontSize={11} fill={C.secondary}>当前帧数据</text>
      <text x={220} y={215} textAnchor="middle" fontSize={11} fill={C.accent}>⬆ 写入中</text>
      {/* 交换箭头 */}
      <text x={420} y={170} textAnchor="middle" fontSize={20} fill={C.warning}>⇄ swap</text>
      <text x={420} y={195} textAnchor="middle" fontSize={11} fill={C.secondary}>每帧交换</text>
      {/* 缓冲区 B */}
      <rect x={520} y={90} width={200} height={160} rx={10} fill={C.bg} stroke={C.success} strokeWidth={2} />
      <text x={620} y={120} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.success}>Buffer B</text>
      <line x1={530} y1={130} x2={710} y2={130} stroke={C.border} strokeWidth={1} />
      {[0,1,2,3,4,5].map(i => <rect key={i} x={530+i*30} y={140} width={28} height={28} rx={3} fill={C.success} opacity={0.3} />)}
      <text x={620} y={195} textAnchor="middle" fontSize={11} fill={C.secondary}>上一帧数据</text>
      <text x={620} y={215} textAnchor="middle" fontSize={11} fill={C.success}>⬇ 读取中</text>
      {/* 阶段 */}
      <rect x={120} y={280} width={600} height={70} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
      {["1. 写入 Buffer A", "2. 交换 swap()", "3. 读取 Buffer B", "4. 重复"].map((l, i) => (
        <g key={i}>
          <rect x={130+i*150} y={290} width={140} height={30} rx={6} fill={C.elevated} stroke={C.accent} strokeWidth={1} />
          <text x={200+i*150} y={310} textAnchor="middle" fontSize={11} fill={C.primary}>{l}</text>
          {i < 3 && <text x={270+i*150} y={308} textAnchor="middle" fontSize={14} fill={C.border}>→</text>}
        </g>
      ))}
      {fault && <text x={VW/2} y={VH-20} textAnchor="middle" fontSize={12} fill={C.danger} fontWeight={600}>⚠️ 单缓冲区：写入时被读取显示半帧数据（撕裂）。修法：双缓冲隔离读写操作</text>}
    </svg>
  );
}

const VIZ = {
  "01": ArchViz, "02": CommandViz, "07": StateViz, "09": GameLoopViz, "14": ComponentViz,
  "03": FlyweightViz, "04": ObserverViz, "05": PrototypeViz, "06": SingletonViz, "08": DoubleBufferViz,
};

export function GppPatternLab({ chapter }: { chapter: string }) {
  const Viz = (VIZ as any)[chapter] ?? ArchViz;
  const [fault, setFault] = useState(false);
  const reset = useCallback(() => setFault(false), []);
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 模式可视化</span>
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