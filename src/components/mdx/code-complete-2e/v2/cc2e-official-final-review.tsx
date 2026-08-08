"use client";

import { useState } from "react";

const PHASES = [
  { label: "需求边界", evidence: "对象、输入、单位和验收窗口", tone: "var(--accent)" },
  { label: "设计职责", evidence: "职责、接口与变化热点", tone: "var(--accent)" },
  { label: "实现轨迹", evidence: "不变量、首差和可回放日志", tone: "var(--accent)" },
  { label: "测试保护", evidence: "正常、边界和单故障样本", tone: "var(--success)" },
  { label: "集成交付", evidence: "版本、依赖和增量合并", tone: "var(--success)" },
  { label: "回退复盘", evidence: "恢复基线与下一条行动", tone: "var(--warning)" },
] as const;

const TRACE_STAGES = ["边界", "职责", "实现", "测试", "交付"] as const;

const GATES = [
  { label: "范围", detail: "变更对象与不变条件已写清" },
  { label: "证据", detail: "每一步都有可观察状态" },
  { label: "反例", detail: "至少一个边界或故障能拒绝结论" },
  { label: "恢复", detail: "从同一快照能重建基线" },
] as const;

function ActionButton({
  active = false,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-control border px-3 py-1.5 text-xs transition-colors"
      style={{
        borderColor: active ? "var(--accent)" : "var(--border)",
        color: active ? "var(--accent)" : "var(--text-secondary)",
        background: active ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
      }}
    >
      {children}
    </button>
  );
}

function LabFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated" data-visual-kind="cc2e-final-review">
      <div className="border-b border-border px-4 py-3">
        <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {title}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function Cc2eOfficialFinalReviewContractLab() {
  const [activePhase, setActivePhase] = useState(0);

  const reset = () => setActivePhase(0);

  return (
    <LabFrame title="复习合同：每一段都要留下可审查证据">
      <svg
        viewBox="0 0 860 300"
        className="w-full"
        role="img"
        aria-label="从需求边界到回退复盘的六段复习合同链"
      >
        <text x="28" y="28" fontSize="15" fontWeight="600" fill="var(--text-primary)">
          一个变更如何穿过六段工程证据
        </text>
        <text x="28" y="49" fontSize="11" fill="var(--text-secondary)">
          点击节点，检查它的输入、状态、输出与验收证据
        </text>
        {PHASES.map((phase, index) => {
          const x = 24 + index * 138;
          const selected = activePhase === index;
          return (
            <g key={phase.label}>
              {index < PHASES.length - 1 && (
                <line
                  x1={x + 112}
                  y1="132"
                  x2={x + 132}
                  y2="132"
                  stroke="var(--border)"
                  strokeWidth="2"
                />
              )}
              <rect
                x={x}
                y="92"
                width="112"
                height="80"
                rx="8"
                fill={selected ? "var(--accent)" : "var(--bg)"}
                fillOpacity={selected ? "0.16" : "1"}
                stroke={selected ? "var(--accent)" : "var(--border)"}
                strokeWidth={selected ? "2" : "1"}
              />
              <circle cx={x + 18} cy="111" r="9" fill={phase.tone} fillOpacity="0.18" stroke={phase.tone} />
              <text x={x + 18} y="115" textAnchor="middle" fontSize="11" fontWeight="700" fill={phase.tone}>
                {index + 1}
              </text>
              <text x={x + 34} y="115" fontSize="12" fontWeight="600" fill="var(--text-primary)">
                {phase.label}
              </text>
              <text x={x + 12} y="141" fontSize="11" fill="var(--text-secondary)">
                {selected ? "正在检查" : "待检查"}
              </text>
              <text x={x + 12} y="158" fontSize="11" fill="var(--text-secondary)">
                {index < 3 ? "输入 → 状态" : "输出 → 复核"}
              </text>
            </g>
          );
        })}
        <rect x="24" y="210" width="812" height="54" rx="8" fill="var(--bg)" stroke="var(--border)" />
        <text x="42" y="233" fontSize="12" fontWeight="600" fill="var(--text-primary)">
          当前节点：{PHASES[activePhase].label}
        </text>
        <text x="42" y="252" fontSize="11" fill="var(--text-secondary)">
          必留证据：{PHASES[activePhase].evidence}。缺失时只记录为“未验收”，不把最后的成功输出倒推成全链路正确。
        </text>
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton active={activePhase === 1} onClick={() => setActivePhase(1)}>推进到设计</ActionButton>
        {PHASES.map((phase, index) => (
          <ActionButton key={phase.label} active={activePhase === index} onClick={() => setActivePhase(index)}>
            {index + 1}. {phase.label}
          </ActionButton>
        ))}
        <ActionButton onClick={reset}>重置</ActionButton>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-secondary">
        当前证据不是评分，而是一个可追问的检查点：谁改变了什么、哪个状态先变、怎样证明恢复后仍是同一条基线。
      </p>
    </LabFrame>
  );
}

