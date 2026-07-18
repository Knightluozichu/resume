"use client";

import { useMemo, useState } from "react";

type PollPhase = "created" | "pending" | "scheduled" | "ready";

export function RplFuturePollLab() {
  const [pollCount, setPollCount] = useState(0);
  const [resourceReady, setResourceReady] = useState(false);
  const [completed, setCompleted] = useState(false);
  const phase: PollPhase = completed ? "ready" : resourceReady ? "scheduled" : pollCount > 0 ? "pending" : "created";
  const phaseLabel = {
    created: "Future 已创建，但尚未执行",
    pending: "poll 返回 Pending，task 休眠",
    scheduled: "Waker 已入队，等待 executor 再次 poll",
    ready: "poll 返回 Ready，Future 完成",
  }[phase];

  function pollFuture() {
    if (completed) return;
    setPollCount((count) => count + 1);
    if (resourceReady) setCompleted(true);
  }

  function reset() {
    setPollCount(0);
    setResourceReady(false);
    setCompleted(false);
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="Future 状态机操作">
          <button type="button" onClick={pollFuture} disabled={completed} className="min-h-11 border-r border-border bg-bg px-2 text-sm text-primary disabled:text-secondary">执行一次 poll</button>
          <button type="button" onClick={() => setResourceReady(true)} disabled={resourceReady || completed} className="min-h-11 border-r border-border bg-bg px-2 text-sm text-primary disabled:text-secondary">I/O 完成并 wake</button>
          <button type="button" onClick={reset} className="min-h-11 bg-bg px-2 text-sm text-primary">重置</button>
        </div>

        <div className="mt-5 grid min-h-[27rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <span className="text-xs text-secondary">compiler 生成的简化状态</span>
            {[
              ["Created", "保存输入，函数体尚未推进"],
              ["Waiting", "保存跨 await 局部值与子 Future"],
              ["Completed", "Output 已产生，不能普通地再次 poll"],
            ].map(([name, detail], index) => {
              const active = (phase === "created" && index === 0) || ((phase === "pending" || phase === "scheduled") && index === 1) || (phase === "ready" && index === 2);
              return <div key={name} className={`border p-3 ${active ? "border-cyan-500/50 bg-cyan-500/10" : "border-border bg-elevated"}`}><strong className="text-sm text-primary">{name}</strong><p className="mt-1 text-xs text-secondary">{detail}</p></div>;
            })}
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`poll(Pin<&mut Self>, &mut Context)
  -> ${completed ? "Poll::Ready(output)" : "Poll::Pending"}`}</code>
          </section>

          <section className={`border p-4 ${phase === "ready" ? "border-emerald-500/40 bg-emerald-500/10" : phase === "pending" ? "border-amber-500/40 bg-amber-500/10" : "border-cyan-500/40 bg-cyan-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">executor / task / resource handshake</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{phaseLabel}</h3>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs">
              <div className="border border-border bg-bg p-3 text-primary">executor<br />ready queue</div><span className="text-secondary">-&gt;</span><div className="border border-border bg-bg p-3 text-primary">task<br />poll #{pollCount}</div><span className="text-secondary">-&gt;</span><div className="border border-border bg-bg p-3 text-primary">I/O<br />{resourceReady ? "ready" : "waiting"}</div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Future laziness</span><strong className="mt-2 block text-sm text-primary">{pollCount === 0 ? "未运行" : "已被推进"}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">wake effect</span><strong className="mt-2 block text-sm text-primary">{resourceReady ? "安排重 poll" : "尚未通知"}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">result</span><strong className="mt-2 block text-sm text-primary">{completed ? "Ready(output)" : "尚无 Output"}</strong></div>
            </div>
            <p className="mt-5 text-sm text-secondary">wake 不直接执行 Future，也不代表 Output 已经产生；它只通知 executor 这项 task 值得重新进入 ready queue。只有下一次 poll 才能观察资源并返回 Ready。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">async fn 产生惰性状态机；executor 用 poll 推进，Pending 时依靠 Waker 避免忙等。</figcaption>
    </figure>
  );
}

type CompositionMode = "sequential" | "join" | "select";

export function RplFutureCompositionLab() {
  const [mode, setMode] = useState<CompositionMode>("join");
  const [firstMs, setFirstMs] = useState(700);
  const [secondMs, setSecondMs] = useState(1100);
  const [blockingPrefix, setBlockingPrefix] = useState(false);
  const totalMs = mode === "sequential" ? firstMs + secondMs : mode === "join" ? Math.max(firstMs, secondMs) : Math.min(firstMs, secondMs);
  const winner = firstMs <= secondMs ? "Future A" : "Future B";
  const retained = mode === "select" ? `${winner} 的 Output；另一个 Future 被 drop` : "A 与 B 的两个 Output";
  const timelineMax = Math.max(firstMs + (mode === "sequential" ? secondMs : 0), secondMs, 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="Future 组合方式">
          {([[
            "sequential", "逐个 await",
          ], ["join", "join 两者"], ["select", "select 先完成"]] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${mode === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{label}</button>)}
        </div>

        <div className="mt-5 grid min-h-[28rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">Future A 就绪：{firstMs} ms<input type="range" min="100" max="2000" step="100" value={firstMs} onChange={(event) => setFirstMs(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">Future B 就绪：{secondMs} ms<input type="range" min="100" max="2000" step="100" value={secondMs} onChange={(event) => setSecondMs(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={blockingPrefix} onChange={(event) => setBlockingPrefix(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />A 在首个 await 前执行长阻塞工作</label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{mode === "sequential" ? "let a = future_a().await;\nlet b = future_b().await;" : mode === "join" ? "let (a, b) = join(future_a(), future_b()).await;" : "let first = select(future_a(), future_b()).await;"}</code>
          </section>

          <section className={`border p-4 ${blockingPrefix ? "border-rose-500/40 bg-rose-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">完成时间与结果契约</span>
            <h3 className="mt-4 text-base font-semibold text-primary">约 {totalMs} ms · {retained}</h3>
            <div className="mt-5 space-y-4">
              <div><div className="mb-1 flex justify-between text-xs text-secondary"><span>Future A</span><span>{firstMs} ms</span></div><div className="h-8 border border-border bg-bg"><div className="flex h-full items-center bg-cyan-500/20 px-2 text-xs text-primary" style={{ width: `${Math.max(12, (firstMs / timelineMax) * 100)}%` }}>A</div></div></div>
              <div><div className="mb-1 flex justify-between text-xs text-secondary"><span>Future B</span><span>{mode === "sequential" ? `从 ${firstMs} ms 后开始` : "从 0 ms 开始"}</span></div><div className="h-8 border border-border bg-bg"><div className="flex h-full items-center bg-amber-500/20 px-2 text-xs text-primary" style={{ marginLeft: mode === "sequential" ? `${(firstMs / timelineMax) * 100}%` : 0, width: `${Math.max(12, (secondMs / timelineMax) * 100)}%` }}>B</div></div></div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">concurrency</span><strong className="mt-2 block text-sm text-primary">{mode === "sequential" ? "无重叠" : "可交错推进"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">completion</span><strong className="mt-2 block text-sm text-primary">{mode === "select" ? "first ready" : "all ready"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">fairness</span><strong className="mt-2 block text-sm text-primary">{blockingPrefix ? "B 可能饥饿" : "取决于 combinator/runtime"}</strong></div></div>
            <p className="mt-5 text-sm text-secondary">同一 async block 内连续写两个 await 仍是顺序执行。join 同时推进并等待全部；select 竞速后通常 drop 未完成分支，因此资源清理与 cancellation safety 必须由被丢弃的 Future 契约保证。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">组合器决定启动、完成和取消语义；await 位置决定何时把控制交还 executor。</figcaption>
    </figure>
  );
}

type WorkKind = "io" | "cpu";
type ExecutionBoundary = "task" | "blocking-worker" | "thread";

export function RplStreamTaskBoundaryLab() {
  const [produceRate, setProduceRate] = useState(8);
  const [consumeRate, setConsumeRate] = useState(5);
  const [workKind, setWorkKind] = useState<WorkKind>("io");
  const [boundary, setBoundary] = useState<ExecutionBoundary>("task");
  const backlog = Math.max(0, produceRate - consumeRate);
  const recommendation: ExecutionBoundary = workKind === "io" ? "task" : "blocking-worker";
  const boundaryLabel = { task: "async task", "blocking-worker": "spawn_blocking worker", thread: "OS thread" }[boundary];
  const fit = boundary === recommendation || (workKind === "cpu" && boundary === "thread");
  const streamItems = useMemo(() => Array.from({ length: Math.min(produceRate, 8) }, (_, index) => index + 1), [produceRate]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="工作负载类型"><button type="button" aria-pressed={workKind === "io"} onClick={() => setWorkKind("io")} className={`min-h-11 border-r border-border text-sm ${workKind === "io" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>I/O 等待型</button><button type="button" aria-pressed={workKind === "cpu"} onClick={() => setWorkKind("cpu")} className={`min-h-11 text-sm ${workKind === "cpu" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>CPU 计算型</button></div>

        <div className="mt-5 grid min-h-[29rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">Stream 产生：{produceRate} item/s<input type="range" min="1" max="12" value={produceRate} onChange={(event) => setProduceRate(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">consumer 处理：{consumeRate} item/s<input type="range" min="1" max="12" value={consumeRate} onChange={(event) => setConsumeRate(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <select value={boundary} onChange={(event) => setBoundary(event.target.value as ExecutionBoundary)} className="min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="task">留在 async task</option><option value="blocking-worker">交给 spawn_blocking</option><option value="thread">专用 OS thread</option></select>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`use trpl::StreamExt;
while let Some(item) = stream.next().await {
    ${workKind === "io" ? "handle_io(item).await;" : boundary === "task" ? "compute(item); // no await" : "offload_compute(item).await;"}
}`}</code>
          </section>

          <section className={`border p-4 ${fit ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">Stream -&gt; task -&gt; execution resource</span>
            <div className="mt-4 flex min-h-14 flex-wrap items-center gap-2 border border-border bg-bg p-3">{streamItems.map((item) => <span key={item} className="flex h-8 w-8 items-center justify-center border border-cyan-500/40 bg-cyan-500/10 text-xs text-primary">{item}</span>)}</div>
            <div className="mt-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs"><div className="border border-border bg-bg p-3 text-primary">Stream<br />Poll&lt;Option&lt;Item&gt;&gt;</div><span className="text-secondary">-&gt;</span><div className="border border-border bg-bg p-3 text-primary">next().await<br />consumer</div><span className="text-secondary">-&gt;</span><div className="border border-border bg-bg p-3 text-primary">{boundaryLabel}</div></div>
            <h3 className="mt-5 text-base font-semibold text-primary">{fit ? `边界匹配：${boundaryLabel}` : workKind === "cpu" ? "CPU 工作占住 executor，其他 task 可能饥饿" : "等待型 I/O 被放到线程边界，增加不必要调度成本"}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">rate gap</span><strong className="mt-2 block text-sm text-primary">{backlog === 0 ? "consumer 跟得上" : `每秒积压 ${backlog}`}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">recommended</span><strong className="mt-2 block text-sm text-primary">{workKind === "io" ? "async task" : "blocking pool / thread"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">sequence end</span><strong className="mt-2 block text-sm text-primary">Poll::Ready(None)</strong></div></div>
            <p className="mt-5 text-sm text-secondary">Stream 把“随时间到达的一串值”表示为异步序列。next 需要 StreamExt；生产快于消费时仍要设计有界队列、丢弃、批处理或背压，async 本身不会让内存积压消失。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">I/O-bound 工作适合 async task；CPU-bound 或阻塞调用应移出 executor worker，并为 Stream 明确速率和背压。</figcaption>
    </figure>
  );
}
