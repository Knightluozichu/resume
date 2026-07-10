/**
 * <PbtLightTransportDiagram>: 渲染方程：光的弹射循环
 *
 * 自发光 + 反射积分 = 出射光 -> 递归求解
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

export function PbtLightTransportDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="渲染方程图解：出射光等于自发光加上BRDF与入射光的积分，入射光又是其他点的出射光形成递归。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            渲染方程：光的弹射循环
          `}</text>
          <text x={360} y={50} textAnchor="middle" fontSize="11" fill={secondary}>{`
            自发光 + 反射积分 = 出射光 -> 递归求解
          `}</text>
          <g>
            <rect x={36} y={70} width={648} height={69} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={92} fontSize="13" fontWeight="700" fill={warning}>{`自发光 Le`}</text>
            <rect x={158} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`光源直接发光`}</text>
            <rect x={310} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`非递归项`}</text>
            <line x1={298} y1={108} x2={310} y2={108} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={92} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={112} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`基础亮度`}</text>
            <line x1={450} y1={108} x2={462} y2={108} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={147} width={648} height={69} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={169} fontSize="13" fontWeight="700" fill={accent}>{`直接光照`}</text>
            <rect x={158} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`光源到表面到相机`}</text>
            <rect x={310} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`一次弹射`}</text>
            <line x1={298} y1={186} x2={310} y2={186} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={169} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={190} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`显式采样`}</text>
            <line x1={450} y1={186} x2={462} y2={186} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={224} width={648} height={69} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={246} fontSize="13" fontWeight="700" fill={success}>{`间接光照`}</text>
            <rect x={158} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`多次弹射`}</text>
            <rect x={310} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`递归项`}</text>
            <line x1={298} y1={262} x2={310} y2={262} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={246} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={266} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`随机采样`}</text>
            <line x1={450} y1={262} x2={462} y2={262} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={301} width={648} height={69} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={323} fontSize="13" fontWeight="700" fill={danger}>{`求解方法`}</text>
            <rect x={158} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`路径追踪`}</text>
            <rect x={310} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`随机游走`}</text>
            <line x1={298} y1={340} x2={310} y2={340} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={323} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={344} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`俄罗斯轮盘`}</text>
            <line x1={450} y1={340} x2={462} y2={340} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <defs>
            <marker id="pbtLightTransport-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        渲染方程：自发光+直接光照+间接光照的递归积分，路径追踪用随机游走求解。
      </figcaption>
    </figure>
  );
}
