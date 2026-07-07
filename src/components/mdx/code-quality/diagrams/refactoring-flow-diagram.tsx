/**
 * <RefactoringFlowDiagram>：辅图——「重构流程图」。
 *
 * 安全重构的五步循环：
 *  ①识别异味 → ②写测试 → ③小步重构 → ④运行测试 → ⑤提交
 *
 * 上排三步（①②③）从左到右，下排两步（④⑤）从右到左，
 * ⑤→① 弯曲箭头闭合循环。
 *
 * 底部标注「每次重构后代码必须仍能工作——这是安全重构的核心」。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const NODE_W = 140;
const NODE_H = 52;

// 上排
const N1_X = 60;
const N2_X = 290;
const N3_X = 520;
const TOP_Y = 120;

// 下排
const N4_X = 520;
const N5_X = 290;
const BOT_Y = 260;

interface FlowNode {
  num: string;
  label: string;
  desc: string;
  x: number;
  y: number;
}

const nodes: FlowNode[] = [
  { num: "1", label: "识别异味", desc: "发现坏味道", x: N1_X, y: TOP_Y },
  { num: "2", label: "写测试", desc: "建立安全网", x: N2_X, y: TOP_Y },
  { num: "3", label: "小步重构", desc: "一次一小步", x: N3_X, y: TOP_Y },
  { num: "4", label: "运行测试", desc: "确认未破坏", x: N4_X, y: BOT_Y },
  { num: "5", label: "提交", desc: "保存进度", x: N5_X, y: BOT_Y },
];

export function RefactoringFlowDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="重构流程循环图。五步循环：第一步识别异味，第二步写测试，第三步小步重构，第四步运行测试，第五步提交。上排三步从左到右，下排两步从右到左，第五步到第一步有弯曲箭头闭合循环。底部标注每次重构后代码必须仍能工作。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            安全重构：五步循环
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            每一步都小到不会出错——出错就回退上一步
          </text>

          {/* ===== 节点 ===== */}
          {nodes.map((n) => (
            <g key={`node-${n.num}`}>
              <rect
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill="var(--accent)"
                fillOpacity="0.1"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text x={n.x + 14} y={n.y + 24} fontSize="13" fontWeight="700" fill="var(--accent)">
                {n.num}
              </text>
              <text x={n.x + 32} y={n.y + 24} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                {n.label}
              </text>
              <text x={n.x + 14} y={n.y + 42} fontSize="11" fill="var(--text-secondary)">
                {n.desc}
              </text>
            </g>
          ))}

          {/* ===== 箭头连接 ===== */}
          {/* ① → ② */}
          <line
            x1={N1_X + NODE_W}
            y1={TOP_Y + NODE_H / 2}
            x2={N2_X}
            y2={TOP_Y + NODE_H / 2}
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#rf-arrow)"
          />
          {/* ② → ③ */}
          <line
            x1={N2_X + NODE_W}
            y1={TOP_Y + NODE_H / 2}
            x2={N3_X}
            y2={TOP_Y + NODE_H / 2}
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#rf-arrow)"
          />
          {/* ③ → ④ (向下) */}
          <line
            x1={N3_X + NODE_W / 2}
            y1={TOP_Y + NODE_H}
            x2={N4_X + NODE_W / 2}
            y2={BOT_Y}
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#rf-arrow)"
          />
          {/* ④ → ⑤ (向左) */}
          <line
            x1={N4_X}
            y1={BOT_Y + NODE_H / 2}
            x2={N5_X + NODE_W}
            y2={BOT_Y + NODE_H / 2}
            stroke="var(--accent)"
            strokeWidth="1.8"
            markerEnd="url(#rf-arrow)"
          />
          {/* ⑤ → ① (弯曲回环) */}
          <path
            d={`M ${N5_X} ${BOT_Y + NODE_H / 2} C ${N1_X + 40} ${BOT_Y + NODE_H / 2}, ${N1_X} ${BOT_Y}, ${N1_X} ${TOP_Y + NODE_H}`}
            fill="none"
            stroke="var(--success)"
            strokeWidth="1.8"
            strokeDasharray="5 3"
            markerEnd="url(#rf-arrow-success)"
          />
          <text x={N1_X - 8} y={(TOP_Y + BOT_Y) / 2 + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--success)">
            循环
          </text>

          {/* 底部总结 */}
          <line x1={40} y1={348} x2={VIEW_W - 40} y2={348} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={372} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            每次重构后代码必须仍能工作——这是安全重构的核心
          </text>
          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            测试是安全网 · 小步是防弹衣 · 提交是存档点
          </text>

          <defs>
            <marker id="rf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker id="rf-arrow-success" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        安全重构的五步循环：先识别代码异味，写测试建立安全网，然后小步重构，
        每步后运行测试确认未破坏功能，最后提交保存进度。循环往复，代码始终处于可工作状态。
      </figcaption>
    </figure>
  );
}
