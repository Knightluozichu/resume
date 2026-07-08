/**
 * <UanAnimatorControllerDiagram>: Animator 控制器
 *
 * State + Transition + Parameter + Layer
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UanAnimatorControllerDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="Animator控制器。State状态+Transition转换+Parameter参数+Layer层。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Animator 控制器
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            State(状态) + Transition(转换) + Parameter(参数) + Layer(层)
          </text>
          {/* 状态图 */}
          <g>
            <rect x={36} y={76} width={648} height={140} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>状态机（States & Transitions）</text>
            {/* Idle */}
            <rect x={60} y={110} width={100} height={40} rx="6" fill={elevated} stroke={success} strokeWidth="2" />
            <text x={110} y={134} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Idle</text>
            {/* Run */}
            <rect x={220} y={110} width={100} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={270} y={134} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Run</text>
            {/* Jump */}
            <rect x={380} y={110} width={100} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={430} y={134} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Jump</text>
            {/* Attack */}
            <rect x={540} y={110} width={100} height={40} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={590} y={134} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>Attack</text>
            {/* 箭头 */}
            <line x1={160} y1={130} x2={218} y2={130} stroke={border} strokeWidth="1.5" markerEnd="url(#uanAC-arrow)" />
            <text x={189} y={122} textAnchor="middle" fontSize="10" fill={secondary}>Speed>0</text>
            <line x1={220} y1={140} x2={162} y2={140} stroke={border} strokeWidth="1.5" markerEnd="url(#uanAC-arrow)" />
            <text x={191} y={158} textAnchor="middle" fontSize="10" fill={secondary}>Speed=0</text>
            <line x1={270} y1={150} x2={270} y2={180} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
            <line x1={320} y1={130} x2={378} y2={130} stroke={border} strokeWidth="1.5" markerEnd="url(#uanAC-arrow)" />
            <text x={349} y={122} textAnchor="middle" fontSize="10" fill={secondary}>Jump=true</text>
            <text x={360} y={200} textAnchor="middle" fontSize="11" fill={secondary}>转换条件由 Parameter 驱动，Has Exit Time 控制是否等动画播完</text>
          </g>
          {/* 参数 */}
          <g>
            <rect x={36} y={228} width={310} height={70} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={250} fontSize="13" fontWeight="700" fill={success}>Parameter（参数）</text>
            <text x={52} y={268} fontSize="11" fill={primary}>Float：Speed（速度，0~1）</text>
            <text x={52} y={284} fontSize="11" fill={primary}>Bool：IsGrounded（是否着地）</text>
            <text x={52} y={300} fontSize="11" fill={primary}>Trigger：Jump/Attack（一次性触发）</text>
          </g>
          {/* Layer */}
          <g>
            <rect x={374} y={228} width={310} height={70} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={250} fontSize="13" fontWeight="700" fill={warning}>Layer（层）+ AvatarMask</text>
            <text x={390} y={268} fontSize="11" fill={primary}>Base Layer：全身动画</text>
            <text x={390} y={284} fontSize="11" fill={primary}>Upper Body：上半身（攻击/挥手）</text>
            <text x={390} y={300} fontSize="11" fill={secondary}>AvatarMask 隔离骨骼，上下半身独立播放</text>
          </g>
          {/* 底部 */}
          <g>
            <rect x={36} y={312} width={648} height={62} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={334} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>核心概念：State 绑定 Clip，Transition 定义切换条件，Parameter 驱动切换</text>
            <text x={360} y={354} textAnchor="middle" fontSize="11" fill={secondary}>代码中用 animator.SetFloat/SetBool/SetTrigger 修改参数驱动状态切换</text>
          </g>
          <defs>
            <marker id="uanAC-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Animator 控制器：State 绑定动画片段，Transition 定义切换，Parameter 驱动切换。
      </figcaption>
    </figure>
  );
}
