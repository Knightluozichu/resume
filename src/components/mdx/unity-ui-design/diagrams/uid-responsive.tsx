/**
 * <UidResponsiveDiagram>: 响应式 UI 设计
 *
 * Canvas Scaler + Anchor + Safe Area 三大机制
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

export function UidResponsiveDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="响应式UI设计。Canvas Scaler缩放、Anchor锚点适配、Safe Area安全区域三大机制。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            响应式 UI 设计
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            Canvas Scaler 缩放 / Anchor 锚点适配 / Safe Area 安全区
          </text>
          {/* Canvas Scaler */}
          <g>
            <rect x={36} y={76} width={206} height={130} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={139} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>Canvas Scaler</text>
            <text x={52} y={120} fontSize="11" fill={primary}>缩放模式</text>
            <text x={52} y={138} fontSize="11" fill={success}>Constant Pixel Size</text>
            <text x={52} y={154} fontSize="11" fill={secondary}>固定像素，不缩放</text>
            <text x={52} y={174} fontSize="11" fill={success}>Scale With Screen Size</text>
            <text x={52} y={190} fontSize="11" fill={secondary}>按屏幕缩放(推荐)</text>
          </g>
          {/* Anchor */}
          <g>
            <rect x={257} y={76} width={206} height={130} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={360} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>Anchor 锚点</text>
            <text x={273} y={120} fontSize="11" fill={primary}>相对父级定位</text>
            <text x={273} y={138} fontSize="11" fill={success}>点锚点：固定位置</text>
            <text x={273} y={154} fontSize="11" fill={secondary}>元素不随屏幕拉伸</text>
            <text x={273} y={174} fontSize="11" fill={success}>拉伸锚点：四角拉开</text>
            <text x={273} y={190} fontSize="11" fill={secondary}>元素随屏幕拉伸</text>
          </g>
          {/* Safe Area */}
          <g>
            <rect x={478} y={76} width={206} height={130} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={581} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>Safe Area</text>
            <text x={494} y={120} fontSize="11" fill={primary}>安全区域适配</text>
            <text x={494} y={138} fontSize="11" fill={success}>避开刘海/圆角</text>
            <text x={494} y={154} fontSize="11" fill={secondary}>Screen.safeArea</text>
            <text x={494} y={174} fontSize="11" fill={success}>ApplySafeArea</text>
            <text x={494} y={190} fontSize="11" fill={secondary}>运行时调整 RectTransform</text>
          </g>
          {/* Match 机制 */}
          <g>
            <rect x={36} y={220} width={648} height={72} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={242} fontSize="12" fontWeight="700" fill={primary}>Scale With Screen Size 的 Match 属性</text>
            <text x={52} y={260} fontSize="11" fill={secondary}>Match=0：以宽度为基准缩放（横屏游戏推荐）</text>
            <text x={52} y={276} fontSize="11" fill={secondary}>Match=1：以高度为基准缩放（竖屏游戏推荐）</text>
            <text x={340} y={260} fontSize="11" fill={secondary}>Match=0.5：宽高各占一半（折中方案）</text>
            <text x={340} y={276} fontSize="11" fill={secondary}>Reference Resolution：设计基准分辨率（如 1920x1080）</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={306} width={648} height={68} rx="8" fill={danger} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={328} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>响应式三件套：Canvas Scaler 控制整体缩放 + Anchor 控制元素定位 + Safe Area 避开非安全区</text>
            <text x={360} y={348} textAnchor="middle" fontSize="11" fill={secondary}>设计基准分辨率选 1920x1080(横屏) 或 1080x1920(竖屏)，Match 按主要方向设置</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        响应式 UI 三大机制：Canvas Scaler 控制缩放、Anchor 控制定位、Safe Area 避开刘海/圆角。
      </figcaption>
    </figure>
  );
}
