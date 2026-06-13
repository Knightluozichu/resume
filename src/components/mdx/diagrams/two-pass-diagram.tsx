/**
 * <TwoPassDiagram step={1|2|3}>：「帧缓冲」§5「两遍渲染」<Stepper> 三步配图（HEL-71，C 实战型）。
 *
 * 同一套「场景 → 帧缓冲纹理 → 全屏四边形 → 屏幕」骨架，按 step 演示两遍渲染流程：
 *  ①第一遍：绑自建帧缓冲，把场景（彩色立方体）渲进颜色纹理附件——画面没上屏，先存成一张「图」。
 *  ②绑回默认帧缓冲：把刚才那张离屏纹理取出来，准备贴到一个铺满屏幕的全屏四边形上。
 *  ③第二遍：全屏四边形的片段着色器采样这张纹理，套上后处理核（这里示意「边缘检测」描边）后上屏。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色，无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type TwoPassStep = 1 | 2 | 3;

const ARIA: Record<TwoPassStep, string> = {
  1: "两遍渲染第一步，第一遍离屏渲染。绑定自己创建的帧缓冲，把场景里的彩色立方体渲染进帧缓冲的颜色纹理附件。这一遍的画面没有显示到屏幕上，而是先存成了一张离屏的图。",
  2: "两遍渲染第二步，绑回默认帧缓冲并取出离屏纹理。把绑定切回屏幕用的默认帧缓冲，并把第一遍渲好的那张颜色纹理取出来，准备贴到一个铺满整个屏幕的全屏四边形上。",
  3: "两遍渲染第三步，第二遍上屏并做后处理。全屏四边形的片段着色器采样那张离屏纹理，对采出的颜色套上一个后处理核，这里示意边缘检测描边，处理后的结果显示到屏幕上。",
};

export function TwoPassDiagram({ step }: { step: TwoPassStep }) {
  const fbActive = step === 1;
  const texReady = step >= 2;
  const onScreen = step === 3;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 280"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* ===== 场景（左：彩色立方体） ===== */}
          <text
            x="70"
            y="56"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            场景
          </text>
          {/* 简笔立方体 */}
          <g opacity={step === 1 ? "1" : "0.5"}>
            <path
              d="M44 86 l26 -14 l26 14 l0 30 l-26 14 l-26 -14 z"
              fill="var(--accent)"
              opacity="0.5"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <path
              d="M44 86 l26 14 l26 -14"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <line
              x1="70"
              y1="100"
              x2="70"
              y2="130"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
          </g>
          <text
            x="70"
            y="150"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            彩色立方体
          </text>

          {/* arrow 场景 → 帧缓冲 */}
          <line
            x1="104"
            y1="100"
            x2="158"
            y2="100"
            stroke={fbActive ? "var(--accent)" : "var(--border)"}
            strokeWidth="1.5"
            markerEnd={fbActive ? "url(#tp-arrow-a)" : "url(#tp-arrow-d)"}
          />
          {step === 1 && (
            <text
              x="131"
              y="92"
              textAnchor="middle"
              fontSize="8"
              fill="var(--accent)"
            >
              第一遍
            </text>
          )}

          {/* ===== 帧缓冲（颜色纹理附件） ===== */}
          <rect
            x="160"
            y="68"
            width="120"
            height="92"
            rx="8"
            fill={fbActive ? "var(--bg)" : "var(--bg-elevated)"}
            stroke={fbActive ? "var(--accent)" : "var(--border)"}
            strokeWidth={fbActive ? "2" : "1.5"}
          />
          <text
            x="220"
            y="90"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={fbActive ? "var(--accent)" : "var(--text-secondary)"}
          >
            帧缓冲 FBO
          </text>
          {/* 纹理小图：渲好后才有内容 */}
          <rect
            x="180"
            y="100"
            width="80"
            height="44"
            rx="4"
            fill={
              texReady
                ? "color-mix(in srgb, var(--accent) 40%, var(--warning))"
                : "var(--bg)"
            }
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="220"
            y="156"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            颜色纹理附件
          </text>

          {/* arrow 帧缓冲 → 全屏四边形（取出纹理） */}
          <line
            x1="282"
            y1="114"
            x2="336"
            y2="114"
            stroke={texReady ? "var(--accent)" : "var(--border)"}
            strokeWidth="1.5"
            markerEnd={texReady ? "url(#tp-arrow-a)" : "url(#tp-arrow-d)"}
          />
          {step === 2 && (
            <text
              x="309"
              y="106"
              textAnchor="middle"
              fontSize="8"
              fill="var(--accent)"
            >
              取出纹理
            </text>
          )}

          {/* ===== 全屏四边形 ===== */}
          <rect
            x="338"
            y="74"
            width="92"
            height="80"
            rx="6"
            fill={texReady ? "var(--bg)" : "var(--bg-elevated)"}
            stroke={step === 2 ? "var(--accent)" : "var(--border)"}
            strokeWidth={step === 2 ? "2" : "1.5"}
          />
          <text
            x="384"
            y="98"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill={step >= 2 ? "var(--text-primary)" : "var(--text-secondary)"}
          >
            全屏四边形
          </text>
          <text
            x="384"
            y="120"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            贴满整个屏幕
          </text>
          <text
            x="384"
            y="134"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            采样 + 后处理核
          </text>

          {/* arrow 全屏四边形 → 屏幕 */}
          <line
            x1="432"
            y1="114"
            x2="476"
            y2="114"
            stroke={onScreen ? "var(--success)" : "var(--border)"}
            strokeWidth="1.5"
            markerEnd={onScreen ? "url(#tp-arrow-s)" : "url(#tp-arrow-d)"}
          />
          {step === 3 && (
            <text
              x="454"
              y="106"
              textAnchor="middle"
              fontSize="8"
              fill="var(--success)"
            >
              第二遍
            </text>
          )}

          {/* ===== 屏幕 ===== */}
          <rect
            x="478"
            y="80"
            width="64"
            height="68"
            rx="6"
            fill={onScreen ? "var(--bg)" : "var(--bg-elevated)"}
            stroke={onScreen ? "var(--success)" : "var(--border)"}
            strokeWidth={onScreen ? "2" : "1.5"}
          />
          {/* 屏幕上的「描边」立方体（step3 才显示处理后画面） */}
          {onScreen && (
            <path
              d="M494 116 l16 -9 l16 9 l0 18 l-16 9 l-16 -9 z"
              fill="none"
              stroke="var(--success)"
              strokeWidth="1.5"
            />
          )}
          <text
            x="510"
            y="162"
            textAnchor="middle"
            fontSize="9"
            fill={onScreen ? "var(--success)" : "var(--text-secondary)"}
          >
            屏幕
          </text>

          <defs>
            <marker
              id="tp-arrow-a"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="tp-arrow-s"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="tp-arrow-d"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--border)" />
            </marker>
          </defs>

          {/* ===== 底部本步状态 ===== */}
          {step === 1 && (
            <text
              x="280"
              y="216"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--accent)"
            >
              第一遍：绑自建帧缓冲，把场景渲进颜色纹理（没上屏）
            </text>
          )}
          {step === 2 && (
            <text
              x="280"
              y="216"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              绑回默认帧缓冲，取出那张离屏纹理，准备贴满屏幕
            </text>
          )}
          {step === 3 && (
            <>
              <rect
                x="110"
                y="232"
                width="340"
                height="32"
                rx="16"
                fill="var(--success)"
                opacity="0.14"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text
                x="280"
                y="252"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--success)"
              >
                第二遍：全屏四边形采样纹理 + 后处理核 → 上屏
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && (
          <>
            <strong>第一遍（离屏）</strong>：绑定自建<strong>帧缓冲</strong>
            ，把场景里的彩色立方体渲进它的<strong>颜色纹理附件</strong>
            ——画面先存成一张「图」，没有上屏。
          </>
        )}
        {step === 2 && (
          <>
            <strong>绑回默认帧缓冲</strong>：把第一遍渲好的离屏纹理
            <strong>取出来</strong>，准备贴到一个铺满整个屏幕的
            <strong>全屏四边形</strong>上。
          </>
        )}
        {step === 3 && (
          <>
            <strong>第二遍（上屏）</strong>：全屏四边形的片段着色器
            <strong>采样</strong>这张纹理，套上<strong>后处理核</strong>
            （示意「边缘检测」描边）后显示到屏幕。
          </>
        )}
      </figcaption>
    </figure>
  );
}
