/**
 * <KernelDiagram>：「帧缓冲」§3 后处理「3×3 卷积核」的图解（HEL-71，C 实战型）。
 *
 * 把「核如何对邻域加权求和」画成三块：
 *  左：屏幕上一个像素 + 它周围 3×3 邻域（9 个采样点，中心高亮）
 *  中：3×3 的权重核（这里示意边缘检测核：中心 8、周围 −1）
 *  右：把 9 个邻域颜色分别乘上对应权重再相加 = 这个像素的新颜色
 * 底部一行公式：新色 = Σ(邻域采样 × 对应权重)，并提示「权重和=1 不变亮暗、=0 突出边缘」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色，无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

// 边缘检测核（与 Demo「边缘检测」一致）：中心 8、周围 −1，权重和 = 0。
const EDGE_KERNEL = [-1, -1, -1, -1, 8, -1, -1, -1, -1];

export function KernelDiagram() {
  const cell = 34; // 网格单元边长
  const gridX = 40; // 左侧邻域网格左上 x
  const gridY = 78;
  const kerX = 250; // 中间权重核左上 x
  const kerY = 78;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 560 280"
          role="img"
          aria-label="三乘三卷积核的图解。左边是屏幕上一个像素和它周围的三乘三邻域，一共九个采样点，正中间那个是当前要算的像素，高亮显示。中间是一个三乘三的权重核，这里用边缘检测核举例，正中心是 8，周围八个都是负 1。右边表示把左边九个邻域的颜色分别乘上中间对应位置的权重，再全部相加，得到当前这个像素的新颜色。底部公式说明：新颜色等于邻域每个采样乘以它对应权重之后求和。并提示权重之和等于 1 时画面整体亮度不变，比如模糊核；权重之和等于 0 时会突出明暗变化处，比如这个边缘检测核。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          <text
            x="280"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            3×3 核：对一个像素周围 9 格加权求和
          </text>

          {/* ===== 左：邻域 3×3 ===== */}
          <text
            x={gridX + cell * 1.5}
            y={gridY - 12}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            邻域 9 个采样
          </text>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => {
              const isCenter = r === 1 && c === 1;
              return (
                <rect
                  key={`g-${r}-${c}`}
                  x={gridX + c * cell}
                  y={gridY + r * cell}
                  width={cell}
                  height={cell}
                  fill={isCenter ? "var(--accent)" : "var(--bg)"}
                  opacity={isCenter ? "0.5" : "1"}
                  stroke={isCenter ? "var(--accent)" : "var(--border)"}
                  strokeWidth={isCenter ? "2" : "1"}
                />
              );
            }),
          )}
          <text
            x={gridX + cell * 1.5}
            y={gridY + cell * 1.5 + 4}
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
          >
            当前
          </text>
          <text
            x={gridX + cell * 1.5}
            y={gridY + cell * 3 + 16}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            中心 = 要算的像素
          </text>

          {/* ⊗（逐格乘权重） */}
          <text
            x={gridX + cell * 3 + 26}
            y={gridY + cell * 1.5 + 6}
            textAnchor="middle"
            fontSize="22"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ⊗
          </text>

          {/* ===== 中：权重核 3×3（边缘检测核） ===== */}
          <text
            x={kerX + cell * 1.5}
            y={kerY - 12}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            权重核（边缘检测）
          </text>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => {
              const idx = r * 3 + c;
              const w = EDGE_KERNEL[idx];
              const isCenter = r === 1 && c === 1;
              return (
                <g key={`k-${r}-${c}`}>
                  <rect
                    x={kerX + c * cell}
                    y={kerY + r * cell}
                    width={cell}
                    height={cell}
                    fill={isCenter ? "var(--warning)" : "var(--bg-elevated)"}
                    opacity={isCenter ? "0.22" : "1"}
                    stroke={isCenter ? "var(--warning)" : "var(--border)"}
                    strokeWidth={isCenter ? "2" : "1"}
                  />
                  <text
                    x={kerX + c * cell + cell / 2}
                    y={kerY + r * cell + cell / 2 + 4}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="600"
                    className="font-mono"
                    fill={isCenter ? "var(--warning)" : "var(--text-primary)"}
                  >
                    {w}
                  </text>
                </g>
              );
            }),
          )}
          <text
            x={kerX + cell * 1.5}
            y={kerY + cell * 3 + 16}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            权重和 = 0（突出边缘）
          </text>

          {/* =（求和） */}
          <text
            x={kerX + cell * 3 + 26}
            y={kerY + cell * 1.5 + 6}
            textAnchor="middle"
            fontSize="22"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            =
          </text>

          {/* ===== 右：新颜色 ===== */}
          <rect
            x="468"
            y={kerY + 14}
            width="70"
            height="70"
            rx="8"
            fill="var(--success)"
            opacity="0.3"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x="503"
            y={kerY + 46}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            新颜色
          </text>
          <text
            x="503"
            y={kerY + 62}
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            加权求和结果
          </text>

          {/* ===== 底部公式 ===== */}
          <text
            x="280"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className="font-mono"
            fill="var(--text-primary)"
          >
            新色 = Σ (邻域采样ᵢ × 权重ᵢ)
          </text>
          <text
            x="280"
            y="264"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            权重和 = 1 → 亮度不变（如模糊核 1/9）；= 0 → 突出边缘（如此核）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>3×3 卷积核</strong>：把当前像素<strong>周围 9 格</strong>
        的颜色分别<strong>乘上核里对应位置的权重</strong>，再
        <strong>相加</strong>得到新颜色。权重和为 <code>1</code>
        画面整体亮度不变（如模糊核每格 <code>1/9</code>）；权重和为{" "}
        <code>0</code>
        会抹掉平坦区、只剩明暗突变处，描出<strong>边缘</strong>。
      </figcaption>
    </figure>
  );
}
