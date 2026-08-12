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

const SURFACES = {
  skin: {
    label: "Skin",
    base: "暖色底色",
    roughness: "中等且有局部变化",
    response: "宽而柔的高光",
  },
  cloth: {
    label: "Cloth",
    base: "服装主色",
    roughness: "较高，方向变化明显",
    response: "弱而分散的反射",
  },
  metal: {
    label: "Metal",
    base: "配件底色",
    roughness: "较低，边缘变化敏感",
    response: "清晰而集中的反射",
  },
} as const;

type SurfaceKey = keyof typeof SURFACES;

export function Bl3Ch10MaterialModelLab() {
  const [surface, setSurface] = useState<SurfaceKey>("skin");
  const [normal, setNormal] = useState(false);

  function reset() {
    setSurface("skin");
    setNormal(false);
  }

  const active = SURFACES[surface];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch10-material-model"
      aria-label={
        "Blender 第十章材质模型实验：当前表面为" +
        active.label +
        "，底色为" +
        active.base +
        "，粗糙度为" +
        active.roughness +
        "，法线细节" +
        (normal ? "已接入" : "未接入") +
        "，预期响应为" +
        active.response +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 10 · 材质模型实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">材质是输入参数与光照响应的关系</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换角色表面，观察 Base Color、Roughness 与 Normal 如何共同改变高光。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "材质模型流程图：纹理数据进入 Principled BSDF，再与灯光和几何共同产生表面响应；当前表面为" +
            active.label +
            "，底色为" +
            active.base +
            "，粗糙度为" +
            active.roughness +
            "，法线" +
            (normal ? "已连接" : "未连接") +
            "，结果是" +
            active.response +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            Texture Data → Principled BSDF → Light + Geometry → Surface Response
          </text>
          <rect x="30" y="78" width="170" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="115" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="115" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.base}</text>
          <text x="115" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">材质目标</text>
          <path d="M218 144 H254" stroke="var(--border)" strokeWidth="3" />
          <rect x="266" y="78" width="190" height="132" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="361" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Principled BSDF</text>
          <text x="361" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Color / Roughness</text>
          <text x="361" y="178" textAnchor="middle" fontSize="11" fill={normal ? "var(--success)" : "var(--text-secondary)"}>{normal ? "Normal 已接入" : "Normal 待检查"}</text>
          <path d="M474 144 H510" stroke="var(--border)" strokeWidth="3" />
          <rect x="522" y="78" width="208" height="132" rx="14" fill={normal ? "var(--success)" : "var(--bg)"} fillOpacity={normal ? 0.14 : 1} stroke={normal ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="626" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">光照下的响应</text>
          <text x="626" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.response}</text>
          <text x="626" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">高光宽度与反射</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">颜色相同不代表材质相同：粗糙度和法线决定光如何回应表面</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">逐个通道改变，才能把画面变化归因到正确输入</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变材质输入</p>
          <div className="grid gap-2">
            <ChoiceButton active={surface === "skin"} onClick={() => setSurface("skin")}>Skin：皮肤</ChoiceButton>
            <ChoiceButton active={surface === "cloth"} onClick={() => setSurface("cloth")}>Cloth：布料</ChoiceButton>
            <ChoiceButton active={surface === "metal"} onClick={() => setSurface("metal")}>Metal：金属</ChoiceButton>
          </div>
          <ChoiceButton active={normal} onClick={() => setNormal((value) => !value)}>{normal ? "断开 Normal 输入" : "接入 Normal 输入"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前观察：{active.label} 需要{active.roughness}的 Roughness。{normal ? "法线细节已加入，接下来要在固定灯光下核对表面尺度。" : "先保持几何平滑，确认 Base Color 与 Roughness 的独立作用。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const MASKS = {
  edge: { label: "边缘磨损", effect: "边缘更亮或更粗糙", reason: "按曲率和使用痕迹限定区域" },
  seam: { label: "服装接缝", effect: "沿缝线改变颜色与粗糙度", reason: "让衣服结构在光下可读" },
  face: { label: "面部区域", effect: "只在脸部混合细节层", reason: "避免细节污染头发和衣领" },
} as const;

const CHANNELS = {
  color: { label: "Base Color", mode: "sRGB 颜色", output: "颜色分区" },
  roughness: { label: "Roughness", mode: "Non-Color 数据", output: "高光宽度" },
  normal: { label: "Normal", mode: "Non-Color 数据", output: "表面方向" },
} as const;

type MaskKey = keyof typeof MASKS;
type ChannelKey = keyof typeof CHANNELS;

export function Bl3Ch10MaskChannelsLab() {
  const [mask, setMask] = useState<MaskKey>("edge");
  const [channel, setChannel] = useState<ChannelKey>("roughness");
  const [inverted, setInverted] = useState(false);

  function reset() {
    setMask("edge");
    setChannel("roughness");
    setInverted(false);
  }

  const activeMask = MASKS[mask];
  const activeChannel = CHANNELS[channel];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch10-mask-channel-mix"
      aria-label={
        "Blender 第十章遮罩与通道实验：当前区域为" +
        activeMask.label +
        "，输出通道为" +
        activeChannel.label +
        "，解释为" +
        activeChannel.mode +
        "，遮罩" +
        (inverted ? "已反转" : "未反转") +
        "，效果是" +
        activeChannel.output +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 10 · 遮罩与通道实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同一层细节要有边界，也要有正确的数值语义</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择区域与通道，观察 Mask 怎样控制混合、通道怎样决定输出含义。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变混合条件</p>
          <div className="grid gap-2">
            <ChoiceButton active={mask === "edge"} onClick={() => setMask("edge")}>边缘磨损</ChoiceButton>
            <ChoiceButton active={mask === "seam"} onClick={() => setMask("seam")}>服装接缝</ChoiceButton>
            <ChoiceButton active={mask === "face"} onClick={() => setMask("face")}>面部区域</ChoiceButton>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <ChoiceButton active={channel === "color"} onClick={() => setChannel("color")}>Color</ChoiceButton>
            <ChoiceButton active={channel === "roughness"} onClick={() => setChannel("roughness")}>Roughness</ChoiceButton>
            <ChoiceButton active={channel === "normal"} onClick={() => setChannel("normal")}>Normal</ChoiceButton>
          </div>
          <ChoiceButton active={inverted} onClick={() => setInverted((value) => !value)}>{inverted ? "恢复 Mask 方向" : "反转 Mask"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {activeMask.label} 将{activeMask.reason}；当前写入 {activeChannel.label}，会改变{activeChannel.output}。{inverted ? "反转后，细节落到原来未选中的区域。" : "保持原方向，先检查灰度范围是否连续。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "遮罩与通道混合图：区域遮罩" +
            activeMask.label +
            "进入 Layer Mix，再写入" +
            activeChannel.label +
            "；数据解释是" +
            activeChannel.mode +
            "，遮罩" +
            (inverted ? "已反转" : "未反转") +
            "，产生" +
            activeChannel.output +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Mask → Layer Mix → Channel Meaning → Material Input</text>
          <rect x="32" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="120" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{activeMask.label}</text>
          <path d={inverted ? "M70 174 Q120 112 170 174" : "M70 136 Q120 198 170 136"} fill="none" stroke={inverted ? "var(--warning)" : "var(--accent)"} strokeWidth="7" />
          <text x="120" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{inverted ? "反转：0 ↔ 1" : "灰度：0 → 1"}</text>
          <path d="M226 144 H262" stroke="var(--border)" strokeWidth="3" />
          <rect x="274" y="78" width="176" height="132" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="362" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Layer Mix</text>
          <rect x="310" y="136" width="104" height="18" rx="9" fill="var(--accent)" fillOpacity="0.24" />
          <rect x="310" y="160" width={inverted ? 42 : 82} height="18" rx="9" fill={inverted ? "var(--warning)" : "var(--success)"} fillOpacity="0.45" />
          <text x="362" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{inverted ? "局部被换向" : "按区域混合"}</text>
          <path d="M468 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="214" height="132" rx="14" fill={channel === "color" ? "var(--accent)" : "var(--success)"} fillOpacity="0.12" stroke={channel === "color" ? "var(--accent)" : "var(--success)"} strokeWidth="2" />
          <text x="623" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{activeChannel.label}</text>
          <text x="623" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{activeChannel.mode}</text>
          <text x="623" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{activeChannel.output}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Mask 只负责“在哪里混合”，Channel 决定“混合结果代表什么”</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">把颜色当数据或把数据当颜色，都会让材质响应失真</text>
        </svg>
      </div>
    </section>
  );
}

const VIEWS = {
  close: { label: "近景", evidence: "高光宽度、法线细节与接缝", distance: "放大检查局部" },
  medium: { label: "中景", evidence: "材质分区、粗糙度层级与颜色关系", distance: "检查角色整体" },
  silhouette: { label: "轮廓角度", evidence: "反射强弱与形体边界", distance: "观察材质是否仍可区分" },
} as const;

type ViewKey = keyof typeof VIEWS;

export function Bl3Ch10RenderTestLab() {
  const [view, setView] = useState<ViewKey>("close");
  const [renderer, setRenderer] = useState<"eevee" | "cycles">("eevee");
  const [tested, setTested] = useState(false);

  function reset() {
    setView("close");
    setRenderer("eevee");
    setTested(false);
  }

  const active = VIEWS[view];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch10-controlled-render-test"
      aria-label={
        "Blender 第十章受控渲染测试实验：当前视角为" +
        active.label +
        "，渲染器为" +
        (renderer === "eevee" ? "EEVEE" : "Cycles") +
        "，检查" +
        active.evidence +
        "，测试" +
        (tested ? "已完成" : "尚未完成") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 10 · Render Test 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">固定灯光，才能知道哪个通道真的改变了画面</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择观察距离和渲染器，建立可重复的材质验收矩阵。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "受控渲染测试图：固定三点灯、相机和曝光，使用" +
            (renderer === "eevee" ? "EEVEE" : "Cycles") +
            "渲染" +
            active.label +
            "；重点观察" +
            active.evidence +
            "；测试" +
            (tested ? "已完成并记录" : "待执行") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Fixed Light + Camera → Render Test → Evidence</text>
          <rect x="32" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="120" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">固定基线</text>
          <text x="120" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">三点灯 / 曝光</text>
          <text x="120" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同一相机</text>
          <path d="M226 144 H262" stroke="var(--border)" strokeWidth="3" />
          <rect x="274" y="78" width="176" height="132" rx="14" fill={tested ? "var(--success)" : "var(--bg)"} fillOpacity={tested ? 0.14 : 1} stroke={tested ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="362" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{renderer === "eevee" ? "EEVEE" : "Cycles"}</text>
          <text x="362" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="362" y="178" textAnchor="middle" fontSize="11" fill={tested ? "var(--success)" : "var(--text-secondary)"}>{tested ? "已记录对照" : "等待渲染"}</text>
          <path d="M468 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="214" height="132" rx="14" fill={tested ? "var(--success)" : "var(--bg)"} fillOpacity={tested ? 0.14 : 1} stroke={tested ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="623" y="114" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{tested ? "证据" : "待判断"}</text>
          <text x="623" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.evidence}</text>
          <text x="623" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.distance}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Render Test 不追求一张“最漂亮”的图，而是固定变量后比较输入影响</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">同时保留预期、实际和渲染器差异，才能定位材质故障</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择测试矩阵</p>
          <div className="grid gap-2">
            <ChoiceButton active={view === "close"} onClick={() => setView("close")}>近景：局部细节</ChoiceButton>
            <ChoiceButton active={view === "medium"} onClick={() => setView("medium")}>中景：材质分区</ChoiceButton>
            <ChoiceButton active={view === "silhouette"} onClick={() => setView("silhouette")}>轮廓：反射边界</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={renderer === "eevee"} onClick={() => setRenderer("eevee")}>EEVEE</ChoiceButton>
            <ChoiceButton active={renderer === "cycles"} onClick={() => setRenderer("cycles")}>Cycles</ChoiceButton>
          </div>
          <ChoiceButton active={tested} onClick={() => setTested((value) => !value)}>{tested ? "清除 Render Test 记录" : "执行 Render Test"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前重点：{active.evidence}。{tested ? "记录这张图与输入参数，再换一个距离复核。" : "先锁定灯光、曝光和相机，再执行一次可比较的测试。"}
          </p>
        </div>
      </div>
    </section>
  );
}
