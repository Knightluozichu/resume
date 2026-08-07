/**
 * <Poeaa24Pattern17SerializedLob step={1|2|3}>：序列化 LOB 的专属映射图。
 *
 * 三个步骤共用一条“对象图 → 载荷 → 关系行”的骨架：
 *   1. 对象图被整体编码进单个 BLOB/CLOB 字段；
 *   2. 载荷信封先经过版本与校验，再交给反序列化器；
 *   3. 内部查询和局部并发出现时，整块读写暴露出拒绝边界。
 *
 * 章节外层 <Stepper> 负责步骤切换和重置；组件保持 Server Component，
 * 让 SVG 在移动端按 viewBox 缩放，并把读者注意力集中在当前步骤的因果变化上。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 390;

const ACCENT = T.accent;
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

export type Poeaa24Pattern17SerializedLobProps = {
  step?: 1 | 2 | 3;
};

const STEP_TEXT = {
  1: {
    subtitle: "对象图整体编码：数据库只知道主键和一个大字段",
    relation: "serialize()",
    status: "整体读写边界",
    statusColor: SUCCESS,
    note: "优势：一次 I/O 恢复完整订单；代价：LOB 内部字段不能直接参与普通 SQL 查询。",
  },
  2: {
    subtitle: "先验证载荷信封，再迁移版本，最后恢复对象图",
    relation: "validate → migrate → deserialize",
    status: "可演进载荷",
    statusColor: ACCENT,
    note: "版本或校验失败时停在载荷边界，不把半棵对象树交给业务层。",
  },
  3: {
    subtitle: "内部查询与局部并发出现：整块读写成为拒绝信号",
    relation: "query / conflict",
    status: "考虑拆分",
    statusColor: DANGER,
    note: "按 SKU 搜索或局部并发修改若是硬需求，应提取关系字段或改用关系映射。",
  },
} as const;

export function Poeaa24Pattern17SerializedLob({
  step = 1,
}: Poeaa24Pattern17SerializedLobProps) {
  const current = STEP_TEXT[step];
  const showEnvelope = step >= 2;
  const showReject = step === 3;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`序列化 LOB 第${step}步：${current.subtitle}。左侧 Order 对象图包含订单明细和优惠券，中间是序列化载荷，右侧是 orders 表的一行。${current.note}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="serialized-lob-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 Z" fill={ACCENT} />
            </marker>
            <marker
              id="serialized-lob-warn-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 Z" fill={DANGER} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Serialized LOB：对象图 → 单字段 → 整体恢复"
          />
          <text
            x={VIEW_W / 2}
            y={51}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {current.subtitle}
          </text>

          {/* 对象图：左侧保持稳定，突出被整体编码的边界。 */}
          <rect
            x="32"
            y="76"
            width="202"
            height="158"
            rx="8"
            fill={T.bg}
            stroke={SUCCESS}
            strokeWidth="1.5"
          />
          <rect
            x="32"
            y="76"
            width="202"
            height="30"
            rx="8"
            fill={SUCCESS}
            fillOpacity="0.12"
          />
          <rect
            x="32"
            y="98"
            width="202"
            height="8"
            fill={SUCCESS}
            fillOpacity="0.12"
          />
          <text
            x="133"
            y="97"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={SUCCESS}
          >
            Order 对象图
          </text>
          <text
            x="48"
            y="130"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id: 42
          </text>
          <text
            x="48"
            y="150"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            items: [A×2, B×1]
          </text>
          <text
            x="48"
            y="170"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            coupon: 10%
          </text>
          <text
            x="48"
            y="190"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            {"priceSnapshot: {...}"}
          </text>
          <text x="48" y="216" fontSize="11" fill={T.secondary}>
            嵌套对象 + 集合
          </text>

          {/* 中间载荷：第二步开始揭示可演进信封。 */}
          <line
            x1="234"
            y1="154"
            x2="286"
            y2="154"
            stroke={ACCENT}
            strokeWidth="1.6"
            markerEnd="url(#serialized-lob-arrow)"
          />
          <text x="260" y="143" textAnchor="middle" fontSize="11" fill={ACCENT}>
            {current.relation}
          </text>
          <rect
            x="286"
            y="76"
            width="148"
            height="158"
            rx="8"
            fill={T.bg}
            stroke={showReject ? DANGER : ACCENT}
            strokeWidth={showReject ? 2 : 1.5}
          />
          <rect
            x="286"
            y="76"
            width="148"
            height="30"
            rx="8"
            fill={ACCENT}
            fillOpacity="0.12"
          />
          <rect
            x="286"
            y="98"
            width="148"
            height="8"
            fill={ACCENT}
            fillOpacity="0.12"
          />
          <text
            x="360"
            y="97"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={ACCENT}
          >
            snapshot
          </text>
          {showEnvelope ? (
            <>
              <text
                x="302"
                y="130"
                fontSize="11"
                fontFamily="monospace"
                fill={T.primary}
              >
                v: 2
              </text>
              <text
                x="302"
                y="150"
                fontSize="11"
                fontFamily="monospace"
                fill={SUCCESS}
              >
                crc: valid
              </text>
              <text
                x="302"
                y="170"
                fontSize="11"
                fontFamily="monospace"
                fill={T.primary}
              >
                {"payload: {...}"}
              </text>
              <text
                x="302"
                y="198"
                fontSize="11"
                fill={showReject ? DANGER : T.secondary}
              >
                {showReject ? "整块重写" : "先校验再迁移"}
              </text>
            </>
          ) : (
            <>
              <text
                x="302"
                y="132"
                fontSize="11"
                fontFamily="monospace"
                fill={ACCENT}
              >
                BLOB / CLOB
              </text>
              <text
                x="302"
                y="154"
                fontSize="11"
                fontFamily="monospace"
                fill={T.secondary}
              >
                {'{"id":42,...}'}
              </text>
              <text x="302" y="182" fontSize="11" fill={T.secondary}>
                一个大字段
              </text>
              <text x="302" y="204" fontSize="11" fill={T.secondary}>
                数据库不懂内部路径
              </text>
            </>
          )}

          {/* 关系行：主键可查询，载荷内部不可直接索引。 */}
          <line
            x1="434"
            y1="154"
            x2="486"
            y2="154"
            stroke={showReject ? DANGER : ACCENT}
            strokeWidth="1.6"
            markerEnd={
              showReject
                ? "url(#serialized-lob-warn-arrow)"
                : "url(#serialized-lob-arrow)"
            }
          />
          <text
            x="460"
            y="143"
            textAnchor="middle"
            fontSize="11"
            fill={showReject ? DANGER : ACCENT}
          >
            {showReject ? "query?" : "写入"}
          </text>
          <rect
            x="486"
            y="76"
            width="202"
            height="158"
            rx="8"
            fill={T.bg}
            stroke={WARNING}
            strokeWidth="1.5"
          />
          <rect
            x="486"
            y="76"
            width="202"
            height="30"
            rx="8"
            fill={WARNING}
            fillOpacity="0.12"
          />
          <rect
            x="486"
            y="98"
            width="202"
            height="8"
            fill={WARNING}
            fillOpacity="0.12"
          />
          <text
            x="587"
            y="97"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={WARNING}
          >
            orders 表（一行）
          </text>
          <text
            x="502"
            y="130"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id: 42 ← 可索引
          </text>
          <text
            x="502"
            y="152"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            tenant_id: 7
          </text>
          <text
            x="502"
            y="174"
            fontSize="11"
            fontFamily="monospace"
            fill={WARNING}
          >
            snapshot: LOB
          </text>
          <text
            x="502"
            y="202"
            fontSize="11"
            fill={showReject ? DANGER : T.secondary}
          >
            {showReject ? "按 SKU：拒绝黑盒查询" : "按主键取整行"}
          </text>

          {/* 第二步的恢复门：明确“先验证，再进入业务层”。 */}
          {step === 2 && (
            <>
              <rect
                x="32"
                y="254"
                width="656"
                height="52"
                rx="8"
                fill={SUCCESS}
                fillOpacity="0.08"
                stroke={SUCCESS}
                strokeWidth="1.2"
              />
              <text
                x="48"
                y="276"
                fontSize="11"
                fontWeight="700"
                fill={SUCCESS}
              >
                恢复门：schemaVersion → checksum → migrate → deserialize
              </text>
              <text x="48" y="296" fontSize="11" fill={T.secondary}>
                任何一步失败都在载荷边界返回可诊断错误，不生成半成品 Order。
              </text>
            </>
          )}

          {/* 第三步的失败边界：查询与局部并发是模式拒绝信号。 */}
          {step === 3 && (
            <>
              <rect
                x="32"
                y="254"
                width="656"
                height="52"
                rx="8"
                fill={DANGER}
                fillOpacity="0.08"
                stroke={DANGER}
                strokeWidth="1.2"
              />
              <text x="48" y="276" fontSize="11" fontWeight="700" fill={DANGER}>
                拒绝信号：内部查询或局部并发要求超过整行读写粒度
              </text>
              <text x="48" y="296" fontSize="11" fill={T.secondary}>
                提取可索引关系列，或把独立修改的部分迁移到关系结构 / 读模型。
              </text>
            </>
          )}

          {step === 1 && (
            <rect
              x="32"
              y="254"
              width="656"
              height="52"
              rx="8"
              fill={T.primary}
              fillOpacity="0.03"
              stroke={T.border}
              strokeWidth="1"
            />
          )}
          <text
            x="48"
            y="276"
            fontSize="11"
            fontWeight="700"
            fill={current.statusColor}
          >
            步骤 {step} · {current.status}
          </text>
          <text x="48" y="296" fontSize="11" fill={T.secondary}>
            {current.note}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={358}
            text="主键和外部筛选字段仍可保持关系语义；LOB 内部是应用负责的版本化载荷"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        序列化 LOB
        把整体对象图换成一次读写；当查询和并发需要更细粒度时，图中的“单字段”就是必须正视的边界。
      </figcaption>
    </figure>
  );
}

// 注册表继续暴露原函数；命名空间属性让 MDX 可以用可审计的 Diagram 名称复用同一实现。
export namespace Poeaa24Pattern17SerializedLob {
  export const Diagram = Poeaa24Pattern17SerializedLob;
}
