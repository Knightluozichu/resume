/**
 * <LupFunctionsDiagram>：Lua 函数——一等公民、多返回值、可变参数。
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

export function LupFunctionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua 函数特性：一等公民可赋值传递、多返回值、可变参数 select、函数作为 table 字段实现方法。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x={VIEW_W / 2}
            y={30}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            函数：一等公民与多返回值
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            可赋值/传递/返回 · 多返回值 · 可变参数 · 冒号语法
          </text>

          {/* 一等公民 */}
          <text
            x={170}
            y={78}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            一等公民
          </text>

          <rect
            x={40}
            y={92}
            width={260}
            height={28}
            rx="4"
            fill={accent}
            fillOpacity="0.08"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text x={52} y={110} fontSize="11" fill={primary}>
            local f = function(x) return x*2 end
          </text>

          <rect
            x={40}
            y={128}
            width={260}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={52} y={146} fontSize="11" fill={primary}>
            local t = &#123;fn = print&#125;
          </text>
          <text x={180} y={146} fontSize="11" fill={secondary}>
            table 字段
          </text>

          <rect
            x={40}
            y={164}
            width={260}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={52} y={182} fontSize="11" fill={primary}>
            function map(t, f)
          </text>
          <text x={180} y={182} fontSize="11" fill={secondary}>
            作为参数
          </text>

          <rect
            x={40}
            y={200}
            width={260}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={52} y={218} fontSize="11" fill={primary}>
            return function() ... end
          </text>
          <text x={200} y={218} fontSize="11" fill={secondary}>
            作为返回值
          </text>

          <text
            x={170}
            y={248}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            函数和数字、字符串一样是值
          </text>

          {/* 分隔线 */}
          <line
            x1={320}
            y1={70}
            x2={320}
            y2={260}
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* 多返回值 */}
          <text
            x={510}
            y={78}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={success}
          >
            多返回值
          </text>

          <rect
            x={340}
            y={92}
            width={340}
            height={28}
            rx="4"
            fill={success}
            fillOpacity="0.08"
            stroke={success}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text x={352} y={110} fontSize="11" fill={primary}>
            local function minmax(t)
          </text>
          <text x={520} y={110} fontSize="11" fill={secondary}>
            定义
          </text>

          <rect
            x={340}
            y={128}
            width={340}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={352} y={146} fontSize="11" fill={primary}>
            {" "}
            return min, max
          </text>
          <text x={480} y={146} fontSize="11" fill={secondary}>
            多个返回值
          </text>

          <rect
            x={340}
            y={164}
            width={340}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={352} y={182} fontSize="11" fill={primary}>
            local lo, hi = minmax(t)
          </text>
          <text x={520} y={182} fontSize="11" fill={secondary}>
            接收
          </text>

          <rect
            x={340}
            y={200}
            width={340}
            height={28}
            rx="4"
            fill={warning}
            fillOpacity="0.08"
            stroke={warning}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text x={352} y={218} fontSize="11" fill={primary}>
            local lo = minmax(t)
          </text>
          <text x={520} y={218} fontSize="11" fill={warning}>
            只取第一个
          </text>

          <rect
            x={340}
            y={236}
            width={340}
            height={28}
            rx="4"
            fill={warning}
            fillOpacity="0.08"
            stroke={warning}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text x={352} y={254} fontSize="11" fill={primary}>
            print(minmax(t))
          </text>
          <text x={480} y={254} fontSize="11" fill={warning}>
            展开所有返回值
          </text>

          {/* 底部：可变参数与冒号语法 */}
          <line
            x1={32}
            y1={270}
            x2={VIEW_W - 32}
            y2={270}
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_W / 2}
            y={292}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            可变参数与冒号语法
          </text>

          <rect
            x={40}
            y={306}
            width={320}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={52} y={324} fontSize="11" fill={primary}>
            function sum(...)
          </text>
          <text x={200} y={324} fontSize="11" fill={secondary}>
            ... 收集为可变参数
          </text>

          <rect
            x={40}
            y={340}
            width={320}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={52} y={358} fontSize="11" fill={primary}>
            local args = {"{...}"}
          </text>
          <text x={200} y={358} fontSize="11" fill={secondary}>
            打包成 table
          </text>

          <rect
            x={376}
            y={306}
            width={304}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={388} y={324} fontSize="11" fill={primary}>
            function obj:method()
          </text>
          <text x={540} y={324} fontSize="11" fill={secondary}>
            冒号=隐式 self
          </text>

          <rect
            x={376}
            y={340}
            width={304}
            height={28}
            rx="4"
            fill={elevated}
            stroke={border}
            strokeWidth="1"
          />
          <text x={388} y={358} fontSize="11" fill={primary}>
            obj:method()
          </text>
          <text x={500} y={358} fontSize="11" fill={secondary}>
            等价 obj.method(obj)
          </text>

          <text
            x={VIEW_W / 2}
            y={388}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            select(&quot;#&quot;, ...) 获取参数个数 · select(n, ...)
            从第n个开始取
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lua 函数是一等公民，支持多返回值和可变参数，冒号语法提供隐式 self 参数。
      </figcaption>
    </figure>
  );
}
