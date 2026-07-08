/**
 * <Gep1LearningMapDiagram>：游戏引擎原理与实践·卷1 全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function Gep1LearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏引擎原理与实践·卷1 全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏引擎原理与实践·卷1 全书学习地图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            架构 → 内存 → 数学 → 变换 → 渲染 → 资源 → 场景 → 事件
          </text>

          <rect x="30" y="76" width="680" height="320" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 第一排：核心框架 */}
          <rect x="50" y="96" width="140" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="120" y="117" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">引擎架构</text>
          <text x="120" y="133" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分层与模块</text>

          <rect x="210" y="96" width="140" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="280" y="117" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">内存系统</text>
          <text x="280" y="133" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">池化/栈分配</text>

          <rect x="370" y="96" width="140" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="440" y="117" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">数学库</text>
          <text x="440" y="133" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">向量/矩阵/四元数</text>

          <rect x="530" y="96" width="160" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="610" y="117" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">变换系统</text>
          <text x="610" y="133" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">层级与坐标空间</text>

          {/* 箭头到第二排 */}
          <text x="120" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="280" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="440" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>
          <text x="610" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二排：运行时系统 */}
          <rect x="50" y="184" width="140" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="120" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">渲染管线</text>
          <text x="120" y="221" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">阶段与绘制排序</text>

          <rect x="210" y="184" width="140" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="280" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">资源管理</text>
          <text x="280" y="221" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">引用计数/异步</text>

          <rect x="370" y="184" width="140" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="440" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">场景图</text>
          <text x="440" y="221" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">空间分割/剔除</text>

          <rect x="530" y="184" width="160" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="610" y="205" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">事件系统</text>
          <text x="610" y="221" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">消息分发</text>

          {/* 主线 */}
          <rect x="50" y="260" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="282" textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            核心主线：从「地基」到「能跑起来的运行时」
          </text>
          <text x={VIEW_W / 2} y="298" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            先打地基（内存/数学），再搭骨架（架构/变换），最后装器官（渲染/资源/场景/事件）
          </text>

          {/* 学习路径 */}
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            三阶段递进
          </text>
          <text x={VIEW_W / 2} y="358" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            地基层（架构/内存/数学/变换） → 运行时（渲染/资源）
          </text>
          <text x={VIEW_W / 2} y="376" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            → 组织与通信（场景图/事件） → 总复习
          </text>

          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：卷1 聚焦「基础框架」，回答引擎各模块「为什么这么设计」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏引擎原理与实践·卷1 全书学习地图——从地基到运行时的三阶段进阶路径
      </figcaption>
    </figure>
  );
}
