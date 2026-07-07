/**
 * <DirtyFlagDiagram>：脏标记模式流程图（game-programming-patterns 课程）。
 *
 * 上方三段流程：状态变更（多次修改）→ dirty 标记（旗帜图标，false→true，danger 高亮）
 * → 同步/渲染（仅 dirty=true 时执行）。
 * 下方时间线：t1 修改→dirty=true、t2 修改→dirty 仍 true（不重复渲染）、t3 渲染→dirty=false。
 * t1–t2 下方花括号标注「两次修改，不重复渲染」。
 * 底部总结：合并多次修改为一次渲染——避免冗余计算。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×380、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 流程+时间线 / 底部总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 380;

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const danger = "var(--danger)";
const success = "var(--success)";

// 三段流程框
const FLOW_Y = 84;
const FLOW_H = 84;
const BOX_W = 168;
const STATE_BOX = { x: 64, y: FLOW_Y, w: BOX_W, h: FLOW_H };
const DIRTY_BOX = { x: 276, y: FLOW_Y, w: BOX_W, h: FLOW_H };
const SYNC_BOX = { x: 488, y: FLOW_Y, w: BOX_W, h: FLOW_H };

// 时间线
const TL_LINE_Y = 214;
const TL_X1 = 96;
const TL_X2 = 624;
const TICKS = [
  { x: 176, label: "t1", action: "状态修改", state: "dirty = true", color: danger },
  { x: 360, label: "t2", action: "状态修改", state: "dirty 仍 true", color: danger },
  { x: 544, label: "t3", action: "触发渲染", state: "dirty = false", color: success },
];

export function DirtyFlagDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="脏标记模式流程图。上方三段流程：左侧状态变更（多次修改），中间 dirty 标记（旗帜图标从 false 变 true，红色高亮），右侧同步/渲染（仅 dirty=true 时执行）。箭头标注置脏、检查。下方时间线：t1 状态修改后 dirty 等于 true（红）；t2 再次状态修改，dirty 仍为 true，不重复渲染（红）；t3 触发渲染后 dirty 等于 false（绿）。t1 到 t2 下方花括号标注两次修改不重复渲染。底部总结：合并多次修改为一次渲染，避免冗余计算。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="df-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
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
            脏标记 · 流程图
          </text>
          <text
            x={VIEW_W / 2}
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            多次修改只触发一次同步——用标记合并工作
          </text>

          {/* ===== 状态变更框 ===== */}
          <g>
            <rect
              x={STATE_BOX.x}
              y={STATE_BOX.y}
              width={STATE_BOX.w}
              height={STATE_BOX.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={STATE_BOX.x + STATE_BOX.w / 2}
              y={STATE_BOX.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
            >
              状态变更
            </text>
            <line
              x1={STATE_BOX.x}
              y1={STATE_BOX.y + 32}
              x2={STATE_BOX.x + STATE_BOX.w}
              y2={STATE_BOX.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={STATE_BOX.x + STATE_BOX.w / 2}
              y={STATE_BOX.y + 54}
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              多次修改
            </text>
            <text
              x={STATE_BOX.x + STATE_BOX.w / 2}
              y={STATE_BOX.y + 72}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill={secondary}
              fontFamily="monospace"
            >
              state++
            </text>
          </g>

          {/* ===== dirty 标记框 ===== */}
          <g>
            <rect
              x={DIRTY_BOX.x}
              y={DIRTY_BOX.y}
              width={DIRTY_BOX.w}
              height={DIRTY_BOX.h}
              rx="10"
              fill={danger}
              fillOpacity="0.06"
              stroke={danger}
              strokeWidth="1.6"
              strokeOpacity="0.5"
            />
            <text
              x={DIRTY_BOX.x + DIRTY_BOX.w / 2}
              y={DIRTY_BOX.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
            >
              dirty 标记
            </text>
            <line
              x1={DIRTY_BOX.x}
              y1={DIRTY_BOX.y + 32}
              x2={DIRTY_BOX.x + DIRTY_BOX.w}
              y2={DIRTY_BOX.y + 32}
              stroke={danger}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            {/* 旗帜图标 */}
            <line
              x1={DIRTY_BOX.x + 44}
              y1={DIRTY_BOX.y + 44}
              x2={DIRTY_BOX.x + 44}
              y2={DIRTY_BOX.y + 76}
              stroke={secondary}
              strokeWidth="2"
            />
            <path
              d={`M${DIRTY_BOX.x + 44} ${DIRTY_BOX.y + 44} L${DIRTY_BOX.x + 76} ${DIRTY_BOX.y + 52} L${DIRTY_BOX.x + 44} ${DIRTY_BOX.y + 60} Z`}
              fill={danger}
            />
            <text
              x={DIRTY_BOX.x + 92}
              y={DIRTY_BOX.y + 58}
              fontSize="12"
              fontWeight="700"
              fill={danger}
              fontFamily="monospace"
            >
              dirty = true
            </text>
            <text
              x={DIRTY_BOX.x + 92}
              y={DIRTY_BOX.y + 74}
              fontSize="11"
              fill={secondary}
            >
              false → true
            </text>
          </g>

          {/* ===== 同步/渲染框 ===== */}
          <g>
            <rect
              x={SYNC_BOX.x}
              y={SYNC_BOX.y}
              width={SYNC_BOX.w}
              height={SYNC_BOX.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={SYNC_BOX.x + SYNC_BOX.w / 2}
              y={SYNC_BOX.y + 24}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
            >
              同步 / 渲染
            </text>
            <line
              x1={SYNC_BOX.x}
              y1={SYNC_BOX.y + 32}
              x2={SYNC_BOX.x + SYNC_BOX.w}
              y2={SYNC_BOX.y + 32}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={SYNC_BOX.x + SYNC_BOX.w / 2}
              y={SYNC_BOX.y + 54}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={accent}
            >
              仅 dirty=true 时执行
            </text>
            <text
              x={SYNC_BOX.x + SYNC_BOX.w / 2}
              y={SYNC_BOX.y + 72}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill={secondary}
            >
              否则跳过
            </text>
          </g>

          {/* ===== 流程箭头 ===== */}
          <line
            x1={STATE_BOX.x + STATE_BOX.w + 4}
            y1={FLOW_Y + FLOW_H / 2}
            x2={DIRTY_BOX.x - 4}
            y2={FLOW_Y + FLOW_H / 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#df-arrow)"
          />
          <text
            x={(STATE_BOX.x + STATE_BOX.w + DIRTY_BOX.x) / 2}
            y={FLOW_Y + FLOW_H / 2 - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
          >
            置脏
          </text>

          <line
            x1={DIRTY_BOX.x + DIRTY_BOX.w + 4}
            y1={FLOW_Y + FLOW_H / 2}
            x2={SYNC_BOX.x - 4}
            y2={FLOW_Y + FLOW_H / 2}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#df-arrow)"
          />
          <text
            x={(DIRTY_BOX.x + DIRTY_BOX.w + SYNC_BOX.x) / 2}
            y={FLOW_Y + FLOW_H / 2 - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={accent}
          >
            检查
          </text>

          {/* ===== 时间线 ===== */}
          <text
            x={VIEW_W / 2}
            y="194"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={secondary}
          >
            时间线
          </text>
          <line
            x1={TL_X1}
            y1={TL_LINE_Y}
            x2={TL_X2}
            y2={TL_LINE_Y}
            stroke={border}
            strokeWidth="1.6"
          />
          {TICKS.map((t) => (
            <g key={t.label}>
              {/* tick 竖线 */}
              <line
                x1={t.x}
                y1={TL_LINE_Y - 6}
                x2={t.x}
                y2={TL_LINE_Y + 6}
                stroke={secondary}
                strokeWidth="1.6"
              />
              {/* tick 标签 */}
              <text
                x={t.x}
                y={TL_LINE_Y - 12}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={accent}
              >
                {t.label}
              </text>
              {/* 动作 */}
              <text
                x={t.x}
                y={TL_LINE_Y + 24}
                textAnchor="middle"
                fontSize="12"
                fill={primary}
              >
                {t.action}
              </text>
              {/* 状态 */}
              <text
                x={t.x}
                y={TL_LINE_Y + 42}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={t.color}
                fontFamily="monospace"
              >
                {t.state}
              </text>
            </g>
          ))}

          {/* ===== t1–t2 花括号：两次修改不重复渲染 ===== */}
          <line
            x1={TICKS[0].x}
            y1={274}
            x2={TICKS[1].x}
            y2={274}
            stroke={secondary}
            strokeWidth="1.4"
          />
          <line
            x1={TICKS[0].x}
            y1={270}
            x2={TICKS[0].x}
            y2={274}
            stroke={secondary}
            strokeWidth="1.4"
          />
          <line
            x1={TICKS[1].x}
            y1={270}
            x2={TICKS[1].x}
            y2={274}
            stroke={secondary}
            strokeWidth="1.4"
          />
          <text
            x={(TICKS[0].x + TICKS[1].x) / 2}
            y={290}
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            两次修改，不重复渲染
          </text>

          {/* ===== 底部总结栏 ===== */}
          <rect
            x="80"
            y="304"
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
            y="329"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            合并多次修改为一次渲染——避免冗余计算
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        脏标记把「状态变了」和「重新计算」解耦：修改时只置脏，真正的同步/渲染推迟到下次检查时统一做一次。连续修改不会触发重复计算，只在确实需要时才付出开销。
      </figcaption>
    </figure>
  );
}
