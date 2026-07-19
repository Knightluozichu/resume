"use client";

import { useMemo, useState } from "react";

export type CoderMechanismFamily =
  | "book"
  | "os"
  | "network"
  | "hardware"
  | "data"
  | "java"
  | "web"
  | "engineering"
  | "language"
  | "growth";

type Scenario = "baseline" | "boundary" | "fault";

type Props = {
  unitId: string;
  title: string;
  family: CoderMechanismFamily;
  nodes: readonly string[];
  concepts: readonly string[];
  mechanism: string;
  success: string;
  failure: string;
};

const familyConfig: Record<
  CoderMechanismFamily,
  {
    name: string;
    primary: string;
    secondary: string;
    primaryUnit: string;
    secondaryUnit: string;
    initialPrimary: number;
    initialSecondary: number;
    limit: number;
    output: string;
  }
> = {
  book: {
    name: "全书依赖路线",
    primary: "已复核单元",
    secondary: "未闭合前置",
    primaryUnit: "页",
    secondaryUnit: "项",
    initialPrimary: 18,
    initialSecondary: 3,
    limit: 54,
    output: "路径断裂风险",
  },
  os: {
    name: "执行与资源状态机",
    primary: "并发执行单元",
    secondary: "共享资源",
    primaryUnit: "个",
    secondaryUnit: "项",
    initialPrimary: 8,
    initialSecondary: 3,
    limit: 64,
    output: "竞争与等待压力",
  },
  network: {
    name: "协议逐层交付",
    primary: "在途报文",
    secondary: "往返时延档位",
    primaryUnit: "个",
    secondaryUnit: "档",
    initialPrimary: 12,
    initialSecondary: 3,
    limit: 68,
    output: "重传与拥塞压力",
  },
  hardware: {
    name: "指令与数据通路",
    primary: "指令批量",
    secondary: "慢路径次数",
    primaryUnit: "条",
    secondaryUnit: "次",
    initialPrimary: 24,
    initialSecondary: 2,
    limit: 66,
    output: "流水线停顿压力",
  },
  data: {
    name: "状态持久化边界",
    primary: "并发事务",
    secondary: "跨边界写入",
    primaryUnit: "个",
    secondaryUnit: "次",
    initialPrimary: 10,
    initialSecondary: 2,
    limit: 64,
    output: "一致性与积压压力",
  },
  java: {
    name: "Java 运行时合同",
    primary: "对象或调用量",
    secondary: "间接层数",
    primaryUnit: "个",
    secondaryUnit: "层",
    initialPrimary: 16,
    initialSecondary: 3,
    limit: 68,
    output: "类型与装配压力",
  },
  web: {
    name: "Web 请求生命线",
    primary: "请求并发",
    secondary: "远程跳数",
    primaryUnit: "个",
    secondaryUnit: "跳",
    initialPrimary: 18,
    initialSecondary: 3,
    limit: 70,
    output: "端到端失败压力",
  },
  engineering: {
    name: "可审查变更流水线",
    primary: "变更文件",
    secondary: "未自动验证项",
    primaryUnit: "个",
    secondaryUnit: "项",
    initialPrimary: 9,
    initialSecondary: 2,
    limit: 58,
    output: "回归与交付压力",
  },
  language: {
    name: "语言执行语义",
    primary: "输入规模",
    secondary: "运行时边界",
    primaryUnit: "项",
    secondaryUnit: "层",
    initialPrimary: 20,
    initialSecondary: 2,
    limit: 66,
    output: "语义与调度压力",
  },
  growth: {
    name: "学习反馈闭环",
    primary: "本周实践",
    secondary: "未验证判断",
    primaryUnit: "次",
    secondaryUnit: "项",
    initialPrimary: 6,
    initialSecondary: 2,
    limit: 52,
    output: "行动与反馈缺口",
  },
};

const scenarioLabels: Record<Scenario, string> = {
  baseline: "基线",
  boundary: "边界",
  fault: "注入故障",
};

function pressureFor(
  family: CoderMechanismFamily,
  primary: number,
  secondary: number,
) {
  switch (family) {
    case "book":
      return Math.max(0, 78 - primary * 1.1 + secondary * 6);
    case "os":
      return primary * 2.7 + secondary * 8;
    case "network":
      return primary * 2.2 + secondary * 9;
    case "hardware":
      return primary * 1.25 + secondary * 12;
    case "data":
      return primary * 2.8 + secondary * 10;
    case "java":
      return primary * 1.8 + secondary * 9;
    case "web":
      return primary * 1.7 + secondary * 11;
    case "engineering":
      return primary * 2.6 + secondary * 12;
    case "language":
      return primary * 1.8 + secondary * 10;
    case "growth":
      return Math.max(0, 62 - primary * 4 + secondary * 12);
  }
}

export function CoderMechanismLab({
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
      scenario === "baseline" ? 0 : scenario === "boundary" ? 17 : 42;
    const pressure = Math.min(
      100,
      Math.round(pressureFor(family, primary, secondary) + scenarioPenalty),
    );
    const accepted = scenario !== "fault" && pressure <= config.limit;
    const confidence = Math.max(
      0,
      Math.round(100 - pressure * 0.72 + Math.min(runs, 4) * 3),
    );
    return {
      accepted,
      confidence,
      focus: nodes[Math.min(stage, nodes.length - 1)] ?? title,
      pressure,
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
      className="not-prose my-6 overflow-hidden rounded-lg border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
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

      <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(290px,0.92fr)]">
        <div className="border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          <p className="text-sm font-semibold">本页机制链</p>
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
                    ? "border-cyan-700 bg-cyan-50 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50"
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
                className="mt-1 h-11 w-full accent-cyan-700"
              />
            </label>
            <label className="text-sm">
              {config.secondary}：{secondary}
              {config.secondaryUnit}
              <input
                type="range"
                min="1"
                max="24"
                value={secondary}
                onChange={(event) => setSecondary(Number(event.target.value))}
                className="mt-1 h-11 w-full accent-amber-600"
              />
            </label>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {mechanism}
          </p>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="目录节点证据">
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
            {(Object.keys(scenarioLabels) as Scenario[]).map((key) => (
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
                {scenarioLabels[key]}
              </button>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
              <dt className="text-zinc-500">{config.output}</dt>
              <dd className="mt-1 text-xl font-semibold">{result.pressure}%</dd>
            </div>
            <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
              <dt className="text-zinc-500">证据可信度</dt>
              <dd className="mt-1 text-xl font-semibold">
                {result.confidence}%
              </dd>
            </div>
          </dl>

          <div
            role="status"
            className={`mt-3 rounded border p-3 text-sm ${
              result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50"
            }`}
          >
            <strong>{result.accepted ? "机制证据成立" : "机制证据拒绝"}</strong>
            <p className="mt-1 break-words">
              当前检查：{result.focus}；轨迹 #{result.trace}
            </p>
            <p className="mt-1 break-words">
              {result.accepted ? success : failure}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-cyan-800 px-3 text-sm font-semibold text-white hover:bg-cyan-900"
          >
            运行并保存轨迹
          </button>
        </div>
      </div>
    </section>
  );
}
