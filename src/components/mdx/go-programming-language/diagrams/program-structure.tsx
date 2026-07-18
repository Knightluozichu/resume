"use client";

import { useState } from "react";

const identifierPattern = /^[A-Za-z_][A-Za-z0-9_]*$/;
const keywords = new Set([
  "break",
  "default",
  "func",
  "interface",
  "select",
  "case",
  "defer",
  "go",
  "map",
  "struct",
  "chan",
  "else",
  "goto",
  "package",
  "switch",
  "const",
  "fallthrough",
  "if",
  "range",
  "type",
  "continue",
  "for",
  "import",
  "return",
  "var",
]);

export function GoplBindingDeclarationLab() {
  const [name, setName] = useState("temperature");
  const [xExists, setXExists] = useState(true);
  const [yExists, setYExists] = useState(false);
  const validName = identifierPattern.test(name) && !keywords.has(name);
  const declarationValid = !xExists || !yExists;
  const exported = validName && /^[A-Z]/.test(name);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              identifier
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary outline-none focus:border-cyan-500"
              />
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={xExists}
                onChange={(event) => setXExists(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              x 已在当前 lexical block 声明
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={yExists}
                onChange={(event) => setYExists(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              y 已在当前 lexical block 声明
            </label>
          </section>
          <section
            className="space-y-4 border border-cyan-500/40 bg-cyan-500/10 p-4"
            aria-live="polite"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <div
                className={`border p-3 ${validName ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}
              >
                <span className="text-xs text-secondary">name</span>
                <strong className="mt-2 block text-sm text-primary">
                  {validName ? "valid" : "invalid / keyword"}
                </strong>
              </div>
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">visibility</span>
                <strong className="mt-2 block text-sm text-primary">
                  {exported ? "exported" : "package-local"}
                </strong>
              </div>
              <div
                className={`border p-3 ${declarationValid ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}
              >
                <span className="text-xs text-secondary">x, y := f()</span>
                <strong className="mt-2 block text-sm text-primary">
                  {declarationValid
                    ? "at least one new name"
                    : "no new variables"}
                </strong>
              </div>
            </div>
            <div className="border border-border bg-bg p-4 font-mono text-sm leading-8 text-primary">
              <div>
                var {validName ? name : "?"} int{" "}
                <span className="text-secondary">&#47;&#47; zero value 0</span>
              </div>
              <div>
                x, y := f(){" "}
                <span className="text-secondary">
                  &#47;&#47;{" "}
                  {declarationValid ? "declaration" : "compile error"}
                </span>
              </div>
            </div>
            <p className="text-sm leading-7 text-secondary">
              `:=` 只检查同一个 lexical block：已有名字被 assignment，新名字被
              declaration；外层同名 binding 不会阻止内层创建 shadow。
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        名字决定可读性与导出边界，声明把名字绑定到
        entity；短声明必须在当前作用域引入至少一个新变量。
      </figcaption>
    </figure>
  );
}

type AssignmentMode = "swap" | "named-type";

export function GoplAssignmentTypeLab() {
  const [mode, setMode] = useState<AssignmentMode>("swap");
  const [left, setLeft] = useState(13);
  const [right, setRight] = useState(21);
  const [explicitConversion, setExplicitConversion] = useState(false);
  const [celsius, setCelsius] = useState(20);
  const fahrenheit = (celsius * 9) / 5 + 32;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          className="grid grid-cols-2 border border-border"
          role="group"
          aria-label="assignment 与 named type 实验模式"
        >
          <button
            type="button"
            aria-pressed={mode === "swap"}
            onClick={() => setMode("swap")}
            className={`min-h-11 border-r border-border text-sm ${mode === "swap" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}
          >
            tuple assignment
          </button>
          <button
            type="button"
            aria-pressed={mode === "named-type"}
            onClick={() => setMode("named-type")}
            className={`min-h-11 text-sm ${mode === "named-type" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}
          >
            named type
          </button>
        </div>
        {mode === "swap" ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="space-y-4 border border-border bg-bg p-4">
              <label className="block text-sm text-primary">
                x: <strong>{left}</strong>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={left}
                  onChange={(event) => setLeft(Number(event.target.value))}
                  className="mt-2 block w-full accent-[var(--accent)]"
                />
              </label>
              <label className="block text-sm text-primary">
                y: <strong>{right}</strong>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={right}
                  onChange={(event) => setRight(Number(event.target.value))}
                  className="mt-2 block w-full accent-[var(--accent)]"
                />
              </label>
            </section>
            <section className="border border-emerald-500/40 bg-emerald-500/10 p-4">
              <code className="block border border-border bg-bg p-3 text-sm text-primary">
                x, y = y, x
              </code>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="border border-border bg-bg p-3">
                  <span className="text-xs text-secondary">
                    all RHS evaluated first
                  </span>
                  <strong className="mt-2 block text-lg text-primary">
                    y = {right}
                  </strong>
                </div>
                <div className="border border-border bg-bg p-3">
                  <span className="text-xs text-secondary">
                    then assign LHS
                  </span>
                  <strong className="mt-2 block text-lg text-primary">
                    x = {left}
                  </strong>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-secondary">
                tuple assignment 先求完所有右值，再按顺序写左值，因此交换不需要
                temporary；它不是逐项交错执行。
              </p>
            </section>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="space-y-4 border border-border bg-bg p-4">
              <label className="block text-sm text-primary">
                Celsius: <strong>{celsius}°C</strong>
                <input
                  type="range"
                  min="-40"
                  max="100"
                  value={celsius}
                  onChange={(event) => setCelsius(Number(event.target.value))}
                  className="mt-2 block w-full accent-[var(--accent)]"
                />
              </label>
              <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
                <input
                  type="checkbox"
                  checked={explicitConversion}
                  onChange={(event) =>
                    setExplicitConversion(event.target.checked)
                  }
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                显式写 Celsius(f)
              </label>
            </section>
            <section
              className={`border p-4 ${explicitConversion ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}
            >
              <code className="block border border-border bg-bg p-3 text-sm text-primary">
                type Celsius float64
                <br />
                var c Celsius ={" "}
                {explicitConversion ? "Celsius(f)" : "f // float64"}
              </code>
              <strong className="mt-4 block text-lg text-primary">
                {explicitConversion
                  ? `valid · ${fahrenheit.toFixed(1)}°F`
                  : "compile error · distinct named types"}
              </strong>
              <p className="mt-3 text-sm leading-7 text-secondary">
                Celsius 与 float64 共享 underlying representation，但 named type
                建立静态边界；显式 conversion 表达“单位解释发生变化”。
              </p>
            </section>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        assignment 改变已有变量；type declaration 创建新 named
        type。两者都要求逐项满足 assignability，必要时显式 conversion。
      </figcaption>
    </figure>
  );
}

type ScopeLevel = "universe" | "package" | "file" | "local";

const scopeDescriptions: Record<
  ScopeLevel,
  { visible: string; lifetime: string; example: string }
> = {
  universe: {
    visible: "所有 Go source",
    lifetime: "language environment",
    example: "int, true, len, make",
  },
  package: {
    visible: "同一 package 的全部 files",
    lifetime: "package/program",
    example: "var Celsius, func BoilingC",
  },
  file: {
    visible: "仅当前 source file",
    lifetime: "compile-time binding",
    example: "import fmt",
  },
  local: {
    visible: "当前 lexical block 及其内层",
    lifetime: "按 escape/liveness 决定",
    example: "for i := 0; ...",
  },
};

export function GoplPackageScopeLab() {
  const [scope, setScope] = useState<ScopeLevel>("local");
  const [shadow, setShadow] = useState(true);
  const selected = scopeDescriptions[scope];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="border border-border bg-bg p-4">
            <span className="text-xs text-secondary">
              dependency-respecting initialization
            </span>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {["import deps", "package vars", "init()", "main()"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="min-h-24 border border-border bg-elevated p-3 text-sm text-primary"
                  >
                    <span className="text-xs text-secondary">0{index + 1}</span>
                    <strong className="mt-2 block">{item}</strong>
                  </div>
                ),
              )}
            </div>
            <p className="mt-4 text-sm leading-7 text-secondary">
              依赖 package 先完成；当前 package variables 按 dependency order
              求值，再执行 init functions；所有依赖完成后才进入 main。
            </p>
          </section>
          <section className="space-y-4 border border-cyan-500/40 bg-cyan-500/10 p-4">
            <label className="block text-sm text-primary">
              scope level
              <select
                value={scope}
                onChange={(event) => setScope(event.target.value as ScopeLevel)}
                className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary outline-none focus:border-cyan-500"
              >
                <option value="universe">universe</option>
                <option value="package">package</option>
                <option value="file">file</option>
                <option value="local">local block</option>
              </select>
            </label>
            <div className="border border-border bg-bg p-3">
              <strong className="text-sm text-primary">
                {selected.example}
              </strong>
              <p className="mt-2 text-sm leading-7 text-secondary">
                visible: {selected.visible}
                <br />
                lifetime: {selected.lifetime}
              </p>
            </div>
            <label className="flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={shadow}
                onChange={(event) => setShadow(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              内层声明同名变量
            </label>
            <p className="text-sm leading-7 text-secondary">
              {shadow
                ? "inner binding shadows outer binding；离开 block 后 outer binding 再次可见。"
                : "没有 inner binding，名称解析沿 lexical nesting 向外查找。"}
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        package initialization 是运行顺序；scope 是名字可见的源码区域；variable
        lifetime 是存储可达时段，三者不能混为一谈。
      </figcaption>
    </figure>
  );
}
