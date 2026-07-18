"use client";

import { useMemo, useState } from "react";

type ParseState = "raw" | "trimmed" | "parsed" | "compared";

const parseStages: Array<{ id: ParseState; label: string; code: string }> = [
  { id: "raw", label: "stdin", code: '"42\\n" : String' },
  { id: "trimmed", label: "trim", code: '"42" : &str' },
  { id: "parsed", label: "parse", code: "42 : u32" },
  { id: "compared", label: "cmp", code: "Ordering::Less" },
];

export function RplGuessPipelineLab() {
  const [stage, setStage] = useState<ParseState>("raw");
  const [guess, setGuess] = useState(42);
  const [secret, setSecret] = useState(61);
  const [invalid, setInvalid] = useState(false);

  const stageIndex = parseStages.findIndex((item) => item.id === stage);
  const result = invalid
    ? "Err(ParseIntError)"
    : guess < secret
      ? "Ordering::Less"
      : guess > secret
        ? "Ordering::Greater"
        : "Ordering::Equal";

  const output = invalid
    ? '输入 "rust\\n" 无法解析为 u32'
    : stage === "raw"
      ? `"${guess}\\n" : String`
      : stage === "trimmed"
        ? `"${guess}" : &str`
        : stage === "parsed"
          ? `${guess} : u32`
          : result;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-96 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="grid grid-cols-4 border border-border" role="group" aria-label="猜数字输入处理阶段">
              {parseStages.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={stage === item.id}
                  onClick={() => setStage(item.id)}
                  className={`min-h-12 border-r border-border px-1 text-xs last:border-r-0 sm:text-sm ${
                    stage === item.id ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-1">
              {parseStages.map((item, index) => (
                <div key={item.id} className="contents">
                  <div
                    className={`min-h-28 border p-2 ${
                      index <= stageIndex
                        ? index === stageIndex
                          ? "border-emerald-500/50 bg-emerald-500/15"
                          : "border-cyan-500/35 bg-cyan-500/10"
                        : "border-border bg-bg opacity-55"
                    }`}
                  >
                    <span className="text-xs text-secondary">{index + 1}</span>
                    <strong className="mt-2 block text-xs text-primary">{item.label}</strong>
                    <code className="mt-3 block break-words text-[11px] text-secondary">{item.code}</code>
                  </div>
                  {index < parseStages.length - 1 ? <span aria-hidden="true" className="text-secondary">→</span> : null}
                </div>
              ))}
            </div>

            <section className="mt-4 min-h-24 border border-border bg-bg p-4" aria-live="polite">
              <span className="text-xs text-secondary">阶段输出</span>
              <code className={`mt-2 block break-words text-sm ${invalid && stageIndex >= 2 ? "text-rose-500" : "text-primary"}`}>
                {invalid && stageIndex >= 2 ? "Err(ParseIntError) → continue" : output}
              </code>
            </section>
          </div>

          <div className="space-y-5 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              秘密数字：<strong>{secret}</strong>
              <input
                type="range"
                min="1"
                max="100"
                value={secret}
                onChange={(event) => setSecret(Number(event.target.value))}
                className="mt-2 w-full accent-[var(--accent)]"
              />
            </label>
            <label className="block text-sm text-primary">
              玩家输入：<strong>{invalid ? "rust" : guess}</strong>
              <input
                type="range"
                min="1"
                max="100"
                value={guess}
                disabled={invalid}
                onChange={(event) => setGuess(Number(event.target.value))}
                className="mt-2 w-full accent-[var(--accent)] disabled:opacity-40"
              />
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={invalid}
                onChange={(event) => setInvalid(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              输入非数字文本
            </label>
            <dl className="border-t border-border pt-4 text-sm">
              <dt className="text-secondary">最终分支</dt>
              <dd className="mt-2 font-mono text-primary">{result}</dd>
            </dl>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        终端输入先是带换行的 String；只有 trim 和 parse 成功后，才能与同为 u32 的秘密数字比较。
      </figcaption>
    </figure>
  );
}

const dependencyNodes = [
  { name: "guessing_game", kind: "当前 package", depth: 0 },
  { name: "rand 0.8.5", kind: "直接依赖", depth: 1 },
  { name: "rand_core", kind: "传递依赖", depth: 2 },
  { name: "rand_chacha", kind: "传递依赖", depth: 2 },
  { name: "getrandom", kind: "传递依赖", depth: 3 },
] as const;

export function RplDependencyGraphLab() {
  const [lockPresent, setLockPresent] = useState(true);
  const [manifestChanged, setManifestChanged] = useState(false);

  const resolution = lockPresent && !manifestChanged
    ? "复用 Cargo.lock 中的具体版本"
    : manifestChanged
      ? "重新求解满足 Cargo.toml 的兼容版本"
      : "首次求解并生成 Cargo.lock";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex min-h-11 flex-1 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary">
            <input type="checkbox" checked={lockPresent} onChange={(event) => setLockPresent(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
            Cargo.lock 已存在
          </label>
          <label className="flex min-h-11 flex-1 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary">
            <input type="checkbox" checked={manifestChanged} onChange={(event) => setManifestChanged(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
            依赖约束已变化
          </label>
        </div>

        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-2">
            {dependencyNodes.map((node) => (
              <div
                key={node.name}
                className={`grid min-h-12 grid-cols-[1fr_auto] items-center border px-3 ${
                  node.depth === 0
                    ? "border-cyan-500/40 bg-cyan-500/10"
                    : node.depth === 1
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : "border-border bg-bg"
                }`}
                style={{ marginLeft: `${node.depth * 16}px` }}
              >
                <strong className="font-mono text-sm text-primary">{node.name}</strong>
                <span className="text-xs text-secondary">{node.kind}</span>
              </div>
            ))}
          </div>

          <section className="min-h-72 border border-amber-500/40 bg-amber-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">Cargo 构建决策</span>
            <h3 className="mt-2 text-base font-semibold text-primary">{resolution}</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-secondary">manifest 约束</dt>
                <dd className="mt-1 font-mono text-primary">rand = &quot;0.8.5&quot;</dd>
              </div>
              <div>
                <dt className="text-secondary">允许范围</dt>
                <dd className="mt-1 text-primary">≥ 0.8.5 且 &lt; 0.9.0</dd>
              </div>
              <div>
                <dt className="text-secondary">增量结果</dt>
                <dd className="mt-1 text-primary">依赖未变化时只重编当前 package；全部输入新鲜时直接完成。</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Cargo.toml 声明直接依赖约束，Cargo 求解完整传递依赖图，并用 Cargo.lock 固定具体结果。
      </figcaption>
    </figure>
  );
}

type GameOutcome = "invalid" | "less" | "greater" | "equal";

const gameOutcomes: Record<GameOutcome, { output: string; control: string; next: string; tone: string }> = {
  invalid: { output: "Err(_) ", control: "continue", next: "读取下一次输入", tone: "border-rose-500/40 bg-rose-500/10" },
  less: { output: "Too small!", control: "下一轮", next: "保留 secret，再次读取", tone: "border-cyan-500/40 bg-cyan-500/10" },
  greater: { output: "Too big!", control: "下一轮", next: "保留 secret，再次读取", tone: "border-amber-500/40 bg-amber-500/10" },
  equal: { output: "You win!", control: "break", next: "离开 loop，main 返回", tone: "border-emerald-500/40 bg-emerald-500/10" },
};

export function RplGameLoopLab() {
  const [outcome, setOutcome] = useState<GameOutcome>("less");
  const [round, setRound] = useState(1);
  const selected = gameOutcomes[outcome];

  const advance = () => {
    if (outcome !== "equal") setRound((value) => Math.min(9, value + 1));
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="选择猜数字结果">
          {(Object.keys(gameOutcomes) as GameOutcome[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={outcome === value}
              onClick={() => setOutcome(value)}
              className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${outcome === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-5 grid min-h-72 gap-4 lg:grid-cols-[1.25fr_1fr]">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
            <div className="min-h-36 border border-cyan-500/40 bg-cyan-500/10 p-3">
              <span className="text-xs text-secondary">round {round}</span>
              <strong className="mt-2 block text-sm text-primary">read_line</strong>
              <p className="mt-4 text-xs text-secondary">每轮创建新的 String 缓冲区</p>
            </div>
            <span aria-hidden="true" className="text-secondary">→</span>
            <div className={`min-h-36 border p-3 ${outcome === "invalid" ? selected.tone : "border-amber-500/40 bg-amber-500/10"}`}>
              <span className="text-xs text-secondary">parse</span>
              <strong className="mt-2 block text-sm text-primary">Result&lt;u32, _&gt;</strong>
              <p className="mt-4 text-xs text-secondary">错误直接 continue</p>
            </div>
            <span aria-hidden="true" className="text-secondary">→</span>
            <div className={`min-h-36 border p-3 ${selected.tone}`}>
              <span className="text-xs text-secondary">control</span>
              <strong className="mt-2 block font-mono text-sm text-primary">{selected.control}</strong>
              <p className="mt-4 text-xs text-secondary">{selected.output}</p>
            </div>
          </div>

          <section className={`min-h-64 border p-4 ${selected.tone}`} aria-live="polite">
            <span className="text-xs text-secondary">分支后状态</span>
            <h3 className="mt-2 text-base font-semibold text-primary">{selected.next}</h3>
            <button
              type="button"
              onClick={advance}
              disabled={outcome === "equal"}
              className="mt-8 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary hover:border-primary disabled:cursor-not-allowed disabled:opacity-45"
            >
              {outcome === "equal" ? "循环已结束" : "推进一轮"}
            </button>
            <p className="mt-4 text-xs text-secondary">
              secret_number 在 loop 外创建，因此每轮保持不变；guess 在 loop 内重新绑定。
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        无效输入用 continue 跳过本轮，猜中用 break 结束循环，其余比较结果保留秘密数字继续读取。
      </figcaption>
    </figure>
  );
}
