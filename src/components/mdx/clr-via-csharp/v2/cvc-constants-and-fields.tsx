"use client";

import { useState, type CSSProperties } from "react";

const shellStyle = {
  "--field-accent": "#0369a1",
  "--field-accent-soft": "#e0f2fe",
  "--field-ink": "#172033",
  "--field-muted": "#94a3b8",
  "--field-warning": "#b45309",
} as CSSProperties;

const conceptLabels = ["Constants", "Fields"] as const;

function ResetButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
      {label}
    </button>
  );
}

export function CvcConstEmbeddingLab() {
  const [providerV2, setProviderV2] = useState(false);
  const observed = providerV2 ? "旧 consumer 仍为 16" : "consumer literal = 16";

  return (
    <section aria-label="constant embedding lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Constant Embedding</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">不重编 consumer，只替换 provider</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">const 在编译时求值并复制进 consumer IL；static readonly/property 才会在运行时读取 provider。</p>
        </div>
        <ResetButton onClick={() => setProviderV2(false)} label="重置版本" />
      </header>

      <div className="p-4">
        <svg viewBox="0 0 720 250" role="img" aria-label={providerV2 ? "provider已升级但旧consumer仍使用旧const" : "const编译期内嵌"} className="h-auto w-full rounded-control border border-border bg-bg">
          <title>Constant embedding version experiment</title>
          <line x1="100" y1="110" x2="620" y2="110" stroke="var(--field-muted)" strokeWidth="4" />
          <rect x="48" y="76" width="145" height="68" rx="12" fill="var(--field-accent-soft)" stroke="var(--field-accent)" strokeWidth="3" />
          <rect x="288" y="76" width="145" height="68" rx="12" fill={providerV2 ? "#fef3c7" : "white"} stroke={providerV2 ? "var(--field-warning)" : "var(--field-muted)"} strokeWidth="3" />
          <rect x="527" y="76" width="145" height="68" rx="12" fill="var(--field-accent-soft)" stroke="var(--field-accent)" strokeWidth="3" />
          <text x="120" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--field-ink)">provider v1</text>
          <text x="120" y="126" textAnchor="middle" fontSize="11" fill="var(--field-ink)">HeaderSize = 16</text>
          <text x="360" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--field-ink)">{providerV2 ? "provider v2" : "consumer IL"}</text>
          <text x="360" y="126" textAnchor="middle" fontSize="11" fill="var(--field-ink)">{providerV2 ? "HeaderSize = 32" : "literal = 16"}</text>
          <text x="600" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--field-ink)">运行输出</text>
          <text x="600" y="126" textAnchor="middle" fontSize="11" fill="var(--field-ink)">{observed}</text>
          <text x="360" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill={providerV2 ? "var(--field-warning)" : "var(--field-accent)"}>{providerV2 ? "版本分岔：旧 consumer 未读 provider v2" : "先编译：const 值进入 consumer IL"}</text>
        </svg>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm leading-relaxed text-secondary">当前状态：{providerV2 ? "provider 已升级，consumer 未重编" : "参考版本"}。</p>
          <button type="button" aria-pressed={providerV2} onClick={() => setProviderV2((value) => !value)} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-warning hover:text-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{providerV2 ? "恢复 provider v1" : "只替换 provider"}</button>
        </div>
      </div>
    </section>
  );
}

