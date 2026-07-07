/**
 * <KrcStructMemoryDiagram>：结构体内存布局。
 *
 * 展示结构体内存对齐、padding 与 sizeof 计算：
 *   - 上段：struct { char c; int i; char d; } 的内存布局与 padding
 *   - 下段：调整成员顺序后 padding 减少的对比
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×440，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 440;

const BYTE_W = 42;
const BYTE_H = 44;
const BYTE_GAP = 3;
const ROW_START_X = 120;

export function KrcStructMemoryDiagram() {
  // struct A: char c (1) + pad (3) + int i (4) + char d (1) + pad (3) = 12 bytes
  const structA = [
    { label: "c", type: "char", span: 1, color: "var(--accent)" },
    { label: "pad", type: "", span: 3, color: "var(--text-secondary)", isPad: true },
    { label: "i", type: "int", span: 4, color: "var(--success)" },
    { label: "d", type: "char", span: 1, color: "var(--accent)" },
    { label: "pad", type: "", span: 3, color: "var(--text-secondary)", isPad: true },
  ];

  // struct B: int i (4) + char c (1) + char d (1) + pad (2) = 8 bytes
  const structB = [
    { label: "i", type: "int", span: 4, color: "var(--success)" },
    { label: "c", type: "char", span: 1, color: "var(--accent)" },
    { label: "d", type: "char", span: 1, color: "var(--accent)" },
    { label: "pad", type: "", span: 2, color: "var(--text-secondary)", isPad: true },
  ];

  const renderStruct = (members: typeof structA, baseY: number, offsetStart: number) => {
    let x = ROW_START_X;
    let offset = offsetStart;
    return members.map((m, mi) => {
      const width = m.span * (BYTE_W + BYTE_GAP) - BYTE_GAP;
      const elem = (
        <g key={`m-${mi}`}>
          <rect
            x={x}
            y={baseY}
            width={width}
            height={BYTE_H}
            rx="4"
            fill={m.color}
            fillOpacity={m.isPad ? 0.04 : 0.08}
            stroke={m.color}
            strokeWidth="1.2"
            strokeOpacity={m.isPad ? 0.3 : 0.6}
            strokeDasharray={m.isPad ? "3 2" : undefined}
          />
          <text x={x + width / 2} y={baseY + 16} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
            {m.label}
          </text>
          <text x={x + width / 2} y={baseY + 32} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
            {m.type || "padding"}
          </text>
          {/* offset labels */}
          {Array.from({ length: m.span }).map((_, bi) => (
            <text
              key={`o-${mi}-${bi}`}
              x={x + bi * (BYTE_W + BYTE_GAP) + BYTE_W / 2}
              y={baseY + BYTE_H + 16}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
              fontFamily="monospace"
            >
              {offset + bi}
            </text>
          ))}
        </g>
      );
      x += width + BYTE_GAP;
      offset += m.span;
      return elem;
    });
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="结构体内存布局与对齐。上段展示 struct A（char c、int i、char d 乱序排列）有 6 字节 padding，sizeof 为 12；下段展示 struct B（int i、char c、char d 有序排列）仅 2 字节 padding，sizeof 为 8。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            结构体内存布局 · 对齐与 padding
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            每个成员须落在自身对齐边界的整数倍地址上；编译器自动插入 padding
          </text>

          {/* ── 上段：struct A（乱序）── */}
          <text x={40} y={98} fontSize="13" fontWeight="700" fill="var(--warning)" fontFamily="monospace">
            struct A {"{ char c; int i; char d; }"}  → sizeof = 12
          </text>
          <text x={40} y={116} fontSize="11" fill="var(--text-secondary)">成员乱序：6 字节 padding 被浪费</text>

          {/* offset header */}
          <text x={ROW_START_X - 8} y={138} fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">偏移:</text>

          {renderStruct(structA, 148, 0)}

          {/* ── 下段：struct B（有序）── */}
          <text x={40} y={248} fontSize="13" fontWeight="700" fill="var(--success)" fontFamily="monospace">
            struct B {"{ int i; char c; char d; }"}  → sizeof = 8
          </text>
          <text x={40} y={266} fontSize="11" fill="var(--text-secondary)">成员有序：仅 2 字节 padding</text>

          <text x={ROW_START_X - 8} y={288} fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">偏移:</text>

          {renderStruct(structB, 298, 0)}

          {/* 底部说明 */}
          <line x1={32} y1={372} x2={VIEW_W - 32} y2={372} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={32} y={394} fontSize="11" fill="var(--text-secondary)">
            对齐规则：每个成员的偏移量必须是其自身大小的整数倍。int 对齐 4 字节，char 对齐 1 字节。
          </text>
          <text x={32} y={412} fontSize="11" fill="var(--text-secondary)">
            优化建议：按成员大小从大到小排列，可消除大部分 padding。上例从 12 → 8，省了 33%。
          </text>
          <text x={32} y={430} fontSize="11" fill="var(--text-secondary)">
            结构体整体大小 = 最大成员对齐值的整数倍（尾部也补 padding）。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        结构体内存对齐与 padding。成员乱序排列时 sizeof=12（含 6 字节 padding），按大小降序排列后 sizeof=8（仅 2 字节 padding）。
      </figcaption>
    </figure>
  );
}
