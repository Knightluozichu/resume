/**
 * <EfcTemplateDesignDiagram>：模板设计（模板与泛型章）。
 *
 * 上半部分展示模板的类型参数体系：
 *   - 主模板（primary template）
 *   - 全特化（full specialization）
 *   - 偏特化（partial specialization）
 * 下半部分对比模板 vs 继承两种代码复用范式：
 *   - 模板：编译期多态，隐式接口，零运行时开销
 *   - 继承：运行期多态，显式接口，虚表开销
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const border = "var(--border)";

export function EfcTemplateDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模板设计图。上半部分展示模板特化体系：主模板、全特化、偏特化。下半部分对比模板 vs 继承：模板是编译期多态隐式接口零开销，继承是运行期多态显式接口虚表开销。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="efc-td-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            模板设计：特化体系与多态对比
          </text>

          {/* ===== 上半部分：特化体系 ===== */}
          <text x={32} y={56} fontSize="12.5" fontWeight="700" fill={accent}>
            模板特化体系
          </text>

          {/* 主模板 */}
          <rect x={48} y={72} width={200} height={66} rx="10" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.6" />
          <text x={148} y={94} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent} fontFamily="monospace">primary template</text>
          <text x={148} y={112} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">template&lt;typename T&gt;</text>
          <text x={148} y={128} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">class Widget&lt;T&gt; {}</text>

          {/* 箭头分叉 */}
          <line x1={248} y1={105} x2={300} y2={105} stroke={secondary} strokeWidth="1.6" markerEnd="url(#efc-td-arrow)" />
          <line x1={300} y1={105} x2={300} y2={80} stroke={secondary} strokeWidth="1.4" />
          <line x1={300} y1={80} x2={354} y2={80} stroke={secondary} strokeWidth="1.4" markerEnd="url(#efc-td-arrow)" />
          <line x1={300} y1={105} x2={300} y2={130} stroke={secondary} strokeWidth="1.4" />
          <line x1={300} y1={130} x2={354} y2={130} stroke={secondary} strokeWidth="1.4" markerEnd="url(#efc-td-arrow)" />

          {/* 全特化 */}
          <rect x={360} y={56} width={168} height={52} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.5" />
          <text x={444} y={76} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>全特化</text>
          <text x={444} y={94} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">Widget&lt;int&gt;</text>

          {/* 偏特化 */}
          <rect x={360} y={118} width={168} height={52} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.5" />
          <text x={444} y={138} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>偏特化</text>
          <text x={444} y={156} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">Widget&lt;T*&gt;</text>

          {/* 说明 */}
          <text x={560} y={76} fontSize="11" fill={secondary}>所有参数已确定</text>
          <text x={560} y={138} fontSize="11" fill={secondary}>部分参数有约束</text>

          {/* ===== 分隔线 ===== */}
          <line x1={32} y1={196} x2={VIEW_W - 32} y2={196} stroke={border} strokeWidth="1" strokeDasharray="6 4" />

          {/* ===== 下半部分：模板 vs 继承 ===== */}
          <text x={32} y={222} fontSize="12.5" fontWeight="700" fill={primary}>
            模板 vs 继承：两种多态范式
          </text>

          {/* 模板列 */}
          <rect x={48} y={238} width={300} height={158} rx="10" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.6" />
          <text x={198} y={260} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>模板（编译期多态）</text>
          <line x1={64} y1={270} x2={332} y2={270} stroke={accent} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={64} y={290} fontSize="11" fill={primary}>· 隐式接口（有效表达式约束）</text>
          <text x={64} y={310} fontSize="11" fill={primary}>· 编译期类型推导</text>
          <text x={64} y={330} fontSize="11" fill={primary}>· 零运行时开销（静态分发）</text>
          <text x={64} y={350} fontSize="11" fill={primary}>· 代码膨胀（每种类型一份实例）</text>
          <text x={64} y={374} fontSize="11" fill={primary}>· 适合：容器、算法、通用工具</text>

          {/* 继承列 */}
          <rect x={372} y={238} width={300} height={158} rx="10" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.6" />
          <text x={522} y={260} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>继承（运行期多态）</text>
          <line x1={388} y1={270} x2={656} y2={270} stroke={success} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x={388} y={290} fontSize="11" fill={primary}>· 显式接口（签名约束）</text>
          <text x={388} y={310} fontSize="11" fill={primary}>· 运行期虚表分发</text>
          <text x={388} y={330} fontSize="11" fill={primary}>· 有虚表开销（间接调用）</text>
          <text x={388} y={350} fontSize="11" fill={primary}>· 二进制隔离（编译依存低）</text>
          <text x={388} y={374} fontSize="11" fill={primary}>· 适合：类型层次、框架扩展点</text>

          {/* ===== 底部总结 ===== */}
          <line x1={32} y1={416} x2={VIEW_W - 32} y2={416} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={440} textAnchor="middle" fontSize="11.5" fill={secondary}>
            模板用隐式接口在编译期选择实现，继承用显式接口在运行期分发——选型取决于是否需要运行期灵活
          </text>
          <text x={VIEW_W / 2} y={460} textAnchor="middle" fontSize="11" fill={secondary}>
            条款 41-45：隐式接口、typename 双重含义、模板化基类名称、参数无关代码抽离、成员函数模板
          </text>
          <text x={VIEW_W / 2} y={478} textAnchor="middle" fontSize="11" fill={secondary}>
            条款 46-48：非成员模板函数、traits classes、template 元编程
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模板设计：上半部分特化体系（主模板→全特化/偏特化），下半部分模板（编译期多态、隐式接口）vs 继承（运行期多态、显式接口）对比。
      </figcaption>
    </figure>
  );
}
