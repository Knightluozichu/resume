"use client";

import { useState } from "react";

const packageLayouts = {
  binary: {
    label: "单二进制",
    roots: ["src/main.rs"],
    artifacts: ["可执行文件 app"],
    summary: "1 package · 1 binary crate · 0 library crate",
  },
  library: {
    label: "单库",
    roots: ["src/lib.rs"],
    artifacts: ["library crate app"],
    summary: "1 package · 0 binary crate · 1 library crate",
  },
  mixed: {
    label: "库 + 多命令",
    roots: ["src/lib.rs", "src/main.rs", "src/bin/admin.rs", "src/bin/worker.rs"],
    artifacts: ["library crate app", "binary app", "binary admin", "binary worker"],
    summary: "1 package · 3 binary crates · 1 library crate",
  },
} as const;

type PackageLayout = keyof typeof packageLayouts;

export function RplPackageTopologyLab() {
  const [layout, setLayout] = useState<PackageLayout>("mixed");
  const selected = packageLayouts[layout];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="Cargo package 布局">
          {(Object.keys(packageLayouts) as PackageLayout[]).map((item) => (
            <button key={item} type="button" aria-pressed={layout === item} onClick={() => setLayout(item)} className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${layout === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>
              {packageLayouts[item].label}
            </button>
          ))}
        </div>
        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[0.8fr_1.1fr_1fr]">
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4">
            <span className="text-xs text-secondary">Cargo.toml</span>
            <h3 className="mt-3 text-base font-semibold text-primary">package app</h3>
            <p className="mt-6 text-sm text-secondary">构建、测试和发布边界</p>
          </section>
          <section className="border border-border bg-bg p-4" aria-live="polite">
            <span className="text-xs text-secondary">rustc 编译起点</span>
            <div className="mt-3 space-y-2">
              {selected.roots.map((root) => <code key={root} className="block min-h-10 break-words border border-border px-3 py-2 text-xs text-primary">{root}</code>)}
            </div>
          </section>
          <section className="border border-emerald-500/40 bg-emerald-500/10 p-4">
            <span className="text-xs text-secondary">独立 crate 产物</span>
            <div className="mt-3 space-y-2">
              {selected.artifacts.map((artifact) => <div key={artifact} className="min-h-10 border border-border bg-bg px-3 py-2 text-xs text-primary">{artifact}</div>)}
            </div>
          </section>
        </div>
        <p className="mt-4 border-t border-border pt-3 text-sm text-primary" aria-live="polite">{selected.summary}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Cargo package 是清单边界；每个 crate root 启动一棵独立模块树和一次编译单元。</figcaption>
    </figure>
  );
}

