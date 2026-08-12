"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--reflection-accent": "#be123c",
  "--reflection-accent-soft": "#ffe4e6",
  "--reflection-ink": "#172033",
  "--reflection-muted": "#94a3b8",
  "--reflection-warning": "#b45309",
  "--reflection-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Assembly Loading",
  "Using Reflection to Build a Dynamically Extensible Application",
  "Reflection Performance",
  "Discovering Types Defined in an Assembly",
  "What Exactly Is a Type Object?",
  "Building a Hierarchy of Exception-Derived Types",
  "Constructing an Instance of a Type",
  "Designing an Application That Supports Add-Ins",
  "Using Reflection to Discover a Type's Members",
  "Discovering a Type's Members",
  "Invoking a Type's Members",
  "Using Binding Handles to Reduce Your Process's Memory Consumption",
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

type LoadingMode = "identity" | "path" | "metadata" | "collectible";

export function CvcAssemblyLoadingLab() {
  const [mode, setMode] = useState<LoadingMode>("identity");
  const details = {
    identity: ["AssemblyName", "resolver", "context identity"],
    path: ["canonical path", "LoadFromAssemblyPath", "resolved file"],
    metadata: ["PE metadata", "no execution", "static inventory"],
    collectible: ["custom ALC", "WeakReference", "unload test"],
  }[mode];
  const warning = mode === "path";

  return (
    <LabShell
      label="Assembly Loading Boundary"
      title="先决定 assembly universe，再决定 reflection 如何运行"
      description="先预测：切换 identity、path、metadata 和 collectible loading，哪些步骤会建立 runtime Type，哪些步骤仍停留在静态审计？"
      onReset={() => setMode("identity")}
    >
      <div className="flex flex-wrap gap-2">
        {(["identity", "path", "metadata", "collectible"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "identity"
                ? "identity"
                : item === "path"
                  ? "path"
                  : item === "metadata"
                    ? "metadata-only"
                    : "collectible ALC"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} assembly loading: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Assembly loading context and evidence flow</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--reflection-accent-soft)"
          stroke="var(--reflection-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          request
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--reflection-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--reflection-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--reflection-surface)"
          stroke="var(--reflection-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--reflection-warning)" : "var(--reflection-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          identity / path evidence
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--reflection-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--reflection-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning
              ? "var(--reflection-surface)"
              : "var(--reflection-accent-soft)"
          }
          stroke={
            warning ? "var(--reflection-muted)" : "var(--reflection-accent)"
          }
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          next step
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          {mode === "metadata"
            ? "filter"
            : mode === "collectible"
              ? "unload"
              : "bind types"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={
            warning ? "var(--reflection-warning)" : "var(--reflection-accent)"
          }
        >
          {mode === "identity"
            ? "same FullName is not enough; Assembly identity and load context decide Type equality"
            : mode === "path"
              ? "path loading must be resolver-controlled and hashed; a file path is not a trust boundary"
              : mode === "metadata"
                ? "raw metadata can inventory types without loading dependencies or executing plugin code"
                : "collectible ALC requires context-owned roots, cache cleanup and WeakReference unload evidence"}
        </text>
      </svg>
    </LabShell>
  );
}

type AddinMode = "discover" | "type" | "exception" | "construct" | "lifecycle";

