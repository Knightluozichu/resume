/**
 * <UanBlendTreesDiagram>: 动画混合树
 *
 * 1D/2D混合树：按参数平滑混合多个动画片段
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

export function UanBlendTreesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="动画混合树。1D和2D混合树按参数平滑混合多个动画片段。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            动画混合树 (Blend Tree)
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            1D 混合(单参数) / 2D 混合(双参数) 实现平滑动画过渡
          </text>
          {/* 1D 混合树 */}
          <g>
            <rect x={36} y={76} width={310} height={160} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>1D 混合树（Speed 参数）</text>
            <text x={52} y={118} fontSize="11" fill={secondary}>参数：Speed (0~1)</text>
            <line x1={80} y1={140} x2={300} y2={140} stroke={border} strokeWidth="2" />
            <circle cx={80} cy={140} r="6" fill={success} />
            <text x={80} y={128} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Idle</text>
            <text x={80} y={160} textAnchor="middle" fontSize="11" fill={secondary}>Speed=0</text>
            <circle cx={190} cy={140} r="6" fill={warning} />
            <text x={190} y={128} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Walk</text>
            <text x={190} y={160} textAnchor="middle" fontSize="11" fill={secondary}>Speed=0.5</text>
            <circle cx={300} cy={140} r="6" fill={danger} fillOpacity="0.8" />
            <text x={300} y={128} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Run</text>
            <text x={300} y={160} textAnchor="middle" fontSize="11" fill={secondary}>Speed=1</text>
            <text x={191} y={190} textAnchor="middle" fontSize="11" fill={accent}>Speed=0.3 → Idle/Walk 按0.6:0.4混合</text>
            <text x={191} y={208} textAnchor="middle" fontSize="11" fill={secondary}>混合比例由阈值位置决定，平滑过渡</text>
          </g>
          {/* 2D 混合树 */}
          <g>
            <rect x={374} y={76} width={310} height={160} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={98} fontSize="13" fontWeight="700" fill={success}>2D 混合树（Speed + Direction）</text>
            <text x={390} y={118} fontSize="11" fill={secondary}>参数：Speed(0~1) + Direction(-1~1)</text>
            {/* 十字坐标 */}
            <line x1={529} y1={130} x2={529} y2={200} stroke={border} strokeWidth="1" />
            <line x1={430} y1={165} x2={628} y2={165} stroke={border} strokeWidth="1" />
            <circle cx={529} cy={165} r="5" fill={success} />
            <text x={529} y={124} textAnchor="middle" fontSize="10" fill={primary}>Forward</text>
            <circle cx={529} cy={130} r="5" fill={accent} fillOpacity="0.8" />
            <text x={440} y={168} fontSize="10" fill={primary}>Left</text>
            <circle cx={440} cy={165} r="5" fill={warning} fillOpacity="0.8" />
            <text x={618} y={168} textAnchor="end" fontSize="10" fill={primary}>Right</text>
            <circle cx={618} cy={165} r="5" fill={danger} fillOpacity="0.8" />
            <text x={529} y={206} textAnchor="middle" fontSize="10" fill={primary}>Back</text>
            <circle cx={529} cy={200} r="5" fill={secondary} fillOpacity="0.8" />
            <text x={529} y={226} textAnchor="middle" fontSize="11" fill={success}>2D Cartesian 按两轴混合</text>
          </g>
          {/* 混合类型 */}
          <g>
            <rect x={36} y={248} width={648} height={56} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={52} y={270} fontSize="12" fontWeight="700" fill={primary}>2D 混合类型</text>
            <text x={52} y={288} fontSize="11" fill={secondary}>2D Simple Cartesian（简单坐标，推荐） / 2D Cartesian（带物理方向） / 2D Directional（方向角度） / 2D Freeform（自由形）</text>
          </g>
          {/* 底部 */}
          <g>
            <rect x={36} y={316} width={648} height={58} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
            <text x={360} y={338} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>混合树 = 多个Clip按参数权重混合，实现平滑动画过渡</text>
            <text x={360} y={358} textAnchor="middle" fontSize="11" fill={secondary}>1D适合走/跑切换；2D适合移动方向(8方向移动)；阈值(Threshold)控制混合位置</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        混合树：按参数平滑混合多个动画——1D 适合速度切换，2D 适合方向移动。
      </figcaption>
    </figure>
  );
}
