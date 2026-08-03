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

type Region = "processCb" | "threadCb" | "imageCb" | "queue" | "userMode" | "unload";

type EventKind = "process" | "thread" | "image";

const details: Record<Region, { title: string; content: string }> = {
  processCb: {
    title: "进程通知回调",
    content:
      "用 PsSetCreateProcessNotifyRoutineEx 注册：每次进程创建或退出，内核调用你的回调，传入进程 ID、父进程 ID 和创建标志。回调运行在 APC_LEVEL 附近，必须短小——只记录事件、填队列，绝不阻塞或做重活。",
  },
  threadCb: {
    title: "线程通知回调",
    content:
      "用 PsSetCreateThreadNotifyRoutine 注册：每次线程创建或退出都收到通知，参数包括进程 ID 和线程 ID。线程通知比进程通知频繁得多（一个进程能开几十个线程），回调必须更快、队列要按丢弃策略设计。",
  },
  imageCb: {
    title: "映像加载通知",
    content:
      "用 PsSetLoadImageNotifyRoutine 注册：每次任何进程加载 DLL/EXE 时收到通知，参数是映像路径（已带 \\SystemRoot 前缀）和映像基址。可用于监控可执行模块加载，常与进程通知配合做“哪个进程加载了什么”的关联分析。",
  },
  queue: {
    title: "事件队列",
    content:
      "回调里不能直接做重活，标准做法是“回调登记 + 队列搬运”：回调把事件塞进环形队列（自旋锁保护），后台线程或工作项把队列内容批量送给用户模式。队列满时必须丢弃并计数——丢弃可统计，丢失不可察觉才是事故。",
  },
  userMode: {
    title: "用户模式数据通道",
    content:
      "队列里的数据通过设备 IOCTL 提供给用户模式：客户端轮询或等待事件，一次取走一批记录。协议要包含事件序号和丢弃计数，让客户端发现“中间丢了多少条”。回调侧只写队列，用户侧只读队列，两侧互不阻塞。",
  },
  unload: {
    title: "注销回调",
    content:
      "卸载前必须用 PsRemoveCreateProcessNotifyRoutine / PsRemoveCreateThreadNotifyRoutine 注销回调——注销后内核保证不再调用你的回调，此时才能安全释放队列和缓冲区。先停新事件，再排空队列，最后释放资源。",
  },
};

const eventMeta: Record<
  EventKind,
  { label: string; cb: Region; record: string; irql: string }
> = {
  process: {
    label: "进程创建/退出",
    cb: "processCb",
    record: "[proc] PID=1234 PPID=888 创建 (CreationStatus=0)",
    irql: "回调运行：APC_LEVEL，禁止等待",
  },
  thread: {
    label: "线程创建/退出",
    cb: "threadCb",
    record: "[thrd] PID=1234 TID=5678 创建",
    irql: "回调运行：APC_LEVEL，必须极短",
  },
  image: {
    label: "映像加载",
    cb: "imageCb",
    record: "[img ] PID=1234 \\SystemRoot\\System32\\notepad.exe 基址=0x7ff60000",
    irql: "回调运行：PASSIVE/APC 之间，路径不可分页",
  },
};

const queueRecords: string[] = [
  "[proc] PID=1234 PPID=888 创建",
  "[proc] PID=1234 退出",
  "[thrd] PID=1234 TID=5678 创建",
  "[img ] PID=1234 \\SystemRoot\\System32\\notepad.exe",
  "[thrd] PID=1234 TID=5679 创建",
  "[proc] PID=1240 PPID=888 创建",
];

