"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--primitive-accent": "#0f766e",
  "--primitive-soft": "#ccfbf1",
  "--primitive-ink": "#172033",
  "--primitive-muted": "#94a3b8",
  "--primitive-warning": "#b45309",
  "--primitive-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Class Libraries and Thread Safety",
  "Primitive User-Mode and Kernel-Mode Constructs",
  "User-Mode Constructs",
  "Volatile Constructs",
  "C#'s Support for Volatile Fields",
  "Interlocked Constructs",
  "Implementing a Simple Spin Lock",
  "The Interlocked Anything Pattern",
  "Kernel-Mode Constructs",
  "Event Constructs",
  "Semaphore Constructs",
  "Mutex Constructs",
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

function ThreeStageDiagram({
  left,
  middle,
  right,
  middleNote,
  bottomNote,
  warning = false,
  centerLabel = "protocol",
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
      <title>Primitive synchronization protocol</title>
      <rect
        x="24"
        y="62"
        width="160"
        height="84"
        rx="12"
        fill="var(--primitive-soft)"
        stroke="var(--primitive-accent)"
        strokeWidth="3"
      />
      <text
        x="104"
        y="94"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--primitive-ink)"
      >
        shared state
      </text>
      <text
        x="104"
        y="121"
        textAnchor="middle"
        fontSize="12"
        fill="var(--primitive-ink)"
      >
        {left}
      </text>
      <line
        x1="208"
        y1="104"
        x2="278"
        y2="104"
        stroke="var(--primitive-accent)"
        strokeWidth="4"
      />
      <polygon points="278,104 266,97 266,111" fill="var(--primitive-accent)" />
      <rect
        x="294"
        y="38"
        width="166"
        height="132"
        rx="12"
        fill="var(--primitive-surface)"
        stroke="var(--primitive-muted)"
        strokeWidth="3"
      />
      <text
        x="377"
        y="70"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--primitive-ink)"
      >
        {centerLabel}
      </text>
      <text
        x="377"
        y="106"
        textAnchor="middle"
        fontSize="12"
        fill="var(--primitive-ink)"
      >
        {middle}
      </text>
      <text
        x="377"
        y="136"
        textAnchor="middle"
        fontSize="12"
        fill="var(--primitive-warning)"
      >
        {middleNote}
      </text>
      <line
        x1="484"
        y1="104"
        x2="538"
        y2="104"
        stroke="var(--primitive-accent)"
        strokeWidth="4"
      />
      <polygon points="538,104 526,97 526,111" fill="var(--primitive-accent)" />
      <rect
        x="554"
        y="62"
        width="142"
        height="84"
        rx="12"
        fill="var(--primitive-soft)"
        stroke="var(--primitive-accent)"
        strokeWidth="3"
      />
      <text
        x="625"
        y="94"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--primitive-ink)"
      >
        observation
      </text>
      <text
        x="625"
        y="121"
        textAnchor="middle"
        fontSize="12"
        fill="var(--primitive-ink)"
      >
        {right}
      </text>
      <text
        x="360"
        y="218"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={warning ? "var(--primitive-warning)" : "var(--primitive-accent)"}
      >
        {bottomNote}
      </text>
    </svg>
  );
}

type PrimitiveMode =
  | "immutable"
  | "volatile"
  | "interlocked"
  | "spin"
  | "kernel";

export function CvcPrimitiveChoiceLab() {
  const [mode, setMode] = useState<PrimitiveMode>("immutable");
  const details = {
    immutable: [
      "published snapshot",
      "no mutation",
      "shared safely",
      "ownership",
    ],
    volatile: ["single field", "Volatile.Read/Write", "visibility", "ordering"],
    interlocked: [
      "one location",
      "CompareExchange",
      "linearization",
      "atomic RMW",
    ],
    spin: ["short contention", "SpinWait", "bounded CPU", "owner running"],
    kernel: ["long wait", "WaitHandle", "blocked thread", "OS signal"],
  }[mode];
  const warning = mode === "volatile" || mode === "spin";

  return (
    <LabShell
      label="Primitive Choice Lab"
      title="先按共享状态选择同步原语"
      description="切换共享状态与等待形态，观察它们对应的原子性、可见性、CPU 成本和阻塞语义；最后再检查是否真的保护了 compound invariant。"
      onReset={() => setMode("immutable")}
    >
      <ChoiceButtons
        value={mode}
        items={["immutable", "volatile", "interlocked", "spin", "kernel"]}
        onChange={setMode}
      />
      <ThreeStageDiagram
        left={details[0]}
        middle={details[1]}
        right={details[2]}
        middleNote={details[3]}
        warning={warning}
        bottomNote={
          mode === "volatile"
            ? "visibility and ordering do not make count++ or a two-field update atomic"
            : mode === "spin"
              ? "spinning assumes the owner will run briefly; preemption converts it into CPU waste"
              : mode === "kernel"
                ? "blocking trades context-switch cost for a parked thread and an OS-owned signal"
                : "choose the primitive from the invariant and its linearization point"
        }
      />
    </LabShell>
  );
}

