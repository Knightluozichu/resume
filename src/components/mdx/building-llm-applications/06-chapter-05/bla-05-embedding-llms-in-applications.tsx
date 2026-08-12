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

type PipelineId = "model" | "prompt" | "data";

const pipelines: Record<
  PipelineId,
  { label: string; input: string; adapter: string; output: string }
> = {
  model: {
    label: "模型适配",
    input: "端点与版本",
    adapter: "统一调用接口",
    output: "可替换模型",
  },
  prompt: {
    label: "提示模板",
    input: "任务与格式",
    adapter: "版本化模板",
    output: "可回归提示",
  },
  data: {
    label: "数据连接",
    input: "来源与权限",
    adapter: "查询与引用",
    output: "有来源回答",
  },
};

export function Bla05PipelineLab() {
  const [pipeline, setPipeline] = useState<PipelineId>("model");
  const [missingAdapter, setMissingAdapter] = useState(false);
  const current = pipelines[pipeline];

  return (
    <section
      aria-label="LLM 应用嵌入管线实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-05-embedding-pipeline"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">
            Embedding pipeline
          </p>
          <h3 className="mt-1 text-lg font-semibold">先隔离适配器，再把模型放进应用</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            切换模型、提示或数据连接，再移除一层适配器，观察为什么直接把 SDK 细节散落到业务代码会难以回退。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setPipeline("model");
            setMissingAdapter(false);
          }}
        />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(pipelines) as PipelineId[]).map((id) => (
          <ChoiceButton active={pipeline === id} key={id} onClick={() => setPipeline(id)}>
            {pipelines[id].label}
          </ChoiceButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={missingAdapter}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setMissingAdapter(event.target.checked)}
          type="checkbox"
        />
        删除适配器或版本合同
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="应用输入经过适配器形成可回退输出的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker id="bla-05-pipeline-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7">
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前嵌入：{current.label} · 合同：{missingAdapter ? "缺失" : "存在"}
          </text>
          {[
            { x: 35, label: "输入", value: current.input },
            { x: 215, label: "适配", value: missingAdapter ? "直接耦合" : current.adapter },
            { x: 395, label: "证据", value: missingAdapter ? "无法回放" : "版本与日志" },
            { x: 575, label: "输出", value: missingAdapter ? "暂停发布" : current.output },
          ].map((node, index, nodes) => (
            <g key={node.label}>
              <rect fill="var(--surface)" height="106" rx="12" stroke={missingAdapter && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>
              {index < nodes.length - 1 ? <line markerEnd="url(#bla-05-pipeline-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}
            </g>
          ))}
          <rect fill={missingAdapter ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={missingAdapter ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {missingAdapter ? "观察：没有合同就无法隔离 SDK、版本或数据差异，先阻断并补齐适配层。" : "观察：适配器把外部模型、模板和数据变化留在可比较的边界内。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {missingAdapter ? "先记录版本和请求差异，再决定是否切换；不要让业务代码直接依赖不可回退的默认值。" : `当前路径把“${current.input}”经过“${current.adapter}”变成“${current.output}”。`}
      </p>
    </section>
  );
}

type StateId = "memory" | "chain" | "agent";

const states: Record<StateId, { label: string; graph: string; owner: string; stop: string }> = {
  memory: { label: "记忆", graph: "请求 → 摘要 → 下一轮", owner: "会话边界", stop: "到期清理" },
  chain: { label: "链", graph: "步骤 A → 步骤 B", owner: "流程作者", stop: "末步完成" },
  agent: { label: "Agent", graph: "目标 ⇄ 工具", owner: "权限策略", stop: "步数或预算" },
};

export function Bla05StateLab() {
  const [state, setState] = useState<StateId>("memory");
  const [stateLeak, setStateLeak] = useState(false);
  const current = states[state];

  return (
    <section
      aria-label="记忆链与 Agent 状态实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-05-state-boundary"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">State boundary</p>
          <h3 className="mt-1 text-lg font-semibold">记忆和编排必须有生命周期</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">选择记忆、链或 Agent，再让状态跨越租户或会话，观察为什么上下文方便性不能超过数据边界。</p>
        </div>
        <ResetButton onClick={() => { setState("memory"); setStateLeak(false); }} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(states) as StateId[]).map((id) => <ChoiceButton active={state === id} key={id} onClick={() => setState(id)}>{states[id].label}</ChoiceButton>)}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={stateLeak} className="size-4 accent-[var(--accent)]" onChange={(event) => setStateLeak(event.target.checked)} type="checkbox" />
        状态跨越会话或租户边界
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="状态经过调用图和生命周期形成安全结果的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-05-state-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前模式：{current.label} · 状态：{stateLeak ? "越界" : "隔离"}</text>
          {[
            { x: 35, label: "状态", value: current.graph },
            { x: 215, label: "所有者", value: current.owner },
            { x: 395, label: "边界", value: stateLeak ? "需清理" : "已隔离" },
            { x: 575, label: "停止", value: stateLeak ? "阻断请求" : current.stop },
          ].map((node, index, nodes) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={stateLeak && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-05-state-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}
          <rect fill={stateLeak ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={stateLeak ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{stateLeak ? "观察：跨界状态会泄露上下文或造成错误动作，先停止并清除共享状态。" : "观察：状态所有者、生命周期和停止条件让多步调用可审计、可回放。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{stateLeak ? "先隔离租户、撤销共享上下文并记录影响范围，再恢复服务。" : `当前模式由“${current.owner}”负责，使用“${current.stop}”结束。`}</p>
    </section>
  );
}

type HubId = "token" | "env" | "open";

const hubModes: Record<HubId, { label: string; input: string; guard: string; output: string }> = {
  token: { label: "创建令牌", input: "账号与权限", guard: "最小 scope", output: "可撤销访问" },
  env: { label: ".env 管理", input: "本地配置", guard: "忽略与轮换", output: "不进仓库" },
  open: { label: "使用开源模型", input: "权重与许可", guard: "硬件与版本", output: "可控推理" },
};

export function Bla05HubLab() {
  const [hub, setHub] = useState<HubId>("token");
  const [secretLeak, setSecretLeak] = useState(false);
  const current = hubModes[hub];

  return (
    <section
      aria-label="Hugging Face Hub 密钥与开源模型实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-05-hub-secrets"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Hub and secrets</p>
          <h3 className="mt-1 text-lg font-semibold">凭证、权重和配置都要可撤销</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">切换令牌、.env 或开源模型路径，再把秘密配置暴露到日志或仓库，观察为什么“能运行”不等于安全交付。</p>
        </div>
        <ResetButton onClick={() => { setHub("token"); setSecretLeak(false); }} />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(hubModes) as HubId[]).map((id) => <ChoiceButton active={hub === id} key={id} onClick={() => setHub(id)}>{hubModes[id].label}</ChoiceButton>)}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input checked={secretLeak} className="size-4 accent-[var(--accent)]" onChange={(event) => setSecretLeak(event.target.checked)} type="checkbox" />
        秘密或令牌出现在日志、仓库或客户端
      </label>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg aria-label="Hub 资源经过权限和秘密保护形成可撤销结果的流程图" className="h-auto min-w-[680px] w-full" role="img" viewBox="0 0 760 330">
          <defs><marker id="bla-05-hub-arrow" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="6" refY="3.5" viewBox="0 0 7 7"><path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" /></marker></defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">当前路径：{current.label} · 秘密状态：{secretLeak ? "暴露" : "受保护"}</text>
          {[
            { x: 35, label: "输入", value: current.input },
            { x: 215, label: "保护", value: secretLeak ? "立即撤销" : current.guard },
            { x: 395, label: "证据", value: secretLeak ? "泄露范围" : "审计与轮换" },
            { x: 575, label: "输出", value: secretLeak ? "暂停使用" : current.output },
          ].map((node, index, nodes) => <g key={node.label}><rect fill="var(--surface)" height="106" rx="12" stroke={secretLeak && index >= 1 ? "var(--danger)" : "var(--border)"} strokeWidth="2" width="145" x={node.x} y="92" /><text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">{node.label}</text><text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">{node.value}</text>{index < nodes.length - 1 ? <line markerEnd="url(#bla-05-hub-arrow)" stroke="var(--accent)" strokeWidth="2" x1={node.x + 145} x2={nodes[index + 1].x - 12} y1="145" y2="145" /> : null}</g>)}
          <rect fill={secretLeak ? "var(--danger-soft)" : "var(--surface)"} height="55" rx="10" stroke={secretLeak ? "var(--danger)" : "var(--border)"} width="680" x="35" y="240" />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">{secretLeak ? "观察：先撤销和轮换泄露凭证，再清理日志、历史和客户端缓存。" : "观察：令牌 scope、配置注入、权重许可和版本记录共同构成安全交付。"}</text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">{secretLeak ? "先按泄露流程处理并记录范围，不要只删除工作区文件就继续运行。" : `当前路径以“${current.guard}”保护“${current.input}”，得到“${current.output}”。`}</p>
    </section>
  );
}
