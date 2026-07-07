/**
 * <DcsRecordsTuplesDiagram>：Record、class 与元组对比。
 *
 * 上半：record vs class vs tuple 三者在相等性、不可变性、with 表达式上的对比。
 * 下半：record 的 with 表达式工作原理与值相等性示例。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
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

const COL_W = 200;

export function DcsRecordsTuplesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Record、class 与元组对比。上半三列对比：record（值相等、不可变、with 表达式）、class（引用相等、可变、无 with）、元组（值相等、不可变、无类型名）。下半展示 record 的 with 表达式创建副本和值相等性。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Record、class 与元组对比
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            值相等性 · 不可变性 · with 表达式 · 自动生成成员
          </text>

          {/* 三列对比表头 */}
          <rect x={48} y={72} width={COL_W} height={28} rx="6" fill={accent} fillOpacity="0.14" />
          <text x={48 + COL_W / 2} y={91} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>record</text>

          <rect x={260} y={72} width={COL_W} height={28} rx="6" fill={warning} fillOpacity="0.12" />
          <text x={260 + COL_W / 2} y={91} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>class</text>

          <rect x={472} y={72} width={COL_W} height={28} rx="6" fill={success} fillOpacity="0.12" />
          <text x={472 + COL_W / 2} y={91} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>元组 (Tuple)</text>

          {/* 对比行 */}
          {[
            { label: "相等性", record: "值相等", cls: "引用相等", tuple: "值相等", y: 116 },
            { label: "可变性", record: "不可变 (init)", cls: "可变 (set)", tuple: "不可变", y: 140 },
            { label: "with 表达式", record: "支持", cls: "不支持", tuple: "支持", y: 164 },
            { label: "自动生成", record: "Equals/Hash/ToString", cls: "无", tuple: "Deconstruct", y: 188 },
            { label: "类型名", record: "有", cls: "有", tuple: "无 (匿名)", y: 212 },
          ].map((row) => (
            <g key={row.label}>
              <text x={36} y={row.y} textAnchor="end" fontSize="11" fontWeight="600" fill={secondary}>{row.label}</text>
              <line x1={40} y1={row.y - 12} x2={680} y2={row.y - 12} stroke={border} strokeWidth="0.5" strokeOpacity="0.4" />
              <text x={48 + COL_W / 2} y={row.y} textAnchor="middle" fontSize="11" fill={primary}>{row.record}</text>
              <text x={260 + COL_W / 2} y={row.y} textAnchor="middle" fontSize="11" fill={primary}>{row.cls}</text>
              <text x={472 + COL_W / 2} y={row.y} textAnchor="middle" fontSize="11" fill={primary}>{row.tuple}</text>
            </g>
          ))}

          {/* 分隔线 */}
          <line x1={32} y1={232} x2={VIEW_W - 32} y2={232} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：with 表达式与值相等 */}
          <text x={VIEW_W / 2} y={254} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            record 的 with 表达式与值相等性
          </text>

          {/* with 表达式（左） */}
          <rect x={40} y={268} width={310} height={108} rx="8" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.2" />
          <text x={195} y={288} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>with 表达式：创建副本并修改</text>
          <text x={54} y={308} fontSize="11" fill={primary} fontFamily="monospace">{"record Point(int X, int Y);"}</text>
          <text x={54} y={326} fontSize="11" fill={secondary} fontFamily="monospace">{"var p1 = new Point(1, 2);"}</text>
          <text x={54} y={344} fontSize="11" fill={success} fontFamily="monospace">{"var p2 = p1 with { X = 10 };"}</text>
          <text x={54} y={362} fontSize="11" fill={secondary}>p1 不变 · p2 = Point(10, 2)</text>

          {/* 值相等性（右） */}
          <rect x={370} y={268} width={310} height={108} rx="8" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.2" />
          <text x={525} y={288} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>值相等性：属性全等 = true</text>
          <text x={384} y={308} fontSize="11" fill={primary} fontFamily="monospace">{"var a = new Point(1, 2);"}</text>
          <text x={384} y={326} fontSize="11" fill={primary} fontFamily="monospace">{"var b = new Point(1, 2);"}</text>
          <text x={384} y={344} fontSize="11" fill={success} fontFamily="monospace">{"a.Equals(b)  // True"}</text>
          <text x={384} y={362} fontSize="11" fill={danger} fontFamily="monospace">{"// class: False (引用不同)"}</text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={398} textAnchor="middle" fontSize="11" fill={secondary}>
            record = 值语义 + 不可变 + with · 元组 = 临时组合 · class = 引用语义 + 可变状态
          </text>
          <text x={VIEW_W / 2} y={414} textAnchor="middle" fontSize="11" fill={secondary}>
            record 适合 DTO/值对象 · 元组适合临时返回值 · class 适合有状态对象
          </text>

          <defs />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Record 值相等性与 with 表达式，对比 class 和元组。
      </figcaption>
    </figure>
  );
}
