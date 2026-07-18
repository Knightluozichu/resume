"use client";

import { useMemo, useState } from "react";

const ownershipModes = {
  move: {
    label: "move",
    source: "s1 invalid",
    target: "s2 owns buffer A",
    heap: ["buffer A: hello"],
    cost: "复制 ptr/len/cap，堆数据不复制",
    drop: "s2 离开作用域时释放 A",
    tone: "border-cyan-500/40 bg-cyan-500/10",
  },
  clone: {
    label: "clone",
    source: "s1 owns buffer A",
    target: "s2 owns buffer B",
    heap: ["buffer A: hello", "buffer B: hello"],
    cost: "分配并复制堆字节，开销显式",
    drop: "s2 释放 B，s1 释放 A",
    tone: "border-amber-500/40 bg-amber-500/10",
  },
  copy: {
    label: "Copy",
    source: "x = 5 remains valid",
    target: "y = 5 independent",
    heap: ["无堆缓冲：值完整位于绑定表示中"],
    cost: "按位复制小型值",
    drop: "无自定义 Drop 资源",
    tone: "border-emerald-500/40 bg-emerald-500/10",
  },
  replace: {
    label: "replace",
    source: "s re-bound to buffer B",
    target: "old buffer A dropped now",
    heap: ["buffer A: freed", "buffer B: ahoy"],
    cost: "新值赋给原绑定前清理旧值",
    drop: "作用域末尾再释放 B",
    tone: "border-rose-500/40 bg-rose-500/10",
  },
} as const;

type OwnershipMode = keyof typeof ownershipModes;

