/**
 * <AliasingDiagram aa={false|true}>：「抗锯齿」锯齿 vs 抗锯齿 同构同框对比图
 * （HEL-77，A 概念型，高级 OpenGL 篇收官）。屏幕是一张方格纸，一条斜边落在方格上：
 *  - aa=false（抗锯齿关）：每个方格只能「整格涂」或「整格不涂」——采样点落在斜边内的格子全涂、
 *    落在外的全不涂，于是斜边被画成一级一级的硬阶梯（锯齿）。
 *  - aa=true（抗锯齿开）：边缘那一圈格子按「被斜边盖住多少」涂上半深的过渡灰，远看就把阶梯
 *    抹顺滑了（平滑边）。
 *
 * 两态用完全相同的方格网 + 完全相同的那条斜边（同 viewBox、同几何），只在「边缘格子是整涂还是
 * 带过渡灰」上不同，保证 <CompareSlider> 擦除时同构同框、只对比抗锯齿这一项本身。
 *
 * Server Component（纯展示，静态 SVG，按 aa prop 切两态，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

// 网格参数：8×8 方格，每格 26px，左上角起点 (18,42)。
const N = 8;
const CELL = 26;
const X0 = 18;
const Y0 = 44;

// 斜边：从左下方一路斜向右上方的一条直线，y = SLOPE_K * x + SLOPE_B（SVG 坐标，y 向下）。
// 取两端点（格坐标）连成线，下方为「图元内」、上方为「图元外」。
const P0 = { gx: 0, gy: 7.6 };
const P1 = { gx: 8, gy: 1.4 };

function gx(gxv: number): number {
  return X0 + gxv * CELL;
}
function gy(gyv: number): number {
  return Y0 + gyv * CELL;
}

// 斜边在某个格 x 中心处的 gy 值（线性插值），用来判断格中心在斜边上方还是下方。
function edgeGyAt(gxCenter: number): number {
  const t = (gxCenter - P0.gx) / (P1.gx - P0.gx);
  return P0.gy + t * (P1.gy - P0.gy);
}

// 估算第 (col,row) 格被斜边下方区域（图元内）覆盖的比例 0..1，用于抗锯齿档涂过渡灰。
// 用格中心到斜边的有符号距离做一个平滑过渡（center 在斜边下方 = 内、覆盖多）。
function coverageOf(col: number, row: number): number {
  const cxCenter = col + 0.5;
  const cyCenter = row + 0.5;
  const edge = edgeGyAt(cxCenter);
  // d>0：格中心在斜边下方（图元内一侧）。除以格高做归一，clamp 成 0..1。
  const d = (cyCenter - edge) / 1.0;
  return Math.min(1, Math.max(0, d + 0.5));
}

export function AliasingDiagram({
  aa = false,
  bare = false,
}: {
  aa?: boolean;
  /**
   * bare：极简模式（默认 false）。供 <CompareSlider> 左右叠放擦除对比时使用——
   * 去掉 SVG 内顶部标题、底部一句话结论与外层 figcaption，只画方格网 + 斜边 + 涂色，
   * 避免两侧标题/图注重叠成乱码。viewBox 与非 bare 时一致，保证两侧同框；aria-label 保留。
   */
  bare?: boolean;
}) {
  const aria = aa
    ? "抗锯齿开启示意。屏幕是一张方格纸，一条斜边落在方格上。边缘那一圈格子按斜边盖住的多少涂上深浅不一的过渡灰，远看就把阶梯抹顺滑了，边缘平滑。"
    : "抗锯齿关闭示意。屏幕是一张方格纸，一条斜边落在方格上。每个格子只能整格涂或整格不涂，于是斜边被画成一级一级的硬阶梯，边缘呈锯齿状。";

  // 逐格决定填充：图元内（格中心在斜边下方）整涂 accent；边缘格在 aa 档涂过渡灰。
  const cells: React.ReactNode[] = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      const cov = coverageOf(col, row);
      const inside = cov >= 0.5; // 采样点（格中心）落在图元内
      const isEdge = cov > 0.08 && cov < 0.92; // 边缘格（斜边横穿）
      let fillOpacity = 0;
      if (aa) {
        // 抗锯齿档：覆盖比例直接当不透明度，边缘格得到半深过渡灰。
        fillOpacity = cov;
      } else {
        // 锯齿档：整格涂或整格不涂，只看格中心采样点。
        fillOpacity = inside ? 1 : 0;
      }
      if (fillOpacity <= 0.02) continue;
      cells.push(
        <rect
          key={`${col}-${row}`}
          x={gx(col)}
          y={gy(row)}
          width={CELL}
          height={CELL}
          fill="var(--accent)"
          fillOpacity={fillOpacity * 0.85}
          stroke={!aa && isEdge ? "var(--danger)" : "none"}
          strokeWidth={!aa && isEdge ? 1 : 0}
        />,
      );
    }
  }

  // 网格线
  const grid: React.ReactNode[] = [];
  for (let i = 0; i <= N; i++) {
    grid.push(
      <line
        key={`v${i}`}
        x1={gx(i)}
        y1={gy(0)}
        x2={gx(i)}
        y2={gy(N)}
        stroke="var(--border)"
        strokeWidth="1"
      />,
      <line
        key={`h${i}`}
        x1={gx(0)}
        y1={gy(i)}
        x2={gx(N)}
        y2={gy(i)}
        stroke="var(--border)"
        strokeWidth="1"
      />,
    );
  }

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 264 264"
          role="img"
          aria-label={aria}
          className="mx-auto block h-auto w-full max-w-[264px]"
        >
          {!bare && (
            <text
              x="132"
              y="26"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill={aa ? "var(--success)" : "var(--danger)"}
            >
              {aa ? "抗锯齿开：边缘平滑" : "抗锯齿关：边缘锯齿"}
            </text>
          )}

          {/* 涂色格（图元内 + 抗锯齿过渡） */}
          {cells}

          {/* 方格网 */}
          {grid}

          {/* 那条理想斜边（两态都画一条参考虚线，看清「该长什么样」） */}
          <line
            x1={gx(P0.gx)}
            y1={gy(P0.gy)}
            x2={gx(P1.gx)}
            y2={gy(P1.gy)}
            stroke="var(--text-primary)"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />

          {!bare && (
            <text
              x="132"
              y="258"
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              {aa
                ? "边缘格涂半深过渡灰 · 远看顺滑"
                : "整格涂或不涂 · 斜边成阶梯"}
            </text>
          )}
        </svg>
      </div>
      {!bare && (
        <figcaption className="mt-2 text-center text-xs text-secondary">
          {aa ? (
            <>
              抗锯齿<strong>开</strong>：边缘那圈格子按斜边
              <strong>盖住多少涂过渡灰</strong>，远看阶梯被抹顺滑、边缘平滑。
            </>
          ) : (
            <>
              抗锯齿<strong>关</strong>
              ：每格只能整涂或整不涂，斜边被画成一级级的
              <strong>硬阶梯（锯齿）</strong>。虚线是它本该有的样子。
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
