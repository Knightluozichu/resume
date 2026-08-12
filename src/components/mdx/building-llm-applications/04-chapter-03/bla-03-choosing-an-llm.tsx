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

type RequirementId = "chat" | "extraction" | "code";

const requirements: Record<
  RequirementId,
  { label: string; input: string; metric: string; boundary: string }
> = {
  chat: {
    label: "对话助手",
    input: "多轮上下文",
    metric: "任务完成率",
    boundary: "拒答与升级人工",
  },
  extraction: {
    label: "结构化抽取",
    input: "文档与 schema",
    metric: "字段准确率",
    boundary: "缺失字段与来源",
  },
  code: {
    label: "代码协作",
    input: "仓库与测试",
    metric: "测试通过率",
    boundary: "沙箱与回滚",
  },
};

export function Bla03RequirementsLab() {
  const [requirement, setRequirement] = useState<RequirementId>("chat");
  const [privacySensitive, setPrivacySensitive] = useState(false);
  const current = requirements[requirement];

  return (
    <section
      aria-label="模型需求约束实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-03-requirement-constraints"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Requirement constraints
          </p>
          <h3 className="mt-1 text-lg font-semibold">先写任务约束，再看模型名称</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择对话、抽取或代码协作，再增加隐私约束，观察同一个模型排行榜为什么不能直接决定方案。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setRequirement("chat");
            setPrivacySensitive(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(requirements) as RequirementId[]).map((id) => (
          <ChoiceButton
            active={requirement === id}
            key={id}
            onClick={() => setRequirement(id)}
          >
            {requirements[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={privacySensitive}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setPrivacySensitive(event.target.checked)}
          type="checkbox"
        />
        输入包含敏感数据或严格留存限制
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="应用需求经过约束、指标和部署边界形成模型候选的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-03-requirement-arrow"
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
            当前任务：{current.label} · 数据约束：{privacySensitive ? "敏感" : "普通"}
          </text>
          {[
            { x: 35, label: "输入", value: current.input },
            { x: 215, label: "指标", value: current.metric },
            { x: 395, label: "约束", value: privacySensitive ? "私有部署/隔离" : "常规合规" },
            { x: 575, label: "边界", value: current.boundary },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={privacySensitive && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-03-requirement-arrow)"
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
            fill={privacySensitive ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={privacySensitive ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {privacySensitive
              ? "观察：敏感输入会改变可用端点、日志策略与部署成本，先收紧边界再选模型。"
              : "观察：需求、指标和失败边界共同生成候选模型，不由参数规模单独决定。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {privacySensitive
          ? "先确认数据是否离开控制域，再比较质量和价格；隐私限制是模型选择条件而不是上线后的备注。"
          : `当前任务需要“${current.input}”，用“${current.metric}”验收，并设置“${current.boundary}”。`}
      </p>
    </section>
  );
}

type BenchmarkId = "quality" | "latency" | "cost";

const benchmarkModes: Record<
  BenchmarkId,
  { label: string; sample: string; evidence: string; decision: string }
> = {
  quality: {
    label: "质量优先",
    sample: "边界与正常样本",
    evidence: "逐样本判断",
    decision: "是否达到任务门槛",
  },
  latency: {
    label: "延迟优先",
    sample: "并发与尾部请求",
    evidence: "P50/P95 与错误",
    decision: "是否满足响应预算",
  },
  cost: {
    label: "成本优先",
    sample: "输入输出账本",
    evidence: "单请求与月度预算",
    decision: "是否可持续运行",
  },
};

export function Bla03BenchmarkLab() {
  const [benchmark, setBenchmark] = useState<BenchmarkId>("quality");
  const [evalLeakage, setEvalLeakage] = useState(false);
  const current = benchmarkModes[benchmark];

  return (
    <section
      aria-label="模型受控基准实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-03-controlled-benchmark"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Controlled benchmark
          </p>
          <h3 className="mt-1 text-lg font-semibold">让比较只改变一个因素</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择质量、延迟或成本作为主指标，再混入一条评估数据，观察为什么好看的分数不能证明泛化。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setBenchmark("quality");
            setEvalLeakage(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(benchmarkModes) as BenchmarkId[]).map((id) => (
          <ChoiceButton active={benchmark === id} key={id} onClick={() => setBenchmark(id)}>
            {benchmarkModes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={evalLeakage}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setEvalLeakage(event.target.checked)}
          type="checkbox"
        />
        调参数据混入独立评估集
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="模型基准从样本经过指标和证据形成决策的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-03-benchmark-arrow"
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
            当前基准：{current.label} · 评估边界：{evalLeakage ? "被污染" : "独立"}
          </text>
          {[
            { x: 35, label: "样本", value: current.sample },
            { x: 215, label: "指标", value: current.evidence },
            { x: 395, label: "边界", value: evalLeakage ? "不可解释" : "已隔离" },
            { x: 575, label: "决策", value: evalLeakage ? "阻断并重测" : current.decision },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={evalLeakage && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-03-benchmark-arrow)"
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
            fill={evalLeakage ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={evalLeakage ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {evalLeakage
              ? "观察：评估集被反复调参后，分数不能证明未知样本表现，需新建隔离测试集。"
              : "观察：质量、延迟和成本要在同一任务样本与版本边界下分别记录。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {evalLeakage
          ? "先标记评估污染并停止比较；不要用更复杂的平均数掩盖独立验证已经失效。"
          : `当前基准使用“${current.sample}”，保留“${current.evidence}”来支持“${current.decision}”。`}
      </p>
    </section>
  );
}

type DeploymentId = "hosted" | "selfHosted" | "hybrid";

const deploymentModes: Record<
  DeploymentId,
  { label: string; owner: string; evidence: string; fallback: string }
> = {
  hosted: {
    label: "托管 API",
    owner: "供应商运营",
    evidence: "端点、SLA 与账单",
    fallback: "切换备用端点",
  },
  selfHosted: {
    label: "自托管模型",
    owner: "平台团队",
    evidence: "权重、硬件与许可证",
    fallback: "回退旧权重",
  },
  hybrid: {
    label: "混合路由",
    owner: "路由与合规团队",
    evidence: "数据分类与路由日志",
    fallback: "降级到合规路径",
  },
};

export function Bla03DecisionLab() {
  const [deployment, setDeployment] = useState<DeploymentId>("hosted");
  const [licenseGap, setLicenseGap] = useState(false);
  const current = deploymentModes[deployment];

  return (
    <section
      aria-label="模型部署决策实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-03-deployment-decision"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Deployment decision
          </p>
          <h3 className="mt-1 text-lg font-semibold">把模型选择落到责任与回退</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择托管、自托管或混合路由，再移除许可证或运营证据，观察“能调用”为什么不等于“可发布”。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setDeployment("hosted");
            setLicenseGap(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(deploymentModes) as DeploymentId[]).map((id) => (
          <ChoiceButton active={deployment === id} key={id} onClick={() => setDeployment(id)}>
            {deploymentModes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={licenseGap}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setLicenseGap(event.target.checked)}
          type="checkbox"
        />
        许可证、SLA 或回退证据缺失
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="模型部署从责任主体经过证据和风险后形成回退路径的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-03-deployment-arrow"
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
            当前部署：{current.label} · 证据状态：{licenseGap ? "缺失" : "完整"}
          </text>
          {[
            { x: 35, label: "部署", value: current.label },
            { x: 215, label: "责任", value: current.owner },
            { x: 395, label: "证据", value: licenseGap ? "需要补证" : current.evidence },
            { x: 575, label: "回退", value: licenseGap ? "暂停发布" : current.fallback },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={licenseGap && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-03-deployment-arrow)"
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
            fill={licenseGap ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={licenseGap ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {licenseGap
              ? "观察：许可证、SLA 或回退缺失时，先暂停发布并补齐责任边界。"
              : "观察：部署选择同时决定谁承担数据、容量、合规、账单和故障恢复责任。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {licenseGap
          ? "先补齐模型来源、许可证、服务承诺和旧版本回退，再把候选交给发布门禁。"
          : `当前方案由“${current.owner}”负责，保存“${current.evidence}”，故障时“${current.fallback}”。`}
      </p>
    </section>
  );
}
