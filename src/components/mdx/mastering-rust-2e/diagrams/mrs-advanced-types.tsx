/**
 * <MrsAdvancedTypesDiagram>：Rust 高级类型图解。
 *
 * 四类高级类型：Newtype（包装）、类型别名（type）、Never 类型（!）、DST（胖指针）。
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

interface TypeCard {
  title: string;
  syntax: string;
  desc: string;
  color: string;
  x: number;
}

const TYPE_CARDS: readonly TypeCard[] = [
  { title: "Newtype", syntax: "struct Meters(u32);", desc: "零成本包装\n类型安全区分", color: accent, x: 48 },
  { title: "类型别名", syntax: "type Id = u64;", desc: "简化复杂类型\n不创建新类型", color: success, x: 222 },
  { title: "Never 类型", syntax: "fn fail() -> !", desc: "永不返回\n发散控制流", color: warning, x: 396 },
  { title: "DST 胖指针", syntax: "&[T], &str, &dyn", desc: "指针+元数据\n运行时大小", color: danger, x: 570 },
];

export function MrsAdvancedTypesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-label="Rust高级类型图解：Newtype包装、类型别名、Never类型、DST胖指针四类高级类型。" className="mx-auto block h-auto w-full max-w-[720px]">
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Rust 高级类型：四种类型利器
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            Newtype · 类型别名 · Never · DST 胖指针
          </text>

          {/* 四张类型卡片 */}
          {TYPE_CARDS.map((c) => (
            <g key={c.title}>
              <rect x={c.x} y={80} width={120} height={160} rx="10" fill={c.color} fillOpacity="0.06" stroke={c.color} strokeWidth="1.4" />
              <circle cx={c.x + 60} cy={104} r="10" fill={c.color} fillOpacity="0.2" stroke={c.color} strokeWidth="1.4" />
              <text x={c.x + 60} y={108} textAnchor="middle" fontSize="11" fontWeight="700" fill={c.color}>
                {c.title}
              </text>
              <line x1={c.x + 16} y1={122} x2={c.x + 104} y2={122} stroke={c.color} strokeWidth="1" strokeOpacity="0.4" />
              {/* 语法 */}
              <rect x={c.x + 12} y={134} width={96} height={28} rx="4" fill={elevated} stroke={border} strokeWidth="0.8" />
              <text x={c.x + 60} y={152} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">
                {c.syntax}
              </text>
              {/* 描述 */}
              {c.desc.split("\n").map((line, i) => (
                <text key={i} x={c.x + 60} y={184 + i * 16} textAnchor="middle" fontSize="11" fill={secondary}>
                  {line}
                </text>
              ))}
            </g>
          ))}

          {/* 分隔线 */}
          <line x1={32} y1={266} x2={VIEW_W - 32} y2={266} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 底部：DST 胖指针结构详解 */}
          <rect x={48} y={282} width={624} height={70} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={60} y={302} fontSize="12" fontWeight="700" fill={danger}>
            DST 胖指针 = 数据指针 + 元数据（长度/vtable）
          </text>
          <text x={60} y={320} fontSize="11" fill={primary} fontFamily="monospace">
            &amp;[T]  = (ptr, len)        // 切片：指针 + 长度
          </text>
          <text x={60} y={336} fontSize="11" fill={primary} fontFamily="monospace">
            &amp;str  = (ptr, len)        // 字符串切片：指针 + 字节长度
          </text>
          <text x={60} y={352} fontSize="11" fill={primary} fontFamily="monospace">
            &amp;dyn  = (ptr, vtable_ptr) // trait 对象：指针 + 虚表指针
          </text>

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={388} textAnchor="middle" fontSize="11" fill={secondary}>
            Newtype 创类型安全 · 别名简化复杂 · Never 表达发散 · DST 支持动态大小
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rust 高级类型：Newtype、类型别名、Never 类型与 DST 胖指针四种类型利器。
      </figcaption>
    </figure>
  );
}
