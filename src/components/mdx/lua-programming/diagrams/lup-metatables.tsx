/**
 * <LupMetatablesDiagram>：Lua 元表与元方法——OOP 的基础。
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

export function LupMetatablesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua 元表与元方法：元表定义操作的回退行为，__index 实现继承，__newindex 拦截赋值，算术元方法重载运算符。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            元表与元方法
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            元表 = 操作的回退行为定义 · __index 实现继承 · 元方法重载运算符
          </text>

          {/* 元表结构 */}
          <text x={180} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            表 ← 元表（setmetatable）
          </text>

          <rect x={40} y={92} width={160} height={56} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={120} y={112} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>普通表 t</text>
          <text x={120} y={130} textAnchor="middle" fontSize="10" fill={secondary}>{"{x=1, y=2}"}</text>
          <text x={120} y={144} textAnchor="middle" fontSize="10" fill={secondary}>访问 t.z → nil</text>

          {/* 箭头 */}
          <line x1={200} y1={120} x2={240} y2={120} stroke={secondary} strokeWidth="1.4" markerEnd="url(#lup-mt-arrow)" />
          <text x={220} y={114} textAnchor="middle" fontSize="10" fill={secondary}>元表</text>

          {/* 元表 */}
          <rect x={240} y={92} width={200} height={120} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.5" />
          <text x={340} y={112} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>元表 metatable</text>

          <text x={252} y={132} fontSize="11" fill={primary}>__index = {fallback}</text>
          <text x={252} y={150} fontSize="10" fill={secondary}>键不存在时查找</text>

          <text x={252} y={170} fontSize="11" fill={primary}>__newindex = func</text>
          <text x={252} y={188} fontSize="10" fill={secondary}>新键赋值时调用</text>

          <text x={252} y={206} fontSize="11" fill={primary}>__add = func</text>
          <text x={252} y={208} fontSize="10" fill={secondary}>+ 运算重载</text>

          {/* 右侧：常用元方法 */}
          <line x1={460} y1={70} x2={460} y2={220} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={590} y={78} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            常用元方法
          </text>

          <rect x={480} y={92} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={492} y={108} fontSize="11" fill={success}>__index</text>
          <text x={560} y={108} fontSize="10" fill={secondary}>继承/查找</text>

          <rect x={480} y={122} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={492} y={138} fontSize="11" fill={success}>__newindex</text>
          <text x={560} y={138} fontSize="10" fill={secondary}>拦截赋值</text>

          <rect x={480} y={152} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={492} y={168} fontSize="11" fill={success}>__add __sub __mul</text>
          <text x={620} y={168} fontSize="10" fill={secondary}>算术</text>

          <rect x={480} y={182} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={492} y={198} fontSize="11" fill={success}>__eq __lt __le</text>
          <text x={580} y={198} fontSize="10" fill={secondary}>比较</text>

          <rect x={480} y={212} width={200} height={24} rx="4" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={492} y={228} fontSize="11" fill={success}>__call __tostring</text>
          <text x={600} y={228} fontSize="10" fill={secondary}>调用/转串</text>

          {/* 底部：OOP 实现 */}
          <line x1={32} y1={240} x2={VIEW_W - 32} y2={240} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={262} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            用元表实现 OOP
          </text>

          <rect x={40} y={276} width={640} height={100} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={56} y={296} fontSize="11" fill={primary}>local Animal = {"{name=\"\"}"}</text>
          <text x={56} y={314} fontSize="11" fill={primary}>Animal.__index = Animal  -- 让实例继承 Animal 的方法</text>
          <text x={56} y={332} fontSize="11" fill={primary}>function Animal.new(name)</text>
          <text x={56} y={350} fontSize="11" fill={primary}>  local self = setmetatable({"{}"}, Animal)  -- 设置元表</text>
          <text x={56} y={368} fontSize="11" fill={primary}>  self.name = name; return self</text>

          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="11" fill={secondary}>
            setmetatable(t, mt) 设置元表 · getmetatable(t) 获取元表 · __index 是 Lua 继承的核心
          </text>

          <defs>
            <marker id="lup-mt-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        元表通过 __index 实现继承、元方法重载运算符，是 Lua 面向对象编程的基础。
      </figcaption>
    </figure>
  );
}
