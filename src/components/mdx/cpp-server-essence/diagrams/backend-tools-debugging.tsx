"use client";

import { useState } from "react";

type BuildType = "Debug" | "RelWithDebInfo" | "Release";

export function CseDebugArtifactLab() {
  const [buildType, setBuildType] = useState<BuildType>("RelWithDebInfo");
  const [stripped, setStripped] = useState(false);
  const [framePointer, setFramePointer] = useState(true);
  const hasDebugInfo = buildType !== "Release" && !stripped;
  const optimized = buildType !== "Debug";
  const stackQuality = hasDebugInfo && (framePointer || !optimized) ? "source + stable stack" : hasDebugInfo ? "source available, frames may be optimized" : "symbols/addresses only";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[26rem] gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <div className="grid grid-cols-3 border border-border" role="group" aria-label="CMake build type">
              {(["Debug", "RelWithDebInfo", "Release"] as const).map((item, index) => <button key={item} type="button" aria-pressed={buildType === item} onClick={() => setBuildType(item)} className={`min-h-12 px-2 text-xs sm:text-sm ${index < 2 ? "border-r border-border" : ""} ${buildType === item ? "bg-primary text-bg" : "text-primary hover:bg-elevated"}`}>{item}</button>)}
            </div>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={stripped} onChange={(event) => setStripped(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />交付后执行 strip</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={framePointer} onChange={(event) => setFramePointer(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />保留 frame pointer</label>
            <code className="block whitespace-pre-wrap border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`cmake -S . -B build \\
  -DCMAKE_BUILD_TYPE=${buildType}
cmake --build build -j
${framePointer ? "# target_compile_options(server PRIVATE -fno-omit-frame-pointer)" : "# frame pointer may be omitted"}
${stripped ? "strip build/server" : "# keep debug artifact / symbol package"}`}</code>
          </section>
          <section className={`border p-4 ${hasDebugInfo ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">artifact observability</span><h3 className="mt-3 text-base font-semibold text-primary">{stackQuality}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">debug info</span><strong className="mt-2 block text-sm text-primary">{hasDebugInfo ? "DWARF kept" : "missing/stripped"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">optimization</span><strong className="mt-2 block text-sm text-primary">{optimized ? "enabled" : "minimal"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">postmortem</span><strong className="mt-2 block text-sm text-primary">{hasDebugInfo ? "core can symbolize" : "needs external symbols"}</strong></div></div>
            <div className="mt-5 space-y-2 text-sm"><div className={`border p-3 ${hasDebugInfo ? "border-emerald-500/30 bg-bg text-primary" : "border-rose-500/40 bg-rose-500/10 text-rose-300"}`}>break file:line / list source</div><div className={`border p-3 ${framePointer || !optimized ? "border-emerald-500/30 bg-bg text-primary" : "border-amber-500/40 bg-amber-500/10 text-primary"}`}>backtrace / profiler unwind</div><div className="border border-border bg-bg p-3 text-primary">build-id must match deployed binary and symbol artifact</div></div>
            <p className="mt-4 text-sm leading-7 text-secondary">Debug 易单步但行为可能不同于 production；RelWithDebInfo 更接近线上优化。可靠流程保存未 strip symbols/build-id，而不是直接在线上二进制里临时重编。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">调试能力在构建阶段决定：可执行文件、符号包、source revision 与 build-id 必须形成同一 artifact chain。</figcaption>
    </figure>
  );
}

type GdbCommand = "next" | "step" | "continue" | "finish" | "watch";

const COMMANDS: Record<GdbCommand, { stop: string; movement: string; use: string }> = {
  next: { stop: "当前 source line 的下一行", movement: "函数调用整体越过", use: "不关心 callee 内部时保持当前 frame" },
  step: { stop: "下一条有 source mapping 的语句", movement: "可进入 callee", use: "需要追踪调用链内部状态变化" },
  continue: { stop: "下一个 breakpoint/signal/watchpoint", movement: "自由运行", use: "已设置明确停止条件" },
  finish: { stop: "当前函数返回之后", movement: "运行到 caller", use: "快速退出误入或已检查完的 frame" },
  watch: { stop: "目标 memory value 被写入", movement: "hardware watchpoint", use: "定位谁破坏了共享字段" },
};

export function CseGdbExecutionControlLab() {
  const [command, setCommand] = useState<GdbCommand>("next");
  const [optimized, setOptimized] = useState(false);
  const [breakCondition, setBreakCondition] = useState(true);
  const info = COMMANDS[command];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border sm:grid-cols-5" role="group" aria-label="GDB execution command">
          {(Object.keys(COMMANDS) as GdbCommand[]).map((item, index) => <button key={item} type="button" aria-pressed={command === item} onClick={() => setCommand(item)} className={`min-h-11 border-r border-border text-sm last:border-r-0 ${command === item ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{item}</button>)}
        </div>
        <div className="mt-4 grid min-h-[24rem] gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <section className="space-y-3 border border-border bg-bg p-4"><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={optimized} onChange={(event) => setOptimized(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />binary 开启高优化</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={breakCondition} onChange={(event) => setBreakCondition(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />break 只在 fd == 42 时停</label><code className="block whitespace-pre-wrap border border-border bg-elevated p-3 text-xs leading-6 text-primary">{`(gdb) break Session::on_read${breakCondition ? " if fd_ == 42" : ""}
(gdb) run --config server.conf
(gdb) ${command}${command === "watch" ? " session.state_" : ""}
(gdb) backtrace
(gdb) frame 1
(gdb) info locals`}</code></section>
          <section className={`border p-4 ${optimized ? "border-amber-500/40 bg-amber-500/10" : "border-cyan-500/40 bg-cyan-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">predicted stop semantics</span><h3 className="mt-3 text-base font-semibold text-primary">{info.stop}</h3><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">movement</span><strong className="mt-2 block text-sm text-primary">{info.movement}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">best use</span><p className="mt-2 text-sm leading-6 text-primary">{info.use}</p></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">condition</span><strong className="mt-2 block text-sm text-primary">{breakCondition ? "fd == 42" : "every call"}</strong></div></div><div className="mt-5 border border-border bg-bg p-3 text-sm leading-7 text-secondary">{optimized ? "compiler 可能 inline、重排或删除 variables，source line 与 instruction 不再一一对应。用 disassemble、registers、optimized-out awareness 与匹配符号解释，而不是把跳行当 GDB bug。" : "低优化下 source stepping 更直观；仍应先用 backtrace/frame/info 确认 context，再修改变量或 jump，避免调试器改变问题。"}</div></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">run/continue/next/step/finish/watch 不是同义步进；每条命令都对应不同停止条件和 frame movement。</figcaption>
    </figure>
  );
}

export function CseConcurrentDebugTargetLab() {
  const [follow, setFollow] = useState<"parent" | "child">("child");
  const [detach, setDetach] = useState(false);
  const [schedulerLocking, setSchedulerLocking] = useState(true);
  const [signalPass, setSignalPass] = useState(true);
  const traced = detach ? [follow] : ["parent", "child"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-[25rem] gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-3 border border-border bg-bg p-4"><div className="grid grid-cols-2 border border-border" role="group" aria-label="follow fork mode"><button type="button" aria-pressed={follow === "parent"} onClick={() => setFollow("parent")} className={`min-h-11 border-r border-border text-sm ${follow === "parent" ? "bg-primary text-bg" : "text-primary"}`}>follow parent</button><button type="button" aria-pressed={follow === "child"} onClick={() => setFollow("child")} className={`min-h-11 text-sm ${follow === "child" ? "bg-primary text-bg" : "text-primary"}`}>follow child</button></div><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={detach} onChange={(event) => setDetach(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />detach-on-fork on</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={schedulerLocking} onChange={(event) => setSchedulerLocking(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />scheduler-locking step</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={signalPass} onChange={(event) => setSignalPass(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />SIGUSR1 传给 inferior</label></section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">inferiors and threads</span><h3 className="mt-3 text-base font-semibold text-primary">GDB 跟踪：{traced.join(" + ")}</h3><div className="mt-5 grid grid-cols-2 gap-3"><div className={`min-h-24 border p-3 ${traced.includes("parent") ? "border-emerald-500/40 bg-bg text-primary" : "border-border bg-bg text-secondary"}`}>inferior 1 · parent<br /><span className="text-xs">threads 1-4</span></div><div className={`min-h-24 border p-3 ${traced.includes("child") ? "border-emerald-500/40 bg-bg text-primary" : "border-border bg-bg text-secondary"}`}>inferior 2 · child<br /><span className="text-xs">threads 1-2</span></div></div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">single-step</span><strong className="mt-2 block text-sm text-primary">{schedulerLocking ? "selected thread only" : "all may run"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">signal policy</span><strong className="mt-2 block text-sm text-primary">{signalPass ? "stop + pass" : "stop only"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">fork peer</span><strong className="mt-2 block text-sm text-primary">{detach ? "continues detached" : "remains inferior"}</strong></div></div><code className="mt-4 block whitespace-pre-wrap border border-border bg-bg p-3 text-xs leading-6 text-primary">{`set follow-fork-mode ${follow}
set detach-on-fork ${detach ? "on" : "off"}
set scheduler-locking ${schedulerLocking ? "step" : "off"}
handle SIGUSR1 stop print ${signalPass ? "pass" : "nopass"}
info inferiors
info threads
thread apply all bt`}</code></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">多线程/多进程调试先明确 GDB 正在控制哪个 inferior、哪个 thread，以及 signal/fork 后谁继续运行。</figcaption>
    </figure>
  );
}
