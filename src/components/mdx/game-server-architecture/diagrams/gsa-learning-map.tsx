/**
 * <GsaLearningMapDiagram>：游戏服务器架构与优化 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏服务器架构与优化 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏服务器架构与优化 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            架构层 → 性能层 → 数据层 → 运维层 → 总复习
          </text>

          <rect x="30" y="64" width="680" height="376" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：架构层 */}
          <rect x="50" y="82" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="205" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">架构层</text>
          <text x="205" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">服务器拓扑（网关→逻辑→DB）</text>
          <text x="205" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Actor 模型（消息驱动）</text>

          <rect x="380" y="82" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="104" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">全书学习地图</text>
          <text x="535" y="122" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四阶段递进总览</text>
          <text x="535" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一次登录的完整服务端旅程</text>

          {/* 箭头 */}
          <text x="205" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="160" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：性能层 */}
          <rect x="50" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="205" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">性能层</text>
          <text x="205" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">协程模型（有栈/无栈异步）</text>
          <text x="205" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内存池（对象池复用）</text>

          <rect x="380" y="174" width="310" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="535" y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">性能层目标</text>
          <text x="535" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">能并发：单机扛万级连接</text>
          <text x="535" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">不浪费：高频对象零 malloc</text>

          <text x="205" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="252" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：数据层 */}
          <rect x="50" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">数据层</text>
          <text x="205" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分库分表（一致性哈希分片）</text>
          <text x="205" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Redis 集群（缓存与一致性）</text>

          <rect x="380" y="266" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="535" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">数据层目标</text>
          <text x="535" y="306" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">存得下：百万玩家分片存储</text>
          <text x="535" y="318" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">读得快：缓存命中率 99%+</text>

          <text x="205" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="535" y="344" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四排：运维层 */}
          <rect x="50" y="358" width="310" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="205" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">运维层</text>
          <text x="205" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CI/CD（金丝雀灰度发布）</text>
          <text x="205" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">容量压测（Little&apos;s Law）</text>

          <rect x="380" y="358" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="535" y="380" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="535" y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">四层知识图谱串联</text>
          <text x="535" y="410" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">系统级工程判断力</text>

          <text x={VIEW_W / 2} y="436" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「能扩展」到「稳上线」的四层进阶
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏服务器架构与优化 全书学习地图——架构、性能、数据、运维四阶段递进路径
      </figcaption>
    </figure>
  );
}
