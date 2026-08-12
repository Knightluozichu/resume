"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--winrt-accent": "#0369a1",
  "--winrt-accent-soft": "#e0f2fe",
  "--winrt-ink": "#172033",
  "--winrt-muted": "#94a3b8",
  "--winrt-warning": "#b45309",
  "--winrt-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "CLR Projections and WinRT Component Type System Rules",
  "WinRT Type System Core Concepts",
  "Framework Projections",
  "Calling Asynchronous WinRT APIs from .NET Code",
  "Interoperating Between WinRT Streams and .NET Streams",
  "Passing Blocks of Data Between the CLR and WinRT",
  "Defining WinRT Components in C#",
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

type ProjectionMode = "metadata" | "abi" | "projected" | "event" | "identity";

export function CvcWinrtProjectionLab() {
  const [mode, setMode] = useState<ProjectionMode>("metadata");
  const details = {
    metadata: [".winmd", "ABI contract", "runtime class"],
    abi: ["interface IID", "HRESULT", "identity"],
    projected: ["C# Type", "natural syntax", "projection"],
    event: ["event token", "+= / -=", "listener lifetime"],
    identity: ["apartment", "agility", "thread rule"],
  }[mode];
  const warning = mode === "identity";

  return (
    <LabShell
      label="Projection Boundary Lab"
      title="把 .winmd、ABI identity 与 C# projection 放在同一条链上"
      description="先预测一个 C# 成员背后的 metadata、HRESULT、IID 或 event token，再切换节点检查哪些规则仍由 WinRT contract 拥有。"
      onReset={() => setMode("metadata")}
    >
      <div className="flex flex-wrap gap-2">
        {(["metadata", "abi", "projected", "event", "identity"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "metadata"
                ? "metadata"
                : item === "abi"
                  ? "ABI"
                  : item === "projected"
                    ? "C# surface"
                    : item === "event"
                      ? "event"
                      : "thread"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} to ${details[1]} to ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>WinRT metadata ABI and projection boundary</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--winrt-accent-soft)"
          stroke="var(--winrt-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          source
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--winrt-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--winrt-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--winrt-surface)"
          stroke="var(--winrt-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          contract
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-warning)"
        >
          {warning ? "thread-affine" : "cross-language"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--winrt-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--winrt-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--winrt-accent-soft)"
          stroke="var(--winrt-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          consumer
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--winrt-warning)" : "var(--winrt-accent)"}
        >
          {warning
            ? "C# syntax does not remove apartment or agility rules"
            : "projection changes the surface, not the WinRT identity, lifetime or ABI contract"}
        </text>
      </svg>
    </LabShell>
  );
}

type DataMode = "async" | "stream" | "buffer" | "partial" | "cancel";

export function CvcWinrtAsyncDataLab() {
  const [mode, setMode] = useState<DataMode>("async");
  const details = {
    async: ["IAsyncOperation", "await / Task", "status + HRESULT"],
    stream: ["IInputStream", "Stream adapter", "read ownership"],
    buffer: ["IBuffer", "Length / Capacity", "data boundary"],
    partial: ["requested bytes", "partial read", "remaining"],
    cancel: ["cancel request", "side effect", "observe completion"],
  }[mode];
  const warning = mode === "cancel" || mode === "partial";

  return (
    <LabShell
      label="Async and Data Ownership Lab"
      title="观察 async、stream、buffer 与 cancellation 的真实边界"
      description="切换一种 WinRT 数据协议，先写出有效长度、copy/share、Dispose owner 与取消后的副作用，再用图上的证据核对。"
      onReset={() => setMode("async")}
    >
      <div className="flex flex-wrap gap-2">
        {(["async", "stream", "buffer", "partial", "cancel"] as const).map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
            >
              {item === "async"
                ? "async"
                : item === "stream"
                  ? "stream"
                  : item === "buffer"
                    ? "IBuffer"
                    : item === "partial"
                      ? "partial read"
                      : "cancel"}
            </button>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} maps to ${details[1]} and records ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>WinRT asynchronous and buffer data contract</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--winrt-accent-soft)"
          stroke="var(--winrt-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          WinRT
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--winrt-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--winrt-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--winrt-surface)"
          stroke="var(--winrt-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          adapter evidence
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-warning)"
        >
          {warning ? "boundary case" : "contract case"}
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--winrt-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--winrt-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--winrt-accent-soft)"
          stroke="var(--winrt-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          must preserve
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={warning ? "var(--winrt-warning)" : "var(--winrt-accent)"}
        >
          {mode === "buffer"
            ? "Capacity is storage; Length is valid data. Never read untrusted capacity as if it were content."
            : mode === "partial"
              ? "one ReadAsync may be partial; loop until the logical length is satisfied or the contract reports completion"
              : mode === "cancel"
                ? "cancellation requests cooperation; observe the underlying operation before releasing its owner"
                : "adapter syntax is convenient, but status, error, position and Dispose ownership remain explicit"}
        </text>
      </svg>
    </LabShell>
  );
}

