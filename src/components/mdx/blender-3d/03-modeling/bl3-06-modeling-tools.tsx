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

const ELEMENTS = {
  vertex: { label: "Vertex", detail: "点：定位、合并与精确移动", count: "8 个点" },
  edge: { label: "Edge", detail: "边：环选、挤出与倒角", count: "12 条边" },
  face: { label: "Face", detail: "面：Inset、Extrude 与法线", count: "6 个面" },
} as const;

type ElementKey = keyof typeof ELEMENTS;

export function Bl3Ch06SelectionLab() {
  const [element, setElement] = useState<ElementKey>("vertex");
  const [strategy, setStrategy] = useState<"linked" | "boundary">("linked");

  function reset() {
    setElement("vertex");
    setStrategy("linked");
  }

  const active = ELEMENTS[element];
  const selectedIndex = element === "vertex" ? 1 : element === "edge" ? 2 : 3;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch06-selection-elements"
      aria-label="Blender 第六章顶点边面选择实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 6 · 选择输入实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先冻结选择集，再预测拓扑变化</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换顶点、边、面和选择策略，观察同一个工具为什么会有不同输入。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <svg viewBox="0 0 760 330" role="img" aria-label={"选择实验：当前选择" + active.label + "，选择数量为" + active.count + "，策略为" + (strategy === "linked" ? "Linked" : "Boundary") + "；" + active.detail + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Vertices / Edges / Faces → Selection Set → Tool</text>
          <rect x="40" y="74" width="184" height="150" rx="14" fill={element === "vertex" ? "var(--accent)" : "var(--bg)"} fillOpacity={element === "vertex" ? 0.14 : 1} stroke={element === "vertex" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="132" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">网格元素</text>
          <text x="132" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">当前：{active.label}</text>
          <text x="132" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.count}</text>
          <path d="M244 148 H294" stroke="var(--border)" strokeWidth="3" />
          <rect x="306" y="74" width="184" height="150" rx="14" fill={strategy === "boundary" ? "var(--warning)" : "var(--bg)"} fillOpacity={strategy === "boundary" ? 0.14 : 1} stroke={strategy === "boundary" ? "var(--warning)" : "var(--border)"} strokeWidth="2" />
          <text x="398" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Selection Set</text>
          <text x="398" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{strategy === "linked" ? "Linked：相连区域" : "Boundary：边界元素"}</text>
          <text x="398" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">当前高亮 {selectedIndex} 组</text>
          <path d="M510 148 H560" stroke="var(--border)" strokeWidth="3" />
          <rect x="572" y="74" width="150" height="150" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="647" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">Tool</text>
          <text x="647" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">输入上下文</text>
          <text x="647" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先预测再执行</text>
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">选择集是显式输入；Mode、法线和 Active Element 是上下文</text>
          <text x="380" y="294" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">截图选择集，才能解释工具输出</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变选择条件</p>
          <div className="grid gap-2">
            <ChoiceButton active={element === "vertex"} onClick={() => setElement("vertex")}>Vertex：点</ChoiceButton>
            <ChoiceButton active={element === "edge"} onClick={() => setElement("edge")}>Edge：边</ChoiceButton>
            <ChoiceButton active={element === "face"} onClick={() => setElement("face")}>Face：面</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={strategy === "linked"} onClick={() => setStrategy("linked")}>Linked</ChoiceButton>
            <ChoiceButton active={strategy === "boundary"} onClick={() => setStrategy("boundary")}>Boundary</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前输入：{active.label} / {strategy === "linked" ? "相连区域" : "边界元素"}。下一步操作前先写出预期新增或删除的元素。
          </p>
        </div>
      </div>
    </section>
  );
}

const OPERATIONS = {
  extrude: { label: "Extrude", effect: "复制并移动选中边界", before: "1 面", after: "2 面 + 新侧面", risk: "重复挤出会形成薄片或内壁" },
  inset: { label: "Inset", effect: "在选中面内建立环", before: "1 面", after: "1 内面 + 1 环", risk: "厚度不一致会破坏边界节奏" },
  bevel: { label: "Bevel", effect: "在边角间插入过渡面", before: "1 条边", after: "边角 + 过渡段", risk: "段数和法线会影响平滑" },
  bridge: { label: "Bridge", effect: "连接两组兼容边环", before: "2 个边环", after: "连接带状面", risk: "顶点对应不一致会扭曲面" },
} as const;

type OperationKey = keyof typeof OPERATIONS;

