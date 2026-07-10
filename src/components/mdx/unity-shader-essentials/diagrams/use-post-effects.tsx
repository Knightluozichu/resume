/**
 * <UsePostEffectsDiagram>: 屏幕后处理效果
 *
 * 场景->RenderTexture->Shader处理->屏幕
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

export function UsePostEffectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="后处理流程：场景渲染到纹理，Shader处理全屏像素，输出到屏幕。包括亮度/对比度/饱和度/模糊/泛光。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            屏幕后处理效果
          `}</text>
          <text x={360} y={50} textAnchor="middle" fontSize="11" fill={secondary}>{`
            场景->RenderTexture->Shader处理->屏幕
          `}</text>
          <g>
            <rect x={36} y={70} width={648} height={69} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={92} fontSize="13" fontWeight="700" fill={accent}>{`基本流程`}</text>
            <rect x={158} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`渲染到RT`}</text>
            <rect x={310} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`OnRenderImage`}</text>
            <line x1={298} y1={108} x2={310} y2={108} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`Graphics.Blit`}</text>
            <line x1={450} y1={108} x2={462} y2={108} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={147} width={648} height={69} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={169} fontSize="13" fontWeight="700" fill={success}>{`简单调整`}</text>
            <rect x={158} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`亮度`}</text>
            <rect x={310} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`对比度`}</text>
            <line x1={298} y1={186} x2={310} y2={186} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`饱和度`}</text>
            <line x1={450} y1={186} x2={462} y2={186} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={224} width={648} height={69} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={246} fontSize="13" fontWeight="700" fill={warning}>{`复杂效果`}</text>
            <rect x={158} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`Bloom泛光`}</text>
            <rect x={310} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`模糊模糊`}</text>
            <line x1={298} y1={262} x2={310} y2={262} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`描边描边`}</text>
            <line x1={450} y1={262} x2={462} y2={262} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={301} width={648} height={69} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={323} fontSize="13" fontWeight="700" fill={danger}>{`性能优化`}</text>
            <rect x={158} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`降分辨率`}</text>
            <rect x={310} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`分离模糊`}</text>
            <line x1={298} y1={340} x2={310} y2={340} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`减少Pass`}</text>
            <line x1={450} y1={340} x2={462} y2={340} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <defs>
            <marker id="usePostEffects-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        后处理：场景渲染到纹理再Shader处理，简单调整一个Pass，复杂效果多Pass+中间纹理。
      </figcaption>
    </figure>
  );
}
