"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <Poeaa24Ch05LostUpdateTimeline>：并发丢失更新动画（POEAA 第5章）。
 *
 * 场景：两个客服并行修改同一订单。
 *  ① 客服A 读取订单（版本 v1，地址="北京"，数量=2）
 *  ② 客服B 读取订单（版本 v1，地址="北京"，数量=2）
 *  ③ 客服A 修改地址为"上海"（本地副本）
 *  ④ 客服B 修改数量为 5（本地副本）
 *  ⑤ 客服B 提交成功（版本 v1→v2，数量=5）
 *  ⑥ 客服A 提交成功（版本 v2→v3，地址="上海"，但数量被覆盖回 2！）
 *
 * 顶部显示数据库当前状态（版本 + 字段值），下方两条泳道按拍交错。
 * 可暂停、单步、拖进度。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const A_COLOR = "var(--accent)"; // 客服A
const B_COLOR = "#E5B567"; // 客服B（warning 黄）
const OK_COLOR = "#3FB97F"; // 成功
const FAIL_COLOR = "#E5675C"; // 丢失更新

// ─── 顶部数据库状态格 ────────────────────────────────────────────────────────

const DB_X = 220;
const DB_W = 280;
const DB_Y = 72;
const DB_H = 56;

type DbState = { ver: string; addr: string; qty: string; color: string };
const DB_AT: readonly DbState[] = [
  { ver: "v1", addr: "北京", qty: "2", color: A_COLOR }, // ①
  { ver: "v1", addr: "北京", qty: "2", color: B_COLOR }, // ②
  { ver: "v1", addr: "北京", qty: "2", color: A_COLOR }, // ③
  { ver: "v1", addr: "北京", qty: "2", color: B_COLOR }, // ④
  { ver: "v2", addr: "北京", qty: "5", color: OK_COLOR }, // ⑤
  { ver: "v3", addr: "上海", qty: "2 ← 丢失!", color: FAIL_COLOR }, // ⑥
];

// ─── 泳道步骤 ────────────────────────────────────────────────────────────────

type LaneStep = TeachingStep & {
  id: string;
  lane: 1 | 2;
  row: number;
  text: string;
  sub?: string;
  color: string;
};

const STEPS_DATA: readonly LaneStep[] = [
  {
    id: "a-read",
    label: "a-read",
    lane: 1,
    row: 0,
    text: "① 读取订单（v1）",
    sub: "地址=北京，数量=2",
    color: A_COLOR,
    caption: "① 客服A 从数据库读取订单，拿到版本 v1 的快照：地址=北京，数量=2",
  },
  {
    id: "b-read",
    label: "b-read",
    lane: 2,
    row: 0,
    text: "② 读取订单（v1）",
    sub: "地址=北京，数量=2",
    color: B_COLOR,
    caption: "② 客服B 也读取同一订单，拿到相同的版本 v1 快照",
  },
  {
    id: "a-edit",
    label: "a-edit",
    lane: 1,
    row: 1,
    text: "③ 修改地址 → 上海",
    sub: "本地副本，尚未提交",
    color: A_COLOR,
    caption: "③ 客服A 在本地副本上把地址改为「上海」，还没有提交到数据库",
  },
  {
    id: "b-edit",
    label: "b-edit",
    lane: 2,
    row: 1,
    text: "④ 修改数量 → 5",
    sub: "本地副本，尚未提交",
    color: B_COLOR,
    caption: "④ 客服B 在本地副本上把数量改为 5，也还没有提交",
  },
  {
    id: "b-commit",
    label: "b-commit",
    lane: 2,
    row: 2,
    text: "⑤ 提交成功（v1→v2）",
    sub: "数据库：数量=5 ✓",
    color: OK_COLOR,
    caption: "⑤ 客服B 先提交，版本从 v1 升到 v2，数据库记录数量=5，一切正常",
  },
  {
    id: "a-commit",
    label: "a-commit",
    lane: 1,
    row: 2,
    text: "⑥ 提交成功（v2→v3）",
    sub: "数量被覆盖回 2！丢失更新",
    color: FAIL_COLOR,
    caption:
      "⑥ 客服A 随后提交，版本升到 v3，地址=上海写入成功——但 A 的快照里数量还是 2，于是 B 的修改（数量=5）被无声覆盖：这就是丢失更新",
  },
];

