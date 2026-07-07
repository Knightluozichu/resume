/**
 * <EcsReadonlyConstDiagram>：readonly 优于 const（条款 2）。
 *
 * 左：const——编译期常量，值被「烤」进调用方 IL，跨程序集不随更新而变
 * 右：readonly——运行期常量，每次引用都从定义处读取，单一数据源
 * 中：版本演化场景——库升级 const 值，调用方未重编译仍用旧值（危险）
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";
const warning = "var(--warning)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

export function EcsReadonlyConstDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="readonly 与 const 对比。左：const 编译期常量，值烤进调用方 IL，跨程序集升级后调用方未重编译仍用旧值；右：readonly 运行期常量，每次从定义处读取，单一数据源。中：版本演化场景。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-rc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            const vs readonly
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            编译期烤入 vs 运行期读取——版本兼容性的分水岭
          </text>

          {/* 左：const */}
          <g>
            <rect x={40} y={78} width={300} height={150} rx="12" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.6" />
            <text x={190} y={100} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
              const（编译期）
            </text>
            <line x1={52} y1={110} x2={328} y2={110} stroke={border} strokeWidth="1" />
            <text x={60} y={132} fontSize="11.5" fontFamily="monospace" fill={primary}>{"public const int Max = 10;"}</text>
            <text x={60} y={156} fontSize="11" fill={secondary}>编译时用字面量替换引用</text>
            <text x={60} y={176} fontSize="11" fill={secondary}>值烤进调用方 IL，无运行时查找</text>
            <text x={60} y={196} fontSize="11" fill={secondary}>仅限内置数值 / 字符串 / null</text>
            <text x={60} y={216} fontSize="11" fontWeight="600" fill={danger}>库升级后调用方未重编 = 用旧值</text>
          </g>

          {/* 右：readonly */}
          <g>
            <rect x={380} y={78} width={300} height={150} rx="12" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.6" />
            <text x={530} y={100} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
              readonly（运行期）
            </text>
            <line x1={392} y1={110} x2={668} y2={110} stroke={border} strokeWidth="1" />
            <text x={390} y={132} fontSize="11.5" fontFamily="monospace" fill={primary}>{"public readonly int Max = 10;"}</text>
            <text x={390} y={156} fontSize="11" fill={secondary}>运行时从字段定义处读取</text>
            <text x={390} y={176} fontSize="11" fill={secondary}>库升级后调用方立即看到新值</text>
            <text x={390} y={196} fontSize="11" fill={secondary}>可用任意类型，构造函数中赋值</text>
            <text x={390} y={216} fontSize="11" fontWeight="600" fill={success}>单一数据源，版本安全</text>
          </g>

          {/* 中间分隔箭头 */}
          <text x={360} y={156} textAnchor="middle" fontSize="11" fill={secondary}>vs</text>

          {/* 下方：版本演化场景 */}
          <text x={VIEW_W / 2} y={260} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            版本演化场景：库 v2 把 Max 从 10 改成 20
          </text>

          {/* 库 */}
          <g>
            <rect x={48} y={280} width={140} height={70} rx="8" fill={accent} fillOpacity="0.07" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={118} y={302} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>库 Lib v2</text>
            <text x={118} y={322} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>{"Max = 20"}</text>
            <text x={118} y={340} textAnchor="middle" fontSize="11" fill={secondary}>定义处已更新</text>
          </g>

          <line x1={190} y1={315} x2={250} y2={315} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ecs-rc-arrow)" />
          <text x={220} y={307} textAnchor="middle" fontSize="10" fill={secondary}>引用</text>

          {/* const 调用方 */}
          <g>
            <rect x={254} y={280} width={180} height={70} rx="8" fill={danger} fillOpacity="0.07" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={344} y={302} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>const 调用方</text>
            <text x={344} y={322} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>{"IL 内仍是 10"}</text>
            <text x={344} y={340} textAnchor="middle" fontSize="11" fill={danger}>未重编译 → 静默用旧值</text>
          </g>

          {/* readonly 调用方 */}
          <g>
            <rect x={456} y={280} width={180} height={70} rx="8" fill={success} fillOpacity="0.07" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={546} y={302} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>readonly 调用方</text>
            <text x={546} y={322} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>{"运行时读到 20"}</text>
            <text x={546} y={340} textAnchor="middle" fontSize="11" fill={success}>无需重编译即正确</text>
          </g>

          {/* 底部说明 */}
          <line x1={32} y1={368} x2={VIEW_W - 32} y2={368} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="11" fill={secondary}>
            const 更快但版本脆弱 · readonly 略慢但单一数据源——跨程序集一律用 readonly
          </text>
          <text x={660} y={406} textAnchor="end" fontSize="10" fill={warning}>
            仅当值绝不会变且需极致性能时才用 const
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        const 在编译期把值烤进调用方 IL，库升级后调用方未重编译会静默使用旧值；readonly 在运行期从定义处读取，是跨程序集常量的安全默认选择。
      </figcaption>
    </figure>
  );
}
