"use client";

import { useMemo, useState } from "react";

export type DezeroLabFamily =
  | "book"
  | "graph"
  | "derivative"
  | "tensor"
  | "training"
  | "device"
  | "convolution"
  | "sequence";

type Scenario = "baseline" | "boundary" | "fault";

type Props = {
  unitId: string;
  title: string;
  family: DezeroLabFamily;
  nodes: readonly string[];
  concepts: readonly string[];
  mechanism: string;
  success: string;
  failure: string;
};

const familyConfig: Record<
  DezeroLabFamily,
  {
    name: string;
    primary: string;
    secondary: string;
    primaryUnit: string;
    secondaryUnit: string;
    initialPrimary: number;
    initialSecondary: number;
    limit: number;
    outcome: string;
  }
> = {
  book: {
    name: "60 步依赖地图",
    primary: "已验证步骤",
    secondary: "未闭合依赖",
    primaryUnit: "步",
    secondaryUnit: "条",
    initialPrimary: 18,
    initialSecondary: 4,
    limit: 48,
    outcome: "学习路径缺口",
  },
  graph: {
    name: "Define-by-Run 计算图",
    primary: "图中函数节点",
    secondary: "梯度汇合路径",
    primaryUnit: "个",
    secondaryUnit: "条",
    initialPrimary: 5,
    initialSecondary: 2,
    limit: 58,
    outcome: "图语义压力",
  },
  derivative: {
    name: "导数与高阶图",
    primary: "输入幅值",
    secondary: "微分阶数",
    primaryUnit: "",
    secondaryUnit: "阶",
    initialPrimary: 3,
    initialSecondary: 1,
    limit: 62,
    outcome: "梯度误差风险",
  },
  tensor: {
    name: "张量形状传播",
    primary: "主轴长度",
    secondary: "广播轴数",
    primaryUnit: "",
    secondaryUnit: "轴",
    initialPrimary: 8,
    initialSecondary: 1,
    limit: 60,
    outcome: "shape 还原压力",
  },
  training: {
    name: "训练闭环",
    primary: "批大小",
    secondary: "学习率档位",
    primaryUnit: "",
    secondaryUnit: "",
    initialPrimary: 16,
    initialSecondary: 2,
    limit: 64,
    outcome: "更新不稳定风险",
  },
  device: {
    name: "设备与运行模式",
    primary: "批大小",
    secondary: "跨设备边界",
    primaryUnit: "",
    secondaryUnit: "次",
    initialPrimary: 24,
    initialSecondary: 1,
    limit: 60,
    outcome: "状态/设备错配",
  },
  convolution: {
    name: "卷积空间变换",
    primary: "输入边长",
    secondary: "核边长",
    primaryUnit: "px",
    secondaryUnit: "px",
    initialPrimary: 28,
    initialSecondary: 3,
    limit: 66,
    outcome: "输出尺寸风险",
  },
  sequence: {
    name: "时间状态传播",
    primary: "序列长度",
    secondary: "隐藏状态宽度",
    primaryUnit: "步",
    secondaryUnit: "维",
    initialPrimary: 20,
    initialSecondary: 12,
    limit: 62,
    outcome: "长期依赖压力",
  },
};

const scenarioNames: Record<Scenario, string> = {
  baseline: "基线",
  boundary: "边界",
  fault: "注入故障",
};

function pressureFor(
  family: DezeroLabFamily,
  primary: number,
  secondary: number,
) {
  switch (family) {
    case "book":
      return Math.max(0, 84 - primary * 1.25 + secondary * 5);
    case "graph":
      return primary * 4.2 + secondary * 9;
    case "derivative":
      return Math.abs(primary - 4) * 5 + secondary * 16;
    case "tensor":
      return primary * 2.4 + secondary * 14;
    case "training":
      return Math.abs(primary - 24) * 1.5 + secondary * 13;
    case "device":
      return primary * 1.4 + secondary * 18;
    case "convolution": {
      const output = Math.floor((primary - secondary) / 2) + 1;
      return output <= 0 ? 100 : secondary * 10 + Math.abs(output - 13) * 2;
    }
    case "sequence":
      return primary * 1.7 + Math.max(0, 16 - secondary) * 2.2;
  }
}

