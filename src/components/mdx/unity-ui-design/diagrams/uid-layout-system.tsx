/**
 * <UidLayoutSystemDiagram>: UGUI 布局系统
 *
 * LayoutGroup(Horizontal/Vertical/Grid) -> LayoutElement -> ContentSizeFitter
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UidLayoutSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="UGUI 布局系统。三种LayoutGroup、LayoutElement属性、ContentSizeFitter自适应。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            UGUI 布局系统
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            LayoutGroup 排列 -> LayoutElement 约束 -> ContentSizeFitter 自适应
          </text>
          {/* LayoutGroup 三种 */}
          <g>
            <rect x={36} y={76} width={648} height={100} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>LayoutGroup（自动排列）</text>
            <rect x={60} y={110} width={180} height={56} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={150} y={128} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>HorizontalGroup</text>
            <rect x={76} y={138} width={28} height={20} rx="3" fill={accent} fillOpacity="0.2" />
            <rect x={110} y={138} width={28} height={20} rx="3" fill={accent} fillOpacity="0.2" />
            <rect x={144} y={138} width={28} height={20} rx="3" fill={accent} fillOpacity="0.2" />
            <rect x={178} y={138} width={28} height={20} rx="3" fill={accent} fillOpacity="0.2" />
            <rect x={270} y={110} width={180} height={56} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={128} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>VerticalGroup</text>
            <rect x={344} y={134} width={32} height={14} rx="3" fill={success} fillOpacity="0.2" />
            <rect x={344} y={152} width={32} height={14} rx="3" fill={success} fillOpacity="0.2" />
            <rect x={480} y={110} width={180} height={56} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={570} y={128} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>GridGroup</text>
            <rect x={496} y={136} width={24} height={12} rx="2" fill={warning} fillOpacity="0.2" />
            <rect x={526} y={136} width={24} height={12} rx="2" fill={warning} fillOpacity="0.2" />
            <rect x={556} y={136} width={24} height={12} rx="2" fill={warning} fillOpacity="0.2" />
            <rect x={496} y={152} width={24} height={12} rx="2" fill={warning} fillOpacity="0.2" />
            <rect x={526} y={152} width={24} height={12} rx="2" fill={warning} fillOpacity="0.2" />
            <rect x={556} y={152} width={24} height={12} rx="2" fill={warning} fillOpacity="0.2" />
          </g>
          {/* LayoutElement */}
          <g>
            <rect x={36} y={186} width={310} height={100} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={208} fontSize="13" fontWeight="700" fill={success}>LayoutElement（尺寸约束）</text>
            <text x={52} y={228} fontSize="11" fill={primary}>minWidth / minHeight</text>
            <text x={52} y={246} fontSize="11" fill={secondary}>最小尺寸（不被压缩低于此值）</text>
            <text x={52} y={266} fontSize="11" fill={primary}>preferredWidth / preferredHeight</text>
            <text x={52} y={284} fontSize="11" fill={secondary}>期望尺寸（布局分配的优先值）</text>
          </g>
          {/* ContentSizeFitter */}
          <g>
            <rect x={374} y={186} width={310} height={100} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={208} fontSize="13" fontWeight="700" fill={warning}>ContentSizeFitter（自适应）</text>
            <text x={390} y={228} fontSize="11" fill={primary}>Horizontal Fit = Preferred</text>
            <text x={390} y={246} fontSize="11" fill={secondary}>宽度跟随内容自动调整</text>
            <text x={390} y={266} fontSize="11" fill={primary}>Vertical Fit = Preferred</text>
            <text x={390} y={284} fontSize="11" fill={secondary}>高度跟随内容自动调整</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={298} width={648} height={72} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={320} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>布局三件套：LayoutGroup 排列子元素 + LayoutElement 约束尺寸 + ContentSizeFitter 自适应</text>
            <text x={360} y={340} textAnchor="middle" fontSize="11" fill={secondary}>LayoutGroup 读子元素 LayoutElement 的 preferred 值排列</text>
            <text x={360} y={358} textAnchor="middle" fontSize="11" fill={secondary}>ContentSizeFitter 读自身 LayoutElement 的 preferred 值调整大小</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        布局三件套：LayoutGroup 排列、LayoutElement 约束、ContentSizeFitter 自适应，三者协作实现自动布局。
      </figcaption>
    </figure>
  );
}