export function RplOwnershipTransferLab() {
  const [mode, setMode] = useState<OwnershipMode>("move");
  const selected = ownershipModes[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="所有权操作">
          {(Object.keys(ownershipModes) as OwnershipMode[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}
            >
              {ownershipModes[item].label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            <section className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">source binding</span>
              <strong className="mt-3 block text-sm text-primary">{selected.source}</strong>
              <code className="mt-5 block text-xs text-secondary">ptr · len · cap / scalar bits</code>
            </section>
            <section className={`min-h-36 border p-4 ${selected.tone}`}>
              <span className="text-xs text-secondary">target / replacement</span>
              <strong className="mt-3 block text-sm text-primary">{selected.target}</strong>
              <code className="mt-5 block text-xs text-secondary">{selected.label}</code>
            </section>
            <section className="min-h-36 border border-border bg-bg p-4 sm:col-span-2">
              <span className="text-xs text-secondary">heap state</span>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {selected.heap.map((item) => (
                  <div key={item} className="min-h-10 border border-border px-3 py-2 font-mono text-xs text-primary">{item}</div>
                ))}
              </div>
            </section>
          </div>

          <section className={`min-h-72 border p-4 ${selected.tone}`} aria-live="polite">
            <span className="text-xs text-secondary">所有权结论</span>
            <h3 className="mt-2 text-base font-semibold text-primary">{selected.cost}</h3>
            <dl className="mt-7 space-y-5 text-sm">
              <div>
                <dt className="text-secondary">释放责任</dt>
                <dd className="mt-1 text-primary">{selected.drop}</dd>
              </div>
              <div>
                <dt className="text-secondary">编译期保证</dt>
                <dd className="mt-1 text-primary">同一资源只有一条有效释放路径，不发生 double free。</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        move 转移释放责任，clone 建立独立资源，Copy 复制无需清理的小值，替换绑定会先 drop 原值。
      </figcaption>
    </figure>
  );
}

type BorrowKind = "shared" | "mutable";

export function RplBorrowCheckerLab() {
  const [shared, setShared] = useState(2);
  const [mutable, setMutable] = useState(false);
  const [useSharedAfterWrite, setUseSharedAfterWrite] = useState(false);

  const sharedLive = shared > 0 && (useSharedAfterWrite || !mutable);
  const accepted = !mutable || !sharedLive;
  const reason = accepted
    ? mutable
      ? "共享借用已在最后一次使用后结束，可建立独占可变借用"
      : `${shared} 个共享借用可同时读取`
    : "E0502: 共享借用仍活跃时不能建立可变借用";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-80 gap-5 lg:grid-cols-[1fr_1.25fr]">
          <div className="space-y-5 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              共享引用 &amp;T：<strong>{shared}</strong>
              <input
                type="range"
                min="0"
                max="4"
                value={shared}
                onChange={(event) => setShared(Number(event.target.value))}
                className="mt-2 w-full accent-[var(--accent)]"
              />
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input type="checkbox" checked={mutable} onChange={(event) => setMutable(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              建立一个 &amp;mut T
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input type="checkbox" checked={useSharedAfterWrite} onChange={(event) => setUseSharedAfterWrite(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              写借用后仍使用旧 &amp;T
            </label>
          </div>

          <div className="grid grid-rows-[1fr_auto] gap-4">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="min-h-44 border border-cyan-500/40 bg-cyan-500/10 p-4">
                <span className="text-xs text-secondary">shared readers</span>
                <strong className="mt-2 block text-2xl text-primary">{shared}</strong>
                <p className="mt-4 text-xs text-secondary">只能读取；多个可共存</p>
              </div>
              <span aria-hidden="true" className="text-xl text-secondary">⇄</span>
              <div className={`min-h-44 border p-4 ${mutable ? "border-amber-500/40 bg-amber-500/10" : "border-border bg-bg"}`}>
                <span className="text-xs text-secondary">exclusive writer</span>
                <strong className="mt-2 block text-2xl text-primary">{mutable ? 1 : 0}</strong>
                <p className="mt-4 text-xs text-secondary">可读写；必须独占</p>
              </div>
            </div>
            <section className={`min-h-24 border p-4 ${accepted ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
              <strong className="text-sm text-primary">{accepted ? "编译通过" : "编译拒绝"}</strong>
              <p className="mt-2 text-xs text-secondary">{reason}</p>
            </section>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        任意时刻可以有多个共享引用，或一个可变引用；NLL 按最后一次使用缩短实际重叠范围。
      </figcaption>
    </figure>
  );
}

const sample = "hello world";

export function RplSliceViewLab() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [ownerAlive, setOwnerAlive] = useState(true);

  const normalizedEnd = Math.max(start, end);
  const view = ownerAlive ? sample.slice(start, normalizedEnd) : "<dangling rejected>";
  const bytes = useMemo(() => [...new TextEncoder().encode(sample)], []);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-80 gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <div className="grid grid-cols-11 gap-1" aria-label="hello world 字节视图">
              {bytes.map((byte, index) => (
                <div
                  key={`${byte}-${index}`}
                  className={`grid aspect-square min-w-0 place-items-center border text-[10px] ${
                    ownerAlive && index >= start && index < normalizedEnd
                      ? "border-emerald-500 bg-emerald-500/15 text-primary"
                      : "border-border bg-bg text-secondary"
                  }`}
                >
                  {sample[index] === " " ? "_" : sample[index]}
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-primary">
                start：{start}
                <input type="range" min="0" max="10" value={start} onChange={(event) => setStart(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
              </label>
              <label className="text-sm text-primary">
                end：{normalizedEnd}
                <input type="range" min={start} max="11" value={normalizedEnd} onChange={(event) => setEnd(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
              </label>
            </div>

            <label className="mt-5 flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary">
              <input type="checkbox" checked={ownerAlive} onChange={(event) => setOwnerAlive(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              String owner 仍存活
            </label>
          </div>

          <section className={`min-h-72 border p-4 ${ownerAlive ? "border-cyan-500/40 bg-cyan-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">&amp;str view</span>
            <code className="mt-3 block text-lg text-primary">&amp;s[{start}..{normalizedEnd}]</code>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-secondary">offset / length</dt>
                <dd className="mt-1 font-mono text-primary">{start} / {normalizedEnd - start}</dd>
              </div>
              <div>
                <dt className="text-secondary">内容</dt>
                <dd className="mt-1 break-words font-mono text-primary">{view || "<empty>"}</dd>
              </div>
              <div>
                <dt className="text-secondary">所有权</dt>
                <dd className="mt-1 text-primary">slice 不拥有字节，借用检查器要求原 String 覆盖整个视图生命周期。</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        slice 保存起点和长度并借用原数据；owner 被释放或可变修改破坏视图时，编译器拒绝悬空关系。
      </figcaption>
    </figure>
  );
}
