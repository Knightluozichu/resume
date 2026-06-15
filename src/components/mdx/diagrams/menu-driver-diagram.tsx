/**
 * <MenuDriverDiagram>：菜单驱动程序状态流转图。
 *
 * 四步：① 显示菜单 ② 读入选项 ③ switch 分发 ④ 循环或退出
 */

interface MenuDriverDiagramProps {
  step?: 1 | 2 | 3 | 4;
}

export function MenuDriverDiagram({ step = 4 }: MenuDriverDiagramProps) {
  const cx = 300;
  const boxW = 180;
  const boxH = 40;
  const isActive = (st: number) => step >= st;

  const yMenu = 56;
  const yRead = 120;
  const ySwitch = 184;
  const yAction = 248;
  const yLoop = 312;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 600 380"
          role="img"
          aria-label="菜单驱动程序状态流转图"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <text x={24} y={28} fontSize="16" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
            菜单驱动程序状态机
          </text>

          <g opacity={isActive(1) ? 1 : 0.35}>
            <rect x={cx - boxW / 2} y={yMenu} width={boxW} height={boxH} rx="8" fill={"var(--accent)"} fillOpacity={0.12} stroke={"var(--accent)"} strokeWidth="1.5" />
            <text x={cx} y={yMenu + 26} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ① 显示菜单
            </text>
          </g>

          <line x1={cx} y1={yMenu + boxH} x2={cx} y2={yRead} stroke={isActive(2) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" markerEnd="url(#md-arrow)" />

          <g opacity={isActive(2) ? 1 : 0.35}>
            <rect x={cx - boxW / 2} y={yRead} width={boxW} height={boxH} rx="8" fill={"var(--bg)"} stroke={isActive(2) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" />
            <text x={cx} y={yRead + 26} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ② 读入 choice
            </text>
          </g>

          <line x1={cx} y1={yRead + boxH} x2={cx} y2={ySwitch} stroke={isActive(3) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" markerEnd="url(#md-arrow)" />

          <g opacity={isActive(3) ? 1 : 0.35}>
            <polygon
              points={`${cx},${ySwitch + 6} ${cx + 80},${ySwitch + boxH / 2 + 6} ${cx},${ySwitch + boxH - 6} ${cx - 80},${ySwitch + boxH / 2 + 6}`}
              fill={"var(--bg)"}
              stroke={isActive(3) ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
            />
            <text x={cx} y={ySwitch + boxH / 2 + 12} textAnchor="middle" fontSize="12" fontWeight="700" fill={"var(--text-primary)"} fontFamily="monospace">
              ③ switch 分发
            </text>
          </g>

          {/* 分支 */}
          <line x1={cx + 80} y1={ySwitch + boxH / 2 + 6} x2={480} y2={yAction + boxH / 2} stroke={isActive(3) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" />
          <g opacity={isActive(3) ? 1 : 0.35}>
            <rect x={400} y={yAction} width={160} height={boxH} rx="8" fill={"var(--bg)"} stroke={"var(--border)"} />
            <text x={480} y={yAction + 26} textAnchor="middle" fontSize="11" fill={"var(--text-primary)"} fontFamily="monospace">
              case 1/2/...
            </text>
          </g>

          <line x1={cx - 80} y1={ySwitch + boxH / 2 + 6} x2={120} y2={yAction + boxH / 2} stroke={isActive(4) ? "rgb(229,181,103)" : "var(--border)"} strokeWidth="1.5" />
          <g opacity={isActive(4) ? 1 : 0.35}>
            <rect x={40} y={yAction} width={160} height={boxH} rx="8" fill={"rgb(229,181,103)"} fillOpacity={0.1} stroke={"rgb(229,181,103)"} strokeWidth="1.5" />
            <text x={120} y={yAction + 26} textAnchor="middle" fontSize="11" fill={"rgb(229,181,103)"} fontFamily="monospace">
              case 0: 退出
            </text>
          </g>

          {/* 循环回菜单 */}
          <line x1={480} y1={yAction + boxH} x2={480} y2={yLoop} stroke={isActive(4) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" />
          <line x1={480} y1={yLoop + 20} x2={cx + boxW / 2} y2={yLoop + 20} stroke={isActive(4) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1={cx + boxW / 2} y1={yLoop + 20} x2={cx + boxW / 2} y2={yMenu} stroke={isActive(4) ? "var(--accent)" : "var(--border)"} strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#md-arrow)" />

          <g opacity={isActive(4) ? 1 : 0.35}>
            <text x={cx + 100} y={yLoop + 24} fontSize="11" fill={"var(--accent)"} fontFamily="system-ui">
              ④ do-while 回到菜单（choice != 0）
            </text>
          </g>

          <text x={24} y={368} fontSize="11" fill={"var(--text-secondary)"} fontFamily="system-ui">
            菜单驱动 = 循环 + 显示 + 验证输入 + switch 分发。上一章的分支语句在本章落地成交互式程序骨架。
          </text>

          <defs>
            <marker id="md-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 Z" fill={"var(--accent)"} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        典型菜单程序用 do-while 保证至少显示一次菜单，switch 处理各选项，0 退出时 break 出 switch 并由循环条件结束程序。
      </figcaption>
    </figure>
  );
}
