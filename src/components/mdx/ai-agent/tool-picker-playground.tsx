"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <AaToolPickerPlayground>：「模型靠 description 选工具」交互件（HEL-311）。
 *
 * 给一份固定工具清单（每个工具带名字 + description + 参数），再给几个任务样本；
 * 读者切换任务 → 组件高亮「模型该选哪个工具、该填什么参数」+ 一句「为什么（按描述匹配）」。
 * 让读者亲手体会：模型不是真懂任务，而是拿任务去和每个工具的 description 比对、挑最匹配的那个，
 * 再照 schema 把参数填进去——这正是函数调用里「模型怎么决定调哪个工具」的核心。
 *
 * 为何 client：分段切换任务 + 实时高亮选中工具 / 填好参数 / 解释 + 重置都是真交互（受控状态）。
 * 纯 React，无 Canvas / WebGL；reduced-motion 友好（仅颜色/边框过渡）。
 * 颜色/间距/圆角全部走 DESIGN token（硬规则 5）。
 */

type ToolId = "get_weather" | "search_web" | "calculator";

type ToolDef = {
  id: ToolId;
  name: string;
  description: string; // 给模型看的说明——选工具的依据
  paramHint: string; // 参数提示
  color: string;
};

const TOOLS: readonly ToolDef[] = [
  {
    id: "get_weather",
    name: "get_weather",
    description: "查询某城市当前天气（温度、阴晴）",
    paramHint: "city: string",
    color: "var(--accent)",
  },
  {
    id: "search_web",
    name: "search_web",
    description: "联网搜索实时信息、最新新闻",
    paramHint: "query: string",
    color: "var(--warning)",
  },
  {
    id: "calculator",
    name: "calculator",
    description: "做精确的数值计算（加减乘除、乘方）",
    paramHint: "expression: string",
    color: "var(--success)",
  },
];

type TaskId = "weather" | "math" | "news";

type Task = {
  id: TaskId;
  text: string; // 用户任务
  pick: ToolId; // 模型该选哪个工具
  args: string; // 该填什么参数（结构化请求示意）
  why: string; // 为什么——按 description 匹配
};

const TASKS: readonly Task[] = [
  {
    id: "weather",
    text: "北京今天热不热？",
    pick: "get_weather",
    args: 'get_weather(city="北京")',
    why: "任务问的是某城市天气，最贴合 get_weather 的说明「查询某城市当前天气」——于是模型选它，并把城市「北京」填进 city 参数。",
  },
  {
    id: "math",
    text: "3 的 17 次方是多少？",
    pick: "calculator",
    args: 'calculator(expression="3 ** 17")',
    why: "任务要的是精确数值计算，最贴合 calculator 的说明「做精确的数值计算」——模型选它，把算式填进 expression（别让模型自己心算，那会算错）。",
  },
  {
    id: "news",
    text: "查一下今天最新的新闻。",
    pick: "search_web",
    args: 'search_web(query="今天 最新 新闻")',
    why: "任务要的是实时、最新的信息，最贴合 search_web 的说明「联网搜索实时信息、最新新闻」——模型选它，把检索词填进 query。",
  },
];

const DEFAULT_ID: TaskId = "weather";

export function AaToolPickerPlayground() {
  const [id, setId] = useState<TaskId>(DEFAULT_ID);

  const task = TASKS.find((t) => t.id === id) ?? TASKS[0];
  const isDirty = id !== DEFAULT_ID;

  return (
    <DemoStage
      title="切换任务，看模型该挑哪个工具、填什么参数——靠的是工具的 description"
      onReset={isDirty ? () => setId(DEFAULT_ID) : undefined}
      controls={
        <div className="flex flex-col gap-3">
          <span className="text-xs text-secondary">选一个任务：</span>
          <div className="flex flex-wrap gap-2">
            {TASKS.map((t) => {
              const active = t.id === id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setId(t.id)}
                  aria-pressed={active}
                  className="rounded-control border px-3 py-1.5 text-xs font-medium transition-colors duration-(--duration-hover) ease-standard"
                  style={{
                    borderColor: active ? "var(--accent)" : "var(--border)",
                    background: active ? "var(--accent)" : "var(--bg)",
                    color: active ? "var(--bg)" : "var(--text-secondary)",
                  }}
                >
                  {t.text}
                </button>
              );
            })}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-2xl">
        {/* 固定工具清单：选中工具高亮，其余淡出 */}
        <p className="mb-2 text-xs font-semibold text-primary">
          工具清单（电话簿）：模型逐个拿任务去比对它们的 description
        </p>
        <div className="mb-4 flex flex-col gap-2">
          {TOOLS.map((tool) => {
            const picked = tool.id === task.pick;
            return (
              <div
                key={tool.id}
                className="rounded-control border p-3 transition-colors duration-(--duration-hover) ease-standard"
                style={{
                  borderColor: picked ? tool.color : "var(--border)",
                  background: picked ? "var(--accent-glow)" : "var(--bg)",
                  opacity: picked ? 1 : 0.5,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <code
                    className="font-mono text-xs font-bold"
                    style={{
                      color: picked ? tool.color : "var(--text-secondary)",
                    }}
                  >
                    {tool.name}
                  </code>
                  {picked && (
                    <span
                      className="rounded-control px-2 py-0.5 text-[10px] font-semibold"
                      style={{ background: tool.color, color: "var(--bg)" }}
                    >
                      模型选了它 ✓
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-secondary">
                  description：{tool.description}
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-secondary">
                  参数 {tool.paramHint}
                </p>
              </div>
            );
          })}
        </div>

        {/* 模型吐出的结构化请求 + 为什么 */}
        <div
          className="rounded-control border p-3"
          style={{ borderColor: "var(--accent)", background: "var(--bg)" }}
          aria-live="polite"
        >
          <p className="text-xs text-secondary">
            模型输出的调用请求（结构化，不是它自己执行）：
          </p>
          <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded-control border border-accent bg-elevated p-2 font-mono text-xs text-primary">
            {task.args}
          </pre>
          <p className="mt-2 text-xs text-secondary">
            <span className="font-semibold">为什么选它：</span>
            {task.why}
          </p>
        </div>

        <p className="mt-3 text-xs text-secondary">
          猜一猜：如果把 calculator 的 description 改成空白，模型还选得对「3 的
          17 次方」该用谁吗？
        </p>
      </div>
    </DemoStage>
  );
}
