"use client";

import { useState } from "react";

type Stage = {
  label: string;
  units: number;
  signal: string;
  gate: string;
};

const STAGES: readonly Stage[] = [
  {
    label: "构建基础",
    units: 9,
    signal: "版本、范围与需求先决条件已经写清",
    gate: "没有范围就不能把目录标题当作覆盖证据",
  },
  {
    label: "代码结构",
    units: 9,
    signal: "设计、类与子程序形成可追踪的边界",
    gate: "没有边界就无法定位修改影响",
  },
  {
    label: "数据控制",
    units: 7,
    signal: "变量、类型、语句与控制流可被复核",
    gate: "没有状态轨迹就不能解释输出如何产生",
  },
  {
    label: "质量改善",
    units: 8,
    signal: "协同、测试、调试与重构形成反馈",
    gate: "没有反馈就无法区分偶然成功与稳定改进",
  },
  {
    label: "系统工艺",
    units: 16,
    signal: "规模、集成、工具与工艺接住前四阶段",
    gate: "没有交接证据就不能宣称全书闭环",
  },
] as const;

const TRACE_NODES = [
  {
    label: "第1部分 打好基础",
    focus: "先冻结版本、问题、需求与架构边界",
    evidence: "版本卡 + 需求决策 + 架构假设",
  },
  {
    label: "第2部分 创建高质量的代码",
    focus: "把设计、类、子程序和防御式检查落到构件边界",
    evidence: "设计取舍 + 不变量 + 错误路径",
  },
  {
    label: "第3部分 变量",
    focus: "让名称、类型、生命周期与作用域说明状态变化",
    evidence: "变量表 + 边界样本 + 状态快照",
  },
  {
    label: "第4部分 语句",
    focus: "沿顺序、条件、循环和表驱动选择一条可重放控制流",
    evidence: "输入矩阵 + 首差位置 + 回退结果",
  },
  {
    label: "第5部分 代码改善",
    focus: "用协同、测试、调试和重构把反馈接回代码",
    evidence: "失败断言 + 修复 diff + 回归记录",
  },
  {
    label: "第6部分 系统考虑",
    focus: "把规模、管理、集成和工具放进同一交接边界",
    evidence: "集成轨迹 + 工具版本 + 发布门",
  },
  {
    label: "第7部分 软件工艺",
    focus: "用风格、自说明、性格与持续学习保持可维护性",
    evidence: "复核清单 + 反例 + 独立复现记录",
  },
] as const;

const FAILURE_MODES = [
  {
    label: "正常路径",
    summary: "49 个正式单元按依赖顺序进入证据门。",
    firstBreak: "无：五阶段均有输入、解释、视觉和练习证据。",
    tone: "text-success",
  },
  {
    label: "平铺目录",
    summary: "把 49 个标题一次性打勾，跳过前置条件。",
    firstBreak: "构建基础：标题出现了，但版本和范围没有被验证。",
    tone: "text-warning",
  },
  {
    label: "只看正常输出",
    summary: "只保存成功结果，不注入边界或单一故障。",
    firstBreak: "质量改善：没有首差，修复也无法证明是因果的。",
    tone: "text-danger",
  },
] as const;

function LabHeader({
  eyebrow,
  title,
  description,
  onReset,
}: {
  eyebrow: string;
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-wide text-accent">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-base font-semibold text-primary">{title}</h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
          {description}
        </p>
      </div>
      <button
        type="button"
        className="min-h-11 rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
        onClick={onReset}
      >
        重置实验
      </button>
    </header>
  );
}

