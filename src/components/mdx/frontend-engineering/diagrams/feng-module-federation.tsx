/**
 * <FengModuleFederationDiagram>：模块联邦与微前端架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengModuleFederationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模块联邦与微前端架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            模块联邦：运行时共享与微前端集成
          </text>

          {/* Host 应用 */}
          <rect x="40" y="52" width="300" height="120" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="190" y="74" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">Host（宿主应用）</text>
          <text x="190" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">webpack.config: remotes 指向远端</text>
          <rect x="60" y="104" width="120" height="28" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="120" y="122" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Shell / 布局</text>
          <rect x="200" y="104" width="120" height="28" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="260" y="122" textAnchor="middle" fontSize="10" fill="var(--text-primary)">路由调度</text>
          <text x="190" y="154" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">运行时拉取 remoteEntry.js</text>

          {/* Remote A */}
          <rect x="400" y="52" width="150" height="120" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.4" />
          <text x="475" y="74" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">Remote A</text>
          <text x="475" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">exposes: 暴露模块</text>
          <rect x="415" y="104" width="120" height="28" rx="5" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="475" y="122" textAnchor="middle" fontSize="10" fill="var(--text-primary)">商品列表</text>
          <text x="475" y="154" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">独立部署 / 独立构建</text>

          {/* Remote B */}
          <rect x="570" y="52" width="150" height="120" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="645" y="74" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">Remote B</text>
          <text x="645" y="92" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">exposes: 暴露模块</text>
          <rect x="585" y="104" width="120" height="28" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="645" y="122" textAnchor="middle" fontSize="10" fill="var(--text-primary)">用户中心</text>
          <text x="645" y="154" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">独立部署 / 独立构建</text>

          {/* 连线 Host → Remotes */}
          <line x1="340" y1="100" x2="400" y2="100" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="340" y1="120" x2="570" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* 中间层：运行时加载 */}
          <rect x="120" y="196" width="500" height="44" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="370" y="214" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">运行时加载层</text>
          <text x="370" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">import(remoteEntry.js) → 异步加载共享模块 → 注入 Host</text>

          <line x1="190" y1="172" x2="250" y2="196" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="475" y1="172" x2="370" y2="196" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="645" y1="172" x2="490" y2="196" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />

          {/* 共享依赖 */}
          <rect x="120" y="260" width="500" height="44" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="278" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">shared 依赖共享</text>
          <text x="370" y="294" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">react / vue 等公共库只加载一次，版本协商取可用版本</text>

          {/* 底部对比：qiankun vs Module Federation */}
          <rect x="40" y="324" width="320" height="110" rx="10" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="200" y="346" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">qiankun（JS 沙箱）</text>
          <text x="60" y="366" fontSize="10" fill="var(--text-secondary)">- 基于 single-spa，HTML entry 加载</text>
          <text x="60" y="382" fontSize="10" fill="var(--text-secondary)">- Proxy 沙箱隔离全局变量</text>
          <text x="60" y="398" fontSize="10" fill="var(--text-secondary)">- 子应用独立完整生命周期</text>
          <text x="60" y="414" fontSize="10" fill="var(--text-secondary)">- 适合异构技术栈拆分</text>

          <rect x="380" y="324" width="320" height="110" rx="10" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="540" y="346" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">Module Federation</text>
          <text x="400" y="366" fontSize="10" fill="var(--text-secondary)">- 构建产物级共享，粒度到模块</text>
          <text x="400" y="382" fontSize="10" fill="var(--text-secondary)">- shared 自动去重与版本协商</text>
          <text x="400" y="398" fontSize="10" fill="var(--text-secondary)">- 无沙箱，同技术栈最佳</text>
          <text x="400" y="414" fontSize="10" fill="var(--text-secondary)">- Webpack5 原生支持</text>

          <text x={VIEW_W / 2} y="452" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            核心区别：qiankun 隔离子应用，MF 共享模块
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模块联邦与微前端架构——Host 运行时拉取 Remote 模块、shared 依赖共享与 qiankun 沙箱对比
      </figcaption>
    </figure>
  );
}
