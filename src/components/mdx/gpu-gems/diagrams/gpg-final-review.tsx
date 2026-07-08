/**
 * <GpgFinalReviewDiagram>：GPU Gems 总复习思维导图。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GPU Gems 总复习思维导图"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            GPU Gems 总复习：知识脉络图
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            九大主题串联成「效果 → 技术 → 计算」的完整闭环
          </text>

          {/* 中心节点 */}
          <ellipse cx={VIEW_W / 2} cy="210" rx="90" ry="36" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={VIEW_W / 2} y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">GPU Gems</text>
          <text x={VIEW_W / 2} y="224" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">实战渲染宝典</text>

          {/* 左上 自然效果 */}
          <rect x="40" y="90" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="100" y="114" textAnchor="middle" fontSize="10" fill="var(--success)">自然效果</text>
          <line x1="160" y1="110" x2="360" y2="200" stroke="var(--success)" strokeWidth="1" opacity="0.4" />

          {/* 右上 光照阴影 */}
          <rect x="560" y="90" width="120" height="40" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="620" y="114" textAnchor="middle" fontSize="10" fill="var(--accent)">光照阴影</text>
          <line x1="560" y1="110" x2="390" y2="200" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />

          {/* 左中 材质着色器 */}
          <rect x="40" y="160" width="120" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="100" y="184" textAnchor="middle" fontSize="10" fill="var(--warning)">材质着色器</text>
          <line x1="160" y1="180" x2="360" y2="210" stroke="var(--warning)" strokeWidth="1" opacity="0.4" />

          {/* 右中 图像处理 */}
          <rect x="560" y="160" width="120" height="40" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="620" y="184" textAnchor="middle" fontSize="10" fill="var(--text-primary)">图像处理</text>
          <line x1="560" y1="180" x2="390" y2="210" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />

          {/* 左下 几何处理 */}
          <rect x="40" y="230" width="120" height="40" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="100" y="254" textAnchor="middle" fontSize="10" fill="var(--accent)">几何细分</text>
          <line x1="160" y1="250" x2="360" y2="220" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />

          {/* 右下 粒子物理 */}
          <rect x="560" y="230" width="120" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="254" textAnchor="middle" fontSize="10" fill="var(--success)">粒子物理</text>
          <line x1="560" y1="250" x2="390" y2="220" stroke="var(--success)" strokeWidth="1" opacity="0.4" />

          {/* 底部 GPU计算 + 高级技术 */}
          <rect x="200" y="300" width="130" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="265" y="324" textAnchor="middle" fontSize="10" fill="var(--warning)">GPU 计算</text>
          <line x1="300" y1="300" x2="350" y2="240" stroke="var(--warning)" strokeWidth="1" opacity="0.4" />

          <rect x="390" y="300" width="130" height="40" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="455" y="324" textAnchor="middle" fontSize="10" fill="var(--text-primary)">高级技术</text>
          <line x1="420" y1="300" x2="380" y2="240" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.4" />

          <text x={VIEW_W / 2} y="372" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">核心闭环：视觉效果（自然/光照）→ 表面表现（材质）→ 屏幕加工（图像）→ 几何与运动（细分/粒子）→ 计算基础（GPGPU）</text>
          <text x={VIEW_W / 2} y="390" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">复习策略：用「一个完整帧的渲染顺序」串联所有知识点</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GPU Gems 九大主题的知识脉络与串联关系
      </figcaption>
    </figure>
  );
}
