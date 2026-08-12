"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--enum-accent": "#7c3aed",
  "--enum-accent-soft": "#ede9fe",
  "--enum-ink": "#172033",
  "--enum-muted": "#94a3b8",
  "--enum-warning": "#b45309",
  "--enum-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Enumerated Types",
  "Bit Flags",
  "Adding Methods to Enumerated Types",
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

type EnumValueMode = "declared" | "zero" | "unknown" | "wire";

export function CvcEnumValueLab() {
  const [mode, setMode] = useState<EnumValueMode>("declared");
  const details = {
    declared: ["Accepted", "2", "known name"],
    zero: ["default(OrderState)", "0", "Unknown / None"],
    unknown: ["cast raw integer", "5", "unnamed value"],
    wire: ["wire contract", "explicit number", "versioned"],
  }[mode];
  const warning = mode === "unknown";

  return (
    <LabShell
      label="Enum Numeric Identity"
      title="观察 name、underlying value、zero/default 与 wire identity 的边界"
      description="先预测：切换 declared、zero、unknown 和 wire value，哪些值有名称，哪些值仍必须保留 raw numeric evidence？"
      onReset={() => setMode("declared")}
    >
      <div className="flex flex-wrap gap-2">
        {(["declared", "zero", "unknown", "wire"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "declared"
              ? "declared"
              : item === "zero"
                ? "zero / default"
                : item === "unknown"
                  ? "unknown raw"
                  : "wire value"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} enum value: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Enum name, underlying numeric value and wire identity</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--enum-accent-soft)"
          stroke="var(--enum-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          enum variable
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--enum-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--enum-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--enum-surface)"
          stroke="var(--enum-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          underlying value
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--enum-warning)" : "var(--enum-ink)"}
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          {details[2]}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--enum-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--enum-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={warning ? "var(--enum-surface)" : "var(--enum-accent-soft)"}
          stroke={warning ? "var(--enum-muted)" : "var(--enum-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          boundary
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          {mode === "unknown"
            ? "validate / retain"
            : mode === "zero"
              ? "default policy"
              : mode === "wire"
                ? "compatibility"
                : "accepted"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--enum-warning)" : "var(--enum-accent)"}
        >
          {mode === "declared"
            ? "enum name is convenient; numeric value is the durable fact"
            : mode === "zero"
              ? "zero/default is a domain decision, not automatic validity"
              : mode === "unknown"
                ? "cast and deserialization can create unnamed values; never silently map them to zero"
                : "public and wire enums need explicit numbers, reserved values and an unknown policy"}
        </text>
      </svg>
    </LabShell>
  );
}

type FlagsMode = "single" | "composite" | "unknown" | "toggle";

export function CvcFlagsMaskLab() {
  const [mode, setMode] = useState<FlagsMode>("single");
  const details = {
    single: ["Read", "0001", "one permission"],
    composite: ["Read | Write", "0011", "all required"],
    unknown: ["known | 1000", "1011", "unknown bit"],
    toggle: ["value ^ flag", "flip one bit", "repeat restores"],
  }[mode];
  const warning = mode === "unknown";

  return (
    <LabShell
      label="Flags and Known Mask"
      title="把 single bit、composite、unknown bit 与 toggle 变成可检查的掩码"
      description="动手试：切换四种 bit operation，观察 KnownMask 如何区分已知权限、组合要求与未来扩展位。"
      onReset={() => setMode("single")}
    >
      <div className="flex flex-wrap gap-2">
        {(["single", "composite", "unknown", "toggle"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "single"
              ? "single bit"
              : item === "composite"
                ? "composite"
                : item === "unknown"
                  ? "unknown bit"
                  : "toggle"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} flags mask: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Flags bit mask operations and unknown bits</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--enum-accent-soft)"
          stroke="var(--enum-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          bit value
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--enum-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--enum-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--enum-surface)"
          stroke="var(--enum-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          mask operation
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--enum-warning)" : "var(--enum-ink)"}
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          {details[2]}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--enum-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--enum-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={warning ? "var(--enum-surface)" : "var(--enum-accent-soft)"}
          stroke={warning ? "var(--enum-muted)" : "var(--enum-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          policy
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          {mode === "unknown"
            ? "reject / retain"
            : mode === "composite"
              ? "all vs any"
              : mode === "toggle"
                ? "idempotent test"
                : "known"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--enum-warning)" : "var(--enum-accent)"}
        >
          {mode === "single"
            ? "assign each independent option one power-of-two bit"
            : mode === "composite"
              ? "IsDefined does not prove a valid combination; use all/any formulas"
              : mode === "unknown"
                ? "unknown = value & ~KnownMask；security permissions should fail closed"
                : "toggle twice restores the value; set and clear should be explicitly tested"}
        </text>
      </svg>
    </LabShell>
  );
}

type AdapterMode = "parse" | "extension" | "format" | "evolve";

export function CvcEnumAdapterLab() {
  const [mode, setMode] = useState<AdapterMode>("parse");
  const details = {
    parse: ["input text", "TryParse + validation", "domain state"],
    extension: ["enum value", "policy adapter", "predicate"],
    format: ["known / raw", "name + number", "audit evidence"],
    evolve: ["new value", "wire adapter", "preserve raw"],
  }[mode];
  const warning = mode === "evolve";

  return (
    <LabShell
      label="Enum Policy Adapter"
      title="让 extension、parse/format 和 wire evolution 共享一条 policy boundary"
      description="先预测：切换 parse、extension、format 与 evolve，哪一层应该拒绝未知值，哪一层必须保存并转发 raw numeric？"
      onReset={() => setMode("parse")}
    >
      <div className="flex flex-wrap gap-2">
        {(["parse", "extension", "format", "evolve"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "parse"
              ? "parse"
              : item === "extension"
                ? "extension"
                : item === "format"
                  ? "format / audit"
                  : "wire evolve"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${mode} enum adapter: ${details.join(", ")}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Enum policy adapter and forward-compatible wire boundary</title>
        <rect
          x="24"
          y="62"
          width="170"
          height="84"
          rx="12"
          fill="var(--enum-accent-soft)"
          stroke="var(--enum-accent)"
          strokeWidth="3"
        />
        <text
          x="109"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          boundary input
        </text>
        <text
          x="109"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="216"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--enum-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--enum-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--enum-surface)"
          stroke="var(--enum-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="104"
          textAnchor="middle"
          fontSize="12"
          fill={warning ? "var(--enum-warning)" : "var(--enum-ink)"}
        >
          {details[2]}
        </text>
        <text
          x="377"
          y="134"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          centralized rule
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--enum-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--enum-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill={warning ? "var(--enum-surface)" : "var(--enum-accent-soft)"}
          stroke={warning ? "var(--enum-muted)" : "var(--enum-accent)"}
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--enum-ink)"
        >
          consumer
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--enum-ink)"
        >
          {mode === "evolve"
            ? "proxy / storage"
            : mode === "format"
              ? "logs"
              : mode === "extension"
                ? "predicate"
                : "accept / reject"}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--enum-warning)" : "var(--enum-accent)"}
        >
          {mode === "parse"
            ? "parse success is not domain validity; validate declared value and unknown policy"
            : mode === "extension"
              ? "extension methods centralize predicates but cannot make arbitrary raw values valid"
              : mode === "format"
                ? "log both symbolic name and numeric value so unknown states remain observable"
                : "wire/storage adapters preserve unknown raw values; domain commands may reject them"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcEnumeratedTypesBitFlagsConceptLabels = conceptLabels;
