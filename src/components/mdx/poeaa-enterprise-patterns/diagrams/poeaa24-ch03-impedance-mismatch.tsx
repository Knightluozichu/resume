/**
 * <Poeaa24Ch03ImpedanceMismatch>：对象-关系阻抗失配图（POEAA 第3章）。
 *
 * 左侧展示对象世界（继承、关联、多态），右侧展示关系世界（行、列、外键），
 * 中间标注冲突点。底部展示映射策略从简单到复杂的选择轴。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 480;

export function Poeaa24Ch03ImpedanceMismatch() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象-关系阻抗失配图。左侧对象世界：类有继承关系、对象间有多对多关联、方法封装行为、多态让同一接口有不同实现。右侧关系世界：表由行和列组成、关系靠外键表达、没有继承概念、数据与行为分离。中间标注五个冲突点：继承无对应、关联靠外键退化、多态无法表达、行为无处安放、粒度不匹配。底部展示映射策略选择轴：从 Active Record（简单）到 Data Mapper + Unit of Work（复杂）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="阻抗失配：对象世界 vs 关系世界" />

          {/* 左侧：对象世界 */}
          <rect x={32} y={60} width={280} height={240} rx="10" fill={T.accent} fillOpacity="0.04" stroke={T.accent} strokeWidth="1.5" />
          <text x={172} y={84} textAnchor="middle" fontSize="14" fontWeight="700" fill={T.accent}>对象世界</text>

          {/* 类框示例 */}
          <rect x={52} y={100} width={110} height={60} rx="6" fill={T.elevated} stroke={T.accent} strokeWidth="1.2" />
          <text x={107} y={118} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.primary} fontFamily="monospace">Order</text>
          <text x={60} y={136} fontSize="10" fill={T.secondary} fontFamily="monospace">- items: List</text>
          <text x={60} y={150} fontSize="10" fill={T.secondary} fontFamily="monospace">+ total(): Money</text>

          <rect x={192} y={100} width={100} height={60} rx="6" fill={T.elevated} stroke={T.accent} strokeWidth="1.2" />
          <text x={242} y={118} textAnchor="middle" fontSize="11" fontWeight="600" fill={T.primary} fontFamily="monospace">Customer</text>
          <text x={200} y={136} fontSize="10" fill={T.secondary} fontFamily="monospace">- orders: Set</text>
          <text x={200} y={150} fontSize="10" fill={T.secondary} fontFamily="monospace">+ credit()</text>

          {/* 关联线 */}
          <line x1={162} y1={130} x2={192} y2={130} stroke={T.accent} strokeWidth="1.2" />
          <text x={177} y={124} textAnchor="middle" fontSize="9" fill={T.accent}>1..*</text>

          {/* 继承 */}
          <rect x={52} y={180} width={110} height={44} rx="6" fill={T.elevated} stroke={T.accent} strokeWidth="1.2" strokeDasharray="4 2" />
          <text x={107} y={198} textAnchor="middle" fontSize="11" fontStyle="italic" fill={T.primary} fontFamily="monospace">Payment</text>
          <text x={107} y={214} textAnchor="middle" fontSize="10" fill={T.secondary}>«abstract»</text>

          <rect x={52} y={240} width={52} height={32} rx="4" fill={T.elevated} stroke={T.accent} strokeWidth="1" />
          <text x={78} y={260} textAnchor="middle" fontSize="9" fill={T.secondary}>Cash</text>
          <rect x={112} y={240} width={52} height={32} rx="4" fill={T.elevated} stroke={T.accent} strokeWidth="1" />
          <text x={138} y={260} textAnchor="middle" fontSize="9" fill={T.secondary}>Card</text>

          {/* 继承箭头 */}
          <line x1={78} y1={240} x2={95} y2={224} stroke={T.accent} strokeWidth="1" />
          <line x1={138} y1={240} x2={120} y2={224} stroke={T.accent} strokeWidth="1" />

          {/* 对象特征标注 */}
          <text x={200} y={196} fontSize="10" fill={T.secondary}>· 继承 + 多态</text>
          <text x={200} y={214} fontSize="10" fill={T.secondary}>· 对象图（关联网络）</text>
          <text x={200} y={232} fontSize="10" fill={T.secondary}>· 行为封装在对象内</text>
          <text x={200} y={250} fontSize="10" fill={T.secondary}>· 身份由引用表达</text>

          {/* 右侧：关系世界 */}
          <rect x={408} y={60} width={280} height={240} rx="10" fill="#E5B567" fillOpacity="0.04" stroke="#E5B567" strokeWidth="1.5" />
          <text x={548} y={84} textAnchor="middle" fontSize="14" fontWeight="700" fill="#E5B567">关系世界</text>

          {/* 表结构 */}
          <rect x={428} y={100} width={120} height={72} rx="6" fill={T.elevated} stroke="#E5B567" strokeWidth="1.2" />
          <rect x={428} y={100} width={120} height={20} rx="6" fill="#E5B567" fillOpacity="0.12" />
          <text x={488} y={114} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5B567" fontFamily="monospace">orders</text>
          <text x={436} y={134} fontSize="10" fill={T.secondary} fontFamily="monospace">id | cust_id</text>
          <text x={436} y={150} fontSize="10" fill={T.secondary} fontFamily="monospace">total | status</text>
          <text x={436} y={166} fontSize="10" fill={T.secondary} fontFamily="monospace">created_at</text>

          <rect x={568} y={100} width={100} height={56} rx="6" fill={T.elevated} stroke="#E5B567" strokeWidth="1.2" />
          <rect x={568} y={100} width={100} height={20} rx="6" fill="#E5B567" fillOpacity="0.12" />
          <text x={618} y={114} textAnchor="middle" fontSize="11" fontWeight="600" fill="#E5B567" fontFamily="monospace">customers</text>
          <text x={576} y={134} fontSize="10" fill={T.secondary} fontFamily="monospace">id | name</text>
          <text x={576} y={150} fontSize="10" fill={T.secondary} fontFamily="monospace">credit_limit</text>

          {/* 外键 */}
          <line x1={548} y1={130} x2={568} y2={130} stroke="#E5B567" strokeWidth="1.2" strokeDasharray="4 2" />
          <text x={558} y={124} textAnchor="middle" fontSize="9" fill="#E5B567">FK</text>

          {/* 关系特征标注 */}
          <text x={428} y={200} fontSize="10" fill={T.secondary}>· 只有行和列（扁平）</text>
          <text x={428} y={218} fontSize="10" fill={T.secondary}>· 关系靠外键（退化为 ID）</text>
          <text x={428} y={236} fontSize="10" fill={T.secondary}>· 没有继承（只有 JOIN）</text>
          <text x={428} y={254} fontSize="10" fill={T.secondary}>· 数据与行为完全分离</text>
          <text x={428} y={272} fontSize="10" fill={T.secondary}>· 身份由主键表达</text>

          {/* 中间冲突标注 */}
          <text x={VIEW_W / 2} y={320} textAnchor="middle" fontSize="12" fontWeight="700" fill={T.danger}>
            五个冲突点
          </text>
          <text x={VIEW_W / 2} y={340} textAnchor="middle" fontSize="11" fill={T.secondary}>
            ① 继承无对应 ② 关联退化为外键 ③ 多态无法表达
          </text>
          <text x={VIEW_W / 2} y={358} textAnchor="middle" fontSize="11" fill={T.secondary}>
            ④ 行为无处安放 ⑤ 粒度不匹配（对象图 vs 行集）
          </text>

          {/* 底部映射策略轴 */}
          <line x1={32} y1={380} x2={688} y2={380} stroke={T.border} strokeWidth="1" />
          <text x={VIEW_W / 2} y={402} textAnchor="middle" fontSize="12" fontWeight="600" fill={T.primary}>
            映射策略选择轴（复杂度递增）
          </text>

          <defs>
            <marker id="ch03-axis" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 z" fill={T.secondary} />
            </marker>
          </defs>
          <line x1={60} y1={424} x2={660} y2={424} stroke={T.secondary} strokeWidth="1.2" markerEnd="url(#ch03-axis)" />

          {/* 策略标注 */}
          <text x={120} y={418} textAnchor="middle" fontSize="10" fontWeight="600" fill="#3FB97F">Active Record</text>
          <text x={120} y={440} textAnchor="middle" fontSize="9" fill={T.secondary}>对象=行</text>

          <text x={280} y={418} textAnchor="middle" fontSize="10" fontWeight="600" fill="#E5B567">Row Data Gateway</text>
          <text x={280} y={440} textAnchor="middle" fontSize="9" fill={T.secondary}>网关隔离 SQL</text>

          <text x={440} y={418} textAnchor="middle" fontSize="10" fontWeight="600" fill={T.accent}>Data Mapper</text>
          <text x={440} y={440} textAnchor="middle" fontSize="9" fill={T.secondary}>独立映射层</text>

          <text x={600} y={418} textAnchor="middle" fontSize="10" fontWeight="600" fill={T.danger}>+ UoW + IdMap</text>
          <text x={600} y={440} textAnchor="middle" fontSize="9" fill={T.secondary}>完整对象图管理</text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="映射越复杂，对象模型越自由——代价是间接层和维护成本" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象模型有继承、关联、多态和行为封装；关系模型只有行、列和外键。
        两者之间的鸿沟就是「阻抗失配」。映射策略从 Active Record 到 Data Mapper + Unit of Work，
        复杂度递增，对象模型的自由度也递增。
      </figcaption>
    </figure>
  );
}
