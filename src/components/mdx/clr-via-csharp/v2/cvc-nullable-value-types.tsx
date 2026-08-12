"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--nullable-accent": "#0891b2",
  "--nullable-accent-soft": "#cffafe",
  "--nullable-ink": "#172033",
  "--nullable-muted": "#94a3b8",
  "--nullable-warning": "#b45309",
  "--nullable-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "C#'s Support for Nullable Value Types",
  "C#'s Null-Coalescing Operator",
  "The CLR Has Special Support for Nullable Value Types",
  "Boxing Nullable Value Types",
  "Unboxing Nullable Value Types",
  "Calling GetType via a Nullable Value Type",
  "Calling Interface Methods via a Nullable Value Type",
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

type StateMode = "empty" | "present" | "lifted" | "coalesce";

export function CvcNullableStateLab() {
  const [mode, setMode] = useState<StateMode>("empty");
  const details = {
    empty: ["int? x = null", "HasValue=false", "absence"],
    present: ["int? x = 42", "HasValue=true", "underlying T"],
    lifted: ["x + 1", "nullable result", "truth table"],
    coalesce: ["x ?? fallback", "lazy right side", "resolved value"],
  }[mode];
  const warning = mode === "empty" || mode === "lifted";

  return (
    <LabShell
      label="Nullable State and Operators"
      title="把 HasValue、lifted operator 与 coalescing fallback 分开观察"
      description="先预测：切换 empty、present、lifted 和 coalesce，哪一步保留缺失，哪一步才把缺失解析成业务值？"
      onReset={() => setMode("empty")}
    >
      <div className="flex flex-wrap gap-2">
        {(["empty", "present", "lifted", "coalesce"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "empty"
              ? "empty"
              : item === "present"
                ? "present"
                : item === "lifted"
                  ? "lifted op"
                  : "coalesce"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} nullable state: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Nullable value state and lifted operator flow</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--nullable-accent-soft)"
          stroke="var(--nullable-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          T?
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--nullable-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--nullable-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--nullable-surface)"
          stroke="var(--nullable-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--nullable-warning)" : "var(--nullable-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          value path
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--nullable-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--nullable-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--nullable-surface)" : "var(--nullable-accent-soft)"
          }
          stroke={warning ? "var(--nullable-muted)" : "var(--nullable-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          decision
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          {mode === "coalesce"
            ? "fallback"
            : mode === "lifted"
              ? "nullable / bool?"
              : mode === "present"
                ? "use T"
                : "preserve absence"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--nullable-warning)" : "var(--nullable-accent)"}
        >
          {mode === "empty"
            ? "absence is not zero; HasValue is the first branch"
            : mode === "present"
              ? "present value carries a complete underlying T"
              : mode === "lifted"
                ? "most arithmetic lifts absence, but equality and bool? have specific truth tables"
                : "?? evaluates fallback lazily; use it only when business semantics justify resolution"}
        </text>
      </svg>
    </LabShell>
  );
}

type BoxingMode = "none" | "value" | "unbox" | "wrong";

export function CvcNullableBoxingLab() {
  const [mode, setMode] = useState<BoxingMode>("none");
  const details = {
    none: ["int? = null", "null reference", "no box"],
    value: ["int? = 42", "System.Int32", "underlying box"],
    unbox: ["object -> int?", "null or exact T", "recover state"],
    wrong: ["boxed Int32 -> long?", "type mismatch", "reject"],
  }[mode];
  const warning = mode === "wrong";

  return (
    <LabShell
      label="Nullable Boxing Boundary"
      title="看清 CLR 对 null、underlying T 与错误 unbox 的特殊处理"
      description="动手试：切换 no-value box、value box、unbox 和 wrong type，观察 object 边界会保留什么、擦除什么。"
      onReset={() => setMode("none")}
    >
      <div className="flex flex-wrap gap-2">
        {(["none", "value", "unbox", "wrong"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "none"
              ? "box null"
              : item === "value"
                ? "box value"
                : item === "unbox"
                  ? "unbox T?"
                  : "wrong type"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} nullable boxing: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Nullable value boxing and unboxing erasure</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--nullable-accent-soft)"
          stroke="var(--nullable-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          nullable source
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--nullable-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--nullable-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--nullable-surface)"
          stroke="var(--nullable-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          object boundary
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--nullable-warning)" : "var(--nullable-ink)"}
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          {details[2]}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--nullable-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--nullable-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--nullable-surface)" : "var(--nullable-accent-soft)"
          }
          stroke={warning ? "var(--nullable-muted)" : "var(--nullable-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          runtime view
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          {mode === "none"
            ? "null"
            : mode === "value"
              ? "GetType=Int32"
              : mode === "unbox"
                ? "HasValue"
                : "InvalidCast"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--nullable-warning)" : "var(--nullable-accent)"}
        >
          {mode === "none"
            ? "no-value Nullable boxes to null and allocates no wrapper"
            : mode === "value"
              ? "value Nullable boxes only its underlying T; wrapper identity is erased"
              : mode === "unbox"
                ? "null unboxes to no value; exact boxed T unboxes to present T?"
                : "unboxing still requires the exact underlying runtime type; numeric conversion comes after"}
        </text>
      </svg>
    </LabShell>
  );
}

type BoundaryMode = "gettype" | "interface" | "database" | "nrt";

export function CvcNullableBoundaryLab() {
  const [mode, setMode] = useState<BoundaryMode>("gettype");
  const details = {
    gettype: ["int? value", "boxing", "Int32 runtime"],
    interface: ["T? as interface", "HasValue check", "call T"],
    database: ["NULL / missing", "mapping adapter", "domain meaning"],
    nrt: ["string?", "flow annotation", "runtime reference"],
  }[mode];
  const warning = mode === "database" || mode === "nrt";

  return (
    <LabShell
      label="Nullable Boundary Semantics"
      title="区分 GetType、interface、数据库映射与 nullable reference annotation"
      description="先预测：切换四种边界，哪一层会擦除 Nullable<T> wrapper，哪一层必须额外携带 declared schema 和 absence reason？"
      onReset={() => setMode("gettype")}
    >
      <div className="flex flex-wrap gap-2">
        {(["gettype", "interface", "database", "nrt"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "gettype"
              ? "GetType"
              : item === "interface"
                ? "interface"
                : item === "database"
                  ? "DB / JSON"
                  : "NRT"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} nullable boundary: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Nullable value type boundary and schema preservation</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--nullable-accent-soft)"
          stroke="var(--nullable-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          declared schema
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--nullable-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--nullable-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--nullable-surface)"
          stroke="var(--nullable-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--nullable-warning)" : "var(--nullable-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          what survives
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--nullable-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--nullable-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={
            warning ? "var(--nullable-surface)" : "var(--nullable-accent-soft)"
          }
          stroke={warning ? "var(--nullable-muted)" : "var(--nullable-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--nullable-ink)"
        >
          consumer
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--nullable-ink)"
        >
          {mode === "database"
            ? "missing / null / 0"
            : mode === "nrt"
              ? "runtime validate"
              : mode === "interface"
                ? "method call"
                : "runtime type"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--nullable-warning)" : "var(--nullable-accent)"}
        >
          {mode === "gettype"
            ? "GetType sees boxed underlying T; declared nullable schema must travel separately"
            : mode === "interface"
              ? "check HasValue before interface conversion; no-value boxes to null"
              : mode === "database"
                ? "missing, explicit null, zero and Unknown are separate domain states"
                : "string? is compiler flow metadata, not Nullable<T> runtime layout or validation"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcNullableValueTypesConceptLabels = conceptLabels;
