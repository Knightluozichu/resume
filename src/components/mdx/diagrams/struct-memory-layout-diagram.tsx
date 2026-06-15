/**
 * <StructMemoryLayoutDiagram>：struct 成员内存对齐与 padding 示意。
 *
 * 展示 struct { char c; int i; char d; } 的典型布局（示意，依平台可能不同）。
 * Server Component，token 色，无阴影。
 */

export function StructMemoryLayoutDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const pad = "var(--text-secondary)";

  const startX = 48;
  const cellW = 48;
  const totalCells = 12;
  const memY = 100;
  const cellH = 44;

  const members = [
    { label: "c", type: "char", start: 0, len: 1, value: "'A'" },
    { label: "padding", type: "—", start: 1, len: 3, value: "填充", isPad: true },
    { label: "i", type: "int", start: 4, len: 4, value: "42" },
    { label: "d", type: "char", start: 8, len: 1, value: "'Z'" },
    { label: "padding", type: "—", start: 9, len: 3, value: "填充", isPad: true },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 320"
          role="img"
          aria-label="结构体成员在内存中的对齐布局，含 padding 填充字节"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            struct {"{ char c; int i; char d; }"}
          </text>
          <text x={24} y={52} fontSize="12" fill={secondary}>
            编译器按对齐规则插入 padding；sizeof 可能大于各成员字节之和
          </text>

          <text x={24} y={78} fontSize="11" fontWeight="600" fill={secondary}>
            字节偏移 →
          </text>
          {Array.from({ length: totalCells }, (_, i) => (
            <text
              key={`off-${i}`}
              x={startX + i * cellW + cellW / 2}
              y={78}
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
              fontFamily="monospace"
            >
              {i}
            </text>
          ))}

          <rect
            x={startX - 6}
            y={memY - 6}
            width={totalCells * cellW + 6}
            height={cellH + 12}
            rx="10"
            fill={bg}
            stroke={border}
            strokeWidth="1.5"
          />

          {members.map((m) => (
            <g key={m.label + m.start}>
              <rect
                x={startX + m.start * cellW}
                y={memY}
                width={m.len * cellW - 2}
                height={cellH}
                rx="6"
                fill={m.isPad ? bg : accent}
                opacity={m.isPad ? 1 : 0.12}
                stroke={m.isPad ? border : accent}
                strokeWidth="1.5"
                strokeDasharray={m.isPad ? "4 3" : undefined}
              />
              <text
                x={startX + m.start * cellW + (m.len * cellW - 2) / 2}
                y={memY + 22}
                textAnchor="middle"
                fontSize={m.isPad ? "9" : "12"}
                fontWeight="700"
                fill={m.isPad ? pad : accent}
                fontFamily="monospace"
              >
                {m.isPad ? "pad" : m.label}
              </text>
              <text
                x={startX + m.start * cellW + (m.len * cellW - 2) / 2}
                y={memY + cellH + 16}
                textAnchor="middle"
                fontSize="9"
                fill={secondary}
                fontFamily="monospace"
              >
                {m.type}
              </text>
            </g>
          ))}

          <text x={24} y={memY + cellH + 52} fontSize="11" fill={primary} fontFamily="monospace">
            sizeof(struct) = 12 字节
          </text>
          <text x={24} y={memY + cellH + 72} fontSize="10" fill={secondary}>
            int 通常要求 4 字节对齐 → c 后插 3 字节 pad；末尾也可能 pad 到最大成员对齐倍数
          </text>
          <text x={24} y={memY + cellH + 92} fontSize="10" fill={secondary}>
            用 #pragma pack 或 __attribute__((packed)) 可改变布局，但可能降低访问速度
          </text>

          <rect x={400} y={88} width={210} height={120} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={416} y={112} fontSize="11" fontWeight="600" fill={primary}>
            成员访问
          </text>
          <text x={416} y={132} fontSize="10" fill={primary} fontFamily="monospace">
            s.c = &apos;A&apos;;
          </text>
          <text x={416} y={150} fontSize="10" fill={primary} fontFamily="monospace">
            s.i = 42;
          </text>
          <text x={416} y={168} fontSize="10" fill={primary} fontFamily="monospace">
            s.d = &apos;Z&apos;;
          </text>
          <text x={416} y={192} fontSize="9" fill={secondary}>
            点号 . 访问具名成员
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        结构体成员按声明顺序存放，但编译器会在成员之间插入 padding 以满足对齐要求；图示为常见 32/64 位平台示意。
      </figcaption>
    </figure>
  );
}
