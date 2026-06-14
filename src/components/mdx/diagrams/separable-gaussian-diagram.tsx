/**
 * <SeparableGaussianDiagram>：「高级光照·泛光 Bloom」可分离高斯示意图（HEL-87，C 实战型）。
 *
 * 一图讲透「两遍可分离高斯」：一个 2D 高斯核可以拆成「先横一遍、再纵一遍」，结果等价、采样次数从 N² 降到 2N。
 * 左：2D N×N 核——一个像素要采它周围整片 N×N=N² 个邻居（这里 N=5，画 25 格、标 N² 次采样）。
 * 右：先 1×N 横核（一行 N 个）再 N×1 纵核（一列 N 个）——两遍各 N 次、合计 2N 次（N=5 → 10 次）。
 * 中间用「=」和说明强调两者结果等价，但右边采样次数从 25 暴降到 10（N 越大省得越狠：N=9 时 81 vs 18）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--success/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

const N = 5; // 核宽（奇数，示意）
const CELL = 15; // 每格边长
const GAP = 1.5; // 格间距

// 画一个 N×N（或 1×N / N×1）网格；highlightAll 全亮 = 都要采样，mid 标中心像素
function gridCells(
  ox: number,
  oy: number,
  cols: number,
  rows: number,
  color: string,
) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = ox + c * (CELL + GAP);
      const y = oy + r * (CELL + GAP);
      const isCenter = c === Math.floor(cols / 2) && r === Math.floor(rows / 2);
      cells.push(
        <rect
          key={`${c}-${r}`}
          x={x}
          y={y}
          width={CELL}
          height={CELL}
          rx="2"
          fill={
            isCenter ? color : `color-mix(in srgb, ${color} 35%, var(--bg))`
          }
          stroke={isCenter ? "var(--text-primary)" : "var(--border)"}
          strokeWidth={isCenter ? "1.5" : "1"}
        />,
      );
    }
  }
  return cells;
}

export function SeparableGaussianDiagram() {
  const span = N * (CELL + GAP) - GAP; // 一个 N×N 网格的边长

  // 左：2D N×N 核，左上角
  const lOx = 40;
  const lOy = 56;

  // 右：横核 + 纵核，分两小排
  const rOx = 360;
  const rHy = 50; // 横核行 y
  const rVy = 96; // 纵核行 y

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 540 200"
          role="img"
          aria-label="可分离高斯示意图。左边是一个二维 N 乘 N 的高斯核，这里 N 等于 5，一个像素要采样它周围整片 5 乘 5 共 25 个邻居，采样次数是 N 的平方。右边是把它拆成两遍可分离高斯，先做一遍 1 乘 N 的横向核采 5 个，再做一遍 N 乘 1 的纵向核采 5 个，两遍合计 2 乘 N 等于 10 次。两者模糊结果等价，但采样次数从 N 的平方降到 2 乘 N，N 越大省得越多。"
          className="mx-auto block h-auto w-full max-w-[540px]"
        >
          <text
            x="270"
            y="22"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            可分离高斯：2D N×N 核 = 先横 1×N 再纵 N×1
          </text>

          {/* ===== 左：2D N×N 核 ===== */}
          <text
            x={lOx + span / 2}
            y={lOy - 8}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            2D N×N 核
          </text>
          {gridCells(lOx, lOy, N, N, "var(--accent)")}
          <text
            x={lOx + span / 2}
            y={lOy + span + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            N² = 25 次采样 / 像素
          </text>

          {/* ===== 中间「=」与「但」 ===== */}
          <text
            x="300"
            y={lOy + span / 2 + 4}
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill="var(--success)"
          >
            =
          </text>
          <text
            x="300"
            y={lOy + span / 2 + 26}
            textAnchor="middle"
            fontSize="8.5"
            fill="var(--text-secondary)"
          >
            结果等价
          </text>

          {/* ===== 右：横核 1×N + 纵核 N×1 ===== */}
          {/* 横核（一行 N 个） */}
          <text
            x={rOx - 8}
            y={rHy + CELL / 2 + 4}
            textAnchor="end"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            ① 横 1×N
          </text>
          {gridCells(rOx, rHy, N, 1, "var(--warning)")}
          <text
            x={rOx + span + 10}
            y={rHy + CELL / 2 + 4}
            textAnchor="start"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            N 次
          </text>

          {/* 「+」 */}
          <text
            x={rOx + span / 2}
            y={rVy - 6}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            +
          </text>

          {/* 纵核（一列 N 个） */}
          <text
            x={rOx - 8}
            y={rVy + span / 2 + 4}
            textAnchor="end"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            ② 纵 N×1
          </text>
          {gridCells(rOx + (span - CELL) / 2, rVy, 1, N, "var(--warning)")}
          <text
            x={rOx + (span - CELL) / 2 + CELL + 10}
            y={rVy + span / 2 + 4}
            textAnchor="start"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            N 次
          </text>

          <text
            x={rOx + span / 2}
            y={rVy + span + 18}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            2N = 10 次采样 / 像素
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        二维高斯核可以<strong>拆成横、纵两遍一维核</strong>
        ，模糊结果完全一样，但每像素采样次数从{" "}
        <code className="text-danger">N²</code>（这里 25）降到{" "}
        <code className="text-success">2N</code>（10）—— N 越大省得越狠（
        <code>N=9</code> 时是 <code>81 vs 18</code>）。这就是泛光要做
        <strong>两遍可分离高斯</strong>而不是一遍 2D 大核的原因。
      </figcaption>
    </figure>
  );
}
