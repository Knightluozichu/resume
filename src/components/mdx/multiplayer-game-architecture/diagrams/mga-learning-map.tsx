/**
 * <MgaLearningMapDiagram>：多人在线游戏架构与开发实战 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="多人在线游戏架构与开发实战 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            多人在线游戏架构与开发实战 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            架构模型 → 状态同步 → 扩展伸缩 → 可靠性 → 总复习
          </text>

          <rect x="30" y="72" width="680" height="340" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：架构模型层 */}
          <rect x="50" y="92" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="150" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">C/S 架构模型</text>
          <text x="150" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">专服 / 世界服 / 大厅服</text>

          <rect x="270" y="92" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">微服务拆分</text>
          <text x="370" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">gRPC / 消息队列 / 服务发现</text>

          <rect x="490" y="92" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="590" y="113" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">全书学习地图</text>
          <text x="590" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">五阶段递进总览</text>

          {/* 箭头到第二排 */}
          <text x="150" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="164" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：状态同步层 */}
          <rect x="50" y="180" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="150" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">状态复制模型</text>
          <text x="150" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">权威服务器 / 客户端预测</text>

          <rect x="270" y="180" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">兴趣管理 AOI</text>
          <text x="370" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">九宫格 / 十字链表</text>

          <rect x="490" y="180" width="200" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="590" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">快照插值</text>
          <text x="590" y="217" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">远程玩家平滑渲染</text>

          {/* 第三排箭头 */}
          <text x="150" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="370" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="590" y="254" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三排：扩展伸缩层 */}
          <rect x="50" y="270" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="150" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">分片与分布式场景</text>
          <text x="150" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">边界迁移 / 跨片交互</text>

          <rect x="270" y="270" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">网关与代理层</text>
          <text x="370" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SSL 卸载 / 一致性哈希</text>

          <rect x="490" y="270" width="200" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="590" y="291" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">全书总复习</text>
          <text x="590" y="307" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">知识图谱串联</text>

          {/* 主线 */}
          <text x={VIEW_W / 2} y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            五阶段递进
          </text>
          <text x={VIEW_W / 2} y="370" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            架构模型（C/S/微服务） → 状态同步（复制/AOI）
          </text>
          <text x={VIEW_W / 2} y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 扩展伸缩（分片/网关） → 可靠性（容错/监控） → 总复习
          </text>

          <text x={VIEW_W / 2} y="412" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：从「服务怎么组织」到「万人同服怎么稳定运行」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        多人在线游戏架构与开发实战 全书学习地图——从架构模型到可靠性保障的五阶段进阶路径
      </figcaption>
    </figure>
  );
}
