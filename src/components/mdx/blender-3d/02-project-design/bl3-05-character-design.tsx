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

const ARCHETYPES = {
  scout: { label: "Scout", story: "轻快、警觉、擅长寻找路径", shape: "窄肩 + 长腿", pose: "前倾重心" },
  guardian: { label: "Guardian", story: "可靠、稳重、保护同伴", shape: "宽肩 + 厚躯干", pose: "低重心" },
  tinkerer: { label: "Tinkerer", story: "好奇、修补、携带工具", shape: "不对称附件", pose: "侧身观察" },
} as const;

type ArchetypeKey = keyof typeof ARCHETYPES;

export function Bl3Ch05SilhouetteLab() {
  const [archetype, setArchetype] = useState<ArchetypeKey>("scout");
  const [detail, setDetail] = useState<"silhouette" | "prototype">("silhouette");

  function reset() {
    setArchetype("scout");
    setDetail("silhouette");
  }

  const active = ARCHETYPES[archetype];
  const bodyPath = archetype === "scout"
    ? "M210 248 C210 208 226 184 242 168 L232 120 L248 90 L264 120 L256 168 C278 184 294 208 294 248 Z"
    : archetype === "guardian"
      ? "M196 248 C198 208 214 178 230 162 L224 112 L242 82 L260 112 L254 162 C280 178 306 208 308 248 Z"
      : "M202 248 C204 208 224 184 240 168 L230 118 L248 88 L266 118 L260 168 C286 184 300 208 300 248 Z";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch05-silhouette-brief"
      aria-label="Blender 第五章角色描述与剪影实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 5 · 语义到形状实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先验证剪影，再投入细节</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择角色语义，观察故事、体块、重心和识别度如何互相约束。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <svg viewBox="0 0 760 350" role="img" aria-label={"剪影实验：当前角色为" + active.label + "，故事是" + active.story + "；形状语言为" + active.shape + "；当前证据为" + (detail === "silhouette" ? "黑色剪影" : "基型原型") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Character Description → Shape Language → Silhouette</text>
          <rect x="38" y="74" width="218" height="138" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="147" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="147" y="140" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.story}</text>
          <text x="147" y="172" textAnchor="middle" fontSize="12" fill="var(--accent)">{active.pose}</text>
          <path d="M276 142 H316" stroke="var(--border)" strokeWidth="3" />
          <rect x="328" y="74" width="198" height="138" rx="14" fill={detail === "silhouette" ? "var(--accent)" : "var(--bg)"} fillOpacity={detail === "silhouette" ? 0.12 : 1} stroke={detail === "silhouette" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <path d={bodyPath} fill={detail === "silhouette" ? "var(--text-primary)" : "var(--accent)"} fillOpacity={detail === "silhouette" ? 0.9 : 0.28} stroke="var(--accent)" strokeWidth="2" />
          <text x="427" y="242" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{detail === "silhouette" ? "黑色剪影：先看轮廓与重心" : "基型原型：检查体块与动作"}</text>
          <path d="M546 142 H586" stroke="var(--border)" strokeWidth="3" />
          <rect x="598" y="74" width="124" height="138" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="660" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">识别度</text>
          <text x="660" y="142" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">形状</text>
          <text x="660" y="170" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">重心</text>
          <text x="380" y="298" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">缩到最终镜头尺寸，细节消失后仍应读出角色身份</text>
          <text x="380" y="324" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先画多案，再用 brief 选择可进入建模的方案</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变设计输入</p>
          <div className="grid gap-2">
            <ChoiceButton active={archetype === "scout"} onClick={() => setArchetype("scout")}>Scout：轻快</ChoiceButton>
            <ChoiceButton active={archetype === "guardian"} onClick={() => setArchetype("guardian")}>Guardian：稳重</ChoiceButton>
            <ChoiceButton active={archetype === "tinkerer"} onClick={() => setArchetype("tinkerer")}>Tinkerer：好奇</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={detail === "silhouette"} onClick={() => setDetail("silhouette")}>看剪影</ChoiceButton>
            <ChoiceButton active={detail === "prototype"} onClick={() => setDetail("prototype")}>看基型</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前方案用{active.shape}承载“{active.story}”；若缩小后仍能辨认，才值得继续细化。
          </p>
        </div>
      </div>
    </section>
  );
}

const PALETTES = {
  warm: { label: "Warm", primary: "var(--warning)", secondary: "var(--accent)", accent: "var(--danger)", mood: "亲近、热烈" },
  cool: { label: "Cool", primary: "var(--accent)", secondary: "var(--success)", accent: "var(--text-primary)", mood: "冷静、距离" },
  neutral: { label: "Neutral", primary: "var(--text-secondary)", secondary: "var(--border)", accent: "var(--text-primary)", mood: "克制、工具感" },
} as const;

type PaletteKey = keyof typeof PALETTES;

