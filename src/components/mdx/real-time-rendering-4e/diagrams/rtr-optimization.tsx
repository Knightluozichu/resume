/**
 * <RtrOptimizationDiagram>：渲染优化与加速图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function RtrOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="渲染优化与加速技术图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            渲染优化与加速
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            剔除→合批→LOD→带宽优化
          </text>

          <rect x="40" y="80" width="640" height="280" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* Optimization pipeline */}
          <rect x="55" y="105" width="140" height="90" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="125" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">1. 剔除</text>
          <text x="125" y="148" textAnchor="middle" fontSize="9" fill="var(--text-primary)">视锥剔除</text>
          <text x="125" y="164" textAnchor="middle" fontSize="9" fill="var(--text-primary)">遮挡剔除</text>
          <text x="125" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">背面剔除</text>

          <text x="205" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="220" y="105" width="140" height="90" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="290" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">2. 合批</text>
          <text x="290" y="148" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Draw Call合并</text>
          <text x="290" y="164" textAnchor="middle" fontSize="9" fill="var(--text-primary)">Instancing</text>
          <text x="290" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SR Batcher</text>

          <text x="370" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="385" y="105" width="140" height="90" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="455" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">3. LOD</text>
          <text x="455" y="148" textAnchor="middle" fontSize="9" fill="var(--text-primary)">细节层次</text>
          <text x="455" y="164" textAnchor="middle" fontSize="9" fill="var(--text-primary)">距离切换模型</text>
          <text x="455" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Mesh LOD / Shader LOD</text>

          <text x="535" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="550" y="105" width="110" height="90" rx="8" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="605" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">4. 带宽</text>
          <text x="605" y="148" textAnchor="middle" fontSize="9" fill="var(--text-primary)">纹理压缩</text>
          <text x="605" y="164" textAnchor="middle" fontSize="9" fill="var(--text-primary)">G-Buffer优化</text>
          <text x="605" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">延迟vs前向</text>

          {/* Acceleration structures */}
          <rect x="55" y="220" width="290" height="60" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="242" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">空间加速结构</text>
          <text x="200" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">BVH / KD-Tree / 八叉树 — 快速剔除不可见物体</text>

          <rect x="375" y="220" width="285" height="60" rx="8" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1" />
          <text x="517" y="242" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">GPU 带宽优化</text>
          <text x="517" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">合批减DrawCall，压缩减显存，LOD减三角形</text>

          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            性能公式：帧时间 = CPU提交 + GPU绘制 + 带宽传输
          </text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            先Profile再优化：80%的性能问题来自20%的代码
          </text>
          <text x={VIEW_W / 2} y="348" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Draw Call是CPU瓶颈，三角形数是GPU瓶颈，纹理是带宽瓶颈
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渲染优化与加速——剔除、合批、LOD、带宽优化的完整流程
      </figcaption>
    </figure>
  );
}
