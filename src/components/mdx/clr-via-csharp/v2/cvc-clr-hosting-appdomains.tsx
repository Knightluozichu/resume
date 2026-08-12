"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--hosting-accent": "#c2410c",
  "--hosting-accent-soft": "#ffedd5",
  "--hosting-ink": "#172033",
  "--hosting-muted": "#94a3b8",
  "--hosting-warning": "#b45309",
  "--hosting-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "CLR Hosting",
  "AppDomains",
  "Accessing Objects Across AppDomain Boundaries",
  "Cross-AppDomain Communication Using Marshal-by-Reference",
  "Cross-AppDomain Communication Using Marshal-by-Value",
  "Cross-AppDomain Communication Using Non-Marshalable Types",
  "AppDomain Unloading",
  "AppDomain Monitoring",
  "AppDomain First-Chance Exception Notifications",
  "How Hosts Use AppDomains",
  "Executable Applications",
  "Microsoft Silverlight Rich Internet Applications",
  "Microsoft ASP.NET and XML Web Services Applications",
  "Microsoft SQL Server",
  "Advanced Host Control",
  "Managing the CLR by Using Managed Code",
  "Writing a Robust Host Application",
  "How a Host Gets Its Thread Back",
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

type HostingMode = "host" | "appdomain" | "alc" | "process" | "legacy";

export function CvcHostingBoundaryLab() {
  const [mode, setMode] = useState<HostingMode>("host");
  const details = {
    host: ["native host", "runtime config", "managed entry"],
    appdomain: [
      "Framework AppDomain",
      "static / assembly state",
      "domain unload",
    ],
    alc: ["AssemblyLoadContext", "dependency identity", "cooperative unload"],
    process: ["worker process", "OS boundary", "kill / restart"],
    legacy: ["hosted product", "version-specific", "migration note"],
  }[mode];
  const warning = mode === "appdomain" || mode === "alc";

  return (
    <LabShell
      label="Hosting and Isolation Boundary"
      title="把 CLR、AppDomain、ALC 与 worker process 的职责画在同一条链上"
      description="先预测：切换 host、Framework AppDomain、AssemblyLoadContext、worker process 与 legacy product，哪一种提供 dependency boundary，哪一种才提供故障隔离？"
      onReset={() => setMode("host")}
    >
      <div className="flex flex-wrap gap-2">
        {(["host", "appdomain", "alc", "process", "legacy"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "host"
                ? "CLR host"
                : item === "appdomain"
                  ? "AppDomain"
                  : item === "alc"
                    ? "ALC"
                    : item === "process"
                      ? "worker process"
                      : "legacy app"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} hosting boundary: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>CLR hosting and isolation choices</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--hosting-accent-soft)"
          stroke="var(--hosting-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          owner
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--hosting-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--hosting-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--hosting-surface)"
          stroke="var(--hosting-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--hosting-warning)" : "var(--hosting-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          shared resources
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--hosting-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--hosting-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--hosting-surface)" : "var(--hosting-accent-soft)"
          }
          stroke={warning ? "var(--hosting-muted)" : "var(--hosting-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          claim
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          {mode === "process"
            ? "fault boundary"
            : mode === "alc"
              ? "dependency only"
              : mode === "appdomain"
                ? "legacy domain"
                : mode === "legacy"
                  ? "version note"
                  : "startup"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--hosting-warning)" : "var(--hosting-accent)"}
        >
          {mode === "host"
            ? "host owns runtime startup, configuration, entry delegate and shutdown"
            : mode === "appdomain"
              ? "AppDomain separates managed state but is not OS memory or security isolation"
              : mode === "alc"
                ? "ALC isolates dependency identity and relies on cooperative unload, not permission control"
                : mode === "process"
                  ? "worker process is the stronger crash, resource and untrusted-code boundary"
                  : "legacy hosting examples need runtime-version labels before modern migration"}
        </text>
      </svg>
    </LabShell>
  );
}

type CrossingMode = "reference" | "value" | "nonmarshal" | "dto";

