/**
 * <UsgCsharpBasicsDiagram>: C# 语法基础与 Unity 脚本
 *
 * 变量与类型 -> 控制流 -> 方法 -> 类与继承 -> Unity 脚本
 * Server Component, viewBox 720x400, CSS variables.
 */

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

export function UsgCsharpBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="C# 语法基础与 Unity 脚本。从变量类型到类继承再到 MonoBehaviour 脚本的递进关系。" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x={360} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            C# 语法基础 -&gt; Unity 脚本
          </text>
          <text x={360} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            变量类型 -&gt; 控制流 -&gt; 方法 -&gt; 类继承 -&gt; MonoBehaviour
          </text>
          <g>
            <rect x={36} y={78} width={300} height={130} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={60} y={100} fontSize="13" fontWeight="700" fill={accent}>C# 语言要素</text>
            <rect x={56} y={112} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={116} y={129} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>值类型/引用类型</text>
            <rect x={196} y={112} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={256} y={129} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>var 隐式推断</text>
            <rect x={56} y={148} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={116} y={165} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>if / switch</text>
            <rect x={196} y={148} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={256} y={165} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>for / foreach</text>
            <rect x={56} y={184} width={260} height={22} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={186} y={199} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>访问修饰符 public/private/protected</text>
          </g>
          <g>
            <rect x={384} y={78} width={300} height={130} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={408} y={100} fontSize="13" fontWeight="700" fill={success}>类与继承</text>
            <rect x={404} y={112} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={464} y={129} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>class 定义</text>
            <rect x={544} y={112} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={604} y={129} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>字段/属性</text>
            <rect x={404} y={148} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={464} y={165} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>构造方法</text>
            <rect x={544} y={148} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={604} y={165} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>override 重写</text>
            <rect x={404} y={184} width={260} height={22} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={534} y={199} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>sealed / abstract / virtual</text>
          </g>
          <g>
            <rect x={150} y={230} width={420} height={120} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
            <text x={360} y={254} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>Unity 脚本 = MonoBehaviour 子类</text>
            <rect x={180} y={266} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={240} y={283} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>[SerializeField]</text>
            <rect x={316} y={266} width={120} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={376} y={283} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>public 字段</text>
            <rect x={452} y={266} width={100} height={26} rx="6" fill={elevated} stroke={border} strokeWidth="1" />
            <text x={502} y={283} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>Inspector</text>
            <text x={360} y={312} textAnchor="middle" fontSize="11" fill={secondary}>继承 MonoBehaviour 才能挂载到 GameObject</text>
            <text x={360} y={330} textAnchor="middle" fontSize="11" fill={secondary}>SerializeField 让私有字段也能在 Inspector 编辑</text>
          </g>
          <line x1={186} y1={208} x2={300} y2={230} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <line x1={534} y1={208} x2={420} y2={230} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C# 基础（类型/控制流/类）是 Unity 脚本的前提，MonoBehaviour 把普通类变成可挂载组件。
      </figcaption>
    </figure>
  );
}
