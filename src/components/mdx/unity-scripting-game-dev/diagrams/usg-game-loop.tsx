/**
 * <UsgGameLoopDiagram>: 游戏循环与 Update 生命周期
 *
 * 初始化 -> 每帧循环(FixedUpdate/Update/LateUpdate) -> 销毁
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

export function UsgGameLoopDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="游戏循环与 Update 生命周期。初始化阶段、每帧循环（FixedUpdate/Update/LateUpdate）和销毁阶段。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            游戏循环与 Update 生命周期
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            初始化 -&gt; 每帧循环 -&gt; 销毁
          </text>
          {/* 初始化 */}
          <g>
            <rect x={36} y={76} width={648} height={56} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>初始化（一次）</text>
            <rect x={180} y={86} width={120} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={240} y={106} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Awake</text>
            <rect x={320} y={86} width={120} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={106} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnEnable</text>
            <rect x={460} y={86} width={120} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={520} y={106} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Start</text>
          </g>
          {/* 每帧循环 */}
          <g>
            <rect x={36} y={144} width={648} height={140} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={166} fontSize="13" fontWeight="700" fill={success}>每帧循环（重复）</text>
            <rect x={60} y={178} width={140} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={130} y={198} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>FixedUpdate</text>
            <text x={130} y={210} textAnchor="middle" fontSize="9" fill={secondary}>固定步长/物理</text>
            <rect x={220} y={178} width={120} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={280} y={198} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>碰撞事件</text>
            <rect x={360} y={178} width={100} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={410} y={198} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Update</text>
            <text x={410} y={210} textAnchor="middle" fontSize="9" fill={secondary}>每帧逻辑</text>
            <rect x={480} y={178} width={100} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={530} y={198} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>协程</text>
            <rect x={600} y={178} width={72} height={32} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={636} y={198} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>LateUpdate</text>
            <text x={636} y={210} textAnchor="middle" fontSize="9" fill={secondary}>相机跟随</text>
            {/* 循环箭头 */}
            <path d="M 636 222 Q 636 252 410 252 Q 130 252 130 222" fill="none" stroke={success} strokeWidth="1.2" strokeDasharray="4 3" />
            <text x={360} y={268} textAnchor="middle" fontSize="11" fill={secondary}>FixedUpdate 按 fixedDeltaTime 调用；Update/LateUpdate 按帧</text>
          </g>
          {/* 销毁 */}
          <g>
            <rect x={36} y={296} width={648} height={48} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={318} fontSize="13" fontWeight="700" fill={danger}>销毁（一次）</text>
            <rect x={180} y={306} width={120} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={240} y={325} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnDisable</text>
            <rect x={320} y={306} width={120} height={30} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={380} y={325} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnDestroy</text>
          </g>
          <text x={360} y={368} textAnchor="middle" fontSize="11" fill={secondary}>Awake/Start/OnDestroy 只调一次；OnEnable/OnDisable 每次启停都触发</text>
          <text x={360} y={386} textAnchor="middle" fontSize="11" fill={secondary}>物理放 FixedUpdate，输入放 Update，相机放 LateUpdate</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏循环三阶段：初始化（一次）→每帧循环（FixedUpdate/Update/LateUpdate）→销毁（一次）。
      </figcaption>
    </figure>
  );
}
