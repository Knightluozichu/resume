"use client";

import { useState } from "react";

const contractRows = [
  { view: "prototype", carries: "name · parameter types · return type", proves: "call can be type-checked", misses: "behavior and ownership details" },
  { view: "call", carries: "arguments · expected result use", proves: "preconditions supplied", misses: "callee local state" },
  { view: "definition", carries: "parameters · body · return paths", proves: "postcondition implementation", misses: "all callers and environments" },
  { view: "test", carries: "normal · boundary · invalid inputs", proves: "contract evidence", misses: "untested domains" },
] as const;

export function EppFunctionContractMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="函数原型调用定义和测试四个视角携带信息证明与缺口" className="grid gap-3 lg:grid-cols-2">
          {contractRows.map((row) => (
            <section key={row.view} className="min-h-56 border border-cyan-500/35 bg-cyan-500/10 p-4">
              <strong className="text-sm text-primary">{row.view}</strong>
              <code className="mt-3 block break-words text-xs text-accent">{row.carries}</code>
              <p className="mt-4 text-xs text-primary">proves · {row.proves}</p>
              <p className="mb-0 mt-3 text-xs text-secondary">gap · {row.misses}</p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        原型让编译器检查形状，文字契约与测试再补充范围、所有权、副作用和失败语义。
      </figcaption>
    </figure>
  );
}

const parameterRows = [
  { source: "int values[5]", parameter: "const int* values + count", preserved: "element type + address", lost: "array length" },
  { source: "int grid[2][3]", parameter: "const int (*grid)[3] + rows", preserved: "column extent 3", lost: "outer row count" },
  { source: "char text[]", parameter: "const char* text", preserved: "character address", lost: "capacity; length found by \\0" },
  { source: "Record record", parameter: "Record by value", preserved: "independent member copy", lost: "caller identity" },
] as const;

export function EppFunctionParameterFlow() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="数组二维数组 C 字符串和结构体传入函数后保留与丢失的信息" className="space-y-3">
          {parameterRows.map((row, index) => (
            <section key={row.source} className="grid min-h-32 gap-3 border border-border bg-background/60 p-4 lg:grid-cols-[0.8fr_1.2fr_1fr_1fr] lg:items-center">
              <div><span className="text-xs text-secondary">shape 0{index + 1}</span><code className="mt-2 block break-words text-xs text-accent">{row.source}</code></div>
              <code className="break-words text-xs text-primary">→ {row.parameter}</code>
              <span className="text-xs text-secondary">keep · {row.preserved}</span>
              <span className="text-xs text-secondary">lose · {row.lost}</span>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        函数参数声明会改变可用形状信息；裸地址之外的长度、容量和所有权必须显式进入契约。
      </figcaption>
    </figure>
  );
}

const callCases = [
  { label: "按值", call: "increment(copy)", input: "caller value = 4", frame: "parameter value = 4, then 5", output: "caller remains 4" },
  { label: "二维数组", call: "sum(grid, rows)", input: "grid[][3]", frame: "row count explicit; col extent in type", output: "every [row][col] proven" },
  { label: "递归", call: "factorial(4)", input: "n = 4", frame: "4→3→2→1 base, then unwind", output: "24; depth bounded" },
  { label: "函数指针", call: "apply(value, &square)", input: "callback signature int(int)", frame: "indirect call selects square", output: "result returned; target lifetime valid" },
] as const;

export function EppFunctionCallLab() {
  const [active, setActive] = useState(0);
  const current = callCases[active];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择函数调用实验" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {callCases.map((item, index) => (
            <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${active === index ? "border-accent bg-accent/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{item.label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4 sm:p-5">
          <code className="block break-words text-sm text-accent">{current.call}</code>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            <div className="min-h-36 border border-amber-500/35 bg-amber-500/10 p-4"><strong className="text-sm text-primary">输入</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.input}</p></div>
            <div className="min-h-36 border border-cyan-500/35 bg-cyan-500/10 p-4"><strong className="text-sm text-primary">调用帧</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.frame}</p></div>
            <div className="min-h-36 border border-emerald-500/35 bg-emerald-500/10 p-4"><strong className="text-sm text-primary">输出</strong><p className="mb-0 mt-3 text-xs text-secondary">{current.output}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换调用形状，追踪复制、形状参数、递归帧与间接目标；函数名相同不代表数据流相同。
      </figcaption>
    </figure>
  );
}
