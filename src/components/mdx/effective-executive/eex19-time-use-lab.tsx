"use client";

import { useMemo, useState } from "react";

type Interval = { start: number; end: number };
type Layout = "scattered" | "batched";
type TaskDuration = 60 | 90 | 120;
type TimeUseState = { layout: Layout; duration: TaskDuration; readyAt: number };
type TimeUseAction =
  | { type: "layout"; value: Layout }
  | { type: "duration"; value: TaskDuration }
  | { type: "readyAt"; value: number }
  | { type: "reset" };

const initialState: TimeUseState = {
  layout: "scattered",
  duration: 90,
  readyAt: 9 * 60,
};

const dayStart = 9 * 60;
const windowEnd = 12 * 60;
const deadline = 12 * 60;

function clock(minute: number) {
  return `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
}

function subtractIntervals(
  start: number,
  end: number,
  blocked: Interval[],
): Interval[] {
  let cursor = start;
  const result: Interval[] = [];
  for (const interval of blocked) {
    if (interval.end <= cursor || interval.start >= end) continue;
    const cutStart = Math.max(cursor, interval.start);
    if (cursor < cutStart) result.push({ start: cursor, end: cutStart });
    cursor = Math.max(cursor, Math.min(end, interval.end));
  }
  if (cursor < end) result.push({ start: cursor, end });
  return result;
}

/**
 * Original scheduling exercise. The minute values are fictional constraints,
 * not a productivity score, empirical finding, or claim from Drucker's text.
 */
export function modelTimeUse(state: TimeUseState) {
  if (
    !state ||
    !["scattered", "batched"].includes(state.layout) ||
    ![60, 90, 120].includes(state.duration) ||
    ![dayStart, dayStart + 30, dayStart + 60].includes(state.readyAt)
  ) {
    throw new RangeError("仅接受实验列出的会议安排、任务时长与输入就绪时间。");
  }

  const meetings: Interval[] =
    state.layout === "scattered"
      ? [
          { start: dayStart + 30, end: dayStart + 60 },
          { start: dayStart + 120, end: dayStart + 150 },
        ]
      : [{ start: dayStart, end: dayStart + 60 }];
  const available = subtractIntervals(dayStart, windowEnd, meetings)
    .map((interval) => ({
      ...interval,
      start: Math.max(interval.start, state.readyAt),
    }))
    .filter((interval) => interval.start < interval.end);
  const longestMinutes = Math.max(
    0,
    ...available.map(({ start, end }) => end - start),
  );
  const totalMinutes = available.reduce(
    (sum, { start, end }) => sum + end - start,
    0,
  );
  const fit = available.find(
    ({ start, end }) => start < deadline && end - start >= state.duration,
  );
  const booking = fit
    ? { start: fit.start, end: fit.start + state.duration }
    : null;

  return {
    meetings,
    available,
    booking,
    longestMinutes,
    totalMinutes,
    status: booking
      ? `可在 ${clock(booking.start)}–${clock(booking.end)} 预留连续时段；这只证明排程可行，不代表工作已经完成。`
      : `无法排入连续 ${state.duration} 分钟：总空闲 ${totalMinutes} 分钟，最长连续空档 ${longestMinutes} 分钟。请协商范围、依赖或期限，而非把零碎分钟相加。`,
  };
}

export function reduceTimeUse(
  state: TimeUseState = initialState,
  action: TimeUseAction,
): TimeUseState {
  if (action.type === "reset") return { ...initialState };
  const next = { ...state, [action.type]: action.value };
  modelTimeUse(next);
  return next;
}

const selectClass =
  "mt-1 block min-h-11 w-full rounded-control border border-border bg-surface px-3 py-2 text-sm text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

export function EexTimeUseLab() {
  const [state, setState] = useState<TimeUseState>({ ...initialState });
  const model = useMemo(() => modelTimeUse(state), [state]);

  return (
    <section
      aria-labelledby="eex-time-use-lab-title"
      className="not-prose my-6 min-w-0 space-y-4 rounded-card border border-border p-4 text-primary"
    >
      <div>
        <h3 id="eex-time-use-lab-title" className="text-lg font-semibold">
          总空闲够用，连续时段也够吗？
        </h3>
        <p className="mt-1 text-sm text-secondary">
          自拟日程推演：09:00–12:00，会议占用共 60
          分钟。输入、期限与任务时长均为练习假设；排入日历不等于完成工作。
        </p>
      </div>

      <div className="grid min-w-0 gap-3 sm:grid-cols-3">
        <label className="min-w-0 text-sm">
          会议分布
          <select
            className={selectClass}
            value={state.layout}
            onChange={(event) =>
              setState(
                reduceTimeUse(state, {
                  type: "layout",
                  value: event.target.value as Layout,
                }),
              )
            }
          >
            <option value="scattered">09:30 与 11:00 分散</option>
            <option value="batched">09:00 集中开会</option>
          </select>
        </label>
        <label className="min-w-0 text-sm">
          所需连续工作时间
          <select
            className={selectClass}
            value={state.duration}
            onChange={(event) =>
              setState(
                reduceTimeUse(state, {
                  type: "duration",
                  value: Number(event.target.value) as TaskDuration,
                }),
              )
            }
          >
            <option value={60}>60 分钟</option>
            <option value={90}>90 分钟</option>
            <option value={120}>120 分钟</option>
          </select>
        </label>
        <label className="min-w-0 text-sm">
          输入就绪时间
          <select
            className={selectClass}
            value={state.readyAt}
            onChange={(event) =>
              setState(
                reduceTimeUse(state, {
                  type: "readyAt",
                  value: Number(event.target.value),
                }),
              )
            }
          >
            <option value={dayStart}>09:00</option>
            <option value={dayStart + 30}>09:30</option>
            <option value={dayStart + 60}>10:00</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto rounded-control border border-border p-3">
        <p className="mb-2 text-xs text-secondary">
          时间轴图例：浅色区块为可用时段，红色区块为会议，带边框高亮区块为符合条件的预留时段。
        </p>
        <div
          className="mb-2 flex justify-between text-xs text-secondary"
          aria-hidden="true"
        >
          <span>09:00</span>
          <span>10:00</span>
          <span>11:00</span>
          <span>12:00</span>
        </div>
        <div
          role="img"
          aria-label={`上午时间轴。会议 ${model.meetings.map(({ start, end }) => `${clock(start)} 到 ${clock(end)}`).join("；")}。可用连续区间 ${model.available.length ? model.available.map(({ start, end }) => `${clock(start)} 到 ${clock(end)}`).join("；") : "无"}。${model.booking ? `预留 ${clock(model.booking.start)} 到 ${clock(model.booking.end)}。` : "未能排入任务。"}`}
          className="relative h-16 min-w-[30rem] rounded-control bg-surface"
        >
          {model.available.map(({ start, end }, index) => (
            <div
              key={`free-${index}`}
              className="absolute inset-y-2 rounded-control border border-border bg-elevated"
              style={{
                left: `${((start - dayStart) / 180) * 100}%`,
                width: `${((end - start) / 180) * 100}%`,
              }}
              aria-hidden="true"
            />
          ))}
          {model.meetings.map(({ start, end }, index) => (
            <div
              key={`meeting-${index}`}
              className="absolute inset-y-2 flex items-center justify-center rounded-control border border-danger bg-danger/15 px-1 text-[11px] text-primary"
              style={{
                left: `${((start - dayStart) / 180) * 100}%`,
                width: `${((end - start) / 180) * 100}%`,
              }}
              aria-hidden="true"
            >
              会议
            </div>
          ))}
          {model.booking && (
            <div
              className="absolute inset-y-4 rounded-control border-2 border-accent bg-accent/20"
              style={{
                left: `${((model.booking.start - dayStart) / 180) * 100}%`,
                width: `${((model.booking.end - model.booking.start) / 180) * 100}%`,
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      <p
        aria-live="polite"
        aria-atomic="true"
        className="rounded-control bg-surface p-3 text-sm"
      >
        {model.status}
      </p>
      <p className="text-xs text-secondary">
        总空闲：{model.totalMinutes} 分钟；最长连续空档：{model.longestMinutes}{" "}
        分钟。
      </p>
      <button
        type="button"
        className="min-h-11 rounded-control border border-border px-4 py-2 text-sm text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={() => setState(reduceTimeUse(state, { type: "reset" }))}
      >
        重置实验
      </button>
    </section>
  );
}
