"use client";

import { useState } from "react";

type Frame = { n: number; value: number | null };
type RecursionStep = {
  frames: Frame[];
  event: string;
  fault: boolean;
  result: number | null;
};

/** Iterative interpreter: never executes an unbounded JavaScript recursion. */
export function introductionRecursionTrace(n: number, omitBase = false) {
  if (!Number.isInteger(n) || n < 0 || n > 20)
    throw new RangeError("n 必须是 0..20 的整数");
  const frames: Frame[] = [{ n, value: null }];
  const trace: RecursionStep[] = [];
  const save = (event: string, fault = false, result: number | null = null) =>
    trace.push({ frames: frames.map((f) => ({ ...f })), event, fault, result });
  save(`进入 sum(${n})；每层保存尚未完成的加法。`);
  while (frames.at(-1)!.n > 0) {
    const next = frames.at(-1)!.n - 1;
    frames.push({ n: next, value: null });
    save(`调用 sum(${next})；调用者等待返回。`);
  }
  if (omitBase) {
    save("缺少基例：下一次将调用 sum(-1)。监视器拦截，未执行负域递归。", true);
    return trace;
  }
  frames.at(-1)!.value = 0;
  save("sum(0) 直接得到 0；开始返回。");
  while (frames.length > 1) {
    const child = frames.pop()!;
    const parent = frames.at(-1)!;
    parent.value = parent.n + child.value!;
    save(`${parent.n} + ${child.value} = ${parent.value}；弹出子调用。`);
  }
  const result = frames.pop()!.value!;
  save(`最外层返回 ${result}；栈已清空。`, false, result);
  return trace;
}

export function introductionMatrixSize(rows: number, cols: number) {
  if (
    !Number.isInteger(rows) ||
    !Number.isInteger(cols) ||
    rows < 0 ||
    cols < 0
  )
    throw new RangeError("行列必须是非负整数");
  if (rows > 64 || cols > 64 || (rows !== 0 && cols > Math.floor(1024 / rows)))
    throw new RangeError("教学上限：各维 ≤64，元素数 ≤1024");
  return rows * cols;
}

export function introductionMatrixIndex(
  rows: number,
  cols: number,
  r: number,
  c: number,
) {
  introductionMatrixSize(rows, cols);
  if (
    !Number.isInteger(r) ||
    !Number.isInteger(c) ||
    r < 0 ||
    c < 0 ||
    r >= rows ||
    c >= cols
  )
    throw new RangeError("坐标越界：先拒绝，后计算偏移");
  return r * cols + c;
}

type MatrixStep = {
  rows: number;
  cols: number;
  a: number[];
  b: number[] | null;
  shared: boolean;
  event: string;
  fault: boolean;
  written: boolean;
};

/** Actual separate arrays for a value copy; the fault deliberately aliases them. */
export function introductionMatrixTrace(
  rows: number,
  cols: number,
  alias = false,
) {
  const count = introductionMatrixSize(rows, cols);
  const a = Array.from({ length: count }, (_, i) => i + 1);
  let b: number[] | null = null;
  const trace: MatrixStep[] = [];
  const save = (event: string, fault = false, written = false) =>
    trace.push({
      rows,
      cols,
      a: [...a],
      b: b && [...b],
      shared: b !== null && a === b,
      event,
      fault,
      written,
    });
  save(`构造 A(${rows}, ${cols})，保存 ${count} 个元素。`);
  b = alias ? a : [...a];
  save(
    alias
      ? "错误模型：B 借用了 A 的同一存储。"
      : "复制 B = A：两个独立的值序列。",
    alias,
  );
  try {
    b[introductionMatrixIndex(rows, cols, 0, 0)] = 99;
    save(`写 B(0,0)=99；A(0,0)=${a[0]}。`, alias, true);
  } catch (error) {
    if (!(error instanceof RangeError)) throw error;
    save("空矩阵没有 (0,0)：拒绝写入，形状和存储都不变。", true);
  }
  try {
    b[introductionMatrixIndex(rows, cols, rows, 0)] = -1;
    throw new Error("unreachable: bounds contract broken");
  } catch (error) {
    if (!(error instanceof RangeError)) throw error;
    save(`尝试 B(${rows},0)：行号等于行数，拒绝写入。`, true);
  }
  return trace;
}

const buttonClass =
  "min-h-11 rounded-control border border-border px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";
const color = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  bg: "var(--bg)",
  line: "var(--border)",
  danger: "var(--danger)",
};

