"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--async-accent": "#0f766e",
  "--async-accent-soft": "#ccfbf1",
  "--async-ink": "#172033",
  "--async-muted": "#94a3b8",
  "--async-warning": "#b45309",
  "--async-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Introducing the CLR's Thread Pool",
  "Performing a Simple Compute-Bound Operation",
  "Execution Contexts",
  "Cooperative Cancellation and Timeout",
  "Tasks",
  "Waiting for a Task to Complete and Getting Its Result",
  "Canceling a Task",
  "Starting a New Task Automatically When Another Task Completes",
  "A Task May Start Child Tasks Inside a Task",
  "Task Factories",
  "Task Schedulers",
  "Parallel's Static For, ForEach, and Invoke Methods",
  "Parallel Language Integrated Query",
  "Performing a Periodic Compute-Bound Operation",
  "So Many Timers, So Little Time",
  "How the Thread Pool Manages Its Threads",
  "Setting Thread Pool Limits",
  "How Worker Threads Are Managed",
] as const;

function ResetButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {label}
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
        <ResetButton onClick={onReset} label="重置实验" />
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

type PoolMode = "queue" | "inject" | "execute" | "block" | "retire";

export function CvcPoolSchedulingLab() {
  const [mode, setMode] = useState<PoolMode>("queue");
  const details = {
    queue: ["incoming work", "queue delay", "bounded"],
    inject: ["queue pressure", "worker injection", "carrier"],
    execute: ["short delegate", "worker", "CPU/core"],
    block: ["sync wait", "blocked worker", "starvation"],
    retire: ["idle worker", "retirement", "resource"],
  }[mode];
  const warning = mode === "block";

  return (
    <LabShell
      label="Pool Scheduling Lab"
      title="观察 queue、injection、execute、blocking 与 retire"
      description="切换线程池阶段，先预测 queue delay 与 worker 数的变化，再判断是短 CPU work、阻塞污染还是正常回收。"
      onReset={() => setMode("queue")}
    >
      <div className="flex flex-wrap gap-2">
        {(["queue", "inject", "execute", "block", "retire"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "queue"
                ? "queue"
                : item === "inject"
                  ? "inject"
                  : item === "execute"
                    ? "execute"
                    : item === "block"
                      ? "blocking"
                      : "retire"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} produces ${details[1]} and consumes ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Thread pool scheduling stages</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--async-accent-soft)"
          stroke="var(--async-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          work
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--async-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--async-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--async-surface)"
          stroke="var(--async-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          pool state
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-warning)"
        >
          {warning ? "shared resource risk" : "runtime heuristic"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--async-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--async-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--async-accent-soft)"
          stroke="var(--async-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          evidence
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--async-warning)" : "var(--async-accent)"}
        >
          {mode === "block"
            ? "blocking is shared-pool pollution; true async or bounded isolation is safer than blindly raising MinThreads"
            : mode === "inject"
              ? "injection responds to pressure with feedback delay; measure queue delay before changing a host-wide limit"
              : "the pool is process-wide; carrier count, CPU, queue delay and blocking stacks must be read together"}
        </text>
      </svg>
    </LabShell>
  );
}

type OutcomeMode = "run" | "success" | "fault" | "cancel" | "child";

export function CvcTaskOutcomeLab() {
  const [mode, setMode] = useState<OutcomeMode>("run");
  const details = {
    run: ["Task", "running", "consumer"],
    success: ["Task<T>", "result", "await"],
    fault: ["Task", "exception", "observe"],
    cancel: ["token", "Canceled", "cooperate"],
    child: ["parent", "children", "structured scope"],
  }[mode];
  const warning = mode === "fault" || mode === "child";

  return (
    <LabShell
      label="Task Outcome Lab"
      title="把 Task 的 result、fault、cancel 与 child ownership 画清楚"
      description="切换终态，先指定谁观察 outcome、谁拥有 token 和 children，再检查 fire-and-forget、loser task 或未观察 exception 的风险。"
      onReset={() => setMode("run")}
    >
      <div className="flex flex-wrap gap-2">
        {(["run", "success", "fault", "cancel", "child"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "run"
                ? "running"
                : item === "success"
                  ? "success"
                  : item === "fault"
                    ? "fault"
                    : item === "cancel"
                      ? "cancel"
                      : "child"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} reaches ${details[1]} and is owned by ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Task outcome ownership</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--async-accent-soft)"
          stroke="var(--async-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          operation
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--async-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--async-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--async-surface)"
          stroke="var(--async-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          terminal state
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-warning)"
        >
          {warning ? "ownership proof" : "awaitable"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--async-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--async-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--async-accent-soft)"
          stroke="var(--async-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          owner
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--async-warning)" : "var(--async-accent)"}
        >
          {mode === "fault"
            ? "await/Wait/Result observes failure; an unobserved Task is an orphaned outcome, not a harmless log"
            : mode === "cancel"
              ? "cancellation is cooperative and does not promise rollback; the owner still observes completion"
              : mode === "child"
                ? "only attached or explicitly composed children extend the parent; save and observe every other child"
                : "Task is an outcome object rather than a thread; its consumer owns observation, cleanup and shutdown"}
        </text>
      </svg>
    </LabShell>
  );
}

type ParallelMode = "grain" | "parallel" | "plinq" | "timer" | "shutdown";

export function CvcParallelTimerLab() {
  const [mode, setMode] = useState<ParallelMode>("grain");
  const details = {
    grain: ["input work", "partition", "break-even"],
    parallel: ["loop body", "workers", "merge"],
    plinq: ["IEnumerable", "PLINQ", "ordering"],
    timer: ["period tick", "callback", "overlap"],
    shutdown: ["stop signal", "dispose gate", "in-flight"],
  }[mode];
  const warning = mode === "timer" || mode === "shutdown";

  return (
    <LabShell
      label="Parallel and Timer Lab"
      title="比较 work grain、Parallel/PLINQ、timer overlap 与 shutdown"
      description="选择一种并行或周期模型，先写出 partition、ordering、backpressure 和 in-flight 责任，再观察是否会过度并行或丢失收尾。"
      onReset={() => setMode("grain")}
    >
      <div className="flex flex-wrap gap-2">
        {(["grain", "parallel", "plinq", "timer", "shutdown"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "grain"
                ? "work grain"
                : item === "parallel"
                  ? "Parallel"
                  : item === "plinq"
                    ? "PLINQ"
                    : item === "timer"
                      ? "timer"
                      : "shutdown"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} uses ${details[1]} and must preserve ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Parallel compute and timer lifecycle</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--async-accent-soft)"
          stroke="var(--async-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          source
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--async-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--async-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--async-surface)"
          stroke="var(--async-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          scheduler
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-warning)"
        >
          {warning ? "lifecycle gate" : "bounded degree"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--async-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--async-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--async-accent-soft)"
          stroke="var(--async-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--async-ink)"
        >
          contract
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--async-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--async-warning)" : "var(--async-accent)"}
        >
          {mode === "timer"
            ? "a callback can overlap when work exceeds the period; use a gate or await loop with explicit cancellation"
            : mode === "shutdown"
              ? "Dispose stops future ticks but shutdown must also await in-flight work and observe its exception"
              : mode === "plinq"
                ? "PLINQ can change ordering and adds merge cost; use it for pure, sufficiently coarse CPU work"
                : "parallel speedup requires grain larger than scheduling and merge overhead, with bounded degree and observable completion"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcComputeBoundAsynchronousOperationsConceptLabels = conceptLabels;
