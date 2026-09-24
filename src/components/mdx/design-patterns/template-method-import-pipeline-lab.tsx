"use client";

import { useState } from "react";

// BEGIN PIPELINE MODEL — mirrored by the executable MDX fragments.
export type Format = "csv" | "json";
export type Scenario =
  | "valid"
  | "invalid"
  | "empty"
  | "read-fail"
  | "malformed";
export type Mode = "template" | "early" | "bypass" | "hook-error";
export type Frame = {
  stage: string;
  data: unknown[];
  stored: unknown[];
  closed: boolean;
  error: string;
};
export class MemoryInput {
  closed = false;
  constructor(
    readonly text: string,
    readonly fail = false,
  ) {}
  read(): string {
    if (this.closed || this.fail) throw new Error("read failed");
    return this.text;
  }
  close(): void {
    this.closed = true;
  }
}
export function snapshot(
  stage: string,
  data: unknown[],
  sink: unknown[],
  source: MemoryInput,
  error = "",
): Frame {
  return {
    stage,
    data: structuredClone(data),
    stored: structuredClone(sink),
    closed: source.closed,
    error,
  };
}

export function parseCsv(text: string): unknown[] {
  if (!text.trim()) return [];
  return text
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const fields = line.split(",");
      if (fields.length !== 2) throw new Error("csv columns");
      return { name: fields[0].trim(), amount: Number(fields[1]) };
    });
}
export function parseJson(text: string): unknown[] {
  const value: unknown = JSON.parse(text);
  if (!Array.isArray(value)) throw new Error("json array required");
  return value;
}
export function validate(rows: unknown[]): void {
  for (const row of rows) {
    if (!row || typeof row !== "object") throw new Error("row object");
    const r = row as Record<string, unknown>;
    if (
      typeof r.name !== "string" ||
      !r.name.trim() ||
      typeof r.amount !== "number" ||
      !Number.isSafeInteger(r.amount) ||
      r.amount <= 0
    ) {
      throw new Error("name / positive integer amount");
    }
  }
}

