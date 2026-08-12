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
  planar: { label: "Planar", detail: "沿一个平面投影，适合平面部件", distortion: "侧面会拉伸" },
  cylindrical: { label: "Cylindrical", detail: "绕轴展开，适合躯干或管状部件", distortion: "两端需要处理" },
  seam: { label: "Seam + Unwrap", detail: "先标记接缝，再让岛沿切口摊平", distortion: "接缝位置决定可见跳变" },
} as const;

type MethodKey = keyof typeof METHODS;

export function Bl3Ch08UnwrapProjectionLab() {
  const [method, setMethod] = useState<MethodKey>("planar");
  const [overlay, setOverlay] = useState<"stretch" | "checker">("stretch");

  function reset() {
    setMethod("planar");
    setOverlay("stretch");
  }

  const active = METHODS[method];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch08-unwrapping-projection"
      aria-label="Blender 第八章 UV 展开与失真实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 8 · 展开原理实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">UV 岛是曲面与平面之间的折中</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换投影方法与检查覆盖层，观察接缝、拉伸和格子形变。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg viewBox="0 0 760 320" role="img" aria-label={"UV 展开实验：当前方法为" + active.label + "，" + active.detail + "；覆盖层为" + (overlay === "stretch" ? "Stretch" : "Checker") + "；主要风险是" + active.distortion + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">3D Surface → Unwrap → 2D UV Island</text>
          <rect x="38" y="78" width="184" height="132" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <path d="M74 164 Q130 92 186 164 Q130 196 74 164 Z" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="2" />
          <text x="130" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">3D 曲面</text>
          <text x="130" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">面积 / 角度 / 接缝</text>
          <path d="M240 144 H290" stroke="var(--border)" strokeWidth="3" />
          <rect x="302" y="78" width="184" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="394" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="394" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="394" y="176" textAnchor="middle" fontSize="11" fill="var(--accent)">先预测失真位置</text>
          <path d="M504 144 H554" stroke="var(--border)" strokeWidth="3" />
          <rect x="566" y="78" width="156" height="132" rx="14" fill={overlay === "stretch" ? "var(--warning)" : "var(--success)"} fillOpacity="0.12" stroke={overlay === "stretch" ? "var(--warning)" : "var(--success)"} strokeWidth="2" />
          <text x="644" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">UV Editor</text>
          <text x="644" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{overlay === "stretch" ? "Stretch Overlay" : "Checker Texture"}</text>
          <text x="644" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.distortion}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">UV 不是把网格“压扁”就结束：要解释接缝、拉伸和面积比例</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">测试图让失真在进入绘画前可见</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变展开条件</p>
          <div className="grid gap-2">
            <ChoiceButton active={method === "planar"} onClick={() => setMethod("planar")}>Planar</ChoiceButton>
            <ChoiceButton active={method === "cylindrical"} onClick={() => setMethod("cylindrical")}>Cylindrical</ChoiceButton>
            <ChoiceButton active={method === "seam"} onClick={() => setMethod("seam")}>Seam + Unwrap</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={overlay === "stretch"} onClick={() => setOverlay("stretch")}>Stretch</ChoiceButton>
            <ChoiceButton active={overlay === "checker"} onClick={() => setOverlay("checker")}>Checker</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前主要观察：{active.distortion}。先看覆盖层，再决定是否移动接缝或更换展开策略。
          </p>
        </div>
      </div>
    </section>
  );
}

const REGIONS = {
  face: { label: "Face", density: "高", islands: "面部与耳朵", seam: "后脑与耳后" },
  body: { label: "Body", density: "中", islands: "躯干与四肢", seam: "腋下与内侧" },
  boots: { label: "Boots", density: "低", islands: "鞋面与鞋底", seam: "鞋底边缘" },
} as const;

type RegionKey = keyof typeof REGIONS;

