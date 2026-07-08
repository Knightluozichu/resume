/**
 * <UanAnimationBasicsDiagram>: Unity 动画基础原理
 *
 * 关键帧 + 曲线 + 插值 + 采样率
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UanAnimationBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity动画基础原理。关键帧、曲线、插值、采样率。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 动画基础原理
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            关键帧(Keyframe) -> 曲线(Curve) -> 插值(Interpolation) -> 播放
          </text>
          {/* 关键帧时间线 */}
          <g>
            <rect x={36} y={76} width={648} height={120} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>关键帧时间线</text>
            <line x1={80} y1={140} x2={640} y2={140} stroke={border} strokeWidth="2" />
            <circle cx={80} cy={120} r="6" fill={accent} />
            <text x={80} y={110} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>0s</text>
            <text x={80} y={160} textAnchor="middle" fontSize="11" fill={secondary}>站立</text>
            <circle cx={240} cy={110} r="6" fill={accent} />
            <text x={240} y={100} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>0.3s</text>
            <text x={240} y={160} textAnchor="middle" fontSize="11" fill={secondary}>起跳</text>
            <circle cx={400} cy={130} r="6" fill={accent} />
            <text x={400} y={120} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>0.6s</text>
            <text x={400} y={160} textAnchor="middle" fontSize="11" fill={secondary}>最高点</text>
            <circle cx={560} cy={150} r="6" fill={accent} />
            <text x={560} y={180} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>1.0s</text>
            <text x={560} y={200} textAnchor="middle" fontSize="11" fill={secondary}>落地</text>
            {/* 插值曲线 */}
            <path d="M 80 120 Q 160 100 240 110 Q 320 140 400 130 Q 480 160 560 150" stroke={success} strokeWidth="2" fill="none" strokeDasharray="4 2" />
            <text x={620} y={130} fontSize="11" fill={success}>插值曲线</text>
          </g>
          {/* 曲线类型 */}
          <g>
            <rect x={36} y={210} width={310} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={232} fontSize="13" fontWeight="700" fill={success}>插值类型</text>
            <text x={52} y={252} fontSize="11" fill={primary}>Linear（线性）</text>
            <text x={52} y={268} fontSize="11" fill={secondary}>匀速变化</text>
            <text x={200} y={252} fontSize="11" fill={primary}>Ease（缓动）</text>
            <text x={200} y={268} fontSize="11" fill={secondary}>先快后慢/先慢后快</text>
          </g>
          {/* AnimationClip */}
          <g>
            <rect x={374} y={210} width={310} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={232} fontSize="13" fontWeight="700" fill={warning}>AnimationClip 属性</text>
            <text x={390} y={252} fontSize="11" fill={primary}>采样率(Sample Rate)</text>
            <text x={390} y={268} fontSize="11" fill={secondary}>关键帧密度，越高越流畅</text>
            <text x={390} y={284} fontSize="11" fill={primary}>WrapMode：Loop/PingPong/Clamp</text>
          </g>
          {/* 底部 */}
          <g>
            <rect x={36} y={302} width={648} height={72} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={324} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>核心原理：关键帧记录离散状态，插值在帧间生成平滑过渡</text>
            <text x={360} y={344} textAnchor="middle" fontSize="11" fill={secondary}>动画 = 关键帧 + 插值曲线 + 时间</text>
            <text x={360} y={360} textAnchor="middle" fontSize="11" fill={secondary}>减少不必要的关键帧可节省内存，曲线编辑器可微调动画手感</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        动画基础：关键帧记录状态，曲线控制插值方式，采样率决定精度。
      </figcaption>
    </figure>
  );
}
