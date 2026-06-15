/**
 * <CCompilationDiagram step={0|1|2|3|4}>：C 语言编译流水线图。
 *
 * 流程：源码(.c) → ①预处理(.i) → ②编译(.s) → ③汇编(.o) → ④链接 → 可执行文件
 * step prop 控制高亮阶段：0=无高亮(全半透明)，1-4=对应阶段高亮 accent 色。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

type CompileStep = 0 | 1 | 2 | 3 | 4;

interface Props {
  step?: CompileStep;
}

export function CCompilationDiagram({ step = 0 }: Props) {
  const stages = [
    { label: "预处理", sub: ["#include 展开", "注释删除"], detail: "把头文件粘贴进来\n宏替换·去注释\n生成 .i 文件", x: 20, w: 130 },
    { label: "编译", sub: ["C→汇编", ""], detail: "语法检查\n语义分析\n生成 .s 文件", x: 170, w: 130 },
    { label: "汇编", sub: ["汇编→机器码", ""], detail: "汇编→二进制\n生成 .o 文件\n目标文件（零件）", x: 320, w: 130 },
    { label: "链接", sub: ["合并·解析符号", ""], detail: "多 .o + 库\n符号解析\n→ 可执行文件", x: 470, w: 130 },
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
          aria-label="C 编译流水线：源码 .c → 预处理 .i → 编译 .s → 汇编 .o → 链接 → 可执行文件"
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
            stroke={step === 1 ? "var(--accent)" : "var(--border)"}
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
            .c
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
              <rect
                x={s.x}
                y="48"
                width={s.w}
                height="88"
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
              {s.sub[0] && (
                <text
                  x={s.x + s.w / 2}
                  y="86"
                  textAnchor="middle"
                  fontSize="11"
                  fill={textFill(i)}
                >
                  {s.sub[0]}
                </text>
              )}
              {s.sub[1] && (
                <text
                  x={s.x + s.w / 2}
                  y="100"
                  textAnchor="middle"
                  fontSize="11"
                  fill={textFill(i)}
                >
                  {s.sub[1]}
                </text>
              )}
              {/* 详情第一行 */}
              <text
                x={s.x + s.w / 2}
                y="116"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.detail.split("\n")[0]}
              </text>
              <text
                x={s.x + s.w / 2}
                y="128"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.detail.split("\n")[1]}
              </text>
            </g>
          ))}

          {/* 箭头 ①→② */}
          <line
            x1="150"
            y1="92"
            x2="166"
            y2="92"
            stroke={arrowStroke(0)}
            strokeWidth="2"
          />
          <path d="M166 92 l-8 -4 l0 8 z" fill={arrowStroke(0)} />

          {/* 箭头 ②→③ */}
          <line
            x1="300"
            y1="92"
            x2="316"
            y2="92"
            stroke={arrowStroke(1)}
            strokeWidth="2"
          />
          <path d="M316 92 l-8 -4 l0 8 z" fill={arrowStroke(1)} />

          {/* 箭头 ③→④ */}
          <line
            x1="450"
            y1="92"
            x2="466"
            y2="92"
            stroke={arrowStroke(2)}
            strokeWidth="2"
          />
          <path d="M466 92 l-8 -4 l0 8 z" fill={arrowStroke(2)} />

          {/* ④→可执行文件 */}
          <line
            x1="600"
            y1="92"
            x2="612"
            y2="92"
            stroke={arrowStroke(3)}
            strokeWidth="2"
          />
          <path d="M612 92 l-6 -3 l0 6 z" fill={arrowStroke(3)} />

          {/* 顶部阶段产出标注 */}
          <text
            x="84"
            y="38"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            fontFamily="monospace"
          >
            .c
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
            x="618"
            y="38"
            fontSize="10"
            fill="var(--accent)"
            fontFamily="monospace"
            fontWeight="600"
          >
            程序
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
              把头文件「粘贴」进来，把宏展开，去掉注释，生成纯净的 .i 文件
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
              把 C 代码翻译成汇编语言 .s 文件，做语法和语义检查
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
        C 语言编译流水线：源码 .c 经过预处理、编译、汇编、链接四道工位，最终产出可执行文件。
        本章 Stepper 分步讲解每道工位具体做了什么。
      </figcaption>
    </figure>
  );
}
