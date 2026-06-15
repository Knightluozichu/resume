/**
 * <LayerCollisionDiagram highlight="matrix|pair|ignore">：
 * Layer Collision Matrix 示意——勾选 = 可碰撞，空白 = 忽略。
 */

type Highlight = "matrix" | "pair" | "ignore";

interface Props {
  highlight?: Highlight;
}

const layers = ["Default", "Player", "Enemy", "Projectile", "Trigger"];

/** 5×5 碰撞矩阵：true = 可碰撞 */
const matrix: boolean[][] = [
  [true, true, true, true, false],
  [true, false, true, false, true],
  [true, true, false, true, false],
  [true, false, true, false, false],
  [false, true, false, false, false],
];

export function LayerCollisionDiagram({ highlight = "matrix" }: Props) {
  const cell = 44;
  const ox = 120;
  const oy = 96;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 520 370"
          role="img"
          aria-label="Unity Layer Collision Matrix 碰撞层矩阵示意"
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <text x="260" y="28" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">
            Edit → Project Settings → Physics → Layer Collision Matrix
          </text>

          {/* 列标签 — 旋转前 y 离矩阵顶 24px，旋转后底部落点约 y=oy-8，不与单元格重叠 */}
          {layers.map((name, j) => (
            <text
              key={`col-${name}`}
              x={ox + j * cell + cell / 2}
              y={oy - 24}
              textAnchor="middle"
              fontSize="9"
              fill="var(--text-secondary)"
              transform={`rotate(-35, ${ox + j * cell + cell / 2}, ${oy - 24})`}
            >
              {name}
            </text>
          ))}

          {layers.map((rowName, i) => (
            <g key={rowName}>
              <text x={ox - 8} y={oy + i * cell + cell / 2 + 4} textAnchor="end" fontSize="10" fill="var(--text-secondary)">
                {rowName}
              </text>
              {layers.map((_, j) => {
                const on = matrix[i][j];
                const isPair = highlight === "pair" && rowName === "Player" && layers[j] === "Enemy";
                const isIgnore = highlight === "ignore" && !on;
                const fill = on
                  ? isPair
                    ? "var(--accent)"
                    : highlight === "matrix"
                      ? "var(--accent)"
                      : "var(--border)"
                  : isIgnore
                    ? "var(--bg)"
                    : "var(--bg-elevated)";
                const opacity = on ? (highlight === "matrix" || isPair ? 0.65 : 0.25) : 1;
                return (
                  <g key={`${i}-${j}`}>
                    <rect
                      x={ox + j * cell}
                      y={oy + i * cell}
                      width={cell - 4}
                      height={cell - 4}
                      rx="3"
                      fill={fill}
                      opacity={opacity}
                      stroke={isPair || isIgnore ? "var(--accent)" : "var(--border)"}
                      strokeWidth={isPair || isIgnore ? 2 : 1}
                    />
                    {on && (
                      <text
                        x={ox + j * cell + (cell - 4) / 2}
                        y={oy + i * cell + (cell - 4) / 2 + 4}
                        textAnchor="middle"
                        fontSize="14"
                        fill="var(--text-primary)"
                      >
                        ✓
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          ))}

          <text x="260" y="352" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            {highlight === "matrix" && "每多一对「可碰撞」层，场景里跨层物体就可能产生接触检测"}
            {highlight === "pair" && "Player × Enemy 需要碰撞；Projectile × Projectile 可关以减少同层子弹互撞"}
            {highlight === "ignore" && "空白格 = 永不检测：敌人之间、装饰物之间常关，能砍掉大量 broadphase 对"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        矩阵是 broadphase 的第一道筛子——关掉的层组合永远不会进入窄相检测。
      </figcaption>
    </figure>
  );
}
