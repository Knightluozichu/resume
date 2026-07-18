"use client";

import { useMemo, useState } from "react";

type HttpMethod = "GET" | "POST";
type HttpVersion = "HTTP/1.1" | "HTTP/1.0";
type SchedulingMode = "serial" | "per-request" | "pool";

const MODE_LABELS: Record<SchedulingMode, string> = {
  serial: "单线程",
  "per-request": "每请求一线程",
  pool: "固定线程池",
};

export function RplHttpRequestResponseLab() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [path, setPath] = useState("/");
  const [version, setVersion] = useState<HttpVersion>("HTTP/1.1");
  const [body, setBody] = useState("<h1>Hello!</h1>");
  const [correctLength, setCorrectLength] = useState(true);

  const requestLine = `${method} ${path || "/"} ${version}`;
  const route = method === "GET" && path === "/";
  const statusLine = route ? "HTTP/1.1 200 OK" : "HTTP/1.1 404 NOT FOUND";
  const filename = route ? "hello.html" : "404.html";
  const byteLength = new TextEncoder().encode(body).length;
  const advertisedLength = correctLength ? byteLength : Math.max(0, byteLength - 3);
  const response = `${statusLine}\r\nContent-Length: ${advertisedLength}\r\n\r\n${body}`;
  const protocolValid = version === "HTTP/1.1" && method === "GET" && correctLength;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[31rem] gap-4 lg:grid-cols-[0.92fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div>
              <span className="text-xs text-secondary">request method</span>
              <div className="mt-2 grid grid-cols-2 border border-border" role="group" aria-label="HTTP method">
                {(["GET", "POST"] as const).map((item) => (
                  <button key={item} type="button" aria-pressed={method === item} onClick={() => setMethod(item)} className={`min-h-11 text-sm ${item === "GET" ? "border-r border-border" : ""} ${method === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>
                ))}
              </div>
            </div>
            <label className="block text-sm text-primary">request target<input value={path} onChange={(event) => setPath(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-primary outline-none focus:border-accent" aria-label="request target" /></label>
            <div>
              <span className="text-xs text-secondary">HTTP version</span>
              <div className="mt-2 grid grid-cols-2 border border-border" role="group" aria-label="HTTP version">
                {(["HTTP/1.1", "HTTP/1.0"] as const).map((item) => (
                  <button key={item} type="button" aria-pressed={version === item} onClick={() => setVersion(item)} className={`min-h-11 text-sm ${item === "HTTP/1.1" ? "border-r border-border" : ""} ${version === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>
                ))}
              </div>
            </div>
            <label className="block text-sm text-primary">response body<textarea value={body} onChange={(event) => setBody(event.target.value)} rows={3} className="mt-2 w-full resize-none border border-border bg-elevated p-3 text-sm text-primary outline-none focus:border-accent" aria-label="response body" /></label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={correctLength} onChange={(event) => setCorrectLength(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />Content-Length 使用 UTF-8 byte length</label>
          </section>

          <section className={`border p-4 ${protocolValid ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">TcpStream byte protocol</span>
            <code className="mt-3 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{`${requestLine}\\r\\nHost: 127.0.0.1:7878\\r\\n\\r\\n`}</code>
            <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center text-xs">
              <div className="border border-border bg-bg p-3 text-primary">BufReader<br />first line</div>
              <span className="text-secondary">-&gt;</span>
              <div className="border border-border bg-bg p-3 text-primary">{statusLine}<br />{filename}</div>
            </div>
            <code className="block min-h-32 whitespace-pre-wrap break-all border border-border bg-bg p-3 text-xs leading-6 text-primary">{response.replaceAll("\r", "\\r").replaceAll("\n", "\\n\n")}</code>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">actual bytes</span><strong className="mt-2 block text-sm text-primary">{byteLength}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">header value</span><strong className={`mt-2 block text-sm ${correctLength ? "text-primary" : "text-rose-400"}`}>{advertisedLength}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">route</span><strong className="mt-2 block text-sm text-primary">{route ? "200 / hello" : "404 / fallback"}</strong></div>
            </div>
            <p className="mt-4 text-sm text-secondary">{!correctLength ? "声明长度与实际 byte body 不一致，client 可能截断、继续等待或污染下一条 message boundary。" : version !== "HTTP/1.1" || method !== "GET" ? "本项目只解析 GET + HTTP/1.1 的有限 request line；其他输入落入 404，不代表实现了完整 HTTP parser。" : "request line、CRLF、空行与 body byte length 一致，满足本章这个最小 server 的响应契约。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">本章 server 只识别 request line 的极小子集；TCP 提供 byte stream，HTTP framing、路由和响应语义仍由应用层实现。</figcaption>
    </figure>
  );
}

interface ScheduledRequest {
  id: number;
  duration: number;
  worker: number;
  start: number;
  end: number;
}

function scheduleRequests(count: number, workerCount: number, slowIndex: number): ScheduledRequest[] {
  const availableAt = Array.from({ length: workerCount }, () => 0);
  return Array.from({ length: count }, (_, index) => {
    let worker = 0;
    for (let candidate = 1; candidate < workerCount; candidate += 1) {
      if (availableAt[candidate] < availableAt[worker]) worker = candidate;
    }
    const duration = index === slowIndex ? 5 : 1;
    const start = availableAt[worker];
    const end = start + duration;
    availableAt[worker] = end;
    return { id: index + 1, duration, worker, start, end };
  });
}

export function RplThreadPoolQueueLab() {
  const [mode, setMode] = useState<SchedulingMode>("pool");
  const [requestCount, setRequestCount] = useState(7);
  const [poolSize, setPoolSize] = useState(3);
  const [slowIndex, setSlowIndex] = useState(0);
  const [lockAcrossJob, setLockAcrossJob] = useState(false);

  const workers = mode === "serial" || (mode === "pool" && lockAcrossJob) ? 1 : mode === "per-request" ? requestCount : poolSize;
  const schedule = useMemo(() => scheduleRequests(requestCount, workers, Math.min(slowIndex, requestCount - 1)), [requestCount, workers, slowIndex]);
  const finishTime = Math.max(...schedule.map((request) => request.end));
  const maxWorkers = Math.max(...schedule.map((request) => request.worker)) + 1;
  const queuePeak = mode === "pool" ? Math.max(0, requestCount - poolSize) : 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[33rem] gap-4 lg:grid-cols-[0.88fr_1.22fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div>
              <span className="text-xs text-secondary">connection execution model</span>
              <div className="mt-2 grid grid-cols-3 border border-border" role="group" aria-label="connection execution model">
                {(Object.keys(MODE_LABELS) as SchedulingMode[]).map((item, index) => (
                  <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-12 px-2 text-xs sm:text-sm ${index < 2 ? "border-r border-border" : ""} ${mode === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{MODE_LABELS[item]}</button>
                ))}
              </div>
            </div>
            <label className="block text-sm text-primary">request count：{requestCount}<input type="range" min="3" max="9" value={requestCount} onChange={(event) => setRequestCount(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">slow request：#{Math.min(slowIndex + 1, requestCount)}<input type="range" min="0" max={requestCount - 1} value={Math.min(slowIndex, requestCount - 1)} onChange={(event) => setSlowIndex(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className={`block text-sm text-primary ${mode !== "pool" ? "opacity-50" : ""}`}>pool size：{poolSize}<input type="range" min="2" max="5" value={poolSize} disabled={mode !== "pool"} onChange={(event) => setPoolSize(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)] disabled:cursor-not-allowed" /></label>
            <label className={`flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary ${mode !== "pool" ? "opacity-50" : ""}`}><input type="checkbox" checked={lockAcrossJob} disabled={mode !== "pool"} onChange={(event) => setLockAcrossJob(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />把 MutexGuard 保留到 job 执行结束</label>
            <code className="block whitespace-pre-wrap border border-border bg-elevated p-3 text-xs leading-6 text-primary">{lockAcrossJob && mode === "pool" ? "while let Ok(job) = receiver.lock().unwrap().recv() {\n    job(); // guard still alive\n}" : "loop {\n    let job = receiver.lock().unwrap().recv()?;\n    // guard dropped at let boundary\n    job();\n}"}</code>
          </section>

          <section className={`border p-4 ${mode === "per-request" ? "border-amber-500/40 bg-amber-500/10" : lockAcrossJob && mode === "pool" ? "border-rose-500/40 bg-rose-500/10" : "border-cyan-500/40 bg-cyan-500/10"}`} aria-live="polite">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><span className="text-xs text-secondary">simulated completion timeline</span><h3 className="mt-2 text-base font-semibold text-primary">{finishTime}s 完成，{maxWorkers} 个实际并发 worker</h3></div>
              <span className="border border-border bg-bg px-3 py-2 text-xs text-primary">queue peak：{queuePeak}</span>
            </div>
            <div className="mt-5 min-h-64 space-y-2 border border-border bg-bg p-3">
              {schedule.map((request) => (
                <div key={request.id} className="grid grid-cols-[3.2rem_1fr_3rem] items-center gap-2 text-xs">
                  <span className="text-secondary">req #{request.id}</span>
                  <div className="relative h-7 border border-border bg-elevated">
                    <span className={`absolute inset-y-0 flex min-w-8 items-center justify-center border text-primary ${request.duration === 5 ? "border-rose-500/50 bg-rose-500/20" : "border-emerald-500/40 bg-emerald-500/15"}`} style={{ left: `${(request.start / finishTime) * 100}%`, width: `${(request.duration / finishTime) * 100}%` }}>W{request.worker}</span>
                  </div>
                  <span className="text-right text-secondary">{request.start}-{request.end}s</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">parallel cap</span><strong className="mt-2 block text-sm text-primary">{mode === "per-request" ? "unbounded" : mode === "serial" ? "1" : poolSize}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">resource shape</span><strong className="mt-2 block text-sm text-primary">{mode === "per-request" ? `${requestCount} threads` : `${mode === "serial" ? 1 : poolSize} reusable threads`}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">slow isolation</span><strong className="mt-2 block text-sm text-primary">{workers > 1 ? "partial" : "none"}</strong></div>
            </div>
            <p className="mt-4 text-sm text-secondary">{mode === "serial" ? "慢请求占住唯一执行者，后续快速请求发生 head-of-line blocking。" : mode === "per-request" ? "吞吐暂时提高，但 thread 数随输入增长；攻击或突发流量可耗尽 memory、scheduler 与 OS thread resources。" : lockAcrossJob ? "线程数量虽固定，receiver lock 却覆盖 job()；其他 worker 不能 dequeue，行为重新退化为串行。" : "固定 worker 数限制资源并并发消费队列；所有 worker 忙时，新请求仍会等待，所以还需要 queue limit 与 backpressure。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">线程池提升的是有限并发与吞吐，不是无限容量；锁的 temporary lifetime 会直接改变实际调度模型。</figcaption>
    </figure>
  );
}

export function RplGracefulShutdownLab() {
  const [closeSender, setCloseSender] = useState(true);
  const [handleDisconnect, setHandleDisconnect] = useState(true);
  const [joinWorkers, setJoinWorkers] = useState(true);
  const [activeJobs, setActiveJobs] = useState(2);

  const state = !closeSender
    ? { label: "join 永久等待", tone: "rose", detail: "sender 仍存活，channel 不会断开；idle worker 一直阻塞在 recv。" }
    : !handleDisconnect
      ? { label: "worker panic", tone: "rose", detail: "recv 返回 Err 后仍 unwrap，cleanup 路径 panic，不能作为正常停止协议。" }
      : !joinWorkers
        ? { label: "任务可能被截断", tone: "amber", detail: "channel 已关闭，但 owner 不等待 JoinHandle；进程退出可中止尚未完成的工作。" }
        : { label: "优雅关闭完成", tone: "emerald", detail: `${activeJobs} 个已接收 job 先完成，worker 观察 disconnect 退出，owner 最后 join。` };
  const toneClass = state.tone === "emerald" ? "border-emerald-500/40 bg-emerald-500/10" : state.tone === "amber" ? "border-amber-500/40 bg-amber-500/10" : "border-rose-500/40 bg-rose-500/10";

  const phases = [
    { label: "停止 accept", ok: true, note: "incoming().take(2) / shutdown signal" },
    { label: "关闭 sender", ok: closeSender, note: "Option::take + drop" },
    { label: "完成已入队 job", ok: closeSender && handleDisconnect, note: `${activeJobs} active jobs` },
    { label: "recv Err 后 break", ok: closeSender && handleDisconnect, note: "disconnect is normal" },
    { label: "join workers", ok: closeSender && handleDisconnect && joinWorkers, note: "completion proof" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[29rem] gap-4 lg:grid-cols-[0.88fr_1.22fr]">
          <section className="space-y-3 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={closeSender} onChange={(event) => setCloseSender(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />join 前 `take()` 并 drop sender</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={handleDisconnect} onChange={(event) => setHandleDisconnect(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />把 `recv` 的 Err 当成退出信号</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={joinWorkers} onChange={(event) => setJoinWorkers(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />等待所有 JoinHandle 完成</label>
            <label className="block pt-2 text-sm text-primary">already accepted jobs：{activeJobs}<input type="range" min="0" max="4" value={activeJobs} onChange={(event) => setActiveJobs(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <code className="block whitespace-pre-wrap border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`fn drop(&mut self) {
    drop(self.sender.take());
    for worker in self.workers.drain(..) {
        worker.thread.join().unwrap();
    }
}`}</code>
          </section>

          <section className={`border p-4 ${toneClass}`} aria-live="polite">
            <span className="text-xs text-secondary">shutdown happens-before chain</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{state.label}</h3>
            <div className="mt-5 space-y-2">
              {phases.map((phase, index) => (
                <div key={phase.label} className={`grid min-h-14 grid-cols-[2rem_1fr_auto] items-center gap-3 border p-3 ${phase.ok ? "border-emerald-500/30 bg-bg" : "border-rose-500/40 bg-rose-500/10"}`}>
                  <span className={`flex h-7 w-7 items-center justify-center border text-xs ${phase.ok ? "border-emerald-500/50 text-emerald-400" : "border-rose-500/50 text-rose-400"}`}>{index + 1}</span>
                  <strong className="text-sm text-primary">{phase.label}</strong>
                  <span className="text-right text-xs text-secondary">{phase.note}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-secondary">{state.detail}</p>
            <div className="mt-4 border border-border bg-bg p-3 text-xs leading-6 text-primary">close sender happens-before recv returns Err; recv Err happens-before worker loop exits; worker exit happens-before join returns.</div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Drop 的正确顺序是一项协议：先让新工作不可达，再排空已接收工作，最后用 join 证明 worker 已退出。</figcaption>
    </figure>
  );
}
