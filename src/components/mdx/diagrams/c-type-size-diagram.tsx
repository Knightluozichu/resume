/**
 * <CTypeSizeDiagram>：C 基本类型的字节大小与取值范围对照表。
 *
 * 表格展示 int/short/long/long long/char/float/double/long double
 * 各自的典型字节数、最小最大值。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface CTypeRow {
  type: string;
  bytes: string;
  min: string;
  max: string;
  note?: string;
}

export function CTypeSizeDiagram() {
  const rows: CTypeRow[] = [
    { type: "char", bytes: "1", min: "实现定义", max: "实现定义", note: "普通 char 符号性可变" },
    { type: "unsigned char", bytes: "1", min: "0", max: "255", note: "纯字符/字节数据" },
    { type: "short", bytes: "2", min: "−32,768", max: "32,767" },
    { type: "unsigned short", bytes: "2", min: "0", max: "65,535" },
    { type: "int", bytes: "4", min: "−2,147,483,648", max: "2,147,483,647", note: "最常用整型" },
    { type: "unsigned int", bytes: "4", min: "0", max: "4,294,967,295" },
    { type: "long", bytes: "4 或 8", min: "依平台", max: "依平台", note: "≥ int" },
    { type: "long long", bytes: "8", min: "≈ −9.2×10¹⁸", max: "≈ 9.2×10¹⁸" },
    { type: "unsigned long long", bytes: "8", min: "0", max: "≈ 1.8×10¹⁹" },
    { type: "float", bytes: "4", min: "≈ −3.4×10³⁸", max: "≈ 3.4×10³⁸", note: "示例 IEEE binary32" },
    { type: "double", bytes: "8", min: "≈ −1.8×10³⁰⁸", max: "≈ 1.8×10³⁰⁸", note: "示例 IEEE binary64" },
    { type: "long double", bytes: "8/10/16", min: "依平台", max: "依平台", note: "≥ double" },
  ];

  const colX = { type: 20, bytes: 172, signed: 310, min: 400, max: 535 };
  const headerY = 44;
  const rowH = 34;
  const startY = 76;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 700 560"
          role="img"
          aria-label="C 基本类型大小对照表：各类型的字节数、最小最大值"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* 表头背景 */}
          <rect x="12" y={headerY - 12} width="676" height="28" rx="4" fill="var(--accent)" opacity="0.15" />
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
            const signLabel = r.type === "char"
              ? "依实现"
              : r.type.startsWith("unsigned")
                ? "无符号"
                : r.type.includes("float") || r.type.includes("double")
                  ? "浮点"
                  : "有符号";

            return (
              <g key={r.type}>
                <rect x="12" y={y - 10} width="676" height={rowH - 4} rx="4" fill={rowBg} />
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
                <text
                  x={colX.signed}
                  y={y + 4}
                  fontSize="11"
                  fill={signLabel === "无符号" ? "rgb(229,181,103)" : "var(--accent)"}
                  textAnchor="middle"
                >
                  {signLabel}
                </text>
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
                <text
                  x={colX.max}
                  y={y + 4}
                  fontSize="11"
                  fill="var(--text-secondary)"
                  fontFamily="monospace"
                >
                  {r.max}
                </text>
                {r.note && (
                  <text
                    x={colX.max + 58}
                    y={y + 4}
                    fontSize="11"
                    fill="var(--text-secondary)"
                    opacity="0.7"
                  >
                    {r.note}
                  </text>
                )}
              </g>
            );
          })}

          {/* 底部说明 */}
          <line
            x1="16"
            y1={startY + rows.length * rowH + 8}
            x2="684"
            y2={startY + rows.length * rowH + 8}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x="16"
            y={startY + rows.length * rowH + 26}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            示例快照：假设 CHAR_BIT=8、32 位 int、LP64 风格 long；这不是 C 语言固定布局。
          </text>
          <text
            x="16"
            y={startY + rows.length * rowH + 42}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            实际范围与精度请查询 limits.h、stdint.h、float.h 和 sizeof。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一种常见实现的数据模型快照。C 标准不强制补码、固定字节位数或表中的具体类型大小。
      </figcaption>
    </figure>
  );
}
