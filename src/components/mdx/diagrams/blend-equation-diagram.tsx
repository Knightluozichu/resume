/**
 * <BlendEquationDiagram>：「混合」§3/§4 混合方程的配图（HEL-69，C 实战型）。
 *
 * 把 over 混合方程 C = Csrc·Fsrc + Cdst·Fdst 用「色块相乘 + 相加」图解出来：
 *  一行从左到右四块——
 *   [源色 Csrc] × [源因子 αsrc] + [目标色 Cdst] × [目标因子 1-αsrc] = [混出的色]
 *  源色取品牌紫（前景），目标色取暖黄（背景），按 αsrc=0.6 算：
 *   结果 = 0.6·紫 + 0.4·黄，用一个介于两者之间、偏紫的色块表示。
 *  每块下方标出它在公式里的角色，让「因子是 0~1 的权重、两块按权重相加」一眼可见。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function BlendEquationDiagram() {
  // 源 alpha = 0.6（与正文「绿盖红 60%」同一直觉，这里用紫盖黄）。
  // 结果色块用 color-mix 在 accent / warning 之间按 60% 取，纯展示示意。
  const blended = "color-mix(in srgb, var(--accent) 60%, var(--warning))";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 720 220"
          role="img"
          aria-label="混合方程图解。从左到右排成一行算式：第一块是源色，也就是正在画的前景色，这里用紫色块表示，乘以源因子，源因子等于源的透明度 alpha，取 0.6。加上第二块目标色，也就是画布上已有的背景色，这里用暖黄色块表示，乘以目标因子，目标因子等于 1 减去源的透明度，取 0.4。等号右边是混出来的结果色，是一个介于紫和黄之间、偏紫的色块，等于 0.6 份紫加 0.4 份黄。说明因子是 0 到 1 之间的权重，混合就是把源色和目标色按这两个权重加起来。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x="360"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            over 混合：把前景色按透明度叠到背景色上
          </text>

          {/* ===== 源色 Csrc（前景，紫） ===== */}
          <rect
            x="40"
            y="60"
            width="80"
            height="80"
            rx="8"
            fill="var(--accent)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="80"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            源色
          </text>
          <text
            x="80"
            y="122"
            textAnchor="middle"
            fontSize="10"
            className="font-mono"
            fill="var(--text-primary)"
          >
            Csrc
          </text>
          <text
            x="80"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            前景（正在画）
          </text>

          {/* × 源因子 */}
          <text
            x="148"
            y="106"
            textAnchor="middle"
            fontSize="20"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ×
          </text>
          <rect
            x="170"
            y="78"
            width="60"
            height="44"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="98"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className="font-mono"
            fill="var(--accent)"
          >
            Fsrc
          </text>
          <text
            x="200"
            y="114"
            textAnchor="middle"
            fontSize="11"
            className="font-mono"
            fill="var(--text-primary)"
          >
            = 0.6
          </text>
          <text
            x="200"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            源因子 = αsrc
          </text>

          {/* + */}
          <text
            x="258"
            y="106"
            textAnchor="middle"
            fontSize="22"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            +
          </text>

          {/* ===== 目标色 Cdst（背景，黄） ===== */}
          <rect
            x="284"
            y="60"
            width="80"
            height="80"
            rx="8"
            fill="var(--warning)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="324"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--bg)"
          >
            目标色
          </text>
          <text
            x="324"
            y="122"
            textAnchor="middle"
            fontSize="10"
            className="font-mono"
            fill="var(--bg)"
          >
            Cdst
          </text>
          <text
            x="324"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            背景（画布已有）
          </text>

          {/* × 目标因子 */}
          <text
            x="392"
            y="106"
            textAnchor="middle"
            fontSize="20"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ×
          </text>
          <rect
            x="414"
            y="78"
            width="78"
            height="44"
            rx="8"
            fill="var(--bg)"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="453"
            y="98"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className="font-mono"
            fill="var(--warning)"
          >
            Fdst
          </text>
          <text
            x="453"
            y="114"
            textAnchor="middle"
            fontSize="11"
            className="font-mono"
            fill="var(--text-primary)"
          >
            = 0.4
          </text>
          <text
            x="453"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            目标因子 = 1−αsrc
          </text>

          {/* = */}
          <text
            x="520"
            y="106"
            textAnchor="middle"
            fontSize="22"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            =
          </text>

          {/* ===== 结果色 ===== */}
          <rect
            x="548"
            y="60"
            width="120"
            height="80"
            rx="8"
            fill={blended}
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="608"
            y="100"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            混出的色
          </text>
          <text
            x="608"
            y="118"
            textAnchor="middle"
            fontSize="10"
            className="font-mono"
            fill="var(--text-primary)"
          >
            0.6·紫 + 0.4·黄
          </text>
          <text
            x="608"
            y="168"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            偏前景、透出点背景
          </text>

          {/* 公式整行 */}
          <text
            x="360"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className="font-mono"
            fill="var(--text-primary)"
          >
            C = Csrc·Fsrc + Cdst·Fdst
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        混合方程 <code>C = Csrc·Fsrc + Cdst·Fdst</code>：把<strong>源色</strong>
        （前景，乘源因子 <code>αsrc</code>）和<strong>目标色</strong>
        （背景，乘目标因子 <code>1−αsrc</code>）按权重<strong>相加</strong>
        。αsrc 越大，混出的色越偏前景；这就是最常用的 over 混合。
      </figcaption>
    </figure>
  );
}
