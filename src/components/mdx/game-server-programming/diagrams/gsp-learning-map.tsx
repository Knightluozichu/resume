/**
 * <GspLearningMapDiagram>：网络游戏服务器端编程 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function GspLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="网络游戏服务器端编程 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            网络游戏服务器端编程 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            网络 → 架构 → 线程 → 数据 → 扩展 → 总复习
          </text>

          <rect x="30" y="76" width="680" height="320" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：网络基础 */}
          <rect x="50" y="96" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="117" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">TCP Socket 编程</text>
          <text x="150" y="133" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">连接/收发/粘包</text>

          <rect x="270" y="96" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="117" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">协议设计</text>
          <text x="370" y="133" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">序列化/封包解包</text>

          <rect x="490" y="96" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="590" y="117" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">服务器架构</text>
          <text x="590" y="133" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分服/跨服/网关</text>

          {/* 箭头到第二排 */}
          <text x="150" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：服务器核心 */}
          <rect x="50" y="184" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">线程模型</text>
          <text x="150" y="221" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">IO/逻辑/定时器</text>

          <rect x="270" y="184" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">数据持久化</text>
          <text x="370" y="221" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">MySQL/Redis</text>

          <rect x="490" y="184" width="200" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="590" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">缓存策略</text>
          <text x="590" y="221" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">一致性与淘汰</text>

          {/* 第三排箭头 */}
          <text x="150" y="258" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="258" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="258" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：扩展与运维 */}
          <rect x="50" y="274" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="295" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">负载均衡</text>
          <text x="150" y="311" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扩容/分流</text>

          <rect x="270" y="274" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="295" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">安全与反作弊</text>
          <text x="370" y="311" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">加密/校验/检测</text>

          <rect x="490" y="274" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="590" y="295" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="590" y="311" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">知识串联</text>

          {/* 主线 */}
          <text x={VIEW_W / 2} y="352" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            四阶段递进
          </text>
          <text x={VIEW_W / 2} y="372" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            网络基础（Socket/协议） → 服务器核心（架构/线程/数据）
          </text>
          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 扩展运维（负载/安全） → 总复习
          </text>

          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「一个连接怎么收发」到「万台服务器怎么协同」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        网络游戏服务器端编程 全书学习地图——从网络基础到扩展运维的四阶段进阶路径
      </figcaption>
    </figure>
  );
}