type ComponentMode =
  | "public"
  | "activation"
  | "version"
  | "consumer"
  | "deployment";

export function CvcWinrtComponentContractLab() {
  const [mode, setMode] = useState<ComponentMode>("public");
  const details = {
    public: ["C# class", "WinRT legal types", "winmd"],
    activation: ["runtime class", "factory/package", "create"],
    version: ["published IID", "new interface", "compatibility"],
    consumer: ["C# caller", "other projection", "same contract"],
    deployment: ["SDK/package", "OS capability", "activation"],
  }[mode];

  return (
    <LabShell
      label="Component Contract Lab"
      title="从 C# public API 推导 winmd、activation 与 consumer matrix"
      description="选择组件发布阶段，先判断哪部分属于 WinRT public surface，再切换到非 C# consumer、IID version 或 package activation 验证。"
      onReset={() => setMode("public")}
    >
      <div className="flex flex-wrap gap-2">
        {(
          ["public", "activation", "version", "consumer", "deployment"] as const
        ).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "public"
              ? "public API"
              : item === "activation"
                ? "activation"
                : item === "version"
                  ? "version"
                  : item === "consumer"
                    ? "consumer"
                    : "deployment"}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 720 250"
        role="img"
        aria-label={`${details[0]} requires ${details[1]} and yields ${details[2]}`}
        className="mt-4 h-auto w-full rounded-control border border-border bg-bg"
      >
        <title>WinRT component publication contract</title>
        <rect
          x="24"
          y="62"
          width="160"
          height="84"
          rx="12"
          fill="var(--winrt-accent-soft)"
          stroke="var(--winrt-accent)"
          strokeWidth="3"
        />
        <text
          x="104"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          design input
        </text>
        <text
          x="104"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[0]}
        </text>
        <line
          x1="208"
          y1="104"
          x2="278"
          y2="104"
          stroke="var(--winrt-accent)"
          strokeWidth="4"
        />
        <polygon points="278,104 266,97 266,111" fill="var(--winrt-accent)" />
        <rect
          x="294"
          y="38"
          width="166"
          height="132"
          rx="12"
          fill="var(--winrt-surface)"
          stroke="var(--winrt-muted)"
          strokeWidth="3"
        />
        <text
          x="377"
          y="70"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          validation
        </text>
        <text
          x="377"
          y="106"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[1]}
        </text>
        <text
          x="377"
          y="136"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-warning)"
        >
          cross-language test
        </text>
        <line
          x1="484"
          y1="104"
          x2="538"
          y2="104"
          stroke="var(--winrt-accent)"
          strokeWidth="4"
        />
        <polygon points="538,104 526,97 526,111" fill="var(--winrt-accent)" />
        <rect
          x="554"
          y="62"
          width="142"
          height="84"
          rx="12"
          fill="var(--winrt-accent-soft)"
          stroke="var(--winrt-accent)"
          strokeWidth="3"
        />
        <text
          x="625"
          y="94"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-ink)"
        >
          released result
        </text>
        <text
          x="625"
          y="121"
          textAnchor="middle"
          fontSize="12"
          fill="var(--winrt-ink)"
        >
          {details[2]}
        </text>
        <text
          x="360"
          y="218"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--winrt-accent)"
        >
          {mode === "version"
            ? "published interfaces stay immutable; add a versioned interface instead of changing an existing IID"
            : mode === "consumer"
              ? "a C# unit test is not enough: another language must consume the same metadata and error/event contract"
              : "public surface, activation and deployment are one contract; private .NET implementation details do not cross the boundary"}
        </text>
      </svg>
    </LabShell>
  );
}

export const cvcInteroperatingWinrtComponentsConceptLabels = conceptLabels;
