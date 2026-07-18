"use client";

import { useState } from "react";

type ServerModel = "serial" | "thread-per-connection" | "reactor" | "one-loop-per-thread";

export function CseServerModelLab() {
  const [model, setModel] = useState<ServerModel>("one-loop-per-thread");
  const [connections, setConnections] = useState(1000);
  const [blockingBusiness, setBlockingBusiness] = useState(false);
  const [loops, setLoops] = useState(4);

  const threads = model === "serial" ? 1 : model === "thread-per-connection" ? connections : model === "reactor" ? 1 : loops;
  const concurrency = model === "serial" ? "一次处理一个连接" : model === "thread-per-connection" ? "依赖 OS thread scheduler" : model === "reactor" ? "单 loop multiplex 所有 fd" : `${loops} 个 loop 分片拥有连接`;
  const risk = blockingBusiness
    ? model === "thread-per-connection" ? "线程/stack 数量和 context switch 快速增长" : "阻塞 event loop，所属连接全部停顿"
    : model === "serial" ? "慢连接造成 head-of-line blocking" : "需正确处理 readiness、buffer 与 ownership";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid min-h-[26rem] gap-4 lg:grid-cols-[0.9fr_1.1fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border" role="group" aria-label="服务器并发模型">{(["serial", "thread-per-connection", "reactor", "one-loop-per-thread"] as const).map((item, index) => <button key={item} type="button" aria-pressed={model === item} onClick={() => setModel(item)} className={`min-h-12 border-b border-border px-2 text-xs sm:text-sm ${index % 2 === 0 ? "border-r" : ""} ${model === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><label className="block text-sm text-primary">connections: <strong>{connections}</strong><input type="range" min="100" max="5000" step="100" value={connections} onChange={(event) => setConnections(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">event loops: <strong>{loops}</strong><input type="range" min="1" max="16" value={loops} onChange={(event) => setLoops(Number(event.target.value))} disabled={model !== "one-loop-per-thread"} className="mt-2 block w-full accent-[var(--accent)] disabled:opacity-40" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={blockingBusiness} onChange={(event) => setBlockingBusiness(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />event handler 执行阻塞业务</label></section><section className={`border p-4 ${blockingBusiness ? "border-amber-500/40 bg-amber-500/10" : "border-cyan-500/40 bg-cyan-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">concurrency ownership model</span><h3 className="mt-3 text-base font-semibold text-primary">{concurrency}</h3><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">OS threads</span><strong className="mt-2 block text-sm text-primary">{threads}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">connections/thread</span><strong className="mt-2 block text-sm text-primary">~{Math.ceil(connections / threads)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">blocking risk</span><strong className="mt-2 block text-sm text-primary">{blockingBusiness ? "high" : "controlled"}</strong></div></div><p className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{risk}。模型本身不创造性能；系统瓶颈还取决于 memory allocation、syscall、protocol parsing、business CPU、lock、database 和 network。</p></section></div></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">服务结构的核心不是线程越多越好，而是每个 connection/fd/state 由谁串行拥有，以及阻塞工作在哪个边界隔离。</figcaption>
    </figure>
  );
}

type LoopEvent = "readable" | "writable" | "timer" | "cross-thread-task";

export function CseEventLoopWakeupLab() {
  const [event, setEvent] = useState<LoopEvent>("cross-thread-task");
  const [wakeup, setWakeup] = useState<"eventfd" | "pipe">("eventfd");
  const [cachedTime, setCachedTime] = useState(true);
  const phases = event === "cross-thread-task"
    ? ["producer enqueue", `${wakeup} signal`, "poll returns", "drain tasks"]
    : event === "timer"
      ? ["compute timeout", "poll returns", "expire timers", "reschedule"]
      : event === "readable"
        ? ["poll returns", "drain recv", "decode frames", "dispatch"]
        : ["poll returns", "flush buffer", "update offset", "disable POLLOUT"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border" role="group" aria-label="事件循环输入">{(["readable", "writable", "timer", "cross-thread-task"] as const).map((item, index) => <button key={item} type="button" aria-pressed={event === item} onClick={() => setEvent(item)} className={`min-h-11 border-b border-border px-2 text-sm ${index % 2 === 0 ? "border-r" : ""} ${event === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><div className="grid grid-cols-2 border border-border" role="group" aria-label="唤醒机制">{(["eventfd", "pipe"] as const).map((item, index) => <button key={item} type="button" aria-pressed={wakeup === item} onClick={() => setWakeup(item)} className={`min-h-11 text-sm ${index === 0 ? "border-r border-border" : ""} ${wakeup === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={cachedTime} onChange={(event) => setCachedTime(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />每轮缓存 monotonic/wall time</label></section><section className="border border-emerald-500/40 bg-emerald-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">one thread one loop iteration</span><div className="mt-4 grid gap-2 sm:grid-cols-4">{phases.map((phase, index) => <div key={phase} className="min-h-24 border border-border bg-bg p-3 text-xs leading-6 text-primary"><span className="text-secondary">0{index + 1}</span><br />{phase}</div>)}</div><code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{`now = ${cachedTime ? "cache_clock_once()" : "clock_each_use()"};\ntimeout = timers.next_deadline(now);\nevents = poller.wait(timeout);\nhandle_io(events);\nexpire_timers(now);\nhandle_other_things();`}</code><p className="mt-4 text-sm leading-7 text-secondary">cross-thread producer 只能 enqueue immutable/move-owned command，再写 wakeup fd；connection state 的实际修改回到 owner loop 串行执行。</p></section></div></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">event loop 每轮统一处理 I/O readiness、timer 和跨线程 command；wakeup fd 把外部任务转成同一 poller 可观察的事件。</figcaption>
    </figure>
  );
}

type BufferEvent = "receive" | "send" | "peer-stalled" | "close";

export function CseConnectionBufferLab() {
  const [event, setEvent] = useState<BufferEvent>("peer-stalled");
  const [pendingBytes, setPendingBytes] = useState(256);
  const [crossThreadSend, setCrossThreadSend] = useState(false);
  const [intrusiveTimer, setIntrusiveTimer] = useState(true);
  const highWater = 512;
  const projected = event === "send" || event === "peer-stalled" ? pendingBytes + 256 : pendingBytes;
  const overloaded = projected >= highWater;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid min-h-[26rem] gap-4 lg:grid-cols-[0.86fr_1.14fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border" role="group" aria-label="连接事件">{(["receive", "send", "peer-stalled", "close"] as const).map((item, index) => <button key={item} type="button" aria-pressed={event === item} onClick={() => setEvent(item)} className={`min-h-11 border-b border-border text-sm ${index % 2 === 0 ? "border-r" : ""} ${event === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><label className="block text-sm text-primary">output pending: <strong>{pendingBytes} KiB</strong><input type="range" min="0" max="768" step="32" value={pendingBytes} onChange={(event) => setPendingBytes(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={crossThreadSend} onChange={(event) => setCrossThreadSend(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />业务线程直接调用 socket send</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={intrusiveTimer} onChange={(event) => setIntrusiveTimer(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />Session 内嵌 timer node</label></section><section className={`border p-4 ${overloaded || crossThreadSend ? "border-rose-500/40 bg-rose-500/10" : "border-cyan-500/40 bg-cyan-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">Session / Connection / Buffer ownership</span><h3 className="mt-3 text-base font-semibold text-primary">{crossThreadSend ? "违反 single-writer：send 顺序与 close lifetime 发生竞态" : overloaded ? "output 达到 high-water：停止读取、拒绝或关闭慢端" : "connection state 由 owner loop 串行推进"}</h3><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Session</span><strong className="mt-2 block text-sm text-primary">protocol/business identity</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Connection</span><strong className="mt-2 block text-sm text-primary">fd/state/owner loop</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Buffers</span><strong className="mt-2 block text-sm text-primary">input + {projected} KiB output</strong></div></div><div className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-secondary">timer linkage: {intrusiveTimer ? "intrusive node 避免额外 allocation，但 object 只能按 link contract 入队/移除" : "non-intrusive entry ownership 清晰，但多一个 wrapper/allocation"}。close 必须先从 poller/timer/map 移除，再延迟释放可能仍被当前 event batch 引用的对象。</div></section></div></div>
      <figcaption className="mt-2 text-center text-sm text-secondary">单 loop ownership 统一 fd、input/output buffer、Session 和 timer lifetime；跨线程只提交 command，不能同时直接收发同一 socket。</figcaption>
    </figure>
  );
}
