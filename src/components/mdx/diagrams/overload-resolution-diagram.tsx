/**
 * <OverloadResolutionDiagram>：函数重载匹配规则流程图。
 *
 * 展示 C++ 编译器如何从一组重载函数中选择被调用者：
 * 候选函数 → 可行函数 → 最佳匹配。三步筛选、每一步展示筛选条件和例子。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

export function OverloadResolutionDiagram() {
  const marginL = 24;
  const cx = 320;

  const topY = 32;
  const boxW = 520;
  const boxH = 82;

  // 三个筛选阶段
  const s1y = topY + 10;
  const s2y = s1y + boxH + 52;
  const s3y = s2y + boxH + 52;

  const endY = s3y + boxH + 36;

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
          aria-label="函数重载匹配规则流程图：候选项→可行项→最佳匹配，三步筛选决定调用哪个重载版本"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ── 标题 ── */}
          <text x={cx} y={topY} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary} fontFamily="monospace">
            编译器如何匹配重载：三步走
          </text>

          {/* ═══════ 阶段 1：候选函数 ═══════ */}
          <g>
            {/* 大框 */}
            <rect x={cx - boxW / 2} y={s1y} width={boxW} height={boxH} rx="10" fill={bg} stroke={accent} strokeWidth="2" />

            {/* 阶段标签 */}
            <rect x={cx - boxW / 2} y={s1y} width={100} height={24} rx="4" fill={accent} />
            <text x={cx - boxW / 2 + 50} y={s1y + 17} textAnchor="middle" fontSize="11" fontWeight="700" fill={bg} fontFamily="monospace">
              阶段 1
            </text>

            {/* 标题 */}
            <text x={cx - boxW / 2 + 118} y={s1y + 17} fontSize="13" fontWeight="700" fill={accent}>
              候选函数（Candidate）
            </text>

            {/* 说明 */}
            <text x={cx - boxW / 2 + 18} y={s1y + 44} fontSize="12" fill={primary} fontFamily="monospace">
              与调用点**同名且可见**的函数——不管参数对不对，先全部找到。
            </text>

            {/* 例子 */}
            <text x={cx - boxW / 2 + 18} y={s1y + 68} fontSize="11" fill={secondary} fontFamily="monospace">
              例：调用 print(3.14) → 筛选出所有名为 print 的函数（任何形参）。
            </text>
          </g>

          {/* 箭头 1→2 */}
          <text x={cx} y={s1y + boxH + 18} textAnchor="middle" fontSize="20" fill={accent} fontWeight="700">↓</text>
          <text x={cx + 14} y={s1y + boxH + 18} fontSize="11" fill={secondary}>
            筛选：形参数量对得上吗？
          </text>
          <text x={cx - 10} y={s1y + boxH + 36} fontSize="10" fill={secondary}>
            (加默认参数后)
          </text>

          {/* ═══════ 阶段 2：可行函数 ═══════ */}
          <g>
            <rect x={cx - boxW / 2} y={s2y} width={boxW} height={boxH} rx="10" fill={bg} stroke={border} strokeWidth="2" />

            <rect x={cx - boxW / 2} y={s2y} width={100} height={24} rx="4" fill={primary} />
            <text x={cx - boxW / 2 + 50} y={s2y + 17} textAnchor="middle" fontSize="11" fontWeight="700" fill={bg} fontFamily="monospace">
              阶段 2
            </text>

            <text x={cx - boxW / 2 + 118} y={s2y + 17} fontSize="13" fontWeight="700" fill={primary}>
              可行函数（Viable）
            </text>

            <text x={cx - boxW / 2 + 18} y={s2y + 44} fontSize="12" fill={primary} fontFamily="monospace">
              形参**数量匹配** + 每个实参都能通过隐式转换配到对应形参类型。
            </text>

            <text x={cx - boxW / 2 + 18} y={s2y + 68} fontSize="11" fill={secondary} fontFamily="monospace">
              例：print(int) ✓（3.14→int 隐式转） / print(string) ✗（double 不能转 string）
            </text>
          </g>

          {/* 箭头 2→3 */}
          <text x={cx} y={s2y + boxH + 18} textAnchor="middle" fontSize="20" fill={accent} fontWeight="700">↓</text>
          <text x={cx + 14} y={s2y + boxH + 18} fontSize="11" fill={secondary}>
            筛选：谁的隐式转换最少？
          </text>
          <text x={cx - 10} y={s2y + boxH + 36} fontSize="10" fill={secondary}>
            (哪个匹配得最"近")
          </text>

          {/* ═══════ 阶段 3：最佳匹配 ═══════ */}
          <g>
            <rect x={cx - boxW / 2} y={s3y} width={boxW} height={boxH} rx="10" fill={accent} opacity={0.1} stroke={accent} strokeWidth="2" />

            <rect x={cx - boxW / 2} y={s3y} width={100} height={24} rx="4" fill={accent} />
            <text x={cx - boxW / 2 + 50} y={s3y + 17} textAnchor="middle" fontSize="11" fontWeight="700" fill={bg} fontFamily="monospace">
              阶段 3
            </text>

            <text x={cx - boxW / 2 + 118} y={s3y + 17} fontSize="13" fontWeight="700" fill={accent}>
              最佳匹配（Best match）
            </text>

            <text x={cx - boxW / 2 + 18} y={s3y + 44} fontSize="12" fill={primary} fontFamily="monospace">
              在所有可行函数中，**每个实参都不差于其他函数**、且**至少有一个实参比其他好**的那个。
            </text>

            <text x={cx - boxW / 2 + 18} y={s3y + 68} fontSize="11" fill={secondary} fontFamily="monospace">
              例：print(int) vs print(double) 用 3.14 调用 → print(double) 是最好的（不需要转）
            </text>
          </g>

          {/* ── 最终箭头 ── */}
          <text x={cx} y={s3y + boxH + 24} textAnchor="middle" fontSize="20" fill={accent} fontWeight="700">✅</text>
          <text x={cx + 24} y={s3y + boxH + 24} fontSize="13" fontWeight="700" fill={accent}>
            调用对应的函数
          </text>

          {/* ── 图例 ── */}
          <text x={marginL + 10} y={endY + 28} fontSize="12" fontWeight="700" fill={primary}>
            匹配规则优先级（从高到低）
          </text>
          <text x={marginL + 10} y={endY + 50} fontSize="11" fill={secondary} fontFamily="monospace">
            ① 精确匹配（类型完全一样） &gt; ② const 转换 &gt; ③ 类型提升（int→long）&gt; ④ 算术/指针转换 &gt; ⑤ 类类型转换
          </text>
          <text x={marginL + 10} y={endY + 72} fontSize="11" fill={secondary} fontFamily="monospace">
            无法选出唯一最佳 → 二义性（ambiguous）→ 编译错误
          </text>

          <defs>
            <marker id="arrowHeadAccent" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0,1 6,4 0,7" fill={accent} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        三步筛选：先找同名函数（候选项）→ 再看形参数量和类型是否对得上（可行项）→ 最后挑转换代价最小的那一个（最佳匹配）。找不到或找到多个 = 编译报错。
      </figcaption>
    </figure>
  );
}
