/**
 * <FunctionCallStackDiagram>：函数调用栈 frame 压入/弹出示意图。
 *
 * 展示调用方调用函数时，从传参 → 新栈帧分配 → 函数体内执行 → 返回值 → 栈帧销毁的全过程。
 * 支持 step prop（0-4），用于 Stepper 分步讲解。
 *
 * 设计要点（HEL-241 修复）：
 *  - 5 个阶段的标签（①…⑤）始终渲染，只改色高亮当前步；不同步之间的栈帧 rect 只渲染当前步那一份。
 *    旧实现把 5 套 rect 全堆在栈区同一 x 上，靠 opacity 切换显隐——但 svg-check 测的是 DOM bbox，
 *    opacity:0 仍计入，导致 153×59 等同尺寸 rect 互相重叠 78~94% 触发 19 处 HIGH。
 *  - 缺省 step=2「执行中」——这一帧 add() 与 main() 同时在栈上，最具教学性，适合作为单图概览。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

interface FunctionCallStackDiagramProps {
  step?: 0 | 1 | 2 | 3 | 4;
}

export function FunctionCallStackDiagram({
  step = 2,
}: FunctionCallStackDiagramProps) {
  const marginL = 16;

  // 栈区域
  const stackX = 440;
  const stackW = 190;
  const stackTop = 40;
  const stackBot = 400;

  // 阶段标签位置（左侧一列）
  const labelX = marginL + 10;
  const labelY = [72, 156, 240, 326, 404];
  const stageTexts = [
    { num: "①", title: "调用前", l1: "main() 正在执行，栈上", l2: "只有调用方的局部变量" },
    { num: "②", title: "传参", l1: "实参压栈，保存返回地址", l2: "（或通过寄存器传递）" },
    { num: "③", title: "执行中", l1: "CPU 跳到 add() 第一行", l2: "main() 暂停，等 add() 返回" },
    { num: "④", title: "返回值", l1: "return 执行——返回值", l2: "写入寄存器，即将返回 main" },
    { num: "⑤", title: "栈帧销毁", l1: "add() 的栈帧被回收——", l2: "内存还给操作系统，main 继续" },
  ];

  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 750 480"
          role="img"
          aria-label="函数调用栈示意图：展示调用方从调用到传参、函数执行、返回值、栈帧销毁的全过程"
          className="mx-auto block h-auto w-full max-w-[750px]"
        >
          {/* ── 栈外框 ── */}
          <rect
            x={stackX}
            y={stackTop}
            width={stackW}
            height={stackBot - stackTop}
            rx="6"
            fill={bg}
            stroke={border}
            strokeWidth="1.5"
          />
          {/* 栈顶标签 */}
          <text
            x={stackX + stackW / 2}
            y={stackTop - 10}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            调用栈（高地址 → 低地址）
          </text>

          {/* 栈底标注 */}
          <text x={stackX - 10} y={stackBot - 10} textAnchor="end" fontSize="10" fill={secondary}>
            栈底
          </text>
          <text x={stackX - 10} y={stackTop + 16} textAnchor="end" fontSize="10" fill={secondary}>
            栈顶 ↑
          </text>

          {/* ── 5 阶段标签：始终渲染，只改色 ── */}
          {stageTexts.map((s, i) => {
            const isActive = step === i;
            return (
              <g key={s.title}>
                <text
                  x={labelX}
                  y={labelY[i]}
                  fontSize="16"
                  fontWeight="700"
                  fill={isActive ? accent : border}
                >
                  {s.num} {s.title}
                </text>
                <text
                  x={labelX}
                  y={labelY[i] + 22}
                  fontSize="12"
                  fill={isActive ? primary : secondary}
                >
                  {s.l1}
                </text>
                <text
                  x={labelX}
                  y={labelY[i] + 40}
                  fontSize="12"
                  fill={isActive ? primary : secondary}
                >
                  {s.l2}
                </text>
              </g>
            );
          })}

          {/* ═══════ Step 0: 调用前 ═══════ */}
          {step === 0 && (
            <g>
              {/* 调用方栈帧 */}
              <rect
                x={stackX + 12}
                y={290}
                width={stackW - 24}
                height={68}
                rx="4"
                fill={bg}
                stroke={border}
                strokeWidth="1.5"
              />
              <text
                x={stackX + stackW / 2}
                y={316}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={primary}
                fontFamily="monospace"
              >
                main() 栈帧
              </text>
              <text
                x={stackX + stackW / 2}
                y={340}
                textAnchor="middle"
                fontSize="10"
                fill={secondary}
              >
                (局部变量 a,b,c)
              </text>
            </g>
          )}

          {/* ═══════ Step 1: 传参 ═══════ */}
          {step === 1 && (
            <g>
              {/* 实参压栈 */}
              <rect
                x={stackX + 12}
                y={216}
                width={stackW - 24}
                height={48}
                rx="4"
                fill={accent}
                opacity={0.12}
                stroke={accent}
                strokeWidth="1.5"
              />
              <text
                x={stackX + stackW / 2}
                y={236}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={accent}
                fontFamily="monospace"
              >
                实参: 5, 3
              </text>
              <text
                x={stackX + stackW / 2}
                y={254}
                textAnchor="middle"
                fontSize="10"
                fill={accent}
              >
                压入参数
              </text>

              {/* main 帧缩小 */}
              <rect
                x={stackX + 12}
                y={280}
                width={stackW - 24}
                height={64}
                rx="4"
                fill={bg}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={stackX + stackW / 2}
                y={316}
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
                fontFamily="monospace"
              >
                main() 栈帧
              </text>

              {/* 调用箭头 */}
              <text x={135} y={200} fontSize="22" fill={accent} fontWeight="700">
                add(5, 3)
              </text>
            </g>
          )}

          {/* ═══════ Step 2: 执行中 ═══════ */}
          {step === 2 && (
            <g>
              {/* 被调函数栈帧 */}
              <rect
                x={stackX + 12}
                y={100}
                width={stackW - 24}
                height={100}
                rx="4"
                fill={accent}
                opacity={0.15}
                stroke={accent}
                strokeWidth="2"
              />
              <text
                x={stackX + stackW / 2}
                y={122}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={accent}
                fontFamily="monospace"
              >
                add() 栈帧
              </text>
              <text
                x={stackX + stackW / 2}
                y={144}
                textAnchor="middle"
                fontSize="10"
                fill={primary}
                fontFamily="monospace"
              >
                形参 x=5, y=3
              </text>
              <text
                x={stackX + stackW / 2}
                y={164}
                textAnchor="middle"
                fontSize="10"
                fill={primary}
                fontFamily="monospace"
              >
                返回地址、局部变量 z
              </text>
              <text
                x={stackX + stackW / 2}
                y={190}
                textAnchor="middle"
                fontSize="10"
                fill={accent}
              >
                int z = x + y;
              </text>

              {/* 参数区 */}
              <rect
                x={stackX + 12}
                y={214}
                width={stackW - 24}
                height={36}
                rx="4"
                fill={bg}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={stackX + stackW / 2}
                y={237}
                textAnchor="middle"
                fontSize="10"
                fill={secondary}
                fontFamily="monospace"
              >
                实参: 5, 3（副本）
              </text>

              {/* main */}
              <rect
                x={stackX + 12}
                y={266}
                width={stackW - 24}
                height={64}
                rx="4"
                fill={bg}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={stackX + stackW / 2}
                y={302}
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
                fontFamily="monospace"
              >
                main() 暂停
              </text>
            </g>
          )}

          {/* ═══════ Step 3: 返回值 ═══════ */}
          {step === 3 && (
            <g>
              <rect
                x={stackX + 12}
                y={100}
                width={stackW - 24}
                height={100}
                rx="4"
                fill={accent}
                opacity={0.08}
                stroke={accent}
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
              <text
                x={stackX + stackW / 2}
                y={126}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={accent}
                fontFamily="monospace"
              >
                add() 即将返回
              </text>
              <text
                x={stackX + stackW / 2}
                y={156}
                textAnchor="middle"
                fontSize="10"
                fill={accent}
                fontFamily="monospace"
              >
                return z; // z = 8
              </text>
              <text
                x={stackX + stackW / 2}
                y={186}
                textAnchor="middle"
                fontSize="10"
                fill={secondary}
              >
                返回值 8 → 寄存器/eax
              </text>

              <rect
                x={stackX + 12}
                y={266}
                width={stackW - 24}
                height={64}
                rx="4"
                fill={bg}
                stroke={border}
                strokeWidth="1"
              />
              <text
                x={stackX + stackW / 2}
                y={302}
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
                fontFamily="monospace"
              >
                main() 栈帧
              </text>
            </g>
          )}

          {/* ═══════ Step 4: 栈帧销毁 ═══════ */}
          {step === 4 && (
            <g>
              {/* add 帧消失 */}
              <rect
                x={stackX + 12}
                y={100}
                width={stackW - 24}
                height={100}
                rx="4"
                fill="none"
                stroke={secondary}
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity={0.5}
              />
              <text
                x={stackX + stackW / 2}
                y={155}
                textAnchor="middle"
                fontSize="10"
                fill={secondary}
              >
                (add() 栈帧已释放)
              </text>

              {/* main 恢复 */}
              <rect
                x={stackX + 12}
                y={280}
                width={stackW - 24}
                height={64}
                rx="4"
                fill={bg}
                stroke={accent}
                strokeWidth="2"
              />
              <text
                x={stackX + stackW / 2}
                y={306}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={accent}
                fontFamily="monospace"
              >
                main() 恢复运行
              </text>
              <text
                x={stackX + stackW / 2}
                y={328}
                textAnchor="middle"
                fontSize="10"
                fill={primary}
                fontFamily="monospace"
              >
                int result = 8;
              </text>

              {/* 从 add 出来的箭头 */}
              <text x={140} y={155} fontSize="13" fontWeight="700" fill={accent}>
                返回 main
              </text>
            </g>
          )}

          {/* ── 图例 ── */}
          <text x={marginL + 10} y={450} fontSize="11" fill={secondary} fontFamily="monospace">
            ⬜ 栈帧 = 内存中一块区域（存形参、局部变量、返回地址）
          </text>
          <text
            x={marginL + 10}
            y={450}
            fontSize="11"
            fill={secondary}
            fontFamily="monospace"
            dx="380"
          >
            紫色 = 当前活跃帧
          </text>

          <defs>
            <marker id="arrowHeadAccent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        每次函数调用都在栈上分配一块新区域（栈帧），存放形参、局部变量和返回地址。函数返回后它的整个栈帧被销毁——局部变量也随之消失。
      </figcaption>
    </figure>
  );
}
