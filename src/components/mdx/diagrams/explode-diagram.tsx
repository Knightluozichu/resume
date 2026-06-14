/**
 * <ExplodeDiagram exploded={false|true} bare={false}>：「几何着色器」爆破 explode 效果同构同框图
 * （HEL-75，C 实战型）。一个由若干三角形拼成的紧凑物体，每个三角形沿自己的面法线被整体推开一段。
 *  - exploded=false：原模型，三角形紧凑拼在一起、严丝合缝。
 *  - exploded=true：每个三角形沿其面法线方向（从中心向外）平移一段 magnitude，整体「炸开」成飞溅碎片，
 *    每片旁画一根法线箭头标出推开方向。
 *
 * 两态用完全相同的三角形几何（同 viewBox、同每片的形状），只在「是否沿法线平移」上不同，
 * 保证 <CompareSlider> 擦除时同构同框、只对比「炸开 vs 没炸」本身。也用作 <Stepper> 第三步配图。
 *
 * bare：极简模式（默认 false）。供 <CompareSlider> 左右叠放擦除对比时使用——
 * 去掉 SVG 内顶部标题、底部结论与外层 figcaption，只画物体本身，viewBox 与非 bare 完全一致、保证两侧同框。
 *
 * Server Component（纯展示，静态 SVG，按 exploded prop 切两态，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

const CX = 130;
const CY = 130;

/**
 * 6 个三角形拼成一圈（菱形/六瓣），每个三角形一个顶点在中心、外侧两个顶点在外环。
 * dir 是这片三角形的「面法线方向」（从中心指向外侧、单位向量近似），exploded 时沿它平移。
 */
const PETALS = [
  { a: -90, b: -30 },
  { a: -30, b: 30 },
  { a: 30, b: 90 },
  { a: 90, b: 150 },
  { a: 150, b: 210 },
  { a: 210, b: 270 },
];

const RING = 64; // 外环半径
const PUSH = 30; // 炸开平移距离 magnitude

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + Math.cos(rad) * r, y: CY + Math.sin(rad) * r };
}

export function ExplodeDiagram({
  exploded = false,
  bare = false,
}: {
  exploded?: boolean;
  bare?: boolean;
}) {
  const aria = exploded
    ? "爆破开启状态。一个由六个三角形拼成的紧凑物体，每个三角形都沿自己的面法线方向、从中心向外被整体推开了一段，看起来像炸开的飞溅碎片，每片旁有一根箭头标出推开的法线方向。"
    : "爆破关闭状态。六个三角形紧凑地拼成一个完整物体，严丝合缝地围成一圈，没有被推开。";

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 260 260"
          role="img"
          aria-label={aria}
          className="mx-auto block h-auto w-full max-w-[260px]"
        >
          {!bare && (
            <text
              x={CX}
              y="28"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill={exploded ? "var(--accent)" : "var(--text-primary)"}
            >
              {exploded ? "炸开：各片沿法线飞溅" : "原模型：三角形紧凑拼合"}
            </text>
          )}

          {PETALS.map((p, i) => {
            const mid = (p.a + p.b) / 2; // 这片的法线朝向（指向外）
            const offX = exploded ? Math.cos((mid * Math.PI) / 180) * PUSH : 0;
            const offY = exploded ? Math.sin((mid * Math.PI) / 180) * PUSH : 0;
            const inner = { x: CX, y: CY };
            const o1 = polar(p.a, RING);
            const o2 = polar(p.b, RING);
            const pts = [inner, o1, o2]
              .map((q) => `${q.x + offX},${q.y + offY}`)
              .join(" ");
            // 法线箭头：从这片中心沿法线指向外（只在炸开时画）
            const cxp = (inner.x + o1.x + o2.x) / 3 + offX;
            const cyp = (inner.y + o1.y + o2.y) / 3 + offY;
            const nx = Math.cos((mid * Math.PI) / 180);
            const ny = Math.sin((mid * Math.PI) / 180);
            return (
              <g key={i}>
                <polygon
                  points={pts}
                  fill="var(--accent)"
                  fillOpacity={exploded ? 0.26 : 0.18 + (i % 2) * 0.1}
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {exploded && (
                  <>
                    <line
                      x1={cxp}
                      y1={cyp}
                      x2={cxp + nx * 16}
                      y2={cyp + ny * 16}
                      stroke="var(--success)"
                      strokeWidth="1.5"
                    />
                    <path
                      d={`M${cxp + nx * 16} ${cyp + ny * 16} l${-nx * 6 - ny * 3} ${-ny * 6 + nx * 3} l${-nx * 6 + ny * 3} ${-ny * 6 - nx * 3} z`}
                      fill="var(--success)"
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* 中心标记：炸开后中心空出来；原模型时被各片盖住，画个小点示意「公共顶点」 */}
          {exploded && (
            <text
              x={CX}
              y={CY + 4}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              中心空出
            </text>
          )}

          {!bare && (
            <text
              x={CX}
              y="246"
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={exploded ? "var(--accent)" : "var(--text-secondary)"}
            >
              {exploded
                ? "绿箭头 = 各片的面法线（推开方向）"
                : "严丝合缝，未被推开"}
            </text>
          )}
        </svg>
      </div>
      {!bare && (
        <figcaption className="mt-2 text-center text-xs text-secondary">
          {exploded ? (
            <>
              炸开：几何着色器把每个三角形<strong>沿它自己的面法线</strong>
              （绿箭头）整体推开一段，紧凑的物体就<strong>飞溅成碎片</strong>。
            </>
          ) : (
            <>
              原模型：六个三角形<strong>严丝合缝</strong>
              地拼成一个完整物体，还没被推开。
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
