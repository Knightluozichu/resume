/**
 * <CProgramAnatomyDiagram>：最小 C 程序的结构解剖，带气泡标注。
 *
 * 标注四个关键点：① #include <stdio.h> 头文件、② main 函数入口、
 * ③ printf 输出、④ return 0 返回值。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

export function CProgramAnatomyDiagram() {
  const codeLines = [
    { text: "#include <stdio.h>", annotation: "#include：把 stdio.h 内容粘贴到这里", annX: 370, annY: 22 },
    { text: "" },
    { text: "int main(void) {", annotation: "main 函数：程序从这里开始执行", annX: 370, annY: 60 },
    { text: '    printf("Hello, World!\\n");', annotation: "printf：输出字符串；\\n 是换行", annX: 370, annY: 84 },
    { text: "    return 0;", annotation: "return 0：程序正常结束", annX: 370, annY: 108 },
    { text: "}" },
  ];

  const lineY = (i: number) => 52 + i * 24;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 660 185"
          role="img"
          aria-label="最小 C 程序的四个关键部分：include stdio.h 头文件、int main 函数入口、printf 输出语句、return 0 返回值"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 代码框背景 */}
          <rect
            x="8" y="8" width="340" height="152" rx="6"
            fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5"
          />
          {/* 标题栏 */}
          <rect x="8" y="8" width="340" height="20" rx="6" fill="var(--border)" />
          <rect x="8" y="22" width="340" height="6" fill="var(--border)" />
          <text x="22" y="22" fontSize="10" fill="var(--text-secondary)" fontFamily="monospace">
            hello.c
          </text>

          {/* 代码行 */}
          {codeLines.map((line, i) => {
            if (!line.text) return null;
            const y = lineY(i);
            return (
              <g key={i}>
                <text x="18" y={y} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace" textAnchor="end">
                  {i + 1}
                </text>
                <text x="30" y={y} fontSize="13" fill="var(--text-primary)" fontFamily="monospace">
                  {line.text}
                </text>
              </g>
            );
          })}

          {/* 气泡标注 */}
          {codeLines.map((line, i) => {
            if (!line.annotation) return null;
            const srcY = lineY(i);
            const annY = line.annY!;
            return (
              <g key={`ann-${i}`}>
                <polyline
                  points={`348,${srcY} 362,${srcY} 362,${annY} 366,${annY}`}
                  fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2"
                />
                <circle cx="348" cy={srcY} r="3" fill="var(--accent)" />
                <rect
                  x={line.annX! - 4} y={annY - 12} width="276" height="18" rx="4"
                  fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" opacity="0.92"
                />
                <text x={line.annX! + 4} y={annY + 1} fontSize="10" fill="var(--text-primary)">
                  {line.annotation}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <text x="12" y="178" fontSize="11" fill="var(--text-secondary)">
            最小 C 程序：include 引入能力、main 定义入口、printf 输出文字、return 返回状态
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一个最简 C 程序的四个关键部分：头文件声明能力、main 函数指定入口、
        printf 把文字送到控制台、return 返回执行状态给操作系统。
      </figcaption>
    </figure>
  );
}
