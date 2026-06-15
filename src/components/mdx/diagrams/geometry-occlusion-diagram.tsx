/**
 * <GeometryOcclusionDiagram>：「PBR·理论」§3.6「几何函数 G」小节配图（HEL-162，B 数学型）。
 *
 * 两栏对照微表面的两种自遮蔽：
 *  左栏「遮蔽 (Masking)」：观察方向 V 被邻近微面挡住（看不到那块微面的反射光）。
 *  右栏「阴影 (Shadowing)」：光线方向 L 被邻近微面挡住（光照不到那块微面）。
 * Smith 方法把两者各算一遍再乘起来：G = G_sub(n,v,k) * G_sub(n,l,k)。
 *
 * Server Component（纯展示静态 SVG）。
 * 视觉语言：token 色 var(--accent/--success/--warning/--danger/--border/--bg/--bg-elevated/--text-primary/--text-secondary)。
 */

export function GeometryOcclusionDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 700 310"
          role="img"
          aria-label="几何遮蔽函数 G 的两种遮挡。左栏遮蔽 Masking：观察者从侧面看，眼睛方向 V 被右边凸起的邻近微面挡住，看不到左边那块微面反射的光。右栏阴影 Shadowing：光从侧面射入，光线方向 L 被左边凸起的邻近微面挡住，光照不到右边那块微面。Smith 方法对这两种遮挡分别算 G_sub 再相乘得到总的几何项 G。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          <defs>
            <marker
              id="geo-arrow-accent"
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
              id="geo-arrow-warning"
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
              id="geo-arrow-danger"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x="350"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            几何函数 G：微面自遮蔽的两种来源
          </text>

          {/* ============ 左栏：遮蔽 Masking ============ */}
          <text
            x="175"
            y="56"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--danger)"
          >
            遮蔽 (Masking)
          </text>
          <text
            x="175"
            y="74"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            观察方向 V 被邻面挡住
          </text>

          {/* 微面地形 */}
          <polyline
            points="40,210 80,210 110,170 140,210 170,180 200,210 230,160 260,210 300,210"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* 被挡的微面（高亮标红） */}
          <line
            x1="110"
            y1="170"
            x2="140"
            y2="210"
            stroke="var(--danger)"
            strokeWidth="3"
          />

          {/* 遮挡的微面（高亮） */}
          <line
            x1="170"
            y1="180"
            x2="200"
            y2="210"
            stroke="var(--text-secondary)"
            strokeWidth="3"
          />

          {/* 观察方向 V（被挡） */}
          <line
            x1="120"
            y1="190"
            x2="230"
            y2="100"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.5"
          />
          {/* V 的可见部分 */}
          <line
            x1="185"
            y1="145"
            x2="260"
            y2="95"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#geo-arrow-accent)"
          />
          <text x="262" y="92" fontSize="11" fontWeight="600" fill="var(--accent)">
            V（被挡）
          </text>

          {/* 叉号标记遮挡点 */}
          <text
            x="180"
            y="148"
            fontSize="16"
            fontWeight="700"
            fill="var(--danger)"
          >
            X
          </text>

          {/* 说明 */}
          <text
            x="175"
            y="240"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            反射光被发出但看不见
          </text>

          {/* 分隔线 */}
          <line
            x1="350"
            y1="46"
            x2="350"
            y2="260"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ============ 右栏：阴影 Shadowing ============ */}
          <text
            x="525"
            y="56"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--danger)"
          >
            阴影 (Shadowing)
          </text>
          <text
            x="525"
            y="74"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            光线方向 L 被邻面挡住
          </text>

          {/* 微面地形 */}
          <polyline
            points="390,210 430,210 460,160 490,210 520,180 550,210 580,170 610,210 650,210"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* 被阴影的微面 */}
          <line
            x1="580"
            y1="170"
            x2="610"
            y2="210"
            stroke="var(--danger)"
            strokeWidth="3"
          />

          {/* 遮挡的微面 */}
          <line
            x1="520"
            y1="180"
            x2="550"
            y2="210"
            stroke="var(--text-secondary)"
            strokeWidth="3"
          />

          {/* 光线 L（被挡） */}
          <line
            x1="395"
            y1="95"
            x2="530"
            y2="145"
            stroke="var(--warning)"
            strokeWidth="2"
            markerEnd="url(#geo-arrow-warning)"
          />
          <line
            x1="530"
            y1="145"
            x2="590"
            y2="170"
            stroke="var(--warning)"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.5"
          />
          <text x="396" y="90" fontSize="11" fontWeight="600" fill="var(--warning)">
            L（被挡）
          </text>

          {/* 叉号标记遮挡点 */}
          <text
            x="525"
            y="148"
            fontSize="16"
            fontWeight="700"
            fill="var(--danger)"
          >
            X
          </text>

          {/* 说明 */}
          <text
            x="525"
            y="240"
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            光照不到这块微面
          </text>

          {/* ============ 底部 Smith 公式 ============ */}
          <rect
            x="110"
            y="264"
            width="480"
            height="36"
            rx="8"
            fill="var(--accent)"
            opacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <text
            x="350"
            y="288"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Smith: G(n,v,l,k) = G_sub(n,v,k) . G_sub(n,l,k) —— 观察遮蔽 x 光线遮蔽
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        微面自遮蔽有两种来源：遮蔽（观察方向被挡、看不到反射光）和阴影（光线被挡、照不到微面）。Smith 方法对两者各算一遍再相乘。
      </figcaption>
    </figure>
  );
}
