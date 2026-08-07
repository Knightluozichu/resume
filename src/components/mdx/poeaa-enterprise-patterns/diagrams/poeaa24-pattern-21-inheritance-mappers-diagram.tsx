/**
 * <Poeaa24Pattern21InheritanceMappers step={1|2|3}>：继承映射器的专属教学图。
 *
 * 三步共用同一张“领域继承树 ↔ Mapper 继承树”骨架：
 *   1. 父 Mapper 读取鉴别器并选择具体 Mapper；
 *   2. 子 Mapper 先复用公共字段，再补齐子类字段；
 *   3. 保存沿相反方向委托，并由事务和身份约束保护写回。
 *
 * Server Component；章节外层 <Stepper> 负责步骤切换。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 470;

export type Poeaa24Pattern21InheritanceMappersStep = 1 | 2 | 3;

export type Poeaa24Pattern21InheritanceMappersProps = {
  step?: Poeaa24Pattern21InheritanceMappersStep;
};

const STEP_COPY = {
  1: {
    subtitle: "先读鉴别器，再把请求分发给具体 Mapper",
    status: "type = Engineer → EngineerMapper",
    statusColor: T.warning,
    flow: "find(id) → dispatch(type)",
    tableNote: "先得到 id、name、type；不要在父 Mapper 里猜子类。",
    objectNote: "此时只完成类型选择，还没有声称子类字段已加载。",
  },
  2: {
    subtitle: "父 Mapper 负责公共字段，子 Mapper 负责自己的字段",
    status: "公共字段 + skill → Engineer 对象",
    statusColor: T.success,
    flow: "hydrate base → load subtype",
    tableNote: "employees 公共列与 engineers.skill 被分别读取。",
    objectNote: "只有完成两段加载，返回的多态对象才可交给业务代码。",
  },
  3: {
    subtitle: "保存沿委托链回写，并把身份与事务边界说清楚",
    status: "EngineerMapper.save → EmployeeMapper.save",
    statusColor: T.accent,
    flow: "save subtype → save base",
    tableNote: "先写子类数据，再提交公共数据；失败时整体回滚。",
    objectNote: "同一个 id 只能对应一个受控实例，不能把子类写成错误类型。",
  },
} as const;

function opacityFor(
  current: Poeaa24Pattern21InheritanceMappersStep,
  active: Poeaa24Pattern21InheritanceMappersStep,
) {
  return current === active ? 1 : 0.36;
}

export function Poeaa24Pattern21InheritanceMappersDiagram({
  step = 1,
}: Poeaa24Pattern21InheritanceMappersProps) {
  const copy = STEP_COPY[step];
  const markerId = "poeaa24-inheritance-mappers-arrow";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`继承映射器第${step}步：${copy.subtitle}。左侧是 Employee、Engineer、Manager 领域类树，右侧是对应的 Mapper 树。${copy.tableNote}${copy.objectNote}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="9"
              markerHeight="8"
              refX="8"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 Z" fill={copy.statusColor} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Inheritance Mappers：领域继承 ↔ 映射委托"
          />
          <text
            x={VIEW_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {copy.subtitle}
          </text>

          {[1, 2, 3].map((value) => {
            const current = value as Poeaa24Pattern21InheritanceMappersStep;
            const x = 40 + (current - 1) * 214;
            return (
              <g key={`step-${current}`} opacity={opacityFor(current, step)}>
                <rect
                  x={x}
                  y={68}
                  width={190}
                  height={28}
                  rx="7"
                  fill={current === step ? copy.statusColor : T.secondary}
                  fillOpacity="0.1"
                  stroke={current === step ? copy.statusColor : T.border}
                  strokeWidth="1.2"
                />
                <text
                  x={x + 95}
                  y={87}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={current === step ? copy.statusColor : T.secondary}
                >
                  {current}.{" "}
                  {current === 1 ? "分发" : current === 2 ? "装载" : "保存"}
                </text>
              </g>
            );
          })}

          <text
            x="155"
            y="120"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.success}
          >
            领域类树
          </text>
          <text
            x="500"
            y="120"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.accent}
          >
            Mapper 树
          </text>

          {/* 左侧：领域继承关系，始终保持可见的语义上下文。 */}
          <g opacity={opacityFor(2, step)}>
            <rect
              x="42"
              y="132"
              width="226"
              height="48"
              rx="8"
              fill={T.bg}
              stroke={T.success}
              strokeWidth="1.5"
            />
            <text
              x="155"
              y="153"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.success}
            >
              Employee
            </text>
            <text
              x="155"
              y="170"
              textAnchor="middle"
              fontSize="11"
              fill={T.secondary}
            >
              id · name · type
            </text>
            <line
              x1="100"
              y1="180"
              x2="100"
              y2="198"
              stroke={T.secondary}
              strokeWidth="1"
            />
            <line
              x1="210"
              y1="180"
              x2="210"
              y2="198"
              stroke={T.secondary}
              strokeWidth="1"
            />
            <rect
              x="52"
              y="198"
              width="96"
              height="48"
              rx="7"
              fill={T.bg}
              stroke={T.warning}
              strokeWidth="1.4"
            />
            <text
              x="100"
              y="219"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={T.warning}
            >
              Engineer
            </text>
            <text
              x="100"
              y="236"
              textAnchor="middle"
              fontSize="11"
              fill={T.secondary}
            >
              skill
            </text>
            <rect
              x="162"
              y="198"
              width="96"
              height="48"
              rx="7"
              fill={T.bg}
              stroke={T.accent}
              strokeWidth="1.4"
            />
            <text
              x="210"
              y="219"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={T.accent}
            >
              Manager
            </text>
            <text
              x="210"
              y="236"
              textAnchor="middle"
              fontSize="11"
              fill={T.secondary}
            >
              budget
            </text>
          </g>

          {/* 中间箭头：类型边界不是“复制类”，而是分发与委托协议。 */}
          <line
            x1="274"
            y1="175"
            x2="304"
            y2="175"
            stroke={copy.statusColor}
            strokeWidth="1.7"
            markerEnd={`url(#${markerId})`}
          />
          <text
            x="289"
            y="163"
            textAnchor="middle"
            fontSize="11"
            fill={copy.statusColor}
          >
            映射
          </text>

          {/* 右侧：Mapper 继承关系，步骤 1/2/3 分别突出分发、装载、保存。 */}
          <g opacity={opacityFor(1, step)}>
            <rect
              x="320"
              y="132"
              width="360"
              height="48"
              rx="8"
              fill={T.bg}
              stroke={step === 1 ? T.warning : T.accent}
              strokeWidth="1.5"
            />
            <text
              x="500"
              y="153"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={step === 1 ? T.warning : T.accent}
            >
              EmployeeMapper
            </text>
            <text
              x="500"
              y="170"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.secondary}
            >
              find(id) → read type → choose child
            </text>
            <line
              x1="420"
              y1="180"
              x2="420"
              y2="198"
              stroke={T.secondary}
              strokeWidth="1"
            />
            <line
              x1="580"
              y1="180"
              x2="580"
              y2="198"
              stroke={T.secondary}
              strokeWidth="1"
            />
            <rect
              x="330"
              y="198"
              width="180"
              height="48"
              rx="7"
              fill={T.bg}
              stroke={T.warning}
              strokeWidth="1.4"
            />
            <text
              x="420"
              y="219"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={T.warning}
            >
              EngineerMapper
            </text>
            <text
              x="420"
              y="236"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.secondary}
            >
              type = Engineer
            </text>
            <rect
              x="490"
              y="198"
              width="180"
              height="48"
              rx="7"
              fill={T.bg}
              stroke={T.accent}
              strokeWidth="1.4"
            />
            <text
              x="580"
              y="219"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={T.accent}
            >
              ManagerMapper
            </text>
            <text
              x="580"
              y="236"
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={T.secondary}
            >
              type = Manager
            </text>
          </g>

          <g opacity={opacityFor(2, step)}>
            <rect
              x="320"
              y="132"
              width="360"
              height="114"
              rx="8"
              fill={T.bg}
              stroke={T.success}
              strokeWidth="1.8"
            />
            <text
              x="500"
              y="154"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.success}
            >
              EngineerMapper.load(id)
            </text>
            <text
              x="338"
              y="178"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              super.loadBase(id) → id, name
            </text>
            <text
              x="338"
              y="199"
              fontSize="11"
              fontFamily="monospace"
              fill={T.warning}
            >
              loadSubtype(id) → skill
            </text>
            <text x="338" y="224" fontSize="11" fill={T.secondary}>
              两段都完成，才返回 Engineer 对象
            </text>
          </g>

          <g opacity={opacityFor(3, step)}>
            <rect
              x="320"
              y="132"
              width="360"
              height="114"
              rx="8"
              fill={T.bg}
              stroke={T.accent}
              strokeWidth="1.8"
            />
            <text
              x="500"
              y="154"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={T.accent}
            >
              EngineerMapper.save(engineer)
            </text>
            <text
              x="338"
              y="178"
              fontSize="11"
              fontFamily="monospace"
              fill={T.warning}
            >
              saveSubtype(skill) → engineers
            </text>
            <text
              x="338"
              y="199"
              fontSize="11"
              fontFamily="monospace"
              fill={T.success}
            >
              super.saveBase(id) → employees
            </text>
            <text x="338" y="224" fontSize="11" fill={T.secondary}>
              transaction：任一段失败，整体回滚
            </text>
          </g>

          {/* 底部：把表行、对象结果和当前步骤的验收条件连起来。 */}
          <rect
            x="42"
            y="278"
            width="226"
            height="112"
            rx="8"
            fill={T.bg}
            stroke={step === 1 ? T.warning : T.border}
            strokeWidth="1.4"
          />
          <text
            x="155"
            y="301"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.warning}
          >
            employees 行
          </text>
          <text
            x="58"
            y="325"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id: 7
          </text>
          <text
            x="58"
            y="345"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            name: "Ada"
          </text>
          <text
            x="58"
            y="365"
            fontSize="11"
            fontFamily="monospace"
            fill={T.warning}
          >
            type: Engineer
          </text>
          <text x="58" y="382" fontSize="11" fill={T.secondary}>
            {copy.tableNote}
          </text>

          <line
            x1="270"
            y1="334"
            x2="390"
            y2="334"
            stroke={copy.statusColor}
            strokeWidth="1.7"
            markerEnd={`url(#${markerId})`}
          />
          <text
            x="330"
            y="322"
            textAnchor="middle"
            fontSize="11"
            fontFamily="monospace"
            fill={copy.statusColor}
          >
            {copy.flow}
          </text>

          <rect
            x="400"
            y="278"
            width="280"
            height="112"
            rx="8"
            fill={T.bg}
            stroke={copy.statusColor}
            strokeWidth="1.6"
          />
          <text
            x="540"
            y="301"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={copy.statusColor}
          >
            验收状态
          </text>
          <text
            x="416"
            y="326"
            fontSize="11"
            fontWeight="700"
            fill={copy.statusColor}
          >
            {copy.status}
          </text>
          <text x="416" y="348" fontSize="11" fill={T.secondary}>
            {copy.objectNote}
          </text>
          <text x="416" y="375" fontSize="11" fill={T.secondary}>
            责任链可追踪 · 失败可回滚
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="父 Mapper 复用公共映射，子 Mapper 承担类型特有字段；加载与保存都必须保住身份和事务边界"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Inheritance Mappers 让 Mapper 继承树与领域类树保持可解释的对应关系：父
        Mapper 负责公共字段和类型分发，子 Mapper
        负责特有字段，委托链由事务与身份规则收口。
      </figcaption>
    </figure>
  );
}

// 保留旧导出名，避免已有章节或缓存中的 MDX 引用失效；新章节使用 Diagram 后缀供质量审计识别专属视觉证据。
export const Poeaa24Pattern21InheritanceMappers =
  Poeaa24Pattern21InheritanceMappersDiagram;
