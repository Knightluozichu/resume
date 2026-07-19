"use client";

import { useMemo, useState } from "react";

export type PoeaaFamily =
  | "book"
  | "layering"
  | "domain"
  | "mapping"
  | "web"
  | "distribution"
  | "concurrency"
  | "session"
  | "base";

type Mode = "boundary" | "tradeoff" | "failure";
type Scenario = "baseline" | "edge" | "fault";

type Props = {
  unitId: string;
  title: string;
  family: PoeaaFamily;
  nodes: readonly string[];
  focuses: readonly string[];
  concepts: readonly string[];
  decision: string;
  healthy: string;
  failure: string;
  mode: Mode;
};

const familyConfig: Record<
  PoeaaFamily,
  {
    name: string;
    primary: string;
    secondary: string;
    outcome: string;
    primaryUnit: string;
    secondaryUnit: string;
    initialPrimary: number;
    initialSecondary: number;
    limit: number;
  }
> = {
  book: {
    name: "模式语言覆盖",
    primary: "已核对单元",
    secondary: "跨族依赖",
    outcome: "遗漏风险",
    primaryUnit: "个",
    secondaryUnit: "条",
    initialPrimary: 18,
    initialSecondary: 8,
    limit: 58,
  },
  layering: {
    name: "层与依赖",
    primary: "跨层调用",
    secondary: "部署节点",
    outcome: "边界泄漏",
    primaryUnit: "条",
    secondaryUnit: "个",
    initialPrimary: 6,
    initialSecondary: 3,
    limit: 54,
  },
  domain: {
    name: "领域逻辑组织",
    primary: "规则分支",
    secondary: "协作对象",
    outcome: "规则分散",
    primaryUnit: "个",
    secondaryUnit: "个",
    initialPrimary: 12,
    initialSecondary: 5,
    limit: 62,
  },
  mapping: {
    name: "对象关系映射",
    primary: "对象数量",
    secondary: "关联数量",
    outcome: "映射压力",
    primaryUnit: "个",
    secondaryUnit: "条",
    initialPrimary: 24,
    initialSecondary: 8,
    limit: 66,
  },
  web: {
    name: "Web 表示职责",
    primary: "请求动作",
    secondary: "视图变体",
    outcome: "控制耦合",
    primaryUnit: "个",
    secondaryUnit: "个",
    initialPrimary: 10,
    initialSecondary: 4,
    limit: 60,
  },
  distribution: {
    name: "远程边界",
    primary: "网络往返",
    secondary: "单次载荷",
    outcome: "远程成本",
    primaryUnit: "次",
    secondaryUnit: "KB",
    initialPrimary: 4,
    initialSecondary: 24,
    limit: 64,
  },
  concurrency: {
    name: "离线并发",
    primary: "冲突概率",
    secondary: "事务时长",
    outcome: "覆盖风险",
    primaryUnit: "%",
    secondaryUnit: "分钟",
    initialPrimary: 18,
    initialSecondary: 12,
    limit: 58,
  },
  session: {
    name: "会话状态位置",
    primary: "状态大小",
    secondary: "服务节点",
    outcome: "恢复成本",
    primaryUnit: "KB",
    secondaryUnit: "个",
    initialPrimary: 16,
    initialSecondary: 3,
    limit: 56,
  },
  base: {
    name: "基础协作构件",
    primary: "调用方数量",
    secondary: "实现变化率",
    outcome: "替换摩擦",
    primaryUnit: "个",
    secondaryUnit: "%",
    initialPrimary: 6,
    initialSecondary: 20,
    limit: 60,
  },
};

const modeNames: Record<Mode, string> = {
  boundary: "责任边界",
  tradeoff: "取舍曲线",
  failure: "失败诊断",
};

const scenarioNames: Record<Scenario, string> = {
  baseline: "基线",
  edge: "临界",
  fault: "故障",
};

function familyPressure(
  family: PoeaaFamily,
  primary: number,
  secondary: number,
) {
  switch (family) {
    case "book":
      return Math.max(0, 88 - primary * 2 + secondary * 1.8);
    case "layering":
      return primary * 5.2 + Math.abs(secondary - 3) * 8;
    case "domain":
      return primary * 2.6 + secondary * 4.4;
    case "mapping":
      return primary * 1.35 + secondary * 4.1;
    case "web":
      return primary * 3.1 + secondary * 5.2;
    case "distribution":
      return primary * 8.5 + secondary * 0.7;
    case "concurrency":
      return primary * 1.8 + secondary * 2.2;
    case "session":
      return primary * 2.1 + secondary * 8.5;
    case "base":
      return primary * 4.5 + secondary * 1.6;
  }
}

export function PoeaaDecisionLab({
  unitId,
  title,
  family,
  nodes,
  focuses,
  concepts,
  decision,
  healthy,
  failure,
  mode,
}: Props) {
  const config = familyConfig[family];
  const [primary, setPrimary] = useState(config.initialPrimary);
  const [secondary, setSecondary] = useState(config.initialSecondary);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [stage, setStage] = useState(0);
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const scenarioPenalty =
      scenario === "baseline" ? 0 : scenario === "edge" ? 14 : 34;
    const modePenalty = mode === "boundary" ? 0 : mode === "tradeoff" ? 6 : 12;
    const pressure = Math.min(
      100,
      Math.round(
        familyPressure(family, primary, secondary) +
          scenarioPenalty +
          modePenalty,
      ),
    );
    const accepted = scenario !== "fault" && pressure <= config.limit;
    const nextFocus = focuses[Math.min(stage, focuses.length - 1)] ?? title;
    return { pressure, accepted, nextFocus, trace: runs + 1 };
  }, [
    config.limit,
    family,
    focuses,
    mode,
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
      className="my-6 overflow-hidden rounded-lg border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title}${modeNames[mode]}实验`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
            {config.name} · {modeNames[mode]}
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

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(290px,0.85fr)]">
        <div className="border-b border-zinc-200 p-4 lg:border-b-0 lg:border-r dark:border-zinc-800">
          <p className="text-sm font-semibold">决策链</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-5">
            {nodes.map((node, index) => (
              <button
                key={`${node}-${index}`}
                type="button"
                onClick={() => setStage(index)}
                aria-pressed={index === stage}
                aria-label={`检查决策链第 ${index + 1} 步：${node}`}
                className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs leading-5 ${
                  index === stage
                    ? "border-blue-600 bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-50"
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
                className="mt-2 w-full accent-blue-600"
                type="range"
                min="1"
                max="60"
                value={primary}
                onChange={(event) => setPrimary(Number(event.target.value))}
              />
            </label>
            <label className="text-sm">
              {config.secondary}：{secondary}
              {config.secondaryUnit}
              <input
                className="mt-2 w-full accent-amber-600"
                type="range"
                min="1"
                max="60"
                value={secondary}
                onChange={(event) => setSecondary(Number(event.target.value))}
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="本页目录证据">
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
                onClick={() => setScenario(key)}
                aria-pressed={scenario === key}
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
            <p className="mt-2 text-sm">当前检查：{result.nextFocus}</p>
          </div>

          <div
            className={`mt-3 rounded border p-3 text-sm ${
              result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50"
            }`}
            role="status"
          >
            <strong>{result.accepted ? healthy : failure}</strong>
            <p className="mt-1">裁决：{decision}</p>
            <p className="mt-1 text-xs">证据轨迹 #{result.trace}</p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-700 px-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            运行并保存本页证据
          </button>
        </div>
      </div>
    </section>
  );
}
