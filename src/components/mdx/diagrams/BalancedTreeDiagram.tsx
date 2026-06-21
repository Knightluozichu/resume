/**
 * <BalancedTreeDiagram>：Grokking Algorithms — AVL 树右旋恢复平衡。
 *
 * 三面板展示：Panel 1 插入 10 后失衡 → Panel 2 右旋操作说明 → Panel 3 平衡恢复。
 * 全部使用 DESIGN token，无魔法数字。
 * Server Component（纯 SVG，无 "use client"）。
 */

const VIEW_W = 700;
const VIEW_H = 480;

const PANEL_W = 194;
const PANEL_H = 340;
const PANEL_TOP = 60;
const PANEL_GAP = 27;

const P1_X = 32;
const P1_CX = P1_X + PANEL_W / 2;
const P2_X = P1_X + PANEL_W + PANEL_GAP;
const P2_CX = P2_X + PANEL_W / 2;
const P3_X = P2_X + PANEL_W + PANEL_GAP;
const P3_CX = P3_X + PANEL_W / 2;

const NODE_R = 18;

const ARIA =
  "AVL 树右旋恢复平衡示意图。面板一：插入节点 10 后，节点 20 左重失衡。" +
  "面板二：右旋操作说明——15 上升为根、20 降为右子、17 移到 20 左侧。" +
  "面板三：旋转后平衡恢复，15 成为新根。";

