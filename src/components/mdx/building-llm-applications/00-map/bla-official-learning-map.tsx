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
        active
          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
          : ""
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type RouteId = "prompt" | "retrieval" | "agent";

const routes: Record<
  RouteId,
  { label: string; input: string; middle: string; output: string; owner: string }
> = {
  prompt: {
    label: "提示路线",
    input: "任务合同",
    middle: "模型与模板",
    output: "结构化回答",
    owner: "提示与评测负责人",
  },
  retrieval: {
    label: "检索路线",
    input: "问题与权限",
    middle: "索引与重排",
    output: "带来源回答",
    owner: "数据与检索负责人",
  },
  agent: {
    label: "工具路线",
    input: "目标与工具白名单",
    middle: "计划与执行",
    output: "动作与回执",
    owner: "工具与安全负责人",
  },
};

export function BlaLearningMapRouteLab() {
  const [routeId, setRouteId] = useState<RouteId>("prompt");
  const [invalidInput, setInvalidInput] = useState(false);
  const route = routes[routeId];

  return (
    <section
      aria-label="Building LLM 应用学习路线实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-learning-map-route"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Route selection
          </p>
          <h3 className="mt-1 text-lg font-semibold">先选问题边界，再选 LLM 路线</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            路线不是框架清单；它由输入、责任主体、中间证据和输出共同决定。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setRouteId("prompt");
            setInvalidInput(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(routes) as RouteId[]).map((id) => (
          <ChoiceButton active={routeId === id} key={id} onClick={() => setRouteId(id)}>
            {routes[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={invalidInput}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setInvalidInput(event.target.checked)}
          type="checkbox"
        />
        让输入缺少成功标准
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="任务输入经过模型路线和证据后形成应用输出"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-learning-map-route-arrow"
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
            当前路线：{route.label} · 责任主体：{route.owner}
          </text>
          {[
            { x: 35, label: "输入合同", value: invalidInput ? "标准缺失" : route.input },
            { x: 215, label: "模型层", value: route.middle },
            { x: 395, label: "观察证据", value: invalidInput ? "无法判断" : "输出与约束" },
            { x: 575, label: "应用输出", value: invalidInput ? "拒绝发布" : route.output },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={invalidInput && index >= 2 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-learning-map-route-arrow)"
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
            fill={invalidInput ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={invalidInput ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {invalidInput
              ? "缺少成功标准：路线不能证明结果是否满足任务合同。"
              : "通过条件：输入、模型、证据和输出由同一任务合同连接。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {invalidInput
          ? "观察：模型能生成文字，不代表应用已经知道什么叫成功；先补任务合同。"
          : `观察：${route.label}把“${route.input}”交给“${route.owner}”，输出为“${route.output}”。`}
      </p>
    </section>
  );
}

type EvaluationId = "quality" | "safety" | "cost";

const evaluations: Record<
  EvaluationId,
  { label: string; measure: string; evidence: string; failure: string }
> = {
  quality: {
    label: "质量",
    measure: "任务正确率",
    evidence: "逐样本判定",
    failure: "答案格式正确但事实不受来源支持",
  },
  safety: {
    label: "安全",
    measure: "拒绝与越权",
    evidence: "攻击样本与权限日志",
    failure: "工具参数越过白名单",
  },
  cost: {
    label: "成本",
    measure: "延迟与令牌",
    evidence: "分位延迟与请求账本",
    failure: "平均值掩盖尾部超预算",
  },
};

export function BlaLearningMapEvaluationLab() {
  const [evaluationId, setEvaluationId] = useState<EvaluationId>("quality");
  const [leakage, setLeakage] = useState(false);
  const evaluation = evaluations[evaluationId];

  return (
    <section
      aria-label="LLM 应用评测证据实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-learning-map-evaluation"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Evaluation contract
          </p>
          <h3 className="mt-1 text-lg font-semibold">平均分之外，还要看什么？</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            切换评测目标，再注入一次训练/测试泄漏，观察证据如何失效。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setEvaluationId("quality");
            setLeakage(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(evaluations) as EvaluationId[]).map((id) => (
          <ChoiceButton active={evaluationId === id} key={id} onClick={() => setEvaluationId(id)}>
            {evaluations[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={leakage}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setLeakage(event.target.checked)}
          type="checkbox"
        />
        把未来样本泄漏进评测集
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="评测目标、测量方式和证据记录矩阵"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前目标：{evaluation.label} · 测量：{evaluation.measure}
          </text>
          <text fill="var(--muted)" fontSize="11" x="50" y="72">
            测量对象
          </text>
          <text fill="var(--muted)" fontSize="11" x="285" y="72">
            证据记录
          </text>
          <text fill="var(--muted)" fontSize="11" x="550" y="72">
            失效信号
          </text>
          {[
            { y: 95, label: "目标", value: evaluation.measure },
            { y: 153, label: "证据", value: leakage ? "污染的评测集" : evaluation.evidence },
            { y: 211, label: "结论", value: leakage ? "不可归因" : "可比较" },
          ].map((row) => (
            <g key={row.label}>
              <rect fill="var(--surface)" height="42" rx="8" stroke="var(--border)" width="180" x="35" y={row.y} />
              <text fill="var(--accent)" fontSize="12" fontWeight="700" x="52" y={row.y + 26}>
                {row.label}
              </text>
              <rect
                fill={row.label === "证据" && leakage ? "var(--danger-soft)" : "var(--surface)"}
                height="42"
                rx="8"
                stroke={row.label === "证据" && leakage ? "var(--danger)" : "var(--border)"}
                width="250"
                x="235"
                y={row.y}
              />
              <text fill="var(--text)" fontSize="11" x="250" y={row.y + 26}>
                {row.value}
              </text>
              <rect fill="var(--surface)" height="42" rx="8" stroke="var(--border)" width="220" x="515" y={row.y} />
              <text fill="var(--text)" fontSize="11" x="530" y={row.y + 26}>
                {row.label === "结论" && leakage ? evaluation.failure : row.label === "结论" ? "满足门禁" : "继续观察"}
              </text>
            </g>
          ))}
          <rect
            fill={leakage ? "var(--danger-soft)" : "var(--surface)"}
            height="43"
            rx="9"
            stroke={leakage ? "var(--danger)" : "var(--border)"}
            width="700"
            x="35"
            y="273"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="385" y="300">
            {leakage
              ? "发现泄漏：重新切分数据并重跑冻结回归集，不能沿用污染分数。"
              : "通过条件：测量、样本、证据和预算在同一版本合同中可追溯。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {leakage
          ? "观察：评测分数再高也可能是污染产物；先修数据边界，再解释模型质量。"
          : `观察：${evaluation.label}需要“${evaluation.evidence}”，不能只看一个平均数。`}
      </p>
    </section>
  );
}

type ReleaseStage = "baseline" | "migration" | "monitor";

const releaseStages: Record<
  ReleaseStage,
  { label: string; artifact: string; owner: string; next: string }
> = {
  baseline: {
    label: "基线冻结",
    artifact: "任务、样本、模型、提示与版本",
    owner: "实现者",
    next: "受控对照",
  },
  migration: {
    label: "迁移复测",
    artifact: "当前替代、差异与重新测试",
    owner: "复核者",
    next: "上线决策",
  },
  monitor: {
    label: "上线监控",
    artifact: "质量、安全、延迟、成本与回退",
    owner: "发布负责人",
    next: "回滚或继续",
  },
};

export function BlaLearningMapReleaseLab() {
  const [stage, setStage] = useState<ReleaseStage>("baseline");
  const [missingEvidence, setMissingEvidence] = useState(false);
  const current = releaseStages[stage];
  const ready = stage === "monitor" && !missingEvidence;

  return (
    <section
      aria-label="LLM 应用发布门禁实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-learning-map-release"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Release contract
          </p>
          <h3 className="mt-1 text-lg font-semibold">从实验到发布，谁接手证据？</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            沿基线、迁移、监控三个阶段前进，并移除一项交接证据观察门禁。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setStage("baseline");
            setMissingEvidence(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(releaseStages) as ReleaseStage[]).map((id) => (
          <ChoiceButton active={stage === id} key={id} onClick={() => setStage(id)}>
            {releaseStages[id].label}
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
        删除当前阶段的一项证据
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="基线冻结、迁移复测和上线监控的发布交接流程"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-learning-map-release-arrow"
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
            当前阶段：{current.label} · 负责人：{current.owner}
          </text>
          {[
            { x: 35, label: "基线", value: "版本与样本" },
            { x: 215, label: "迁移", value: "差异与复测" },
            { x: 395, label: "监控", value: "线上信号" },
            { x: 575, label: "决策", value: ready ? "允许发布" : "等待证据" },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={index === (stage === "baseline" ? 0 : stage === "migration" ? 1 : 2) ? "var(--accent)" : missingEvidence && index >= 2 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-learning-map-release-arrow)"
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
              ? "交接暂停：缺少证据时只能回补当前阶段，不能把未知风险传给发布负责人。"
              : "通过条件：基线、迁移、监控和回退路径由同一版本合同串联。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {missingEvidence
          ? "观察：发布不是最后一次点击，而是责任主体确认证据后才发生的交接。"
          : `观察：${current.label}交付“${current.artifact}”，下一步是“${current.next}”。`}
      </p>
    </section>
  );
}
