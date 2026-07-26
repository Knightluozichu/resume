"use client";

import { useId, useMemo, useState } from "react";

type Mode = "slo" | "capacity" | "evidence";

type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: string[];
};

const windows = [
  { label: "1天", minutes: 24 * 60 },
  { label: "7天", minutes: 7 * 24 * 60 },
  { label: "30天", minutes: 30 * 24 * 60 },
] as const;

const failureModes = [
  {
    label: "稳定负载",
    queueFactor: 1,
    note: "固定查询、均匀请求和已预热缓存",
  },
  {
    label: "流量尖峰",
    queueFactor: 2.4,
    note: "到达率短时高于处理率，观察排队和错误预算",
  },
  {
    label: "热点锁",
    queueFactor: 3.1,
    note: "事务集中更新同一索引范围，观察锁等待尾部",
  },
  {
    label: "存储抖动",
    queueFactor: 4.2,
    note: "云盘或闪存回收产生I/O尾延迟，观察脏页和日志",
  },
] as const;

const gates = [
  "SLO、窗口与流量分母",
  "MySQL补丁版本和配置来源",
  "Schema、数据量与分布",
  "负载、计划、等待与资源",
  "故障注入、RPO与RTO",
  "业务对账、回退和责任人",
] as const;

export function OfficialHighPerformanceMysqlLab({
  mode,
  unitTitle,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const id = useId();
  const [nodeIndex, setNodeIndex] = useState(0);
  const [targetBasisPoints, setTargetBasisPoints] = useState(9990);
  const [windowIndex, setWindowIndex] = useState(2);
  const [concurrency, setConcurrency] = useState(64);
  const [rowExponent, setRowExponent] = useState(6);
  const [hitRate, setHitRate] = useState(96);
  const [failureIndex, setFailureIndex] = useState(0);
  const [checked, setChecked] = useState<boolean[]>(() =>
    gates.map(() => false),
  );
  function resetExperiment() {
    setNodeIndex(0);
    setTargetBasisPoints(9990);
    setWindowIndex(2);
    setConcurrency(64);
    setRowExponent(6);
    setHitRate(96);
    setFailureIndex(0);
    setChecked(() =>
    gates.map(() => false));
  }


  const target = targetBasisPoints / 100;
  const selectedWindow = windows[windowIndex];
  const allowedMinutes =
    selectedWindow.minutes * (1 - targetBasisPoints / 10000);
  const selectedNode = nodes[nodeIndex] ?? unitTitle;
  const evidenceProgress = checked.filter(Boolean).length;

  const capacity = useMemo(() => {
    const rows = 10 ** rowExponent;
    const misses = Math.max(1, Math.round(1000 * (1 - hitRate / 100)));
    const workingSetGb = Math.max(0.1, (rows * 320) / 1024 ** 3);
    const ioPerSecond = Math.round(
      misses * (concurrency / 32) * failureModes[failureIndex].queueFactor,
    );
    const p99Ms = Math.round(
      6 +
        (concurrency / 24) ** 1.45 * failureModes[failureIndex].queueFactor +
        misses / 4,
    );
    return { ioPerSecond, misses, p99Ms, rows, workingSetGb };
  }, [concurrency, failureIndex, hitRate, rowExponent]);

  if (mode === "slo") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            服务目标与目录节点
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {focus}
          </p>
        </header>

        <div className="grid min-h-80 lg:grid-cols-[minmax(14rem,0.8fr)_minmax(0,1.4fr)]">
          <div className="max-h-96 overflow-auto border-b border-zinc-200 p-3 lg:border-b-0 lg:border-r dark:border-zinc-800">
            <p className="mb-2 text-xs font-semibold text-zinc-500">
              正式节点 · {nodeIndex + 1}/{nodes.length}
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
            <div className="mt-4 grid grid-cols-3 gap-2">
              {windows.map((window, index) => (
                <button
                  key={window.label}
                  type="button"
                  onClick={() => setWindowIndex(index)}
                  className={
                    "min-h-11 rounded border px-2 text-xs font-medium " +
                    (windowIndex === index
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-zinc-300 dark:border-zinc-700")
                  }
                >
                  {window.label}
                </button>
              ))}
            </div>

            <label
              htmlFor={id + "-slo"}
              className="mt-5 block text-xs font-semibold"
            >
              可用性目标：{target.toFixed(2)}%
            </label>
            <input
              id={id + "-slo"}
              type="range"
              min={9900}
              max={9999}
              step={1}
              value={targetBasisPoints}
              onChange={(event) =>
                setTargetBasisPoints(Number(event.target.value))
              }
              className="mt-2 w-full accent-emerald-600"
            />

            <div className="mt-4 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
              <div className="min-h-20 bg-white p-3 dark:bg-zinc-950">
                <p className="text-xs text-zinc-500">统计窗口</p>
                <p className="mt-2 text-lg font-semibold">
                  {selectedWindow.label}
                </p>
              </div>
              <div className="min-h-20 bg-white p-3 dark:bg-zinc-950">
                <p className="text-xs text-zinc-500">允许错误分钟</p>
                <p className="mt-2 text-lg font-semibold tabular-nums">
                  {allowedMinutes.toFixed(1)}
                </p>
              </div>
              <div className="min-h-20 bg-white p-3 dark:bg-zinc-950">
                <p className="text-xs text-zinc-500">剩余前提</p>
                <p className="mt-2 text-xs font-semibold">流量分母与错误定义</p>
              </div>
            </div>

            <p className="mt-4 border-l-4 border-emerald-500 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/30">
              <span className="font-semibold">章节验收：</span>
              {invariant}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "capacity") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            容量、缓存与尾延迟模型
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>

        <div className="p-4">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {failureModes.map((failure, index) => (
              <button
                key={failure.label}
                type="button"
                onClick={() => setFailureIndex(index)}
                className={
                  "min-h-11 rounded border px-2 py-2 text-xs font-medium " +
                  (failureIndex === index
                    ? "border-sky-600 bg-sky-600 text-white"
                    : "border-zinc-300 dark:border-zinc-700")
                }
              >
                {failure.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label
              className="text-xs font-semibold"
              htmlFor={id + "-concurrency"}
            >
              并发：{concurrency}
              <input
                id={id + "-concurrency"}
                type="range"
                min={8}
                max={512}
                step={8}
                value={concurrency}
                onChange={(event) => setConcurrency(Number(event.target.value))}
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-rows"}>
              数据量：10^{rowExponent} 行
              <input
                id={id + "-rows"}
                type="range"
                min={3}
                max={9}
                step={1}
                value={rowExponent}
                onChange={(event) => setRowExponent(Number(event.target.value))}
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-hit"}>
              缓冲命中：{hitRate}%
              <input
                id={id + "-hit"}
                type="range"
                min={70}
                max={100}
                step={1}
                value={hitRate}
                onChange={(event) => setHitRate(Number(event.target.value))}
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
            {[
              ["工作集参考", capacity.workingSetGb.toFixed(1) + " GiB"],
              ["每千次缓存未命中", String(capacity.misses)],
              ["I/O压力参考", capacity.ioPerSecond.toLocaleString() + "/s"],
              ["P99模型参考", capacity.p99Ms + " ms"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-h-20 bg-white p-3 dark:bg-zinc-950"
              >
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="mt-2 text-base font-semibold tabular-nums">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
            本轮变化：{failureModes[failureIndex].note}
            。数值用于比较趋势，生产结论必须由真实负载、计划、等待与业务对账验证。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
          生产证据门 · {evidenceProgress}/{gates.length}
        </p>
        <h3 className="mt-1 text-base font-semibold">{artifact}</h3>
      </header>

      <div className="p-4">
        <div
          className="h-2 overflow-hidden bg-zinc-200 dark:bg-zinc-800"
          aria-label={"证据进度 " + evidenceProgress + "/" + gates.length}
        >
          <div
            className="h-full bg-amber-500 transition-[width]"
            style={{ width: (evidenceProgress / gates.length) * 100 + "%" }}
          />
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {gates.map((gate, index) => (
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
          {evidenceProgress === gates.length
            ? "证据齐备：可由独立工程师按同一负载复现、故障注入并回退。"
            : "尚未交付：缺失项不能由最终截图、口头说明或供应商默认承诺替代。"}
        </p>
      </div>
    </section>
  );
}
