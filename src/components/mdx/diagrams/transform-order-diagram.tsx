/**
 * <TransformOrderDiagram>：「变换」§4「矩阵组合（顺序）」小节的核心掰碎图（HEL-35，B 数学型）。
 *
 * 直观展示矩阵乘法不满足交换律：同一个方块，两种组合顺序得到截然不同的结果。
 *  - 上排「先缩放后平移」(T·S)：方块先就地放大，再整体挪到右边 → 落在右侧、变大。
 *  - 下排「先平移后缩放」(S·T)：方块先挪到右边，再整体缩放——连「挪过去的那段距离」
 *    也一起被放大了 → 落得更远、且变大。
 *
 * 关键语义：组合矩阵从右往左作用（右乘列向量，最靠近向量的先生效）；顺序一换，
 * 结果就不同。这正是 §7 误区「组合顺序写反」的几何来源。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent)/--success/--warning/--border/--bg/--bg-elevated/
 * --text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function TransformOrderDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 380"
          role="img"
          aria-label="同一个方块经两种组合顺序得到不同结果，说明矩阵乘法不满足交换律。上排先缩放后平移：方块先就地放大一倍，再整体向右挪一段，最终落在右侧偏中。下排先平移后缩放：方块先向右挪一段，再整体放大一倍——连挪过去的那段距离也被一起放大了，于是落得比上排更远。两排起点相同、用的缩放和平移也相同，只因顺序不同，终点位置就不同。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 原点参考竖线（两排共用同一个起点 x 基准） */}
          <line
            x1="70"
            y1="40"
            x2="70"
            y2="360"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
          <text
            x="70"
            y="32"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            原点
          </text>

          {/* =============== 上排：先缩放后平移 T·S =============== */}
          <text
            x="20"
            y="74"
            fontSize="13"
            fontWeight="600"
            fill="var(--success)"
          >
            先缩放，后平移（T · S）
          </text>

          {/* 步骤①起始小方块 */}
          <rect
            x="70"
            y="92"
            width="40"
            height="40"
            rx="4"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
          />
          <text
            x="90"
            y="148"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            起始
          </text>

          {/* 箭头 → 缩放 */}
          <line
            x1="120"
            y1="112"
            x2="158"
            y2="112"
            stroke="var(--accent)"
            strokeWidth="1.5"
            markerEnd="url(#order-arrow)"
          />
          <text
            x="139"
            y="104"
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
          >
            ①缩放
          </text>

          {/* 步骤②就地放大（原位变大的方块） */}
          <rect
            x="168"
            y="84"
            width="56"
            height="56"
            rx="4"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text
            x="196"
            y="156"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            就地放大
          </text>

          {/* 箭头 → 平移 */}
          <line
            x1="234"
            y1="112"
            x2="300"
            y2="112"
            stroke="var(--accent)"
            strokeWidth="1.5"
            markerEnd="url(#order-arrow)"
          />
          <text
            x="267"
            y="104"
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
          >
            ②向右平移
          </text>

          {/* 步骤③最终（放大的方块挪到右边） */}
          <rect
            x="310"
            y="84"
            width="56"
            height="56"
            rx="4"
            fill="var(--accent-glow)"
            stroke="var(--success)"
            strokeWidth="2"
          />
          <text
            x="338"
            y="156"
            textAnchor="middle"
            fontSize="10"
            fill="var(--success)"
          >
            落在这里
          </text>

          {/* 分隔横线 */}
          <line
            x1="20"
            y1="196"
            x2="640"
            y2="196"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* =============== 下排：先平移后缩放 S·T =============== */}
          <text
            x="20"
            y="234"
            fontSize="13"
            fontWeight="600"
            fill="var(--warning)"
          >
            先平移，后缩放（S · T）
          </text>

          {/* 步骤①起始小方块（同样起点） */}
          <rect
            x="70"
            y="252"
            width="40"
            height="40"
            rx="4"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
          />
          <text
            x="90"
            y="308"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            起始
          </text>

          {/* 箭头 → 平移 */}
          <line
            x1="120"
            y1="272"
            x2="186"
            y2="272"
            stroke="var(--warning)"
            strokeWidth="1.5"
            markerEnd="url(#order-arrow-w)"
          />
          <text
            x="153"
            y="264"
            textAnchor="middle"
            fontSize="9"
            fill="var(--warning)"
          >
            ①向右平移
          </text>

          {/* 步骤②挪到中间（小方块在中间位置） */}
          <rect
            x="196"
            y="252"
            width="40"
            height="40"
            rx="4"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="216"
            y="308"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            挪到这
          </text>

          {/* 箭头 → 缩放（连距离一起放大） */}
          <line
            x1="246"
            y1="272"
            x2="312"
            y2="272"
            stroke="var(--warning)"
            strokeWidth="1.5"
            markerEnd="url(#order-arrow-w)"
          />
          <text
            x="279"
            y="264"
            textAnchor="middle"
            fontSize="9"
            fill="var(--warning)"
          >
            ②整体放大
          </text>

          {/* 步骤③最终（连距离一起放大 → 落得更远、且更大） */}
          <rect
            x="500"
            y="244"
            width="56"
            height="56"
            rx="4"
            fill="var(--accent-glow)"
            stroke="var(--warning)"
            strokeWidth="2"
          />
          <text
            x="528"
            y="316"
            textAnchor="middle"
            fontSize="10"
            fill="var(--warning)"
          >
            落得更远
          </text>
          {/* 虚线标出「连距离也被放大」 */}
          <line
            x1="322"
            y1="272"
            x2="498"
            y2="272"
            stroke="var(--warning)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            markerEnd="url(#order-arrow-w)"
            opacity="0.8"
          />
          <text
            x="410"
            y="290"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            连「挪过的距离」也被放大
          </text>

          {/* 底部一句话 */}
          <text
            x="330"
            y="350"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            同样的缩放 + 平移，换个顺序，终点就不同
          </text>
          <text
            x="330"
            y="370"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            组合矩阵从右往左作用：最靠近向量的先生效。顺序错 = 物体跑错位置。
          </text>

          {/* 箭头 marker 定义 */}
          <defs>
            <marker
              id="order-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="order-arrow-w"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        同一个方块、同样的缩放与平移，只因顺序不同结果就不同：先缩放后平移（T·S）方块就地变大再挪走；先平移后缩放（S·T）则连「挪过去的距离」也被一起放大，落得更远。这就是矩阵乘法不满足交换律——组合矩阵从右往左作用，最靠近向量的那个先生效。
      </figcaption>
    </figure>
  );
}
