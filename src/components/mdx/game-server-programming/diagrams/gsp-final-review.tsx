/**
 * <GspFinalReviewDiagram>：全书总复习知识地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GspFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习知识地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            网络游戏服务器端编程 知识地图总览
          </text>

          {/* 中心节点 */}
          <circle cx="370" cy="220" r="56" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="2" />
          <text x="370" y="215" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">游戏服务器</text>
          <text x="370" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">核心架构</text>

          {/* 外围节点 - 上 */}
          <rect x="290" y="56" width="160" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="76" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">网络基础</text>
          <text x="370" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Socket / 协议 / 序列化</text>
          <line x1="370" y1="100" x2="370" y2="164" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeOpacity="0.5" />

          {/* 右上 */}
          <rect x="540" y="100" width="160" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="620" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">服务器架构</text>
          <text x="620" y="134" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分服 / 跨服 / 网关</text>
          <line x1="540" y1="135" x2="426" y2="200" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeOpacity="0.5" />

          {/* 右下 */}
          <rect x="540" y="280" width="160" height="44" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="620" y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">线程模型</text>
          <text x="620" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IO / 逻辑 / 定时器</text>
          <line x1="540" y1="300" x2="426" y2="240" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeOpacity="0.5" />

          {/* 下 */}
          <rect x="290" y="336" width="160" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="356" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">数据与缓存</text>
          <text x="370" y="370" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">MySQL / Redis / 一致性</text>
          <line x1="370" y1="336" x2="370" y2="276" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeOpacity="0.5" />

          {/* 左下 */}
          <rect x="40" y="280" width="160" height="44" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="120" y="300" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">负载均衡</text>
          <text x="120" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">扩容 / 分流 / 哈希</text>
          <line x1="200" y1="300" x2="314" y2="240" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeOpacity="0.5" />

          {/* 左上 */}
          <rect x="40" y="100" width="160" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">安全反作弊</text>
          <text x="120" y="134" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">加密 / 校验 / 权威</text>
          <line x1="200" y1="135" x2="314" y2="200" stroke="var(--text-tertiary)" strokeWidth="1.2" strokeOpacity="0.5" />

          {/* 关键脉络 */}
          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            一条消息的旅程：Socket 收发 → 解包路由 → 逻辑处理 → 数据落盘 → 回包下发
          </text>
          <text x={VIEW_W / 2} y="426" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            每个环节都有对应的安全校验与性能优化——这是全书的主线
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识地图总览——六大主题围绕服务器核心架构，以「一条消息的旅程」串联全书
      </figcaption>
    </figure>
  );
}
