"use client";

import { useMemo, useState } from "react";

const COLORS = {
  bg: "var(--bg)",
  panel: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type Mode = "kmeans" | "weights" | "gradient";
type Point = { x: number; y: number };
type Centers = [Point, Point];

const DATA: Point[] = [
  { x: 90, y: 100 },
  { x: 125, y: 135 },
  { x: 155, y: 95 },
  { x: 345, y: 225 },
  { x: 380, y: 260 },
  { x: 410, y: 215 },
];
const INITIAL_CENTERS: Centers = [
  { x: 75, y: 65 },
  { x: 430, y: 285 },
];
const INITIAL_LOSSES = [0.1, 0.7, 0.3];
const INITIAL_X: Point = { x: 2.4, y: 2 };
const MAX_STEPS = 8;

function squaredDistance(a: Point, b: Point) {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
}

function assign(points: Point[], centers: Centers) {
  return points.map((point) =>
    squaredDistance(point, centers[0]) <= squaredDistance(point, centers[1])
      ? 0
      : 1,
  );
}

function meanForCluster(
  points: Point[],
  memberships: number[],
  cluster: number,
  fallback: Point,
) {
  const members = points.filter((_, index) => memberships[index] === cluster);
  if (members.length === 0) return fallback;
  return {
    x: members.reduce((sum, point) => sum + point.x, 0) / members.length,
    y: members.reduce((sum, point) => sum + point.y, 0) / members.length,
  };
}

function objective(points: Point[], memberships: number[], centers: Centers) {
  return points.reduce(
    (sum, point, index) =>
      sum + squaredDistance(point, centers[memberships[index]]),
    0,
  );
}

function iterateLloyd(centers: Centers, phase: "assign" | "update") {
  if (phase === "assign") {
    const memberships = assign(DATA, centers);
    return { centers, memberships, phase: "update" as const };
  }
  const memberships = assign(DATA, centers);
  const nextCenters: Centers = [
    meanForCluster(DATA, memberships, 0, centers[0]),
    meanForCluster(DATA, memberships, 1, centers[1]),
  ];
  return { centers: nextCenters, memberships, phase: "assign" as const };
}

function gradientPoint(iteration: number, eta: number): Point {
  return {
    x: INITIAL_X.x * (1 - 2 * eta) ** iteration,
    y: INITIAL_X.y * (1 - 4 * eta) ** iteration,
  };
}

function objectiveValue(point: Point) {
  return point.x ** 2 + 2 * point.y ** 2;
}

function simulateExperts(losses: number[], epsilon: number, rounds: number) {
  const rawWeights = [1, 1, 1];
  let learnerLoss = 0;
  const expertLosses = [0, 0, 0];

  for (let round = 0; round < rounds; round += 1) {
    const total = rawWeights.reduce((sum, weight) => sum + weight, 0);
    const probabilities = rawWeights.map((weight) => weight / total);
    learnerLoss += probabilities.reduce(
      (sum, probability, index) => sum + probability * losses[index],
      0,
    );
    losses.forEach((loss, index) => {
      expertLosses[index] += loss;
      rawWeights[index] *= 1 - epsilon * loss;
    });
  }

  return {
    probabilities: (() => {
      const total = rawWeights.reduce((sum, weight) => sum + weight, 0);
      return rawWeights.map((weight) => weight / total);
    })(),
    learnerLoss,
    bestExpertLoss: Math.min(...expertLosses),
  };
}

export function Clrs4Chapter33MachineLearningAlgorithmsLab() {
  const [mode, setMode] = useState<Mode>("kmeans");
  const [step, setStep] = useState(0);
  const [centers, setCenters] = useState<Centers>(INITIAL_CENTERS);
  const [memberships, setMemberships] = useState<number[]>(
    assign(DATA, INITIAL_CENTERS),
  );
  const [phase, setPhase] = useState<"assign" | "update">("assign");
  const [epsilon, setEpsilon] = useState(0.5);
  const [losses, setLosses] = useState(INITIAL_LOSSES);
  const [eta, setEta] = useState(0.15);

  const expertRun = useMemo(
    () => simulateExperts(losses, epsilon, step),
    [epsilon, losses, step],
  );
  const weights = expertRun.probabilities;
  const regret = expertRun.learnerLoss - expertRun.bestExpertLoss;

  const gradient = gradientPoint(step, eta);
  const gradientPath = Array.from({ length: step + 1 }, (_, index) =>
    gradientPoint(index, eta),
  );
  const maxCoordinate = Math.max(
    2.4,
    ...gradientPath.flatMap((point) => [Math.abs(point.x), Math.abs(point.y)]),
  );
  const plotScale = Math.min(55, 105 / maxCoordinate);
  const gradientObjective = objectiveValue(gradient);
  const kmeansObjective = objective(DATA, memberships, centers);
  const canAdvance = step < MAX_STEPS;

  function reset() {
    setMode("kmeans");
    setStep(0);
    setCenters(INITIAL_CENTERS);
    setMemberships(assign(DATA, INITIAL_CENTERS));
    setPhase("assign");
    setEpsilon(0.5);
    setLosses(INITIAL_LOSSES);
    setEta(0.15);
  }

  function changeMode(next: Mode) {
    setMode(next);
    setStep(0);
    if (next === "kmeans") {
      setCenters(INITIAL_CENTERS);
      setMemberships(assign(DATA, INITIAL_CENTERS));
      setPhase("assign");
    }
  }

  function advance() {
    if (!canAdvance) return;
    if (mode === "kmeans") {
      const next = iterateLloyd(centers, phase);
      setCenters(next.centers);
      setMemberships(next.memberships);
      setPhase(next.phase);
    }
    setStep((current) => current + 1);
  }

  const tab = (id: Mode, label: string) => (
    <button
      type="button"
      key={id}
      aria-pressed={mode === id}
      onClick={() => changeMode(id)}
      className="min-h-11 rounded-full border px-4 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderColor: mode === id ? COLORS.accent : COLORS.border,
        color: mode === id ? COLORS.text : COLORS.muted,
        background: mode === id ? COLORS.panel : "transparent",
      }}
    >
      {label}
    </button>
  );

  return (
    <section
      className="not-prose my-8 rounded-2xl border p-4 sm:p-6"
      data-headful-lab="chapter-33-learning-algorithms"
      style={{ borderColor: COLORS.border, background: COLORS.bg }}
      aria-label="机器学习算法交互实验室"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: COLORS.muted }}
          >
            CLRS 4 · Chapter 33
          </p>
          <h3
            className="mt-1 text-lg font-semibold"
            style={{ color: COLORS.text }}
          >
            目标、更新与保证
          </h3>
        </div>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-lg border px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ borderColor: COLORS.border, color: COLORS.text }}
        >
          重置实验
        </button>
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="选择算法"
      >
        {tab("kmeans", "K-means 聚类")}
        {tab("weights", "乘法权重")}
        {tab("gradient", "梯度下降")}
      </div>

      <div className="mt-4 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div
          className="min-w-0 rounded-xl border p-2 sm:p-4"
          style={{ borderColor: COLORS.border, background: COLORS.panel }}
        >
          {mode === "kmeans" && (
            <svg
              viewBox="0 0 520 350"
              role="img"
              aria-label={`K-means 平面点云。当前目标值 ${kmeansObjective.toFixed(0)}；${phase === "assign" ? "下一步按最近中心重新分配样本" : "下一步固定分配并将中心更新为簇均值"}`}
              className="h-auto w-full"
            >
              <path
                d="M260 30V320M45 175H485"
                stroke={COLORS.border}
                strokeDasharray="4 6"
              />
              <circle cx="56" cy="38" r="6" fill={COLORS.accent} />
              <text x="68" y="42" fill={COLORS.text} fontSize="12">
                簇 A · 圆点
              </text>
              <rect
                x="160"
                y="32"
                width="12"
                height="12"
                rx="2"
                fill={COLORS.success}
              />
              <text x="179" y="42" fill={COLORS.text} fontSize="12">
                簇 B · 方点
              </text>
              {DATA.map((point, index) => {
                const cluster = memberships[index];
                const center = centers[cluster];
                return (
                  <g key={`sample-${index}`}>
                    <line
                      x1={point.x}
                      y1={point.y}
                      x2={center.x}
                      y2={center.y}
                      stroke={cluster === 0 ? COLORS.accent : COLORS.success}
                      strokeOpacity=".45"
                      strokeDasharray="4 5"
                    />
                    {cluster === 0 ? (
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="9"
                        fill={COLORS.accent}
                      />
                    ) : (
                      <rect
                        x={point.x - 7}
                        y={point.y - 7}
                        width="14"
                        height="14"
                        rx="2"
                        fill={COLORS.success}
                      />
                    )}
                  </g>
                );
              })}
              {centers.map((center, cluster) => (
                <g key={`center-${cluster}`}>
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r="15"
                    fill={COLORS.bg}
                    stroke={cluster === 0 ? COLORS.accent : COLORS.success}
                    strokeWidth="4"
                  />
                  <path
                    d={`M${center.x - 7} ${center.y}h14 M${center.x} ${center.y - 7}v14`}
                    stroke={cluster === 0 ? COLORS.accent : COLORS.success}
                    strokeWidth="2"
                  />
                  <text
                    x={center.x}
                    y={center.y - 22}
                    textAnchor="middle"
                    fill={COLORS.text}
                    fontSize="13"
                  >
                    μ{cluster + 1}
                  </text>
                </g>
              ))}
              <text
                x="260"
                y="340"
                textAnchor="middle"
                fill={COLORS.muted}
                fontSize="13"
              >
                虚线连接样本与其中心 · 当前 J = {kmeansObjective.toFixed(0)}
              </text>
            </svg>
          )}

          {mode === "weights" && (
            <svg
              viewBox="0 0 520 350"
              role="img"
              aria-label={`乘法权重更新后，三位专家归一化权重分别为 ${weights.map((weight) => `${(weight * 100).toFixed(1)}%`).join("、")}`}
              className="h-auto w-full"
            >
              <text
                x="260"
                y="30"
                fill={COLORS.muted}
                fontSize="13"
                textAnchor="middle"
              >
                pᵢ = wᵢ / Σw · wᵢ ← wᵢ(1 − εℓᵢ)
              </text>
              {weights.map((weight, index) => (
                <g key={`expert-${index}`}>
                  <text
                    x="24"
                    y={92 + index * 74}
                    fill={COLORS.text}
                    fontSize="14"
                  >
                    专家 {index + 1}
                  </text>
                  <rect
                    x="112"
                    y={68 + index * 74}
                    width="330"
                    height="32"
                    rx="8"
                    fill={COLORS.bg}
                    stroke={COLORS.border}
                  />
                  <rect
                    x="112"
                    y={68 + index * 74}
                    width={330 * weight}
                    height="32"
                    rx="8"
                    fill={
                      index === 0
                        ? COLORS.accent
                        : index === 1
                          ? COLORS.warning
                          : COLORS.success
                    }
                  />
                  <text
                    x="454"
                    y={91 + index * 74}
                    fill={COLORS.text}
                    fontSize="14"
                  >
                    {(weight * 100).toFixed(1)}%
                  </text>
                  <text
                    x="112"
                    y={119 + index * 74}
                    fill={COLORS.muted}
                    fontSize="12"
                  >
                    每轮 ℓ{index + 1} = {losses[index].toFixed(1)}
                  </text>
                </g>
              ))}
              <text
                x="260"
                y="330"
                fill={COLORS.muted}
                fontSize="13"
                textAnchor="middle"
              >
                执行 {step} 轮 · 归一化权重之和 = 100%
              </text>
            </svg>
          )}

          {mode === "gradient" && (
            <svg
              viewBox="0 0 520 350"
              role="img"
              aria-label={`函数 f(x,y)=x²+2y² 的梯度下降轨迹；步长 η=${eta.toFixed(2)}，迭代 ${step} 步，函数值 ${gradientObjective.toFixed(3)}`}
              className="h-auto w-full"
            >
              {[40, 75, 112, 150].map((radius, index) => (
                <ellipse
                  key={`contour-${radius}`}
                  cx="260"
                  cy="175"
                  rx={radius * 1.35 * (plotScale / 55)}
                  ry={radius * 0.72 * (plotScale / 38)}
                  fill="none"
                  stroke={index === 0 ? COLORS.accent : COLORS.border}
                  strokeWidth={index === 0 ? 2 : 1.5}
                />
              ))}
              {gradientPath.length > 1 && (
                <polyline
                  points={gradientPath
                    .map(
                      (point) =>
                        `${260 + point.x * plotScale},${175 - point.y * plotScale}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke={COLORS.accent}
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              )}
              {gradientPath.map((point, index) => (
                <g key={`iterate-${index}`}>
                  <circle
                    cx={260 + point.x * plotScale}
                    cy={175 - point.y * plotScale}
                    r={index === step ? 8 : 5}
                    fill={index === step ? COLORS.warning : COLORS.accent}
                  />
                  <text
                    x={266 + point.x * plotScale}
                    y={170 - point.y * plotScale}
                    fill={COLORS.text}
                    fontSize="12"
                  >
                    x⁽{index}⁾
                  </text>
                </g>
              ))}
              <circle cx="260" cy="175" r="7" fill={COLORS.success} />
              <text
                x="260"
                y="330"
                textAnchor="middle"
                fill={COLORS.muted}
                fontSize="13"
              >
                f(x,y) = x² + 2y² · 当前 f = {gradientObjective.toFixed(3)}
              </text>
            </svg>
          )}
        </div>

        <aside className="flex min-w-0 flex-col gap-3" aria-live="polite">
          <p
            className="min-h-16 text-sm leading-6"
            style={{ color: COLORS.muted }}
          >
            {mode === "kmeans"
              ? phase === "assign"
                ? "分配阶段：每个点连到最近中心；下一步固定分配，把中心移到各簇的算术均值。"
                : "更新阶段：中心已移到当前簇均值；下一步重新分配。空簇示例中保留旧中心。"
              : mode === "weights"
                ? `将当前损失向量重复用于每一轮，权重按 wᵢ←wᵢ(1−εℓᵢ) 更新。当前 regret = ${regret.toFixed(3)}：学习者累计期望损失 ${expertRun.learnerLoss.toFixed(3)} − 最佳固定专家损失 ${expertRun.bestExpertLoss.toFixed(3)}。改动损失会重算整段固定序列。`
                : `对 f=x²+2y²，更新为 x←(1−2η)x、y←(1−4η)y。当前梯度范数为 ${Math.hypot(2 * gradient.x, 4 * gradient.y).toFixed(3)}；目标值由真实迭代计算。${eta < 0.5 ? "此二次函数的严格稳定范围是 0 < η < 0.5。" : eta === 0.5 ? "η=0.5 时 y 坐标不收缩，不能到达唯一极小点。" : "η>0.5 时 y 方向放大，目标会发散。"}`}
          </p>

          {mode === "weights" && (
            <fieldset className="space-y-2">
              <legend
                className="text-sm font-medium"
                style={{ color: COLORS.text }}
              >
                每轮损失（0–1；固定重复）
              </legend>
              {losses.map((loss, index) => (
                <label
                  key={`loss-${index}`}
                  className="flex min-h-11 items-center gap-2 text-xs"
                  style={{ color: COLORS.muted }}
                >
                  专家 {index + 1}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={loss}
                    onChange={(event) =>
                      setLosses((old) =>
                        old.map((value, i) =>
                          i === index ? Number(event.target.value) : value,
                        ),
                      )
                    }
                    aria-label={`专家 ${index + 1} 的损失`}
                    className="min-w-0 flex-1"
                  />
                  <span>{loss.toFixed(1)}</span>
                </label>
              ))}
              <label className="block text-sm" style={{ color: COLORS.text }}>
                学习率 ε：{epsilon.toFixed(1)}
                <input
                  aria-label="乘法权重学习率 epsilon"
                  type="range"
                  min="0.1"
                  max="0.5"
                  step="0.1"
                  value={epsilon}
                  onChange={(event) => setEpsilon(Number(event.target.value))}
                  className="mt-2 block min-h-11 w-full"
                />
              </label>
            </fieldset>
          )}

          {mode === "gradient" && (
            <label className="text-sm" style={{ color: COLORS.text }}>
              步长 η：{eta.toFixed(2)}
              <input
                aria-label="梯度下降步长 eta"
                type="range"
                min="0.05"
                max="0.7"
                step="0.05"
                value={eta}
                onChange={(event) => setEta(Number(event.target.value))}
                className="mt-2 block min-h-11 w-full"
              />
              <span
                className="mt-1 block text-xs leading-5"
                style={{ color: COLORS.muted }}
              >
                本例 Hessian 最大特征值 L=4；0&lt;η&lt;2/L 保持收敛，η=0.5
                不收缩 y，η&gt;0.5 发散。
              </span>
            </label>
          )}

          <div className="mt-auto flex flex-wrap gap-2">
            <button
              type="button"
              onClick={advance}
              disabled={!canAdvance}
              className="min-h-11 flex-1 rounded-lg px-3 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: COLORS.accent, color: COLORS.bg }}
            >
              {mode === "kmeans"
                ? phase === "assign"
                  ? "执行分配"
                  : "更新中心"
                : "推进一步"}
            </button>
          </div>
          <p className="text-xs" style={{ color: COLORS.muted }}>
            迭代：{step}/{MAX_STEPS}
          </p>
        </aside>
      </div>
    </section>
  );
}
