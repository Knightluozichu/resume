"use client";

import { useState } from "react";

type TransferMode = "move" | "borrow" | "share";

export function RplOwnershipBoundaryReviewLab() {
  const [mode, setMode] = useState<TransferMode>("move");
  const [mutable, setMutable] = useState(false);
  const [crossThread, setCrossThread] = useState(false);

  const recommendation = mode === "move"
    ? { type: "owned T", rule: "callee / job 成为唯一 owner", risk: "caller 在 move 后继续使用会编译失败", chapters: "Ch 4 · 13 · 16" }
    : mode === "borrow"
      ? { type: mutable ? "&mut T" : "&T", rule: mutable ? "借用期内唯一 mutable access" : "借用期内可有多个 shared readers", risk: crossThread ? "普通 stack borrow 通常不能逃逸到 static thread/job" : "reference 不得比 owner 活得久", chapters: "Ch 4 · 10" }
      : crossThread
        ? { type: mutable ? "Arc<Mutex<T>>" : "Arc<T>", rule: "atomic strong owners 跨 thread；mutation 由 guard 串行化", risk: mutable ? "guard scope / lock order 仍可 deadlock 或 contention" : "T 仍必须满足 Send/Sync contract", chapters: "Ch 15 · 16" }
        : { type: mutable ? "Rc<RefCell<T>>" : "Rc<T>", rule: "单线程 shared ownership；borrow rule 可在 runtime 检查", risk: mutable ? "RefCell 违约会 panic，strong cycle 会 leak" : "Rc 不能安全 Send 到 worker thread", chapters: "Ch 15" };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[27rem] gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div>
              <span className="text-xs text-secondary">value relationship</span>
              <div className="mt-2 grid grid-cols-3 border border-border" role="group" aria-label="value relationship">
                {(["move", "borrow", "share"] as const).map((item, index) => (
                  <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${mode === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>
                ))}
              </div>
            </div>
            <label className={`flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary ${mode === "move" ? "opacity-50" : ""}`}><input type="checkbox" checked={mutable} disabled={mode === "move"} onChange={(event) => setMutable(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />共享期间需要 mutation</label>
            <label className={`flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary ${mode === "move" ? "opacity-50" : ""}`}><input type="checkbox" checked={crossThread} disabled={mode === "move"} onChange={(event) => setCrossThread(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />访问跨越 thread boundary</label>
            <code className="block whitespace-pre-wrap border border-border bg-elevated p-3 text-xs leading-6 text-primary">{mode === "move" ? "let owned = String::from(\"job\");\nexecute(move || consume(owned));" : mode === "borrow" ? `${mutable ? "inspect_mut(&mut value)" : "inspect(&value)"};\n// owner remains responsible for Drop` : crossThread ? `let shared = ${mutable ? "Arc::new(Mutex::new(value))" : "Arc::new(value)"};\nlet worker_view = Arc::clone(&shared);` : `let shared = ${mutable ? "Rc::new(RefCell::new(value))" : "Rc::new(value)"};\nlet local_view = Rc::clone(&shared);`}</code>
          </section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">ownership decision</span>
            <h3 className="mt-3 text-xl font-semibold text-primary">{recommendation.type}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">owner model</span><p className="mt-2 text-sm leading-6 text-primary">{recommendation.rule}</p></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">remaining proof</span><p className="mt-2 text-sm leading-6 text-primary">{recommendation.risk}</p></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">source chapters</span><strong className="mt-2 block text-sm text-primary">{recommendation.chapters}</strong></div></div>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center text-sm"><div className="min-h-20 border border-border bg-bg p-3 text-primary">caller / producer<br /><span className="text-xs text-secondary">creates value</span></div><span className="text-secondary">{mode === "move" ? "owner ->" : mode === "borrow" ? "loan ->" : "clone owner ->"}</span><div className="min-h-20 border border-border bg-bg p-3 text-primary">callee / worker<br /><span className="text-xs text-secondary">{recommendation.type}</span></div></div>
            <p className="mt-5 text-sm leading-7 text-secondary">先画 owner、borrow 与 Drop 顺序，再选 smart pointer。Rc/Arc 只增加 owners，RefCell/Mutex 才控制 mutation；任何组合都不会自动证明业务 protocol 没有 cycle、deadlock 或 starvation。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">move、borrow 与 shared ownership 是三种不同 contract；是否跨线程、是否可变只是在其上继续收紧类型选择。</figcaption>
    </figure>
  );
}

export function RplAbstractionFailureReviewLab() {
  const [runtimeChoice, setRuntimeChoice] = useState(false);
  const [closedVariants, setClosedVariants] = useState(true);
  const [generateSyntax, setGenerateSyntax] = useState(false);
  const [recoverable, setRecoverable] = useState(true);

  const abstraction = generateSyntax
    ? { name: "macro", reason: "调用方需要 variable syntax 或 compile-time code generation", chapter: "Ch 20" }
    : closedVariants
      ? { name: "enum + match", reason: "variant set closed，compiler 可验证 exhaustive handling", chapter: "Ch 6 · 19" }
      : runtimeChoice
        ? { name: "dyn Trait", reason: "实现集合 open，具体类型在 runtime 才确定", chapter: "Ch 10 · 18" }
        : { name: "generic + trait bound", reason: "caller type compile time 已知，可 monomorphize 静态分派", chapter: "Ch 10" };
  const failure = recoverable
    ? { name: "Result<T, E>", reason: "caller 可决定 retry、fallback、report 或 propagate" }
    : { name: "panic / invariant assertion", reason: "继续执行无法维持内部 invariant，且 caller 无合理恢复动作" };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[26rem] gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <section className="space-y-3 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={closedVariants} onChange={(event) => setClosedVariants(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />全部 variants 由当前 crate 封闭定义</label>
            <label className={`flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary ${closedVariants ? "opacity-50" : ""}`}><input type="checkbox" checked={runtimeChoice} disabled={closedVariants} onChange={(event) => setRuntimeChoice(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />具体 implementation 到 runtime 才知道</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={generateSyntax} onChange={(event) => setGenerateSyntax(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />必须接收 syntax 并生成 items / impl</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={recoverable} onChange={(event) => setRecoverable(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />失败后 caller 存在合理恢复策略</label>
          </section>
          <section className="border border-emerald-500/40 bg-emerald-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">separate two decisions</span>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">abstraction boundary</span><h3 className="mt-3 text-lg font-semibold text-primary">{abstraction.name}</h3><p className="mt-3 text-sm leading-6 text-secondary">{abstraction.reason}</p><strong className="mt-4 block text-xs text-primary">{abstraction.chapter}</strong></div>
              <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">failure boundary</span><h3 className="mt-3 text-lg font-semibold text-primary">{failure.name}</h3><p className="mt-3 text-sm leading-6 text-secondary">{failure.reason}</p><strong className="mt-4 block text-xs text-primary">Ch 9 · Ch 12</strong></div>
            </div>
            <div className="mt-4 border border-border bg-bg p-3 text-sm leading-7 text-primary">{generateSyntax ? "macro expansion 后仍须经过普通 type checking；若 function/generic 能表达，就不承担 token parsing 和 diagnostic 成本。" : abstraction.name === "dyn Trait" ? "trait object 擦除 concrete type 并经 vtable dispatch；object safety 与 allocation/ownership 仍要显式设计。" : abstraction.name.startsWith("generic") ? "generic + bound 保留 concrete type，compiler 为实际类型生成代码；这不是 runtime plugin registry。" : "enum 让 data 与 variants 同处一个 closed sum type；match 的 exhaustiveness 是维护提醒。"}</div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">先选择开放性与 dispatch，再选择 failure policy；macro、dyn Trait 和 panic 都不是“更高级”的默认答案。</figcaption>
    </figure>
  );
}

export function RplSystemReadinessLab() {
  const [protocol, setProtocol] = useState(true);
  const [capacity, setCapacity] = useState(false);
  const [errors, setErrors] = useState(true);
  const [tests, setTests] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const checks = [protocol, capacity, errors, tests, shutdown];
  const score = checks.filter(Boolean).length * 20;
  const weakest = !protocol ? "protocol framing / input validation" : !capacity ? "bounded queue / timeout / backpressure" : !errors ? "Result surface / panic containment" : !tests ? "unit + integration + failure tests" : !shutdown ? "sender close / worker exit / join" : "all core gates passed";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[28rem] gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="space-y-3 border border-border bg-bg p-4">
            {[
              ["protocol", protocol, setProtocol, "输入 framing、size 与 invalid cases 已定义"],
              ["capacity", capacity, setCapacity, "workers/queue/timeouts 有明确上界"],
              ["errors", errors, setErrors, "I/O 与 job failures 不靠 unwrap 隐藏"],
              ["tests", tests, setTests, "success、failure、concurrency 与 cleanup 可复现"],
              ["shutdown", shutdown, setShutdown, "停止新增、排空、退出、join 顺序已证明"],
            ].map(([key, value, setter, label]) => {
              const update = setter as (next: boolean) => void;
              return <label key={String(key)} className="flex min-h-12 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={Boolean(value)} onChange={(event) => update(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />{String(label)}</label>;
            })}
          </section>
          <section className={`border p-4 ${score === 100 ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">cross-chapter system gate</span>
            <div className="mt-3 flex items-end justify-between gap-4"><strong className="text-3xl text-primary">{score}</strong><span className="text-sm text-secondary">{checks.filter(Boolean).length}/5 contracts</span></div>
            <div className="mt-4 h-3 border border-border bg-bg"><div className={`h-full ${score === 100 ? "bg-emerald-500/70" : "bg-amber-500/70"}`} style={{ width: `${score}%` }} /></div>
            <div className="mt-5 grid grid-cols-5 gap-1 text-center text-xs">
              {["bytes", "queue", "error", "test", "drop"].map((label, index) => <div key={label} className={`min-h-16 border p-2 ${checks[index] ? "border-emerald-500/40 bg-bg text-primary" : "border-rose-500/40 bg-rose-500/10 text-rose-300"}`}>{index + 1}<br />{label}</div>)}
            </div>
            <div className="mt-5 border border-border bg-bg p-3"><span className="text-xs text-secondary">next remediation target</span><strong className="mt-2 block text-sm text-primary">{weakest}</strong></div>
            <p className="mt-4 text-sm leading-7 text-secondary">{score === 100 ? "核心系统契约齐全。下一层仍需 TLS、observability、deployment 和 threat model，但可以证明教学项目的 correctness/lifecycle 闭环。" : "不要用已通过的维度平均掉失败 gate。按最弱边界回到对应 chapter，补实现和可重复证据后再重新集成。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">综合验收采用最弱门禁思路：协议、容量、错误、测试或关闭任一缺失，系统都不能因平均分好看而视为完成。</figcaption>
    </figure>
  );
}
