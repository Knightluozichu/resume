/**
 * <PrintfFormatDiagram>：printf 格式字符串拆解图。
 *
 * 把 `printf("num=%d, pi=%.2f, name=%s\\n", 10, 3.14, "Tom");` 拆解为
 * 对照表：普通文字原样输出、%d→整数替换、%.2f→浮点保留两位、%s→字符串替换、\n→换行。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

interface FormatItem {
  segment: string;
  meaning: string;
  replacement: string;
  output: string;
}

export function PrintfFormatDiagram() {
  const items: FormatItem[] = [
    { segment: "\"num=\"", meaning: "普通文字：原样输出到屏幕", replacement: "—", output: "num=" },
    { segment: "%d", meaning: "转换说明：把 int 参数转成十进制整数字符串", replacement: "10", output: "10" },
    { segment: "\", pi=\"", meaning: "普通文字：原样输出 ", replacement: "—", output: ", pi=" },
    { segment: "%.2f", meaning: "转换说明：把 float 参数转成小数，保留 2 位", replacement: "3.14", output: "3.14" },
    { segment: "\", name=\"", meaning: "普通文字：原样输出 ", replacement: "—", output: ", name=" },
    { segment: "%s", meaning: "转换说明：把 char* 字符串参数填入", replacement: "\"Tom\"", output: "Tom" },
    { segment: "\\n", meaning: "转义序列：输出一个换行符", replacement: "—", output: "↲ 换行" },
  ];

  const colX = { segment: 20, meaning: 190, replacement: 420, output: 510 };
  const headerY = 38;
  const startY = 60;
  const rowH = 36;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 620 380"
          role="img"
          aria-label="printf 格式字符串拆解表：%d 替换成整数、%f 替换成浮点数、%s 替换成字符串、\\n 输出换行"
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          {/* 顶部完整语句 */}
          <text x="16" y="24" fontSize="12" fontWeight="600" fill="var(--accent)" fontFamily="monospace">
            printf("num=%d, pi=%.2f, name=%s\\n", 10, 3.14, "Tom");
          </text>

          {/* 表头背景 */}
          <rect x="8" y={headerY - 12} width="602" height="22" rx="4" fill="var(--accent)" opacity="0.12" />
          {/* 表头 */}
          <text x={colX.segment} y={headerY} fontSize="11" fontWeight="700" fill="var(--accent)">
            格式段
          </text>
          <text x={colX.meaning} y={headerY} fontSize="11" fontWeight="700" fill="var(--accent)">
            含义
          </text>
          <text x={colX.replacement} y={headerY} fontSize="11" fontWeight="700" fill="var(--accent)">
            实际参数
          </text>
          <text x={colX.output} y={headerY} fontSize="11" fontWeight="700" fill="var(--accent)">
            最终输出
          </text>

          {/* 数据行 */}
          {items.map((item, i) => {
            const y = startY + i * rowH;
            const isFormat = item.segment.startsWith("%") || item.segment === "\\n";
            const rowBg = i % 2 === 0 ? "var(--bg)" : "var(--bg-elevated)";
            const segmentColor = isFormat ? "var(--accent)" : "var(--text-primary)";

            return (
              <g key={i}>
                <rect x="8" y={y - 10} width="602" height={rowH - 4} rx="4" fill={rowBg} />
                {/* 格式段 */}
                <text
                  x={colX.segment}
                  y={y + 2}
                  fontSize="12"
                  fontWeight={isFormat ? "700" : "400"}
                  fill={segmentColor}
                  fontFamily="monospace"
                >
                  {item.segment}
                </text>
                {/* 含义 */}
                <text x={colX.meaning} y={y + 2} fontSize="11" fill="var(--text-secondary)">
                  {item.meaning}
                </text>
                {/* 实际参数 */}
                <text
                  x={colX.replacement}
                  y={y + 2}
                  fontSize="12"
                  fill={item.replacement === "—" ? "var(--text-secondary)" : "var(--text-primary)"}
                  fontFamily={item.replacement === "—" ? undefined : "monospace"}
                  opacity={item.replacement === "—" ? 0.4 : 1}
                >
                  {item.replacement}
                </text>
                {/* 输出预览 */}
                <text
                  x={colX.output}
                  y={y + 2}
                  fontSize="12"
                  fill="var(--text-primary)"
                  fontFamily="monospace"
                >
                  {item.output}
                </text>
              </g>
            );
          })}

          {/* 汇总输出 */}
          <line x1="16" y1={startY + items.length * rowH + 8} x2="610" y2={startY + items.length * rowH + 8}
            stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x="16" y={startY + items.length * rowH + 26} fontSize="12" fill="var(--text-secondary)">
            最终控制台输出：
          </text>
          <text x="180" y={startY + items.length * rowH + 26} fontSize="12" fontWeight="600"
            fill="var(--text-primary)" fontFamily="monospace">
            num=10, pi=3.14, name=Tom
          </text>
          <text x="180" y={startY + items.length * rowH + 42} fontSize="11" fill="var(--text-secondary)">
            （\n 使光标换到下一行）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        printf 的格式字符串就像填空题的"模板"：普通文字原样输出，
        百分号开头的转换说明（%d、%f、%s）被替换成后面参数的值。
      </figcaption>
    </figure>
  );
}