export function DsaIntroductionContractLab() {
  const [n, setN] = useState(3);
  const [omitBase, setOmitBase] = useState(false);
  const [step, setStep] = useState(0);
  const trace = introductionRecursionTrace(n, omitBase);
  const current = trace[step];
  return (
    <section
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-4"
      aria-label="递归调用栈实验"
    >
      <h3 className="text-lg font-semibold text-primary">
        sum(n)：调用栈保存未完成的加法
      </h3>
      <p className="my-2 text-sm text-secondary">
        图中从上向下入栈。输入改变会回到第 0 步；故障监视器不会执行负域递归。
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
          输入 n
          <select
            className={buttonClass}
            value={n}
            onChange={(e) => {
              setN(Number(e.target.value));
              setStep(0);
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={buttonClass}
          disabled={step === trace.length - 1}
          onClick={() => setStep(step + 1)}
        >
          执行一步
        </button>
        <button
          type="button"
          className={buttonClass}
          aria-pressed={omitBase}
          onClick={() => {
            setOmitBase(!omitBase);
            setStep(0);
          }}
        >
          缺失基例：{omitBase ? "开" : "关"}
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => {
            setN(3);
            setOmitBase(false);
            setStep(0);
          }}
        >
          重置
        </button>
      </div>
      <svg
        viewBox="0 0 330 400"
        role="img"
        aria-label={`sum(${n}) 第 ${step} 步，${current.frames.length} 个活动调用`}
        className="mx-auto mt-3 block h-auto w-full max-w-[420px]"
        style={{ fontSize: 16 }}
      >
        <title>{`递归栈：${current.event}`}</title>
        <text x="12" y="25" fill={color.text}>
          活动调用（外层 → 内层）
        </text>
        <path
          d="M 18 45 V 356 H 316"
          fill="none"
          stroke={color.line}
          strokeWidth="2"
        />
        {current.frames.map((frame, index) => {
          const y = 45 + index * 43;
          const top = index === current.frames.length - 1;
          return (
            <g
              key={frame.n}
              data-frame={frame.n}
              data-value={frame.value ?? "pending"}
            >
              <rect
                x="30"
                y={y}
                width="280"
                height="37"
                rx="4"
                fill={color.bg}
                stroke={
                  top
                    ? current.fault
                      ? color.danger
                      : color.accent
                    : color.line
                }
                strokeWidth={top ? 3 : 1}
              />
              <text
                x="40"
                y={y + 24}
                fill={color.text}
              >{`sum(${frame.n})`}</text>
              <text x="125" y={y + 24} fill={top ? color.accent : color.muted}>
                {frame.value === null
                  ? frame.n === 0
                    ? "检查基例"
                    : `等 ${frame.n} + 子结果`
                  : `得到 ${frame.value}`}
              </text>
            </g>
          );
        })}
        {current.frames.length === 0 && (
          <text
            x="40"
            y="92"
            fill={color.accent}
          >{`返回值 = ${current.result}`}</text>
        )}
        <text x="18" y="383" fill={current.fault ? color.danger : color.muted}>
          {current.fault
            ? "× 负域调用已被拦截"
            : `步骤 ${step}/${trace.length - 1} · 峰值 ${n + 1} 层`}
        </text>
      </svg>
      <p
        className="min-h-14 text-sm leading-relaxed text-primary"
        aria-live="polite"
      >
        {current.event}
      </p>
    </section>
  );
}

function MatrixStorage({
  values,
  label,
  changed,
}: {
  values: number[];
  label: string;
  changed: boolean;
}) {
  return (
    <g>
      <text x="12" y="20" fill={color.muted}>
        {label}
      </text>
      {values.map((value, index) => (
        <g key={index} data-offset={index} data-value={value}>
          <rect
            x={12 + index * 49}
            y="32"
            width="49"
            height="39"
            fill={color.bg}
            stroke={changed && index === 0 ? color.danger : color.line}
            strokeWidth={changed && index === 0 ? 3 : 1}
          />
          <text
            x={36 + index * 49}
            y="57"
            textAnchor="middle"
            fill={color.text}
          >
            {value}
          </text>
          <text
            x={36 + index * 49}
            y="93"
            textAnchor="middle"
            fill={color.muted}
          >
            {index}
          </text>
        </g>
      ))}
      {values.length === 0 && (
        <text x="12" y="57" fill={color.muted}>
          空序列 · 不画已分配元素
        </text>
      )}
    </g>
  );
}

export function DsaIntroductionMatrixLab() {
  const [shape, setShape] = useState("2x3");
  const [alias, setAlias] = useState(false);
  const [step, setStep] = useState(0);
  const [rows, cols] = shape.split("x").map(Number);
  const trace = introductionMatrixTrace(rows, cols, alias);
  const current = trace[step];
  return (
    <section
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-4"
      aria-label="矩阵形状与值复制实验"
    >
      <h3 className="text-lg font-semibold text-primary">
        二维坐标 → 拥有的连续元素
      </h3>
      <p className="my-2 text-sm text-secondary">
        序号是元素偏移，不是字节地址。存储号只表示身份，不冒充真实内存地址。
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
          形状
          <select
            className={buttonClass}
            value={shape}
            onChange={(e) => {
              setShape(e.target.value);
              setStep(0);
            }}
          >
            {["2x3", "3x2", "0x3", "3x0"].map((value) => (
              <option key={value} value={value}>
                {value.replace("x", " × ")}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={buttonClass}
          disabled={step === trace.length - 1}
          onClick={() => setStep(step + 1)}
        >
          执行一步
        </button>
        <button
          type="button"
          className={buttonClass}
          aria-pressed={alias}
          onClick={() => {
            setAlias(!alias);
            setStep(0);
          }}
        >
          错误共享：{alias ? "开" : "关"}
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => {
            setShape("2x3");
            setAlias(false);
            setStep(0);
          }}
        >
          重置
        </button>
      </div>
      <svg
        viewBox="0 0 330 580"
        role="img"
        aria-label={`${rows} 行 ${cols} 列，${current.b === null ? "只有 A" : current.shared ? "A 与 B 共享存储" : "A 与 B 各自拥有存储"}`}
        className="mx-auto mt-3 block h-auto w-full max-w-[420px]"
        style={{ fontSize: 16 }}
      >
        <title>{`矩阵存储：${current.event}`}</title>
        <text
          x="12"
          y="24"
          fill={color.text}
        >{`A 的形状：${rows} × ${cols}`}</text>
        {current.a.map((value, offset) => {
          const r = Math.floor(offset / cols),
            c = offset % cols;
          return (
            <g key={offset} data-coordinate={`${r},${c}`}>
              <rect
                x={20 + c * 90}
                y={42 + r * 36}
                width="90"
                height="36"
                fill={color.bg}
                stroke={color.line}
              />
              <text
                x={65 + c * 90}
                y={66 + r * 36}
                fill={color.text}
                textAnchor="middle"
              >{`${r},${c}: ${value}`}</text>
            </g>
          );
        })}
        {current.a.length === 0 && (
          <text x="12" y="78" fill={color.muted}>
            形状保留，但没有合法坐标
          </text>
        )}
        <text
          x="12"
          y="178"
          fill={color.text}
        >{`偏移 = 行 × ${cols} + 列`}</text>
        <text x="12" y="219" fill={color.accent}>
          A
        </text>
        <path
          data-owner="A"
          data-storage="0"
          d="M 34 214 H 88 V 242 l -5 -8 m 5 8 l 5 -8"
          fill="none"
          stroke={color.accent}
          strokeWidth="2"
        />
        {current.b !== null && (
          <g>
            <text
              data-owner-label="B"
              x={current.shared ? 225 : 12}
              y={current.shared ? 219 : 359}
              fill={current.shared ? color.danger : color.accent}
            >
              B
            </text>
            <path
              data-owner="B"
              data-storage={current.shared ? "0" : "1"}
              d={
                current.shared
                  ? "M 213 214 H 155 V 242 l -5 -8 m 5 8 l 5 -8"
                  : "M 34 354 H 88 V 379 l -5 -8 m 5 8 l 5 -8"
              }
              fill="none"
              stroke={current.shared ? color.danger : color.accent}
              strokeWidth="2"
            />
          </g>
        )}
        <g transform="translate(0 243)">
          <MatrixStorage
            values={current.a}
            label="存储 0 · 下方为元素偏移"
            changed={current.a[0] === 99}
          />
        </g>
        {current.b !== null && !current.shared && (
          <g transform="translate(0 383)">
            <MatrixStorage
              values={current.b}
              label="存储 1 · 独立值副本"
              changed={current.b[0] === 99}
            />
          </g>
        )}
        {current.shared && (
          <text x="12" y="414" fill={color.danger}>
            B 没有独立的元素序列
          </text>
        )}
        {current.fault && (
          <path
            d="M 16 538 l 14 14 m -14 0 l 14 -14"
            stroke={color.danger}
            strokeWidth="3"
          />
        )}
        <text
          x="42"
          y="550"
          fill={current.fault ? color.danger : color.muted}
        >{`步骤 ${step}/3 · ${current.fault ? "检查失败轨迹" : "观察存储身份"}`}</text>
      </svg>
      <p
        className="min-h-14 text-sm leading-relaxed text-primary"
        aria-live="polite"
      >
        {current.event}
      </p>
    </section>
  );
}
