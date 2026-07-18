"use client";

import { useState } from "react";

const evidenceRows = [
  { layer: "build + value", chapters: "Ch 1–4, 9", artifact: "source/TU/object/link command + typed state", gate: "current executable and one definition", failure: "stale binary / undefined or duplicate symbol" },
  { layer: "path + function", chapters: "Ch 5–8", artifact: "input partition + loop invariant + function contract", gate: "all boundaries and failure exits covered", failure: "missing branch / stale input / dangling reference" },
  { layer: "object + reuse", chapters: "Ch 10–15", artifact: "invariant + owner graph + virtual/unwind trace", gate: "copy/move/delete/throw preserve lifetime", failure: "alias / slicing / partial destruction" },
  { layer: "library + persistence", chapters: "Ch 16–18", artifact: "range + iterator + stream + callable evidence", gate: "round trip and fault injection pass", failure: "invalid iterator / short file / capture escape" },
] as const;

export function EppFinalEvidenceMatrixMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="C++ Primer Plus十八章构建路径对象和持久化证据矩阵" className="grid gap-3 lg:grid-cols-4">
          {evidenceRows.map((row, index) => (
            <section key={row.layer} className="min-h-72 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">evidence 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.layer}</strong>
              <code className="mt-3 block text-xs text-accent">{row.chapters}</code>
              <p className="mt-4 text-xs text-primary">artifact · {row.artifact}</p>
              <p className="mt-3 text-xs text-secondary">gate · {row.gate}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">failure · {row.failure}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        综合验收不以最终输出一项作证；四层都要保留 producer、状态变化、失败出口和持久结果。
      </figcaption>
    </figure>
  );
}

const failureRows = [
  { symptom: "executable behavior unchanged", firstLayer: "build", evidence: "mtime/hash + compile/link command", chapters: "Ch 1 / Ch 9" },
  { symptom: "extra loop iteration or old value", firstLayer: "input/path", evidence: "extraction result + stream state + boundary table", chapters: "Ch 2 / Ch 5–6 / Ch 17" },
  { symptom: "double free or derived behavior lost", firstLayer: "object lifetime", evidence: "owner addresses + copy/delete/dispatch trace", chapters: "Ch 12–13" },
  { symptom: "sort/file result corrupt", firstLayer: "library/persistence", evidence: "comparator/range + mode/schema/gcount", chapters: "Ch 16–18" },
] as const;

export function EppFailureLocalizationFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="从可执行程序输入循环对象生命周期和持久化症状定位到最早失败章节的流程" className="space-y-3">
          {failureRows.map((row, index) => (
            <section key={row.symptom} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[1.2fr_0.7fr_1.4fr_0.75fr] lg:items-center">
              <div><span className="text-xs text-secondary">symptom 0{index + 1}</span><strong className="mt-2 block text-sm text-primary">{row.symptom}</strong></div>
              <code className="text-xs text-accent">{row.firstLayer}</code>
              <span className="text-xs text-secondary">evidence · {row.evidence}</span>
              <span className="text-xs text-primary">{row.chapters}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从最早失败层开始能缩小因果范围；不要在对象已无效时先调整输出格式，也不要用重编译掩盖输入契约。
      </figcaption>
    </figure>
  );
}

const faults = [
  { label: "shallow copy", injection: "Queue copy shares Node*", symptom: "one destructor invalidates the other", protection: "delete copy or deep-copy owner graph", chapter: "Ch 12" },
  { label: "slicing", injection: "vector<Record> receives Derived", symptom: "override and derived state disappear", protection: "unique_ptr<Base> + virtual destructor", chapter: "Ch 13" },
  { label: "bad ordering", injection: "comparator uses <=", symptom: "sort precondition violated", protection: "strict weak ordering tests", chapter: "Ch 16" },
  { label: "short record", injection: "binary length exceeds remaining bytes", symptom: "partial object appears plausible", protection: "schema + full read/gcount + transaction", chapter: "Ch 17" },
] as const;

export function EppCapstoneFaultLab() {
  const [active, setActive] = useState(0);
  const fault = faults[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择C++ Primer Plus综合项目故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {faults.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-14 border px-3 py-2 text-xs transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">inject · {fault.injection}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">symptom</strong><p className="mb-0 mt-3 text-xs text-secondary">{fault.symptom}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">protection</strong><p className="mb-0 mt-3 text-xs text-secondary">{fault.protection}</p></div>
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">return chapter</strong><code className="mt-3 block text-xs text-secondary">{fault.chapter}</code></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        故障注入的目标不是制造崩溃，而是验证哪一层在无效状态扩散前拒绝输入并留下可定位证据。
      </figcaption>
    </figure>
  );
}
