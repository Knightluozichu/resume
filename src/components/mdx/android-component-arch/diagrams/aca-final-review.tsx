/**
 * <AcaFinalReviewDiagram>：全书复习——知识图谱与选型矩阵图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function AcaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书知识图谱与选型矩阵图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Android组件化架构——知识图谱
          </text>

          {/* 中心节点 */}
          <circle cx="370" cy="270" r="50" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="266" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">组件化</text>
          <text x="370" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">架构</text>

          {/* 6个分支节点 */}
          {/* 架构设计 - 左上 */}
          <rect x="60" y="60" width="160" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="140" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">架构设计</text>
          <text x="140" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">五层分层 / 壳工程</text>
          <text x="140" y="110" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">common-core / common-biz</text>
          <line x1="200" y1="116" x2="330" y2="240" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 路由与导航 - 右上 */}
          <rect x="520" y="60" width="160" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="82" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">路由与导航</text>
          <text x="600" y="98" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ARouter / APT</text>
          <text x="600" y="110" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">页面跳转 / 服务发现</text>
          <line x1="540" y1="116" x2="410" y2="240" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 组件通信 - 左中 */}
          <rect x="20" y="240" width="160" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="100" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">组件通信</text>
          <text x="100" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">接口下沉 / 事件总线</text>
          <text x="100" y="290" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ARouter Provider</text>
          <line x1="180" y1="268" x2="320" y2="270" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 依赖注入 - 右中 */}
          <rect x="560" y="240" width="160" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="640" y="262" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">依赖注入</text>
          <text x="640" y="278" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Dagger2 / Hilt</text>
          <text x="640" y="290" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">@Inject / @Component</text>
          <line x1="560" y1="268" x2="420" y2="270" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 生命周期 - 左下 */}
          <rect x="60" y="420" width="160" height="56" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="140" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">生命周期</text>
          <text x="140" y="458" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Activity 计数</text>
          <text x="140" y="470" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SPI 前后台分发</text>
          <line x1="200" y1="420" x2="330" y2="300" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 构建部署 - 右下 */}
          <rect x="520" y="420" width="160" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="600" y="442" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">构建部署</text>
          <text x="600" y="458" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">多模块 / 变体</text>
          <text x="600" y="470" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">集成 / 独立模式</text>
          <line x1="540" y1="420" x2="410" y2="300" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 底部：选型矩阵 */}
          <rect x="30" y="492" width="680" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="514" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            选型矩阵：路由选ARouter | 通信选接口下沉+Provider | DI选Dagger2 | 公共层按需拆分
          </text>
          <text x="370" y="528" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">
            小项目轻量 | 中项目分层 | 大项目全量组件化+插件化
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识图谱——六大核心主题围绕组件化架构，附选型矩阵指导不同规模项目的技术选型
      </figcaption>
    </figure>
  );
}
