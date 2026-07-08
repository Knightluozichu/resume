/**
 * <RtrGraphicsPipelineDiagram>：图形渲染管线图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrGraphicsPipelineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="图形渲染管线各阶段图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            图形渲染管线
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从顶点输入到最终像素的完整数据流
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Pipeline stages */}
          <rect x="60" y="110" width="100" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="110" y="135" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">顶点输入</text>
          <text x="110" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">VBO/VAO</text>

          <text x="175" y="145" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="190" y="110" width="100" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="240" y="135" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">顶点着色</text>
          <text x="240" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">变换/投影</text>

          <text x="305" y="145" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="320" y="110" width="100" height="60" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="135" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">光栅化</text>
          <text x="370" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">三角形→片段</text>

          <text x="435" y="145" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="450" y="110" width="100" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="500" y="135" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">片段着色</text>
          <text x="500" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">颜色计算</text>

          <text x="565" y="145" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="580" y="110" width="80" height="60" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="620" y="135" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">输出合并</text>
          <text x="620" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">深度/混合</text>

          {/* Data flow labels */}
          <text x="110" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">顶点数据</text>
          <text x="240" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">裁剪空间坐标</text>
          <text x="370" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">片段+属性</text>
          <text x="500" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">最终颜色</text>
          <text x="620" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">帧缓冲</text>

          {/* Key concepts */}
          <rect x="60" y="230" width="600" height="110" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="256" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">管线核心概念</text>
          <text x={VIEW_W / 2} y="280" textAnchor="middle" fontSize="11" fill="var(--text-primary)">1. 应用阶段（CPU）→ 几何阶段（GPU顶点处理）→ 光栅化阶段（GPU片段处理）</text>
          <text x={VIEW_W / 2} y="300" textAnchor="middle" fontSize="11" fill="var(--text-primary)">2. 可编程阶段：顶点着色器 + 片段着色器（核心可编程点）</text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-primary)">3. 固定功能阶段：光栅化、深度测试、混合（可配置不可编程）</text>
          <text x={VIEW_W / 2} y="340" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每秒60帧 = 每帧16.6ms 内走完整个管线</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        图形渲染管线——从顶点输入到帧缓冲输出的完整数据流
      </figcaption>
    </figure>
  );
}
