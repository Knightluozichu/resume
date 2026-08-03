"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

type Region = "dpc" | "apc" | "workitem" | "seh" | "sync" | "lock";

type Scene = "interrupt" | "timer" | "threadExit" | "ioDone";

const details: Record<Region, { title: string; content: string }> = {
  dpc: {
    title: "延迟过程调用（DPC）",
    content:
      "DPC 把必须执行但不紧急的工作推迟到中断返回后：ISR 只做必要操作，把剩余工作排进 DPC 队列，系统在 IRQL DISPATCH_LEVEL 下执行 DPC。DPC 运行在任意线程上下文、不可等待——只能做非分页、短小、无锁等待的工作。",
  },
  apc: {
    title: "异步过程调用（APC）",
    content:
      "APC 像快递：投递到指定线程，在该线程下次进入可打断状态时执行，运行在目标线程的上下文（IRQL APC_LEVEL）。内核 APC 可用于线程通知、I/O 完成；用户模式 APC 用于异步回调。必须目标线程还活着、愿意被中断，APC 才会执行。",
  },
  workitem: {
    title: "工作项（Work Item）",
    content:
      "工作项把耗时任务外包给系统工作线程池，在 PASSIVE_LEVEL 下执行——可以等待、可以访问分页内存、可以拿锁。适合 DPC 里做不了的重活：从 DPC 排队工作项，把阻塞性操作挪到低 IRQL。代价是执行时机不确定。",
  },
  seh: {
    title: "结构化异常处理（SEH）",
    content:
      "SEH 用 __try/__except 捕获内核代码中的异常（除零、非法访问），避免异常直接触发 bug check。它像安全气囊：异常发生时先看有没有气囊，有就弹开，没有才撞墙（蓝屏）。内核里只捕获可恢复异常，捕获后必须把状态修正干净。",
  },
  sync: {
    title: "同步原语：事件 / 互斥体 / 信号量",
    content:
      "分发器对象（dispatcher objects）让线程在 PASSIVE_LEVEL 下等待条件：事件（通知有人设标志）、互斥体（互斥所有权）、信号量（固定名额）、执行体资源（读写区分）。共同点：可等待、可唤醒，但只能在低 IRQL 用——DISPATCH_LEVEL 以上等待 = 蓝屏。",
  },
  lock: {
    title: "高 IRQL 同步：自旋锁与互锁",
    content:
      "DISPATCH_LEVEL 及以上不能等待，只能忙等：自旋锁（spinlock）用 CPU 空转保护短临界区；互锁操作（InterlockedXxx）用一条原子指令改一个整数。自旋锁持有时间必须极短，且锁序必须一致，否则多核直接死锁。",
  },
};

const sceneMeta: Record<
  Scene,
  { label: string; route: Region; text: string }
> = {
  interrupt: {
    label: "硬件中断",
    route: "dpc",
    text: "ISR 只清中断 → 排队 DPC → 中断返回后在 DISPATCH_LEVEL 执行 DPC",
  },
  timer: {
    label: "定时器到期",
    route: "dpc",
    text: "定时器 DPC 到期回调 → 在 DISPATCH_LEVEL 执行 → 重活排队工作项",
  },
  threadExit: {
    label: "线程退出",
    route: "apc",
    text: "进程/线程通知回调 → 投递内核 APC → 目标线程上下文执行",
  },
  ioDone: {
    label: "I/O 完成",
    route: "workitem",
    text: "I/O 完成 DPC → 把阻塞操作外包给系统工作线程（PASSIVE_LEVEL）",
  },
};

