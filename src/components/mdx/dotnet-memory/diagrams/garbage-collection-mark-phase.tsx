"use client";

import { useState } from "react";

type RootKind = "stack" | "static" | "strong" | "finalization" | "weak";

const rootKinds: Array<{
  id: RootKind;
  label: string;
  keepsAlive: boolean;
  startsAt: string;
  detail: string;
}> = [
  { id: "stack", label: "栈/寄存器", keepsAlive: true, startsAt: "Request", detail: "JIT GC info 与 stack walker 只报告当前安全点仍活跃的托管引用。" },
  { id: "static", label: "静态字段", keepsAlive: true, startsAt: "Cache", detail: "运行时枚举静态存储中的强引用，常是长期保留链的起点。" },
  { id: "strong", label: "强/固定句柄", keepsAlive: true, startsAt: "Buffer", detail: "强句柄保持对象可达；固定句柄还要求本次回收不要移动目标。" },
  { id: "finalization", label: "终结处理", keepsAlive: true, startsAt: "NativeOwner", detail: "首次发现不可达的可终结对象会转入待终结集合，并为执行终结器多存活一轮。" },
  { id: "weak", label: "弱句柄", keepsAlive: false, startsAt: "Preview", detail: "弱句柄允许观察目标，但自身不应把目标加入强可达闭包。" },
];

const graphNodes = [
  { id: "Request", column: 1, tone: "border-cyan-500/35 bg-cyan-500/10" },
  { id: "Controller", column: 2, tone: "border-violet-500/35 bg-violet-500/10" },
  { id: "Repository", column: 3, tone: "border-emerald-500/35 bg-emerald-500/10" },
  { id: "Cache", column: 1, tone: "border-amber-500/35 bg-amber-500/10" },
  { id: "Buffer", column: 2, tone: "border-rose-500/35 bg-rose-500/10" },
  { id: "NativeOwner", column: 3, tone: "border-orange-500/35 bg-orange-500/10" },
  { id: "Preview", column: 2, tone: "border-border bg-background/60" },
] as const;

