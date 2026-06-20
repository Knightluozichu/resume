"use client";

import { useMemo, useState } from "react";

import { easeInOut } from "../gamemath/animotor";

type AndroidDesignMode =
  | "team-map"
  | "architecture"
  | "lifecycle"
  | "mvp"
  | "patterns"
  | "error-handling"
  | "testing"
  | "refactoring"
  | "aac"
  | "kotlin"
  | "team-review";

type Props = {
  mode: AndroidDesignMode;
  title?: string;
  story?: string;
};

const MODE_LABELS: Record<AndroidDesignMode, string> = {
  "team-map": "团队设计地图",
  architecture: "分层架构",
  lifecycle: "画面状态",
  mvp: "MVP 分工",
  patterns: "设计模式拓扑",
  "error-handling": "异常与结果流",
  testing: "测试接缝",
  refactoring: "重构路径",
  aac: "AAC 响应链",
  kotlin: "Kotlin 协作",
  "team-review": "团队审查地图",
};

const STORIES: Record<AndroidDesignMode, string[]> = {
  "team-map": ["需求卡片", "边界讨论", "接口约定", "团队同步"],
  architecture: [
    "UI 收事件",
    "Presenter 判断",
    "Repository 取数",
    "Model 回写",
  ],
  lifecycle: ["打开画面", "旋转/后台", "恢复状态", "释放资源"],
  mvp: ["View 只显示", "Presenter 编排", "UseCase 执行", "Model 保存"],
  patterns: ["问题重复", "抽出角色", "替换实现", "稳定协作"],
  "error-handling": ["失败发生", "转成 Result", "UI 展示恢复", "记录原因"],
  testing: ["切开依赖", "放入替身", "驱动场景", "验证交互"],
  refactoring: ["识别坏味道", "加保护测试", "移动责任", "删除重复"],
  aac: ["事件进入", "ViewModel 保状态", "LiveData 推送", "UI 渲染"],
  kotlin: ["数据建模", "空安全", "扩展函数", "协作约定"],
  "team-review": ["拉请求", "看边界", "跑测试", "留下决策"],
};

const NODE_SETS: Record<
  AndroidDesignMode,
  Array<{ label: string; x: number; y: number; tone: string }>