export function CvcFieldOwnershipLab() {
  const [owner, setOwner] = useState(0);
  const owners = [
    { label: "instance", detail: "每个 object 一份，随 GC 可达性结束" },
    { label: "static", detail: "runtime type / load context 持有，可能阻止卸载" },
    { label: "ThreadStatic", detail: "physical thread 持有，线程池复用会残留" },
    { label: "AsyncLocal", detail: "logical execution flow 传播，scope 需恢复" },
  ];

  return (
    <section aria-label="field ownership and lifetime lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Field Ownership</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先选 owner，再判断 lifetime 与清理责任</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">同一个值放进 instance、static、ThreadStatic 或 AsyncLocal，状态边界就完全不同。</p>
        </div>
        <ResetButton onClick={() => setOwner(0)} label="重置 owner" />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-2">
          {owners.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={owner === index} onClick={() => setOwner(index)} className={`min-h-11 rounded-control border px-3 py-3 text-left transition-colors ${owner === index ? "border-accent bg-bg text-primary" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>
              <span className="mr-2 text-xs font-semibold text-accent">{index + 1}</span>
              <span className="text-sm font-semibold">{item.label}</span>
              <span className="mt-1 block text-sm leading-relaxed">{item.detail}</span>
            </button>
          ))}
        </div>
        <div className="rounded-control border border-border bg-bg p-3">
          <svg viewBox="0 0 720 250" role="img" aria-label="字段owner与生命周期" className="h-auto w-full">
            <title>Field owner and lifetime</title>
            <line x1="100" y1="110" x2="620" y2="110" stroke="var(--field-muted)" strokeWidth="4" />
            {["create", "hold", "observe", "cleanup"].map((label, index) => {
              const x = 100 + index * 173;
              return (
                <g key={label}>
                  <circle cx={x} cy="110" r={index === 1 ? 28 : 22} fill={index === 1 ? "var(--field-accent)" : "white"} stroke={index === 1 ? "var(--field-accent)" : "var(--field-muted)"} strokeWidth="4" />
                  <text x={x} y="115" textAnchor="middle" fontSize="12" fontWeight="700" fill={index === 1 ? "white" : "var(--field-ink)"}>{index + 1}</text>
                  <text x={x} y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--field-ink)">{label}</text>
                  <text x={x} y="174" textAnchor="middle" fontSize="11" fill="var(--field-ink)">{index === 1 ? owners[owner].label : index === 0 ? "owner" : index === 2 ? "scope" : "release"}</text>
                </g>
              );
            })}
            <text x="360" y="210" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--field-accent)">当前 owner：{owners[owner].label}</text>
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-secondary">{owners[owner].detail}。把 owner 写进 type contract，才知道何时清除或允许卸载。</p>
        </div>
      </div>
    </section>
  );
}

export function CvcPublicationProtocolLab() {
  const [mode, setMode] = useState<"volatile" | "interlocked" | "lock">("volatile");
  const data = {
    volatile: { label: "volatile", result: "可见性/排序，不保证 count++ 原子", color: "var(--field-warning)" },
    interlocked: { label: "Interlocked", result: "单一数值更新具备原子 read-modify-write", color: "var(--field-accent)" },
    lock: { label: "lock", result: "保护多个字段 invariant 与临界区", color: "var(--field-accent)" },
  };

  return (
    <section aria-label="field publication protocol lab" style={shellStyle} className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Publication Protocol</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同步原语必须匹配状态转换</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">volatile、Interlocked 和 lock 解决的不是同一个问题；先标出单字段更新还是多字段 invariant。</p>
        </div>
        <ResetButton onClick={() => setMode("volatile")} label="重置协议" />
      </header>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {(Object.keys(data) as Array<keyof typeof data>).map((key) => (
            <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)} className={`min-h-11 rounded-control border px-4 py-2 text-sm font-medium ${mode === key ? "border-accent bg-bg text-primary" : "border-border text-secondary"}`}>{data[key].label}</button>
          ))}
        </div>
        <svg viewBox="0 0 720 245" role="img" aria-label="字段同步协议选择" className="h-auto w-full rounded-control border border-border bg-bg">
          <title>Field publication protocol</title>
          <rect x="60" y="74" width="170" height="90" rx="14" fill="var(--field-accent-soft)" stroke="var(--field-accent)" strokeWidth="3" />
          <rect x="490" y="74" width="170" height="90" rx="14" fill={mode === "volatile" ? "#fef3c7" : "white"} stroke={mode === "volatile" ? "var(--field-warning)" : "var(--field-muted)"} strokeWidth="3" />
          <line x1="230" y1="119" x2="490" y2="119" stroke={data[mode].color} strokeWidth="5" />
          <text x="145" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--field-ink)">writer</text>
          <text x="145" y="134" textAnchor="middle" fontSize="11" fill="var(--field-ink)">state transition</text>
          <text x="575" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--field-ink)">reader</text>
          <text x="575" y="134" textAnchor="middle" fontSize="11" fill="var(--field-ink)">{data[mode].label}</text>
          <text x="360" y="202" textAnchor="middle" fontSize="12" fontWeight="700" fill={data[mode].color}>{data[mode].result}</text>
        </svg>
        <p className="mt-2 text-sm leading-relaxed text-secondary">当前协议：{data[mode].result}。</p>
      </div>
    </section>
  );
}

export const cvcConstantsAndFieldsConceptLabels = conceptLabels;
