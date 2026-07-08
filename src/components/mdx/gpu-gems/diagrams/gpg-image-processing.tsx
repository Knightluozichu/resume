/**
 * <GpgImageProcessingDiagram>：GPU Gems 图像处理与后处理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GpgImageProcessingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="图像处理与后处理：后处理管线流程"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            后处理管线：从渲染目标到最终画面
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            每个 Pass 读上一帧的纹理，写入新的渲染目标
          </text>

          {/* 原始场景 */}
          <rect x="30" y="90" width="110" height="70" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="85" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">场景渲染</text>
          <text x="85" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HDR 颜色</text>
          <text x="85" y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">+ 深度</text>

          {/* 降采样 */}
          <rect x="170" y="90" width="110" height="70" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="225" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">亮度提取</text>
          <text x="225" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">降采样 1x1</text>
          <text x="225" y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">计算平均亮度</text>

          {/* Bloom */}
          <rect x="310" y="90" width="110" height="70" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="365" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Bloom</text>
          <text x="365" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">高光提取</text>
          <text x="365" y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">高斯模糊叠加</text>

          {/* Tone Mapping */}
          <rect x="450" y="90" width="110" height="70" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="505" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">色调映射</text>
          <text x="505" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HDR → LDR</text>
          <text x="505" y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Reinhard/ACES</text>

          {/* 最终 */}
          <rect x="590" y="90" width="110" height="70" rx="8" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1.2" />
          <text x="645" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">最终输出</text>
          <text x="645" y="138" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LDR + Gamma</text>
          <text x="645" y="152" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">显示器</text>

          {/* 箭头 */}
          <text x="155" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="295" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="435" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="575" y="128" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* Bloom 细节 */}
          <rect x="40" y="200" width="640" height="170" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="226" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Bloom 的多级降采样（Mip Pyramid）</text>

          <rect x="70" y="250" width="120" height="50" rx="6" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="278" textAnchor="middle" fontSize="10" fill="var(--text-primary)">原始 1:1</text>

          <rect x="210" y="250" width="80" height="50" rx="6" fill="var(--warning)" fillOpacity="0.25" stroke="var(--warning)" strokeWidth="1" />
          <text x="250" y="278" textAnchor="middle" fontSize="10" fill="var(--text-primary)">1/2</text>

          <rect x="310" y="250" width="55" height="50" rx="6" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1" />
          <text x="337" y="278" textAnchor="middle" fontSize="10" fill="var(--text-primary)">1/4</text>

          <rect x="385" y="250" width="40" height="50" rx="6" fill="var(--warning)" fillOpacity="0.35" stroke="var(--warning)" strokeWidth="1" />
          <text x="405" y="278" textAnchor="middle" fontSize="10" fill="var(--text-primary)">1/8</text>

          <rect x="445" y="250" width="28" height="50" rx="6" fill="var(--warning)" fillOpacity="0.4" stroke="var(--warning)" strokeWidth="1" />
          <text x="459" y="278" textAnchor="middle" fontSize="9" fill="var(--text-primary)">1/16</text>

          <text x="500" y="270" textAnchor="start" fontSize="10" fill="var(--text-secondary)">每级降采样后</text>
          <text x="500" y="284" textAnchor="start" fontSize="10" fill="var(--text-secondary)">高斯模糊再叠加</text>

          <text x={VIEW_W / 2} y="328" textAnchor="middle" fontSize="11" fill="var(--text-primary)">降采样金字塔：用小纹理做大模糊，性能远优于全分辨率模糊</text>
          <text x={VIEW_W / 2} y="348" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">关键洞察：后处理的本质是「像素的再加工」，GPU 并行处理一像素一线程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后处理管线与 Bloom 降采样金字塔
      </figcaption>
    </figure>
  );
}
