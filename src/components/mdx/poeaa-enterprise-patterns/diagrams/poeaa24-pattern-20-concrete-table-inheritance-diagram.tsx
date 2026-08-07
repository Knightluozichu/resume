/**
 * <Poeaa24Pattern20ConcreteTableInheritance step={1|2|3}>：具体表继承的专属映射图。
 *
 * 三个步骤共用 Employee → Engineer / Manager 的骨架，但每一步只推进一个判断：
 * 1. 具体类型各自拥有包含公共字段的完整表；
 * 2. 保存时统一身份与公共字段契约，避免只迁移一张表；
 * 3. 跨类型列表需要统一投影、UNION ALL 和明确的拒绝边界。
 *
 * 章节外层 Stepper 负责步骤切换和重置；这里保持确定性的 SVG Server Component。
 */
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 430;
const ACCENT = T.accent;
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

export type Poeaa24Pattern20ConcreteTableInheritanceStep = 1 | 2 | 3;

export type Poeaa24Pattern20ConcreteTableInheritanceProps = {
  step?: Poeaa24Pattern20ConcreteTableInheritanceStep;
};

const STEP_TEXT: Record<
  Poeaa24Pattern20ConcreteTableInheritanceStep,
  {
    subtitle: string;
    status: string;
    statusColor: string;
    note: string;
  }
> = {
  1: {
    subtitle: "每个具体类型自带公共字段，不建立 Employee 父表",
    status: "单类型读取",
    statusColor: SUCCESS,
    note: "Engineer 和 Manager 都能直接命中一张完整表，代价是公共列出现两份。",
  },
  2: {
    subtitle: "统一 id 与公共列契约，保存时按具体类型选择表",
    status: "成对迁移",
    statusColor: ACCENT,
    note: "新增或改变公共字段时，两张表必须一起校验、迁移和回归。",
  },
  3: {
    subtitle: "跨类型列表需要统一投影，再用 UNION ALL 合并",
    status: "拒绝边界",
    statusColor: DANGER,
    note: "跨类型查询成为主路径或公共字段频繁变化时，应比较其他继承映射。",
  },
};

