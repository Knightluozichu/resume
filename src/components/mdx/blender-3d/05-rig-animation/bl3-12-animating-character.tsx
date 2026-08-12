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

const POSE_CONTROLS = {
  torso: { label: "Torso", action: "压低或抬高髋部", result: "重心轨迹" },
  foot: { label: "Foot", action: "保持脚掌接触地面", result: "脚滑与落地" },
  head: { label: "Head", action: "保持头部反向平衡", result: "身体节奏" },
} as const;

type PoseControl = keyof typeof POSE_CONTROLS;

export function Bl3Ch12RigPoseLab() {
  const [control, setControl] = useState<PoseControl>("torso");
  const [phase, setPhase] = useState<"neutral" | "contact" | "passing">("neutral");

  function reset() {
    setControl("torso");
    setPhase("neutral");
  }

  const active = POSE_CONTROLS[control];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch12-rig-pose"
      aria-label={
        "Blender 第十二章 Rig 姿态实验：当前控制器为" +
        active.label +
        "，动作是" +
        active.action +
        "，当前姿态阶段为" +
        phase +
        "，观察结果为" +
        active.result +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 12 · Rig 姿态实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">动画从可控的身体关系开始</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一个 Rig 控制器和姿态阶段，观察它如何影响行走的重心与接触。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "Rig 姿态流程图：控制器" +
            active.label +
            "先改变" +
            active.action +
            "，再形成" +
            phase +
            "姿态并记录关键帧，重点观察" +
            active.result +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            Rig Control → Pose Relationship → Keyframe → Motion Intent
          </text>
          <rect x="30" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="115" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.action}</text>
          <text x="115" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">动画师输入</text>
          <path d="M218 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="190" height="132" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="361" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{phase}</text>
          <path d={phase === "contact" ? "M318 174 Q362 104 406 174" : phase === "passing" ? "M318 164 Q362 128 406 164" : "M318 174 Q362 148 406 174"} fill="none" stroke="var(--accent)" strokeWidth="7" />
          <text x="361" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">保持姿态意图</text>
          <path d="M474 144 H510" stroke="var(--border)" strokeWidth="3" />
          <rect x="522" y="78" width="208" height="132" rx="14" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="2" />
          <text x="626" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">关键帧</text>
          <text x="626" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">帧号 + 控制器值</text>
          <text x="626" y="178" textAnchor="middle" fontSize="11" fill="var(--success)">可进入 Timing</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">姿态不是孤立截图：身体关系要能被控制器和关键帧复现</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先说清动作意图，再决定哪一帧需要被钉住</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择 Rig 输入</p>
          <div className="grid gap-2">
            <ChoiceButton active={control === "torso"} onClick={() => setControl("torso")}>Torso：重心</ChoiceButton>
            <ChoiceButton active={control === "foot"} onClick={() => setControl("foot")}>Foot：接触</ChoiceButton>
            <ChoiceButton active={control === "head"} onClick={() => setControl("head")}>Head：平衡</ChoiceButton>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <ChoiceButton active={phase === "neutral"} onClick={() => setPhase("neutral")}>Neutral</ChoiceButton>
            <ChoiceButton active={phase === "contact"} onClick={() => setPhase("contact")}>Contact</ChoiceButton>
            <ChoiceButton active={phase === "passing"} onClick={() => setPhase("passing")}>Passing</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前重点：{active.result}。{phase === "neutral" ? "先把控制器归零，确认姿态不会带入上一段动作。" : "记录此阶段的控制器值，再与相邻姿态比较重心和接触。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const EDITORS = {
  timeline: { label: "Timeline", task: "定位播放帧", observation: "当前时间与播放范围" },
  dope: { label: "Dope Sheet", task: "整体移动关键帧", observation: "姿态之间的 Timing" },
  graph: { label: "Graph Editor", task: "调整 F-Curve", observation: "速度与 Spacing" },
} as const;

type EditorKey = keyof typeof EDITORS;

export function Bl3Ch12TimingCurveLab() {
  const [editor, setEditor] = useState<EditorKey>("dope");
  const [spacing, setSpacing] = useState<"even" | "ease">("even");

  function reset() {
    setEditor("dope");
    setSpacing("even");
  }

  const active = EDITORS[editor];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch12-timing-spacing"
      aria-label={
        "Blender 第十二章 Timing 与 Spacing 实验：当前编辑器为" +
        active.label +
        "，任务是" +
        active.task +
        "，曲线状态为" +
        (spacing === "even" ? "均匀" : "缓入缓出") +
        "，观察" +
        active.observation +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 12 · 编辑器实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">Timing 决定何时发生，Spacing 决定怎样经过</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换动画编辑器与曲线状态，区分关键帧间隔和运动速度。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择编辑器职责</p>
          <div className="grid gap-2">
            <ChoiceButton active={editor === "timeline"} onClick={() => setEditor("timeline")}>Timeline：播放定位</ChoiceButton>
            <ChoiceButton active={editor === "dope"} onClick={() => setEditor("dope")}>Dope Sheet：时序</ChoiceButton>
            <ChoiceButton active={editor === "graph"} onClick={() => setEditor("graph")}>Graph Editor：曲线</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={spacing === "even"} onClick={() => setSpacing("even")}>均匀速度</ChoiceButton>
            <ChoiceButton active={spacing === "ease"} onClick={() => setSpacing("ease")}>缓入缓出</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label} 负责{active.task}；当前要观察{active.observation}。{spacing === "even" ? "关键帧之间等距，运动可能机械。" : "曲线加入缓入缓出，需检查接触点是否仍然准确。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "Timing 与 Spacing 图：关键帧进入" +
            active.label +
            "进行" +
            active.task +
            "；当前速度曲线为" +
            (spacing === "even" ? "均匀" : "缓入缓出") +
            "，重点观察" +
            active.observation +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Keyframes → Timing → F-Curve → Spacing</text>
          <rect x="30" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">关键姿态</text>
          <circle cx="76" cy="160" r="9" fill="var(--accent)" /><circle cx="115" cy="160" r="9" fill="var(--accent)" /><circle cx="154" cy="160" r="9" fill="var(--accent)" />
          <text x="115" y="194" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">帧间距离是 Timing</text>
          <path d="M218 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="190" height="132" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="361" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <path d={spacing === "even" ? "M310 176 L412 124" : "M310 176 Q342 174 362 148 T412 124"} fill="none" stroke="var(--accent)" strokeWidth="5" />
          <text x="361" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.task}</text>
          <path d="M474 144 H510" stroke="var(--border)" strokeWidth="3" />
          <rect x="522" y="78" width="208" height="132" rx="14" fill={spacing === "ease" ? "var(--success)" : "var(--bg)"} fillOpacity={spacing === "ease" ? 0.14 : 1} stroke={spacing === "ease" ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="626" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">运动感觉</text>
          <text x="626" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{spacing === "even" ? "机械且等速" : "有节奏的加减速"}</text>
          <text x="626" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">检查脚和重心</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Dope Sheet 适合整理时间，Graph Editor 适合解释速度</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不要用曲线的漂亮形状替代接触点验收</text>
        </svg>
      </div>
    </section>
  );
}

const WALK_PHASES = {
  contact: { label: "Contact", detail: "前脚接触，后脚离地", center: "低" },
  down: { label: "Down", detail: "承重下沉，吸收冲击", center: "最低" },
  passing: { label: "Passing", detail: "身体越过支撑脚", center: "中" },
  up: { label: "Up", detail: "支撑脚伸展，准备下一步", center: "最高" },
} as const;

type WalkPhase = keyof typeof WALK_PHASES;

export function Bl3Ch12WalkCycleLab() {
  const [phase, setPhase] = useState<WalkPhase>("contact");
  const [loop, setLoop] = useState<"open" | "closed">("open");
  const [verified, setVerified] = useState(false);

  function reset() {
    setPhase("contact");
    setLoop("open");
    setVerified(false);
  }

  const active = WALK_PHASES[phase];
  const ready = loop === "closed" && verified;
  const phases = Object.keys(WALK_PHASES) as WalkPhase[];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch12-walk-cycle"
      aria-label={
        "Blender 第十二章行走循环实验：当前阶段为" +
        active.label +
        "，" +
        active.detail +
        "，重心位置" +
        active.center +
        "，循环" +
        (loop === "closed" ? "已闭合" : "未闭合") +
        "，验收" +
        (ready ? "通过" : "待完成") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 12 · Walk Cycle 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">四个阶段把脚步、重心和节奏接成循环</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换 Contact、Down、Passing、Up，检查首尾、脚滑和重心轨迹。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 340"
          role="img"
          aria-label={
            "Walk Cycle 四阶段图：Contact、Down、Passing、Up 当前高亮" +
            active.label +
            "，说明为" +
            active.detail +
            "；循环" +
            (loop === "closed" ? "首尾闭合" : "首尾尚未闭合") +
            "，脚滑与重心验收" +
            (ready ? "通过" : "待完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Contact → Down → Passing → Up → Contact</text>
          {phases.map((key, index) => {
            const x = 54 + index * 174;
            const item = WALK_PHASES[key];
            const isActive = key === phase;
            const y = key === "down" ? 166 : key === "up" ? 104 : 136;
            return (
              <g key={key}>
                <rect x={x} y={78} width="142" height="142" rx="14" fill={isActive ? "var(--accent)" : "var(--bg)"} fillOpacity={isActive ? 0.14 : 1} stroke={isActive ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
                <circle cx={x + 71} cy={y} r="23" fill={isActive ? "var(--accent)" : "var(--border)"} fillOpacity="0.35" />
                <path d={`M${x + 71} ${y + 18} L${x + 71} ${y + 54} M${x + 71} ${y + 28} L${x + 50} ${y + 46} M${x + 71} ${y + 28} L${x + 92} ${y + 46} M${x + 71} ${y + 54} L${x + 52} ${y + 78} M${x + 71} ${y + 54} L${x + 90} ${y + 78}`} fill="none" stroke={isActive ? "var(--accent)" : "var(--text-secondary)"} strokeWidth="4" strokeLinecap="round" />
                <text x={x + 71} y="188" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{item.label}</text>
                <text x={x + 71} y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{item.center}重心</text>
                {index < phases.length - 1 && <path d={`M${x + 148} 148 H${x + 168}`} stroke="var(--border)" strokeWidth="3" />}
              </g>
            );
          })}
          <path d="M698 224 Q734 252 680 274 Q626 296 582 274" fill="none" stroke={loop === "closed" ? "var(--success)" : "var(--warning)"} strokeWidth="3" strokeDasharray="7 5" />
          <text x="380" y="256" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}；脚接触要在世界空间保持稳定</text>
          <text x="380" y="282" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--text-secondary)"}>{ready ? "循环已闭合，记录脚滑误差与三周期回放" : "先闭合首尾，再检查脚滑、重心和节奏"}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">验收循环状态</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={phase === "contact"} onClick={() => setPhase("contact")}>Contact</ChoiceButton>
            <ChoiceButton active={phase === "down"} onClick={() => setPhase("down")}>Down</ChoiceButton>
            <ChoiceButton active={phase === "passing"} onClick={() => setPhase("passing")}>Passing</ChoiceButton>
            <ChoiceButton active={phase === "up"} onClick={() => setPhase("up")}>Up</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={loop === "open"} onClick={() => setLoop("open")}>首尾未闭合</ChoiceButton>
            <ChoiceButton active={loop === "closed"} onClick={() => setLoop("closed")}>首尾已闭合</ChoiceButton>
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>{verified ? "撤销三周期验收" : "完成三周期验收"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前阶段：{active.label}，{active.detail}。{ready ? "可以导出 Action，并把脚滑误差与首尾值写入证据包。" : "尚不能交付：检查四阶段顺序、首尾重复帧、脚接触和重心起伏。"}
          </p>
        </div>
      </div>
    </section>
  );
}
