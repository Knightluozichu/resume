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

const WORKFLOW_STAGES = {
  image: {
    label: "Image Datablock",
    detail: "创建固定尺寸的像素容器",
    risk: "只画视口，不一定已经有可保存的图像",
  },
  slot: {
    label: "Paint Slot",
    detail: "让材质的 Base Color 指向这张图",
    risk: "没有 Paint Slot，笔刷可能写入错误对象",
  },
  disk: {
    label: "Save Image",
    detail: "把内存像素写到明确的磁盘路径",
    risk: "只保存 .blend，像素文件仍可能没有落盘",
  },
} as const;

type WorkflowStage = keyof typeof WORKFLOW_STAGES;

export function Bl3Ch09WorkflowLab() {
  const [stage, setStage] = useState<WorkflowStage>("image");
  const [saved, setSaved] = useState(false);

  function reset() {
    setStage("image");
    setSaved(false);
  }

  const active = WORKFLOW_STAGES[stage];
  const durable = stage === "disk" && saved;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch09-texture-workflow"
      aria-label={
        "Blender 第九章纹理工作流实验：当前阶段为" +
        active.label +
        "，" +
        active.detail +
        "；" +
        (durable ? "图像已经保存到磁盘，可以重开文件复核" : "仍需完成图像链路和持久化检查") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 9 · 工作流实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">让绘画结果穿过 Image、材质和磁盘</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">逐段推进工作流，观察哪一步负责像素、引用和持久化。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "纹理工作流图：Image Datablock 创建像素容器，Paint Slot 把材质 Base Color 指向它，Save Image 把内存像素写入磁盘；当前阶段为" +
            active.label +
            "，风险是" +
            active.risk +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            Image Datablock → Paint Slot → Save Image → Reopen Check
          </text>
          <rect x="34" y="78" width="164" height="132" rx="14" fill={stage === "image" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "image" ? 0.14 : 1} stroke={stage === "image" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="116" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Image</text>
          <text x="116" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">像素容器</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">名称 / 尺寸 / 路径</text>
          <path d="M216 144 H252" stroke="var(--border)" strokeWidth="3" />
          <rect x="264" y="78" width="164" height="132" rx="14" fill={stage === "slot" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "slot" ? 0.14 : 1} stroke={stage === "slot" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="346" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Paint Slot</text>
          <text x="346" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">材质 → Base Color</text>
          <text x="346" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">笔刷有明确目标</text>
          <path d="M446 144 H482" stroke="var(--border)" strokeWidth="3" />
          <rect x="494" y="78" width="164" height="132" rx="14" fill={stage === "disk" ? "var(--warning)" : "var(--bg)"} fillOpacity={stage === "disk" ? 0.14 : 1} stroke={stage === "disk" ? "var(--warning)" : "var(--border)"} strokeWidth="2" />
          <text x="576" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Save Image</text>
          <text x="576" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">内存 → 磁盘</text>
          <text x="576" y="178" textAnchor="middle" fontSize="11" fill={durable ? "var(--success)" : "var(--text-secondary)"}>{durable ? "可重开复核" : "等待持久化"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">保存 .blend 与保存图像是两条不同的证据链</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">最后关闭再重开，确认颜色仍由同一文件提供</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">推进纹理工作流</p>
          <div className="grid gap-2">
            <ChoiceButton active={stage === "image"} onClick={() => setStage("image")}>1. 创建 Image</ChoiceButton>
            <ChoiceButton active={stage === "slot"} onClick={() => setStage("slot")}>2. 指定 Paint Slot</ChoiceButton>
            <ChoiceButton active={stage === "disk"} onClick={() => setStage("disk")}>3. 保存 Image</ChoiceButton>
          </div>
          <ChoiceButton active={saved} onClick={() => setSaved((value) => !value)}>{saved ? "撤销磁盘保存" : "执行 Save Image"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前观察：{active.risk}。{durable ? "现在可以关闭并重开 .blend，检查路径与像素。" : "继续推进并记录图像名称、尺寸和磁盘路径。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const MATERIALS = {
  skin: { label: "Skin", base: "暖色大块", variation: "明度与红润变化", consumer: "脸部近景" },
  cloth: { label: "Cloth", base: "布料主色", variation: "织物方向与磨损", consumer: "服装轮廓" },
  metal: { label: "Metal", base: "金属底色", variation: "边缘亮度与划痕", consumer: "配件高光" },
} as const;

type MaterialKey = keyof typeof MATERIALS;

export function Bl3Ch09BaseTextureLab() {
  const [material, setMaterial] = useState<MaterialKey>("skin");
  const [variation, setVariation] = useState(false);

  function reset() {
    setMaterial("skin");
    setVariation(false);
  }

  const active = MATERIALS[material];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch09-base-texture-layers"
      aria-label={
        "Blender 第九章 Base Texture 分层实验：当前材质为" +
        active.label +
        "，底色为" +
        active.base +
        "，细节层为" +
        (variation ? active.variation : "尚未加入变化") +
        "，下游消费者是" +
        active.consumer +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 9 · Base Texture 实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先让大色块成立，再增加可读的材质层</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换材质和细节层，观察纹理元素如何服务最终镜头。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择绘画对象</p>
          <div className="grid gap-2">
            <ChoiceButton active={material === "skin"} onClick={() => setMaterial("skin")}>Skin：面部与手</ChoiceButton>
            <ChoiceButton active={material === "cloth"} onClick={() => setMaterial("cloth")}>Cloth：服装</ChoiceButton>
            <ChoiceButton active={material === "metal"} onClick={() => setMaterial("metal")}>Metal：配件</ChoiceButton>
          </div>
          <ChoiceButton active={variation} onClick={() => setVariation((value) => !value)}>{variation ? "隐藏纹理变化" : "加入纹理变化"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label} 的 Base Texture 是“{active.base}”；{variation ? "变化层已经补充，下一步要按镜头检查频率。" : "先不加细节，确认轮廓与明度层级。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 300"
          role="img"
          aria-label={
            "Base Texture 分层图：当前材质为" +
            active.label +
            "，先建立" +
            active.base +
            "，再决定是否加入" +
            active.variation +
            "；最终服务于" +
            active.consumer +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Base Color → Material Variation → Camera Readability</text>
          <rect x="42" y="76" width="190" height="130" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="137" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <rect x="76" y="132" width="122" height="40" rx="8" fill="var(--accent)" fillOpacity="0.42" />
          <text x="137" y="157" textAnchor="middle" fontSize="12" fill="var(--text-primary)">{active.base}</text>
          <text x="137" y="190" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">大色块先读清</text>
          <path d="M258 141 H304" stroke="var(--border)" strokeWidth="3" />
          <rect x="316" y="76" width="190" height="130" rx="14" fill={variation ? "var(--warning)" : "var(--bg)"} fillOpacity={variation ? 0.14 : 1} stroke={variation ? "var(--warning)" : "var(--border)"} strokeWidth="2" />
          <text x="411" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">纹理元素</text>
          <path d="M350 148 Q370 126 390 148 T430 148 T470 148" fill="none" stroke={variation ? "var(--warning)" : "var(--border)"} strokeWidth="4" />
          <text x="411" y="182" textAnchor="middle" fontSize="11" fill={variation ? "var(--warning)" : "var(--text-secondary)"}>{variation ? active.variation : "等待细节层"}</text>
          <path d="M532 141 H578" stroke={variation ? "var(--success)" : "var(--border)"} strokeWidth="3" />
          <rect x="590" y="76" width="132" height="130" rx="14" fill={variation ? "var(--success)" : "var(--bg)"} fillOpacity={variation ? 0.14 : 1} stroke={variation ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="656" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill={variation ? "var(--success)" : "var(--text-primary)"}>{variation ? "可回看" : "基础层"}</text>
          <text x="656" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.consumer}</text>
          <text x="656" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">检查细节频率</text>
          <text x="380" y="246" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Base Texture 不是最终效果，而是所有材质判断的共同底板</text>
          <text x="380" y="272" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">过密的细节在目标镜头中会变成噪声</text>
        </svg>
      </div>
    </section>
  );
}

const ROUNDTRIP_STAGES = {
  blender: { label: "Blender Paint", detail: "在已确认 UV 与材质引用的文件中绘制", issue: "确认 Paint Slot 与图像路径" },
  external: { label: "External Paint", detail: "在外部软件编辑同一张图像文件", issue: "保持 UV 对齐和命名不变" },
  review: { label: "Blender Review", detail: "重新载入图像并回看角色材质", issue: "检查色彩空间、Alpha 与缺失路径" },
} as const;

type RoundtripStage = keyof typeof ROUNDTRIP_STAGES;

export function Bl3Ch09ExternalRoundtripLab() {
  const [stage, setStage] = useState<RoundtripStage>("blender");
  const [colorSpace, setColorSpace] = useState<"srgb" | "nonColor">("srgb");
  const [reloaded, setReloaded] = useState(false);

  function reset() {
    setStage("blender");
    setColorSpace("srgb");
    setReloaded(false);
  }

  const active = ROUNDTRIP_STAGES[stage];
  const ready = stage === "review" && colorSpace === "srgb" && reloaded;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch09-external-roundtrip"
      aria-label={
        "Blender 第九章外部软件往返实验：当前阶段为" +
        active.label +
        "，" +
        active.detail +
        "；色彩空间为" +
        (colorSpace === "srgb" ? "sRGB" : "Non-Color") +
        "；" +
        (ready ? "已经在 Blender 中完成回看" : "仍需完成路径、色彩空间和重载检查") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 9 · 外部往返实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">外部绘制只有回到角色身上才算完成</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">模拟外部修改、色彩空间选择与 Blender 回看，定位往返中的断点。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "外部纹理往返图：Blender Paint、External Paint、Blender Review 三个阶段；当前为" +
            active.label +
            "，色彩空间为" +
            (colorSpace === "srgb" ? "sRGB" : "Non-Color") +
            "，图像" +
            (reloaded ? "已重载" : "未重载") +
            "，结果为" +
            (ready ? "可交付" : "待校验") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Blender Paint ↔ External Paint ↔ Blender Review</text>
          <rect x="34" y="78" width="164" height="132" rx="14" fill={stage === "blender" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "blender" ? 0.14 : 1} stroke={stage === "blender" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="116" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Blender Paint</text>
          <text x="116" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">UV 对齐</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录输入版本</text>
          <path d="M216 144 H252" stroke="var(--border)" strokeWidth="3" />
          <rect x="264" y="78" width="164" height="132" rx="14" fill={stage === "external" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "external" ? 0.14 : 1} stroke={stage === "external" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="346" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">External Paint</text>
          <text x="346" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">路径与颜色</text>
          <text x="346" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">不改 UV 边界</text>
          <path d="M446 144 H482" stroke="var(--border)" strokeWidth="3" />
          <rect x="494" y="78" width="164" height="132" rx="14" fill={stage === "review" ? "var(--success)" : "var(--bg)"} fillOpacity={stage === "review" ? 0.14 : 1} stroke={stage === "review" ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="576" y="114" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">Blender Review</text>
          <text x="576" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{colorSpace === "srgb" ? "sRGB 显示" : "Non-Color 误设"}</text>
          <text x="576" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--text-secondary)"}>{ready ? "角色回看通过" : "等待重载"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">外部软件不是终点，回到 Blender 才能验证材质引用是否仍然成立</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">色彩空间、Alpha、路径和 UV 必须作为交接证据保存</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变往返条件</p>
          <div className="grid gap-2">
            <ChoiceButton active={stage === "blender"} onClick={() => setStage("blender")}>Blender Paint</ChoiceButton>
            <ChoiceButton active={stage === "external"} onClick={() => setStage("external")}>External Paint</ChoiceButton>
            <ChoiceButton active={stage === "review"} onClick={() => setStage("review")}>Blender Review</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={colorSpace === "srgb"} onClick={() => setColorSpace("srgb")}>sRGB：颜色</ChoiceButton>
            <ChoiceButton active={colorSpace === "nonColor"} onClick={() => setColorSpace("nonColor")}>Non-Color：数据</ChoiceButton>
          </div>
          <ChoiceButton active={reloaded} onClick={() => setReloaded((value) => !value)}>{reloaded ? "撤销 Reload Image" : "执行 Reload Image"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前检查：{active.issue}。{ready ? "外部修改已经在角色材质上复现，可以记录输出版本。" : "尚不能交付：先让路径、色彩空间和重载状态都可追踪。"}
          </p>
        </div>
      </div>
    </section>
  );
}
