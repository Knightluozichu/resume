"use client";

import { useState } from "react";

type LifetimePath = "plain" | "finalizable" | "resurrected";

const lifetimePaths: Record<LifetimePath, Array<{ name: string; detail: string; tone: string }>> = {
  plain: [
    { name: "strongly reachable", detail: "根路径存在，普通对象保持 live", tone: "border-cyan-500/35 bg-cyan-500/10" },
    { name: "unreachable", detail: "最后强路径消失", tone: "border-amber-500/35 bg-amber-500/10" },
    { name: "collected", detail: "覆盖该代的 GC 可直接回收托管存储", tone: "border-emerald-500/35 bg-emerald-500/10" },
  ],
  finalizable: [
    { name: "registered", detail: "构造时登记终结处理", tone: "border-cyan-500/35 bg-cyan-500/10" },
    { name: "unreachable", detail: "无普通强根，但尚不能回收", tone: "border-amber-500/35 bg-amber-500/10" },
    { name: "f-reachable", detail: "进入待终结队列并为终结器多存活一轮", tone: "border-violet-500/35 bg-violet-500/10" },
    { name: "finalized", detail: "终结线程完成回调，等待后续 GC", tone: "border-rose-500/35 bg-rose-500/10" },
    { name: "collected", detail: "未复活时后续覆盖回收释放存储", tone: "border-emerald-500/35 bg-emerald-500/10" },
  ],
  resurrected: [
    { name: "f-reachable", detail: "对象已排队等待终结", tone: "border-violet-500/35 bg-violet-500/10" },
    { name: "finalizer runs", detail: "终结器把 this 写入静态强根", tone: "border-rose-500/35 bg-rose-500/10" },
    { name: "reachable again", detail: "对象复活；终结器默认不会自动再运行", tone: "border-cyan-500/35 bg-cyan-500/10" },
    { name: "unreachable later", detail: "静态根清除；若 ReRegisterForFinalize 则可能再次排队", tone: "border-amber-500/35 bg-amber-500/10" },
  ],
};