export function CvcCrossDomainLab() {
  const [mode, setMode] = useState<CrossingMode>("reference");
  const details = {
    reference: ["MarshalByRefObject", "transparent proxy", "remote identity"],
    value: ["Serializable graph", "copy", "versioned value"],
    nonmarshal: ["ordinary object", "boundary reject", "design error"],
    dto: ["explicit DTO", "message / RPC", "stable schema"],
  }[mode];
  const warning = mode === "nonmarshal";

  return (
    <LabShell
      label="Cross-Boundary Object Policy"
      title="区分 proxy identity、value copy、拒绝和现代 message DTO"
      description="动手试：切换 Marshal-by-Reference、Marshal-by-Value、non-marshalable 和 explicit DTO，观察跨边界调用保留的是身份、数据还是失败原因。"
      onReset={() => setMode("reference")}
    >
      <div className="flex flex-wrap gap-2">
        {(["reference", "value", "nonmarshal", "dto"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "reference"
              ? "by reference"
              : item === "value"
                ? "by value"
                : item === "nonmarshal"
                  ? "reject"
                  : "message DTO"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} cross-boundary policy: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Cross AppDomain object identity and serialization policy</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--hosting-accent-soft)"
          stroke="var(--hosting-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          source domain
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--hosting-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--hosting-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--hosting-surface)"
          stroke="var(--hosting-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          boundary
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--hosting-warning)" : "var(--hosting-ink)"}
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          {details[2]}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--hosting-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--hosting-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--hosting-surface)" : "var(--hosting-accent-soft)"
          }
          stroke={warning ? "var(--hosting-muted)" : "var(--hosting-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          consumer
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          {mode === "reference"
            ? "proxy call"
            : mode === "value"
              ? "copy"
              : mode === "nonmarshal"
                ? "failure"
                : "RPC DTO"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--hosting-warning)" : "var(--hosting-accent)"}
        >
          {mode === "reference"
            ? "proxy preserves remote identity but adds latency, lease and unload failure"
            : mode === "value"
              ? "copy requires a serializable, version-compatible graph and does not share later mutations"
              : mode === "nonmarshal"
                ? "an ordinary object crossing the boundary is a protocol design failure, not a local call"
                : "modern cross-process boundaries should use explicit DTOs, schema versions, cancellation and error translation"}
        </text>
      </svg>
    </LabShell>
  );
}

type RecoveryMode =
  | "monitor"
  | "firstchance"
  | "managed"
  | "recover"
  | "thread";

export function CvcHostRecoveryLab() {
  const [mode, setMode] = useState<RecoveryMode>("monitor");
  const details = {
    monitor: ["CPU / memory", "metrics", "observe"],
    firstchance: ["exception start", "notification", "sample"],
    managed: ["controller", "cancel / drain", "owner"],
    recover: ["durable state", "restart", "checkpoint"],
    thread: ["guest thread", "deadline", "process kill"],
  }[mode];
  const warning = mode === "thread" || mode === "firstchance";

  return (
    <LabShell
      label="Host Monitoring and Recovery"
      title="把 observation、cooperative unload、deadline 和 process recovery 分层"
      description="先预测：切换 monitoring、first-chance、managed controller、durable recovery 与 thread return，哪一种只是观测，哪一种才真正能收回 host 控制权？"
      onReset={() => setMode("monitor")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          ["monitor", "firstchance", "managed", "recover", "thread"] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "monitor"
              ? "monitor"
              : item === "firstchance"
                ? "first-chance"
                : item === "managed"
                  ? "managed control"
                  : item === "recover"
                    ? "recover"
                    : "thread return"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} host recovery: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Host monitoring cancellation and recovery boundary</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--hosting-accent-soft)"
          stroke="var(--hosting-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          guest state
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--hosting-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--hosting-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--hosting-surface)"
          stroke="var(--hosting-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--hosting-warning)" : "var(--hosting-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          control boundary
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--hosting-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--hosting-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--hosting-surface)" : "var(--hosting-accent-soft)"
          }
          stroke={warning ? "var(--hosting-muted)" : "var(--hosting-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--hosting-ink)"
        >
          host action
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--hosting-ink)"
        >
          {mode === "monitor"
            ? "record"
            : mode === "firstchance"
              ? "sample"
              : mode === "managed"
                ? "drain"
                : mode === "recover"
                  ? "restart"
                  : "kill process"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--hosting-warning)" : "var(--hosting-accent)"}
        >
          {mode === "monitor"
            ? "metrics observe resource use but do not impose a hard quota"
            : mode === "firstchance"
              ? "first-chance fires before final handling; it is diagnostic evidence, not an unhandled verdict"
              : mode === "managed"
                ? "managed controller owns cancel, drain, roots, handles and unload; it cannot safely abort arbitrary code"
                : mode === "recover"
                  ? "durable checkpoints and restart make failure recovery explicit instead of relying on static memory"
                  : "if guest ignores cancellation past deadline, process termination is safer than shared-thread abort"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcClrHostingAppDomainsConceptLabels = conceptLabels;
