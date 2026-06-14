/**
 * <ShadowAcneDiagram mode={"acne"|"bias"}>：「阴影映射」§7 误区配图——shadow acne 自遮挡条纹成因 + bias 修法（HEL-82）。
 *
 * 画「深度图一格覆盖地面一小段」的成因：深度图分辨率有限，光源那侧一个深度像素（texel）会
 * 覆盖地面上斜斜的一片区域，整片只存一个「最近深度」（取样点处的距离）。于是这片斜面上：
 *  - 比取样点更靠近光的那半 → current < stored → 判为受光（亮）
 *  - 比取样点更远离光的那半 → current > stored → 被自己骗成「在阴影」（暗）
 * 一片接一片交替亮暗，就是 shadow acne 自遮挡条纹（摩尔纹）。
 *
 * mode="acne"：不加 bias，画出交替的亮/暗条纹（自遮挡）。
 * mode="bias"：把存的深度往「更远」推一点点（depth bias），整片斜面都判为受光、条纹消失。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色，无裸 hex（硬规则 5）。
 */

type AcneMode = "acne" | "bias";

const ARIA: Record<AcneMode, string> = {
  acne: "shadow acne 自遮挡条纹成因图，未加偏移。光源在左上方。地面是一段斜面，被深度图划成若干个像素格，每个格子只存一个最近深度，就是格中央取样点到光源的距离。在每个格子里，比取样点更靠近光的那半判为受光显亮，比取样点更远离光的那半被误判成在阴影显暗，于是地面出现一道道交替的亮暗条纹，这就是自遮挡条纹。",
  bias: "shadow acne 用深度偏移修复图。把深度图里存的最近深度统一往更远的方向推一点点，叫 depth bias。这样整段本该受光的斜面，它的当前深度都不会超过被推远后的存储深度，于是整片都判为受光、条纹消失，地面恢复干净。",
};

export function ShadowAcneDiagram({ mode }: { mode: AcneMode }) {
  const biased = mode === "bias";
  // 地面斜面被分成的几格（每格一个 texel 取样点），acne 下交替亮暗、bias 下全亮。
  const cells = [0, 1, 2, 3, 4];

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 520 260"
          role="img"
          aria-label={ARIA[mode]}
          className="mx-auto block h-auto w-full max-w-[520px]"
        >
          {/* ===== 光源 ===== */}
          <circle
            cx="58"
            cy="48"
            r="12"
            fill="var(--warning)"
            opacity="0.9"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <g stroke="var(--warning)" strokeWidth="1.5" opacity="0.9">
            <line x1="58" y1="30" x2="58" y2="24" />
            <line x1="40" y1="48" x2="34" y2="48" />
          </g>
          <text
            x="58"
            y="80"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
          >
            光源
          </text>

          {/* ===== 地面斜面：被深度图划成 5 段 ===== */}
          {/* 斜面从 (130,200) 到 (430,120) */}
          {cells.map((i) => {
            const x0 = 130 + i * 60;
            const y0 = 200 - i * 16;
            const x1 = x0 + 60;
            const y1 = y0 - 16;
            // acne：奇偶段交替——靠光半受光(亮)、远光半被误判阴影(暗)。这里整格用一个判定演示交替。
            const inShadow = !biased && i % 2 === 1;
            return (
              <g key={i}>
                {/* 段本体 */}
                <path
                  d={`M${x0} ${y0} L${x1} ${y1} L${x1} ${y1 + 18} L${x0} ${y0 + 18} Z`}
                  fill={
                    inShadow
                      ? "var(--danger)"
                      : biased
                        ? "var(--success)"
                        : "var(--success)"
                  }
                  opacity={inShadow ? "0.5" : "0.5"}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                {/* 该格深度图取样点（texel 中心） */}
                <circle
                  cx={(x0 + x1) / 2}
                  cy={(y0 + y1) / 2}
                  r="2.5"
                  fill="var(--warning)"
                  stroke="var(--bg)"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}
          <text
            x="280"
            y="232"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            斜面被深度图划成若干格，每格只存「中央取样点」的一个最近深度
          </text>

          {/* ===== 标注：成因 / 修法 ===== */}
          {!biased ? (
            <>
              {/* 指向一个暗段：被误判 */}
              <text
                x="250"
                y="100"
                textAnchor="middle"
                fontSize="9"
                fill="var(--danger)"
              >
                远光半：current &gt; stored
              </text>
              <text
                x="250"
                y="112"
                textAnchor="middle"
                fontSize="9"
                fill="var(--danger)"
              >
                被自己误判「在阴影」→ 暗条
              </text>
              <text
                x="408"
                y="150"
                textAnchor="middle"
                fontSize="9"
                fill="var(--success)"
              >
                靠光半：判受光 → 亮条
              </text>
            </>
          ) : (
            <>
              {/* bias：把存的深度往更远推一点 */}
              <text
                x="280"
                y="100"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--accent)"
              >
                depth bias：把 stored 往「更远」推一点点
              </text>
              <text
                x="280"
                y="116"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                current 再也 &gt; 不过被推远的 stored → 整片受光、条纹消失
              </text>
            </>
          )}

          {/* ===== 底部状态徽标 ===== */}
          {!biased ? (
            <>
              <rect
                x="150"
                y="240"
                width="220"
                height="16"
                rx="8"
                fill="var(--danger)"
                opacity="0.14"
                stroke="var(--danger)"
                strokeWidth="1.2"
              />
              <text
                x="260"
                y="252"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--danger)"
              >
                shadow acne：交替亮暗条纹（自遮挡）
              </text>
            </>
          ) : (
            <>
              <rect
                x="160"
                y="240"
                width="200"
                height="16"
                rx="8"
                fill="var(--success)"
                opacity="0.14"
                stroke="var(--success)"
                strokeWidth="1.2"
              />
              <text
                x="260"
                y="252"
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="var(--success)"
              >
                加了 bias：条纹消失，地面干净
              </text>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {!biased ? (
          <>
            深度图一格覆盖斜面一小片，整片只存
            <strong>取样点</strong>那一个最近深度：片内
            <strong>更远离光</strong>的半边 <code>current &gt; stored</code>
            ，被自己误判「在阴影」——一片片交替就成了
            <strong>shadow acne</strong> 条纹。
          </>
        ) : (
          <>
            把存的最近深度统一往<strong>更远</strong>推一个小
            <strong>偏移（bias）</strong>，本该受光的斜面 <code>current</code>{" "}
            再也越不过被推远的 <code>stored</code>，整片判受光、
            <strong>条纹消失</strong>。
          </>
        )}
      </figcaption>
    </figure>
  );
}
