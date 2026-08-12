"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-control border border-border px-3 py-2 text-left text-sm text-secondary transition-colors hover:border-accent hover:text-primary";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
    >
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
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={BUTTON_CLASS + (active ? " border-accent bg-accent/10 text-accent" : "")}
    >
      {children}
    </button>
  );
}

const CHECKPOINTS = {
  design: {
    label: "Design",
    input: "Brief / reference",
    output: "比例和约束",
    break: "参考比例漂移",
  },
  asset: {
    label: "Asset",
    input: "Mesh / UV / Material",
    output: "可消费资产",
    break: "拓扑或图像未保存",
  },
  motion: {
    label: "Motion",
    input: "Rig / Action / Track",
    output: "稳定运动",
    break: "权重、循环或轨迹漂移",
  },
  composite: {
    label: "Composite",
    input: "Camera / Light / Pass",
    output: "最终序列",
    break: "光照或输出设置不一致",
  },
} as const;

type Checkpoint = keyof typeof CHECKPOINTS;

export function Bl3FinalReviewDependencyLab() {
  const [checkpoint, setCheckpoint] = useState<Checkpoint>("design");
  const [failure, setFailure] = useState(false);
  const active = CHECKPOINTS[checkpoint];
  const accepted = !failure;

  function reset() {
    setCheckpoint("design");
    setFailure(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-final-review-dependency"
      aria-label={`Blender 全书验收依赖实验：当前检查点${active.label}，输入${active.input}，输出${active.output}；${failure ? `注入失败：${active.break}` : "依赖链正常"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Final Review · 依赖链实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从最终序列反查最早失效的阶段</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一个检查点，再注入该阶段的失败，练习把最终像素追溯到最早的输入和断言。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择检查点</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={checkpoint === "design"} onClick={() => setCheckpoint("design")}>Design</ChoiceButton>
            <ChoiceButton active={checkpoint === "asset"} onClick={() => setCheckpoint("asset")}>Asset</ChoiceButton>
            <ChoiceButton active={checkpoint === "motion"} onClick={() => setCheckpoint("motion")}>Motion</ChoiceButton>
            <ChoiceButton active={checkpoint === "composite"} onClick={() => setCheckpoint("composite")}>Composite</ChoiceButton>
          </div>
          <ChoiceButton active={failure} onClick={() => setFailure((value) => !value)}>{failure ? "移除注入的失败" : "注入当前阶段失败"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前结果：{accepted ? "依赖链可继续" : `应在 ${active.label} 停止签发，并检查${active.break}`}。最终画面通过不代表中间资产通过。
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`依赖链：${active.input}进入${active.label}检查点，输出${active.output}；当前${failure ? `失败，原因是${active.break}` : "通过"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input Asset → Checkpoint → Assertion → Next Stage</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Input</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input}</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本已锁定</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={failure ? "var(--danger)" : "var(--success)"} fillOpacity="0.12" stroke={failure ? "var(--danger)" : "var(--success)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{failure ? "失败注入" : "检查通过"}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill={failure ? "var(--danger)" : "var(--success)"}>{failure ? active.break : "断言成立"}</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={accepted ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={accepted ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Next Stage</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{accepted ? active.output : "停止签发"}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={accepted ? "var(--success)" : "var(--warning)"}>{accepted ? "可继续回放" : "先修复根因"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">最终像素只是链末证据，不能替代阶段门</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每个检查点都要有输入版本、输出文件和失败断言</text>
        </svg>
      </div>
    </section>
  );
}

const EVIDENCE_MODES = {
  normal: { label: "Normal", detail: "主路径样本", signal: "所有断言通过" },
  boundary: { label: "Boundary", detail: "适用范围边界", signal: "指标接近阈值" },
  failure: { label: "Failure", detail: "故意破坏配置", signal: "应定位最早根因" },
} as const;

type EvidenceMode = keyof typeof EVIDENCE_MODES;

export function Bl3FinalReviewEvidenceLab() {
  const [mode, setMode] = useState<EvidenceMode>("normal");
  const [reproduced, setReproduced] = useState(false);
  const [traceable, setTraceable] = useState(false);
  const active = EVIDENCE_MODES[mode];
  const ready = reproduced && traceable;

  function reset() {
    setMode("normal");
    setReproduced(false);
    setTraceable(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-final-review-evidence"
      aria-label={`Blender 全书验收证据实验：${active.label}，${active.detail}，复现${reproduced ? "完成" : "未完成"}，追溯${traceable ? "完成" : "未完成"}；证据包${ready ? "完整" : "不完整"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Final Review · 证据包实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">正常、边界和失败样本缺一不可</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择证据类型，再检查它是否能被另一位读者复现并追溯到具体资产和断言。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`证据包链路：${active.label}样本${active.detail}，信号为${active.signal}；复现${reproduced ? "完成" : "未完成"}，追溯${traceable ? "完成" : "未完成"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Sample → Reproduce → Trace → Decision</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill={mode === "failure" ? "var(--danger)" : "var(--accent)"} fillOpacity="0.12" stroke={mode === "failure" ? "var(--danger)" : "var(--accent)"} strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.signal}</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={reproduced ? "var(--success)" : "var(--bg)"} fillOpacity={reproduced ? 0.12 : 1} stroke={reproduced ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Reproduce</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{reproduced ? "步骤可重放" : "等待复现"}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">环境 / 版本 / 参数</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Trace / Decision</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{traceable ? "资产路径明确" : "缺少追溯"}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "可批准或拒绝" : "不能签发"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">证据的价值是让判断可以被复核，而不是堆截图</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录预期、实际、文件路径、版本与失败恢复</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择证据样本</p>
          <div className="grid grid-cols-3 gap-2">
            <ChoiceButton active={mode === "normal"} onClick={() => setMode("normal")}>Normal</ChoiceButton>
            <ChoiceButton active={mode === "boundary"} onClick={() => setMode("boundary")}>Boundary</ChoiceButton>
            <ChoiceButton active={mode === "failure"} onClick={() => setMode("failure")}>Failure</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={reproduced} onClick={() => setReproduced((value) => !value)}>{reproduced ? "撤销复现检查" : "完成复现检查"}</ChoiceButton>
            <ChoiceButton active={traceable} onClick={() => setTraceable((value) => !value)}>{traceable ? "撤销追溯检查" : "完成追溯检查"}</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前样本：{active.detail}。{ready ? "证据包可以交给另一位读者复核。" : "复现和追溯任一缺失，都只能算观察过，不能算通过。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const RELEASE_STAGES = {
  draft: { label: "Draft", detail: "阶段资产未齐", gate: "补齐章节证据" },
  candidate: { label: "Candidate", detail: "回归场景已跑", gate: "检查全书与输出" },
  release: { label: "Release", detail: "发布包可签发", gate: "锁定版本和校验" },
} as const;

type ReleaseStage = keyof typeof RELEASE_STAGES;

export function Bl3FinalReviewReleaseLab() {
  const [stage, setStage] = useState<ReleaseStage>("draft");
  const [gate, setGate] = useState(false);
  const active = RELEASE_STAGES[stage];
  const ready = stage === "release" && gate;

  function reset() {
    setStage("draft");
    setGate(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-final-review-release"
      aria-label={`Blender 全书发布闸门实验：当前阶段${active.label}，${active.detail}，闸门检查${gate ? "已完成" : "未完成"}；结果${ready ? "可发布" : "不可发布"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Final Review · 发布闸门实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把全书验收变成可签发的发布包</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择发布阶段并执行闸门检查，区分“看起来完成”“候选包”和真正可复现的 Release。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`发布闸门：当前阶段${active.label}，${active.detail}，要求${active.gate}；检查${gate ? "完成" : "未完成"}，${ready ? "允许发布" : "阻止发布"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Coverage → Regression → Evidence → Release</text>
          <rect x="28" y="78" width="174" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Coverage</text>
          <text x="115" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">章节 / 题目 / 导航</text>
          <text x="115" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每项有状态</text>
          <path d="M224 144 H258" stroke="var(--border)" strokeWidth="3" />
          <rect x="270" y="78" width="180" height="132" rx="14" fill={stage === "draft" ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={stage === "draft" ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.gate}</text>
          <path d="M472 144 H506" stroke="var(--border)" strokeWidth="3" />
          <rect x="518" y="78" width="214" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="625" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Release</text>
          <text x="625" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">源 / 证据 / 输出</text>
          <text x="625" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "允许签发" : "阻止签发"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">发布不是“最后一张图”，而是完整的可复现包</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本、资产谱系、回归场景和校验输出都要锁定</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">推进发布阶段</p>
          <div className="grid gap-2">
            <ChoiceButton active={stage === "draft"} onClick={() => setStage("draft")}>Draft：阶段资产</ChoiceButton>
            <ChoiceButton active={stage === "candidate"} onClick={() => setStage("candidate")}>Candidate：回归候选</ChoiceButton>
            <ChoiceButton active={stage === "release"} onClick={() => setStage("release")}>Release：可签发包</ChoiceButton>
          </div>
          <ChoiceButton active={gate} onClick={() => setGate((value) => !value)}>{gate ? "撤销发布闸门检查" : "完成发布闸门检查"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前结果：{ready ? "发布包通过综合验收，可以签发。" : "仍需补齐覆盖、回归、证据或输出校验，不能签发。"}
          </p>
        </div>
      </div>
    </section>
  );
}
