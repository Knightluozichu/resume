"use client";

import { useMemo, useState } from "react";

const scopeStages = [
  { label: "问题", title: "先写语义契约", detail: "输入、输出、合法状态与失败条件", tone: "border-primary bg-primary/10 text-primary" },
  { label: "ADT", title: "隐藏表示", detail: "操作集合与复杂度承诺", tone: "border-accent bg-accent/10 text-accent" },
  { label: "C++", title: "落实所有权", detail: "class、template、copy 与析构", tone: "border-success bg-success/10 text-success" },
  { label: "分析", title: "预测成本", detail: "证明后再用实验核查", tone: "border-warning bg-warning/10 text-warning" },
] as const;

export function DsaIntroductionScopeMap() {
  const [selected, setSelected] = useState(0);
  const active = scopeStages[selected];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-7 sm:items-center">
          {scopeStages.map((stage, index) => (
            <div key={stage.label} className="contents">
              <button
                type="button"
                onClick={() => setSelected(index)}
                className={"min-h-20 border p-3 text-left " + (selected === index ? stage.tone : "border-border bg-background text-secondary")}
              >
                <span className="block text-xs font-semibold">{index + 1}. {stage.label}</span>
                <span className="mt-1 block text-sm font-semibold">{stage.title}</span>
              </button>
              {index < scopeStages.length - 1 ? <span className="text-center text-sm text-muted">→</span> : null}
            </div>
          ))}
        </div>
        <div className={"mt-3 border p-3 text-sm " + active.tone}>
          当前检查：<strong>{active.detail}</strong>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第1章先搭桥：数学描述复杂度，C++表达数据抽象，后续章节再把二者用于真实数据结构。
      </figcaption>
    </figure>
  );
}

const mathModes = {
  powers: { label: "指数", formula: (n: number) => `2^${n}`, result: (n: number) => 2 ** n, note: "每增加1，规模翻倍" },
  logs: { label: "对数", formula: (n: number) => `log2(2^${n})`, result: (n: number) => n, note: "反复减半所需步数" },
  series: { label: "级数", formula: (n: number) => `1+2+...+${n}`, result: (n: number) => n * (n + 1) / 2, note: "嵌套循环常见求和" },
  modular: { label: "模运算", formula: (n: number) => `${n * n + 3} mod 7`, result: (n: number) => (n * n + 3) % 7, note: "散列与循环索引的代数" },
} as const;

type MathMode = keyof typeof mathModes;