export abstract class ImportTemplate {
  #source: MemoryInput;
  #sink: unknown[];
  constructor(source: MemoryInput, sink: unknown[]) {
    this.#source = source;
    this.#sink = sink;
  }
  protected abstract parse(text: string): unknown[];
  protected afterParse(_rows: readonly unknown[]): void {} // optional hook
  run(): Frame[] {
    const trace: Frame[] = [];
    let data: unknown[] = [];
    const mark = (stage: string, error = "") =>
      trace.push(snapshot(stage, data, this.#sink, this.#source, error));
    try {
      const text = this.#source.read();
      data = [text];
      mark("read");
      data = this.parse(text);
      mark("parse");
      this.afterParse(structuredClone(data));
      mark("hook");
      validate(data);
      mark("validate");
      this.#sink.push(...data);
      mark("commit");
    } catch (error) {
      mark("error", error instanceof Error ? error.message : String(error));
    } finally {
      this.#source.close();
      mark("close");
    }
    return trace;
  }
}

export class CsvImport extends ImportTemplate {
  protected override parse(text: string): unknown[] {
    return parseCsv(text);
  }
}
export class JsonImport extends ImportTemplate {
  protected override parse(text: string): unknown[] {
    return parseJson(text);
  }
}
// Deliberately wrong: caller sidesteps run(), validation and finally.
export function bypass(
  source: MemoryInput,
  sink: unknown[],
  parse: (text: string) => unknown[],
): Frame[] {
  const trace: Frame[] = [];
  let data: unknown[] = [];
  const mark = (stage: string, error = "") =>
    trace.push(snapshot(stage, data, sink, source, error));
  try {
    const text = source.read();
    data = [text];
    mark("read");
    data = parse(text);
    mark("parse");
    sink.push(...data);
    mark("commit");
  } catch (error) {
    mark("error", error instanceof Error ? error.message : String(error));
  }
  return trace; // no close: a real leak in our memory-resource model
}

export function sample(format: Format, scenario: Scenario): string {
  if (scenario === "empty") return format === "csv" ? "" : "[]";
  if (scenario === "malformed") return format === "csv" ? "A,3,extra" : "[";
  const amount = scenario === "invalid" ? -2 : 2;
  return format === "csv"
    ? `A,3\nB,${amount}`
    : JSON.stringify([
        { name: "A", amount: 3 },
        { name: "B", amount },
      ]);
}
export function simulate(
  format: Format,
  scenario: Scenario,
  mode: Mode,
): Frame[] {
  const source = new MemoryInput(
    sample(format, scenario),
    scenario === "read-fail",
  );
  const sink: unknown[] = [];
  const Job = format === "csv" ? CsvImport : JsonImport;
  if (mode === "bypass")
    return bypass(source, sink, format === "csv" ? parseCsv : parseJson);
  if (mode === "template") return new Job(source, sink).run();
  const job = new (class extends ImportTemplate {
    protected override parse(text: string): unknown[] {
      return (format === "csv" ? parseCsv : parseJson)(text);
    }
    protected override afterParse(rows: readonly unknown[]): void {
      if (mode === "early") sink.push(...rows); // leaked write capability!
      if (mode === "hook-error") throw new Error("hook failed");
    }
  })(source, sink);
  return job.run();
}

// END PIPELINE MODEL

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
};
const control =
  "min-h-11 rounded border border-border bg-elevated px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";
const initial = {
  format: "csv" as Format,
  scenario: "valid" as Scenario,
  mode: "template" as Mode,
  cursor: 99,
};

function datum(row: unknown): { name: string; amount: number | null } {
  if (row && typeof row === "object") {
    const r = row as Record<string, unknown>;
    return {
      name: String(r.name ?? "?").slice(0, 8),
      amount:
        typeof r.amount === "number" && Number.isFinite(r.amount)
          ? r.amount
          : null,
    };
  }
  return { name: String(row).slice(0, 16), amount: null };
}

export function TemplateMethodImportPipelineLab() {
  const [state, setState] = useState(initial);
  const trace = simulate(state.format, state.scenario, state.mode);
  const cursor = Math.min(state.cursor, trace.length - 1);
  const current = trace[cursor];
  const visible = trace.slice(0, cursor + 1);
  const breached = visible.some(
    (frame, index) =>
      frame.stored.length > 0 &&
      !visible.slice(0, index).some((prior) => prior.stage === "validate"),
  );
  const error = visible.find((frame) => frame.error)?.error;
  const height = trace.length * 88 + 60;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-xl border border-border bg-elevated text-primary"
      aria-label="模板方法导入流水线实验"
    >
      <header className="border-b border-border p-4">
        <h3 className="text-base font-semibold">谁掌握提交的时机？</h3>
        <p className="mt-2 text-sm text-secondary">
          默认显示完整执行。单步从读取开始回放快照；切换条件会重新运行内存流水线，不会累积上次提交。
        </p>
      </header>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        <label className="flex min-w-0 flex-col gap-1 text-sm">
          解析子类
          <select
            className={control}
            value={state.format}
            onChange={(event) =>
              setState({
                ...state,
                format: event.target.value as Format,
                cursor: 99,
              })
            }
          >
            <option value="csv">CSV 两列</option>
            <option value="json">JSON 数组</option>
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1 text-sm">
          输入边界
          <select
            className={control}
            value={state.scenario}
            onChange={(event) =>
              setState({
                ...state,
                scenario: event.target.value as Scenario,
                cursor: 99,
              })
            }
          >
            <option value="valid">合法：3、2</option>
            <option value="invalid">非法：3、-2</option>
            <option value="empty">空批次</option>
            <option value="malformed">格式损坏</option>
            <option value="read-fail">读取失败</option>
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1 text-sm">
          执行方式
          <select
            className={control}
            value={state.mode}
            onChange={(event) =>
              setState({
                ...state,
                mode: event.target.value as Mode,
                cursor: 99,
              })
            }
          >
            <option value="template">正常模板</option>
            <option value="early">坏钩子提前写入</option>
            <option value="bypass">绕过模板</option>
            <option value="hook-error">钩子抛错</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-3 px-4 pb-4">
        <button
          type="button"
          className={control}
          onClick={() =>
            setState({
              ...state,
              cursor: cursor === trace.length - 1 ? 0 : cursor + 1,
            })
          }
        >
          下一阶段 / 从头回放
        </button>
        <button
          type="button"
          className={control}
          onClick={() => setState(initial)}
        >
          重置
        </button>
      </div>
      <div className="border-y border-border bg-[var(--bg)] p-3">
        <p className="break-all text-sm text-secondary">
          实际输入：
          <code>{JSON.stringify(sample(state.format, state.scenario))}</code>
        </p>
        <svg
          className="mx-auto block w-full max-w-[400px]"
          viewBox={`0 0 340 ${height}`}
          role="img"
          aria-label={`阶段轨迹：${visible.map((frame) => frame.stage).join(" → ")}。工作数据与每阶段提交库存，虚线表示 commit 位置；是否先经过 validate 由执行轨迹判定。`}
        >
          <text x="12" y="22" fill={C.muted} fontSize="14">
            调用
          </text>
          <text x="106" y="22" fill={C.muted} fontSize="14">
            工作数据 / 金额
          </text>
          <text x="273" y="22" fill={C.muted} fontSize="14">
            库存
          </text>
          {trace.map((frame, index) => {
            const y = index * 88 + 55;
            const shown = index <= cursor;
            const rows = frame.data.slice(0, 2);
            const color = frame.stage === "error" ? C.danger : C.accent;
            return (
              <g key={`${index}-${frame.stage}`} opacity={shown ? 1 : 0.25}>
                {index > 0 && (
                  <path
                    d={`M 24 ${y - 72} V ${y - 12}`}
                    stroke={C.border}
                    strokeWidth="3"
                  />
                )}
                {frame.stage === "commit" && (
                  <path
                    d={`M 5 ${y - 22} H 335`}
                    stroke={state.mode === "bypass" ? C.danger : C.success}
                    strokeDasharray="5 4"
                  />
                )}
                <circle cx="24" cy={y} r="7" fill={shown ? color : C.border} />
                <text x="38" y={y + 5} fill={C.text} fontSize="14">
                  {frame.stage}
                </text>
                {shown &&
                  rows.map((row, ri) => {
                    const item = datum(row);
                    const ry = y - 7 + ri * 25;
                    const invalid = item.amount !== null && item.amount <= 0;
                    const barWidth = Math.max(
                      2,
                      Math.min(55, Math.abs(item.amount ?? 0) * 13),
                    );
                    return (
                      <g key={ri}>
                        <text
                          x="106"
                          y={ry + 10}
                          fill={invalid ? C.danger : C.text}
                          fontSize="14"
                        >
                          {item.name}
                        </text>
                        {item.amount !== null && (
                          <>
                            <line
                              x1="176"
                              y1={ry + 6}
                              x2="232"
                              y2={ry + 6}
                              stroke={C.border}
                            />
                            <rect
                              x={item.amount < 0 ? 176 - barWidth : 176}
                              y={ry}
                              width={barWidth}
                              height="12"
                              fill={invalid ? C.danger : C.accent}
                            />
                            <text
                              x="238"
                              y={ry + 11}
                              fill={invalid ? C.danger : C.text}
                              fontSize="14"
                            >
                              {String(item.amount)}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                {shown && rows.length === 0 && (
                  <text x="106" y={y + 10} fill={C.muted} fontSize="14">
                    ∅ 空批次
                  </text>
                )}
                {shown && (
                  <>
                    <path
                      d={`M 277 ${y - 10} V ${y + 28} H 330 V ${y - 10}`}
                      fill="none"
                      stroke={C.border}
                      strokeWidth="2"
                    />
                    {frame.stored.slice(0, 4).map((_, n) => (
                      <rect
                        key={n}
                        x={283 + n * 11}
                        y={y + 4}
                        width="8"
                        height="18"
                        fill={breached ? C.danger : C.accent}
                      />
                    ))}
                    <text
                      x="284"
                      y={y - 16}
                      fontSize="14"
                      fill={C.text}
                    >{`${frame.stored.length} 条`}</text>
                    <text
                      x="106"
                      y={y + 49}
                      fontSize="14"
                      fill={frame.closed ? C.success : C.muted}
                    >
                      {frame.closed ? "资源：已关闭" : "资源：打开"}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div
        className="space-y-2 p-4 text-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        <p>{`快照 ${cursor + 1}/${trace.length}：${current.stage}；已提交 ${current.stored.length} 条；资源${current.closed ? "已关闭" : "仍打开"}。`}</p>
        <p
          className={
            breached || error ? "text-[var(--danger)]" : "text-secondary"
          }
        >
          {breached
            ? "合同破坏：校验通过前已有写入；finally 只关闭资源，不会撤销坏钩子或旁路的写入。"
            : error
              ? `处理失败：${error}。正常模板不会执行后续 commit。`
              : "虚线代表进入 commit 的位置；正常路径中 validate 必须先成功。"}
        </p>
        <p className="text-secondary">
          金额条长度对应数值绝对值；负数向左并标红。read
          行是原始文本（图中截取前16字符，完整输入见上方）；后续行是实际解析记录。
        </p>
        <pre className="whitespace-pre-wrap break-all rounded border border-border p-3 text-xs">{`当前数据：${JSON.stringify(current.data)}\n提交库存：${JSON.stringify(current.stored)}`}</pre>
      </div>
    </section>
  );
}
