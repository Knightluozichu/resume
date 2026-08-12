"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const shellStyle = {
  "--parameters-accent": "#2563eb",
  "--parameters-accent-soft": "#dbeafe",
  "--parameters-ink": "#172033",
  "--parameters-muted": "#94a3b8",
  "--parameters-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  "Optional and Named Arguments",
  "Rules and Guidelines",
  "The DefaultParameterValue and Optional Attributes",
  "Implicitly Typed Local Variables",
  "Passing Parameters by Reference to a Method",
  "Passing a Variable Number of Arguments to a Method",
  "Parameter and Return Type Guidelines",
  "Const-ness",
] as const;

function ResetButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
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
    <section aria-label={label} style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
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

export function CvcDefaultEmbeddingLab() {
  const [recompiled, setRecompiled] = useState(false);
  const [providerChanged, setProviderChanged] = useState(false);
  const value = providerChanged && recompiled ? "v2 = 30s" : "v1 = 5s";

  return (
    <LabShell
      label="Default Embedding"
      title="区分声明默认值与 call-site 默认值"
      description="先预测：provider 改 optional default 后，旧 binary 和重新编译的 caller 各自会传什么？"
      onReset={() => { setRecompiled(false); setProviderChanged(false); }}
    >
      <div className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={providerChanged} onClick={() => setProviderChanged((value) => !value)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${providerChanged ? "border-warning bg-bg text-primary" : "border-border text-secondary"}`}>{providerChanged ? "provider default = 30s" : "provider default = 5s"}</button>
        <button type="button" aria-pressed={recompiled} onClick={() => setRecompiled((value) => !value)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${recompiled ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{recompiled ? "caller 重编译" : "保持旧 binary"}</button>
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`Optional default embedding result ${value}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Optional default embedding</title>
        <defs>
          <marker id="cvc-default-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={providerChanged ? "var(--parameters-warning)" : "var(--parameters-accent)"} />
          </marker>
        </defs>
        <rect x="24" y="66" width="154" height="78" rx="12" fill="var(--parameters-accent-soft)" stroke="var(--parameters-accent)" strokeWidth="3" />
        <text x="101" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">provider API</text>
        <text x="101" y="122" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">{providerChanged ? "default = 30s" : "default = 5s"}</text>
        <line x1="196" y1="105" x2="282" y2="105" stroke={providerChanged ? "var(--parameters-warning)" : "var(--parameters-accent)"} strokeWidth="4" markerEnd="url(#cvc-default-arrow)" />
        <rect x="298" y="40" width="154" height="130" rx="12" fill={providerChanged ? "#fef3c7" : "white"} stroke={providerChanged ? "var(--parameters-warning)" : "var(--parameters-muted)"} strokeWidth="3" />
        <text x="375" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">compiler</text>
        <text x="375" y="102" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">{recompiled ? "new call site" : "old call site"}</text>
        <text x="375" y="130" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">argument embedded</text>
        <line x1="472" y1="105" x2="558" y2="105" stroke={providerChanged ? "var(--parameters-warning)" : "var(--parameters-accent)"} strokeWidth="4" markerEnd="url(#cvc-default-arrow)" />
        <rect x="574" y="66" width="122" height="78" rx="12" fill={providerChanged && !recompiled ? "#fef3c7" : "var(--parameters-accent-soft)"} stroke={providerChanged && !recompiled ? "var(--parameters-warning)" : "var(--parameters-accent)"} strokeWidth="3" />
        <text x="635" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">callee receives</text>
        <text x="635" y="122" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">{value}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={providerChanged && !recompiled ? "var(--parameters-warning)" : "var(--parameters-accent)"}>{providerChanged && !recompiled ? "旧 binary 仍传 5s，新旧 caller 分裂" : "重新编译才会把新 default 写入 call site"}</text>
      </svg>
    </LabShell>
  );
}

type AliasMode = "value" | "ref" | "out" | "in";

export function CvcParameterAliasLab() {
  const [mode, setMode] = useState<AliasMode>("ref");
  const alias = mode !== "value";
  const write = mode === "ref" || mode === "out";

  return (
    <LabShell
      label="Parameter Aliasing"
      title="把传参方式映射到 storage 和写权限"
      description="动手试：切换 value、ref、out、in，观察 caller storage、callee alias 与写入权如何变化。"
      onReset={() => setMode("ref")}
    >
      <div className="flex flex-wrap gap-2">
        {(["value", "ref", "out", "in"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`${mode} parameter mode ${alias ? "aliases" : "copies"} caller storage`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Parameter storage aliasing</title>
        <defs>
          <marker id="cvc-alias-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={alias ? "var(--parameters-accent)" : "var(--parameters-muted)"} />
          </marker>
        </defs>
        <rect x="24" y="66" width="154" height="78" rx="12" fill="var(--parameters-accent-soft)" stroke="var(--parameters-accent)" strokeWidth="3" />
        <text x="101" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">caller variable</text>
        <text x="101" y="122" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">storage owner</text>
        <line x1="196" y1="105" x2="282" y2="105" stroke={alias ? "var(--parameters-accent)" : "var(--parameters-muted)"} strokeWidth="4" markerEnd="url(#cvc-alias-arrow)" strokeDasharray={alias ? undefined : "8 8"} />
        <rect x="298" y="40" width="154" height="130" rx="12" fill={write ? "var(--parameters-accent-soft)" : "white"} stroke={write ? "var(--parameters-accent)" : "var(--parameters-muted)"} strokeWidth="3" />
        <text x="375" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">callee parameter</text>
        <text x="375" y="102" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">{alias ? "same storage alias" : "copied value"}</text>
        <text x="375" y="130" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">{mode === "out" ? "write before return" : mode === "in" ? "readonly view" : write ? "read + write" : "read only"}</text>
        <line x1="472" y1="105" x2="558" y2="105" stroke={write ? "var(--parameters-accent)" : "var(--parameters-muted)"} strokeWidth="4" markerEnd="url(#cvc-alias-arrow)" strokeDasharray={write ? undefined : "8 8"} />
        <rect x="574" y="66" width="122" height="78" rx="12" fill={write ? "var(--parameters-accent-soft)" : "white"} stroke={write ? "var(--parameters-accent)" : "var(--parameters-muted)"} strokeWidth="3" />
        <text x="635" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">{mode === "out" ? "result" : "caller sees"}</text>
        <text x="635" y="122" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">{write ? "may change" : mode === "in" ? "cannot assign" : "unchanged"}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill={alias ? "var(--parameters-accent)" : "var(--parameters-muted)"}>{mode === "value" ? "by value：只复制 value/reference" : mode === "in" ? "in：alias 只读，但对象本身未冻结" : `${mode}：caller storage 进入 alias contract`}</text>
      </svg>
    </LabShell>
  );
}

type ContractMode = "params" | "snapshot" | "readonly";

export function CvcParameterContractLab() {
  const [mode, setMode] = useState<ContractMode>("snapshot");
  const details = mode === "params"
    ? ["convenient call syntax", "array may allocate", "ownership must be stated"]
    : mode === "readonly"
      ? ["narrow capability", "no write through surface", "other aliases may mutate"]
      : ["copy at boundary", "stable observation", "allocation is explicit"];

  return (
    <LabShell
      label="Parameter Contract"
      title="把 convenience、ownership 和 immutability 分开"
      description="先预测：接受 params、readonly surface 或 snapshot，哪一种真正保证调用期间看到的对象不变？"
      onReset={() => setMode("snapshot")}
    >
      <div className="flex flex-wrap gap-2">
        {(["params", "readonly", "snapshot"] as const).map((item) => (
          <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === item ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{item}</button>
        ))}
      </div>
      <svg viewBox="0 0 720 250" role="img" aria-label={`Parameter contract mode ${mode}`} className="mt-4 h-auto w-full rounded-control border border-border bg-bg">
        <title>Parameter and return contract choices</title>
        <rect x="24" y="66" width="154" height="78" rx="12" fill="var(--parameters-accent-soft)" stroke="var(--parameters-accent)" strokeWidth="3" />
        <text x="101" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">caller input</text>
        <text x="101" y="122" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">{mode === "params" ? "many items" : "collection alias"}</text>
        <line x1="196" y1="105" x2="282" y2="105" stroke="var(--parameters-accent)" strokeWidth="4" />
        <polygon points="282,105 270,98 270,112" fill="var(--parameters-accent)" />
        <rect x="298" y="40" width="154" height="130" rx="12" fill={mode === "snapshot" ? "var(--parameters-accent-soft)" : "white"} stroke="var(--parameters-accent)" strokeWidth="3" />
        <text x="375" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">boundary policy</text>
        {details.map((detail, index) => (
          <g key={detail}>
            <circle cx="322" cy={102 + index * 22} r="5" fill="var(--parameters-accent)" />
            <text x="336" y={106 + index * 22} fontSize="11" fill="var(--parameters-ink)">{detail}</text>
          </g>
        ))}
        <line x1="472" y1="105" x2="558" y2="105" stroke="var(--parameters-accent)" strokeWidth="4" />
        <polygon points="558,105 546,98 546,112" fill="var(--parameters-accent)" />
        <rect x="574" y="66" width="122" height="78" rx="12" fill={mode === "snapshot" ? "var(--parameters-accent-soft)" : "white"} stroke="var(--parameters-accent)" strokeWidth="3" />
        <text x="635" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-ink)">callee sees</text>
        <text x="635" y="122" textAnchor="middle" fontSize="12" fill="var(--parameters-ink)">{mode === "snapshot" ? "stable copy" : mode === "readonly" ? "read-only view" : "expanded array"}</text>
        <text x="360" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--parameters-accent)">{mode === "snapshot" ? "immutability：通过 copy/snapshot 保证观察稳定" : mode === "readonly" ? "readonly surface 不等于深度 immutable" : "params：便捷语法，不自动承诺 ownership"}</text>
      </svg>
    </LabShell>
  );
}

export const cvcParametersConceptLabels = conceptLabels;
