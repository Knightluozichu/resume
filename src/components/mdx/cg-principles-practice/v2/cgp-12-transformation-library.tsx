"use client";

import { useMemo, useState, type ReactNode } from "react";

type ValueKind = "point" | "direction";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

type Point = { x: number; y: number };

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="360" rx="14" fill="var(--bg)" />
      {children}
    </svg>
  );
}

function Arrow({
  color,
  from,
  to,
  dashed = false,
}: {
  color: string;
  from: Point;
  to: Point;
  dashed?: boolean;
}) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const size = 9;
  const left = {
    x: to.x - size * Math.cos(angle - Math.PI / 6),
    y: to.y - size * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: to.x - size * Math.cos(angle + Math.PI / 6),
    y: to.y - size * Math.sin(angle + Math.PI / 6),
  };
  return (
    <>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "7 5" : undefined}
      />
      <polygon
        points={`${to.x},${to.y} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={color}
      />
    </>
  );
}

export function Cgp12LibraryPipelineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="图形变换库流程：调用者输入操作，库构建矩阵并应用到点和方向">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            transformation library：把重复的矩阵责任收进稳定 API
          </text>
          {[
            [36, "调用者", "translate / rotate / scale", COLORS.warning],
            [232, "构建器", "2D / 3D matrix", COLORS.accent],
            [428, "组合器", "M = T · R · S", COLORS.success],
          ].map(([x, title, detail, color]) => (
            <g key={String(title)}>
              <rect
                x={Number(x)}
                y="92"
                width="160"
                height="128"
                rx="14"
                fill={COLORS.surface}
                stroke={COLORS.border}
                strokeWidth="2"
              />
              <circle
                cx={Number(x) + 30}
                cy="126"
                r="9"
                fill={color as string}
              />
              <text
                x={Number(x) + 50}
                y="132"
                fontSize="15"
                fontWeight="700"
                fill={COLORS.text}
              >
                {title as string}
              </text>
              <text
                x={Number(x) + 20}
                y="178"
                fontSize="13"
                fill={COLORS.secondary}
              >
                {detail as string}
              </text>
              <text
                x={Number(x) + 20}
                y="204"
                fontSize="13"
                fill={color as string}
              >
                可单测、可复用
              </text>
            </g>
          ))}
          <line
            x1="202"
            y1="156"
            x2="222"
            y2="156"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="214,146 234,156 214,166" fill={COLORS.accent} />
          <line
            x1="398"
            y1="156"
            x2="418"
            y2="156"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="410,146 430,156 410,166" fill={COLORS.accent} />
          <line
            x1="594"
            y1="156"
            x2="622"
            y2="156"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="614,146 634,156 614,166" fill={COLORS.accent} />
          <text
            x="360"
            y="274"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            输出契约
          </text>
          <text
            x="360"
            y="304"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            点用 w = 1，方向用 w = 0；列主序和乘法顺序写进接口文档
          </text>
          <text
            x="360"
            y="336"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            库的价值：统一约定，而不是隐藏数学
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一个好的变换库让调用者少写重复公式，同时让空间、约定和输入输出责任更容易验收。
      </figcaption>
    </figure>
  );
}

export function Cgp12HomogeneousCoordinateDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="齐次坐标对照：位置的 w 为 1 会被平移，方向的 w 为 0 不被平移">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            homogeneous coordinate：一个分量决定平移责任
          </text>
          <rect
            x="38"
            y="70"
            width="304"
            height="224"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="72"
            y1="246"
            x2="296"
            y2="246"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="134"
            y1="274"
            x2="134"
            y2="106"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <circle cx="134" cy="246" r="6" fill={COLORS.text} />
          <Arrow
            color={COLORS.warning}
            from={{ x: 134, y: 246 }}
            to={{ x: 238, y: 166 }}
          />
          <Arrow
            color={COLORS.success}
            from={{ x: 134, y: 246 }}
            to={{ x: 246, y: 246 }}
            dashed
          />
          <text
            x="170"
            y="146"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.warning}
          >
            point · w = 1
          </text>
          <text x="176" y="270" fontSize="13" fill={COLORS.success}>
            translation applies
          </text>
          <text
            x="190"
            y="316"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            位置会随 t 改变
          </text>
          <rect
            x="378"
            y="70"
            width="304"
            height="224"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="412"
            y1="246"
            x2="636"
            y2="246"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="474"
            y1="274"
            x2="474"
            y2="106"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <circle cx="474" cy="246" r="6" fill={COLORS.text} />
          <Arrow
            color={COLORS.accent}
            from={{ x: 474, y: 246 }}
            to={{ x: 586, y: 166 }}
          />
          <Arrow
            color={COLORS.accent}
            from={{ x: 474, y: 246 }}
            to={{ x: 586, y: 246 }}
            dashed
          />
          <text
            x="510"
            y="146"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.accent}
          >
            direction · w = 0
          </text>
          <text x="516" y="270" fontSize="13" fill={COLORS.accent}>
            translation ignored
          </text>
          <text
            x="530"
            y="316"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            只携带方向
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一套 4×4 矩阵可以处理位置和方向，但 w 的差异决定平移是否参与。
      </figcaption>
    </figure>
  );
}

export function Cgp12ConventionDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="矩阵约定图：列向量与行向量的乘法方向必须和库接口保持一致">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            约定也是 API：数据布局和乘法方向必须成对
          </text>
          <rect
            x="48"
            y="76"
            width="278"
            height="206"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="187"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.accent}
          >
            列向量约定
          </text>
          <text x="86" y="154" fontSize="14" fill={COLORS.secondary}>
            p′ = M · p
          </text>
          <text x="86" y="188" fontSize="13" fill={COLORS.secondary}>
            组合：M = T · R · S
          </text>
          <rect
            x="86"
            y="212"
            width="202"
            height="42"
            rx="8"
            fill={COLORS.accent}
            fillOpacity="0.12"
          />
          <text
            x="187"
            y="238"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.accent}
          >
            右侧操作先发生
          </text>
          <rect
            x="394"
            y="76"
            width="278"
            height="206"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="533"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.warning}
          >
            行向量约定
          </text>
          <text x="432" y="154" fontSize="14" fill={COLORS.secondary}>
            p′ = p · M
          </text>
          <text x="432" y="188" fontSize="13" fill={COLORS.secondary}>
            组合顺序需相应改写
          </text>
          <rect
            x="432"
            y="212"
            width="202"
            height="42"
            rx="8"
            fill={COLORS.warning}
            fillOpacity="0.12"
          />
          <text
            x="533"
            y="238"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            左侧操作先发生
          </text>
          <text
            x="360"
            y="326"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            没有绝对唯一的约定，只有全链路一致的约定
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        矩阵数值看似正确却结果相反时，先检查向量方向、内存布局与乘法顺序是否来自同一套约定。
      </figcaption>
    </figure>
  );
}

function LibraryScene({
  angle,
  scale,
  tx,
  valueKind,
}: {
  angle: number;
  scale: number;
  tx: number;
  valueKind: ValueKind;
}) {
  const radians = (angle * Math.PI) / 180;
  const source = { x: 152, y: 244 };
  const vector = { x: 94, y: -62 };
  const transformed = {
    x:
      source.x +
      scale * (vector.x * Math.cos(radians) - vector.y * Math.sin(radians)) +
      tx,
    y:
      source.y +
      scale * (vector.x * Math.sin(radians) + vector.y * Math.cos(radians)),
  };
  const translationEnd =
    valueKind === "point" ? { x: tx, y: 0 } : { x: 0, y: 0 };
  const matrix = [
    scale * Math.cos(radians),
    -scale * Math.sin(radians),
    tx,
    scale * Math.sin(radians),
    scale * Math.cos(radians),
    0,
  ];
  return (
    <SvgFrame label="可调变换库实验：切换点与方向，观察齐次分量如何改变矩阵输出">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live library：同一矩阵，不同 w 责任
      </text>
      <rect
        x="48"
        y="66"
        width="360"
        height="246"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="82"
        y1="244"
        x2="372"
        y2="244"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="152"
        y1="278"
        x2="152"
        y2="96"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <circle cx={source.x} cy={source.y} r="6" fill={COLORS.warning} />
      <Arrow color={COLORS.warning} from={source} to={transformed} />
      <Arrow
        color={COLORS.success}
        from={source}
        to={{ x: source.x + translationEnd.x, y: source.y + translationEnd.y }}
        dashed
      />
      <circle
        cx={transformed.x}
        cy={transformed.y}
        r="8"
        fill={COLORS.accent}
      />
      <text
        x={transformed.x + 10}
        y={transformed.y - 10}
        fontSize="13"
        fill={COLORS.accent}
      >
        输出
      </text>
      <text x="80" y="292" fontSize="13" fill={COLORS.secondary}>
        黄：输入 · 紫：输出 · 绿：平移贡献
      </text>
      <rect
        x="438"
        y="70"
        width="254"
        height="226"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="460" y="106" fontSize="14" fontWeight="700" fill={COLORS.text}>
        当前矩阵
      </text>
      <text x="460" y="140" fontSize="13" fill={COLORS.accent}>
        [{matrix[0].toFixed(2)}, {matrix[1].toFixed(2)}, {matrix[2]}]
      </text>
      <text x="460" y="168" fontSize="13" fill={COLORS.accent}>
        [{matrix[3].toFixed(2)}, {matrix[4].toFixed(2)}, {matrix[5]}]
      </text>
      <text x="460" y="206" fontSize="13" fill={COLORS.secondary}>
        value kind：{valueKind === "point" ? "point · w=1" : "direction · w=0"}
      </text>
      <text x="460" y="242" fontSize="13" fill={COLORS.success}>
        库输出可复核
      </text>
      <text x="460" y="272" fontSize="13" fill={COLORS.secondary}>
        角度/尺度/平移均可替换
      </text>
      <text
        x="360"
        y="340"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        先固定约定，再比较数值变化
      </text>
    </SvgFrame>
  );
}

export function Cgp12TransformationLibraryLab() {
  const [angle, setAngle] = useState(28);
  const [scale, setScale] = useState(1.1);
  const [tx, setTx] = useState(42);
  const [valueKind, setValueKind] = useState<ValueKind>("point");
  const currentKind = useMemo(
    () => (valueKind === "point" ? "位置点" : "方向向量"),
    [valueKind],
  );

  function reset() {
    setAngle(28);
    setScale(1.1);
    setTx(42);
    setValueKind("point");
  }

  return (
    <section
      aria-label="二维与三维图形变换库专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-12-transformation-library"
      data-unit-id="cgp-12"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 TransformLibViz · matrix API
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让库的约定留下输出证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把输入从点切换成方向后，平移贡献会发生什么？矩阵数值改变时，哪些约定应该保持不变？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置图形变换库实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择变换输入类型">
          {(
            [
              ["point", "位置点 · w=1"],
              ["direction", "方向 · w=0"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={valueKind === value}
              onClick={() => setValueKind(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                valueKind === value
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>旋转角度</span>
              <span className="font-mono text-primary">{angle}°</span>
            </span>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>缩放比例</span>
              <span className="font-mono text-primary">{scale.toFixed(2)}</span>
            </span>
            <input
              type="range"
              min="0.5"
              max="1.8"
              step="0.01"
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>平移 x</span>
              <span className="font-mono text-primary">{tx}</span>
            </span>
            <input
              type="range"
              min="-80"
              max="100"
              step="1"
              value={tx}
              onChange={(event) => setTx(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <LibraryScene
            angle={angle}
            scale={scale}
            tx={valueKind === "point" ? tx : 0}
            valueKind={valueKind}
          />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前输入：{currentKind}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先核对 w
            的语义，再解释矩阵输出；如果方向被平移，优先检查齐次分量而不是改向量数值。
          </p>
        </div>
      </div>
    </section>
  );
}
