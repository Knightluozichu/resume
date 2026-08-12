"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--sync-accent": "#be123c",
  "--sync-accent-soft": "#ffe4e6",
  "--sync-ink": "#172033",
  "--sync-muted": "#94a3b8",
  "--sync-warning": "#b45309",
  "--sync-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "A Simple Hybrid Lock",
  "Spinning, Thread Ownership, and Recursion",
  "Hybrid Constructs in the Framework Class Library",
  "The ManualResetEventSlim and SemaphoreSlim Classes",
  "The Monitor Class and Sync Blocks",
  "The ReaderWriterLockSlim Class",
  "The OneManyLock Class",
  "The CountdownEvent Class",
  "The Barrier Class",
  "Thread Synchronization Construct Summary",
  "The Famous Double-Check Locking Technique",
  "The Condition Variable Pattern",
  "Asynchronous Synchronization",
  "The Concurrent Collection Classes",
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

type LockMode = "fast" | "spin" | "block" | "owner" | "recursion";

export function CvcHybridLockLab() {
  const [mode, setMode] = useState<LockMode>("fast");
  const details = {
    fast: ["try acquire", "user-mode", "short critical"],
    spin: ["owner active", "SpinWait", "CPU budget"],
    block: ["long wait", "park", "wait queue"],
    owner: ["thread identity", "ownership", "release rule"],
    recursion: ["same thread", "recursion", "matching exit"],
  }[mode];
  const warning = mode === "spin" || mode === "recursion";

  return (
    <LabShell
      label="Hybrid Lock Lab"
      title="切换 fast path、spin、park、owner 与 recursion"
      description="先预测短竞争和长竞争会消耗什么，再观察 owner、release 和递归进入的语义；生产代码优先使用成熟同步构造。"
      onReset={() => setMode("fast")}
    >
      <div className="flex flex-wrap gap-2">
        {(["fast", "spin", "block", "owner", "recursion"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "fast"
                ? "fast path"
                : item === "spin"
                  ? "spin"
                  : item === "block"
                    ? "park"
                    : item === "owner"
                      ? "owner"
                      : "recursion"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} follows ${details[1]} and protects ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Hybrid synchronization path</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--sync-accent-soft)"
          stroke="var(--sync-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          contention
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--sync-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--sync-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--sync-surface)"
          stroke="var(--sync-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          construct
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-warning)"
        >
          {warning ? "semantic risk" : "bounded cost"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--sync-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--sync-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--sync-accent-soft)"
          stroke="var(--sync-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          guarantee
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--sync-warning)" : "var(--sync-accent)"}
        >
          {mode === "spin"
            ? "spin only while the owner is likely running briefly on another core; preemption turns spin into CPU waste"
            : mode === "recursion"
              ? "reentrancy can hide design errors; every successful entry needs a matching exit"
              : mode === "block"
                ? "long waits should park rather than consume a core, while shutdown must release or cancel waiters"
                : "a hybrid path is a state machine with ordering, ownership and wake-up obligations, not just a CAS loop"}
        </text>
      </svg>
    </LabShell>
  );
}

type PhaseMode = "monitor" | "permit" | "readwrite" | "countdown" | "barrier";

export function CvcPhaseCoordinationLab() {
  const [mode, setMode] = useState<PhaseMode>("monitor");
  const details = {
    monitor: ["predicate", "Monitor", "Pulse + Wait"],
    permit: ["capacity", "SemaphoreSlim", "permit"],
    readwrite: ["read/write", "RWLockSlim", "upgrade rule"],
    countdown: ["N producers", "CountdownEvent", "zero"],
    barrier: ["participants", "Barrier", "phase"],
  }[mode];
  const warning = mode === "barrier" || mode === "readwrite";

  return (
    <LabShell
      label="Phase Coordination Lab"
      title="比较 Monitor、SemaphoreSlim、RWLock、Countdown 与 Barrier"
      description="选择一个同步语义，先记录 owner、permit、predicate 或 participant，再检查 signal、upgrade、timeout 与异常后的解除责任。"
      onReset={() => setMode("monitor")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          ["monitor", "permit", "readwrite", "countdown", "barrier"] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "monitor"
              ? "Monitor"
              : item === "permit"
                ? "permit"
                : item === "readwrite"
                  ? "read/write"
                  : item === "countdown"
                    ? "countdown"
                    : "barrier"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} uses ${details[1]} and completes at ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Synchronization construct semantics</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--sync-accent-soft)"
          stroke="var(--sync-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          state
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--sync-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--sync-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--sync-surface)"
          stroke="var(--sync-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          construct
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-warning)"
        >
          {warning ? "failure policy" : "normal path"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--sync-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--sync-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--sync-accent-soft)"
          stroke="var(--sync-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          release
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--sync-warning)" : "var(--sync-accent)"}
        >
          {mode === "monitor"
            ? "Pulse is not data; a predicate protected by the same lock is the source of truth"
            : mode === "barrier"
              ? "a missing participant or failed phase must release the others through timeout, cancellation or failure policy"
              : mode === "readwrite"
                ? "upgradeable ownership is a separate slot and every enter must pair with an exit"
                : "choose the construct by semantic contract—permits, exclusivity or phases—not by a guessed microbenchmark"}
        </text>
      </svg>
    </LabShell>
  );
}

type AsyncMode = "lazy" | "mutex" | "channel" | "collection" | "shutdown";

export function CvcAsyncCollectionLab() {
  const [mode, setMode] = useState<AsyncMode>("lazy");
  const details = {
    lazy: ["singleton", "Lazy<T>", "safe publish"],
    mutex: ["await gap", "SemaphoreSlim", "permit"],
    channel: ["producer", "Channel", "backpressure"],
    collection: ["atomic op", "ConcurrentDictionary", "single call"],
    shutdown: ["completion", "drain/close", "in-flight"],
  }[mode];
  const warning = mode === "collection" || mode === "shutdown";

  return (
    <LabShell
      label="Async and Collection Lab"
      title="把 async exclusion、Lazy、concurrent collection 与 message passing 分开"
      description="切换一种 ownership 模型，先写出 permit、factory、channel capacity 和 completion，再观察 compound invariant 与 shutdown 的边界。"
      onReset={() => setMode("lazy")}
    >
      <div className="flex flex-wrap gap-2">
        {(["lazy", "mutex", "channel", "collection", "shutdown"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "lazy"
                ? "Lazy"
                : item === "mutex"
                  ? "async mutex"
                  : item === "channel"
                    ? "Channel"
                    : item === "collection"
                      ? "collection"
                      : "shutdown"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} uses ${details[1]} and preserves ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Asynchronous synchronization and collection ownership</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--sync-accent-soft)"
          stroke="var(--sync-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          producer
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--sync-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--sync-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--sync-surface)"
          stroke="var(--sync-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          ownership
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-warning)"
        >
          {warning ? "compound boundary" : "single owner"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--sync-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--sync-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--sync-accent-soft)"
          stroke="var(--sync-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--sync-ink)"
        >
          guarantee
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--sync-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--sync-warning)" : "var(--sync-accent)"}
        >
          {mode === "collection"
            ? "a thread-safe single operation does not make a multi-call invariant atomic; use one API, lock or one owner"
            : mode === "shutdown"
              ? "completion must stop admission, drain or cancel producers, close the channel and observe in-flight work"
              : mode === "mutex"
                ? "SemaphoreSlim can cross await, but acquire must succeed before finally Release and the critical region should stay small"
                : "make the ownership and publication rule explicit; syntax alone does not prove compound correctness"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcHybridThreadSynchronizationConstructsConceptLabels =
  conceptLabels;
