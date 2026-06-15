/**
 * <CHistoryTimelineDiagram>：C 语言发展时间线。
 *
 * 展示 C 语言从诞生到各主要标准的关键里程碑：
 * 1972→K&R→C89→C99→C11→C18，水平时间轴 + 节点 + 标注。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

export function CHistoryTimelineDiagram() {
  const milestones = [
    { year: "1972", label: "C 诞生", sub: "贝尔实验室\nDennis Ritchie", x: 60 },
    { year: "1978", label: "K&R C", sub: "《The C Programming\nLanguage》出版", x: 170 },
    { year: "1989", label: "C89", sub: "ANSI 首个标准\n（也称 ANSI C）", x: 280 },
    { year: "1999", label: "C99", sub: "新增 // 注释\n变长数组等", x: 390 },
    { year: "2011", label: "C11", sub: "多线程支持\n泛型宏", x: 500 },
    { year: "2018", label: "C18", sub: "C11 修正/勘误\n无新特性", x: 610 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 720 200"
          role="img"
          aria-label="C 语言发展时间线：1972 C 诞生 → K&R C → C89 → C99 → C11 → C18"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 水平时间轴 */}
          <line
            x1="40"
            y1="120"
            x2="680"
            y2="120"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* 里程碑节点与标注 */}
          {milestones.map((m, i) => (
            <g key={m.year}>
              {/* 节点 */}
              <circle
                cx={m.x + 40}
                cy="120"
                r="8"
                fill="var(--accent)"
              />
              <circle
                cx={m.x + 40}
                cy="120"
                r="4"
                fill="var(--bg)"
              />
              {/* 年份（轴上方） */}
              <text
                x={m.x + 40}
                y="105"
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="var(--accent)"
                fontFamily="monospace"
              >
                {m.year}
              </text>
              {/* 标签（轴上方） */}
              <text
                x={m.x + 40}
                y="88"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {m.label}
              </text>
              {/* 副标注（轴下方） */}
              <line
                x1={m.x + 40}
                y1="128"
                x2={m.x + 40}
                y2="142"
                stroke="var(--border)"
                strokeWidth="1"
              />
              {m.sub.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={m.x + 40}
                  y={156 + li * 14}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          {/* 顶部标题 */}
          <text
            x="40"
            y="30"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            C 语言的发展历程
          </text>
          <text
            x="40"
            y="48"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            从贝尔实验室的"玩具语言"到全球通用标准，50 年演进
          </text>

          {/* 底部说明 */}
          <text
            x="360"
            y="190"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            时间轴上的每个节点代表一次重要的标准化里程碑
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 语言发展时间线：从 1972 年诞生于贝尔实验室，历经 K&R C、C89、C99、C11 到最新的 C18 标准。
        每个版本的标准化都提升了 C 的可移植性和表达能力。
      </figcaption>
    </figure>
  );
}
