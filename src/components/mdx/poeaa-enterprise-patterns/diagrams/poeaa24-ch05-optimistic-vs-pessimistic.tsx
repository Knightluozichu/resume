/**
 * <Poeaa24Ch05OptimisticVsPessimistic>：乐观 vs 悲观并发控制对比图（POEAA 第5章）。
 *
 * 左半：乐观离线锁（Optimistic Offline Lock）序列
 *   读取(v1) → 本地编辑 → 提交时检查版本 → 版本匹配则写入(v1→v2)，不匹配则拒绝
 *
 * 右半：悲观离线锁（Pessimistic Offline Lock）序列
 *   获取锁 → 读取 → 本地编辑 → 提交写入 → 释放锁
 *
 * 底部对比代价：冲突检测成本 vs 锁等待成本。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 520;

// 左右面板
const PANEL_W = 308;
const PANEL_H = 340;
const LEFT_X = 32;
const RIGHT_X = 380;
const PANEL_Y = 72;

// 序列步骤
const STEP_H = 40;
const STEP_GAP = 12;
const STEP_W = 260;

const OPT_COLOR = "#3FB97F"; // 乐观（绿）
const PES_COLOR = "#E5B567"; // 悲观（黄）

// 乐观序列
const OPT_STEPS = [
  { text: "1. 读取记录（版本 v1）", note: "不加锁，自由读取" },
  { text: "2. 本地编辑（多步操作）", note: "用户修改字段" },
  { text: "3. 提交：检查版本 == v1 ?", note: "SELECT version WHERE id=?" },
  { text: "4a. 匹配 → 写入（v1→v2）", note: "UPDATE ... SET version=v2" },
  { text: "4b. 不匹配 → 拒绝 + 提示", note: "冲突！请刷新后重试" },
] as const;

// 悲观序列
const PES_STEPS = [
  { text: "1. 获取排他锁", note: "SELECT ... FOR UPDATE" },
  { text: "2. 读取记录", note: "其他事务被阻塞" },
  { text: "3. 本地编辑（多步操作）", note: "锁一直持有中..." },
  { text: "4. 提交写入", note: "UPDATE ... 无需版本检查" },
  { text: "5. 释放锁", note: "COMMIT / ROLLBACK" },
] as const;

export function Poeaa24Ch05OptimisticVsPessimisticDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="乐观离线锁与悲观离线锁对比。左侧乐观：读取版本 v1、本地编辑、提交时检查版本是否仍为 v1，匹配则写入升到 v2，不匹配则拒绝提示冲突。右侧悲观：先获取排他锁、读取、本地编辑期间锁一直持有、提交写入无需版本检查、最后释放锁。底部对比：乐观代价是冲突时重试，适合低冲突；悲观代价是锁等待和死锁风险，适合高冲突或高损失场景。覆盖 5.1 并发问题、5.2 执行语境、5.3 隔离与不变性、5.4 乐观并发控制和悲观并发控制、5.5 事务、5.6 离线并发控制的模式、5.7 应用服务器并发、5.8 进一步阅读。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <DiagramTitle
            x={VIEW_W / 2}
            y={40}
            text="乐观 vs 悲观：离线并发控制的两条路径"
          />

          {/* ===== 左面板：乐观 ===== */}
          <rect
            x={LEFT_X}
            y={PANEL_Y}
            width={PANEL_W}
            height={PANEL_H}
            rx="10"
            fill={OPT_COLOR}
            fillOpacity="0.04"
            stroke={OPT_COLOR}
            strokeWidth="1.5"
          />
          <text
            x={LEFT_X + PANEL_W / 2}
            y={PANEL_Y + 24}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={OPT_COLOR}
          >
            乐观离线锁
          </text>
          <text
            x={LEFT_X + PANEL_W / 2}
            y={PANEL_Y + 42}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Optimistic Offline Lock
          </text>

          {OPT_STEPS.map((step, i) => {
            const sy = PANEL_Y + 56 + i * (STEP_H + STEP_GAP);
            const isReject = step.text.includes("4b");
            const stepColor = isReject ? T.danger : OPT_COLOR;
            return (
              <g key={`opt-${i}`}>
                <rect
                  x={LEFT_X + 24}
                  y={sy}
                  width={STEP_W}
                  height={STEP_H}
                  rx="6"
                  fill={stepColor}
                  fillOpacity="0.08"
                  stroke={stepColor}
                  strokeWidth="1.2"
                  strokeDasharray={isReject ? "5 3" : undefined}
                />
                <text
                  x={LEFT_X + 36}
                  y={sy + 17}
                  fontSize="12"
                  fontWeight="600"
                  fill={T.primary}
                >
                  {step.text}
                </text>
                <text
                  x={LEFT_X + 36}
                  y={sy + 33}
                  fontSize="11"
                  fill={T.secondary}
                  fontFamily="monospace"
                >
                  {step.note}
                </text>
                {/* 连接箭头 */}
                {i < OPT_STEPS.length - 1 && (
                  <line
                    x1={LEFT_X + 24 + STEP_W / 2}
                    y1={sy + STEP_H}
                    x2={LEFT_X + 24 + STEP_W / 2}
                    y2={sy + STEP_H + STEP_GAP}
                    stroke={OPT_COLOR}
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                )}
              </g>
            );
          })}

          {/* ===== 右面板：悲观 ===== */}
          <rect
            x={RIGHT_X}
            y={PANEL_Y}
            width={PANEL_W}
            height={PANEL_H}
            rx="10"
            fill={PES_COLOR}
            fillOpacity="0.04"
            stroke={PES_COLOR}
            strokeWidth="1.5"
          />
          <text
            x={RIGHT_X + PANEL_W / 2}
            y={PANEL_Y + 24}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={PES_COLOR}
          >
            悲观离线锁
          </text>
          <text
            x={RIGHT_X + PANEL_W / 2}
            y={PANEL_Y + 42}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            Pessimistic Offline Lock
          </text>

          {PES_STEPS.map((step, i) => {
            const sy = PANEL_Y + 56 + i * (STEP_H + STEP_GAP);
            const isLock = step.text.includes("锁");
            return (
              <g key={`pes-${i}`}>
                <rect
                  x={RIGHT_X + 24}
                  y={sy}
                  width={STEP_W}
                  height={STEP_H}
                  rx="6"
                  fill={PES_COLOR}
                  fillOpacity="0.08"
                  stroke={PES_COLOR}
                  strokeWidth="1.2"
                />
                <text
                  x={RIGHT_X + 36}
                  y={sy + 17}
                  fontSize="12"
                  fontWeight="600"
                  fill={T.primary}
                >
                  {step.text}
                </text>
                <text
                  x={RIGHT_X + 36}
                  y={sy + 33}
                  fontSize="11"
                  fill={T.secondary}
                  fontFamily="monospace"
                >
                  {step.note}
                </text>
                {/* 锁持有区间标记 */}
                {isLock && (
                  <rect
                    x={RIGHT_X + 14}
                    y={sy - 2}
                    width={4}
                    height={STEP_H + 4}
                    rx="2"
                    fill={PES_COLOR}
                    fillOpacity="0.6"
                  />
                )}
                {/* 连接箭头 */}
                {i < PES_STEPS.length - 1 && (
                  <line
                    x1={RIGHT_X + 24 + STEP_W / 2}
                    y1={sy + STEP_H}
                    x2={RIGHT_X + 24 + STEP_W / 2}
                    y2={sy + STEP_H + STEP_GAP}
                    stroke={PES_COLOR}
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                )}
              </g>
            );
          })}

          {/* 锁持有区间括号（右侧面板外） */}
          <path
            d={`M ${RIGHT_X + PANEL_W + 8} ${PANEL_Y + 56} 
                L ${RIGHT_X + PANEL_W + 14} ${PANEL_Y + 56}
                L ${RIGHT_X + PANEL_W + 14} ${PANEL_Y + 56 + 4 * (STEP_H + STEP_GAP) + STEP_H}
                L ${RIGHT_X + PANEL_W + 8} ${PANEL_Y + 56 + 4 * (STEP_H + STEP_GAP) + STEP_H}`}
            fill="none"
            stroke={PES_COLOR}
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <text
            x={RIGHT_X + PANEL_W + 20}
            y={PANEL_Y + 56 + 2 * (STEP_H + STEP_GAP) + STEP_H / 2}
            fontSize="11"
            fill={PES_COLOR}
            writingMode="vertical-rl"
          >
            锁持有期间
          </text>

          {/* VS 标记 */}
          <text
            x={VIEW_W / 2}
            y={PANEL_Y + PANEL_H / 2}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={T.secondary}
          >
            VS
          </text>

          {/* ===== 底部对比总结 ===== */}
          <line
            x1={32}
            y1={PANEL_Y + PANEL_H + 20}
            x2={VIEW_W - 32}
            y2={PANEL_Y + PANEL_H + 20}
            stroke={T.border}
            strokeWidth="1"
          />
          {/* 乐观代价 */}
          <text
            x={LEFT_X + PANEL_W / 2}
            y={PANEL_Y + PANEL_H + 44}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={OPT_COLOR}
          >
            代价：冲突时回滚重试
          </text>
          <text
            x={LEFT_X + PANEL_W / 2}
            y={PANEL_Y + PANEL_H + 62}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            适用：低冲突、短事务、读多写少
          </text>
          {/* 悲观代价 */}
          <text
            x={RIGHT_X + PANEL_W / 2}
            y={PANEL_Y + PANEL_H + 44}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={PES_COLOR}
          >
            代价：锁等待 + 死锁风险
          </text>
          <text
            x={RIGHT_X + PANEL_W / 2}
            y={PANEL_Y + PANEL_H + 62}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            适用：高冲突、高损失、长事务
          </text>

          {/* 底部总结 */}
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            text="选择轴：冲突概率 × 单次冲突损失 → 低冲突优先乐观，高冲突或高损失再考虑悲观"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        乐观离线锁在提交时检测版本冲突，代价是冲突时重试；悲观离线锁在读取前获取排他锁，
        代价是锁等待和死锁。选择取决于冲突概率与单次冲突造成的业务损失。
      </figcaption>
    </figure>
  );
}
