"use client";

import { useState } from "react";

type RedisEvent = "startup" | "accept" | "read" | "execute" | "write" | "disconnect";

const REDIS_CHAIN: Record<RedisEvent, { file: string; functions: string[]; state: string }> = {
  startup: { file: "server.c / ae_epoll.c", functions: ["initServer", "aeCreateEventLoop", "listenToPort", "aeCreateFileEvent"], state: "server.el、listen fds 与 AE_READABLE accept handler 建立" },
  accept: { file: "networking.c", functions: ["acceptTcpHandler", "acceptCommonHandler", "createClient", "connSetReadHandler"], state: "创建 client，初始化 query/reply buffers，并注册 readQueryFromClient" },
  read: { file: "networking.c", functions: ["readQueryFromClient", "postponeClientRead", "processInputBuffer", "processMultibulkBuffer"], state: "bytes 追加 querybuf，增量解析 inline/RESP request" },
  execute: { file: "networking.c / server.c", functions: ["processCommandAndResetClient", "processCommand", "command proc", "addReply*"], state: "argv 驱动 command，reply 写入 static buf 或 reply list" },
  write: { file: "networking.c", functions: ["clientInstallWriteHandler", "handleClientsWithPendingWrites", "writeToClient", "sendReplyToClient"], state: "先批量直接写，剩余 reply 注册 writable handler" },
  disconnect: { file: "networking.c", functions: ["freeClientAsync", "freeClientsInAsyncFreeQueue", "freeClient", "unlinkClient"], state: "从 event/list/index/pending queue 注销，释放 buffers、argv 与 connection" },
};

export function CseRedisServerEventChainLab() {
  const [event, setEvent] = useState<RedisEvent>("read");
  const [epollBackend, setEpollBackend] = useState(true);
  const selected = REDIS_CHAIN[event];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.84fr_1.16fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border sm:grid-cols-3" role="group" aria-label="Redis 网络事件链">{(Object.keys(REDIS_CHAIN) as RedisEvent[]).map((item, index) => <button key={item} type="button" aria-pressed={event === item} onClick={() => setEvent(item)} className={`min-h-11 border-b border-border text-sm ${index % 3 !== 2 ? "sm:border-r" : ""} ${event === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={epollBackend} onChange={(event) => setEpollBackend(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />Linux ae_epoll backend</label></section><section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">{selected.file}</span><h3 className="mt-3 text-base font-semibold text-primary">{selected.state}</h3><div className="mt-5 grid gap-2 sm:grid-cols-4">{selected.functions.map((fn, index) => <div key={fn} className="min-h-20 border border-border bg-bg p-3 text-xs leading-6 text-primary"><span className="text-secondary">0{index + 1}</span><br /><code>{fn}</code></div>)}</div><code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{epollBackend ? `aeApiAddEvent -> epoll_ctl(ADD/MOD)\naeApiPoll -> epoll_wait\nAE_READABLE / AE_WRITABLE -> aeProcessEvents` : `ae.c portable event API\nbackend may be kqueue/select/evport\nhandler chain remains expressed as AE masks`}</code></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">沿事件而不是沿文件背诵 Redis 网络源码：listen/accept/read/parse/execute/reply/disconnect 每一步都有 handler 与 client state 变化。</figcaption></figure>
  );
}

type ThreadedPhase = "pending-read" | "parse-command" | "execute" | "pending-write";

