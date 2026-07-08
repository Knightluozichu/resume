/**
 * <CsecClipPathDiagram>：裁剪路径与几何形状图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 400;

export function CsecClipPathDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CSS揭秘裁剪路径与几何形状图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            clip-path: polygon() 裁剪几何形状
          </text>

          {/* 三角形 */}
          <rect x="40" y="50" width="140" height="120" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeDasharray="3 2" />
          <polygon points="110,65 55,160 165,160" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="110" cy="65" r="3" fill="var(--accent)" />
          <circle cx="55" cy="160" r="3" fill="var(--accent)" />
          <circle cx="165" cy="160" r="3" fill="var(--accent)" />
          <text x="110" y="190" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">三角形</text>
          <text x="110" y="206" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">polygon(50% 0, 0 100%, 100% 100%)</text>

          {/* 梯形 */}
          <rect x="210" y="50" width="140" height="120" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeDasharray="3 2" />
          <polygon points="238,65 322,65 350,160 210,160" fill="var(--warning)" fillOpacity="0.3" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="280" y="190" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">梯形</text>
          <text x="280" y="206" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">polygon(20% 0, 80% 0, 100% 100%, 0 100%)</text>

          {/* 菱形 */}
          <rect x="380" y="50" width="140" height="120" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeDasharray="3 2" />
          <polygon points="450,60 520,110 450,160 380,110" fill="var(--success)" fillOpacity="0.3" stroke="var(--success)" strokeWidth="1.5" />
          <text x="450" y="190" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">菱形</text>
          <text x="450" y="206" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">polygon(50% 0, 100% 50%, 50% 100%, 0 50%)</text>

          {/* 星形 */}
          <rect x="550" y="50" width="140" height="120" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeDasharray="3 2" />
          <polygon
            points="620,60 631,95 668,95 638,117 649,152 620,131 591,152 602,117 572,95 609,95"
            fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="1.5"
          />
          <text x="620" y="190" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">星形</text>
          <text x="620" y="206" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">10 个点交替内外圆</text>

          {/* 坐标系说明 */}
          <rect x="40" y="235" width="660" height="140" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="60" y="259" fontSize="13" fontWeight="600" fill="var(--text-primary)">clip-path polygon 坐标系</text>

          {/* 坐标轴示意 */}
          <line x1="80" y1="340" x2="200" y2="340" stroke="var(--text-secondary)" strokeWidth="1" />
          <line x1="80" y1="340" x2="80" y2="270" stroke="var(--text-secondary)" strokeWidth="1" />
          <text x="205" y="344" fontSize="9" fill="var(--text-tertiary)">x (0→100%)</text>
          <text x="60" y="266" fontSize="9" fill="var(--text-tertiary)">y</text>
          <text x="60" y="278" fontSize="9" fill="var(--text-tertiary)">(0%)</text>
          <circle cx="80" cy="340" r="3" fill="var(--text-secondary)" />
          <text x="70" y="356" fontSize="9" fill="var(--text-tertiary)">原点(0,0)</text>

          {/* 特性说明 */}
          <text x="280" y="275" fontSize="11" fontWeight="600" fill="var(--text-primary)">clip-path 特性：</text>
          <text x="280" y="296" fontSize="10" fill="var(--text-secondary)">坐标以元素左上角为原点</text>
          <text x="280" y="312" fontSize="10" fill="var(--text-secondary)">百分比相对元素宽高</text>
          <text x="280" y="328" fontSize="10" fill="var(--text-secondary)">只裁视觉：不影响盒模型</text>
          <text x="280" y="344" fontSize="10" fill="var(--text-secondary)">裁掉区域不响应事件</text>
          <text x="280" y="360" fontSize="10" fill="var(--text-tertiary)">动画只合成不重排（性能优）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        裁剪路径与几何形状——clip-path: polygon() 用坐标点描述保留区域，裁掉部分不渲染不响应事件
      </figcaption>
    </figure>
  );
}
