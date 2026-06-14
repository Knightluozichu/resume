/**
 * <ContainerSelectionFlow step={n}>：关联容器选择决策流程图。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色（var(--xxx)），无阴影。
 *
 * step 支持：
 *   1 — "需要 key→value 映射吗？"
 *   2 — "需要元素按键排序吗？"
 *   3 — "key 允许重复吗？"
 *   4 — 完整流程图（含 unordered_multimap/unordered_multiset → 最终容器）
 */

interface Props {
  step?: number;
}

export function ContainerSelectionFlow({ step = 4 }: Props) {
  const accent = "var(--accent)";
  const primary = "var(--text-primary)";
  const secondary = "var(--text-secondary)";
  const border = "var(--border)";
  const bg = "var(--bg)";
  const elevated = "var(--bg-elevated)";
  const good = "rgb(63,185,127)";
  const warn = "rgb(229,181,103)";

  // 简化版菱形菱形判断节点
  const diamond = (cx: number, cy: number, w: number, h: number, fill: string, stroke: string) => {
    const points = [
      `${cx},${cy - h / 2}`,
      `${cx + w / 2},${cy}`,
      `${cx},${cy + h / 2}`,
      `${cx - w / 2},${cy}`,
    ].join(" ");
    // eslint-disable-next-line @next/next/no-img-element
    return <polygon points={points} fill={fill} stroke={stroke} strokeWidth="1.5" />;
  };

  const w = 820;
  const h = step <= 2 ? 260 : step === 3 ? 400 : 520;

  // 节点坐标
  const nodes = {
    q1: { x: w / 2, y: 70 }, // 需要 key→value 映射吗？
    q2: { x: 230, y: 170 }, // 需要按键排序吗？(yes side)
    q3: { x: w / 2, y: 270 }, // key 允许重复吗？(yes-ordered side)
    q4: { x: w / 2, y: 400 }, // final step with unordered_multimap/set
    // 结果节点
    set: { x: 100, y: 220 },
    map: { x: 100, y: 320 },
    multiset: { x: w / 2 - 90, y: 340 },
    multimap: { x: w / 2 + 90, y: 340 },
    u_set: { x: 100, y: 440 },
    u_map: { x: 100, y: 500 },
    u_multiset: { x: w / 2 + 90, y: 460 },
    u_multimap: { x: w / 2 + 90, y: 500 },
    first_no: { x: 580, y: 170 }, // "不需要kv映射=应该是顺序容器"
  };

  const showQ1 = step >= 1;
  const showQ2 = step >= 2;
  const showQ3 = step >= 3;
  const showQ4 = step >= 4;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-x-auto overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label="关联容器选择决策流程图：是否需要key→value → 是否需要有序 → 是否允许重复key → 最终容器"
          className="mx-auto block h-auto w-full max-w-[820px]"
        >
          <text x={w / 2} y="22" fontSize="14" fontWeight="700" fill={primary} textAnchor="middle">
            为你的场景选对关联容器
          </text>

          {/* === Step 1：第一个判断 === */}
          {showQ1 && (
            <>
              {diamond(nodes.q1.x, nodes.q1.y, 170, 60, bg, accent)}
              <text x={nodes.q1.x} y={nodes.q1.y - 4} fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
                需要 key→value
              </text>
              <text x={nodes.q1.x} y={nodes.q1.y + 12} fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
                映射吗？
              </text>

              {/* Yes → 第二个判断 */}
              {showQ2 && (
                <line
                  x1={nodes.q1.x}
                  y1={nodes.q1.y + 30}
                  x2={nodes.q2.x}
                  y2={nodes.q2.y - 30}
                  stroke={primary}
                  strokeWidth="1.2"
                  markerEnd="url(#arrDown)"
                />
              )}
              <text x={nodes.q1.x - 90} y={nodes.q1.y + 50} fontSize="9" fill={good} textAnchor="middle">
                YES ↙
              </text>

              {/* No → 结果 */}
              <line
                x1={nodes.q1.x + 85}
                y1={nodes.q1.y}
                x2={nodes.first_no.x}
                y2={nodes.first_no.y}
                stroke={warn}
                strokeWidth="1.2"
                markerEnd="url(#arrRight)"
              />
              <text x={nodes.q1.x + 120} y={nodes.q1.y - 10} fontSize="9" fill={warn} textAnchor="middle">
                NO ↗
              </text>
              <text x={nodes.first_no.x} y={nodes.first_no.y - 30} fontSize="11" fill={warn} textAnchor="middle">
                不需要 kv 映射
              </text>
              <text x={nodes.first_no.x} y={nodes.first_no.y - 14} fontSize="10" fill={secondary} textAnchor="middle">
                考虑用顺序容器
              </text>
              {showQ2 && (
                <rect x={nodes.first_no.x - 60} y={nodes.first_no.y} width="120" height="24" rx="4" fill={bg} stroke={border} />
              )}
              {showQ2 && (
                <text x={nodes.first_no.x} y={nodes.first_no.y + 16} fontSize="10" fill={secondary} textAnchor="middle" fontFamily="monospace">
                  vector/list/deque...
                </text>
              )}
            </>
          )}

          {/* === Step 2：第二个判断 === */}
          {showQ2 && (
            <>
              {diamond(nodes.q2.x, nodes.q2.y, 160, 56, bg, border)}
              <text x={nodes.q2.x} y={nodes.q2.y - 4} fontSize="11" fill={primary} textAnchor="middle">
                需要按键
              </text>
              <text x={nodes.q2.x} y={nodes.q2.y + 12} fontSize="11" fill={primary} textAnchor="middle">
                排序吗？
              </text>

              {/* Yes → 第三个判断 */}
              {showQ3 && (
                <line
                  x1={nodes.q2.x}
                  y1={nodes.q2.y + 28}
                  x2={nodes.q3.x}
                  y2={nodes.q3.y - 40}
                  stroke={primary}
                  strokeWidth="1.2"
                  markerEnd="url(#arrDown)"
                />
              )}
              <text x={nodes.q2.x + 50} y={nodes.q2.y + 45} fontSize="9" fill={good} textAnchor="middle">
                YES（有序）
              </text>

              {/* No → 无序结果 (step 3-) */}
              {showQ3 && (
                <>
                  <line
                    x1={nodes.q2.x + 80}
                    y1={nodes.q2.y}
                    x2={520}
                    y2={250}
                    stroke={warn}
                    strokeWidth="1.2"
                    markerEnd="url(#arrRight)"
                  />
                  <text x={380} y={245} fontSize="9" fill={warn} textAnchor="middle">
                    NO（无序）
                  </text>
                  <text x={520} y={265} fontSize="10" fill={accent} textAnchor="middle">
                    unordered_set
                  </text>
                  <text x={520} y={280} fontSize="10" fill={accent} textAnchor="middle">
                    unordered_map
                  </text>
                  {showQ4 && (
                    <>
                      <text x={520} y={295} fontSize="10" fill={secondary} textAnchor="middle">
                        unordered_multiset
                      </text>
                      <text x={520} y={310} fontSize="10" fill={secondary} textAnchor="middle">
                        unordered_multimap
                      </text>
                    </>
                  )}
                </>
              )}
            </>
          )}

          {/* === Step 3：第三个判断 === */}
          {showQ3 && (
            <>
              {diamond(nodes.q3.x, nodes.q3.y, 150, 52, bg, border)}
              <text x={nodes.q3.x} y={nodes.q3.y - 2} fontSize="11" fill={primary} textAnchor="middle">
                key 允许
              </text>
              <text x={nodes.q3.x} y={nodes.q3.y + 14} fontSize="11" fill={primary} textAnchor="middle">
                重复吗？
              </text>

              {/* Yes → set / map */}
              <line
                x1={nodes.q3.x - 75}
                y1={nodes.q3.y}
                x2={nodes.q3.x - 160}
                y2={nodes.q3.y}
                stroke={good}
                strokeWidth="1.2"
                markerEnd="url(#arrLeft)"
              />
              <text x={nodes.q3.x - 120} y={nodes.q3.y - 8} fontSize="9" fill={good} textAnchor="middle">
                NO
              </text>
              <rect x={nodes.q3.x - 210} y={nodes.q3.y - 24} width="90" height="22" rx="4" fill={accent} opacity="0.12" stroke={accent} />
              <text x={nodes.q3.x - 165} y={nodes.q3.y - 8} fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
                set
              </text>
              <rect x={nodes.q3.x - 210} y={nodes.q3.y + 4} width="90" height="22" rx="4" fill={accent} opacity="0.12" stroke={accent} />
              <text x={nodes.q3.x - 165} y={nodes.q3.y + 20} fontSize="11" fontWeight="600" fill={accent} textAnchor="middle">
                map
              </text>

              {/* No → multiset / multimap */}
              {showQ4 && (
                <>
                  <line
                    x1={nodes.q3.x + 75}
                    y1={nodes.q3.y}
                    x2={nodes.q3.x + 160}
                    y2={nodes.q3.y}
                    stroke={warn}
                    strokeWidth="1.2"
                    markerEnd="url(#arrRight3)"
                  />
                  <text x={nodes.q3.x + 120} y={nodes.q3.y - 8} fontSize="9" fill={warn} textAnchor="middle">
                    YES
                  </text>
                  <rect x={nodes.q3.x + 120} y={nodes.q3.y - 24} width="110" height="22" rx="4" fill={accent} opacity="0.08" stroke={border} />
                  <text x={nodes.q3.x + 175} y={nodes.q3.y - 8} fontSize="11" fill={primary} textAnchor="middle">
                    multiset
                  </text>
                  <rect x={nodes.q3.x + 120} y={nodes.q3.y + 4} width="110" height="22" rx="4" fill={accent} opacity="0.08" stroke={border} />
                  <text x={nodes.q3.x + 175} y={nodes.q3.y + 20} fontSize="11" fill={primary} textAnchor="middle">
                    multimap
                  </text>
                </>
              )}
            </>
          )}

          {/* === Step 4：无序结果详细信息 === */}
          {showQ4 && (
            <>
              {/* unordered_set/map 结果框 */}
              <g transform={`translate(${w / 2 - 210}, 440)`}>
                <rect x="0" y="0" width="420" height="60" rx="8" fill={accent} opacity="0.04" stroke={border} />
                <text x="210" y="20" fontSize="12" fontWeight="600" fill={primary} textAnchor="middle">
                  无序 + 不可重复key → unordered_set / unordered_map
                </text>
                <text x="210" y="42" fontSize="10" fill={secondary} textAnchor="middle">
                  均摊 O(1) 查找/插入，无序遍历——当你不需要有序输出、只关心「快速查找」时选这个
                </text>
              </g>

              {/* unordered_multiset/multimap 结果框 */}
              <g transform={`translate(${w / 2 - 210}, 460)`}>
                <rect x="0" y="0" width="420" height="46" rx="8" fill={bg} stroke={border} />
                <text x="210" y="18" fontSize="12" fontWeight="600" fill={secondary} textAnchor="middle">
                  无序 + 可重复key → unordered_multiset / unordered_multimap
                </text>
                <text x="210" y="38" fontSize="10" fill={secondary} textAnchor="middle">
                  场景极罕见——大多数时候你不需要无序+重复；先确认是否真的是这个需求
                </text>
              </g>
            </>
          )}

          <defs>
            <marker id="arrDown" markerWidth="7" markerHeight="7" refX="3.5" refY="6" orient="auto">
              <path d="M0,0 L3.5,6 L7,0" fill={primary} />
            </marker>
            <marker id="arrRight" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L6,3.5 L0,6" fill={warn} />
            </marker>
            <marker id="arrLeft" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <path d="M6,1 L0,3.5 L6,6" fill={good} />
            </marker>
            <marker id="arrRight3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,1 L6,3.5 L0,6" fill={warn} />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1
          ? "第一步：确认是否需要 key→value 映射。不需要？回到顺序容器。"
          : step === 2
            ? "第二步：是需要有序还是无序？有序→红黑树 O(log n)；无序→哈希表均摊 O(1)。"
            : step === 3
              ? "第三步：key 是否可重复？不可重复→set/map；可重复→multiset/multimap。（无序类似的）"
              : "完整决策链：有序容器（set/map/multiset/multimap）vs 无序容器（unordered_...），选对的才能事半功倍。"}
      </figcaption>
    </figure>
  );
}
