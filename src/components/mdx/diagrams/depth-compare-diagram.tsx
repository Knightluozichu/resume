/**
 * <DepthCompareDiagram>：「高级光照·SSAO」§3「深度比较判遮蔽」小节的核心掰碎图（HEL-89，C 实战型，篇收官）。
 *
 * 把「深度比较判遮蔽」这件事画清楚：一个半球采样点 S 投影到屏幕、读出 G-buffer 在该屏幕位置存的
 * 表面深度 D；把 S 自己的深度和 D 比——
 *  - S 在那处真实表面「后面」（被挡，离相机更远）→ 这一点有实体把光挡住 → 遮蔽 +1（红）。
 *  - S 在那处真实表面「前面」（在空气里，离相机更近）→ 没东西挡 → 不计（绿）。
 * 关键直觉：SSAO 不去算真几何，而是借 G-buffer 已经存好的「每个屏幕像素最近表面深度」来近似判断
 * 采样点有没有被实体挡住——这正是「屏幕空间」三个字的来历。
 *
 * 同时画出「范围检查 range check」的伏笔：如果 G-buffer 那处表面离采样点特别远（深度差巨大），
 * 说明那是远处不相干的背景，不该算作遮蔽（误区里展开）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

export function DepthCompareDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 600 340"
          role="img"
          aria-label="深度比较判遮蔽示意，侧视图。相机在左侧。一条采样点投影到屏幕后，读出 G-buffer 在该屏幕位置存的真实表面深度。把采样点自己的深度和这个存下的表面深度相比：上面那个采样点落在真实表面后面、离相机比表面更远，说明前面有实体把它挡住了，这一点计入遮蔽。下面那个采样点落在真实表面前面、离相机比表面更近，说明它前面是空的没东西挡，不计入遮蔽。SSAO 不去重算真几何，而是借 G-buffer 已经存好的每个屏幕像素的最近表面深度来近似判断采样点有没有被挡，这就是屏幕空间的含义。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="ssao-depth-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          <text
            x="300"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            深度比较：采样点 vs G-buffer 存的该处表面深度
          </text>

          {/* 相机（左侧） */}
          <path
            d="M40 150 L78 128 L78 172 Z"
            fill="var(--accent)"
            opacity="0.85"
          />
          <text x="36" y="195" fontSize="10.5" fill="var(--text-secondary)">
            相机
          </text>
          {/* “越往右离相机越远”的深度轴 */}
          <line
            x1="90"
            y1="305"
            x2="560"
            y2="305"
            stroke="var(--text-secondary)"
            strokeWidth="1"
            markerEnd="url(#ssao-depth-arrow)"
            opacity="0.7"
          />
          <text
            x="300"
            y="324"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            深度（越往右 = 离相机越远）
          </text>

          {/* G-buffer 存的真实表面（一条起伏的实体表面，沿深度方向铺开） */}
          <path
            d="M150 250 Q260 120 360 175 T560 150 L560 290 L150 290 Z"
            fill="var(--border)"
            opacity="0.55"
          />
          <path
            d="M150 250 Q260 120 360 175 T560 150"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text x="392" y="138" fontSize="10.5" fill="var(--accent)">
            G-buffer 存的真实表面深度 D
          </text>

          {/* ===== 上：被挡的采样点 S₁（落在表面后面，比表面更远） ===== */}
          {/* 视线从相机射向 S₁ */}
          <line
            x1="78"
            y1="150"
            x2="300"
            y2="225"
            stroke="var(--danger)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.7"
          />
          <circle cx="300" cy="225" r="6" fill="var(--danger)" />
          <text
            x="312"
            y="223"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            S₁
          </text>
          <text x="312" y="240" fontSize="9.5" fill="var(--danger)">
            在表面后面（更远）= 被挡 → 遮蔽 +1
          </text>
          {/* 标出 S₁ 这一屏幕方向上、G-buffer 表面所在的点（更近，挡住了 S₁） */}
          <circle cx="248" cy="158" r="4" fill="var(--accent)" />

          {/* ===== 下：没挡的采样点 S₂（落在表面前面，比表面更近） ===== */}
          <line
            x1="78"
            y1="150"
            x2="430"
            y2="118"
            stroke="var(--success)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.7"
          />
          <circle cx="430" cy="118" r="6" fill="var(--success)" />
          <text
            x="442"
            y="116"
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            S₂
          </text>
          <text x="318" y="104" fontSize="9.5" fill="var(--success)">
            在表面前面（更近）= 没挡 → 不计
          </text>
          {/* 标出 S₂ 这一屏幕方向上、G-buffer 表面所在的点（更远，没挡到 S₂） */}
          <circle cx="468" cy="153" r="4" fill="var(--accent)" />

          {/* 底部一句话总括 */}
          <text
            x="300"
            y="296"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            采样点比该处表面更靠近相机 = 没被挡；更远 = 被前面的实体挡住了
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        把每个采样点投影到屏幕，读出 <strong>G-buffer</strong>
        在该处存的真实表面深度 D，再比一比：采样点{" "}
        <span style={{ color: "var(--danger)" }}>落在表面后面（更远）</span>
        说明前面有实体把它挡住，遮蔽 +1；
        <span style={{ color: "var(--success)" }}>落在表面前面（更近）</span>
        说明没东西挡，不计。SSAO 不重算真几何，只借 G-buffer
        已存好的深度近似判断——这就是「<strong>屏幕空间</strong>」三个字的由来。
      </figcaption>
    </figure>
  );
}
