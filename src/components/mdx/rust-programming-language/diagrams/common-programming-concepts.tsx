"use client";

import { useState } from "react";

const bindingModes = {
  immutable: {
    label: "immutable let",
    first: "let x = 5;",
    second: "x = 6;",
    result: "E0384: cannot assign twice to immutable variable",
    type: "i32 → i32",
    scope: "同一绑定",
    tone: "border-rose-500/40 bg-rose-500/10",
  },
  mutable: {
    label: "mutable let",
    first: "let mut x = 5;",
    second: "x = 6;",
    result: "通过：同一绑定的值变为 6",
    type: "i32 → i32",
    scope: "同一绑定",
    tone: "border-amber-500/40 bg-amber-500/10",
  },
  shadow: {
    label: "shadowing",
    first: 'let spaces = "   ";',
    second: "let spaces = spaces.len();",
    result: "通过：新绑定遮蔽旧绑定",
    type: "&str → usize",
    scope: "两个绑定",
    tone: "border-cyan-500/40 bg-cyan-500/10",
  },
  constant: {
    label: "const",
    first: "const LIMIT: u32 = 100;",
    second: "LIMIT = 120;",
    result: "失败：常量始终不可变且必须有类型",
    type: "显式 u32",
    scope: "可声明在全局",
    tone: "border-emerald-500/40 bg-emerald-500/10",
  },
} as const;

type BindingMode = keyof typeof bindingModes;

