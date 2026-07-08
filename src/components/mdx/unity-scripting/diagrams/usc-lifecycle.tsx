/**
 * <UscLifecycleDiagram>: Unity 脚本生命周期详解
 *
 * 完整生命周期：初始化→物理→输入→逻辑→渲染→销毁
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

export function UscLifecycleDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Unity脚本生命周期详解。从初始化到销毁的完整流程。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Unity 脚本生命周期
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            初始化 -> 物理 -> 输入 -> 逻辑 -> 渲染 -> 销毁
          </text>
          {/* 初始化阶段 */}
          <g>
            <rect x={36} y={76} width={648} height={56} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>初始化阶段</text>
            <rect x={158} y={86} width={100} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={208} y={106} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Awake</text>
            <rect x={276} y={86} width={100} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={326} y={106} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnEnable</text>
            <rect x={394} y={86} width={100} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={444} y={106} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Start</text>
            <rect x={512} y={86} width={150} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={587} y={106} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnLevelWasLoaded</text>
          </g>
          {/* 物理阶段 */}
          <g>
            <rect x={36} y={140} width={648} height={40} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={164} fontSize="13" fontWeight="700" fill={success}>物理阶段</text>
            <rect x={158} y={148} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={218} y={164} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>FixedUpdate</text>
            <rect x={296} y={148} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={356} y={164} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>碰撞/触发事件</text>
            <rect x={434} y={148} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={494} y={164} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>yield WaitForFixedUpdate</text>
          </g>
          {/* 输入与逻辑 */}
          <g>
            <rect x={36} y={188} width={648} height={56} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={210} fontSize="13" fontWeight="700" fill={warning}>输入与逻辑</text>
            <rect x={158} y={198} width={100} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={208} y={218} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Update</text>
            <rect x={276} y={198} width={100} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={326} y={218} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>协程</text>
            <rect x={394} y={198} width={100} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={444} y={218} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>LateUpdate</text>
          </g>
          {/* 渲染阶段 */}
          <g>
            <rect x={36} y={252} width={648} height={40} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={276} fontSize="13" fontWeight="700" fill={accent}>渲染阶段</text>
            <rect x={158} y={260} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={218} y={276} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnPreRender</text>
            <rect x={296} y={260} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={356} y={276} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnRenderObject</text>
            <rect x={434} y={260} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={494} y={276} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnPostRender</text>
          </g>
          {/* 销毁阶段 */}
          <g>
            <rect x={36} y={300} width={648} height={40} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={324} fontSize="13" fontWeight="700" fill={danger}>销毁阶段</text>
            <rect x={158} y={308} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={218} y={324} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnDisable</text>
            <rect x={296} y={308} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={356} y={324} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnApplicationQuit</text>
            <rect x={434} y={308} width={120} height={24} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={494} y={324} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnDestroy</text>
          </g>
          <text x={360} y={368} textAnchor="middle" fontSize="11" fill={secondary}>每帧循环：FixedUpdate → 物理事件 → Update → 协程 → LateUpdate → 渲染</text>
          <text x={360} y={384} textAnchor="middle" fontSize="11" fill={secondary}>OnEnable/OnDisable 可多次触发；Awake/Start/OnDestroy 只调用一次</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 脚本生命周期：初始化→物理→输入逻辑→渲染→销毁，每帧循环物理和逻辑阶段。
      </figcaption>
    </figure>
  );
}