type MemoryMode = "publish" | "increment" | "cas" | "snapshot" | "race";

export function CvcMemoryOrderLab() {
  const [mode, setMode] = useState<MemoryMode>("publish");
  const details = {
    publish: [
      "initialized object",
      "release write",
      "consumer sees state",
      "safe publication",
    ],
    increment: [
      "shared counter",
      "Interlocked.Add",
      "one update",
      "atomic RMW",
    ],
    cas: [
      "expected value",
      "CompareExchange",
      "retry or commit",
      "linearization",
    ],
    snapshot: [
      "immutable fields",
      "CAS reference",
      "new snapshot",
      "multi-field",
    ],
    race: ["check then act", "two observations", "lost update", "not atomic"],
  }[mode];
  const warning = mode === "race";

  return (
    <LabShell
      label="Memory Order Lab"
      title="把 read、write、CAS 与 linearization 对齐"
      description="切换一种内存协议，观察它保护的是可见性、单位置更新、可重试转换还是多字段快照；错误模式让 check-then-act 的竞态显形。"
      onReset={() => setMode("publish")}
    >
      <ChoiceButtons
        value={mode}
        items={["publish", "increment", "cas", "snapshot", "race"]}
        onChange={setMode}
      />
      <ThreeStageDiagram
        left={details[0]}
        middle={details[1]}
        right={details[2]}
        middleNote={details[3]}
        centerLabel="memory protocol"
        warning={warning}
        bottomNote={
          mode === "race"
            ? "two threads can pass the check before either act; a visible read is not a compound transaction"
            : mode === "cas"
              ? "failed CAS is normal: recompute from the latest value and keep the calculation side-effect free"
              : mode === "snapshot"
                ? "a fresh immutable reference lets one CAS linearize several related fields"
                : "write the happens-before assumption beside every shared read and write"
        }
      />
    </LabShell>
  );
}

type WaitMode = "auto" | "manual" | "semaphore" | "mutex" | "shutdown";

export function CvcWaitProtocolLab() {
  const [mode, setMode] = useState<WaitMode>("auto");
  const details = {
    auto: ["one signal", "AutoResetEvent", "one waiter", "coalesces"],
    manual: ["open gate", "ManualResetEvent", "many waiters", "phase"],
    semaphore: ["permit count", "Semaphore", "bounded work", "release"],
    mutex: ["owner thread", "Mutex", "exclusive state", "abandonment"],
    shutdown: ["stopping flag", "wake protocol", "all waiters", "drain/cancel"],
  }[mode];
  const warning = mode === "mutex" || mode === "shutdown";

  return (
    <LabShell
      label="Wait Protocol Lab"
      title="比较 signal、permit、owner 与 shutdown"
      description="切换等待对象，先预测 Set、Release、Wait 超时与 owner 崩溃后的状态，再检查是否需要重新检查 predicate、恢复数据或唤醒全部等待者。"
      onReset={() => setMode("auto")}
    >
      <ChoiceButtons
        value={mode}
        items={["auto", "manual", "semaphore", "mutex", "shutdown"]}
        onChange={setMode}
      />
      <ThreeStageDiagram
        left={details[0]}
        middle={details[1]}
        right={details[2]}
        middleNote={details[3]}
        centerLabel="wait state"
        warning={warning}
        bottomNote={
          mode === "auto"
            ? "two Set calls do not create two queued items; use a semaphore or channel for counting"
            : mode === "manual"
              ? "a gate communicates state, so every awakened waiter must re-check its predicate"
              : mode === "semaphore"
                ? "the permit has no thread owner; acquire success and finally Release must be paired"
                : mode === "mutex"
                  ? "abandonment means protected state may be partial; validate or recover before continuing"
                  : "shutdown is a protocol: stop admission, wake waiters, drain or cancel work, then dispose"
        }
      />
    </LabShell>
  );
}

export const cvcPrimitiveThreadSynchronizationConstructsConceptLabels =
  conceptLabels;
