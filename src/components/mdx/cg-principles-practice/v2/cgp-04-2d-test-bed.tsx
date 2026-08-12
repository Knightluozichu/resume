"use client";

import { useState, type ReactNode } from "react";

type View = "grid" | "corner" | "transform";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
};

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

function Grid({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <g>
      {Array.from({ length: 7 }, (_, index) => (
        <line
          key={`grid-v-${x}-${index}`}
          x1={x + (width / 6) * index}
          y1={y}
          x2={x + (width / 6) * index}
          y2={y + height}
          stroke={COLORS.border}
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 7 }, (_, index) => (
        <line
          key={`grid-h-${y}-${index}`}
          x1={x}
          y1={y + (height / 6) * index}
          x2={x + width}
          y2={y + (height / 6) * index}
          stroke={COLORS.border}
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

export function Cgp04GridDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="二维图形测试平台：统一网格、坐标轴、视口和可重复输入">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            2d graphics test bed：让每次实验都有同一张网格
          </text>
          <rect
            x="78"
            y="70"
            width="380"
            height="228"
            rx="12"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <Grid x={96} y={88} width={344} height={192} />
          <line
            x1="268"
            y1="88"
            x2="268"
            y2="280"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <line
            x1="96"
            y1="184"
            x2="440"
            y2="184"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <polygon
            points="338,118 402,152 378,236 312,202"
            fill={COLORS.accent}
            fillOpacity="0.18"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <circle cx="268" cy="184" r="5" fill={COLORS.success} />
          <text
            x="268"
            y="322"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            固定输入：坐标、变换、视口边界
          </text>
          <text
            x="500"
            y="104"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            test bed
          </text>
          <text x="500" y="140" fontSize="13" fill={COLORS.secondary}>
            同一网格
          </text>
          <text x="500" y="170" fontSize="13" fill={COLORS.secondary}>
            同一坐标原点
          </text>
          <text x="500" y="200" fontSize="13" fill={COLORS.secondary}>
            同一输出尺寸
          </text>
          <text x="500" y="250" fontSize="13" fill={COLORS.success}>
            只改变一个变量
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试平台不是一张漂亮截图，而是能让输入、变换和输出逐次对照的实验边界。
      </figcaption>
    </figure>
  );
}

export function Cgp04CornerCuttingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="corner cutting：正方形沿角点截断后变成八边形">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            corner cutting：改变角点，仍要保持边界顺序
          </text>
          <polygon
            points="102,112 224,72 336,112 376,230 254,274 142,234"
            fill={COLORS.warning}
            fillOpacity="0.12"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <text
            x="236"
            y="314"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            原始多边形：角点顺序决定边的连接
          </text>
          <line
            x1="390"
            y1="178"
            x2="438"
            y2="178"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="432,166 454,178 432,190" fill={COLORS.accent} />
          <polygon
            points="514,112 610,112 638,148 638,232 610,268 514,268 486,232 486,148"
            fill={COLORS.success}
            fillOpacity="0.14"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <circle cx="514" cy="112" r="5" fill={COLORS.success} />
          <circle cx="610" cy="112" r="5" fill={COLORS.success} />
          <circle cx="638" cy="148" r="5" fill={COLORS.success} />
          <circle cx="638" cy="232" r="5" fill={COLORS.success} />
          <circle cx="610" cy="268" r="5" fill={COLORS.success} />
          <circle cx="514" cy="268" r="5" fill={COLORS.success} />
          <circle cx="486" cy="232" r="5" fill={COLORS.success} />
          <circle cx="486" cy="148" r="5" fill={COLORS.success} />
          <text
            x="562"
            y="314"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            截角后：新点仍按顺序环绕
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切角的关键不是“少画几个点”，而是沿边生成新点并保留一致的绕行方向。
      </figcaption>
    </figure>
  );
}

export function Cgp04TransformDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="二维变换：原始三角形经过旋转、缩放和平移后进入视口">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            2d transformation：同一组点经过可追踪的变换链
          </text>
          <rect
            x="62"
            y="72"
            width="250"
            height="210"
            rx="12"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="187"
            y1="92"
            x2="187"
            y2="262"
            stroke={COLORS.border}
            strokeWidth="1"
          />
          <line
            x1="82"
            y1="177"
            x2="292"
            y2="177"
            stroke={COLORS.border}
            strokeWidth="1"
          />
          <polygon
            points="120,220 182,112 258,220"
            fill={COLORS.warning}
            fillOpacity="0.16"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <text
            x="187"
            y="312"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            local coordinates
          </text>
          <line
            x1="340"
            y1="178"
            x2="390"
            y2="178"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="384,166 406,178 384,190" fill={COLORS.accent} />
          <rect
            x="410"
            y="72"
            width="250"
            height="210"
            rx="12"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <line
            x1="535"
            y1="92"
            x2="535"
            y2="262"
            stroke={COLORS.border}
            strokeWidth="1"
          />
          <line
            x1="430"
            y1="177"
            x2="640"
            y2="177"
            stroke={COLORS.border}
            strokeWidth="1"
          />
          <polygon
            points="468,232 560,108 628,214"
            fill={COLORS.success}
            fillOpacity="0.16"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text
            x="535"
            y="312"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            viewport coordinates
          </text>
          <text
            x="360"
            y="56"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            R → S → T：每一步都可记录
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        变换测试的验收对象是点集的对应关系，不只是最后的轮廓是否“看起来对”。
      </figcaption>
    </figure>
  );
}

