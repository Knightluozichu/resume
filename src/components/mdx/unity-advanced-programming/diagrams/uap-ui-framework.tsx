/**
 * <UapUiFrameworkDiagram>：Unity UI 框架架构设计图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapUiFrameworkDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity UI 框架架构设计图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">UI 框架 MVP 分层与栈管理</text>
          <rect x="40" y="60" width="180" height="44" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="130" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">View（表现）</text>
          <text x="235" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="260" y="60" width="180" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="350" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Presenter（逻辑）</text>
          <text x="455" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="480" y="60" width="180" height="44" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="570" y="88" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Model（数据）</text>
          <text x="360" y="128" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">View 只渲染，Presenter 管逻辑，Model 持数据，反向走事件</text>
          <text x="360" y="160" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">UIManager 栈管理</text>
          <rect x="80" y="175" width="120" height="36" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="140" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Top 弹窗</text>
          <rect x="220" y="175" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="280" y="198" textAnchor="middle" fontSize="10" fill="var(--warning)">Dialog 对话框</text>
          <rect x="360" y="175" width="120" height="36" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="420" y="198" textAnchor="middle" fontSize="10" fill="var(--accent)">Panel 面板</text>
          <rect x="500" y="175" width="120" height="36" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="560" y="198" textAnchor="middle" fontSize="10" fill="var(--success)">HUD 常驻</text>
          <text x="360" y="240" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">性能三件套</text>
          <text x="360" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">动静分离（拆 Canvas）</text>
          <text x="360" y="280" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">对象池（列表 Item 复用）</text>
          <text x="360" y="298" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">虚拟滚动（只渲染可见 Item）</text>
          <rect x="120" y="320" width="180" height="36" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="210" y="343" textAnchor="middle" fontSize="10" fill="var(--success)">面板间走 EventBus</text>
          <rect x="420" y="320" width="180" height="36" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="510" y="343" textAnchor="middle" fontSize="10" fill="var(--warning)">不直接 FindObjectOfType</text>
          <text x="360" y="382" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">面板可独立开发、可复用、可测试</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        UI 框架架构——MVP 分层 + 栈管理 + 动静分离
      </figcaption>
    </figure>
  );
}
