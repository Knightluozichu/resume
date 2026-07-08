/**
 * <GsaFinalReviewDiagram>：全书总复习四层知识图谱图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习四层知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            四层架构金字塔：层层依赖，下层是上层基础
          </text>

          {/* 金字塔结构：从下到上 */}
          {/* 底层：架构层 */}
          <polygon points="120,400 620,400 560,340 180,340" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.4" />
          <text x="370" y="376" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">架构层（地基）</text>
          <text x="370" y="392" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">服务器拓扑 · Actor 模型</text>

          {/* 第二层：性能层 */}
          <polygon points="180,340 560,340 500,280 240,280" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="370" y="316" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">性能层</text>
          <text x="370" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">协程模型 · 内存池</text>

          {/* 第三层：数据层 */}
          <polygon points="240,280 500,280 450,220 290,220" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="370" y="256" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">数据层</text>
          <text x="370" y="272" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分库分表 · Redis 集群</text>

          {/* 顶层：运维层 */}
          <polygon points="290,220 450,220 410,160 330,160" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="370" y="196" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">运维层</text>
          <text x="370" y="212" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CI/CD · 压测</text>

          {/* 塔尖 */}
          <polygon points="330,160 410,160 370,120" fill="var(--text-primary)" fillOpacity="0.15" stroke="var(--text-primary)" strokeWidth="1.4" />
          <text x="370" y="146" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--text-primary)">稳上线</text>

          {/* 依赖箭头（向上） */}
          <line x1="650" y1="395" x2="650" y2="165" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <polygon points="646,167 650,159 654,167" fill="var(--text-tertiary)" />
          <text x="665" y="285" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" transform="rotate(-90 665 285)">依赖向上</text>

          {/* 左侧：每层目的 */}
          <text x="40" y="160" fontSize="10" fontWeight="600" fill="var(--danger)">运维层目的</text>
          <text x="40" y="174" fontSize="9" fill="var(--text-tertiary)">靠数据层容灾</text>
          <text x="40" y="186" fontSize="9" fill="var(--text-tertiary)">+ 性能层余量</text>

          <text x="40" y="226" fontSize="10" fontWeight="600" fill="var(--accent)">数据层目的</text>
          <text x="40" y="240" fontSize="9" fill="var(--text-tertiary)">靠性能层扛连接</text>
          <text x="40" y="252" fontSize="9" fill="var(--text-tertiary)">+ 架构层分流</text>

          <text x="40" y="292" fontSize="10" fontWeight="600" fill="var(--warning)">性能层目的</text>
          <text x="40" y="306" fontSize="9" fill="var(--text-tertiary)">靠架构层扩展</text>
          <text x="40" y="318" fontSize="9" fill="var(--text-tertiary)">+ 运维层弹性</text>

          <text x="40" y="358" fontSize="10" fontWeight="600" fill="var(--success)">架构层目的</text>
          <text x="40" y="372" fontSize="9" fill="var(--text-tertiary)">靠运维层扩容</text>
          <text x="40" y="384" fontSize="9" fill="var(--text-tertiary)">+ 数据层支撑</text>

          {/* 底部：系统级判断力 */}
          <rect x="30" y="416" width="680" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            系统级判断力：定位瓶颈在哪层 → 针对该层下手
          </text>
          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            木桶效应：性能取决于最慢的层，先测量再优化瓶颈层
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四层架构金字塔——架构→性能→数据→运维层层依赖，系统级判断力靠定位瓶颈层
      </figcaption>
    </figure>
  );
}
