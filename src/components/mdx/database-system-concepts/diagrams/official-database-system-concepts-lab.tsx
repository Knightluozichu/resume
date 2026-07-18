"use client";

import { useMemo, useState } from "react";

type Mode = "architecture" | "experiment" | "evidence";

type Props = {
  mode: Mode;
  unitTitle: string;
  part: string;
  medium: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: string[];
};

const architectureLayers = [
  {
    label: "语义层",
    detail: "业务不变量、关系模式与查询结果合同",
    color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    label: "计划层",
    detail: "代数重写、访问路径、算子与资源预算",
    color: "border-sky-500 bg-sky-50 dark:bg-sky-950/30",
  },
  {
    label: "状态层",
    detail: "页面、缓冲、锁、版本、日志、分区与副本",
    color: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
  },
  {
    label: "证据层",
    detail: "预期、执行轨迹、故障反例与独立对账",
    color: "border-rose-500 bg-rose-50 dark:bg-rose-950/30",
  },
] as const;

const scenarios = [
  {
    label: "正常路径",
    change: "固定输入与配置，完整执行一次操作",
    risk: "错误结果或未记录的隐式前提",
  },
  {
    label: "边界数据",
    change: "加入NULL、重复、空集、热点或极端基数",
    risk: "三值逻辑、基数估计或分区倾斜失效",
  },
  {
    label: "并发交错",
    change: "在关键读写之间暂停并插入第二个事务",
    risk: "丢失更新、幻读、写偏差或死锁",
  },
  {
    label: "故障恢复",
    change: "在状态与日志不同步的边界终止进程或节点",
    risk: "部分提交、重复副作用或副本决议分叉",
  },
] as const;

const evidenceGates = [
  "版本、配置与媒介边界",
  "大学模式与输入基线",
  "执行前预测和停止条件",
  "计划、状态或协议轨迹",
  "失败反例与恢复终点",
  "独立对账和回退脚本",
] as const;

export function OfficialDatabaseSystemConceptsLab({
  mode,
  unitTitle,
  part,
  medium,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scale, setScale] = useState(4);
  const [checked, setChecked] = useState<boolean[]>(() =>
    evidenceGates.map(() => false),
  );

  const selectedNode = nodes[nodeIndex] ?? unitTitle;
  const scenario = scenarios[scenarioIndex];
  const estimate = useMemo(() => {
    const rows = 10 ** scale;
    const pages = Math.max(1, Math.ceil(rows / 120));
    const randomReads = Math.max(1, Math.ceil(Math.log2(rows)));
    const distributedMessages =
      scenarioIndex < 2 ? Math.max(1, scale - 1) : Math.max(2, scale * 3);
    return { distributedMessages, pages, randomReads, rows };
  }, [scale, scenarioIndex]);
  const progress = checked.filter(Boolean).length;

  if (mode === "architecture") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {part} · {medium}
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {focus}
          </p>
        </header>

        <div className="grid min-h-80 lg:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.4fr)]">
          <div className="max-h-96 overflow-auto border-b border-zinc-200 p-3 lg:border-b-0 lg:border-r dark:border-zinc-800">
            <p className="mb-2 text-xs font-semibold text-zinc-500">
              正式目录节点 · {nodeIndex + 1}/{nodes.length}
            </p>
            {nodes.map((node, index) => (
              <button
                key={node}
                type="button"
                onClick={() => setNodeIndex(index)}
                className={
                  "mb-1 w-full rounded px-2 py-1.5 text-left text-xs transition-colors " +
                  (index === nodeIndex
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800")
                }
              >
                {node}
              </button>
            ))}
          </div>

          <div className="p-4">
            <p className="text-sm font-semibold">{selectedNode}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {architectureLayers.map((layer, index) => (
                <div
                  key={layer.label}
                  className={"min-h-24 border-l-4 p-3 " + layer.color}
                >
                  <p className="text-xs font-semibold">
                    {index + 1}. {layer.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-zinc-700 dark:text-zinc-300">
                    {layer.detail}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-zinc-200 pt-3 text-xs leading-5 dark:border-zinc-800">
              <span className="font-semibold">通过条件：</span>
              {invariant}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "experiment") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            预测与故障实验
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {scenarios.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setScenarioIndex(index)}
                className={
                  "min-h-10 rounded border px-2 py-2 text-xs font-medium " +
                  (index === scenarioIndex
                    ? "border-sky-600 bg-sky-600 text-white"
                    : "border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-900")
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <label
            className="mt-5 block text-xs font-semibold"
            htmlFor="dsc-scale"
          >
            数据规模：10^{scale} 行
          </label>
          <input
            id="dsc-scale"
            type="range"
            min={2}
            max={8}
            step={1}
            value={scale}
            onChange={(event) => setScale(Number(event.target.value))}
            className="mt-2 w-full accent-sky-600"
          />

          <div className="mt-4 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
            {[
              ["样例行数", estimate.rows.toLocaleString()],
              ["约合数据页", estimate.pages.toLocaleString()],
              ["树高参考", String(estimate.randomReads)],
              ["协调消息参考", String(estimate.distributedMessages)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-h-20 bg-white p-3 dark:bg-zinc-950"
              >
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="mt-2 text-lg font-semibold tabular-nums">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 text-xs leading-5 sm:grid-cols-2">
            <div className="border-l-4 border-sky-500 bg-sky-50 p-3 dark:bg-sky-950/30">
              <p className="font-semibold">本轮只改变</p>
              <p className="mt-1">{scenario.change}</p>
            </div>
            <div className="border-l-4 border-rose-500 bg-rose-50 p-3 dark:bg-rose-950/30">
              <p className="font-semibold">先预测的失效模式</p>
              <p className="mt-1">{scenario.risk}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
          独立交接证据门 · {progress}/{evidenceGates.length}
        </p>
        <h3 className="mt-1 text-base font-semibold">{artifact}</h3>
      </header>

      <div className="p-4">
        <div
          className="h-2 overflow-hidden bg-zinc-200 dark:bg-zinc-800"
          aria-label={"证据进度 " + progress + "/" + evidenceGates.length}
        >
          <div
            className="h-full bg-amber-500 transition-[width]"
            style={{ width: (progress / evidenceGates.length) * 100 + "%" }}
          />
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {evidenceGates.map((gate, index) => (
            <label
              key={gate}
              className={
                "flex min-h-12 cursor-pointer items-center gap-3 border px-3 py-2 text-xs " +
                (checked[index]
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                  : "border-zinc-200 dark:border-zinc-800")
              }
            >
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() =>
                  setChecked((current) =>
                    current.map((value, itemIndex) =>
                      itemIndex === index ? !value : value,
                    ),
                  )
                }
                className="size-4 accent-amber-600"
              />
              <span>{gate}</span>
            </label>
          ))}
        </div>

        <p className="mt-4 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
          {progress === evidenceGates.length
            ? "证据齐备：可由另一位学习者按同一基线复现并验收。"
            : "尚未交付：不能用口头说明或最终截图替代缺失证据。"}
        </p>
      </div>
    </section>
  );
}
