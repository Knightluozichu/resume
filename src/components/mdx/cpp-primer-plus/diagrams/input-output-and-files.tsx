"use client";

import { useState } from "react";

const formatRows = [
  { direction: "formatted output", source: "typed value 255", policy: "hex + width 6 + fill 0", characters: "0000ff", evidence: "stream flags determine representation" },
  { direction: "formatted input", source: "characters 42 tail", policy: "operator>> int", characters: "value 42; delimiter remains", evidence: "success must drive state change" },
  { direction: "line input", source: "characters with spaces", policy: "getline delimiter newline", characters: "whole line without newline", evidence: "mixing with >> needs delimiter policy" },
  { direction: "unformatted bytes", source: "exact byte count", policy: "read/write", characters: "no numeric formatting", evidence: "gcount/state prove transfer" },
] as const;

export function EppFormattedIoFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="格式化输出输入行输入和非格式化字节传输流程" className="space-y-3">
          {formatRows.map((row) => (
            <section key={row.direction} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.9fr_1fr_1fr_1fr_1.25fr] lg:items-center">
              <strong className="text-sm text-primary">{row.direction}</strong>
              <code className="break-words text-xs text-accent">source · {row.source}</code>
              <span className="text-xs text-primary">policy · {row.policy}</span>
              <span className="text-xs text-secondary">result · {row.characters}</span>
              <span className="text-xs text-primary">proof · {row.evidence}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        stream 是带格式策略和状态的字符/字节通道；每次传输都要同时检查值、消耗边界与状态。
      </figcaption>
    </figure>
  );
}

const stateRows = [
  { state: "good", trigger: "last operation succeeded", allowed: "continue extraction", recovery: "none" },
  { state: "eof", trigger: "attempt reached end of sequence", allowed: "normal termination if record complete", recovery: "usually stop; do not precheck" },
  { state: "fail", trigger: "format mismatch or short extraction", allowed: "value not accepted", recovery: "clear + discard/repair input by policy" },
  { state: "bad", trigger: "underlying I/O corruption", allowed: "stream integrity lost", recovery: "abort/replace stream" },
] as const;

export function EppStreamStateMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="good eof fail bad四种流状态及恢复策略地图" className="grid gap-3 lg:grid-cols-4">
          {stateRows.map((row, index) => (
            <section key={row.state} className="min-h-64 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">state 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{row.state}</strong>
              <p className="mt-4 text-xs text-primary">trigger · {row.trigger}</p>
              <code className="mt-4 block break-words text-xs text-accent">next · {row.allowed}</code>
              <p className="mb-0 mt-3 text-xs text-secondary">recovery · {row.recovery}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        eof 是一次读取尝试的结果，不是下一次读取的预言；让读取操作本身成为循环条件才能避免旧值重用。
      </figcaption>
    </figure>
  );
}

const accessCases = [
  { label: "text sequential", mode: "ifstream + getline", position: "advances by decoded characters", proof: "parse each complete record", risk: "locale/delimiter mismatch" },
  { label: "binary sequential", mode: "ifstream | ios::binary", position: "advances exact byte count", proof: "read success + gcount", risk: "layout/endian/version" },
  { label: "random read", mode: "seekg(offset); read(record)", position: "get pointer moved", proof: "offset aligned + full record", risk: "wrong record size" },
  { label: "random write", mode: "fstream in|out|binary", position: "seekp(offset); write(record)", proof: "put pointer + flush/state", risk: "ios::app ignores explicit position" },
] as const;

export function EppRandomAccessLab() {
  const [active, setActive] = useState(0);
  const current = accessCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择文件输入输出和随机访问场景" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {accessCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-14 border px-3 py-2 text-xs transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.mode}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">position</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.position}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">success proof</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.proof}</p></div>
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">risk</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.risk}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        random access 同时管理 get/put position、open mode 和记录布局；seek 成功不等于随后的完整读写成功。
      </figcaption>
    </figure>
  );
}
