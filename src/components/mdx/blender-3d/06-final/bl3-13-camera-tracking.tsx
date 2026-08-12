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

const CAPTURE_MODES = {
  handheld: { label: "Handheld", detail: "有平移和轻微旋转", constraint: "需要前中后景视差" },
  tripod: { label: "Tripod Pan", detail: "主要是绕轴旋转", constraint: "深度约束较弱" },
  walk: { label: "Walkthrough", detail: "相机沿空间移动", constraint: "轨迹要覆盖全段" },
} as const;

type CaptureMode = keyof typeof CAPTURE_MODES;

export function Bl3Ch13CaptureLab() {
  const [mode, setMode] = useState<CaptureMode>("handheld");
  const [blur, setBlur] = useState<"low" | "high">("low");

  function reset() {
    setMode("handheld");
    setBlur("low");
  }

  const active = CAPTURE_MODES[mode];
  const ready = blur === "low" && mode !== "tripod";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch13-capture-planning"
      aria-label={
        "Blender 第十三章拍摄条件实验：当前素材为" +
        active.label +
        "，" +
        active.detail +
        "；运动模糊为" +
        (blur === "low" ? "低" : "高") +
        "；约束要求是" +
        active.constraint +
        "；素材" +
        (ready ? "适合继续追踪" : "需要补救") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 13 · 拍摄条件实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">好解算从好素材和真实视差开始</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换相机运动和运动模糊，观察素材先天给求解器留下了什么约束。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "拍摄条件流程图：" +
            active.label +
            "素材提供" +
            active.detail +
            "，需要" +
            active.constraint +
            "；运动模糊为" +
            (blur === "low" ? "低" : "高") +
            "，结果为" +
            (ready ? "适合追踪" : "先改善素材") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            Camera Motion → Parallax → Trackable Features → Solve Constraint
          </text>
          <rect x="30" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="115" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="115" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定焦距 / 对焦</text>
          <path d="M218 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="190" height="132" rx="14" fill={mode === "tripod" ? "var(--warning)" : "var(--accent)"} fillOpacity="0.12" stroke={mode === "tripod" ? "var(--warning)" : "var(--accent)"} strokeWidth="2" />
          <text x="361" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">视差</text>
          <path d="M310 176 L360 124 L412 176" fill="none" stroke={mode === "tripod" ? "var(--warning)" : "var(--accent)"} strokeWidth="5" />
          <text x="361" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mode === "tripod" ? "深度变化少" : "前中后景分离"}</text>
          <path d="M474 144 H510" stroke="var(--border)" strokeWidth="3" />
          <rect x="522" y="78" width="208" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="626" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{ready ? "可追踪" : "先补救"}</text>
          <text x="626" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.constraint}</text>
          <text x="626" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{blur === "low" ? "特征边缘清楚" : "特征容易拖影"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">标记再多也不能创造不存在的深度视差</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">拍摄前先保护焦距、快门、对焦和特征分布</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变拍摄前提</p>
          <div className="grid gap-2">
            <ChoiceButton active={mode === "handheld"} onClick={() => setMode("handheld")}>Handheld：移动镜头</ChoiceButton>
            <ChoiceButton active={mode === "tripod"} onClick={() => setMode("tripod")}>Tripod Pan：绕轴旋转</ChoiceButton>
            <ChoiceButton active={mode === "walk"} onClick={() => setMode("walk")}>Walkthrough：空间移动</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={blur === "low"} onClick={() => setBlur("low")}>低运动模糊</ChoiceButton>
            <ChoiceButton active={blur === "high"} onClick={() => setBlur("high")}>高运动模糊</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前素材要求：{active.constraint}。{ready ? "可以进入 Movie Clip Editor，继续建立长轨迹。" : "先改善素材或降低预期，不要用堆点数掩盖约束不足。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const TRACK_REGIONS = {
  foreground: { label: "Foreground", feature: "近景角点", risk: "动态遮挡更明显" },
  middle: { label: "Middle Ground", feature: "墙面纹理", risk: "适合建立主要轨迹" },
  background: { label: "Background", feature: "远景边缘", risk: "深度视差较弱" },
} as const;

type TrackRegion = keyof typeof TRACK_REGIONS;

export function Bl3Ch13TrackCleanupLab() {
  const [region, setRegion] = useState<TrackRegion>("middle");
  const [quality, setQuality] = useState<"stable" | "sliding">("stable");
  const [cleaned, setCleaned] = useState(false);

  function reset() {
    setRegion("middle");
    setQuality("stable");
    setCleaned(false);
  }

  const active = TRACK_REGIONS[region];
  const ready = quality === "stable" && cleaned;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch13-track-cleanup"
      aria-label={
        "Blender 第十三章轨迹清理实验：当前区域为" +
        active.label +
        "，特征是" +
        active.feature +
        "，轨迹状态为" +
        (quality === "stable" ? "稳定" : "滑动") +
        "，清理" +
        (cleaned ? "已完成" : "未完成") +
        "；结果为" +
        (ready ? "可进入解算" : active.risk) +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 13 · Track 清理实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">长而稳定的轨迹比点数更有价值</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择画面深度和轨迹状态，观察滑动点、动态点如何污染相机解算。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择轨迹区域</p>
          <div className="grid gap-2">
            <ChoiceButton active={region === "foreground"} onClick={() => setRegion("foreground")}>Foreground：近景</ChoiceButton>
            <ChoiceButton active={region === "middle"} onClick={() => setRegion("middle")}>Middle Ground：中景</ChoiceButton>
            <ChoiceButton active={region === "background"} onClick={() => setRegion("background")}>Background：远景</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={quality === "stable"} onClick={() => setQuality("stable")}>稳定轨迹</ChoiceButton>
            <ChoiceButton active={quality === "sliding"} onClick={() => setQuality("sliding")}>制造滑动</ChoiceButton>
          </div>
          <ChoiceButton active={cleaned} onClick={() => setCleaned((value) => !value)}>{cleaned ? "撤销 Track 清理" : "完成 Track 清理"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前特征：{active.feature}。{quality === "sliding" ? "这条 Track 会放大误差：先删除或重新跟踪，不要直接求解。" : cleaned ? "清理后保留持续时间、分布和误差证据。" : "先看轨迹是否粘在真实特征上，再决定是否保留。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "Track 清理图：" +
            active.label +
            "中的" +
            active.feature +
            "当前为" +
            (quality === "stable" ? "稳定轨迹" : "滑动轨迹") +
            "；清理" +
            (cleaned ? "已完成" : "未完成") +
            "，结果为" +
            (ready ? "可进入 Camera Solve" : "继续清理") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Feature → Track Path → Error Review → Camera Solve</text>
          <rect x="30" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="118" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="118" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.feature}</text>
          <circle cx="78" cy="178" r="5" fill="var(--accent)" /><circle cx="118" cy="160" r="5" fill="var(--accent)" /><circle cx="158" cy="178" r="5" fill="var(--accent)" />
          <path d={quality === "stable" ? "M78 178 Q118 132 158 178" : "M78 178 Q118 155 158 166"} fill="none" stroke={quality === "stable" ? "var(--accent)" : "var(--danger)"} strokeWidth="4" strokeDasharray={quality === "stable" ? "0" : "7 5"} />
          <path d="M224 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={quality === "stable" && cleaned ? "var(--success)" : "var(--bg)"} fillOpacity={quality === "stable" && cleaned ? 0.14 : 1} stroke={quality === "stable" && cleaned ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">误差复核</text>
          <text x="360" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{quality === "stable" ? "持续、分布、单轨误差" : "滑动 / 动态 / 短轨迹"}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill={quality === "stable" && cleaned ? "var(--success)" : "var(--text-secondary)"}>{cleaned ? "记录修正点" : "等待检查"}</text>
          <path d="M466 144 H502" stroke="var(--border)" strokeWidth="3" />
          <rect x="514" y="78" width="216" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="622" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{ready ? "可解算" : "待清理"}</text>
          <text x="622" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{ready ? "保留有效视差" : active.risk}</text>
          <text x="622" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">删除最差轨迹后重算</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Movie Clip Editor 里的每条轨迹都应能回答“跟着什么特征”</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">平均误差不能替代单轨、时间段和画面区域诊断</text>
        </svg>
      </div>
    </section>
  );
}

const SOLVE_STATES = {
  inspect: { label: "Inspect", detail: "查看轨迹与镜头参数", output: "尚未产生相机路径" },
  solve: { label: "Solve", detail: "计算焦距与逐帧位姿", output: "得到 Camera Motion" },
  align: { label: "Align", detail: "设置 Ground、Origin、Scale", output: "世界坐标可消费" },
} as const;

type SolveState = keyof typeof SOLVE_STATES;

export function Bl3Ch13SolveTestLab() {
  const [state, setState] = useState<SolveState>("inspect");
  const [geometry, setGeometry] = useState<"hidden" | "visible">("hidden");
  const [failure, setFailure] = useState(false);

  function reset() {
    setState("inspect");
    setGeometry("hidden");
    setFailure(false);
  }

  const active = SOLVE_STATES[state];
  const ready = state === "align" && geometry === "visible" && !failure;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch13-solve-test"
      aria-label={
        "Blender 第十三章解算与测试实验：当前阶段为" +
        active.label +
        "，" +
        active.detail +
        "；测试几何" +
        (geometry === "visible" ? "已放置" : "未放置") +
        "；故障注入" +
        (failure ? "开启" : "关闭") +
        "；结果为" +
        (ready ? "通过" : "待验证") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 13 · Solve 与测试实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">相机解算要回到地面、尺度和测试几何</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">推进检查、Solve、对齐和测试几何，故意注入失败来验证诊断链。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "Camera Solve 流程图：Inspect、Solve、Align 三阶段；当前为" +
            active.label +
            "，测试几何" +
            (geometry === "visible" ? "已放置" : "未放置") +
            "，故障注入" +
            (failure ? "开启" : "关闭") +
            "，结果为" +
            (ready ? "测试几何稳定粘附" : "仍需检查") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Tracks → Camera Solve → Ground / Origin / Scale → Test Geometry</text>
          <rect x="30" y="78" width="170" height="132" rx="14" fill={state === "inspect" ? "var(--accent)" : "var(--bg)"} fillOpacity={state === "inspect" ? 0.14 : 1} stroke={state === "inspect" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="115" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Inspect</text>
          <text x="115" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Track Error</text>
          <text x="115" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">去掉失败点</text>
          <path d="M218 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="190" height="132" rx="14" fill={state === "solve" ? "var(--accent)" : "var(--bg)"} fillOpacity={state === "solve" ? 0.14 : 1} stroke={state === "solve" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="361" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Solve</text>
          <path d="M310 176 Q360 108 412 176" fill="none" stroke={failure ? "var(--danger)" : "var(--accent)"} strokeWidth="5" strokeDasharray={failure ? "7 5" : "0"} />
          <text x="361" y="196" textAnchor="middle" fontSize="11" fill={failure ? "var(--danger)" : "var(--text-secondary)"}>{failure ? "漂移被注入" : "Camera Motion"}</text>
          <path d="M474 144 H510" stroke="var(--border)" strokeWidth="3" />
          <rect x="522" y="78" width="208" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="626" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{ready ? "通过" : "待验证"}</text>
          <text x="626" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{geometry === "visible" ? "几何粘附 / 阴影" : "Ground / Origin / Scale"}</text>
          <text x="626" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{failure ? "先追查失败轨迹" : active.output}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">低平均误差只是入口，真实镜头要用测试几何逐帧验收</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">地面、原点和尺度让解算结果能被后续资产消费</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">推进解算验收</p>
          <div className="grid gap-2">
            <ChoiceButton active={state === "inspect"} onClick={() => setState("inspect")}>Inspect：检查轨迹</ChoiceButton>
            <ChoiceButton active={state === "solve"} onClick={() => setState("solve")}>Solve：求解相机</ChoiceButton>
            <ChoiceButton active={state === "align"} onClick={() => setState("align")}>Align：对齐世界</ChoiceButton>
          </div>
          <ChoiceButton active={geometry === "visible"} onClick={() => setGeometry((value) => value === "visible" ? "hidden" : "visible")}>{geometry === "visible" ? "隐藏测试几何" : "放置测试几何"}</ChoiceButton>
          <ChoiceButton active={failure} onClick={() => setFailure((value) => !value)}>{failure ? "关闭失败轨迹" : "注入失败轨迹"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前阶段：{active.detail}。{ready ? "测试立方体在整段镜头中保持接触与透视，可以导出证据。" : failure ? "故障对照已开启：回到最差 Track 和对应时间段，不要盲调 Ground。" : "继续推进并记录焦距、相机路径、Ground、Origin、Scale 和最大漂移。"}
          </p>
        </div>
      </div>
    </section>
  );
}
