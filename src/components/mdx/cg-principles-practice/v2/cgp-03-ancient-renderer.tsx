"use client";

import { useState } from "react";

type View = "frame" | "visibility" | "clipping";

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

function SvgFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
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

export function Cgp03PerspectiveFrameDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="Dürer 透视框：眼睛、透明画框和物体上的视线相交">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            Dürer frame：把视线落在一张透明画框上
          </text>
          <line
            x1="110"
            y1="205"
            x2="610"
            y2="205"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <rect
            x="292"
            y="78"
            width="170"
            height="215"
            fill={COLORS.accent}
            fillOpacity="0.08"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <text
            x="377"
            y="312"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.accent}
          >
            透明画框（image plane）
          </text>
          <circle cx="132" cy="184" r="12" fill={COLORS.success} />
          <text
            x="132"
            y="155"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.success}
          >
            eye
          </text>
          <polygon
            points="548,238 624,238 586,142"
            fill={COLORS.warning}
            fillOpacity="0.18"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <text
            x="586"
            y="265"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.text}
          >
            物体
          </text>
          <line
            x1="132"
            y1="184"
            x2="377"
            y2="116"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <line
            x1="132"
            y1="184"
            x2="377"
            y2="245"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <line
            x1="132"
            y1="184"
            x2="586"
            y2="142"
            stroke={COLORS.warning}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <line
            x1="132"
            y1="184"
            x2="586"
            y2="238"
            stroke={COLORS.warning}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <text x="190" y="120" fontSize="13" fill={COLORS.secondary}>
            视线与画框的交点 = 像素位置
          </text>
          <text
            x="560"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            scene
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        现代实现把“视线穿过画框”的几何关系写成投影函数；画框仍是稳定的 image
        plane。
      </figcaption>
    </figure>
  );
}

export function Cgp03VisibilityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="可见性判定：近处三角形挡住远处三角形">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            visibility：同一像素只保留更近的候选
          </text>
          <rect
            x="80"
            y="72"
            width="560"
            height="218"
            rx="12"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <polygon
            points="170,238 330,92 430,238"
            fill={COLORS.warning}
            fillOpacity="0.17"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <polygon
            points="300,244 470,120 570,244"
            fill={COLORS.accent}
            fillOpacity="0.22"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <line
            x1="365"
            y1="185"
            x2="365"
            y2="218"
            stroke={COLORS.success}
            strokeWidth="4"
          />
          <circle cx="365" cy="218" r="7" fill={COLORS.success} />
          <text x="150" y="112" fontSize="13" fill={COLORS.warning}>
            farther candidate
          </text>
          <text
            x="468"
            y="108"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.accent}
          >
            nearer candidate
          </text>
          <text
            x="365"
            y="275"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.success}
          >
            只写入 nearer candidate
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先求交点，再按深度保留候选；“能投到画面”不等于“最后可见”。
      </figcaption>
    </figure>
  );
}

export function Cgp03ClippingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="裁剪门：视锥外的几何被移除，边界内的部分继续光栅化">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            clipping：先挡掉画面外的几何
          </text>
          <rect
            x="72"
            y="74"
            width="240"
            height="208"
            rx="12"
            fill={COLORS.danger}
            fillOpacity="0.06"
            stroke={COLORS.danger}
            strokeWidth="2"
            strokeDasharray="8 6"
          />
          <text
            x="192"
            y="102"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.danger}
          >
            before
          </text>
          <polygon
            points="42,250 180,92 350,260"
            fill={COLORS.danger}
            fillOpacity="0.15"
            stroke={COLORS.danger}
            strokeWidth="3"
          />
          <line
            x1="348"
            y1="178"
            x2="405"
            y2="178"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="398,166 420,178 398,190" fill={COLORS.accent} />
          <rect
            x="432"
            y="74"
            width="216"
            height="208"
            rx="12"
            fill={COLORS.success}
            fillOpacity="0.06"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <text
            x="540"
            y="102"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.success}
          >
            after
          </text>
          <polygon
            points="438,250 540,126 642,250"
            fill={COLORS.success}
            fillOpacity="0.16"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text
            x="192"
            y="306"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            视锥外部分被丢弃
          </text>
          <text
            x="540"
            y="306"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            边界内部分继续处理
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        裁剪是可见性链路的成本控制点：它减少后续片段工作，但不能替代深度判定。
      </figcaption>
    </figure>
  );
}

const VIEWS: Array<{ id: View; label: string; detail: string }> = [
  {
    id: "frame",
    label: "透视框",
    detail: "从眼睛到物体的射线与 image plane 相交，交点成为画面位置。",
  },
  {
    id: "visibility",
    label: "可见性",
    detail: "多个候选落在同一像素时，用深度保留更近者，远处候选不再覆盖它。",
  },
  {
    id: "clipping",
    label: "裁剪门",
    detail: "先剔除视锥外部分，让剩余几何进入光栅化和深度测试。",
  },
];

export function Cgp03AncientRendererLab() {
  const [view, setView] = useState<View>("frame");
  const current = VIEWS.find((item) => item.id === view) ?? VIEWS[0];

  function reset() {
    setView("frame");
  }

  return (
    <section
      aria-label="古老渲染器现代化实验：透视、可见性与裁剪"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-03-ancient-renderer"
      data-unit-id="cgp-03"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · ancient renderer
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            一条视线怎样变成一个可见像素
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：只把物体投到画框上，为什么仍可能看见错误的表面？切换三种观察视角，找出缺失的判定。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置古老渲染器实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择古老渲染器观察视角"
        >
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
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          {view === "frame" ? (
            <Cgp03PerspectiveFrameDiagram />
          ) : view === "visibility" ? (
            <Cgp03VisibilityDiagram />
          ) : (
            <Cgp03ClippingDiagram />
          )}
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
