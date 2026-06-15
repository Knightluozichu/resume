/**
 * <StringFunctionTableDiagram>：strlen / strcpy / strcat / strcmp 速查表。
 */

export function StringFunctionTableDiagram() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  const rows = [
    {
      fn: "strlen(s)",
      ret: "size_t",
      desc: "从 s[0] 数到 \\0 之前，返回字符个数（不含 \\0）",
      ex: "strlen(\"Hi\") → 2",
    },
    {
      fn: "strcpy(dest, src)",
      ret: "char *",
      desc: "把 src（含 \\0）复制到 dest；dest 必须够大",
      ex: "strcpy(d, \"Hi\")",
    },
    {
      fn: "strcat(dest, src)",
      ret: "char *",
      desc: "把 src 接到 dest 已有字符串末尾（先找 dest 的 \\0）",
      ex: "strcat(d, \"!\")",
    },
    {
      fn: "strcmp(s1, s2)",
      ret: "int",
      desc: "按字典序比较；相等返回 0；s1&lt;s2 负；s1&gt;s2 正",
      ex: "strcmp(\"a\",\"b\") &lt; 0",
    },
  ];

  const rowH = 56;
  const tableY = 56;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 360"
          role="img"
          aria-label="string.h 常用函数速查表"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text x={24} y={28} fontSize="14" fontWeight="700" fill={primary}>
            #include &lt;string.h&gt; 四大基础函数
          </text>

          <rect x={24} y={tableY} width={592} height={rowH} rx="6" fill={accent} opacity={0.12} stroke={border} />
          <text x={40} y={tableY + 22} fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">
            函数
          </text>
          <text x={200} y={tableY + 22} fontSize="11" fontWeight="700" fill={accent}>
            返回值
          </text>
          <text x={300} y={tableY + 22} fontSize="11" fontWeight="700" fill={accent}>
            作用
          </text>

          {rows.map((row, i) => {
            const y = tableY + rowH + i * rowH;
            return (
              <g key={row.fn}>
                <rect x={24} y={y} width={592} height={rowH - 4} rx="6" fill={bg} stroke={border} strokeWidth="1" />
                <text x={40} y={y + 22} fontSize="11" fontWeight="600" fill={primary} fontFamily="monospace">
                  {row.fn}
                </text>
                <text x={200} y={y + 22} fontSize="10" fill={secondary} fontFamily="monospace">
                  {row.ret}
                </text>
                <text x={300} y={y + 18} fontSize="10" fill={secondary}>
                  {row.desc}
                </text>
                <text x={300} y={y + 34} fontSize="9" fill={accent} fontFamily="monospace">
                  {row.ex}
                </text>
              </g>
            );
          })}

          <text x={24} y={330} fontSize="11" fill={secondary}>
            均需以 \\0 结尾的有效 C 字符串。更安全变体：strncpy、strncat、strncmp、strnlen（C11）。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        string.h 核心四函数：测长、复制、拼接、比较。记住返回值含义与 dest 缓冲区大小约束。
      </figcaption>
    </figure>
  );
}
