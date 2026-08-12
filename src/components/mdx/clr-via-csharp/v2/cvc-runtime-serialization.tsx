"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--serialization-accent": "#9333ea",
  "--serialization-accent-soft": "#f3e8ff",
  "--serialization-ink": "#172033",
  "--serialization-muted": "#94a3b8",
  "--serialization-warning": "#b45309",
  "--serialization-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Serialization/Deserialization Quick Start",
  "Making a Type Serializable",
  "Controlling Serialization and Deserialization",
  "How Formatters Serialize Type Instances",
  "Controlling the Serialized/Deserialized Data",
  "How to Define a Type That Implements ISerializable",
  "When the Base Type Doesn't Implement This Interface",
  "Streaming Contexts",
  "Serializing a Type As a Different Type and Deserializing an Object As a Different Object",
  "Serialization Surrogates",
  "Surrogate Selector Chains",
  "Overriding the Assembly and/or Type When Deserializing an Object",
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

type GraphMode = "discover" | "write" | "allocate" | "fixup" | "cycle";

export function CvcGraphSerializationLab() {
  const [mode, setMode] = useState<GraphMode>("discover");
  const details = {
    discover: ["root object", "reachable graph", "type/member"],
    write: ["object id", "formatter output", "field values"],
    allocate: ["incoming type", "uninitialized object", "constructor bypass"],
    fixup: ["reference id", "ObjectManager", "shared identity"],
    cycle: ["A ↔ B", "reference table", "cycle preserved"],
  }[mode];
  const warning = mode === "allocate";

  return (
    <LabShell
      label="Object Graph Lab"
      title="观察 formatter 如何发现、写入、分配与 fixup 对象图"
      description="切换对象图阶段，先预测 type identity、private field、shared reference 和 cycle 的证据，再识别 legacy formatter 的安全边界。"
      onReset={() => setMode("discover")}
    >
      <div className="flex flex-wrap gap-2">
        {(["discover", "write", "allocate", "fixup", "cycle"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "discover"
                ? "discover"
                : item === "write"
                  ? "write"
                  : item === "allocate"
                    ? "allocate"
                    : item === "fixup"
                      ? "fixup"
                      : "cycle"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} becomes ${details[1]} with ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Runtime object graph serialization stages</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--serialization-accent-soft)"
          stroke="var(--serialization-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          input
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--serialization-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--serialization-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--serialization-surface)"
          stroke="var(--serialization-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          graph operation
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-warning)"
        >
          {warning ? "do not trust ctor assumptions" : "identity table"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--serialization-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--serialization-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--serialization-accent-soft)"
          stroke="var(--serialization-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          evidence
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={
            warning
              ? "var(--serialization-warning)"
              : "var(--serialization-accent)"
          }
        >
          {mode === "allocate"
            ? "legacy deserialization may allocate without ordinary construction; callbacks must not publish an unvalidated object"
            : "runtime identity and references can be preserved, which is precisely why untrusted graph input is dangerous"}
        </text>
      </svg>
    </LabShell>
  );
}

type ControlMode =
  | "serializable"
  | "custom"
  | "surrogate"
  | "binder"
  | "context";

export function CvcLegacyControlsLab() {
  const [mode, setMode] = useState<ControlMode>("serializable");
  const details = {
    serializable: ["[Serializable]", "default fields", "private layout"],
    custom: ["ISerializable", "SerializationInfo", "stable entries"],
    surrogate: ["third-party type", "surrogate", "replacement data"],
    binder: ["type name", "binder", "allowlist decision"],
    context: ["caller context", "StreamingContext", "purpose hint"],
  }[mode];
  const warning = mode === "binder" || mode === "context";

  return (
    <LabShell
      label="Legacy Control Lab"
      title="比较 Serializable、ISerializable、surrogate、binder 与 context"
      description="选择一个 legacy 控制点，先写出它能改变的 contract，再标注为什么它不能把不可信反序列化变成安全输入。"
      onReset={() => setMode("serializable")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          ["serializable", "custom", "surrogate", "binder", "context"] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "serializable"
              ? "Serializable"
              : item === "custom"
                ? "ISerializable"
                : item === "surrogate"
                  ? "surrogate"
                  : item === "binder"
                    ? "binder"
                    : "context"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} uses ${details[1]} and controls ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Legacy serialization control points</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--serialization-accent-soft)"
          stroke="var(--serialization-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          input type
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--serialization-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--serialization-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--serialization-surface)"
          stroke="var(--serialization-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          control point
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-warning)"
        >
          {warning ? "not a trust boundary" : "legacy contract"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--serialization-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--serialization-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--serialization-accent-soft)"
          stroke="var(--serialization-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          result
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={
            warning
              ? "var(--serialization-warning)"
              : "var(--serialization-accent)"
          }
        >
          {mode === "binder"
            ? "a binder can map names, but gadget behavior and graph complexity remain; migration is the security fix"
            : mode === "context"
              ? "StreamingContext describes purpose; it does not authenticate the caller or make payload code safe"
              : "legacy controls shape data and callbacks, but every control executes inside the unsafe formatter model"}
        </text>
      </svg>
    </LabShell>
  );
}

type MigrationMode = "legacy" | "json" | "protobuf" | "database" | "validate";

export function CvcMigrationBoundaryLab() {
  const [mode, setMode] = useState<MigrationMode>("legacy");
  const details = {
    legacy: ["old graph", "isolated reader", "migration input"],
    json: ["JSON DTO", "named fields", "human schema"],
    protobuf: ["protobuf", "field tags", "compact schema"],
    database: ["database row", "migration", "durable record"],
    validate: ["parsed DTO", "domain factory", "invariant"],
  }[mode];

  return (
    <LabShell
      label="Serialization Migration Lab"
      title="从 legacy runtime graph 迁移到显式、可验证的数据契约"
      description="切换目标表示，先判断字段、版本、边界和 owner 证据，再检查为什么 parse 后还必须经过 domain factory。"
      onReset={() => setMode("legacy")}
    >
      <div className="flex flex-wrap gap-2">
        {(["legacy", "json", "protobuf", "database", "validate"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "legacy"
                ? "legacy"
                : item === "json"
                  ? "JSON"
                  : item === "protobuf"
                    ? "protobuf"
                    : item === "database"
                      ? "database"
                      : "validate"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} passes through ${details[1]} and produces ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>Explicit serialization migration boundary</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--serialization-accent-soft)"
          stroke="var(--serialization-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          data source
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--serialization-accent)"
          strokeWidth="4"
        />
        <polygon
          points="278,104 266,97 266,111"
          fill="var(--serialization-accent)"
        />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--serialization-surface)"
          stroke="var(--serialization-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          boundary
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-warning)"
        >
          {mode === "legacy" ? "offline + bounded" : "allowlist + bounds"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--serialization-accent)"
          strokeWidth="4"
        />
        <polygon
          points="538,104 526,97 526,111"
          fill="var(--serialization-accent)"
        />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--serialization-accent-soft)"
          stroke="var(--serialization-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-ink)"
        >
          contract
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--serialization-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--serialization-accent)"
        >
          {mode === "legacy"
            ? "never expose the legacy reader as a service; convert known data once inside an isolated migration boundary"
            : mode === "validate"
              ? "parsing creates data, not a valid domain object; constructor/factory validation must run before publication"
              : "explicit schemas evolve through fields, tags, defaults, size limits and versioned migration"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcRuntimeSerializationConceptLabels = conceptLabels;
