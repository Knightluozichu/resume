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

const RIG_MODES = {
  spine: {
    label: "Spine + Head",
    detail: "从骨盆穿过脊柱连接头部",
    consumer: "身体与头部姿态",
  },
  arm: {
    label: "Arm IK",
    detail: "上臂、前臂和手组成可控链",
    consumer: "抬手与手腕定位",
  },
  leg: {
    label: "Leg IK",
    detail: "大腿、小腿和脚建立落地链",
    consumer: "脚底接触与屈膝",
  },
} as const;

type RigMode = keyof typeof RIG_MODES;

export function Bl3Ch11ArmatureLab() {
  const [mode, setMode] = useState<RigMode>("spine");
  const [roll, setRoll] = useState<"aligned" | "drift">("aligned");

  function reset() {
    setMode("spine");
    setRoll("aligned");
  }

  const active = RIG_MODES[mode];
  const ready = roll === "aligned";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch11-armature-structure"
      aria-label={
        "Blender 第十一章骨架实验：当前链为" +
        active.label +
        "，" +
        active.detail +
        "；骨轴 Roll" +
        (ready ? "已对齐" : "发生漂移") +
        "；下游用途为" +
        active.consumer +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 11 · Armature 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">骨架结构要为控制和变形预留方向</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换身体链并制造 Roll 偏差，观察命名、轴向和控制用途如何相互影响。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "Armature 结构图：骨骼链" +
            active.label +
            "从结构层进入控制层和变形层，当前 Roll" +
            (ready ? "对齐" : "漂移") +
            "，下游用于" +
            active.consumer +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            Armature Hierarchy → Control Bones → Deform Bones → Pose
          </text>
          <rect x="30" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <path d={mode === "spine" ? "M115 176 V128 M115 145 H90 M115 158 H140" : mode === "arm" ? "M80 132 L115 150 L150 132" : "M115 128 L90 172 M115 128 L140 172"} fill="none" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" />
          <text x="115" y="195" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{ready ? "轴向可预测" : "先修正 Bone Roll"}</text>
          <path d="M218 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="190" height="132" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="361" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">控制层</text>
          <text x="361" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">IK / FK / Pole</text>
          <text x="361" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">动画师操作</text>
          <path d="M474 144 H510" stroke="var(--border)" strokeWidth="3" />
          <rect x="522" y="78" width="208" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="626" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">变形层</text>
          <text x="626" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">网格与 Vertex Groups</text>
          <text x="626" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? active.consumer : "方向会放大错误"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">骨架不是一堆线：父子、命名、Roll 和控制职责要能被另一个人读懂</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先在中立姿态检查，再进入约束和权重</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变骨架前提</p>
          <div className="grid gap-2">
            <ChoiceButton active={mode === "spine"} onClick={() => setMode("spine")}>Spine + Head</ChoiceButton>
            <ChoiceButton active={mode === "arm"} onClick={() => setMode("arm")}>Arm IK</ChoiceButton>
            <ChoiceButton active={mode === "leg"} onClick={() => setMode("leg")}>Leg IK</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={roll === "aligned"} onClick={() => setRoll("aligned")}>对齐 Roll</ChoiceButton>
            <ChoiceButton active={roll === "drift"} onClick={() => setRoll("drift")}>制造漂移</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前链负责：{active.consumer}。{ready ? "可以进入约束和蒙皮，但仍要保存命名与层级证据。" : "先停在骨架阶段，修正轴向、Roll 和左右命名，再连接网格。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const JOINTS = {
  shoulder: { label: "Shoulder", issue: "肩部塌陷", target: "保持肩胛与上臂体积" },
  elbow: { label: "Elbow", issue: "肘部折痕过尖", target: "让前臂弯曲连续" },
  knee: { label: "Knee", issue: "膝盖穿插", target: "保持膝盖前后空间" },
} as const;

type JointKey = keyof typeof JOINTS;

export function Bl3Ch11SkinningLab() {
  const [joint, setJoint] = useState<JointKey>("shoulder");
  const [pose, setPose] = useState<"neutral" | "extreme">("neutral");
  const [weightsFixed, setWeightsFixed] = useState(false);

  function reset() {
    setJoint("shoulder");
    setPose("neutral");
    setWeightsFixed(false);
  }

  const active = JOINTS[joint];
  const safe = pose === "neutral" || weightsFixed;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch11-skin-weight-diagnostics"
      aria-label={
        "Blender 第十一章 Skinning 实验：当前关节为" +
        active.label +
        "，姿态为" +
        (pose === "neutral" ? "中立" : "极限") +
        "，权重修正" +
        (weightsFixed ? "已完成" : "未完成") +
        "，目标是" +
        active.target +
        "，当前结果" +
        (safe ? "可继续" : active.issue) +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 11 · Skinning 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">权重要在极限姿势里证明自己</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择关节、切换姿态并修正权重，观察网格如何暴露影响范围问题。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择变形压力点</p>
          <div className="grid gap-2">
            <ChoiceButton active={joint === "shoulder"} onClick={() => setJoint("shoulder")}>Shoulder：抬臂</ChoiceButton>
            <ChoiceButton active={joint === "elbow"} onClick={() => setJoint("elbow")}>Elbow：弯肘</ChoiceButton>
            <ChoiceButton active={joint === "knee"} onClick={() => setJoint("knee")}>Knee：屈膝</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={pose === "neutral"} onClick={() => setPose("neutral")}>Neutral</ChoiceButton>
            <ChoiceButton active={pose === "extreme"} onClick={() => setPose("extreme")}>Extreme Pose</ChoiceButton>
          </div>
          <ChoiceButton active={weightsFixed} onClick={() => setWeightsFixed((value) => !value)}>{weightsFixed ? "撤销权重修正" : "完成权重修正"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label} 的目标是：{active.target}。{pose === "neutral" ? "中立姿态只能检查连接，切到极限姿态才能暴露权重边界。" : weightsFixed ? "修正后重新比较体积、折痕和相邻顶点的影响。" : "当前暴露风险：" + active.issue + "。先查看热图，再修改归一化权重。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "Skinning 诊断图：关节" +
            active.label +
            "在" +
            (pose === "neutral" ? "中立" : "极限") +
            "姿态下观察 Vertex Groups 权重；" +
            (weightsFixed ? "权重已修正，体积可继续验收" : "权重尚未修正，风险为" + active.issue) +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Bone Pose → Vertex Group Weights → Mesh Deformation → Review</text>
          <rect x="30" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="118" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <path d={pose === "extreme" ? "M84 174 Q118 112 160 174" : "M84 174 Q118 136 160 174"} fill="none" stroke="var(--accent)" strokeWidth="7" />
          <text x="118" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{pose === "extreme" ? "极限姿势" : "中立姿势"}</text>
          <path d="M224 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={weightsFixed ? "var(--success)" : "var(--bg)"} fillOpacity={weightsFixed ? 0.14 : 1} stroke={weightsFixed ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Weight Heatmap</text>
          <path d="M316 178 Q360 108 404 178" fill="none" stroke={weightsFixed ? "var(--success)" : "var(--warning)"} strokeWidth="12" strokeOpacity={weightsFixed ? 0.8 : 0.45} />
          <text x="360" y="196" textAnchor="middle" fontSize="11" fill={weightsFixed ? "var(--success)" : "var(--warning)"}>{weightsFixed ? "影响连续且已归一化" : "影响范围待修正"}</text>
          <path d="M466 144 H502" stroke="var(--border)" strokeWidth="3" />
          <rect x="514" y="78" width="216" height="132" rx="14" fill={safe ? "var(--success)" : "var(--danger)"} fillOpacity="0.12" stroke={safe ? "var(--success)" : "var(--danger)"} strokeWidth="2" />
          <text x="622" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill={safe ? "var(--success)" : "var(--danger)"}>{safe ? "可继续" : "暴露风险"}</text>
          <text x="622" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{safe ? active.target : active.issue}</text>
          <text x="622" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录姿势与截图</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">自动权重是起点，不是肩、肘、膝和面部的最终答案</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">用热图、极限姿势和体积对照把问题定位到权重</text>
        </svg>
      </div>
    </section>
  );
}

const CONTROLS = {
  hand: { label: "Hand", action: "移动手部目标", shape: "方形手柄", output: "手臂姿态" },
  foot: { label: "Foot", action: "移动脚部目标", shape: "圆形脚柄", output: "脚底接触" },
  face: { label: "Face", action: "调整眉眼控制", shape: "面部曲线", output: "表情变化" },
} as const;

type ControlKey = keyof typeof CONTROLS;

export function Bl3Ch11ControlReuseLab() {
  const [control, setControl] = useState<ControlKey>("hand");
  const [customShape, setCustomShape] = useState(true);
  const [reuse, setReuse] = useState<"linked" | "local">("linked");

  function reset() {
    setControl("hand");
    setCustomShape(true);
    setReuse("linked");
  }

  const active = CONTROLS[control];
  const ready = customShape && reuse === "linked";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch11-control-reuse"
      aria-label={
        "Blender 第十一章控制器与复用实验：当前控制器为" +
        active.label +
        "，动作是" +
        active.action +
        "，自定义形状" +
        (customShape ? "已启用" : "未启用") +
        "，场景方式为" +
        (reuse === "linked" ? "链接并可覆写" : "本地复制") +
        "，结果为" +
        (ready ? "可交接" : "需要检查") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 11 · 控制器与复用实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">控制器要让动画师看见责任，也要能带到新场景</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换身体控制，比较 Custom Shape、链接资产和场景覆写的交接结果。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "控制器与跨场景复用图：" +
            active.label +
            "控制器通过" +
            (customShape ? active.shape : "默认骨骼形状") +
            "驱动" +
            active.output +
            "；资产以" +
            (reuse === "linked" ? "链接并用 Library Override 定制" : "本地复制") +
            "进入新场景；当前" +
            (ready ? "可交接" : "需要检查") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Custom Shape → Control Responsibility → Library Override → New Scene</text>
          <rect x="30" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="115" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.action}</text>
          <text x="115" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{customShape ? active.shape : "默认骨骼形状"}</text>
          <path d="M218 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="190" height="132" rx="14" fill={customShape ? "var(--accent)" : "var(--warning)"} fillOpacity="0.12" stroke={customShape ? "var(--accent)" : "var(--warning)"} strokeWidth="2" />
          <text x="361" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">控制责任</text>
          <text x="361" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="361" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">可见、可命名、可锁定</text>
          <path d="M474 144 H510" stroke={reuse === "linked" ? "var(--success)" : "var(--border)"} strokeWidth="3" />
          <rect x="522" y="78" width="208" height="132" rx="14" fill={ready ? "var(--success)" : "var(--bg)"} fillOpacity={ready ? 0.14 : 1} stroke={ready ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="626" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill={ready ? "var(--success)" : "var(--text-primary)"}>{reuse === "linked" ? "Library Override" : "Local Copy"}</text>
          <text x="626" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{ready ? "共享修复，场景可定制" : "副本分叉，更新需手工同步"}</text>
          <text x="626" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{ready ? "新场景可交接" : "记录资产来源"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">自定义形状解决可操作性，复用策略解决资产来源与更新责任</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">链接、覆写和本地副本不能混成一个“复制”按钮</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变交接方式</p>
          <div className="grid gap-2">
            <ChoiceButton active={control === "hand"} onClick={() => setControl("hand")}>Hand：手部</ChoiceButton>
            <ChoiceButton active={control === "foot"} onClick={() => setControl("foot")}>Foot：脚部</ChoiceButton>
            <ChoiceButton active={control === "face"} onClick={() => setControl("face")}>Face：面部</ChoiceButton>
          </div>
          <ChoiceButton active={customShape} onClick={() => setCustomShape((value) => !value)}>{customShape ? "移除 Custom Shape" : "添加 Custom Shape"}</ChoiceButton>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={reuse === "linked"} onClick={() => setReuse("linked")}>链接 + 覆写</ChoiceButton>
            <ChoiceButton active={reuse === "local"} onClick={() => setReuse("local")}>本地复制</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前控制器负责：{active.output}。{ready ? "可以在新场景验证控制形状、命名和覆写边界。" : "尚不能交接：明确控制责任，并记录资产是链接、覆写还是本地副本。"}
          </p>
        </div>
      </div>
    </section>
  );
}
