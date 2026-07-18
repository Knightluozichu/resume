/**
 * <LupTypesValuesDiagram>：Lua 八种基本类型与值的结构。
 *
 * 展示 nil/boolean/number/string/function/table/userdata/thread 的特性与关系。
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

interface TypeInfo {
  name: string;
  color: string;
  desc: string;
  example: string;
}

const TYPES: readonly TypeInfo[] = [
  { name: "nil", color: danger, desc: "缺失值", example: "local x = nil" },
  {
    name: "boolean",
    color: warning,
    desc: "true / false",
    example: "local ok = true",
  },
  {
    name: "number",
    color: accent,
    desc: "浮点数（统一）",
    example: "local n = 3.14",
  },
  {
    name: "string",
    color: success,
    desc: "不可变字节序列",
    example: 'local s = "hi"',
  },
  {
    name: "function",
    color: accent,
    desc: "一等公民",
    example: "local f = print",
  },
  {
    name: "table",
    color: success,
    desc: "唯一数据结构",
    example: "local t = {}",
  },
  { name: "userdata", color: warning, desc: "C 数据包装", example: "文件句柄" },
  { name: "thread", color: danger, desc: "协程", example: "coroutine.create" },
];

export function LupTypesValuesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua 八种基本类型：nil、boolean、number、string、function、table、userdata、thread。table 是唯一的数据结构，function 是一等公民。"
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
            Lua 八种基本类型
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            动态类型语言 · 值有类型，变量没有 · type() 返回类型名
          </text>

          {/* 类型网格 4×2 */}
          {TYPES.map((t, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const x = 40 + col * 168;
            const y = 72 + row * 100;
            return (
              <g key={t.name}>
                <rect
                  x={x}
                  y={y}
                  width={152}
                  height={80}
                  rx="8"
                  fill={t.color}
                  fillOpacity="0.06"
                  stroke={t.color}
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />
                <text
                  x={x + 76}
                  y={y + 22}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={t.color}
                >
                  {t.name}
                </text>
                <text
                  x={x + 76}
                  y={y + 42}
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {t.desc}
                </text>
                <text
                  x={x + 76}
                  y={y + 62}
                  textAnchor="middle"
                  fontSize="10"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {t.example}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <line
            x1={32}
            y1={284}
            x2={VIEW_W - 32}
            y2={284}
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_W / 2}
            y={306}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            核心特性
          </text>
          <text
            x={VIEW_W / 2}
            y={326}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            table 是唯一的数据结构——数组、字典、对象、模块都基于 table
          </text>
          <text
            x={VIEW_W / 2}
            y={346}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            function 是一等公民——可赋值给变量、作为参数传递、作为返回值
          </text>
          <text
            x={VIEW_W / 2}
            y={366}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            number 统一为浮点数（Lua 5.3+ 可选整数子类型） · string 不可变
          </text>
          <text
            x={VIEW_W / 2}
            y={386}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            nil 表示&quot;缺失&quot;——未初始化的变量和删除的表字段都是 nil
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lua 是动态类型语言，只有 8 种基本类型，table 是唯一的数据结构。
      </figcaption>
    </figure>
  );
}
