"use client";

import { useState } from "react";

type WorkState = {
  layout: "scattered" | "batched";
  duration: 45 | 60 | 90;
  ready: 0 | 60 | 120;
  recipient: "operations" | "risk";
};
type Interval = { start: number; end: number };
type WorkAction =
  | { type: "layout"; value: WorkState["layout"] }
  | { type: "duration"; value: WorkState["duration"] }
  | { type: "ready"; value: WorkState["ready"] }
  | { type: "recipient"; value: WorkState["recipient"] }
  | { type: "reset" };

const initialState: WorkState = {
  layout: "scattered",
  duration: 60,
  ready: 0,
  recipient: "operations",
};
const clock = (minute: number) =>
  `${String(9 + Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
const span = (interval: Interval) =>
  `${clock(interval.start)}–${clock(interval.end)}`;

/** Independent teaching constraints, not a productivity scale or a historical case. */
export function modelExecutiveWork(state: WorkState) {
  if (
    !state ||
    !["scattered", "batched"].includes(state.layout) ||
    ![45, 60, 90].includes(state.duration) ||
    ![0, 60, 120].includes(state.ready) ||
    !["operations", "risk"].includes(state.recipient)
  ) {
    throw new RangeError("仅接受实验列出的日程、工作范围、输入时间与接收者。");
  }
  const busy: Interval[] =
    state.layout === "scattered"
      ? [
          { start: 30, end: 45 },
          { start: 75, end: 90 },
          { start: 120, end: 135 },
        ]
      : [{ start: 0, end: 45 }];
  const free: Interval[] = [];
  let cursor = 0;
  for (const interruption of busy) {
    if (cursor < interruption.start)
      free.push({ start: cursor, end: interruption.start });
    cursor = interruption.end;
  }
  if (cursor < 180) free.push({ start: cursor, end: 180 });
  const deadline = state.recipient === "operations" ? 180 : 90;
  const receiver =
    state.recipient === "operations" ? "运营负责人" : "风险复核人";
  const artifact =
    state.duration === 45
      ? "变更清单"
      : state.duration === 60
        ? "变更清单与影响核对"
        : "变更、影响与替代方案";
  const windows = free
    .map(({ start, end }) => ({
      start: Math.max(start, state.ready),
      end: Math.min(end, deadline),
    }))
    .filter(({ start, end }) => start < end);
  const longest = Math.max(0, ...windows.map(({ start, end }) => end - start));
  const usableMinutes = windows.reduce(
    (sum, { start, end }) => sum + end - start,
    0,
  );
  const fit = windows.find(({ start, end }) => end - start >= state.duration);
  const booking: Interval | null = fit
    ? { start: fit.start, end: fit.start + state.duration }
    : null;
  const reason = booking
    ? "reserved"
    : state.ready >= deadline
      ? "dependency"
      : usableMinutes < state.duration
        ? "window"
        : "fragmentation";
  const status = booking
    ? `可预留 ${span(booking)}，计划编写《${artifact}》，在 ${clock(deadline)} 前交给${receiver}。这只是可行排期，尚未产出或获采用。`
    : reason === "dependency"
      ? `拒绝安排：输入到 ${clock(state.ready)} 才就绪，接收期限是 ${clock(deadline)}，没有先后合法的工作窗口。`
      : `拒绝安排：输入就绪后、接收期限前共有 ${usableMinutes} 分钟空闲，最长连续 ${longest} 分钟，不足所需连续 ${state.duration} 分钟。${reason === "fragmentation" ? "总量够，但被中断切碎。" : "在此依赖与期限下，连总时长也不够。"}`;
  return {
    busy,
    free,
    windows,
    booking,
    deadline,
    receiver,
    artifact,
    longest,
    usableMinutes,
    freeMinutes: free.reduce((sum, { start, end }) => sum + end - start, 0),
    reason,
    status,
  };
}

export function reduceExecutiveWork(
  state: WorkState = initialState,
  action: WorkAction,
): WorkState {
  if (action.type === "reset") return { ...initialState };
  const next = { ...state, [action.type]: action.value };
  modelExecutiveWork(next); // Refuse invalid runtime input without changing old state.
  return next;
}

const colors = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  surface: "var(--bg-elevated)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const selectClass =
  "mt-1 block min-h-11 w-full min-w-0 rounded-control border border-border bg-surface px-2 py-2 text-sm text-primary";
const timeX = (minute: number) => 30 + minute * 1.5;

export function EexLearningMapWorkEvidenceLab() {
  const [state, setState] = useState<WorkState>({ ...initialState });
  const model = modelExecutiveWork(state);
  const send = (action: WorkAction) =>
    setState(reduceExecutiveWork(state, action));
  return (
    <section
      aria-label="阅读地图：时间与产出约定实验"
      className="not-prose my-6 min-w-0 space-y-4 rounded-card border border-border p-3 text-primary"
    >
      <h3 className="text-lg font-semibold">一份说明，怎样到达接收者？</h3>
      <p className="text-sm text-secondary">
        本站自拟情境：上午 09:00–12:00
        编写变更说明。输入、工作范围与接收期限均为假设；图中只计算能否排入，不宣称工作已经完成。
      </p>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <label className="min-w-0 text-sm">
          中断的安排（总计 45 分钟）
          <select
            className={selectClass}
            value={state.layout}
            onChange={(event) =>
              send({
                type: "layout",
                value: event.target.value as WorkState["layout"],
              })
            }
          >
            <option value="scattered">三次分散中断</option>
            <option value="batched">协商集中到 09:00–09:45</option>
          </select>
        </label>
        <label className="min-w-0 text-sm">
          产出范围（须连续完成）
          <select
            className={selectClass}
            value={state.duration}
            onChange={(event) =>
              send({
                type: "duration",
                value: Number(event.target.value) as WorkState["duration"],
              })
            }
          >
            <option value={45}>45 分钟：变更清单</option>
            <option value={60}>60 分钟：加影响核对</option>
            <option value={90}>90 分钟：再加替代方案</option>
          </select>
        </label>
        <label className="min-w-0 text-sm">
          已核实的输入何时就绪
          <select
            className={selectClass}
            value={state.ready}
            onChange={(event) =>
              send({
                type: "ready",
                value: Number(event.target.value) as WorkState["ready"],
              })
            }
          >
            <option value={0}>09:00</option>
            <option value={60}>10:00</option>
            <option value={120}>11:00</option>
          </select>
        </label>
        <label className="min-w-0 text-sm">
          接收者与最迟交付时间
          <select
            className={selectClass}
            value={state.recipient}
            onChange={(event) =>
              send({
                type: "recipient",
                value: event.target.value as WorkState["recipient"],
              })
            }
          >
            <option value="operations">运营负责人 · 12:00</option>
            <option value="risk">风险复核人 · 10:30</option>
          </select>
        </label>
      </div>
      <button
        type="button"
        className="min-h-11 min-w-11 rounded-control border border-border px-4 py-2 text-sm hover:border-accent"
        onClick={() => send({ type: "reset" })}
      >
        重置全部条件
      </button>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="text-sm"
      >
        {model.status}
      </p>
      <div className="grid min-w-0 gap-4 lg:grid-cols-2">
        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 330 350"
            className="mx-auto block w-full max-w-[440px]"
            role="img"
            aria-label="按分钟比例绘制的上午日程，包含中断、依赖就绪、截止线和可预留时段"
            fontSize={18}
            fill={colors.ink}
          >
            <title>{`上午日程：${model.status}`}</title>
            <text x={15} y={26}>
              同样空闲 {model.freeMinutes} 分钟
            </text>
            {[0, 60, 120, 180].map((minute) => (
              <g key={minute}>
                <text
                  x={timeX(minute)}
                  y={60}
                  textAnchor={
                    minute === 0 ? "start" : minute === 180 ? "end" : "middle"
                  }
                >
                  {clock(minute)}
                </text>
                <path
                  d={`M${timeX(minute)} 108v35 M${timeX(minute)} 190v28 M${timeX(minute)} 260v22`}
                  stroke={colors.border}
                  fill="none"
                />
              </g>
            ))}
            <text x={15} y={94}>
              原始空闲 / 中断
            </text>
            <rect
              x={30}
              y={108}
              width={270}
              height={35}
              fill={colors.surface}
              stroke={colors.border}
            />
            {model.busy.map((interval) => (
              <rect
                key={interval.start}
                x={timeX(interval.start)}
                y={108}
                width={(interval.end - interval.start) * 1.5}
                height={35}
                fill={colors.muted}
              />
            ))}
            <text x={15} y={175}>
              满足输入与期限的空闲
            </text>
            {model.windows.map((interval) => (
              <rect
                key={interval.start}
                x={timeX(interval.start)}
                y={190}
                width={(interval.end - interval.start) * 1.5}
                height={28}
                fill={colors.accent}
                fillOpacity={0.2}
                stroke={colors.accent}
              />
            ))}
            <text x={15} y={247}>
              可预留的连续时段
            </text>
            {model.booking ? (
              <rect
                x={timeX(model.booking.start)}
                y={260}
                width={(model.booking.end - model.booking.start) * 1.5}
                height={22}
                fill={colors.accent}
              />
            ) : (
              <path
                d="M153 260l22 22m0-22l-22 22"
                stroke={colors.danger}
                strokeWidth={3}
              />
            )}
            <path
              d={`M${timeX(state.ready)} 186v36 M${timeX(state.ready)} 256v30`}
              fill="none"
              stroke={colors.ink}
              strokeDasharray="3 4"
              strokeWidth={2}
            />
            <path
              d={`M${timeX(model.deadline)} 186v36 M${timeX(model.deadline)} 256v30`}
              fill="none"
              stroke={colors.danger}
              strokeDasharray="7 4"
              strokeWidth={2}
            />
            <text x={15} y={313}>
              输入 {clock(state.ready)} · 截止 {clock(model.deadline)}
            </text>
            <text x={15} y={339}>
              最长可用连续段：{model.longest} 分钟
            </text>
          </svg>
          <figcaption className="mt-2 text-sm text-secondary">
            灰实块为中断；空底为原始空闲；浅色为满足先后条件的空闲；实色为拟预留。前景色短虚线为输入就绪，警示长虚线为接收期限。叉号表示拒绝，不会拼接碎片。
          </figcaption>
        </figure>
        <figure className="m-0 min-w-0">
          <svg
            viewBox="0 0 330 350"
            className="mx-auto block w-full max-w-[440px]"
            role="img"
            aria-label="变更材料到工作产出再到接收者的依赖路线，仅显示排期推演而非真实交付"
            fontSize={18}
            fill={colors.ink}
          >
            <title>{`计划路线：${model.artifact}交给${model.receiver}，${model.booking ? "有可用时段，仍待核验" : "无法安排"}`}</title>
            <text x={15} y={26}>
              依赖 → 拟产出 → 接收核验
            </text>
            <path
              d="M65 43h185v57H65z"
              fill={colors.surface}
              stroke={colors.border}
            />
            <text x={157} y={66} textAnchor="middle">
              已核实的变更材料
            </text>
            <text x={157} y={89} textAnchor="middle">
              假设 {clock(state.ready)} 就绪
            </text>
            <path
              d="M157 102v26m-5-6 5 6 5-6"
              fill="none"
              stroke={colors.muted}
              strokeWidth={2}
            />
            <path
              d="M50 135h203l22 22v67H50z M253 135v22h22"
              fill={colors.surface}
              stroke={model.booking ? colors.accent : colors.danger}
              strokeWidth={2}
            />
            <text x={157} y={164} textAnchor="middle">
              {model.artifact}
            </text>
            <text x={157} y={189} textAnchor="middle">
              {model.booking ? span(model.booking) : "没有可预留时段"}
            </text>
            <text x={157} y={214} textAnchor="middle">
              {model.booking ? "计划写作，不是完成" : "拒绝承诺按时交付"}
            </text>
            {model.booking ? (
              <path
                d="M157 229v31m-5-6 5 6 5-6"
                fill="none"
                stroke={colors.accent}
                strokeWidth={2}
                strokeDasharray="4 3"
              />
            ) : (
              <path
                d="M157 229v9m-7 4 14 14m0-14-14 14"
                fill="none"
                stroke={colors.danger}
                strokeWidth={2}
              />
            )}
            <circle
              cx={68}
              cy={285}
              r={9}
              fill="none"
              stroke={colors.muted}
              strokeWidth={2}
            />
            <path
              d="M53 316v-8a15 15 0 0 1 30 0v8"
              fill="none"
              stroke={colors.muted}
              strokeWidth={2}
            />
            <text x={98} y={286}>
              {model.receiver} · {clock(model.deadline)}
            </text>
            <text x={98} y={312}>
              待确认是否足以使用
            </text>
            <text x={15} y={339}>
              虚线：拟交付，不代表已采用
            </text>
          </svg>
          <figcaption className="mt-2 text-sm text-secondary">
            文件形状表示拟产出的具体说明，接收者不是完成计数器。输入延迟或期限提前，都可能切断这条计划路线。
          </figcaption>
        </figure>
      </div>
      <div className="space-y-2 text-sm">
        <p>中断：{model.busy.map(span).join("、")}。</p>
        <p>原始空闲：{model.free.map(span).join("、")}。</p>
        <p>
          满足依赖与期限的空闲：
          {model.windows.length ? model.windows.map(span).join("、") : "无"}。
        </p>
        <p className="text-secondary">
          集中中断必须事先获相关人员同意；本模型不模拟急诊、事故值守或不可推迟的请求。缩短所需时间也会减少产出内容，不能假装同样成果完成得更快。现实中的写作是否可分段，须另行确认。
        </p>
      </div>
    </section>
  );
}
