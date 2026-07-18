"use client";

import { useState } from "react";

export function GoplPackageIdentityLab() {
  const [modulePath, setModulePath] = useState("example.com/acme/shop");
  const [directory, setDirectory] = useState("internal/report");
  const [packageName, setPackageName] = useState("report");
  const [alias, setAlias] = useState("");
  const importPath = `${modulePath.replace(/\/$/, "")}/${directory.replace(/^\//, "")}`;
  const binding =
    alias.trim() || packageName.trim() || directory.split("/").at(-1) || "pkg";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">
              module path
              <input
                value={modulePath}
                onChange={(event) => setModulePath(event.target.value)}
                className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"
              />
            </label>
            <label className="block text-sm text-primary">
              package directory
              <input
                value={directory}
                onChange={(event) => setDirectory(event.target.value)}
                className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"
              />
            </label>
            <label className="block text-sm text-primary">
              package clause name
              <input
                value={packageName}
                onChange={(event) => setPackageName(event.target.value)}
                className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"
              />
            </label>
            <label className="block text-sm text-primary">
              optional import alias
              <input
                value={alias}
                onChange={(event) => setAlias(event.target.value)}
                placeholder="empty = package name"
                className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"
              />
            </label>
          </section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4">
            <div className="space-y-3">
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">
                  dependency identity · import path
                </span>
                <code className="mt-2 block break-all text-sm text-primary">
                  {JSON.stringify(importPath)}
                </code>
              </div>
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">
                  source declaration
                </span>
                <code className="mt-2 block text-sm text-primary">
                  package {packageName || "?"}
                </code>
              </div>
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">
                  file-local binding
                </span>
                <code className="mt-2 block break-all text-sm text-primary">
                  import {alias ? `${alias} ` : ""}
                  {JSON.stringify(importPath)}
                  <br />
                  {binding}.Render()
                </code>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-secondary">
              import path 标识 dependency package，package clause 定义默认
              name，alias 只改变当前 file 的 binding；三者不是同一个字符串
              contract。
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        module path + subdirectory 形成 import path；package declaration
        给出默认 selector name；import alias 解决本文件冲突。
      </figcaption>
    </figure>
  );
}

export function GoplInitializationImportLab() {
  const [blankImport, setBlankImport] = useState(true);
  const [cycle, setCycle] = useState(false);
  const stages = cycle
    ? ["app imports codec", "codec imports app", "compile-time cycle"]
    : [
        "stdlib/dependencies",
        "codec package vars",
        "codec init registers",
        "app package vars/init",
        "main",
      ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="space-y-4 border border-border bg-bg p-4">
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={blankImport}
                onChange={(event) => setBlankImport(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              import _ &quot;image/png&quot;
            </label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={cycle}
                onChange={(event) => setCycle(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              introduce import cycle
            </label>
          </section>
          <section
            className={`border p-4 ${cycle ? "border-rose-500/40 bg-rose-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`}
            aria-live="polite"
          >
            <div
              className={`grid gap-2 ${cycle ? "sm:grid-cols-3" : "sm:grid-cols-5"}`}
            >
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className="min-h-24 border border-border bg-bg p-3 text-sm text-primary"
                >
                  <span className="text-xs text-secondary">0{index + 1}</span>
                  <strong className="mt-2 block">{stage}</strong>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-border bg-bg p-3">
              <strong className="text-sm text-primary">
                PNG decoder registry:{" "}
                {blankImport && !cycle
                  ? "registered by init side effect"
                  : "not available"}
              </strong>
            </div>
            <p className="mt-3 text-sm leading-7 text-secondary">
              blank import 保留 package initialization 但不建立 selector
              binding；它应只用于明确 documented registration，并用 integration
              test证明 side effect。
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        package initialization 先依赖后本包；blank import 只触发 init
        registration；import graph 必须 acyclic。
      </figcaption>
    </figure>
  );
}

type ToolCommand = "list" | "build" | "test" | "doc" | "mod";

const commandInfo: Record<
  ToolCommand,
  { command: string; input: string; output: string }
> = {
  list: {
    command: "go list -deps -json ./...",
    input: "module + build tags + package pattern",
    output: "resolved package/build graph metadata",
  },
  build: {
    command: "go build ./cmd/server",
    input: "source + imports + cache",
    output: "compiled command artifact",
  },
  test: {
    command: "go test ./...",
    input: "packages + _test.go + test cache",
    output: "package test results",
  },
  doc: {
    command: "go doc example.com/acme/shop/report",
    input: "exported declarations + comments",
    output: "package API documentation",
  },
  mod: {
    command: "go mod tidy",
    input: "imports across module packages/tests",
    output: "synchronized go.mod + go.sum",
  },
};

export function GoplGoToolWorkflowLab() {
  const [command, setCommand] = useState<ToolCommand>("list");
  const [cacheHit, setCacheHit] = useState(true);
  const selected = commandInfo[command];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          className="grid grid-cols-5 border border-border"
          role="group"
          aria-label="go tool command"
        >
          {(["list", "build", "test", "doc", "mod"] as ToolCommand[]).map(
            (item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setCommand(item)}
                className={`min-h-11 text-xs sm:text-sm ${index < 4 ? "border-r border-border" : ""} ${command === item ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}
              >
                {item}
              </button>
            ),
          )}
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="border border-border bg-bg p-4">
            <code className="block border border-border bg-elevated p-3 text-sm text-primary">
              $ {selected.command}
            </code>
            <label className="mt-4 flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={cacheHit}
                onChange={(event) => setCacheHit(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              compatible build/test cache entry
            </label>
          </section>
          <section className="border border-violet-500/40 bg-violet-500/10 p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">input</span>
                <strong className="mt-2 block text-sm text-primary">
                  {selected.input}
                </strong>
              </div>
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">execution</span>
                <strong className="mt-2 block text-sm text-primary">
                  {cacheHit && (command === "build" || command === "test")
                    ? "reuse valid cache"
                    : "resolve and run"}
                </strong>
              </div>
              <div className="border border-border bg-bg p-3">
                <span className="text-xs text-secondary">output</span>
                <strong className="mt-2 block text-sm text-primary">
                  {selected.output}
                </strong>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-secondary">
              Go command 从 package pattern 构建 dependency
              graph；module/workspace 决定版本解析，build
              constraints/environment 决定实际 files，cache key 只在 inputs
              相容时复用。
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        go list 查询 graph，build/test 执行 graph，doc 暴露 API，mod tidy 让
        module metadata 与 imports 对齐。
      </figcaption>
    </figure>
  );
}
