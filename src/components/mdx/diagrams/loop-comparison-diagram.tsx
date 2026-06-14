/**
 * <LoopComparisonDiagram>：while / for / do-while 三种循环并排对比图。
 *
 * 三栏展示每种循环的结构模板、执行次数、适用场景。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function LoopComparisonDiagram() {
  const colW = 196;
  const gap = 16;
  const marginL = 28;
  const col1x = marginL;
  const col2x = marginL + colW + gap;
  const col3x = marginL + (colW + gap) * 2;

  const headerY = 48;
  const topY = 74;

  const boxW = 180;
  const innerW = boxW - 24;

  const rowH = 30;
  const codeLineH = 24;

  const cx = (x: number) => x + colW / 2;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 520"
          role="img"
          aria-label="while / for / do-while 三种循环结构、执行次数与适用场景并排对比"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ── 三栏标题 ── */}
          {/* while */}
          <text x={cx(col1x)} y={headerY} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            while 循环
          </text>
          {/* for */}
          <text x={cx(col2x)} y={headerY} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            for 循环
          </text>
          {/* do-while */}
          <text x={cx(col3x)} y={headerY} textAnchor="middle" fontSize="17" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            do-while 循环
          </text>

          {/* ── 结构模板区 ── */}
          {/* while 结构 */}
          <rect x={col1x + (colW - boxW) / 2} y={topY} width={boxW} height={160} rx="10" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={cx(col1x)} y={topY + 26} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            先判断，再执行
          </text>
          <line x1={col1x + 16} y1={topY + 36} x2={col1x + colW - 16} y2={topY + 36} stroke="var(--border)" strokeWidth="1" />

          {/* while 代码示意 */}
          <text x={col1x + 18} y={topY + 58} fontSize="12" fill="var(--text-primary)" fontFamily="monospace">
            while (条件)
          </text>
          <text x={col1x + 32} y={topY + 80} fontSize="12" fill="var(--text-secondary)" fontFamily="monospace">
            循环体
          </text>

          <text x={col1x + 18} y={topY + 108} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            条件不满足：
          </text>
          <text x={col1x + 18} y={topY + 126} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            一次都不执行
          </text>

          <text x={col1x + 18} y={topY + 150} fontSize="11" fill="var(--accent)" fontFamily="monospace">
            次数：0～N 次
          </text>

          {/* for 结构 */}
          <rect x={col2x + (colW - boxW) / 2} y={topY} width={boxW} height={160} rx="10" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x={cx(col2x)} y={topY + 26} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            初始化→判断→更新
          </text>
          <line x1={col2x + 16} y1={topY + 36} x2={col2x + colW - 16} y2={topY + 36} stroke="var(--border)" strokeWidth="1" />

          <text x={col2x + 18} y={topY + 58} fontSize="12" fill="var(--text-primary)" fontFamily="monospace">
            for (init; 条件;
          </text>
          <text x={col2x + 32} y={topY + 80} fontSize="12" fill="var(--text-primary)" fontFamily="monospace">
            update)
          </text>
          <text x={col2x + 32} y={topY + 102} fontSize="12" fill="var(--text-secondary)" fontFamily="monospace">
            循环体
          </text>

          <text x={col2x + 18} y={topY + 130} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            全部要素在一行
          </text>

          <text x={col2x + 18} y={topY + 150} fontSize="11" fill="var(--accent)" fontFamily="monospace">
            次数：0～N 次
          </text>

          {/* do-while 结构 */}
          <rect x={col3x + (colW - boxW) / 2} y={topY} width={boxW} height={160} rx="10" fill="var(--bg)" stroke="var(--text-primary)" strokeWidth="1.5" />
          <text x={cx(col3x)} y={topY + 26} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            先执行，再判断
          </text>
          <line x1={col3x + 16} y1={topY + 36} x2={col3x + colW - 16} y2={topY + 36} stroke="var(--border)" strokeWidth="1" />

          <text x={col3x + 18} y={topY + 58} fontSize="12" fill="var(--text-primary)" fontFamily="monospace">
            do
          </text>
          <text x={col3x + 32} y={topY + 80} fontSize="12" fill="var(--text-secondary)" fontFamily="monospace">
            循环体
          </text>
          <text x={col3x + 18} y={topY + 102} fontSize="12" fill="var(--text-primary)" fontFamily="monospace">
            while (条件);
          </text>

          <text x={col3x + 18} y={topY + 126} fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            就算条件不满足：
          </text>
          <text x={col3x + 18} y={topY + 144} fontSize="11" fill="var(--accent)" fontFamily="monospace">
            也至少执行一次
          </text>

          {/* ── 分隔线 ── */}
          <line x1={marginL} y1={topY + 180} x2={col3x + colW} y2={topY + 180} stroke="var(--border)" strokeWidth="1" strokeDasharray="6 4" />

          {/* ── 适用场景区 ── */}
          <text x={marginL} y={topY + 206} fontSize="13" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            适用场景
          </text>

          {/* while 场景 */}
          <rect x={col1x + (colW - boxW) / 2} y={topY + 220} width={boxW} height={130} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x={cx(col1x)} y={topY + 244} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            循环次数未知
          </text>
          <text x={col1x + 18} y={topY + 268} fontSize="11" fill="var(--text-secondary)">
            读取文件直到 EOF
          </text>
          <text x={col1x + 18} y={topY + 288} fontSize="11" fill="var(--text-secondary)">
            等待用户输入有效值
          </text>
          <text x={col1x + 18} y={topY + 308} fontSize="11" fill="var(--text-secondary)">
            不确定要跑几轮时
          </text>
          <text x={col1x + 18} y={topY + 330} fontSize="11" fill="var(--accent)" fontWeight="600" fontFamily="monospace">
            核心：靠条件, 不靠计数
          </text>

          {/* for 场景 */}
          <rect x={col2x + (colW - boxW) / 2} y={topY + 220} width={boxW} height={130} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x={cx(col2x)} y={topY + 244} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            循环次数已知
          </text>
          <text x={col2x + 18} y={topY + 268} fontSize="11" fill="var(--text-secondary)">
            遍历数组/vector
          </text>
          <text x={col2x + 18} y={topY + 288} fontSize="11" fill="var(--text-secondary)">
            跑固定 N 次
          </text>
          <text x={col2x + 18} y={topY + 308} fontSize="11" fill="var(--text-secondary)">
            需要索引 (i) 时
          </text>
          <text x={col2x + 18} y={topY + 330} fontSize="11" fill="var(--accent)" fontWeight="600" fontFamily="monospace">
            核心：计数器循环
          </text>

          {/* do-while 场景 */}
          <rect x={col3x + (colW - boxW) / 2} y={topY + 220} width={boxW} height={130} rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x={cx(col3x)} y={topY + 244} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            至少执行一次
          </text>
          <text x={col3x + 18} y={topY + 268} fontSize="11" fill="var(--text-secondary)">
            菜单循环（先显示再选）
          </text>
          <text x={col3x + 18} y={topY + 288} fontSize="11" fill="var(--text-secondary)">
            先做一遍再判断
          </text>
          <text x={col3x + 18} y={topY + 308} fontSize="11" fill="var(--text-secondary)">
            必须跑至少一轮
          </text>
          <text x={col3x + 18} y={topY + 330} fontSize="11" fill="var(--accent)" fontWeight="600" fontFamily="monospace">
            核心：先干后问
          </text>

          {/* ── 底部总结条 ── */}
          <rect x={marginL} y={topY + 370} width={col3x + colW - marginL} height={36} rx="6" fill="var(--accent)" opacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x={marginL + 14} y={topY + 394} fontSize="13" fontWeight="600" fill="var(--accent)" fontFamily="monospace">
            for = 最常用·计数器循环    while = 条件驱动·次数未知    do-while = 至少跑一次（极少用）
          </text>

          {/* ── 关键差异提示 ── */}
          {/* while 旁边标记 */}
          <text x={cx(col1x)} y={topY + 440} textAnchor="middle" fontSize="11" fill="var(--accent)" fontFamily="monospace">
            ⚠ 条件先于体
          </text>
          <text x={cx(col2x)} y={topY + 440} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            初始化·条件·更新一体化
          </text>
          <text x={cx(col3x)} y={topY + 440} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            ；别忘掉末尾分号
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        while / for / do-while 三种循环的唯一本质差别是「何时判断条件」。`for` 把初始化、条件、更新三要素放在同一行，最清晰；`while` 用纯条件驱动；`do-while` 保证至少执行一次。
      </figcaption>
    </figure>
  );
}
