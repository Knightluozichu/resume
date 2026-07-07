/**
 * <ObjectPoolDiagram>：对象池模式循环图（game-programming-patterns 课程）。
 *
 * 中央 ObjectPool 池（5 个预分配对象格子，交替空闲/占用）。
 * 左侧 acquire() 箭头（从池取出对象，标注「不 new」）。
 * 右侧 release() 箭头（归还对象，标注「不 delete」）。
 * 底部对比：「new/delete 每帧」（danger，GC 压力）vs「池化复用」（success，零分配）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×340、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 池主体 / 底部对比+总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 340;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const danger = "var(--danger)";
const success = "var(--success)";

// ObjectPool 框
const POOL = { x: 200, y: 80, w: 320, h: 96 };
const poolCx = POOL.x + POOL.w / 2; // 360

// 池内 5 个对象格子
const CELL_W = 48;
const CELL_H = 48;
const CELL_GAP = 8;
const CELL_Y = 116;
const CELLS = [
  { state: "空闲", color: success },
  { state: "占用", color: accent },
  { state: "空闲", color: success },
  { state: "占用", color: accent },
  { state: "空闲", color: success },
];
const cellX = (i: number) =>
  POOL.x + (POOL.w - (CELLS.length * CELL_W + (CELLS.length - 1) * CELL_GAP)) / 2 + i * (CELL_W + CELL_GAP);
const cellCx = (i: number) => cellX(i) + CELL_W / 2;

// acquire / release 箭头 y（池垂直中心）
const ARROW_Y = POOL.y + POOL.h / 2; // 128

// 对比框
const COMPARE_Y = 196;
const COMPARE_H = 56;
const NEW_BOX = { x: 80, y: COMPARE_Y, w: 260, h: COMPARE_H };
const POOL_CMP_BOX = { x: 380, y: COMPARE_Y, w: 260, h: COMPARE_H };

export function ObjectPoolDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="对象池模式循环图。中央 ObjectPool 池含 5 个预分配对象格子，交替显示空闲（绿）与占用（紫）。左侧 acquire 箭头从池中取出对象，标注不 new。右侧 release 箭头归还对象到池中，标注不 delete。底部对比：左侧 new/delete 每帧（红，GC 压力、分配开销），右侧池化复用（绿，零分配、零 GC），中间 VS。底部总结：对象池预分配加复用，避开运行期分配开销。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* acquire 箭头（指向左，取出） */}
            <marker
              id="op-acquire-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
            {/* release 箭头（指向左，归还入池） */}
            <marker
              id="op-release-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={success} />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={VIEW_W / 2}
            y="36"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={primary}
          >
            对象池 · 循环复用
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            预分配对象，acquire 取出 / release 归还，零分配复用
          </text>

          {/* ===== ObjectPool 池 ===== */}
          <g>
            <rect
              x={POOL.x}
              y={POOL.y}
              width={POOL.w}
              height={POOL.h}
              rx="10"
              fill="var(--bg)"
              stroke={accent}
              strokeWidth="1.6"
              strokeOpacity="0.6"
            />
            <text
              x={poolCx}
              y={POOL.y + 20}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              ObjectPool
            </text>
            <line
              x1={POOL.x}
              y1={POOL.y + 28}
              x2={POOL.x + POOL.w}
              y2={POOL.y + 28}
              stroke={border}
              strokeWidth="1"
            />
            {/* 5 个对象格子 */}
            {CELLS.map((c, i) => (
              <g key={i}>
                <rect
                  x={cellX(i)}
                  y={CELL_Y}
                  width={CELL_W}
                  height={CELL_H}
                  rx="6"
                  fill={c.color}
                  fillOpacity="0.12"
                  stroke={c.color}
                  strokeWidth="1.4"
                />
                <text
                  x={cellCx(i)}
                  y={CELL_Y + CELL_H / 2 - 2}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={c.color}
                >
                  {c.state}
                </text>
                <text
                  x={cellCx(i)}
                  y={CELL_Y + CELL_H / 2 + 14}
                  textAnchor="middle"
                  fontSize="10"
                  fill={secondary}
                  fontFamily="monospace"
                >
                  obj{i + 1}
                </text>
              </g>
            ))}
          </g>

          {/* ===== acquire 箭头（左，从池取出） ===== */}
          <line
            x1={POOL.x - 4}
            y1={ARROW_Y}
            x2={84}
            y2={ARROW_Y}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#op-acquire-arrow)"
          />
          <text
            x={(84 + POOL.x) / 2}
            y={ARROW_Y - 10}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
            fontFamily="monospace"
          >
            acquire()
          </text>
          <text
            x={(84 + POOL.x) / 2}
            y={ARROW_Y + 20}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            取出 · 不 new
          </text>

          {/* ===== release 箭头（右，归还入池） ===== */}
          <line
            x1={636}
            y1={ARROW_Y}
            x2={POOL.x + POOL.w + 4}
            y2={ARROW_Y}
            stroke={success}
            strokeWidth="1.8"
            markerEnd="url(#op-release-arrow)"
          />
          <text
            x={(POOL.x + POOL.w + 636) / 2}
            y={ARROW_Y - 10}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={success}
            fontFamily="monospace"
          >
            release()
          </text>
          <text
            x={(POOL.x + POOL.w + 636) / 2}
            y={ARROW_Y + 20}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            归还 · 不 delete
          </text>

          {/* ===== 底部对比 ===== */}
          {/* new/delete 每帧（danger） */}
          <g>
            <rect
              x={NEW_BOX.x}
              y={NEW_BOX.y}
              width={NEW_BOX.w}
              height={NEW_BOX.h}
              rx="10"
              fill={danger}
              fillOpacity="0.06"
              stroke={danger}
              strokeWidth="1.4"
              strokeOpacity="0.4"
            />
            <text
              x={NEW_BOX.x + NEW_BOX.w / 2}
              y={NEW_BOX.y + 24}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={danger}
              fontFamily="monospace"
            >
              new / delete 每帧
            </text>
            <text
              x={NEW_BOX.x + NEW_BOX.w / 2}
              y={NEW_BOX.y + 42}
              textAnchor="middle"
              fontSize="11"
              fill={danger}
            >
              GC 压力 · 分配开销
            </text>
          </g>

          {/* VS */}
          <text
            x={(NEW_BOX.x + NEW_BOX.w + POOL_CMP_BOX.x) / 2}
            y={NEW_BOX.y + COMPARE_H / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={secondary}
          >
            VS
          </text>

          {/* 池化复用（success） */}
          <g>
            <rect
              x={POOL_CMP_BOX.x}
              y={POOL_CMP_BOX.y}
              width={POOL_CMP_BOX.w}
              height={POOL_CMP_BOX.h}
              rx="10"
              fill={success}
              fillOpacity="0.06"
              stroke={success}
              strokeWidth="1.4"
              strokeOpacity="0.4"
            />
            <text
              x={POOL_CMP_BOX.x + POOL_CMP_BOX.w / 2}
              y={POOL_CMP_BOX.y + 24}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={success}
            >
              池化复用
            </text>
            <text
              x={POOL_CMP_BOX.x + POOL_CMP_BOX.w / 2}
              y={POOL_CMP_BOX.y + 42}
              textAnchor="middle"
              fontSize="11"
              fill={success}
            >
              零分配 · 零 GC
            </text>
          </g>

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="272"
            width={VIEW_W - 160}
            height="40"
            rx="10"
            fill={accent}
            fillOpacity="0.06"
            stroke={accent}
            strokeWidth="1.4"
            strokeOpacity="0.4"
          />
          <text
            x={VIEW_W / 2}
            y="297"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            对象池：预分配 + 复用，避开运行期分配开销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        对象池在初始化时一次性分配好所需对象，运行期通过 acquire/release 借还，不再触发 new/delete。换取的是确定的内存占用和零分配延迟——子弹、粒子等高频生灭对象的标准做法。
      </figcaption>
    </figure>
  );
}
