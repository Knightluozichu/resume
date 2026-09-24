"use client";

import { useId, useState } from "react";

export type CostAlgorithm = "triangle" | "square" | "doubling" | "halving";
export type CostEvent = { row: number; column: number; value: number };
export type CostState = {
  n: number;
  algorithm: CostAlgorithm;
  fault: boolean;
  step: number;
};

const algorithmNames: Record<CostAlgorithm, string> = {
  triangle: "三角循环：j < i",
  square: "方形循环：j < n",
  doubling: "倍增：k *= 2",
  halving: "减半：k /= 2",
};

/** Executes bounded loops. Each event is ONE body visit, not a CPU instruction. */
export function runCostModel(
  n: number,
  algorithm: CostAlgorithm,
  fault = false,
) {
  if (!Number.isInteger(n) || n < 0 || n > 12)
    throw new RangeError("n must be an integer in [0, 12]");
  if (!Object.hasOwn(algorithmNames, algorithm))
    throw new RangeError("unknown algorithm");
  if (typeof fault !== "boolean") throw new TypeError("fault must be boolean");
  const events: CostEvent[] = [];
  const grid = algorithm === "triangle" || algorithm === "square";
  if (grid) {
    for (let i = 0; i < n; ++i) {
      const bound = algorithm === "triangle" ? i : n;
      for (let j = 0; j < bound; ++j)
        events.push({ row: i, column: j, value: j });
    }
  } else if (algorithm === "doubling") {
    for (let k = 1; k <= n; k *= 2)
      events.push({ row: events.length, column: 0, value: k });
  } else {
    for (let k = n; k > 0; k = Math.floor(k / 2))
      events.push({ row: events.length, column: 0, value: k });
  }
  const claimed = fault && grid ? n * n : events.length;
  const ghostCells: CostEvent[] = [];
  if (fault && algorithm === "triangle")
    for (let i = 0; i < n; ++i)
      for (let j = i; j < n; ++j)
        ghostCells.push({ row: i, column: j, value: j });
  return {
    events,
    grid,
    actual: events.length,
    claimed,
    overcount: claimed - events.length,
    ghostCells,
  };
}

export function initialCostState(): CostState {
  return { n: 6, algorithm: "triangle", fault: false, step: 15 };
}

export type CostAction =
  | { type: "reset" }
  | { type: "n"; value: number }
  | { type: "algorithm"; value: CostAlgorithm }
  | { type: "fault"; value: boolean }
  | { type: "step"; value: number };

/** No mutation, including inside React's state setter. */
export function transitionCostState(
  state: CostState,
  action: CostAction,
): CostState {
  if (action.type === "reset") return initialCostState();
  const next = { ...state };
  if (action.type === "algorithm") next.algorithm = action.value;
  if (action.type === "n") next.n = action.value;
  if (action.type === "fault") next.fault = action.value;
  if (next.algorithm === "doubling" || next.algorithm === "halving")
    next.fault = false;
  const run = runCostModel(next.n, next.algorithm, next.fault);
  if (action.type === "step") {
    if (
      !Number.isInteger(action.value) ||
      action.value < 0 ||
      action.value > run.actual
    )
      throw new RangeError("step outside trace");
    next.step = action.value;
  } else if (action.type === "n" || action.type === "algorithm")
    next.step = run.actual;
  return next;
}

