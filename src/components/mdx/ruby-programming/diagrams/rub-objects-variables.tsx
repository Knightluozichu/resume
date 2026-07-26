/**
 * <RubObjectsVariablesDiagram>：Ruby 对象模型——一切皆对象。
 *
 * 展示对象、类、模块的关系，以及变量类型（局部/实例/类/全局）。
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

export function RubObjectsVariablesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Ruby 对象模型：一切皆对象。展示对象-类-Class-Object的继承链，以及四种变量类型（局部变量、实例变量、类变量、全局变量）的作用域。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            Ruby 对象模型：一切皆对象
          </text>
          <text
            x={VIEW_W / 2}
            y={46}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            对象 → 类 → Class → Object · 变量按作用域分四种
          </text>

          {/* 上半：对象-类继承链 */}
          <text
            x={180}
            y={74}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            继承链
          </text>

          <rect
            x={40}
            y={84}
            width={120}
            height={44}
            rx="8"
            fill={accent}
            fillOpacity="0.08"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <text
            x={100}
            y={104}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            obj
          </text>
          <text
            x={100}
            y={120}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            实例对象
          </text>

          <line
            x1={100}
            y1={128}
            x2={100}
            y2={148}
            stroke={secondary}
            strokeWidth="1.2"
            markerEnd="url(#rub-ov-arrow)"
          />
          <text x={130} y={142} fontSize="11" fill={secondary}>
            .class
          </text>

          <rect
            x={40}
            y={148}
            width={120}
            height={44}
            rx="8"
            fill={success}
            fillOpacity="0.08"
            stroke={success}
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <text
            x={100}
            y={168}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={success}
          >
            String
          </text>
          <text
            x={100}
            y={184}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            类对象
          </text>

          <line
            x1={100}
            y1={192}
            x2={100}
            y2={212}
            stroke={secondary}
            strokeWidth="1.2"
            markerEnd="url(#rub-ov-arrow)"
          />
          <text x={130} y={206} fontSize="11" fill={secondary}>
            .class
          </text>

          <rect
            x={40}
            y={212}
            width={120}
            height={44}
            rx="8"
            fill={warning}
            fillOpacity="0.08"
            stroke={warning}
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <text
            x={100}
            y={232}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={warning}
          >
            Class
          </text>
          <text
            x={100}
            y={248}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            所有类的类
          </text>

          <line
            x1={100}
            y1={256}
            x2={100}
            y2={276}
            stroke={secondary}
            strokeWidth="1.2"
            markerEnd="url(#rub-ov-arrow)"
          />
          <text x={130} y={270} fontSize="11" fill={secondary}>
            superclass
          </text>

          <rect
            x={40}
            y={276}
            width={120}
            height={44}
            rx="8"
            fill={danger}
            fillOpacity="0.08"
            stroke={danger}
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          <text
            x={100}
            y={296}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={danger}
          >
            Object
          </text>
          <text
            x={100}
            y={312}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            万物之根
          </text>

          {/* 分隔线 */}
          <line
            x1={200}
            y1={64}
            x2={200}
            y2={340}
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />

          {/* 右半：变量类型 */}
          <text
            x={440}
            y={74}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
          >
            四种变量类型
          </text>

          {/* 局部变量 */}
          <rect
            x={220}
            y={86}
            width={140}
            height={56}
            rx="8"
            fill={elevated}
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text
            x={290}
            y={106}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={accent}
          >
            局部变量
          </text>
          <text
            x={290}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            name = &quot;Ruby&quot;
          </text>
          <text
            x={290}
            y={136}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            小写开头 · 方法/块内有效
          </text>

          {/* 实例变量 */}
          <rect
            x={380}
            y={86}
            width={140}
            height={56}
            rx="8"
            fill={elevated}
            stroke={success}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text
            x={450}
            y={106}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={success}
          >
            实例变量
          </text>
          <text
            x={450}
            y={122}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            @name = &quot;Ruby&quot;
          </text>
          <text
            x={450}
            y={136}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            @开头 · 对象内有效
          </text>

          {/* 类变量 */}
          <rect
            x={220}
            y={158}
            width={140}
            height={56}
            rx="8"
            fill={elevated}
            stroke={warning}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text
            x={290}
            y={178}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={warning}
          >
            类变量
          </text>
          <text
            x={290}
            y={194}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            @@count = 0
          </text>
          <text
            x={290}
            y={208}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            @@开头 · 类及子类共享
          </text>

          {/* 全局变量 */}
          <rect
            x={380}
            y={158}
            width={140}
            height={56}
            rx="8"
            fill={elevated}
            stroke={danger}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
          <text
            x={450}
            y={178}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={danger}
          >
            全局变量
          </text>
          <text
            x={450}
            y={194}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            $DEBUG = true
          </text>
          <text
            x={450}
            y={208}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            $开头 · 程序全局有效
          </text>

          {/* 常量 */}
          <rect
            x={300}
            y={238}
            width={140}
            height={56}
            rx="8"
            fill={elevated}
            stroke={secondary}
            strokeWidth="1"
          />
          <text
            x={370}
            y={258}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={primary}
          >
            常量
          </text>
          <text
            x={370}
            y={274}
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            MAX_SIZE = 100
          </text>
          <text
            x={370}
            y={288}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            大写开头 · 可变但警告
          </text>

          {/* 底部说明 */}
          <line
            x1={32}
            y1={320}
            x2={VIEW_W - 32}
            y2={320}
            stroke={border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={VIEW_W / 2}
            y={344}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            在 Ruby 中，数字、字符串、类本身都是对象——5.class 返回
            Integer，String.class 返回 Class
          </text>
          <text
            x={VIEW_W / 2}
            y={364}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            变量是对象的引用（非指针）——赋值传递引用，dup/shallow copy/deep copy
            控制复制深度
          </text>
          <text
            x={VIEW_W / 2}
            y={384}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            Object 是默认父类 · BasicObject 是更底层的根 · Class.class ==
            Class（自洽）
          </text>

          <defs>
            <marker
              id="rub-ov-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ruby 中一切皆对象，继承链 obj → String → Class →
        Object；变量按前缀分四种作用域。
      </figcaption>
    </figure>
  );
}
