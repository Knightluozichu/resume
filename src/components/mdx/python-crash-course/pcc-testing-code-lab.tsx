"use client";

import { useId, useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;
const STEPS = [
  { label: "setup-first", caption: "测试 1 请求 fixture" },
  { label: "act-first", caption: "测试 1 执行操作" },
  { label: "assert-first", caption: "测试 1 比较断言" },
  { label: "setup-second", caption: "测试 2 请求 fixture" },
  { label: "act-second", caption: "测试 2 执行操作" },
  { label: "assert-second", caption: "测试 2 比较断言" },
] as const;
const LABEL_TEXT = Object.fromEntries(
  STEPS.map(({ label, caption }) => [label, caption]),
);
const buildTimeline: BuildTimeline = (timeline) => {
  const clock = { tick: 0 };
  STEPS.forEach(({ label }, index) => {
    timeline.label(label, index * 1800);
    timeline.add(
      clock,
      { tick: index + 1, duration: 1800, ease: "linear" },
      index * 1800,
    );
  });
};
const RESPONSES = ["Python", "Rust", "Go"];

/** An object snapshot, not a text card: cells encode the actual list elements. */
function SurveyObject({
  y,
  name,
  values,
  expired,
}: {
  y: number;
  name: string;
  values: string[];
  expired: boolean;
}) {
  return (
    <g>
      <rect
        x={40}
        y={y}
        width={270}
        height={112}
        rx={16}
        fill={C.bg}
        stroke={expired ? C.border : C.accent}
        strokeWidth={2}
        strokeDasharray={expired ? "6 4" : undefined}
      />
      <circle
        cx={62}
        cy={y + 26}
        r={13}
        fill="none"
        stroke={C.accent}
        strokeWidth={2}
      />
      <text x={62} y={y + 32} textAnchor="middle">
        {name}
      </text>
      <text x={84} y={y + 32}>
        Survey · responses
      </text>
      <path
        d={`M 53 ${y + 51} h -6 v 42 h 6 M 296 ${y + 51} h 6 v 42 h -6`}
        fill="none"
        stroke={C.secondary}
        strokeWidth={2}
      />
      {values.length === 0 ? (
        <text x={175} y={y + 78} textAnchor="middle" fill={C.secondary}>
          空列表 []
        </text>
      ) : (
        values.map((value, index) => (
          <g key={value}>
            <rect
              x={58 + index * 79}
              y={y + 52}
              width={73}
              height={39}
              rx={4}
              fill="none"
              stroke={C.accent}
              strokeWidth={2}
            />
            <text x={94.5 + index * 79} y={y + 77} textAnchor="middle">
              {value}
            </text>
          </g>
        ))
      )}
    </g>
  );
}

export function PccTestingCodeLab() {
  const [scope, setScope] = useState<"function" | "module">("function");
  const [sampleSize, setSampleSize] = useState(1);
  const [emptyFirst, setEmptyFirst] = useState(false);
  const timeline = useTeachingTimeline({ steps: STEPS, build: buildTimeline });
  const id = useId().replace(/:/g, "");
  const step = timeline.currentStep;
  const shared = scope === "module";
  const secondStarted = step >= 3;
  const responses = RESPONSES.slice(0, sampleSize);
  // Reconstruct every snapshot from inputs + step; scrubbing never appends twice.
  const aValues =
    (!emptyFirst && step >= 1) || (emptyFirst && shared && step >= 4)
      ? responses
      : [];
  const bValues = emptyFirst && step >= 4 ? responses : [];
  const actual = secondStarted ? (shared ? aValues : bValues) : aValues;
  const expected = (secondStarted ? emptyFirst : !emptyFirst) ? responses : [];
  const asserting = step === 2 || step === 5;
  const passes = JSON.stringify(actual) === JSON.stringify(expected);
  const firstName = emptyFirst ? "检查为空" : "保存回答";
  const secondName = emptyFirst ? "保存回答" : "检查为空";
  const explanation = [
    "fixture 首次被请求，调用 Survey(...) 创建 A，其 responses 是新的空列表。",
    emptyFirst
      ? "空列表测试不修改对象，直接读取 responses。"
      : `依次调用 store_response，A 的列表增加 ${sampleSize} 个元素。`,
    "比较实际列表和预期列表。第一项测试在两种作用域下都通过；这还不能证明隔离。",
    shared
      ? "module 作用域复用 A；第二条请求箭头也指向 A，不重新调用构造函数。"
      : "function 作用域结束第一次请求的缓存；第二次调用构造函数创建 B。虚线 A 仅保留历史快照，不表示立即回收内存。",
    emptyFirst
      ? `第二项测试保存 ${sampleSize} 个回答；观察它修改的是 A 还是 B。`
      : "第二项测试只读列表。共享 A 时，上一个测试留下的回答仍然存在。",
    !passes
      ? "模拟断言失败：预期 []，实际有回答。把作用域改回 function，然后单步复查。"
      : shared
        ? "模拟断言通过，但共享仍在。交换顺序会暴露污染；一次通过不等于测试独立。"
        : "模拟断言通过：两次请求得到独立的列表，改变执行顺序也不相互污染。",
  ][step];

  return (
    <section
      aria-label="pytest fixture 对象生命周期与测试隔离实验"
      className="not-prose my-8 min-w-0 max-w-full rounded-card border border-border bg-elevated p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:whitespace-normal [&_button]:break-words [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_select]:min-h-11 [&_select]:focus-visible:outline-2 [&_select]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent"
    >
      <h3 className="m-0 text-base font-semibold text-primary">
        两个测试，请求几份列表？
      </h3>
      <p className="mt-2 text-sm text-secondary">
        这是固定代码的 JavaScript 状态模拟，不在浏览器中运行 Python 或
        pytest。圆圈 A/B 是示意身份，不是内存地址。
      </p>
      <div className="my-4 grid min-w-0 gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm text-primary">
          fixture 作用域
          <select
            value={scope}
            onChange={(event) => {
              timeline.pause();
              setScope(event.target.value as "function" | "module");
            }}
            className="w-full min-w-0 rounded-control border border-border bg-[var(--bg)] px-2"
          >
            <option value="function">function：各自创建</option>
            <option value="module">module：共享（错误模式）</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm text-primary">
          回答样本
          <select
            value={sampleSize}
            onChange={(event) => {
              timeline.pause();
              setSampleSize(Number(event.target.value));
            }}
            className="w-full min-w-0 rounded-control border border-border bg-[var(--bg)] px-2"
          >
            <option value={1}>1 项：Python</option>
            <option value={2}>2 项：Python、Rust</option>
            <option value={3}>3 项：Python、Rust、Go</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm text-primary">
          指定执行顺序
          <select
            value={emptyFirst ? "empty" : "store"}
            onChange={(event) => {
              timeline.pause();
              setEmptyFirst(event.target.value === "empty");
            }}
            className="w-full min-w-0 rounded-control border border-border bg-[var(--bg)] px-2"
          >
            <option value="store">先保存，再检查为空</option>
            <option value="empty">先检查为空，再保存</option>
          </select>
        </label>
      </div>
      <svg
        viewBox="0 0 360 470"
        role="img"
        aria-label={`第 ${step + 1} 步。${scope} 作用域。测试 1 ${firstName}请求 A；${secondStarted ? `测试 2 ${secondName}请求${shared ? "同一个 A" : "新对象 B"}` : "测试 2 尚未请求对象"}。A 有 ${aValues.length} 项。${!shared && secondStarted ? `B 有 ${bValues.length} 项。` : ""}`}
        className="mx-auto block h-auto w-full max-w-[420px]"
        fontSize={16}
        fill={C.primary}
      >
        <defs>
          <marker
            id={`fixture-arrow-${id}`}
            markerWidth={8}
            markerHeight={8}
            refX={7}
            refY={4}
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 Z" fill={C.accent} />
          </marker>
        </defs>
        <text x={84} y={24} textAnchor="middle">
          测试 1 · {firstName}
        </text>
        <text x={266} y={24} textAnchor="middle">
          测试 2 · {secondName}
        </text>
        <circle
          cx={84}
          cy={62}
          r={22}
          fill="none"
          stroke={C.accent}
          strokeWidth={3}
        />
        <text x={84} y={68} textAnchor="middle">
          1
        </text>
        <circle
          cx={266}
          cy={62}
          r={22}
          fill="none"
          stroke={
            step === 5 && !passes
              ? C.danger
              : secondStarted
                ? C.accent
                : C.border
          }
          strokeWidth={3}
          strokeDasharray={secondStarted ? undefined : "4 4"}
        />
        <text x={266} y={68} textAnchor="middle">
          2
        </text>
        {step === 5 && !passes && (
          <path
            d="M 299 54 L 313 68 M 313 54 L 299 68"
            fill="none"
            stroke={C.danger}
            strokeWidth={3}
          />
        )}
        <path
          d="M 84 84 L 84 145"
          fill="none"
          stroke={C.accent}
          strokeWidth={3}
          markerEnd={`url(#fixture-arrow-${id})`}
        />
        {secondStarted && (
          <path
            d={
              shared
                ? "M 266 84 Q 266 122 168 145"
                : "M 266 84 Q 338 100 338 278 Q 338 305 270 323"
            }
            fill="none"
            stroke={C.accent}
            strokeWidth={3}
            markerEnd={`url(#fixture-arrow-${id})`}
          />
        )}
        <text x={112} y={118} fill={C.secondary}>
          请求 survey
        </text>
        <SurveyObject
          y={150}
          name="A"
          values={aValues}
          expired={!shared && secondStarted}
        />
        <text x={175} y={291} textAnchor="middle" fill={C.secondary}>
          {!secondStarted
            ? "第二次请求尚未发生"
            : shared
              ? "两条引用汇合：复用 A"
              : "A 的 fixture 作用域已结束"}
        </text>
        {!shared && secondStarted ? (
          <SurveyObject y={328} name="B" values={bValues} expired={false} />
        ) : (
          <g>
            <path
              d="M 60 328 H 290 V 437 H 60 Z"
              fill="none"
              stroke={C.border}
              strokeWidth={2}
              strokeDasharray="6 5"
            />
            <text x={175} y={380} textAnchor="middle" fill={C.secondary}>
              {shared ? "不会创建 B" : "B 等待第二次请求"}
            </text>
            <text x={175} y={409} textAnchor="middle" fill={C.secondary}>
              {shared ? "缓存同一个返回对象" : "尚无第二份列表"}
            </text>
          </g>
        )}
        <text x={175} y={462} textAnchor="middle">
          列表格子数 = 已保存的回答数
        </text>
      </svg>
      <div
        className="mt-3 rounded-control border border-border p-3 text-sm text-primary"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="m-0 font-semibold">
          当前：{STEPS[step].caption} ·{" "}
          {asserting ? (passes ? "模拟通过" : "模拟失败") : "尚未比较断言"}
        </p>
        <dl className="my-2 grid gap-1">
          <div>
            <dt className="inline">实际列表：</dt>
            <dd className="m-0 inline break-words font-mono">
              {JSON.stringify(actual)}
            </dd>
          </div>
          <div>
            <dt className="inline">预期列表：</dt>
            <dd className="m-0 inline break-words font-mono">
              {JSON.stringify(expected)}
            </dd>
          </div>
        </dl>
        <p
          className="m-0"
          style={{ color: asserting && !passes ? C.danger : C.secondary }}
        >
          {explanation}
        </p>
      </div>
      <TimelineControls
        timeline={timeline}
        labelText={LABEL_TEXT}
        caption="先预测共享后的列表，再用下一步验证。Tab 聚焦控件，方向键调整选项或进度；改变参数会暂停，并重算当前快照。"
        reset={{
          label: "重置实验",
          onClick: () => {
            timeline.goToStep(0);
            setScope("function");
            setSampleSize(1);
            setEmptyFirst(false);
          },
        }}
      />
    </section>
  );
}