export function DsaAlgorithmAnalysisCostLab() {
  const id = useId();
  const [state, setState] = useState<CostState>(initialCostState);
  const run = runCostModel(state.n, state.algorithm, state.fault);
  const dispatch = (action: CostAction) =>
    setState(transitionCostState(state, action));
  const selected = state.step > 0 ? run.events[state.step - 1] : undefined;
  const scale = Math.max(1, run.actual, run.claimed);
  const primary = "var(--text-primary)";
  const muted = "var(--text-secondary)";
  const border = "var(--border)";
  const accent = "var(--accent)";
  const warning = "var(--warning)";
  const control =
    "min-h-11 w-full rounded-control border border-border bg-surface px-2 text-sm text-primary";

  return (
    <section
      aria-label="算法成本实验：执行轨迹与错误计数"
      className="my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-5"
    >
      <h3 className="m-0 text-lg font-semibold text-primary">
        一次命中，留下一个点
      </h3>
      <p className="text-sm text-secondary">
        只数循环体进入次数，不是毫秒；输入限制为 0–12。
      </p>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <label className="min-w-0 text-sm" htmlFor={`${id}-algorithm`}>
          算法
          <select
            id={`${id}-algorithm`}
            className={control}
            value={state.algorithm}
            onChange={(event) =>
              dispatch({
                type: "algorithm",
                value: event.target.value as CostAlgorithm,
              })
            }
          >
            {Object.entries(algorithmNames).map(([value, name]) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0 text-sm" htmlFor={`${id}-n`}>
          输入 n = {state.n}
          <input
            id={`${id}-n`}
            className="block min-h-11 w-full accent-(--accent)"
            type="range"
            min={0}
            max={12}
            step={1}
            value={state.n}
            onChange={(event) =>
              dispatch({ type: "n", value: Number(event.target.value) })
            }
          />
        </label>
      </div>
      <svg
        viewBox="0 0 330 330"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
        className="mx-auto block h-auto w-full max-w-[440px]"
        data-algorithm={state.algorithm}
        data-n={state.n}
        data-step={state.step}
        data-fault={state.fault}
      >
        <title id={`${id}-title`}>{"循环的真实执行轨迹"}</title>
        <desc id={`${id}-desc`}>
          {run.grid
            ? `横轴 j，纵轴 i。实心格为已执行事件，空心格为尚未播放事件，虚线格为错误计数多算的事件。真实 ${run.actual} 次，声称 ${run.claimed} 次。`
            : `横轴为当前 k 值，纵轴为执行轮次；每个圆点只计一次，线段显示参数变化。总计 ${run.actual} 次。`}
        </desc>
        <g fontSize={16} fill={primary}>
          <text x={12} y={22}>
            {run.grid ? "i ↓    j →（从 0 开始）" : "轮次 ↓    参数 k →"}
          </text>
          {run.grid ? (
            <>
              {Array.from({ length: state.n }, (_, i) => (
                <text key={i} x={28} y={60 + i * 18} textAnchor="end">
                  {i}
                </text>
              ))}
              {[0, 3, 6, 9, 11]
                .filter((j) => j < state.n)
                .map((j) => (
                  <text key={j} x={57 + j * 18} y={40} textAnchor="middle">
                    {j}
                  </text>
                ))}
              {run.events.map((event, index) => (
                <rect
                  key={`${event.row}-${event.column}`}
                  data-event={index + 1}
                  x={50 + event.column * 18}
                  y={47 + event.row * 18}
                  width={14}
                  height={14}
                  rx={2}
                  fill={index < state.step ? accent : "none"}
                  stroke={selected === event ? primary : border}
                  strokeWidth={selected === event ? 2 : 1}
                />
              ))}
              {run.ghostCells.map((event) => (
                <rect
                  key={`ghost-${event.row}-${event.column}`}
                  data-ghost="true"
                  x={50 + event.column * 18}
                  y={47 + event.row * 18}
                  width={14}
                  height={14}
                  fill="none"
                  stroke={warning}
                  strokeDasharray="3 2"
                />
              ))}
            </>
          ) : (
            <>
              <path d="M50 43 V243 H292" fill="none" stroke={border} />
              {[0, 4, 8, 12].map((value) => (
                <text
                  key={value}
                  x={50 + value * 18}
                  y={266}
                  textAnchor="middle"
                >
                  {value}
                </text>
              ))}
              <polyline
                points={run.events
                  .slice(0, state.step)
                  .map(
                    (event) =>
                      `${50 + event.value * 18},${65 + event.row * 48}`,
                  )
                  .join(" ")}
                fill="none"
                stroke={accent}
                strokeWidth={2}
              />
              {run.events.map((event, index) => (
                <g key={index} data-event={index + 1}>
                  <text x={28} y={71 + event.row * 48} textAnchor="end">
                    {index + 1}
                  </text>
                  <circle
                    cx={50 + event.value * 18}
                    cy={65 + event.row * 48}
                    r={6}
                    fill={index < state.step ? accent : "var(--bg-elevated)"}
                    stroke={selected === event ? primary : border}
                    strokeWidth={2}
                  />
                  <text
                    x={50 + event.value * 18}
                    y={51 + event.row * 48}
                    textAnchor="middle"
                  >
                    {event.value}
                  </text>
                </g>
              ))}
            </>
          )}
          {run.actual === 0 && (
            <text x={70} y={145} fill={muted}>
              没有进入循环体
            </text>
          )}
          <text x={12} y={294}>
            实测
          </text>
          <rect
            x={60}
            y={280}
            height={15}
            width={(190 * run.actual) / scale}
            fill={accent}
          />
          <text x={262} y={294}>
            {run.actual}
          </text>
          <text x={12} y={321}>
            声称
          </text>
          <rect
            x={60}
            y={307}
            height={15}
            width={(190 * run.claimed) / scale}
            fill={run.overcount ? warning : muted}
          />
          <text x={262} y={321}>
            {run.claimed}
          </text>
        </g>
      </svg>
      <p className="text-sm text-secondary">
        {run.grid
          ? "每格 = 一次循环体；实心为已执行，空心为未执行，虚线为多算。"
          : "每圆点 = 一次循环体；横坐标是 k，不是本轮操作数。"}
      </p>
      <label htmlFor={`${id}-step`} className="block text-sm">
        轨迹进度：{state.step} / {run.actual}
        <input
          id={`${id}-step`}
          className="block min-h-11 w-full accent-(--accent)"
          type="range"
          min={0}
          max={Math.max(1, run.actual)}
          step={1}
          value={state.step}
          disabled={run.actual === 0}
          onChange={(event) =>
            dispatch({ type: "step", value: Number(event.target.value) })
          }
        />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-h-11 min-w-0 flex-1 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={state.fault}
            disabled={!run.grid}
            onChange={(event) =>
              dispatch({ type: "fault", value: event.target.checked })
            }
            className="h-5 w-5 shrink-0 accent-(--accent)"
          />
          误把内层上界固定为 n
        </label>
        <button
          type="button"
          className="min-h-11 rounded-control border border-border px-4 text-sm text-primary"
          onClick={() => dispatch({ type: "reset" })}
        >
          重置
        </button>
      </div>
      <p aria-live="polite" className="mb-0 break-words text-sm text-primary">
        {selected
          ? `第 ${state.step} 次：${run.grid ? `i=${selected.row}, j=${selected.column}` : `k=${selected.value}`}。`
          : "尚无已执行事件。"}
        {run.overcount
          ? `错误多算 ${run.overcount} 次：虚线格根本不会进入。`
          : state.fault
            ? "方形循环的上界本来就是 n；此开关不改变计数。"
            : "声称计数与完整执行一致。"}
      </p>
    </section>
  );
}
