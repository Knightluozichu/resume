/**
 * <PreprocessorPipelineDiagram step={0|1|2|3|4}>：预处理→编译→汇编→链接四阶段。
 *
 * step 1: 预处理（宏展开、#include、条件编译）
 * step 2: 编译（C → 汇编）
 * step 3: 汇编（汇编 → 目标码 .o）
 * step 4: 链接（合并 .o → 可执行文件）
 */

type PipelineStep = 0 | 1 | 2 | 3 | 4;

interface Props {
  step?: PipelineStep;
}

export function PreprocessorPipelineDiagram({ step = 0 }: Props) {
  const stages = [
    {
      label: "预处理",
      sub: "宏·include·条件",
      detail: "#define 展开\n#include 粘贴\n#ifdef 裁剪",
      x: 120,
      w: 130,
    },
    {
      label: "编译",
      sub: "C → 汇编",
      detail: "语法检查\n语义分析\n生成 .s",
      x: 270,
      w: 130,
    },
    {
      label: "汇编",
      sub: "汇编 → 机器码",
      detail: "助记符→二进制\n生成 .o\n目标文件",
      x: 420,
      w: 130,
    },
    {
      label: "链接",
      sub: "合并·解析符号",
      detail: "多 .o + 库\n符号解析\n→ 可执行",
      x: 570,
      w: 130,
    },
  ];

  const isActive = (idx: number) => step === 0 || step === idx + 1;
  const boxStroke = (idx: number) => (isActive(idx) ? "var(--accent)" : "var(--border)");
  const boxBg = (idx: number) => (isActive(idx) ? "var(--bg-elevated)" : "var(--bg)");
  const textFill = (idx: number) =>
    isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)";
  const arrowStroke = (idx: number) => (isActive(idx) ? "var(--accent)" : "var(--border)");

  const captions: Record<PipelineStep, string> = {
    0: "按下方 Stepper 逐步看预处理器在编译流水线中的位置",
    1: "预处理器在编译前运行：展开宏、粘贴头文件、按条件保留/丢弃代码块，产出 .i",
    2: "编译器把预处理后的 C 代码翻译成汇编 .s，并做语法与类型检查",
    3: "汇编器把 .s 转成二进制目标文件 .o（机器码零件）",
    4: "链接器合并多个 .o 与库，解析 printf 等符号，生成最终可执行文件",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 740 220"
          role="img"
          aria-label="C 编译流水线：预处理、编译、汇编、链接四阶段"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <rect
            x="14"
            y="64"
            width="72"
            height="52"
            rx="6"
            fill="var(--bg)"
            stroke={step === 1 ? "var(--accent)" : "var(--border)"}
            strokeWidth="2"
          />
          <text
            x="50"
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
            x="50"
            y="104"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            源码
          </text>
          {/* 源码 → 预处理 箭头 */}
          <line x1="86" y1="92" x2="116" y2="92" stroke={arrowStroke(0)} strokeWidth="2" />
          <path d="M116 92 l-8 -4 l0 8 z" fill={arrowStroke(0)} />

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
              <text
                x={s.x + s.w / 2}
                y="98"
                textAnchor="middle"
                fontSize="11"
                fill={textFill(i)}
              >
                {s.sub}
              </text>
              <text
                x={s.x + s.w / 2}
                y="118"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.detail.split("\n")[0]}
              </text>
              <text
                x={s.x + s.w / 2}
                y="132"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.detail.split("\n")[1]}
              </text>
            </g>
          ))}

          <line x1="250" y1="92" x2="266" y2="92" stroke={arrowStroke(0)} strokeWidth="2" />
          <path d="M266 92 l-8 -4 l0 8 z" fill={arrowStroke(0)} />
          <line x1="400" y1="92" x2="416" y2="92" stroke={arrowStroke(1)} strokeWidth="2" />
          <path d="M416 92 l-8 -4 l0 8 z" fill={arrowStroke(1)} />
          <line x1="550" y1="92" x2="566" y2="92" stroke={arrowStroke(2)} strokeWidth="2" />
          <path d="M566 92 l-8 -4 l0 8 z" fill={arrowStroke(2)} />
          <line x1="700" y1="92" x2="716" y2="92" stroke={arrowStroke(3)} strokeWidth="2" />
          <path d="M716 92 l-6 -3 l0 6 z" fill={arrowStroke(3)} />

          <text
            x="370"
            y="175"
            textAnchor="middle"
            fontSize="12"
            fill={step === 0 ? "var(--text-secondary)" : "var(--text-primary)"}
          >
            {captions[step]}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        预处理器是编译流水线的第一道工位：在真正编译 C 语法之前，先把源码「改写成」编译器能直接处理的形态。
      </figcaption>
    </figure>
  );
}
