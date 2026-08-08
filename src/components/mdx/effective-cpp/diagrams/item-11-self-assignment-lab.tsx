"use client";

import { useState } from "react";

type AssignmentScenario = {
  label: string;
  observation: string;
  decision: string;
  evidence: string;
};

const SCENARIOS: readonly AssignmentScenario[] = [
  {
    label: "assignment to self / operator=",
    observation: "直接写成 x = x，或通过两个 pointer/reference alias 让左右最终指向同一个对象；delete-before-copy 会先摧毁 rhs 仍要读取的资源。",
    decision: "把 operator= 的读取与写入分开，先确认 alias 风险，再选择 identity test 或独立 candidate；不要让不同调用点名称掩盖同一地址。",
    evidence: "同时运行 x = x、*left = *right、Base& alias 和资源计数断言；旧实现出现 dangling pointer，候选提交后源仍可读且最终只释放一次。",
  },
  {
    label: "identity test",
    observation: "this == &rhs 时立即返回能挡住最直接的自赋值，但不能识别跨类型 string_view、子对象或重叠存储，也不能修复 new 失败后的悬空状态。",
    decision: "把 identity test 当作局部防护，而不是异常安全策略；对可能重分配的源，先构造不依赖目标旧存储的 candidate。",
    evidence: "注入 candidate 分配异常并覆盖 pointer/reference/base alias；identity test 只跳过相同地址，copy-before-delete 才保持目标值不变。",
  },
  {
    label: "copy and swap / copy-swap",
    observation: "按值参数先完成 copy 或 move，再用 no-throw swap 提交；候选构造失败时 this 尚未改变，旧资源由临时对象析构。",
    decision: "用 copy and swap 统一多成员提交；若改用 capacity-reuse assignment，也必须先处理重叠并证明 no-throw commit 与成本收益。",
    evidence: "比较 self-assignment、异常注入和 self-move：成功后目标保持不变量，失败后旧值可观察，析构和重新赋值都不会重复释放。",
  },
];

export const OFFICIAL_CONCEPT_LABELS = [
  "assignment to self",
  "operator=",
  "identity test",
  "copy and swap",
  "copy-swap",
] as const;

export function EcppItem11SelfAssignmentMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 940 390"
          role="img"
          aria-label="assignment to self 与 operator= 的安全路径：先识别 alias，再用 identity test 或 copy and swap、copy-swap 准备候选并提交。"
          className="mx-auto block h-auto w-full max-w-[940px]"
        >
          <text x="470" y="32" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)">Self-assignment / candidate commit</text>
          <text x="470" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">先读取仍有效的源，再用不会破坏不变量的提交替换旧状态</text>
          <g>
            <rect x="24" y="88" width="204" height="118" rx="12" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.6" />
            <text x="126" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--danger)">assignment to self</text>
            <text x="126" y="149" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">operator=</text>
            <text x="126" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">direct / alias source</text>
          </g>
          <path d="M228 147 H250" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M242 140 L254 147 L242 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="256" y="88" width="204" height="118" rx="12" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.6" />
            <text x="358" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--warning)">identity test</text>
            <text x="358" y="151" textAnchor="middle" fontSize="12" fill="var(--text-primary)">this == &amp;rhs</text>
            <text x="358" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">local guard only</text>
          </g>
          <path d="M460 147 H482" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M474 140 L486 147 L474 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="488" y="88" width="204" height="118" rx="12" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.6" />
            <text x="590" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--accent)">copy and swap</text>
            <text x="590" y="151" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">copy-swap</text>
            <text x="590" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">prepare candidate</text>
          </g>
          <path d="M692 147 H714" stroke="var(--text-secondary)" strokeWidth="2" /><path d="M706 140 L718 147 L706 154" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <g>
            <rect x="720" y="88" width="196" height="118" rx="12" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.6" />
            <text x="818" y="121" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--success)">commit</text>
            <text x="818" y="151" textAnchor="middle" fontSize="12" fill="var(--text-primary)">no-throw swap</text>
            <text x="818" y="179" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">old state retires</text>
          </g>
          <line x1="24" y1="250" x2="916" y2="250" stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />
          <text x="140" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">aliasing</text>
          <text x="140" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">pointer / view / base</text>
          <text x="365" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">strong guarantee</text>
          <text x="365" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">失败时目标不变</text>
          <text x="595" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">self-move</text>
          <text x="595" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">有效且可析构</text>
          <text x="815" y="282" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">resource count</text>
          <text x="815" y="309" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">create / destroy 平衡</text>
          <text x="470" y="358" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">identity test 只挡直接同址；copy and swap / copy-swap 才把准备与提交分开</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">自赋值的关键不是变量名，而是源是否与目标别名；先准备独立候选，再以可证明的提交替换旧状态。</figcaption>
    </figure>
  );
}

export function EcppItem11SelfAssignmentLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showEvidence, setShowEvidence] = useState(false);
  const active = SCENARIOS[activeIndex];
  const reset = () => { setActiveIndex(0); setShowEvidence(false); };

  return (
    <section aria-label={`Item 11 assignment 实验：${OFFICIAL_CONCEPT_LABELS.join("、")}`} className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div><p className="text-xs font-medium text-accent">赋值别名实验</p><h2 className="mt-1 text-lg font-semibold text-primary">先预测：这个 operator= 会不会先摧毁源？</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">先判断左右是否别名，再切换策略查看 identity test 与候选提交的证据。</p></div>
        <button type="button" aria-label="重置实验" onClick={reset} className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">重置实验</button>
      </header>
      <div className="border-b border-border p-4"><div role="tablist" aria-label="Item 11 assignment 场景" className="grid gap-2 md:grid-cols-3">{SCENARIOS.map((scenario, index) => { const selected = index === activeIndex; return <button key={scenario.label} type="button" role="tab" aria-selected={selected} aria-pressed={selected} onClick={() => { setActiveIndex(index); setShowEvidence(false); }} className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}>{scenario.label}</button>; })}</div></div>
      <div className="grid gap-0 lg:grid-cols-2"><div className="border-b border-border p-4 lg:border-r lg:border-b-0"><p className="text-xs font-medium text-accent">观察</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.observation}</p><p className="mt-4 text-xs font-medium text-warning">决策</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><div className="p-4"><div role="status" aria-live="polite" className="rounded-control border border-border bg-bg p-4"><p className="text-xs font-medium text-accent">当前场景 · {active.label}</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.decision}</p></div><button type="button" aria-pressed={showEvidence} onClick={() => setShowEvidence((value) => !value)} className={`mt-3 min-h-11 w-full rounded-control border px-4 py-2 text-left text-sm font-medium transition-colors ${showEvidence ? "border-success bg-success/10 text-success" : "border-border text-secondary hover:border-success hover:text-primary"}`}>{showEvidence ? "收起 assignment 证据" : "查看 assignment 证据"}</button>{showEvidence && <div className="mt-3 rounded-control border border-success bg-bg p-4"><p className="text-xs font-medium text-success">应观察到</p><p className="mt-2 text-sm leading-relaxed text-primary">{active.evidence}</p></div>}</div></div>
    </section>
  );
}
