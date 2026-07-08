/**
 * <UapArchDesignDiagram>：Unity 架构设计原则图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapArchDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 架构设计原则图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 项目分层架构</text>
          <rect x="160" y="60" width="400" height="48" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="90" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">表现层 View（MonoBehaviour）</text>
          <text x="360" y="124" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">只渲染 + 转发输入，不含逻辑</text>
          <text x="360" y="142" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 依赖向下</text>
          <rect x="160" y="155" width="400" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="185" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">逻辑层 Controller / Service</text>
          <text x="360" y="219" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">处理交互逻辑，纯 C# 可测试</text>
          <text x="360" y="237" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 依赖向下</text>
          <rect x="160" y="250" width="400" height="48" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="280" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">领域层 Domain / Model</text>
          <text x="360" y="314" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">持数据，变化时发事件通知上层</text>
          <text x="360" y="332" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 依赖向下</text>
          <rect x="160" y="345" width="400" height="40" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="360" y="370" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-tertiary)">基础设施层 Data / Network / Pool</text>
          <text x="590" y="90" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">&larr; 事件回传</text>
          <text x="590" y="185" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">&larr; 事件回传</text>
          <text x="590" y="280" textAnchor="start" fontSize="9" fill="var(--text-tertiary)">&larr; 事件回传</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 分层架构——依赖单向向下，反向走事件
      </figcaption>
    </figure>
  );
}
