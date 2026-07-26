/**
 * <LupClosuresDiagram>：Lua 闭包与词法作用域。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
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

export function LupClosuresDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua 闭包：函数捕获其外层作用域的变量，每次调用闭包共享这些 upvalue。可用于创建迭代器、私有状态和记忆化。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            闭包与词法作用域
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            函数 + 捕获的外层变量 = 闭包 · upvalue 跨调用保持状态
          </text>

          {/* 闭包结构示意 */}
          <text x={360} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            闭包的构成
          </text>

          {/* 外层函数 */}
          <rect x={80} y={92} width={560} height={100} rx="8" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="6 3" />
          <text x={100} y={112} fontSize="12" fontWeight="700" fill={accent}>function makeCounter()</text>
          <text x={100} y={130} fontSize="11" fill={primary}>  local count = 0   -- upvalue（外层局部变量）</text>
          <text x={100} y={148} fontSize="11" fill={primary}>  return function() -- 返回内层函数（闭包）</text>
          <text x={100} y={166} fontSize="11" fill={primary}>    count = count + 1  -- 捕获并修改 upvalue</text>
          <text x={100} y={184} fontSize="11" fill={primary}>    return count</text>

          {/* 两个闭包实例 */}
          <line x1={32} y1={210} x2={VIEW_W - 32} y2={210} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={232} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            每次调用创建独立闭包
          </text>

          {/* 闭包1 */}
          <rect x={40} y={246} width={300} height={80} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x={60} y={266} fontSize="12" fontWeight="700" fill={success}>c1 = makeCounter()</text>
          <text x={60} y={286} fontSize="11" fill={primary}>c1() → 1  (count=1)</text>
          <text x={60} y={304} fontSize="11" fill={primary}>c1() → 2  (count=2)</text>
          <text x={60} y={320} fontSize="11" fill={secondary}>独立 count = 2</text>

          {/* 闭包2 */}
          <rect x={380} y={246} width={300} height={80} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x={400} y={266} fontSize="12" fontWeight="700" fill={warning}>c2 = makeCounter()</text>
          <text x={400} y={286} fontSize="11" fill={primary}>c2() → 1  (count=1)</text>
          <text x={400} y={304} fontSize="11" fill={primary}>c2() → 2  (count=2)</text>
          <text x={400} y={320} fontSize="11" fill={secondary}>独立 count = 2</text>

          {/* 说明 */}
          <text x={VIEW_W / 2} y={348} textAnchor="middle" fontSize="11" fill={secondary}>
            c1 和 c2 各有独立的 count upvalue——互不影响
          </text>
          <text x={VIEW_W / 2} y={368} textAnchor="middle" fontSize="11" fill={secondary}>
            闭包 = 函数 + 其引用的外层局部变量（upvalue）
          </text>
          <text x={VIEW_W / 2} y={388} textAnchor="middle" fontSize="11" fill={secondary}>
            应用：迭代器、私有状态封装、记忆化、回调中保持上下文
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        闭包捕获外层作用域的 upvalue，每次调用 makeCounter 创建独立的闭包实例。
      </figcaption>
    </figure>
  );
}
