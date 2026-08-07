/**
 * <Poeaa24Pattern19ClassTableInheritance step={1|2|3}>：类表继承专属教学图。
 *
 * 三个步骤沿着同一条真实映射链推进：共享主键建模 → 事务写入与 JOIN 恢复
 * → 多态查询暴露读取成本。章节外层 Stepper 提供步进、播放、进度和重置。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 470;
const SUCCESS = T.success;
const WARNING = T.warning;
const DANGER = T.danger;

type Step = 1 | 2 | 3;

const STEP_LABELS: Record<Step, string> = {
  1: "共享主键：公共字段与专属字段各归其表",
  2: "事务与 JOIN：同一 ID 写入、连接、恢复",
  3: "多态查询：子类越多，读取计划越宽",
};

function stageOpacity(itemStep: Step, activeStep: Step) {
  return itemStep === activeStep ? 1 : 0.34;
}

function TableCard({
  x,
  y,
  title,
  fields,
  color,
  active,
}: {
  x: number;
  y: number;
  title: string;
  fields: readonly string[];
  color: string;
  active: boolean;
}) {
  return (
    <g opacity={active ? 1 : 0.74}>
      <rect
        x={x}
        y={y}
        width={236}
        height={76}
        rx="8"
        fill={T.bg}
        stroke={color}
        strokeWidth={active ? 2 : 1.2}
      />
      <rect
        x={x}
        y={y}
        width={236}
        height={28}
        rx="8"
        fill={color}
        fillOpacity="0.12"
      />
      <rect
        x={x}
        y={y + 20}
        width={236}
        height={8}
        fill={color}
        fillOpacity="0.12"
      />
      <text
        x={x + 118}
        y={y + 19}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={color}
      >
        {title}
      </text>
      {fields.map((field, index) => (
        <text
          key={`${title}-${index}`}
          x={x + 16}
          y={y + 49 + index * 16}
          fontSize="11"
          fontFamily="monospace"
          fill={index === 0 ? T.primary : T.secondary}
        >
          {field}
        </text>
      ))}
    </g>
  );
}

export function Poeaa24Pattern19ClassTableInheritance({
  step = 1,
}: {
  step?: Step;
}) {
  const activeStep = step;
  const showJoin = activeStep >= 2;
  const showPolymorphic = activeStep === 3;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`类表继承第${activeStep}步：${STEP_LABELS[activeStep]}。左侧 Employee、Engineer、Manager 继承树对应右侧 employees、engineers、managers 表；子类表的 id 同时是主键和父类表外键。${showJoin ? "读取沿共享 ID JOIN，写入先父类后子类。" : "先建立同一个对象 ID 的父子表边界。"}${showPolymorphic ? "多态查询要组合多个子类读取路径并承担更宽的执行计划。" : ""}`}
          className="mx-auto block h-auto w-full min-w-[660px] max-w-[720px]"
        >
          <defs>
            <marker
              id="poeaa24-class-table-arrow"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L9 4 L0 8 Z" fill={T.accent} />
            </marker>
            <marker
              id="poeaa24-class-table-danger-arrow"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L9 4 L0 8 Z" fill={DANGER} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Class Table Inheritance：共享主键重建对象"
          />
          <text
            x={VIEW_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {STEP_LABELS[activeStep]}
          </text>

          {[1, 2, 3].map((item) => {
            const current = item as Step;
            const x = 40 + (current - 1) * 214;
            const color = current === activeStep ? T.accent : T.secondary;
            return (
              <g
                key={`stage-${current}`}
                opacity={stageOpacity(current, activeStep)}
              >
                <rect
                  x={x}
                  y={70}
                  width={190}
                  height={28}
                  rx="7"
                  fill={color}
                  fillOpacity="0.08"
                  stroke={color}
                  strokeWidth="1.2"
                />
                <text
                  x={x + 95}
                  y={89}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={color}
                >
                  {current}. {current === 1 ? "建模" : current === 2 ? "恢复" : "多态读取"}
                </text>
              </g>
            );
          })}

          {/* 左侧：对象继承树，身份在三个类节点中保持同一条链。 */}
          <rect
            x="40"
            y="126"
            width="186"
            height="220"
            rx="8"
            fill={T.primary}
            fillOpacity="0.025"
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x="133"
            y="150"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={T.primary}
          >
            对象继承树
          </text>
          <rect
            x="64"
            y="168"
            width="138"
            height="44"
            rx="7"
            fill={SUCCESS}
            fillOpacity="0.1"
            stroke={SUCCESS}
            strokeWidth={activeStep === 1 ? 2 : 1.2}
          />
          <text
            x="133"
            y="186"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={SUCCESS}
          >
            Employee
          </text>
          <text x="133" y="203" textAnchor="middle" fontSize="11" fill={T.secondary}>
            id = 42 · name
          </text>
          <line x1="133" y1="212" x2="133" y2="230" stroke={T.border} strokeWidth="1.2" />
          <line x1="105" y1="230" x2="161" y2="230" stroke={T.border} strokeWidth="1.2" />
          <line x1="105" y1="230" x2="105" y2="244" stroke={T.border} strokeWidth="1.2" />
          <line x1="161" y1="230" x2="161" y2="244" stroke={T.border} strokeWidth="1.2" />
          <rect
            x="56"
            y="244"
            width="98"
            height="44"
            rx="7"
            fill={WARNING}
            fillOpacity="0.1"
            stroke={WARNING}
            strokeWidth={activeStep === 1 ? 2 : 1.2}
          />
          <text x="105" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill={WARNING}>
            Engineer
          </text>
          <text x="105" y="279" textAnchor="middle" fontSize="11" fill={T.secondary}>
            id = 42 · skill
          </text>
          <rect
            x="112"
            y="244"
            width="98"
            height="44"
            rx="7"
            fill={T.accent}
            fillOpacity="0.1"
            stroke={T.accent}
            strokeWidth={activeStep === 1 ? 2 : 1.2}
          />
          <text x="161" y="262" textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>
            Manager
          </text>
          <text x="161" y="279" textAnchor="middle" fontSize="11" fill={T.secondary}>
            id = 77 · budget
          </text>
          <text x="133" y="321" textAnchor="middle" fontSize="11" fill={T.secondary}>
            一个对象身份 · 多张表
          </text>

          {/* 中间：关系表，三张表只重复身份，不重复公共字段。 */}
          <text x="412" y="120" textAnchor="middle" fontSize="13" fontWeight="700" fill={T.primary}>
            关系表
          </text>
          <TableCard
            x={292}
            y={132}
            title="employees"
            fields={["id (PK) = 42", "name = Lin"]}
            color={SUCCESS}
            active={activeStep === 1 || activeStep === 2}
          />
          <TableCard
            x={292}
            y={222}
            title="engineers"
            fields={["id (PK/FK) = 42", "skill = compiler"]}
            color={WARNING}
            active={activeStep === 1 || activeStep === 2}
          />
          <TableCard
            x={292}
            y={312}
            title="managers"
            fields={["id (PK/FK) = 77", "budget = 1.2M"]}
            color={T.accent}
            active={activeStep === 1 || activeStep === 3}
          />

          {/* 对象到表的映射边界。 */}
          <line
            x1="226"
            y1="190"
            x2="286"
            y2="170"
            stroke={T.accent}
            strokeWidth="1.5"
            strokeDasharray="6 3"
            markerEnd="url(#poeaa24-class-table-arrow)"
            opacity={activeStep === 1 ? 1 : 0.5}
          />
          <line
            x1="226"
            y1="266"
            x2="286"
            y2="260"
            stroke={T.accent}
            strokeWidth="1.5"
            strokeDasharray="6 3"
            markerEnd="url(#poeaa24-class-table-arrow)"
            opacity={activeStep === 1 ? 1 : 0.5}
          />
          <text x="256" y="202" textAnchor="middle" fontSize="11" fill={T.accent}>
            映射
          </text>

          {/* 第 2 步：写入顺序与 JOIN 路径。 */}
          {showJoin && (
            <g>
              <path
                d="M410 208 L410 218"
                stroke={T.accent}
                strokeWidth="2"
                markerEnd="url(#poeaa24-class-table-arrow)"
              />
              <text x="432" y="218" fontSize="11" fill={T.accent}>
                FK / JOIN
              </text>
              <path
                d="M528 260 C568 260 568 170 532 170"
                fill="none"
                stroke={SUCCESS}
                strokeWidth="1.7"
                markerEnd="url(#poeaa24-class-table-arrow)"
              />
              <text x="575" y="216" textAnchor="middle" fontSize="11" fill={SUCCESS}>
                42 → 对象
              </text>
              <text x="410" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill={T.accent}>
                写入：employees → engineers　读取：JOIN on id
              </text>
            </g>
          )}

          {/* 第 3 步：明确多态读取的额外分支与拒绝信号。 */}
          {showPolymorphic && (
            <g>
              <rect
                x="532"
                y="126"
                width="150"
                height="220"
                rx="8"
                fill={DANGER}
                fillOpacity="0.06"
                stroke={DANGER}
                strokeWidth="1.5"
              />
              <text x="607" y="150" textAnchor="middle" fontSize="13" fontWeight="700" fill={DANGER}>
                多态读取
              </text>
              <text x="548" y="177" fontSize="11" fill={T.primary}>
                LEFT JOIN / UNION ALL
              </text>
              <text x="548" y="201" fontSize="11" fill={T.secondary}>
                Engineer → skill
              </text>
              <text x="548" y="223" fontSize="11" fill={T.secondary}>
                Manager → budget
              </text>
              <line x1="548" y1="239" x2="666" y2="239" stroke={T.border} strokeWidth="1" />
              <text x="548" y="263" fontSize="11" fill={DANGER}>
                子类越多，计划越宽
              </text>
              <text x="548" y="285" fontSize="11" fill={DANGER}>
                类型判断需显式
              </text>
              <text x="548" y="319" fontSize="11" fontWeight="700" fill={WARNING}>
                测量后再比较替代方案
              </text>
            </g>
          )}

          {!showPolymorphic && (
            <rect
              x="532"
              y="126"
              width="150"
              height="220"
              rx="8"
              fill={T.primary}
              fillOpacity="0.025"
              stroke={T.border}
              strokeWidth="1"
            />
          )}
          {!showPolymorphic && (
            <g>
              <text x="607" y="154" textAnchor="middle" fontSize="13" fontWeight="700" fill={T.primary}>
                评审焦点
              </text>
              <text x="548" y="184" fontSize="11" fill={SUCCESS}>
                ✓ 公共字段只存一份
              </text>
              <text x="548" y="210" fontSize="11" fill={SUCCESS}>
                ✓ 子类身份可约束
              </text>
              <text x="548" y="236" fontSize="11" fill={T.secondary}>
                JOIN 是读取账单
              </text>
              <text x="548" y="262" fontSize="11" fill={T.secondary}>
                事务是写入边界
              </text>
              <text x="548" y="308" fontSize="11" fontWeight="700" fill={T.accent}>
                先测量，再选型
              </text>
            </g>
          )}

          <rect
            x="40"
            y="420"
            width="642"
            height="32"
            rx="8"
            fill={activeStep === 3 ? DANGER : T.accent}
            fillOpacity="0.08"
            stroke={activeStep === 3 ? DANGER : T.accent}
            strokeWidth="1.2"
          />
          <text
            x="361"
            y="441"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={activeStep === 3 ? DANGER : T.accent}
          >
            {activeStep === 3
              ? "拒绝信号：多态读取成为主路径时，比较单表、具体表或读模型"
              : activeStep === 2
                ? "同一 ID 连接父子行：约束守身份，映射器恢复对象"
                : "类表继承的核心：字段分层，身份不分裂"}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={466}
            text="每个类一张表 · 子类 id = 父类 id · JOIN 重建对象"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类表继承把公共字段放入父类表，把差异字段放入子类表；共享主键维护对象身份，JOIN 与多态读取则构成需要测量的成本。
      </figcaption>
    </figure>
  );
}

export namespace Poeaa24Pattern19ClassTableInheritance {
  export const Diagram = Poeaa24Pattern19ClassTableInheritance;
}
