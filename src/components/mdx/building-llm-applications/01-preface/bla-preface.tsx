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

type EnvironmentId = "minimal" | "retrieval" | "tools";

const environments: Record<
  EnvironmentId,
  { label: string; input: string; evidence: string; owner: string; result: string }
> = {
  minimal: {
    label: "最小调用",
    input: "任务、模型、提示",
    evidence: "原始请求与输出",
    owner: "学习者",
    result: "可重放基线",
  },
  retrieval: {
    label: "接入检索",
    input: "任务与知识快照",
    evidence: "来源、切块与引用",
    owner: "数据负责人",
    result: "带来源回答",
  },
  tools: {
    label: "接入工具",
    input: "任务与权限",
    evidence: "参数、回执与日志",
    owner: "工具负责人",
    result: "受控动作",
  },
};

export function BlaPrefaceEnvironmentLab() {
  const [environmentId, setEnvironmentId] = useState<EnvironmentId>("minimal");
  const [versionDrift, setVersionDrift] = useState(false);
  const environment = environments[environmentId];

  return (
    <section
      aria-label="Preface 环境合同实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-preface-environment-contract"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Environment contract
          </p>
          <h3 className="mt-1 text-lg font-semibold">先固定环境，再启动第一个样例</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            逐步加入检索或工具，并观察版本漂移为何会破坏“同样输入得到同样判断”。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setEnvironmentId("minimal");
            setVersionDrift(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(environments) as EnvironmentId[]).map((id) => (
          <ChoiceButton
            active={environmentId === id}
            key={id}
            onClick={() => setEnvironmentId(id)}
          >
            {environments[id].label}
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
        换一版依赖或模型默认值
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="环境经过请求和证据后启动应用的流程"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-preface-environment-arrow"
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
            当前环境：{environment.label} · 责任主体：{environment.owner}
          </text>
          {[
            { x: 35, label: "输入", value: environment.input },
            { x: 215, label: "版本", value: versionDrift ? "发生漂移" : "已锁定" },
            { x: 395, label: "证据", value: environment.evidence },
            { x: 575, label: "结果", value: versionDrift ? "需重测" : environment.result },
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
                  markerEnd="url(#bla-preface-environment-arrow)"
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
              ? "环境已变：不能沿用旧输出，先记录差异并重跑基线。"
              : "通过条件：环境、请求、证据和结果能由另一个人重新取得。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {versionDrift
          ? "观察：依赖或模型变化不是小注释，而是需要重新验证的输入变量。"
          : `观察：${environment.label}交付“${environment.evidence}”，得到“${environment.result}”。`}
      </p>
    </section>
  );
}

type ResourceId = "docs" | "code" | "support";

const resources: Record<
  ResourceId,
  { label: string; artifact: string; check: string; risk: string }
> = {
  docs: {
    label: "文档资源",
    artifact: "版本化文档与引用",
    check: "来源与有效期",
    risk: "引用过期",
  },
  code: {
    label: "代码资源",
    artifact: "仓库与依赖锁",
    check: "提交与测试",
    risk: "依赖漂移",
  },
  support: {
    label: "支持资源",
    artifact: "问题模板与求助渠道",
    check: "复现信息完整",
    risk: "无法复现",
  },
};

export function BlaPrefaceResourceLab() {
  const [resourceId, setResourceId] = useState<ResourceId>("docs");
  const [artifactMissing, setArtifactMissing] = useState(false);
  const resource = resources[resourceId];

  return (
    <section
      aria-label="Preface 配套资源实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-preface-resource-contract"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Resource contract
          </p>
          <h3 className="mt-1 text-lg font-semibold">配套资源也需要验收条件</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择文档、代码或支持资源，再移除一项证据，观察求助或复刻为什么会停住。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setResourceId("docs");
            setArtifactMissing(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(resources) as ResourceId[]).map((id) => (
          <ChoiceButton active={resourceId === id} key={id} onClick={() => setResourceId(id)}>
            {resources[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={artifactMissing}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setArtifactMissing(event.target.checked)}
          type="checkbox"
        />
        删除一项配套证据
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="资源对象、校验方式和风险的矩阵"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前资源：{resource.label} · 校验：{resource.check}
          </text>
          <text fill="var(--muted)" fontSize="11" x="50" y="72">
            资源对象
          </text>
          <text fill="var(--muted)" fontSize="11" x="285" y="72">
            交付证据
          </text>
          <text fill="var(--muted)" fontSize="11" x="550" y="72">
            缺失风险
          </text>
          {[
            { y: 95, label: "对象", value: resource.artifact },
            { y: 153, label: "校验", value: artifactMissing ? "未提供" : resource.check },
            { y: 211, label: "结论", value: artifactMissing ? "暂停求助" : "可交接" },
          ].map((row) => (
            <g key={row.label}>
              <rect fill="var(--surface)" height="42" rx="8" stroke="var(--border)" width="180" x="35" y={row.y} />
              <text fill="var(--accent)" fontSize="12" fontWeight="700" x="52" y={row.y + 26}>
                {row.label}
              </text>
              <rect
                fill={row.label === "校验" && artifactMissing ? "var(--danger-soft)" : "var(--surface)"}
                height="42"
                rx="8"
                stroke={row.label === "校验" && artifactMissing ? "var(--danger)" : "var(--border)"}
                width="250"
                x="235"
                y={row.y}
              />
              <text fill="var(--text)" fontSize="11" x="250" y={row.y + 26}>
                {row.value}
              </text>
              <rect fill="var(--surface)" height="42" rx="8" stroke="var(--border)" width="220" x="515" y={row.y} />
              <text fill="var(--text)" fontSize="11" x="530" y={row.y + 26}>
                {row.label === "结论" && artifactMissing ? resource.risk : "继续推进"}
              </text>
            </g>
          ))}
          <rect
            fill={artifactMissing ? "var(--danger-soft)" : "var(--surface)"}
            height="43"
            rx="9"
            stroke={artifactMissing ? "var(--danger)" : "var(--border)"}
            width="700"
            x="35"
            y="273"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="385" y="300">
            {artifactMissing
              ? "资源不完整：先补交付物和校验方法，再把问题交给下一责任主体。"
              : "通过条件：资源、校验、求助路径和风险说明彼此可追溯。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {artifactMissing
          ? "观察：配套资源不是附赠链接；缺少校验信息就不能承诺可复刻。"
          : `观察：${resource.label}提供“${resource.artifact}”，并用“${resource.check}”验收。`}
      </p>
    </section>
  );
}

type SupportId = "question" | "bug" | "migration";

const supportPaths: Record<
  SupportId,
  { label: string; report: string; next: string; owner: string }
> = {
  question: {
    label: "概念问题",
    report: "问题、章节和最小例子",
    next: "定位材料",
    owner: "学习者与文档维护者",
  },
  bug: {
    label: "运行问题",
    report: "版本、日志和复现步骤",
    next: "隔离故障",
    owner: "实现者与复核者",
  },
  migration: {
    label: "迁移问题",
    report: "历史行为与当前差异",
    next: "重新测试",
    owner: "维护者",
  },
};

export function BlaPrefaceSupportLab() {
  const [supportId, setSupportId] = useState<SupportId>("question");
  const [reproMissing, setReproMissing] = useState(false);
  const path = supportPaths[supportId];

  return (
    <section
      aria-label="Preface 求助与迁移实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-preface-support-loop"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Support loop
          </p>
          <h3 className="mt-1 text-lg font-semibold">一个好问题如何变成可行动的求助</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择概念、运行或迁移问题，再隐藏复现信息，观察支持流程何时可以继续。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setSupportId("question");
            setReproMissing(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(supportPaths) as SupportId[]).map((id) => (
          <ChoiceButton active={supportId === id} key={id} onClick={() => setSupportId(id)}>
            {supportPaths[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={reproMissing}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setReproMissing(event.target.checked)}
          type="checkbox"
        />
        隐藏版本或复现步骤
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="问题报告、复现、解答和下一步的支持闭环"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-preface-support-arrow"
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
            当前路径：{path.label} · 责任主体：{path.owner}
          </text>
          {[
            { x: 35, label: "报告", value: path.report },
            { x: 215, label: "复现", value: reproMissing ? "信息不足" : "同版本重跑" },
            { x: 395, label: "解答", value: reproMissing ? "等待补充" : "定位原因" },
            { x: 575, label: "下一步", value: reproMissing ? "补齐资料" : path.next },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={reproMissing && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-preface-support-arrow)"
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
            fill={reproMissing ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={reproMissing ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {reproMissing
              ? "复现信息不足：支持者不能可靠定位，先补版本、日志和最小输入。"
              : "通过条件：报告、复现、解答和下一步都留下可交接的信息。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {reproMissing
          ? "观察：求助不是把错误转给别人，而是提供足够信息让另一人能从同一状态开始。"
          : `观察：${path.label}先提交“${path.report}”，再进入“${path.next}”。`}
      </p>
    </section>
  );
}
