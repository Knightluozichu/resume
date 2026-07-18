/**
 * <MementoDiagram>：备忘录模式状态快照图（design-patterns 课程）。
 *
 * 三类协作 + 时间线：
 *   - 左：Originator（持有 state，提供 createMemento / restore）
 *   - 中：Memento（存储 state 快照，不可变）
 *   - 右：Caretaker（维护 memento 栈，只存不读内容）
 *   - 箭头：Originator「创建」→Memento；Caretaker「持有」→Memento；
 *           Memento「恢复」←（虚线回溯）Originator
 *   - 底部时间线：StateA →(snapshot)→ StateB →(undo)→ StateA
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×400（≥660）、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、箭头不戳进盒子、三段垂直分层（标题 / 三类协作 / 时间线+总结）。
 * 间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 400;

// 三个类框（上排）
const ORIGINATOR = { x: 40, y: 68, w: 192, h: 140 };
const MEMENTO = { x: 272, y: 68, w: 176, h: 140 };
const CARETAKER = { x: 504, y: 68, w: 176, h: 140 };

// 时间线三个状态药丸
const PILL_W = 96;
const PILL_H = 40;
const PILL_Y = 296;
const PILL_CENTERS = [152, 360, 568] as const; // StateA1 / StateB / StateA2

const accent = "var(--accent)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const success = "var(--success)";
const warning = "var(--warning)";

export function MementoDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="备忘录模式状态快照图。左上 Originator 类持有 state，提供 createMemento 与 restore 方法；中间 Memento 类存储 state 快照且不可变；右上 Caretaker 类维护 memento 栈，只存不读内容。Originator 以实线箭头标「创建」指向 Memento；Caretaker 以实线箭头标「持有」指向 Memento；Memento 以虚线回溯箭头标「恢复」指向 Originator。底部时间线：StateA 经 snapshot 创建快照变为 StateB，再经 undo 撤销恢复回到 StateA。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            {/* 创建 / 持有：实心三角箭头 */}
            <marker
              id="mem-solid-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={accent} />
            </marker>
            {/* 恢复（虚线回溯）：实心三角箭头 */}
            <marker
              id="mem-restore-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L8 5 L0 10 z" fill={secondary} />
            </marker>
            {/* 时间线箭头 */}
            <marker
              id="mem-flow-arrow"
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
            备忘录模式 · 状态快照
          </text>

          {/* ===== Originator 框 ===== */}
          <g>
            <rect
              x={ORIGINATOR.x}
              y={ORIGINATOR.y}
              width={ORIGINATOR.w}
              height={ORIGINATOR.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={ORIGINATOR.x + ORIGINATOR.w / 2}
              y={ORIGINATOR.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Originator
            </text>
            <line
              x1={ORIGINATOR.x}
              y1={ORIGINATOR.y + 34}
              x2={ORIGINATOR.x + ORIGINATOR.w}
              y2={ORIGINATOR.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={ORIGINATOR.x + 14}
              y={ORIGINATOR.y + 54}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - state: T
            </text>
            <line
              x1={ORIGINATOR.x}
              y1={ORIGINATOR.y + 66}
              x2={ORIGINATOR.x + ORIGINATOR.w}
              y2={ORIGINATOR.y + 66}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={ORIGINATOR.x + 14}
              y={ORIGINATOR.y + 86}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + createMemento()
            </text>
            <text
              x={ORIGINATOR.x + 14}
              y={ORIGINATOR.y + 106}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + restore(m)
            </text>
            <text
              x={ORIGINATOR.x + 14}
              y={ORIGINATOR.y + 126}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"// 写入 / 读出状态"}
            </text>
          </g>

          {/* ===== Memento 框 ===== */}
          <g>
            <rect
              x={MEMENTO.x}
              y={MEMENTO.y}
              width={MEMENTO.w}
              height={MEMENTO.h}
              rx="10"
              fill={accent}
              fillOpacity="0.06"
              stroke={accent}
              strokeWidth="1.8"
            />
            <text
              x={MEMENTO.x + MEMENTO.w / 2}
              y={MEMENTO.y + 22}
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              «value object»
            </text>
            <text
              x={MEMENTO.x + MEMENTO.w / 2}
              y={MEMENTO.y + 40}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
              fontStyle="italic"
              fontFamily="monospace"
            >
              Memento
            </text>
            <line
              x1={MEMENTO.x}
              y1={MEMENTO.y + 50}
              x2={MEMENTO.x + MEMENTO.w}
              y2={MEMENTO.y + 50}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={MEMENTO.x + 14}
              y={MEMENTO.y + 70}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - state: T
            </text>
            <line
              x1={MEMENTO.x}
              y1={MEMENTO.y + 82}
              x2={MEMENTO.x + MEMENTO.w}
              y2={MEMENTO.y + 82}
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={MEMENTO.x + 14}
              y={MEMENTO.y + 102}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + getState()
            </text>
            <text
              x={MEMENTO.x + 14}
              y={MEMENTO.y + 122}
              fontSize="11"
              fill={accent}
              fontStyle="italic"
            >
              {"// 不可变快照"}
            </text>
          </g>

          {/* ===== Caretaker 框 ===== */}
          <g>
            <rect
              x={CARETAKER.x}
              y={CARETAKER.y}
              width={CARETAKER.w}
              height={CARETAKER.h}
              rx="10"
              fill={elevated}
              stroke={border}
              strokeWidth="1.8"
            />
            <text
              x={CARETAKER.x + CARETAKER.w / 2}
              y={CARETAKER.y + 24}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={primary}
              fontFamily="monospace"
            >
              Caretaker
            </text>
            <line
              x1={CARETAKER.x}
              y1={CARETAKER.y + 34}
              x2={CARETAKER.x + CARETAKER.w}
              y2={CARETAKER.y + 34}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CARETAKER.x + 14}
              y={CARETAKER.y + 54}
              fontSize="12"
              fill={secondary}
              fontFamily="monospace"
            >
              - stack: Memento[]
            </text>
            <line
              x1={CARETAKER.x}
              y1={CARETAKER.y + 66}
              x2={CARETAKER.x + CARETAKER.w}
              y2={CARETAKER.y + 66}
              stroke={border}
              strokeWidth="1"
            />
            <text
              x={CARETAKER.x + 14}
              y={CARETAKER.y + 86}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + save(m)
            </text>
            <text
              x={CARETAKER.x + 14}
              y={CARETAKER.y + 106}
              fontSize="12"
              fill={primary}
              fontFamily="monospace"
            >
              + undo(): Memento
            </text>
            <text
              x={CARETAKER.x + 14}
              y={CARETAKER.y + 126}
              fontSize="11"
              fill={secondary}
              fontStyle="italic"
            >
              {"// 只存不读内容"}
            </text>
          </g>

          {/* ===== 创建箭头：Originator → Memento（上半） ===== */}
          <line
            x1={ORIGINATOR.x + ORIGINATOR.w}
            y1={110}
            x2={MEMENTO.x - 2}
            y2={110}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#mem-solid-arrow)"
          />
          <text
            x={(ORIGINATOR.x + ORIGINATOR.w + MEMENTO.x) / 2}
            y="100"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            创建
          </text>

          {/* ===== 持有箭头：Caretaker → Memento（上半） ===== */}
          <line
            x1={CARETAKER.x}
            y1={110}
            x2={MEMENTO.x + MEMENTO.w + 2}
            y2={110}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#mem-solid-arrow)"
          />
          <text
            x={(MEMENTO.x + MEMENTO.w + CARETAKER.x) / 2}
            y="100"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            持有
          </text>

          {/* ===== 恢复箭头：Memento → Originator（下半，虚线回溯） ===== */}
          <line
            x1={MEMENTO.x}
            y1={180}
            x2={ORIGINATOR.x + ORIGINATOR.w + 2}
            y2={180}
            stroke={secondary}
            strokeWidth="1.6"
            strokeDasharray="6 4"
            markerEnd="url(#mem-restore-arrow)"
          />
          <text
            x={(ORIGINATOR.x + ORIGINATOR.w + MEMENTO.x) / 2}
            y="196"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={secondary}
          >
            恢复
          </text>

          {/* ===== 上下分隔线 ===== */}
          <line
            x1="40"
            y1="232"
            x2={VIEW_W - 40}
            y2="232"
            stroke={border}
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* ===== 时间线标签 ===== */}
          <text
            x={VIEW_W / 2}
            y="256"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={primary}
          >
            时间线：状态快照与回溯
          </text>

          {/* ===== 时间线两个箭头 ===== */}
          <line
            x1={PILL_CENTERS[0] + PILL_W / 2}
            y1={316}
            x2={PILL_CENTERS[1] - PILL_W / 2 - 2}
            y2={316}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#mem-flow-arrow)"
          />
          <text
            x={(PILL_CENTERS[0] + PILL_CENTERS[1]) / 2}
            y="288"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            snapshot 创建快照
          </text>

          <line
            x1={PILL_CENTERS[1] + PILL_W / 2}
            y1={316}
            x2={PILL_CENTERS[2] - PILL_W / 2 - 2}
            y2={316}
            stroke={accent}
            strokeWidth="1.8"
            markerEnd="url(#mem-flow-arrow)"
          />
          <text
            x={(PILL_CENTERS[1] + PILL_CENTERS[2]) / 2}
            y="288"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={accent}
          >
            undo 撤销恢复
          </text>

          {/* ===== 三个状态药丸 ===== */}
          {/* StateA1（accent） */}
          <rect
            x={PILL_CENTERS[0] - PILL_W / 2}
            y={PILL_Y}
            width={PILL_W}
            height={PILL_H}
            rx={PILL_H / 2}
            fill={accent}
            fillOpacity="0.1"
            stroke={accent}
            strokeWidth="1.8"
          />
          <text
            x={PILL_CENTERS[0]}
            y={PILL_Y + PILL_H / 2 + 4}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={accent}
            fontFamily="monospace"
          >
            StateA
          </text>

          {/* StateB（warning，已修改） */}
          <rect
            x={PILL_CENTERS[1] - PILL_W / 2}
            y={PILL_Y}
            width={PILL_W}
            height={PILL_H}
            rx={PILL_H / 2}
            fill={warning}
            fillOpacity="0.12"
            stroke={warning}
            strokeWidth="1.8"
          />
          <text
            x={PILL_CENTERS[1]}
            y={PILL_Y + PILL_H / 2 + 4}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={warning}
            fontFamily="monospace"
          >
            StateB
          </text>

          {/* StateA2（success，已恢复） */}
          <rect
            x={PILL_CENTERS[2] - PILL_W / 2}
            y={PILL_Y}
            width={PILL_W}
            height={PILL_H}
            rx={PILL_H / 2}
            fill={success}
            fillOpacity="0.12"
            stroke={success}
            strokeWidth="1.8"
          />
          <text
            x={PILL_CENTERS[2]}
            y={PILL_Y + PILL_H / 2 + 4}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={success}
            fontFamily="monospace"
          >
            StateA
          </text>

          {/* ===== 底部总结 ===== */}
          <text
            x={VIEW_W / 2}
            y="372"
            textAnchor="middle"
            fontSize="12"
            fill={secondary}
          >
            备忘录：捕获并外部化对象状态——在不破坏封装的前提下实现撤销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Originator 自己创建 / 读取快照，Caretaker 只负责保管 Memento
        而不窥探其内容。状态被外部化到 Memento 中，Originator
        的封装不被打破——这正是「撤销」机制的经典实现。
      </figcaption>
    </figure>
  );
}
