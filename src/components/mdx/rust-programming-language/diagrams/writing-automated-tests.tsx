"use client";

import { useMemo, useState } from "react";

type AssertionMode = "assert" | "assertEq" | "shouldPanic" | "result";

export function RplAssertionOutcomeLab() {
  const [mode, setMode] = useState<AssertionMode>("assertEq");
  const [actual, setActual] = useState(5);
  const [expected, setExpected] = useState(4);
  const [panicMessage, setPanicMessage] = useState("Guess must be <= 100");
  const [expectedPanic, setExpectedPanic] = useState("<= 100");
  const passed = mode === "assert" ? actual > 0 : mode === "assertEq" ? actual === expected : mode === "shouldPanic" ? panicMessage.includes(expectedPanic) : actual === expected;
  const code = mode === "assert" ? "assert!(actual > 0, \"actual must be positive\");" : mode === "assertEq" ? "assert_eq!(actual, expected);" : mode === "shouldPanic" ? `#[should_panic(expected = "${expectedPanic}")]` : "fn test() -> Result<(), String> { ... }";
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="测试断言模式">
          {(["assert", "assertEq", "shouldPanic", "result"] as AssertionMode[]).map((item) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 border-b border-r border-border px-2 text-xs sm:border-b-0 sm:text-sm ${mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item === "assertEq" ? "assert_eq" : item === "shouldPanic" ? "should_panic" : item}</button>)}
        </div>
        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            {mode === "shouldPanic" ? <><label className="block text-sm text-primary">实际 panic message<input value={panicMessage} onChange={(event) => setPanicMessage(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary" /></label><label className="block text-sm text-primary">expected substring<input value={expectedPanic} onChange={(event) => setExpectedPanic(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary" /></label></> : <><label className="block text-sm text-primary">actual：{actual}<input type="range" min="-2" max="8" value={actual} onChange={(event) => setActual(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">expected：{expected}<input type="range" min="-2" max="8" value={expected} onChange={(event) => setExpected(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label></>}
          </section>
          <section className={`border p-4 ${passed ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">测试契约</span><code className="mt-3 block min-h-20 break-words border border-border bg-bg p-3 text-xs leading-6 text-primary">{code}</code><h3 className="mt-6 text-base font-semibold text-primary">{passed ? "test ... ok" : "test ... FAILED"}</h3><p className="mt-4 text-sm text-secondary">{mode === "shouldPanic" ? passed ? "发生 panic 且消息包含目标子串。" : "无 panic 或 panic 原因不匹配都会失败。" : mode === "result" ? passed ? "返回 Ok(())。" : "返回 Err(String)，test harness 标记失败。" : passed ? "断言成立，不触发 panic。" : "断言宏触发 panic，并显示上下文。"}</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">普通断言失败会 panic；Result test 返回 Err 失败；should_panic 还应约束预期消息。</figcaption>
    </figure>
  );
}

const testCatalog = [
  { name: "math::add_two_and_two", ignored: false, output: "2 + 2 = 4" },
  { name: "math::add_three_and_two", ignored: false, output: "3 + 2 = 5" },
  { name: "api::one_hundred", ignored: false, output: "100 + 2 = 102" },
  { name: "slow::expensive_test", ignored: true, output: "slow fixture complete" },
] as const;

type IgnoreMode = "normal" | "ignored" | "include";

export function RplTestRunnerLab() {
  const [filter, setFilter] = useState("");
  const [threads, setThreads] = useState(4);
  const [showOutput, setShowOutput] = useState(false);
  const [ignoreMode, setIgnoreMode] = useState<IgnoreMode>("normal");
  const selected = useMemo(() => testCatalog.filter((test) => test.name.includes(filter)).filter((test) => ignoreMode === "normal" ? !test.ignored : ignoreMode === "ignored" ? test.ignored : true), [filter, ignoreMode]);
  const command = `cargo test${filter ? ` ${filter}` : ""} -- --test-threads=${threads}${showOutput ? " --show-output" : ""}${ignoreMode === "ignored" ? " --ignored" : ignoreMode === "include" ? " --include-ignored" : ""}`;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.3fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">名称过滤<input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="例如 add 或 math" className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary" /></label><label className="block text-sm text-primary">test threads：{threads}<input type="range" min="1" max="4" value={threads} onChange={(event) => setThreads(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={showOutput} onChange={(event) => setShowOutput(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />show successful output</label><select value={ignoreMode} onChange={(event) => setIgnoreMode(event.target.value as IgnoreMode)} className="min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="normal">默认：跳过 ignored</option><option value="ignored">仅 ignored</option><option value="include">包含 ignored</option></select></section>
          <section className="min-h-96 border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><span className="text-xs text-secondary">实际命令</span><code className="mt-2 block break-words border border-border bg-bg p-3 text-xs leading-6 text-primary">{command}</code><div className="mt-4 space-y-2">{selected.map((test) => <div key={test.name} className="border border-border bg-bg p-3"><div className="flex items-center justify-between gap-3 text-xs"><code className="break-words text-primary">{test.name}</code><span className="text-emerald-400">ok</span></div>{showOutput && <p className="mt-2 border-t border-border pt-2 text-xs text-secondary">{test.output}</p>}</div>)}{selected.length === 0 && <div className="border border-border bg-bg p-4 text-sm text-secondary">0 tests matched</div>}</div><p className="mt-4 text-xs text-secondary">{selected.length} run · {testCatalog.length - selected.length} filtered/ignored · {threads === 1 ? "串行，适合共享外部状态诊断" : "并行，测试必须彼此隔离"}</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">`--` 前参数属于 Cargo，后参数属于 test binary；过滤、并发、输出和 ignored 独立控制。</figcaption>
    </figure>
  );
}

type TestLayer = "unit" | "integration";

export function RplTestOrganizationLab() {
  const [layer, setLayer] = useState<TestLayer>("unit");
  const [targetPrivate, setTargetPrivate] = useState(false);
  const allowed = layer === "unit" || !targetPrivate;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border" role="group" aria-label="测试层级"><button type="button" aria-pressed={layer === "unit"} onClick={() => setLayer("unit")} className={`min-h-11 border-r border-border text-sm ${layer === "unit" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>unit test</button><button type="button" aria-pressed={layer === "integration"} onClick={() => setLayer("integration")} className={`min-h-11 text-sm ${layer === "integration" ? "bg-primary text-bg" : "bg-bg text-secondary"}`}>integration test</button></div>
        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1fr_1.15fr]">
          <section className="border border-border bg-bg p-4"><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={targetPrivate} onChange={(event) => setTargetPrivate(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />测试 private function</label><div className="mt-5 space-y-2 font-mono text-xs text-primary">{layer === "unit" ? <><div className="border border-border p-3">src/lib.rs</div><div className="ml-5 border border-border p-3">└── #[cfg(test)] mod tests</div><div className="ml-10 border border-border p-3">└── use super::*</div></> : <><div className="border border-border p-3">tests/api_flow.rs（独立 crate）</div><div className="ml-5 border border-border p-3">├── use my_lib::public_api</div><div className="ml-5 border border-border p-3">└── mod common → common/mod.rs</div></>}</div></section>
          <section className={`border p-4 ${allowed ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">编译与可见性</span><h3 className="mt-4 text-base font-semibold text-primary">{allowed ? "可编译并运行" : "private item 对外部 test crate 不可见"}</h3><p className="mt-5 text-sm text-secondary">{layer === "unit" ? "tests 是源码模块的 child，可通过 super 访问祖先 private item；cfg(test) 仅在测试构建包含。" : "tests 顶层文件模拟外部用户，只能依赖 library crate 的 public API；每个文件独立编译。"}</p><p className="mt-5 border-t border-border pt-4 text-xs text-secondary">{layer === "integration" ? "共享 helper 放 tests/common/mod.rs，避免 common.rs 被 Cargo 当成额外 integration crate。" : "断言 private 实现是允许的，但是否需要应按重构稳定性取舍。"}</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">unit test 验证模块内部，integration test 以外部 crate 身份验证公开契约和跨模块组合。</figcaption>
    </figure>
  );
}
