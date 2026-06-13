/**
 * <DepthTestStepDiagram step={1|2|3|4}>：「深度测试」§5「逐片段拆解」<Stepper> 四步配图（HEL-67，A 概念型）。
 *
 * 同一套 SVG 骨架，画两样东西 + 一处「深度缓冲那一格的数字」，按 step 高亮不同状态，
 * 让四张图一眼看出「缓冲那格的深度数字怎么变」：
 *  ①新片段到达：颜色已算好、深度 0.3；缓冲该格当前存着远墙的 0.7。两数并列、尚未比较（中性色）。
 *  ②比较 0.3 < 0.7（默认 GL_LESS）成立 → 高亮「通过」（var(--success)）。
 *  ③通过 → 颜色写进颜色缓冲（盖掉远墙色）、缓冲该格 0.7 → 0.3（画出更新）。
 *  ④反例：又来一块深度 0.5 的新片段，0.5 < 0.3 不成立 → 高亮「不通过 / 丢弃」（var(--danger)），
 *    颜色与深度都不变（仍是 0.3）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type DepthTestStep = 1 | 2 | 3 | 4;

const ARIA: Record<DepthTestStep, string> = {
  1: "深度测试逐片段拆解第一步。左边是一个新片段，它的颜色已经算好，深度值是 0.3。右边是深度缓冲里的同一格，当前存着上一块远墙留下的颜色和深度 0.7。两个深度数字并列摆出，此刻还没有比较，都是中性色。",
  2: "深度测试逐片段拆解第二步。按默认规则 GL_LESS，比较新片段深度 0.3 是否小于缓冲里的 0.7。0.3 小于 0.7 成立，所以新片段更近，通过测试，用绿色高亮标出通过。",
  3: "深度测试逐片段拆解第三步。因为通过了，新片段的颜色写进颜色缓冲、盖掉了原来远墙的颜色，同时深度缓冲这一格的深度从 0.7 更新成更近的 0.3。图里用箭头画出 0.7 变成 0.3。",
  4: "深度测试逐片段拆解第四步，失败的反例。之后又来一块深度为 0.5 的新片段落在同一格，比较 0.5 是否小于当前缓冲里的 0.3，不成立，于是这个片段不通过、被丢弃，用红色高亮标出，颜色和深度都不改变，缓冲仍然是 0.3。",
};

export function DepthTestStepDiagram({ step }: { step: DepthTestStep }) {
  // 各步语义参数集中在这里，骨架共用。
  const incomingDepth = step === 4 ? "0.5" : "0.3";
  // 缓冲该格当前深度：①②仍是远墙 0.7；③④已更新成 0.3。
  const bufferDepth = step <= 2 ? "0.7" : "0.3";
  // 缓冲该格颜色：①②还是远墙（warning），③④已被近片段（accent）覆盖。
  const bufferIsFar = step <= 2;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 240"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {/* ============ 左：新片段（待测） ============ */}
          <text
            x="110"
            y="34"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            新片段
          </text>
          {/* 颜色块（新片段的颜色已算好，恒为近片段色 accent） */}
          <rect
            x="50"
            y="50"
            width="120"
            height="60"
            rx="6"
            fill="var(--accent)"
            opacity="0.85"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="110"
            y="78"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            颜色已算好
          </text>
          {/* 新片段深度值 */}
          <text
            x="110"
            y="98"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className="font-mono"
            fill="var(--text-primary)"
          >
            深度 {incomingDepth}
          </text>

          {/* ============ 中：比较关口 ============ */}
          {/* 从新片段指向缓冲格的箭头 */}
          <line
            x1="172"
            y1="80"
            x2="200"
            y2="80"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path d="M200 80 l-9 -4 l0 8 z" fill="var(--border)" />

          {/* ============ 右：深度缓冲（同一格） ============ */}
          <text
            x="370"
            y="34"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            深度缓冲（这一格）
          </text>
          {/* 上半：颜色（远墙色 / 已被近片段盖掉） */}
          <rect
            x="310"
            y="50"
            width="120"
            height="32"
            fill={bufferIsFar ? "var(--warning)" : "var(--accent)"}
            opacity="0.75"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* 下半：深度值 */}
          <rect
            x="310"
            y="82"
            width="120"
            height="28"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="370"
            y="101"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className="font-mono"
            fill="var(--text-primary)"
          >
            {bufferDepth}
          </text>
          <text
            x="370"
            y="127"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            上半 = 颜色，下半 = 深度
          </text>

          {/* ============ 底部：本步状态 ============ */}
          {step === 1 && (
            <>
              <text
                x="260"
                y="170"
                textAnchor="middle"
                fontSize="12"
                fill="var(--text-secondary)"
              >
                两个深度并列摆出：新片段{" "}
                <tspan className="font-mono" fill="var(--text-primary)">
                  0.3
                </tspan>{" "}
                ，缓冲里是远墙的{" "}
                <tspan className="font-mono" fill="var(--text-primary)">
                  0.7
                </tspan>
              </text>
              <text
                x="260"
                y="194"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                还没比较
              </text>
            </>
          )}

          {step === 2 && (
            <>
              {/* 比较式 + 通过徽标（语义绿） */}
              <text
                x="260"
                y="166"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                className="font-mono"
                fill="var(--text-primary)"
              >
                0.3 &lt; 0.7 ？（GL_LESS）
              </text>
              <rect
                x="196"
                y="180"
                width="128"
                height="34"
                rx="17"
                fill="var(--success)"
                opacity="0.16"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text
                x="260"
                y="202"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--success)"
              >
                成立 → 通过
              </text>
            </>
          )}

          {step === 3 && (
            <>
              {/* 颜色被盖：在缓冲上半加一条强调描边 */}
              <rect
                x="310"
                y="50"
                width="120"
                height="32"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
              />
              {/* 深度更新：0.7 → 0.3 */}
              <text
                x="260"
                y="166"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                写颜色 + 更新深度
              </text>
              <text
                x="260"
                y="194"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                className="font-mono"
                fill="var(--text-primary)"
              >
                <tspan fill="var(--text-secondary)">0.7</tspan>
                <tspan dx="6" fill="var(--accent)">
                  →
                </tspan>
                <tspan dx="6" fill="var(--accent)">
                  0.3
                </tspan>
              </text>
              <text
                x="260"
                y="216"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                颜色缓冲盖掉远墙色，深度缓冲刷成 0.3
              </text>
            </>
          )}

          {step === 4 && (
            <>
              {/* 比较式 + 丢弃徽标（语义红） */}
              <text
                x="260"
                y="166"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                className="font-mono"
                fill="var(--text-primary)"
              >
                0.5 &lt; 0.3 ？（GL_LESS）
              </text>
              <rect
                x="190"
                y="180"
                width="140"
                height="34"
                rx="17"
                fill="var(--danger)"
                opacity="0.16"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="260"
                y="202"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--danger)"
              >
                不成立 → 丢弃
              </text>
              <text
                x="260"
                y="230"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                颜色与深度都不写，缓冲仍是 0.3
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        盯着右边<strong>深度缓冲那一格的数字</strong>怎么变：第 ② 步比出更近、第
        ③ 步把它从 <strong>0.7</strong> 刷成 <strong>0.3</strong>，第 ④
        步更远的片段被丢弃、那格保持 <strong>0.3</strong> 不动。
      </figcaption>
    </figure>
  );
}
