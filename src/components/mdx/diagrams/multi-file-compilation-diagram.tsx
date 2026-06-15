/**
 * <MultiFileCompilationDiagram step={0|1|2|3}>：多文件编译链接流程图。
 *
 * step=0：全景缩略（所有阶段半透明，底部提示"按 Stepper 分步看"）
 * step=1：编译 main.c → main.o（高亮左侧）
 * step=2：编译 helper.c → helper.o（高亮右侧）
 * step=3：链接 main.o + helper.o → app（高亮底部，最终可执行文件）
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary /
 * --text-secondary），无阴影。
 */

type Step = 0 | 1 | 2 | 3;

interface Props {
  step?: Step;
}

export function MultiFileCompilationDiagram({ step = 0 }: Props) {
  const accent = "var(--accent)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const bgEl = "var(--bg-elevated)";
  const textPri = "var(--text-primary)";
  const textSec = "var(--text-secondary)";

  const activeColor = (s: Step) => accent;
  const dimColor = (s: Step) => border;
  const strokeColor = (s: Step) => (step === s || step === 0 ? activeColor(s) : dimColor(s));
  const textColor = (s: Step) => (step === s || step === 0 ? textPri : textSec);
  const boxOpacity = (s: Step) => (step === s || step === 0 ? 1 : 0.5);

  const isActive = (s: Step) => step === s || step === 0;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 560 340"
          role="img"
          aria-label="多文件编译流程图：main.c→main.o + helper.c→helper.o → 链接器 → 可执行文件 app"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* ===== 左侧：main.c → main.o ===== */}
          {/* main.c 源文件 */}
          <rect
            x="40" y="32" width="200" height="44" rx="6"
            fill={isActive(1) ? bgEl : bg}
            stroke={strokeColor(1)} strokeWidth={isActive(1) ? 2.5 : 1.5}
            opacity={boxOpacity(1)}
          >
          </rect>
          <text
            x="140" y="52" textAnchor="middle"
            fontSize="14" fontWeight="700" fill={textColor(1)}
            fontFamily="monospace"
          >
            main.c
          </text>
          <text
            x="140" y="68" textAnchor="middle"
            fontSize="11" fill={textColor(1)}
          >
            主程序源码
          </text>

          {/* 阶段标注 ① */}
          <circle cx="28" cy="54" r="10" fill={isActive(1) ? accent : border} opacity={boxOpacity(1)} />
          <text x="28" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg)">1</text>

          {/* 向下箭头：编译 */}
          <line x1="140" y1="76" x2="140" y2="96" stroke={strokeColor(1)} strokeWidth="2" opacity={boxOpacity(1)} />
          <path d="M140 96 l-6 -4 l0 8 z" fill={strokeColor(1)} opacity={boxOpacity(1)} />
          <text
            x="160" y="90" fontSize="10" fill={textColor(1)} opacity={boxOpacity(1)}
          >
            gcc -c
          </text>

          {/* main.o 目标文件 */}
          <rect
            x="40" y="100" width="200" height="40" rx="6"
            fill={isActive(1) ? bgEl : bg}
            stroke={strokeColor(1)} strokeWidth={isActive(1) ? 2.5 : 1.5}
            opacity={boxOpacity(1)}
          >
          </rect>
          <text
            x="140" y="118" textAnchor="middle"
            fontSize="14" fontWeight="700" fill={textColor(1)}
            fontFamily="monospace"
          >
            main.o
          </text>
          <text
            x="140" y="134" textAnchor="middle"
            fontSize="11" fill={textColor(1)}
          >
            目标文件（零件）
          </text>

          {/* ===== 右侧：helper.c → helper.o ===== */}
          {/* helper.c 源文件 */}
          <rect
            x="320" y="32" width="200" height="44" rx="6"
            fill={isActive(2) ? bgEl : bg}
            stroke={strokeColor(2)} strokeWidth={isActive(2) ? 2.5 : 1.5}
            opacity={boxOpacity(2)}
          />
          <text
            x="420" y="52" textAnchor="middle"
            fontSize="14" fontWeight="700" fill={textColor(2)}
            fontFamily="monospace"
          >
            helper.c
          </text>
          <text
            x="420" y="68" textAnchor="middle"
            fontSize="11" fill={textColor(2)}
          >
            辅助函数源码
          </text>

          {/* 阶段标注 ② */}
          <circle cx="312" cy="54" r="10" fill={isActive(2) ? accent : border} opacity={boxOpacity(2)} />
          <text x="312" y="58" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg)">2</text>

          {/* 向下箭头 */}
          <line x1="420" y1="76" x2="420" y2="96" stroke={strokeColor(2)} strokeWidth="2" opacity={boxOpacity(2)} />
          <path d="M420 96 l-6 -4 l0 8 z" fill={strokeColor(2)} opacity={boxOpacity(2)} />
          <text
            x="440" y="90" fontSize="10" fill={textColor(2)} opacity={boxOpacity(2)}
          >
            gcc -c
          </text>

          {/* helper.o 目标文件 */}
          <rect
            x="320" y="100" width="200" height="40" rx="6"
            fill={isActive(2) ? bgEl : bg}
            stroke={strokeColor(2)} strokeWidth={isActive(2) ? 2.5 : 1.5}
            opacity={boxOpacity(2)}
          />
          <text
            x="420" y="118" textAnchor="middle"
            fontSize="14" fontWeight="700" fill={textColor(2)}
            fontFamily="monospace"
          >
            helper.o
          </text>
          <text
            x="420" y="134" textAnchor="middle"
            fontSize="11" fill={textColor(2)}
          >
            目标文件（零件）
          </text>

          {/* ===== 汇聚箭头 → 链接器 ===== */}
          <line x1="140" y1="140" x2="140" y2="170" stroke={strokeColor(3)} strokeWidth="2" opacity={boxOpacity(3)} />
          <line x1="420" y1="140" x2="420" y2="170" stroke={strokeColor(3)} strokeWidth="2" opacity={boxOpacity(3)} />
          <line x1="140" y1="170" x2="420" y2="170" stroke={strokeColor(3)} strokeWidth="2" opacity={boxOpacity(3)} />
          <line x1="280" y1="170" x2="280" y2="196" stroke={strokeColor(3)} strokeWidth="2" opacity={boxOpacity(3)} />
          <path d="M280 196 l-6 -4 l0 8 z" fill={strokeColor(3)} opacity={boxOpacity(3)} />

          {/* 阶段标注 ③ */}
          <circle cx="268" cy="78" r="12" fill={isActive(3) ? accent : border} opacity={boxOpacity(3)} />
          <text x="268" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg)">3</text>

          {/* 链接器 */}
          <rect
            x="180" y="200" width="200" height="48" rx="8"
            fill={isActive(3) ? bgEl : bg}
            stroke={strokeColor(3)} strokeWidth={isActive(3) ? 2.5 : 1.5}
            opacity={boxOpacity(3)}
          />
          <text
            x="280" y="222" textAnchor="middle"
            fontSize="15" fontWeight="700" fill={textColor(3)}
          >
            链接器 (linker)
          </text>
          <text
            x="280" y="240" textAnchor="middle"
            fontSize="11" fill={textColor(3)}
          >
            拼零件，解符号，生成可执行文件
          </text>

          {/* 向下箭头 → 可执行文件 */}
          <line x1="280" y1="248" x2="280" y2="268" stroke={strokeColor(3)} strokeWidth="2" opacity={boxOpacity(3)} />
          <path d="M280 268 l-6 -4 l0 8 z" fill={strokeColor(3)} opacity={boxOpacity(3)} />

          {/* 可执行文件 */}
          <rect
            x="180" y="272" width="200" height="48" rx="8"
            fill={isActive(3) ? accent : "var(--bg)"}
            stroke={accent} strokeWidth="2.5"
            opacity={boxOpacity(3)}
          />
          <text
            x="280" y="294" textAnchor="middle"
            fontSize="16" fontWeight="700" fill={isActive(3) ? "var(--bg)" : accent}
            fontFamily="monospace"
          >
            app
          </text>
          <text
            x="280" y="312" textAnchor="middle"
            fontSize="11" fill={isActive(3) ? "var(--bg)" : accent}
          >
            可执行文件 ✓
          </text>

          {/* 底部说明 */}
          {step === 0 && (
            <text x="280" y={328} textAnchor="middle" fontSize="12" fill={textSec}>
              按下方 Stepper 分步看：先各编译各的 .c → .o，再链接拼成可执行文件
            </text>
          )}
          {step === 1 && (
            <text x="280" y={328} textAnchor="middle" fontSize="12" fill={textPri}>
              ① 编译 main.c：gcc -c main.c -o main.o，产出函数的机器码，但函数调用还是"空的"
            </text>
          )}
          {step === 2 && (
            <text x="280" y={328} textAnchor="middle" fontSize="12" fill={textPri}>
              ② 编译 helper.c：gcc -c helper.c -o helper.o，同样产出一个独立的 .o 零件
            </text>
          )}
          {step === 3 && (
            <text x="280" y={328} textAnchor="middle" fontSize="12" fill={textPri}>
              ③ 链接：gcc main.o helper.o -o app，拼接两个 .o，把函数调用对接到正确的地址
            </text>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 0 && "多文件编译流程：每个 .c 各自编译成 .o 目标文件，再由链接器拼接成最终可执行文件。"}
        {step === 1 && "第①步：把 main.c 单独编译成 main.o。此时 main 里对 helper 函数的调用还是「未解决」的符号，链接时才填地址。"}
        {step === 2 && "第②步：把 helper.c 单独编译成 helper.o。它和 main.o 是平等的——都是零件，谁都没比谁高级。"}
        {step === 3 && "第③步：链接器把两个 .o 拼在一起，对号入座：main 调用的函数在 helper.o 里找到对应地址，填上跳转指令。"}
      </figcaption>
    </figure>
  );
}
