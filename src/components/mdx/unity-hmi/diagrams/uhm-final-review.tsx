/**
 * <UhmFinalReviewDiagram>：Unity for HMI 总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UhmFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity for HMI 总复习图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity for HMI 知识全景图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            核心三角：UI 是门面 · 数据是灵魂 · 性能是底线
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="580" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="124" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--success)">表现层（UI 是门面）</text>
          <text x="100" y="142" textAnchor="start" fontSize="11" fill="var(--text-secondary)">HMI 基础 → UI 框架 → 动画系统</text>
          <text x="560" y="134" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">用户看到什么</text>

          <text x={VIEW_W / 2} y="172" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr; 驱动 &darr;</text>

          <rect x="70" y="182" width="580" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="100" y="206" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--accent)">驱动层（数据是灵魂）</text>
          <text x="100" y="224" textAnchor="start" fontSize="11" fill="var(--text-secondary)">数据绑定 → 输入处理 → 多屏联动</text>
          <text x="560" y="216" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">UI 怎么变</text>

          <text x={VIEW_W / 2} y="254" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&uarr; 保障 &darr;</text>

          <rect x="70" y="264" width="580" height="56" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="100" y="288" textAnchor="start" fontSize="12" fontWeight="600" fill="var(--warning)">保障层（性能是底线）</text>
          <text x="100" y="306" textAnchor="start" fontSize="11" fill="var(--text-secondary)">性能优化 → 部署发布 → OTA</text>
          <text x="560" y="298" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">能否稳定跑</text>

          <text x={VIEW_W / 2} y="344" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            全链路：数据源 → 可观察属性 → 脏标记 → 帧末更新 → UI 渲染
          </text>
          <text x={VIEW_W / 2} y="362" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            安全约束：掉帧有兜底 · 数据错误有降级 · 崩溃有恢复
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity for HMI 知识全景图——核心三角与全链路回顾
      </figcaption>
    </figure>
  );
}