const VIEWS: Array<{ id: View; label: string; detail: string }> = [
  {
    id: "grid",
    label: "固定网格",
    detail: "用同一坐标原点、网格和视口记录每次实验，先排除输入漂移。",
  },
  {
    id: "corner",
    label: "切角测试",
    detail: "沿边生成新点，检查角点顺序、绕行方向和闭合边界是否保持。",
  },
  {
    id: "transform",
    label: "变换链",
    detail:
      "分别改变旋转、缩放和平移，比较 local coordinates 与 viewport coordinates。",
  },
];

function TransformScene({ angle, cut }: { angle: number; cut: number }) {
  const radians = (angle * Math.PI) / 180;
  const center = { x: 538, y: 182 };
  const points = [
    { x: -76, y: 54 },
    { x: 4, y: -82 },
    { x: 82, y: 54 },
  ];
  const transformed = points.map((point) => ({
    x: center.x + point.x * Math.cos(radians) - point.y * Math.sin(radians),
    y: center.y + point.x * Math.sin(radians) + point.y * Math.cos(radians),
  }));
  const cutSize = Math.max(12, Math.min(72, cut));

  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live 2d transformation：旋转与切角同时可追踪
      </text>
      <rect
        x="32"
        y="70"
        width="300"
        height="224"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <Grid x={50} y={88} width={264} height={188} />
      <polygon
        points="112,244 188,102 264,244"
        fill={COLORS.warning}
        fillOpacity="0.15"
        stroke={COLORS.warning}
        strokeWidth="3"
      />
      <text
        x="182"
        y="322"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        原始三角形
      </text>
      <line
        x1="348"
        y1="182"
        x2="402"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <polygon points="396,170 418,182 396,194" fill={COLORS.accent} />
      <rect
        x="432"
        y="70"
        width="296"
        height="224"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <Grid x={450} y={88} width={260} height={188} />
      <polygon
        points={transformed.map((point) => `${point.x},${point.y}`).join(" ")}
        fill={COLORS.success}
        fillOpacity="0.16"
        stroke={COLORS.success}
        strokeWidth="3"
      />
      <line
        x1="538"
        y1="88"
        x2="538"
        y2="276"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <line
        x1="450"
        y1="182"
        x2="710"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="580"
        y="322"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        angle {angle}° · cut {cutSize}
      </text>
    </g>
  );
}

