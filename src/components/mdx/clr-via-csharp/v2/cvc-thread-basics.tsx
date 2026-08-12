"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--thread-accent": "#7c3aed",
  "--thread-soft": "#ede9fe",
  "--thread-ink": "#172033",
  "--thread-muted": "#94a3b8",
  "--thread-warning": "#b45309",
  "--thread-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Why Does Windows Support Threads?",
  "Thread Overhead",
  "Stop the Madness",
  "CPU Trends",
  "CLR Threads and Windows Threads",
  "Using a Dedicated Thread to Perform an Asynchronous Compute-Bound Operation",
  "Reasons to Use Threads",
  "Thread Scheduling and Priorities",
  "Foreground Threads vs. Background Threads",
  "What Now?",
] as const;

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      重置实验
    </button>
  );
}

function LabShell({
  label,
  title,
  description,
  onReset,
  children,
}: {
  label: string;
  title: string;
  description: string;
  onReset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      style={shellStyle}
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">{label}</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">
            {description}
          </p>
        </div>
        <ResetButton onClick={onReset} />
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

function ChoiceButtons<T extends string>({
  value,
  items,
  onChange,
}: {
  value: T;
  items: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={value === item}
          onClick={() => onChange(item)}
          className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium transition-colors ${value === item ? "border-accent bg-bg text-primary" : "border-border text-secondary hover:border-accent"}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function ThreadFlowDiagram({
  left,
  middle,
  right,
  middleNote,
  bottomNote,
  warning = false,
  centerLabel = "scheduler",
}: {
  left: string;
  middle: string;
  right: string;
  middleNote: string;
  bottomNote: string;
  warning?: boolean;
  centerLabel?: string;
}) {
  return (
    <svg
      viewBox="0 0 720 250"
      role="img"
      aria-label={`${left} enters ${middle}, then produces ${right}; ${bottomNote}`}
      className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
    >
      <title>Thread scheduling and ownership flow</title>
      <rect
        x="24"
        y="62"
        width="160"
        height="84"
        rx="12"
        fill="var(--thread-soft)"
        stroke="var(--thread-accent)"
        strokeWidth="3"
      />
      <text
        x="104"
        y="94"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--thread-ink)"
      >
        workload
      </text>
      <text
        x="104"
        y="121"
        textAnchor="middle"
        fontSize="12"
        fill="var(--thread-ink)"
      >
        {left}
      </text>
      <line
        x1="208"
        y1="104"
        x2="278"
        y2="104"
        stroke="var(--thread-accent)"
        strokeWidth="4"
      />
      <polygon points="278,104 266,97 266,111" fill="var(--thread-accent)" />
      <rect
        x="294"
        y="38"
        width="166"
        height="132"
        rx="12"
        fill="var(--thread-surface)"
        stroke="var(--thread-muted)"
        strokeWidth="3"
      />
      <text
        x="377"
        y="70"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--thread-ink)"
      >
        {centerLabel}
      </text>
      <text
        x="377"
        y="106"
        textAnchor="middle"
        fontSize="12"
        fill="var(--thread-ink)"
      >
        {middle}
      </text>
      <text
        x="377"
        y="136"
        textAnchor="middle"
        fontSize="12"
        fill="var(--thread-warning)"
      >
        {middleNote}
      </text>
      <line
        x1="484"
        y1="104"
        x2="538"
        y2="104"
        stroke="var(--thread-accent)"
        strokeWidth="4"
      />
      <polygon points="538,104 526,97 526,111" fill="var(--thread-accent)" />
      <rect
        x="554"
        y="62"
        width="142"
        height="84"
        rx="12"
        fill="var(--thread-soft)"
        stroke="var(--thread-accent)"
        strokeWidth="3"
      />
      <text
        x="625"
        y="94"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--thread-ink)"
      >
        observed
      </text>
      <text
        x="625"
        y="121"
        textAnchor="middle"
        fontSize="12"
        fill="var(--thread-ink)"
      >
        {right}
      </text>
      <text
        x="360"
        y="218"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning ? "var(--thread-warning)" : "var(--thread-accent)"}
      >
        {bottomNote}
      </text>
    </svg>
  );
}

type LifecycleMode = "stack" | "switch" | "tls" | "wait" | "overhead";