const STEPS: readonly TeachingStep[] = STEPS_DATA.map((s) => ({
  label: s.label,
  caption: s.caption,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

// ─── 布局常量 ────────────────────────────────────────────────────────────────

const LANE_LABEL_W = 72;
const LANE_Y = 172;
const STEP_W = 268;
const STEP_H = 52;
const ROW_GAP = 16;
const LANE_GAP = 24;

function laneStepY(row: number): number {
  return LANE_Y + row * (STEP_H + ROW_GAP);
}
function laneStepX(lane: 1 | 2): number {
  return lane === 1
    ? LANE_LABEL_W + 8
    : LANE_LABEL_W + 8 + STEP_W + LANE_GAP;
}

// ─── 组件 ────────────────────────────────────────────────────────────────────

export function Poeaa24Ch05LostUpdateTimeline() {
  const stepRefs = useRef<Record<string, SVGGElement | null>>({});
  const dbRefs = useRef<Record<number, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS_DATA.forEach((s) => {
        const el = stepRefs.current[s.id];
        if (!el) return;
        const beat = BEAT_OF[s.label] ?? 0;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label(s.label, TEACHING_BEAT_MS * (beat + 1));
      });
      // 数据库状态格：每拍切换
      STEPS.forEach((_, beat) => {
        for (let i = 0; i < DB_AT.length; i++) {
          const el = dbRefs.current[i];
          if (!el) continue;
          tl.add(
            el,
            {
              opacity: i === beat ? 1 : 0,
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            TEACHING_BEAT_MS * beat,
          );
        }
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发丢失更新动画。两个客服同时读取同一订单版本 v1，各自在本地修改不同字段后先后提交。客服B 先把数量改为 5 并提交成功，版本升到 v2；客服A 随后把地址改为上海并提交，版本升到 v3，但 A 的快照里数量仍是 2，于是 B 的修改被无声覆盖——这就是丢失更新。播放时按六步依次点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text
            x="32"
            y="36"
            fontSize="16"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            丢失更新：两个客服并行修改同一订单
          </text>
          <text x="32" y="56" fontSize="11" fill="var(--text-secondary)">
            业务事务跨越多个系统事务，后提交者的快照覆盖了先提交者的修改
          </text>

          {/* 数据库状态格标题 */}
          <text
            x={DB_X + DB_W / 2}
            y={DB_Y - 10}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            数据库 · 订单 #1024
          </text>
          {/* 数据库底框 */}
          <rect
            x={DB_X}
            y={DB_Y}
            width={DB_W}
            height={DB_H}
            rx="10"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {/* 数据库状态（每拍切换） */}
          {DB_AT.map((db, i) => (
            <g
              key={`db-${i}`}
              ref={(el) => {
                dbRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={DB_X}
                y={DB_Y}
                width={DB_W}
                height={DB_H}
                rx="10"
                fill={db.color}
                fillOpacity="0.12"
                stroke={db.color}
                strokeWidth="2"
              />
              <text
                x={DB_X + 16}
                y={DB_Y + 22}
                fontSize="12"
                fontWeight="700"
                fontFamily="monospace"
                fill="var(--text-primary)"
              >
                版本: {db.ver}
              </text>
              <text
                x={DB_X + 16}
                y={DB_Y + 42}
                fontSize="12"
                fontFamily="monospace"
                fill="var(--text-primary)"
              >
                地址={db.addr} 数量={db.qty}
              </text>
            </g>
          ))}

          {/* 泳道标签 */}
          <text
            x={20}
            y={LANE_Y + 20}
            fontSize="12"
            fontWeight="700"
            fill={A_COLOR}
          >
            客服A
          </text>
          <text
            x={20}
            y={LANE_Y + 36}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            改地址
          </text>
          <text
            x={20}
            y={LANE_Y + STEP_H + ROW_GAP + 20}
            fontSize="12"
            fontWeight="700"
            fill={B_COLOR}
          >
            客服B
          </text>
          <text
            x={20}
            y={LANE_Y + STEP_H + ROW_GAP + 36}
            fontSize="11"
            fill="var(--text-secondary)"
          >
            改数量
          </text>

          {/* 步骤框 */}
          {STEPS_DATA.map((s) => {
            const x = laneStepX(s.lane);
            const y = laneStepY(s.row);
            return (
              <g
                key={s.id}
                ref={(el) => {
                  stepRefs.current[s.id] = el;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x={x}
                  y={y}
                  width={STEP_W}
                  height={STEP_H}
                  rx="8"
                  fill={s.color}
                  fillOpacity="0.12"
                  stroke={s.color}
                  strokeWidth="2"
                />
                <text
                  x={x + 14}
                  y={y + (s.sub ? 22 : STEP_H / 2 + 4)}
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {s.text}
                </text>
                {s.sub && (
                  <text
                    x={x + 14}
                    y={y + 40}
                    fontSize="11"
                    fill="var(--text-secondary)"
                  >
                    {s.sub}
                  </text>
                )}
              </g>
            );
          })}

          {/* 底部总结 */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 24}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            解法：乐观离线锁（版本号检测）或悲观离线锁（提前锁定记录）
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="客服A 和客服B 同时读取订单 v1，各自修改不同字段。B 先提交（v1→v2，数量=5），A 后提交（v2→v3，地址=上海）但 A 的快照里数量仍是 2，B 的修改被覆盖——丢失更新。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        丢失更新（Lost Update）：两个业务事务读取同一版本后各自修改、先后提交，
        后提交者的完整快照覆盖了先提交者的字段修改。根因是业务事务跨越了多个系统事务，
        而提交时没有检测版本冲突。
      </figcaption>
    </figure>
  );
}
