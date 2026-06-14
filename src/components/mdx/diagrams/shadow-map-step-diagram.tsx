/**
 * <ShadowMapStepDiagram step={1|2|3|4}>：「阴影映射」§5「两遍法」<Stepper> 四步配图（HEL-82，C 实战型）。
 *
 * 同一套「光源 + 视锥 + 场景（地面 + 遮挡墙 + 受光点）+ 一张深度图缩略」骨架，按 step 演示
 * shadow mapping 的两遍流程，每一步都把「当前在算什么、深度图里存了什么」画出来：
 *  ①第一遍·渲深度图：站在光源视角看场景，沿光的每条方向射线记下「最近遮挡物的距离」，
 *    写进一张深度图（shadow map）。画光源 + 视锥 + 场景 + 右侧深度图缩略（近处遮挡 = 小深度）。
 *  ②存下这张深度图：第一遍结束，深度图存好备用——它记着「从光源看，每个方向最近的遮挡距离」。
 *  ③第二遍·算光空间深度：从相机渲场景，对每个片元用光的 view×proj 把它变到光空间，
 *    取出它在光眼里的深度（currentDepth）。画一个被算的片元 + 它到光源的连线。
 *  ④深度比较判阴影：拿片元的 currentDepth 和深度图里存的 closestDepth 比——
 *    被挡点 current > closest（前面有东西挡着）⇒ 在阴影；受光点 current ≈ closest ⇒ 受光。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type ShadowMapStep = 1 | 2 | 3 | 4;

const ARIA: Record<ShadowMapStep, string> = {
  1: "阴影映射两遍法第一步，第一遍从光源视角渲染深度图。站在光源的位置朝场景看，沿光的每一条方向射线，记下这条方向上离光源最近的遮挡物有多远，把这个最近距离写进一张深度图，也就是 shadow map。图里画出光源、它的视锥、地面上立着的一堵遮挡墙，以及右侧那张刚渲好的深度图缩略图，越近的遮挡存的深度越小。",
  2: "阴影映射两遍法第二步，存下这张深度图。第一遍结束，深度图已经存好备用。它记录的是从光源视角看过去，每个方向上最近的遮挡距离，后面第二遍要拿它来判断每个片元是否被挡住。",
  3: "阴影映射两遍法第三步，第二遍从相机渲染、算每个片元在光空间的深度。改从相机视角渲染整个场景，对画面上每一个片元，用光源的观察矩阵乘投影矩阵把它的位置变换到光的裁剪空间，取出它在光眼里的深度，叫做当前深度。图里画出一个正在被处理的片元，以及它和光源之间的连线。",
  4: "阴影映射两遍法第四步，深度比较判断阴影。把片元的当前深度，和深度图里这个方向存的最近深度做比较。如果当前深度大于存的最近深度，说明在这个片元前面还有别的东西先挡住了光，于是这个片元在阴影里，用红色标出。如果两者基本相等，说明这个片元自己就是最近的、直接被光照到，受光，用绿色标出。",
};

export function ShadowMapStepDiagram({ step }: { step: ShadowMapStep }) {
  const lightActive = step <= 2; // ①② 光源视角主导
  const camActive = step >= 3; // ③④ 相机视角主导
  const mapReady = step >= 1; // 深度图：第一遍起就有内容
  const showCompare = step === 4; // 第四步：被挡点 vs 受光点对比

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* ===== 光源（左上） ===== */}
          <circle
            cx="70"
            cy="56"
            r="13"
            fill={lightActive ? "var(--warning)" : "var(--bg-elevated)"}
            stroke={lightActive ? "var(--warning)" : "var(--border)"}
            strokeWidth="1.5"
            opacity={lightActive ? "0.9" : "0.55"}
          />
          {/* 光线小芒 */}
          <g
            stroke={lightActive ? "var(--warning)" : "var(--border)"}
            strokeWidth="1.5"
            opacity={lightActive ? "0.9" : "0.45"}
          >
            <line x1="70" y1="36" x2="70" y2="29" />
            <line x1="50" y1="56" x2="43" y2="56" />
            <line x1="55" y1="41" x2="50" y2="36" />
            <line x1="85" y1="41" x2="90" y2="36" />
          </g>
          <text
            x="70"
            y="88"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={lightActive ? "var(--warning)" : "var(--text-secondary)"}
          >
            光源
          </text>

          {/* 光源视锥（从光源张开看向场景） */}
          <path
            d="M70 56 L250 150 L250 250 L70 56 Z"
            fill={lightActive ? "var(--warning)" : "var(--border)"}
            opacity={lightActive ? "0.1" : "0.05"}
            stroke={lightActive ? "var(--warning)" : "var(--border)"}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* ===== 地面 ===== */}
          <line
            x1="60"
            y1="250"
            x2="300"
            y2="250"
            stroke="var(--text-secondary)"
            strokeWidth="2"
          />
          <text
            x="290"
            y="266"
            textAnchor="end"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            地面（受光面）
          </text>

          {/* ===== 遮挡墙（场景里挡光的东西） ===== */}
          <rect
            x="150"
            y="150"
            width="22"
            height="100"
            rx="2"
            fill="var(--accent)"
            opacity="0.7"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="161"
            y="142"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-primary)"
          >
            遮挡物
          </text>

          {/* 光线打到遮挡墙顶（第一遍：记下最近距离） */}
          {lightActive && (
            <>
              <line
                x1="70"
                y1="56"
                x2="150"
                y2="150"
                stroke="var(--warning)"
                strokeWidth="1.5"
                markerEnd="url(#sm-arrow-w)"
              />
              {step === 1 && (
                <text
                  x="98"
                  y="96"
                  textAnchor="middle"
                  fontSize="8"
                  fill="var(--warning)"
                >
                  最近遮挡
                </text>
              )}
            </>
          )}

          {/* 墙在地面投下的影子区（被挡处） */}
          <rect
            x="150"
            y="246"
            width="78"
            height="8"
            rx="2"
            fill="var(--danger)"
            opacity={showCompare ? "0.45" : "0.22"}
          />

          {/* ===== 第二遍：相机 + 被处理片元 ===== */}
          {camActive && (
            <>
              {/* 相机（右下） */}
              <g opacity="0.95">
                <rect
                  x="296"
                  y="196"
                  width="26"
                  height="18"
                  rx="3"
                  fill="var(--bg-elevated)"
                  stroke="var(--success)"
                  strokeWidth="1.5"
                />
                <path
                  d="M322 200 l10 -5 l0 18 l-10 -5 z"
                  fill="var(--bg-elevated)"
                  stroke="var(--success)"
                  strokeWidth="1.5"
                />
              </g>
              <text
                x="313"
                y="230"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--success)"
              >
                相机
              </text>

              {/* 被处理的片元（地面上的影子区里一个点） */}
              <circle
                cx="196"
                cy="250"
                r="5"
                fill="var(--danger)"
                stroke="var(--text-primary)"
                strokeWidth="1"
              />
              {/* 片元到光源的连线（算它在光空间的深度 = currentDepth） */}
              <line
                x1="70"
                y1="56"
                x2="196"
                y2="250"
                stroke="var(--text-secondary)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              {step === 3 && (
                <text
                  x="150"
                  y="170"
                  textAnchor="middle"
                  fontSize="8"
                  fill="var(--text-secondary)"
                >
                  算它的光空间深度
                </text>
              )}
            </>
          )}

          {/* ===== 右侧：深度图缩略（shadow map） ===== */}
          <text
            x="450"
            y="44"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={mapReady ? "var(--warning)" : "var(--text-secondary)"}
          >
            深度图（shadow map）
          </text>
          <rect
            x="400"
            y="52"
            width="100"
            height="100"
            rx="6"
            fill="var(--bg)"
            stroke={step === 2 || camActive ? "var(--accent)" : "var(--border)"}
            strokeWidth={step === 2 ? "2.5" : "1.5"}
          />
          {/* 深度图内容：近处遮挡=亮（小深度），远处地面=暗（大深度） */}
          {mapReady && (
            <>
              <rect
                x="404"
                y="56"
                width="92"
                height="92"
                rx="4"
                fill="var(--text-secondary)"
                opacity="0.28"
              />
              {/* 遮挡墙在深度图里：一道近距离（亮）的条带 */}
              <rect
                x="438"
                y="56"
                width="24"
                height="92"
                rx="2"
                fill="var(--warning)"
                opacity="0.8"
              />
              <text
                x="450"
                y="172"
                textAnchor="middle"
                fontSize="8"
                fill="var(--text-secondary)"
              >
                每方向「最近遮挡距离」
              </text>
              <text
                x="450"
                y="184"
                textAnchor="middle"
                fontSize="8"
                fill="var(--text-secondary)"
              >
                亮 = 近，暗 = 远
              </text>
            </>
          )}

          {/* 第一遍：场景 → 深度图 的写入箭头 */}
          {step === 1 && (
            <>
              <line
                x1="300"
                y1="100"
                x2="396"
                y2="100"
                stroke="var(--warning)"
                strokeWidth="1.5"
                markerEnd="url(#sm-arrow-w)"
              />
              <text
                x="348"
                y="92"
                textAnchor="middle"
                fontSize="8"
                fill="var(--warning)"
              >
                渲进深度图
              </text>
            </>
          )}
          {/* 第三步：从深度图取出该方向存的最近深度 */}
          {camActive && (
            <line
              x1="396"
              y1="120"
              x2="232"
              y2="200"
              stroke="var(--accent)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.7"
            />
          )}

          <defs>
            <marker
              id="sm-arrow-w"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>

          {/* ===== 底部：本步状态 ===== */}
          {step === 1 && (
            <text
              x="280"
              y="288"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--warning)"
            >
              第一遍：从光源视角，把每方向最近遮挡距离渲进深度图
            </text>
          )}
          {step === 2 && (
            <text
              x="280"
              y="288"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              存下这张深度图——它记着「从光看，每方向最近的遮挡距离」
            </text>
          )}
          {step === 3 && (
            <text
              x="280"
              y="288"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              第二遍：从相机渲，把每个片元变到光空间、取它的当前深度
            </text>
          )}
          {step === 4 && (
            <>
              {/* 比较结果：被挡点（红）vs 受光点（绿） */}
              <rect
                x="60"
                y="270"
                width="210"
                height="24"
                rx="12"
                fill="var(--danger)"
                opacity="0.14"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="165"
                y="286"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--danger)"
              >
                current &gt; closest ⇒ 前面有遮挡 ⇒ 在阴影
              </text>
              <rect
                x="288"
                y="270"
                width="208"
                height="24"
                rx="12"
                fill="var(--success)"
                opacity="0.14"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text
                x="392"
                y="286"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--success)"
              >
                current ≈ closest ⇒ 自己最近 ⇒ 受光
              </text>
            </>
          )}

          {/* 第四步：另画一个受光点（绿）作对比 */}
          {showCompare && (
            <>
              <circle
                cx="270"
                cy="250"
                r="5"
                fill="var(--success)"
                stroke="var(--text-primary)"
                strokeWidth="1"
              />
              <line
                x1="70"
                y1="56"
                x2="270"
                y2="250"
                stroke="var(--success)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                opacity="0.7"
              />
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && (
          <>
            <strong>第一遍（光源视角）</strong>
            ：沿光的每条方向射线记下「最近遮挡物有多远」，写进一张
            <strong>深度图</strong>（亮 = 近、暗 = 远）。
          </>
        )}
        {step === 2 && (
          <>
            <strong>存下深度图</strong>
            ：它记着「从光看过去，每个方向最近的遮挡距离」，第二遍要拿它来判每个片元是否被挡。
          </>
        )}
        {step === 3 && (
          <>
            <strong>第二遍（相机视角）</strong>：对每个片元，用光的{" "}
            <strong>view × projection</strong> 把它变到光空间，取出它在光眼里的
            <strong>当前深度</strong>。
          </>
        )}
        {step === 4 && (
          <>
            <strong>比深度判阴影</strong>：当前深度 <strong>&gt;</strong>{" "}
            深度图存的最近深度 ⇒ 前面被挡 ⇒{" "}
            <span style={{ color: "var(--danger)" }}>在阴影</span>
            ；两者相等 ⇒ 自己最近 ⇒{" "}
            <span style={{ color: "var(--success)" }}>受光</span>。
          </>
        )}
      </figcaption>
    </figure>
  );
}
