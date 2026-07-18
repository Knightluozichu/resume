"use client";

import { useState } from "react";

type TcpStage = "socket" | "bind" | "listen" | "accept" | "connect" | "transfer" | "close";

const TCP_STAGES: Array<{ id: TcpStage; server: string; client: string; invariant: string }> = [
  { id: "socket", server: "socket() 创建 endpoint", client: "socket() 创建 endpoint", invariant: "此时还没有 TCP connection" },
  { id: "bind", server: "bind(local address)", client: "通常由 connect 隐式选择临时端口", invariant: "server address/port 必须可用且符合 wildcard/interface 策略" },
  { id: "listen", server: "listen(backlog)", client: "尚未发起连接", invariant: "listen fd 只接受连接，不承载业务 stream" },
  { id: "accept", server: "accept() 返回 connected fd", client: "connect(remote address)", invariant: "每条连接拥有独立 connected socket" },
  { id: "connect", server: "握手完成后进入 accept queue", client: "blocking 成功或 nonblocking EINPROGRESS", invariant: "writable 之后仍需 SO_ERROR 判定成功/失败" },
  { id: "transfer", server: "recv/send byte stream", client: "send/recv byte stream", invariant: "一次调用不对应一个完整应用消息" },
  { id: "close", server: "shutdown/close", client: "recv == 0 观察 peer FIN", invariant: "主动/被动关闭与 half-close 必须进入状态机" },
];