export function RplVisibilityPathLab() {
  const [modulePublic, setModulePublic] = useState(false);
  const [functionPublic, setFunctionPublic] = useState(false);
  const [caller, setCaller] = useState<"parent" | "child">("parent");
  const allowed = caller === "child" || (modulePublic && functionPublic);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.35fr]">
          <section className="space-y-3 border border-border bg-bg p-4">
            <span className="text-xs text-secondary">调用位置</span>
            <div className="grid grid-cols-2 border border-border" role="group" aria-label="调用方位置">
              <button type="button" aria-pressed={caller === "parent"} onClick={() => setCaller("parent")} className={`min-h-11 border-r border-border text-sm ${caller === "parent" ? "bg-primary text-bg" : "text-secondary"}`}>父模块</button>
              <button type="button" aria-pressed={caller === "child"} onClick={() => setCaller("child")} className={`min-h-11 text-sm ${caller === "child" ? "bg-primary text-bg" : "text-secondary"}`}>子模块内部</button>
            </div>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={modulePublic} onChange={(event) => setModulePublic(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />pub mod hosting</label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={functionPublic} onChange={(event) => setFunctionPublic(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />pub fn add_to_waitlist</label>
          </section>
          <section className={`min-h-80 border p-4 ${allowed ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">路径逐段解析</span>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1.2fr] items-center gap-2 text-center text-xs">
              <div className="border border-border bg-bg p-3 text-primary">crate</div><span className="text-secondary">::</span>
              <div className={`border bg-bg p-3 ${caller === "child" || modulePublic ? "border-emerald-500/50 text-primary" : "border-rose-500/60 text-rose-300"}`}>hosting</div><span className="text-secondary">::</span>
              <div className={`break-words border bg-bg p-3 ${caller === "child" || functionPublic ? "border-emerald-500/50 text-primary" : "border-rose-500/60 text-rose-300"}`}>add_to_waitlist</div>
            </div>
            <h3 className="mt-7 text-base font-semibold text-primary">{allowed ? "访问通过" : modulePublic ? "函数仍为 private" : "模块边界为 private"}</h3>
            <p className="mt-4 text-sm text-secondary">{caller === "child" ? "子模块可见祖先上下文，也能使用自身私有项。" : "父模块进入子模块时，每一段模块和最终 item 都必须可访问。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">pub 只开放被标记的那一层；公开模块不会自动公开其内容。</figcaption>
    </figure>
  );
}

const surfaceModes = {
  absolute: {
    label: "crate 路径",
    setup: "无快捷名",
    call: "crate::front_of_house::hosting::add_to_waitlist()",
    scope: "从当前 crate root 开始，定义与调用方可独立移动",
    files: ["src/lib.rs → mod front_of_house;", "src/front_of_house.rs → pub mod hosting;", "src/front_of_house/hosting.rs → pub fn ..."],
  },
  super: {
    label: "super 路径",
    setup: "从当前模块的父模块开始",
    call: "super::deliver_order()",
    scope: "适合父子实现关系一起移动",
    files: ["crate", "└── back_of_house", "    └── fix_incorrect_order → super::deliver_order"],
  },
  use: {
    label: "use",
    setup: "use crate::front_of_house::hosting;",
    call: "hosting::add_to_waitlist()",
    scope: "只在该 use 所在作用域创建私有快捷名",
    files: ["内部定义路径不变", "调用点缩短", "隐私检查仍然执行"],
  },
  pubuse: {
    label: "pub use",
    setup: "pub use crate::front_of_house::hosting;",
    call: "restaurant::hosting::add_to_waitlist()",
    scope: "在新位置重新导出，形成面向调用方的公共路径",
    files: ["内部：front_of_house::hosting", "外部：restaurant::hosting", "实现树与 API 树可以不同"],
  },
} as const;

type SurfaceMode = keyof typeof surfaceModes;

export function RplPathSurfaceLab() {
  const [mode, setMode] = useState<SurfaceMode>("absolute");
  const selected = surfaceModes[mode];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="模块路径与 API 表面">
          {(Object.keys(surfaceModes) as SurfaceMode[]).map((item) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 border-b border-r border-border px-2 text-xs sm:border-b-0 sm:text-sm ${mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{surfaceModes[item].label}</button>)}
        </div>
        <div className="mt-5 grid min-h-96 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">声明或导入</span>
            <code className="mt-3 block min-h-16 break-words border border-border bg-bg p-3 text-xs leading-6 text-primary">{selected.setup}</code>
            <span className="mt-6 block text-xs text-secondary">调用方看到</span>
            <code className="mt-3 block min-h-20 break-words border border-border bg-bg p-3 text-xs leading-6 text-primary">{selected.call}</code>
          </section>
          <section className="border border-border bg-bg p-4">
            <span className="text-xs text-secondary">解析与文件映射</span>
            <div className="mt-3 space-y-2">
              {selected.files.map((line) => <code key={line} className="block min-h-10 break-words border border-border px-3 py-2 text-xs text-primary">{line}</code>)}
            </div>
            <p className="mt-5 border-t border-border pt-4 text-sm text-secondary">{selected.scope}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">路径决定名称如何解析，use 改变局部名字，pub use 改变公共入口，文件位置只承载已声明模块。</figcaption>
    </figure>
  );
}
