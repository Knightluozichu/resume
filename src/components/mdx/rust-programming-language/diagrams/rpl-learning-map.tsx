"use client";

import { useState } from "react";

const PHASES = [
  {
    id: "tools",
    label: "工具与语法",
    range: "Ch 1-3",
    purpose: "让源码、Cargo、变量、类型、函数与控制流成为可重复使用的工作台。",
    gate: "能从空目录创建 package，并独立完成输入、parse、match、loop 的小程序。",
    chapters: [
      [1, "Getting Started", "rustup · rustc · Cargo"],
      [2, "Guessing Game", "stdin · rand · match"],
      [3, "Common Concepts", "binding · type · control flow"],
    ],
  },
  {
    id: "model",
    label: "所有权与建模",
    range: "Ch 4-9",
    purpose: "用 ownership、struct、enum、module、collection 与 Result 建立可维护数据边界。",
    gate: "能在不滥用 clone/unwrap 的前提下解释 owner、borrow、variant、visibility 与 recoverable error。",
    chapters: [
      [4, "Understanding Ownership", "move · borrow · slice"],
      [5, "Using Structs", "data · method · associated fn"],
      [6, "Enums and Matching", "variant · Option · match"],
      [7, "Packages and Modules", "crate · path · privacy"],
      [8, "Common Collections", "Vec · String · HashMap"],
      [9, "Error Handling", "panic · Result · question mark"],
    ],
  },
  {
    id: "engineering",
    label: "抽象与工程",
    range: "Ch 10-14",
    purpose: "把泛型契约、测试、CLI 项目、closures/iterators 与 Cargo 交付流程串成工程闭环。",
    gate: "能为一个 library 设计 public trait boundary、tests、docs、workspace 与 release artifact。",
    chapters: [
      [10, "Generics, Traits, Lifetimes", "bound · impl · lifetime"],
      [11, "Automated Tests", "assert · filter · integration"],
      [12, "An I/O Project", "Config · TDD · stderr"],
      [13, "Iterators and Closures", "capture · Fn · lazy"],
      [14, "Cargo and Crates.io", "profile · docs · workspace"],
    ],
  },
  {
    id: "runtime",
    label: "内存与并发",
    range: "Ch 15-17",
    purpose: "从 indirection 与 shared ownership 进入 threads、channels、shared state、Future 与 task。",
    gate: "能画出 Rc/Arc strong edges、Mutex guard scope、channel close 与 Future poll/wake 的 lifecycle。",
    chapters: [
      [15, "Smart Pointers", "Box · Rc · RefCell · Weak"],
      [16, "Fearless Concurrency", "thread · channel · Arc/Mutex"],
      [17, "Async Programming", "Future · await · Stream"],
    ],
  },
  {
    id: "integration",
    label: "动态能力与集成",
    range: "Ch 18-21",
    purpose: "用 trait objects、patterns、unsafe/macros 与 thread pool 完成边界清楚的系统集成。",
    gate: "能区分 static/dynamic/unsafe boundaries，并证明 server queue、worker 与 shutdown protocol。",
    chapters: [
      [18, "OOP Features", "encapsulation · dyn Trait · state"],
      [19, "Patterns and Matching", "refutability · guard · binding"],
      [20, "Advanced Features", "unsafe · types · macros"],
      [21, "Multithreaded Web Server", "TCP · pool · shutdown"],
    ],
  },
] as const;

