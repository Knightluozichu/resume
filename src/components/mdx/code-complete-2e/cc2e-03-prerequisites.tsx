"use client";

import { useState } from "react";

type Stage = {
  id: string;
  label: string;
  detail: string;
  failure: string;
};

const STAGES: readonly Stage[] = [
  {
    id: "problem",
    label: "问题定义",
    detail: "写清结果、边界和不可变约束，避免把愿望当需求。",
    failure: "目标仍含糊，后续设计无法给出可判定的拒绝条件。",
  },
  {
    id: "requirements",
    label: "需求基线",
    detail: "把角色、输入、输出和验收例子冻结成可追踪记录。",
    failure: "需求变动没有版本，团队只能靠记忆解释差异。",
  },
  {
    id: "architecture",
    label: "架构风险",
    detail: "先找跨模块、性能、数据和外部依赖中的高代价未知项。",
    failure: "风险被批量编码掩盖，直到集成时才暴露。",
  },
  {
    id: "lifecycle",
    label: "生命周期选择",
    detail: "依据不确定性、反馈速度与回退成本选择序列式或迭代式节奏。",
    failure: "项目形态与反馈条件不匹配，计划变成无法兑现的承诺。",
  },
  {
    id: "ready",
    label: "构建就绪",
    detail: "把未决项、探针结果、责任人与退出条件收束为开工门槛。",
    failure: "还没有证据就扩大实现规模，返工成本随范围一起增长。",
  },
];

type EvidenceNode = {
  node: string;
  anchor: string;
  evidence: string;
};

// 这 18 个标签与 fidelity manifest 的 concepts 一一对应；视觉组件展示它们如何落到证据。
const EVIDENCE_NODES: readonly EvidenceNode[] = [
  {
    node: "第3章 三思而后行：前期准备",
    anchor: "问题定义",
    evidence: "构建前决策记录",
  },
  {
    node: "3.1 前期准备的重要性",
    anchor: "需求基线",
    evidence: "返工成本假设与验收例",
  },
  {
    node: "前期准备适用于现代软件项目吗",
    anchor: "架构风险",
    evidence: "未知项探针清单",
  },
  {
    node: "准备不周全的诱因",
    anchor: "生命周期选择",
    evidence: "诱因—后果对照",
  },
  {
    node: "关于开始构建之前要做前期准备的绝对有力且简明的论据",
    anchor: "构建就绪",
    evidence: "开工门槛与拒绝理由",
  },
  {
    node: "3.2 辨明你所从事的软件的类型",
    anchor: "生命周期选择",
    evidence: "序列式/迭代式选择表",
  },
  {
    node: "迭代开发法对前期准备的影响",
    anchor: "需求基线",
    evidence: "每轮反馈的变更记录",
  },
  {
    node: "在序列式开发法和迭代式开发法之间做出选择",
    anchor: "生命周期选择",
    evidence: "选择依据与重审点",
  },
  {
    node: "3.3 问题定义的先决条件",
    anchor: "问题定义",
    evidence: "目标、边界、不可变约束",
  },
  {
    node: "3.4 需求的先决条件",
    anchor: "需求基线",
    evidence: "输入输出与验收例",
  },
  {
    node: "为什么要有正式的需求",
    anchor: "需求基线",
    evidence: "需求版本与追踪关系",
  },
  {
    node: "稳定需求的神话",
    anchor: "需求基线",
    evidence: "变化热点与重审规则",
  },
  {
    node: "在构建期间处理需求变更",
    anchor: "构建就绪",
    evidence: "影响分析与回退点",
  },
  {
    node: "3.5 架构的先决条件",
    anchor: "架构风险",
    evidence: "依赖、容量、数据边界",
  },
  {
    node: "架构的典型组成部分",
    anchor: "架构风险",
    evidence: "组件责任与接口合同",
  },
  {
    node: "3.6 花费在前期准备上的时间长度",
    anchor: "构建就绪",
    evidence: "探针收益与投入记录",
  },
  {
    node: "更多资源",
    anchor: "构建就绪",
    evidence: "按缺口选择的核查资料",
  },
  {
    node: "关键点",
    anchor: "构建就绪",
    evidence: "前提、反例与退出条件",
  },
];

const statusText = {
  ready: "可进入下一阶段",
  review: "需要记录并复核",
  blocked: "被故障阻断",
} as const;

type StageStatus = keyof typeof statusText;

function statusColor(status: StageStatus) {
  if (status === "blocked") return "var(--danger)";
  if (status === "review") return "var(--warning)";
  return "var(--success)";
}

