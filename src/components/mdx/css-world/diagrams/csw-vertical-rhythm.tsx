/**
 * <CswVerticalRhythmDiagram>：垂直韵律与行高图解。
 * 展示 line-height 的四种取值含义与 vertical-align 基线对齐。纯静态，Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function CswVerticalRhythmDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="垂直韵律与行高图解：line-height 与 vertical-align"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            垂直韵律：line-height 与 vertical-align
          </text>

          {/* 左侧：line-height 行盒 */}
          <text x="180" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">行盒模型（line-height: 1.5）</text>

          {/* 行盒外框 */}
          <rect x="50" y="74" width="260" height="120" rx="6" fill="var(--accent)" fillOpacity="0.05" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="66" y="90" fontSize="9" fill="var(--accent)">行盒高度 = font-size × 1.5</text>

          {/* 内容区 */}
          <rect x="70" y="104" width="220" height="30" rx="3" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="180" y="124" textAnchor="middle" fontSize="11" fill="var(--text-primary)">内容区 = font-size: 16px</text>

          {/* 上半行距 */}
          <rect x="70" y="94" width="220" height="10" fill="var(--success)" fillOpacity="0.20" />
          <text x="310" y="103" fontSize="8" fill="var(--success)">半行距 ↑</text>

          {/* 下半行距 */}
          <rect x="70" y="134" width="220" height="10" fill="var(--success)" fillOpacity="0.20" />
          <text x="310" y="143" fontSize="8" fill="var(--success)">半行距 ↓</text>

          <text x="180" y="170" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">行距 = (1.5 − 1) × 16 = 8px，上下各 4px</text>

          {/* 右侧：line-height 四种取值 */}
          <text x="560" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">line-height 取值对比（font-size:16px）</text>

          <rect x="430" y="74" width="260" height="28" rx="3" fill="var(--success)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="0.5" />
          <text x="450" y="92" fontSize="10" fill="var(--success)">1.5（无单位）</text>
          <text x="680" y="92" textAnchor="end" fontSize="10" fill="var(--text-secondary)">= 24px，子元素继承后重算</text>

          <rect x="430" y="104" width="260" height="28" rx="3" fill="var(--danger)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="0.5" />
          <text x="450" y="122" fontSize="10" fill="var(--danger)">24px（带单位）</text>
          <text x="680" y="122" textAnchor="end" fontSize="10" fill="var(--text-secondary)">固定值，子元素继承 24px</text>

          <rect x="430" y="134" width="260" height="28" rx="3" fill="var(--warning)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="0.5" />
          <text x="450" y="152" fontSize="10" fill="var(--warning)">150%</text>
          <text x="680" y="152" textAnchor="end" fontSize="10" fill="var(--text-secondary)">= 24px，子元素继承 24px</text>

          <rect x="430" y="164" width="260" height="28" rx="3" fill="var(--accent)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="0.5" />
          <text x="450" y="182" fontSize="10" fill="var(--accent)">normal（约 1.2）</text>
          <text x="680" y="182" textAnchor="end" fontSize="10" fill="var(--text-secondary)">浏览器默认，随字体变</text>

          {/* 下方：vertical-align 基线 */}
          <text x="370" y="216" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">vertical-align 基线对齐方式</text>

          <rect x="40" y="230" width="660" height="130" rx="8" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />

          {/* 基线 */}
          <line x1="70" y1="300" x2="670" y2="300" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x="670" y="296" textAnchor="end" fontSize="9" fill="var(--danger)">baseline（基线）</text>

          {/* baseline 文字 */}
          <text x="120" y="300" textAnchor="middle" fontSize="14" fill="var(--text-primary)">Ay</text>
          <text x="120" y="330" textAnchor="middle" fontSize="9" fill="var(--success)">baseline</text>

          {/* top 对齐 */}
          <text x="260" y="288" textAnchor="middle" fontSize="14" fill="var(--text-primary)">Ay</text>
          <line x1="240" y1="282" x2="280" y2="282" stroke="var(--accent)" strokeWidth="1" />
          <text x="260" y="330" textAnchor="middle" fontSize="9" fill="var(--accent)">top（行盒顶）</text>

          {/* middle 对齐 */}
          <text x="400" y="294" textAnchor="middle" fontSize="14" fill="var(--text-primary)">Ay</text>
          <line x1="380" y1="288" x2="420" y2="288" stroke="var(--warning)" strokeWidth="1" />
          <text x="400" y="330" textAnchor="middle" fontSize="9" fill="var(--warning)">middle（行盒中点）</text>

          {/* bottom 对齐 */}
          <text x="540" y="306" textAnchor="middle" fontSize="14" fill="var(--text-primary)">Ay</text>
          <line x1="520" y1="312" x2="560" y2="312" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="540" y="330" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">bottom（行盒底）</text>

          {/* 垂直韵律提示 */}
          <rect x="40" y="376" width="660" height="64" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="398" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">垂直韵律：所有间距是基线的整数倍</text>
          <text x="370" y="418" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">基线 8px → 标题 24px(3×) / 段落 16px(2×) / 间距 32px(4×)，节奏统一</text>
          <text x="370" y="434" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">vertical-align 只对 inline / inline-block 生效，对块级无效</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        垂直韵律与行高——line-height 四值语义、行盒模型与 vertical-align 基线对齐
      </figcaption>
    </figure>
  );
}
