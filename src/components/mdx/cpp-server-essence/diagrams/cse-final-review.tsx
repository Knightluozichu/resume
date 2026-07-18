"use client";

import { useState } from "react";

const REQUEST_STAGES = [
  { title: "artifact/startup", owner: "process supervisor", state: "binary/config/listen ready", evidence: "build-id、startup logs、listen socket" },
  { title: "accept", owner: "acceptor loop", state: "connected fd assigned", evidence: "five-tuple、connection id、owner loop" },
  { title: "read", owner: "I/O loop", state: "bytes appended", evidence: "readiness、recv n/errno、input bytes" },
  { title: "decode", owner: "I/O loop / codec", state: "zero or more frames", evidence: "parser offset、declared length、protocol error" },
  { title: "execute", owner: "loop or bounded worker", state: "business result", evidence: "queue wait、trace id、error code" },
  { title: "reply", owner: "owner I/O loop", state: "output offset/high-water", evidence: "pending bytes、write n/errno、latency" },
  { title: "close/recover", owner: "connection owner", state: "unregister/cancel/reconnect", evidence: "close reason、timer、retry attempt" },
  { title: "observe", owner: "ops contract", state: "logs/metrics/health", evidence: "correlated timeline without secrets" },
];

export function CseEndToEndRequestReviewLab() {
  const [stage, setStage] = useState(0);
  const selected = REQUEST_STAGES[stage];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 border border-border sm:grid-cols-4">{REQUEST_STAGES.map((item, index) => <button key={item.title} type="button" aria-pressed={stage === index} onClick={() => setStage(index)} className={`min-h-14 border-b border-r border-border px-2 text-xs ${stage === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}><span className="text-secondary">0{index + 1}</span><br />{item.title}</button>)}</div><div className="mt-5 grid gap-3 sm:grid-cols-3" aria-live="polite"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">state owner</span><strong className="mt-2 block text-sm text-primary">{selected.owner}</strong></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">state transition</span><strong className="mt-2 block text-sm text-primary">{selected.state}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">required evidence</span><strong className="mt-2 block text-sm text-primary">{selected.evidence}</strong></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">终局复习按一次请求的 owner、状态和证据串联九章，而不是再次列举 API 名称。</figcaption></figure>
  );
}

type ReviewSymptom = "core" | "stalled-loop" | "bad-frame" | "slow-client" | "retry-storm";

const INCIDENTS: Record<ReviewSymptom, { first: string; chain: string[]; excluded: string }> = {
  core: { first: "第2章 artifact/symbol evidence", chain: ["build-id + core", "all-thread backtrace", "owner/lifetime invariant"], excluded: "不用相近 binary 猜源码行" },
  "stalled-loop": { first: "第3/7章 thread + EventLoop owner", chain: ["thread stacks", "loop lag / queue", "blocking handler or lock graph"], excluded: "不先通过增加线程掩盖阻塞" },
  "bad-frame": { first: "第4/6章 bytes + parser state", chain: ["recv chunks", "length/version/offset", "golden/fuzz reproduction"], excluded: "不把 recv boundary 当 message" },
  "slow-client": { first: "第4/7章 partial write + high-water", chain: ["Send-Q", "app output pending", "write progress / peer ACK"], excluded: "不保留无界 output queue" },
  "retry-storm": { first: "第5/9章 failure evidence + reconnect state", chain: ["disconnect taxonomy", "attempt/jitter/timers", "dependency capacity"], excluded: "不对 auth/config 错误 tight retry" },
};

export function CseFailureLocalizationReviewLab() {
  const [symptom, setSymptom] = useState<ReviewSymptom>("stalled-loop");
  const selected = INCIDENTS[symptom];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]"><section className="grid grid-cols-1 border border-border">{(Object.keys(INCIDENTS) as ReviewSymptom[]).map((item) => <button key={item} type="button" aria-pressed={symptom === item} onClick={() => setSymptom(item)} className={`min-h-11 border-b border-border px-3 text-left text-sm ${symptom === item ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{item}</button>)}</section><section className="border border-amber-500/40 bg-amber-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">first boundary</span><h3 className="mt-2 text-base font-semibold text-primary">{selected.first}</h3><div className="mt-4 grid gap-2 sm:grid-cols-3">{selected.chain.map((item, index) => <div key={item} className="min-h-20 border border-border bg-bg p-3 text-xs leading-6 text-primary"><span className="text-secondary">0{index + 1}</span><br />{item}</div>)}</div><p className="mt-4 border border-rose-500/40 bg-rose-500/10 p-3 text-sm leading-7 text-primary">排除：{selected.excluded}</p></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">事故复习从最早可证伪边界开始，把 artifact、thread、socket、protocol、service 与 recovery evidence 组合起来。</figcaption></figure>
  );
}

const READINESS_GATES = [
  "RAII/lifetime 与 shutdown 无悬空 owner",
  "production-matching symbols/core 可定位",
  "thread/synchronization tests 无 data race",
  "nonblocking/partial I/O state tests 通过",
  "协议 random chunk/fuzz/limit tests 通过",
  "single-loop queues/buffers/timers 全部有界",
  "Redis source chain 可用断点复现",
  "reconnect/heartbeat failure injection 通过",
  "logs/error/monitor 安全且可关联",
];

export function CseProductionReadinessReviewLab() {
  const [gates, setGates] = useState<boolean[]>(Array(READINESS_GATES.length).fill(false));
  const passed = gates.filter(Boolean).length;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-2 sm:grid-cols-3">{READINESS_GATES.map((gate, index) => <label key={gate} className={`flex min-h-20 items-start gap-3 border p-3 text-xs leading-6 ${gates[index] ? "border-emerald-500/40 bg-emerald-500/10 text-primary" : "border-border bg-bg text-primary"}`}><input type="checkbox" checked={gates[index]} onChange={(event) => setGates((current) => current.map((value, i) => i === index ? event.target.checked : value))} className="mt-1 h-4 w-4 accent-[var(--accent)]" /><span><strong>Gate {index + 1}</strong><br />{gate}</span></label>)}</div><div className={`mt-5 border p-4 ${passed === 9 ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite"><h3 className="text-base font-semibold text-primary">{passed}/9 production evidence gates</h3><p className="mt-2 text-sm leading-7 text-secondary">{passed === 9 ? "综合 gate 完整：可以进入发布前 load/fault/security 回归。" : "未通过 gate 不能用‘功能能跑’替代；回到对应官方章节补证据。"}</p></div></div><figcaption className="mt-2 text-center text-sm text-secondary">终局验收覆盖九章的 owner、debug、concurrency、network、protocol、source 与 operation evidence。</figcaption></figure>
  );
}
