"use client";

import { useState, type CSSProperties } from "react";

const shellStyle = {
  "--sna-accent": "#be123c",
  "--sna-accent-soft": "#ffe4e6",
  "--sna-ink": "#172033",
  "--sna-muted": "#94a3b8",
  "--sna-warning": "#b45309",
} as CSSProperties;

const conceptLabels = [
  "Two Kinds of Assemblies, Two Kinds of Deployment",
  "Giving an Assembly a Strong Name",
  "The Global Assembly Cache",
  "Building an Assembly That References a Strongly Named Assembly",
  "Strongly Named Assemblies Are Tamper-Resistant",
  "Delayed Signing",
  "Privately Deploying Strongly Named Assemblies",
  "How the Runtime Resolves Type References",
  "Advanced Administrative Control (Configuration)",
  "Publisher Policy Control",
] as const;

function ResetButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      {label}
    </button>
  );
}

export function CvcStrongNameIdentityLab() {
  const [changed, setChanged] = useState(false);
  const fields = changed
    ? ["Contoso.Runtime", "2.0.0.0", "neutral", "public key B"]
    : ["Contoso.Runtime", "1.9.9.9", "neutral", "public key A"];

  return (
    <section aria-label="strong name identity lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Strong-Name Identity</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">只改变一个 identity 字段，观察引用是否仍相同</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">强名称由 simple name、version、culture 和 public key 共同组成；文件名相同不代表 CLR identity 相同。</p>
        </div>
        <ResetButton onClick={() => setChanged(false)} label="重置身份" />
      </header>

      <div className="p-4">
        <svg viewBox="0 0 720 250" role="img" aria-label={changed ? "public key改变后的强名称身份" : "参考强名称身份"} className="h-auto w-full rounded-control border border-border bg-bg">
          <title>{changed ? "Changed strong-name identity" : "Reference strong-name identity"}</title>
          <line x1="84" y1="112" x2="636" y2="112" stroke="var(--sna-muted)" strokeWidth="4" />
          {fields.map((field, index) => {
            const x = 84 + index * 184;
            return (
              <g key={field}>
                <rect x={x - 67} y="76" width="134" height="72" rx="12" fill={index === 3 && changed ? "#fef3c7" : "var(--sna-accent-soft)"} stroke={index === 3 && changed ? "var(--sna-warning)" : "var(--sna-accent)"} strokeWidth="3" />
                <text x={x} y="103" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--sna-ink)">{index === 0 ? "simple name" : index === 1 ? "version" : index === 2 ? "culture" : "public key"}</text>
                <text x={x} y="126" textAnchor="middle" fontSize="11" fill="var(--sna-ink)">{field}</text>
              </g>
            );
          })}
          <text x="360" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill={changed ? "var(--sna-warning)" : "var(--sna-accent)"}>{changed ? "identity changed：consumer AssemblyRef no longer names the same assembly" : "identity stable：完整 display name 才是解析证据"}</text>
        </svg>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-relaxed text-secondary">当前状态：{changed ? "key/version 已变更，需要 consumer 迁移或 policy" : "参考 identity"}。</p>
          <button type="button" aria-pressed={changed} onClick={() => setChanged((value) => !value)} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-warning hover:text-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{changed ? "恢复原 identity" : "改变 key 与版本"}</button>
        </div>
      </div>
    </section>
  );
}

