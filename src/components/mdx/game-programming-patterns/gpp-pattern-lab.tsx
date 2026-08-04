"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type Node = { id: string; label: string; title: string; content: string; failure?: { title: string; desc: string } };

const CH = {
  "01": {
    title: "游戏架构：性能、模式与游戏",
    subtitle: "命令/Update/组件等模式如何协同工作",
    nodes: [
      { id: "r", label: "渲染", title: "渲染系统", content: "把游戏世界状态转为屏幕图像。需要管理帧率、 VSync、着色器切换与绘制调用批次。" },
      { id: "p", label: "物理", title: "物理系统", content: "模拟碰撞检测与刚体动力学。时间步长决定稳定性，固定时间步与 Update 解耦是常见做法。", failure: { title: "累计误差", desc: "可变时间步长导致物理表现不一致。修法：固定时间步 + 累计剩余时间。" } },
      { id: "a", label: "音频", title: "音频系统", content: "管理音效加载、空间定位与混音。异步加载防卡顿，池化播放句柄防泄漏。" },
      { id: "i", label: "AI", title: "AI 系统", content: "决策树、状态机与寻路。每个 AI 实体独立更新，共享导航网格。" },
      { id: "s", label: "脚本", title: "脚本系统", content: "数据驱动配置与行为脚本。用字节码或 Lua 解释执行，避免硬编码。" },
    ],
  },
  "02": {
    title: "Command 模式",
    subtitle: "把请求封装为对象，支持队列、撤销和重放",
    nodes: [
      { id: "c", label: "Command", title: "Command 接口", content: "声明 execute() 与 undo() 方法。每个命令封装一个操作及其参数，让调用者与执行者解耦。" },
      { id: "cc", label: "ConcreteCommand", title: "具体命令", content: "实现 Command 接口，绑定接收者与其操作的参数。例如 JumpCommand、FireCommand、MoveCommand。", failure: { title: "硬编码", desc: "直接在输入处理中调用角色方法，导致重绑定、回放和撤销互相缠绕。修法：把输入转为命令对象。" } },
      { id: "i", label: "Invoker", title: "调用者", content: "持有命令并决定何时执行。可以是输入处理器、AI 决策器或回放系统。" },
      { id: "r", label: "Receiver", title: "接收者", title: "接收者", content: "知道如何执行实际操作。命令把请求转发给接收者，接收者完成具体逻辑。" },
    ],
  },
  "07": {
    title: "State 模式",
    subtitle: "封装状态及其行为，让对象在不同状态下表现不同",
    nodes: [
      { id: "c", label: "Context", title: "上下文（Context）", content: "持有当前状态引用，把请求委托给状态对象处理。状态切换通过替换状态引用完成。" },
      { id: "s", label: "State", title: "状态接口", content: "声明各状态下的行为方法。每个状态只关心自己负责的事件，忽略不相关的事件。" },
      { id: "cs", label: "ConcreteState", title: "具体状态", content: "实现特定状态下的行为。例如 IdleState、RunningState、JumpingState、AttackingState。", failure: { title: "条件爆炸", desc: "用 if-else 或 switch 处理所有状态组合，代码膨胀且难以维护。修法：每个状态一个类。" } },
      { id: "t", label: "Transition", title: "状态转换", content: "由事件触发或条件满足时发生。可在状态内定义转换规则，也可由集中式状态机管理。" },
    ],
  },
  "09": {
    title: "Game Loop 模式",
    subtitle: "游戏循环：处理输入 → 更新 → 渲染",
    nodes: [
      { id: "i", label: "输入", title: "处理输入 ProcessInput", content: "读取键盘、鼠标、手柄等外设输入，转换为命令或事件。在帧开始处一次性处理，避免帧内多次读取。" },
      { id: "u", label: "更新", title: "更新 Update", content: "推进游戏世界状态：移动角色、检测碰撞、更新 AI、播放动画。固定时间步保证物理稳定性。", failure: { title: "可变步长", desc: "用可变时间步更新物理导致抖动量不守恒。修法：固定时间步积累，每次消耗固定步长。" } },
      { id: "r", label: "渲染", title: "渲染 Render", content: "把当前游戏世界状态绘制到屏幕。与 Update 分离，让渲染可以独立于更新频率。" },
    ],
  },
  "14": {
    title: "Component 模式",
    subtitle: "用组合替代继承，让实体可灵活组装",
    nodes: [
      { id: "g", label: "GameObject", title: "游戏对象", content: "容器对象，持有多个 Component 实例。本身不做具体行为，只负责组件的增删查与管理生命周期。" },
      { id: "c", label: "Component", title: "组件基类", content: "定义组件接口（如 update()、render()、handleInput()）。每个组件只关注一个单一职责。" },
      { id: "ic", label: "实现组件", title: "具体组件", content: "实现组件接口的类。例如 InputComponent、PhysicsComponent、GraphicsComponent、HealthComponent。", failure: { title: "上帝类", desc: "一个类包含所有功能，代码上万行。修法：按功能拆分为独立组件，GameObject 作为容器。" } },
      { id: "m", label: "消息", title: "组件间通信", content: "组件通过消息或事件总线通信，避免直接耦合。组件通过容器转发消息给其他组件。" },
    ],
  },
};