export function RplOfficialChapterMapLab() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = PHASES[phaseIndex];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-5" role="group" aria-label="Rust 学习阶段">
          {PHASES.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={phaseIndex === index} onClick={() => setPhaseIndex(index)} className={`min-h-12 border-b border-r border-border px-2 text-xs last:border-r-0 sm:border-b-0 ${phaseIndex === index ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{item.label}</button>
          ))}
        </div>
        <div className="mt-4 grid min-h-[26rem] gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <section className="border border-border bg-bg p-4">
            <span className="text-xs text-secondary">{phase.range} · official order</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{phase.label}</h3>
            <p className="mt-4 text-sm leading-7 text-secondary">{phase.purpose}</p>
            <div className="mt-5 border border-cyan-500/30 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">exit gate</span><p className="mt-2 text-sm leading-6 text-primary">{phase.gate}</p></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs"><div className="border border-border p-3 text-primary">输入<br /><strong>{phase.chapters.length} 章</strong></div><div className="border border-border p-3 text-primary">证据<br /><strong>解释+代码</strong></div><div className="border border-border p-3 text-primary">输出<br /><strong>下一阶段</strong></div></div>
          </section>
          <section className="grid content-start gap-3 border border-border bg-bg p-4 sm:grid-cols-2" aria-live="polite">
            {phase.chapters.map(([number, title, concepts]) => (
              <div key={number} className="min-h-28 border border-border bg-elevated p-3">
                <span className="text-xs text-secondary">Chapter {number}</span>
                <strong className="mt-2 block text-sm text-primary">{title}</strong>
                <span className="mt-3 block text-xs leading-5 text-secondary">{concepts}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">五段路径只用于形成学习门禁；21 个章节的编号、标题和先后顺序保持官方目录不变。</figcaption>
    </figure>
  );
}

const DEPENDENCIES = {
  ownership: {
    label: "借用与生命周期",
    start: "Ch 4 ownership",
    chain: ["owner 决定 value 存活", "borrow 暂借访问权", "lifetime 描述引用关系", "compiler 拒绝 dangling reference"],
    evidence: "能解释 move error，并分别用 borrow、clone 或 ownership return 修复。",
  },
  abstraction: {
    label: "Trait 抽象与工程",
    start: "Ch 7-10 module/type boundary",
    chain: ["privacy 收束 representation", "generic parameter 表达复用", "trait bound 证明能力", "tests/docs 固化 public contract"],
    evidence: "能设计一个不泄漏内部结构、且有 unit/integration/doc tests 的 crate API。",
  },
  concurrency: {
    label: "并发共享状态",
    start: "Ch 4 + Ch 15 ownership graph",
    chain: ["move 把 owner 送入 thread", "Arc 提供多 owner", "MutexGuard 提供独占访问", "Send/Sync 限制跨线程类型"],
    evidence: "能区分 data race、deadlock 与 contention，并标出 guard 的准确 Drop 点。",
  },
  server: {
    label: "最终 Web Server",
    start: "Ch 9 + Ch 13 + Ch 16",
    chain: ["TcpStream 成为 owned input", "FnOnce Job 进入 channel", "Worker 有界消费 queue", "Drop sender + recv Err + join 完成关闭"],
    evidence: "能证明每个 Job 最多执行一次、锁不跨 job、shutdown 不 deadlock。",
  },
} as const;

type DependencyKey = keyof typeof DEPENDENCIES;

export function RplLearningDependencyLab() {
  const [selected, setSelected] = useState<DependencyKey>("ownership");
  const dependency = DEPENDENCIES[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="Rust 概念依赖链">
          {(Object.keys(DEPENDENCIES) as DependencyKey[]).map((key, index) => (
            <button key={key} type="button" aria-pressed={selected === key} onClick={() => setSelected(key)} className={`min-h-12 px-2 text-xs sm:text-sm ${index < 3 ? "border-r border-border" : ""} ${selected === key ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{DEPENDENCIES[key].label}</button>
          ))}
        </div>
        <div className="mt-4 min-h-[24rem] border border-border bg-bg p-4" aria-live="polite">
          <span className="text-xs text-secondary">dependency origin</span>
          <h3 className="mt-2 text-base font-semibold text-primary">{dependency.start}</h3>
          <div className="mt-5 grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {dependency.chain.map((item, index) => (
              <div key={item} className="contents">
                <div className="min-h-20 border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm leading-6 text-primary"><span className="mb-2 block text-xs text-secondary">step {index + 1}</span>{item}</div>
                {index < dependency.chain.length - 1 ? <span className="hidden text-center text-secondary lg:block">-&gt;</span> : null}
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-[0.7fr_1.3fr]"><div className="border border-border bg-elevated p-3"><span className="text-xs text-secondary">reading rule</span><strong className="mt-2 block text-sm text-primary">缺前置则回退，不靠背答案跨章</strong></div><div className="border border-emerald-500/30 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">observable evidence</span><p className="mt-2 text-sm leading-6 text-primary">{dependency.evidence}</p></div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Rust 概念不是平铺词表：后续类型、并发和 server lifecycle 都复用前面建立的 ownership 与 boundary contract。</figcaption>
    </figure>
  );
}

export function RplLearningGateLab() {
  const [completed, setCompleted] = useState(9);
  const [canExplain, setCanExplain] = useState(true);
  const [canImplement, setCanImplement] = useState(false);
  const [canDiagnose, setCanDiagnose] = useState(false);
  const evidenceCount = Number(canExplain) + Number(canImplement) + Number(canDiagnose);
  const progress = Math.round((completed / 21) * 100);
  const gateScore = Math.round(progress * 0.4 + (evidenceCount / 3) * 60);
  const nextPhase = PHASES.find((phase) => Number(phase.range.match(/\d+$/)?.[0] ?? 21) >= completed + 1) ?? PHASES[4];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[24rem] gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">completed official chapters：{completed}/21<input type="range" min="0" max="21" value={completed} onChange={(event) => setCompleted(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={canExplain} onChange={(event) => setCanExplain(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />能不用术语堆砌解释因果链</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={canImplement} onChange={(event) => setCanImplement(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />能从空项目实现最小正确版本</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={canDiagnose} onChange={(event) => setCanDiagnose(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />能从 compiler/test 证据定位失败边界</label>
          </section>
          <section className={`border p-4 ${gateScore >= 80 ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">mastery gate</span>
            <div className="mt-3 flex items-end justify-between gap-4"><strong className="text-3xl text-primary">{gateScore}</strong><span className="text-sm text-secondary">progress {progress}% · evidence {evidenceCount}/3</span></div>
            <div className="mt-4 h-3 border border-border bg-bg"><div className={`h-full ${gateScore >= 80 ? "bg-emerald-500/70" : "bg-amber-500/70"}`} style={{ width: `${gateScore}%` }} /></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">current / next stage</span><strong className="mt-2 block text-sm text-primary">{completed === 21 ? "全书综合复习" : nextPhase.label}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">decision</span><strong className="mt-2 block text-sm text-primary">{gateScore >= 80 ? "可进入综合题" : "补齐最弱证据"}</strong></div></div>
            <p className="mt-5 text-sm leading-7 text-secondary">{gateScore >= 80 ? "章节数量与解释、实现、诊断证据同时达标。继续时仍保留失败日志和测试，让掌握程度可复核。" : !canImplement ? "阅读完成率不能替代实现证据。选当前阶段的一个最小项目，从空目录重建并让测试通过。" : !canDiagnose ? "补一个故意失败的 ownership、test 或 concurrency case，先预测 compiler/runtime evidence，再修复。" : "回到尚未完成章节，按官方顺序补齐概念与练习。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">完成率只表示覆盖；可解释、可实现、可诊断三类证据共同决定能否跨过学习门禁。</figcaption>
    </figure>
  );
}
