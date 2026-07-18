"use client";

import { useState } from "react";

export function GoplChannelSemanticsLab() {
  const [capacity, setCapacity] = useState(0);
  const [queued, setQueued] = useState(0);
  const [receiverReady, setReceiverReady] = useState(false);
  const [closed, setClosed] = useState(false);
  const effectiveQueued = Math.min(queued, capacity);
  const sendState = closed ? "panic: send on closed channel" : capacity === 0 ? receiverReady ? "rendezvous now" : "sender blocked" : effectiveQueued < capacity ? "enqueue succeeds" : "sender blocked: buffer full";
  const receiveState = effectiveQueued > 0 ? "receive queued value" : closed ? "zero value, ok=false" : capacity === 0 && receiverReady ? "rendezvous with sender" : "receiver blocked";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">channel capacity: <strong>{capacity}</strong><input type="range" min="0" max="5" value={capacity} onChange={(event) => { const next = Number(event.target.value); setCapacity(next); setQueued((current) => Math.min(current, next)); }} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">queued values: <strong>{effectiveQueued}</strong><input type="range" min="0" max={Math.max(1, capacity)} value={effectiveQueued} disabled={capacity === 0} onChange={(event) => setQueued(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)] disabled:opacity-40" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={receiverReady} onChange={(event) => setReceiverReady(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />receiver is ready</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={closed} onChange={(event) => setClosed(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />channel closed by sender owner</label></section>
          <section className={`border p-4 ${closed ? "border-amber-500/40 bg-amber-500/10" : "border-cyan-500/40 bg-cyan-500/10"}`} aria-live="polite"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="border border-border bg-bg p-3 text-center text-sm text-primary">sender</div><div className="min-w-24 border border-border bg-bg p-3 text-center"><strong className="text-sm text-primary">chan T</strong><span className="mt-1 block text-xs text-secondary">{capacity === 0 ? "unbuffered" : `${effectiveQueued}/${capacity}`}</span></div><div className="border border-border bg-bg p-3 text-center text-sm text-primary">receiver</div></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">send</span><strong className="mt-2 block text-sm text-primary">{sendState}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">receive</span><strong className="mt-2 block text-sm text-primary">{receiveState}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">close 只表示不会再发送，buffered values 仍可 drain；receiver 不负责 close，重复 close 或 send after close 都 panic。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">unbuffered channel 在 send/receive 间建立 rendezvous；buffered channel 解耦有限数量的进度，但 capacity 不是无限队列。</figcaption>
    </figure>
  );
}

export function GoplCrawlerCancellationLab() {
  const [workers, setWorkers] = useState(4);
  const [urls, setUrls] = useState(12);
  const [frontierCapacity, setFrontierCapacity] = useState(6);
  const [canceled, setCanceled] = useState(false);
  const active = canceled ? 0 : Math.min(workers, urls);
  const queued = canceled ? 0 : Math.min(frontierCapacity, Math.max(0, urls - active));
  const deferred = canceled ? Math.max(0, urls - active) : Math.max(0, urls - active - queued);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">workers: <strong>{workers}</strong><input type="range" min="1" max="8" value={workers} onChange={(event) => setWorkers(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">discovered URLs: <strong>{urls}</strong><input type="range" min="1" max="24" value={urls} onChange={(event) => setUrls(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">frontier capacity: <strong>{frontierCapacity}</strong><input type="range" min="0" max="12" value={frontierCapacity} onChange={(event) => setFrontierCapacity(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={canceled} onChange={(event) => setCanceled(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />close(done) / context canceled</label></section>
          <section className={`border p-4 ${canceled ? "border-rose-500/40 bg-rose-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`}><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">in flight</span><strong className="mt-2 block text-lg text-primary">{active}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">bounded frontier</span><strong className="mt-2 block text-lg text-primary">{queued}/{frontierCapacity}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">backpressured</span><strong className="mt-2 block text-lg text-primary">{deferred}</strong></div></div><div className="mt-4 border border-border bg-bg p-3 font-mono text-sm leading-8 text-primary">select &#123;<br />case work &lt;- url:<br />case result := &lt;-results:<br />case &lt;-done: return<br />&#125;</div><p className="mt-4 text-sm leading-7 text-secondary">worker count 限制并发资源，frontier capacity 限制排队；所有 blocking send/receive 都同时监听 done，cancellation 才能穿透 pipeline。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">concurrent crawler 用 bounded workers、dedup frontier、select 与 broadcast cancellation 收敛 goroutine lifetimes。</figcaption>
    </figure>
  );
}

type ServerMode = "clock" | "echo" | "chat";

export function GoplConcurrentServerLab() {
  const [mode, setMode] = useState<ServerMode>("chat");
  const [clients, setClients] = useState(3);
  const [slowClient, setSlowClient] = useState(true);
  const topology = mode === "clock" ? ["accept", "handle conn", "ticker writes"] : mode === "echo" ? ["accept", "handle conn", "scan + echo"] : ["accept", "client reader/writer", "broadcaster owner"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="concurrent server example">{(["clock", "echo", "chat"] as ServerMode[]).map((item, index) => <button key={item} type="button" onClick={() => setMode(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${mode === item ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{item}</button>)}</div><div className="mt-5 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]"><section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">clients: <strong>{clients}</strong><input type="range" min="1" max="6" value={clients} onChange={(event) => setClients(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={slowClient} onChange={(event) => setSlowClient(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />one client is slow</label></section><section className="border border-violet-500/40 bg-violet-500/10 p-4"><div className="grid gap-3 sm:grid-cols-3">{topology.map((item, index) => <div key={item} className="min-h-24 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">0{index + 1}</span><strong className="mt-2 block">{item}</strong></div>)}</div><div className="mt-4 flex flex-wrap gap-2">{Array.from({ length: clients }, (_, index) => <span key={index} className={`border px-3 py-2 text-xs ${slowClient && index === clients - 1 ? "border-amber-500/50 bg-amber-500/10 text-primary" : "border-border bg-bg text-primary"}`}>client {index + 1}{slowClient && index === clients - 1 ? " · slow" : ""}</span>)}</div><p className="mt-4 text-sm leading-7 text-secondary">{mode === "chat" ? "broadcaster goroutine owns client set；每个 client 使用 bounded outgoing queue，slow client 必须 disconnect/drop/backpressure，不能卡住全体。" : "accept loop 为每个 connection 启动 handler goroutine；handler owns conn close，并为 read/write 设置 deadline。"}</p></section></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">clock/echo 展示 goroutine-per-connection；chat 增加 single-owner broadcaster，必须隔离 slow-client backpressure。</figcaption>
    </figure>
  );
}
