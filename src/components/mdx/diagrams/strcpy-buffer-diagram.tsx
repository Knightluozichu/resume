/**
 * <StrcpyBufferDiagram>：strcpy 缓冲区溢出风险（step 1-3）。
 *
 * ① 目标缓冲区太小 ② strcpy 无界拷贝 ③ 越界覆盖相邻内存
 */

interface StrcpyBufferDiagramProps {
  step?: 1 | 2 | 3;
}

export function StrcpyBufferDiagram({ step = 3 }: StrcpyBufferDiagramProps) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const danger = "rgb(229,103,103)";

  const highlight = (s: number) => (step === s ? 1 : step > s ? 0.8 : 0.4);

  const destCells = [
    { label: "d[0]", ch: "?", ok: true },
    { label: "d[1]", ch: "?", ok: true },
    { label: "d[2]", ch: "?", ok: true },
    { label: "d[3]", ch: "?", ok: true },
    { label: "d[4]", ch: "?", ok: true },
    { label: "d[5]", ch: "?", ok: true },
    { label: "d[6]", ch: "?", ok: true },
    { label: "d[7]", ch: "?", ok: true },
  ];

  const src = ["H", "i", "!", "\\0"];
  const overflowChars = ["H", "i", "!", "X", "X", "X", "X", "X", "X", "\\0"];

  const cellW = 56;
  const startX = 48;
  const rowY = 88;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="strcpy 缓冲区溢出风险示意图"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="13" fontWeight="700" fill={primary} fontFamily="monospace">
            char dest[8];  strcpy(dest, "Hi!");
          </text>

          <text x={24} y={52} fontSize="11" fill={secondary}>
            源串 "Hi!" 只有 4 字节；若源更长而 dest 只有 8 字节……
          </text>

          {/* 源字符串 */}
          <g opacity={highlight(1)}>
            <text x={startX} y={rowY - 12} fontSize="11" fontWeight="600" fill={accent}>
              源 src = "Hi!"
            </text>
            {src.map((ch, i) => (
              <g key={`src-${i}`}>
                <rect
                  x={startX + i * cellW}
                  y={rowY}
                  width={cellW - 4}
                  height={44}
                  rx="5"
                  fill={accent}
                  opacity={0.15}
                  stroke={accent}
                  strokeWidth="1.5"
                />
                <text x={startX + i * cellW + (cellW - 4) / 2} y={rowY + 28} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary} fontFamily="monospace">
                  {ch}
                </text>
              </g>
            ))}
          </g>

          {/* 目标缓冲区 */}
          <g opacity={highlight(2)}>
            <text x={startX} y={rowY + 72} fontSize="11" fontWeight="600" fill={step >= 3 ? danger : accent}>
              目标 dest[8]（合法下标 0–7）
            </text>
            {destCells.map((cell, i) => {
              const show = step >= 3 ? overflowChars[i] : step >= 2 && i < 4 ? src[i] : "?";
              const overflow = step >= 3 && i >= 4 && i < 9;
              return (
                <g key={`dest-${i}`}>
                  <rect
                    x={startX + i * cellW}
                    y={rowY + 84}
                    width={cellW - 4}
                    height={44}
                    rx="5"
                    fill={overflow ? danger : accent}
                    opacity={overflow ? 0.25 : 0.12}
                    stroke={overflow ? danger : border}
                    strokeWidth={overflow ? 2 : 1.5}
                  />
                  <text
                    x={startX + i * cellW + (cellW - 4) / 2}
                    y={rowY + 108}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={overflow ? danger : primary}
                    fontFamily="monospace"
                  >
                    {show}
                  </text>
                  <text x={startX + i * cellW + (cellW - 4) / 2} y={rowY + 140} textAnchor="middle" fontSize="9" fill={secondary}>
                    {cell.label}
                  </text>
                </g>
              );
            })}
          </g>

          {step >= 2 && (
            <text x={startX + 4 * cellW} y={rowY + 58} fontSize="20" fill={accent}>
              →
            </text>
          )}

          {/* 步骤说明卡 */}
          <g opacity={highlight(1)}>
            <rect x={24} y={248} width={180} height={64} rx="8" fill={bg} stroke={step === 1 ? accent : border} strokeWidth={step === 1 ? 2 : 1} />
            <text x={40} y={272} fontSize="12" fontWeight="700" fill={step === 1 ? accent : primary}>
              ① 目标太小
            </text>
            <text x={40} y={292} fontSize="10" fill={secondary}>
              dest 只有 8 字节
            </text>
          </g>

          <g opacity={highlight(2)}>
            <rect x={230} y={248} width={180} height={64} rx="8" fill={bg} stroke={step === 2 ? accent : border} strokeWidth={step === 2 ? 2 : 1} />
            <text x={246} y={272} fontSize="12" fontWeight="700" fill={step === 2 ? accent : primary}>
              ② strcpy 无检查
            </text>
            <text x={246} y={292} fontSize="10" fill={secondary}>
              一直拷到源串 \0
            </text>
          </g>

          <g opacity={highlight(3)}>
            <rect x={436} y={248} width={180} height={64} rx="8" fill={bg} stroke={step === 3 ? danger : border} strokeWidth={step === 3 ? 2 : 1} />
            <text x={452} y={272} fontSize="12" fontWeight="700" fill={step === 3 ? danger : primary}>
              ③ 越界覆盖
            </text>
            <text x={452} y={292} fontSize="10" fill={secondary}>
              破坏栈上其他变量
            </text>
          </g>

          <text x={24} y={336} fontSize="11" fill={secondary}>
            {step === 1 && "先确认目标缓冲区够不够大——strcpy 不会帮你检查。"}
            {step === 2 && "strcpy 从 src 逐字节复制，直到遇到 \\0，不管 dest 剩多少空间。"}
            {step === 3 && "超长源串会写出 dest 边界，覆盖相邻内存——安全替代：strncpy / strlcpy / snprintf。"}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        strcpy 不检查目标长度。源串比目标缓冲区长时会发生缓冲区溢出——经典安全漏洞来源。
      </figcaption>
    </figure>
  );
}