export function Cc2eOfficialFinalReviewFailureTraceLab() {
  const [scenario, setScenario] = useState<"baseline" | "fault" | "recovery">("baseline");

  const reset = () => setScenario("baseline");
  const isFault = scenario === "fault";
  const isRecovery = scenario === "recovery";

  return (
    <LabFrame title="首差追踪：故障不能只在发布末端才出现">
      <svg
        viewBox="0 0 820 300"
        className="w-full"
        role="img"
        aria-label="基线、单故障和恢复三种场景的状态轨迹"
      >
        <text x="24" y="28" fontSize="15" fontWeight="600" fill="var(--text-primary)">
          状态轨迹：基线 → 首差 → 恢复
        </text>
        <text x="24" y="49" fontSize="11" fill="var(--text-secondary)">
          选择场景，观察“只凭结果正确”在哪一步失去证据
        </text>
        <line x1="56" y1="132" x2="762" y2="132" stroke="var(--border)" strokeWidth="2" />
        {TRACE_STAGES.map((stage, index) => {
          const x = 72 + index * 172;
          const diverged = isFault && index >= 2;
          const restored = isRecovery && index >= 2;
          const tone = diverged ? "var(--danger)" : restored ? "var(--success)" : "var(--accent)";
          const label = diverged ? (index === 2 ? "首差" : "受影响") : restored ? "恢复" : "通过";
          return (
            <g key={stage}>
              <circle cx={x} cy="132" r="22" fill={tone} fillOpacity="0.14" stroke={tone} strokeWidth="2" />
              <text x={x} y="137" textAnchor="middle" fontSize="12" fontWeight="700" fill={tone}>
                {index + 1}
              </text>
              <text x={x} y="91" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
                {stage}
              </text>
              <text x={x} y="179" textAnchor="middle" fontSize="11" fill={tone}>
                {label}
              </text>
              {index < TRACE_STAGES.length - 1 && (
                <line x1={x + 24} y1="132" x2={x + 148} y2="132" stroke={tone} strokeWidth="2" strokeDasharray={diverged && index >= 2 ? "6 5" : "0"} />
              )}
            </g>
          );
        })}
        <rect x="24" y="213" width="772" height="52" rx="8" fill="var(--bg)" stroke={isFault ? "var(--danger)" : isRecovery ? "var(--success)" : "var(--border)"} />
        <text x="42" y="235" fontSize="12" fontWeight="600" fill="var(--text-primary)">
          {isFault ? "拒绝发布：首差在实现与测试之间，不能被末端绿灯掩盖。" : isRecovery ? "恢复通过：从同一快照重放，状态与基线重新对齐。" : "基线通过：每一段都能从同一输入和规则重算。"}
        </text>
        <text x="42" y="254" fontSize="11" fill="var(--text-secondary)">
          {isFault ? "记录首个偏离、受影响范围和修法；不要删除故障轨迹。" : "证据包括输入、状态、输出、边界与复位后的重放结果。"}
        </text>
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton active={scenario === "baseline"} onClick={() => setScenario("baseline")}>基线</ActionButton>
        <ActionButton active={scenario === "fault"} onClick={() => setScenario("fault")}>单故障</ActionButton>
        <ActionButton active={scenario === "recovery"} onClick={() => setScenario("recovery")}>恢复</ActionButton>
        <ActionButton onClick={reset}>重置</ActionButton>
      </div>
    </LabFrame>
  );
}

export function Cc2eOfficialFinalReviewReleaseGateLab() {
  const [failedGate, setFailedGate] = useState<number | null>(null);

  const reset = () => setFailedGate(null);
  const accepted = failedGate === null;

  return (
    <LabFrame title="发布门：把可交付与“看起来没问题”分开">
      <svg
        viewBox="0 0 820 332"
        className="w-full"
        role="img"
        aria-label="四个发布验收门和最终的接受或回退决定"
      >
        <text x="24" y="28" fontSize="15" fontWeight="600" fill="var(--text-primary)">
          四道门必须同时打开
        </text>
        <text x="24" y="49" fontSize="11" fill="var(--text-secondary)">
          点击一行模拟证据缺口；发布决定应随缺口回退
        </text>
        {GATES.map((gate, index) => {
          const x = 24 + index * 190;
          const failed = failedGate === index;
          const tone = failed ? "var(--danger)" : "var(--success)";
          return (
            <g key={gate.label}>
              <rect x={x} y="90" width="158" height="112" rx="8" fill="var(--bg)" stroke={failed ? "var(--danger)" : "var(--border)"} strokeWidth={failed ? "2" : "1"} />
              <circle cx={x + 25} cy="118" r="12" fill={tone} fillOpacity="0.14" stroke={tone} />
              <text x={x + 25} y="122" textAnchor="middle" fontSize="12" fontWeight="700" fill={tone}>{failed ? "×" : "✓"}</text>
              <text x={x + 46} y="122" fontSize="13" fontWeight="600" fill="var(--text-primary)">{gate.label}门</text>
              <text x={x + 14} y="151" fontSize="11" fill="var(--text-secondary)">{gate.detail}</text>
              <text x={x + 14} y="177" fontSize="11" fill={tone}>{failed ? "缺口：回退" : "证据：齐全"}</text>
            </g>
          );
        })}
        <line x1="24" y1="231" x2="796" y2="231" stroke="var(--border)" />
        <rect x="24" y="248" width="772" height="52" rx="8" fill={accepted ? "var(--success)" : "var(--danger)"} fillOpacity="0.12" stroke={accepted ? "var(--success)" : "var(--danger)"} />
        <text x="42" y="270" fontSize="13" fontWeight="700" fill={accepted ? "var(--success)" : "var(--danger)"}>
          {accepted ? "接受：证据链闭合，可以进入增量交付" : `回退：${GATES[failedGate ?? 0].label}门缺证，先补证据再发布`}
        </text>
        <text x="42" y="289" fontSize="11" fill="var(--text-secondary)">
          发布不是对平均印象投票，而是对范围、轨迹、反例和恢复同时签字。
        </text>
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        {GATES.map((gate, index) => (
          <ActionButton key={gate.label} active={failedGate === index} onClick={() => setFailedGate(failedGate === index ? null : index)}>
            模拟 {gate.label} 缺口
          </ActionButton>
        ))}
        <ActionButton onClick={reset}>重置</ActionButton>
      </div>
    </LabFrame>
  );
}
