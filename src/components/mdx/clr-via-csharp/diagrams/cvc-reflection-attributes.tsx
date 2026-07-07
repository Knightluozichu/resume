/**
 * <CvcReflectionAttributesDiagram>：反射与特性系统。
 *
 * 上半：Type 对象作为反射入口，查询方法/字段/属性/特性。
 * 下半：自定义特性的定义 → 应用 → 运行时读取流程。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CvcReflectionAttributesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="反射与特性系统。上半展示 Type 对象作为反射入口，查询方法、字段、属性、特性。下半展示自定义特性的定义、应用和运行时读取流程。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            反射与特性：运行时元数据查询
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            Type 对象是入口 · MethodInfo/PropertyInfo 查询成员 · 特性是元数据便签
          </text>

          {/* 上半：Type 对象与反射 API */}
          <text x={VIEW_W / 2} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Type 对象：反射的入口
          </text>

          {/* typeof(Dog) 中心 */}
          <rect x={260} y={90} width={200} height={40} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" />
          <text x={360} y={108} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
            typeof(Dog)
          </text>
          <text x={360} y={122} textAnchor="middle" fontSize="10" fill={secondary}>
            返回 Type 对象
          </text>

          {/* 四个查询方向 */}
          <line x1={300} y1={130} x2={150} y2={150} stroke={secondary} strokeWidth="1" />
          <line x1={330} y1={130} x2={330} y2={150} stroke={secondary} strokeWidth="1" />
          <line x1={390} y1={130} x2={390} y2={150} stroke={secondary} strokeWidth="1" />
          <line x1={420} y1={130} x2={570} y2={150} stroke={secondary} strokeWidth="1" />

          {/* GetMethods */}
          <rect x={60} y={150} width={140} height={50} rx="6" fill={elevated} stroke={success} strokeWidth="1" />
          <text x={130} y={168} textAnchor="middle" fontSize="10" fontWeight="700" fill={success} fontFamily="monospace">
            GetMethods()
          </text>
          <text x={130} y={184} textAnchor="middle" fontSize="10" fill={secondary}>
            → MethodInfo[]
          </text>

          {/* GetFields */}
          <rect x={230} y={150} width={140} height={50} rx="6" fill={elevated} stroke={warning} strokeWidth="1" />
          <text x={300} y={168} textAnchor="middle" fontSize="10" fontWeight="700" fill={warning} fontFamily="monospace">
            GetFields()
          </text>
          <text x={300} y={184} textAnchor="middle" fontSize="10" fill={secondary}>
            → FieldInfo[]
          </text>

          {/* GetProperties */}
          <rect x={380} y={150} width={140} height={50} rx="6" fill={elevated} stroke={danger} strokeWidth="1" />
          <text x={450} y={168} textAnchor="middle" fontSize="10" fontWeight="700" fill={danger} fontFamily="monospace">
            GetProperties()
          </text>
          <text x={450} y={184} textAnchor="middle" fontSize="10" fill={secondary}>
            → PropertyInfo[]
          </text>

          {/* GetCustomAttributes */}
          <rect x={530} y={150} width={140} height={50} rx="6" fill={elevated} stroke={accent} strokeWidth="1" />
          <text x={600} y={168} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent} fontFamily="monospace">
            GetCustomAttr()
          </text>
          <text x={600} y={184} textAnchor="middle" fontSize="10" fill={secondary}>
            → Attribute[]
          </text>

          {/* 动态操作 */}
          <line x1={32} y1={216} x2={VIEW_W - 32} y2={216} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={VIEW_W / 2} y={236} textAnchor="middle" fontSize="12" fontWeight="600" fill={secondary}>
            动态操作：Activator.CreateInstance · MethodInfo.Invoke · PropertyInfo.SetValue
          </text>

          {/* 分隔线 */}
          <line x1={32} y1={252} x2={VIEW_W - 32} y2={252} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：自定义特性流程 */}
          <text x={VIEW_W / 2} y={274} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            自定义特性：定义 → 应用 → 读取
          </text>

          {/* 定义 */}
          <rect x={50} y={290} width={190} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" />
          <text x={145} y={308} textAnchor="middle" fontSize="11" fontWeight="700" fill={success}>
            1. 定义特性
          </text>
          <text x={60} y={326} fontSize="10" fill={primary} fontFamily="monospace">class ColumnNameAttr</text>
          <text x={60} y={342} fontSize="10" fill={primary} fontFamily="monospace">{"  : Attribute"}</text>
          <text x={60} y={358} fontSize="10" fill={secondary} fontFamily="monospace">{"{ string Name; }"}</text>

          {/* 箭头 */}
          <line x1={240} y1={330} x2={270} y2={330} stroke={secondary} strokeWidth="1.2" markerEnd="url(#cvc-ra-arrow)" />

          {/* 应用 */}
          <rect x={270} y={290} width={190} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" />
          <text x={365} y={308} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning}>
            2. 应用特性
          </text>
          <text x={280} y={326} fontSize="10" fill={primary} fontFamily="monospace">class User</text>
          <text x={280} y={342} fontSize="10" fill={warning} fontFamily="monospace">{"[Column(\"user_id\")]"}</text>
          <text x={280} y={358} fontSize="10" fill={primary} fontFamily="monospace">public int Id {"{ get; set; }"}</text>

          {/* 箭头 */}
          <line x1={460} y1={330} x2={490} y2={330} stroke={secondary} strokeWidth="1.2" markerEnd="url(#cvc-ra-arrow)" />

          {/* 读取 */}
          <rect x={490} y={290} width={190} height={80} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" />
          <text x={585} y={308} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger}>
            3. 运行时读取
          </text>
          <text x={500} y={326} fontSize="10" fill={primary} fontFamily="monospace">prop.GetCustomAttr</text>
          <text x={500} y={342} fontSize="10" fill={primary} fontFamily="monospace">{"<ColumnNameAttr>()"}</text>
          <text x={500} y={358} fontSize="10" fill={danger} fontFamily="monospace">→ attr.Name</text>

          {/* 底部说明 */}
          <line x1={32} y1={386} x2={VIEW_W - 32} y2={386} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={404} textAnchor="middle" fontSize="11" fill={secondary}>
            特性不执行代码 · 反射读取特性并据此行动 · ORM/序列化器/DI 容器都依赖此机制
          </text>

          <defs>
            <marker id="cvc-ra-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Type 对象是反射入口，自定义特性通过定义→应用→读取三步实现运行时元数据驱动行为。
      </figcaption>
    </figure>
  );
}