export function Wkp08NotificationPipeLab() {
  const [selected, setSelected] = useState<Region>("processCb");
  const [eventKind, setEventKind] = useState<EventKind>("process");
  const [queueFull, setQueueFull] = useState(false);
  const [dropped, setDropped] = useState(0);

  const reset = useCallback(() => {
    setSelected("processCb");
    setEventKind("process");
    setQueueFull(false);
    setDropped(0);
  }, []);

  const strokeFor = (region: Region) =>
    selected === region ? C.accent : C.border;
  const strokeWidthFor = (region: Region) =>
    selected === region ? 2 : 1;

  const emit = () => {
    if (queueFull) {
      setDropped((d) => d + 1);
    }
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 进程 / 线程 / 映像通知管道
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
          aria-label="进程线程映像通知回调到用户模式事件的管道图"
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
            通知管道：内核事件 → 回调 → 队列 → 用户模式
          </text>

          {/* Event sources */}
          <text x={48} y={70} fontSize={13} fill={C.primary} fontWeight={500}>
            事件源（选择一种通知类型）
          </text>
          {(Object.keys(eventMeta) as EventKind[]).map((key, i) => (
            <g
              key={key}
              onClick={() => {
                setEventKind(key);
                setSelected(eventMeta[key].cb);
                emit();
              }}
              className="cursor-pointer"
            >
              <rect
                x={48 + i * 208}
                y={80}
                width={200}
                height={36}
                rx={6}
                fill={eventKind === key ? C.accent : C.bg}
                stroke={eventKind === key ? C.accent : C.border}
                strokeWidth={eventKind === key ? 2 : 1}
              />
              <text
                x={148 + i * 208}
                y={102}
                textAnchor="middle"
                fontSize={11}
                fill={eventKind === key ? C.bg : C.primary}
                fontWeight={500}
              >
                {eventMeta[key].label}
              </text>
            </g>
          ))}

          {/* Kernel callback box */}
          <g onClick={() => setSelected(eventMeta[eventKind].cb)} className="cursor-pointer">
            <rect
              x={48}
              y={136}
              width={624}
              height={84}
              rx={8}
              fill={C.bg}
              stroke={strokeFor(eventMeta[eventKind].cb)}
              strokeWidth={strokeWidthFor(eventMeta[eventKind].cb)}
            />
            <text x={64} y={162} fontSize={13} fill={C.primary} fontWeight={500}>
              内核回调（注册：PsSetCreateProcessNotifyRoutineEx 等）
            </text>
            <text x={64} y={186} fontSize={11} fill={C.secondary}>
              {eventMeta[eventKind].irql}
            </text>
            <text x={64} y={206} fontSize={11} fill={C.secondary}>
              回调只做登记：填一条事件记录，绝不做重活、绝不等待
            </text>
          </g>

          {/* Arrow callback → queue */}
          <line x1={360} y1={220} x2={360} y2={248} stroke={C.accent} strokeWidth={2} />
          <polygon points="356,244 364,244 360,252" fill={C.accent} />

          {/* Queue */}
          <g onClick={() => setSelected("queue")} className="cursor-pointer">
            <rect
              x={48}
              y={252}
              width={624}
              height={120}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("queue")}
              strokeWidth={strokeWidthFor("queue")}
            />
            <text x={64} y={278} fontSize={13} fill={C.primary} fontWeight={500}>
              事件队列（环形缓冲，自旋锁保护）
            </text>
            {queueRecords.map((rec, i) => (
              <text
                key={i}
                x={64}
                y={300 + i * 11}
                fontSize={11}
                fill={i === 0 ? C.accent : C.secondary}
              >
                {rec}
              </text>
            ))}
            {queueFull && (
              <text x={480} y={300} fontSize={11} fill={C.danger} fontWeight={600}>
                队列满 → 丢弃
              </text>
            )}
            <text x={64} y={372 - 8} fontSize={11} fill={C.secondary}>
              丢弃计数：{dropped} 条（客户端可通过协议感知丢失）
            </text>
          </g>

          {/* Queue full toggle */}
          <g
            onClick={() => {
              setQueueFull(!queueFull);
            }}
            className="cursor-pointer"
          >
            <rect
              x={48}
              y={392}
              width={44}
              height={22}
              rx={11}
              fill={queueFull ? C.danger : C.elevated}
              stroke={C.border}
            />
            <circle
              cx={queueFull ? 76 : 60}
              cy={403}
              r={8}
              fill={queueFull ? C.bg : C.secondary}
            />
          </g>
          <text x={104} y={407} fontSize={11} fill={queueFull ? C.danger : C.secondary}>
            {queueFull ? "队列满：新事件被丢弃并计数" : "队列有空位：事件正常入队"}
          </text>

          {/* User mode channel */}
          <g onClick={() => setSelected("userMode")} className="cursor-pointer">
            <rect
              x={48}
              y={432}
              width={624}
              height={92}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("userMode")}
              strokeWidth={strokeWidthFor("userMode")}
            />
            <text x={64} y={458} fontSize={13} fill={C.primary} fontWeight={500}>
              用户模式客户（IOCTL 批量取走）
            </text>
            <text x={64} y={482} fontSize={11} fill={C.secondary}>
              DeviceIoControl(IOCTL_GET_EVENTS) → 一次取回一批事件记录
            </text>
            <text x={64} y={502} fontSize={11} fill={C.secondary}>
              协议含序号与丢弃计数：客户端能发现"中间少了 N 条"
            </text>
          </g>

          {/* Unload */}
          <g onClick={() => setSelected("unload")} className="cursor-pointer">
            <rect
              x={48}
              y={540 - 48}
              width={624}
              height={40}
              rx={8}
              fill={C.bg}
              stroke={strokeFor("unload")}
              strokeWidth={strokeWidthFor("unload")}
            />
            <text x={64} y={540 - 30} fontSize={11} fill={C.primary}>
              卸载：先注销回调（PsRemove*NotifyRoutine）→ 再排空队列 → 最后释放缓冲区
            </text>
            <text x={64} y={540 - 12} fontSize={11} fill={C.secondary}>
              注销返回后内核保证不再调用回调，此时才能安全释放资源
            </text>
          </g>
        </svg>

        {/* Latest event strip */}
        <div className="mt-4 rounded-control border border-border p-4" style={{ background: C.bg }}>
          <p className="text-sm leading-relaxed" style={{ color: C.accent }}>
            ⚡ 最新事件：{eventMeta[eventKind].record}
          </p>
        </div>

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