export function DezeroStepLab({
  unitId,
  title,
  family,
  nodes,
  concepts,
  mechanism,
  success,
  failure,
}: Props) {
  const config = familyConfig[family];
  const [primary, setPrimary] = useState(config.initialPrimary);
  const [secondary, setSecondary] = useState(config.initialSecondary);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [stage, setStage] = useState(0);
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const scenarioPenalty =
      scenario === "baseline" ? 0 : scenario === "boundary" ? 16 : 38;
    const pressure = Math.min(
      100,
      Math.round(pressureFor(family, primary, secondary) + scenarioPenalty),
    );
    const accepted = scenario !== "fault" && pressure <= config.limit;
    return {
      pressure,
      accepted,
      focus: nodes[Math.min(stage, nodes.length - 1)] ?? title,
      trace: runs + 1,
    };
  }, [
    config.limit,
    family,
    nodes,
    primary,
    runs,
    scenario,
    secondary,
    stage,
    title,
  ]);

  const reset = () => {
    setPrimary(config.initialPrimary);
    setSecondary(config.initialSecondary);
    setScenario("baseline");
    setStage(0);
    setRuns(0);
  };

  return (
    <section
      aria-label={`${title}因果实验`}
      className="my-6 overflow-hidden rounded-lg border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
            {config.name} · 单变量因果检查
          </p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            {unitId}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-3 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
        >
          重置实验
        </button>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(290px,0.88fr)]">
        <div className="border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          <p className="text-sm font-semibold">本步数据流</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-5">
            {nodes.map((node, index) => (
              <button
                key={`${node}-${index}`}
                type="button"
                aria-label={`检查第 ${index + 1} 个节点：${node}`}
                aria-pressed={stage === index}
                onClick={() => setStage(index)}
                className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs leading-5 ${
                  stage === index
                    ? "border-violet-600 bg-violet-50 text-violet-950 dark:bg-violet-950 dark:text-violet-50"
                    : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                }`}
              >
                <span className="block font-semibold">{index + 1}</span>
                <span className="block break-words">{node}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              {config.primary}：{primary}
              {config.primaryUnit}
              <input
                type="range"
                min="1"
                max="60"
                value={primary}
                onChange={(event) => setPrimary(Number(event.target.value))}
                className="mt-2 w-full accent-violet-600"
              />
            </label>
            <label className="text-sm">
              {config.secondary}：{secondary}
              {config.secondaryUnit}
              <input
                type="range"
                min="1"
                max="32"
                value={secondary}
                onChange={(event) => setSecondary(Number(event.target.value))}
                className="mt-2 w-full accent-amber-600"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="目录证据">
            {concepts.slice(0, 10).map((concept) => (
              <span
                key={concept}
                className="rounded-full border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-2"
            role="group"
            aria-label="实验场景"
          >
            {(Object.keys(scenarioNames) as Scenario[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => setScenario(key)}
                className={`min-h-11 rounded border px-2 text-xs font-semibold ${
                  scenario === key
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {scenarioNames[key]}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded border border-zinc-200 p-3 dark:border-zinc-800">
            <p className="text-xs text-zinc-500">{config.outcome}</p>
            <p className="mt-1 text-3xl font-semibold">{result.pressure}%</p>
            <p className="mt-2 text-sm">当前追踪：{result.focus}</p>
          </div>

          <div
            role="status"
            className={`mt-3 rounded border p-3 text-sm ${
              result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50"
            }`}
          >
            <strong>{result.accepted ? success : failure}</strong>
            <p className="mt-1">机制：{mechanism}</p>
            <p className="mt-1 text-xs">证据轨迹 #{result.trace}</p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-violet-700 px-3 text-sm font-semibold text-white hover:bg-violet-800"
          >
            运行并保存本步证据
          </button>
        </div>
      </div>
    </section>
  );
}
