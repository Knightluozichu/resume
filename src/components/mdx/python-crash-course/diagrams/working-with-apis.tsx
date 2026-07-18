"use client";

import { useMemo, useState } from "react";

const responseCases = [
  { label: "200 valid", status: 200, headers: "remaining: 42", body: "JSON object with items[]", decision: "parse then validate schema" },
  { label: "200 invalid shape", status: 200, headers: "remaining: 41", body: "JSON object missing items", decision: "schema error; do not plot" },
  { label: "403 exhausted", status: 403, headers: "remaining: 0; reset: 14:05", body: "rate limit message", decision: "wait until reset or authenticate" },
  { label: "429 throttled", status: 429, headers: "Retry-After: 30", body: "too many requests", decision: "bounded retry after delay" },
  { label: "500 server", status: 500, headers: "request-id: abc", body: "temporary server error", decision: "retry policy + preserve evidence" },
];

export function PccApiRequestLab() {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const item = responseCases[selected];
  const stages = ["build request", "transport", "check status", "decode JSON", "validate schema"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">response case<select value={selected} onChange={(event) => { setSelected(Number(event.target.value)); setStage(0); }} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{responseCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{stages.map((label, index) => <button key={label} type="button" onClick={() => setStage(index)} className={`min-h-14 border px-2 text-xs ${stage === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{index + 1}. {label}</button>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">status</span><strong className={`mt-2 block text-lg ${item.status === 200 ? "text-emerald-500" : "text-rose-500"}`}>{item.status}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">headers</span><p className="mt-2 text-xs leading-5 text-primary">{item.headers}</p></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">body</span><p className="mt-2 text-xs leading-5 text-primary">{item.body}</p></div><div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">decision</span><p className="mt-2 text-xs leading-5 text-primary">{item.decision}</p></div></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换response并逐阶段检查：HTTP成功、JSON成功和schema成功是三个不同结论。</figcaption>
    </figure>
  );
}

const repositories = [
  { name: "alpha-py", stars: 48500, forks: 7200, description: "data tools", url: "https://example.invalid/alpha" },
  { name: "beta-web", stars: 33600, forks: 9100, description: "web framework", url: "https://example.invalid/beta" },
  { name: "gamma-ml", stars: 27400, forks: 4800, description: "machine learning", url: "https://example.invalid/gamma" },
  { name: "delta-cli", stars: 14800, forks: 1800, description: "command line", url: "https://example.invalid/delta" },
];

export function PccRepositoryPipelineLab() {
  const [metric, setMetric] = useState<"stars" | "forks">("stars");
  const [limit, setLimit] = useState(4);
  const rows = useMemo(() => [...repositories].sort((a, b) => b[metric] - a[metric]).slice(0, limit), [metric, limit]);
  const max = Math.max(...rows.map((row) => row[metric]));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm text-primary">metric<select value={metric} onChange={(event) => setMetric(event.target.value as "stars" | "forks")} className="ml-3 min-h-11 border border-border bg-bg px-3"><option value="stars">stars</option><option value="forks">forks</option></select></label><label className="text-sm text-primary">top N: {limit}<input type="range" min="2" max="4" value={limit} onChange={(event) => setLimit(Number(event.target.value))} className="mt-2 w-full" /></label></div>
        <div className="mt-4 space-y-2">{rows.map((row) => <div key={row.name} className="grid grid-cols-[7rem_1fr_4.5rem] items-center gap-2 text-xs"><span className="truncate text-primary">{row.name}</span><div className="h-7 border border-border bg-bg"><div className="h-full bg-cyan-500/70" style={{ width: `${(row[metric] / max) * 100}%` }} /></div><strong className="text-right text-primary">{row[metric].toLocaleString()}</strong></div>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">{["items[] schema", "normalize fields", `sort by ${metric}`, "Plotly labels + links"].map((label, index) => <span key={label} className="border border-border bg-bg p-2 text-center text-secondary">{index + 1}. {label}</span>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换metric与Top N，观察API items经normalize、sort再进入Plotly的管线。</figcaption>
    </figure>
  );
}

const stories = [
  { id: 701, title: "Reliable APIs", descendants: 186, status: "valid" },
  { id: 702, title: "Python Release Notes", descendants: 94, status: "valid" },
  { id: 703, title: "Deleted item", descendants: 0, status: "deleted" },
  { id: 704, title: "Distributed Systems", descendants: 231, status: "valid" },
];

export function PccHackerNewsRankingLab() {
  const [dropDeleted, setDropDeleted] = useState(true);
  const [order, setOrder] = useState<"api" | "comments">("comments");
  const visible = useMemo(() => {
    const rows = dropDeleted ? stories.filter((story) => story.status === "valid") : stories;
    return order === "comments" ? [...rows].sort((a, b) => b.descendants - a.descendants) : rows;
  }, [dropDeleted, order]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2"><label className="flex min-h-11 items-center gap-2 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={dropDeleted} onChange={(event) => setDropDeleted(event.target.checked)} /> skip deleted/missing items</label><label className="text-sm text-primary">order<select value={order} onChange={(event) => setOrder(event.target.value as "api" | "comments")} className="ml-3 min-h-11 border border-border bg-bg px-3"><option value="comments">comment count</option><option value="api">API order</option></select></label></div>
        <div className="mt-4 grid gap-2">{visible.map((story, index) => <div key={story.id} className={`grid grid-cols-[2rem_1fr_6rem] items-center border p-3 text-sm ${story.status === "deleted" ? "border-rose-500/40 bg-rose-500/10" : "border-border bg-bg"}`}><strong className="text-secondary">{index + 1}</strong><span className="text-primary">{story.title}</span><span className="text-right text-secondary">{story.descendants} comments</span></div>)}</div>
        <p className="mt-3 text-xs leading-5 text-secondary">topstories只返回IDs；每个item request仍需status与schema检查。deleted/dead item可能缺title或descendants，normalize后再sort。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换缺失项policy与排序方式，理解Hacker News多请求聚合的边界。</figcaption>
    </figure>
  );
}
