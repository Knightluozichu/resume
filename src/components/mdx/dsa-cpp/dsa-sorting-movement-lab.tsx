"use client";

import { useMemo, useState } from "react";
import { useTeachingTimeline } from "../anim/use-teaching-timeline";
import { TimelineControls } from "../anim/timeline-controls";

type Item = Readonly<{ key: number; id: number }>;
type Motion = Readonly<{ from: number; to: number }>;
type Frame = {
  source: (Item | null)[];
  target: (Item | null)[];
  motions: Motion[];
  active: number[];
  message: string;
  destination: string;
  comparisons: number;
  writes: number;
};
type Algorithm = "insertion" | "merge";

/** Bounded execution, not scenario lookup. IDs always mean original input positions. */
export function buildSortingTrace(
  keys: readonly number[],
  algorithm: Algorithm = "insertion",
  fault = false,
) {
  if (
    keys.length > 8 ||
    Array.from(keys).some(
      (key) => !Number.isInteger(key) || key < 0 || key > 9,
    ) ||
    (algorithm !== "insertion" && algorithm !== "merge")
  ) {
    throw new RangeError("模型仅接受 0–8 个 0–9 整数和 insertion/merge 算法");
  }
  const input = keys.map((key, id) => ({ key, id }));
  const a = [...input];
  const frames: Frame[] = [];
  let comparisons = 0;
  let writes = 0;
  function record(
    source: readonly (Item | null)[],
    target: readonly (Item | null)[],
    motions: Motion[],
    active: number[],
    message: string,
    destination = "操作后数组",
  ) {
    frames.push({
      source: [...source],
      target: [...target],
      motions,
      active,
      message,
      destination,
      comparisons,
      writes,
    });
  }
  record(
    a,
    a,
    [],
    [],
    "初始：数字是键，字母是原始身份；相同数字也不是同一条记录。",
  );
  if (algorithm === "insertion") {
    for (let p = 1; p < a.length; p++) {
      for (let j = p; j > 0; j--) {
        const before = [...a];
        comparisons++;
        const cross = fault
          ? a[j].key <= a[j - 1].key
          : a[j].key < a[j - 1].key;
        if (!cross) {
          record(
            before,
            a,
            [],
            [j - 1, j],
            `第 ${p} 轮：后者不越过前者；前缀插入结束。`,
          );
          break;
        }
        const equal = a[j].key === a[j - 1].key;
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        writes += 2;
        record(
          before,
          a,
          [
            { from: j, to: j - 1 },
            { from: j - 1, to: j },
          ],
          [j - 1, j],
          equal
            ? "错误 ≤ 允许等键越过：两条记录的先后顺序被颠倒。"
            : `第 ${p} 轮：较小记录左移，消去一个逆序对。`,
        );
      }
    }
  } else {
    function merge(lo: number, hi: number) {
      if (hi - lo < 2) return;
      const mid = Math.floor((lo + hi) / 2);
      merge(lo, mid);
      merge(mid, hi);
      const before = [...a];
      const buffer: (Item | null)[] = Array(a.length).fill(null);
      let left = lo;
      let right = mid;
      record(
        before,
        buffer,
        [],
        [],
        `合并 [${lo},${mid}) 与 [${mid},${hi})；下排是独立缓冲区。`,
        "合并缓冲区（空位不含记录）",
      );
      for (let out = lo; out < hi; out++) {
        const active = [left < mid ? left : -1, right < hi ? right : -1].filter(
          (i) => i >= 0,
        );
        let takeLeft: boolean;
        let equal = false;
        if (left === mid) takeLeft = false;
        else if (right === hi) takeLeft = true;
        else {
          comparisons++;
          equal = a[left].key === a[right].key;
          takeLeft = fault
            ? a[left].key < a[right].key
            : a[left].key <= a[right].key;
        }
        const from = takeLeft ? left++ : right++;
        buffer[out] = a[from];
        writes++;
        record(
          before,
          buffer,
          [{ from, to: out }],
          active,
          equal
            ? fault
              ? "错误规则：等键先取右段，右侧身份抢到了左侧之前。"
              : "等键先取左段，保留原来的先后顺序。"
            : `从${takeLeft ? "左" : "右"}段复制到缓冲区槽 ${out}。`,
          "合并缓冲区（非原数组）",
        );
      }
      for (let i = lo; i < hi; i++) a[i] = buffer[i]!;
      writes += hi - lo;
      record(
        buffer,
        a,
        Array.from({ length: hi - lo }, (_, i) => ({
          from: lo + i,
          to: lo + i,
        })),
        [],
        `缓冲区 [${lo},${hi}) 复制回数组；本次增加 ${hi - lo} 次槽位写入。`,
      );
    }
    merge(0, a.length);
  }
  const ordered = a.every((item, i) => i === 0 || a[i - 1].key <= item.key);
  const permutation =
    a.length === input.length &&
    new Set(a.map((item) => item.id)).size === input.length &&
    a.every((item) => input[item.id]?.key === item.key);
  const stable = a.every((item, i) =>
    a
      .slice(i + 1)
      .every((later) => item.key !== later.key || item.id < later.id),
  );
  record(a, a, [], [], "执行结束：分别验收键顺序、身份守恒与等键稳定性。");
  return {
    input,
    frames,
    output: [...a],
    ordered,
    permutation,
    stable,
    comparisons,
    writes,
  };
}

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const configurations: {
  label: string;
  keys: number[];
  algorithm: Algorithm;
  fault: boolean;
}[] = [
  {
    label: "插入 · 混合等键 · 正确",
    keys: [3, 1, 2, 1, 3, 2],
    algorithm: "insertion",
    fault: false,
  },
  {
    label: "插入 · 混合等键 · 错误 ≤",
    keys: [3, 1, 2, 1, 3, 2],
    algorithm: "insertion",
    fault: true,
  },
  {
    label: "归并 · 混合等键 · 正确",
    keys: [3, 1, 2, 1, 3, 2],
    algorithm: "merge",
    fault: false,
  },
  {
    label: "归并 · 混合等键 · 等键先右",
    keys: [3, 1, 2, 1, 3, 2],
    algorithm: "merge",
    fault: true,
  },
  {
    label: "插入 · 逆序 · 正确",
    keys: [6, 5, 4, 3, 2, 1],
    algorithm: "insertion",
    fault: false,
  },
  {
    label: "归并 · 全等 · 等键先右",
    keys: [2, 2, 2, 2, 2, 2],
    algorithm: "merge",
    fault: true,
  },
];

