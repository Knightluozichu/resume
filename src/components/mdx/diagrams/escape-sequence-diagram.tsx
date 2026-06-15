/**
 * <EscapeSequenceDiagram>：C 常用转义序列速查表。
 *
 * 表格展示 \n \t \\ \" \' \0 \x \r \a \b 等常见转义序列，
 * 含转义字符、含义、ASCII 码。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

interface EscapeRow {
  seq: string;
  name: string;
  desc: string;
  ascii: string;
}

export function EscapeSequenceDiagram() {
  const rows: EscapeRow[] = [
    { seq: "\\n", name: "换行 (LF)", desc: "光标移到下一行开头", ascii: "10 (0x0A)" },
    { seq: "\\t", name: "水平制表 (Tab)", desc: "光标移到下一个制表位", ascii: "9 (0x09)" },
    { seq: "\\\\", name: "反斜杠", desc: "输出一个字面的反斜杠 \\", ascii: "92 (0x5C)" },
    { seq: "\\\"", name: "双引号", desc: "在字符串中输出双引号 \"", ascii: "34 (0x22)" },
    { seq: "\\'", name: "单引号", desc: "在字符常量中输出单引号 '", ascii: "39 (0x27)" },
    { seq: "\\0", name: "空字符 (NUL)", desc: "字符串结束标记，ASCII 0", ascii: "0 (0x00)" },
    { seq: "\\r", name: "回车 (CR)", desc: "光标移到当前行开头", ascii: "13 (0x0D)" },
    { seq: "\\a", name: "响铃 (BEL)", desc: "触发系统蜂鸣声", ascii: "7 (0x07)" },
    { seq: "\\b", name: "退格 (BS)", desc: "光标向左退一格", ascii: "8 (0x08)" },
    { seq: "\\xhh", name: "十六进制转义", desc: "用十六进制码表示字符，如 \\x41 = 'A'", ascii: "hh = 任意十六进制" },
  ];

  const colX = { seq: 24, name: 128, desc: 268, ascii: 464 };
  const headerY = 40;
  const rowH = 34;
  const startY = 56;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 620 460"
          role="img"
          aria-label="C 常用转义序列速查表"
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          {/* 表头 */}
          <rect x="8" y={headerY - 12} width="596" height="28" rx="4" fill="var(--accent)" opacity="0.15" />
          <text x={colX.seq} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" fontFamily="monospace">转义序列</text>
          <text x={colX.name} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">名称</text>
          <text x={colX.desc} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">含义</text>
          <text x={colX.ascii} y={headerY + 4} fontSize="12" fontWeight="700" fill="var(--accent)" textAnchor="middle">ASCII 码</text>

          {/* 数据行 */}
          {rows.map((r, i) => {
            const y = startY + i * rowH;
            const rowBg = i % 2 === 0 ? "var(--bg)" : "var(--bg-elevated)";

            return (
              <g key={r.seq}>
                <rect x="8" y={y - 10} width="596" height={rowH - 4} rx="4" fill={rowBg} />
                <text
                  x={colX.seq}
                  y={y + 4}
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--accent)"
                  fontFamily="monospace"
                >
                  {r.seq}
                </text>
                <text
                  x={colX.name}
                  y={y + 4}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                  textAnchor="middle"
                >
                  {r.name}
                </text>
                <text
                  x={colX.desc}
                  y={y + 4}
                  fontSize="11"
                  fill="var(--text-secondary)"
                  textAnchor="middle"
                >
                  {r.desc}
                </text>
                <text
                  x={colX.ascii}
                  y={y + 4}
                  fontSize="11"
                  fill="var(--text-secondary)"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {r.ascii}
                </text>
              </g>
            );
          })}

          {/* 底部提示 */}
          <line x1="16" y1={startY + rows.length * rowH + 12} x2="600" y2={startY + rows.length * rowH + 12} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="16" y={startY + rows.length * rowH + 30} fontSize="11" fill="var(--text-secondary)">
            反斜杠 \ 告诉编译器「后面的字符有特殊含义」——把普通字母转成控制字符，故称「转义」。
          </text>
          <text x="16" y={startY + rows.length * rowH + 46} fontSize="11" fill="var(--text-secondary)">
            \\xhh 中 hh 为两位十六进制数。除 \\x 外还有 \\ooo（八进制转义），如 \\101 = 'A'（八进制 101 = 十进制 65）。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 语言常用转义序列一览。反斜杠把普通字符转成控制功能——\\n 不是字母 n，而是「换行」。
      </figcaption>
    </figure>
  );
}
