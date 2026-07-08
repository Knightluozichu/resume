/**
 * <LupFinalReviewDiagram>：Lua 全书知识串联图。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function LupFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua 全书知识串联：类型值→表达式语句→函数闭包协程→元表C API。从数据基础到元编程，层层递进。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            全书知识串联：从值到元编程
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            类型值打底 · 表达式语句强骨 · 函数闭包拓边界 · 元表C API收全貌
          </text>

          {/* 四层知识链 */}
          <rect x={32} y={76} width={656} height={72} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.3" />
          <text x={56} y={98} fontSize="12" fontWeight="700" fill={accent}>Layer 1 · 类型与值</text>
          <text x={56} y={116} fontSize="11" fill={secondary}>8 种基本类型 · table 是唯一数据结构 · nil 表示缺失 · 动态类型（值有类型，变量没有）</text>
          <text x={56} y={134} fontSize="11" fill={secondary}>→ 一切的基础：Lua 中所有数据都以值的形式存在，table 承载数组/字典/对象/模块</text>

          <line x1={360} y1={148} x2={360} y2={160} stroke={secondary} strokeWidth="1.4" markerEnd="url(#lup-fr-arrow)" />

          <rect x={32} y={160} width={656} height={72} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.3" />
          <text x={56} y={182} fontSize="12" fontWeight="700" fill={success}>Layer 2 · 表达式与语句</text>
          <text x={56} y={200} fontSize="11" fill={secondary}>运算符（~= 不等于、and/or 短路） · local 声明 · if-elseif-else · while/repeat/for · break/return</text>
          <text x={56} y={218} fontSize="11" fill={secondary}>→ 让值动起来：运算和流程控制，local 限定作用域，for 有数值和泛型两种形式</text>

          <line x1={360} y1={232} x2={360} y2={244} stroke={secondary} strokeWidth="1.4" markerEnd="url(#lup-fr-arrow)" />

          <rect x={32} y={244} width={656} height={72} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.3" />
          <text x={56} y={266} fontSize="12" fontWeight="700" fill={warning}>Layer 3 · 函数、闭包与协程</text>
          <text x={56} y={284} fontSize="11" fill={secondary}>函数是一等公民 · 多返回值 · 可变参数 · 闭包捕获 upvalue · 协程 resume/yield 协作切换</text>
          <text x={56} y={302} fontSize="11" fill={secondary}>→ 抽象与控制：函数封装逻辑，闭包保持状态，协程实现协作式多任务（迭代器/生成器）</text>

          <line x1={360} y1={316} x2={360} y2={328} stroke={secondary} strokeWidth="1.4" markerEnd="url(#lup-fr-arrow)" />

          <rect x={32} y={328} width={656} height={72} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.3" />
          <text x={56} y={350} fontSize="12" fontWeight="700" fill={danger}>Layer 4 · 元表与 C API</text>
          <text x={56} y={368} fontSize="11" fill={secondary}>元表 __index 实现继承 · 元方法重载运算符 · C API 虚拟栈交换数据 · 注册 C 函数</text>
          <text x={56} y={386} fontSize="11" fill={secondary}>→ 元编程与扩展：元表实现 OOP 和 DSL，C API 让 Lua 嵌入 C 程序——这是 Lua 的核心定位</text>

          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>
            值是原料 · 表达式语句是加工 · 函数闭包协程是结构 · 元表C API是扩展
          </text>

          <defs>
            <marker id="lup-fr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lua 全书四层知识链：类型值→表达式语句→函数闭包协程→元表C API，从数据基础到元编程扩展。
      </figcaption>
    </figure>
  );
}
