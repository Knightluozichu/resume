/**
 * <SelectionSortDiagram>：选择排序分步可视化。
 * 展示第一轮扫描：未排序数组中寻找到最小值 8，并将其交换到已排序数组的首位。
 * Server Component。
 */
export function SelectionSortDiagram() {
  const VW = 720, VH = 380;
  const BOX_W = 48, BOX_H = 40, BOX_GAP = 8;
  const TOTAL_W = 7 * BOX_W + 6 * BOX_GAP;
  const START_X = (VW - TOTAL_W) / 2;

  const ux = (i: number) => START_X + i * (BOX_W + BOX_GAP);

  const UNSORTED = [29, 14, 37, 10, 25, 8, 13];
  const SORTED = [8, 10, 13, 14, 25, 29, 37];
  const MIN_IDX = 5; // index of value 8 in unsorted

  const ac = "var(--accent)";
  const su = "var(--success)";
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";
  const be = "var(--bg-elevated)";

  const UNSORTED_Y = 100;
  const SORTED_Y = 220;

  const MIN_X_CENTER = ux(MIN_IDX) + BOX_W / 2;
  const ARC_START_X = START_X + BOX_W / 2;
  const ARC_END_X = MIN_X_CENTER;
  const ARC_MID_X = (ARC_START_X + ARC_END_X) / 2;
  const ARC_TOP_Y = UNSORTED_Y - 24;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          role="img"
          aria-label="选择排序示意图。第一轮：从未排序数组 [29,14,37,10,25,8,13] 中扫描找到最小值 8，交换到已排序数组第一位。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ss-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={ac} />
            </marker>
            <marker id="ss-success" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={su} />
            </marker>
          </defs>

          {/* 标题 */}
          <text x={VW / 2} y={32} textAnchor="middle" fontSize="16px" fontWeight="700" fill={tp}>
            选择排序：第一轮扫描找最小值
          </text>
          <text x={VW / 2} y={53} textAnchor="middle" fontSize="11px" fill={ts}>
            从未排序区找到最小值 → 交换到已排序区末尾
          </text>

          {/* ======== 未排序数组（上排） ======== */}
          <text x={START_X - 16} y={UNSORTED_Y + BOX_H / 2 + 4} textAnchor="end" fontSize="11px" fontWeight="600" fill={ts}>
            未排序
          </text>

          {UNSORTED.map((v, i) => {
            const isMin = i === MIN_IDX;
            return (
              <g key={`u${i}`}>
                <rect
                  x={ux(i)}
                  y={UNSORTED_Y}
                  width={BOX_W}
                  height={BOX_H}
                  rx={6}
                  fill={isMin ? su : be}
                  fillOpacity={isMin ? 0.15 : 1}
                  stroke={isMin ? su : bo}
                  strokeWidth={isMin ? 2 : 1.5}
                />
                <text
                  x={ux(i) + BOX_W / 2}
                  y={UNSORTED_Y + BOX_H / 2 + 5}
                  textAnchor="middle"
                  fontSize="13px"
                  fontWeight={isMin ? "700" : "500"}
                  fill={isMin ? su : tp}
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* "本轮最小值=8" 标注 */}
          <text x={MIN_X_CENTER} y={UNSORTED_Y - 32} textAnchor="middle" fontSize="11px" fontWeight="700" fill={su}>
            最小值 = 8
          </text>
          <line
            x1={MIN_X_CENTER}
            y1={UNSORTED_Y - 24}
            x2={MIN_X_CENTER}
            y2={UNSORTED_Y - 6}
            stroke={su}
            strokeWidth={1.5}
            markerEnd="url(#ss-success)"
          />

          {/* ======== 扫描弧线 ======== */}
          <path
            d={`M${ARC_START_X} ${UNSORTED_Y} Q${ARC_MID_X} ${ARC_TOP_Y} ${ARC_END_X} ${UNSORTED_Y}`}
            stroke={ac}
            strokeWidth={1.5}
            strokeDasharray="4 3"
            fill="none"
            markerEnd="url(#ss-accent)"
          />
          <text x={ARC_MID_X} y={ARC_TOP_Y - 6} textAnchor="middle" fontSize="11px" fill={ac}>
            扫描中...
          </text>

          {/* ======== 已排序数组（下排） ======== */}
          <text x={START_X - 16} y={SORTED_Y + BOX_H / 2 + 4} textAnchor="end" fontSize="11px" fontWeight="600" fill={ts}>
            已排序
          </text>

          {SORTED.map((v, i) => {
            const isFirst = i === 0;
            return (
              <g key={`s${i}`}>
                <rect
                  x={ux(i)}
                  y={SORTED_Y}
                  width={BOX_W}
                  height={BOX_H}
                  rx={6}
                  fill={isFirst ? su : be}
                  fillOpacity={isFirst ? 0.15 : 1}
                  stroke={isFirst ? su : bo}
                  strokeWidth={isFirst ? 2 : 1.5}
                />
                <text
                  x={ux(i) + BOX_W / 2}
                  y={SORTED_Y + BOX_H / 2 + 5}
                  textAnchor="middle"
                  fontSize="13px"
                  fontWeight={isFirst ? "700" : "500"}
                  fill={isFirst ? su : tp}
                >
                  {v}
                </text>
              </g>
            );
          })}

          {/* ======== 从最小值到已排序位置的交换线（拆分为三段以满足 AABB 碰撞检测） ======== */}
          <line
            x1={MIN_X_CENTER}
            y1={UNSORTED_Y + BOX_H + 4}
            x2={MIN_X_CENTER}
            y2={180}
            stroke={su}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <line
            x1={MIN_X_CENTER}
            y1={180}
            x2={ux(0) + BOX_W / 2}
            y2={180}
            stroke={su}
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <line
            x1={ux(0) + BOX_W / 2}
            y1={180}
            x2={ux(0) + BOX_W / 2}
            y2={SORTED_Y - 6}
            stroke={su}
            strokeWidth={1.5}
            strokeDasharray="4 3"
            markerEnd="url(#ss-success)"
          />
          <text
            x={(MIN_X_CENTER + ux(0) + BOX_W / 2) / 2}
            y={166}
            textAnchor="middle"
            fontSize="11px"
            fontWeight="600"
            fill={su}
          >
            交换到首位
          </text>

          {/* ======== 底部 Footer ======== */}
          <line x1={40} y1={SORTED_Y + BOX_H + 30} x2={VW - 40} y2={SORTED_Y + BOX_H + 30} stroke={bo} strokeWidth={1} strokeDasharray="4 3" />

          {/* 复杂度说明 */}
          <text x={VW / 2 - 180} y={SORTED_Y + BOX_H + 54} textAnchor="middle" fontSize="11px" fill={ts}>
            第 1 轮：扫描 7 个找最小
          </text>
          <text x={VW / 2 - 60} y={SORTED_Y + BOX_H + 54} textAnchor="middle" fontSize="11px" fill={ts}>
            第 2 轮：扫描 6 个找最小
          </text>
          <text x={VW / 2 + 60} y={SORTED_Y + BOX_H + 54} textAnchor="middle" fontSize="11px" fill={ts}>
            第 3 轮：扫描 5 个找最小
          </text>
          <text x={VW / 2 + 180} y={SORTED_Y + BOX_H + 54} textAnchor="middle" fontSize="11px" fill={ts}>
            ...共比较 n(n-1)/2 次
          </text>

          {/* 最终结论 */}
          <text x={VW / 2} y={VH - 18} textAnchor="middle" fontSize="12px" fontWeight="700" fill={ac}>
            时间复杂度：平均 / 最坏 O(n²) 级
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        选择排序每轮从剩余未排序部分选出最小值，放入已排序部分的末尾。由于需要双重循环，时间复杂度为 O(n²)。
      </figcaption>
    </figure>
  );
}