const viewW = 780; const viewH = 340; const nodeW = 150; const nodeH = 100; const gap = 16;

export function GppPatternLab({ chapter }: { chapter: string }) {
  const spec = (CH as any)[chapter] ?? CH["01"];
  const [selected, setSelected] = useState(spec.nodes[0].id);
  const [injectFaults, setInjectFaults] = useState(false);
  const reset = useCallback(() => { setSelected(spec.nodes[0].id); setInjectFaults(false); }, [spec]);
  const stage = spec.nodes.find((n: Node) => n.id === selected)!;
  const totalW = spec.nodes.length * nodeW + (spec.nodes.length - 1) * gap;
  const startX = (viewW - totalW) / 2;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ {spec.title}</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label={spec.title}>
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>{spec.title}</text>
          <text x={viewW / 2} y={56} textAnchor="middle" fontSize={11} fill={C.secondary}>{spec.subtitle}</text>
          {spec.nodes.map((n: Node, i: number) => {
            const x = startX + i * (nodeW + gap);
            const isSel = selected === n.id;
            const isFail = injectFaults && !!n.failure;
            return (
              <g key={n.id} onClick={() => setSelected(n.id)} className="cursor-pointer">
                <rect
                  x={x} y={90} width={nodeW} height={nodeH} rx={8}
                  fill={isSel ? C.accent : C.bg}
                  stroke={isFail ? C.danger : isSel ? C.accent : C.border}
                  strokeWidth={isSel ? 2 : 1}
                  opacity={isSel ? 0.9 : 1}
                />
                <text x={x + nodeW / 2} y={118} textAnchor="middle" fontSize={12} fontWeight={600} fill={isSel ? C.bg : C.primary}>{n.label}</text>
                <text x={x + nodeW / 2} y={140} textAnchor="middle" fontSize={11} fill={isSel ? "rgba(255,255,255,0.85)" : C.secondary}>{n.title}</text>
                {isFail && <text x={x + nodeW / 2} y={174} textAnchor="middle" fontSize={11} fill={C.danger} fontWeight={600}>⚠️ {n.failure!.title}</text>}
              </g>
            );
          })}
          <rect x={20} y={210} width={viewW - 40} height={100} rx={8} fill={C.bg} stroke={C.border} strokeWidth={1} />
          <text x={36} y={236} fontSize={12} fontWeight={600} fill={C.primary}>{stage.title}</text>
          <text x={36} y={256} fontSize={11} fill={C.secondary}>{stage.content}</text>
          {injectFaults && stage.failure && (
            <text x={36} y={280} fontSize={11} fill={C.danger}>{stage.failure.desc}</text>
          )}
        </svg>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <label className="flex cursor-pointer items-center gap-3">
            <button
              onClick={() => setInjectFaults(!injectFaults)}
              className="relative h-5 w-9 rounded-full border border-border transition-colors"
              style={{ background: injectFaults ? C.accent : C.elevated }}
              aria-label="注入常见误区"
            >
              <span className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform" style={{ transform: injectFaults ? "translateX(16px)" : "translateX(0)" }} />
            </button>
            <span className="text-xs" style={{ color: C.secondary }}>注入常见误区</span>
          </label>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>
      </div>
    </div>
  );
}