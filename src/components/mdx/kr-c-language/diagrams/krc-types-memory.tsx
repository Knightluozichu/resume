/**
 * <KrcTypesMemoryDiagram>：C 语言基本类型在内存中的布局。
 *
 * 展示 char / short / int / float / double 的字节大小与内存对齐：
 *   - 每个类型用一排小方块表示字节数
 *   - 标注对齐边界与典型取值范围
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

interface TypeRow {
  name: string;
  bytes: number;
  align: string;
  range: string;
  note: string;
}

const ROWS: readonly TypeRow[] = [
  { name: "char",   bytes: 1, align: "1", range: "-128 ~ 127",         note: "字符 / 小整数" },
  { name: "short",  bytes: 2, align: "2", range: "-32768 ~ 32767",     note: "短整型" },
  { name: "int",    bytes: 4, align: "4", range: "≈ ±2.1×10⁹",         note: "最常用整型" },
  { name: "float",  bytes: 4, align: "4", range: "≈ ±3.4×10³⁸",        note: "6 位有效数字" },
  { name: "double", bytes: 8, align: "8", range: "≈ ±1.8×10³⁰⁸",       note: "15 位有效数字" },
];

const ROW_H = 56;
const ROW_GAP = 12;
const ROW_START_Y = 112;
const rowY = (i: number) => ROW_START_Y + i * (ROW_H + ROW_GAP);

const BYTE_W = 40;
const BYTE_H = 36;
const BYTE_GAP = 4;
const BYTE_START_X = 180;

export function KrcTypesMemoryDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C 语言基本类型的内存布局。展示 char（1字节）、short（2字节）、int（4字节）、float（4字节）、double（8字节）的字节方块、对齐边界与取值范围。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={36} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C 基本类型 · 内存布局
          </text>
          <text x={VIEW_W / 2} y={58} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            每个方块代表 1 字节；对齐边界 = 类型大小的整数倍地址
          </text>

          {/* 表头 */}
          <text x={40}  y={92} fontSize="12" fontWeight="700" fill="var(--accent)" fontFamily="monospace">类型</text>
          <text x={180} y={92} fontSize="12" fontWeight="700" fill="var(--accent)">字节布局</text>
          <text x={540} y={92} fontSize="12" fontWeight="700" fill="var(--accent)">对齐 / 范围</text>

          {/* 数据行 */}
          {ROWS.map((r, i) => {
            const y = rowY(i);
            const rowBg = i % 2 === 0 ? "var(--bg)" : "var(--bg-elevated)";
            return (
              <g key={r.name}>
                <rect x={32} y={y - 8} width={VIEW_W - 64} height={ROW_H} rx="8" fill={rowBg} />

                {/* 类型名 */}
                <text x={40} y={y + 20} fontSize="13" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
                  {r.name}
                </text>
                <text x={40} y={y + 38} fontSize="11" fill="var(--text-secondary)">
                  {r.note}
                </text>

                {/* 字节方块 */}
                {Array.from({ length: r.bytes }).map((_, bi) => {
                  const bx = BYTE_START_X + bi * (BYTE_W + BYTE_GAP);
                  return (
                    <g key={bi}>
                      <rect
                        x={bx}
                        y={y + 4}
                        width={BYTE_W}
                        height={BYTE_H}
                        rx="4"
                        fill="var(--accent)"
                        fillOpacity={0.08 + bi * 0.04}
                        stroke="var(--accent)"
                        strokeWidth="1.2"
                        strokeOpacity="0.5"
                      />
                      <text
                        x={bx + BYTE_W / 2}
                        y={y + 4 + BYTE_H / 2 + 5}
                        textAnchor="middle"
                        fontSize="11"
                        fill="var(--text-secondary)"
                        fontFamily="monospace"
                      >
                        {bi}
                      </text>
                    </g>
                  );
                })}

                {/* 对齐与范围 */}
                <text x={540} y={y + 20} fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
                  align {r.align}
                </text>
                <text x={540} y={y + 38} fontSize="11" fill="var(--text-secondary)">
                  {r.range}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <line x1={32} y1={404} x2={VIEW_W - 32} y2={404} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={32} y={426} fontSize="11" fill="var(--text-secondary)">
            sizeof(char) = 1 是 C 标准唯一定义的绝对大小；其余类型大小依平台而定，上图为 64 位典型值。
          </text>
          <text x={32} y={444} fontSize="11" fill="var(--text-secondary)">
            对齐：编译器在结构体成员间插入 padding，使每个成员落在自身对齐边界的整数倍地址上。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C 基本类型的内存布局与对齐。char 1 字节、short 2 字节、int/float 4 字节、double 8 字节；对齐边界通常等于类型大小。
      </figcaption>
    </figure>
  );
}