export function Bl3Ch08SeamEditorLab() {
  const [region, setRegion] = useState<RegionKey>("face");
  const [mirrored, setMirrored] = useState(false);

  function reset() {
    setRegion("face");
    setMirrored(false);
  }

  const active = REGIONS[region];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch08-seam-uv-editor"
      aria-label="Blender 第八章接缝与 UV 编辑器实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 8 · 接缝与岛屿实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">接缝位置连接几何、绘画与可见性</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择角色区域，观察接缝、UV 岛、密度和镜像策略。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择 UV 区域</p>
          <div className="grid gap-2">
            <ChoiceButton active={region === "face"} onClick={() => setRegion("face")}>Face：高关注</ChoiceButton>
            <ChoiceButton active={region === "body"} onClick={() => setRegion("body")}>Body：中关注</ChoiceButton>
            <ChoiceButton active={region === "boots"} onClick={() => setRegion("boots")}>Boots：低关注</ChoiceButton>
          </div>
          <ChoiceButton active={mirrored} onClick={() => setMirrored((value) => !value)}>{mirrored ? "取消镜像岛" : "允许镜像岛"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label} 使用{active.density}密度；接缝建议放在{active.seam}。{mirrored ? "镜像可节省空间，但会共享绘画细节。" : "保留独立岛，便于区分左右绘画。"}
          </p>
        </div>

        <svg viewBox="0 0 760 300" role="img" aria-label={"接缝与 UV 编辑器实验：当前区域为" + active.label + "，密度为" + active.density + "，接缝在" + active.seam + "；" + (mirrored ? "允许镜像岛" : "保持独立岛") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Seam Marking → UV Islands → Texel Density</text>
          <rect x="38" y="76" width="190" height="128" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="133" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <path d="M88 170 Q133 102 178 170" fill="none" stroke="var(--accent)" strokeWidth="5" />
          <path d="M88 170 Q133 154 178 170" fill="none" stroke="var(--danger)" strokeWidth="3" strokeDasharray="5 4" />
          <text x="133" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">红线：{active.seam}</text>
          <path d="M250 140 H296" stroke="var(--border)" strokeWidth="3" />
          <rect x="308" y="76" width="190" height="128" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <path d="M340 110 H382 M340 134 H382 M340 158 H382 M340 182 H382" stroke="var(--accent)" strokeWidth="2" />
          <path d="M340 110 V182 M360 110 V182 M382 110 V182" stroke="var(--accent)" strokeWidth="2" />
          <path d="M422 112 H472 M422 144 H472 M422 176 H472" stroke="var(--warning)" strokeWidth="2" />
          <text x="403" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{mirrored ? "镜像岛：共享细节" : "独立岛：可分别绘画"}</text>
          <path d="M520 140 H566" stroke="var(--border)" strokeWidth="3" />
          <rect x="578" y="76" width="144" height="128" rx="14" fill="var(--bg)" stroke="var(--success)" strokeWidth="2" />
          <text x="650" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">Density</text>
          <text x="650" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.density}关注</text>
          <text x="650" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">按镜头分配像素</text>
          <text x="380" y="248" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">接缝要避开高可见区，岛屿要能在 UV Editor 中被独立验收</text>
          <text x="380" y="274" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">镜像策略必须写进绘画和材质交接</text>
        </svg>
      </div>
    </section>
  );
}

export function Bl3Ch08PackingLab() {
  const [resolution, setResolution] = useState<"2k" | "4k">("2k");
  const [padding, setPadding] = useState<"tight" | "safe">("tight");
  const [packed, setPacked] = useState(false);

  function reset() {
    setResolution("2k");
    setPadding("tight");
    setPacked(false);
  }

  const occupancy = resolution === "4k" ? 72 : 88;
  const ready = packed && padding === "safe";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch08-packing-density"
      aria-label="Blender 第八章 Texel Density 与 UV Packing 实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 8 · 打包与像素预算实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">Packing 是像素预算和边缘安全的交集</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换分辨率与 Padding，观察利用率、渗色风险和交付状态。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg viewBox="0 0 760 300" role="img" aria-label={"UV Packing 实验：当前分辨率为" + (resolution === "2k" ? "2K" : "4K") + "，Padding 为" + (padding === "tight" ? "紧" : "安全") + "，占用率" + occupancy + "%，" + (packed ? "已打包" : "未打包") + "；结果为" + (ready ? "可交接" : "待修复") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Texel Density → Padding → Pack Islands → Mipmap Safety</text>
          <rect x="42" y="74" width="196" height="130" rx="14" fill="var(--bg)" stroke={resolution === "4k" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="140" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{resolution === "2k" ? "2048²" : "4096²"}</text>
          <text x="140" y="142" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">面部 / 手部像素预算</text>
          <text x="140" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">统一密度基线</text>
          <path d="M260 140 H306" stroke="var(--border)" strokeWidth="3" />
          <rect x="318" y="74" width="196" height="130" rx="14" fill={padding === "safe" ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={padding === "safe" ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="416" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Padding</text>
          <text x="416" y="142" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{padding === "tight" ? "紧：占用率高" : "安全：减少渗色"}</text>
          <text x="416" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">按像素记录</text>
          <path d="M536 140 H582" stroke="var(--border)" strokeWidth="3" />
          <rect x="594" y="74" width="128" height="130" rx="14" fill={ready ? "var(--success)" : "var(--bg)"} fillOpacity={ready ? 0.14 : 1} stroke={ready ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="658" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill={ready ? "var(--success)" : "var(--text-primary)"}>{ready ? "可交接" : "待修复"}</text>
          <text x="658" y="142" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">占用 {occupancy}%</text>
          <text x="658" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Mipmap 预览</text>
          <text x="380" y="246" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Packing 不只追求塞满，还要保证岛间 Padding 和缩小后不渗色</text>
          <text x="380" y="272" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录分辨率、旋转策略、镜像与重叠规则</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变打包约束</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={resolution === "2k"} onClick={() => setResolution("2k")}>2K</ChoiceButton>
            <ChoiceButton active={resolution === "4k"} onClick={() => setResolution("4k")}>4K</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={padding === "tight"} onClick={() => setPadding("tight")}>紧 Padding</ChoiceButton>
            <ChoiceButton active={padding === "safe"} onClick={() => setPadding("safe")}>安全 Padding</ChoiceButton>
          </div>
          <ChoiceButton active={packed} onClick={() => setPacked((value) => !value)}>{packed ? "撤销 Pack Islands" : "执行 Pack Islands"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {ready ? "当前打包可以进入导出与 Mipmap 检查。" : "当前不能交接：先执行打包，并用安全 Padding 复核缩小后的边缘。"}
          </p>
        </div>
      </div>
    </section>
  );
}
