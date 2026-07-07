/**
 * <TestPyramidDiagram>：辅图——「测试金字塔图」。
 *
 * 金字塔三层（从下到上）：
 *  底部「单元测试」（success 绿）：宽，数量多，速度快。
 *  中间「集成测试」（warning 黄）：中等。
 *  顶部「端到端测试」（danger 红）：窄，数量少，速度慢。
 *
 * 右侧标注每层特点：速度、成本、数量、信心。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 440;

// 金字塔坐标（中心 X=220）
const PY_BOT_Y = 360;
const PY_MID_Y = 260;
const PY_TOP_Y = 160;
const PY_APEX_Y = 100;

const PY_BOT_W = 320; // 底部宽
const PY_MID_W = 220; // 中间宽
const PY_TOP_W = 120; // 顶部宽
const PY_CX = 220;

// 右侧标注
const NOTE_X = 440;
const NOTE_W = 240;

interface PyramidLayer {
  label: string;
  color: string;
  fillOpacity: string;
  speed: string;
  cost: string;
  count: string;
  confidence: string;
}

const layers: PyramidLayer[] = [
  {
    label: "端到端测试 (E2E)",
    color: "var(--danger)",
    fillOpacity: "0.1",
    speed: "速度：慢",
    cost: "成本：高",
    count: "数量：少",
    confidence: "信心：最高",
  },
  {
    label: "集成测试",
    color: "var(--warning)",
    fillOpacity: "0.1",
    speed: "速度：中",
    cost: "成本：中",
    count: "数量：中",
    confidence: "信心：较高",
  },
  {
    label: "单元测试",
    color: "var(--success)",
    fillOpacity: "0.1",
    speed: "速度：快",
    cost: "成本：低",
    count: "数量：多",
    confidence: "信心：基础",
  },
];

export function CqrTestPyramidDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="测试金字塔图。金字塔分三层：底部最宽是单元测试，绿色，速度快成本低数量多；中间是集成测试，黄色，速度成本数量均中等；顶部最窄是端到端测试，红色，速度慢成本高数量少但信心最高。右侧标注每层的速度、成本、数量和信心。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            测试金字塔
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            底多顶少——用大量单元测试筑基，少量 E2E 覆盖关键路径
          </text>

          {/* ===== 顶部层（E2E） ===== */}
          <polygon
            points={`${PY_CX - PY_TOP_W / 2},${PY_TOP_Y} ${PY_CX + PY_TOP_W / 2},${PY_TOP_Y} ${PY_CX + PY_MID_W / 2},${PY_MID_Y} ${PY_CX - PY_MID_W / 2},${PY_MID_Y}`}
            fill="var(--danger)"
            fillOpacity="0.1"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <text x={PY_CX} y={(PY_TOP_Y + PY_MID_Y) / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">
            E2E
          </text>

          {/* ===== 中间层（集成） ===== */}
          <polygon
            points={`${PY_CX - PY_MID_W / 2},${PY_MID_Y} ${PY_CX + PY_MID_W / 2},${PY_MID_Y} ${PY_CX + PY_BOT_W / 2},${PY_BOT_Y} ${PY_CX - PY_BOT_W / 2},${PY_BOT_Y}`}
            fill="var(--warning)"
            fillOpacity="0.1"
            stroke="var(--warning)"
            strokeWidth="1.5"
          />
          <text x={PY_CX} y={(PY_MID_Y + PY_BOT_Y) / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">
            集成测试
          </text>

          {/* 底部基线 */}
          <line x1={PY_CX - PY_BOT_W / 2 - 12} y1={PY_BOT_Y} x2={PY_CX + PY_BOT_W / 2 + 12} y2={PY_BOT_Y} stroke="var(--border)" strokeWidth="1.5" />

          {/* 金字塔左侧标签（旋转） */}
          <text x={PY_CX - PY_BOT_W / 2 - 20} y={PY_BOT_Y - 4} textAnchor="end" fontSize="12" fontWeight="700" fill="var(--success)">
            单元测试
          </text>
          <text x={PY_CX - PY_BOT_W / 2 - 20} y={PY_BOT_Y + 16} textAnchor="end" fontSize="11" fill="var(--text-secondary)">
            （最宽 · 最多）
          </text>

          {/* ===== 右侧标注 ===== */}
          {layers.map((layer, i) => {
            const yCenter = i === 0 ? (PY_TOP_Y + PY_MID_Y) / 2 : i === 1 ? (PY_MID_Y + PY_BOT_Y) / 2 : PY_BOT_Y + 24;
            return (
              <g key={`note-${i}`}>
                <line
                  x1={i === 2 ? PY_CX + PY_BOT_W / 2 : PY_CX + (i === 0 ? PY_MID_W : PY_BOT_W) / 2}
                  y1={yCenter}
                  x2={NOTE_X}
                  y2={yCenter}
                  stroke={layer.color}
                  strokeWidth="1"
                  strokeDasharray="3 2"
                  opacity="0.5"
                />
                <rect
                  x={NOTE_X}
                  y={yCenter - 36}
                  width={NOTE_W}
                  height={72}
                  rx="8"
                  fill={layer.color}
                  fillOpacity="0.06"
                  stroke={layer.color}
                  strokeWidth="1.5"
                />
                <text x={NOTE_X + 12} y={yCenter - 18} fontSize="12" fontWeight="700" fill={layer.color}>
                  {layer.label}
                </text>
                <text x={NOTE_X + 12} y={yCenter} fontSize="11" fill="var(--text-secondary)">
                  {layer.speed} · {layer.cost}
                </text>
                <text x={NOTE_X + 12} y={yCenter + 16} fontSize="11" fill="var(--text-secondary)">
                  {layer.count} · {layer.confidence}
                </text>
              </g>
            );
          })}

          {/* 底部总结 */}
          <text x={VIEW_W / 2} y={VIEW_H - 16} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            金字塔越往上越慢越贵——大量单元测试保证快速反馈，E2E 只覆盖核心流程
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试金字塔的核心原则：底层单元测试数量最多、速度最快、成本最低，是整个测试体系的基石；
        中间集成测试验证模块协作；顶层端到端测试数量最少但信心最高，只覆盖关键用户路径。
      </figcaption>
    </figure>
  );
}
