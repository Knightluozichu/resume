"use client";

import { useMemo, useState } from "react";

type JoinPlacement = "none" | "before" | "after";

export function RplThreadJoinLab() {
  const [joinPlacement, setJoinPlacement] = useState<JoinPlacement>("after");
  const [moveCapture, setMoveCapture] = useState(true);
  const compile = moveCapture;
  const spawnedSteps = joinPlacement === "none" ? 2 : 4;
  const mainSteps = 3;
  const timeline = joinPlacement === "before"
    ? ["worker 1", "worker 2", "worker 3", "worker 4", "main 1", "main 2", "main 3"]
    : ["main 1", "worker 1", "main 2", "worker 2", "main 3", ...(joinPlacement === "after" ? ["worker 3", "worker 4"] : [])];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="join 调用位置">
          {([
            ["none", "不 join"],
            ["before", "先 join"],
            ["after", "末尾 join"],
          ] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={joinPlacement === value} onClick={() => setJoinPlacement(value)} className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${joinPlacement === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{label}</button>)}
        </div>

        <div className="mt-5 grid min-h-[25rem] gap-4 lg:grid-cols-[0.85fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={moveCapture} onChange={(event) => setMoveCapture(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />closure 使用 move 捕获 Vec</label>
            <code className="block min-h-32 border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`let data = vec![1, 2, 3];\nlet handle = thread::spawn(${moveCapture ? "move " : ""}|| work(data));\n${joinPlacement === "before" ? "handle.join()?;\nmain_work();" : joinPlacement === "after" ? "main_work();\nhandle.join()?;" : "main_work();\n// handle dropped"}`}</code>
            <p className="text-xs text-secondary">spawn thread 可能比当前 stack frame 活得更久，普通借用无法证明始终有效；move 把 data 所有权转给 worker。</p>
          </section>

          <section className={`border p-4 ${compile ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">一种可能调度，不是顺序保证</span>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{timeline.map((step, index) => <div key={`${step}-${index}`} className={`border p-3 text-center text-xs ${step.startsWith("worker") ? "border-cyan-500/40 bg-cyan-500/10 text-primary" : "border-amber-500/40 bg-amber-500/10 text-primary"}`}>{step}</div>)}</div>
            <h3 className="mt-5 text-base font-semibold text-primary">{!compile ? "E0373：thread 可能比被借用值活得久" : joinPlacement === "none" ? `main 完成后 worker 可能只执行 ${spawnedSteps}/4` : joinPlacement === "before" ? "worker 完成后 main 才开始：并发被串行化" : "main 与 worker 可重叠，退出前保证 worker 完成"}</h3>
            <p className="mt-3 text-sm text-secondary">main steps：{mainSteps}/3 · worker steps：{compile ? spawnedSteps : 0}/4。join 阻塞调用它的 thread；放置位置既决定完成保证，也决定是否保留重叠执行窗口。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">spawn 只启动任务，JoinHandle 才表达完成依赖；move 解决跨 thread 所有权，不保证执行顺序。</figcaption>
    </figure>
  );
}

type ReceiveMode = "recv" | "try" | "iterate";

export function RplChannelOwnershipLab() {
  const [producers, setProducers] = useState(2);
  const [receiveMode, setReceiveMode] = useState<ReceiveMode>("iterate");
  const [openSenders, setOpenSenders] = useState(2);
  const effectiveOpen = Math.min(openSenders, producers);
  const queued = producers * 2;
  const receiverState = effectiveOpen === 0 ? "closed after queue drains" : "open: more messages may arrive";
  const receiveResult = receiveMode === "recv" ? queued > 0 ? "blocks until one Result message" : "blocks until send/close" : receiveMode === "try" ? queued > 0 ? "returns immediately with Ok(message)" : "returns immediately with Empty/Disconnected" : effectiveOpen === 0 ? "for loop drains queue then ends" : "for loop waits after draining queue";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[26rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">producer tx 数：{producers}<input type="range" min="1" max="3" value={producers} onChange={(event) => { const value = Number(event.target.value); setProducers(value); setOpenSenders(Math.min(openSenders, value)); }} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">尚未 drop 的 tx：{effectiveOpen}<input type="range" min="0" max={producers} value={effectiveOpen} onChange={(event) => setOpenSenders(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <select value={receiveMode} onChange={(event) => setReceiveMode(event.target.value as ReceiveMode)} className="min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="recv">rx.recv()</option><option value="try">rx.try_recv()</option><option value="iterate">for message in rx</option></select>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">tx.send(value) // moves value{producers > 1 ? "\nlet tx2 = tx.clone();" : ""}</code>
          </section>

          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">mpsc：multiple producer, single consumer</span>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="space-y-2">{Array.from({ length: producers }, (_, index) => <div key={index} className="border border-border bg-bg p-3 text-center text-xs text-primary">tx{index + 1} {index < effectiveOpen ? "open" : "dropped"}</div>)}</div><div className="text-center text-secondary">-&gt;</div><div className="border border-border bg-bg p-4 text-center"><strong className="text-sm text-primary">rx</strong><p className="mt-2 text-xs text-secondary">single consumer</p></div></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">channel state</span><strong className="mt-2 block text-sm text-primary">{receiverState}</strong><p className="mt-2 text-xs text-secondary">发送值已 move，sender 不能再读写它。</p></div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">receive behavior</span><strong className="mt-2 block text-sm text-primary">{receiveResult}</strong></div></div>
            <p className="mt-4 text-xs text-secondary">示意队列：{queued} 条。只有所有 transmitter 都 drop 后，receiver 才能确定不会再有消息；drop receiver 后 send 返回 Err。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">channel 通过 move 转移消息所有权；recv/try_recv 的阻塞策略和所有 tx 的关闭状态共同决定消费行为。</figcaption>
    </figure>
  );
}

type SharedPointer = "rc" | "arc";

const traitMatrix = [
  { type: "Rc<Mutex<T>>", send: false, sync: false },
  { type: "Arc<Mutex<T>>", send: true, sync: true },
  { type: "RefCell<T>", send: "T-dependent", sync: false },
] as const;

export function RplSharedStateLab() {
  const [pointer, setPointer] = useState<SharedPointer>("arc");
  const [threads, setThreads] = useState(4);
  const [guardScope, setGuardScope] = useState<"short" | "long">("short");
  const [reverseLockOrder, setReverseLockOrder] = useState(false);
  const compile = pointer === "arc";
  const deadlockRisk = reverseLockOrder && threads > 1;
  const result = compile && !deadlockRisk ? threads : 0;
  const selectedType = pointer === "arc" ? "Arc<Mutex<i32>>" : "Rc<Mutex<i32>>";
  const selectedTraits = useMemo(() => traitMatrix.find((item) => item.type.startsWith(pointer === "arc" ? "Arc" : "Rc")), [pointer]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="共享所有权 pointer"><button type="button" aria-pressed={pointer === "rc"} onClick={() => setPointer("rc")} className={`min-h-11 border-r border-border text-sm ${pointer === "rc" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>Rc + Mutex</button><button type="button" aria-pressed={pointer === "arc"} onClick={() => setPointer("arc")} className={`min-h-11 text-sm ${pointer === "arc" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>Arc + Mutex</button></div>

        <div className="mt-5 grid min-h-[28rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">worker threads：{threads}<input type="range" min="1" max="8" value={threads} onChange={(event) => setThreads(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <select value={guardScope} onChange={(event) => setGuardScope(event.target.value as "short" | "long")} className="min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="short">只在增量操作持有 guard</option><option value="long">整个 worker 生命周期持有 guard</option></select>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={reverseLockOrder} onChange={(event) => setReverseLockOrder(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />两个 mutex 的取得顺序不一致</label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`let counter = ${pointer === "arc" ? "Arc" : "Rc"}::new(Mutex::new(0));\nlet shared = ${pointer === "arc" ? "Arc" : "Rc"}::clone(&counter);\nthread::spawn(move || *shared.lock()? += 1);`}</code>
          </section>

          <section className={`border p-4 ${compile && !deadlockRisk ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">type-level concurrency contract</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{!compile ? `${selectedType} 未实现 Send，拒绝跨 thread move` : deadlockRisk ? "代码可编译，但存在锁顺序 deadlock 风险" : `所有 join 完成后 counter = ${result}`}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Send</span><strong className="mt-2 block text-sm text-primary">{String(selectedTraits?.send)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Sync</span><strong className="mt-2 block text-sm text-primary">{String(selectedTraits?.sync)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">guard contention</span><strong className="mt-2 block text-sm text-primary">{guardScope === "short" ? "局部" : "高：工作被串行化"}</strong></div></div>
            <p className="mt-5 text-sm text-secondary">MutexGuard 通过 Deref 暴露数据，并在 Drop 时自动 unlock。Arc 只让计数更新线程安全；真正的可变访问仍由 Mutex 互斥。Send/Sync 排除 data race 类型错误，但不证明锁顺序、活性或吞吐正确。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Arc 提供跨 thread 多 owner，Mutex 提供一次一个可变访问；marker traits 不会自动消除 deadlock 或过度锁定。</figcaption>
    </figure>
  );
}