export function CseTcpFlowLab() {
  const [stage, setStage] = useState<TcpStage>("accept");
  const [wildcard, setWildcard] = useState(true);
  const [reuseAddress, setReuseAddress] = useState(true);
  const selected = TCP_STAGES.find((item) => item.id === stage) ?? TCP_STAGES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-2 border border-border sm:grid-cols-3" role="group" aria-label="TCP 通信阶段">
              {TCP_STAGES.map((item, index) => <button key={item.id} type="button" aria-pressed={stage === item.id} onClick={() => setStage(item.id)} className={`min-h-11 border-b border-border px-2 text-sm ${index % 3 !== 2 ? "sm:border-r" : ""} ${stage === item.id ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item.id}</button>)}
            </div>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={wildcard} onChange={(event) => setWildcard(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />bind wildcard address</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={reuseAddress} onChange={(event) => setReuseAddress(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />SO_REUSEADDR before bind</label>
          </section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">TCP endpoint state · {selected.id}</span>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="min-h-28 border border-border bg-bg p-3 text-sm leading-6 text-primary"><strong>server</strong><span className="mt-3 block text-secondary">{selected.server}</span></div><span className="text-secondary">↔</span><div className="min-h-28 border border-border bg-bg p-3 text-sm leading-6 text-primary"><strong>client</strong><span className="mt-3 block text-secondary">{selected.client}</span></div></div>
            <p className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-primary">{selected.invariant}</p>
            <code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{`bind(fd, ${wildcard ? "0.0.0.0" : "127.0.0.1"}:8080)\nSO_REUSEADDR=${reuseAddress ? 1 : 0}\n// selected stage: ${selected.id}`}</code>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">socket、listen socket 与 connected socket 是不同角色；bind 地址、accept 返回值和 close 状态必须分别建模。</figcaption>
    </figure>
  );
}

type IoOperation = "recv" | "send" | "connect";
type IoPlatform = "Linux" | "Windows";

export function CseNonblockingIoLab() {
  const [operation, setOperation] = useState<IoOperation>("recv");
  const [platform, setPlatform] = useState<IoPlatform>("Linux");
  const [ready, setReady] = useState(false);
  const [interrupted, setInterrupted] = useState(false);

  const wouldBlock = platform === "Linux" ? "EAGAIN/EWOULDBLOCK" : "WSAEWOULDBLOCK";
  const result = interrupted && platform === "Linux"
    ? { value: "-1 / EINTR", action: "若操作未完成且策略允许，重新调用；同时检查 deadline/cancel" }
    : !ready
      ? operation === "connect"
        ? { value: platform === "Linux" ? "-1 / EINPROGRESS" : "SOCKET_ERROR / WSAEWOULDBLOCK", action: "注册 writable；就绪后读取 SO_ERROR，不能直接宣告连接成功" }
        : { value: `-1 / ${wouldBlock}`, action: "保存未完成状态，等待下一次 readiness；这不是断线" }
      : operation === "recv"
        ? { value: "n > 0，或 0 表示 orderly FIN", action: "消费 n bytes；0 进入 peer-close 状态，不能当作暂时无数据" }
        : operation === "send"
          ? { value: "0 < n <= requested", action: "只移除已发送 n bytes，剩余数据留在 output buffer" }
          : { value: "writable + SO_ERROR == 0", action: "连接成功；非零 error 表示异步连接失败" };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[24rem] gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-3 border border-border" role="group" aria-label="非阻塞操作">{(["recv", "send", "connect"] as const).map((item, index) => <button key={item} type="button" aria-pressed={operation === item} onClick={() => setOperation(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${operation === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div>
            <div className="grid grid-cols-2 border border-border" role="group" aria-label="套接字平台">{(["Linux", "Windows"] as const).map((item, index) => <button key={item} type="button" aria-pressed={platform === item} onClick={() => setPlatform(item)} className={`min-h-11 text-sm ${index === 0 ? "border-r border-border" : ""} ${platform === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={ready} onChange={(event) => setReady(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />readiness 已满足</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={interrupted} onChange={(event) => setInterrupted(event.target.checked)} disabled={platform === "Windows"} className="h-4 w-4 accent-[var(--accent)] disabled:opacity-40" />Linux signal 造成 EINTR</label>
          </section>
          <section className={`border p-4 ${ready && !interrupted ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">return-value contract</span><h3 className="mt-3 text-base font-semibold text-primary">{result.value}</h3><p className="mt-4 min-h-20 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{result.action}</p><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">mode</span><strong className="mt-2 block text-sm text-primary">nonblocking</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">platform</span><strong className="mt-2 block text-sm text-primary">{platform}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">next state</span><strong className="mt-2 block text-sm text-primary">{ready ? "advance buffer/state" : "wait readiness"}</strong></div></div></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">非阻塞 API 的返回值是状态机输入：would-block、partial I/O、FIN、EINTR 与 connect completion 不能合并处理。</figcaption>
    </figure>
  );
}

type EpollMode = "LT" | "ET" | "ONESHOT";

export function CseEpollTriggerLab() {
  const [mode, setMode] = useState<EpollMode>("ET");
  const [availableBytes, setAvailableBytes] = useState(12);
  const [readBytes, setReadBytes] = useState(4);
  const [rearmed, setRearmed] = useState(false);
  const remaining = Math.max(0, availableBytes - readBytes);
  const eventAgain = mode === "LT" ? remaining > 0 : mode === "ET" ? false : rearmed && remaining > 0;
  const correct = mode === "LT" || remaining === 0 || (mode === "ONESHOT" && rearmed);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[26rem] gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-3 border border-border" role="group" aria-label="epoll 触发模式">{(["LT", "ET", "ONESHOT"] as const).map((item, index) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${mode === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}</div>
            <label className="block text-sm text-primary">kernel receive buffer: <strong>{availableBytes} bytes</strong><input type="range" min="1" max="24" value={availableBytes} onChange={(event) => { setAvailableBytes(Number(event.target.value)); setReadBytes(Math.min(readBytes, Number(event.target.value))); }} className="mt-2 block w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">本次读取: <strong>{readBytes} bytes</strong><input type="range" min="1" max={availableBytes} value={readBytes} onChange={(event) => setReadBytes(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={rearmed} onChange={(event) => setRearmed(event.target.checked)} disabled={mode !== "ONESHOT"} className="h-4 w-4 accent-[var(--accent)] disabled:opacity-40" />EPOLL_CTL_MOD rearm</label>
          </section>
          <section className={`border p-4 ${correct ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">readiness transition</span><h3 className="mt-3 text-base font-semibold text-primary">{correct ? "事件循环仍能继续推进" : "可能遗留未读数据且不再收到边沿通知"}</h3><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">before</span><strong className="mt-2 block text-sm text-primary">{availableBytes} bytes ready</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">after read</span><strong className="mt-2 block text-sm text-primary">{remaining} bytes remain</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">next event</span><strong className="mt-2 block text-sm text-primary">{eventAgain ? "delivered" : "not guaranteed"}</strong></div></div><code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{mode === "LT" ? "read(fd, buf, n); // level remains readable" : mode === "ET" ? "while (read(fd, buf, n) > 0) {}\n// stop only at EAGAIN" : "drain_until_EAGAIN();\nepoll_ctl(epfd, EPOLL_CTL_MOD, fd, &event);"}</code><p className="mt-4 text-sm leading-7 text-secondary">ET 要配 nonblocking fd 并持续读/写到 EAGAIN。ONESHOT 还要求处理者完成后显式 rearm，常用于防止多个 worker 同时处理同一 fd。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">LT 按“当前仍就绪”重复报告；ET 报告状态边沿；EPOLLONESHOT 交付一次后需要显式重新武装。</figcaption>
    </figure>
  );
}