export function CvcThreadLifecycleLab() {
  const [mode, setMode] = useState<LifecycleMode>("stack");
  const details = {
    stack: ["new thread", "stack + TEB", "execution stream", "memory"],
    switch: ["runnable peers", "context switch", "next thread", "cache cost"],
    tls: ["managed code", "TLS / runtime", "thread-local state", "identity"],
    wait: ["I/O wait", "scheduler", "another runnable", "overlap"],
    overhead: ["many threads", "resource budget", "tail latency", "contention"],
  }[mode];
  const warning = mode === "overhead" || mode === "switch";

  return (
    <LabShell
      label="Thread Lifecycle Lab"
      title="观察 stack、切换、TLS 与等待成本"
      description="切换一个线程状态，先判断它占用的内存、调度与缓存资源，再观察 I/O 等待为何可以让调度器运行其它 runnable thread。"
      onReset={() => setMode("stack")}
    >
      <ChoiceButtons
        value={mode}
        items={["stack", "switch", "tls", "wait", "overhead"]}
        onChange={setMode}
      />
      <ThreadFlowDiagram
        left={details[0]}
        middle={details[1]}
        right={details[2]}
        middleNote={details[3]}
        warning={warning}
        bottomNote={
          mode === "wait"
            ? "a waiting thread is not running; the scheduler can overlap independent work"
            : mode === "switch"
              ? "context switches preserve correctness but disturb registers, cache and TLB locality"
              : mode === "overhead"
                ? "thread-per-work turns load into stack memory, scheduling and synchronization pressure"
                : "a thread is an execution carrier with a measurable resource budget"
        }
      />
    </LabShell>
  );
}

type WorkloadMode = "cpu" | "io" | "pool" | "dedicated" | "priority";

export function CvcWorkloadSizingLab() {
  const [mode, setMode] = useState<WorkloadMode>("cpu");
  const details = {
    cpu: ["CPU work", "bounded parallelism", "core utilization", "speedup"],
    io: ["async I/O", "completion", "no waiting worker", "overlap"],
    pool: ["short jobs", "thread pool", "queue delay", "reuse"],
    dedicated: [
      "legacy blocking",
      "dedicated worker",
      "isolated queue",
      "affinity",
    ],
    priority: [
      "runnable work",
      "priority hint",
      "selected thread",
      "not deadline",
    ],
  }[mode];
  const warning = mode === "priority" || mode === "dedicated";

  return (
    <LabShell
      label="Workload Sizing Lab"
      title="比较 CPU、I/O、pool 与 dedicated worker"
      description="切换 work 类型，观察它应该占用哪类 carrier；把 queue delay、active workers、CPU 和 wait reason 放进同一条诊断时间线。"
      onReset={() => setMode("cpu")}
    >
      <ChoiceButtons
        value={mode}
        items={["cpu", "io", "pool", "dedicated", "priority"]}
        onChange={setMode}
      />
      <ThreadFlowDiagram
        left={details[0]}
        middle={details[1]}
        right={details[2]}
        middleNote={details[3]}
        warning={warning}
        centerLabel="carrier choice"
        bottomNote={
          mode === "io"
            ? "async I/O avoids occupying a worker during the wait; completion still resumes on a thread"
            : mode === "pool"
              ? "bound admission and observe queue delay; raising worker count can hide blocking starvation"
              : mode === "dedicated"
                ? "dedicated means isolated ownership, not permission to create an unbounded thread per request"
                : mode === "priority"
                  ? "priority influences scheduling but cannot promise a deadline or repair a lock design"
                  : "CPU parallelism needs a bound near effective cores, quota and memory limits"
        }
      />
    </LabShell>
  );
}

type ShutdownMode = "foreground" | "background" | "cancel" | "join" | "fault";

export function CvcThreadShutdownLab() {
  const [mode, setMode] = useState<ShutdownMode>("foreground");
  const details = {
    foreground: [
      "host process",
      "foreground thread",
      "process stays",
      "lifetime",
    ],
    background: ["worker", "background flag", "process may exit", "truncation"],
    cancel: [
      "stop request",
      "CancellationToken",
      "cooperative exit",
      "checkpoint",
    ],
    join: ["draining queue", "Join deadline", "resources released", "owner"],
    fault: ["worker exception", "boundary", "reported outcome", "observation"],
  }[mode];
  const warning = mode === "background" || mode === "fault";

  return (
    <LabShell
      label="Thread Shutdown Lab"
      title="演练 foreground、background、cancel 与 Join"
      description="切换一个生命周期事件，先判断进程是否会继续、工作是否会丢失，再检查 stop、drain、Join、exception owner 与 resource release 是否闭环。"
      onReset={() => setMode("foreground")}
    >
      <ChoiceButtons
        value={mode}
        items={["foreground", "background", "cancel", "join", "fault"]}
        onChange={setMode}
      />
      <ThreadFlowDiagram
        left={details[0]}
        middle={details[1]}
        right={details[2]}
        middleNote={details[3]}
        warning={warning}
        centerLabel="shutdown protocol"
        bottomNote={
          mode === "background"
            ? "IsBackground only changes process-exit behavior; it does not drain queues or guarantee Dispose"
            : mode === "cancel"
              ? "cancellation is a request; the loop must observe it and the owner must await a bounded stop"
              : mode === "join"
                ? "stop admission, drain or cancel work, Join with a deadline, then release thread-owned resources"
                : mode === "fault"
                  ? "a worker boundary must report the exception and outcome; swallowing it leaves unknown state"
                  : "foreground lifetime is not a cleanup strategy; the component still owns a cooperative stop"
        }
      />
    </LabShell>
  );
}

export const cvcThreadBasicsConceptLabels = conceptLabels;
