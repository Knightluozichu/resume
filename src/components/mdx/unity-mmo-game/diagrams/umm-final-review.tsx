/**
 * <UmmFinalReviewDiagram>：全书总复习知识图谱。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UmmFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity 3D 网游游戏实战 知识图谱
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            十章知识串联：一条玩家操作的完整旅程
          </text>

          {/* 中心节点 */}
          <circle cx={VIEW_W / 2} cy="230" r="50" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y="225" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">玩家操作</text>
          <text x={VIEW_W / 2} y="242" textAnchor="middle" fontSize="10" fill="var(--accent)">完整旅程</text>

          {/* 周围 10 个知识节点 */}
          {/* 1 网络客户端 */}
          <rect x="50" y="80" width="130" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">1. 网络客户端</text>
          <text x="115" y="115" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Protobuf / 连接</text>
          <line x1="180" y1="110" x2="335" y2="205" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 2 状态同步 */}
          <rect x="210" y="80" width="130" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="275" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">2. 同步策略</text>
          <text x="275" y="115" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">状态 vs 帧同步</text>
          <line x1="300" y1="124" x2="350" y2="185" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 3 角色系统 */}
          <rect x="370" y="80" width="130" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="435" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">3. 角色系统</text>
          <text x="435" y="115" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">创建 / 属性 / 装备</text>
          <line x1="410" y1="124" x2="390" y2="185" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 4 战斗系统 */}
          <rect x="530" y="80" width="130" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="595" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">4. 战斗系统</text>
          <text x="595" y="115" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">技能 / 伤害 / 范围</text>
          <line x1="565" y1="124" x2="420" y2="200" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 5 场景流式加载 */}
          <rect x="50" y="170" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="105" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">5. 场景流式</text>
          <text x="105" y="205" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SubScene</text>
          <line x1="160" y1="192" x2="325" y2="225" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 6 AOI */}
          <rect x="50" y="250" width="110" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="105" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">6. AOI</text>
          <text x="105" y="285" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">九宫格 / 链表</text>
          <line x1="160" y1="270" x2="325" y2="240" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 7 性能优化 */}
          <rect x="210" y="330" width="130" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="275" y="350" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">7. 性能优化</text>
          <text x="275" y="365" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">对象池 / 压缩</text>
          <line x1="330" y1="335" x2="360" y2="275" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 8 部署运维 */}
          <rect x="370" y="330" width="130" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="435" y="350" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">8. 部署运维</text>
          <text x="435" y="365" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分服 / 热更</text>
          <line x1="410" y1="330" x2="385" y2="278" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 9 客户端表现 */}
          <rect x="530" y="170" width="130" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="595" y="190" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">9. 客户端表现</text>
          <text x="595" y="205" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">渲染 / 动画 / 特效</text>
          <line x1="535" y1="200" x2="420" y2="225" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 10 反作弊 */}
          <rect x="530" y="250" width="130" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="595" y="270" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">10. 安全反作弊</text>
          <text x="595" y="285" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">服务器权威</text>
          <line x1="535" y1="265" x2="420" y2="240" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y="400" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">
            一条操作的旅程：客户端联网 → 同步策略 → 角色创建 → 战斗判定 → 场景加载 → AOI 广播 → 性能优化 → 运维部署
          </text>
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            每个环节都不是孤立的——改一处，上下游都要联动
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习知识图谱——十章知识围绕「一条玩家操作的完整旅程」串联
      </figcaption>
    </figure>
  );
}
