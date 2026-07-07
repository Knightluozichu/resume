/**
 * <EmcTypeDeductionChart>：模板 / auto / decltype 三种类型推导对比。
 *
 * 三列对比 C++ 的三套类型推导机制：
 *   - 第 1 列「模板类型推导」（accent 紫）：ParamType 为引用/指针、通用引用、按值
 *   - 第 2 列「auto 类型推导」（success 绿）：同模板规则，但花括号初始化推导为 initializer_list
 *   - 第 3 列「decltype」（warning 暖）：保留引用与 cv 限定，decltype(auto) 透传
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const COL_W = 200;
const COL_GAP = 28;
const COL_MARGIN = 36;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

const RULE_H = 64;
const RULE_GAP = 12;
const RULE_START_Y = 120;
const ruleY = (i: number) => RULE_START_Y + i * (RULE_H + RULE_GAP);

interface Rule {
  title: string;
  desc: string;
}

interface Column {
  title: string;
  color: string;
  rules: Rule[];
}

const COLUMNS: readonly Column[] = [
  {
    title: "模板类型推导",
    color: "var(--accent)",
    rules: [
      { title: "ParamType 是引用/指针", desc: "忽略实参的引用性，按模式匹配 cv" },
      { title: "ParamType 是通用引用", desc: "左值实参 → T 推为 T&；右值 → T" },
      { title: "ParamType 按值", desc: "忽略实参引用与顶层 cv" },
      { title: "数组/函数实参", desc: "按值退化为指针，按引用保留类型" },
    ],
  },
  {
    title: "auto 类型推导",
    color: "var(--success)",
    rules: [
      { title: "与模板规则相同", desc: "auto 替代 T，顶层 cv 处理一致" },
      { title: "花括号初始化不同", desc: "auto x{1} 推为 initializer_list，模板则报错" },
      { title: "auto&& 通用引用", desc: "左值初始化 → auto 推为 T&" },
      { title: "直接初始化", desc: "auto x(1) 推为 int，非 initializer_list" },
    ],
  },
  {
    title: "decltype",
    color: "var(--warning)",
    rules: [
      { title: "变量/表达式", desc: "返回精确类型，保留引用与 cv" },
      { title: "decltype(auto)", desc: "用 auto 的初始化走 decltype 规则透传" },
      { title: "左值表达式", desc: "对左值（含变量加括号）返回 T&" },
      { title: "函数返回值", desc: "尾随返回 decltype 便于转发" },
    ],
  },
];

export function EmcTypeDeductionChart() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="三种类型推导对比图。三列并排：第 1 列模板类型推导（紫色），规则包括 ParamType 为引用/指针、通用引用、按值、数组函数退化；第 2 列 auto 类型推导（绿色），规则包括与模板相同、花括号初始化推导为 initializer_list、auto&& 通用引用、直接初始化；第 3 列 decltype（暖色），规则包括返回精确类型保留引用 cv、decltype(auto) 透传、左值表达式返回 T&、尾随返回类型。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            三种类型推导机制对比
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            模板类型推导 · auto 类型推导 · decltype
          </text>

          {/* 三列 */}
          {COLUMNS.map((col, ci) => {
            const cx = colX(ci);
            return (
              <g key={col.title}>
                {/* 列标题 */}
                <rect x={cx} y={78} width={COL_W} height={30} rx="6" fill={col.color} fillOpacity="0.14" stroke={col.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={98} textAnchor="middle" fontSize="13" fontWeight="700" fill={col.color}>
                  {col.title}
                </text>

                {/* 规则条目 */}
                {col.rules.map((rule, ri) => {
                  const y = ruleY(ri);
                  return (
                    <g key={rule.title}>
                      <rect x={cx} y={y} width={COL_W} height={RULE_H} rx="8" fill={col.color} fillOpacity="0.06" stroke={col.color} strokeWidth="1.3" strokeOpacity="0.5" />
                      <text x={cx + 12} y={y + 24} fontSize="11.5" fontWeight="700" fill={col.color}>
                        {rule.title}
                      </text>
                      <text x={cx + 12} y={y + 44} fontSize="11" fill="var(--text-primary)">
                        {rule.desc}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* 底部总结 */}
          <line x1={32} y1={448} x2={VIEW_W - 32} y2={448} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={470} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            auto 与模板同源，唯独花括号初始化不同；decltype 精确保留引用与 cv
          </text>
          <text x={VIEW_W / 2} y={488} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
            decltype(auto) = 用 auto 语法走 decltype 规则
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模板类型推导与 auto 同源（仅花括号初始化处理不同），decltype 则精确保留引用与 cv 限定，三者各有适用场景。
      </figcaption>
    </figure>
  );
}
