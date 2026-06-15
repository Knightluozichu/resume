/**
 * <HelloWorldAnnotatedDiagram>：Hello World 程序带气泡标注示意图。
 *
 * 标注四个关键点：① #include 头文件、② main 函数（程序入口）、
 * ③ cout 输出、④ return 返回值。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

export function HelloWorldAnnotatedDiagram() {
  const codeLines = [
    { text: '#include <iostream>', annotation: "包含头文件：让你能用 cout", annX: 380, annY: 22 },
    { text: "", annotation: "", annX: 0, annY: 0 },
    { text: "int main() {", annotation: "main 函数：程序从这里开始执行", annX: 380, annY: 58 },
    { text: "    std::cout << \"Hello, World!\" << std::endl;", annotation: "cout：往控制台输出文字", annX: 420, annY: 82 },
    { text: "    return 0;", annotation: "return 0：告诉操作系统「程序正常结束」", annX: 400, annY: 106 },
    { text: "}", annotation: "", annX: 0, annY: 0 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 620 200"
          role="img"
          aria-label="Hello World C++ 程序，带气泡标注：include 头文件声明、main 函数入口、cout 输出到控制台、return 返回状态码"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 代码框背景 */}
          <rect
            x="8"
            y="8"
            width="340"
            height="138"
            rx="6"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {/* 代码框顶部标题栏 */}
          <rect
            x="8"
            y="8"
            width="340"
            height="22"
            rx="6"
            fill="var(--border)"
          />
          <rect x="8" y="24" width="340" height="6" fill="var(--border)" />
          <text
            x="22"
            y="21"
            fontSize="11"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            hello.cpp
          </text>

          {/* 代码行 */}
          {codeLines.map((line, i) => {
            if (line.text === "") return null;
            const y = 50 + i * 22;
            return (
              <g key={i}>
                {/* 行号 */}
                <text
                  x="18"
                  y={y}
                  fontSize="12"
                  fill="var(--text-secondary)"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {i + 1}
                </text>
                {/* 代码文字 */}
                <text
                  x="30"
                  y={y}
                  fontSize="13"
                  fill="var(--text-primary)"
                  fontFamily="monospace"
                >
                  {line.text}
                </text>
              </g>
            );
          })}

          {/* 气泡标注 */}
          {codeLines.map((line, i) => {
            if (!line.annotation) return null;
            const srcY = 50 + i * 22;
            const annY = line.annY;
            return (
              <g key={`ann-${i}`}>
                {/* 连接线 */}
                <polyline
                  points={`348,${srcY} 364,${srcY} 364,${annY} 376,${annY}`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />
                {/* 气泡小圆点 */}
                <circle cx="348" cy={srcY} r="3" fill="var(--accent)" />
                {/* 注解文字 + 背景 */}
                <rect
                  x={line.annX - 6}
                  y={annY - 14}
                  width="200"
                  height="20"
                  rx="4"
                  fill="var(--bg)"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  opacity="0.9"
                />
                <text
                  x={line.annX + 4}
                  y={annY + 1}
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {line.annotation}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <text
            x="16"
            y="188"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一个最简 C++ 程序：包含头文件、定义 main 入口、用 cout 输出、return 返回
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        一个最简 C++ 程序的四个关键部分：头文件声明能力、main 函数指定入口、
        cout 把文字送到控制台、return 返回执行状态给操作系统。
      </figcaption>
    </figure>
  );
}
