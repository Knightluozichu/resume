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

type CopilotMode = "suggest" | "review" | "edit";

const copilotModes: Record<
  CopilotMode,
  { label: string; input: string; human: string; output: string }
> = {
  suggest: {
    label: "提出建议",
    input: "任务与上下文",
    human: "人审取舍",
    output: "候选方案",
  },
  review: {
    label: "审查差异",
    input: "代码与测试",
    human: "人审证据",
    output: "风险清单",
  },
  edit: {
    label: "生成补丁",
    input: "目标文件与约束",
    human: "人审合并",
    output: "可回滚变更",
  },
};

export function Bla02CopilotLab() {
  const [mode, setMode] = useState<CopilotMode>("suggest");
  const [contextMissing, setContextMissing] = useState(false);
  const current = copilotModes[mode];

  return (
    <section
      aria-label="Copilot 人机协作实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-02-copilot-review-loop"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Copilot review loop
          </p>
          <h3 className="mt-1 text-lg font-semibold">让 Copilot 停在可审查的中间状态</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择建议、审查或补丁模式，再移除一项上下文，观察为什么人的判断和回滚点不能被省略。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("suggest");
            setContextMissing(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(copilotModes) as CopilotMode[]).map((id) => (
          <ChoiceButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {copilotModes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={contextMissing}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setContextMissing(event.target.checked)}
          type="checkbox"
        />
        隐藏任务约束或测试结果
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="Copilot 从上下文经过模型建议和人工判断形成输出的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-02-copilot-arrow"
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
            当前模式：{current.label} · 上下文：{contextMissing ? "不完整" : "完整"}
          </text>
          {[
            { x: 35, label: "输入", value: contextMissing ? "缺约束" : current.input },
            { x: 215, label: "建议", value: "模型候选" },
            { x: 395, label: "人审", value: contextMissing ? "无法判断" : current.human },
            { x: 575, label: "结果", value: contextMissing ? "退回补上下文" : current.output },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={contextMissing && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-02-copilot-arrow)"
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
            fill={contextMissing ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={contextMissing ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {contextMissing
              ? "观察：缺少约束时，人不能判断建议是否正确，也不应直接合并。"
              : "观察：Copilot 的交付物包含建议、证据、人审决定和可回滚结果。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {contextMissing
          ? "先补齐任务、约束和测试，再让模型生成下一版；流畅代码不能替代工程审查。"
          : `当前路径把“${current.input}”交给模型，再由“${current.human}”确认“${current.output}”。`}
      </p>
    </section>
  );
}

type OrchestratorMode = "chain" | "router" | "agent";

const orchestratorModes: Record<
  OrchestratorMode,
  { label: string; graph: string; owner: string; fallback: string }
> = {
  chain: {
    label: "固定链",
    graph: "步骤 1 → 步骤 2 → 步骤 3",
    owner: "流程作者",
    fallback: "从失败步骤重试",
  },
  router: {
    label: "路由器",
    graph: "输入 → 分类 → 专家链",
    owner: "路由规则",
    fallback: "回到默认链",
  },
  agent: {
    label: "受限 Agent",
    graph: "目标 ⇄ 工具循环",
    owner: "策略与权限",
    fallback: "达到步数即停",
  },
};

export function Bla02OrchestratorLab() {
  const [mode, setMode] = useState<OrchestratorMode>("chain");
  const [toolTimeout, setToolTimeout] = useState(false);
  const current = orchestratorModes[mode];

  return (
    <section
      aria-label="AI 编排器调用图实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-02-orchestrator-graph"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Orchestrator graph
          </p>
          <h3 className="mt-1 text-lg font-semibold">把编排器看成有边界的调用图</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            固定链、路由器和受限 Agent 的状态与责任不同；触发工具超时，观察编排器怎样阻断并回退。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("chain");
            setToolTimeout(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(orchestratorModes) as OrchestratorMode[]).map((id) => (
          <ChoiceButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {orchestratorModes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={toolTimeout}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setToolTimeout(event.target.checked)}
          type="checkbox"
        />
        工具调用超时或权限被拒绝
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="编排器从目标经过调用图和权限检查形成回退结果的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-02-orchestrator-arrow"
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
            当前图：{current.graph} · 责任：{current.owner}
          </text>
          {[
            { x: 35, label: "目标", value: "任务合同" },
            { x: 215, label: "图", value: current.graph },
            { x: 395, label: "工具", value: toolTimeout ? "超时/拒绝" : "白名单调用" },
            { x: 575, label: "回退", value: toolTimeout ? "安全停止" : current.fallback },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={toolTimeout && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-02-orchestrator-arrow)"
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
            fill={toolTimeout ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={toolTimeout ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {toolTimeout
              ? "观察：超时必须有上限、取消和回退，不能让 Agent 无限循环或继续越权。"
              : "观察：编排器把状态、权限、超时和回退显式放在模型调用之外。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {toolTimeout
          ? "先记录工具请求、权限判断和超时，再返回可解释失败；不要把空结果交给模型自由补写。"
          : `当前编排方式由“${current.owner}”负责，失败时采用“${current.fallback}”。`}
      </p>
    </section>
  );
}

type FrameworkId = "langchain" | "haystack" | "semantic";

const frameworks: Record<
  FrameworkId,
  { label: string; strength: string; evidence: string; boundary: string }
> = {
  langchain: {
    label: "LangChain",
    strength: "组件组合与生态",
    evidence: "链路、回调与版本",
    boundary: "适配器隔离接口变化",
  },
  haystack: {
    label: "Haystack",
    strength: "检索与管道",
    evidence: "节点输入与来源",
    boundary: "冻结索引和管道版本",
  },
  semantic: {
    label: "Semantic Kernel",
    strength: "插件与规划",
    evidence: "函数、权限与状态",
    boundary: "限制插件与计划步数",
  },
};

export function Bla02FrameworkLab() {
  const [framework, setFramework] = useState<FrameworkId>("langchain");
  const [versionDrift, setVersionDrift] = useState(false);
  const current = frameworks[framework];

  return (
    <section
      aria-label="AI 编排框架选型实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-02-framework-choice"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Framework choice
          </p>
          <h3 className="mt-1 text-lg font-semibold">框架选型要绑定任务证据</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            切换三个框架的优势与证据，再触发版本漂移；观察为什么生态热度不能替代任务、成本和迁移边界。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setFramework("langchain");
            setVersionDrift(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(frameworks) as FrameworkId[]).map((id) => (
          <ChoiceButton active={framework === id} key={id} onClick={() => setFramework(id)}>
            {frameworks[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={versionDrift}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setVersionDrift(event.target.checked)}
          type="checkbox"
        />
        升级框架或更换模型适配器
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="框架选择经过任务优势和证据后形成迁移边界的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-02-framework-arrow"
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
            当前框架：{current.label} · 运行状态：{versionDrift ? "需要迁移" : "可比较"}
          </text>
          {[
            { x: 35, label: "任务", value: "应用目标" },
            { x: 215, label: "优势", value: current.strength },
            { x: 395, label: "证据", value: versionDrift ? "需重跑" : current.evidence },
            { x: 575, label: "边界", value: versionDrift ? "隔离适配器" : current.boundary },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={versionDrift && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-02-framework-arrow)"
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
            fill={versionDrift ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={versionDrift ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {versionDrift
              ? "观察：版本变化会影响调用图、回调和输出，先重跑适配器测试再迁移。"
              : "观察：框架只是实现选择，发布依据仍是任务质量、成本、风险和可维护性。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {versionDrift
          ? "先冻结旧版结果并比较接口差异；不要把升级后的偶然成功当作迁移已经完成。"
          : `当前选择的优势是“${current.strength}”，需要保存“${current.evidence}”作为证据。`}
      </p>
    </section>
  );
}
