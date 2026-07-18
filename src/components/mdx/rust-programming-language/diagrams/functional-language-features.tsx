"use client";

import { useMemo, useState } from "react";

type CaptureAction = "read" | "mutate" | "moveOut";

export function RplClosureCaptureLab() {
  const [action, setAction] = useState<CaptureAction>("read");
  const [forceMove, setForceMove] = useState(false);
  const [callCount, setCallCount] = useState(1);
  const closureTrait = action === "read" ? "Fn" : action === "mutate" ? "FnMut" : "FnOnce";
  const canCall = closureTrait !== "FnOnce" || callCount === 1;
  const outerAvailable = !forceMove && action !== "moveOut";
  const code = action === "read"
    ? `${forceMove ? "move " : ""}|| println!("{list:?}")`
    : action === "mutate"
      ? `${forceMove ? "move " : ""}|| list.push(7)`
      : `${forceMove ? "move " : ""}|| consume(list)`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="闭包对捕获值的操作">
          {([
            ["read", "只读"],
            ["mutate", "修改"],
            ["moveOut", "移出"],
          ] as const).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={action === value} onClick={() => setAction(value)} className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${action === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-5 grid min-h-96 gap-4 lg:grid-cols-[0.9fr_1.2fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input type="checkbox" checked={forceMove} onChange={(event) => setForceMove(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              使用 move 捕获所有权
            </label>
            <label className="block text-sm text-primary">
              调用次数：{callCount}
              <input type="range" min="1" max="3" value={callCount} onChange={(event) => setCallCount(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" />
            </label>
            <code className="block min-h-20 break-words border border-border bg-elevated p-3 text-xs leading-6 text-primary">{code}</code>
            <p className="text-xs leading-5 text-secondary">`move` 决定如何捕获；闭包体是否读、改或移出，决定实现哪个 Fn trait。</p>
          </section>

          <section className={`border p-4 ${canCall ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">编译器推导</span>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">最强可用 trait</span><strong className="mt-2 block text-xl text-primary">{closureTrait}</strong><p className="mt-2 text-xs text-secondary">{closureTrait === "Fn" ? "可反复调用且不改变捕获环境。" : closureTrait === "FnMut" ? "可反复调用，但调用需要可变闭包。" : "移出捕获值后只能调用一次。"}</p></div>
              <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">闭包外的 list</span><strong className="mt-2 block text-xl text-primary">{outerAvailable ? "仍可使用" : "所有权不可用"}</strong><p className="mt-2 text-xs text-secondary">{forceMove ? "move 已把 list 放入闭包环境。" : action === "moveOut" ? "执行时 list 被消费。" : "编译器只捕获满足闭包体的最小借用。"}</p></div>
            </div>
            <h3 className="mt-5 text-base font-semibold text-primary">{canCall ? `${callCount} 次调用满足约束` : "第二次调用会使用已移出的捕获值"}</h3>
            <p className="mt-3 text-sm text-secondary">Fn 闭包也实现 FnMut/FnOnce，FnMut 也实现 FnOnce；API 应声明自己真正需要的最弱调用约束，以接收更多闭包。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">捕获方式与调用 trait 是两次独立推导：move 不自动等于 FnOnce，移出捕获值才会限制为一次调用。</figcaption>
    </figure>
  );
}

type SourceMode = "iter" | "iterMut" | "intoIter";

const iteratorSource = [1, 2, 3, 4, 5];

export function RplIteratorStateLab() {
  const [sourceMode, setSourceMode] = useState<SourceMode>("iter");
  const [mapEnabled, setMapEnabled] = useState(true);
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [cursor, setCursor] = useState(0);
  const outputs = useMemo(() => {
    let values = iteratorSource.map((value) => ({ source: value, value }));
    if (mapEnabled) values = values.map((item) => ({ ...item, value: item.value + 1 }));
    if (filterEnabled) values = values.filter((item) => item.value % 2 === 0);
    return values;
  }, [filterEnabled, mapEnabled]);
  const current = outputs[cursor - 1];
  const complete = cursor > outputs.length;
  const itemType = sourceMode === "iter" ? "&i32" : sourceMode === "iterMut" ? "&mut i32" : "i32";

  function reset(nextMode?: SourceMode) {
    if (nextMode) setSourceMode(nextMode);
    setCursor(0);
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="迭代器所有权模式">
          {([
            ["iter", "iter"],
            ["iterMut", "iter_mut"],
            ["intoIter", "into_iter"],
          ] as const).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={sourceMode === value} onClick={() => reset(value)} className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${sourceMode === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-5 grid min-h-[27rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-3 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={mapEnabled} onChange={(event) => { setMapEnabled(event.target.checked); setCursor(0); }} className="h-4 w-4 accent-[var(--accent)]" />map：x + 1</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={filterEnabled} onChange={(event) => { setFilterEnabled(event.target.checked); setCursor(0); }} className="h-4 w-4 accent-[var(--accent)]" />filter：保留偶数</label>
            <div className="border border-border bg-elevated p-3 text-xs leading-6 text-secondary"><code className="text-primary">Item = {itemType}</code><p className="mt-2">{sourceMode === "intoIter" ? "iterator 消费集合并拥有每个元素。" : sourceMode === "iterMut" ? "iterator 逐项可变借用集合。" : "iterator 逐项不可变借用集合。"}</p></div>
            <button type="button" onClick={() => setCursor((value) => Math.min(outputs.length + 1, value + 1))} disabled={complete} className="min-h-11 w-full border border-primary bg-primary px-3 text-sm text-bg disabled:cursor-not-allowed disabled:opacity-45">调用 next()</button>
            <button type="button" onClick={() => setCursor(0)} className="min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary hover:border-primary">重置迭代器</button>
          </section>

          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">惰性 pipeline</span>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="border border-border bg-bg p-3"><span className="text-secondary">source</span><code className="mt-2 block text-primary">[1,2,3,4,5]</code></div>
              <div className="border border-border bg-bg p-3"><span className="text-secondary">adapters</span><code className="mt-2 block text-primary">{mapEnabled ? "map" : "identity"} + {filterEnabled ? "filter" : "all"}</code></div>
              <div className="border border-border bg-bg p-3"><span className="text-secondary">consumer</span><code className="mt-2 block text-primary">next</code></div>
            </div>
            <div className="mt-5 min-h-32 border border-border bg-bg p-4">
              <span className="text-xs text-secondary">本次返回</span>
              <strong className="mt-3 block font-mono text-xl text-primary">{cursor === 0 ? "尚未消费：closure 调用 0 次" : complete ? "None" : `Some(${current?.value})`}</strong>
              <p className="mt-3 text-sm text-secondary">{cursor === 0 ? "创建 map/filter 只组装类型和状态，不处理元素。" : complete ? "序列耗尽；后续 next 仍表示结束。" : `该输出来自 source ${current?.source}；next 改变 iterator 内部游标。`}</p>
            </div>
            <p className="mt-4 text-xs text-secondary">已产生 {Math.min(cursor, outputs.length)} / {outputs.length} 项；`sum`、`collect` 和 for 会取得 iterator 所有权并消费到结束。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">adapter 保持惰性，consumer 才拉取元素；iter/iter_mut/into_iter 决定 Item 和原集合的所有权关系。</figcaption>
    </figure>
  );
}

type ConfigStyle = "slice" | "iterator";
type SearchStyle = "loop" | "collect" | "lazy";

export function RplIteratorRefactorLab() {
  const [configStyle, setConfigStyle] = useState<ConfigStyle>("iterator");
  const [searchStyle, setSearchStyle] = useState<SearchStyle>("collect");
  const [lineCount, setLineCount] = useState(1000);
  const matchCount = Math.max(1, Math.round(lineCount * 0.08));
  const bufferedMatches = searchStyle === "lazy" ? 0 : matchCount;
  const firstOutput = searchStyle === "lazy" ? "首个匹配被拉取时" : `扫描并收集 ${lineCount} 行之后`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="border border-border bg-bg p-4">
            <span className="text-xs text-secondary">Config 参数输入</span>
            <div className="mt-3 grid grid-cols-2 border border-border"><button type="button" aria-pressed={configStyle === "slice"} onClick={() => setConfigStyle("slice")} className={`min-h-11 border-r border-border px-2 text-sm ${configStyle === "slice" ? "bg-primary text-bg" : "bg-elevated text-secondary"}`}>Vec + slice</button><button type="button" aria-pressed={configStyle === "iterator"} onClick={() => setConfigStyle("iterator")} className={`min-h-11 px-2 text-sm ${configStyle === "iterator" ? "bg-primary text-bg" : "bg-elevated text-secondary"}`}>Args iterator</button></div>
            <code className="mt-4 block min-h-24 break-words border border-border bg-elevated p-3 text-xs leading-6 text-primary">{configStyle === "slice" ? "collect::<Vec<String>>() -> &args[1].clone()" : "Config::build(env::args()) -> args.next()"}</code>
            <p className="mt-3 text-xs text-secondary">临时参数集合：{configStyle === "slice" ? "1 个 Vec" : "0"} · query/path 额外 clone：{configStyle === "slice" ? "2 次" : "0 次，直接 move"}</p>
          </section>

          <section className="border border-border bg-bg p-4">
            <span className="text-xs text-secondary">search 返回策略</span>
            <select value={searchStyle} onChange={(event) => setSearchStyle(event.target.value as SearchStyle)} className="mt-3 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="loop">for + mutable Vec</option><option value="collect">filter + collect Vec</option><option value="lazy">返回 impl Iterator</option></select>
            <label className="mt-4 block text-sm text-primary">输入行数：{lineCount}<input type="range" min="100" max="5000" step="100" value={lineCount} onChange={(event) => setLineCount(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div className="border border-border bg-elevated p-3"><span className="text-secondary">结果缓冲</span><strong className="mt-2 block text-primary">{bufferedMatches} 行</strong></div><div className="border border-border bg-elevated p-3"><span className="text-secondary">首条输出</span><strong className="mt-2 block text-primary">{firstOutput}</strong></div></div>
          </section>
        </div>

        <section className="mt-4 border border-cyan-500/40 bg-cyan-500/10 p-4">
          <span className="text-xs text-secondary">编译与性能边界</span>
          <div className="mt-4 grid gap-2 text-center text-xs sm:grid-cols-4"><div className="border border-border bg-bg p-3 text-primary">closure + adapters</div><div className="border border-border bg-bg p-3 text-primary">concrete generic types</div><div className="border border-border bg-bg p-3 text-primary">inline / fuse</div><div className="border border-border bg-bg p-3 text-primary">optimized loop</div></div>
          <p className="mt-4 text-sm text-secondary">高层 pipeline 可以被单态化和内联为紧凑循环，但“零成本”不是所有写法自动更快。真实输入、分配、大小写转换和返回策略仍需 release benchmark 验证。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">迭代器既能消除参数 clone，也能把搜索从“先收集再输出”改成按需产出；性能结论必须和具体 consumer 一起判断。</figcaption>
    </figure>
  );
}