function stageStatus(
  stage: Stage,
  index: number,
  projectType: "sequence" | "iteration",
  pressure: number,
  faultInjected: boolean,
): StageStatus {
  if (faultInjected && stage.id === "architecture") return "blocked";
  if (pressure === 3 && index >= 2) return "review";
  if (projectType === "iteration" && stage.id === "requirements")
    return "review";
  return "ready";
}

export function Cc2e03PrerequisitesPathDiagram() {
  return (
    <figure
      data-visual-kind="cc2e-03-prerequisites-path"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6"
    >
      <div className="mb-4">
        <p className="text-xs font-medium text-accent">章节专属路径图</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          未知项如何变成构建就绪证据
        </h2>
      </div>
      <svg
        viewBox="0 0 760 260"
        role="img"
        aria-label="前期准备五阶段路径：问题定义、需求基线、架构风险、生命周期选择、构建就绪。每个阶段先产出证据，再允许进入下一阶段。"
        className="block h-auto w-full"
      >
        <path
          d="M90 116H670"
          fill="none"
          stroke="var(--border)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {STAGES.map((stage, index) => {
          const x = 90 + index * 145;
          return (
            <g key={stage.id}>
              <circle
                cx={x}
                cy="116"
                r="30"
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="3"
              />
              <text
                x={x}
                y="111"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {index + 1}
              </text>
              <text
                x={x}
                y="137"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-primary)"
              >
                {stage.label}
              </text>
              {index < STAGES.length - 1 ? (
                <path
                  d={`M${x + 38} 116h68`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
              ) : null}
            </g>
          );
        })}
        <text x="90" y="54" fontSize="13" fontWeight="700" fill="var(--accent)">
          先回答“什么必须成立”
        </text>
        <text
          x="670"
          y="201"
          textAnchor="end"
          fontSize="13"
          fill="var(--success)"
        >
          再回答“现在能否开工”
        </text>
        <path d="M90 70v25M670 174v25" stroke="var(--border)" strokeWidth="2" />
      </svg>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STAGES.map((stage, index) => (
          <div
            key={stage.id}
            className="rounded-control border border-border bg-bg p-3"
          >
            <p className="text-xs font-semibold text-accent">
              {index + 1}. {stage.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {stage.detail}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-secondary">
        路径不是“写完文档就开工”：每个节点都要留下能被下一节点复核的证据。
      </figcaption>
    </figure>
  );
}

export function Cc2e03PrerequisitesLab() {
  const [projectType, setProjectType] = useState<"sequence" | "iteration">(
    "iteration",
  );
  const [pressure, setPressure] = useState(1);
  const [faultInjected, setFaultInjected] = useState(false);

  const reset = () => {
    setProjectType("iteration");
    setPressure(1);
    setFaultInjected(false);
  };

  const pressureLabel = pressure === 1 ? "低" : pressure === 2 ? "中" : "高";
  const currentStage = faultInjected
    ? "架构风险"
    : pressure === 3
      ? "生命周期选择"
      : "需求基线";
  const summary = faultInjected
    ? "架构探针失败：停止扩大实现，先保存失败证据与回退条件。"
    : pressure === 3
      ? "变更压力已升高：把变化热点移入下一轮探针，暂缓批量编码。"
      : projectType === "iteration"
        ? "迭代式节奏可先做小探针，但每轮仍要刷新需求基线。"
        : "序列式节奏要求更完整的前置合同，变更要经过正式复核。";

  return (
    <section
      aria-label="前期准备因果实验"
      data-visual-kind="cc2e-03-prerequisites-lab"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4 sm:p-6">
        <div>
          <p className="text-xs font-medium text-accent">可操作实验</p>
          <h2 className="mt-1 text-lg font-semibold text-primary">
            改变一个前提，观察开工门槛
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            猜一猜：把变更压力调高，五个节点中哪一个会先要求复核？再注入一个架构探针故障。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置前期准备实验"
          onClick={reset}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置实验
        </button>
      </header>

      <div className="grid gap-0 lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-border p-4 lg:border-r lg:border-b-0 sm:p-6">
          <p className="text-xs font-medium text-secondary">项目形态</p>
          <div
            className="mt-3 grid gap-2"
            role="group"
            aria-label="选择项目形态"
          >
            {[
              ["iteration", "迭代式", "用短反馈轮次降低未知项"],
              ["sequence", "序列式", "先完成更完整的前置合同"],
            ].map(([value, label, hint]) => (
              <button
                key={value}
                type="button"
                aria-pressed={projectType === value}
                onClick={() =>
                  setProjectType(value as "sequence" | "iteration")
                }
                className={`min-h-11 rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                  projectType === value
                    ? "border-accent bg-bg font-semibold text-primary"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                <span className="block">{label}</span>
                <span className="mt-1 block text-xs font-normal text-secondary">
                  {hint}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs font-medium text-secondary">
            需求变更压力：{pressureLabel}
          </p>
          <div
            className="mt-3 grid grid-cols-3 gap-2"
            role="group"
            aria-label="需求变更压力"
          >
            {[1, 2, 3].map((level) => (
              <button
                key={level}
                type="button"
                aria-pressed={pressure === level}
                onClick={() => setPressure(level)}
                className={`min-h-11 rounded-control border px-2 py-2 text-sm transition-colors ${
                  pressure === level
                    ? "border-accent bg-bg font-semibold text-primary"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {level === 1 ? "低" : level === 2 ? "中" : "高"}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-pressed={faultInjected}
            onClick={() => setFaultInjected((value) => !value)}
            className={`mt-6 min-h-11 w-full rounded-control border px-3 py-2 text-left text-sm transition-colors ${
              faultInjected
                ? "border-danger bg-bg font-semibold text-primary"
                : "border-border text-secondary hover:border-danger hover:text-primary"
            }`}
          >
            {faultInjected ? "收起架构探针故障" : "注入架构探针故障"}
          </button>
        </aside>

        <div className="min-w-0 p-4 sm:p-6">
          <div
            role="status"
            className="rounded-control border border-border bg-bg p-4"
          >
            <p className="text-xs font-medium text-accent">
              当前最先需要复核 · {currentStage}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary">
              {summary}
            </p>
          </div>

          <svg
            viewBox="0 0 680 220"
            role="img"
            aria-label={`前期准备实验当前状态：项目形态为${projectType === "iteration" ? "迭代式" : "序列式"}，变更压力为${pressureLabel}，${faultInjected ? "架构探针失败" : "尚未注入故障"}。`}
            className="mt-5 block h-auto w-full"
          >
            <path
              d="M52 110H628"
              stroke="var(--border)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {STAGES.map((stage, index) => {
              const x = 52 + index * 144;
              const status = stageStatus(
                stage,
                index,
                projectType,
                pressure,
                faultInjected,
              );
              return (
                <g key={stage.id}>
                  <circle
                    cx={x}
                    cy="110"
                    r="27"
                    fill="var(--bg)"
                    stroke={statusColor(status)}
                    strokeWidth="4"
                  />
                  <text
                    x={x}
                    y="106"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={statusColor(status)}
                  >
                    {index + 1}
                  </text>
                  <text
                    x={x}
                    y="139"
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--text-primary)"
                  >
                    {stage.label}
                  </text>
                  {index < STAGES.length - 1 ? (
                    <path
                      d={`M${x + 34} 110h76`}
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                    />
                  ) : null}
                </g>
              );
            })}
            <text
              x="52"
              y="52"
              fontSize="13"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              输入：项目形态 + 变更压力 + 故障
            </text>
            <text
              x="628"
              y="190"
              textAnchor="end"
              fontSize="13"
              fill="var(--text-secondary)"
            >
              输出：开工 / 复核 / 停止
            </text>
          </svg>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {STAGES.map((stage, index) => {
              const status = stageStatus(
                stage,
                index,
                projectType,
                pressure,
                faultInjected,
              );
              return (
                <div
                  key={stage.id}
                  className="rounded-control border border-border bg-bg p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-primary">
                      {stage.label}
                    </p>
                    <span
                      className="text-xs"
                      style={{ color: statusColor(status) }}
                    >
                      {status === "ready"
                        ? "✓"
                        : status === "review"
                          ? "!"
                          : "×"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-secondary">
                    {statusText[status]}
                  </p>
                  {status === "blocked" ? (
                    <p className="mt-2 text-xs leading-relaxed text-primary">
                      {stage.failure}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cc2e03ReadinessEvidenceMap() {
  return (
    <figure
      data-visual-kind="cc2e-03-prerequisites-evidence"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6"
    >
      <div className="mb-4">
        <p className="text-xs font-medium text-accent">目录节点证据图</p>
        <h2 className="mt-1 text-lg font-semibold text-primary">
          18 个节点，各自落到一个可复核产物
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          节点不是为了填目录；它们必须能指出准备阶段、证据产物和可执行的复核动作。
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {EVIDENCE_NODES.map((item, index) => (
          <div
            key={item.node}
            className="grid gap-2 rounded-control border border-border bg-bg p-3 sm:grid-cols-[28px_1fr]"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full border border-accent text-xs font-semibold text-accent">
              {index + 1}
            </span>
            <div>
              <p className="text-sm font-semibold leading-relaxed text-primary">
                {item.node}
              </p>
              <p className="mt-1 text-xs text-accent">落点：{item.anchor}</p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                证据：{item.evidence}
              </p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-sm leading-relaxed text-secondary">
        用“节点 → 阶段 → 证据”三列回收目录，任何一个节点都不应只停留在标题层。
      </figcaption>
    </figure>
  );
}
