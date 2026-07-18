"use client";

import { useState } from "react";

type ModelLayer = "expressions" | "statements" | "arrays" | "methods" | "APIs" | "I/O";

const modelDetails = {
  expressions: { input: "values + operators", output: "typed value", contract: "operand types determine legal operations" },
  statements: { input: "state + control flow", output: "state transition", contract: "blocks define scope and execution order" },
  arrays: { input: "length + element type", output: "indexed object", contract: "indices are 0 through length - 1" },
  methods: { input: "arguments", output: "return value / effect", contract: "arguments are passed by value" },
  APIs: { input: "public signatures", output: "client vocabulary", contract: "implementation stays behind the boundary" },
  "I/O": { input: "args, files, StdIn", output: "StdOut, drawing, audio", contract: "data source is explicit and testable" },
} as const;

export function Algs4ProgrammingModelMap() {
  const [layer, setLayer] = useState<ModelLayer>("arrays");
  const active = modelDetails[layer];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {(Object.keys(modelDetails) as ModelLayer[]).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setLayer(candidate)}
              className={
                "min-h-10 border px-1 text-[10px] font-semibold sm:text-xs " +
                (layer === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              {candidate}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr]">
          <div className="border border-border bg-background p-3 text-xs text-secondary">
            input
            <div className="mt-1 font-mono text-primary">{active.input}</div>
          </div>
          <div className="flex min-h-12 items-center justify-center px-3 font-mono text-accent">-&gt;</div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">
            result
            <div className="mt-1 font-mono text-success">{active.output}</div>
          </div>
        </div>
        <div className="mt-2 border border-warning bg-warning/10 p-3 text-xs text-warning">
          {active.contract}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        基础编程模型把语言机制组织成可检查的输入、状态变化与接口契约。
      </figcaption>
    </figure>
  );
}

type ExpressionCase = "integer division" | "mixed arithmetic" | "boolean short-circuit" | "string equality";

const expressionCases = {
  "integer division": { expression: "7 / 2", type: "int", value: "3", rule: "both operands are int" },
  "mixed arithmetic": { expression: "7 / 2.0", type: "double", value: "3.5", rule: "numeric promotion to double" },
  "boolean short-circuit": { expression: "false && risky()", type: "boolean", value: "false", rule: "right operand is not evaluated" },
  "string equality": { expression: 'a.equals("key")', type: "boolean", value: "content comparison", rule: "== compares object references" },
} as const;

export function Algs4ExpressionTypeLab() {
  const [kind, setKind] = useState<ExpressionCase>("integer division");
  const active = expressionCases[kind];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select
          className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary"
          value={kind}
          onChange={(event) => setKind(event.target.value as ExpressionCase)}
        >
          {(Object.keys(expressionCases) as ExpressionCase[]).map((candidate) => (
            <option key={candidate}>{candidate}</option>
          ))}
        </select>
        <div className="mt-4 border border-border bg-background p-4 text-center font-mono text-sm text-primary">
          {active.expression}
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">type<div className="mt-1 font-mono text-accent">{active.type}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">result<div className="mt-1 font-mono text-success">{active.value}</div></div>
          <div className="col-span-2 border border-warning bg-warning/10 p-3 text-xs text-warning sm:col-span-1">{active.rule}</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Java expression先由operand types确定语义；表面相似的运算可能得到不同类型和值。
      </figcaption>
    </figure>
  );
}

