/**
 * <UscMonoBasicsDiagram>: MonoBehaviour 基础
 *
 * 生命周期方法 + 序列化字段 + Inspector 集成
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UscMonoBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="MonoBehaviour基础。生命周期方法顺序、序列化字段、Inspector集成。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            MonoBehaviour 基础
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            生命周期方法 -> 序列化字段 -> Inspector 集成
          </text>
          {/* 生命周期时间线 */}
          <g>
            <rect x={36} y={76} width={648} height={120} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={98} fontSize="13" fontWeight="700" fill={accent}>生命周期方法（按调用顺序）</text>
            <line x1={80} y1={120} x2={640} y2={120} stroke={border} strokeWidth="2" />
            <circle cx={80} cy={120} r="6" fill={accent} />
            <text x={80} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Awake</text>
            <text x={80} y={154} textAnchor="middle" fontSize="11" fill={secondary}>对象创建</text>
            <circle cx={180} cy={120} r="6" fill={accent} />
            <text x={180} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnEnable</text>
            <text x={180} y={154} textAnchor="middle" fontSize="11" fill={secondary}>启用</text>
            <circle cx={280} cy={120} r="6" fill={accent} />
            <text x={280} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Start</text>
            <text x={280} y={154} textAnchor="middle" fontSize="11" fill={secondary}>首帧前</text>
            <circle cx={380} cy={120} r="6" fill={success} />
            <text x={380} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Update</text>
            <text x={380} y={154} textAnchor="middle" fontSize="11" fill={secondary}>每帧</text>
            <circle cx={480} cy={120} r="6" fill={success} />
            <text x={480} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>LateUpdate</text>
            <text x={480} y={154} textAnchor="middle" fontSize="11" fill={secondary}>Update后</text>
            <circle cx={560} cy={120} r="6" fill={warning} />
            <text x={560} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnDisable</text>
            <text x={560} y={154} textAnchor="middle" fontSize="11" fill={secondary}>禁用</text>
            <circle cx={640} cy={120} r="6" fill={warning} />
            <text x={640} y={140} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>OnDestroy</text>
            <text x={640} y={154} textAnchor="middle" fontSize="11" fill={secondary}>销毁</text>
            <text x={360} y={184} textAnchor="middle" fontSize="11" fill={secondary}>Awake/Start 只调用一次；OnEnable/OnDisable 可多次触发；FixedUpdate 按物理时间步调用</text>
          </g>
          {/* 序列化字段 */}
          <g>
            <rect x={36} y={208} width={310} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={52} y={230} fontSize="13" fontWeight="700" fill={success}>序列化字段</text>
            <text x={52} y={250} fontSize="11" fill={primary}>[SerializeField] private int hp</text>
            <text x={52} y={266} fontSize="11" fill={secondary}>私有字段在Inspector显示</text>
            <text x={52} y={282} fontSize="11" fill={primary}>public float speed</text>
            <text x={52} y={298} fontSize="11" fill={secondary}>自动序列化（不推荐public）</text>
          </g>
          {/* 特殊方法 */}
          <g>
            <rect x={374} y={208} width={310} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={390} y={230} fontSize="13" fontWeight="700" fill={warning}>物理与帧方法</text>
            <text x={390} y={250} fontSize="11" fill={primary}>FixedUpdate() 固定时间步</text>
            <text x={390} y={266} fontSize="11" fill={secondary}>物理计算用此方法</text>
            <text x={390} y={282} fontSize="11" fill={primary}>LateUpdate() Update后调用</text>
          </g>
          {/* 底部总结 */}
          <g>
            <rect x={36} y={300} width={648} height={72} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={360} y={322} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>核心原则：Awake初始化自身，Start获取引用，Update处理输入，FixedUpdate处理物理</text>
            <text x={360} y={342} textAnchor="middle" fontSize="11" fill={secondary}>用 [SerializeField] private 替代 public，保持封装性同时让 Inspector 可编辑</text>
            <text x={360} y={358} textAnchor="middle" fontSize="11" fill={secondary}>构造函数中不要访问 Unity API，在 Awake 中初始化</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MonoBehaviour 生命周期：Awake→OnEnable→Start→Update→LateUpdate→OnDisable→OnDestroy。
      </figcaption>
    </figure>
  );
}
