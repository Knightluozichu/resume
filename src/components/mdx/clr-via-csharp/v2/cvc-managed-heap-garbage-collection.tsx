"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--gc-accent": "#166534",
  "--gc-accent-soft": "#dcfce7",
  "--gc-ink": "#172033",
  "--gc-muted": "#94a3b8",
  "--gc-warning": "#b45309",
  "--gc-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Managed Heap Basics",
  "Allocating Resources from the Managed Heap",
  "The Garbage Collection Algorithm",
  "Garbage Collections and Debugging",
  "Generations: Improving Performance",
  "Garbage Collection Triggers",
  "Large Objects",
  "Garbage Collection Modes",
  "Forcing Garbage Collections",
  "Monitoring Your Application's Memory Usage",
  "Working with Types Requiring Special Cleanup",
  "Using a Type That Wraps a Native Resource",
  "An Interesting Dependency Issue",
  "Other GC Features for Use with Native Resources",
  "Finalization Internals",
  "Monitoring and Controlling the Lifetime of Objects Manually",
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

type HeapMode = "allocate" | "root" | "gen" | "loh" | "mode";

export function CvcHeapReachabilityLab() {
  const [mode, setMode] = useState<HeapMode>("allocate");
  const details = {
    allocate: ["allocation", "Gen 0", "budget"],
    root: ["static/event", "root path", "still live"],
    gen: ["survivor", "Gen 1 / Gen 2", "promotion"],
    loh: ["large buffer", "LOH", "fragmentation"],
    mode: ["workload", "GC mode", "pause/SLO"],
  }[mode];
  const warning = mode === "root" || mode === "loh";

  return (
    <LabShell
      label="Heap Reachability Lab"
      title="从 allocation 追踪 root、generation、LOH 与 GC mode"
      description="先判断对象为何仍然存活，再切换 allocation、root、promotion、large object 和 mode，观察哪些是证据、哪些只是调参猜测。"
      onReset={() => setMode("allocate")}
    >
      <div className="flex flex-wrap gap-2">
        {(["allocate", "root", "gen", "loh", "mode"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "allocate"
              ? "allocate"
              : item === "root"
                ? "root"
                : item === "gen"
                  ? "generation"
                  : item === "loh"
                    ? "LOH"
                    : "GC mode"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} enters ${details[1]} and is measured as ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Managed heap reachability and collection evidence</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--gc-accent-soft)"
          stroke="var(--gc-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          workload
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--gc-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--gc-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--gc-surface)"
          stroke="var(--gc-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          heap evidence
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-warning)"
        >
          {warning ? "inspect roots/layout" : "measure trace"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--gc-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--gc-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--gc-accent-soft)"
          stroke="var(--gc-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          decision
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--gc-warning)" : "var(--gc-accent)"}
        >
          {mode === "root"
            ? "a live root explains retention; GC.Collect cannot repair an intentional cache or event subscription"
            : mode === "loh"
              ? "large-object size, live bytes and fragmentation are separate evidence; pooling can also retain memory"
              : mode === "mode"
                ? "GC mode is a workload trade-off; prove allocation, pause and SLO before changing it"
                : "collection decisions follow reachability and budgets, not source scope or object business importance"}
        </text>
      </svg>
    </LabShell>
  );
}

type CleanupMode =
  | "dispose"
  | "safehandle"
  | "finalizer"
  | "partial"
  | "shutdown";

