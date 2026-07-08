/**
 * <SxxPostProcessingDiagram>：后处理与图像效果图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function SxxPostProcessingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="后处理与图像效果图解" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">后处理与图像效果</text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">Bloom / DOF / Motion Blur / 色彩校正</text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="60" y="100" width="145" height="120" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="132" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">Bloom</text>
          <text x="132" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">泛光</text>
          <text x="132" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">流程：</text>
          <text x="132" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">亮区提取</text>
          <text x="132" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">高斯模糊</text>
          <text x="132" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">叠加原图</text>

          <rect x="220" y="100" width="145" height="120" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="292" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">DOF</text>
          <text x="292" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">景深</text>
          <text x="292" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">流程：</text>
          <text x="292" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">CoC 计算</text>
          <text x="292" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">散景模糊</text>
          <text x="292" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">按深度混合</text>

          <rect x="380" y="100" width="145" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">Motion Blur</text>
          <text x="452" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">运动模糊</text>
          <text x="452" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">流程：</text>
          <text x="452" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">速度纹理</text>
          <text x="452" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">方向模糊</text>
          <text x="452" y="214" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Velocity RT</text>

          <rect x="540" y="100" width="100" height="120" rx="8" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="590" y="124" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">色彩校正</text>
          <text x="590" y="144" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Color Grading</text>
          <text x="590" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">方法：</text>
          <text x="590" y="182" textAnchor="middle" fontSize="10" fill="var(--text-primary)">LUT 查找</text>
          <text x="590" y="198" textAnchor="middle" fontSize="10" fill="var(--text-primary)">HSV 调节</text>

          <rect x="60" y="250" width="600" height="90" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="274" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">后处理核心思想</text>
          <text x={VIEW_W / 2} y="294" textAnchor="middle" fontSize="11" fill="var(--text-primary)">全屏像素操作：输入 RT → Shader 处理 → 输出 RT（Blit）</text>
          <text x={VIEW_W / 2} y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">可分离滤波器：2D 卷积分解为两次 1D 卷积，采样数从 N^2 降到 2N</text>
          <text x={VIEW_W / 2} y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">降分辨率模糊：在 1/4 分辨率做模糊再上采样，大幅减少采样开销</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">后处理与图像效果——Bloom、DOF、Motion Blur 与色彩校正</figcaption>
    </figure>
  );
}
