/**
 * <UvfPostProcessingDiagram>：后处理特效栈（Bloom、DOF、色彩校正）图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UvfPostProcessingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 后处理特效栈图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">后处理特效栈：渲染管线末端的画面增强</text>

          {/* 流程链 */}
          <rect x="30" y="60" width="110" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="85" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">Camera 渲染</text>

          <text x="155" y="90" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="170" y="60" width="110" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="225" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Bloom 泛光</text>

          <text x="295" y="90" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="310" y="60" width="110" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="365" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">DOF 景深</text>

          <text x="435" y="90" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="450" y="60" width="110" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="505" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">色彩校正</text>

          <text x="575" y="90" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="590" y="60" width="110" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="645" y="90" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">最终输出</text>

          {/* Bloom 细节 */}
          <text x="180" y="150" fontSize="12" fontWeight="600" fill="var(--accent)">Bloom</text>
          <rect x="170" y="160" width="120" height="90" rx="6" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          <text x="230" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">1. 提取亮度</text>
          <text x="230" y="195" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">threshold &gt; 1.0</text>
          <text x="230" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">2. 高斯模糊</text>
          <text x="230" y="230" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">downsample &times; N</text>
          <text x="230" y="245" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">3. 叠加回原图</text>

          {/* DOF 细节 */}
          <text x="340" y="150" fontSize="12" fontWeight="600" fill="var(--accent)">Depth of Field</text>
          <rect x="310" y="160" width="120" height="90" rx="6" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          <text x="370" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">焦点 focalDistance</text>
          <text x="370" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">近 &middot; 焦内 &middot; 远</text>
          <text x="370" y="220" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">散景 Bokeh</text>
          <text x="370" y="240" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">CoC = |z - focal|</text>

          {/* 色彩校正细节 */}
          <text x="500" y="150" fontSize="12" fontWeight="600" fill="var(--accent)">Color Grading</text>
          <rect x="450" y="160" width="120" height="90" rx="6" fill="var(--bg-base)" stroke="var(--border)" strokeWidth="1" />
          <text x="510" y="180" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Tonemapping</text>
          <text x="510" y="195" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">ACES &middot; Neutral</text>
          <text x="510" y="215" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">LUT 查找表</text>
          <text x="510" y="230" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">色温 &middot; 对比度</text>
          <text x="510" y="245" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Vignette 暗角</text>

          {/* 底部说明 */}
          <rect x="30" y="280" width="660" height="44" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="308" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Volume + Profile 统一管理后处理参数；URP 的 Volume Framework 按优先级叠加</text>
          <text x="360" y="345" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">注意：Bloom 需要 HDR 开启 &middot; DOF 依赖深度图 &middot; 过度后处理会导致 GPU 带宽压力</text>
          <text x="360" y="375" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">移动端酌情降分辨率或减少 Pass 数</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后处理特效栈——Unity 3D 游戏特效制作典型实例
      </figcaption>
    </figure>
  );
}
