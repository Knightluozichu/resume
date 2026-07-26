"use client";

import { useState } from "react";

type PanicMode = "unwind" | "abort";

export function RplPanicStrategyLab() {
  const [mode, setMode] = useState<PanicMode>("unwind");
  const [backtrace, setBacktrace] = useState(true);
  const frames = ["main", "serve_request", "read_config", "Vec::index"];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="panic 处理策略">
          {(["unwind", "abort"] as PanicMode[]).map((item) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 border-r border-border font-mono text-sm last:border-r-0 ${mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item}</button>)}
        </div>
        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1fr_1.2fr]">
          <section className="border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={backtrace} onChange={(event) => setBacktrace(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />RUST_BACKTRACE=1</label>
            <code className="mt-5 block min-h-16 border border-border bg-elevated p-3 text-sm text-primary">v[99] → panic!</code>
            <p className="mt-5 text-sm text-secondary">{mode === "unwind" ? "逐帧退出并运行已构造值的清理逻辑，然后终止线程/进程。" : "立即终止，不逐帧执行 Drop；操作系统回收进程内存。"}</p>
          </section>
          <section className={`border p-4 ${mode === "unwind" ? "border-cyan-500/40 bg-cyan-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">调用栈</span>
            <div className="mt-3 space-y-2">
              {[...frames].reverse().map((frame, index) => <div key={frame} className={`grid min-h-11 grid-cols-[auto_1fr_auto] items-center gap-3 border border-border bg-bg px-3 py-2 text-xs ${mode === "unwind" || index === 0 ? "text-primary" : "text-secondary opacity-50"}`}><span>{index}</span><code>{frame}</code><span>{mode === "unwind" ? "Drop" : index === 0 ? "panic site" : "skipped"}</span></div>)}
            </div>
            <p className="mt-4 text-xs text-secondary">{backtrace ? "回溯可见：从顶部寻找第一个属于自己项目的 frame。" : "仅显示 panic 位置与消息，调用链未展开。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">unwind/abort 决定 panic 后如何终止，不会把不可恢复错误变成可恢复 Result。</figcaption>
    </figure>
  );
}

type FileOutcome = "ok" | "notFound" | "permission" | "createFailed";

const fileOutcomes = {
  ok: { label: "已存在", open: "Ok(File)", action: "直接返回文件句柄", result: "Ok(File)", tone: "border-emerald-500/40 bg-emerald-500/10" },
  notFound: { label: "不存在", open: "Err(NotFound)", action: "File::create 成功", result: "Ok(new File)", tone: "border-cyan-500/40 bg-cyan-500/10" },
  permission: { label: "无权限", open: "Err(PermissionDenied)", action: "不能假装缺失，保留原错误", result: "Err(PermissionDenied)", tone: "border-amber-500/40 bg-amber-500/10" },
  createFailed: { label: "创建失败", open: "Err(NotFound)", action: "File::create 也返回 Err", result: "Err(create error)", tone: "border-rose-500/40 bg-rose-500/10" },
} as const;

export function RplResultRecoveryLab() {
  const [outcome, setOutcome] = useState<FileOutcome>("notFound");
  const selected = fileOutcomes[outcome];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="文件打开结果">
          {(Object.keys(fileOutcomes) as FileOutcome[]).map((item) => <button key={item} type="button" aria-pressed={outcome === item} onClick={() => setOutcome(item)} className={`min-h-11 border-b border-r border-border px-2 text-xs sm:border-b-0 sm:text-sm ${outcome === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{fileOutcomes[item].label}</button>)}
        </div>
        <section className={`mt-5 min-h-80 border p-4 ${selected.tone}`} aria-live="polite">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
            <div className="min-h-20 border border-border bg-bg p-3"><span className="text-xs text-secondary">File::open</span><code className="mt-2 block text-xs text-primary">{selected.open}</code></div>
            <span className="hidden text-secondary sm:block">→</span>
            <div className="min-h-20 border border-border bg-bg p-3"><span className="text-xs text-secondary">按 ErrorKind 决策</span><p className="mt-2 text-xs text-primary">{selected.action}</p></div>
            <span className="hidden text-secondary sm:block">→</span>
            <div className="min-h-20 border border-border bg-bg p-3"><span className="text-xs text-secondary">边界输出</span><code className="mt-2 block text-xs text-primary">{selected.result}</code></div>
          </div>
          <p className="mt-7 text-sm text-secondary">match 能读取 Err 中的具体种类，只对 NotFound 执行创建；其余错误不能被宽泛 fallback 吞掉。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Result 同时携带成功值或错误上下文，恢复策略应按错误种类而不是“任何 Err 都一样”。</figcaption>
    </figure>
  );
}

type FailureStage = "none" | "open" | "read" | "parse";
type Boundary = "result" | "unit";

export function RplPropagationLab() {
  const [failure, setFailure] = useState<FailureStage>("read");
  const [boundary, setBoundary] = useState<Boundary>("result");
  const stages = ["File::open()?", "read_to_string()?", "parse()?", "Ok(config)"];
  const failureIndex = failure === "none" ? -1 : { open: 0, read: 1, parse: 2 }[failure];
  const valid = boundary === "result";
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">失败阶段<select value={failure} onChange={(event) => setFailure(event.target.value as FailureStage)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="none">全部成功</option><option value="open">open</option><option value="read">read</option><option value="parse">parse</option></select></label>
            <div><span className="text-sm text-primary">函数返回类型</span><div className="mt-2 grid grid-cols-2 border border-border" role="group" aria-label="函数返回边界"><button type="button" aria-pressed={boundary === "result"} onClick={() => setBoundary("result")} className={`min-h-11 border-r border-border font-mono text-xs ${boundary === "result" ? "bg-primary text-bg" : "text-secondary"}`}>Result&lt;Config, AppError&gt;</button><button type="button" aria-pressed={boundary === "unit"} onClick={() => setBoundary("unit")} className={`min-h-11 font-mono text-xs ${boundary === "unit" ? "bg-primary text-bg" : "text-secondary"}`}>()</button></div></div>
          </section>
          <section className={`min-h-96 border p-4 ${valid ? "border-cyan-500/40 bg-cyan-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">`?` 展开后的控制流</span>
            <div className="mt-3 space-y-2">
              {stages.map((stage, index) => {
                const failed = index === failureIndex;
                const skipped = failureIndex >= 0 && index > failureIndex;
                return <div key={stage} className={`grid min-h-12 grid-cols-[auto_1fr_auto] items-center gap-3 border border-border bg-bg px-3 py-2 text-xs ${failed ? "text-rose-300" : skipped ? "text-secondary opacity-40" : "text-primary"}`}><span>{index + 1}</span><code>{stage}</code><span>{failed ? "From + return Err" : skipped ? "skipped" : index === 3 ? "return" : "unwrap Ok"}</span></div>;
              })}
            </div>
            <h3 className="mt-5 text-base font-semibold text-primary">{valid ? failure === "none" ? "返回 Ok(config)" : `在 ${failure} 提前返回统一 AppError` : "E0277：() 边界不能接收 Result residual"}</h3>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">问号运算符取出 Ok，遇到 Err 经 From 转换并从整个兼容函数提前返回。</figcaption>
    </figure>
  );
}
