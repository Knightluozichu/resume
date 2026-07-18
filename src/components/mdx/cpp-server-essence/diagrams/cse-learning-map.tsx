"use client";

import { useState } from "react";

const CHAPTERS = [
  { n: 1, title: "C++ 必知必会", input: "C++ object/resource model", output: "RAII、pimpl、modern syntax、smart pointer ownership", gate: "能从 lifetime 解释资源释放和共享所有权" },
  { n: 2, title: "工具与调试", input: "可复现 artifact", output: "Make/CMake、symbols、GDB/thread/process", gate: "能从 core/build-id 回到同一源码与 stack" },
  { n: 3, title: "多线程与同步", input: "shared state", output: "atomic、locks、condition、pool/backpressure", gate: "能写出 happens-before、owner 和 shutdown" },
  { n: 4, title: "网络编程难点", input: "TCP endpoints/bytes", output: "nonblocking state、select/poll/epoll、partial I/O", gate: "能区分 readiness、progress、FIN 和 error" },
  { n: 5, title: "网络故障排查", input: "症状与时间窗口", output: "interface→path→socket→process→app→packet", gate: "能用两端五元组证据证伪假设" },
  { n: 6, title: "通信协议设计", input: "TCP byte stream", output: "framing、TLV/version、HTTP/mail/WebSocket", gate: "能增量解帧并限制 length/version/resources" },
  { n: 7, title: "单服务结构", input: "fd/session/tasks/timers", output: "Reactor、one loop、buffers、layers", gate: "能保证 single-loop owner 和 bounded queues" },
  { n: 8, title: "Redis 源码分析", input: "Redis 6.0 source", output: "ae→client→RESP→reply→cleanup", gate: "能沿一次 request 打断点并解释 threaded I/O" },
  { n: 9, title: "常用模块设计", input: "operational failures", output: "reconnect、heartbeat、logging、error/monitor", gate: "能建立恢复与可观测 fault contract" },
];

export function CseOfficialChapterMapLab() {
  const [chapter, setChapter] = useState(1);
  const selected = CHAPTERS[chapter - 1];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[1fr_1fr]"><section className="grid grid-cols-3 border border-border">{CHAPTERS.map((item) => <button key={item.n} type="button" aria-pressed={chapter === item.n} onClick={() => setChapter(item.n)} className={`min-h-16 border-b border-r border-border p-2 text-left text-xs ${chapter === item.n ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}><span className="block text-secondary">0{item.n}</span>{item.title}</button>)}</section><section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">official chapter {selected.n}/9</span><h3 className="mt-3 text-base font-semibold text-primary">{selected.title}</h3><div className="mt-5 space-y-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">input</span><strong className="mt-2 block text-sm text-primary">{selected.input}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">output</span><strong className="mt-2 block text-sm text-primary">{selected.output}</strong></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">chapter gate</span><p className="mt-2 text-sm leading-7 text-primary">{selected.gate}</p></div></div></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">官方九章不是泛化的 I/O 技巧合集，而是从语言/调试基础，经并发/网络/协议，到服务源码与生产模块的完整链。</figcaption></figure>
  );
}

type LearningGoal = "build" | "incident" | "source";

const PATHS: Record<LearningGoal, { chapters: number[]; result: string }> = {
  build: { chapters: [1, 3, 4, 6, 7, 9], result: "从 ownership 与 nonblocking I/O 构建可运行、可恢复、可观测的单服务" },
  incident: { chapters: [2, 4, 5, 7, 9], result: "从 artifact、socket state、两端 packet 与 service queues 收敛故障" },
  source: { chapters: [1, 2, 3, 4, 6, 7, 8], result: "以 Redis 6.0 为证据验证 event-loop/client/parser/thread ownership" },
};

export function CseLearningDependencyLab() {
  const [goal, setGoal] = useState<LearningGoal>("build");
  const path = PATHS[goal];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 border border-border" role="group" aria-label="学习目标">{(["build", "incident", "source"] as const).map((item, index) => <button key={item} type="button" aria-pressed={goal === item} onClick={() => setGoal(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${goal === item ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{item}</button>)}</div><div className="mt-5 flex flex-wrap items-center gap-2">{path.chapters.map((n, index) => <div key={n} className="contents"><div className="min-h-20 min-w-28 flex-1 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">chapter {n}</span><strong className="mt-2 block">{CHAPTERS[n - 1].title}</strong></div>{index < path.chapters.length - 1 ? <span className="text-secondary">→</span> : null}</div>)}</div><p className="mt-5 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm leading-7 text-primary">{path.result}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">顺序可按建设、事故或源码目标裁剪，但后章推理仍依赖前章的 owner、artifact、socket 和 protocol contract。</figcaption></figure>
  );
}

export function CseLearningGateLab() {
  const [completed, setCompleted] = useState<boolean[]>(Array(9).fill(false));
  const passed = completed.filter(Boolean).length;
  const next = completed.findIndex((done) => !done);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-2 sm:grid-cols-3">{CHAPTERS.map((item, index) => <label key={item.n} className={`flex min-h-16 items-center gap-3 border p-3 text-sm ${completed[index] ? "border-emerald-500/40 bg-emerald-500/10 text-primary" : "border-border bg-bg text-primary"}`}><input type="checkbox" checked={completed[index]} onChange={(event) => setCompleted((current) => current.map((value, i) => i === index ? event.target.checked : value))} className="h-4 w-4 accent-[var(--accent)]" /><span><strong>0{item.n}</strong><br /><span className="text-xs text-secondary">{item.title}</span></span></label>)}</div><div className={`mt-5 border p-4 ${passed === 9 ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">evidence gates</span><h3 className="mt-2 text-base font-semibold text-primary">{passed}/9 通过</h3><p className="mt-2 text-sm leading-7 text-secondary">{passed === 9 ? "可以进入全链路综合演练：实现、故障注入、GDB/packet evidence、graceful shutdown 与 observability 验收。" : `下一项：第 ${next + 1} 章，${CHAPTERS[next].gate}。`}</p></div></div><figcaption className="mt-2 text-center text-sm text-secondary">阅读完成不等于章节通过；每章用一个可观察的解释、实现或取证 gate 验收。</figcaption></figure>
  );
}
