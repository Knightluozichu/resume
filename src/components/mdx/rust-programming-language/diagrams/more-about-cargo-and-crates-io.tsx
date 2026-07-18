"use client";

import { useMemo, useState } from "react";

type ProfileMode = "dev" | "release" | "custom";

export function RplCargoProfileLab() {
  const [mode, setMode] = useState<ProfileMode>("dev");
  const [customOpt, setCustomOpt] = useState(1);
  const optLevel = mode === "dev" ? 0 : mode === "release" ? 3 : customOpt;
  const command = mode === "release" ? "cargo build --release" : "cargo build";
  const profileName = mode === "release" ? "release" : "dev";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="Cargo profile">
          {([
            ["dev", "默认 dev"],
            ["release", "默认 release"],
            ["custom", "自定义 dev"],
          ] as const).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${mode === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[0.9fr_1.2fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              opt-level：{optLevel}
              <input type="range" min="0" max="3" value={optLevel} disabled={mode !== "custom"} onChange={(event) => setCustomOpt(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)] disabled:opacity-45" />
            </label>
            <code className="block border border-border bg-elevated p-3 text-xs leading-6 text-primary">{mode === "custom" ? `[profile.dev]\nopt-level = ${customOpt}` : `# Cargo default for [profile.${profileName}]\nopt-level = ${optLevel}`}</code>
            <code className="block border border-border bg-elevated p-3 text-xs text-primary">{command}</code>
          </section>

          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">独立 profile 决策</span>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">编译反馈</span><strong className="mt-2 block text-sm text-primary">{optLevel === 0 ? "偏快" : optLevel === 3 ? "偏慢" : "折中"}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">运行优化</span><strong className="mt-2 block text-sm text-primary">{optLevel === 0 ? "最低" : optLevel === 3 ? "最高" : `等级 ${optLevel}`}</strong></div>
              <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">artifact</span><strong className="mt-2 block break-words text-sm text-primary">target/{mode === "release" ? "release" : "debug"}</strong></div>
            </div>
            <p className="mt-5 text-sm text-secondary">设置只覆盖选中的 profile，其余选项继续使用 Cargo 默认值。调高优化通常增加构建时间；实际幅度取决于 crate 图和代码，不能由 opt-level 单独预测。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">dev 与 release 是独立配置集合；局部覆盖一个键不会复制或重定义整个 profile。</figcaption>
    </figure>
  );
}

type PublishField = "name" | "description" | "license" | "docs" | "examples";
type PublishAction = "package" | "publish" | "yank";

const publishFields: Array<{ key: PublishField; label: string; required: boolean }> = [
  { key: "name", label: "唯一 crate 名", required: true },
  { key: "description", label: "description", required: true },
  { key: "license", label: "license / license-file", required: true },
  { key: "docs", label: "公开 API 文档", required: false },
  { key: "examples", label: "可运行 doc tests", required: false },
];

export function RplCratePublishLab() {
  const [enabled, setEnabled] = useState<Record<PublishField, boolean>>({ name: true, description: true, license: false, docs: true, examples: true });
  const [action, setAction] = useState<PublishAction>("package");
  const requiredReady = publishFields.filter((field) => field.required).every((field) => enabled[field.key]);
  const qualityReady = enabled.docs && enabled.examples;
  const allowed = action === "yank" || requiredReady;
  const command = action === "package" ? "cargo package" : action === "publish" ? "cargo publish" : "cargo yank --vers 1.0.1";

  function toggle(key: PublishField) {
    setEnabled((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="crate 发布动作">
          {([
            ["package", "打包检查"],
            ["publish", "正式发布"],
            ["yank", "Yank 版本"],
          ] as const).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={action === value} onClick={() => setAction(value)} className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${action === value ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{label}</button>
          ))}
        </div>

        <div className="mt-5 grid min-h-[26rem] gap-4 lg:grid-cols-[1fr_1.1fr]">
          <section className="space-y-2 border border-border bg-bg p-4">
            <span className="text-xs text-secondary">发布前清单</span>
            {publishFields.map((field) => (
              <label key={field.key} className="flex min-h-11 items-center justify-between gap-3 border border-border bg-elevated px-3 text-sm text-primary"><span>{field.label}{field.required ? " *" : ""}</span><input type="checkbox" checked={enabled[field.key]} onChange={() => toggle(field.key)} className="h-4 w-4 accent-[var(--accent)]" /></label>
            ))}
          </section>

          <section className={`border p-4 ${allowed ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">registry 结果</span>
            <code className="mt-3 block border border-border bg-bg p-3 text-sm text-primary">{command}</code>
            <h3 className="mt-5 text-base font-semibold text-primary">{action === "yank" ? "阻止新依赖选择，不删除源码" : allowed ? action === "publish" ? "可上传一个不可覆盖的新版本" : "可构建并检查将上传的 package" : "缺少 crates.io 必需元数据"}</h3>
            <p className="mt-3 text-sm text-secondary">{action === "publish" ? "发布版本不能覆盖或常规删除；泄漏 secret 时 yank 无法抹除内容，必须立即轮换 secret。" : action === "yank" ? "已有 Cargo.lock 仍可继续使用该版本；新 lock 不再选择它，--undo 可撤销 yank。" : "先检查实际打包文件、元数据和编译结果，再考虑不可逆上传。"}</p>
            <p className="mt-5 border-t border-border pt-4 text-xs text-secondary">文档质量：{qualityReady ? "示例可作为 cargo test 的 doc tests，公开 API 有入口说明。" : "registry 可能允许发布，但用户发现和正确使用的证据不足。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">发布门禁包含 registry 必需元数据和用户可用性证据；publish 与 yank 都不是删除操作。</figcaption>
    </figure>
  );
}

type WorkspaceCommand = "build" | "test" | "run";

const workspacePackages = [
  { name: "adder", kind: "binary", dependsOn: ["add_one", "add_two"] },
  { name: "add_one", kind: "library", dependsOn: [] },
  { name: "add_two", kind: "library", dependsOn: ["add_one"] },
] as const;

export function RplCargoWorkspaceLab() {
  const [selected, setSelected] = useState("adder");
  const [command, setCommand] = useState<WorkspaceCommand>("test");
  const [allPackages, setAllPackages] = useState(true);
  const targetPackages = useMemo(() => allPackages ? workspacePackages.map((item) => item.name) : [selected], [allPackages, selected]);
  const shellCommand = `cargo ${command}${allPackages ? "" : ` -p ${selected}`}`;
  const runnable = command !== "run" || selected === "adder";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.85fr]">
          <section className="border border-border bg-bg p-4">
            <span className="text-xs text-secondary">workspace members 与显式 path 依赖</span>
            <div className="mt-4 space-y-3">
              {workspacePackages.map((pkg) => (
                <button key={pkg.name} type="button" aria-pressed={selected === pkg.name} onClick={() => setSelected(pkg.name)} className={`grid min-h-20 w-full grid-cols-[1fr_auto] items-center border p-3 text-left ${selected === pkg.name ? "border-cyan-500/50 bg-cyan-500/10" : "border-border bg-elevated"}`}><span><strong className="block text-sm text-primary">{pkg.name}</strong><span className="mt-1 block text-xs text-secondary">{pkg.kind} package</span></span><code className="text-xs text-secondary">{pkg.dependsOn.length > 0 ? `-> ${pkg.dependsOn.join(", ")}` : "no path deps"}</code></button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs"><div className="border border-border bg-elevated p-3"><span className="text-secondary">共享解析</span><strong className="mt-2 block text-primary">根 Cargo.lock</strong></div><div className="border border-border bg-elevated p-3"><span className="text-secondary">共享 artifact</span><strong className="mt-2 block text-primary">根 target/</strong></div></div>
          </section>

          <section className="space-y-4 border border-border bg-bg p-4">
            <select value={command} onChange={(event) => { const value = event.target.value as WorkspaceCommand; setCommand(value); if (value === "run") setAllPackages(false); }} className="min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="build">build</option><option value="test">test</option><option value="run">run</option></select>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={allPackages} disabled={command === "run"} onChange={(event) => setAllPackages(event.target.checked)} className="h-4 w-4 accent-[var(--accent)] disabled:opacity-45" />作用于整个 workspace</label>
            <code className="block break-words border border-border bg-elevated p-3 text-sm text-primary">{shellCommand}</code>
            <div className={`border p-4 ${runnable ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">命令作用域</span><strong className="mt-2 block text-sm text-primary">{runnable ? targetPackages.join(", ") : `${selected} 没有 binary target`}</strong><p className="mt-3 text-xs text-secondary">{allPackages ? "workspace 共享 lock/target，但每个 package 仍需声明自己直接使用的外部依赖。" : "-p 选择一个 package；其显式依赖仍会按图构建。"}</p></div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">workspace 协调多个 package 的 lock、artifact 和命令范围，但不会隐式创建 package 之间的依赖。</figcaption>
    </figure>
  );
}
