/**
 * <TypeSizeDiagram>：C++ 基本算术类型的大小、取值范围对照表。
 *
 * 表格形式展示各算术类型的字节数、最小/最大值、有无符号。
 * 每行用颜色深浅区分有无符号（unsigned=暖、signed=冷），accent 高亮表头。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

interface TypeRow {
  type: string;
  bytes: string | number;
  min: string;
  max: string;
  signed: boolean;
  note?: string;
}

export function TypeSizeDiagram() {
  const rows: TypeRow[] = [
    { type: "bool", bytes: 1, min: "false", max: "true", signed: false, note: "true/false 不可做算术" },
    { type: "char", bytes: 1, min: "-128", max: "127", signed: true },
    { type: "unsigned char", bytes: 1, min: "0", max: "255", signed: false },
    { type: "wchar_t", bytes: "2/4", min: "0", max: "依平台", signed: false, note: "宽字符" },
    { type: "short", bytes: 2, min: "-32,768", max: "32,767", signed: true },
    { type: "unsigned short", bytes: 2, min: "0", max: "65,535", signed: false },
    { type: "int", bytes: 4, min: "≈ -2.1×10⁹", max: "≈ 2.1×10⁹", signed: true },
    { type: "unsigned int", bytes: 4, min: "0", max: "≈ 4.3×10⁹", signed: false },
    { type: "long", bytes: "4/8", min: "依平台", max: "依平台", signed: true, note: "≥ int" },
    { type: "long long", bytes: 8, min: "≈ -9.2×10¹⁸", max: "≈ 9.2×10¹⁸", signed: true },
    { type: "float", bytes: 4, min: "~1.2×10⁻³⁸", max: "~3.4×10³⁸", signed: true, note: "7位有效数字" },
    { type: "double", bytes: 8, min: "~2.2×10⁻³⁰⁸", max: "~1.8×10³⁰⁸", signed: true, note: "15位有效数字" },
  ];

  const colX = { type: 16, bytes: 160, signed: 250, min: 380, max: 410 };
  const headerY = 44;
  const rowH = 36;
  const startY = 76;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 580"
          role="img"
          aria-label="C++ 基本算术类型大小对照表：各类型的字节数、取值范围、有无符号"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 表头背景 */}
          <rect x="8" y={headerY - 12} width="624" height="28" rx="4" fill="var(--accent)" opacity="0.15" />
          {/* 表头文字 */}
          <text x={colX.type} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" fontFamily="monospace">类型</text>
          <text x={colX.bytes} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">字节</text>
          <text x={colX.signed} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">符号</text>
          <text x={colX.min} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">最小值</text>
          <text x={colX.max} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">最大值</text>

          {/* 数据行 */}
          {rows.map((r, i) => {
            const y = startY + i * rowH;
            const rowBg = i % 2 === 0 ? "var(--bg)" : "var(--bg-elevated)";
            const signColor = r.signed ? "var(--accent)" : "rgb(229,181,103)"; // 黄色语义色

            return (
              <g key={r.type}>
                {/* 行背景 */}
                <rect x="8" y={y - 10} width="624" height={rowH - 4} rx="4" fill={rowBg} />
                {/* 类型名 */}
                <text
                  x={colX.type}
                  y={y + 4}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                  fontFamily="monospace"
                >
                  {r.type}
                </text>
                {/* 字节数 */}
                <text
                  x={colX.bytes}
                  y={y + 4}
                  fontSize="12"
                  fill="var(--text-primary)"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {r.bytes}
                </text>
                {/* 符号标注 */}
                <text
                  x={colX.signed}
                  y={y + 4}
                  fontSize="11"
                  fill={signColor}
                  textAnchor="middle"
                >
                  {r.signed ? "有符号" : "无符号"}
                </text>
                {/* 最小值 */}
                <text
                  x={colX.min}
                  y={y + 4}
                  fontSize="11"
                  fill="var(--text-secondary)"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {r.min}
                </text>
                {/* 最大值 */}
                <text
                  x={colX.max}
                  y={y + 4}
                  fontSize="11"
                  fill="var(--text-secondary)"
                  fontFamily="monospace"
                >
                  {r.max}
                </text>
                {/* 备注 */}
                {r.note && (
                  <text
                    x={colX.max + 90}
                    y={y + 4}
                    fontSize="10"
                    fill="var(--text-secondary)"
                    opacity="0.7"
                  >
                    {r.note}
                  </text>
                )}
              </g>
            );
          })}

          {/* 底部说明虚线 */}
          <line
            x1="24"
            y1={startY + rows.length * rowH + 8}
            x2="620"
            y2={startY + rows.length * rowH + 8}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x="24"
            y={startY + rows.length * rowH + 24}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            注：字节数为常见平台典型值。long 在 64-bit Windows 为 4 字节，Linux/macOS 为 8 字节。
          </text>
          <text
            x="24"
            y={startY + rows.length * rowH + 40}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            float 约 7 位有效数字，double 约 15 位。wchar_t 在 Windows 为 2 字节，Linux/macOS 为 4 字节。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C++ 基本算术类型一览：各类型所占字节数、符号属性及典型平台的取值范围。
        无符号类型只能存 ≥0 的值，有符号类型一半给正数一半给负数。
      </figcaption>
    </figure>
  );
}
