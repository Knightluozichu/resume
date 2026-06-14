/**
 * <IOManipulatorTable>：C++ 常用格式化操纵符速查表。
 *
 * 展示 setw / setprecision / fixed / scientific / left / right / hex / oct / dec 等常用操纵符。
 *
 * Server Component（纯展示，静态 SVG 表格，无交互）。
 * token 色（var(--xxx)），无阴影。
 */

export function IOManipulatorTable() {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";

  const w = 660;
  const h = 520;
  const startX = 20;
  const startY = 50;

  // 列宽
  const colW = [140, 230, 250];
  const headerH = 40;
  const rowH = 38;

  const headers = ["操纵符", "效果", "示例"];
  const rows = [
    { name: "std::setw(n)", effect: "设置下一次输出的字段宽度为 n 个字符", example: "cout << setw(6) << 42; // \"    42\"" },
    { name: "std::setprecision(n)", effect: "设置浮点数精度为 n 位", example: "cout << setprecision(3) << 3.14159; // 3.14" },
    { name: "std::fixed", effect: "固定小数点格式（不是科学记数）", example: "cout << fixed << 3.14159; // 3.141590" },
    { name: "std::scientific", effect: "科学记数法格式", example: "cout << scientific << 3.14159; // 3.141590e+00" },
    { name: "std::left", effect: "输出内容左对齐（右侧补齐空格）", example: "cout << left << setw(6) << 42; // \"42    \"" },
    { name: "std::right", effect: "输出内容右对齐（左侧补齐空格，默认）", example: "cout << right << setw(6) << 42; // \"    42\"" },
    { name: "std::hex", effect: "以十六进制输出整数", example: "cout << hex << 255; // ff" },
    { name: "std::oct", effect: "以八进制输出整数", example: "cout << oct << 255; // 377" },
    { name: "std::dec", effect: "恢复十进制输出整数（默认）", example: "cout << dec << 255; // 255" },
    { name: "std::boolalpha", effect: "bool值输出为 true/false", example: "cout << boolalpha << true; // true" },
    { name: "std::showbase", effect: "显示进制前缀（0x 十六进制，0 八进制）", example: "cout << showbase << hex << 255; // 0xff" },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="C++ 常用格式化操纵符速查表：setw、setprecision、fixed、scientific、left、right、hex、oct、dec、boolalpha、showbase 等 11 个常用操纵符"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 表头 */}
          <rect x={startX} y={startY} width={colW[0]} height={headerH} rx="4" fill={accent} opacity={0.12} />
          <rect x={startX + colW[0]} y={startY} width={colW[1]} height={headerH} rx="4" fill={accent} opacity={0.12} />
          <rect x={startX + colW[0] + colW[1]} y={startY} width={colW[2]} height={headerH} rx="4" fill={accent} opacity={0.12} />

          <text x={startX + colW[0] / 2} y={startY + headerH / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>操纵符</text>
          <text x={startX + colW[0] + colW[1] / 2} y={startY + headerH / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>效果</text>
          <text x={startX + colW[0] + colW[1] + colW[2] / 2} y={startY + headerH / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>示例</text>

          {/* 分隔线 */}
          <line x1={startX} y1={startY + headerH} x2={w - startX} y2={startY + headerH} stroke={border} strokeWidth="1.5" />

          {/* 数据行 */}
          {rows.map((row, i) => {
            const y = startY + headerH + i * rowH;
            const isEven = i % 2 === 0;
            return (
              <g key={row.name}>
                {isEven && (
                  <rect x={startX} y={y} width={colW[0] + colW[1] + colW[2]} height={rowH} rx="2" fill={accent} opacity={0.04} />
                )}
                <text
                  x={startX + 8}
                  y={y + rowH / 2 + 4}
                  fontSize="11"
                  fontWeight="600"
                  fill={primary}
                  fontFamily="monospace"
                >
                  {row.name}
                </text>
                <text
                  x={startX + colW[0] + 8}
                  y={y + rowH / 2 + 4}
                  fontSize="10"
                  fill={secondary}
                >
                  {row.effect}
                </text>
                <text
                  x={startX + colW[0] + colW[1] + 8}
                  y={y + rowH / 2 + 4}
                  fontSize="10"
                  fill={secondary}
                  fontFamily="monospace"
                >
                  {row.example}
                </text>
              </g>
            );
          })}

          {/* 底部分隔线 */}
          <line x1={startX} y1={startY + headerH + rows.length * rowH} x2={w - startX} y2={startY + headerH + rows.length * rowH} stroke={border} strokeWidth="1.5" />

          {/* 注意事项 */}
          <text x={startX + colW[0] + colW[1] / 2} y={startY + headerH + rows.length * rowH + 30} fontSize="10" fill={secondary}>
            注意：hex/oct/fixed/scientific 等一旦设置，后续所有输出都保持该格式——直到再次显式修改。
          </text>
          <text x={startX + colW[0] + colW[1] / 2} y={startY + headerH + rows.length * rowH + 48} fontSize="10" fill={secondary}>
            而 setw 只对「下一次」输出有效，用完自动重置为 0。需要 #include &lt;iomanip&gt;。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        11 个最常用的 C++ 格式化操纵符。hex/oct/fixed/scientific 等一旦设置就持久生效；setw 只影响下一次输出。
        全部定义在 &lt;iomanip&gt; 头文件中。
      </figcaption>
    </figure>
  );
}
