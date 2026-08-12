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

export function Bl3Ch03SceneGraphLab() {
  const [mode, setMode] = useState<"object" | "edit">("object");
  const [meshRelation, setMeshRelation] = useState<"linked" | "single">("linked");

  function reset() {
    setMode("object");
    setMeshRelation("linked");
  }

  const editTarget = mode === "object" ? "Object Transform" : "Mesh vertices";
  const meshLabel = meshRelation === "linked" ? "Mesh_A（共享）" : "Mesh_B（独立）";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch03-object-datablock"
      aria-label="Blender 第三章对象与 Datablock 实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 3 · 场景结构实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">Object 容器和 Mesh Datablock 要分开记录</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换模式与复制关系，观察操作到底落在变换容器还是网格数据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <svg viewBox="0 0 760 350" role="img" aria-label={"对象数据实验：当前是" + (mode === "object" ? "Object Mode" : "Edit Mode") + "，操作目标为" + editTarget + "；复制关系为" + (meshRelation === "linked" ? "共享 Mesh" : "独立 Mesh") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Object → Datablock → Evaluated Scene</text>
          <rect x="42" y="70" width="208" height="176" rx="14" fill={mode === "object" ? "var(--accent)" : "var(--bg)"} fillOpacity={mode === "object" ? 0.12 : 1} stroke={mode === "object" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="146" y="104" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Object: Hero</text>
          <text x="146" y="136" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Location / Rotation / Scale</text>
          <text x="146" y="166" textAnchor="middle" fontSize="12" fill="var(--accent)">当前写入：{editTarget}</text>
          <text x="146" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">场景容器与可见性</text>
          <path d="M270 158 H330" stroke="var(--border)" strokeWidth="3" />
          <rect x="340" y="70" width="208" height="176" rx="14" fill={meshRelation === "linked" ? "var(--accent)" : "var(--bg)"} fillOpacity={meshRelation === "linked" ? 0.12 : 1} stroke={meshRelation === "linked" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="444" y="104" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{meshLabel}</text>
          <text x="444" y="136" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">顶点 / 边 / 面</text>
          <text x="444" y="166" textAnchor="middle" fontSize="12" fill="var(--accent)">{meshRelation === "linked" ? "两个 Object 会同步网格编辑" : "只修改当前 Object 的网格"}</text>
          <text x="444" y="208" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Mesh Datablock</text>
          <path d="M568 158 H628" stroke="var(--border)" strokeWidth="3" />
          <rect x="638" y="70" width="80" height="176" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="678" y="112" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">场景</text>
          <text x="678" y="142" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">求值</text>
          <text x="678" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Modifier</text>
          <text x="678" y="198" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输出</text>
          <text x="380" y="306" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">先记录目标，再记录共享关系，才能解释复制后的变化</text>
          <text x="380" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">模式与 Datablock 关系是可复现证据</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变场景上下文</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={mode === "object"} onClick={() => setMode("object")}>Object Mode</ChoiceButton>
            <ChoiceButton active={mode === "edit"} onClick={() => setMode("edit")}>Edit Mode</ChoiceButton>
          </div>
          <div className="grid gap-2">
            <ChoiceButton active={meshRelation === "linked"} onClick={() => setMeshRelation("linked")}>复制并共享 Mesh</ChoiceButton>
            <ChoiceButton active={meshRelation === "single"} onClick={() => setMeshRelation("single")}>复制为独立 Mesh</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前写入 {editTarget}；{meshRelation === "linked" ? "共享 Mesh 会把网格编辑传播给引用它的对象。" : "独立 Mesh 只影响当前对象的数据副本。"}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Bl3Ch03SurfaceModifierLab() {
  const [surface, setSurface] = useState<"flat" | "smooth">("flat");
  const [order, setOrder] = useState<"bevel-first" | "subdivision-first">("bevel-first");

  function reset() {
    setSurface("flat");
    setOrder("bevel-first");
  }

  const stackLabel = order === "bevel-first" ? "Bevel → Subdivision" : "Subdivision → Bevel";
  const result = order === "bevel-first" ? "先倒角再平滑细分" : "先细分再倒角，边缘响应不同";

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch03-surface-modifier"
      aria-label="Blender 第三章表面与修改器实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 3 · 非破坏编辑实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">表面显示和 Modifier Stack 是两种证据</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换法线插值与修改器顺序，观察显示结果和求值几何如何分工。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <svg viewBox="0 0 760 350" role="img" aria-label={"表面与修改器实验：当前为" + (surface === "flat" ? "Flat" : "Smooth") + " 表面，修改器顺序为" + stackLabel + "，结果是" + result + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Surface → Modifier Stack → Evaluated Mesh</text>
          <rect x="40" y="72" width="190" height="174" rx="14" fill={surface === "smooth" ? "var(--accent)" : "var(--bg)"} fillOpacity={surface === "smooth" ? 0.12 : 1} stroke={surface === "smooth" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="135" y="108" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Shading</text>
          <path d="M78 172 Q135 108 192 172" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
          <text x="135" y="212" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{surface === "flat" ? "Flat：面与面边界清楚" : "Smooth：法线插值连续"}</text>
          <path d="M250 158 H300" stroke="var(--border)" strokeWidth="3" />
          <rect x="310" y="72" width="210" height="174" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="415" y="106" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Modifier Stack</text>
          <rect x="336" y="126" width="158" height="38" rx="8" fill={order === "bevel-first" ? "var(--accent)" : "var(--bg)"} fillOpacity={order === "bevel-first" ? 0.16 : 1} stroke="var(--accent)" />
          <text x="415" y="150" textAnchor="middle" fontSize="12" fill="var(--text-primary)">{order === "bevel-first" ? "Bevel" : "Subdivision"}</text>
          <rect x="336" y="176" width="158" height="38" rx="8" fill={order === "bevel-first" ? "var(--bg)" : "var(--accent)"} fillOpacity={order === "bevel-first" ? 1 : 0.16} stroke="var(--accent)" />
          <text x="415" y="200" textAnchor="middle" fontSize="12" fill="var(--text-primary)">{order === "bevel-first" ? "Subdivision" : "Bevel"}</text>
          <path d="M540 158 H590" stroke="var(--border)" strokeWidth="3" />
          <rect x="600" y="72" width="118" height="174" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="659" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">求值</text>
          <text x="659" y="142" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{surface === "flat" ? "硬边" : "柔和边界"}</text>
          <text x="659" y="174" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{order === "bevel-first" ? "圆角优先" : "细分优先"}</text>
          <text x="380" y="306" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">修改器顺序不是装饰；它决定同一输入的求值结果</text>
          <text x="380" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Flat / Smooth 主要改变表面法线显示</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变求值条件</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={surface === "flat"} onClick={() => setSurface("flat")}>Shade Flat</ChoiceButton>
            <ChoiceButton active={surface === "smooth"} onClick={() => setSurface("smooth")}>Shade Smooth</ChoiceButton>
          </div>
          <div className="grid gap-2">
            <ChoiceButton active={order === "bevel-first"} onClick={() => setOrder("bevel-first")}>Bevel → Subdivision</ChoiceButton>
            <ChoiceButton active={order === "subdivision-first"} onClick={() => setOrder("subdivision-first")}>Subdivision → Bevel</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            先预测，再只改变一个条件。当前结果：{result}。
          </p>
        </div>
      </div>
    </section>
  );
}

const ENGINES = {
  workbench: { label: "Workbench", signal: "快速检查建模形状" },
  eevee: { label: "EEVEE", signal: "实时材质与灯光预览" },
  cycles: { label: "Cycles", signal: "路径追踪与最终质量" },
} as const;

type EngineKey = keyof typeof ENGINES;

export function Bl3Ch03RenderPipelineLab() {
  const [engine, setEngine] = useState<EngineKey>("workbench");
  const [lightOn, setLightOn] = useState(true);
  const [camera, setCamera] = useState<"hero" | "wide">("hero");
  const [captured, setCaptured] = useState(false);

  function reset() {
    setEngine("workbench");
    setLightOn(true);
    setCamera("hero");
    setCaptured(false);
  }

  const active = ENGINES[engine];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch03-camera-light-render"
      aria-label="Blender 第三章相机灯光与渲染实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 3 · 输出证据实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">Camera、Light 和 Render Engine 要一起验收</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换相机、灯光和引擎，观察最终帧为何不能只靠“看起来对”。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-2 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">冻结输出条件</p>
          <div className="grid gap-2">
            {(Object.keys(ENGINES) as EngineKey[]).map((key) => (
              <ChoiceButton key={key} active={engine === key} onClick={() => setEngine(key)}>{ENGINES[key].label}</ChoiceButton>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={camera === "hero"} onClick={() => setCamera("hero")}>Hero Camera</ChoiceButton>
            <ChoiceButton active={camera === "wide"} onClick={() => setCamera("wide")}>Wide Camera</ChoiceButton>
          </div>
          <ChoiceButton active={lightOn} onClick={() => setLightOn((value) => !value)}>{lightOn ? "主光：开启" : "主光：关闭"}</ChoiceButton>
          <button type="button" aria-pressed={captured} onClick={() => setCaptured((value) => !value)} className={BUTTON_CLASS + " w-full" + (captured ? " border-accent bg-accent/10 text-accent" : "")}>
            {captured ? "已记录渲染快照" : "记录渲染快照"}
          </button>
        </div>

        <svg viewBox="0 0 760 310" role="img" aria-label={"渲染管线实验：当前使用" + active.label + "，" + active.signal + "；" + (camera === "hero" ? "Hero" : "Wide") + " Camera；主光" + (lightOn ? "开启" : "关闭") + "；渲染快照" + (captured ? "已记录" : "未记录") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Scene → Camera + Light → {active.label} → Frame</text>
          <rect x="38" y="76" width="164" height="126" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="120" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Scene</text>
          <text x="120" y="142" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Object + Material</text>
          <text x="120" y="170" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">最小输入文件</text>
          <path d="M218 138 H268" stroke="var(--border)" strokeWidth="3" />
          <rect x="278" y="76" width="164" height="126" rx="14" fill={lightOn ? "var(--accent)" : "var(--bg)"} fillOpacity={lightOn ? 0.12 : 1} stroke={lightOn ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">视点与光照</text>
          <text x="360" y="142" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{camera === "hero" ? "Hero Camera" : "Wide Camera"}</text>
          <text x="360" y="170" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">主光 {lightOn ? "有效" : "关闭"}</text>
          <path d="M458 138 H508" stroke="var(--border)" strokeWidth="3" />
          <rect x="518" y="76" width="104" height="126" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="570" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">{active.label}</text>
          <text x="570" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">参数</text>
          <text x="570" y="168" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">分辨率</text>
          <path d="M638 138 H688" stroke="var(--border)" strokeWidth="3" />
          <rect x="698" y="76" width="42" height="126" rx="12" fill={captured ? "var(--accent)" : "var(--bg)"} fillOpacity={captured ? 0.14 : 1} stroke={captured ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="719" y="116" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">帧</text>
          <text x="719" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{captured ? "已记" : "待记"}</text>
          <text x="380" y="258" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">输出证据 = 引擎 + 相机 + 灯光 + 分辨率 + 时间</text>
          <text x="380" y="282" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">缺少任一条件，另一位读者就无法判断差异来源</text>
        </svg>
      </div>
    </section>
  );
}