> = {
  "team-map": [
    { label: "PM", x: 90, y: 92, tone: "#f97316" },
    { label: "Android", x: 225, y: 60, tone: "#14b8a6" },
    { label: "Design", x: 225, y: 138, tone: "#6366f1" },
    { label: "API", x: 370, y: 60, tone: "#0ea5e9" },
    { label: "QA", x: 370, y: 138, tone: "#ef4444" },
    { label: "Release", x: 520, y: 100, tone: "#22c55e" },
  ],
  architecture: [
    { label: "Activity", x: 100, y: 74, tone: "#f97316" },
    { label: "View", x: 225, y: 74, tone: "#14b8a6" },
    { label: "Presenter", x: 345, y: 74, tone: "#6366f1" },
    { label: "UseCase", x: 465, y: 74, tone: "#0ea5e9" },
    { label: "Repository", x: 345, y: 168, tone: "#22c55e" },
    { label: "DataSource", x: 465, y: 168, tone: "#64748b" },
  ],
  lifecycle: [
    { label: "Created", x: 100, y: 92, tone: "#14b8a6" },
    { label: "Started", x: 230, y: 62, tone: "#22c55e" },
    { label: "Resumed", x: 365, y: 92, tone: "#f97316" },
    { label: "Paused", x: 365, y: 170, tone: "#6366f1" },
    { label: "Stopped", x: 230, y: 200, tone: "#64748b" },
    { label: "Destroyed", x: 100, y: 170, tone: "#ef4444" },
  ],
  mvp: [
    { label: "View", x: 130, y: 75, tone: "#14b8a6" },
    { label: "Presenter", x: 320, y: 75, tone: "#6366f1" },
    { label: "Model", x: 510, y: 75, tone: "#f97316" },
    { label: "State", x: 130, y: 175, tone: "#22c55e" },
    { label: "Command", x: 320, y: 175, tone: "#0ea5e9" },
    { label: "Result", x: 510, y: 175, tone: "#64748b" },
  ],
  patterns: [
    { label: "Factory", x: 110, y: 74, tone: "#f97316" },
    { label: "Strategy", x: 280, y: 54, tone: "#14b8a6" },
    { label: "Observer", x: 450, y: 74, tone: "#6366f1" },
    { label: "Adapter", x: 160, y: 178, tone: "#0ea5e9" },
    { label: "Facade", x: 380, y: 178, tone: "#22c55e" },
  ],
  "error-handling": [
    { label: "API Fail", x: 90, y: 82, tone: "#ef4444" },
    { label: "Exception", x: 230, y: 82, tone: "#f97316" },
    { label: "Result", x: 370, y: 82, tone: "#14b8a6" },
    { label: "Message", x: 510, y: 82, tone: "#6366f1" },
    { label: "Retry", x: 370, y: 178, tone: "#22c55e" },
    { label: "Log", x: 510, y: 178, tone: "#64748b" },
  ],
  testing: [
    { label: "Spec", x: 95, y: 82, tone: "#6366f1" },
    { label: "Presenter", x: 250, y: 82, tone: "#14b8a6" },
    { label: "Fake Repo", x: 410, y: 82, tone: "#f97316" },
    { label: "View Spy", x: 250, y: 180, tone: "#0ea5e9" },
    { label: "Assert", x: 410, y: 180, tone: "#22c55e" },
  ],
  refactoring: [
    { label: "Fat Activity", x: 92, y: 90, tone: "#ef4444" },
    { label: "Extract", x: 220, y: 55, tone: "#f97316" },
    { label: "Presenter", x: 355, y: 90, tone: "#14b8a6" },
    { label: "UseCase", x: 490, y: 55, tone: "#6366f1" },
    { label: "Clean View", x: 490, y: 170, tone: "#22c55e" },
  ],
  aac: [
    { label: "Fragment", x: 100, y: 75, tone: "#14b8a6" },
    { label: "ViewModel", x: 250, y: 75, tone: "#6366f1" },
    { label: "LiveData", x: 400, y: 75, tone: "#f97316" },
    { label: "Room", x: 250, y: 178, tone: "#0ea5e9" },
    { label: "Worker", x: 400, y: 178, tone: "#22c55e" },
  ],
  kotlin: [
    { label: "data class", x: 110, y: 72, tone: "#6366f1" },
    { label: "sealed", x: 270, y: 72, tone: "#f97316" },
    { label: "extension", x: 430, y: 72, tone: "#14b8a6" },
    { label: "null safe", x: 190, y: 178, tone: "#0ea5e9" },
    { label: "coroutine", x: 360, y: 178, tone: "#22c55e" },
  ],
  "team-review": [
    { label: "PR", x: 95, y: 92, tone: "#6366f1" },
    { label: "ADR", x: 225, y: 55, tone: "#f97316" },
    { label: "Tests", x: 365, y: 55, tone: "#14b8a6" },
    { label: "Docs", x: 500, y: 92, tone: "#0ea5e9" },
    { label: "Retro", x: 365, y: 178, tone: "#22c55e" },
    { label: "Rules", x: 225, y: 178, tone: "#64748b" },
  ],
};

const LINKS: Partial<
  Record<AndroidDesignMode, Array<[number, number, string?]>>
> = {
  lifecycle: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 1, "return"],
  ],
  mvp: [
    [0, 1, "event"],
    [1, 2, "query"],
    [2, 5, "data"],
    [1, 4, "command"],
    [4, 0, "render"],
  ],
};

function modeStory(mode: AndroidDesignMode, step: number) {
  return STORIES[mode][step - 1];
}

function edgePairs(
  mode: AndroidDesignMode,
  count: number,
): Array<[number, number, string?]> {
  return (
    LINKS[mode] ??
    Array.from({ length: count - 1 }, (_, index) => [index, index + 1])
  );
}

function cardWidth(label: string) {
  return Math.max(82, Math.min(118, label.length * 10 + 38));
}

