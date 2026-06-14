/**
 * <HalfVectorDiagram>：「高级光照·Blinn-Phong」§3 核心概念掰碎图（HEL-80，D 对比型）。
 *
 * 把「半程向量 H = normalize(L + V)」以及「Blinn 用 N·H 替代 Phong 的 R·V」这两件最难看懂的事
 * 画清楚，分两栏：
 *  左栏「Phong：算反射向量 R，再看 R·V」：
 *    表面 + 命中点 P、法线 N、指向光源 L、观察方向 V、L 关于 N 的反射方向 R，
 *    标出「R 与 V 的夹角」——Phong 看这个夹角（R·V）。
 *  右栏「Blinn：取半程向量 H = L 与 V 的中分线，再看 N·H」：
 *    同一表面、同一 N、L、V，但不求 R；而是把 L 和 V 首尾平移相加、归一化得到正好落在 L、V
 *    正中间的半程向量 H，标出「N 与 H 的夹角」——Blinn 看这个夹角（N·H）。
 *    画一个小平行四边形示意 L+V 的相加，H 是其对角线方向。
 *
 * 直觉落点：H 是「光线方向与视线方向的中分线」；当 H 正好和法线 N 重合时，说明视线正处在镜面
 * 反射最强的方位上，N·H=1 高光最亮。N 与 H 的夹角永远不会越界（H 总在 L、V 之间），所以高光平滑。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--warning/--border/
 * --bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function HalfVectorDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 680 380"
          role="img"
          aria-label="半程向量与 Blinn-Phong 替换 Phong 的几何直觉，分两栏。左栏 Phong：表面命中点上画法线 N、指向光源方向 L、观察方向 V，以及 L 关于 N 的反射方向 R，Phong 看 R 与 V 的夹角，用 R 点乘 V 算高光。右栏 Blinn：同一个表面和 N、L、V，但不求反射向量，而是把 L 和 V 相加再归一化，得到正好落在 L 与 V 正中间的半程向量 H，Blinn 改看 N 与 H 的夹角，用 N 点乘 H 算高光；当 H 与 N 重合时高光最亮，而 H 总在 L 与 V 之间，夹角永不越界，所以高光平滑。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <defs>
            <marker
              id="hv-arrow-accent"
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
              id="hv-arrow-warning"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--warning)" />
            </marker>
            <marker
              id="hv-arrow-danger"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
            <marker
              id="hv-arrow-success"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* ============ 左栏：Phong 算 R，看 R·V ============ */}
          <text
            x="170"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Phong：先求反射 R，再看 R·V
          </text>

          {/* 表面 + 命中点 P (170,290) */}
          <rect
            x="50"
            y="290"
            width="240"
            height="18"
            fill="var(--border)"
            opacity="0.35"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle cx="170" cy="290" r="3.5" fill="var(--text-primary)" />

          {/* 法线 N：竖直向上 */}
          <line
            x1="170"
            y1="290"
            x2="170"
            y2="150"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            markerEnd="url(#hv-arrow-accent)"
          />
          <text x="177" y="158" fontSize="12" fill="var(--accent)">
            N
          </text>

          {/* L：指向光源（左上），warning */}
          <line
            x1="170"
            y1="290"
            x2="70"
            y2="180"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#hv-arrow-warning)"
          />
          <text x="54" y="174" fontSize="12" fill="var(--warning)">
            L（光）
          </text>

          {/* V：观察方向（右上），danger */}
          <line
            x1="170"
            y1="290"
            x2="270"
            y2="180"
            stroke="var(--danger)"
            strokeWidth="2.5"
            markerEnd="url(#hv-arrow-danger)"
          />
          <text x="274" y="178" fontSize="12" fill="var(--danger)">
            V（看）
          </text>

          {/* R：L 关于 N 的反射方向（在 N 右侧、与 L 对称），success */}
          <line
            x1="170"
            y1="290"
            x2="258"
            y2="205"
            stroke="var(--success)"
            strokeWidth="2.5"
            markerEnd="url(#hv-arrow-success)"
          />
          <text x="240" y="222" fontSize="12" fill="var(--success)">
            R（反射）
          </text>

          {/* R 与 V 的夹角弧 */}
          <path
            d="M250 213 A 88 88 0 0 1 256 188"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.3"
          />
          <text
            x="170"
            y="338"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            高光看 R 与 V 的夹角（R·V）
          </text>

          {/* 分隔竖线 */}
          <line
            x1="340"
            y1="40"
            x2="340"
            y2="355"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：Blinn 取 H = normalize(L+V)，看 N·H ============ */}
          <text
            x="510"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Blinn：取半程向量 H，再看 N·H
          </text>

          {/* 表面 + 命中点 P (510,290) */}
          <rect
            x="390"
            y="290"
            width="240"
            height="18"
            fill="var(--border)"
            opacity="0.35"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle cx="510" cy="290" r="3.5" fill="var(--text-primary)" />

          {/* 法线 N */}
          <line
            x1="510"
            y1="290"
            x2="510"
            y2="150"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            markerEnd="url(#hv-arrow-accent)"
          />
          <text x="517" y="158" fontSize="12" fill="var(--accent)">
            N
          </text>

          {/* L：与左栏同方位（左上），warning */}
          <line
            x1="510"
            y1="290"
            x2="410"
            y2="180"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#hv-arrow-warning)"
          />
          <text x="394" y="174" fontSize="12" fill="var(--warning)">
            L（光）
          </text>

          {/* V：与左栏同方位（右上），danger */}
          <line
            x1="510"
            y1="290"
            x2="610"
            y2="180"
            stroke="var(--danger)"
            strokeWidth="2.5"
            markerEnd="url(#hv-arrow-danger)"
          />
          <text x="614" y="178" fontSize="12" fill="var(--danger)">
            V（看）
          </text>

          {/* L+V 相加的小平行四边形示意（H 是对角线方向）：从 L 端、V 端各平移补出对角点 */}
          <polyline
            points="410,180 510,70 610,180"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* H：L 与 V 的中分线（这里 L、V 关于 N 对称，故 H 正好沿 N 上方，略示意落在正中），accent 高亮 */}
          <line
            x1="510"
            y1="290"
            x2="510"
            y2="92"
            stroke="var(--success)"
            strokeWidth="3"
            markerEnd="url(#hv-arrow-success)"
          />
          <text
            x="518"
            y="100"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            H = normalize(L+V)
          </text>

          {/* N 与 H 的夹角（此构型下 H 与 N 几乎重合，标注「H 与 N 同向 → 高光最亮」） */}
          <text
            x="510"
            y="338"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            高光看 N 与 H 的夹角（N·H）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        <strong>左：Phong</strong> 先求 L 关于法线 N 的反射方向 R，再看 R
        和观察方向 V 有多贴近（<code>R·V</code>）。<strong>右：Blinn</strong>{" "}
        不求反射，而是把 光线方向 L 和视线方向 V <strong>相加再归一化</strong>
        ，得到正好落在两者正中间的
        <strong>半程向量</strong> <code>H = normalize(L + V)</code>，改看 N 和 H
        有多贴近（<code>N·H</code>）。H 总在 L、V 之间，N 与 H 的夹角
        <strong>永不越界</strong>，这正是 Blinn 高光更平滑的根。
      </figcaption>
    </figure>
  );
}
