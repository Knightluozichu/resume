/**
 * <FunctionAnatomyDiagram>：辅图——「函数解剖图」。
 *
 * 左侧「理想函数」（accent 紫）：三层结构
 *  顶部：函数名 = 动词 + 对象（calculateTotalPrice）
 *  中间：参数 ≤ 3 个
 *  底部：单一职责 · 20 行以内 · 无副作用
 *
 * 右侧「坏函数」（danger 红）：50+ 行 / 5 参数 / 3 职责 / 副作用。
 * 中间双向箭头标注「对比」。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const LEFT_X = 40;
const LEFT_W = 280;
const RIGHT_X = 400;
const RIGHT_W = 280;

const LAYER_H = 72;
const LAYER_GAP = 8;
const LAYER_START_Y = 100;

function layerY(index: number): number {
  return LAYER_START_Y + index * (LAYER_H + LAYER_GAP);
}

export function FunctionAnatomyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="函数解剖图。左侧理想函数分三层：顶部函数名等于动词加对象如 calculateTotalPrice，中间参数不超过三个，底部单一职责且二十行以内无副作用。右侧坏函数用红色标注五十行以上、五个参数、三个职责、有副作用、难以测试、修改一处牵全身。中间双向箭头标注对比。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            函数解剖：理想 vs 糟糕
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            短小、纯粹、只做一件事——好函数的三大特征
          </text>

          {/* 列标题 */}
          <text x={LEFT_X + LEFT_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
            理想函数
          </text>
          <text x={RIGHT_X + RIGHT_W / 2} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">
            坏函数
          </text>

          {/* ===== 左侧三层 ===== */}
          {/* 层1：函数名 */}
          <rect
            x={LEFT_X}
            y={layerY(0)}
            width={LEFT_W}
            height={LAYER_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text x={LEFT_X + 16} y={layerY(0) + 26} fontSize="13" fontWeight="600" fill="var(--text-primary)">
            函数名 = 动词 + 对象
          </text>
          <text x={LEFT_X + 16} y={layerY(0) + 52} fontSize="14" fontWeight="700" fill="var(--accent)" fontFamily="monospace">
            calculateTotalPrice()
          </text>

          {/* 层2：参数 */}
          <rect
            x={LEFT_X}
            y={layerY(1)}
            width={LEFT_W}
            height={LAYER_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text x={LEFT_X + 16} y={layerY(1) + 26} fontSize="13" fontWeight="600" fill="var(--text-primary)">
            参数 ≤ 3 个
          </text>
          <text x={LEFT_X + 16} y={layerY(1) + 52} fontSize="13" fill="var(--accent)" fontFamily="monospace">
            (items, discount, taxRate)
          </text>

          {/* 层3：职责 */}
          <rect
            x={LEFT_X}
            y={layerY(2)}
            width={LEFT_W}
            height={LAYER_H}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.1"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <text x={LEFT_X + 16} y={layerY(2) + 26} fontSize="13" fontWeight="600" fill="var(--text-primary)">
            单一职责
          </text>
          <text x={LEFT_X + 16} y={layerY(2) + 52} fontSize="12" fill="var(--text-secondary)">
            20 行以内 · 无副作用
          </text>

          {/* ===== 右侧坏函数大框 ===== */}
          <rect
            x={RIGHT_X}
            y={LAYER_START_Y}
            width={RIGHT_W}
            height={LAYER_H * 3 + LAYER_GAP * 2}
            rx="8"
            fill="var(--danger)"
            fillOpacity="0.06"
            stroke="var(--danger)"
            strokeWidth="1.5"
          />
          <text x={RIGHT_X + 16} y={LAYER_START_Y + 28} fontSize="14" fontWeight="700" fill="var(--danger)">
            坏函数
          </text>
          <text x={RIGHT_X + 16} y={LAYER_START_Y + 56} fontSize="12" fill="var(--text-primary)">
            50+ 行，读完就忘
          </text>
          <text x={RIGHT_X + 16} y={LAYER_START_Y + 84} fontSize="12" fill="var(--text-primary)">
            5 个参数，顺序难记
          </text>
          <text x={RIGHT_X + 16} y={LAYER_START_Y + 112} fontSize="12" fill="var(--text-primary)">
            3 个职责混在一起
          </text>
          <text x={RIGHT_X + 16} y={LAYER_START_Y + 140} fontSize="12" fill="var(--text-primary)">
            有隐藏副作用
          </text>
          <text x={RIGHT_X + 16} y={LAYER_START_Y + 168} fontSize="12" fill="var(--text-primary)">
            难以理解与测试
          </text>
          <text x={RIGHT_X + 16} y={LAYER_START_Y + 196} fontSize="12" fill="var(--text-primary)">
            修改一处牵动全身
          </text>

          {/* 中间双向箭头 */}
          <line
            x1={LEFT_X + LEFT_W + 8}
            y1={216}
            x2={RIGHT_X - 8}
            y2={216}
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            markerEnd="url(#fa-arrow-r)"
            markerStart="url(#fa-arrow-l)"
          />
          <text x={360} y={210} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            对比
          </text>

          {/* 底部总结 */}
          <line x1={40} y1={356} x2={VIEW_W - 40} y2={356} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={380} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            函数应该做一件事、做好这件事、只做这一件事
          </text>

          <defs>
            <marker id="fa-arrow-r" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
              <path d="M0 0 L5 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="fa-arrow-l" markerWidth="7" markerHeight="7" refX="2" refY="3" orient="auto-start-reverse">
              <path d="M5 0 L0 3 L5 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        理想函数有清晰的名字（动词加对象）、少量参数、单一职责且无副作用。
        坏函数则相反：冗长、参数多、职责混乱、有副作用，导致难以理解和测试。
      </figcaption>
    </figure>
  );
}
