/**
 * <SteepParallaxStepDiagram step={1|2|3|4}>：「高级光照·视差贴图」§5「陡峭视差分层步进」<Stepper> 四步配图（HEL-85，C 实战型）。
 *
 * 把「陡峭视差 Steep Parallax 怎么沿视线一层层步进、直到钻进表面以下＝命中」这件最绕的事画清楚。
 * 同一套侧视骨架：水平的几何平面（深度=0，顶面）+ 一条起伏的真实表面深度轮廓线 + 若干条水平虚线把
 * 深度分成等距的层（layer 0、1、2…）+ 一条沿视方向斜插下去的步进路径。按 step 高亮不同状态：
 *  ① 分层：把 0~1 的深度切成几层水平线，视线从顶面 A 沿视方向往深处走，每走一层横向偏移一点 UV。
 *  ② 逐层比较：每到一层，采样该处高度图得「表面深度」，与「当前层深度」比——层深度 < 表面深度＝还在表面上方，继续下探。
 *  ③ 命中：某一层的层深度首次 ≥ 该处表面深度＝视线钻到表面以下，停下，这一层对应的 UV 就是陡峭视差的采样点。
 *  ④ POM 精修：命中层与上一层之间，表面深度线穿过的真实交点落在两层之间——在这两层做线性插值，得到更平滑的命中 UV。
 *
 * 直觉落点：基础视差一步算偏移、陡处会失真；陡峭视差把深度分层、沿视线步进逼近真正的命中点；POM 再在
 * 命中层与上一层之间插值精修。层数越多越准但越慢。
 *
 * Server Component（纯展示，静态 SVG，按 step 切四态，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type SteepStep = 1 | 2 | 3 | 4;

const ARIA: Record<SteepStep, string> = {
  1: "陡峭视差分层步进第一步：分层。把表面下方 0 到 1 的深度切成几条等距的水平层线，记作第 0、1、2、3 层。视线从顶面入口点沿视线方向往深处走，每往下走一层，采样坐标就横向偏移一点。",
  2: "陡峭视差分层步进第二步：逐层比较。每走到一层，就在当前的偏移坐标处采样高度图，得到那一点的真实表面深度，再和当前所在的层深度比较。只要层深度还小于表面深度，说明视线仍在表面上方，继续往下一层步进。",
  3: "陡峭视差分层步进第三步：命中。走到某一层时，层深度第一次大于等于该处的表面深度，说明视线已经钻到真实表面以下，于是停下。这一层对应的偏移坐标，就是陡峭视差最终采样的纹理坐标。",
  4: "陡峭视差分层步进第四步：视差遮蔽映射 POM 精修。真实表面与视线的精确交点其实落在命中层和它的上一层之间，所以在这两层之间做一次线性插值，得到比整层取值更平滑、更接近真实交点的命中坐标。",
};

// 侧视骨架几何：左为入口（浅），向右下沿视方向步进（越往右越深）。
// 顶面 y=70（深度 0），底 y=250（深度 1）。四个采样台阶横坐标递增。
const TOP_Y = 70;
const BOT_Y = 250;
// 四层（layer 0..3）的 y 与对应每步横向偏移后的采样 x。
const LAYERS = [
  { d: 0, y: 70 },
  { d: 1, y: 115 },
  { d: 2, y: 160 },
  { d: 3, y: 205 },
];
// 视线沿斜方向步进时，每层对应的采样 x（横向偏移逐层累加）。
const STEP_X = [150, 232, 314, 396];
// 真实表面深度轮廓：在各采样 x 处的「表面深度对应 y」（轮廓线由浅入深再略起伏）。
// 命中发生在第 2→3 层之间：第 2 层(y=160)时表面在更深处(186)＝仍在上方；第 3 层(y=205)时表面在 178＝层已越过表面。
const SURFACE_Y = [96, 140, 186, 178];

export function SteepParallaxStepDiagram({ step }: { step: SteepStep }) {
  // 命中层：第 3 层（索引 3）首次层深度 ≥ 表面深度（205 ≥ 178）。
  const hitIdx = 3;
  // 当前步要画到第几层（①画全部层线但路径只走到入口；②走到比较中段；③④走到命中层）。
  const pathTo = step === 1 ? 0 : step === 2 ? 2 : hitIdx;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 300"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          <defs>
            <marker
              id="sp-arrow-text"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="sp-arrow-accent"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 顶面（几何平面，深度 0） */}
          <line
            x1="40"
            y1={TOP_Y}
            x2="490"
            y2={TOP_Y}
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="44"
            y={TOP_Y - 8}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            顶面（深度 0）
          </text>

          {/* 分层水平虚线 + 层号（layer 0..3） */}
          {LAYERS.map((L) => (
            <g key={L.d}>
              <line
                x1="40"
                y1={L.y}
                x2="490"
                y2={L.y}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.7"
              />
              <text
                x="496"
                y={L.y + 4}
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                层{L.d}
              </text>
            </g>
          ))}
          {/* 底（深度 1） */}
          <line
            x1="40"
            y1={BOT_Y}
            x2="490"
            y2={BOT_Y}
            stroke="var(--border)"
            strokeWidth="1"
            opacity="0.5"
          />
          <text
            x="44"
            y={BOT_Y + 16}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            深度 1
          </text>

          {/* 真实表面深度轮廓线（accent）：连各采样 x 处的表面深度 y */}
          <path
            d={`M${STEP_X[0]} ${SURFACE_Y[0]} L${STEP_X[1]} ${SURFACE_Y[1]} L${STEP_X[2]} ${SURFACE_Y[2]} L${STEP_X[3]} ${SURFACE_Y[3]} L470 196`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text x="404" y="226" fontSize="9.5" fill="var(--accent)">
            真实表面深度（高度图）
          </text>

          {/* 视线步进路径：从入口沿视方向斜插，连各层采样点（success 绿到命中前，命中段强调） */}
          <path
            d={
              "M" +
              STEP_X[0] +
              " " +
              LAYERS[0].y +
              LAYERS.slice(1, pathTo + 1)
                .map((L, i) => " L" + STEP_X[i + 1] + " " + L.y)
                .join("")
            }
            fill="none"
            stroke="var(--success)"
            strokeWidth="2.4"
            markerEnd={step === 1 ? "url(#sp-arrow-accent)" : undefined}
          />

          {/* 各层采样台阶点：已步进到的层画实心，未到的（step1）淡显 */}
          {LAYERS.map((L, i) => {
            const reached = i <= pathTo;
            const isHit = step >= 3 && i === hitIdx;
            return (
              <g key={"pt" + i}>
                <circle
                  cx={STEP_X[i]}
                  cy={L.y}
                  r={isHit ? 6 : 4}
                  fill={
                    isHit
                      ? "var(--success)"
                      : reached
                        ? "var(--text-primary)"
                        : "var(--border)"
                  }
                  stroke="var(--bg)"
                  strokeWidth="1.2"
                />
                {/* 该层处的表面深度采样点（accent 小点），step≥2 才显，提示「每层都采样高度图」 */}
                {step >= 2 && reached && (
                  <circle
                    cx={STEP_X[i]}
                    cy={SURFACE_Y[i]}
                    r="3"
                    fill="var(--accent)"
                  />
                )}
              </g>
            );
          })}

          {/* 入口标注 */}
          <text
            x={STEP_X[0] - 4}
            y={LAYERS[0].y - 8}
            textAnchor="end"
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            入口
          </text>

          {/* ===== 各步专属标注 ===== */}
          {step === 1 && (
            <>
              <text
                x="260"
                y="278"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                把深度切成几层，视线沿视方向往深处走，每下一层横向偏移一点 UV
              </text>
            </>
          )}

          {step === 2 && (
            <>
              {/* 当前比较层（层2）：层深度 vs 表面深度的竖向比较线 */}
              <line
                x1={STEP_X[2]}
                y1={LAYERS[2].y}
                x2={STEP_X[2]}
                y2={SURFACE_Y[2]}
                stroke="var(--text-secondary)"
                strokeWidth="1.3"
                strokeDasharray="3 3"
              />
              <text
                x="260"
                y="270"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                层深度 &lt; 表面深度？
              </text>
              <text
                x="260"
                y="288"
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                成立＝视线仍在表面上方 → 继续下探到下一层
              </text>
            </>
          )}

          {step === 3 && (
            <>
              {/* 命中徽标（success 绿） */}
              <rect
                x={STEP_X[hitIdx] - 70}
                y={LAYERS[hitIdx].y + 12}
                width="140"
                height="26"
                rx="13"
                fill="var(--success)"
                opacity="0.16"
                stroke="var(--success)"
                strokeWidth="1.4"
              />
              <text
                x={STEP_X[hitIdx]}
                y={LAYERS[hitIdx].y + 29}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--success)"
              >
                层深度 ≥ 表面深度 → 命中
              </text>
              <text
                x="260"
                y="288"
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                这一层对应的偏移坐标，就是陡峭视差最终的采样 UV
              </text>
            </>
          )}

          {step === 4 && (
            <>
              {/* 命中层与上一层之间的真实交点（视线与表面轮廓的精确交点，落在两层间）。
                  视线段 layer2→layer3 与 表面轮廓段 之间，取中点示意插值结果。 */}
              {(() => {
                const ix = (STEP_X[2] + STEP_X[3]) / 2;
                const iy = (LAYERS[2].y + LAYERS[3].y) / 2 - 4;
                return (
                  <>
                    {/* 上一层、命中层之间的强调区间 */}
                    <rect
                      x={STEP_X[2] - 6}
                      y={LAYERS[2].y}
                      width={STEP_X[3] - STEP_X[2] + 12}
                      height={LAYERS[3].y - LAYERS[2].y}
                      fill="var(--warning)"
                      opacity="0.1"
                    />
                    <circle
                      cx={ix}
                      cy={iy}
                      r="5"
                      fill="var(--warning)"
                      stroke="var(--bg)"
                      strokeWidth="1.4"
                    />
                    <text
                      x={ix + 10}
                      y={iy - 4}
                      fontSize="10"
                      fontWeight="600"
                      fill="var(--warning)"
                    >
                      插值后的命中点
                    </text>
                  </>
                );
              })()}
              <text
                x="260"
                y="278"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                在「命中层」与「上一层」之间线性插值
              </text>
              <text
                x="260"
                y="294"
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                逼近真实交点、比整层取值更平滑（视差遮蔽映射 POM）
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        陡峭视差把深度切成<strong>等距的层</strong>，视线沿视方向
        <strong>一层层下探</strong>：每层采样高度图比较「层深度 vs
        该处表面深度」，直到层深度首次<strong>≥</strong>表面深度＝
        <strong>命中</strong>。<strong>视差遮蔽映射 POM</strong>{" "}
        再在命中层与上一层之间<strong>线性插值</strong>，把命中点磨得更平滑。
      </figcaption>
    </figure>
  );
}
