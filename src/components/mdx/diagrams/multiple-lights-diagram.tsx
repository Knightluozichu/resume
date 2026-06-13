/**
 * <MultipleLightsDiagram>：「多光源」§3 核心掰碎图（HEL-55，C 实战型，光照篇收官）。
 *
 * 把本章唯一的新观念画清楚——「每个光独立算出自己的贡献，最后把这些贡献相加得最终色」：
 *  左侧三盏光各占一行，各自是一个独立的「计算盒子」（函数）：
 *    · 平行光 CalcDirLight   → 贡献 1（一束方向恒定的光）
 *    · 点光源 CalcPointLight → 贡献 2（一个有位置、按距离衰减的灯泡）
 *    · 聚光   CalcSpotLight  → 贡献 3（一个有锥形光束的手电）
 *  每个盒子都吃同一个片段（同一个表面点）、各算各的，互不打架。
 *  中间用三条箭头把三份贡献汇到一个「∑ 相加」节点，
 *  右侧输出最终片段颜色 result = 贡献1 + 贡献2 + 贡献3。
 *
 * 语义三句：①每类光是一个独立函数（计算盒子）；②每个函数返回「这盏光对这块表面的颜色贡献」；
 * ③把所有贡献相加 = 这块表面的最终颜色（漏加 = 只显其中一盏，这是本章头号坑）。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。
 */

export function MultipleLightsDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 340"
          role="img"
          aria-label="多光源叠加示意。左侧三盏光各是一个独立的计算函数：平行光 CalcDirLight 算出贡献一，点光源 CalcPointLight 算出贡献二，聚光 CalcSpotLight 算出贡献三。三盏光各算各的、互不影响。三份贡献用箭头汇入中间的求和节点相加，右侧输出这块表面的最终颜色，等于贡献一加贡献二加贡献三。强调每个光独立计算、结果累加。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <defs>
            <marker
              id="ml-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* 顶部标题 */}
          <text
            x="330"
            y="26"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            每个光独立算出自己的贡献 → 全部相加 = 最终色
          </text>

          {/* ====== 左侧：三盏光，各是一个独立「计算盒子」（函数） ====== */}

          {/* —— 平行光 CalcDirLight（success 绿）—— */}
          <rect
            x="30"
            y="56"
            width="190"
            height="62"
            rx="8"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          {/* 平行光图标：一组平行斜线 */}
          <line
            x1="46"
            y1="74"
            x2="62"
            y2="90"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <line
            x1="54"
            y1="74"
            x2="70"
            y2="90"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <line
            x1="62"
            y1="74"
            x2="78"
            y2="90"
            stroke="var(--success)"
            strokeWidth="1.5"
          />
          <text
            x="92"
            y="80"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            平行光
          </text>
          <text x="92" y="98" fontSize="11" fill="var(--text-secondary)">
            CalcDirLight()
          </text>
          <text x="46" y="112" fontSize="10" fill="var(--success)">
            → 贡献 1
          </text>

          {/* —— 点光源 CalcPointLight（warning 黄）—— */}
          <rect
            x="30"
            y="138"
            width="190"
            height="62"
            rx="8"
            fill="var(--bg)"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          {/* 点光源图标：一个圆 + 四向短线（灯泡向外发光） */}
          <circle
            cx="60"
            cy="166"
            r="8"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <line
            x1="60"
            y1="150"
            x2="60"
            y2="156"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <line
            x1="60"
            y1="176"
            x2="60"
            y2="182"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <line
            x1="44"
            y1="166"
            x2="50"
            y2="166"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <line
            x1="70"
            y1="166"
            x2="76"
            y2="166"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text
            x="92"
            y="162"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            点光源
          </text>
          <text x="92" y="180" fontSize="11" fill="var(--text-secondary)">
            CalcPointLight()
          </text>
          <text x="46" y="194" fontSize="10" fill="var(--warning)">
            → 贡献 2
          </text>

          {/* —— 聚光 CalcSpotLight（danger 红）—— */}
          <rect
            x="30"
            y="220"
            width="190"
            height="62"
            rx="8"
            fill="var(--bg)"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          {/* 聚光图标：一个锥形光束 */}
          <path
            d="M50 244 L74 236 L74 256 Z"
            fill="none"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <line
            x1="74"
            y1="240"
            x2="84"
            y2="237"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <line
            x1="74"
            y1="252"
            x2="84"
            y2="255"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <text
            x="92"
            y="244"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            聚光
          </text>
          <text x="92" y="262" fontSize="11" fill="var(--text-secondary)">
            CalcSpotLight()
          </text>
          <text x="46" y="276" fontSize="10" fill="var(--danger)">
            → 贡献 3
          </text>

          {/* 左侧一句旁注 */}
          <text
            x="125"
            y="306"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            三盏光各算各的，互不影响
          </text>

          {/* ====== 中间：三条贡献箭头汇入求和节点 ====== */}
          <path
            d="M220 87 C 270 87, 280 150, 322 158"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#ml-arrow)"
          />
          <path
            d="M220 169 L 318 169"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#ml-arrow)"
          />
          <path
            d="M220 251 C 270 251, 280 188, 322 180"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#ml-arrow)"
          />

          {/* 求和节点 ∑ */}
          <circle
            cx="350"
            cy="169"
            r="30"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="350"
            y="178"
            textAnchor="middle"
            fontSize="28"
            fontWeight="700"
            fill="var(--accent)"
          >
            ∑
          </text>
          <text
            x="350"
            y="216"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            相加
          </text>

          {/* ====== 右侧：输出最终片段颜色 ====== */}
          <path
            d="M380 169 L 452 169"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#ml-arrow)"
          />

          <rect
            x="456"
            y="132"
            width="174"
            height="74"
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="543"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            这块表面的最终色
          </text>
          <text
            x="543"
            y="180"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            result =
          </text>
          <text
            x="543"
            y="196"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            贡献1 + 贡献2 + 贡献3
          </text>

          {/* 底部一句话总括 */}
          <text
            x="330"
            y="328"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            本章没有新数学，只有「函数化 + 把贡献累加」这一招代码组织
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        多光源的全部秘密：把每一类光的 Phong
        计算各封装成一个函数，每个函数返回「这盏光对这块表面的颜色贡献」； main
        里让每盏光各算各的，再把所有贡献<strong>相加</strong>
        ，就是这块表面的最终颜色。
        漏掉某盏的「加」，画面就只显出其中一盏——这是本章头号坑。
      </figcaption>
    </figure>
  );
}
