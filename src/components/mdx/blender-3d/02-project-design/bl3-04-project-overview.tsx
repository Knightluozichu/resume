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

const PHASES = {
  preproduction: {
    label: "Preproduction",
    output: "镜头 brief、角色参考、预算与风险",
    gate: "目标、范围和高风险原型已确认",
  },
  production: {
    label: "Production",
    output: "Model、UV、Texture、Rig、Action",
    gate: "资产命名、版本和下游消费者已锁定",
  },
  postproduction: {
    label: "Postproduction",
    output: "Track、灯光、合成、Render 与交付",
    gate: "相机、灯光、输出参数和例外已验收",
  },
} as const;

type PhaseKey = keyof typeof PHASES;

export function Bl3Ch04PhaseGateLab() {
  const [phase, setPhase] = useState<PhaseKey>("preproduction");
  const [gateOpen, setGateOpen] = useState(true);

  function reset() {
    setPhase("preproduction");
    setGateOpen(true);
  }

  const active = PHASES[phase];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch04-phase-gate"
      aria-label="Blender 第四章三阶段项目门实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 4 · 项目治理实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">阶段门决定风险能否向后传播</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择阶段并关闭门，观察哪些未决输出会阻止下一阶段。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <svg viewBox="0 0 760 350" role="img" aria-label={"阶段门实验：当前阶段为" + active.label + "，核心输出为" + active.output + "；阶段门" + (gateOpen ? "已打开" : "已关闭") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Preproduction → Production → Postproduction</text>
          <rect x="34" y="78" width="210" height="126" rx="14" fill={phase === "preproduction" ? "var(--accent)" : "var(--bg)"} fillOpacity={phase === "preproduction" ? 0.14 : 1} stroke={phase === "preproduction" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="139" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Preproduction</text>
          <text x="139" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">目标 / 参考 / 预算</text>
          <text x="139" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">定义问题与边界</text>
          <path d="M258 140 H294" stroke={phase === "preproduction" && gateOpen ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <rect x="306" y="78" width="210" height="126" rx="14" fill={phase === "production" ? "var(--accent)" : "var(--bg)"} fillOpacity={phase === "production" ? 0.14 : 1} stroke={phase === "production" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="411" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Production</text>
          <text x="411" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Model / UV / Rig</text>
          <text x="411" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">交付可消费资产</text>
          <path d="M530 140 H566" stroke={phase === "production" && gateOpen ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <rect x="578" y="78" width="148" height="126" rx="14" fill={phase === "postproduction" ? "var(--accent)" : "var(--bg)"} fillOpacity={phase === "postproduction" ? 0.14 : 1} stroke={phase === "postproduction" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="652" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Postproduction</text>
          <text x="652" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Track / Light</text>
          <text x="652" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Render / 交付</text>
          <rect x="112" y="244" width="536" height="42" rx="21" fill={gateOpen ? "var(--success)" : "var(--danger)"} fillOpacity="0.14" stroke={gateOpen ? "var(--success)" : "var(--danger)"} />
          <text x="380" y="270" textAnchor="middle" fontSize="12" fontWeight="700" fill={gateOpen ? "var(--success)" : "var(--danger)"}>{gateOpen ? "阶段门开放：满足条件后可继续" : "阶段门关闭：风险必须回退处理"}</text>
          <text x="380" y="324" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">当前要求：{active.gate}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变阶段状态</p>
          <div className="grid gap-2">
            <ChoiceButton active={phase === "preproduction"} onClick={() => setPhase("preproduction")}>Preproduction</ChoiceButton>
            <ChoiceButton active={phase === "production"} onClick={() => setPhase("production")}>Production</ChoiceButton>
            <ChoiceButton active={phase === "postproduction"} onClick={() => setPhase("postproduction")}>Postproduction</ChoiceButton>
          </div>
          <ChoiceButton active={gateOpen} onClick={() => setGateOpen((value) => !value)}>{gateOpen ? "关闭阶段门" : "打开阶段门"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label} 的交付是：{active.output}。{gateOpen ? "当前允许继续，但仍需保存验收记录。" : "当前禁止继续，先回到本阶段修复未决风险。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const SHOTS = {
  wide: { label: "远景", duration: "3 秒", resolution: "1920 × 1080", asset: "中等细度模型与 2K 纹理", budget: 36 },
  close: { label: "近景", duration: "12 秒", resolution: "3840 × 2160", asset: "面部拓扑、4K 纹理与完整 Rig", budget: 82 },
} as const;

type ShotKey = keyof typeof SHOTS;

export function Bl3Ch04ScopeBudgetLab() {
  const [shot, setShot] = useState<ShotKey>("wide");
  const [deadline, setDeadline] = useState<"flexible" | "fixed">("flexible");

  function reset() {
    setShot("wide");
    setDeadline("flexible");
  }

  const active = SHOTS[shot];
  const budget = deadline === "fixed" ? Math.max(22, active.budget - 8) : active.budget;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch04-scope-budget"
      aria-label="Blender 第四章镜头范围与预算实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 4 · 范围控制实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">最终镜头决定资产精度</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换远景/近景和截止时间，观察模型、纹理与 Rig 预算如何改变。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变镜头约束</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={shot === "wide"} onClick={() => setShot("wide")}>远景</ChoiceButton>
            <ChoiceButton active={shot === "close"} onClick={() => setShot("close")}>近景</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={deadline === "flexible"} onClick={() => setDeadline("flexible")}>弹性截止</ChoiceButton>
            <ChoiceButton active={deadline === "fixed"} onClick={() => setDeadline("fixed")}>固定截止</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前为{active.label}、{active.duration}、{active.resolution}；建议：{active.asset}。
          </p>
        </div>

        <svg viewBox="0 0 760 300" role="img" aria-label={"范围预算实验：当前为" + active.label + "，时长" + active.duration + "，分辨率" + active.resolution + "，预算指数" + budget + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Shot Brief → Asset Fidelity → Budget</text>
          <rect x="36" y="72" width="188" height="124" rx="14" fill="var(--bg)" stroke={shot === "wide" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="130" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label} / {active.duration}</text>
          <text x="130" y="140" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.resolution}</text>
          <text x="130" y="170" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">镜头约束</text>
          <path d="M242 134 H294" stroke="var(--border)" strokeWidth="3" />
          <rect x="306" y="72" width="204" height="124" rx="14" fill={shot === "close" ? "var(--accent)" : "var(--bg)"} fillOpacity={shot === "close" ? 0.12 : 1} stroke={shot === "close" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="408" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">资产精度</text>
          <text x="408" y="140" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{shot === "wide" ? "中等细度 / 2K" : "面部拓扑 / 4K"}</text>
          <text x="408" y="170" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Model + Texture + Rig</text>
          <path d="M528 134 H580" stroke="var(--border)" strokeWidth="3" />
          <rect x="592" y="72" width="132" height="124" rx="14" fill={deadline === "fixed" ? "var(--warning)" : "var(--bg)"} fillOpacity={deadline === "fixed" ? 0.12 : 1} stroke={deadline === "fixed" ? "var(--warning)" : "var(--border)"} strokeWidth="2" />
          <text x="658" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">预算指数</text>
          <text x="658" y="146" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--accent)">{budget}</text>
          <text x="658" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{deadline === "fixed" ? "截止锁定" : "可迭代"}</text>
          <text x="380" y="246" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">越近、越久、越高分辨率，资产与渲染成本越高</text>
          <text x="380" y="270" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">预算不是抽象数字，而是由镜头约束反推的范围决定</text>
        </svg>
      </div>
    </section>
  );
}

const RISKS = {
  character: { label: "角色拓扑未定", owner: "Character Design / Modeling", downstream: "UV → Texture → Rig → Animation", rollback: "回退到角色参考与正侧视图" },
  tracking: { label: "跟踪素材不足", owner: "Tracking / Camera", downstream: "Lighting → Composite → Render", rollback: "回退到镜头素材与相机解算" },
  render: { label: "渲染预算超支", owner: "Lighting / Rendering", downstream: "交付格式 → Review → Release", rollback: "回退到引擎、分辨率与采样预算" },
} as const;

type RiskKey = keyof typeof RISKS;

export function Bl3Ch04DependencyRecoveryLab() {
  const [risk, setRisk] = useState<RiskKey>("character");
  const [accepted, setAccepted] = useState(false);

  function reset() {
    setRisk("character");
    setAccepted(false);
  }

  const active = RISKS[risk];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch04-dependency-recovery"
      aria-label="Blender 第四章依赖与回退实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 4 · 风险回退实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">风险要有负责人、消费者和回退点</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一个高风险事项，观察它阻塞的下游交付和应该回退到哪里。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择风险</p>
          <div className="grid gap-2">
            <ChoiceButton active={risk === "character"} onClick={() => setRisk("character")}>角色拓扑未定</ChoiceButton>
            <ChoiceButton active={risk === "tracking"} onClick={() => setRisk("tracking")}>跟踪素材不足</ChoiceButton>
            <ChoiceButton active={risk === "render"} onClick={() => setRisk("render")}>渲染预算超支</ChoiceButton>
          </div>
          <ChoiceButton active={accepted} onClick={() => setAccepted((value) => !value)}>{accepted ? "标记为已处理" : "标记为未处理"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {accepted ? "风险已记录处理证据，但仍需注明例外与复查条件。" : "风险未处理，下游阶段不能用口头承诺替代阶段门。"}
          </p>
        </div>

        <svg viewBox="0 0 760 310" role="img" aria-label={"依赖回退实验：当前风险为" + active.label + "，负责人是" + active.owner + "，下游消费者为" + active.downstream + "，回退点为" + active.rollback + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Risk → Owner → Downstream → Rollback</text>
          <rect x="34" y="78" width="166" height="128" rx="14" fill={accepted ? "var(--success)" : "var(--danger)"} fillOpacity="0.12" stroke={accepted ? "var(--success)" : "var(--danger)"} strokeWidth="2" />
          <text x="117" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">风险</text>
          <text x="117" y="148" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="117" y="178" textAnchor="middle" fontSize="11" fill={accepted ? "var(--success)" : "var(--danger)"}>{accepted ? "已处理" : "未处理"}</text>
          <path d="M216 142 H264" stroke="var(--border)" strokeWidth="3" />
          <rect x="276" y="78" width="166" height="128" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="359" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">负责人</text>
          <text x="359" y="148" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.owner}</text>
          <text x="359" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录结论与复查</text>
          <path d="M458 142 H506" stroke="var(--border)" strokeWidth="3" />
          <rect x="518" y="78" width="206" height="128" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="621" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">下游不能盲走</text>
          <text x="621" y="148" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.downstream}</text>
          <text x="621" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">回退：{active.rollback}</text>
          <text x="380" y="258" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">依赖图让“后面再调”变成可执行的暂停与回退</text>
          <text x="380" y="282" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">阶段门应保存验收人、例外项和下一次复查条件</text>
        </svg>
      </div>
    </section>
  );
}
