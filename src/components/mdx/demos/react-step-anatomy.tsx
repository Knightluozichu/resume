"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <ReActStepAnatomy>：拆解 ReAct 一轮三要素的交互演示（HEL-256，
 * 《ReAct：推理与行动循环》篇2·1，知识点 2/3）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」，LLM = 小特的大脑。这个 Demo 把 LLM 实际「写出来」
 * 的一轮 ReAct 文本摊给你看（示意格式）：
 *   Thought: ……   ← 大脑自己想 / 写的
 *   Action: weather("上海")   ← 大脑自己想 / 写的
 *   Observation: 小雨，降水 60%   ← 系统执行工具后填回的，不是大脑编的
 * 点三个标签「Thought / Action / Observation」之一，对应那一行文本高亮，旁注点明它是
 * 「LLM 自己想 / 写的」还是「系统执行工具后填回的」。
 *
 * 关键教学点（本 Demo 的灵魂）：Thought 和 Action 是 LLM **生成**的，Observation 是
 * **系统填回**的——这是初学者最容易搞混的一处（误以为 Observation 也是 LLM 编的）。
 *
 * 诚实声明：展示的 ReAct 文本为「按格式预写的示意」，不是实时调用模型。必有重置（回到
 * 「全览」无高亮态）。
 *
 * 为何 client：三个标签按钮是真交互（受控状态），用状态直接高亮对应行——这是「拆解单轮三
 * 要素」在「没法在线跑 LLM」约束下的落地（参考 PromptRecipeDemo 的 curated 范式）。
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

type Part = "thought" | "action" | "observation";

type Line = {
  key: Part;
  /** 这一行的标签前缀（ReAct 文本里实际写的）。 */
  prefix: string;
  /** 这一行的内容。 */
  body: string;
  /** 这一行是不是等宽（Action 那行像代码）。 */
  mono?: boolean;
  /** 高亮色 token。 */
  color: string;
  /** 这部分是谁产生的（教学注解）。 */
  origin: string;
  /** 选中时的旁注说明。 */
  note: string;
};

const LINES: readonly Line[] = [
  {
    key: "thought",
    prefix: "Thought:",
    body: "要回答带不带伞，得先知道上海今天的天气，我自己不知道，得去查。",
    color: "var(--accent)",
    origin: "LLM 自己想 / 写的",
    note: "Thought 是大脑把「我现在该想什么、下一步干什么」显式写出来——推理过程从此看得见。这一行是 LLM 生成的。",
  },
  {
    key: "action",
    prefix: "Action:",
    body: 'weather("上海")',
    mono: true,
    color: "var(--warning)",
    origin: "LLM 自己想 / 写的",
    note: "Action 是大脑决定「去调哪个工具、传什么参数」，也由 LLM 自己写出来。系统会照着它真去执行这个工具调用。",
  },
  {
    key: "observation",
    prefix: "Observation:",
    body: "小雨，降水概率 60%，气温 18℃。",
    color: "var(--success)",
    origin: "系统执行工具后填回的（不是 LLM 编的）",
    note: 'Observation 是系统真的跑了 weather("上海") 这个工具、把返回结果填回来的——它来自外部世界的真实数据，不是大脑编的。这是 ReAct 最容易被搞混的一处。',
  },
];

const PART_LABEL: Record<Part, string> = {
  thought: "Thought（思考）",
  action: "Action（行动）",
  observation: "Observation（观察）",
};

export function ReActStepAnatomy() {
  // null = 全览（无高亮）。
  const [active, setActive] = useState<Part | null>(null);
  const reset = () => setActive(null);

  const activeLine = active ? LINES.find((l) => l.key === active)! : null;

  return (
    <DemoStage
      title="拆解一轮 ReAct：哪部分是 LLM 写的，哪部分是系统填回的"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-secondary">
            点一个看它是谁产生的：
          </span>
          {LINES.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setActive(active === l.key ? null : l.key)}
              aria-pressed={active === l.key}
              className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                active === l.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:text-primary"
              }`}
            >
              {PART_LABEL[l.key]}
            </button>
          ))}
        </div>
      }
    >
      <div className="w-full max-w-[640px] text-sm">
        {/* LLM 实际写出的一轮 ReAct 文本（示意） */}
        <div className="mb-3 rounded-control border border-border bg-bg p-3">
          <p className="mb-2 text-xs font-semibold text-secondary">
            LLM 这一轮实际产出的文本（示意格式）
          </p>
          <div className="flex flex-col gap-1.5 font-mono text-xs">
            {LINES.map((l) => {
              const dim = active !== null && active !== l.key;
              const on = active === l.key;
              return (
                <div
                  key={l.key}
                  className="rounded-control border-l-2 px-2 py-1.5 transition-colors duration-(--duration-hover) ease-standard"
                  style={{
                    borderLeftColor: on ? l.color : "var(--border)",
                    backgroundColor: on ? "var(--bg-elevated)" : "transparent",
                    opacity: dim ? 0.4 : 1,
                  }}
                >
                  <span className="font-semibold" style={{ color: l.color }}>
                    {l.prefix}
                  </span>{" "}
                  <span
                    className={l.mono ? "text-primary" : "text-primary"}
                    style={
                      l.mono ? undefined : { fontFamily: "var(--font-sans)" }
                    }
                  >
                    {l.body}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 旁注：选中行是谁产生的 */}
        <div className="rounded-control border border-border bg-elevated p-3">
          {activeLine ? (
            <>
              <p
                className="mb-1 flex items-center justify-between gap-2 text-xs font-semibold"
                style={{ color: activeLine.color }}
              >
                <span>{PART_LABEL[activeLine.key]}</span>
                <span>{activeLine.origin}</span>
              </p>
              <p className="text-xs text-secondary">{activeLine.note}</p>
            </>
          ) : (
            <p className="text-xs text-secondary">
              一轮 ReAct 有三部分。
              <strong className="text-accent">Thought</strong> 和{" "}
              <strong className="text-warning">Action</strong> 都是{" "}
              <strong className="text-primary">LLM 自己生成的</strong>，而{" "}
              <strong className="text-success">Observation</strong> 是{" "}
              <strong className="text-primary">系统执行工具后填回的</strong>
              ——点上面的标签逐个看清楚。
            </p>
          )}
        </div>

        {/* 诚实声明 */}
        <p className="mt-3 text-[11px] leading-relaxed text-secondary">
          说明：以上 ReAct 文本为按格式
          <strong className="text-primary">预写的示意</strong>
          （非实时调用模型）。真实里每轮只写到 Action 就停，系统执行工具后把
          Observation 拼回去，再让模型续写下一轮——所以 Observation
          一定来自系统，不是模型「想」出来的。
        </p>
      </div>
    </DemoStage>
  );
}