export function Cc2eOfficialLearningMapCoverageMap() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STAGES[activeStageIndex];
  const completedUnits = STAGES.slice(0, activeStageIndex + 1).reduce(
    (total, stage) => total + stage.units,
    0,
  );

  return (
    <section
      aria-label="学习地图覆盖实验"
      data-visual-kind="cc2e-learning-map"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <LabHeader
        eyebrow="49 个正式单元 / 685 个目录节点"
        title="覆盖地图：先决条件决定解锁顺序"
        description="选择一个阶段，观察它拥有的正式单元、验收信号和拒绝条件。地图角色不伪造单一 officialUnitId，而是保留整本书的坐标系。"
        onReset={() => setActiveStageIndex(0)}
      />
      <div className="min-w-0 p-5">
        <div className="grid gap-2 sm:grid-cols-5" aria-label="五阶段路线">
          {STAGES.map((stage, index) => {
            const selected = index === activeStageIndex;
            const unlocked = index <= activeStageIndex;
            return (
              <button
                key={`${stage.label}-${index}`}
                type="button"
                aria-pressed={selected}
                className={`min-h-14 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                  selected
                    ? "border-accent bg-accent/10 text-primary"
                    : unlocked
                      ? "border-border bg-surface text-primary hover:border-accent"
                      : "border-border bg-bg/40 text-secondary hover:text-primary"
                }`}
                onClick={() => setActiveStageIndex(index)}
              >
                <span className="block text-xs text-secondary">
                  {String(index + 1).padStart(2, "0")} · {stage.units} 单元
                </span>
                <span className="mt-1 block font-semibold">{stage.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div
            role="img"
            aria-label={`五阶段依赖图，当前为${activeStage.label}`}
            className="grid min-w-0 gap-3 rounded-card border border-border bg-surface p-4 sm:grid-cols-5"
          >
            {STAGES.map((stage, index) => (
              <div key={`${stage.label}-track-${index}`} className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full border ${
                      index <= activeStageIndex
                        ? "border-accent bg-accent"
                        : "border-border bg-bg"
                    }`}
                  />
                  <span className="truncate text-xs font-semibold text-primary">
                    {stage.label}
                  </span>
                </div>
                {index < STAGES.length - 1 ? (
                  <div
                    className={`ml-1.5 mt-2 h-1 rounded-full ${
                      index < activeStageIndex ? "bg-accent" : "bg-border"
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div
            className="min-w-0 rounded-card border border-border bg-surface p-4"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xs font-semibold text-accent">当前检查点</p>
              <p className="font-mono text-xs text-secondary">
                {completedUnits}/49 units
              </p>
            </div>
            <p className="mt-2 text-base font-semibold text-primary">
              {activeStage.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {activeStage.signal}
            </p>
            <p className="mt-3 border-l-2 border-warning pl-3 text-sm leading-6 text-primary">
              拒绝条件：{activeStage.gate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cc2eOfficialLearningMapTraceLab() {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [evidenceMode, setEvidenceMode] = useState<
    "normal" | "boundary" | "fault"
  >("normal");
  const node = TRACE_NODES[nodeIndex];
  const modeLabel =
    evidenceMode === "normal"
      ? "正常样本"
      : evidenceMode === "boundary"
        ? "恰好边界"
        : "单一故障";

  return (
    <section
      aria-label="证据轨迹实验"
      data-visual-kind="cc2e-evidence-trace"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <LabHeader
        eyebrow="目录坐标 → 机制 → 证据"
        title="证据轨迹：每个部分都要留下可复核物"
        description="先选一个正式部分，再切换样本类型；同一节点的解释、边界与故障证据必须能被第二位读者重放。"
        onReset={() => {
          setNodeIndex(0);
          setEvidenceMode("normal");
        }}
      />
      <div className="grid min-w-0 gap-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid min-w-0 gap-2 border-b border-border p-4 lg:border-r lg:border-b-0">
          {TRACE_NODES.map((item, index) => (
            <button
              key={`${item.label}-${index}`}
              type="button"
              aria-pressed={nodeIndex === index}
              className={`min-h-12 rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                nodeIndex === index
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:text-primary"
              }`}
              onClick={() => setNodeIndex(index)}
            >
              <span className="mr-2 font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="min-w-0 p-5" aria-live="polite">
          <div className="flex flex-wrap gap-2" aria-label="样本类型">
            {(["normal", "boundary", "fault"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={evidenceMode === mode}
                className={`min-h-11 rounded-full border px-3 py-2 text-xs transition-colors ${
                  evidenceMode === mode
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary hover:text-primary"
                }`}
                onClick={() => setEvidenceMode(mode)}
              >
                {mode === "normal"
                  ? "正常样本"
                  : mode === "boundary"
                    ? "恰好边界"
                    : "单一故障"}
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-card border border-border bg-surface p-4">
            <p className="text-xs font-semibold text-accent">{modeLabel}</p>
            <p className="mt-2 text-base font-semibold text-primary">
              {node.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-primary">{node.focus}</p>
          </div>
          <div className="mt-4 rounded-control border border-border bg-bg/40 p-4">
            <p className="text-xs font-semibold text-secondary">应保存的证据</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {node.evidence}
            </p>
            <p className="mt-3 text-xs leading-5 text-secondary">
              记录版本、输入、首差、结果和复位动作；只有这样，地图才是路线而不是目录摘要。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Cc2eOfficialLearningMapFailureTraceLab() {
  const [failureIndex, setFailureIndex] = useState(0);
  const failure = FAILURE_MODES[failureIndex];
  const isHealthy = failureIndex === 0;

  return (
    <section
      aria-label="故障诊断实验"
      data-visual-kind="cc2e-failure-trace"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <LabHeader
        eyebrow="故障注入 → 首差 → 复位"
        title="故障诊断：不允许平均分掩盖首个偏离"
        description="选择一种学习路径，观察地图在哪个阶段拒绝它；重置后应回到正常样本，才说明故障范围被隔离。"
        onReset={() => setFailureIndex(0)}
      />
      <div className="min-w-0 p-5">
        <div className="grid gap-2 sm:grid-cols-3" aria-label="故障模式">
          {FAILURE_MODES.map((mode, index) => (
            <button
              key={`${mode.label}-${index}`}
              type="button"
              aria-pressed={failureIndex === index}
              className={`min-h-14 rounded-control border px-3 py-3 text-left text-sm transition-colors ${
                failureIndex === index
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
              onClick={() => setFailureIndex(index)}
            >
              <span className="block font-semibold">{mode.label}</span>
              <span className="mt-1 block text-xs leading-5 text-secondary">
                {mode.summary}
              </span>
            </button>
          ))}
        </div>
        <div
          className="mt-5 grid min-w-0 gap-3 sm:grid-cols-3"
          aria-live="polite"
        >
          {[
            ["输入", "固定版次、49 单元、685 节点", true],
            ["观察", failure.firstBreak, isHealthy],
            [
              "复位",
              isHealthy ? "同一输入可重放正常路径" : "重置后重新注入单一故障",
              isHealthy,
            ],
          ].map(([label, detail, passed], index) => (
            <div
              key={`${String(label)}-${index}`}
              className="min-w-0 rounded-control border border-border bg-surface p-4"
            >
              <p className="text-xs font-semibold text-secondary">{label}</p>
              <p
                className={`mt-2 text-sm leading-6 ${passed ? "text-success" : failure.tone}`}
              >
                {detail}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-secondary">
          验收规则：正常路径必须通过；平铺目录和只看正常输出必须明确显示首差，而不是返回一个看似完整的总数。
        </p>
      </div>
    </section>
  );
}
