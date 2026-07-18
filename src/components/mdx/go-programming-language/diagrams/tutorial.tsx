"use client";

import { useMemo, useState } from "react";

export function GoplArgsDuplicateLab() {
  const [argumentsText, setArgumentsText] = useState("alpha beta alpha gamma beta alpha");
  const [includeProgram, setIncludeProgram] = useState(false);
  const args = argumentsText.trim() ? argumentsText.trim().split(/\s+/) : [];
  const osArgs = ["dup", ...args];
  const input = includeProgram ? osArgs : osArgs.slice(1);
  const counts = input.reduce<Record<string, number>>((result, value) => {
    result[value] = (result[value] ?? 0) + 1;
    return result;
  }, {});
  const duplicates = Object.entries(counts).filter(([, count]) => count > 1);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid min-h-[23rem] gap-4 lg:grid-cols-[0.86fr_1.14fr]"><section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">command-line words<textarea value={argumentsText} onChange={(event) => setArgumentsText(event.target.value)} rows={4} className="mt-2 w-full resize-none border border-border bg-elevated p-3 text-sm text-primary outline-none focus:border-cyan-500" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={includeProgram} onChange={(event) => setIncludeProgram(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />错误地把 os.Args[0] 当输入</label></section><section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">slice → map counting pipeline</span><div className="mt-4 flex flex-wrap gap-2">{osArgs.map((arg, index) => <span key={`${arg}-${index}`} className={`border px-2 py-2 text-xs ${index === 0 ? "border-amber-500/40 bg-amber-500/10 text-primary" : "border-border bg-bg text-primary"}`}>[{index}] {arg}</span>)}</div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">range input</span><code className="mt-2 block text-sm text-primary">os.Args[{includeProgram ? "0" : "1"}:]</code></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">duplicate output</span><strong className="mt-2 block text-sm text-primary">{duplicates.length ? duplicates.map(([word, count]) => `${word}×${count}`).join(", ") : "none"}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">slice 决定遍历边界，map 的 zero value 让 `counts[line]++` 首次出现也成立；scanner/file boundary 只改变输入来源，不改变计数 contract。</p></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">Tutorial 从 os.Args slice 进入 range/map：同一套输入-状态-输出模型扩展到 stdin 与多个文件的重复行统计。</figcaption></figure>
  );
}

function makeLissajous(cycles: number, frequency: number, phase: number) {
  const points: string[] = [];
  const samples = 180;
  for (let i = 0; i <= samples; i += 1) {
    const t = (i / samples) * cycles * 2 * Math.PI;
    const x = 100 + Math.sin(t) * 82;
    const y = 100 + Math.sin(t * frequency + phase) * 82;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

export function GoplLissajousLab() {
  const [cycles, setCycles] = useState(5);
  const [frequency, setFrequency] = useState(1.3);
  const [phase, setPhase] = useState(0.4);
  const points = useMemo(() => makeLissajous(cycles, frequency, phase), [cycles, frequency, phase]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">cycles: <strong>{cycles}</strong><input type="range" min="1" max="12" value={cycles} onChange={(event) => setCycles(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">frequency: <strong>{frequency.toFixed(1)}</strong><input type="range" min="0.5" max="3" step="0.1" value={frequency} onChange={(event) => setFrequency(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">phase: <strong>{phase.toFixed(1)}</strong><input type="range" min="0" max="6.2" step="0.1" value={phase} onChange={(event) => setPhase(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label></section><section className="grid place-items-center border border-emerald-500/40 bg-emerald-500/10 p-4"><svg viewBox="0 0 200 200" role="img" aria-label="按当前 cycles frequency phase 生成的 Lissajous 曲线" className="aspect-square w-full max-w-80 border border-border bg-bg"><polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="1.6" /></svg><code className="mt-3 text-xs text-secondary">x=sin(t), y=sin(t×{frequency.toFixed(1)}+{phase.toFixed(1)})</code></section></div></div><figcaption className="mt-2 text-center text-sm text-secondary">Lissajous 示例把 math/rand、loops、palette 与 gif encoder 串成流式图像程序；参数变化直接改变采样轨迹。</figcaption></figure>
  );
}

type NetworkDemo = "fetch" | "server";

export function GoplConcurrentFetchServerLab() {
  const [demo, setDemo] = useState<NetworkDemo>("fetch");
  const [latencies, setLatencies] = useState([120, 260, 80]);
  const [bodyClosed, setBodyClosed] = useState(true);
  const serial = latencies.reduce((sum, value) => sum + value, 0);
  const concurrent = Math.max(...latencies);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 border border-border" role="group" aria-label="Tutorial 网络示例"><button type="button" aria-pressed={demo === "fetch"} onClick={() => setDemo("fetch")} className={`min-h-11 border-r border-border text-sm ${demo === "fetch" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>concurrent fetch</button><button type="button" aria-pressed={demo === "server"} onClick={() => setDemo("server")} className={`min-h-11 text-sm ${demo === "server" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>web server</button></div>{demo === "fetch" ? <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]"><section className="space-y-3 border border-border bg-bg p-4">{latencies.map((latency, index) => <label key={index} className="block text-sm text-primary">URL {index + 1}: <strong>{latency} ms</strong><input type="range" min="20" max="500" step="20" value={latency} onChange={(event) => setLatencies((current) => current.map((value, i) => i === index ? Number(event.target.value) : value))} className="mt-2 block w-full accent-[var(--accent)]" /></label>)}<label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={bodyClosed} onChange={(event) => setBodyClosed(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />defer resp.Body.Close()</label></section><section className={`border p-4 ${bodyClosed ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}><h3 className="text-base font-semibold text-primary">goroutine + result channel</h3><div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">serial</span><strong className="mt-2 block text-sm text-primary">{serial} ms</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">concurrent</span><strong className="mt-2 block text-sm text-primary">~{concurrent} ms</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">每个 URL 一个 goroutine，结果 channel 汇聚 elapsed/status/error；总时间接近最慢请求，但所有 response body 仍必须关闭。</p></section></div> : <div className="mt-5 grid gap-3 sm:grid-cols-4">{["ListenAndServe", "request", "handler", "response writer"].map((item, index) => <div key={item} className="min-h-24 border border-border bg-bg p-3 text-sm leading-7 text-primary"><span className="text-xs text-secondary">0{index + 1}</span><br /><strong>{item}</strong></div>)}</div>}</div><figcaption className="mt-2 text-center text-sm text-secondary">fetch 与 web server 共享 net/http，但 ownership 不同：client 关闭 response body，server handler 只在 request 生命周期内使用 ResponseWriter。</figcaption></figure>
  );
}