export function CvcBindingResolutionLab() {
  const [policy, setPolicy] = useState(false);
  const stages = policy ? ["AssemblyRef", "redirect", "GAC", "selected 1.9.9.9"] : ["AssemblyRef", "no redirect", "private probe", "selected 1.0.0.0"];

  return (
    <section aria-label="assembly binding resolution lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Binding Ledger</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从 requested identity 追到 selected file</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">只切换 binding policy，观察 loader 如何经过 policy、GAC 或 private probe 选择最终程序集。</p>
        </div>
        <ResetButton onClick={() => setPolicy(false)} label="重置绑定" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-wrap content-start gap-2">
          <button type="button" aria-pressed={!policy} onClick={() => setPolicy(false)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${!policy ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>原始 policy</button>
          <button type="button" aria-pressed={policy} onClick={() => setPolicy(true)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${policy ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>redirect policy</button>
          <p className="w-full rounded-control border border-border bg-bg p-3 text-sm leading-relaxed text-secondary">诊断记录必须同时保存 AssemblyRef、policy 变换、每个 probe location、拒绝原因与最终 file hash。</p>
        </div>

        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 720 250" role="img" aria-label="程序集绑定解析链" className="h-auto w-full">
            <title>Assembly binding resolution</title>
            <line x1="78" y1="110" x2="640" y2="110" stroke="var(--sna-muted)" strokeWidth="4" />
            {stages.map((stage, index) => {
              const x = 78 + index * 187;
              return (
                <g key={stage}>
                  <circle cx={x} cy="110" r="25" fill={index === 3 ? "var(--sna-accent)" : "white"} stroke={index === 3 ? "var(--sna-accent)" : "var(--sna-muted)"} strokeWidth="4" />
                  <text x={x} y="115" textAnchor="middle" fontSize="12" fontWeight="700" fill={index === 3 ? "white" : "var(--sna-ink)"}>{index + 1}</text>
                  <text x={x} y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--sna-ink)">{stage}</text>
                  <text x={x} y="172" textAnchor="middle" fontSize="11" fill="var(--sna-ink)">{index === 0 ? "requested" : index === 1 ? "effective policy" : index === 2 ? "candidate" : "verified hash"}</text>
                </g>
              );
            })}
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">{policy ? "redirect 改变选择，不自动证明 API、序列化和行为兼容。" : "没有 redirect 时，resolver 仍必须验证 identity、路径、架构和依赖闭包。"}</p>
        </div>
      </div>
    </section>
  );
}

export function CvcTrustBoundaryLab() {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false]);
  const items = [
    { label: "Strong name", detail: "identity 与单个 assembly 内容完整性" },
    { label: "Authenticode", detail: "证书链与发布者身份" },
    { label: "Package policy", detail: "仓库、hash、SBOM 与来源治理" },
    { label: "Isolation", detail: "权限、进程/容器和运行时能力边界" },
  ];
  const complete = checks.every(Boolean);
  const toggle = (index: number) => setChecks((current) => current.map((value, item) => (item === index ? !value : value)));

  return (
    <section aria-label="strong name trust boundary lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Trust Boundary</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">完整性、来源信任和隔离不是同一件事</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">逐项核对发布证据；强名称通过并不等于可以在主进程内信任插件。</p>
        </div>
        <ResetButton onClick={() => setChecks([false, false, false, false])} label="重置信任门" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-2">
          {items.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={checks[index]} onClick={() => toggle(index)} className={`min-h-11 rounded-control border px-3 py-3 text-left transition-colors ${checks[index] ? "border-accent bg-bg text-primary" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>
              <span className="mr-2 text-xs font-semibold text-accent">{checks[index] ? "已核对" : "待核对"}</span>
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="mt-1 block text-sm leading-relaxed">{item.detail}</span>
            </button>
          ))}
        </div>
        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 390 250" role="img" aria-label="身份完整性、发布者信任和隔离证据汇聚" className="h-auto w-full">
            <title>Trust boundary evidence gate</title>
            {items.map((item, index) => {
              const y = 28 + index * 49;
              return (
                <g key={item.label}>
                  <rect x="16" y={y} width="205" height="29" rx="8" fill={checks[index] ? "var(--sna-accent-soft)" : "white"} stroke={checks[index] ? "var(--sna-accent)" : "var(--sna-muted)"} strokeWidth="2" />
                  <text x="29" y={y + 19} fontSize="11" fill="var(--sna-ink)">{item.label}</text>
                  <line x1="223" y1={y + 15} x2="270" y2="122" stroke={checks[index] ? "var(--sna-accent)" : "var(--sna-muted)"} strokeWidth="2" />
                </g>
              );
            })}
            <circle cx="315" cy="122" r="41" fill={complete ? "var(--sna-accent)" : "white"} stroke={complete ? "var(--sna-accent)" : "var(--sna-muted)"} strokeWidth="4" />
            <text x="315" y="118" textAnchor="middle" fontSize="12" fontWeight="700" fill={complete ? "white" : "var(--sna-ink)"}>{complete ? "放行" : "检查"}</text>
            <text x="315" y="138" textAnchor="middle" fontSize="11" fill={complete ? "white" : "var(--sna-ink)"}>{checks.filter(Boolean).length}/4</text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">{complete ? "四层证据齐全：仍需按插件能力决定是否使用进程或容器隔离。" : `还需核对 ${items.length - checks.filter(Boolean).length} 层证据。`}</p>
        </div>
      </div>
    </section>
  );
}

export const cvcSharedStrongNameConceptLabels = conceptLabels;
