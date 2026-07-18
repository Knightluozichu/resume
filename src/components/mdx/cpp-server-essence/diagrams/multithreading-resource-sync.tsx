"use client";

import { useState } from "react";

type MainExit = "return" | "pthread_exit" | "join";
type WorkerFailure = "none" | "uncaught" | "fatal-signal";

export function CseThreadLifecycleLab() {
  const [mainExit, setMainExit] = useState<MainExit>("join");
  const [workerFailure, setWorkerFailure] = useState<WorkerFailure>("none");
  const [detached, setDetached] = useState(false);

  const processOutcome = workerFailure === "uncaught"
    ? "std::terminate 结束进程"
    : workerFailure === "fatal-signal"
      ? "未处理致命信号结束进程"
      : mainExit === "return"
        ? "main 返回后进程结束"
        : mainExit === "pthread_exit"
          ? "主线程结束，进程等待其余 pthread"
          : "主线程等待 worker 完成后退出";
  const workerOutcome = workerFailure !== "none"
    ? "worker 故障会跨越线程边界影响整个进程"
    : mainExit === "return"
      ? "进程终止，worker 不保证完成"
      : detached
        ? "无法 join，必须另设 shutdown/ready 协议"
        : "join 建立完成与资源回收边界";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[25rem] gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div>
              <span className="text-xs text-secondary">main 的退出路径</span>
              <div className="mt-2 grid grid-cols-3 border border-border" role="group" aria-label="主线程退出路径">
                {(["return", "pthread_exit", "join"] as const).map((item, index) => (
                  <button key={item} type="button" aria-pressed={mainExit === item} onClick={() => setMainExit(item)} className={`min-h-12 px-2 text-xs sm:text-sm ${index < 2 ? "border-r border-border" : ""} ${mainExit === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-secondary">worker 结果</span>
              <div className="mt-2 grid grid-cols-3 border border-border" role="group" aria-label="工作线程结果">
                {(["none", "uncaught", "fatal-signal"] as const).map((item, index) => (
                  <button key={item} type="button" aria-pressed={workerFailure === item} onClick={() => setWorkerFailure(item)} className={`min-h-12 px-2 text-xs sm:text-sm ${index < 2 ? "border-r border-border" : ""} ${workerFailure === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>
                ))}
              </div>
            </div>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input type="checkbox" checked={detached} onChange={(event) => setDetached(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              worker 使用 detach
            </label>
          </section>

          <section className={`border p-4 ${workerFailure === "none" ? "border-cyan-500/40 bg-cyan-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">process / thread boundary</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{processOutcome}</h3>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="min-h-28 border border-border bg-bg p-3 text-sm text-primary"><strong>main thread</strong><span className="mt-3 block text-xs leading-6 text-secondary">{mainExit === "join" ? "joinable owner" : mainExit}</span></div>
              <span className="text-secondary">→</span>
              <div className={`min-h-28 border p-3 text-sm ${workerFailure === "none" ? "border-emerald-500/40 bg-bg text-primary" : "border-rose-500/40 bg-rose-500/10 text-primary"}`}><strong>worker thread</strong><span className="mt-3 block text-xs leading-6 text-secondary">{workerFailure === "none" ? detached ? "detached" : "joinable" : workerFailure}</span></div>
            </div>
            <p className="mt-5 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{workerOutcome}</p>
            <p className="mt-3 text-xs leading-6 text-secondary">线程共享 address space 和 process resources。线程不是故障隔离单元；需要隔离不可信任务时，应考虑独立进程及监督/重启协议。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">区分“结束一个线程”和“结束整个进程”：join、detach、main 返回和未捕获异常对应不同生命周期契约。</figcaption>
    </figure>
  );
}

type SyncScenario = "exclusive" | "permits" | "state-change" | "read-mostly" | "process-shared";
type SyncPlatform = "Linux" | "Windows" | "C++";

const SYNC_MATRIX: Record<SyncScenario, Record<SyncPlatform, { primitive: string; contract: string }>> = {
  exclusive: {
    Linux: { primitive: "pthread_mutex_t", contract: "同一时刻一个 owner；unlock 必须由 owner 执行" },
    Windows: { primitive: "CRITICAL_SECTION", contract: "进程内低成本互斥；进入与离开必须配对" },
    "C++": { primitive: "std::mutex + lock_guard", contract: "RAII 限定 critical section，异常也能释放" },
  },
  permits: {
    Linux: { primitive: "sem_t", contract: "计数表示可用 permit，不表达共享状态真假" },
    Windows: { primitive: "Semaphore", contract: "kernel waitable object，可跨进程共享 handle" },
    "C++": { primitive: "mutex + condition_variable", contract: "C++17 无标准 semaphore，用 predicate 表达 permit" },
  },
  "state-change": {
    Linux: { primitive: "pthread_cond_t", contract: "持锁检查 predicate；wait 原子释放并重新获得 mutex" },
    Windows: { primitive: "CONDITION_VARIABLE", contract: "与 CriticalSection/SRWLOCK 配合，允许虚假唤醒" },
    "C++": { primitive: "std::condition_variable", contract: "wait(lock, predicate)，notify 只是提示状态可能变化" },
  },
  "read-mostly": {
    Linux: { primitive: "pthread_rwlock_t", contract: "并行 reader、独占 writer；需评估 writer starvation" },
    Windows: { primitive: "SRWLOCK", contract: "shared/exclusive acquisition，不支持递归依赖" },
    "C++": { primitive: "std::shared_mutex", contract: "shared_lock 读、unique_lock 写；读多写少才有收益" },
  },
  "process-shared": {
    Linux: { primitive: "pshared mutex/semaphore", contract: "对象必须位于 shared memory 并设置 process-shared attribute" },
    Windows: { primitive: "named Mutex/Event/Semaphore", contract: "kernel namespace + handle ACL 决定跨进程可见性" },
    "C++": { primitive: "OS primitive", contract: "标准 mutex 只保证线程同步，不提供跨进程共享契约" },
  },
};

export function CseSynchronizationPrimitiveLab() {
  const [scenario, setScenario] = useState<SyncScenario>("state-change");
  const [platform, setPlatform] = useState<SyncPlatform>("C++");
  const [predicate, setPredicate] = useState(false);
  const selected = SYNC_MATRIX[scenario][platform];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-3 border border-border" role="group" aria-label="同步平台">
              {(["Linux", "Windows", "C++"] as const).map((item, index) => <button key={item} type="button" aria-pressed={platform === item} onClick={() => setPlatform(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${platform === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}
            </div>
            <div className="grid grid-cols-1 border border-border sm:grid-cols-2">
              {(Object.keys(SYNC_MATRIX) as SyncScenario[]).map((item, index) => <button key={item} type="button" aria-pressed={scenario === item} onClick={() => setScenario(item)} className={`min-h-11 border-b border-border px-3 text-left text-sm ${index % 2 === 0 ? "sm:border-r" : ""} ${index === 4 ? "sm:col-span-2 sm:border-r-0" : ""} ${scenario === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}
            </div>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={predicate} onChange={(event) => setPredicate(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />共享 predicate 已满足</label>
          </section>
          <section className="border border-emerald-500/40 bg-emerald-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">recommended primitive</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{selected.primitive}</h3>
            <p className="mt-3 min-h-16 text-sm leading-7 text-secondary">{selected.contract}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-4">
              {["lock / acquire", "read predicate", predicate ? "consume state" : "wait in loop", "unlock / release"].map((item, index) => <div key={item} className={`min-h-20 border p-3 text-xs leading-6 ${index === 2 && !predicate ? "border-amber-500/40 bg-amber-500/10 text-primary" : "border-border bg-bg text-primary"}`}><span className="text-secondary">0{index + 1}</span><br />{item}</div>)}
            </div>
            <code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{scenario === "state-change" ? `std::unique_lock lock(mu);\ncv.wait(lock, [&] { return ready || stopping; });\nconsume();` : `// ${scenario} on ${platform}\n// ${selected.primitive}\n// define owner, state and wakeup contract first`}</code>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先判断要保护的是 owner、permit、状态变化、读多写少还是跨进程资源，再选择 Linux、Windows 或 C++ 同步对象。</figcaption>
    </figure>
  );
}

export function CseThreadPoolBackpressureLab() {
  const [workers, setWorkers] = useState(4);
  const [arrivalRate, setArrivalRate] = useState(18);
  const [serviceRate, setServiceRate] = useState(5);
  const [capacity, setCapacity] = useState(8);
  const throughput = workers * serviceRate;
  const utilization = arrivalRate / Math.max(1, throughput);
  const backlog = Math.max(0, Math.ceil(arrivalRate - throughput));
  const occupied = Math.min(capacity, backlog);
  const overloaded = arrivalRate > throughput;
  const saturated = backlog >= capacity;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[27rem] gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">workers: <strong>{workers}</strong><input className="mt-2 block w-full accent-[var(--accent)]" type="range" min="1" max="8" value={workers} onChange={(event) => setWorkers(Number(event.target.value))} /></label>
            <label className="block text-sm text-primary">arrival: <strong>{arrivalRate} tasks/s</strong><input className="mt-2 block w-full accent-[var(--accent)]" type="range" min="1" max="50" value={arrivalRate} onChange={(event) => setArrivalRate(Number(event.target.value))} /></label>
            <label className="block text-sm text-primary">worker service: <strong>{serviceRate} tasks/s</strong><input className="mt-2 block w-full accent-[var(--accent)]" type="range" min="1" max="10" value={serviceRate} onChange={(event) => setServiceRate(Number(event.target.value))} /></label>
            <div className="grid grid-cols-3 border border-border" role="group" aria-label="队列容量">
              {[4, 8, 16].map((item, index) => <button key={item} type="button" aria-pressed={capacity === item} onClick={() => setCapacity(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${capacity === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item} slots</button>)}
            </div>
          </section>
          <section className={`border p-4 ${saturated ? "border-rose-500/40 bg-rose-500/10" : overloaded ? "border-amber-500/40 bg-amber-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">bounded queue state</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{saturated ? "队列已满：必须拒绝、降级或上游背压" : overloaded ? "到达率超过处理率：积压持续增长" : "服务能力覆盖当前到达率"}</h3>
            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {Array.from({ length: capacity }, (_, index) => <div key={index} className={`aspect-square border ${index < occupied ? "border-amber-500/50 bg-amber-500/30" : "border-border bg-bg"}`} aria-label={index < occupied ? "已占用队列槽" : "空队列槽"} />)}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">capacity</span><strong className="mt-2 block text-sm text-primary">{throughput} tasks/s</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">utilization</span><strong className="mt-2 block text-sm text-primary">{Math.round(utilization * 100)}%</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">new backlog/s</span><strong className="mt-2 block text-sm text-primary">{backlog}</strong></div></div>
            <p className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-secondary">环形队列只让内存有界，不会创造吞吐。任务必须定义 ownership、取消、超时与异常传播；长阻塞任务应隔离，否则一个共享池会出现 head-of-line blocking。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">线程池容量由到达率、单 worker 服务率和等待预算共同约束；有界队列必须配套明确的过载策略。</figcaption>
    </figure>
  );
}
