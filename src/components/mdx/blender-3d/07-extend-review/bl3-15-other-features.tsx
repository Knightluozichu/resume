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

const FEATURE_ROUTES = {
  motion: {
    label: "Simulations；2D Animation",
    input: "时间、力、笔画",
    tool: "缓存 / 关键帧",
    output: "可复查的运动",
    evidence: "缓存、帧范围和碰撞设置",
  },
  vfx: {
    label: "VFX: Masking, Object Tracking, and Video Stabilization；Video Editing",
    input: "镜头、特征、遮罩",
    tool: "Track / Mask / Edit",
    output: "稳定的镜头序列",
    evidence: "轨迹、遮罩边缘和时间线",
  },
  surface: {
    label: "Sculpting；Retopology；Maps Baking",
    input: "高模细节、UV",
    tool: "形体 / 拓扑 / 烘焙",
    output: "可消费的低模",
    evidence: "面流、UV、法线和贴图",
  },
  automation: {
    label: "Add-Ons；Python Scripting",
    input: "稳定的命名规则",
    tool: "插件 / 脚本",
    output: "可撤销的批处理",
    evidence: "版本、日志和回滚",
  },
} as const;

type FeatureRoute = keyof typeof FEATURE_ROUTES;

export function Bl3Ch15FeatureRouteLab() {
  const [route, setRoute] = useState<FeatureRoute>("motion");
  const [tested, setTested] = useState(false);
  const active = FEATURE_ROUTES[route];

  function reset() {
    setRoute("motion");
    setTested(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch15-feature-route"
      aria-label={`Blender 第十五章能力路线实验：${active.label}，输入是${active.input}，输出是${active.output}；最小实验${tested ? "已完成" : "未完成"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 15 · 能力地图实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先从项目瓶颈选择路线</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一个扩展方向，检查它的输入、处理、输出和验收证据是否能接入现有资产链。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择项目瓶颈</p>
          <div className="grid gap-2">
            <ChoiceButton active={route === "motion"} onClick={() => setRoute("motion")}>Simulation / 2D Animation</ChoiceButton>
            <ChoiceButton active={route === "vfx"} onClick={() => setRoute("vfx")}>VFX / Video Editing</ChoiceButton>
            <ChoiceButton active={route === "surface"} onClick={() => setRoute("surface")}>Sculpt / Retopo / Bake</ChoiceButton>
            <ChoiceButton active={route === "automation"} onClick={() => setRoute("automation")}>Add-on / Python</ChoiceButton>
          </div>
          <ChoiceButton active={tested} onClick={() => setTested((value) => !value)}>{tested ? "撤销最小实验" : "完成最小实验"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前路线：{active.label}。{tested ? `已记录${active.evidence}，可以比较手工基线与新流程。` : "先固定一个输入资产和一个可测量的输出，再决定是否深入。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`能力路线数据流：${active.input}进入${active.tool}，输出${active.output}，验收依据为${active.evidence}；${tested ? "实验通过记录" : "等待实验记录"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Bottleneck → Tool Route → Asset Output → Evidence</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Input</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input}</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定版本</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Route</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.tool}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">控制成本 / 参数</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={tested ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={tested ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Output</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={tested ? "var(--success)" : "var(--warning)"}>{tested ? "证据已记录" : "需要验收"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">扩展功能只有接入输入输出，才属于生产能力</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先做一个固定资产的最小实验，再决定学习投入</text>
        </svg>
      </div>
    </section>
  );
}

const SURFACE_STAGES = {
  sculpt: { label: "Sculpting", detail: "探索高模形体", output: "高模细节" },
  retopo: { label: "Retopology", detail: "重建可变形面流", output: "干净低模" },
  bake: { label: "Maps Baking", detail: "转移高模信息", output: "法线 / AO 贴图" },
} as const;

type SurfaceStage = keyof typeof SURFACE_STAGES;

export function Bl3Ch15SculptBakingLab() {
  const [stage, setStage] = useState<SurfaceStage>("sculpt");
  const [uvReady, setUvReady] = useState(false);
  const [baked, setBaked] = useState(false);
  const active = SURFACE_STAGES[stage];
  const ready = stage === "bake" && uvReady && baked;

  function reset() {
    setStage("sculpt");
    setUvReady(false);
    setBaked(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch15-sculpt-retopo-bake"
      aria-label={`Blender 第十五章雕刻烘焙实验：当前阶段${active.label}，${active.detail}，UV${uvReady ? "已准备" : "未准备"}，烘焙${baked ? "已完成" : "未完成"}；结果${ready ? "可用于低模" : "需要继续检查"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 15 · Sculpt / Retopo / Bake</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">高模细节必须有路径进入低模</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换形体探索、面流重建和贴图烘焙，观察每个阶段的输入约束与交接证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`高模到低模数据流：${active.label}阶段${active.detail}，输出${active.output}；UV${uvReady ? "准备完成" : "未准备"}，烘焙${baked ? "完成" : "未完成"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">High-poly Detail → Topology → UV / Maps → Low-poly Asset</text>
          <rect x="28" y="78" width="174" height="132" rx="14" fill={stage === "sculpt" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "sculpt" ? 0.12 : 1} stroke={stage === "sculpt" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="115" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Sculpt</text>
          <path d="M75 178 Q115 128 155 178" fill="none" stroke={stage === "sculpt" ? "var(--accent)" : "var(--border)"} strokeWidth="6" />
          <text x="115" y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">高模细节</text>
          <path d="M224 144 H258" stroke="var(--border)" strokeWidth="3" />
          <rect x="270" y="78" width="180" height="132" rx="14" fill={stage === "retopo" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "retopo" ? 0.12 : 1} stroke={stage === "retopo" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Retopology</text>
          <path d="M308 176 H412 M320 154 H400 M330 132 H390" stroke={stage === "retopo" ? "var(--accent)" : "var(--border)"} strokeWidth="3" />
          <text x="360" y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">面流和变形</text>
          <path d="M472 144 H506" stroke="var(--border)" strokeWidth="3" />
          <rect x="518" y="78" width="214" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="625" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Maps Baking</text>
          <text x="625" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">UV：{uvReady ? "ready" : "missing"}</text>
          <text x="625" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "低模可消费" : "检查 Cage / UV"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">拓扑和 UV 是高模信息进入生产资产的接口</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">烘焙前固定法线、Cage、UV 和贴图分辨率</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">推进资产阶段</p>
          <div className="grid gap-2">
            <ChoiceButton active={stage === "sculpt"} onClick={() => setStage("sculpt")}>Sculpting：探索细节</ChoiceButton>
            <ChoiceButton active={stage === "retopo"} onClick={() => setStage("retopo")}>Retopology：整理面流</ChoiceButton>
            <ChoiceButton active={stage === "bake"} onClick={() => setStage("bake")}>Maps Baking：转移信息</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={uvReady} onClick={() => setUvReady((value) => !value)}>{uvReady ? "撤销 UV 检查" : "完成 UV 检查"}</ChoiceButton>
            <ChoiceButton active={baked} onClick={() => setBaked((value) => !value)}>{baked ? "撤销烘焙" : "完成烘焙"}</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前阶段：{active.detail}。{ready ? "保存高模、低模、UV、Cage 和贴图后，才能把结果交给材质阶段。" : "不要只看高模截图；先确认面流、UV 和烘焙设置能让下游资产接收结果。"}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Bl3Ch15AutomationLab() {
  const [tool, setTool] = useState<"addon" | "python">("addon");
  const [rule, setRule] = useState<"stable" | "unclear">("stable");
  const [tested, setTested] = useState(false);
  const ready = rule === "stable" && tested;

  function reset() {
    setTool("addon");
    setRule("stable");
    setTested(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch15-addon-python"
      aria-label={`Blender 第十五章自动化实验：当前使用${tool === "addon" ? "Add-Ons" : "Python Scripting"}，规则${rule === "stable" ? "稳定" : "不清晰"}，测试${tested ? "已完成" : "未完成"}；结果${ready ? "可回滚" : "不应批量执行"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 15 · Add-on / Python 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">自动化前先证明规则稳定</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换 Add-on 与 Python，故意制造不清晰的命名规则，观察为什么批处理必须带日志和撤销路径。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择自动化方案</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={tool === "addon"} onClick={() => setTool("addon")}>Add-Ons：现成能力</ChoiceButton>
            <ChoiceButton active={tool === "python"} onClick={() => setTool("python")}>Python Scripting：自定义规则</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={rule === "stable"} onClick={() => setRule("stable")}>规则稳定</ChoiceButton>
            <ChoiceButton active={rule === "unclear"} onClick={() => setRule("unclear")}>规则不清晰</ChoiceButton>
          </div>
          <ChoiceButton active={tested} onClick={() => setTested((value) => !value)}>{tested ? "撤销小批量测试" : "完成小批量测试"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前判定：{tool === "addon" ? "优先检查插件版本和导出设置" : "优先检查 API 版本、输入选择和异常处理"}。{ready ? "规则稳定且测试过，可以保存日志后扩大批量。" : "规则或测试不足时不要批量改写生产文件，先保留手工基线。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`自动化链路：${tool === "addon" ? "Add-Ons" : "Python Scripting"}读取输入，规则${rule === "stable" ? "稳定" : "不清晰"}，小批量测试${tested ? "完成" : "未完成"}；批处理${ready ? "可回滚" : "被阻止"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input Selection → Rule → Batch Action → Log / Undo</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Input</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">选中的 Datablock</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">保存手工基线</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={rule === "stable" ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={rule === "stable" ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{tool === "addon" ? "Add-on" : "Python"}</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{rule === "stable" ? "规则可预测" : "规则有歧义"}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本 / 异常处理</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Batch / Undo</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">日志与结果对照</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "可扩大批次" : "先停在小样本"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">自动化的最低标准是可解释、可重复、可撤销</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录 API 版本、输入范围、日志和失败恢复步骤</text>
        </svg>
      </div>
    </section>
  );
}
