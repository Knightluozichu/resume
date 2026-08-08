"use client";

import { useState } from "react";

const CHAPTER_CONCEPTS = [
  "第27章 程序规模对“构建”的影响",
  "27.1 交流和规模",
  "27.2 项目规模的范围",
  "27.3 项目规模对错误的影响",
  "27.4 项目规模对生产率的影响",
  "27.5 项目规模对开发活动的影响",
  "活动比例和项目规模",
  "程序、产品、系统和系统产品",
  "方法论和规模",
  "额外资源",
  "关键点",
] as const;

const controlClass =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onClick={onReset}
    >
      重置实验
    </button>
  );
}

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
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <ResetButton onReset={onReset} />
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-control border border-border bg-background p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-foreground">{value}</dd>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  );
}

export function Cc2e27ProgramSizeNetworkLab() {
  const [people, setPeople] = useState(4);
  const [linearModel, setLinearModel] = useState(false);
  const channels = (people * (people - 1)) / 2;
  const observedChannels = linearModel ? people : channels;
  const nodes = Array.from({ length: people }, (_, index) => {
    const angle = (Math.PI * 2 * index) / people - Math.PI / 2;
    return {
      x: 280 + Math.cos(angle) * 104,
      y: 148 + Math.sin(angle) * 104,
    };
  });
  const edges = nodes.flatMap((node, from) =>
    nodes.slice(from + 1).map((target, offset) => ({
      from,
      to: from + offset + 1,
      x1: node.x,
      y1: node.y,
      x2: target.x,
      y2: target.y,
    })),
  );

  function reset() {
    setPeople(4);
    setLinearModel(false);
  }

  return (
    <section
      aria-label="交流和规模实验"
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="cc2e-27-program-size-network"
      data-unit-id="cc2e-27-program-size"
    >
      <LabHeader
        eyebrow="27.1 交流和规模 · 沟通网络"
        title="人数增加时，沟通边不是线性增加"
        description="先预测团队人数变化会怎样影响协作边，再打开误区开关，比较 n(n−1)/2 与把人数直接当作沟通量的线性模型。"
        onReset={reset}
      />
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            团队人数：{people} 人
            <input
              aria-label="团队人数"
              className="mt-2 h-11 w-full accent-[var(--accent)]"
              type="range"
              min="2"
              max="10"
              value={people}
              onChange={(event) => setPeople(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            className={`${controlClass} w-full ${linearModel ? "border-danger bg-danger/10" : ""}`}
            aria-pressed={linearModel}
            onClick={() => setLinearModel((value) => !value)}
          >
            {linearModel ? "已注入：把人数当作沟通量" : "注入线性外推误区"}
          </button>
          <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <Metric
              label="理论沟通边"
              value={`${channels} 条`}
              detail="每两个人之间需要一条潜在协作边。"
            />
            <Metric
              label="当前读数"
              value={`${observedChannels} 条`}
              detail={linearModel ? "误区把 n 当成沟通边，低估集成与同步成本。" : "正常模型随人数平方增长，适合继续观察边界。"}
            />
          </dl>
        </div>
        <div className="rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 560 300"
            className="h-auto w-full"
            role="img"
            aria-label={`团队 ${people} 人的沟通网络，理论上有 ${channels} 条协作边`}
          >
            <rect x="1" y="1" width="558" height="298" rx="18" fill="var(--bg-elevated)" stroke="var(--border)" />
            {edges.map((edge) => (
              <line
                key={`edge-${edge.from}-${edge.to}`}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke={linearModel ? "var(--danger)" : "var(--accent)"}
                strokeOpacity={linearModel ? 0.18 : 0.34}
                strokeWidth="2"
              />
            ))}
            {nodes.map((node, index) => (
              <g key={`person-${index}`}>
                <circle cx={node.x} cy={node.y} r="19" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
                <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize="14" fill="var(--text-primary)">
                  P{index + 1}
                </text>
              </g>
            ))}
            <text x="280" y="34" textAnchor="middle" fontSize="16" fontWeight="600" fill="var(--text-primary)">
              {linearModel ? "线性误区：沟通量 ≈ n" : "协作边：n(n−1)/2"}
            </text>
            <text x="280" y="278" textAnchor="middle" fontSize="13" fill="var(--text-secondary)">
              每条线代表一个需要共享上下文的潜在关系
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

const activityColors = [
  "var(--accent)",
  "var(--success)",
  "var(--warning)",
  "var(--danger)",
];

export function Cc2e27ProgramSizeActivityLab() {
  const [scale, setScale] = useState(1);
  const [ignoreCoordination, setIgnoreCoordination] = useState(false);
  const baseActivities = ignoreCoordination
    ? [58, 22, 12, 8]
    : [42 - scale * 2, 25 + scale * 3, 19 + scale * 2, 14 - scale * 3];
  const activityTotal = baseActivities.reduce((sum, value) => sum + value, 0);
  const activities = baseActivities.map((value) => (value / activityTotal) * 100);
  const activityNames = ["直接构建", "沟通与协调", "验证与返工", "管理与集成"];

  function reset() {
    setScale(1);
    setIgnoreCoordination(false);
  }

  return (
    <section
      aria-label="活动比例和项目规模实验"
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="cc2e-27-program-size-activity"
      data-unit-id="cc2e-27-program-size"
    >
      <LabHeader
        eyebrow="27.4 生产率 · 27.5 开发活动"
        title="规模变化会重配活动比例"
        description="拖动规模因子，先观察直接构建所占比例如何让位给沟通、验证与集成；再注入忽略协调的模型，看到为什么线性生产率会失真。"
        onReset={reset}
      />
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            项目规模因子：{scale}×
            <input
              aria-label="项目规模因子"
              className="mt-2 h-11 w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="5"
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            className={`${controlClass} w-full ${ignoreCoordination ? "border-danger bg-danger/10" : ""}`}
            aria-pressed={ignoreCoordination}
            onClick={() => setIgnoreCoordination((value) => !value)}
          >
            {ignoreCoordination ? "已注入：忽略沟通与集成" : "注入线性生产率误区"}
          </button>
          <p className="rounded-control border border-border bg-background p-3 text-sm leading-relaxed text-secondary" role="status">
            {ignoreCoordination
              ? "模型把大部分时间留给直接构建；它看起来更快，却没有为边界、依赖和返工预留容量。"
              : "当前模型把规模视为约束变化：沟通、验证和集成会随边界增多而占据更大比例。"}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 640 330"
            className="h-auto w-full"
            role="img"
            aria-label={`规模 ${scale} 倍时的活动比例图`}
          >
            <rect x="1" y="1" width="638" height="328" rx="18" fill="var(--bg-elevated)" stroke="var(--border)" />
            <text x="32" y="36" fontSize="16" fontWeight="600" fill="var(--text-primary)">
              规模 {scale}× 的活动配额
            </text>
            <text x="32" y="61" fontSize="13" fill="var(--text-secondary)">
              不是把代码量除以人数，而是重新安排工作类型
            </text>
            <g transform="translate(32 92)">
              {activities.map((activity, index) => {
                const offset = activities.slice(0, index).reduce((sum, value) => sum + value, 0);
                return (
                  <g key={`activity-${activityNames[index]}`}>
                    <rect x={`${offset * 5.7}`} y="0" width={`${activity * 5.7}`} height="52" fill={activityColors[index]} opacity="0.82" />
                    {activity > 12 ? (
                      <text x={`${(offset + activity / 2) * 5.7}`} y="31" textAnchor="middle" fontSize="12" fill="var(--bg)">
                        {Math.round(activity)}%
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </g>
            <g transform="translate(32 180)">
              {activityNames.map((name, index) => (
                <g key={`legend-${name}`} transform={`translate(${(index % 2) * 285} ${(index >> 1) * 42})`}>
                  <rect width="14" height="14" rx="3" fill={activityColors[index]} />
                  <text x="24" y="12" fontSize="13" fill="var(--text-primary)">
                    {name}
                  </text>
                </g>
              ))}
            </g>
            <path d="M32 286H608" stroke="var(--border)" strokeWidth="1" />
            <text x="32" y="310" fontSize="12" fill="var(--text-secondary)">
              读图：直接构建下降并不等于生产率下降；要同时检查缺陷、等待和交接成本。
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

type Boundary = "程序" | "产品" | "系统";

const boundaryDetails: Record<Boundary, { subtitle: string; artifact: string }> = {
  程序: { subtitle: "单个程序边界", artifact: "接口、局部测试与代码审查记录" },
  产品: { subtitle: "可交付产品边界", artifact: "需求基线、集成构建与验收样本" },
  系统: { subtitle: "系统产品边界", artifact: "跨团队合同、发布窗口与运行证据" },
};

export function Cc2e27ProgramSizeRecoveryLab() {
  const [boundary, setBoundary] = useState<Boundary>("程序");
  const [missingReview, setMissingReview] = useState(false);
  const stages = ["规模口径", "方法选择", "验证活动", "交付证据"];
  const failedStage = missingReview ? 2 : -1;

  function reset() {
    setBoundary("程序");
    setMissingReview(false);
  }

  return (
    <section
      aria-label="程序产品系统边界与恢复实验"
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="cc2e-27-program-size-recovery"
      data-unit-id="cc2e-27-program-size"
    >
      <LabHeader
        eyebrow="程序、产品、系统和系统产品 · 方法论和规模"
        title="边界改变，验收证据也必须改变"
        description="选择对象边界，再只注入一次“缺少边界复核”的故障，沿着规模口径、方法、验证与交付证据定位第一处分岔。"
        onReset={reset}
      />
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">选择观察对象</p>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {(Object.keys(boundaryDetails) as Boundary[]).map((item) => (
              <button
                key={item}
                type="button"
                className={`${controlClass} ${boundary === item ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={boundary === item}
                onClick={() => setBoundary(item)}
              >
                {item} · {boundaryDetails[item].subtitle}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`${controlClass} w-full ${missingReview ? "border-danger bg-danger/10" : ""}`}
            aria-pressed={missingReview}
            onClick={() => setMissingReview((value) => !value)}
          >
            {missingReview ? "已注入：跳过边界复核" : "注入边界复核故障"}
          </button>
          <p className="rounded-control border border-border bg-background p-3 text-sm leading-relaxed text-secondary" role="status">
            当前对象：{boundary}。应保存的额外资源是：{boundaryDetails[boundary].artifact}。
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 700 260"
            className="h-auto w-full"
            role="img"
            aria-label={`${boundary}边界的规模调整与恢复路径`}
          >
            <rect x="1" y="1" width="698" height="258" rx="18" fill="var(--bg-elevated)" stroke="var(--border)" />
            <text x="28" y="34" fontSize="16" fontWeight="600" fill="var(--text-primary)">
              {boundary}边界 · 规模调整路径
            </text>
            <text x="28" y="58" fontSize="13" fill="var(--text-secondary)">
              先预测第一处分岔，再用证据确认恢复是否回到同一合同
            </text>
            {stages.map((stage, index) => {
              const x = 36 + index * 165;
              const failed = failedStage === index;
              return (
                <g key={stage}>
                  {index < stages.length - 1 ? (
                    <path d={`M${x + 124} 142H${x + 154}`} stroke={failedStage > index ? "var(--danger)" : "var(--accent)"} strokeWidth="3" />
                  ) : null}
                  <rect x={x} y="100" width="124" height="84" rx="12" fill={failed ? "var(--danger)" : "var(--bg)"} fillOpacity={failed ? 0.14 : 1} stroke={failed ? "var(--danger)" : "var(--border)"} strokeWidth="2" />
                  <circle cx={x + 22} cy="122" r="10" fill={failed ? "var(--danger)" : "var(--accent)"} />
                  <text x={x + 22} y="127" textAnchor="middle" fontSize="12" fill="var(--bg)">
                    {index + 1}
                  </text>
                  <text x={x + 62} y="130" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
                    {stage}
                  </text>
                  <text x={x + 62} y="157" textAnchor="middle" fontSize="12" fill={failed ? "var(--danger)" : "var(--text-secondary)"}>
                    {failed ? "首个分岔" : index === 3 ? "可交付" : "可复核"}
                  </text>
                </g>
              );
            })}
            <text x="350" y="224" textAnchor="middle" fontSize="13" fill={missingReview ? "var(--danger)" : "var(--success)"}>
              {missingReview ? "拒绝：规模边界没有进入验证合同" : "通过：对象、方法与证据保持同一观察边界"}
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

export { CHAPTER_CONCEPTS };
