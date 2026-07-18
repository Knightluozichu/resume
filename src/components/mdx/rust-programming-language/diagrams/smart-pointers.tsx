"use client";

import { useState } from "react";

export function RplBoxIndirectionLab() {
  const [boxedTail, setBoxedTail] = useState(true);
  const [derefLayers, setDerefLayers] = useState(2);
  const [dropEarly, setDropEarly] = useState(false);
  const finite = boxedTail;
  const coercion = ["MyBox<String>", "String", "str"].slice(0, Math.min(3, derefLayers + 1));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[27rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={boxedTail} onChange={(event) => setBoxedTail(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />Cons tail 使用 Box&lt;List&gt;</label>
            <label className="block text-sm text-primary">Deref 层数：{derefLayers}<input type="range" min="1" max="3" value={derefLayers} onChange={(event) => setDerefLayers(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={dropEarly} onChange={(event) => setDropEarly(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />在作用域结束前 `drop(value)`</label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{boxedTail ? "enum List { Cons(i32, Box<List>), Nil }" : "enum List { Cons(i32, List), Nil }"}</code>
          </section>

          <section className={`border p-4 ${finite ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">布局、Deref 与清理</span>
            <h3 className="mt-3 text-base font-semibold text-primary">{finite ? "List 有编译期已知大小" : "E0072：递归类型具有无限大小"}</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-bg p-3 text-center text-xs text-primary">stack: i32 + pointer</div><div className="self-center text-center text-secondary">-&gt;</div><div className="border border-border bg-bg p-3 text-center text-xs text-primary">heap: next List</div></div>
            <div className="mt-5 border border-border bg-bg p-4"><span className="text-xs text-secondary">函数期望 &amp;str 时的 coercion chain</span><div className="mt-3 flex flex-wrap items-center gap-2">{coercion.map((item, index) => <span key={item} className="border border-border bg-elevated px-3 py-2 text-xs text-primary">{index > 0 ? "deref -> " : ""}{item}</span>)}</div><p className="mt-3 text-xs text-secondary">Deref::deref 返回引用，避免把 inner value 从 smart pointer 中 move 出。</p></div>
            <div className="mt-4 border border-border bg-bg p-4"><span className="text-xs text-secondary">Drop 时机</span><strong className="mt-2 block text-sm text-primary">{dropEarly ? "std::mem::drop 消费 value 后立即清理" : "作用域结束时编译器自动调用 Drop"}</strong><p className="mt-2 text-xs text-secondary">不能显式调用 `value.drop()`；否则自动清理会产生双重析构风险。</p></div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Box 以固定大小指针打断递归布局；Deref 借出目标；Drop 把资源清理绑定到所有权结束。</figcaption>
    </figure>
  );
}

export function RplRcRefCellLab() {
  const [owners, setOwners] = useState(2);
  const [sharedBorrows, setSharedBorrows] = useState(1);
  const [mutableBorrow, setMutableBorrow] = useState(false);
  const [secondMutable, setSecondMutable] = useState(false);
  const validBorrow = mutableBorrow ? sharedBorrows === 0 && !secondMutable : true;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[27rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">Rc strong owners：{owners}<input type="range" min="1" max="4" value={owners} onChange={(event) => setOwners(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">活动 Ref（共享借用）：{sharedBorrows}<input type="range" min="0" max="3" value={sharedBorrows} onChange={(event) => setSharedBorrows(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={mutableBorrow} onChange={(event) => setMutableBorrow(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />活动 RefMut</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={secondMutable} disabled={!mutableBorrow} onChange={(event) => setSecondMutable(event.target.checked)} className="h-4 w-4 accent-[var(--accent)] disabled:opacity-45" />再申请一个 RefMut</label>
          </section>

          <section className={`border p-4 ${validBorrow ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">Rc&lt;RefCell&lt;T&gt;&gt; 的两本账</span>
            <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">所有权账本</span><strong className="mt-2 block text-lg text-primary">strong_count = {owners}</strong><p className="mt-2 text-xs text-secondary">Rc::clone 只增加计数；降到 0 才清理 T。</p></div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">运行时借用账本</span><strong className="mt-2 block text-lg text-primary">Ref {sharedBorrows} · RefMut {mutableBorrow ? secondMutable ? 2 : 1 : 0}</strong><p className="mt-2 text-xs text-secondary">many shared 或 one mutable，不能同时存在。</p></div></div>
            <h3 className="mt-5 text-base font-semibold text-primary">{validBorrow ? "borrow / borrow_mut 成功" : "运行时 panic：already borrowed"}</h3>
            <p className="mt-3 text-sm text-secondary">{validBorrow ? "Ref/RefMut guard 离开作用域时归还借用；外层 Rc 允许多个 owner 看见同一内部值。" : "代码能编译，但 RefCell 的安全 API 在运行时拒绝冲突借用；应缩短 guard 作用域或重组访问顺序。"}</p>
            <code className="mt-4 block border border-border bg-bg p-3 text-xs leading-6 text-primary">let shared = Rc::new(RefCell::new(value));{mutableBorrow ? "\n*shared.borrow_mut() += 1;" : "\nlet value = shared.borrow();"}</code>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Rc 解决单线程多 owner，RefCell 把借用检查推迟到运行时；组合后两套规则都必须满足。</figcaption>
    </figure>
  );
}

type ParentEdge = "strong" | "weak";

export function RplWeakCycleLab() {
  const [parentEdge, setParentEdge] = useState<ParentEdge>("weak");
  const [parentAlive, setParentAlive] = useState(true);
  const branchStrong = parentAlive ? parentEdge === "strong" ? 2 : 1 : parentEdge === "strong" ? 1 : 0;
  const branchWeak = parentEdge === "weak" ? 1 : 0;
  const leaked = !parentAlive && parentEdge === "strong";
  const upgrade = parentEdge === "weak" ? parentAlive ? "Some(Rc<Node>)" : "None" : "不需要 upgrade：本身就是 Rc";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="child 到 parent 的边类型"><button type="button" aria-pressed={parentEdge === "strong"} onClick={() => { setParentEdge("strong"); setParentAlive(true); }} className={`min-h-11 border-r border-border text-sm ${parentEdge === "strong" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>Rc 强 parent</button><button type="button" aria-pressed={parentEdge === "weak"} onClick={() => { setParentEdge("weak"); setParentAlive(true); }} className={`min-h-11 text-sm ${parentEdge === "weak" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>Weak parent</button></div>

        <div className="mt-5 grid min-h-[25rem] gap-4 lg:grid-cols-[1.2fr_0.85fr]">
          <section className="border border-border bg-bg p-4">
            <span className="text-xs text-secondary">树的所有权图</span>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center"><div className="border border-cyan-500/40 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">parent / branch</strong><p className="mt-2 text-xs text-secondary">children: Rc&lt;child&gt;</p></div><div className="space-y-3 text-xs text-secondary"><div>strong -&gt;</div><div>&lt;- {parentEdge}</div></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">child / leaf</strong><p className="mt-2 text-xs text-secondary">parent: {parentEdge === "weak" ? "Weak<parent>" : "Rc<parent>"}</p></div></div>
            <button type="button" onClick={() => setParentAlive(false)} disabled={!parentAlive} className="mt-6 min-h-11 w-full border border-primary bg-primary px-3 text-sm text-bg disabled:opacity-45">丢弃外部 parent owner</button>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div className="border border-border bg-elevated p-3"><span className="text-secondary">branch counts</span><strong className="mt-2 block text-primary">strong {branchStrong} · weak {branchWeak}</strong></div><div className="border border-border bg-elevated p-3"><span className="text-secondary">child.parent.upgrade()</span><strong className="mt-2 block break-words text-primary">{upgrade}</strong></div></div>
          </section>

          <section className={`border p-4 ${leaked ? "border-rose-500/40 bg-rose-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">Drop 可达性</span><h3 className="mt-4 text-base font-semibold text-primary">{parentAlive ? "图仍由外部 owner 持有" : leaked ? "strong cycle：计数不归零，内存泄漏" : "parent strong_count 归零并被 Drop"}</h3><p className="mt-4 text-sm text-secondary">{parentEdge === "strong" ? "parent 拥有 child，child 又拥有 parent；两个方向都计入 strong_count，外部变量消失后环仍自持。" : "parent 强拥有 child，child 只观察 parent。Weak 不阻止清理，访问前必须 upgrade 并处理 None。"}</p><p className="mt-5 border-t border-border pt-4 text-xs text-secondary">Rust 阻止悬空访问，但 reference cycle 是内存安全的逻辑泄漏，需要用所有权建模、测试和 review 预防。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Strong edge 表示 owner，Weak edge 表示可失效观察者；让反向 parent 边为 Weak 可打断引用环。</figcaption>
    </figure>
  );
}
