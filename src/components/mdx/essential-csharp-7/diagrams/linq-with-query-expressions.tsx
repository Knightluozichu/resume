"use client";

import { useState } from "react";

const clauseCases = [
  { label: "from", clause: "from person in people", input: "IEnumerable<Person>", scope: "range variable person", output: "one logical row per source element" },
  { label: "where", clause: "where person.IsActive", input: "current rows", scope: "person remains in scope", output: "only rows whose predicate is true" },
  { label: "let", clause: "let normalized = person.Name.Trim()", input: "person", scope: "person + normalized", output: "transparent intermediate projection" },
  { label: "orderby", clause: "orderby person.Score descending, person.Name", input: "filtered rows", scope: "range variables preserved", output: "ordered sequence with tie-breaker" },
  { label: "select", clause: "select new { person.Name, normalized }", input: "final row scope", scope: "projection closes query", output: "anonymous result sequence" },
];

export function Ec7QueryClauseScopeLab() {
  const [selected, setSelected] = useState(0);
  const item = clauseCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{clauseCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.clause}</code><div className="mt-3 grid gap-3 md:grid-cols-3">{[["input", item.input], ["scope", item.scope], ["output shape", item.output]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">逐clause查看range-variable scope、input sequence与result shape。</figcaption></figure>;
}

const translationCases = [
  { label: "where/select", query: "from x in xs where x > 0 select x * 2", method: "xs.Where(x => x > 0).Select(x => x * 2)", note: "direct filter then projection" },
  { label: "orderby", query: "from x in xs orderby x.A, x.B descending select x", method: "xs.OrderBy(x => x.A).ThenByDescending(x => x.B).Select(x => x)", note: "first key uses OrderBy; later keys use ThenBy" },
  { label: "multiple from", query: "from a in As from b in a.Items select b", method: "As.SelectMany(a => a.Items, (a,b) => b)", note: "nested from translates through SelectMany" },
  { label: "let", query: "from x in xs let y = F(x) where y > 0 select y", method: "xs.Select(x => new {x,y=F(x)}).Where(t => t.y > 0).Select(t => t.y)", note: "transparent identifier carries x and y" },
  { label: "continuation", query: "... group x by x.Key into g select g.Count()", method: "...GroupBy(x => x.Key).Select(g => g.Count())", note: "into starts a new query scope" },
];

export function Ec7QueryTranslationLab() {
  const [selected, setSelected] = useState(0);
  const item = translationCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{translationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2"><div className="border border-violet-500/40 bg-violet-500/10 p-4"><span className="text-xs text-secondary">query expression</span><code className="mt-2 block text-sm leading-6 text-primary">{item.query}</code></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">translated call chain</span><code className="mt-2 block text-sm leading-6 text-primary">{item.method}</code></div></div><p className="mt-3 border border-border bg-bg p-3 text-sm text-secondary">{item.note}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">切换query forms，比较编译器翻译出的standard query operator calls。</figcaption></figure>;
}

const relationalCases = [
  { label: "join", left: "orders", right: "customers", keys: "order.CustomerId equals customer.Id", shape: "one result per matching pair; inner join" },
  { label: "group", left: "orders", right: "key = order.CustomerId", keys: "group order by key", shape: "IGrouping key + sequence of orders" },
  { label: "group join", left: "customers", right: "orders", keys: "customer.Id equals order.CustomerId into matches", shape: "one customer + zero/many matching orders" },
  { label: "left outer", left: "group join", right: "DefaultIfEmpty", keys: "from match in matches.DefaultIfEmpty()", shape: "preserve left row when no match" },
  { label: "provider", left: "IEnumerable", right: "IQueryable", keys: "delegates vs expression trees", shape: "same query syntax; execution provider differs" },
];

export function Ec7JoinGroupShapeLab() {
  const [selected, setSelected] = useState(0);
  const item = relationalCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{relationalCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-cyan-500/40 bg-cyan-500/10 p-4 text-center text-sm text-primary">{item.left}</div><div className="flex items-center text-secondary">⇄</div><div className="border border-amber-500/40 bg-amber-500/10 p-4 text-center text-sm text-primary">{item.right}</div></div><p className="mt-3 border border-border bg-bg p-3 text-sm text-secondary">key/translation: {item.keys}</p><strong className="mt-3 block border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">result shape: {item.shape}</strong></div><figcaption className="mt-2 text-center text-sm text-secondary">切换join/group/provider cases，观察key relation与result cardinality/shape。</figcaption></figure>;
}
