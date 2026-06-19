"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <AaReactStepThrough>：交互单步 ReAct trace（HEL-312）。
 *
 * 读者逐步点开同一个任务的 Thought / Action / Observation / Final Answer，
 * 看 messages 如何越滚越长，以及 Agent.run 为什么能靠 Final Answer 停止。
 */

type TraceStep = {
  id: string;
  label: string;
  speaker: string;
  content: string;
  inbox: string;
  color: string;
};

const STEPS: readonly TraceStep[] = [
  {
    id: "user",
    label: "用户任务",
    speaker: "user",
    content: "帮我订明天 10 点的 A 会议室。",
    inbox: "messages 里只有用户任务，模型还不知道会议室是否可用。",
    color: "var(--text-secondary)",
  },
  {
    id: "thought",
    label: "Thought",
    speaker: "assistant",
    content: "Thought: 我需要先查 A 室明天 10 点是否空闲。",
    inbox: "模型先想下一步：缺外部事实，不能直接给最终答案。",
    color: "var(--accent)",
  },
  {
    id: "action",
    label: "Action",
    speaker: "assistant",
    content:
      'Action: calendar_search({"room":"A","date":"明天","time":"10:00"})',
    inbox: "Action 是结构化请求，运行时接下来会查 registry 并执行工具。",
    color: "var(--warning)",
  },
  {
    id: "observation",
    label: "Observation",
    speaker: "tool",
    content: "Observation: A 室明天 10:00-11:00 可用。",
    inbox: "工具回执被回灌，下一轮模型能基于真实结果继续想。",
    color: "var(--success)",
  },
  {
    id: "thought2",
    label: "Thought",
    speaker: "assistant",
    content: "Thought: 时间可用，现在应该执行预订。",
    inbox: "拿到回执后再想下一步，而不是复用上一轮的猜测。",
    color: "var(--accent)",
  },
  {
    id: "action2",
    label: "Action",
    speaker: "assistant",
    content: 'Action: calendar_book({"room":"A","date":"明天","time":"10:00"})',
    inbox: "第二次 Action 继续交给运行时执行；循环还没结束。",
    color: "var(--warning)",
  },
  {
    id: "observation2",
    label: "Observation",
    speaker: "tool",
    content: "Observation: 预订成功，确认号 R-1024。",
    inbox: "任务已经办成，下一轮模型应该停止工具调用。",
    color: "var(--success)",
  },
  {
    id: "final",
    label: "Final Answer",
    speaker: "assistant",
    content: "Final Answer: 已帮你订好明天 10 点 A 会议室，确认号 R-1024。",
    inbox: "出现 Final Answer，Agent.run 返回这段内容，主循环停止。",
    color: "var(--success)",
  },
];

const LAST_INDEX = STEPS.length - 1;

export function AaReactStepThrough() {
  const [index, setIndex] = useState(0);
  const visible = STEPS.slice(0, index + 1);
  const current = STEPS[index] ?? STEPS[0];
  const isDirty = index !== 0;

  return (
    <DemoStage
      title="逐步推进一段 ReAct trace，看 Observation 怎样回灌、Final Answer 怎样停机"
      onReset={isDirty ? () => setIndex(0) : undefined}
      controls={
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setIndex((v) => Math.max(0, v - 1))}
              disabled={index === 0}
              className="rounded-control border border-border px-3 py-1.5 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              上一步
            </button>
            <button
              type="button"
              onClick={() => setIndex((v) => Math.min(LAST_INDEX, v + 1))}
              disabled={index === LAST_INDEX}
              className="rounded-control border border-accent px-3 py-1.5 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:bg-[var(--accent-glow)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              下一步
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={LAST_INDEX}
            step={1}
            value={index}
            aria-label="trace 步骤"
            aria-valuetext={`第 ${index + 1} 步：${current.label}`}
            onChange={(event) => setIndex(Number(event.target.value))}
            className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
          />
        </div>
      }
    >
      <div className="grid w-full min-w-0 max-w-3xl gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4">
          <p className="mb-3 text-xs font-semibold text-primary">
            messages / trace（逐步增长）
          </p>
          <div className="flex min-w-0 flex-col gap-2">
            {visible.map((step) => (
              <div
                key={step.id}
                className="min-w-0 rounded-control border p-3"
                style={{
                  borderColor: step.color,
                  background: "var(--bg-elevated)",
                }}
              >
                <div className="mb-1 flex min-w-0 items-center justify-between gap-2">
                  <span
                    className="min-w-0 text-xs font-bold"
                    style={{ color: step.color }}
                  >
                    {step.label}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-secondary">
                    role: {step.speaker}
                  </span>
                </div>
                <pre className="max-w-full whitespace-pre-wrap break-words font-mono text-xs text-primary">
                  {step.content}
                </pre>
              </div>
            ))}
          </div>
        </div>

        <div
          className="min-w-0 rounded-card border p-4"
          style={{
            borderColor: current.color,
            background: "var(--bg)",
          }}
          aria-live="polite"
        >
          <p className="text-xs font-semibold text-secondary">
            当前 Agent.run 在判断什么？
          </p>
          <p className="mt-2 break-words text-sm text-primary">
            {current.inbox}
          </p>
          <div className="mt-4 min-w-0 rounded-control border border-border bg-elevated p-3">
            <p className="text-xs text-secondary">停止条件</p>
            <p
              className="mt-1 break-words text-sm font-semibold"
              style={{
                color:
                  current.id === "final"
                    ? "var(--success)"
                    : "var(--text-secondary)",
              }}
            >
              {current.id === "final"
                ? "已命中 Final Answer，返回结果。"
                : "还没命中 Final Answer，继续循环。"}
            </p>
          </div>
        </div>
      </div>
    </DemoStage>
  );
}
