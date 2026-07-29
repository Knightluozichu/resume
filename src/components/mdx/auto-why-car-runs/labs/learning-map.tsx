"use client";

import { useState } from "react";

type DrivingQuestion = "run" | "turn" | "stop" | "stable";

type QuestionPath = {
  label: string;
  question: string;
  color: string;
  chapters: readonly string[];
  chain: readonly string[];
  conclusion: string;
};

const QUESTION_PATHS: Record<DrivingQuestion, QuestionPath> = {
  run: {
    label: "能跑",
    question: "动力怎样变成车身向前运动？",
    color: "#2563eb",
    chapters: ["整车", "发动机", "变速器", "传动", "轮胎", "电力驱动"],
    chain: ["动力源", "转速与扭矩转换", "驱动轮", "轮胎—路面纵向力"],
    conclusion:
      "发动机或电机只负责提供动力；动力经过传动链，并在轮胎接地点变成推进力，整车才会加速。",
  },
  turn: {
    label: "能转",
    question: "方向盘转动为什么会改变行驶方向？",
    color: "#7c3aed",
    chapters: ["悬架", "转向", "轮胎"],
    chain: ["驾驶员输入", "转向机与拉杆", "车轮转角", "轮胎—路面横向力"],
    conclusion:
      "方向盘本身不让车拐弯；它改变车轮姿态，最终由轮胎接地点产生横向力。",
  },
  stop: {
    label: "能停",
    question: "踏板力怎样变成车辆减速度？",
    color: "#dc2626",
    chapters: ["制动", "轮胎", "电气电子"],
    chain: ["制动请求", "液压或电控执行", "车轮制动力矩", "轮胎—路面纵向力"],
    conclusion:
      "制动器消耗车轮旋转能量，轮胎再把制动力传给路面；ABS 只能管理附着，不能创造附着。",
  },
  stable: {
    label: "能稳",
    question: "扰动出现时，汽车怎样保持可控？",
    color: "#059669",
    chapters: ["车身", "悬架", "电气电子", "设计制造"],
    chain: ["结构承载", "轮胎贴地", "传感器识别", "控制与测试闭环"],
    conclusion:
      "稳定不是某一个零件的属性，而是结构、底盘、电子控制和验证流程共同形成的系统结果。",
  },
};

const QUESTION_ORDER: readonly DrivingQuestion[] = [
  "run",
  "turn",
  "stop",
  "stable",
];

export function AutoLearningMapLab() {
  const [activeQuestion, setActiveQuestion] = useState<DrivingQuestion>("run");
  const active = QUESTION_PATHS[activeQuestion];

  return (
    <section
      aria-label="汽车系统学习地图实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">汽车系统学习地图</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            从四个驾驶问题追踪能量、力和信号
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            选择一个问题，观察它跨越哪些章节，以及执行结果最终在哪里产生。学习时先追链路，再记零件。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置学习地图实验"
          onClick={() => setActiveQuestion("run")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置地图
        </button>
      </header>

      <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="text-xs font-medium text-secondary">选择驾驶问题</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {QUESTION_ORDER.map((key) => {
              const item = QUESTION_PATHS[key];
              const selected = key === activeQuestion;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveQuestion(key)}
                  className={`min-h-11 rounded-control border px-3 py-3 text-left transition-colors ${
                    selected
                      ? "border-accent bg-bg text-primary"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  <span
                    className="mr-2 inline-block size-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-control border border-border bg-bg p-4">
            <p className="text-xs text-secondary">对应原书章节</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.chapters.map((chapter) => (
                <span
                  key={chapter}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-primary"
                >
                  {chapter}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div
            role="status"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-medium" style={{ color: active.color }}>
              当前问题 · {active.label}
            </p>
            <h3 className="mt-1 text-base font-semibold text-primary">
              {active.question}
            </h3>
          </div>

          <ol className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {active.chain.map((node, index) => (
              <li
                key={node}
                className="relative min-h-28 rounded-control border border-border bg-bg p-4"
              >
                <span
                  className="inline-flex size-7 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: active.color }}
                >
                  {index + 1}
                </span>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-primary">
                  {node}
                </p>
                {index < active.chain.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-lg font-bold sm:block"
                    style={{ color: active.color }}
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div
            className="mt-4 rounded-control border-l-4 bg-bg p-4"
            style={{ borderLeftColor: active.color }}
          >
            <p className="text-xs font-medium text-secondary">系统结论</p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {active.conclusion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