export function DsaMathReviewLab() {
  const [mode, setMode] = useState<MathMode>("logs");
  const [n, setN] = useState(8);
  const active = mathModes[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="数学主题">
          {(Object.keys(mathModes) as MathMode[]).map((key) => (
            <button key={key} type="button" onClick={() => setMode(key)} className={"min-h-11 border px-3 text-sm font-semibold " + (mode === key ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>
              {mathModes[key].label}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          n = {n}
          <input className="mt-2 w-full accent-current" type="range" min="1" max="16" value={n} onChange={(event) => setN(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">表达式<div className="mt-2 font-mono text-sm font-semibold text-primary">{active.formula(n)}</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">结果<div className="mt-2 font-mono text-sm font-semibold text-success">{active.result(n).toLocaleString()}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-xs text-secondary">算法含义<div className="mt-2 text-sm font-semibold text-warning">{active.note}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        指数、对数、级数与模运算不是独立复习题；它们分别解释规模增长、减半过程、循环总成本与散列地址。
      </figcaption>
    </figure>
  );
}

function recurrence(n: number): number {
  return n === 0 ? 0 : 2 * recurrence(n - 1) + n * n;
}

export function DsaRecursionStackLab() {
  const [n, setN] = useState(4);
  const frames = useMemo(() => Array.from({ length: n + 1 }, (_, index) => n - index), [n]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          追踪 f({n}) = {recurrence(n)}
          <input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={n} onChange={(event) => setN(Number(event.target.value))} />
        </label>
        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr]">
          <div>
            <div className="text-xs font-semibold text-secondary">调用阶段</div>
            <div className="mt-2 flex flex-col gap-1">
              {frames.map((value, index) => <div key={value} className={"border p-2 font-mono text-xs " + (value === 0 ? "border-success bg-success/10 text-success" : "border-accent bg-accent/10 text-accent")} style={{ marginLeft: `${Math.min(index * 12, 60)}px` }}>f({value}) {value === 0 ? "→ base case 0" : `→ wait for f(${value - 1})`}</div>)}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-secondary">返回阶段</div>
            <div className="mt-2 flex flex-col-reverse gap-1">
              {frames.map((value) => <div key={value} className="border border-border bg-background p-2 font-mono text-xs text-primary">f({value}) = {recurrence(value)}</div>)}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        官方示例的递归式先压入 n 到0的调用帧，再由 base case 反向计算；每次递归都必须向终止条件推进。
      </figcaption>
    </figure>
  );
}

const classLayers = [
  { label: "public contract", items: ["IntCell(int)", "read() const", "write(int)"], tone: "border-success bg-success/10 text-success" },
  { label: "ownership contract", items: ["copy constructor", "operator=", "destructor"], tone: "border-warning bg-warning/10 text-warning" },
  { label: "private representation", items: ["int* storedValue"], tone: "border-accent bg-accent/10 text-accent" },
] as const;

export function DsaClassContractDiagram() {
  const [layer, setLayer] = useState(0);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-3">
          {classLayers.map((item, index) => (
            <button key={item.label} type="button" onClick={() => setLayer(index)} className={"min-h-24 border p-3 text-left " + (layer === index ? item.tone : "border-border bg-background text-secondary")}>
              <span className="block font-mono text-xs font-semibold">{item.label}</span>
              <span className="mt-2 block text-xs leading-5">{item.items.join(" · ")}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 border border-border bg-background p-3 text-sm text-secondary">
          {layer === 0 ? "调用者只依赖稳定操作，不接触存储细节。" : layer === 1 ? "拥有资源的类必须定义复制、赋值和销毁如何配对。" : "表示可以从裸指针换成值成员，而不改变 public ADT。"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Class 把 ADT 的接口与表示分离；const、explicit 与 Big Three 共同把语义写进类型边界。
      </figcaption>
    </figure>
  );
}

export function DsaCopyOwnershipLab() {
  const [deepCopy, setDeepCopy] = useState(true);
  const [aValue, setAValue] = useState(2);
  const bValue = deepCopy ? 2 : aValue;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="flex gap-2" role="group" aria-label="复制方式">
          <button type="button" onClick={() => setDeepCopy(false)} className={"min-h-11 flex-1 border px-3 text-sm font-semibold " + (!deepCopy ? "border-warning bg-warning text-background" : "border-border bg-background text-primary")}>memberwise 浅复制</button>
          <button type="button" onClick={() => setDeepCopy(true)} className={"min-h-11 flex-1 border px-3 text-sm font-semibold " + (deepCopy ? "border-success bg-success text-background" : "border-border bg-background text-primary")}>Big Three 深复制</button>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
          <div className="border border-accent bg-accent/10 p-3 text-sm text-accent">object a<div className="mt-2 font-mono">ptr → {aValue}</div></div>
          <div className="text-muted">{deepCopy ? "two allocations" : "same allocation"}</div>
          <div className={"border p-3 text-sm " + (deepCopy ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>object b<div className="mt-2 font-mono">ptr → {bValue}</div></div>
        </div>
        <button type="button" onClick={() => setAValue((value) => value === 2 ? 4 : 2)} className="mt-4 min-h-11 w-full border border-accent bg-background px-3 text-sm font-semibold text-accent">执行 a.write({aValue === 2 ? 4 : 2})</button>
        <p className="mb-0 mt-3 text-sm text-secondary">{deepCopy ? "b保持原值；两对象可独立析构。" : "b随a变化，而且两个析构函数会尝试delete同一地址。"}</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        当 private member 是 owning pointer，编译器生成的 memberwise copy 会共享地址；Big Three 必须恢复独立所有权。
      </figcaption>
    </figure>
  );
}

const comparableTypes = {
  int: { label: "int", less: true, assignment: true },
  string: { label: "string", less: true, assignment: true },
  intCell: { label: "IntCell", less: false, assignment: true },
} as const;

type ComparableType = keyof typeof comparableTypes;

export function DsaTemplateContractLab() {
  const [type, setType] = useState<ComparableType>("string");
  const current = comparableTypes[type];
  const valid = current.less && current.assignment;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2" role="group" aria-label="模板实参类型">
          {(Object.keys(comparableTypes) as ComparableType[]).map((key) => <button key={key} type="button" onClick={() => setType(key)} className={"min-h-11 border px-2 font-mono text-xs font-semibold " + (type === key ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{comparableTypes[key].label}</button>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border border-border bg-background p-3 text-xs text-secondary">实例化<div className="mt-2 font-mono text-primary">findMax&lt;{current.label}&gt;</div></div>
          <div className={"border p-3 text-xs " + (current.less ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>operator&lt;<div className="mt-2 font-semibold">{current.less ? "available" : "missing"}</div></div>
          <div className={"border p-3 text-xs " + (valid ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning")}>compile result<div className="mt-2 font-semibold">{valid ? "valid specialization" : "contract violation"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        第3版 findMax 模板隐含 Comparable 契约：元素必须支持比较与赋值；IntCell 未定义 operator&lt; 时实例化失败。
      </figcaption>
    </figure>
  );
}

export function DsaMatrixLayoutLab() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [selected, setSelected] = useState("1,2");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-primary">rows = {rows}<input className="mt-2 w-full accent-current" type="range" min="1" max="5" value={rows} onChange={(event) => setRows(Number(event.target.value))} /></label>
          <label className="text-sm font-semibold text-primary">cols = {cols}<input className="mt-2 w-full accent-current" type="range" min="1" max="6" value={cols} onChange={(event) => setCols(Number(event.target.value))} /></label>
        </div>
        <div className="mx-auto mt-4 grid max-w-lg gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {Array.from({ length: rows * cols }, (_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const key = `${row},${col}`;
            return <button key={key} type="button" onClick={() => setSelected(key)} className={"aspect-square min-h-11 border font-mono text-xs " + (selected === key ? "border-accent bg-accent text-background" : "border-border bg-background text-primary")}>{row},{col}</button>;
          })}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="border border-border bg-background p-3 text-xs text-secondary">representation<div className="mt-1 font-mono text-primary">vector&lt;vector&lt;Object&gt;&gt;</div></div>
          <div className="border border-success bg-success/10 p-3 text-xs text-secondary">operator[] chain<div className="mt-1 font-mono text-success">matrix[{selected.split(",")[0]}][{selected.split(",")[1]}]</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        官方 matrix.h 让外层 vector 管 rows、每个内层 vector 管 cols，并用 const/non-const operator[] 保留二维下标语法。
      </figcaption>
    </figure>
  );
}
