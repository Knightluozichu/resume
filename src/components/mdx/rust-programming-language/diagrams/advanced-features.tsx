"use client";

import { useMemo, useState } from "react";

export function RplUnsafeBoundaryLab() {
  const [length, setLength] = useState(6);
  const [mid, setMid] = useState(3);
  const [validProvenance, setValidProvenance] = useState(true);
  const [overlap, setOverlap] = useState(false);
  const inBounds = mid >= 0 && mid <= length;
  const contractHolds = validProvenance && inBounds && !overlap;
  const rightStart = overlap ? Math.max(0, mid - 1) : mid;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[29rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">slice length：{length}<input type="range" min="1" max="10" value={length} onChange={(event) => setLength(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">split mid：{mid}<input type="range" min="0" max="12" value={mid} onChange={(event) => setMid(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={validProvenance} onChange={(event) => setValidProvenance(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />raw pointer 来自当前 live slice</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={overlap} onChange={(event) => setOverlap(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />故意让两个 mutable ranges 重叠</label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`assert!(mid <= len);
let ptr = values.as_mut_ptr();
// SAFETY: prove valid, aligned, in-bounds,
// initialized and non-overlapping.
unsafe { from_raw_parts_mut(...) }`}</code>
          </section>
          <section className={`border p-4 ${contractHolds ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">safe API over unsafe implementation</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{contractHolds ? "调用者只得到两个合法、不重叠的 mutable slices" : !validProvenance ? "pointer provenance/lifetime 无法证明，可能 undefined behavior" : !inBounds ? "mid 超出 allocation，pointer arithmetic 越界" : "两个 mutable slices alias，同一位置可被并发修改"}</h3>
            <div className="mt-5 flex min-h-16 items-center gap-1 border border-border bg-bg p-3">{Array.from({ length }, (_, index) => {
              const inLeft = index < Math.min(mid, length);
              const inRight = index >= rightStart;
              return <span key={index} className={`flex h-10 min-w-8 flex-1 items-center justify-center border text-xs ${inLeft && inRight ? "border-rose-500/50 bg-rose-500/20 text-primary" : inLeft ? "border-cyan-500/40 bg-cyan-500/10 text-primary" : inRight ? "border-amber-500/40 bg-amber-500/10 text-primary" : "border-border text-secondary"}`}>{index}</span>;
            })}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">left range</span><strong className="mt-2 block text-sm text-primary">0..{Math.min(mid, length)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">right range</span><strong className="mt-2 block text-sm text-primary">{rightStart}..{length}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">public API</span><strong className="mt-2 block text-sm text-primary">{contractHolds ? "safe" : "must reject"}</strong></div></div>
            <p className="mt-5 text-sm text-secondary">unsafe block 只允许 raw dereference 和 unsafe calls，不替你证明 pointer 有效、alignment、初始化、lifetime 和 alias rules。assert 与 construction path 必须把这些前置条件变成局部可审计 proof。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">安全抽象把 unsafe obligations 封装在最小 block 内；safe caller 无法构造违反前置条件的输入。</figcaption>
    </figure>
  );
}

type WrapperMode = "alias" | "newtype";
type TraitSlot = "associated" | "generic";

export function RplAdvancedTraitTypeLab() {
  const [wrapper, setWrapper] = useState<WrapperMode>("newtype");
  const [slot, setSlot] = useState<TraitSlot>("associated");
  const [mixUnits, setMixUnits] = useState(true);
  const typeSafe = wrapper === "newtype" ? !mixUnits : true;
  const implementationCount = slot === "associated" ? 1 : 3;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="wrapper 类型"><button type="button" aria-pressed={wrapper === "alias"} onClick={() => setWrapper("alias")} className={`min-h-11 border-r border-border text-sm ${wrapper === "alias" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>type alias</button><button type="button" aria-pressed={wrapper === "newtype"} onClick={() => setWrapper("newtype")} className={`min-h-11 text-sm ${wrapper === "newtype" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>tuple newtype</button></div>
        <div className="mt-5 grid min-h-[29rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <select value={slot} onChange={(event) => setSlot(event.target.value as TraitSlot)} className="min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="associated">trait 使用 associated Item</option><option value="generic">trait 使用 generic Item 参数</option></select>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={mixUnits} onChange={(event) => setMixUnits(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />把 Meters 传给 Millimeters 参数</label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`${wrapper === "alias" ? "type Millimeters = u32;\ntype Meters = u32;" : "struct Millimeters(u32);\nstruct Meters(u32);"}

${slot === "associated" ? "trait Source { type Item;\n    fn next(&mut self) -> Option<Self::Item>;\n}" : "trait Source<T> {\n    fn next(&mut self) -> Option<T>;\n}"}`}</code>
          </section>
          <section className={`border p-4 ${typeSafe ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">type identity and trait contract</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{wrapper === "alias" ? "alias 只是同一 u32 的新名字，单位混用仍可编译" : mixUnits ? "newtype 建立独立 identity，单位混用被拒绝" : "newtype 输入与参数 identity 一致"}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">type identity</span><strong className="mt-2 block text-sm text-primary">{wrapper === "alias" ? "same" : "distinct"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">external trait impl</span><strong className="mt-2 block text-sm text-primary">{wrapper === "newtype" ? "wrapper is local" : "orphan rule unchanged"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Source impl variants</span><strong className="mt-2 block text-sm text-primary">{implementationCount}</strong></div></div>
            <div className="mt-4 border border-border bg-bg p-4"><strong className="text-sm text-primary">{slot === "associated" ? "Associated type：每个 implementor 对该 trait 选择一个 Item" : "Generic parameter：同一 implementor 可对多个 T 分别实现"}</strong><p className="mt-2 text-xs text-secondary">associated type 减少 call-site annotation 并把输出选择固定进 trait contract；generic slot 允许同一 Self 拥有多个 trait instantiations。</p></div>
            <p className="mt-5 text-sm text-secondary">newtype 可同时提供 unit safety、封装和 orphan-rule 本地 type；代价是需要显式 delegation。type alias 只减少签名重复，不产生 validation 或新的 method set。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">associated/generic 决定实现数量；newtype/alias 决定是否建立新的 static identity，四者不是可互换语法糖。</figcaption>
    </figure>
  );
}

type MacroKind = "declarative" | "derive" | "attribute" | "function";

const macroInfo = {
  declarative: { label: "macro_rules", input: "expr list", output: "repeated push statements", scope: "match token shape" },
  derive: { label: "custom derive", input: "struct/enum item", output: "trait impl", scope: "derive target" },
  attribute: { label: "attribute-like", input: "attribute + item", output: "transformed item", scope: "any supported item" },
  function: { label: "function-like", input: "arbitrary TokenStream", output: "parsed generated code", scope: "call-site tokens" },
} as const;

export function RplMacroExpansionLab() {
  const [kind, setKind] = useState<MacroKind>("declarative");
  const [items, setItems] = useState(3);
  const info = macroInfo[kind];
  const generatedLines = kind === "declarative" ? items + 2 : kind === "derive" ? 5 : kind === "attribute" ? 7 : 4;
  const expansion = useMemo(() => kind === "declarative" ? `let mut temp = Vec::new();\n${Array.from({ length: items }, (_, index) => `temp.push(item_${index + 1});`).join("\n")}\ntemp` : kind === "derive" ? "impl HelloMacro for Pancakes { ... }" : kind === "attribute" ? "fn index() { route_guard(); original_body(); }" : "checked_query::<Row>(\"SELECT ...\")", [kind, items]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="macro 类型">{(Object.keys(macroInfo) as MacroKind[]).map((value) => <button key={value} type="button" aria-pressed={kind === value} onClick={() => setKind(value)} className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 ${kind === value ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>{macroInfo[value].label}</button>)}</div>
        <div className="mt-5 grid min-h-[29rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">输入重复项：{items}<input type="range" min="1" max="6" value={items} onChange={(event) => setItems(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <div className="border border-border bg-elevated p-3 text-xs text-secondary"><span className="block text-primary">input contract</span><span className="mt-2 block">{info.input}</span></div>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{kind === "declarative" ? `vec_like![${Array.from({ length: items }, (_, index) => `item_${index + 1}`).join(", ")}]` : kind === "derive" ? "#[derive(HelloMacro)]\nstruct Pancakes;" : kind === "attribute" ? "#[route(GET, \"/\")]\nfn index() {}" : "sql!(SELECT id FROM posts)"}</code>
          </section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">compile-time TokenStream transformation</span>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs"><div className="border border-border bg-bg p-3 text-primary">source tokens<br />{info.input}</div><span className="text-secondary">-&gt;</span><div className="border border-border bg-bg p-3 text-primary">{info.label}<br />expand</div><span className="text-secondary">-&gt;</span><div className="border border-border bg-bg p-3 text-primary">Rust code<br />type-check</div></div>
            <h3 className="mt-5 text-base font-semibold text-primary">生成约 {generatedLines} 行：{info.output}</h3>
            <code className="mt-4 block min-h-28 whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{expansion}</code>
            <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">phase</span><strong className="mt-2 block text-sm text-primary">compile time</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">accepted shape</span><strong className="mt-2 block text-sm text-primary">{info.scope}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">debug target</span><strong className="mt-2 block text-sm text-primary">expanded code</strong></div></div>
            <p className="mt-5 text-sm text-secondary">macro 可接收 token syntax、生成 impl 或 items，这是 runtime function 做不到的；代价是错误位置跨 expansion boundary、维护和编译成本更高，应优先用 function/generic 能表达的抽象。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">declarative macro 按 token pattern 展开；procedural macro 接收并返回 TokenStream，derive/attribute/function-like 只在调用形状上不同。</figcaption>
    </figure>
  );
}
