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

function ModeButton({
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
      className={`${BUTTON_CLASS} ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type ModalityMode = "inspect" | "transcribe" | "generate";

const modalityModes: Record<
  ModalityMode,
  { label: string; input: string; check: string; model: string; output: string }
> = {
  inspect: { label: "检查输入", input: "文件类型", check: "尺寸与指纹", model: "选择模型", output: "可处理" },
  transcribe: { label: "转写音频", input: "音频片段", check: "语言与时间戳", model: "Whisper", output: "带时间文本" },
  generate: { label: "生成图像", input: "文字提示", check: "安全与版权", model: "DALL·E", output: "带来源图像" },
};

export function Bla10ModalityLab() {
  const [mode, setMode] = useState<ModalityMode>("inspect");
  const [damaged, setDamaged] = useState(false);
  const current = modalityModes[mode];
  const nodes = [
    { x: 35, label: "输入", value: damaged ? "损坏文件" : current.input },
    { x: 215, label: "校验", value: damaged ? "拒绝" : current.check },
    { x: 395, label: "模型", value: damaged ? "不调用" : current.model },
    { x: 575, label: "产物", value: damaged ? "错误记录" : current.output },
  ];

  return (
    <section
      aria-label="多模态输入校验实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-10-modality-contract"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Modality contract</p>
          <h3 className="mt-1 text-lg font-semibold">先确认模态，再调用模型</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择文件检查、音频转写或图像生成，再注入损坏输入，观察系统为什么应在模型调用前停止。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("inspect");
            setDamaged(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(modalityModes) as ModalityMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {modalityModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={damaged}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setDamaged(event.target.checked)}
          type="checkbox"
        />
        注入格式错误或过大的文件
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="多模态输入从文件校验经过模型进入带来源产物的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-10-modality-arrow"
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
            当前路径：{current.label} · 输入：{damaged ? "不可信" : "已验证"}
          </text>
          {nodes.map((node, index) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={damaged && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-10-modality-arrow)"
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
            fill={damaged ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={damaged ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {damaged
              ? "观察：在模型前记录拒绝原因、文件指纹和用户可修复的下一步。"
              : "观察：模态、格式、大小和来源共同决定模型是否可以安全接收输入。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {damaged
          ? "先返回可解释的输入错误，不让模型把缺失或损坏的内容补写成事实。"
          : `当前路径用“${current.check}”保护“${current.output}”。`}
      </p>
    </section>
  );
}

type OrchestrationMode = "toolkit" | "agent" | "chain";

const orchestrationModes: Record<
  OrchestrationMode,
  { label: string; planner: string; tools: string; control: string; output: string }
> = {
  toolkit: { label: "现成工具包", planner: "固定接口", tools: "内置能力", control: "配置边界", output: "快速原型" },
  agent: { label: "单工具 Agent", planner: "模型选择", tools: "一个工具", control: "权限与步数", output: "可观察调用" },
  chain: { label: "顺序链", planner: "预定步骤", tools: "多阶段工具", control: "显式分支", output: "稳定回放" },
};

export function Bla10OrchestrationLab() {
  const [mode, setMode] = useState<OrchestrationMode>("toolkit");
  const [toolFailure, setToolFailure] = useState(false);
  const current = orchestrationModes[mode];
  const nodes = [
    { x: 35, label: "规划", value: current.planner },
    { x: 215, label: "工具", value: toolFailure ? "失败" : current.tools },
    { x: 395, label: "控制", value: toolFailure ? "回退" : current.control },
    { x: 575, label: "输出", value: toolFailure ? "降级" : current.output },
  ];

  return (
    <section
      aria-label="多模态工具编排实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-10-orchestration-map"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Orchestration map</p>
          <h3 className="mt-1 text-lg font-semibold">工具越多，控制面越要显式</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            对比现成工具包、单工具 Agent 和顺序链，再让一次工具调用失败，观察三种方案的降级边界。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("toolkit");
            setToolFailure(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(orchestrationModes) as OrchestrationMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {orchestrationModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={toolFailure}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setToolFailure(event.target.checked)}
          type="checkbox"
        />
        让音频、视频或图像工具返回失败
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="多模态应用从规划经过工具和控制进入输出或降级的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-10-orchestration-arrow"
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
            当前编排：{current.label} · 工具：{toolFailure ? "失败" : "可用"}
          </text>
          {nodes.map((node, index) => (
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
                  markerEnd="url(#bla-10-orchestration-arrow)"
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
              ? "观察：工具失败要带请求 ID、重试策略和降级结果，不能让模型默默改走未知路径。"
              : "观察：工具选择、权限、最大步数和回退一起构成编排的控制面。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {toolFailure
          ? "保留失败原因并切换到人工、缓存或无工具回答；不要伪造音频转写或图像结果。"
          : `当前方案以“${current.control}”约束“${current.tools}”。`}
      </p>
    </section>
  );
}

type ReviewMode = "invoice" | "media" | "creative";

const reviewModes: Record<
  ReviewMode,
  { label: string; source: string; check: string; record: string; decision: string }
> = {
  invoice: { label: "发票分析", source: "扫描图像", check: "金额与税额", record: "框与置信度", decision: "人工确认" },
  media: { label: "视频转写", source: "视频与音频", check: "语言与时间戳", record: "片段指纹", decision: "可检索" },
  creative: { label: "图像生成", source: "提示与参考", check: "安全与版权", record: "模型与种子", decision: "可回放" },
};

export function Bla10ReviewLab() {
  const [mode, setMode] = useState<ReviewMode>("invoice");
  const [lowConfidence, setLowConfidence] = useState(false);
  const current = reviewModes[mode];
  const nodes = [
    { x: 35, label: "来源", value: current.source },
    { x: 215, label: "检查", value: lowConfidence ? "低置信度" : current.check },
    { x: 395, label: "记录", value: current.record },
    { x: 575, label: "决定", value: lowConfidence ? "暂停" : current.decision },
  ];

  return (
    <section
      aria-label="多模态产物复核实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-10-artifact-review"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Artifact review</p>
          <h3 className="mt-1 text-lg font-semibold">最终答案之前先看证据</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择发票、视频或图像生成，再降低输入置信度，观察复核记录如何决定自动通过、暂停或回退。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("invoice");
            setLowConfidence(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(reviewModes) as ReviewMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {reviewModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={lowConfidence}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setLowConfidence(event.target.checked)}
          type="checkbox"
        />
        降低识别或生成置信度
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="多模态来源经过质量检查和产物记录进入发布决策的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-10-review-arrow"
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
            当前案例：{current.label} · 置信度：{lowConfidence ? "低" : "足够"}
          </text>
          {nodes.map((node, index) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={lowConfidence && index >= 1 ? "var(--danger)" : "var(--border)"}
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
                  markerEnd="url(#bla-10-review-arrow)"
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
            fill={lowConfidence ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={lowConfidence ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {lowConfidence
              ? "观察：低置信度结果进入人工复核，并保留模态来源、版本和证据，不直接发布。"
              : "观察：来源、质量检查和产物记录让自动通过拥有可回看的理由。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {lowConfidence
          ? "先暂停自动动作，显示待确认字段或片段；复核完成后再将决定写入发布记录。"
          : `当前案例把“${current.check}”写入“${current.record}”。`}
      </p>
    </section>
  );
}