export function Algs4ArrayAliasLab() {
  const [mode, setMode] = useState<"alias" | "clone">("alias");
  const source = [2, 4, 6, 8];
  const changed = [2, 99, 6, 8];
  const left = mode === "alias" ? changed : source;
  const right = changed;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          {(["alias", "clone"] as const).map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setMode(candidate)}
              className={
                "min-h-10 border text-xs font-semibold " +
                (mode === candidate
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-background text-primary")
              }
            >
              b = {candidate === "alias" ? "a" : "a.clone()"}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[{ name: "a", values: left }, { name: "b after b[1]=99", values: right }].map((row) => (
            <div key={row.name} className="border border-border bg-background p-3">
              <div className="mb-2 font-mono text-xs text-secondary">{row.name}</div>
              <div className="grid grid-cols-4 gap-1">
                {row.values.map((value, index) => (
                  <div key={index} className={"border p-2 text-center font-mono text-xs " + (value === 99 ? "border-warning bg-warning/10 text-warning" : "border-border text-primary")}>
                    {value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 border border-success bg-success/10 p-3 text-xs text-success">
          {mode === "alias" ? "a and b reference one array object" : "a and b reference distinct array objects"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Array variable保存reference；assignment复制reference，clone才复制elements到新array。
      </figcaption>
    </figure>
  );
}

export function Algs4StaticMethodCallLab() {
  const [b, setB] = useState(35);
  const a = 98;
  const frames: { a: number; b: number }[] = [];
  let x = a;
  let y = b;
  while (y !== 0) {
    frames.push({ a: x, b: y });
    const next = x % y;
    x = y;
    y = next;
  }
  frames.push({ a: x, b: 0 });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          gcd(98, {b})
          <input className="mt-2 w-full accent-current" type="range" min="14" max="84" step="7" value={b} onChange={(event) => setB(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">
          {frames.map((frame, index) => (
            <div key={`${frame.a}-${frame.b}-${index}`} className={"border p-3 font-mono text-xs " + (frame.b === 0 ? "border-success bg-success/10 text-success" : "border-border bg-background text-primary")}>
              <div className="text-secondary">frame {index}</div>
              gcd({frame.a}, {frame.b})
            </div>
          ))}
        </div>
        <div className="mt-2 border border-accent bg-accent/10 p-3 text-center font-mono text-xs text-accent">return {x}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Static method每次调用得到自己的parameter values；Euclid recursion以余数严格缩小第二参数。
      </figcaption>
    </figure>
  );
}

const allowlist = [11, 23, 37, 50, 72, 99];
const stream = [23, 50, 13, 99, 42];

export function Algs4StdIoPipelineDiagram() {
  const [processed, setProcessed] = useState(3);
  const current = stream.slice(0, processed);
  const rejected = current.filter((key) => !allowlist.includes(key));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          StdIn keys processed = {processed}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={stream.length} value={processed} onChange={(event) => setProcessed(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="border border-border bg-background p-3 text-xs text-secondary">file + In<div className="mt-1 font-mono text-primary">{allowlist.join(" ")}</div></div>
          <div className="flex items-center justify-center font-mono text-accent">sort</div>
          <div className="border border-accent bg-accent/10 p-3 text-xs text-secondary">StdIn<div className="mt-1 font-mono text-accent">{current.join(" ") || "empty"}</div></div>
          <div className="flex items-center justify-center font-mono text-accent">search</div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">StdOut missing<div className="mt-1 font-mono text-success">{rejected.join(" ") || "none"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        官方allowlist client把file、standard input和standard output解耦，shell redirection即可复现实验。
      </figcaption>
    </figure>
  );
}

type SearchFrame = { lo: number; hi: number; mid: number; relation: "<" | ">" | "=" };

function binarySearchFrames(values: number[], key: number): SearchFrame[] {
  const frames: SearchFrame[] = [];
  let lo = 0;
  let hi = values.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const relation = key < values[mid] ? "<" : key > values[mid] ? ">" : "=";
    frames.push({ lo, hi, mid, relation });
    if (relation === "<") hi = mid - 1;
    else if (relation === ">") lo = mid + 1;
    else break;
  }
  return frames;
}

const searchValues = [3, 8, 14, 21, 29, 37, 45, 58, 71, 90];

export function Algs4BinarySearchTraceLab() {
  const [key, setKey] = useState(37);
  const frames = binarySearchFrames(searchValues, key);
  const [requestedStep, setRequestedStep] = useState(0);
  const step = Math.min(requestedStep, frames.length - 1);
  const frame = frames[step];
  const found = frame.relation === "=";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs font-semibold text-primary">key<select className="mt-1 min-h-10 w-full border border-border bg-background px-2 font-mono" value={key} onChange={(event) => { setKey(Number(event.target.value)); setRequestedStep(0); }}>{[14, 37, 58, 42, 99].map((candidate) => <option key={candidate}>{candidate}</option>)}</select></label>
          <label className="text-xs font-semibold text-primary">step {step + 1}/{frames.length}<input className="mt-3 w-full accent-current" type="range" min="0" max={frames.length - 1} value={step} onChange={(event) => setRequestedStep(Number(event.target.value))} /></label>
        </div>
        <div className="mt-4 grid grid-cols-10 gap-1">
          {searchValues.map((value, index) => {
            const active = index >= frame.lo && index <= frame.hi;
            const middle = index === frame.mid;
            return <div key={value} className={"border py-3 text-center font-mono text-[10px] sm:text-xs " + (middle ? "border-accent bg-accent text-background" : active ? "border-success bg-success/10 text-success" : "border-border bg-background text-secondary opacity-50")}>{value}</div>;
          })}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-2 font-mono text-primary">lo={frame.lo}</div>
          <div className="border border-accent bg-accent/10 p-2 font-mono text-accent">mid={frame.mid}</div>
          <div className="border border-border bg-background p-2 font-mono text-primary">hi={frame.hi}</div>
        </div>
        <div className={"mt-2 border p-3 text-center font-mono text-xs " + (found ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>
          key {frame.relation} a[mid] {found ? `at index ${frame.mid}` : "so discard one ordered half"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        循环不变量是key若存在必在闭区间a[lo..hi]；每次比较安全排除一半。
      </figcaption>
    </figure>
  );
}