export function Poeaa24Pattern20ConcreteTableInheritance({
  step = 1,
}: Poeaa24Pattern20ConcreteTableInheritanceProps) {
  const current = STEP_TEXT[step];
  const isQueryStep = step === 3;
  const tableStroke = step === 2 ? ACCENT : T.border;
  const markerId = "poeaa24-concrete-table-arrow";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`具体表继承第${step}步：${current.subtitle}。左侧是 Employee 到 Engineer 和 Manager 的继承树，中间是两张包含公共字段的具体表，右侧展示当前的读取或迁移边界。${current.note}`}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="9"
              markerHeight="9"
              refX="8"
              refY="4.5"
              orient="auto"
            >
              <path d="M0 0 L8 4.5 L0 9 Z" fill={ACCENT} />
            </marker>
            <marker
              id="poeaa24-concrete-table-warning"
              markerWidth="9"
              markerHeight="9"
              refX="8"
              refY="4.5"
              orient="auto"
            >
              <path d="M0 0 L8 4.5 L0 9 Z" fill={DANGER} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Concrete Table Inheritance：具体类各自成表"
          />
          <text
            x={VIEW_W / 2}
            y="52"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {current.subtitle}
          </text>

          {/* 左侧：对象层继承树。 */}
          <rect
            x="28"
            y="78"
            width="174"
            height="236"
            rx="8"
            fill={T.bg}
            stroke={T.border}
            strokeWidth="1.2"
          />
          <text
            x="115"
            y="101"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            对象模型
          </text>
          <rect
            x="48"
            y="120"
            width="134"
            height="42"
            rx="7"
            fill={T.primary}
            fillOpacity="0.06"
            stroke={T.secondary}
            strokeWidth="1.2"
            strokeDasharray="5 3"
          />
          <text
            x="115"
            y="146"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={T.primary}
          >
            Employee
          </text>
          <text
            x="115"
            y="159"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            id · name · hiredAt
          </text>
          <line
            x1="82"
            y1="162"
            x2="82"
            y2="188"
            stroke={T.secondary}
            strokeWidth="1"
          />
          <line
            x1="148"
            y1="162"
            x2="148"
            y2="188"
            stroke={T.secondary}
            strokeWidth="1"
          />
          <rect
            x="42"
            y="188"
            width="80"
            height="42"
            rx="7"
            fill={SUCCESS}
            fillOpacity="0.08"
            stroke={SUCCESS}
            strokeWidth="1.2"
          />
          <text
            x="82"
            y="214"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={SUCCESS}
          >
            Engineer
          </text>
          <text
            x="82"
            y="227"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            + skill
          </text>
          <rect
            x="108"
            y="242"
            width="80"
            height="42"
            rx="7"
            fill={WARNING}
            fillOpacity="0.08"
            stroke={WARNING}
            strokeWidth="1.2"
          />
          <text
            x="148"
            y="268"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={WARNING}
          >
            Manager
          </text>
          <text
            x="148"
            y="281"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            + budget
          </text>

          {/* 中间：两张具体表，公共字段在每张表中可见。 */}
          <rect
            x="228"
            y="78"
            width="278"
            height="104"
            rx="8"
            fill={T.bg}
            stroke={step === 2 ? ACCENT : SUCCESS}
            strokeWidth={step === 2 ? 2 : 1.5}
          />
          <rect
            x="228"
            y="78"
            width="278"
            height="30"
            rx="8"
            fill={SUCCESS}
            fillOpacity="0.12"
          />
          <text
            x="367"
            y="98"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={SUCCESS}
          >
            engineers
          </text>
          <text
            x="246"
            y="127"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id | name | hired_at
          </text>
          <text
            x="246"
            y="148"
            fontSize="11"
            fontFamily="monospace"
            fill={SUCCESS}
          >
            skill: "backend"
          </text>
          <text x="246" y="169" fontSize="11" fill={T.secondary}>
            {step === 2 ? "统一校验 · id=E-17" : "公共字段 + 专属字段"}
          </text>

          <rect
            x="228"
            y="198"
            width="278"
            height="104"
            rx="8"
            fill={T.bg}
            stroke={step === 2 ? ACCENT : WARNING}
            strokeWidth={step === 2 ? 2 : 1.5}
          />
          <rect
            x="228"
            y="198"
            width="278"
            height="30"
            rx="8"
            fill={WARNING}
            fillOpacity="0.12"
          />
          <text
            x="367"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={WARNING}
          >
            managers
          </text>
          <text
            x="246"
            y="247"
            fontSize="11"
            fontFamily="monospace"
            fill={T.primary}
          >
            id | name | hired_at
          </text>
          <text
            x="246"
            y="268"
            fontSize="11"
            fontFamily="monospace"
            fill={WARNING}
          >
            budget: 50000
          </text>
          <text x="246" y="289" fontSize="11" fill={T.secondary}>
            {step === 2 ? "统一校验 · id=M-08" : "公共字段 + 专属字段"}
          </text>

          <line
            x1="202"
            y1="209"
            x2="228"
            y2="130"
            stroke={SUCCESS}
            strokeWidth="1.4"
            markerEnd={`url(#${markerId})`}
          />
          <line
            x1="188"
            y1="263"
            x2="228"
            y2="250"
            stroke={WARNING}
            strokeWidth="1.4"
            markerEnd={`url(#${markerId})`}
          />
          <text x="214" y="198" fontSize="11" fill={T.secondary}>
            具体类型路由
          </text>

          {/* 右侧：随步骤变化的验收证据。 */}
          <rect
            x="530"
            y="78"
            width="162"
            height="224"
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={isQueryStep ? DANGER : tableStroke}
            strokeWidth={isQueryStep ? 2 : 1.2}
          />
          <text
            x="611"
            y="101"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={isQueryStep ? DANGER : T.primary}
          >
            {step === 1 ? "直接读取" : step === 2 ? "迁移检查" : "跨类型查询"}
          </text>
          {step === 1 && (
            <>
              <text x="548" y="132" fontSize="11" fill={SUCCESS}>
                SELECT *
              </text>
              <text x="548" y="153" fontSize="11" fill={SUCCESS}>
                FROM engineers
              </text>
              <text x="548" y="184" fontSize="11" fill={T.secondary}>
                一张表 · 少一次 JOIN
              </text>
              <text x="548" y="207" fontSize="11" fill={T.secondary}>
                适合单类详情
              </text>
              <text x="548" y="250" fontSize="11" fill={WARNING}>
                公共列已有两份
              </text>
              <text x="548" y="272" fontSize="11" fill={T.secondary}>
                迁移需同步维护
              </text>
            </>
          )}
          {step === 2 && (
            <>
              <text x="548" y="132" fontSize="11" fill={ACCENT}>
                hired_at → 2 张表
              </text>
              <text x="548" y="155" fontSize="11" fill={ACCENT}>
                id → 同一生成策略
              </text>
              <text x="548" y="190" fontSize="11" fill={SUCCESS}>
                ✓ engineers
              </text>
              <text x="548" y="212" fontSize="11" fill={SUCCESS}>
                ✓ managers
              </text>
              <text x="548" y="258" fontSize="11" fill={WARNING}>
                成对迁移与回归
              </text>
              <text x="548" y="280" fontSize="11" fill={T.secondary}>
                漏一张就破坏契约
              </text>
            </>
          )}
          {step === 3 && (
            <>
              <text x="548" y="132" fontSize="11" fill={DANGER}>
                SELECT common...
              </text>
              <text x="548" y="153" fontSize="11" fill={DANGER}>
                FROM engineers
              </text>
              <text x="548" y="174" fontSize="11" fill={DANGER}>
                UNION ALL
              </text>
              <text x="548" y="195" fontSize="11" fill={DANGER}>
                SELECT ... managers
              </text>
              <text x="548" y="230" fontSize="11" fill={T.secondary}>
                同列投影 + kind
              </text>
              <text x="548" y="254" fontSize="11" fill={DANGER}>
                跨类成主路径？
              </text>
              <text x="548" y="277" fontSize="11" fill={T.secondary}>
                比较其他映射
              </text>
            </>
          )}

          <rect
            x="28"
            y="330"
            width="664"
            height="58"
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={current.statusColor}
            strokeWidth="1.2"
          />
          <text
            x="46"
            y="353"
            fontSize="12"
            fontWeight="700"
            fill={current.statusColor}
          >
            步骤 {step} · {current.status}
          </text>
          <text x="46" y="375" fontSize="11" fill={T.secondary}>
            {current.note}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={414}
            text="重复字段换取单类读取直接；跨类型查询与公共字段迁移必须显式承担成本"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        具体表继承不建立父表：每张具体表都包含公共字段；单类读取更直白，但 UNION ALL 与成对迁移必须有明确边界。
      </figcaption>
    </figure>
  );
}

// 保留既有章节导出名，同时提供以 Diagram 结尾的成员名供 MDX 与审计识别。
export namespace Poeaa24Pattern20ConcreteTableInheritance {
  export const Diagram = Poeaa24Pattern20ConcreteTableInheritance;
}