export function AndroidDesignLab({ mode, title, story }: Props) {
  const [step, setStep] = useState(1);
  const [pressure, setPressure] = useState(45);
  const [handoff, setHandoff] = useState(55);
  const nodes = NODE_SETS[mode];
  const progress = easeInOut(step / 4);
  const activeIndex = Math.min(
    nodes.length - 1,
    Math.round(progress * (nodes.length - 1)),
  );
  const edges = useMemo(
    () => edgePairs(mode, nodes.length),
    [mode, nodes.length],
  );
  const label = title ?? MODE_LABELS[mode];
  const storyText = story ?? modeStory(mode, step);

  return (
    <section className="not-prose my-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1fr_286px]">
        <div className="border-b border-slate-200 bg-slate-50 p-4 lg:border-r lg:border-b-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Android design lab
              </p>
              <h3 className="text-lg font-semibold text-slate-950">{label}</h3>
            </div>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
              {storyText}
            </span>
          </div>

          <svg
            viewBox="0 0 640 320"
            role="img"
            aria-label={`${label} 可视化`}
            className="h-auto w-full"
          >
            <rect x="0" y="0" width="640" height="320" rx="18" fill="#f8fafc" />
            <rect
              x="42"
              y="248"
              width="556"
              height="34"
              rx="17"
              fill="#e2e8f0"
            />
            <rect
              x="42"
              y="248"
              width={80 + handoff * 4.76}
              height="34"
              rx="17"
              fill="#14b8a6"
              opacity="0.72"
            />
            <text
              x="320"
              y="270"
              textAnchor="middle"
              className="fill-slate-700 text-[13px] font-semibold"
            >
              协作清晰度 / review handoff
            </text>

            {edges.map(([from, to, text], index) => {
              const a = nodes[from];
              const b = nodes[to];
              const lit = index <= activeIndex;
              return (
                <g key={`${from}-${to}-${index}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={lit ? "#f97316" : "#cbd5e1"}
                    strokeWidth={lit ? 4 : 2}
                    strokeLinecap="round"
                  />
                  {text ? (
                    <text
                      x={(a.x + b.x) / 2}
                      y={(a.y + b.y) / 2 - 8}
                      textAnchor="middle"
                      className="fill-slate-600 text-[12px] font-semibold"
                    >
                      {text}
                    </text>
                  ) : null}
                </g>
              );
            })}

            {mode === "patterns" ? (
              <circle
                cx="320"
                cy="126"
                r={52 + pressure / 4}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeDasharray="8 8"
              />
            ) : null}

            {nodes.map((node, index) => {
              const width = cardWidth(node.label);
              const lit = index <= activeIndex;
              return (
                <g key={node.label}>
                  <rect
                    x={node.x - width / 2}
                    y={node.y - 23}
                    width={width}
                    height="46"
                    rx="10"
                    fill={lit ? node.tone : "#ffffff"}
                    stroke={node.tone}
                    strokeWidth="3"
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className={
                      lit
                        ? "fill-white text-[13px] font-bold"
                        : "fill-slate-700 text-[13px] font-bold"
                    }
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            <path
              d={`M 70 36 C ${160 + pressure} ${26 + step * 4}, ${285 - pressure / 2} ${56 + step * 6}, 560 35`}
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              opacity="0.72"
            />
            <text
              x="320"
              y="32"
              textAnchor="middle"
              className="fill-slate-600 text-[13px] font-semibold"
            >
              {MODE_LABELS[mode]}：把职责边界画出来，再写代码
            </text>
          </svg>
        </div>

        <div className="space-y-5 p-4">
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>故事步骤</span>
              <span>{step}/4</span>
            </label>
            <input
              type="range"
              min="1"
              max="4"
              value={step}
              onChange={(event) => setStep(Number(event.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>改动压力</span>
              <span>{pressure}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={pressure}
              onChange={(event) => setPressure(Number(event.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>
          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700">
              <span>交接清晰度</span>
              <span>{handoff}%</span>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={handoff}
              onChange={(event) => setHandoff(Number(event.target.value))}
              className="w-full accent-teal-500"
            />
          </div>
          <div className="rounded-md bg-slate-950 p-3 text-sm leading-6 text-slate-100">
            <p className="font-semibold text-orange-200">{storyText}</p>
            <p className="mt-1 text-slate-300">
              真正要观察的是：谁负责判断，谁负责显示，谁负责取数，失败时谁能解释。
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setPressure(45);
              setHandoff(55);
            }}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50"
          >
            重置故事
          </button>
        </div>
      </div>
    </section>
  );
}