export function RplBindingSemanticsLab() {
  const [mode, setMode] = useState<BindingMode>("immutable");
  const selected = bindingModes[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="Rust 绑定模式">
          {(Object.keys(bindingModes) as BindingMode[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-12 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${
                mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"
              }`}
            >
              {bindingModes[item].label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid min-h-72 gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="grid grid-rows-2 gap-3">
            <div className="border border-cyan-500/35 bg-cyan-500/10 p-4">
              <span className="text-xs text-secondary">第一次绑定</span>
              <code className="mt-3 block break-words text-sm text-primary">{selected.first}</code>
            </div>
            <div className={`border p-4 ${selected.tone}`}>
              <span className="text-xs text-secondary">下一条语句</span>
              <code className="mt-3 block break-words text-sm text-primary">{selected.second}</code>
            </div>
          </div>

          <section className={`min-h-64 border p-4 ${selected.tone}`} aria-live="polite">
            <span className="text-xs text-secondary">编译判断</span>
            <h3 className="mt-2 text-base font-semibold text-primary">{selected.result}</h3>
            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-secondary">类型关系</dt>
                <dd className="mt-1 font-mono text-primary">{selected.type}</dd>
              </div>
              <div>
                <dt className="text-secondary">绑定身份</dt>
                <dd className="mt-1 text-primary">{selected.scope}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `mut` 改变同一绑定的值，shadowing 创建新绑定并可改变类型，const 则要求编译期表达式和显式类型。
      </figcaption>
    </figure>
  );
}

const typeModes = {
  integer: {
    label: "整数",
    declaration: "let n: u8 = 255;",
    layout: "1 个标量 · 8 bit · 范围 0..=255",
    operation: "n.checked_add(1) → None",
    boundary: "溢出策略必须显式选择",
    tone: "border-amber-500/40 bg-amber-500/10",
  },
  float: {
    label: "浮点",
    declaration: "let x: f64 = 2.0;",
    layout: "1 个标量 · IEEE-754 · 64 bit",
    operation: "0.1 + 0.2 ≠ 精确十进制 0.3",
    boundary: "按误差预算比较，不用直觉等号",
    tone: "border-cyan-500/40 bg-cyan-500/10",
  },
  char: {
    label: "字符",
    declaration: "let c: char = '中';",
    layout: "1 个 Unicode scalar value · 4 bytes",
    operation: "c.len_utf8() → 3",
    boundary: "char 不等于用户感知字形",
    tone: "border-emerald-500/40 bg-emerald-500/10",
  },
  tuple: {
    label: "元组",
    declaration: "let t: (i32, f64, u8) = (500, 6.4, 1);",
    layout: "固定长度 · 元素类型可不同",
    operation: "let (x, y, z) = t; 或 t.1",
    boundary: "位置承载语义，字段多时优先 struct",
    tone: "border-rose-500/40 bg-rose-500/10",
  },
  array: {
    label: "数组",
    declaration: "let a: [i32; 5] = [3; 5];",
    layout: "固定长度 · 元素类型相同",
    operation: "a[index] 会做边界检查",
    boundary: "动态长度集合通常使用 Vec<T>",
    tone: "border-violet-500/40 bg-violet-500/10",
  },
} as const;

type TypeMode = keyof typeof typeModes;

export function RplTypeBoundaryLab() {
  const [mode, setMode] = useState<TypeMode>("integer");
  const [arrayIndex, setArrayIndex] = useState(2);
  const selected = typeModes[mode];
  const indexValid = arrayIndex < 5;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border sm:grid-cols-5" role="group" aria-label="Rust 基础类型类别">
          {(Object.keys(typeModes) as TypeMode[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
              className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${
                mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"
              }`}
            >
              {typeModes[item].label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className={`border p-4 ${selected.tone}`}>
            <span className="text-xs text-secondary">声明</span>
            <code className="mt-3 block break-words text-sm text-primary">{selected.declaration}</code>
            <dl className="mt-7 space-y-5 text-sm">
              <div>
                <dt className="text-secondary">结构</dt>
                <dd className="mt-1 text-primary">{selected.layout}</dd>
              </div>
              <div>
                <dt className="text-secondary">操作</dt>
                <dd className="mt-1 font-mono text-primary">{selected.operation}</dd>
              </div>
              <div>
                <dt className="text-secondary">边界</dt>
                <dd className="mt-1 text-primary">{selected.boundary}</dd>
              </div>
            </dl>
          </div>

          <section className="min-h-72 border border-border bg-bg p-4">
            <span className="text-xs text-secondary">数组边界实验</span>
            <label className="mt-5 block text-sm text-primary">
              index：<strong>{arrayIndex}</strong>
              <input
                type="range"
                min="0"
                max="7"
                value={arrayIndex}
                onChange={(event) => setArrayIndex(Number(event.target.value))}
                className="mt-2 w-full accent-[var(--accent)]"
              />
            </label>
            <div className="mt-5 grid grid-cols-5 gap-1">
              {[3, 3, 3, 3, 3].map((value, index) => (
                <div
                  key={index}
                  className={`grid aspect-square place-items-center border text-sm ${
                    index === arrayIndex
                      ? "border-emerald-500 bg-emerald-500/15 text-primary"
                      : "border-border text-secondary"
                  }`}
                >
                  {value}
                </div>
              ))}
            </div>
            <p className={`mt-5 text-sm ${indexValid ? "text-emerald-600" : "text-rose-500"}`} aria-live="polite">
              {indexValid ? `a[${arrayIndex}] → 3` : `a[${arrayIndex}] → runtime panic: index out of bounds`}
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        静态类型在编译期确定表示与合法操作；动态索引仍需运行时边界检查，越界会 panic 而不是读取任意内存。
      </figcaption>
    </figure>
  );
}

const flowModes = {
  if: {
    label: "if expression",
    code: "let label = if n % 2 == 0 { \"even\" } else { \"odd\" };",
    condition: "布尔条件选择一个表达式值",
    exit: "两个 arm 类型必须兼容",
    trace: ["计算 n % 2 == 0", "只执行一个分支", "把分支值绑定到 label"],
  },
  loop: {
    label: "loop",
    code: "let doubled = loop { break counter * 2; };",
    condition: "无条件重复，break 可携带结果",
    exit: "break value 成为 loop 表达式值",
    trace: ["进入循环体", "更新 counter", "break 返回 counter * 2"],
  },
  while: {
    label: "while",
    code: "while number != 0 { number -= 1; }",
    condition: "每轮先检查布尔条件",
    exit: "条件为 false 时停止",
    trace: ["检查 number != 0", "执行循环体", "回到条件"],
  },
  for: {
    label: "for",
    code: "for item in values { println!(\"{item}\"); }",
    condition: "依次消费 IntoIterator 产生的元素",
    exit: "迭代器耗尽时停止",
    trace: ["取得下一个元素", "把元素绑定到 item", "迭代器耗尽后退出"],
  },
} as const;

type FlowMode = keyof typeof flowModes;

export function RplControlFlowLab() {
  const [mode, setMode] = useState<FlowMode>("if");
  const [traceStep, setTraceStep] = useState(0);
  const selected = flowModes[mode];

  const selectMode = (value: FlowMode) => {
    setMode(value);
    setTraceStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="Rust 控制流类型">
          {(Object.keys(flowModes) as FlowMode[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => selectMode(item)}
              className={`min-h-11 border-r border-border px-2 text-sm last:border-r-0 ${
                mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"
              }`}
            >
              {flowModes[item].label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1.15fr_1fr]">
          <div className="border border-cyan-500/40 bg-cyan-500/10 p-4">
            <code className="block min-h-16 break-words text-sm leading-6 text-primary">{selected.code}</code>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-secondary">重复或选择条件</dt>
                <dd className="mt-1 text-primary">{selected.condition}</dd>
              </div>
              <div>
                <dt className="text-secondary">退出与结果</dt>
                <dd className="mt-1 text-primary">{selected.exit}</dd>
              </div>
            </dl>
          </div>

          <section className="min-h-72 border border-border bg-bg p-4">
            <span className="text-xs text-secondary">执行轨迹</span>
            <div className="mt-4 space-y-2">
              {selected.trace.map((item, index) => (
                <div
                  key={item}
                  className={`min-h-12 border px-3 py-3 text-sm ${
                    index === traceStep
                      ? "border-emerald-500/50 bg-emerald-500/15 text-primary"
                      : index < traceStep
                        ? "border-border bg-elevated text-secondary"
                        : "border-border text-secondary opacity-55"
                  }`}
                >
                  {index + 1}. {item}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTraceStep((value) => (value + 1) % 3)}
              className="mt-4 min-h-11 w-full border border-border px-3 text-sm text-primary hover:border-primary"
            >
              下一步
            </button>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `if` 和 `loop` 可以产生值；`while` 适合条件驱动重复，`for` 直接遍历迭代器并减少索引错误。
      </figcaption>
    </figure>
  );
}
