/**
 * <ArrayVsVectorDiagram>：C 数组 vs vector 并排对比图。
 *
 * 左栏：C 风格数组 int arr[3] — 固定大小 3、需手动管理、越界不检查
 * 右栏：std::vector<int> v — 动态大小、自动扩容、at() 检查越界
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--accent) / --border / --bg / --bg-elevated / --text-primary / --text-secondary）。
 */
export function ArrayVsVectorDiagram() {
  const token = {
    accent: "var(--accent)",
    border: "var(--border)",
    bg: "var(--bg)",
    bgElevated: "var(--bg-elevated)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
  };

  const svgW = 720;
  const svgH = 500;
  const colW = 316;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          role="img"
          aria-label="C 风格数组 vs std::vector 对比：固定大小 vs 动态扩容"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 左栏：C 风格数组 ===== */}
          <rect x="12" y="12" width={colW} height={svgH - 24} rx="8" fill={token.bgElevated} stroke={token.border} />

          {/* 标题 */}
          <rect x="82" y="24" width="172" height="24" rx="6" fill={token.accent} opacity="0.1" />
          <text x="168" y="41" fontSize="13" fontWeight="700" fill={token.accent} textAnchor="middle" fontFamily="monospace">C 风格数组 int arr[3]</text>

          {/* 数组图示 */}
          <g transform="translate(28, 68)">
            <rect x="-4" y="-4" width="262" height={60} rx="6" fill="none" stroke={token.border} />
            {/* 三个格子 */}
            {[0, 1, 2].map((i) => {
              const cx = i * 90;
              return (
                <g key={i}>
                  <rect x={cx} y="0" width="78" height="52" rx="4" fill={token.accent} fillOpacity="0.12" stroke={token.accent} />
                  <text x={cx + 39} y="24" fontSize="12" fontWeight="600" fill={token.textSecondary} textAnchor="middle">?</text>
                  <text x={cx + 39} y="44" fontSize="9" fill={token.textSecondary} textAnchor="middle">arr[{i}]</text>
                </g>
              );
            })}
          </g>

          <text x="168" y="156" fontSize="11" fill={token.textSecondary} textAnchor="middle">3 个格子在栈上连续排列</text>
          <text x="168" y="174" fontSize="11" fill={token.textSecondary} textAnchor="middle">大小 3 是类型的一部分，无法改变</text>

          {/* 缺点列表 */}
          <g transform="translate(28, 200)">
            <rect x="0" y="0" width={254} height="44" rx="6" fill="rgb(229,181,103)" opacity="0.06" />
            <text x="16" y="18" fontSize="10" fill="rgb(229,181,103)">✗ 不能 arr[3] ← 4; 加第四个元素</text>
            <text x="16" y="36" fontSize="10" fill="rgb(229,181,103)">✗ 越界不检查 → 悄悄写坏相邻内存</text>
          </g>

          <g transform="translate(28, 258)">
            <rect x="0" y="0" width={254} height="44" rx="6" fill="rgb(229,181,103)" opacity="0.06" />
            <text x="16" y="18" fontSize="10" fill="rgb(229,181,103)">✗ 不知道自己的大小</text>
            <text x="16" y="36" fontSize="10" fill="rgb(229,181,103)">✗ 指针退化：arr 当参数传递会退化成 int*</text>
          </g>

          <g transform="translate(28, 316)">
            <rect x="0" y="0" width={254} height="44" rx="6" fill="rgb(229,181,103)" opacity="0.06" />
            <text x="16" y="18" fontSize="10" fill="rgb(229,181,103)">✗ 不能复制：int arr2[3] = arr; ← 错</text>
            <text x="16" y="36" fontSize="10" fill="rgb(229,181,103)">✗ 需要手动逐个复制</text>
          </g>

          {/* ===== 右栏：std::vector ===== */}
          <rect x={svgW / 2 + 12} y="12" width={colW} height={svgH - 24} rx="8" fill={token.bgElevated} stroke={token.border} />

          <rect x={svgW / 2 + 84} y="24" width="172" height="24" rx="6" fill="rgb(63,185,127)" opacity="0.1" />
          <text x={svgW / 2 + 170} y="41" fontSize="13" fontWeight="700" fill="rgb(63,185,127)" textAnchor="middle" fontFamily="monospace">vector&lt;int&gt; v</text>

          {/* vector 图示 */}
          <g transform={`translate(${svgW / 2 + 30}, 68)`}>
            <rect x="-4" y="-4" width={262} height={60} rx="6" fill="none" stroke="rgb(63,185,127)" opacity="0.3" strokeDasharray="4 4" />
            {/* 显示扩容后的空间（比 3 更多） */}
            {[0, 1, 2].map((i) => {
              const cx = i * 64;
              return (
                <g key={i}>
                  <rect x={cx} y="0" width="54" height="52" rx="4" fill="rgb(63,185,127)" fillOpacity="0.15" stroke="rgb(63,185,127)" />
                  <text x={cx + 27} y="24" fontSize="12" fontWeight="600" fill={token.textPrimary} textAnchor="middle">{i + 1}0</text>
                  <text x={cx + 27} y="44" fontSize="9" fill={token.textSecondary} textAnchor="middle">[{i}]</text>
                </g>
              );
            })}
            {/* 额外的预留空间 */}
            {[3, 4, 5].map((i) => {
              const cx = i * 64;
              return (
                <g key={i}>
                  <rect x={cx} y="0" width="54" height="52" rx="4" fill="none" stroke={token.border} strokeDasharray="3 3" opacity="0.4" />
                  <text x={cx + 27} y="24" fontSize="10" fill={token.textSecondary} textAnchor="middle">预留</text>
                  <text x={cx + 27} y="44" fontSize="9" fill={token.textSecondary} textAnchor="middle">[{i}]</text>
                </g>
              );
            })}
          </g>

          <text x={svgW / 2 + 170} y="156" fontSize="11" fill={token.textSecondary} textAnchor="middle">堆上动态分配，大小可变</text>
          <text x={svgW / 2 + 170} y="174" fontSize="11" fill={token.textSecondary} textAnchor="middle">size=3, capacity=6（还有 3 个预留位）</text>

          {/* 优点列表 */}
          <g transform={`translate(${svgW / 2 + 30}, 200)`}>
            <rect x="0" y="0" width={254} height="44" rx="6" fill="rgb(63,185,127)" opacity="0.06" />
            <text x="16" y="18" fontSize="10" fill="rgb(63,185,127)">✓ v.push_back(40); 自动添加元素</text>
            <text x="16" y="36" fontSize="10" fill="rgb(63,185,127)">✓ v.size() 知道自己的大小</text>
          </g>

          <g transform={`translate(${svgW / 2 + 30}, 258)`}>
            <rect x="0" y="0" width={254} height="44" rx="6" fill="rgb(63,185,127)" opacity="0.06" />
            <text x="16" y="18" fontSize="10" fill="rgb(63,185,127)">✓ v.at(i) 检查越界，安全</text>
            <text x="16" y="36" fontSize="10" fill="rgb(63,185,127)">✓ vector&lt;int&gt; v2 = v; 深拷贝</text>
          </g>

          <g transform={`translate(${svgW / 2 + 30}, 316)`}>
            <rect x="0" y="0" width={254} height="44" rx="6" fill="rgb(63,185,127)" opacity="0.06" />
            <text x="16" y="18" fontSize="10" fill="rgb(63,185,127)">✓ 范围 for 轻松遍历</text>
            <text x="16" y="36" fontSize="10" fill="rgb(63,185,127)">✓ 传参不退化</text>
          </g>

          {/* 底部结论 */}
          <g transform={`translate(12, ${svgH - 50})`}>
            <rect x="0" y="0" width={svgW - 24} height="28" rx="6" fill={token.accent} opacity="0.06" />
            <text x={(svgW - 24) / 2} y="18" fontSize="12" fontWeight="600" fill={token.textPrimary} textAnchor="middle">
              推荐：新代码优先用 <tspan fill={token.accent} fontFamily="monospace">vector</tspan>，只在跟 C 接口交互或极端性能场景才用原生数组
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C 风格数组（左）大小固定、功能原始、容易出错。vector（右）是 C++ 标准容器，大小动态可变、自带 size()/push_back()/安全访问等全套设施。
      </figcaption>
    </figure>
  );
}
