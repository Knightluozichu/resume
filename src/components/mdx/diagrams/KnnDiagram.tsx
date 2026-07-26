/**
 * <KnnDiagram>：K 近邻 — 水果分类二维散点图。
 *
 * 展示 KNN 分类过程：
 * x 轴 = 大小，y 轴 = 甜度。
 * 橙色圆点 = 橙子，绿色圆点 = 苹果。
 * 红色 "?" 圆点 = 待分类的新水果。
 * k=3 的同心圆从 "?" 向外扩展，找到最近 3 个邻居（2 橙 1 苹果）。
 * 投票结果为橙子。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

const VIEW_W = 720;
const VIEW_H = 520;

const PLOT_X0 = 80;
const PLOT_Y0 = 30;
const PLOT_W = 560;
const PLOT_H = 360;
const PLOT_X1 = PLOT_X0 + PLOT_W;
const PLOT_Y1 = PLOT_Y0 + PLOT_H;

/** 橙子数据点 */
const ORANGES = [
  { x: 0.25, y: 0.55 },
  { x: 0.35, y: 0.40 },
  { x: 0.30, y: 0.68 },
  { x: 0.45, y: 0.50 },
  { x: 0.40, y: 0.75 },
  { x: 0.55, y: 0.35 },
  { x: 0.50, y: 0.65 },
  { x: 0.65, y: 0.45 },
  { x: 0.60, y: 0.72 },
  { x: 0.72, y: 0.55 },
];

/** 苹果数据点 */
const APPLES = [
  { x: 0.15, y: 0.20 },
  { x: 0.20, y: 0.15 },
  { x: 0.28, y: 0.12 },
  { x: 0.35, y: 0.15 },
  { x: 0.42, y: 0.08 },
  { x: 0.48, y: 0.12 },
  { x: 0.55, y: 0.05 },
  { x: 0.62, y: 0.08 },
  { x: 0.70, y: 0.10 },
  { x: 0.78, y: 0.15 },
];

/** 待分类的新水果 */
const NEW_POINT = { x: 0.42, y: 0.38 };
// 最近 3 个邻居的半径（从小到大画同心圆）
const K_RADII = [22, 40, 58];

function toPlotX(normX: number): number {
  return PLOT_X0 + normX * PLOT_W;
}
function toPlotY(normY: number): number {
  return PLOT_Y1 - normY * PLOT_H;
}

export function KnnDiagram() {
  const nx = toPlotX(NEW_POINT.x);
  const ny = toPlotY(NEW_POINT.y);

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="K 近邻水果分类散点图。坐标轴 x=大小 y=甜度。橙色圆点是橙子，绿色圆点是苹果，红色问号圆点表示待分类新水果。k=3 的同心圆从新水果向外扩展，找到最近 3 个邻居：2 个橙子、1 个苹果。投票结果为橙子。底部标注惰性学习特点：预测时才比较距离，特征尺度要归一化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 绘图区域背景 */}
          <rect x={PLOT_X0} y={PLOT_Y0} width={PLOT_W} height={PLOT_H} fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1" rx="8" />

          {/* 轴标题 */}
          <text x={PLOT_X0 + PLOT_W / 2} y={PLOT_Y1 + 36} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            大小 →
          </text>
          <text
            x={PLOT_X0 - 50}
            y={PLOT_Y0 + PLOT_H / 2}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
            transform={`rotate(-90, ${PLOT_X0 - 50}, ${PLOT_Y0 + PLOT_H / 2})`}
          >
            甜度 →
          </text>

          {/* 苹果（绿色） */}
          {APPLES.map((pt, i) => (
            <g key={`apple-${i}`}>
              <circle
                cx={toPlotX(pt.x)}
                cy={toPlotY(pt.y)}
                r={6}
                fill={"var(--success)"}
                fillOpacity="0.7"
              />
              <circle
                cx={toPlotX(pt.x)}
                cy={toPlotY(pt.y)}
                r={6}
                fill="none"
                stroke={"var(--success)"}
                strokeWidth="1"
                opacity="0.3"
              />
            </g>
          ))}

          {/* 橙子（橙色/warning） */}
          {ORANGES.map((pt, i) => (
            <g key={`orange-${i}`}>
              <circle
                cx={toPlotX(pt.x)}
                cy={toPlotY(pt.y)}
                r={7}
                fill={"var(--warning)"}
                fillOpacity="0.7"
              />
              <circle
                cx={toPlotX(pt.x)}
                cy={toPlotY(pt.y)}
                r={7}
                fill="none"
                stroke={"var(--warning)"}
                strokeWidth="1"
                opacity="0.3"
              />
            </g>
          ))}

          {/* k=3 同心圆（从新点向外） */}
          <circle
            cx={nx}
            cy={ny}
            r={K_RADII[0]}
            fill="none"
            stroke={"var(--danger)"}
            strokeWidth="1.5"
            strokeDasharray="3 2"
            opacity="0.6"
          />
          <circle
            cx={nx}
            cy={ny}
            r={K_RADII[1]}
            fill="none"
            stroke={"var(--danger)"}
            strokeWidth="1.5"
            strokeDasharray="3 2"
            opacity="0.45"
          />
          <circle
            cx={nx}
            cy={ny}
            r={K_RADII[2]}
            fill="none"
            stroke={"var(--danger)"}
            strokeWidth="1.5"
            strokeDasharray="3 2"
            opacity="0.3"
          />

          {/* 新水果 "?" */}
          <circle cx={nx} cy={ny} r={10} fill={"var(--danger)"} fillOpacity="0.85" />
          <text x={nx} y={ny + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--bg)"}>
            ?
          </text>

          {/* k=3 标签 */}
          <text x={nx + 64} y={ny - 14} fontSize="11" fill={"var(--danger)"} fontWeight="600">
            k = 3
          </text>

          {/* 图例 */}
          <g transform={`translate(${PLOT_X0 + PLOT_W - 120}, ${PLOT_Y0 + 10})`}>
            <circle cx={8} cy={6} r="6" fill={"var(--warning)"} fillOpacity="0.7" />
            <text x={20} y={10} fontSize="11" fill="var(--text-secondary)">橙子</text>
            <circle cx={72} cy={6} r="6" fill={"var(--success)"} fillOpacity="0.7" />
            <text x={84} y={10} fontSize="11" fill="var(--text-secondary)">苹果</text>
          </g>

          {/* 投票结果区 */}
          <rect x={PLOT_X0} y={PLOT_Y1 + 50} width={PLOT_W} height={44} rx="8" fill={"var(--bg)"} stroke={"var(--border)"} strokeWidth="1" />
          <text x={PLOT_X0 + PLOT_W / 2} y={PLOT_Y1 + 64} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            最近 3 个邻居中：2 个橙子 + 1 个苹果 →
          </text>
          <text x={PLOT_X0 + PLOT_W / 2} y={PLOT_Y1 + 82} textAnchor="middle" fontSize="14" fontWeight="700" fill={"var(--warning)"}>
            投票结果：分类为「橙子」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        惰性学习：预测时才比较距离，特征尺度要归一化
      </figcaption>
    </figure>
  );
}