export function DnmLifetimeStateMap() {
  const [path, setPath] = useState<LifetimePath>("finalizable");
  const states = lifetimePaths[path];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择对象生命周期路径" className="grid grid-cols-3 gap-2">
          {(["plain", "finalizable", "resurrected"] as const).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={path === item} onClick={() => setPath(item)} className={`min-h-12 border px-2 py-2 text-sm transition-colors ${path === item ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item === "plain" ? "普通对象" : item === "finalizable" ? "可终结对象" : "对象复活"}
            </button>
          ))}
        </div>
        <div role="tabpanel" className={`mt-4 grid gap-3 ${states.length >= 5 ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-3"}`}>
          {states.map((state, index) => (
            <section key={`${state.name}-${index}`} className={`min-h-44 border p-4 ${state.tone}`}>
              <span className="text-xs text-secondary">state 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{state.name}</strong>
              <p className="mb-0 mt-4 text-xs text-secondary">{state.detail}</p>
            </section>
          ))}
        </div>
        <div className="mt-4 border border-border bg-background/60 p-4 text-xs text-secondary">
          Dispose 是独立的资源释放路径：它可在对象仍 strongly reachable 时发生，不等待上述可达性状态机。
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换普通、可终结与复活路径；终结器让对象至少多跨一次回收，而 Dispose 不负责回收托管对象存储。
      </figcaption>
    </figure>
  );
}

type HandleKind = "strong" | "weak" | "weak-long" | "dependent" | "pinned";

const handles: Array<{
  id: HandleKind;
  label: string;
  keyAlive: boolean;
  valueAlive: boolean;
  movable: boolean;
  detail: string;
}> = [
  { id: "strong", label: "Strong GCHandle", keyAlive: true, valueAlive: true, movable: true, detail: "句柄本身是强根，目标及其强引用闭包保持可达；对象仍可移动，句柄槽由 GC 更新。" },
  { id: "weak", label: "Weak", keyAlive: false, valueAlive: false, movable: true, detail: "不保持目标存活；目标首次判定不可达时即可清空，通常在终结器执行前观察不到它。" },
  { id: "weak-long", label: "TrackResurrection", keyAlive: false, valueAlive: false, movable: true, detail: "可在终结后、真正回收前短暂观察目标，但对象资源可能已释放，不适合作为继续使用契约。" },
  { id: "dependent", label: "Dependent handle", keyAlive: false, valueAlive: true, movable: true, detail: "Value 仅在 Key 通过其他强路径存活时被条件保活；Value 反向引用 Key 不应单独让 Key 永久存活。" },
  { id: "pinned", label: "Pinned GCHandle", keyAlive: true, valueAlive: true, movable: false, detail: "既是强根又要求地址稳定；释放句柄后不再固定，也不会自动延长业务所有权。" },
];

export function DnmHandleSemanticsLab() {
  const [active, setActive] = useState<HandleKind>("dependent");
  const selected = handles.find((handle) => handle.id === active) ?? handles[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 GC handle 语义" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {handles.map((handle) => (
            <button key={handle.id} type="button" role="tab" aria-selected={active === handle.id} onClick={() => setActive(handle.id)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${active === handle.id ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{handle.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-96 border border-border bg-background/60 p-4">
          <strong className="text-lg text-primary">{selected.label}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className={`min-h-28 border p-3 ${selected.keyAlive ? "border-emerald-500/35 bg-emerald-500/10" : "border-rose-500/35 bg-rose-500/10"}`}><span className="text-xs text-secondary">target/key</span><strong className="mt-2 block text-primary">{selected.keyAlive ? "kept alive" : "needs another strong root"}</strong></div>
            <div className={`min-h-28 border p-3 ${selected.valueAlive ? "border-cyan-500/35 bg-cyan-500/10" : "border-border bg-elevated"}`}><span className="text-xs text-secondary">value/closure</span><strong className="mt-2 block text-primary">{selected.valueAlive ? "conditional/strong closure" : "not retained"}</strong></div>
            <div className={`min-h-28 border p-3 ${selected.movable ? "border-violet-500/35 bg-violet-500/10" : "border-amber-500/45 bg-amber-500/15"}`}><span className="text-xs text-secondary">address</span><strong className="mt-2 block text-primary">{selected.movable ? "may move" : "pinned"}</strong></div>
          </div>
          <p className="mb-0 mt-5 border-t border-border pt-4 text-sm text-secondary">{selected.detail}</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换句柄类型比较“是否保活、是否跟踪终结后目标、是否固定地址”；SafeHandle 是资源包装器，不是这里的 GCHandle 类型。
      </figcaption>
    </figure>
  );
}

type Ownership = "raw-finalizer" | "dispose-pattern" | "safe-handle" | "async-dispose";

const ownershipModels: Record<Ownership, { label: string; deterministic: string; fallback: string; risk: string; sequence: string[] }> = {
  "raw-finalizer": { label: "裸 IntPtr + finalizer", deterministic: "需要手写 Dispose 才能确定释放", fallback: "自定义终结器", risk: "竞态、重复释放、继承链和异常处理复杂", sequence: ["acquire raw handle", "use", "Dispose?", "finalizer fallback", "native close"] },
  "dispose-pattern": { label: "IDisposable pattern", deterministic: "using/Dispose", fallback: "只有拥有裸资源时才需要终结器", risk: "必须幂等并正确处理基类/派生类", sequence: ["acquire", "use", "Dispose(true)", "SuppressFinalize", "released"] },
  "safe-handle": { label: "SafeHandle owner", deterministic: "using/Dispose wrapper", fallback: "SafeHandle 的可靠终结", risk: "必须明确 ownsHandle 与危险引用窗口", sequence: ["SafeHandle owns native", "use", "Dispose wrapper", "SafeHandle release", "released once"] },
  "async-dispose": { label: "IAsyncDisposable", deterministic: "await using/DisposeAsync", fallback: "通常仍由 SafeHandle 承担本机兜底", risk: "同步/异步双接口与异常路径要统一所有权", sequence: ["acquire async resource", "use", "await DisposeAsync", "flush/close", "released"] },
};

export function DnmResourceOwnershipLab() {
  const [active, setActive] = useState<Ownership>("safe-handle");
  const model = ownershipModels[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择资源所有权模型" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(ownershipModels) as Ownership[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={active === item} onClick={() => setActive(item)} className={`min-h-14 border px-2 py-2 text-sm transition-colors ${active === item ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{ownershipModels[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-96 border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-5">
            {model.sequence.map((stage, index) => <div key={`${stage}-${index}`} className="flex min-h-24 items-center justify-center border border-cyan-500/35 bg-cyan-500/10 p-3 text-center text-xs text-primary">{index + 1}. {stage}</div>)}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="border border-emerald-500/35 bg-emerald-500/10 p-3 text-xs"><span className="text-secondary">deterministic</span><p className="mb-0 mt-2 text-primary">{model.deterministic}</p></div>
            <div className="border border-violet-500/35 bg-violet-500/10 p-3 text-xs"><span className="text-secondary">fallback</span><p className="mb-0 mt-2 text-primary">{model.fallback}</p></div>
            <div className="border border-rose-500/35 bg-rose-500/10 p-3 text-xs"><span className="text-secondary">ownership risk</span><p className="mb-0 mt-2 text-primary">{model.risk}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        资源释放应由明确所有者确定性触发；终结器是遗漏 Dispose 的兜底，不是正常控制流，SafeHandle 封装一次释放更可靠。
      </figcaption>
    </figure>
  );
}
