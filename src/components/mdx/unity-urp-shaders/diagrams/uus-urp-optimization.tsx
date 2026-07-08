/**
 * <UusUrpOptimizationDiagram>：URP 性能优化图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UusUrpOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="URP 性能优化图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            URP 性能优化策略
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            合批 → 剔除 → 分辨率 → 纹理 → 着色器
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="145" height="80" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="132" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">SRP Batcher</text>
          <text x="132" y="142" textAnchor="middle" fontSize="10" fill="var(--text-primary)">同 Shader 合批</text>
          <text x="132" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">减少 SetPass</text>
          <text x="132" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">GPU Instancing 补充</text>

          <rect x="220" y="100" width="145" height="80" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="292" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">剔除优化</text>
          <text x="292" y="142" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Occlusion Culling</text>
          <text x="292" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Frustum Culling</text>
          <text x="292" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">LOD 多级切换</text>

          <rect x="380" y="100" width="145" height="80" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">渲染分辨率</text>
          <text x="452" y="142" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Render Scale &lt; 1</text>
          <text x="452" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">MSAA 降级</text>
          <text x="452" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">HDR 关闭（移动端）</text>

          <rect x="540" y="100" width="100" height="80" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="590" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">纹理</text>
          <text x="590" y="142" textAnchor="middle" fontSize="10" fill="var(--text-primary)">ASTC 压缩</text>
          <text x="590" y="158" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Mipmap</text>
          <text x="590" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Atlas 合图</text>

          <rect x="60" y="210" width="600" height="60" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Shader 变体控制</text>
          <text x={VIEW_W / 2} y="252" textAnchor="middle" fontSize="11" fill="var(--text-primary)">减少 Shader Keyword → 减少编译变体数 → 减少内存与加载时间</text>

          <rect x="60" y="290" width="290" height="60" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="205" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">移动端关键项</text>
          <text x="205" y="330" textAnchor="middle" fontSize="10" fill="var(--text-primary)">关闭实时 GI / 降阴影分辨率 / 简化后处理</text>

          <rect x="370" y="290" width="290" height="60" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="515" y="312" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Overdraw 控制</text>
          <text x="515" y="330" textAnchor="middle" fontSize="10" fill="var(--text-primary)">透明物体排序 / 减少全屏 Blit / 粒子合并</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        URP 性能优化策略——从合批到着色器变体全链路优化
      </figcaption>
    </figure>
  );
}
