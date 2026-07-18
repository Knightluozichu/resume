"use client";

import { useId, useMemo, useState } from "react";

type Mode = "architecture" | "failure" | "evidence";

type Props = {
  mode: Mode;
  unitTitle: string;
  focus: string;
  invariant: string;
  artifact: string;
  nodes: string[];
};

const deploymentShapes = [
  { label: "单节点", replicas: 1, partitions: 1, coordination: 0 },
  { label: "主从复制", replicas: 3, partitions: 1, coordination: 1 },
  { label: "分片复制", replicas: 3, partitions: 8, coordination: 2 },
  { label: "派生数据流", replicas: 4, partitions: 16, coordination: 3 },
] as const;

const evidenceGates = [
  "版本、目录节点与适用边界",
  "输入、数据分布与不变量",
  "正常路径和状态转移轨迹",
  "延迟、吞吐与资源分位数",
  "超时、崩溃、分区与重试反例",
  "业务对账、恢复、回退与责任人",
] as const;

export function OfficialDdiaLab({
  mode,
  unitTitle,
  focus,
  invariant,
  artifact,
  nodes,
}: Props) {
  const id = useId();
  const [nodeIndex, setNodeIndex] = useState(0);
  const [shapeIndex, setShapeIndex] = useState(1);
  const [networkDelay, setNetworkDelay] = useState(40);
  const [replicaLag, setReplicaLag] = useState(120);
  const [writers, setWriters] = useState(4);
  const [partitioned, setPartitioned] = useState(false);
  const [linearizableRead, setLinearizableRead] = useState(false);
  const [checked, setChecked] = useState<boolean[]>(() =>
    evidenceGates.map(() => false),
  );

  const selectedNode = nodes[nodeIndex] ?? unitTitle;
  const shape = deploymentShapes[shapeIndex];
  const evidenceCount = checked.filter(Boolean).length;

  const model = useMemo(() => {
    const coordinationCost =
      shape.coordination * 18 + writers * 5 + (linearizableRead ? 42 : 0);
    const p99 = Math.round(
      8 + networkDelay * (1 + shape.coordination * 0.35) + coordinationCost,
    );
    const staleWindow = linearizableRead ? 0 : replicaLag + networkDelay * 2;
    const available = !partitioned || (!linearizableRead && shape.replicas > 1);
    const duplicateRisk =
      partitioned && writers > 1 ? "高" : writers > 4 ? "中" : "低";
    return { available, duplicateRisk, p99, staleWindow };
  }, [linearizableRead, networkDelay, partitioned, replicaLag, shape, writers]);

  if (mode === "architecture") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            数据流与责任边界
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {focus}
          </p>
        </header>

        <div className="grid min-h-80 lg:grid-cols-[minmax(14rem,0.82fr)_minmax(0,1.3fr)]">
          <div className="max-h-96 overflow-auto border-b border-zinc-200 p-3 lg:border-b-0 lg:border-r dark:border-zinc-800">
            <p className="mb-2 text-xs font-semibold text-zinc-500">
              正式目录节点 · {nodeIndex + 1}/{nodes.length}
            </p>
            {nodes.map((node, index) => (
              <button
                key={`${node}-${index}`}
                type="button"
                onClick={() => setNodeIndex(index)}
                className={
                  "mb-1 min-h-9 w-full rounded px-2 py-1.5 text-left text-xs transition-colors " +
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
            <p className="text-xs text-zinc-500">当前推演节点</p>
            <p className="mt-1 text-sm font-semibold">{selectedNode}</p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {deploymentShapes.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setShapeIndex(index)}
                  className={
                    "min-h-11 rounded border px-2 py-2 text-xs font-medium " +
                    (index === shapeIndex
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-zinc-300 dark:border-zinc-700")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
              {[
                ["副本", String(shape.replicas)],
                ["分区", String(shape.partitions)],
                ["协调层级", String(shape.coordination)],
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

            <div className="mt-5 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2 text-center text-xs font-semibold">
              <span className="border border-zinc-300 p-2 dark:border-zinc-700">
                请求
              </span>
              <span className="h-px bg-emerald-500" />
              <span className="border border-zinc-300 p-2 dark:border-zinc-700">
                权威状态
              </span>
              <span className="h-px bg-sky-500" />
              <span className="border border-zinc-300 p-2 dark:border-zinc-700">
                派生视图
              </span>
            </div>

            <p className="mt-4 border-l-4 border-emerald-500 bg-emerald-50 p-3 text-xs leading-5 dark:bg-emerald-950/30">
              <span className="font-semibold">验收不变量：</span>
              {invariant}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "failure") {
    return (
      <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">
            延迟、并发与部分故障推演
          </p>
          <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        </header>

        <div className="p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-xs font-semibold" htmlFor={id + "-delay"}>
              网络往返：{networkDelay} ms
              <input
                id={id + "-delay"}
                type="range"
                min={1}
                max={500}
                step={1}
                value={networkDelay}
                onChange={(event) =>
                  setNetworkDelay(Number(event.target.value))
                }
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-lag"}>
              副本滞后：{replicaLag} ms
              <input
                id={id + "-lag"}
                type="range"
                min={0}
                max={5000}
                step={10}
                value={replicaLag}
                onChange={(event) => setReplicaLag(Number(event.target.value))}
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
            <label className="text-xs font-semibold" htmlFor={id + "-writers"}>
              并发写者：{writers}
              <input
                id={id + "-writers"}
                type="range"
                min={1}
                max={32}
                step={1}
                value={writers}
                onChange={(event) => setWriters(Number(event.target.value))}
                className="mt-2 block w-full accent-sky-600"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <label className="flex min-h-11 items-center gap-3 rounded border border-zinc-300 px-3 text-xs font-medium dark:border-zinc-700">
              <input
                type="checkbox"
                checked={partitioned}
                onChange={(event) => setPartitioned(event.target.checked)}
                className="h-4 w-4 accent-rose-600"
              />
              注入网络分区
            </label>
            <label className="flex min-h-11 items-center gap-3 rounded border border-zinc-300 px-3 text-xs font-medium dark:border-zinc-700">
              <input
                type="checkbox"
                checked={linearizableRead}
                onChange={(event) => setLinearizableRead(event.target.checked)}
                className="h-4 w-4 accent-sky-600"
              />
              要求线性一致读取
            </label>
          </div>

          <div className="mt-5 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
            {[
              ["P99模型参考", `${model.p99} ms`],
              ["陈旧窗口上界", `${model.staleWindow} ms`],
              ["写入可用性", model.available ? "可继续" : "被阻断"],
              ["重复/冲突风险", model.duplicateRisk],
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
            这是用于先预测方向的教学模型，不是生产容量计算器。真实结论必须记录消息顺序、超时、重试、提交点和业务对账；看到节点在线不能证明数据语义正确。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
          可复核证据门
        </p>
        <h3 className="mt-1 text-base font-semibold">{unitTitle}</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {artifact}
        </p>
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.65fr)]">
        <div className="grid gap-2 sm:grid-cols-2">
          {evidenceGates.map((gate, index) => (
            <label
              key={gate}
              className="flex min-h-12 items-center gap-3 rounded border border-zinc-300 px-3 text-xs font-medium dark:border-zinc-700"
            >
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={(event) =>
                  setChecked((current) =>
                    current.map((value, itemIndex) =>
                      itemIndex === index ? event.target.checked : value,
                    ),
                  )
                }
                className="h-4 w-4 accent-amber-600"
              />
              {gate}
            </label>
          ))}
        </div>

        <div
          className={
            "rounded border p-4 " +
            (evidenceCount === evidenceGates.length
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30"
              : "border-amber-500 bg-amber-50 dark:bg-amber-950/30")
          }
          aria-live="polite"
        >
          <p className="text-xs font-semibold">证据进度</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums">
            {evidenceCount}/{evidenceGates.length}
          </p>
          <p className="mt-3 text-xs leading-5">
            {evidenceCount === evidenceGates.length
              ? "已具备交给另一位工程师复跑的最小材料。"
              : "缺失任何一类证据时，只能保留为假设，不能宣布机制、性能或恢复结论成立。"}
          </p>
        </div>
      </div>
    </section>
  );
}