export function Bl3Ch05ColorHierarchyLab() {
  const [palette, setPalette] = useState<PaletteKey>("warm");
  const [emphasis, setEmphasis] = useState<"face" | "prop">("face");

  function reset() {
    setPalette("warm");
    setEmphasis("face");
  }

  const active = PALETTES[palette];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch05-color-hierarchy"
      aria-label="Blender 第五章颜色与层级实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 5 · 配色实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">颜色服务于识别层级</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换情绪和视觉焦点，观察主色、辅色与强调色的职责。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg viewBox="0 0 760 310" role="img" aria-label={"颜色实验：当前" + active.label + "调，情绪为" + active.mood + "；强调焦点是" + (emphasis === "face" ? "面部" : "道具") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Color Palette → Value Hierarchy → Character Read</text>
          <rect x="42" y="76" width="168" height="150" rx="14" fill={active.primary} />
          <text x="126" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">主色</text>
          <text x="126" y="146" textAnchor="middle" fontSize="12" fill="white">躯干与大面积</text>
          <text x="126" y="178" textAnchor="middle" fontSize="11" fill="white">{active.mood}</text>
          <rect x="236" y="76" width="168" height="150" rx="14" fill={active.secondary} />
          <text x="320" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">辅色</text>
          <text x="320" y="146" textAnchor="middle" fontSize="12" fill="var(--text-primary)">服装与层次</text>
          <text x="320" y="178" textAnchor="middle" fontSize="11" fill="var(--text-primary)">扩展形状语言</text>
          <rect x="430" y="76" width="168" height="150" rx="14" fill={active.accent} />
          <text x="514" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">强调色</text>
          <text x="514" y="146" textAnchor="middle" fontSize="12" fill="white">{emphasis === "face" ? "面部焦点" : "道具焦点"}</text>
          <text x="514" y="178" textAnchor="middle" fontSize="11" fill="white">不应到处平均分布</text>
          <rect x="624" y="76" width="100" height="150" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="674" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">验收</text>
          <text x="674" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">缩略图</text>
          <text x="674" y="174" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">灰度</text>
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">关掉颜色后仍应读出主次关系，颜色不能承担唯一识别责任</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变配色约束</p>
          <div className="grid gap-2">
            <ChoiceButton active={palette === "warm"} onClick={() => setPalette("warm")}>Warm：亲近</ChoiceButton>
            <ChoiceButton active={palette === "cool"} onClick={() => setPalette("cool")}>Cool：距离</ChoiceButton>
            <ChoiceButton active={palette === "neutral"} onClick={() => setPalette("neutral")}>Neutral：克制</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={emphasis === "face"} onClick={() => setEmphasis("face")}>强调面部</ChoiceButton>
            <ChoiceButton active={emphasis === "prop"} onClick={() => setEmphasis("prop")}>强调道具</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前强调{emphasis === "face" ? "面部" : "道具"}；动手试时再切成灰度和缩略尺寸，检查层级是否仍然成立。
          </p>
        </div>
      </div>
    </section>
  );
}

export function Bl3Ch05ReferenceAlignmentLab() {
  const [view, setView] = useState<"front" | "side">("front");
  const [aligned, setAligned] = useState(true);
  const [guide, setGuide] = useState(true);

  function reset() {
    setView("front");
    setAligned(true);
    setGuide(true);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch05-reference-alignment"
      aria-label="Blender 第五章正侧参考图对齐实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 5 · 建模蓝图实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">正侧参考图要共享基准线</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换视图、辅助线和对齐状态，观察概念图何时成为可用建模约束。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变参考条件</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={view === "front"} onClick={() => setView("front")}>Front View</ChoiceButton>
            <ChoiceButton active={view === "side"} onClick={() => setView("side")}>Side View</ChoiceButton>
          </div>
          <ChoiceButton active={guide} onClick={() => setGuide((value) => !value)}>{guide ? "隐藏水平辅助线" : "显示水平辅助线"}</ChoiceButton>
          <ChoiceButton active={aligned} onClick={() => setAligned((value) => !value)}>{aligned ? "制造错位样本" : "恢复对齐样本"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前为{view === "front" ? "正面" : "侧面"}视图，{guide ? "辅助线已显示" : "辅助线已隐藏"}；{aligned ? "关键点对齐" : "关键点存在偏差"}。
          </p>
        </div>

        <svg viewBox="0 0 760 310" role="img" aria-label={"参考图实验：当前为" + (view === "front" ? "正面" : "侧面") + "视图，辅助线" + (guide ? "显示" : "隐藏") + "，关键点" + (aligned ? "对齐" : "错位") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Reference Images · Front / Side · Shared Guides</text>
          <rect x="48" y="70" width="300" height="162" rx="14" fill="var(--bg)" stroke={view === "front" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <rect x="412" y="70" width="300" height="162" rx="14" fill="var(--bg)" stroke={view === "side" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="198" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Front</text>
          <text x="562" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Side</text>
          <path d="M188 204 L188 132 M188 132 L164 112 M188 132 L212 112 M188 160 L164 188 M188 160 L212 188" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
          <path d="M552 204 L552 132 M552 132 L532 114 M552 132 L574 122 M552 160 L530 188 M552 160 L576 184" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
          {guide && <><path d="M68 112 H692 M68 132 H692 M68 160 H692 M68 188 H692" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 5" /><text x="380" y="126" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">眼 / 肩 / 髋 / 膝基准</text></>}
          {!aligned && <path d="M552 132 L552 146 M552 160 L552 174" stroke="var(--danger)" strokeWidth="3" />}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill={aligned ? "var(--success)" : "var(--danger)"}>{aligned ? "对齐样本：建模者可按共同基线开始" : "错位样本：先修参考图，不要让建模者猜比例"}</text>
          <text x="380" y="290" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录头顶、眼、肩、肘、髋、膝、踝和地面的偏差</text>
        </svg>
      </div>
    </section>
  );
}
