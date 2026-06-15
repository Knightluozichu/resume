/**
 * <BinaryHexDiagram>：十/二/八/十六进制对照（以 42 为例）。
 */

export function BinaryHexDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";

  const bits = ["0", "0", "1", "0", "1", "0", "1", "0"];
  const bitLabels = ["7", "6", "5", "4", "3", "2", "1", "0"];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="十进制 42 与二进制、八进制、十六进制对照"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            同一数值的多种进制表示（42）
          </text>

          <rect x={24} y={44} width={592} height={52} rx="8" fill={bgEl} stroke={border} strokeWidth="1.5" />
          <text x={44} y={76} fontSize="13" fontWeight="700" fill={accent} fontFamily="monospace">
            十进制
          </text>
          <text x={120} y={76} fontSize="14" fill={primary} fontFamily="monospace">
            42
          </text>
          <text x={160} y={76} fontSize="10" fill={secondary}>
            = 4×10 + 2×1
          </text>

          <text x={44} y={118} fontSize="12" fontWeight="600" fill={secondary}>
            二进制（base 2）
          </text>
          {bits.map((b, i) => {
            const x = 44 + i * 52;
            const on = b === "1";
            return (
              <g key={`b-${i}`}>
                <rect
                  x={x}
                  y={128}
                  width={44}
                  height={44}
                  rx="6"
                  fill={on ? `${good}22` : bg}
                  stroke={on ? good : border}
                  strokeWidth="1.5"
                />
                <text x={x + 22} y={148} textAnchor="middle" fontSize="9" fill={secondary}>
                  2^{bitLabels[i]}
                </text>
                <text x={x + 22} y={166} textAnchor="middle" fontSize="14" fontWeight="700" fill={primary} fontFamily="monospace">
                  {b}
                </text>
              </g>
            );
          })}
          <text x={500} y={158} fontSize="12" fill={primary} fontFamily="monospace">
            0b00101010
          </text>

          <rect x={24} y={192} width={280} height={56} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={44} y={218} fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
            八进制
          </text>
          <text x={44} y={238} fontSize="13" fill={primary} fontFamily="monospace">
            052
          </text>
          <text x={100} y={238} fontSize="10" fill={secondary}>
            每 3 位一组：001 010 100 → 1 2 4
          </text>

          <rect x={320} y={192} width={296} height={56} rx="8" fill={bg} stroke={border} strokeWidth="1.5" />
          <text x={340} y={218} fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
            十六进制
          </text>
          <text x={340} y={238} fontSize="13" fill={primary} fontFamily="monospace">
            0x2A
          </text>
          <text x={400} y={238} fontSize="10" fill={secondary}>
            每 4 位一组：0010 1010 → 2 A
          </text>

          <rect x={24} y={268} width={592} height={56} rx="8" fill={bgEl} stroke={accent} strokeWidth="1" strokeDasharray="4 3" />
          <text x={44} y={292} fontSize="10" fontWeight="600" fill={secondary}>
            C 字面量
          </text>
          <text x={44} y={312} fontSize="11" fill={primary} fontFamily="monospace">
            42 &nbsp; 052 &nbsp; 0x2A &nbsp; 0b00101010（C23）
          </text>
          <text x={380} y={312} fontSize="10" fill={secondary}>
            printf 用 %d %o %x
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        同一整数可用十/八/十六/二进制书写；硬件里存的是位模式，printf 按格式把位解释成不同进制的字符。
      </figcaption>
    </figure>
  );
}