export function CvcResourceCleanupLab() {
  const [mode, setMode] = useState<CleanupMode>("dispose");
  const details = {
    dispose: ["owned resource", "using/finally", "deterministic"],
    safehandle: ["native handle", "SafeHandle", "critical release"],
    finalizer: ["unreleased handle", "finalizer", "last safety net"],
    partial: ["constructor error", "partial cleanup", "no leak"],
    shutdown: ["process exit", "host policy", "not guaranteed"],
  }[mode];
  const warning = mode === "finalizer" || mode === "shutdown";

  return (
    <LabShell
      label="Resource Ownership Lab"
      title="比较 Dispose、SafeHandle、finalizer 与 shutdown 的释放保证"
      description="选择一种资源路径，先标注 owner、释放顺序和失败语义，再观察为什么 finalizer 只能作为直接 native safety net。"
      onReset={() => setMode("dispose")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          ["dispose", "safehandle", "finalizer", "partial", "shutdown"] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "dispose"
              ? "Dispose"
              : item === "safehandle"
                ? "SafeHandle"
                : item === "finalizer"
                  ? "finalizer"
                  : item === "partial"
                    ? "partial ctor"
                    : "shutdown"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} uses ${details[1]} and provides ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Managed and native resource cleanup boundary</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--gc-accent-soft)"
          stroke="var(--gc-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          owner
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--gc-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--gc-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--gc-surface)"
          stroke="var(--gc-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          release path
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-warning)"
        >
          {warning ? "uncertain timing" : "explicit owner"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--gc-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--gc-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--gc-accent-soft)"
          stroke="var(--gc-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          guarantee
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--gc-warning)" : "var(--gc-accent)"}
        >
          {mode === "safehandle"
            ? "P/Invoke accepts SafeHandle so the runtime keeps the handle alive during the native call"
            : mode === "finalizer"
              ? "finalizer order and timing are not a business contract; keep it short and touch only the direct handle"
              : mode === "partial"
                ? "constructor failure must release every already-acquired child; use a staged owner and test each failure point"
                : mode === "shutdown"
                  ? "process exit can bypass ordinary cleanup; durable state and host policy are needed for shutdown guarantees"
                  : "Dispose releases what this object owns, can be repeated safely, and does not promise immediate managed-memory collection"}
        </text>
      </svg>
    </LabShell>
  );
}

type LifetimeMode = "weak" | "table" | "handle" | "pin" | "pressure";

export function CvcLifetimeControlLab() {
  const [mode, setMode] = useState<LifetimeMode>("weak");
  const details = {
    weak: ["WeakReference", "TryGetTarget", "optional cache"],
    table: ["weak key", "ConditionalWeakTable", "attached value"],
    handle: ["GCHandle", "Allocate / Free", "interop root"],
    pin: ["managed buffer", "pin scope", "no movement"],
    pressure: ["native bytes", "Add/RemovePressure", "GC hint"],
  }[mode];
  const warning = mode === "handle" || mode === "pin" || mode === "pressure";

  return (
    <LabShell
      label="Manual Lifetime Control Lab"
      title="选择 weak、handle、pin 或 native memory pressure 的 owner"
      description="切换一种高级 GC 控制，先写出成对的 Allocate/Free、Add/Remove、pin scope 或 weak miss 语义，再检查它是否会阻止卸载。"
      onReset={() => setMode("weak")}
    >
      <div className="flex flex-wrap gap-2">
        {(["weak", "table", "handle", "pin", "pressure"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "weak"
                ? "weak"
                : item === "table"
                  ? "weak table"
                  : item === "handle"
                    ? "GCHandle"
                    : item === "pin"
                      ? "pin"
                      : "pressure"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} is controlled by ${details[1]} for ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Manual lifetime controls and ownership</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--gc-accent-soft)"
          stroke="var(--gc-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          object/resource
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--gc-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--gc-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--gc-surface)"
          stroke="var(--gc-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          control owner
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-warning)"
        >
          {warning ? "paired cleanup" : "non-owning"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--gc-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--gc-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--gc-accent-soft)"
          stroke="var(--gc-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--gc-ink)"
        >
          lifetime result
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--gc-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--gc-warning)" : "var(--gc-accent)"}
        >
          {mode === "weak"
            ? "a weak lookup may miss and may race with collection; use one local strong target and an idempotent factory"
            : mode === "table"
              ? "the value follows the weak key and is not a general enumerable cache; cleanup is tied to key reachability"
              : mode === "handle"
                ? "every GCHandle.Alloc needs a finally Free; a forgotten handle is a strong root that can block unload"
                : mode === "pin"
                  ? "pin only for the native call and release promptly; long pins can obstruct compaction and increase fragmentation"
                  : "native pressure must be approximate and paired; it is a scheduling hint, not a replacement for disposing the native owner"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcManagedHeapGarbageCollectionConceptLabels = conceptLabels;
