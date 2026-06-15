/**
 * <FunctionCallStackDiagram>：函数调用栈 frame 压入/弹出示意图。
 *
 * 展示调用方调用函数时，从传参 → 新栈帧分配 → 函数体内执行 → 返回值 → 栈帧销毁的全过程。
 * 支持 step prop（1-4），用于 Stepper 分步讲解：每一步高亮当前阶段、灰化其他。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

interface FunctionCallStackDiagramProps {
  step?: number; // 0=调用前, 1=传参, 2=执行中, 3=返回值, 4=栈帧销毁（也接受 1-4 仅展示对应阶段）
}

export function FunctionCallStackDiagram({
  step = -1,
}: FunctionCallStackDiagramProps) {
  const showAll = step < 0 || step > 4;
  const active = (s: number) => showAll || step === s;

  const cx = 340;
  const marginL = 16;

  // 栈区域
  const stackX = 420;
  const stackW = 160;
  const stackTop = 40;
  const stackBot = 360;

  // 各阶段标签
  const labelX = marginL + 10;
  const labelY = [72, 146, 220, 296, 360];

  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 420"
          role="img"
          aria-label="函数调用栈示意图：展示调用方从调用到传参、函数执行、返回值、栈帧销毁的全过程"
          className="mx-auto block h-auto w-full max-w-[640px]"
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

          {/* ═══════ Step 0: 调用前 ═══════ */}
          <g opacity={active(0) ? 1 : 0}>
            {/* 调用方栈帧 */}
            <rect
              x={stackX + 12}
              y={260}
              width={stackW - 24}
              height={56}
              rx="4"
              fill={bg}
              stroke={border}
              strokeWidth="1.5"
            />
            <text
              x={stackX + stackW / 2}
              y={282}
              textAnchor="middle"
              fontSize="11"
              fontWeight={active(0) ? 700 : 500}
              fill={active(0) ? primary : secondary}
              fontFamily="monospace"
            >
              main() 栈帧
            </text>
            <text
              x={stackX + stackW / 2}
              y={302}
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              (局部变量 a,b,c)
            </text>

            <text x={labelX} y={labelY[0]} fontSize="16" fontWeight="700" fill={active(0) ? accent : border}>
              ① 调用前
            </text>
            <text x={labelX} y={labelY[0] + 22} fontSize="12" fill={active(0) ? primary : secondary}>
              main() 正在执行，栈上
            </text>
            <text x={labelX} y={labelY[0] + 40} fontSize="12" fill={active(0) ? primary : secondary}>
              只有调用方的局部变量
            </text>
          </g>

          {/* ═══════ Step 1: 传参 ═══════ */}
          <g opacity={active(1) ? 1 : 0}>
            {/* 实参压栈 */}
            <rect
              x={stackX + 12}
              y={190}
              width={stackW - 24}
              height={40}
              rx="4"
              fill={accent}
              opacity={0.12}
              stroke={accent}
              strokeWidth="1.5"
            />
            <text
              x={stackX + stackW / 2}
              y={205}
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
              y={222}
              textAnchor="middle"
              fontSize="10"
              fill={accent}
            >
              压入参数
            </text>

            {/* main 帧缩小 */}
            <rect
              x={stackX + 12}
              y={248}
              width={stackW - 24}
              height={56}
              rx="4"
              fill={bg}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={stackX + stackW / 2}
              y={270}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              main() 栈帧
            </text>

            <text x={labelX} y={labelY[1]} fontSize="16" fontWeight="700" fill={active(1) ? accent : border}>
              ② 传参
            </text>
            <text x={labelX} y={labelY[1] + 22} fontSize="12" fill={active(1) ? primary : secondary}>
              实参压栈，保存返回地址
            </text>
            <text x={labelX} y={labelY[1] + 40} fontSize="12" fill={active(1) ? primary : secondary}>
              （或通过寄存器传递）
            </text>

            {/* 调用箭头 */}
            <text x={135} y={180} fontSize="22" fill={accent} fontWeight="700">
              add(5, 3)
            </text>
          </g>

          {/* ═══════ Step 2: 执行中 ═══════ */}
          <g opacity={active(2) ? 1 : 0}>
            {/* 被调函数栈帧 */}
            <rect
              x={stackX + 12}
              y={100}
              width={stackW - 24}
              height={78}
              rx="4"
              fill={accent}
              opacity={0.15}
              stroke={accent}
              strokeWidth="2"
            />
            <text
              x={stackX + stackW / 2}
              y={120}
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
              y={140}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              形参 x=5, y=3
            </text>
            <text
              x={stackX + stackW / 2}
              y={156}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              返回地址、局部变量 z
            </text>
            <text
              x={stackX + stackW / 2}
              y={172}
              textAnchor="middle"
              fontSize="10"
              fill={accent}
            >
              int z = x + y;
            </text>

            {/* 参数区 */}
            <rect
              x={stackX + 12}
              y={190}
              width={stackW - 24}
              height={32}
              rx="4"
              fill={bg}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={stackX + stackW / 2}
              y={211}
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
              fontFamily="monospace"
            >
              实参: 5, 3（实参副本）
            </text>

            {/* main */}
            <rect
              x={stackX + 12}
              y={240}
              width={stackW - 24}
              height={56}
              rx="4"
              fill={bg}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={stackX + stackW / 2}
              y={262}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              main() 栈帧（暂停）
            </text>

            <text x={labelX} y={labelY[2]} fontSize="16" fontWeight="700" fill={active(2) ? accent : border}>
              ③ 执行中
            </text>
            <text x={labelX} y={labelY[2] + 22} fontSize="12" fill={active(2) ? primary : secondary}>
              CPU 跳到 add() 第一行
            </text>
            <text x={labelX} y={labelY[2] + 40} fontSize="12" fill={active(2) ? primary : secondary}>
              main() 暂停，等 add() 返回
            </text>
          </g>

          {/* ═══════ Step 3: 返回值 ═══════ */}
          <g opacity={active(3) ? 1 : 0}>
            <rect
              x={stackX + 12}
              y={100}
              width={stackW - 24}
              height={78}
              rx="4"
              fill={accent}
              opacity={0.08}
              stroke={accent}
              strokeWidth="1.5"
              strokeDasharray="5 3"
            />
            <text
              x={stackX + stackW / 2}
              y={125}
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
              y={148}
              textAnchor="middle"
              fontSize="10"
              fill={accent}
              fontFamily="monospace"
            >
              return z; // z = 8
            </text>
            <text
              x={stackX + stackW / 2}
              y={168}
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              返回值 8 → 寄存器/eax
            </text>

            <rect
              x={stackX + 12}
              y={240}
              width={stackW - 24}
              height={56}
              rx="4"
              fill={bg}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={stackX + stackW / 2}
              y={262}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontFamily="monospace"
            >
              main() 栈帧
            </text>

            <text x={labelX} y={labelY[3]} fontSize="16" fontWeight="700" fill={active(3) ? accent : border}>
              ④ 返回值
            </text>
            <text x={labelX} y={labelY[3] + 22} fontSize="12" fill={active(3) ? primary : secondary}>
              return 执行——返回值
            </text>
            <text x={labelX} y={labelY[3] + 40} fontSize="12" fill={active(3) ? primary : secondary}>
              写入寄存器，即将返回 main
            </text>
          </g>

          {/* ═══════ Step 4: 栈帧销毁 ═══════ */}
          <g opacity={active(4) ? 1 : 0}>
            {/* add 帧消失 */}
            <rect
              x={stackX + 12}
              y={100}
              width={stackW - 24}
              height={78}
              rx="4"
              fill="none"
              stroke={secondary}
              strokeWidth="1"
              strokeDasharray="3 4"
              opacity={0.5}
            />
            <text
              x={stackX + stackW / 2}
              y={140}
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              (add() 栈帧已释放)
            </text>

            {/* main 恢复 */}
            <rect
              x={stackX + 12}
              y={248}
              width={stackW - 24}
              height={56}
              rx="4"
              fill={bg}
              stroke={accent}
              strokeWidth="2"
            />
            <text
              x={stackX + stackW / 2}
              y={270}
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
              y={290}
              textAnchor="middle"
              fontSize="10"
              fill={primary}
              fontFamily="monospace"
            >
              int result = 8;
            </text>

            {/* 从 add 出来的箭头 */}
            <text x={140} y={145} fontSize="13" fontWeight="700" fill={accent}>
              返回 main
            </text>

            <text x={labelX} y={labelY[4]} fontSize="16" fontWeight="700" fill={active(4) ? accent : border}>
              ⑤ 栈帧销毁
            </text>
            <text x={labelX} y={labelY[4] + 22} fontSize="12" fill={active(4) ? primary : secondary}>
              add() 的栈帧被回收——
            </text>
            <text x={labelX} y={labelY[4] + 40} fontSize="12" fill={active(4) ? primary : secondary}>
              内存还给操作系统，main 继续
            </text>
          </g>

          {/* ── 图例 ── */}
          <text x={marginL + 10} y={410} fontSize="11" fill={secondary} fontFamily="monospace">
            ⬜ 栈帧 = 内存中一块区域（存形参、局部变量、返回地址）    紫色 = 当前活跃帧
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
