"use client";

import { useMemo, useState } from "react";

type ArgumentCount = 0 | 1 | 2;

export function RplCliBoundaryLab() {
  const [argumentCount, setArgumentCount] = useState<ArgumentCount>(2);
  const [query, setQuery] = useState("body");
  const [filePath, setFilePath] = useState("poem.txt");
  const programArgs = [query, filePath].slice(0, argumentCount);
  const processArgs = ["target/debug/minigrep", ...programArgs];
  const valid = argumentCount === 2 && query.length > 0 && filePath.length > 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="传给 minigrep 的参数数量">
          {([0, 1, 2] as ArgumentCount[]).map((count) => (
            <button
              key={count}
              type="button"
              aria-pressed={argumentCount === count}
              onClick={() => setArgumentCount(count)}
              className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${argumentCount === count ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}
            >
              {count} 个程序参数
            </button>
          ))}
        </div>

        <div className="mt-5 grid min-h-96 gap-4 lg:grid-cols-[0.9fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              query
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary" />
            </label>
            <label className="block text-sm text-primary">
              file path
              <input value={filePath} onChange={(event) => setFilePath(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary" />
            </label>
            <div className="border border-border bg-elevated p-3 text-xs leading-6 text-secondary">
              <span className="block text-primary">Shell / Cargo 边界</span>
              <code className="mt-1 block break-words">cargo run -- {programArgs.join(" ")}</code>
              <span className="mt-2 block">`--` 之后才传给生成的程序。</span>
            </div>
          </section>

          <section className={`border p-4 ${valid ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">env::args().collect() 的结果</span>
            <div className="mt-3 space-y-2 font-mono text-xs">
              {processArgs.map((arg, index) => (
                <div key={`${index}-${arg}`} className="grid grid-cols-[4rem_1fr] border border-border bg-bg p-3">
                  <span className="text-secondary">args[{index}]</span>
                  <span className="break-words text-primary">{JSON.stringify(arg)}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-border pt-4">
              <h3 className="text-base font-semibold text-primary">{valid ? "Config::build -> Ok(Config)" : "Config::build -> Err(not enough arguments)"}</h3>
              <p className="mt-3 text-sm text-secondary">
                {valid ? "args[0] 是程序名，query 与 file_path 来自索引 1、2；配置值被组合为一个有意义的边界对象。" : "直接索引会产生面向程序员的越界 panic；先校验长度并返回 Result，main 才能给用户可操作的错误。"}
              </p>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Cargo 的参数分隔符、进程参数向量和 Config 校验是三个连续但不同的边界。</figcaption>
    </figure>
  );
}

type FailureStage = "none" | "config" | "file";

const architectureStages = [
  { key: "main", title: "main.rs", detail: "组装依赖、处理顶层失败、决定退出码" },
  { key: "config", title: "Config::build", detail: "把参数和环境变量转换为配置" },
  { key: "run", title: "lib.rs / run", detail: "读取文件、选择搜索策略、返回 Result" },
  { key: "search", title: "search", detail: "纯字符串输入输出，可直接单元测试" },
] as const;

export function RplMinigrepArchitectureLab() {
  const [failureStage, setFailureStage] = useState<FailureStage>("none");
  const failedAt = failureStage === "config" ? "config" : failureStage === "file" ? "run" : null;
  const stream = failureStage === "none" ? "stdout" : "stderr";
  const exitCode = failureStage === "none" ? 0 : 1;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="minigrep 执行场景">
          {([
            ["none", "搜索成功"],
            ["config", "缺少参数"],
            ["file", "文件失败"],
          ] as const).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={failureStage === value} onClick={() => setFailureStage(value)} className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${failureStage === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-5 grid min-h-96 gap-4 lg:grid-cols-[1.25fr_0.8fr]">
          <section className="border border-border bg-bg p-4">
            <span className="text-xs text-secondary">职责与错误传播</span>
            <div className="mt-4 space-y-2">
              {architectureStages.map((stage, index) => {
                const stopped = failedAt === "config" ? index > 1 : failedAt === "run" ? index > 2 : false;
                const failed = failedAt === stage.key;
                return (
                  <div key={stage.key} className={`grid min-h-20 grid-cols-[2rem_1fr] border p-3 ${failed ? "border-rose-500/50 bg-rose-500/10" : stopped ? "border-border bg-elevated opacity-45" : "border-cyan-500/35 bg-cyan-500/10"}`}>
                    <span className="font-mono text-xs text-secondary">{index + 1}</span>
                    <div><h3 className="text-sm font-semibold text-primary">{stage.title}</h3><p className="mt-1 text-xs leading-5 text-secondary">{failed ? `${stage.detail}；此处返回 Err。` : stopped ? "上游已失败，不再执行。" : stage.detail}</p></div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={`border p-4 ${stream === "stdout" ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">操作系统可观察契约</span>
            <div className="mt-5 border border-border bg-bg p-4">
              <span className="text-xs text-secondary">stream</span>
              <strong className="mt-2 block text-lg text-primary">{stream}</strong>
              <p className="mt-2 text-xs text-secondary">{stream === "stdout" ? "只写匹配行，可被 `>` 安全重定向。" : "用 eprintln! 写诊断，stdout 保持为空。"}</p>
            </div>
            <div className="mt-3 border border-border bg-bg p-4">
              <span className="text-xs text-secondary">exit status</span>
              <strong className="mt-2 block text-lg text-primary">{exitCode}</strong>
              <p className="mt-2 text-xs text-secondary">{exitCode === 0 ? "调用者可把结果当成功数据继续处理。" : "脚本和 shell 能在不解析文本时检测失败。"}</p>
            </div>
            <code className="mt-4 block break-words border border-border bg-bg p-3 text-xs leading-6 text-primary">{failureStage === "none" ? "println!(\"{line}\");" : failureStage === "config" ? "eprintln!(\"Problem parsing arguments: {err}\");" : "eprintln!(\"Application error: {err}\");"}</code>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">薄 main 只协调边界；lib 返回结构化结果；stdout、stderr 与退出码构成 CLI 的外部协议。</figcaption>
    </figure>
  );
}

type TddPhase = "red" | "green" | "refactor";

const sampleContents = ["Rust:", "safe, fast, productive.", "Pick three.", "Trust me."];

export function RplSearchTddLab() {
  const [phase, setPhase] = useState<TddPhase>("green");
  const [query, setQuery] = useState("duct");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const matches = useMemo(() => {
    if (phase === "red") return [];
    const normalizedQuery = ignoreCase ? query.toLocaleLowerCase() : query;
    return sampleContents.filter((line) => (ignoreCase ? line.toLocaleLowerCase() : line).includes(normalizedQuery));
  }, [ignoreCase, phase, query]);
  const expected = ignoreCase && query.toLocaleLowerCase() === "rust" ? ["Rust:", "Trust me."] : query === "duct" ? ["safe, fast, productive."] : matches;
  const testPasses = matches.join("\n") === expected.join("\n");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="TDD 阶段">
          {([
            ["red", "RED 失败测试"],
            ["green", "GREEN 最小实现"],
            ["refactor", "REFACTOR"],
          ] as const).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={phase === value} onClick={() => setPhase(value)} className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${phase === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-5 grid min-h-[28rem] gap-4 lg:grid-cols-[0.85fr_1.25fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              query
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary" />
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input type="checkbox" checked={ignoreCase} onChange={(event) => setIgnoreCase(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              IGNORE_CASE 已设置
            </label>
            <div className="border border-border bg-elevated p-3 text-xs leading-6 text-secondary">
              <code className="block break-words text-primary">search&lt;&apos;a&gt;(query: &amp;str, contents: &amp;&apos;a str) -&gt; Vec&lt;&amp;&apos;a str&gt;</code>
              <p className="mt-2">返回切片借用 contents，不借用 query，也不复制匹配行。</p>
            </div>
          </section>

          <section className={`border p-4 ${testPasses ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <div className="flex items-center justify-between gap-3"><span className="text-xs text-secondary">逐行 contains 结果</span><strong className="text-sm text-primary">{testPasses ? "test ... ok" : "test ... FAILED"}</strong></div>
            <div className="mt-4 space-y-2">
              {sampleContents.map((line) => {
                const matched = matches.includes(line);
                return <div key={line} className={`grid grid-cols-[5rem_1fr] border p-3 text-xs ${matched ? "border-cyan-500/40 bg-cyan-500/10" : "border-border bg-bg"}`}><span className="text-secondary">{matched ? "push(&str)" : "skip"}</span><span className="break-words text-primary">{line}</span></div>;
              })}
            </div>
            <p className="mt-4 border-t border-border pt-4 text-xs leading-5 text-secondary">{phase === "red" ? "测试先定义期望，而占位实现返回空 Vec；确认失败原因正确后再实现。" : phase === "green" ? "lines -> contains -> push：只写足够让测试通过的循环。" : "保持测试绿色，把循环重写为 iterator/filter/collect，不改变公开行为。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">TDD 用失败测试锁定契约；生命周期把返回行明确连接到 contents；IGNORE_CASE 只切换匹配策略。</figcaption>
    </figure>
  );
}
