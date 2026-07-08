/**
 * <UmmLearningMapDiagram>：Unity 3D 网游游戏实战 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UmmLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 3D 网游游戏实战 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity 3D 网游游戏实战 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            客户端网络 → 同步策略 → 玩法系统 → 世界管理 → 上线运维
          </text>

          <rect x="30" y="72" width="680" height="340" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：客户端网络层 */}
          <rect x="50" y="92" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">网络客户端架构</text>
          <text x="150" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Protobuf / 连接管理</text>

          <rect x="270" y="92" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">状态同步 vs 帧同步</text>
          <text x="370" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同步模式取舍</text>

          <rect x="490" y="92" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="590" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">角色系统</text>
          <text x="590" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">创建 / 属性 / 装备</text>

          {/* 箭头到第二排 */}
          <text x="150" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：玩法与世界 */}
          <rect x="50" y="180" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">战斗系统</text>
          <text x="150" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">技能 / 伤害 / 范围检测</text>

          <rect x="270" y="180" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">场景流式加载</text>
          <text x="370" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SubScene / Additive</text>

          <rect x="490" y="180" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">AOI 兴趣区域</text>
          <text x="590" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">九宫格 / 十字链表</text>

          {/* 第三排箭头 */}
          <text x="150" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：生产运维 */}
          <rect x="50" y="270" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">网游性能优化</text>
          <text x="150" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象池 / 网络压缩</text>

          <rect x="270" y="270" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">部署与运维</text>
          <text x="370" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分服 / 合服 / 热更</text>

          <rect x="490" y="270" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="590" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="590" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">知识串联</text>

          {/* 主线 */}
          <text x={VIEW_W / 2} y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            五阶段递进
          </text>
          <text x={VIEW_W / 2} y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            客户端网络（Protobuf/同步） → 玩法系统（角色/战斗）
          </text>
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 世界管理（场景/AOI） → 生产运维（优化/部署） → 总复习
          </text>

          <text x={VIEW_W / 2} y="412" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「一个客户端怎么联网」到「万人同服怎么扛住」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 3D 网游游戏实战 全书学习地图——从客户端网络到生产运维的五阶段进阶路径
      </figcaption>
    </figure>
  );
}
