"use client";

import { useMemo, useState } from "react";

type CollectionAccess = "api" | "field";

export function RplEncapsulationInvariantLab() {
  const [values, setValues] = useState([10, 20]);
  const [cachedAverage, setCachedAverage] = useState(15);
  const [access, setAccess] = useState<CollectionAccess>("api");
  const actualAverage = values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
  const invariantHolds = actualAverage === cachedAverage;

  function mutate(kind: "add" | "remove") {
    const next = kind === "add" ? [...values, 30] : values.slice(0, -1);
    setValues(next);
    if (access === "api") {
      setCachedAverage(next.length === 0 ? 0 : next.reduce((sum, value) => sum + value, 0) / next.length);
    }
  }

  function reset() {
    setValues([10, 20]);
    setCachedAverage(15);
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="集合访问边界"><button type="button" aria-pressed={access === "api"} onClick={() => setAccess("api")} className={`min-h-11 border-r border-border text-sm ${access === "api" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>只经 public API</button><button type="button" aria-pressed={access === "field"} onClick={() => setAccess("field")} className={`min-h-11 text-sm ${access === "field" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>直接暴露 list 字段</button></div>
        <div className="mt-5 grid min-h-[26rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-3 border border-border"><button type="button" onClick={() => mutate("add")} className="min-h-11 border-r border-border text-sm text-primary">加入 30</button><button type="button" onClick={() => mutate("remove")} disabled={values.length === 0} className="min-h-11 border-r border-border text-sm text-primary disabled:text-secondary">移除末项</button><button type="button" onClick={reset} className="min-h-11 text-sm text-primary">重置</button></div>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{access === "api" ? `pub fn add(&mut self, value: i32) {
    self.list.push(value);
    self.update_average();
}` : `pub list: Vec<i32>

collection.list.push(30);
// average 没有同步更新`}</code>
            <p className="text-xs text-secondary">AveragedCollection 公开类型和行为，但让 list、average 与 update_average 保持 private，外部只能调用能维护 invariant 的操作。</p>
          </section>
          <section className={`border p-4 ${invariantHolds ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">representation invariant</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{invariantHolds ? "缓存与真实平均值一致" : "字段绕过 API，缓存已经失真"}</h3>
            <div className="mt-5 flex min-h-20 flex-wrap items-center gap-2 border border-border bg-bg p-3">{values.length === 0 ? <span className="text-xs text-secondary">empty</span> : values.map((value, index) => <span key={`${value}-${index}`} className="flex h-10 w-12 items-center justify-center border border-cyan-500/40 bg-cyan-500/10 text-sm text-primary">{value}</span>)}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">cached</span><strong className="mt-2 block text-sm text-primary">{cachedAverage.toFixed(1)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">actual</span><strong className="mt-2 block text-sm text-primary">{actualAverage.toFixed(1)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">external coupling</span><strong className="mt-2 block text-sm text-primary">{access === "api" ? "method contract" : "Vec layout + methods"}</strong></div></div>
            <p className="mt-5 text-sm text-secondary">封装的收益不是“字段越私有越好”，而是把所有能破坏不变量的写路径收束到可审计 API。只要签名和语义保持，内部可把 Vec 换成其他结构而不迫使调用方重写。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">private representation 让 public methods 成为维护 list 与 cached average 一致性的唯一入口。</figcaption>
    </figure>
  );
}

type DispatchMode = "generic" | "trait-object";
type WidgetKind = "button" | "select" | "string";

const widgetInfo = {
  button: { label: "Button", draw: true },
  select: { label: "SelectBox", draw: true },
  string: { label: "String", draw: false },
} as const;

export function RplTraitObjectDispatchLab() {
  const [mode, setMode] = useState<DispatchMode>("trait-object");
  const [widgets, setWidgets] = useState<WidgetKind[]>(["button", "select"]);
  const allDraw = widgets.every((kind) => widgetInfo[kind].draw);
  const homogeneous = new Set(widgets).size <= 1;
  const compiles = widgets.length > 0 && allDraw && (mode === "trait-object" || homogeneous);

  function toggle(kind: WidgetKind) {
    setWidgets((current) => current.includes(kind) ? current.filter((item) => item !== kind) : [...current, kind]);
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="分派模式"><button type="button" aria-pressed={mode === "generic"} onClick={() => setMode("generic")} className={`min-h-11 border-r border-border text-sm ${mode === "generic" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>泛型 Vec T</button><button type="button" aria-pressed={mode === "trait-object"} onClick={() => setMode("trait-object")} className={`min-h-11 text-sm ${mode === "trait-object" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>Vec Box dyn Draw</button></div>
        <div className="mt-5 grid min-h-[28rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-3 border border-border bg-bg p-4">
            {(Object.keys(widgetInfo) as WidgetKind[]).map((kind) => <label key={kind} className="flex min-h-11 items-center justify-between gap-3 border border-border px-3 text-sm text-primary"><span><input type="checkbox" checked={widgets.includes(kind)} onChange={() => toggle(kind)} className="mr-3 h-4 w-4 accent-[var(--accent)]" />{widgetInfo[kind].label}</span><span className="text-xs text-secondary">{widgetInfo[kind].draw ? "impl Draw" : "no Draw impl"}</span></label>)}
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{mode === "generic" ? "struct Screen<T: Draw> {\n    components: Vec<T>,\n}" : "struct Screen {\n    components: Vec<Box<dyn Draw>>,\n}"}</code>
          </section>
          <section className={`border p-4 ${compiles ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">collection type and dispatch path</span>
            <h3 className="mt-4 text-base font-semibold text-primary">{widgets.length === 0 ? "至少选择一个 component" : !allDraw ? "E0277：String 没有实现 Draw" : mode === "generic" && !homogeneous ? "Vec T 只能选择一个 concrete T" : mode === "generic" ? "静态分派：compiler 已知 concrete method" : "动态分派：每项可有不同 concrete type"}</h3>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs"><div className="border border-border bg-bg p-3 text-primary">component<br />data pointer</div><span className="text-secondary">-&gt;</span><div className="border border-border bg-bg p-3 text-primary">{mode === "generic" ? "monomorphized call" : "vtable method pointer"}</div><span className="text-secondary">-&gt;</span><div className="border border-border bg-bg p-3 text-primary">draw()</div></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">element set</span><strong className="mt-2 block text-sm text-primary">{mode === "generic" ? "homogeneous" : "open heterogeneous"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">dispatch</span><strong className="mt-2 block text-sm text-primary">{mode === "generic" ? "static" : "dynamic"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">inline potential</span><strong className="mt-2 block text-sm text-primary">{mode === "generic" ? "high" : "limited"}</strong></div></div>
            <p className="mt-5 text-sm text-secondary">trait object 仍在编译期验证每个值实现 Draw，只把“具体调用哪个实现”推迟到 runtime。它换来开放异构 collection，代价是 pointer indirection、vtable lookup 和更少的 inline 优化。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">泛型适合单一 concrete type 和静态分派；Box dyn Draw 适合调用方可扩展的异构组件集合。</figcaption>
    </figure>
  );
}

type StateModel = "runtime" | "type-state";
type PostState = "draft" | "review" | "published";

export function RplStatePatternLab() {
  const [model, setModel] = useState<StateModel>("runtime");
  const [state, setState] = useState<PostState>("draft");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("Draft 已创建");
  const visibleContent = state === "published" ? content : "";
  const typeName = { draft: "DraftPost", review: "PendingReviewPost", published: "Post" }[state];
  const allowed = useMemo(() => ({ add: state === "draft", review: state === "draft", approve: state === "review", reject: state === "review" }), [state]);

  function act(action: "add" | "review" | "approve" | "reject") {
    if (!allowed[action]) {
      setMessage(model === "runtime" ? `当前 ${state} 状态忽略 ${action}` : `${typeName} 没有 ${action} 方法：compile error`);
      return;
    }
    if (action === "add") {
      setContent((value) => `${value}Rust state.`);
      setMessage("Draft content 已更新");
    } else if (action === "review") {
      setState("review");
      setMessage(model === "runtime" ? "Box dyn State 转为 PendingReview" : "DraftPost consumed -> PendingReviewPost");
    } else if (action === "approve") {
      setState("published");
      setMessage(model === "runtime" ? "Box dyn State 转为 Published" : "PendingReviewPost consumed -> Post");
    } else {
      setState("draft");
      setMessage(model === "runtime" ? "Box dyn State 转回 Draft" : "PendingReviewPost consumed -> DraftPost");
    }
  }

  function reset(nextModel = model) {
    setModel(nextModel);
    setState("draft");
    setContent("");
    setMessage("Draft 已创建");
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="状态建模方式"><button type="button" aria-pressed={model === "runtime"} onClick={() => reset("runtime")} className={`min-h-11 border-r border-border text-sm ${model === "runtime" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>dyn State runtime</button><button type="button" aria-pressed={model === "type-state"} onClick={() => reset("type-state")} className={`min-h-11 text-sm ${model === "type-state" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>不同类型编码状态</button></div>
        <div className="mt-5 grid min-h-[29rem] gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-2 border border-border"><button type="button" onClick={() => act("add")} className="min-h-11 border-b border-r border-border text-sm text-primary">add_text</button><button type="button" onClick={() => act("review")} className="min-h-11 border-b border-border text-sm text-primary">request_review</button><button type="button" onClick={() => act("approve")} className="min-h-11 border-r border-border text-sm text-primary">approve</button><button type="button" onClick={() => act("reject")} className="min-h-11 text-sm text-primary">reject</button></div>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{model === "runtime" ? `struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}` : `DraftPost::request_review(self)
    -> PendingReviewPost
PendingReviewPost::approve(self)
    -> Post`}</code>
            <p className="text-xs text-secondary">尝试在错误状态调用每个操作。runtime model 保持同一 Post type 并由 state object 决定 no-op/transition；type-state 让不可用 method 根本不出现在该类型上。</p>
          </section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">workflow encoded by {model === "runtime" ? "value state" : "static type"}</span>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center text-xs">{(["draft", "review", "published"] as PostState[]).map((item, index) => <div key={item} className="contents"><div className={`border p-3 ${state === item ? "border-cyan-500/60 bg-cyan-500/20 text-primary" : "border-border bg-bg text-secondary"}`}>{model === "runtime" ? item : { draft: "DraftPost", review: "PendingReviewPost", published: "Post" }[item]}</div>{index < 2 ? <span className="text-secondary">-&gt;</span> : null}</div>)}</div>
            <h3 className="mt-5 text-base font-semibold text-primary">{message}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">current</span><strong className="mt-2 block text-sm text-primary">{model === "runtime" ? state : typeName}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">stored content</span><strong className="mt-2 block text-sm text-primary">{content || "empty"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">content()</span><strong className="mt-2 block text-sm text-primary">{visibleContent || "hidden / unavailable"}</strong></div></div>
            <p className="mt-5 text-sm text-secondary">传统模式隐藏 concrete state 并保持调用方只持 Post，但非法转换只能成为 no-op/Result。type-state 消费 self 并返回新类型，能让 Draft 无 content method、Published 无 add_text method；代价是调用方必须跟随类型变化，collection 与序列化更复杂。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">同一业务状态机可用 dyn State 在 runtime 分派，也可用不同 Rust 类型把合法转换编码进 API。</figcaption>
    </figure>
  );
}
