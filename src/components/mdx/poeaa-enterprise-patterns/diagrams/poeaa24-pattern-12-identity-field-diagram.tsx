/**
 * <Poeaa24Pattern12IdentityFieldDiagram step={1|2|3}>：标识字段的身份生命周期图。
 *
 * 三个步骤保持同一对象—关系行骨架，只改变身份状态：
 *   1. 已有行用 id=42 建立对应关系；
 *   2. 新对象先用临时身份，避免空值让两个对象相撞；
 *   3. 写回后把数据库主键放回同一个对象，保持引用稳定。
 *
 * Server Component；由章节专属 <Stepper> 驱动步骤切换。
 */
import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 390;
const ACCENT = "var(--accent)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

export type Poeaa24Pattern12IdentityFieldDiagramProps = {
  step?: 1 | 2 | 3;
};

export function Poeaa24Pattern12IdentityFieldDiagram({
  step = 1,
}: Poeaa24Pattern12IdentityFieldDiagramProps) {
  const isDraft = step === 2;
  const objectId = step === 1 ? "id: 42" : isDraft ? "id: temp-7" : "id: 43";
  const rowId = step === 1 ? "id: 42  ← PK" : isDraft ? "id: —  (未插入)" : "id: 43  ← PK";
  const identityColor = isDraft ? WARNING : SUCCESS;
  const relationColor = isDraft ? WARNING : ACCENT;
  const relationLabel = step === 1 ? "主键对应" : isDraft ? "等待写回" : "同一引用";
  const status = step === 1 ? "已持久化" : isDraft ? "待持久化" : "写回完成";
  const statusColor = isDraft ? WARNING : SUCCESS;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`标识字段步骤${step}：${status}。内存对象 ${objectId} 与 orders 表中的 ${rowId} 通过标识字段建立身份关系。${isDraft ? "新对象尚未写入数据库，临时身份避免空值冲突。" : "对象引用保持稳定，不需要比较全部字段。"}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="poeaa24-identity-field-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 Z" fill={relationColor} />
            </marker>
          </defs>

          <DiagramTitle x={VIEW_W / 2} y={32} text="Identity Field：对象身份 ↔ 关系行" />
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={T.secondary}>
            {step === 1 ? "先用数据库主键找到同一行" : isDraft ? "新对象先获得可追踪的临时身份" : "提交主键后仍沿用同一个对象引用"}
          </text>

          {/* 内存对象 */}
          <rect x="40" y="78" width="270" height="166" rx="8" fill={T.bg} stroke={identityColor} strokeWidth="1.5" />
          <rect x="40" y="78" width="270" height="30" rx="8" fill={identityColor} fillOpacity="0.12" />
          <rect x="40" y="100" width="270" height="8" fill={identityColor} fillOpacity="0.12" />
          <text x="175" y="99" textAnchor="middle" fontSize="12" fontWeight="700" fill={identityColor}>Order（内存对象）</text>
          <text x="58" y="132" fontSize="11" fontFamily="monospace" fill={identityColor}>{objectId}</text>
          <text x="58" y="154" fontSize="11" fontFamily="monospace" fill={T.primary}>customer: Customer</text>
          <text x="58" y="176" fontSize="11" fontFamily="monospace" fill={T.primary}>amount: 199.00</text>
          <text x="58" y="198" fontSize="11" fontFamily="monospace" fill={T.primary}>status: "pending"</text>
          <text x="58" y="225" fontSize="11" fill={T.secondary}>{isDraft ? "引用可追踪，但尚未有关系行" : "对象身份不等于字段值相等"}</text>

          {/* 身份关系 */}
          <line x1="310" y1="144" x2="410" y2="144" stroke={relationColor} strokeWidth="1.8" strokeDasharray="6 3" markerEnd="url(#poeaa24-identity-field-arrow)" />
          <text x="360" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill={relationColor}>{relationLabel}</text>

          {/* 关系行 */}
          <rect x="410" y="78" width="270" height="166" rx="8" fill={T.bg} stroke={WARNING} strokeWidth="1.5" />
          <rect x="410" y="78" width="270" height="30" rx="8" fill={WARNING} fillOpacity="0.12" />
          <rect x="410" y="100" width="270" height="8" fill={WARNING} fillOpacity="0.12" />
          <text x="545" y="99" textAnchor="middle" fontSize="12" fontWeight="700" fill={WARNING}>orders 表（关系行）</text>
          <text x="428" y="132" fontSize="11" fontFamily="monospace" fill={WARNING}>{rowId}</text>
          <text x="428" y="154" fontSize="11" fontFamily="monospace" fill={T.primary}>customer_id: 7</text>
          <text x="428" y="176" fontSize="11" fontFamily="monospace" fill={T.primary}>amount: 199.00</text>
          <text x="428" y="198" fontSize="11" fontFamily="monospace" fill={T.primary}>status: 'pending'</text>
          <text x="428" y="225" fontSize="11" fill={T.secondary}>{isDraft ? "插入后才分配数据库主键" : "主键是这一行的稳定坐标"}</text>

          {/* 当前步骤结论；第二步额外展示错误边界 */}
          <rect x="40" y="270" width="640" height="70" rx="8" fill={T.primary} fillOpacity="0.03" stroke={isDraft ? DANGER : T.border} strokeWidth="1" />
          <text x="58" y="294" fontSize="11" fontWeight="700" fill={statusColor}>步骤 {step} · {status}</text>
          <text x="58" y="315" fontSize="11" fill={T.secondary}>
            {step === 1 ? "id=42 让对象与 orders.id=42 可追踪对应；更新状态时不必扫描全部字段。" : isDraft ? "temp-7 只负责内存内区分新对象，保存成功后再换成数据库主键。" : "对象本身没有被替换；所有持有它的引用仍能看到写回后的 id=43。"}
          </text>
          {isDraft ? (
            <text x="58" y="334" fontSize="11" fill={DANGER}>错误边界：id = null 会让两个新对象看起来像同一个对象。</text>
          ) : (
            <text x="58" y="334" fontSize="11" fill={ACCENT}>判断依据：比较身份坐标，不把 amount/status 等值字段当成身份。</text>
          )}

          <DiagramCaption x={VIEW_W / 2} y={378} text="标识字段把对象身份生命周期与关系行主键对齐" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每一步只改变身份状态：已有行直接对应、新对象先暂存临时身份、写回后把主键放回同一个对象。
      </figcaption>
    </figure>
  );
}

// 兼容现有章节组件注册表；目标章正文使用带 Diagram 后缀的专属名称。
export const Poeaa24Pattern12IdentityField = Poeaa24Pattern12IdentityFieldDiagram;
