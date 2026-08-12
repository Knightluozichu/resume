"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={BUTTON_CLASS} onClick={onClick} type="button">
      重置实验
    </button>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={`${BUTTON_CLASS} ${
        active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : ""
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type InstructionId = "direct" | "structured" | "delimited";

const instructions: Record<
  InstructionId,
  { label: string; input: string; guard: string; output: string }
> = {
  direct: {
    label: "直接指令",
    input: "任务与对象",
    guard: "格式约束",
    output: "可读回答",
  },
  structured: {
    label: "结构化模板",
    input: "字段与示例",
    guard: "schema 校验",
    output: "稳定对象",
  },
  delimited: {
    label: "分隔输入",
    input: "指令与资料",
    guard: "边界与来源",
    output: "受控引用",
  },
};

export function Bla04InstructionLab() {
  const [instruction, setInstruction] = useState<InstructionId>("direct");
  const [injection, setInjection] = useState(false);
  const current = instructions[instruction];

  return (
    <section
      aria-label="提示指令与边界实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-04-instruction-boundary"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Instruction boundary
          </p>
          <h3 className="mt-1 text-lg font-semibold">先把指令、资料和输出边界分开</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            切换直接指令、结构化模板或分隔输入，再注入一段冲突文本，观察为什么清晰边界比更长的提示更重要。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setInstruction("direct");
            setInjection(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(instructions) as InstructionId[]).map((id) => (
          <ChoiceButton
            active={instruction === id}
            key={id}
            onClick={() => setInstruction(id)}
          >
            {instructions[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={injection}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setInjection(event.target.checked)}
          type="checkbox"
        />
        资料中出现与任务冲突的指令
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="提示输入经过边界保护和校验形成输出的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-04-instruction-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前方式：{current.label} · 资料状态：{injection ? "冲突" : "可控"}
          </text>
          {[
            { x: 35, label: "输入", value: current.input },
            { x: 215, label: "边界", value: injection ? "需隔离" : "已分层" },
            { x: 395, label: "校验", value: current.guard },
            { x: 575, label: "输出", value: injection ? "拒绝或升级" : current.output },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={injection && index >= 1 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bla-04-instruction-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={injection ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={injection ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {injection
              ? "观察：资料中的指令不能覆盖系统任务，先标记来源并阻断越权要求。"
              : "观察：提示工程的第一步是让任务、资料、格式和拒答边界可区分。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {injection
          ? "先隔离冲突内容，再决定是否引用；不要让模型自行裁定哪条外部指令拥有更高权限。"
          : `当前路径把“${current.input}”经过“${current.guard}”变成“${current.output}”。`}
      </p>
    </section>
  );
}

type DecompositionId = "subtasks" | "fewshot" | "candidates";

const decompositionModes: Record<
  DecompositionId,
  { label: string; stages: string; evidence: string; result: string }
> = {
  subtasks: {
    label: "拆分子任务",
    stages: "分类 → 提取 → 校验",
    evidence: "每步中间结果",
    result: "可定位失败",
  },
  fewshot: {
    label: "少样本示范",
    stages: "示例 → 规则 → 新样本",
    evidence: "示例覆盖边界",
    result: "格式更稳定",
  },
  candidates: {
    label: "多候选选择",
    stages: "生成 → 评分 → 选择",
    evidence: "评分标准与差异",
    result: "保留候选来源",
  },
};

export function Bla04DecompositionLab() {
  const [mode, setMode] = useState<DecompositionId>("subtasks");
  const [missingEvidence, setMissingEvidence] = useState(false);
  const current = decompositionModes[mode];

  return (
    <section
      aria-label="提示任务拆分与候选实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-04-task-decomposition"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Task decomposition
          </p>
          <h3 className="mt-1 text-lg font-semibold">复杂任务要留下每一步证据</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择任务拆分、少样本或多候选选择，再隐藏一类中间结果，观察为什么“最终答对”仍不足以定位失败。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("subtasks");
            setMissingEvidence(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(decompositionModes) as DecompositionId[]).map((id) => (
          <ChoiceButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {decompositionModes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={missingEvidence}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setMissingEvidence(event.target.checked)}
          type="checkbox"
        />
        删除中间结果或选择标准
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="复杂任务经过阶段、证据和验收形成结果的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-04-decomposition-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前策略：{current.label} · 证据：{missingEvidence ? "缺失" : "完整"}
          </text>
          {[
            { x: 35, label: "阶段", value: current.stages },
            { x: 215, label: "证据", value: missingEvidence ? "不可追踪" : current.evidence },
            { x: 395, label: "验收", value: missingEvidence ? "需补记录" : "逐步检查" },
            { x: 575, label: "结果", value: missingEvidence ? "阻断发布" : current.result },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={missingEvidence && index >= 1 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bla-04-decomposition-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={missingEvidence ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={missingEvidence ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {missingEvidence
              ? "观察：没有中间证据，就无法知道失败来自任务、示例、评分还是最后选择。"
              : "观察：拆分、示范和候选选择都要把过程证据带到最终验收。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {missingEvidence
          ? "先补齐阶段输出或选择标准，再比较质量；平均结果不能代替可定位的过程记录。"
          : `当前策略通过“${current.evidence}”支持“${current.result}”。`}
      </p>
    </section>
  );
}

type LoopId = "cot" | "react" | "selector";

const loopModes: Record<LoopId, { label: string; state: string; action: string; stop: string }> = {
  cot: {
    label: "分步分析",
    state: "问题 → 中间检查",
    action: "给出可验证结论",
    stop: "完成结构校验",
  },
  react: {
    label: "ReAct 工具环",
    state: "观察 → 动作 → 回执",
    action: "调用白名单工具",
    stop: "达到步数或目标",
  },
  selector: {
    label: "候选评分",
    state: "多答案 → 评分",
    action: "选择可解释候选",
    stop: "评分门槛通过",
  },
};

export function Bla04LoopLab() {
  const [loop, setLoop] = useState<LoopId>("cot");
  const [toolFailure, setToolFailure] = useState(false);
  const current = loopModes[loop];

  return (
    <section
      aria-label="高级提示与工具循环实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-04-advanced-loop"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Advanced prompt loop
          </p>
          <h3 className="mt-1 text-lg font-semibold">高级技巧也需要停止条件</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择分步分析、ReAct 工具环或候选评分，再触发工具失败，观察为什么更长的推理不能替代权限和停止条件。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setLoop("cot");
            setToolFailure(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(loopModes) as LoopId[]).map((id) => (
          <ChoiceButton active={loop === id} key={id} onClick={() => setLoop(id)}>
            {loopModes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={toolFailure}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setToolFailure(event.target.checked)}
          type="checkbox"
        />
        工具回执失败或超时
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="高级提示经过状态、动作和停止条件形成结果的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-04-loop-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前策略：{current.label} · 回执：{toolFailure ? "失败" : "正常"}
          </text>
          {[
            { x: 35, label: "状态", value: current.state },
            { x: 215, label: "动作", value: current.action },
            { x: 395, label: "回执", value: toolFailure ? "错误/超时" : "可验证结果" },
            { x: 575, label: "停止", value: toolFailure ? "安全回退" : current.stop },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={toolFailure && index >= 1 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bla-04-loop-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={toolFailure ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={toolFailure ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {toolFailure
              ? "观察：失败回执必须停止或降级，不能让模型凭空补造工具结果。"
              : "观察：分步分析、工具循环和候选评分都要绑定可见证据与停止条件。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {toolFailure
          ? "先记录请求、权限、错误和取消动作，再返回可解释失败；不要把幻觉的工具回执当作事实。"
          : `当前策略用“${current.state}”完成“${current.action}”，并以“${current.stop}”结束。`}
      </p>
    </section>
  );
}