export function CvcAddinLifecycleLab() {
  const [mode, setMode] = useState<AddinMode>("discover");
  const details = {
    discover: ["manifest", "type inventory", "allowlist"],
    type: ["runtime Type", "metadata view", "identity"],
    exception: ["derived types", "taxonomy", "stable error DTO"],
    construct: ["ConstructorInfo", "user code", "validated instance"],
    lifecycle: ["add-in owner", "start / stop", "unload"],
  }[mode];
  const warning = mode === "construct" || mode === "exception";

  return (
    <LabShell
      label="Add-in Discovery and Lifecycle"
      title="把 discover、construct、run、stop 和 unload 变成有责任人的状态机"
      description="动手试：切换 manifest discovery、Type object、exception taxonomy、constructor 和 lifecycle，观察哪一步开始执行外部代码。"
      onReset={() => setMode("discover")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          ["discover", "type", "exception", "construct", "lifecycle"] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "discover"
              ? "discover"
              : item === "type"
                ? "Type object"
                : item === "exception"
                  ? "exception tree"
                  : item === "construct"
                    ? "construct"
                    : "lifecycle"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} add-in lifecycle: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Add-in discovery construction and unload lifecycle</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--reflection-accent-soft)"
          stroke="var(--reflection-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          plugin input
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--reflection-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--reflection-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--reflection-surface)"
          stroke="var(--reflection-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--reflection-warning)" : "var(--reflection-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          owner gate
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--reflection-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--reflection-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning
              ? "var(--reflection-surface)"
              : "var(--reflection-accent-soft)"
          }
          stroke={
            warning ? "var(--reflection-muted)" : "var(--reflection-accent)"
          }
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          decision
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          {mode === "construct"
            ? "activate"
            : mode === "lifecycle"
              ? "drain / unload"
              : mode === "exception"
                ? "map error"
                : "validate"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={
            warning ? "var(--reflection-warning)" : "var(--reflection-accent)"
          }
        >
          {mode === "discover"
            ? "discover and validate metadata before loading; manifest is an allowlist, not an execution step"
            : mode === "type"
              ? "Type is a context-bound metadata view, not a stable business identifier or factory"
              : mode === "exception"
                ? "exception hierarchy helps documentation; cross-context errors should become stable DTOs"
                : mode === "construct"
                  ? "constructor invocation is the execution boundary; validate exact signature, trust and failure translation"
                  : "lifecycle owner clears tasks, events, timers, delegates, native handles and caches before unload"}
        </text>
      </svg>
    </LabShell>
  );
}

type BindingMode = "members" | "invoke" | "performance" | "handle";

export function CvcReflectionBindingLab() {
  const [mode, setMode] = useState<BindingMode>("members");
  const details = {
    members: ["BindingFlags", "exact signature", "MemberInfo"],
    invoke: ["MethodInfo", "target + args", "exception unwrap"],
    performance: ["hot path", "typed delegate", "profile"],
    handle: ["runtime handle", "restore view", "context scope"],
  }[mode];
  const warning = mode === "invoke" || mode === "handle";

  return (
    <LabShell
      label="Reflection Binding and Performance"
      title="从 member identity 到 typed delegate，再到 context-safe handle"
      description="先预测：切换 member discovery、invoke、performance 和 handle，哪些输入必须精确匹配，哪些 cache 会阻止 collectible context 回收？"
      onReset={() => setMode("members")}
    >
      <div className="flex flex-wrap gap-2">
        {(["members", "invoke", "performance", "handle"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "members"
                ? "discover members"
                : item === "invoke"
                  ? "invoke"
                  : item === "performance"
                    ? "typed delegate"
                    : "binding handle"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} reflection binding: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Reflection member binding invocation and performance</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--reflection-accent-soft)"
          stroke="var(--reflection-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          runtime type
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--reflection-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--reflection-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--reflection-surface)"
          stroke="var(--reflection-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--reflection-warning)" : "var(--reflection-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          cache / invoke
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--reflection-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--reflection-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning
              ? "var(--reflection-surface)"
              : "var(--reflection-accent-soft)"
          }
          stroke={
            warning ? "var(--reflection-muted)" : "var(--reflection-accent)"
          }
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--reflection-ink)"
        >
          evidence
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--reflection-ink)"
        >
          {mode === "members"
            ? "signature"
            : mode === "invoke"
              ? "inner error"
              : mode === "performance"
                ? "allocation"
                : "unload"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={
            warning ? "var(--reflection-warning)" : "var(--reflection-accent)"
          }
        >
          {mode === "members"
            ? "BindingFlags plus name, arity, parameter/ref modifiers and declaring type define member identity"
            : mode === "invoke"
              ? "Invoke boxes arguments and wraps target exceptions; exact CreateDelegate can make execution more typed"
              : mode === "performance"
                ? "profile first, then cache exact MemberInfo or typed delegate in the context owner"
                : "Runtime handles are process/context-scoped; clear handle caches on unload and never persist them as IDs"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcAssemblyLoadingReflectionConceptLabels = conceptLabels;
