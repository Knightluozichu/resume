/**
 * <BinarySearchDiagram>：二分查找分步可视化。
 * 展示在 [3, 8, 13, 21, 34, 55, 89] 中查找 55 的双步骤过程。
 * Server Component。
 */
export function BinarySearchDiagram() {
  const VIEW_W = 720, VIEW_H = 370;
  const BOX_W = 48, BOX_H = 40, BOX_GAP = 8;
  const TOTAL_BOXES_W = 7 * BOX_W + 6 * BOX_GAP;
  const START_X = (VIEW_W - TOTAL_BOXES_W) / 2;
  const VALUES = [3, 8, 13, 21, 34, 55, 89];

  const rx = (i: number) => START_X + i * (BOX_W + BOX_GAP);

  const ac = "var(--accent)";
  const su = "var(--success)";
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";
  const be = "var(--bg-elevated)";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="二分查找示意图。有序数组 [3,8,13,21,34,55,89] 中查找目标 55。第一步：在完整数组中检查中间元素 21，目标值 55 > 21，排除左半区。第二步：在右半区 [34,55,89] 中定位中间元素 55，成功命中！"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={35} textAnchor="middle" fontSize="16px" fontWeight="700" fill={tp}>
            二分查找：在有序数组中查找 55
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11px" fill={ts}>
            目标值 Target = 55
          </text>

          {/* ==================== ROW 1 ==================== */}
          <text x={START_X} y={80} fontSize="12px" fontWeight="700" fill={tp}>
            第一步：在完整数组中检查中间元素 (index = 3)
          </text>
          {VALUES.map((v, i) => {
            const isMid = v === 21;
            return (
              <g key={`r1-${v}`}>
                <rect
                  x={rx(i)}
                  y={92}
                  width={BOX_W}
                  height={BOX_H}
                  rx="6"
                  fill={isMid ? ac : be}
                  fillOpacity={isMid ? 0.15 : 1}
                  stroke={isMid ? ac : bo}
                  strokeWidth={isMid ? 2 : 1.5}
                />
                <text
                  x={rx(i) + BOX_W / 2}
                  y={92 + BOX_H / 2 + 5}
                  textAnchor="middle"
                  fontSize={isMid ? "13px" : "12px"}
                  fontWeight={isMid ? "700" : "500"}
                  fill={isMid ? ac : tp}
                >
                  {v}
                </text>
              </g>
            );
          })}
          <text x={rx(3) + BOX_W / 2} y={150} textAnchor="middle" fontSize="11px" fontWeight="600" fill={ac}>
            mid = 21 (Target 55 &gt; 21) → 排除左半区及 21
          </text>

          {/* ==================== ROW 2 ==================== */}
          <text x={START_X} y={185} fontSize="12px" fontWeight="700" fill={tp}>
            第二步：在剩余的右半区 [34, 55, 89] 中检查中间元素 (index = 5)
          </text>
          {VALUES.map((v, i) => {
            const isExcluded = v <= 21;
            const isTarget = v === 55;
            return (
              <g key={`r2-${v}`} opacity={isExcluded ? 0.25 : 1}>
                <rect
                  x={rx(i)}
                  y={197}
                  width={BOX_W}
                  height={BOX_H}
                  rx="6"
                  fill={isTarget ? su : be}
                  fillOpacity={isTarget ? 0.15 : 1}
                  stroke={isTarget ? su : isExcluded ? bo : bo}
                  strokeWidth={isTarget ? 2 : 1.5}
                  strokeDasharray={isExcluded ? "3 2" : undefined}
                />
                <text
                  x={rx(i) + BOX_W / 2}
                  y={197 + BOX_H / 2 + 5}
                  textAnchor="middle"
                  fontSize={isTarget ? "13px" : "12px"}
                  fontWeight={isTarget ? "700" : "500"}
                  fill={isTarget ? su : tp}
                >
                  {v}
                </text>
              </g>
            );
          })}
          <text x={rx(5) + BOX_W / 2} y={255} textAnchor="middle" fontSize="11px" fontWeight="600" fill={su}>
            mid = 55 (Target 55 == 55) → 命中！
          </text>

          {/* 底部分隔线 */}
          <line x1={40} y1={280} x2={VIEW_W - 40} y2={280} stroke={bo} strokeWidth="1" strokeDasharray="4 3" />

          {/* 复杂度对比 */}
          <text x={VIEW_W / 2 - 140} y={300} textAnchor="middle" fontSize="11px" fill={ts}>
            数组长度 N = 7
          </text>
          <text x={VIEW_W / 2 - 140} y={318} textAnchor="middle" fontSize="13px" fontWeight="700" fill={tp}>
            最坏 log₂(7) ≈ 3 次比较
          </text>

          <line x1={VIEW_W / 2} y1={290} x2={VIEW_W / 2} y2={325} stroke={bo} strokeWidth="1" />

          <text x={VIEW_W / 2 + 140} y={300} textAnchor="middle" fontSize="11px" fill={ts}>
            数组长度 N = 1,024
          </text>
          <text x={VIEW_W / 2 + 140} y={318} textAnchor="middle" fontSize="13px" fontWeight="700" fill={tp}>
            最坏 log₂(1024) = 10 次比较
          </text>

          {/* 结论 */}
          <text x={VIEW_W / 2} y={345} textAnchor="middle" fontSize="12px" fontWeight="700" fill={su}>
            查找效率：对数时间复杂度 O(log n)
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        二分查找每次将搜索范围减半。有序数组 7 个元素最多只需 3 步，1024 个元素只需 10 步。
      </figcaption>
    </figure>
  );
}
