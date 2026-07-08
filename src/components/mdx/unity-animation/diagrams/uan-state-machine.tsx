/**
 * <UanStateMachineDiagram>: 动画状态机详解
 *
 * 状态/转换/子状态机/Any State/Exit
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

export function UanStateMachineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="动画状态机详解。状态、转换、子状态机、Any State。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            动画状态机详解
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            State / Transition / SubStateMachine / AnyState
          </text>
          {/* 主状态机 */}
          <g>
            <rect x={36} y={76} width={648} height={160} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>主状态机（Base Layer）</text>
            {/* Any State */}
            <rect x={56} y={110} width={80} height={36} rx="6" fill={danger} fillOpacity="0.1" stroke={danger} strokeWidth="1" />
            <text x={96} y={132} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>Any State</text>
            {/* Idle */}
            <rect x={180} y={110} width={80} height={36} rx="6" fill={elevated} stroke={success} strokeWidth="2" />
            <text x={220} y={132} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Idle</text>
            {/* Run */}
            <rect x={300} y={110} width={80} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={340} y={132} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Run</text>
            {/* SubStateMachine */}
            <rect x={420} y={110} width={100} height={36} rx="6" fill={warning} fillOpacity="0.1" stroke={warning} strokeWidth="1.5" />
            <text x={470} y={128} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>Attack</text>
            <text x={470} y={140} textAnchor="middle" fontSize="9" fill={secondary}>子状态机</text>
            {/* Death */}
            <rect x={560} y={110} width={80} height={36} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={600} y={132} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Death</text>
            {/* 箭头 */}
            <line x1={136} y1={120} x2={178} y2={120} stroke={danger} strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#uanSM-arrow)" />
            <text x={157} y={112} textAnchor="middle" fontSize="9" fill={danger}>Hit</text>
            <line x1={136} y1={136} x2={558} y2={136} stroke={danger} strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#uanSM-arrow)" />
            <text x={347} y={150} textAnchor="middle" fontSize="9" fill={danger}>Death</text>
            <line x1={260} y1={128} x2={298} y2={128} stroke={border} strokeWidth="1.5" markerEnd="url(#uanSM-arrow)" />
            <line x1={300} y1={136} x2={262} y2={136} stroke={border} strokeWidth="1.5" markerEnd="url(#uanSM-arrow)" />
            <line x1={380} y1={128} x2={418} y2={128} stroke={border} strokeWidth="1.5" markerEnd="url(#uanSM-arrow)" />
            <text x={399} y={120} textAnchor="middle" fontSize="9" fill={secondary}>Attack</text>
            <text x={360} y={214} textAnchor="middle" fontSize="11" fill={secondary}>Any State → 任意状态（受击/死亡可从任何状态触发）；子状态机封装复杂状态组</text>
          </g>
          {/* 子状态机展开 */}
          <g>
            <rect x={36} y={248} width={648} height={60} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={270} fontSize="13" fontWeight="700" fill={warning}>子状态机 Attack（双击展开）</text>
            <rect x={120} y={278} width={80} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={160} y={294} textAnchor="middle" fontSize="11" fill={primary}>Attack1</text>
            <rect x={240} y={278} width={80} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={280} y={294} textAnchor="middle" fontSize="11" fill={primary}>Attack2</text>
            <rect x={360} y={278} width={80} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={400} y={294} textAnchor="middle" fontSize="11" fill={primary}>Attack3</text>
            <text x={480} y={294} fontSize="11" fill={secondary}>连击序列，每段有转换条件</text>
          </g>
          <text x={360} y={338} textAnchor="middle" fontSize="11" fill={secondary}>子状态机让复杂逻辑模块化；Any State 简化全局触发；Entry/Exit 管理子状态机进出</text>
          <text x={360} y={356} textAnchor="middle" fontSize="11" fill={secondary}>转换条件：Parameter 条件 + Has Exit Time + Transition Duration + Interruption Source</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态机：State 管理动画，Any State 简化全局触发，子状态机封装复杂逻辑。
      </figcaption>
    </figure>
  );
}
