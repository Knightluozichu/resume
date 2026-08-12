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

const METHODS = {
  box: { label: "Box Modeling", detail: "从大体块逐步细化", risk: "早期比例偏差会传播到全身" },
  retopo: { label: "Retopology", detail: "沿已有表面重建可变形网格", risk: "表面贴合但边流可能不支持动作" },
  sculpt: { label: "Sculpt + Retopo", detail: "先雕刻体积，再生成生产拓扑", risk: "细节很强但需要重新规划环流" },
} as const;

type MethodKey = keyof typeof METHODS;

export function Bl3Ch07ReferenceMethodLab() {
  const [method, setMethod] = useState<MethodKey>("box");
  const [reference, setReference] = useState<"aligned" | "drift">("aligned");

  function reset() {
    setMethod("box");
    setReference("aligned");
  }

  const active = METHODS[method];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch07-reference-method"
      aria-label="Blender 第七章参考图与建模方法实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 7 · 建模路线实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">方法选择必须服从参考与变形目标</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换建模方法和参考图状态，观察比例风险如何进入下游。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg viewBox="0 0 760 320" role="img" aria-label={"参考与方法实验：当前方法为" + active.label + "，" + active.detail + "；参考图状态为" + (reference === "aligned" ? "正侧对齐" : "比例漂移") + "；风险是" + active.risk + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Reference Images → Modeling Method → Production Topology</text>
          <rect x="38" y="76" width="190" height="132" rx="14" fill={reference === "aligned" ? "var(--success)" : "var(--danger)"} fillOpacity="0.12" stroke={reference === "aligned" ? "var(--success)" : "var(--danger)"} strokeWidth="2" />
          <text x="133" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">正侧参考</text>
          <text x="133" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{reference === "aligned" ? "共同基准线" : "眼线与髋线漂移"}</text>
          <text x="133" y="176" textAnchor="middle" fontSize="11" fill={reference === "aligned" ? "var(--success)" : "var(--danger)"}>{reference === "aligned" ? "可建立比例" : "先回退校正"}</text>
          <path d="M248 142 H294" stroke="var(--border)" strokeWidth="3" />
          <rect x="306" y="76" width="190" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="401" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="401" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="401" y="176" textAnchor="middle" fontSize="11" fill="var(--accent)">保留输入版本</text>
          <path d="M516 142 H562" stroke="var(--border)" strokeWidth="3" />
          <rect x="574" y="76" width="148" height="132" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="648" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">产出</text>
          <text x="648" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">低模 + 环流</text>
          <text x="648" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">可绑定、可 UV</text>
          <text x="380" y="252" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">静态轮廓正确只是入口，参考比例和方法都要服务可变形拓扑</text>
          <text x="380" y="278" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录方法、版本、风险与回退路径</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变建模前提</p>
          <div className="grid gap-2">
            <ChoiceButton active={method === "box"} onClick={() => setMethod("box")}>Box Modeling</ChoiceButton>
            <ChoiceButton active={method === "retopo"} onClick={() => setMethod("retopo")}>Retopology</ChoiceButton>
            <ChoiceButton active={method === "sculpt"} onClick={() => setMethod("sculpt")}>Sculpt + Retopo</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={reference === "aligned"} onClick={() => setReference("aligned")}>参考对齐</ChoiceButton>
            <ChoiceButton active={reference === "drift"} onClick={() => setReference("drift")}>制造漂移</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前风险：{active.risk}。{reference === "aligned" ? "可以进入体块建模，但仍要锁定世界单位。" : "先暂停建模，修正正侧参考的共同基准线。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const REGIONS = {
  face: { label: "Face", ring: "眼睑、嘴角、鼻翼环", failure: "表情时夹陷或嘴角撕扯" },
  shoulder: { label: "Shoulder", ring: "肩胛到上臂的环流", failure: "抬臂时肩部塌陷" },
  knee: { label: "Knee", ring: "膝盖前后支撑环", failure: "屈膝时内侧折叠" },
} as const;

type RegionKey = keyof typeof REGIONS;

export function Bl3Ch07DeformationLab() {
  const [region, setRegion] = useState<RegionKey>("face");
  const [pose, setPose] = useState<"neutral" | "extreme">("neutral");

  function reset() {
    setRegion("face");
    setPose("neutral");
  }

  const active = REGIONS[region];
  const safe = pose === "neutral" || region === "shoulder";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch07-deformation-topology"
      aria-label="Blender 第七章面部与关节变形拓扑实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 7 · 变形预检实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">边流要在极限姿态下证明自己</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择面部或关节区域，切换中立与极限姿态，观察环流风险。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择变形区域</p>
          <div className="grid gap-2">
            <ChoiceButton active={region === "face"} onClick={() => setRegion("face")}>Face：面部表情</ChoiceButton>
            <ChoiceButton active={region === "shoulder"} onClick={() => setRegion("shoulder")}>Shoulder：抬臂</ChoiceButton>
            <ChoiceButton active={region === "knee"} onClick={() => setRegion("knee")}>Knee：屈膝</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={pose === "neutral"} onClick={() => setPose("neutral")}>Neutral</ChoiceButton>
            <ChoiceButton active={pose === "extreme"} onClick={() => setPose("extreme")}>Extreme Pose</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label} 需要：{active.ring}。{pose === "neutral" ? "中立姿态不能证明关节边流足够。" : safe ? "当前示意通过，但仍要保存姿态截图。" : "当前示意暴露风险：" + active.failure + "。"}
          </p>
        </div>

        <svg viewBox="0 0 760 310" role="img" aria-label={"变形拓扑实验：当前区域为" + active.label + "，" + active.ring + "；姿态为" + (pose === "neutral" ? "Neutral" : "Extreme Pose") + "；结果为" + (safe ? "通过" : "暴露风险") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Deformation Region → Edge Rings → Extreme Pose</text>
          <rect x="46" y="78" width="190" height="130" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="141" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="141" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.ring}</text>
          <text x="141" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">局部体积与边界</text>
          <path d="M254 143 H300" stroke="var(--border)" strokeWidth="3" />
          <rect x="312" y="78" width="190" height="130" rx="14" fill={pose === "extreme" ? "var(--accent)" : "var(--bg)"} fillOpacity={pose === "extreme" ? 0.12 : 1} stroke={pose === "extreme" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <path d={pose === "extreme" ? "M364 174 Q402 94 450 174" : "M364 174 Q402 126 450 174"} fill="none" stroke="var(--accent)" strokeWidth="5" />
          <path d="M374 164 Q402 112 440 164 M382 170 Q402 128 432 170" fill="none" stroke="var(--text-secondary)" strokeWidth="2" />
          <text x="407" y="110" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{pose === "neutral" ? "环流均匀" : "环流被拉伸"}</text>
          <path d="M520 143 H566" stroke="var(--border)" strokeWidth="3" />
          <rect x="578" y="78" width="146" height="130" rx="14" fill={safe ? "var(--success)" : "var(--danger)"} fillOpacity="0.12" stroke={safe ? "var(--success)" : "var(--danger)"} strokeWidth="2" />
          <text x="651" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill={safe ? "var(--success)" : "var(--danger)"}>{safe ? "通过" : "风险"}</text>
          <text x="651" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{safe ? "体积保持" : "检查夹陷"}</text>
          <text x="651" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{pose === "extreme" ? "保存预检图" : "继续测试"}</text>
          <text x="380" y="252" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">静态轮廓正确，不代表面部与关节在动作中仍然可用</text>
          <text x="380" y="278" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">为后续 Rig 和 Animation 保留变形证据</text>
        </svg>
      </div>
    </section>
  );
}

const PARTS = {
  eyes: { label: "Eyes", role: "独立球体与眼睑配合", next: "UV / 材质 / 表情" },
  hands: { label: "Hands", role: "手指截面与手腕连接", next: "Rig / Animation" },
  hair: { label: "Hair", role: "遮挡、材质与独立形体", next: "UV / Material" },
} as const;

type PartKey = keyof typeof PARTS;

export function Bl3Ch07PartsDetailsLab() {
  const [part, setPart] = useState<PartKey>("eyes");
  const [boundary, setBoundary] = useState<"separate" | "shared">("separate");
  const [clean, setClean] = useState(false);

  function reset() {
    setPart("eyes");
    setBoundary("separate");
    setClean(false);
  }

  const active = PARTS[part];
  const handoff = clean && boundary === "separate";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch07-parts-final-details"
      aria-label="Blender 第七章部件边界与最终细节实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 7 · 部件交接实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">最终细节要有清楚的部件责任</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择眼睛、手或头发，比较独立/共享边界并检查下游消费者。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg viewBox="0 0 760 300" role="img" aria-label={"部件实验：当前部件为" + active.label + "，职责是" + active.role + "；边界为" + (boundary === "separate" ? "独立部件" : "共享身体网格") + "；清理检查" + (clean ? "已完成" : "未完成") + "，结果为" + (handoff ? "可交接" : "待修复") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Part Boundary → Cleanup → Downstream Consumer</text>
          <rect x="38" y="76" width="192" height="126" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="134" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="134" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.role}</text>
          <text x="134" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{boundary === "separate" ? "独立 Datablock" : "共享身体网格"}</text>
          <path d="M256 139 H302" stroke="var(--border)" strokeWidth="3" />
          <rect x="314" y="76" width="192" height="126" rx="14" fill={clean ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={clean ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="410" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Cleanup</text>
          <text x="410" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">中线 / 重叠点 / 法线</text>
          <text x="410" y="174" textAnchor="middle" fontSize="11" fill={clean ? "var(--success)" : "var(--warning)"}>{clean ? "检查已记录" : "等待检查"}</text>
          <path d="M532 139 H578" stroke={handoff ? "var(--success)" : "var(--border)"} strokeWidth="3" />
          <rect x="590" y="76" width="132" height="126" rx="14" fill={handoff ? "var(--success)" : "var(--bg)"} fillOpacity={handoff ? 0.14 : 1} stroke={handoff ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="656" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill={handoff ? "var(--success)" : "var(--text-primary)"}>{handoff ? "可交接" : "待修复"}</text>
          <text x="656" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.next}</text>
          <text x="656" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">第 8 章可消费</text>
          <text x="380" y="244" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">部件边界要同时说明变换关系、命名、清理和下游消费者</text>
          <text x="380" y="270" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不要让帽子、头发或眼球成为不可追踪的隐藏几何</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变部件责任</p>
          <div className="grid gap-2">
            <ChoiceButton active={part === "eyes"} onClick={() => setPart("eyes")}>Eyes</ChoiceButton>
            <ChoiceButton active={part === "hands"} onClick={() => setPart("hands")}>Hands</ChoiceButton>
            <ChoiceButton active={part === "hair"} onClick={() => setPart("hair")}>Hair</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={boundary === "separate"} onClick={() => setBoundary("separate")}>独立部件</ChoiceButton>
            <ChoiceButton active={boundary === "shared"} onClick={() => setBoundary("shared")}>共享网格</ChoiceButton>
          </div>
          <ChoiceButton active={clean} onClick={() => setClean((value) => !value)}>{clean ? "撤销清理检查" : "完成清理检查"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {handoff ? "部件已经有边界和清理证据，可以交给下游。" : "尚不能交接：明确部件关系并记录中线、重叠点、法线和命名。"}
          </p>
        </div>
      </div>
    </section>
  );
}
