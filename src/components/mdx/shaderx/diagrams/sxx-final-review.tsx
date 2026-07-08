/**
 * <SxxFinalReviewDiagram>：ShaderX 总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="ShaderX 全书知识体系总复习"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            ShaderX 全书知识体系
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从顶点/像素着色器到性能优化的完整路径
          </text>

          {/* 基础层 */}
          <rect x="40" y="80" width="640" height="60" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">基础层：着色器编程基础</text>
          <text x="160" y="122" textAnchor="middle" fontSize="10" fill="var(--text-primary)">顶点着色器</text>
          <text x="360" y="122" textAnchor="middle" fontSize="10" fill="var(--text-primary)">像素着色器</text>
          <text x="560" y="122" textAnchor="middle" fontSize="10" fill="var(--text-primary)">光照模型</text>

          {/* 技术层 */}
          <rect x="40" y="160" width="640" height="60" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="360" y="180" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">技术层：核心渲染技术</text>
          <text x="160" y="202" textAnchor="middle" fontSize="10" fill="var(--text-primary)">阴影技术</text>
          <text x="360" y="202" textAnchor="middle" fontSize="10" fill="var(--text-primary)">后处理效果</text>
          <text x="560" y="202" textAnchor="middle" fontSize="10" fill="var(--text-primary)">环境渲染</text>

          {/* 高级层 */}
          <rect x="40" y="240" width="640" height="60" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="260" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">高级层：进阶与优化</text>
          <text x="240" y="282" textAnchor="middle" fontSize="10" fill="var(--text-primary)">程序化纹理</text>
          <text x="480" y="282" textAnchor="middle" fontSize="10" fill="var(--text-primary)">性能优化</text>

          {/* 连接箭头 */}
          <line x1="360" y1="140" x2="360" y2="160" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="360" y1="220" x2="360" y2="240" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="3,3" />

          {/* 总结 */}
          <rect x="120" y="320" width="480" height="50" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="342" textAnchor="middle" fontSize="11" fill="var(--text-primary)">核心思想：理解GPU并行架构，用最少的指令与带宽完成最丰富的视觉效果</text>
          <text x={VIEW_W / 2} y="360" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">从数学模型到工程优化，ShaderX 贯穿整个着色器开发链路</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ShaderX 全书知识体系——基础层、技术层与高级层的递进关系
      </figcaption>
    </figure>
  );
}
