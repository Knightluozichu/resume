/**
 * <UscLearningMapDiagram>: Unity 脚本设计全书学习地图
 *
 * 脚本基础 -> 组件系统 -> 核心机制 -> 进阶编程
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

export function UscLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity 脚本设计全书学习地图。四个板块：脚本基础、组件系统、核心机制、进阶编程。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>{`
            Unity 脚本设计全书学习地图
          `}</text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>{`
            脚本基础 -> 组件系统 -> 核心机制 -> 进阶编程
          `}</text>
          <g>
            <rect x={36} y={76} width={648} height={69} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>{`脚本基础`}</text>
            <rect x={158} y={98} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={118} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`学习地图`}</text>
            <rect x={310} y={98} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={118} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`MonoBehaviour`}</text>
            <line x1={298} y1={114} x2={310} y2={114} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={98} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={118} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`C#基础`}</text>
            <line x1={450} y1={114} x2={462} y2={114} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={153} width={648} height={69} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={175} fontSize="13" fontWeight="700" fill={success}>{`组件系统`}</text>
            <rect x={158} y={175} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={195} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`组件架构`}</text>
            <rect x={310} y={175} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={195} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`生命周期`}</text>
            <line x1={298} y1={191} x2={310} y2={191} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={175} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={195} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`输入系统`}</text>
            <line x1={450} y1={191} x2={462} y2={191} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={230} width={648} height={69} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={252} fontSize="13" fontWeight="700" fill={warning}>{`核心机制`}</text>
            <rect x={158} y={252} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={272} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`物理系统`}</text>
            <rect x={310} y={252} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={272} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`协程`}</text>
            <line x1={298} y1={268} x2={310} y2={268} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={252} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={272} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`ScriptableObject`}</text>
            <line x1={450} y1={268} x2={462} y2={268} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
          <g>
            <rect x={36} y={307} width={648} height={69} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={329} fontSize="13" fontWeight="700" fill={danger}>{`进阶编程`}</text>
            <rect x={158} y={329} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={228} y={349} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`高级技巧`}</text>
            <rect x={310} y={329} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={349} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`设计模式`}</text>
            <line x1={298} y1={345} x2={310} y2={345} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <rect x={462} y={329} width={140} height={33} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={532} y={349} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>{`全书复习`}</text>
            <line x1={450} y1={345} x2={462} y2={345} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 脚本设计四大板块：脚本基础→组件系统→核心机制→进阶编程。
      </figcaption>
    </figure>
  );
}
