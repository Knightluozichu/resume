/**
 * <PccFunctionsDiagram>：Python 函数定义、参数传递与返回值。
 *
 * 函数结构、位置参数/关键字参数/默认值/任意参数、作用域。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function PccFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Python 函数结构：def 定义函数名和参数，函数体执行逻辑，return 返回值。参数类型包括位置参数、关键字参数、默认值参数和任意数量参数。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            函数：参数传递与作用域
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            def 定义 · 参数类型 · return 返回 · 局部/全局作用域
          </text>

          {/* 函数结构拆解 */}
          <text x={VIEW_W / 2} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            函数定义结构
          </text>

          {/* def 关键字 */}
          <rect x={60} y={90} width={44} height={28} rx="4" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={82} y={108} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>def</text>

          {/* 函数名 */}
          <rect x={110} y={90} width={80} height={28} rx="4" fill={success} fillOpacity="0.10" stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={150} y={108} textAnchor="middle" fontSize="11" fontWeight="600" fill={success}>greet</text>

          {/* 参数列表 */}
          <rect x={196} y={90} width={120} height={28} rx="4" fill={warning} fillOpacity="0.10" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={256} y={108} textAnchor="middle" fontSize="11" fontWeight="600" fill={warning}>(name, msg="Hi")</text>

          {/* 冒号 */}
          <text x={326} y={108} textAnchor="middle" fontSize="14" fill={secondary}>:</text>

          {/* 函数体 */}
          <rect x={60} y={128} width={280} height={52} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={200} y={146} textAnchor="middle" fontSize="11" fill={primary}>message = f"{msg}, {name}!"</text>
          <text x={200} y={166} textAnchor="middle" fontSize="11" fill={primary}>return message</text>

          <text x={200} y={198} textAnchor="middle" fontSize="10" fill={secondary}>缩进4格表示函数体</text>

          {/* 分隔线 */}
          <line x1={360} y1={70} x2={360} y2={210} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 右侧：参数类型 */}
          <text x={540} y={76} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            参数类型
          </text>

          <rect x={380} y={90} width={300} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={106} fontSize="11" fill={primary}>位置参数</text>
          <text x={540} y={106} textAnchor="middle" fontSize="11" fill={secondary}>greet("Alice", "Hello")</text>

          <rect x={380} y={120} width={300} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={136} fontSize="11" fill={primary}>关键字参数</text>
          <text x={540} y={136} textAnchor="middle" fontSize="11" fill={secondary}>greet(name="Alice")</text>

          <rect x={380} y={150} width={300} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={166} fontSize="11" fill={primary}>默认值</text>
          <text x={540} y={166} textAnchor="middle" fontSize="11" fill={secondary}>msg="Hi" → 可省略</text>

          <rect x={380} y={180} width={300} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={392} y={196} fontSize="11" fill={primary}>任意参数</text>
          <text x={540} y={196} textAnchor="middle" fontSize="11" fill={secondary}>*args / **kwargs</text>

          {/* 底部：作用域 */}
          <line x1={32} y1={220} x2={VIEW_W - 32} y2={220} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={244} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            作用域：LEGB 规则
          </text>

          {/* LEGB 层级 */}
          <rect x={60} y={260} width={120} height={52} rx="6" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={120} y={280} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>L - Local</text>
          <text x={120} y={298} textAnchor="middle" fontSize="10" fill={secondary}>函数内部</text>

          <line x1={180} y1={286} x2={200} y2={286} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-fn-arrow)" />

          <rect x={200} y={260} width={120} height={52} rx="6" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={260} y={280} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>E - Enclosing</text>
          <text x={260} y={298} textAnchor="middle" fontSize="10" fill={secondary}>嵌套函数</text>

          <line x1={320} y1={286} x2={340} y2={286} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-fn-arrow)" />

          <rect x={340} y={260} width={120} height={52} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={400} y={280} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>G - Global</text>
          <text x={400} y={298} textAnchor="middle" fontSize="10" fill={secondary}>模块级别</text>

          <line x1={460} y1={286} x2={480} y2={286} stroke={secondary} strokeWidth="1.2" markerEnd="url(#pcc-fn-arrow)" />

          <rect x={480} y={260} width={120} height={52} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={540} y={280} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>B - Built-in</text>
          <text x={540} y={298} textAnchor="middle" fontSize="10" fill={secondary}>内置名称</text>

          <text x={VIEW_W / 2} y={340} textAnchor="middle" fontSize="11" fill={secondary}>
            查找顺序：先找局部 → 嵌套 → 全局 → 内置
          </text>
          <text x={VIEW_W / 2} y={360} textAnchor="middle" fontSize="11" fill={secondary}>
            修改全局变量需用 global 关键字声明
          </text>
          <text x={VIEW_W / 2} y={380} textAnchor="middle" fontSize="11" fill={secondary}>
            函数传递的是对象引用——不可变对象修改不影响外部，可变对象修改会影响外部
          </text>

          <defs>
            <marker id="pcc-fn-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Python 函数通过 def 定义，参数支持多种形式，变量查找遵循 LEGB 作用域规则。
      </figcaption>
    </figure>
  );
}
