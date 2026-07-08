/**
 * <CsecFontFeaturesDiagram>：字体特性图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 400;

export function CsecFontFeaturesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘字体特性图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            OpenType 字体特性：字距、连字、数字
          </text>

          {/* 字距对比 */}
          <rect x="40" y="50" width="320" height="110" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="74" fontSize="13" fontWeight="600" fill="var(--text-primary)">字距控制对比</text>
          <text x="60" y="102" fontSize="20" fill="var(--text-secondary)" letterSpacing="0">AV To Ly（默认）</text>
          <text x="60" y="128" fontSize="20" fill="var(--accent)" letterSpacing="3">AV To Ly（letter-spacing: 3px）</text>
          <text x="60" y="150" fontSize="9" fill="var(--text-tertiary)">font-kerning: normal 智能调距 vs letter-spacing 统一加减</text>

          {/* 连字对比 */}
          <rect x="380" y="50" width="320" height="110" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="400" y="74" fontSize="13" fontWeight="600" fill="var(--text-primary)">连字对比</text>
          <text x="400" y="102" fontSize="20" fill="var(--text-secondary)">fi fl ffi（无连字）</text>
          <text x="400" y="128" fontSize="20" fill="var(--warning)">fi fl ffi（连字开启）</text>
          <text x="400" y="150" fontSize="9" fill="var(--text-tertiary)">font-variant-ligatures: common-ligatures</text>

          {/* 数字对比 */}
          <rect x="40" y="180" width="320" height="110" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="204" fontSize="13" fontWeight="600" fill="var(--text-primary)">数字排版对比</text>
          <text x="60" y="230" fontSize="18" fill="var(--text-secondary)">11111</text>
          <text x="60" y="252" fontSize="18" fill="var(--text-secondary)">88888</text>
          <text x="200" y="241" fontSize="9" fill="var(--text-tertiary)">proportional-nums（比例）</text>

          <text x="60" y="276" fontSize="18" fill="var(--success)" fontVariant="tabular-nums">11111</text>
          <text x="200" y="276" fontSize="9" fill="var(--text-tertiary)">tabular-nums（等宽对齐）</text>

          {/* font-variant vs feature-settings */}
          <rect x="380" y="180" width="320" height="110" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="400" y="204" fontSize="13" fontWeight="600" fill="var(--text-primary)">font-variant vs feature-settings</text>
          <text x="400" y="228" fontSize="10" fill="var(--accent)">font-variant-*（高层语义）：</text>
          <text x="400" y="244" fontSize="9" fill="var(--text-tertiary)">font-variant-numeric: tabular-nums</text>
          <text x="400" y="258" fontSize="9" fill="var(--text-tertiary)">语义清晰、浏览器自动回退</text>

          <text x="400" y="276" fontSize="10" fill="var(--warning)">font-feature-settings（底层）：</text>
          <text x="400" y="290" fontSize="9" fill="var(--text-tertiary)">{`"tnum" 1`}（直接传 OpenType 标签）</text>

          {/* 优先级说明 */}
          <rect x="40" y="310" width="660" height="70" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="334" fontSize="13" fontWeight="600" fill="var(--text-primary)">选型建议</text>
          <text x="60" y="356" fontSize="10" fill="var(--text-secondary)">优先用 font-variant-*（语义化、可回退）；font-feature-settings 适合冷门特性或精确控制</text>
          <text x="60" y="372" fontSize="10" fill="var(--text-tertiary)">注意：设一个 font-feature-settings 会重置所有未提及的特性为默认值</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        字体特性——font-kerning 智能字距、font-variant-ligatures 连字、tabular-nums 等宽数字
      </figcaption>
    </figure>
  );
}
