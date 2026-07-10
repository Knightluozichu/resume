/**
 * <GilDirectIndirectDiagram>: 直接光与间接光
 *
 * 光源->表面(直接) vs 光源->表面A->表面B(间接)
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

export function GilDirectIndirectDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="直接光照一次弹射，间接光照多次弹射产生色渗透和环境光填充。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            直接光与间接光
          `}</text>
          <text x={360} y={50} textAnchor="middle" fontSize="11" fill={secondary}>{`
            光源->表面(直接) vs 光源->表面A->表面B(间接)
          `}</text>
          <g>
            <rect x={36} y={70} width={648} height={69} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={92} fontSize="13" fontWeight="700" fill={accent}>{`直接光照`}</text>
            <rect x={158} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`光源->表面->相机`}</text>
            <rect x={310} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`一次弹射`}</text>
            <line x1={298} y1={108} x2={310} y2={108} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`显式采样`}</text>
            <line x1={450} y1={108} x2={462} y2={108} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={147} width={648} height={69} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={169} fontSize="13" fontWeight="700" fill={success}>{`间接光照`}</text>
            <rect x={158} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`多次弹射`}</text>
            <rect x={310} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`递归追踪`}</text>
            <line x1={298} y1={186} x2={310} y2={186} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`GI核心开销`}</text>
            <line x1={450} y1={186} x2={462} y2={186} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={224} width={648} height={69} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={246} fontSize="13" fontWeight="700" fill={warning}>{`色渗透`}</text>
            <rect x={158} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`彩色反射`}</text>
            <rect x={310} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`染到邻近物体`}</text>
            <line x1={298} y1={262} x2={310} y2={262} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`真实感线索`}</text>
            <line x1={450} y1={262} x2={462} y2={262} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={301} width={648} height={69} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={323} fontSize="13" fontWeight="700" fill={danger}>{`环境光遮蔽`}</text>
            <rect x={158} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`角落变暗`}</text>
            <rect x={310} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`缝隙减弱`}</text>
            <line x1={298} y1={340} x2={310} y2={340} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`GI最简近似`}</text>
            <line x1={450} y1={340} x2={462} y2={340} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <defs>
            <marker id="gilDirectIndirect-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        直接光一次弹射高效计算，间接光多次弹射产生色渗透和AO，两者之和构成GI。
      </figcaption>
    </figure>
  );
}