export function BalancedTreeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={ARIA}
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          <defs>
            <marker
              id="bt-arrow-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
            <marker
              id="bt-arrow-success"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="bt-arrow-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题层 (R10) ===== */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            AVL 树：右旋恢复平衡
          </text>

          {/* ===== 面板说明 ===== */}
          <text
            x={P1_CX}
            y={PANEL_TOP - 8}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            插入 10 后失衡
          </text>
          <text
            x={P2_CX}
            y={PANEL_TOP - 8}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--accent)"
          >
            右旋操作
          </text>
          <text
            x={P3_CX}
            y={PANEL_TOP - 8}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            平衡恢复
          </text>

          {/* ===== 面板边框 ===== */}
          <rect
            x={P1_X}
            y={PANEL_TOP}
            width={PANEL_W}
            height={PANEL_H}
            rx="10"
            fill="none"
            stroke="var(--warning)"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
          <rect
            x={P2_X}
            y={PANEL_TOP}
            width={PANEL_W}
            height={PANEL_H}
            rx="10"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
          <rect
            x={P3_X}
            y={PANEL_TOP}
            width={PANEL_W}
            height={PANEL_H}
            rx="10"
            fill="none"
            stroke="var(--success)"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />

          {/* ===== 面板间连接箭头 ===== */}
          <line
            x1={P1_X + PANEL_W + 4}
            y1={PANEL_TOP + PANEL_H / 2}
            x2={P2_X - 8}
            y2={PANEL_TOP + PANEL_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#bt-arrow-warning)"
          />
          <line
            x1={P2_X + PANEL_W + 4}
            y1={PANEL_TOP + PANEL_H / 2}
            x2={P3_X - 8}
            y2={PANEL_TOP + PANEL_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#bt-arrow-success)"
          />

          {/* ================================================================ */}
          {/* Panel 1：插入 10 后失衡                                               */}
          {/* ================================================================ */}

          {/* 边：20 → 15 */}
          <line x1={P1_CX} y1={100 + NODE_R} x2={P1_CX - 40} y2={170 - NODE_R} stroke="var(--border)" strokeWidth="1.5" />
          {/* 边：20 → 25 */}
          <line x1={P1_CX} y1={100 + NODE_R} x2={P1_CX + 40} y2={170 - NODE_R} stroke="var(--border)" strokeWidth="1.5" />
          {/* 边：15 → 10 */}
          <line x1={P1_CX - 40} y1={170 + NODE_R} x2={P1_CX - 70} y2={240 - NODE_R} stroke="var(--border)" strokeWidth="1.5" />
          {/* 边：15 → 17 */}
          <line x1={P1_CX - 40} y1={170 + NODE_R} x2={P1_CX - 10} y2={240 - NODE_R} stroke="var(--border)" strokeWidth="1.5" />

          {/* 节点 20（根，失衡·warning） */}
          <circle cx={P1_CX} cy={100} r={NODE_R} fill="var(--bg)" stroke="var(--warning)" strokeWidth="2.5" />
          <text x={P1_CX} y={105} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">
            20
          </text>

          {/* 节点 15（左子，accent） */}
          <circle cx={P1_CX - 40} cy={170} r={NODE_R} fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x={P1_CX - 40} y={175} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">
            15
          </text>

          {/* 节点 25 */}
          <circle cx={P1_CX + 40} cy={170} r={NODE_R} fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={P1_CX + 40} y={175} textAnchor="middle" fontSize="13" fill="var(--text-primary)">
            25
          </text>

          {/* 节点 10（新插入，danger） */}
          <circle cx={P1_CX - 70} cy={240} r={NODE_R} fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="2.5" />
          <text x={P1_CX - 70} y={245} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">
            10
          </text>

          {/* 节点 17 */}
          <circle cx={P1_CX - 10} cy={240} r={NODE_R} fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={P1_CX - 10} y={245} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            17
          </text>

          {/* "新插入10" 标注（28px below node 10） */}
          <text
            x={P1_CX - 70}
            y={240 + NODE_R + 28}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            新插入 10
          </text>

          {/* 面板底部：失衡说明 */}
          <text
            x={P1_CX}
            y={PANEL_TOP + PANEL_H - 12}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--warning)"
          >
            节点 20 左重失衡
          </text>

          {/* ================================================================ */}
          {/* Panel 2：右旋操作说明                                                    */}
          {/* ================================================================ */}

          <text
            x={P2_CX}
            y={110}
            textAnchor="middle"
            fontSize="13px"
            fontWeight="700"
            fill="var(--accent)"
          >
            ① 右旋 (RR)
          </text>

          {/* 旋转弧形箭头 + 方向标注 */}
          <path
            d={`M ${P2_CX - 60} 175 Q ${P2_CX} 145 ${P2_CX + 60} 175`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            markerEnd="url(#bt-arrow-accent)"
          />
          <text
            x={P2_CX}
            y={132}
            textAnchor="middle"
            fontSize="11px"
            fill="var(--accent)"
          >
            顺时针旋转
          </text>

          {/* 旋转说明文字 */}
          <text
            x={P2_CX}
            y={215}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            15 上升为新根
          </text>

          <text
            x={P2_CX}
            y={255}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--warning)"
          >
            20 降为右子
          </text>

          <text
            x={P2_CX}
            y={295}
            textAnchor="middle"
            fontSize="13"
            fill="var(--text-secondary)"
          >
            17 移到 20 左侧
          </text>

          {/* ================================================================ */}
          {/* Panel 3：平衡恢复                                                      */}
          {/* ================================================================ */}

          {/* 边：15 → 10 */}
          <line x1={P3_CX} y1={100 + NODE_R} x2={P3_CX - 45} y2={170 - NODE_R} stroke="var(--border)" strokeWidth="1.5" />
          {/* 边：15 → 20 */}
          <line x1={P3_CX} y1={100 + NODE_R} x2={P3_CX + 45} y2={170 - NODE_R} stroke="var(--border)" strokeWidth="1.5" />
          {/* 边：20 → 17 */}
          <line x1={P3_CX + 45} y1={170 + NODE_R} x2={P3_CX + 20} y2={240 - NODE_R} stroke="var(--border)" strokeWidth="1.5" />
          {/* 边：20 → 25 */}
          <line x1={P3_CX + 45} y1={170 + NODE_R} x2={P3_CX + 70} y2={240 - NODE_R} stroke="var(--border)" strokeWidth="1.5" />

          {/* 节点 15（新根，success） */}
          <circle cx={P3_CX} cy={100} r={NODE_R} fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="2.5" />
          <text x={P3_CX} y={105} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">
            15
          </text>

          {/* 节点 10 */}
          <circle cx={P3_CX - 45} cy={170} r={NODE_R} fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={P3_CX - 45} y={175} textAnchor="middle" fontSize="13" fill="var(--text-primary)">
            10
          </text>

          {/* 节点 20 */}
          <circle cx={P3_CX + 45} cy={170} r={NODE_R} fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={P3_CX + 45} y={175} textAnchor="middle" fontSize="13" fill="var(--text-primary)">
            20
          </text>

          {/* 节点 17 */}
          <circle cx={P3_CX + 20} cy={240} r={NODE_R} fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={P3_CX + 20} y={245} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            17
          </text>

          {/* 节点 25 */}
          <circle cx={P3_CX + 70} cy={240} r={NODE_R} fill="var(--bg)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={P3_CX + 70} y={245} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            25
          </text>

          {/* 面板底部：平衡说明 */}
          <text
            x={P3_CX}
            y={PANEL_TOP + PANEL_H - 12}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--success)"
          >
            平衡恢复
          </text>

          {/* ===== 底部总结 (R10) ===== */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 26}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            右旋操作：失衡节点的左子上升为根，失衡节点降为右子
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        左重失衡时执行右旋（RR）：以失衡节点 20 的左子 15 为轴顺时针旋转，
        15 成为新根、20 成为 15 的右子、15 原右子 17 移至 20 左子。
      </figcaption>
    </figure>
  );
}
