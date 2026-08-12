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

const LIGHTING_RIGS = {
  threePoint: {
    label: "Three-point",
    detail: "Key / Fill / Rim",
    reading: "轮廓、体积和材质反应可分开读",
  },
  side: {
    label: "Side key",
    detail: "Key 强，Fill 弱",
    reading: "形体清楚，但暗部需要检查细节",
  },
  flat: {
    label: "Flat ambient",
    detail: "Ambient 偏高",
    reading: "阴影和方向感被抹平",
  },
} as const;

type LightingRig = keyof typeof LIGHTING_RIGS;

export function Bl3Ch14LightingLab() {
  const [rig, setRig] = useState<LightingRig>("threePoint");
  const [ao, setAo] = useState<"on" | "off">("on");

  function reset() {
    setRig("threePoint");
    setAo("on");
  }

  const active = LIGHTING_RIGS[rig];
  const readable = rig !== "flat" && ao === "on";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch14-lighting-design"
      aria-label={`Blender 第十四章灯光实验：${active.label}，${active.detail}，Ambient Occlusion ${ao === "on" ? "开启" : "关闭"}；材质读取${readable ? "清楚" : "需要复核"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 14 · Lighting 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先建立光照关系，再谈材质像不像</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换灯光布局和环境遮蔽，观察方向、体积、接触与暗部细节如何共同构成真实镜头的读法。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`灯光链路：${active.detail}进入 Ambient Occlusion 和材质读取；当前结果为${readable ? "可用于匹配" : "需要调整"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Light Direction → Surface Response → Occlusion → Camera Read</text>
          <rect x="28" y="78" width="174" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="115" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <circle cx="78" cy="177" r="11" fill="var(--warning)" fillOpacity="0.8" /><path d="M93 177 H169" stroke="var(--warning)" strokeWidth="7" strokeLinecap="round" />
          <path d="M220 144 H255" stroke="var(--border)" strokeWidth="3" />
          <rect x="267" y="78" width="178" height="132" rx="14" fill={rig === "flat" ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={rig === "flat" ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="356" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Surface Response</text>
          <path d="M310 176 Q356 126 402 176" fill="none" stroke={rig === "flat" ? "var(--warning)" : "var(--success)"} strokeWidth="6" />
          <text x="356" y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{rig === "flat" ? "方向差变小" : "高光 / 阴影有方向"}</text>
          <path d="M463 144 H498" stroke="var(--border)" strokeWidth="3" />
          <rect x="510" y="78" width="222" height="132" rx="14" fill={readable ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={readable ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="621" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">AO / Indirect</text>
          <text x="621" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{ao === "on" ? "接触关系可见" : "接触关系变弱"}</text>
          <text x="621" y="176" textAnchor="middle" fontSize="11" fill={readable ? "var(--success)" : "var(--warning)"}>{readable ? "可进入镜头验收" : "回到 Key / Fill 检查"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">灯光不是越亮越真实，而是要解释形体和镜头方向</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先固定曝光与色彩管理，再比较灯光变量</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变光照前提</p>
          <div className="grid gap-2">
            <ChoiceButton active={rig === "threePoint"} onClick={() => setRig("threePoint")}>Three-point：Key / Fill / Rim</ChoiceButton>
            <ChoiceButton active={rig === "side"} onClick={() => setRig("side")}>Side key：强化方向</ChoiceButton>
            <ChoiceButton active={rig === "flat"} onClick={() => setRig("flat")}>Flat ambient：环境偏平</ChoiceButton>
          </div>
          <ChoiceButton active={ao === "on"} onClick={() => setAo((value) => (value === "on" ? "off" : "on"))}>{ao === "on" ? "关闭 Ambient Occlusion" : "开启 Ambient Occlusion"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前判定：{active.reading}。{readable ? "保留这组设置，进入 Compositing 前记录灯光、曝光与材质基线。" : "不要用提高整体亮度掩盖关系丢失；先恢复方向光和接触证据。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const COMPOSITE_PASSES = {
  beauty: { label: "Beauty", detail: "完整渲染结果", output: "颜色与轮廓" },
  ao: { label: "AO pass", detail: "接触和局部遮蔽", output: "空间关系" },
  depth: { label: "Depth pass", detail: "按深度分层", output: "景深与雾" },
} as const;

type CompositePass = keyof typeof COMPOSITE_PASSES;

export function Bl3Ch14CompositeLab() {
  const [pass, setPass] = useState<CompositePass>("beauty");
  const [grade, setGrade] = useState(false);
  const [mask, setMask] = useState(false);

  function reset() {
    setPass("beauty");
    setGrade(false);
    setMask(false);
  }

  const active = COMPOSITE_PASSES[pass];
  const ready = grade && mask && pass !== "beauty";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch14-compositing-passes"
      aria-label={`Blender 第十四章合成实验：${active.label}，${active.detail}，色彩调整${grade ? "开启" : "关闭"}，遮罩${mask ? "开启" : "关闭"}；结果${ready ? "可复核" : "证据不完整"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 14 · Compositing 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把渲染拆成能解释的通道</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择 Render Pass，再打开色彩调整和遮罩；每一步都应该能回答“改了什么、证据在哪里”。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择合成输入</p>
          <div className="grid gap-2">
            <ChoiceButton active={pass === "beauty"} onClick={() => setPass("beauty")}>Beauty：完整颜色</ChoiceButton>
            <ChoiceButton active={pass === "ao"} onClick={() => setPass("ao")}>AO pass：接触关系</ChoiceButton>
            <ChoiceButton active={pass === "depth"} onClick={() => setPass("depth")}>Depth pass：深度分层</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={grade} onClick={() => setGrade((value) => !value)}>{grade ? "关闭 Color Grade" : "开启 Color Grade"}</ChoiceButton>
            <ChoiceButton active={mask} onClick={() => setMask((value) => !value)}>{mask ? "关闭 Mask" : "开启 Mask"}</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前输入：{active.detail}。{ready ? "现在可以对比节点前后，并保存一张可回退的 Composite Output。" : "只看 Beauty 或缺少 Mask 时，无法证明局部修正没有污染整张画面。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`合成节点链路：${active.label}进入${grade ? "Color Grade" : "未调整"}和${mask ? "Mask" : "未遮罩"}，输出${active.output}；${ready ? "可以复核" : "证据不完整"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Render Pass → Nodes → Mask / Grade → Composite Output</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">保留原始通道</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={grade ? "var(--success)" : "var(--bg)"} fillOpacity={grade ? 0.12 : 1} stroke={grade ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Node Stack</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{grade ? "Color Grade" : "未调整"}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mask ? "局部 Mask" : "全画面"}</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Composite Output</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "有可回退证据" : "先补齐通道"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">合成节点应保持输入可追溯、局部修正可关闭</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">AO 与 Depth 是诊断关系的证据，不只是装饰效果</text>
        </svg>
      </div>
    </section>
  );
}

const RENDER_CONFIGS = {
  preview: { label: "Preview", detail: "低分辨率、快速反馈", budget: "先测曝光和构图" },
  final: { label: "Final", detail: "目标分辨率、可交付", budget: "锁定采样和输出" },
} as const;

type RenderConfig = keyof typeof RENDER_CONFIGS;

export function Bl3Ch14RenderDeliveryLab() {
  const [engine, setEngine] = useState<"eevee" | "cycles">("eevee");
  const [config, setConfig] = useState<RenderConfig>("preview");
  const [tested, setTested] = useState(false);

  function reset() {
    setEngine("eevee");
    setConfig("preview");
    setTested(false);
  }

  const active = RENDER_CONFIGS[config];
  const ready = tested && config === "final";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch14-render-delivery"
      aria-label={`Blender 第十四章渲染交付实验：${engine === "eevee" ? "EEVEE" : "Cycles"}，${active.label}，测试${tested ? "已完成" : "未完成"}；交付状态${ready ? "通过" : "待验收"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 14 · Rendering 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先用小样本锁定，再把预算交给最终帧</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择渲染器和质量档位，执行一次受控测试；没有色彩、采样和输出记录的 Final 只是不可复现的截图。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`渲染交付链路：${engine === "eevee" ? "EEVEE" : "Cycles"}，${active.detail}，测试${tested ? "完成" : "未完成"}；${ready ? "可交付" : "需要继续验收"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Scene → Render Settings → Color Management → Review / Delivery</text>
          <rect x="28" y="78" width="174" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Scene</text>
          <text x="115" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">灯光 / 相机 / 合成</text>
          <text x="115" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定版本</text>
          <path d="M224 144 H258" stroke="var(--border)" strokeWidth="3" />
          <rect x="270" y="78" width="180" height="132" rx="14" fill={engine === "cycles" ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={engine === "cycles" ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{engine === "eevee" ? "EEVEE" : "Cycles"}</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.budget}</text>
          <path d="M472 144 H506" stroke="var(--border)" strokeWidth="3" />
          <rect x="518" y="78" width="214" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="625" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Review</text>
          <text x="625" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">曝光 / 色彩 / 格式</text>
          <text x="625" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "通过交付门槛" : "等待测试"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Preview 用来发现问题，Final 用来交付可复现结果</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录引擎、采样、分辨率、色彩管理和输出格式</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">设置渲染验收</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={engine === "eevee"} onClick={() => setEngine("eevee")}>EEVEE：快速反馈</ChoiceButton>
            <ChoiceButton active={engine === "cycles"} onClick={() => setEngine("cycles")}>Cycles：物理采样</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={config === "preview"} onClick={() => setConfig("preview")}>Preview：小样本</ChoiceButton>
            <ChoiceButton active={config === "final"} onClick={() => setConfig("final")}>Final：目标输出</ChoiceButton>
          </div>
          <ChoiceButton active={tested} onClick={() => setTested((value) => !value)}>{tested ? "撤销渲染测试" : "完成渲染测试"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前判定：{tested ? "已经有一次测试结果" : "还没有测试结果"}。{ready ? "锁定设置并保存输出元数据，才可作为发布资产。" : "先用 Preview 验证，再切换 Final；不要直接把未经测试的高质量设置当作验收。"}
          </p>
        </div>
      </div>
    </section>
  );
}
