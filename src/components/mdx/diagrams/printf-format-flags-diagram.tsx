/**
 * <PrintfFormatFlagsDiagram>：printf 格式标志速查表。
 *
 * 展示 %d、%f、%s、%c、%.2f、%10d、%-10d、%-#x 等常用格式标志组合的作用和示例输出。
 *
 * Server Component（纯展示，静态 SVG，无交互）。token 色。
 */
export function PrintfFormatFlagsDiagram() {
  const token = {
    accent: "var(--accent)",
    border: "var(--border)",
    bg: "var(--bg)",
    bgElevated: "var(--bg-elevated)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
  };

  const items = [
    { spec: "%d", meaning: "有符号十进制整数", example: 'printf("%d", 42)', output: "42", type: "int" },
    { spec: "%u", meaning: "无符号十进制整数", example: 'printf("%u", 42U)', output: "42", type: "unsigned" },
    { spec: "%f", meaning: "浮点数（默认6位小数）", example: 'printf("%f", 3.14)', output: "3.140000", type: "float/double" },
    { spec: "%c", meaning: "单个字符", example: `printf("%c", 'A')`, output: "A", type: "char" },
    { spec: "%s", meaning: "字符串（char*）", example: `printf("%s", "Hi")`, output: "Hi", type: "char*" },
    { spec: "%.2f", meaning: "浮点数保留2位小数", example: 'printf("%.2f", 3.14159)', output: "3.14", type: "精度控制" },
    { spec: "%10d", meaning: "右对齐总宽10字符", example: 'printf("%10d", 42)', output: "        42", type: "宽度控制" },
    { spec: "%-10d", meaning: "左对齐总宽10字符", example: 'printf("%-10d", 42)', output: "42        ", type: "宽度+对齐" },
    { spec: "%#x", meaning: "十六进制带0x前缀", example: 'printf("%#x", 255)', output: "0xff", type: "标志#+" },
    { spec: "%+d", meaning: "强制显示正负号", example: 'printf("%+d", 42)', output: "+42", type: "标志#+" },
    { spec: "%010d", meaning: "宽度10，左边补零", example: 'printf("%010d", 42)', output: "0000000042", type: "补零" },
  ];

  const colX = { spec: 16, meaning: 110, example: 310, output: 510 };
  const headerY = 36;
  const startY = 58;
  const rowH = 32;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 630 470"
          role="img"
          aria-label="printf 格式标志速查表：%d/%f/%s/%c/%.2f/%10d/%-10d/%-#x 等常用格式说明"
          className="mx-auto block h-auto w-full max-w-[630px]"
        >
          {/* 标题 */}
          <text x="315" y="22" fontSize="14" fontWeight="700" fill={token.textPrimary} textAnchor="middle">
            printf 格式标志速查表
          </text>

          {/* 表头 */}
          <rect x="8" y={headerY - 12} width="614" height="22" rx="4" fill={token.accent} opacity="0.12" />
          <text x={colX.spec} y={headerY} fontSize="11" fontWeight="700" fill={token.accent} fontFamily="monospace">
            格式说明
          </text>
          <text x={colX.meaning} y={headerY} fontSize="11" fontWeight="700" fill={token.accent}>
            含义
          </text>
          <text x={colX.example} y={headerY} fontSize="11" fontWeight="700" fill={token.accent}>
            用法示例
          </text>
          <text x={colX.output} y={headerY} fontSize="11" fontWeight="700" fill={token.accent}>
            输出结果
          </text>

          {/* 数据行 */}
          {items.map((item, i) => {
            const y = startY + i * rowH;
            const rowBg = i % 2 === 0 ? token.bg : token.bgElevated;

            return (
              <g key={i}>
                <rect x="6" y={y - 8} width="618" height={rowH - 4} rx="4" fill={rowBg} />
                <text
                  x={colX.spec}
                  y={y + 4}
                  fontSize="13"
                  fontWeight="700"
                  fill={token.accent}
                  fontFamily="monospace"
                >
                  {item.spec}
                </text>
                <text x={colX.meaning} y={y + 4} fontSize="11" fill={token.textPrimary}>
                  {item.meaning}
                </text>
                <text
                  x={colX.example}
                  y={y + 4}
                  fontSize="11"
                  fill={token.textSecondary}
                  fontFamily="monospace"
                >
                  {item.example}
                </text>
                <text
                  x={colX.output}
                  y={y + 4}
                  fontSize="11"
                  fontWeight="600"
                  fill={token.textPrimary}
                  fontFamily="monospace"
                >
                  {item.output}
                </text>
              </g>
            );
          })}

          {/* 底部格式公式 */}
          <line
            x1="16"
            y1={startY + items.length * rowH + 8}
            x2="616"
            y2={startY + items.length * rowH + 8}
            stroke={token.border}
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text x="16" y={startY + items.length * rowH + 28} fontSize="11" fill={token.textSecondary}>
            格式通式：%[标志][宽度][.精度]类型
          </text>
          <text x="16" y={startY + items.length * rowH + 46} fontSize="10" fill={token.textSecondary} opacity="0.7">
            标志：-（左对齐） +（显示正号） #（加前缀 0x/0） 0（补零）    类型：d/f/s/c/u/x 等
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        printf 的格式说明遵循 %[标志][宽度][.精度]类型 组合规则——所有控制能力都在百分号后面这短短几个字符里。
      </figcaption>
    </figure>
  );
}
