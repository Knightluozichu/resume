/**
 * <NormalDecodeDiagram>：「高级光照·法线贴图」§3「从法线图采样要解码 [0,1]→[-1,1]」小节的核心掰碎图（HEL-84）。
 *
 * 把「法线图里存的 RGB(0~1) 要 *2-1 还原成法线(-1~1) 才能用」这件最易踩坑的事画清楚，分三栏：
 *  左栏「法线图里存的（RGB 0~1）」：一块偏蓝的色块（典型法线图就是这种蓝紫色），标出代表色
 *    RGB(0.5, 0.5, 1.0)——这是法线图最常见的底色。
 *  中栏「解码公式」：normal = texColor * 2.0 - 1.0，把 0~1 映射到 -1~1。
 *  右栏「解码后的法线（-1~1）」：还原出向量 (0, 0, 1)，画一根垂直朝外的箭头 = 正对表面外（不扰动）；
 *    旁边再给一例偏色 → 偏向某方向，说明偏色 = 法线被推歪 = 凹凸。
 *
 * 直觉落点：RGB(0.5,0.5,1.0) → (0,0,1) 是「不扰动、正对外」的基准；法线图里整片偏蓝正因为大部分点
 * 法线都接近 (0,0,1)。颜色一偏（某通道离 0.5），解码出的法线就被推向某方向，那里的光照就变了 = 凹凸。
 * 忘了 *2-1 直接拿 RGB 当法线（全是正数、且 z 恒为正），光照会全错、整片发蓝。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色用于文字/箭头/边框；色块本身（法线图的蓝紫底色、解码示意）
 * 是数据可视化的语义本体（呈现「法线图就是这种蓝」），非装饰魔法色，故用 rgb 直填（与 gamma 渐变条同理）。
 * 无阴影、rx 圆角（硬规则 5）。
 */

export function NormalDecodeDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 680 320"
          role="img"
          aria-label="法线图采样后解码的三栏图解。左栏是法线图里存的颜色，一块偏蓝紫的色块，代表色是 RGB 0.5、0.5、1.0，这是法线图最常见的底色，取值范围 0 到 1。中栏是解码公式：法线等于采样色乘 2 减 1，把 0 到 1 映射到负 1 到 1。右栏是解码后的法线，RGB 0.5、0.5、1.0 还原成向量 0、0、1，是一根垂直朝外的箭头，表示正对表面外、不扰动；另给一例颜色偏红时解码出的法线被推向某个方向，表示偏色等于法线被推歪、产生凹凸。忘记乘 2 减 1 直接把 0 到 1 的颜色当法线用，光照会全错、整片发蓝。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <defs>
            <marker
              id="nd-arrow-warning"
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
              id="nd-arrow-accent"
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
              id="nd-arrow-text"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          <text
            x="340"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            从法线图采样：要 *2-1 解码才是真法线
          </text>

          {/* ============ 左栏：法线图里存的 RGB(0~1) ============ */}
          <text
            x="110"
            y="70"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            法线图里存的（RGB 0~1）
          </text>
          {/* 偏蓝紫色块 = 典型法线图底色（RGB 0.5,0.5,1.0 的 8bit ≈ 128,128,255） */}
          <rect
            x="40"
            y="90"
            width="140"
            height="120"
            rx="6"
            fill="rgb(128,128,255)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="110"
            y="156"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="rgb(20,20,40)"
          >
            RGB(0.5, 0.5, 1.0)
          </text>
          <text
            x="110"
            y="232"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            法线图最常见的底色
          </text>

          {/* ============ 中栏：解码公式 ============ */}
          <line
            x1="190"
            y1="150"
            x2="248"
            y2="150"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#nd-arrow-text)"
          />
          <rect
            x="252"
            y="124"
            width="178"
            height="52"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.3"
          />
          <text
            x="341"
            y="148"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            normal =
          </text>
          <text
            x="341"
            y="166"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            texColor * 2.0 - 1.0
          </text>
          <text
            x="341"
            y="196"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            把 0~1 拉回 -1~1
          </text>
          <line
            x1="434"
            y1="150"
            x2="492"
            y2="150"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#nd-arrow-text)"
          />

          {/* ============ 右栏：解码后的法线（-1~1） ============ */}
          <text
            x="585"
            y="70"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            解码后的法线（-1~1）
          </text>
          {/* 基准：(0,0,1) 正对外，一根垂直朝外箭头（accent） */}
          <line
            x1="540"
            y1="200"
            x2="540"
            y2="110"
            stroke="var(--accent)"
            strokeWidth="2.8"
            markerEnd="url(#nd-arrow-accent)"
          />
          <circle cx="540" cy="200" r="3.5" fill="var(--text-primary)" />
          <text
            x="510"
            y="106"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            (0, 0, 1)
          </text>
          <text x="494" y="220" fontSize="9.5" fill="var(--text-secondary)">
            正对表面外·不扰动
          </text>

          {/* 偏色一例：颜色偏红 → 法线被推歪（warning），示意凹凸 */}
          <line
            x1="610"
            y1="200"
            x2="660"
            y2="128"
            stroke="var(--warning)"
            strokeWidth="2.5"
            markerEnd="url(#nd-arrow-warning)"
          />
          <circle cx="610" cy="200" r="3.5" fill="var(--text-primary)" />
          <text x="612" y="222" fontSize="9.5" fill="var(--warning)">
            偏色→歪
          </text>

          <text
            x="585"
            y="248"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            颜色一偏 = 法线被推歪 = 凹凸
          </text>

          {/* 底部警示：忘了 *2-1 的后果 */}
          <text
            x="340"
            y="296"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--warning)"
          >
            忘了 *2-1 直接拿 RGB 当法线 → 法线全是正数、z 恒正 →
            光照全错、整片发蓝
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        法线图里每个像素存的是 <code>normal * 0.5 + 0.5</code> 后的{" "}
        <strong>RGB（0~1）</strong>，用前必须{" "}
        <code>normal = texColor * 2.0 - 1.0</code> <strong>解码</strong>回真法线
        （-1~1）。基准色 <code>RGB(0.5, 0.5, 1.0)</code> 解出{" "}
        <code>(0, 0, 1)</code>——正对表面外、不扰动，这就是法线图
        <strong>整片偏蓝</strong>
        的原因；颜色一偏，法线就被推歪，那里便有了凹凸。
      </figcaption>
    </figure>
  );
}
