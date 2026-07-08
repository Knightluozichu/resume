/**
 * <VjpSsrSsgDiagram>：CSR / SSR / SSG 三种渲染模式对比图解。
 * 展示各自的数据流、首屏与 SEO 取舍，以及 Nuxt 的统一抽象。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VjpSsrSsgDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSR SSR SSG 三种渲染模式对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CSR vs SSR vs SSG：Vue 渲染模式对比
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            纯客户端渲染 / 服务端实时渲染 / 构建期静态生成，取舍首屏与 SEO
          </text>

          {/* CSR */}
          <rect x="30" y="68" width="220" height="320" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="140" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">CSR 客户端渲染</text>
          <text x="140" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SPA 默认模式</text>

          <rect x="45" y="124" width="190" height="34" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="140" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">请求空 HTML + JS</text>
          <rect x="45" y="164" width="190" height="34" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="140" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">下载并执行 JS bundle</text>
          <rect x="45" y="204" width="190" height="34" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="140" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">挂载后请求数据</text>
          <rect x="45" y="244" width="190" height="34" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="140" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">渲染页面</text>

          <text x="140" y="300" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">首屏慢 · SEO 弱</text>
          <text x="140" y="316" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">服务器压力小</text>
          <text x="140" y="332" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">交互体验顺滑</text>
          <text x="140" y="356" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">适用：后台管理</text>
          <text x="140" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">动态交互应用</text>

          {/* SSR */}
          <rect x="260" y="68" width="220" height="320" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="370" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">SSR 服务端渲染</text>
          <text x="370" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Nuxt ssr 模式</text>

          <rect x="275" y="124" width="190" height="34" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">请求到达服务器</text>
          <rect x="275" y="164" width="190" height="34" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">服务端取数据 + 渲染 HTML</text>
          <rect x="275" y="204" width="190" height="34" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">返回完整 HTML</text>
          <rect x="275" y="244" width="190" height="34" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="370" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">hydration 注水激活</text>

          <text x="370" y="300" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">首屏快 · SEO 强</text>
          <text x="370" y="316" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">服务器开销大</text>
          <text x="370" y="332" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">需注意 hydration 兼容</text>
          <text x="370" y="356" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">适用：内容站</text>
          <text x="370" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">电商 / 资讯</text>

          {/* SSG */}
          <rect x="490" y="68" width="220" height="320" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.4" />
          <text x="600" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">SSG 静态生成</text>
          <text x="600" y="110" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Nuxt generate</text>

          <rect x="505" y="124" width="190" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="146" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">构建期取数据</text>
          <rect x="505" y="164" width="190" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">预渲染成静态 HTML</text>
          <rect x="505" y="204" width="190" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">部署到 CDN</text>
          <rect x="505" y="244" width="190" height="34" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="600" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">访问即取静态文件</text>

          <text x="600" y="300" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">首屏极快 · SEO 强</text>
          <text x="600" y="316" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">服务器零运行时</text>
          <text x="600" y="332" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">内容更新需重新构建</text>
          <text x="600" y="356" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">适用：文档 / 博客</text>
          <text x="600" y="372" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">营销官网</text>

          <text x={VIEW_W / 2} y="412" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            Nuxt 用同一套组件代码，通过 nuxt.config 切换 ssr / generate / hybrid
          </text>
          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：渲染模式是「何时生成 HTML」的取舍，不是「换一门技术」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CSR / SSR / SSG 三种渲染模式对比——首屏、SEO、服务器开销的取舍
      </figcaption>
    </figure>
  );
}
