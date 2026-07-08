/**
 * <UsfLearningMapDiagram>
 *
 * Unity 着色器和屏幕特效四大板块与十章脉络
 */

export function UsfLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity 着色器和屏幕特效四大板块与十章脉络" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 着色器和屏幕特效 学习地图</text>
          <text x="360" y="50" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">从屏幕特效基础到高级后处理管线</text>

          <rect x="36" y="72" width="153" height="32" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="112" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">基础(2)</text>
          <rect x="36" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="112" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">学习地图</text>
          <rect x="36" y="154" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="112" y="173" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">屏幕特效基础</text>

          <rect x="206" y="72" width="153" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="282" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">核心(4)</text>
          <rect x="206" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="282" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">深度纹理特效</text>
          <rect x="206" y="154" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="282" y="173" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">后处理栈</text>
          <rect x="206" y="190" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="282" y="209" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">图像效果</text>
          <rect x="206" y="226" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="282" y="245" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">光照特效</text>

          <rect x="376" y="72" width="153" height="32" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="452" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">高级(3)</text>
          <rect x="376" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="452" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">色彩校正调色</text>
          <rect x="376" y="154" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="452" y="173" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">辉光泛光</text>
          <rect x="376" y="190" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="452" y="209" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">高级屏幕特效</text>

          <rect x="546" y="72" width="153" height="32" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="622" y="93" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">复习(1)</text>
          <rect x="546" y="118" width="153" height="30" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="622" y="137" textAnchor="middle" fontSize="10.5" fill="var(--text-primary)">总复习</text>

          <rect x="48" y="320" width="624" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="338" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">核心主线: OnRenderImage → 深度纹理 → 后处理栈 → 图像/光照特效 → 调色/辉光</text>
          <text x="360" y="354" textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)">从全屏着色器到电影级后处理管线</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Unity 着色器和屏幕特效四大板块与十章脉络</figcaption>
    </figure>
  );
}