export function CseRedisThreadedIoLab() {
  const [phase, setPhase] = useState<ThreadedPhase>("pending-read");
  const [ioThreads, setIoThreads] = useState(4);
  const [readsEnabled, setReadsEnabled] = useState(true);
  const owner = phase === "parse-command" || phase === "execute" ? "main thread" : ioThreads > 1 ? "I/O thread batch" : "main thread";
  const reason = phase === "pending-read" ? readsEnabled ? "read bytes 可分发到 io_threads_list；完成后主线程解析/执行" : "readQueryFromClient 在主线程读取并解析" : phase === "parse-command" ? "processInputBuffer 与 argv/command dispatch 回到主线程" : phase === "execute" ? "Redis 6 command execution 仍由主线程串行维护 keyspace semantics" : "reply buffer 的 socket write 可分批交给 I/O threads";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid min-h-[24rem] gap-4 lg:grid-cols-[0.84fr_1.16fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border" role="group" aria-label="Redis threaded I/O 阶段">{(["pending-read", "parse-command", "execute", "pending-write"] as const).map((item, index) => <button key={item} type="button" aria-pressed={phase === item} onClick={() => setPhase(item)} className={`min-h-11 border-b border-border px-2 text-sm ${index % 2 === 0 ? "border-r" : ""} ${phase === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><label className="block text-sm text-primary">io-threads: <strong>{ioThreads}</strong><input type="range" min="1" max="8" value={ioThreads} onChange={(event) => setIoThreads(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={readsEnabled} onChange={(event) => setReadsEnabled(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />io-threads-do-reads yes</label></section><section className="border border-emerald-500/40 bg-emerald-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">Redis 6.0 phase ownership</span><h3 className="mt-3 text-base font-semibold text-primary">owner: {owner}</h3><p className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{reason}</p><div className="mt-4 grid gap-2 sm:grid-cols-4">{["read batches", "parse argv", "execute command", "write replies"].map((item, index) => <div key={item} className={`min-h-20 border p-3 text-xs leading-6 ${index === (["pending-read", "parse-command", "execute", "pending-write"] as const).indexOf(phase) ? "border-cyan-500/50 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{item}<br /><strong>{index === 0 || index === 3 ? `${ioThreads} I/O lanes` : "main"}</strong></div>)}</div><p className="mt-4 text-sm leading-7 text-secondary">I/O threading 并不把 command/keyspace execution 任意并行化。主线程先构造 pending lists、唤醒 workers、等待 batch 完成，再继续 parser/command/event-loop 阶段。</p></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">Redis 6 threaded I/O 主要并行 socket read/write；命令解析/执行的 owner 边界必须按具体阶段核对，不能简化为“Redis 变成多线程执行”。</figcaption></figure>
  );
}

type RespInput = "single" | "pipeline" | "partial" | "inline";

const RESP_INPUTS: Record<RespInput, { chunks: string[]; commands: number; parser: string }> = {
  single: { chunks: ["*2\\r\\n$3\\r\\nGET\\r\\n$3\\r\\nkey\\r\\n"], commands: 1, parser: "processMultibulkBuffer" },
  pipeline: { chunks: ["*2\\r\\n$3\\r\\nGET\\r\\n$1\\r\\na\\r\\n*2\\r\\n$3\\r\\nGET\\r\\n$1\\r\\nb\\r\\n"], commands: 2, parser: "processMultibulkBuffer loop" },
  partial: { chunks: ["*2\\r\\n$3\\r\\nGET\\r\\n$5\\r\\nhe", "llo\\r\\n"], commands: 1, parser: "bulklen/qb_pos preserve state" },
  inline: { chunks: ["PING hello\\r\\n"], commands: 1, parser: "processInlineBuffer" },
};

export function CseRespPipelineLab() {
  const [input, setInput] = useState<RespInput>("partial");
  const [received, setReceived] = useState(1);
  const selected = RESP_INPUTS[input];
  const complete = input !== "partial" || received === selected.chunks.length;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]"><section className="space-y-4 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border" role="group" aria-label="RESP 输入形态">{(Object.keys(RESP_INPUTS) as RespInput[]).map((item, index) => <button key={item} type="button" aria-pressed={input === item} onClick={() => { setInput(item); setReceived(1); }} className={`min-h-11 border-b border-border text-sm ${index % 2 === 0 ? "border-r" : ""} ${input === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div><div className="space-y-2">{selected.chunks.map((chunk, index) => <button key={index} type="button" onClick={() => setReceived(index + 1)} className={`block min-h-14 w-full border p-3 text-left text-xs ${received >= index + 1 ? "border-cyan-500/50 bg-cyan-500/10 text-primary" : "border-border text-secondary"}`}>recv #{index + 1}: {chunk}</button>)}</div></section><section className={`border p-4 ${complete ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">querybuf / parser state</span><h3 className="mt-3 text-base font-semibold text-primary">{complete ? `${selected.commands} command(s) ready` : "bulk body incomplete: wait for next read"}</h3><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">reqtype</span><strong className="mt-2 block text-sm text-primary">{input === "inline" ? "INLINE" : "MULTIBULK"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">parser</span><strong className="mt-2 block break-words text-sm text-primary">{selected.parser}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">dispatch count</span><strong className="mt-2 block text-sm text-primary">{complete ? selected.commands : 0}</strong></div></div><code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{`readQueryFromClient -> querybuf\nprocessInputBuffer:\n  detect reqtype\n  parse argv or wait\n  processCommandAndResetClient\n  repeat while querybuf has data`}</code></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">RESP request 可跨 read，也可 pipeline 多条命令；querybuf、qb_pos、multibulklen 与 bulklen 让 parser 保留增量状态。</figcaption></figure>
  );
}
