"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--text-accent": "#047857",
  "--text-accent-soft": "#d1fae5",
  "--text-ink": "#172033",
  "--text-muted": "#94a3b8",
  "--text-warning": "#b45309",
  "--text-surface": "#ffffff",
} as CSSProperties;

const conceptLabels = [
  "Characters",
  "The System.String Type",
  "Constructing Strings",
  "Strings Are Immutable",
  "Comparing Strings",
  "String Interning",
  "String Pooling",
  "Examining a String's Characters and Text Elements",
  "Other String Operations",
  "Constructing a String Efficiently",
  "Constructing a StringBuilder Object",
  "StringBuilder Members",
  "Obtaining a String Representation of an Object: ToString",
  "Specific Formats and Cultures",
  "Formatting Multiple Objects into a Single String",
  "Providing Your Own Custom Formatter",
  "Parsing a String to Obtain an Object: Parse",
  "Encodings: Converting Between Characters and Bytes",
  "Encoding and Decoding Streams of Characters and Bytes",
  "Base-64 String Encoding and Decoding",
  "Secure Strings",
] as const;

function ResetButton({ onClick, label }: { onClick: () => void; label: string }) {
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
          <p className="mt-2 text-sm leading-relaxed text-secondary">{description}</p>
        </div>
        <ResetButton onClick={onReset} label="重置实验" />
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

type UnitMode = "code-unit" | "scalar" | "grapheme" | "bytes";

export function CvcTextUnitLab() {
  const [mode, setMode] = useState<UnitMode>("code-unit");
  const details = {
    "code-unit": ["UTF-16", "4 units", "char index"],
    scalar: ["Unicode scalar", "3 values", "Rune"],
    grapheme: ["user text", "2 clusters", "cursor unit"],
    bytes: ["UTF-8", "7 bytes", "wire limit"],
  }[mode];

  return (
    <LabShell
      label="Text Unit Boundary"
      title="让 code unit、scalar、grapheme 与 bytes 不再混为一谈"
      description="先预测：切换四种文本单位，字符串长度、合法切片点和协议边界分别由谁决定？"
      onReset={() => setMode("code-unit")}
    >
      <div className="flex flex-wrap gap-2">
        {(["code-unit", "scalar", "grapheme", "bytes"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item === "code-unit" ? "UTF-16 unit" : item}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} text unit: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Text units and valid slicing boundaries</title>
        <rect x="24" y="62" width="170" height="84" rx="12" fill="var(--text-accent-soft)" stroke="var(--text-accent)" strokeWidth="3" />
        <text x="109" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">source text</text>
        <text x="109" y="121" textAnchor="middle" fontSize="12" fill="var(--text-ink)">A + scalar + mark</text>
        <line x1="216" y1="104" x2="278" y2="104" stroke="var(--text-accent)" strokeWidth="4" />
        <polygon points="278,104 266,97 266,111" fill="var(--text-accent)" />
        <rect x="294" y="38" width="166" height="132" rx="12" fill="var(--text-surface)" stroke="var(--text-muted)" strokeWidth="3" />
        <text x="377" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">{details[0]}</text>
        <text x="377" y="104" textAnchor="middle" fontSize="12" fill="var(--text-ink)">{details[1]}</text>
        <text x="377" y="134" textAnchor="middle" fontSize="12" fill="var(--text-ink)">{details[2]}</text>
        <line x1="484" y1="104" x2="538" y2="104" stroke="var(--text-accent)" strokeWidth="4" />
        <polygon points="538,104 526,97 526,111" fill="var(--text-accent)" />
        <rect x="554" y="62" width="142" height="84" rx="12" fill="var(--text-accent-soft)" stroke="var(--text-accent)" strokeWidth="3" />
        <text x="625" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">boundary</text>
        <text x="625" y="121" textAnchor="middle" fontSize="12" fill="var(--text-ink)">{mode === "bytes" ? "encoding" : mode === "grapheme" ? "UI cursor" : "safe slice"}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-accent)">{mode === "code-unit" ? "char index 只能说明 UTF-16 unit，不保证用户字符完整" : mode === "scalar" ? "Rune 负责 Unicode scalar，仍不等于一个用户感知字符" : mode === "grapheme" ? "grapheme cluster 适合光标与删除，不应直接当 wire bytes" : "encoding 先决定 bytes，再验证 framing、fallback 与长度"}</text>
      </svg>
    </LabShell>
  );
}

type CompareMode = "ordinal" | "culture" | "intern";

export function CvcTextComparisonLab() {
  const [mode, setMode] = useState<CompareMode>("ordinal");
  const details = {
    ordinal: ["code units", "stable identity", "protocol / key"],
    culture: ["linguistic rules", "current culture", "display sort"],
    intern: ["equal value", "canonical ref", "lifetime risk"],
  }[mode];
  const warning = mode === "intern";

  return (
    <LabShell
      label="Comparison and Interning"
      title="把 value equality、culture 规则和 reference 复用分开"
      description="动手试：切换 ordinal、culture 与 intern，判断每种策略能否作为 identifier、展示排序或内存优化的契约。"
      onReset={() => setMode("ordinal")}
    >
      <div className="flex flex-wrap gap-2">
        {(["ordinal", "culture", "intern"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} text strategy: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>String comparison and intern strategy</title>
        <rect x="24" y="62" width="170" height="84" rx="12" fill="var(--text-accent-soft)" stroke="var(--text-accent)" strokeWidth="3" />
        <text x="109" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">two strings</text>
        <text x="109" y="121" textAnchor="middle" fontSize="12" fill="var(--text-ink)">same visible text?</text>
        <line x1="216" y1="104" x2="278" y2="104" stroke="var(--text-accent)" strokeWidth="4" />
        <polygon points="278,104 266,97 266,111" fill="var(--text-accent)" />
        <rect x="294" y="38" width="166" height="132" rx="12" fill="var(--text-surface)" stroke="var(--text-muted)" strokeWidth="3" />
        <text x="377" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">{details[0]}</text>
        <text x="377" y="104" textAnchor="middle" fontSize="12" fill="var(--text-ink)">{details[1]}</text>
        <text x="377" y="134" textAnchor="middle" fontSize="12" fill={warning ? "var(--text-warning)" : "var(--text-ink)"}>{details[2]}</text>
        <line x1="484" y1="104" x2="538" y2="104" stroke="var(--text-accent)" strokeWidth="4" />
        <polygon points="538,104 526,97 526,111" fill="var(--text-accent)" />
        <rect x="554" y="62" width="142" height="84" rx="12" fill={warning ? "var(--text-surface)" : "var(--text-accent-soft)"} stroke={warning ? "var(--text-muted)" : "var(--text-accent)"} strokeWidth="3" />
        <text x="625" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">decision</text>
        <text x="625" y="121" textAnchor="middle" fontSize="12" fill="var(--text-ink)">{mode === "ordinal" ? "equals / hash" : mode === "culture" ? "sort / search" : "reuse / retain"}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning ? "var(--text-warning)" : "var(--text-accent)"}>{mode === "ordinal" ? "ordinal：稳定、culture-independent，适合 protocol token 与 security key" : mode === "culture" ? "culture：适合用户语言排序，不适合持久 identity" : "intern：ReferenceEquals 不是 value equality，pool lifetime 必须受控"}</text>
      </svg>
    </LabShell>
  );
}

type BoundaryMode = "encoding" | "stream" | "base64" | "secret";

export function CvcTextBoundaryLab() {
  const [mode, setMode] = useState<BoundaryMode>("encoding");
  const details = {
    encoding: ["characters", "UTF-8 bytes", "fallback"],
    stream: ["partial read", "stateful decoder", "flush"],
    base64: ["binary", "ASCII text", "33% overhead"],
    secret: ["input", "managed buffer", "short window"],
  }[mode];
  const warning = mode === "base64" || mode === "secret";

  return (
    <LabShell
      label="Encoding and Secret Boundary"
      title="观察 bytes framing、fallback、Base64 与明文生命周期"
      description="先预测：切换 encoding、stream、Base64 和 secret，哪一步保留 partial state，哪一种只是表示转换而不是加密？"
      onReset={() => setMode("encoding")}
    >
      <div className="flex flex-wrap gap-2">
        {(["encoding", "stream", "base64", "secret"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
            className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} text boundary: ${details.join(", ")}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Text encoding and secret lifetime boundary</title>
        <rect x="24" y="62" width="170" height="84" rx="12" fill="var(--text-accent-soft)" stroke="var(--text-accent)" strokeWidth="3" />
        <text x="109" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">input</text>
        <text x="109" y="121" textAnchor="middle" fontSize="12" fill="var(--text-ink)">{details[0]}</text>
        <line x1="216" y1="104" x2="278" y2="104" stroke="var(--text-accent)" strokeWidth="4" />
        <polygon points="278,104 266,97 266,111" fill="var(--text-accent)" />
        <rect x="294" y="38" width="166" height="132" rx="12" fill="var(--text-surface)" stroke="var(--text-muted)" strokeWidth="3" />
        <text x="377" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">{details[1]}</text>
        <text x="377" y="104" textAnchor="middle" fontSize="12" fill="var(--text-ink)">{details[2]}</text>
        <text x="377" y="134" textAnchor="middle" fontSize="12" fill={warning ? "var(--text-warning)" : "var(--text-ink)"}>{mode === "stream" ? "partial bytes retained" : mode === "base64" ? "not encryption" : mode === "secret" ? "zero copies where possible" : "reject invalid input"}</text>
        <line x1="484" y1="104" x2="538" y2="104" stroke="var(--text-accent)" strokeWidth="4" />
        <polygon points="538,104 526,97 526,111" fill="var(--text-accent)" />
        <rect x="554" y="62" width="142" height="84" rx="12" fill={warning ? "var(--text-surface)" : "var(--text-accent-soft)"} stroke={warning ? "var(--text-muted)" : "var(--text-accent)"} strokeWidth="3" />
        <text x="625" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-ink)">contract</text>
        <text x="625" y="121" textAnchor="middle" fontSize="12" fill="var(--text-ink)">{mode === "encoding" ? "framing + fallback" : mode === "stream" ? "flush at end" : mode === "base64" ? "size + variant" : "vault + privilege"}</text>
        <text x="360" y="218" textAnchor="middle" fontSize="12" fontWeight="700" fill={warning ? "var(--text-warning)" : "var(--text-accent)"}>{mode === "encoding" ? "encoding：显式指定 UTF-8、BOM、fallback 与 message framing" : mode === "stream" ? "stream：跨read保存 decoder state，不能逐块独立GetString" : mode === "base64" ? "Base64：binary-to-text，不是 encryption、hash 或 compression" : "secret：缩短 plaintext window，不能宣称进程内绝对不可读"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcTextConceptLabels = conceptLabels;
