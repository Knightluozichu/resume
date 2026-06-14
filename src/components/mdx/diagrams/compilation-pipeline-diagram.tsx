/**
 * <CompilationPipelineDiagram step={0|1|2|3|4}>：展示 C++ 编译流水线四阶段。
 *
 * 流程：源码(.cpp) → ①预处理 → ②编译 → ③汇编 → ④链接 → 可执行文件
 * step prop 控制高亮阶段：0=无高亮(全灰/半透明)，1-4=对应阶段高亮 accent 色。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言：token 色（var(--accent) / --border / --bg / --bg-elevated /
 * --text-primary / --text-secondary），简洁线框 + 箭头，无阴影。
 */

type PipelineStep = 0 | 1 | 2 | 3 | 4;

interface Props {
  step?: PipelineStep;
}

export function CompilationPipelineDiagram({ step = 0 }: Props) {
  const stages = [
    { label: "预处理", sub: "宏展开·头文件", detail: "#include→展开\n#define→替换", x: 20, w: 130 },
    { label: "编译", sub: "C++→汇编", detail: "语法检查\n生成 .s", x: 170, w: 130 },
    { label: "汇编", sub: "汇编→机器码", detail: "生成 .o\n目标文件", x: 320, w: 130 },
    { label: "链接", sub: "合并·解析符号", detail: "多 .o + 库\n→ 可执行文件", x: 470, w: 130 },
  ];

  const isActive = (idx: number) => step === 0 || step === idx + 1;
  const boxStroke = (idx: number) =>
    isActive(idx) ? "var(--accent)" : "var(--border)";
  const boxBg = (idx: number) =>
    isActive(idx) ? "var(--bg-elevated)" : "var(--bg)";
  const textFill = (idx: number) =>
    isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)";
  const arrowStroke = (idx: number) =>
    isActive(idx) ? "var(--accent)" : "var(--border)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 220"
          role="img"
          aria-label="C++ 编译流水线四阶段：预处理→编译→汇编→链接→可执行文件"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* 左侧：源码入口 */}
          <rect
            x="14"
            y="64"
            width="80"
            height="52"
            rx="6"
            fill="var(--bg)"
            stroke={isActive(1) ? "var(--accent)" : "var(--border)"}
            strokeWidth="2"
          />
          <text
            x="54"
            y="86"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
            fontFamily="monospace"
          >
            .cpp
          </text>
          <text
            x="54"
            y="104"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            源码
          </text>

          {/* 四个阶段 */}
          {stages.map((s, i) => (
            <g key={s.label}>
              {/* 盒子 */}
              <rect
                x={s.x}
                y="48"
                width={s.w}
                height="84"
                rx="8"
                fill={boxBg(i)}
                stroke={boxStroke(i)}
                strokeWidth={isActive(i) ? 2.5 : 1.5}
              />
              {/* 阶段编号 */}
              <circle
                cx={s.x + 14}
                cy="66"
                r="10"
                fill={isActive(i) ? "var(--accent)" : "var(--border)"}
              />
              <text
                x={s.x + 14}
                y="70"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--bg)"
              >
                {i + 1}
              </text>
              {/* 主标签 */}
              <text
                x={s.x + s.w / 2}
                y="70"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={textFill(i)}
              >
                {s.label}
              </text>
              {/* 副标签 */}
              <text
                x={s.x + s.w / 2}
                y="90"
                textAnchor="middle"
                fontSize="12"
                fill={textFill(i)}
              >
                {s.sub}
              </text>
              {/* 详情 */}
              <text
                x={s.x + s.w / 2}
                y="114"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {s.detail.split("\n")[0]}
              </text>
              <text
                x={s.x + s.w / 2}
                y="128"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {s.detail.split("\n")[1]}
              </text>
            </g>
          ))}

          {/* 箭头 ①→② */}
          <line
            x1="150"
            y1="90"
            x2="166"
            y2="90"
            stroke={arrowStroke(0)}
            strokeWidth="2"
          />
          <path d="M166 90 l-8 -4 l0 8 z" fill={arrowStroke(0)} />

          {/* 箭头 ②→③ */}
          <line
            x1="300"
            y1="90"
            x2="316"
            y2="90"
            stroke={arrowStroke(1)}
            strokeWidth="2"
          />
          <path d="M316 90 l-8 -4 l0 8 z" fill={arrowStroke(1)} />

          {/* 箭头 ③→④ */}
          <line
            x1="450"
            y1="90"
            x2="466"
            y2="90"
            stroke={arrowStroke(2)}
            strokeWidth="2"
          />
          <path d="M466 90 l-8 -4 l0 8 z" fill={arrowStroke(2)} />

          {/* ④→可执行文件 */}
          <line
            x1="600"
            y1="90"
            x2="610"
            y2="90"
            stroke={arrowStroke(3)}
            strokeWidth="2"
          />
          <path d="M610 90 l-6 -3 l0 6 z" fill={arrowStroke(3)} />

          {/* 顶部阶段产出标注 */}
          <text
            x="84"
            y="38"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            .cpp
          </text>
          <text
            x="235"
            y="38"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            .i
          </text>
          <text
            x="385"
            y="38"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            .s
          </text>
          <text
            x="535"
            y="38"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            .o
          </text>
          <text
            x="610"
            y="38"
            fontSize="10"
            fill="var(--accent)"
            fontFamily="monospace"
            fontWeight="600"
          >
            exe
          </text>

          {/* 底部说明 */}
          {step === 0 && (
            <text
              x="320"
              y="175"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
            >
              按下方 Stepper 逐阶段看每一步发生了什么
            </text>
          )}
          {step === 1 && (
            <text
              x="320"
              y="175"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              把头文件内容「粘贴」进来，把宏展开成代码，生成纯净的 .i 文件
            </text>
          )}
          {step === 2 && (
            <text
              x="320"
              y="175"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              把 C++ 语法树翻译成汇编语言 .s 文件，做语义和语法检查
            </text>
          )}
          {step === 3 && (
            <text
              x="320"
              y="175"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              把汇编助记符一一对应翻译成二进制机器码，生成 .o 目标文件
            </text>
          )}
          {step === 4 && (
            <text
              x="320"
              y="175"
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              把多个 .o 和函数库合并，解析所有符号引用，生成最终可执行文件
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C++ 编译流水线：源码 .cpp 经过预处理、编译、汇编、链接四道工位，最终产出可执行文件。
        本章 Stepper 分步讲解每道工位具体做了什么。
      </figcaption>
    </figure>
  );
}
