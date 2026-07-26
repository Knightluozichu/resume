/**
 * <LupExpressionsDiagram>：Lua 表达式与运算符体系。
 *
 * 算术/关系/逻辑运算符、字符串连接、table 构造器。
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

export function LupExpressionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Lua 运算符体系：算术运算符（+ - * / // % ^）、关系运算符（< > <= >= == ~=）、逻辑运算符（and or not）、字符串连接（..）、长度运算符（#）。"
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
            表达式与运算符
          </text>
          <text
            x={VIEW_W / 2}
            y={48}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            算术 · 关系 · 逻辑 · 连接 · 长度
          </text>

          {/* 算术运算符 */}
          <rect
            x={32}
            y={66}
            width={200}
            height={96}
            rx="8"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={132}
            y={86}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={accent}
          >
            算术运算符
          </text>
          <text
            x={132}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            + - * /{" "}
          </text>
          <text
            x={132}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            &#47;&#47; 向下取整除
          </text>
          <text
            x={132}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            % 取模 ^ 幂
          </text>
          <text
            x={132}
            y={158}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            5 // 2 = 2
          </text>

          {/* 关系运算符 */}
          <rect
            x={248}
            y={66}
            width={200}
            height={96}
            rx="8"
            fill={success}
            fillOpacity="0.06"
            stroke={success}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={348}
            y={86}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={success}
          >
            关系运算符
          </text>
          <text
            x={348}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            &lt; &gt; &lt;= &gt;=
          </text>
          <text
            x={348}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            == ~= (不等于)
          </text>
          <text
            x={348}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            注意：~= 不是 !=
          </text>
          <text
            x={348}
            y={158}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            只返回 true 或 false
          </text>

          {/* 逻辑运算符 */}
          <rect
            x={464}
            y={66}
            width={224}
            height={96}
            rx="8"
            fill={warning}
            fillOpacity="0.06"
            stroke={warning}
            strokeWidth="1"
            strokeOpacity="0.4"
          />
          <text
            x={576}
            y={86}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={warning}
          >
            逻辑运算符
          </text>
          <text
            x={576}
            y={106}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            and or not
          </text>
          <text
            x={576}
            y={124}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            and/or 返回操作数而非布尔值
          </text>
          <text
            x={576}
            y={142}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            nil 和 false 为假，其余为真
          </text>
          <text
            x={576}
            y={158}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            (a or b) 惯用默认值
          </text>

          {/* 特殊运算符 */}
          <line
            x1={32}
            y1={178}
            x2={VIEW_W - 32}
            y2={178}
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          <text
            x={VIEW_W / 2}
            y={200}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            特殊运算符
          </text>

          {/* 字符串连接 */}
          <rect
            x={32}
            y={214}
            width={200}
            height={72}
            rx="8"
            fill={elevated}
            stroke={danger}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text
            x={132}
            y={234}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={danger}
          >
            .. 连接
          </text>
          <text
            x={132}
            y={254}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            &quot;Hello&quot; .. &quot; World&quot;
          </text>
          <text
            x={132}
            y={272}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            数字自动转字符串
          </text>

          {/* 长度运算符 */}
          <rect
            x={248}
            y={214}
            width={200}
            height={72}
            rx="8"
            fill={elevated}
            stroke={danger}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text
            x={348}
            y={234}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={danger}
          >
            # 长度
          </text>
          <text
            x={348}
            y={254}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            #{"{1,2,3}"} → 3
          </text>
          <text
            x={348}
            y={272}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            #&quot;hello&quot; → 5
          </text>

          {/* table 构造器 */}
          <rect
            x={464}
            y={214}
            width={224}
            height={72}
            rx="8"
            fill={elevated}
            stroke={success}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text
            x={576}
            y={234}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={success}
          >
            {} table 构造器
          </text>
          <text
            x={576}
            y={254}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            {"{1, 2, 3}"} — 数组
          </text>
          <text
            x={576}
            y={272}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            {'{name="A"}'} — 字典
          </text>

          {/* 短路求值 */}
          <line
            x1={32}
            y1={304}
            x2={VIEW_W - 32}
            y2={304}
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_W / 2}
            y={326}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            and/or 短路求值（惯用法）
          </text>
          <text
            x={VIEW_W / 2}
            y={348}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            x = x or default — 如果 x 为 nil/false 则赋默认值
          </text>
          <text
            x={VIEW_W / 2}
            y={368}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            max = (a &gt; b) and a or b — 三元表达式模拟
          </text>
          <text
            x={VIEW_W / 2}
            y={388}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            and 返回第一个假值或最后一个值 · or 返回第一个真值或最后一个值
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Lua 运算符体系，注意 ~= 表示不等于，and/or 返回操作数而非布尔值。
      </figcaption>
    </figure>
  );
}