export function Bl3Ch06TopologyLab() {
  const [operation, setOperation] = useState<OperationKey>("extrude");
  const [segments, setSegments] = useState<"low" | "high">("low");

  function reset() {
    setOperation("extrude");
    setSegments("low");
  }

  const active = OPERATIONS[operation];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch06-topology-tools"
      aria-label="Blender 第六章网格工具拓扑实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 6 · 拓扑操作实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">同样增加几何，不同工具改变不同边流</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择工具并改变段数，观察输入、输出统计和风险如何变化。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择一个操作</p>
          <div className="grid gap-2">
            <ChoiceButton active={operation === "extrude"} onClick={() => setOperation("extrude")}>Extrude</ChoiceButton>
            <ChoiceButton active={operation === "inset"} onClick={() => setOperation("inset")}>Inset</ChoiceButton>
            <ChoiceButton active={operation === "bevel"} onClick={() => setOperation("bevel")}>Bevel</ChoiceButton>
            <ChoiceButton active={operation === "bridge"} onClick={() => setOperation("bridge")}>Bridge</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={segments === "low"} onClick={() => setSegments("low")}>低段数</ChoiceButton>
            <ChoiceButton active={segments === "high"} onClick={() => setSegments("high")}>高段数</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}：{active.effect}。风险提示：{active.risk}。
          </p>
        </div>

        <svg viewBox="0 0 760 310" role="img" aria-label={"拓扑工具实验：当前操作为" + active.label + "，输入为" + active.before + "，输出为" + active.after + "，段数为" + (segments === "low" ? "低" : "高") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input Selection → {active.label} → Topology Delta</text>
          <rect x="38" y="76" width="188" height="130" rx="14" fill="var(--bg)" stroke="var(--border)" />
          <text x="132" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Before</text>
          <text x="132" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.before}</text>
          <text x="132" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">保存输入副本</text>
          <path d="M244 141 H294" stroke="var(--border)" strokeWidth="3" />
          <rect x="306" y="76" width="188" height="130" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="400" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="400" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.effect}</text>
          <text x="400" y="176" textAnchor="middle" fontSize="11" fill="var(--accent)">段数：{segments === "low" ? "少" : "多"}</text>
          <path d="M512 141 H562" stroke="var(--border)" strokeWidth="3" />
          <rect x="574" y="76" width="148" height="130" rx="14" fill="var(--bg)" stroke="var(--warning)" strokeWidth="2" />
          <text x="648" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">After</text>
          <text x="648" y="146" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.after}</text>
          <text x="648" y="176" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">核对边流</text>
          <text x="380" y="248" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">拓扑 Delta = 新元素、连接关系、边界和法线的变化</text>
          <text x="380" y="274" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">视觉相似不等于边流相同，必须比较统计与故障样本</text>
        </svg>
      </div>
    </section>
  );
}

export function Bl3Ch06AddonValidationLab() {
  const [route, setRoute] = useState<"manual" | "addon">("manual");
  const [meshState, setMeshState] = useState<"clean" | "fault">("clean");
  const [validated, setValidated] = useState(false);

  function reset() {
    setRoute("manual");
    setMeshState("clean");
    setValidated(false);
  }

  const ready = meshState === "clean" && validated;

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch06-addon-validation"
      aria-label="Blender 第六章建模插件与工具验证实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 6 · 插件与验收实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">一步完成不等于免除拓扑审计</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">对照手工链和插件链，再注入故障样本，观察验收门是否仍然有效。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
        <svg viewBox="0 0 760 300" role="img" aria-label={"插件验证实验：当前路径为" + (route === "manual" ? "手工工具链" : "建模插件") + "，网格状态为" + (meshState === "clean" ? "正常" : "故障") + "，拓扑检查" + (validated ? "已执行" : "未执行") + "；结果为" + (ready ? "可交接" : "阻塞") + "。"} className="block h-auto w-full rounded-card border border-border bg-bg">
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Tool / Add-On → Mesh Checks → Handoff</text>
          <rect x="38" y="76" width="180" height="122" rx="14" fill={route === "addon" ? "var(--accent)" : "var(--bg)"} fillOpacity={route === "addon" ? 0.12 : 1} stroke={route === "addon" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="128" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{route === "manual" ? "Manual Chain" : "Modeling Add-On"}</text>
          <text x="128" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{route === "manual" ? "可逐步解释" : "一步组合操作"}</text>
          <text x="128" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">保存版本与参数</text>
          <path d="M236 137 H290" stroke="var(--border)" strokeWidth="3" />
          <rect x="302" y="76" width="180" height="122" rx="14" fill={meshState === "fault" ? "var(--danger)" : "var(--bg)"} fillOpacity={meshState === "fault" ? 0.12 : 1} stroke={meshState === "fault" ? "var(--danger)" : "var(--border)"} strokeWidth="2" />
          <text x="392" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Mesh Checks</text>
          <text x="392" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">重叠点 / 法线 / 非流形</text>
          <text x="392" y="174" textAnchor="middle" fontSize="11" fill={meshState === "fault" ? "var(--danger)" : "var(--text-secondary)"}>{meshState === "fault" ? "发现故障样本" : "等待检查"}</text>
          <path d="M500 137 H554" stroke={ready ? "var(--success)" : "var(--border)"} strokeWidth="3" />
          <rect x="566" y="76" width="156" height="122" rx="14" fill={ready ? "var(--success)" : "var(--bg)"} fillOpacity={ready ? 0.14 : 1} stroke={ready ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="644" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill={ready ? "var(--success)" : "var(--text-primary)"}>{ready ? "可交接" : "阻塞"}</text>
          <text x="644" y="144" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{validated ? "检查已记录" : "缺少检查证据"}</text>
          <text x="644" y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">插件不替代验证</text>
          <text x="380" y="242" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">正常、边界和故障样本都走同一套拓扑验收</text>
          <text x="380" y="268" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">记录插件版本，才能让另一位读者重放</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">改变工具链状态</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={route === "manual"} onClick={() => setRoute("manual")}>手工工具链</ChoiceButton>
            <ChoiceButton active={route === "addon"} onClick={() => setRoute("addon")}>建模插件</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={meshState === "clean"} onClick={() => setMeshState("clean")}>正常网格</ChoiceButton>
            <ChoiceButton active={meshState === "fault"} onClick={() => setMeshState("fault")}>故障网格</ChoiceButton>
          </div>
          <ChoiceButton active={validated} onClick={() => setValidated((value) => !value)}>{validated ? "撤销拓扑检查" : "执行拓扑检查"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {ready ? "工具链通过验收，可把输出交给下游。" : "当前不能交接：先保存输入/输出，再完成重叠点、法线和非流形检查。"}
          </p>
        </div>
      </div>
    </section>
  );
}
