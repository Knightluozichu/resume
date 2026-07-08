/**
 * <UsfImageEffectsDiagram>
 *
 * 图像效果: 模糊/边缘检测/扭曲
 */

export function UsfImageEffectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="图像效果实现" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">图像效果实现</text>

          <rect x="30" y="55" width="155" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="107" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">模糊</text>
          <text x="107" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">高斯 / 方框</text>
          <text x="107" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">径向 / 方向</text>
          <text x="107" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">多次采样叠加</text>

          <rect x="200" y="55" width="155" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="277" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">边缘检测</text>
          <text x="277" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">Sobel / Roberts</text>
          <text x="277" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">3x3 卷积核</text>
          <text x="277" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">梯度模长判定</text>

          <rect x="370" y="55" width="155" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="447" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">扭曲</text>
          <text x="447" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">噪声偏移 UV</text>
          <text x="447" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">波纹 / 鱼眼</text>
          <text x="447" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">时间流动动画</text>

          <rect x="540" y="55" width="150" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="615" y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">风格化</text>
          <text x="615" y="95" textAnchor="middle" fontSize="10" fill="var(--text-primary)">像素化 / 灰度</text>
          <text x="615" y="112" textAnchor="middle" fontSize="10" fill="var(--text-primary)">反色 / 油画</text>
          <text x="615" y="129" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">艺术效果</text>

          <rect x="30" y="155" width="310" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="185" y="175" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">Sobel: 3x3 卷积 → 水平+垂直梯度</text>
          <text x="185" y="195" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">|Gx| + |Gy| > threshold = 边缘</text>

          <rect x="380" y="155" width="310" height="56" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="535" y="175" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">径向模糊: 从中心径向步进采样</text>
          <text x="535" y="195" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">方向模糊: 沿固定方向步进采样</text>

          <rect x="48" y="235" width="624" height="50" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="255" textAnchor="middle" fontSize="11" fill="var(--text-primary)">屏幕扭曲: noise(uv + time) → UV 偏移 → 采样源纹理</text>
          <text x="360" y="273" textAnchor="middle" fontSize="11" fill="var(--text-primary)">可用 GrabPass / Opaque Texture 获取屏幕内容</text>

          <text x="360" y="325" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">图像效果 = 全屏像素处理: 采样 → 数学运算 → 输出</text>
          <text x="360" y="345" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">边缘检测可叠加深度/法线纹理做更精确的轮廓检测</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">图像效果实现</figcaption>
    </figure>
  );
}