export function Wkp06MechanismRouterLab() {
  const [selected, setSelected] = useState<Region>("dpc");
  const [scene, setScene] = useState<Scene | null>(null);
  const [lockView, setLockView] = useState(false);

  const reset = useCallback(() => {
    setSelected("dpc");
    setScene(null);
    setLockView(false);
  }, []);

  const strokeFor = (region: Region) =>
    selected === region ? C.accent : C.border;
  const strokeWidthFor = (region: Region) =>
    selected === region ? 2 : 1;

  const route = scene ? sceneMeta[scene].route : null;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 内核机制：延迟执行与同步路由图
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      {/* SVG Diagram */}
      <div className="p-4">
        <svg
          viewBox="0 0 720 560"
          className="w-full"
          role="img"
          aria-label="DPC、APC、工作项与同步原语路由图"
        >
          {/* Title */}
          <text
            x={360}
            y={36}
            textAnchor="middle"
            fontSize={16}
            fill={C.primary}
            fontWeight={600}
          >
            同一件事，三个执行上下文
          </text>

          {/* Scenes */}
          <text x={48} y={70} fontSize={13} fill={C.primary} fontWeight={500}>
            触发场景
          </text>
          {(Object.keys(sceneMeta) as Scene[]).map((key, i) => (
            <g
              key={key}
              onClick={() => {
                setScene(key);
                setSelected(sceneMeta[key].route);
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 160}
                y={80}
                width={152}
                height={36}
                rx={6}
                fill={scene === key ? C.accent : C.bg}
                stroke={scene === key ? C.accent : C.border}
                strokeWidth={scene === key ? 2 : 1}
              />
              <text
                x={124 + i * 160}
                y={102}
                textAnchor="middle"
                fontSize={11}
                fill={scene === key ? C.bg : C.primary}
                fontWeight={500}
              >
                {sceneMeta[key].label}
              </text>
            </g>
          ))}

          {/* Main execution path */}
          <rect
            x={48}
            y={140}
            width={624}
            height={44}
            rx={8}
            fill={C.bg}
            stroke={C.border}
          />
          <text x={64} y={158} fontSize={12} fill={C.primary} fontWeight={500}>
            当前线程执行流（任意 IRQL）
          </text>
          <text x={64} y={176} fontSize={11} fill={C.secondary}>
            场景发生时，工作被路由到下方三个执行上下文之一
          </text>

          {/* DPC route */}
          <g onClick={() => setSelected("dpc")} className="cursor-pointer">
            <rect
              x={48}
              y={216}
              width={192}
              height={96}
              rx={8}
              fill={route === "dpc" ? C.accent : C.bg}
              stroke={strokeFor("dpc")}
              strokeWidth={route === "dpc" ? 2 : strokeWidthFor("dpc")}
            />
            <text x={144} y={244} textAnchor="middle" fontSize={13} fill={C.primary} fontWeight={500}>
              DPC 延迟过程调用
            </text>
            <text x={144} y={268} textAnchor="middle" fontSize={11} fill={C.secondary}>
              执行：DISPATCH_LEVEL · 任意线程
            </text>
            <text x={144} y={288} textAnchor="middle" fontSize={11} fill={C.secondary}>
              不可等待 · 只能非分页短活
            </text>
          </g>

          {/* APC route */}
          <g onClick={() => setSelected("apc")} className="cursor-pointer">
            <rect
              x={264}
              y={216}
              width={192}
              height={96}
              rx={8}
              fill={route === "apc" ? C.accent : C.bg}
              stroke={strokeFor("apc")}
              strokeWidth={route === "apc" ? 2 : strokeWidthFor("apc")}
            />
            <text x={360} y={244} textAnchor="middle" fontSize={13} fill={C.primary} fontWeight={500}>
              APC 异步过程调用
            </text>
            <text x={360} y={268} textAnchor="middle" fontSize={11} fill={C.secondary}>
              执行：APC_LEVEL · 目标线程
            </text>
            <text x={360} y={288} textAnchor="middle" fontSize={11} fill={C.secondary}>
              快递投递 · 等目标线程可打断
            </text>
          </g>

          {/* Work item route */}
          <g onClick={() => setSelected("workitem")} className="cursor-pointer">
            <rect
              x={480}
              y={216}
              width={192}
              height={96}
              rx={8}
              fill={route === "workitem" ? C.accent : C.bg}
              stroke={strokeFor("workitem")}
              strokeWidth={route === "workitem" ? 2 : strokeWidthFor("workitem")}
            />
            <text x={576} y={244} textAnchor="middle" fontSize={13} fill={C.primary} fontWeight={500}>
              工作项 Work Item
            </text>
            <text x={576} y={268} textAnchor="middle" fontSize={11} fill={C.secondary}>
              执行：PASSIVE_LEVEL · 系统线程
            </text>
            <text x={576} y={288} textAnchor="middle" fontSize={11} fill={C.secondary}>
              可等待 · 可访问分页内存
            </text>
          </g>

          {/* Route arrows */}
          {route && (
            <g>
              <line x1={144} y1={184} x2={144} y2={212} stroke={C.accent} strokeWidth={2} />
              <polygon points="140,208 148,208 144,216" fill={C.accent} />
              {route === "apc" && (
                <line x1={360} y1={184} x2={360} y2={212} stroke={C.accent} strokeWidth={2} />
              )}
              {route === "workitem" && (
                <line x1={576} y1={184} x2={576} y2={212} stroke={C.accent} strokeWidth={2} />
              )}
            </g>
          )}

          {/* SEH */}
          <g onClick={() => setSelected("seh")} className="cursor-pointer">
            <rect
              x={48}
              y={336}
              width={288}
              height={84}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("seh")}
              strokeWidth={strokeWidthFor("seh")}
            />
            <text x={64} y={362} fontSize={13} fill={C.primary} fontWeight={500}>
              异常：结构化异常处理（SEH）
            </text>
            <text x={64} y={386} fontSize={11} fill={C.secondary}>
              __try/__except 捕获 → 检查现场 → 修正后继续
            </text>
            <text x={64} y={404} fontSize={11} fill={C.secondary}>
              未捕获 → 系统 bug check（蓝屏）
            </text>
          </g>

          {/* Sync primitives */}
          <g onClick={() => setSelected("sync")} className="cursor-pointer">
            <rect
              x={360}
              y={336}
              width={312}
              height={84}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("sync")}
              strokeWidth={strokeWidthFor("sync")}
            />
            <text x={376} y={362} fontSize={13} fill={C.primary} fontWeight={500}>
              低 IRQL 同步：可等待的分发器对象
            </text>
            <text x={376} y={386} fontSize={11} fill={C.secondary}>
              事件（通知）/ 互斥体（独占）/ 信号量（名额）
            </text>
            <text x={376} y={404} fontSize={11} fill={C.secondary}>
              Wait 只能在 PASSIVE_LEVEL——高 IRQL 等待 = 蓝屏
            </text>
          </g>

          {/* High IRQL sync */}
          <g onClick={() => setSelected("lock")} className="cursor-pointer">
            <rect
              x={48}
              y={440}
              width={624}
              height={64}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("lock")}
              strokeWidth={strokeWidthFor("lock")}
            />
            <text x={64} y={466} fontSize={12} fill={C.primary} fontWeight={500}>
              高 IRQL 同步：自旋锁（忙等）与互锁操作（原子指令）
            </text>
            <text x={64} y={488} fontSize={11} fill={C.secondary}>
              临界区必须极短 · 锁序必须一致 · 不能等待只能空转
            </text>
          </g>

          {/* Lock view toggle */}
          <g onClick={() => setLockView(!lockView)} className="cursor-pointer">
            <rect
              x={48}
              y={520}
              width={44}
              height={22}
              rx={11}
              fill={lockView ? C.accent : C.elevated}
              stroke={C.border}
            />
            <circle
              cx={lockView ? 76 : 60}
              cy={531}
              r={8}
              fill={lockView ? C.bg : C.secondary}
            />
          </g>
          <text x={104} y={535} fontSize={11} fill={lockView ? C.accent : C.secondary}>
            {lockView
              ? "锁视图：自旋锁在 DISPATCH_LEVEL 忙等，互锁操作单条原子指令"
              : "锁视图关闭：只看同步原语概览"}
          </text>
          <text x={48} y={556} fontSize={11} fill={C.secondary}>
            提示：IRQL 选择规则见第 3 章；本图展示机制之间的路由关系
          </text>
        </svg>

        {/* Scene result strip */}
        {scene && (
          <div className="mt-4 rounded-control border border-border p-4" style={{ background: C.bg }}>
            <p className="text-sm leading-relaxed" style={{ color: C.accent }}>
              ⚡ 场景「{sceneMeta[scene].label}」→ {sceneMeta[scene].text}
            </p>
          </div>
        )}

        {/* Detail Panel */}
        <div className="mt-4 rounded-control border border-border p-4" style={{ background: C.bg }}>
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: C.accent }}
            />
            <span className="text-sm font-medium" style={{ color: C.primary }}>
              {details[selected].title}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: C.secondary }}>
            {details[selected].content}
          </p>
        </div>
      </div>
    </div>
  );
}
