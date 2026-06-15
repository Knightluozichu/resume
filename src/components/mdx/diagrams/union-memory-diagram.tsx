/**
 * <UnionMemoryDiagram>：union 成员共享同一块内存，同一时刻只存一种有效值。
 *
 * Server Component，token 色，无阴影。
 */

export function UnionMemoryDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";
  const warn = "rgb(229,181,103)";

  const memX = 200;
  const memY = 88;
  const memW = 240;
  const memH = 120;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="联合体 union 各成员重叠占用同一块内存示意"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            union Data {"{ int i; float f; char c; }"}
          </text>
          <text x={24} y={52} fontSize="12" fill={secondary}>
            所有成员从同一地址开始；sizeof(union) = 最大成员的大小
          </text>

          {/* Shared memory block */}
          <rect x={memX} y={memY} width={memW} height={memH} rx="10" fill={bgEl} stroke={accent} strokeWidth="2" />
          <text x={memX + memW / 2} y={memY + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent}>
            共享内存块（4 字节示意）
          </text>

          {/* Overlapping member views */}
          <rect x={memX + 20} y={memY + 32} width={memW - 40} height={28} rx="4" fill={accent} opacity={0.25} stroke={accent} strokeWidth="1.5" />
          <text x={memX + memW / 2} y={memY + 50} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">
            u.i = 0x41424344
          </text>

          <rect x={memX + 20} y={memY + 68} width={memW - 40} height={28} rx="4" fill={accent} opacity={0.15} stroke={border} strokeWidth="1" strokeDasharray="4 2" />
          <text x={memX + memW / 2} y={memY + 86} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">
            u.f（同一地址，不同解释）
          </text>

          <rect x={memX + 20} y={memY + 104} width={48} height={28} rx="4" fill={accent} opacity={0.15} stroke={border} strokeWidth="1" strokeDasharray="4 2" />
          <text x={memX + 44} y={memY + 122} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">
            u.c
          </text>

          {/* Left: write int */}
          <g>
            <rect x={32} y={100} width={140} height={88} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
            <text x={102} y={122} textAnchor="middle" fontSize="11" fontWeight="600" fill={primary}>
              写入 int
            </text>
            <text x={102} y={142} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
              u.i = 65;
            </text>
            <text x={102} y={162} textAnchor="middle" fontSize="9" fill={secondary}>
              此时有效的是 i
            </text>
            <line x1={172} y1={144} x2={memX} y2={120} stroke={accent} strokeWidth="1.5" markerEnd="url(#uniArrow)" />
          </g>

          {/* Right: then read float — trap */}
          <g>
            <rect x={468} y={100} width={150} height={88} rx="8" fill={bg} stroke={warn} strokeWidth="1.5" />
            <text x={543} y={122} textAnchor="middle" fontSize="11" fontWeight="600" fill={warn}>
              再读 float？
            </text>
            <text x={543} y={142} textAnchor="middle" fontSize="10" fill={primary} fontFamily="monospace">
              x = u.f;
            </text>
            <text x={543} y={162} textAnchor="middle" fontSize="9" fill={secondary}>
              位模式被当 float 解释
            </text>
            <line x1={468} y1={144} x2={memX + memW} y2={120} stroke={warn} strokeWidth="1.5" strokeDasharray="5 3" />
          </g>

          <rect x={24} y={230} width={592} height={88} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={40} y={254} fontSize="11" fontWeight="600" fill={primary}>
            使用规则
          </text>
          <text x={40} y={274} fontSize="10" fill={secondary}>
            · 同一时刻只应通过「最后写入的那种成员类型」来读
          </text>
          <text x={40} y={292} fontSize="10" fill={secondary}>
            · 典型用途：节省内存（多种表示互斥）、协议字段复用、与硬件寄存器布局对应
          </text>
          <text x={40} y={310} fontSize="10" fill={secondary}>
            · C11 起可用 tagged union 模式：另存 enum 标签记录当前有效成员（编译器不自动检查）
          </text>

          <defs>
            <marker id="uniArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        联合体的成员重叠在同一块内存上；写入一种类型后再用另一种类型读取，得到的是同一串字节的另一种解释——通常不是有意义的数值。
      </figcaption>
    </figure>
  );
}