function Execution({
  config,
  reset,
}: {
  config: (typeof configurations)[number];
  reset: () => void;
}) {
  const trace = useMemo(
    () => buildSortingTrace(config.keys, config.algorithm, config.fault),
    [config],
  );
  const steps = useMemo(
    () => trace.frames.map((_, i) => ({ label: `操作 ${i}` })),
    [trace],
  );
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      trace.frames.forEach((_, i) => {
        tl.label(steps[i].label, i * 700);
        tl.add(clock, { value: i + 1, duration: 700, ease: "linear" }, i * 700);
      });
    },
  });
  const frame = trace.frames[timeline.currentStep] ?? trace.frames[0];
  const done = timeline.currentStep === trace.frames.length - 1;
  const x = (slot: number) => 22 + slot * 49;
  const name = (item: Item) =>
    `${item.key}${String.fromCharCode(65 + item.id)}`;
  const row = (items: (Item | null)[], top: number) =>
    items.map((item, i) => (
      <g key={i}>
        <rect
          x={x(i) - 16}
          y={top}
          width={40}
          height={93}
          rx={4}
          fill={C.bg}
          stroke={frame.active.includes(i) ? C.accent : C.border}
          strokeWidth={frame.active.includes(i) ? 2 : 1}
        />
        {item && (
          <>
            <rect
              x={x(i) - 9}
              y={top + 63 - item.key * 7}
              width={26}
              height={item.key * 7 + 3}
              fill={C.accent}
              opacity={0.25}
            />
            <text
              x={x(i) + 4}
              y={top + 22}
              textAnchor="middle"
              fontSize={18}
              fill={C.primary}
            >
              {name(item)}
            </text>
          </>
        )}
        <text
          x={x(i) + 4}
          y={top + 83}
          textAnchor="middle"
          fontSize={16}
          fill={C.secondary}
        >
          {i}
        </text>
      </g>
    ));
  return (
    <>
      <p className="text-sm text-secondary">
        原始身份 A–F 不变。柱高表示键；连线表示本步真实写入，槽位编号从 0 开始。
      </p>
      <svg
        viewBox="0 0 330 365"
        className="mx-auto block w-full max-w-[440px]"
        role="img"
        aria-label={`排序记录移动图，第 ${timeline.currentStep} 步：${frame.message}`}
      >
        <title>{`排序身份与移动：${frame.message}`}</title>
        <text x={6} y={24} fontSize={17} fill={C.primary}>
          操作前来源
        </text>
        {row(frame.source, 38)}
        {frame.motions.map((motion, i) => {
          const from = x(motion.from) + 4;
          const to = x(motion.to) + 4;
          return (
            <g
              key={i}
              stroke={config.fault ? C.danger : C.accent}
              fill="none"
              strokeWidth={2}
            >
              <path d={`M ${from} 134 L ${from} 144 L ${to} 191 L ${to} 206`} />
              <path d={`M ${to - 4} 200 L ${to} 206 L ${to + 4} 200`} />
            </g>
          );
        })}
        {row(frame.target, 212)}
        <text x={6} y={335} fontSize={17} fill={C.primary}>
          {frame.destination}
        </text>
        <text x={6} y={359} fontSize={16} fill={C.secondary}>
          比较 {frame.comparisons} 次 · 槽位写入 {frame.writes} 次
        </text>
      </svg>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="min-h-24 rounded border border-border p-3 text-sm text-primary"
      >
        <p>{frame.message}</p>
        {done && (
          <p>
            有序：{trace.ordered ? "是" : "否"}；身份守恒：
            {trace.permutation ? "是" : "否"}；稳定：
            {trace.stable ? "是" : "否"}。结果：
            {trace.output.map(name).join(" · ") || "空数组"}
          </p>
        )}
      </div>
      <div className="[&_ol]:hidden [&_p]:text-sm [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:text-sm [&_button>span]:hidden [&_button[aria-label=上一步]]:hidden [&_input]:min-h-11 [&_.flex]:flex-wrap">
        <TimelineControls
          timeline={timeline}
          caption="单步看一次比较/写入，拖动可回看；计数不含临时变量赋值。"
          reset={{ label: "重置", onClick: reset }}
        />
      </div>
    </>
  );
}

export function DsaSortingMovementLab() {
  const [selection, setSelection] = useState(0);
  const [generation, setGeneration] = useState(0);
  const reset = () => {
    setSelection(0);
    setGeneration(generation + 1);
  };
  return (
    <section
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3"
      aria-label="排序移动实验"
    >
      <h3 className="mb-3 text-base font-semibold text-primary">
        排序移动实验：顺序对了，身份也对吗？
      </h3>
      <label className="block text-sm text-primary">
        输入与规则（切换后从头执行）
        <select
          className="mt-2 mb-3 min-h-11 w-full min-w-0 rounded border border-border bg-bg px-2 text-sm"
          value={selection}
          onChange={(e) => setSelection(Number(e.target.value))}
        >
          {configurations.map((config, i) => (
            <option key={config.label} value={i}>
              {config.label}
            </option>
          ))}
        </select>
      </label>
      <Execution
        key={`${selection}-${generation}`}
        config={configurations[selection]}
        reset={reset}
      />
    </section>
  );
}