export function Cgp04TwoDGraphicsTestBedLab() {
  const [view, setView] = useState<View>("grid");
  const [angle, setAngle] = useState(24);
  const [cut, setCut] = useState(36);
  const current = VIEWS.find((item) => item.id === view) ?? VIEWS[0];

  function reset() {
    setView("grid");
    setAngle(24);
    setCut(36);
  }

  return (
    <section
      aria-label="二维图形测试平台专属实验：网格、切角与二维变换"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-04-2d-graphics-test-bed"
      data-unit-id="cgp-04"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · 2d graphics test bed
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把二维变换变成可重复的测试
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：只改变切角大小，哪些点应该移动，哪些边界契约必须保持不变？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置二维图形测试平台实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择二维图形测试视角">
          {VIEWS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={view === item.id}
              onClick={() => setView(item.id)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                view === item.id
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>旋转角度</span>
              <span className="font-mono text-primary">{angle}°</span>
            </span>
            <input
              type="range"
              min={-90}
              max={90}
              step={1}
              value={angle}
              onChange={(event) => setAngle(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>切角大小</span>
              <span className="font-mono text-primary">{cut}</span>
            </span>
            <input
              type="range"
              min={12}
              max={72}
              step={2}
              value={cut}
              onChange={(event) => setCut(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox="0 0 760 360"
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <rect width="760" height="360" rx="12" fill="var(--bg)" />
            {view === "grid" ? (
              <GridScene />
            ) : view === "corner" ? (
              <CornerScene cut={cut} />
            ) : (
              <TransformScene angle={angle} cut={cut} />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
      </div>
    </section>
  );
}

function GridScene() {
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        test bed：先冻结输入，再观察输出
      </text>
      <rect
        x="32"
        y="70"
        width="410"
        height="224"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <Grid x={52} y={88} width={370} height={188} />
      <line
        x1="237"
        y1="88"
        x2="237"
        y2="276"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <line
        x1="52"
        y1="182"
        x2="422"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <circle cx="237" cy="182" r="6" fill={COLORS.success} />
      <polygon
        points="174,232 237,104 302,232"
        fill={COLORS.accent}
        fillOpacity="0.16"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text
        x="238"
        y="322"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        origin + grid + viewport
      </text>
      <text x="488" y="110" fontSize="14" fontWeight="700" fill={COLORS.text}>
        固定三件事
      </text>
      <text x="488" y="150" fontSize="13" fill={COLORS.secondary}>
        输入点集
      </text>
      <text x="488" y="180" fontSize="13" fill={COLORS.secondary}>
        变换参数
      </text>
      <text x="488" y="210" fontSize="13" fill={COLORS.secondary}>
        视口边界
      </text>
      <text x="488" y="264" fontSize="13" fill={COLORS.success}>
        输出差异才有意义
      </text>
    </g>
  );
}

function CornerScene({ cut }: { cut: number }) {
  const amount = Math.max(14, Math.min(66, cut));
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        corner cutting：切角大小改变，但边界顺序不变
      </text>
      <rect
        x="32"
        y="70"
        width="300"
        height="224"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <polygon
        points="98,116 268,116 268,246 98,246"
        fill={COLORS.warning}
        fillOpacity="0.12"
        stroke={COLORS.warning}
        strokeWidth="3"
      />
      <text
        x="183"
        y="322"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        before：四个角点
      </text>
      <line
        x1="352"
        y1="182"
        x2="408"
        y2="182"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <polygon points="402,170 424,182 402,194" fill={COLORS.accent} />
      <rect
        x="444"
        y="70"
        width="284"
        height="224"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <polygon
        points={`${500 + amount},116 650,116 650,246 ${500 + amount},246 500,${246 - amount} 500,${116 + amount}`}
        fill={COLORS.success}
        fillOpacity="0.15"
        stroke={COLORS.success}
        strokeWidth="3"
      />
      <text
        x="586"
        y="322"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        after：切角 {amount}，仍闭合
      </text>
    </g>
  );
}