export function DnmRootReachabilityMap() {
  const [active, setActive] = useState<RootKind>("stack");
  const selected = rootKinds.find((root) => root.id === active) ?? rootKinds[0];
  const liveNodes = selected.keepsAlive
    ? selected.startsAt === "Request"
      ? new Set(["Request", "Controller", "Repository"])
      : selected.startsAt === "Cache"
        ? new Set(["Cache", "Buffer"])
        : new Set([selected.startsAt])
    : new Set<string>();

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择一种 GC 根来源" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {rootKinds.map((root) => (
            <button key={root.id} type="button" role="tab" aria-selected={active === root.id} onClick={() => setActive(root.id)} className={`min-h-12 border px-2 py-2 text-sm transition-colors ${active === root.id ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {root.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.72fr]">
          <div role="img" aria-label="不同 GC 根进入对象图后形成的强可达闭包" className="grid min-h-80 grid-cols-3 gap-3 border border-border bg-background/60 p-4">
            {graphNodes.map((node) => (
              <div key={node.id} style={{ gridColumn: node.column }} className={`flex min-h-16 items-center justify-center border p-2 text-center text-xs ${liveNodes.has(node.id) ? `${node.tone} text-primary` : "border-border bg-elevated text-secondary opacity-50"}`}>
                {node.id}
              </div>
            ))}
          </div>
          <section role="tabpanel" className="min-h-80 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">root source</span>
            <strong className="mt-2 block text-lg text-primary">{selected.label}</strong>
            <p className="mt-4 text-sm text-secondary">{selected.detail}</p>
            <div className={`mt-5 border p-3 text-xs ${selected.keepsAlive ? "border-emerald-500/35 bg-emerald-500/10 text-primary" : "border-rose-500/35 bg-rose-500/10 text-secondary"}`}>
              {selected.keepsAlive ? `从 ${selected.startsAt} 开始标记其强引用闭包` : "不进入强标记起点；目标若无其他强路径即可回收"}
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换根来源观察可达闭包；“字段里还有地址”不等于强根，弱句柄与终结处理也有各自的标记语义。
      </figcaption>
    </figure>
  );
}

const traversal = [
  { current: "roots", marked: ["A"], stack: ["A"], note: "枚举根 R → A，A 首次置为 marked 并压入工作栈。" },
  { current: "A", marked: ["A", "B", "C"], stack: ["B", "C"], note: "扫描 A 的引用字段，发现 B 与 C；方法表/GC 描述告诉运行时哪些字段是引用。" },
  { current: "C", marked: ["A", "B", "C", "D"], stack: ["B", "D"], note: "弹出 C，发现 D；D 首次被标记，因此只入栈一次。" },
  { current: "D", marked: ["A", "B", "C", "D"], stack: ["B"], note: "D 指回 A，但 A 已标记；循环不会导致无限遍历。" },
  { current: "B", marked: ["A", "B", "C", "D"], stack: [], note: "B 指向 D，D 已标记；工作栈清空，强可达闭包完成。" },
  { current: "done", marked: ["A", "B", "C", "D"], stack: [], note: "E 未被任何根或已标记对象到达，因此不属于 live set；后续阶段决定如何回收其空间。" },
] as const;

export function DnmMarkTraversalLab() {
  const [step, setStep] = useState(0);
  const state = traversal[step];
  const marked = new Set<string>(state.marked);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">
          标记步骤：{step + 1}/{traversal.length}
          <input type="range" min="0" max={traversal.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} className="mt-2 w-full accent-cyan-500" />
        </label>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div role="img" aria-label="带循环对象图的标记栈逐步遍历" className="grid min-h-72 grid-cols-3 gap-3 border border-border bg-background/60 p-4">
            {["A", "B", "C", "D", "E"].map((node, index) => (
              <div key={node} className={`flex min-h-20 items-center justify-center border text-sm ${marked.has(node) ? "border-emerald-500/45 bg-emerald-500/15 text-primary" : "border-border bg-elevated text-secondary"} ${state.current === node ? "ring-2 ring-cyan-500" : ""} ${index === 3 ? "col-start-2" : ""}`}>
                {node} {marked.has(node) ? "· marked" : "· unmarked"}
              </div>
            ))}
          </div>
          <section aria-live="polite" className="min-h-72 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">mark work stack</span>
            <div className="mt-3 flex min-h-14 gap-2 border border-violet-500/35 bg-violet-500/10 p-3">
              {state.stack.length > 0 ? state.stack.map((node) => <span key={node} className="border border-violet-500/45 bg-background px-3 py-2 text-xs text-primary">{node}</span>) : <span className="text-xs text-secondary">empty</span>}
            </div>
            <p className="mt-5 text-sm text-secondary">{state.note}</p>
            <div className="mt-4 border border-border p-3 text-xs text-secondary">边：R→A · A→B/C · C→D · D→A · B→D · E 孤立</div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        拖动步骤观察标记工作栈；每个对象首次发现时才加入，标记位让共享子图和引用环都能终止。
      </figcaption>
    </figure>
  );
}

type BarrierCase = "old-young" | "old-old" | "young-young" | "clear";

const barrierCases: Array<{
  id: BarrierCase;
  label: string;
  assignment: string;
  dirtyCard: number | null;
  scan: string;
}> = [
  { id: "old-young", label: "老 → 年轻", assignment: "gen2.slot = gen0Object", dirtyCard: 3, scan: "写屏障把 slot 所在 card 置脏；年轻代 GC 扫该 card，发现进入 Gen 0 的引用。" },
  { id: "old-old", label: "老 → 老", assignment: "gen2.slot = anotherGen2", dirtyCard: 3, scan: "屏障可保守置脏，但低代回收扫描后不会把老对象误当作年轻目标。" },
  { id: "young-young", label: "年轻 → 年轻", assignment: "gen0.slot = anotherGen0", dirtyCard: null, scan: "源对象本就在本次年轻代扫描范围内，不需要靠老代 card 找到这条边。" },
  { id: "clear", label: "老 → null", assignment: "gen2.slot = null", dirtyCard: 3, scan: "清空也经过引用写入路径；保守脏卡允许短暂假阳性，下一轮扫描后会被清理。" },
];

export function DnmCardTableLab() {
  const [active, setActive] = useState<BarrierCase>("old-young");
  const selected = barrierCases.find((item) => item.id === active) ?? barrierCases[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择代际引用写入场景" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {barrierCases.map((item) => (
            <button key={item.id} type="button" role="tab" aria-selected={active === item.id} onClick={() => setActive(item.id)} className={`min-h-12 border px-2 py-2 text-sm transition-colors ${active === item.id ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4">
          <code className="block break-words text-sm text-accent">{selected.assignment}</code>
          <div className="mt-5 grid grid-cols-6 gap-1">
            {[0, 1, 2, 3, 4, 5].map((card) => (
              <div key={card} className={`flex min-h-20 flex-col items-center justify-center border text-xs ${selected.dirtyCard === card ? "border-rose-500/45 bg-rose-500/20 text-primary" : "border-border bg-elevated text-secondary"}`}>
                <span>card {card}</span>
                <strong className="mt-2">{selected.dirtyCard === card ? "DIRTY" : "clean"}</strong>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="border border-violet-500/35 bg-violet-500/10 p-3 text-xs text-secondary">Gen 2 源区域</div>
            <div className="border border-amber-500/35 bg-amber-500/10 p-3 text-xs text-secondary">write barrier 更新 remembered set</div>
            <div className="border border-cyan-500/35 bg-cyan-500/10 p-3 text-xs text-secondary">ephemeral GC 只补扫脏 card</div>
          </div>
          <p className="mb-0 mt-4 border-t border-border pt-4 text-sm text-secondary">{selected.scan}</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        卡表按地址区间保守记录“这里可能有老到新的边”，它是缩小扫描范围的 remembered set，不是一份精确对象清单。
      </figcaption>
    </figure>
  );
}
