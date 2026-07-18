"use client";

import { useMemo, useState } from "react";

const toolchainSteps = [
  {
    label: "源码",
    artifact: "main.rs",
    action: "编辑 UTF-8 Rust 源文件",
    evidence: "文件中存在 fn main() 入口",
    tone: "border-cyan-500/40 bg-cyan-500/10",
  },
  {
    label: "编译",
    artifact: "rustc main.rs",
    action: "解析、类型检查并生成本机代码",
    evidence: "错误在生成二进制前被拒绝",
    tone: "border-amber-500/40 bg-amber-500/10",
  },
  {
    label: "产物",
    artifact: "./main",
    action: "操作系统加载本机可执行文件",
    evidence: "标准输出出现 Hello, world!",
    tone: "border-emerald-500/40 bg-emerald-500/10",
  },
] as const;

export function RplToolchainLab() {
  const [active, setActive] = useState(0);
  const step = toolchainSteps[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-72 gap-5 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="grid grid-cols-3 border border-border" role="group" aria-label="选择 Rust 工具链阶段">
              {toolchainSteps.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  className={`min-h-12 border-r border-border px-2 text-sm last:border-r-0 ${
                    active === index
                      ? "bg-primary text-bg"
                      : "bg-bg text-secondary hover:text-primary"
                  }`}
                >
                  {index + 1}. {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2" aria-label="Rust 源码经过编译成为可执行文件">
              {toolchainSteps.map((item, index) => (
                <div key={item.label} className="contents">
                  <div className={`min-h-28 border p-3 ${active === index ? item.tone : "border-border bg-bg"}`}>
                    <span className="text-xs text-secondary">{item.label}</span>
                    <strong className="mt-2 block break-words font-mono text-sm text-primary">{item.artifact}</strong>
                  </div>
                  {index < toolchainSteps.length - 1 ? (
                    <span aria-hidden="true" className="text-lg text-secondary">→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <section className={`min-h-64 border p-4 ${step.tone}`} aria-live="polite">
            <span className="text-xs text-secondary">当前阶段</span>
            <h3 className="mt-2 text-base font-semibold text-primary">{step.label}</h3>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-secondary">动作</dt>
                <dd className="mt-1 text-primary">{step.action}</dd>
              </div>
              <div>
                <dt className="text-secondary">可见证据</dt>
                <dd className="mt-1 text-primary">{step.evidence}</dd>
              </div>
              <div>
                <dt className="text-secondary">边界</dt>
                <dd className="mt-1 text-primary">
                  {active === 0
                    ? "源码不是可执行文件，操作系统不能直接运行。"
                    : active === 1
                      ? "rustc 适合单文件实验；真实项目交给 Cargo 编排。"
                      : "二进制已包含目标平台机器码，但不跨平台通用。"}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 的首个闭环不是“写出代码”，而是能区分源码、编译器动作和可验证产物。
      </figcaption>
    </figure>
  );
}

const cargoModes = {
  check: {
    command: "cargo check",
    output: "target/debug/.fingerprint",
    purpose: "完成解析、类型检查与依赖检查，不生成最终可执行文件",
    speed: "最快反馈",
    tone: "border-cyan-500/40 bg-cyan-500/10",
  },
  build: {
    command: "cargo build",
    output: "target/debug/hello_cargo",
    purpose: "编译开发配置产物，保留较快编译和调试信息",
    speed: "开发构建",
    tone: "border-amber-500/40 bg-amber-500/10",
  },
  run: {
    command: "cargo run",
    output: "Compiling ... → Running ...",
    purpose: "必要时先构建，再立即执行当前二进制目标",
    speed: "构建并运行",
    tone: "border-emerald-500/40 bg-emerald-500/10",
  },
} as const;

type CargoMode = keyof typeof cargoModes;

export function RplCargoCycleLab() {
  const [mode, setMode] = useState<CargoMode>("check");
  const [sourceChanged, setSourceChanged] = useState(true);
  const selected = cargoModes[mode];

  const stages = useMemo(
    () => [
      { label: "读取清单", active: true },
      { label: "解析依赖", active: true },
      { label: "检查源码", active: sourceChanged || mode === "check" },
      { label: "生成二进制", active: mode !== "check" && sourceChanged },
      { label: "执行", active: mode === "run" },
    ],
    [mode, sourceChanged],
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-3 border border-border" role="group" aria-label="Cargo 命令模式">
            {(Object.keys(cargoModes) as CargoMode[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={mode === item}
                onClick={() => setMode(item)}
                className={`min-h-11 min-w-24 border-r border-border px-3 font-mono text-sm last:border-r-0 ${
                  mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary">
            <input
              type="checkbox"
              checked={sourceChanged}
              onChange={(event) => setSourceChanged(event.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            源码已变化
          </label>
        </div>

        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-2">
            {stages.map((stage, index) => (
              <div
                key={stage.label}
                className={`grid min-h-12 grid-cols-[2rem_1fr_auto] items-center gap-3 border px-3 ${
                  stage.active
                    ? selected.tone
                    : "border-border bg-bg text-secondary opacity-55"
                }`}
              >
                <span className="font-mono text-xs text-secondary">0{index + 1}</span>
                <span className="text-sm text-primary">{stage.label}</span>
                <span className="text-xs text-secondary">{stage.active ? "执行" : "跳过"}</span>
              </div>
            ))}
          </div>

          <section className={`min-h-72 border p-4 ${selected.tone}`} aria-live="polite">
            <code className="block break-words text-base font-semibold text-primary">$ {selected.command}</code>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-secondary">目标</dt>
                <dd className="mt-1 text-primary">{selected.purpose}</dd>
              </div>
              <div>
                <dt className="text-secondary">反馈性质</dt>
                <dd className="mt-1 text-primary">{selected.speed}</dd>
              </div>
              <div>
                <dt className="text-secondary">关键输出</dt>
                <dd className="mt-1 break-words font-mono text-primary">{sourceChanged ? selected.output : "Fresh: 复用未失效产物"}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `check`、`build` 和 `run` 共享清单与依赖图，但验证深度和是否生成、执行二进制不同。
      </figcaption>
    </figure>
  );
}

const dependencyOptions = {
  none: { line: "# no external dependencies", lock: "仅记录当前 package", risk: "没有第三方版本解析" },
  exact: { line: 'rand = "=0.9.2"', lock: "锁定 rand 0.9.2", risk: "复现强，但不会自动获得补丁更新" },
  compatible: { line: 'rand = "0.9.2"', lock: "解析一个兼容版本并写入 Cargo.lock", risk: "按 Cargo 兼容规则允许安全更新" },
} as const;

type DependencyMode = keyof typeof dependencyOptions;

export function RplManifestLab() {
  const [edition, setEdition] = useState<"2021" | "2024">("2024");
  const [dependency, setDependency] = useState<DependencyMode>("compatible");
  const selected = dependencyOptions[dependency];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid min-h-80 gap-5 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-5">
            <fieldset>
              <legend className="text-sm font-semibold text-primary">Edition</legend>
              <div className="mt-2 grid grid-cols-2 border border-border">
                {(["2021", "2024"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={edition === value}
                    onClick={() => setEdition(value)}
                    className={`min-h-11 border-r border-border px-3 text-sm last:border-r-0 ${
                      edition === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"
                    }`}
                  >
                    Rust {value}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-primary">依赖约束</legend>
              <div className="mt-2 grid border border-border">
                {(Object.keys(dependencyOptions) as DependencyMode[]).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={dependency === value}
                    onClick={() => setDependency(value)}
                    className={`min-h-11 border-b border-border px-3 text-left text-sm last:border-b-0 ${
                      dependency === value ? "bg-emerald-500/15 text-primary" : "bg-bg text-secondary hover:text-primary"
                    }`}
                  >
                    {value === "none" ? "无外部依赖" : value === "exact" ? "精确版本" : "兼容版本"}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="grid min-h-76 grid-rows-[1fr_auto] border border-border bg-bg">
            <pre className="overflow-x-auto p-4 text-xs leading-6 text-primary">
              <code>{`[package]\nname = "hello_cargo"\nversion = "0.1.0"\nedition = "${edition}"\n\n[dependencies]\n${selected.line}`}</code>
            </pre>
            <dl className="grid gap-3 border-t border-border p-4 text-xs sm:grid-cols-2">
              <div>
                <dt className="text-secondary">Cargo.lock</dt>
                <dd className="mt-1 text-primary">{selected.lock}</dd>
              </div>
              <div>
                <dt className="text-secondary">解释</dt>
                <dd className="mt-1 text-primary">{selected.risk}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `Cargo.toml` 描述允许的依赖和语言 Edition，`Cargo.lock` 记录本次解析出的具体依赖图。
      </figcaption>
    </figure>
  );
}
