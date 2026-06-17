"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <HazardPointerDiagram>：风险指针（hazard pointer）回收动画（HEL-236，§3 引出 / §5 辅 Demo）。
 *
 * 承接 <CASRetryLoopDiagram>（无锁栈如何「读—改—CAS」），本图回答无锁栈 pop 留下的
 * 难题：弹出的节点 N 为什么不能马上 delete？答案是别的线程可能正拿着指向 N 的裸指针。
 * 风险指针给出解法：动一个节点前先在公开的「正在使用」公告板挂牌，回收线程见牌不扔。
 *
 * 餐厅后厨隐喻：动一张单子前，先在「正在用」公告板上挂个写着这张单子的牌；想收单子的人
 * 先扫一眼公告板——有人挂了牌就先别扔（挂进「待回收」），等没人挂牌了再安全销毁。
 *
 * 四拍：
 *  ① 线程A（使用者）访问节点 N 前，先在公告板登记一个指向 N 的风险指针（挂牌 hazard→N）；
 *  ② 线程B（回收者）想 delete N：先扫公告板，发现 N 已被登记 → 不能删，挂进「待回收」推迟；
 *  ③ 线程A 用完 N，清空自己的风险指针（摘牌，公告板回到空）；
 *  ④ 线程B 重扫公告板：这次没有任何风险指针指向 N → 安全 delete N（从待回收清掉）。
 *
 * 时间线 = 一条 anime.js timeline，4 个关键帧。每拍点亮对应步骤框 + 切换公告板/待回收状态层。
 * label 锚在「该拍点亮到最亮」时刻（lit = beat*(i+1)），与 CASRetryLoopDiagram /
 * ABAProblemDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client + DESIGN token + 动态 import 同 CASRetryLoopDiagram，不赘述：anime.js 时钟 +
 * 受控控制条，视觉全部 DESIGN token（accent / success / danger / warning / border /
 * text-* / bg），无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 446;

const USE_COLOR = "var(--accent)"; // 线程A：使用者（挂牌）
const RECLAIM_COLOR = "var(--warning)"; // 线程B：回收者（想删）
const SAFE_COLOR = "var(--success)"; // 安全：无牌可删 / 已删
const DEFER_COLOR = "var(--danger)"; // 推迟：有牌不能删

// —— 顶部「正在使用」公告板：演示风险指针登记状态 ——
const BOARD_X = 32;
const BOARD_Y = 78;
const BOARD_W = 252;
const BOARD_H = 64;

// —— 顶部右侧节点 N + 待回收队列 ——
const NODE_X = 360;
const NODE_Y = 78;
const NODE_W = 122;
const NODE_H = 64;

const PEND_X = 510;
const PEND_Y = 78;
const PEND_W = 118;
const PEND_H = 64;

// —— 下方两条泳道四步：线程A 两步在左、线程B 两步在右 ——
const LANE_LABEL_W = 86;
const STEP_W = 250;
const STEP_H = 56;
const ROW_GAP = 16;
const LANE_Y0 = 214;

type Lane = 1 | 2; // 1 = 线程A 使用者，2 = 线程B 回收者

type HpStep = {
  id: string;
  label: string;
  lane: Lane;
  row: number; // 该泳道内自上而下的行序
  text: string;
  sub: string;
  color: string;
  caption: string;
};

const STEPS_DATA: readonly HpStep[] = [
  {
    id: "a-publish",
    label: "a-publish",
    lane: 1,
    row: 0,
    text: "① 访问 N 前，先挂牌：hazard → N",
    sub: "在「正在使用」公告板登记风险指针",
    color: USE_COLOR,
    caption:
      "① 线程A 要访问节点 N，访问之前先在「正在使用」公告板登记一个指向 N 的风险指针（挂牌 hazard → N），向所有人公开「我正用着 N，别扔」",
  },
  {
    id: "b-defer",
    label: "b-defer",
    lane: 2,
    row: 0,
    text: "② 想 delete N → 扫板见牌 → 推迟",
    sub: "N 已被登记，挂进「待回收」不删",
    color: DEFER_COLOR,
    caption:
      "② 线程B 想回收 N，删之前先扫公告板：发现 N 已被风险指针登记 → 现在删会让线程A 用到悬空指针 → 不删，把 N 挂进「待回收」推迟",
  },
  {
    id: "a-clear",
    label: "a-clear",
    lane: 1,
    row: 1,
    text: "③ 用完 N，清空风险指针（摘牌）",
    sub: "公告板回到空：不再有人用 N",
    color: USE_COLOR,
    caption:
      "③ 线程A 用完 N，把自己的风险指针清空（摘牌），公告板上不再有指向 N 的牌——表示「我不用了」",
  },
  {
    id: "b-delete",
    label: "b-delete",
    lane: 2,
    row: 1,
    text: "④ 重扫公告板 → 无牌 → 安全 delete N",
    sub: "从「待回收」清掉，真正释放内存",
    color: SAFE_COLOR,
    caption:
      "④ 线程B 重扫公告板：这次没有任何风险指针指向 N → 没人在用了 → 安全 delete N，从「待回收」清掉、真正释放内存",
  },
];

// 公告板每拍的状态（登记了哪个风险指针 / 是否空）。
type BoardState = { val: string; sub: string; color: string };
const BOARD_AT: readonly BoardState[] = [
  { val: "hazard → N", sub: "线程A 挂了牌：我正用 N", color: USE_COLOR }, // ①
  { val: "hazard → N", sub: "回收者扫到这张牌！", color: DEFER_COLOR }, // ②
  { val: "（空）", sub: "线程A 摘牌：我用完了", color: SAFE_COLOR }, // ③
  { val: "（空）", sub: "回收者重扫：没牌了", color: SAFE_COLOR }, // ④
];

// 节点 N 每拍状态。
type NodeState = { val: string; color: string };
const NODE_AT: readonly NodeState[] = [
  { val: "节点 N（在用）", color: USE_COLOR }, // ①
  { val: "节点 N（在用）", color: USE_COLOR }, // ②
  { val: "节点 N（闲置）", color: SAFE_COLOR }, // ③
  { val: "N 已释放 ✓", color: SAFE_COLOR }, // ④
];

// 待回收队列每拍状态。
type PendState = { val: string; color: string };
const PEND_AT: readonly PendState[] = [
  { val: "（空）", color: "var(--text-secondary)" }, // ①
  { val: "待删：N", color: DEFER_COLOR }, // ② 挂进待回收
  { val: "待删：N", color: DEFER_COLOR }, // ③ 仍待删（板刚清空）
  { val: "（已清空）", color: SAFE_COLOR }, // ④ 删完清掉
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

// 某泳道内某行的 y。
function laneStepY(row: number): number {
  return LANE_Y0 + row * (STEP_H + ROW_GAP);
}
// 某泳道步骤框左 x。
function laneStepX(lane: Lane): number {
  return lane === 1 ? LANE_LABEL_W + 8 : LANE_LABEL_W + 8 + STEP_W + 24;
}

export function HazardPointerDiagram() {
  const stepRefs = useRef<Record<string, SVGGElement | null>>({});
  const boardRefs = useRef<Record<number, SVGGElement | null>>({});
  const nodeRefs = useRef<Record<number, SVGGElement | null>>({});
  const pendRefs = useRef<Record<number, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 四步框：逐拍点亮（opacity 0→1）。
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
      // 顶部三个状态格：每拍只显示「该拍状态」那一层，其余隐藏（交替点亮）。
      STEPS.forEach((_, beat) => {
        const layers: Array<Record<number, SVGGElement | null>> = [
          boardRefs.current,
          nodeRefs.current,
          pendRefs.current,
        ];
        layers.forEach((layer) => {
          for (let i = 0; i < STEPS.length; i++) {
            const el = layer[i];
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
          aria-label="风险指针回收动画。顶部从左到右三格：第一格是「正在使用」公告板，显示当前登记了哪个风险指针；中间一格是节点 N 的状态；右边一格是「待回收」队列。下方分两条泳道：左边线程A 是使用者，右边线程B 是回收者。第一步线程A 要访问节点 N，访问之前先在公告板登记一个指向 N 的风险指针，也就是挂牌 hazard 指向 N，公开声明「我正用着 N，别扔」。第二步线程B 想回收 N，删之前先扫公告板，发现 N 已被风险指针登记，如果现在删会让线程A 用到悬空指针，所以不删，把 N 挂进「待回收」队列推迟。第三步线程A 用完 N，把自己的风险指针清空，也就是摘牌，公告板回到空，表示「我不用了」。第四步线程B 重扫公告板，这次没有任何风险指针指向 N，说明没人在用了，于是安全地 delete N，从「待回收」清掉、真正释放内存。这演示了无锁结构里弹出的节点不能马上删除，要先在公开公告板挂牌、回收者见牌不扔、等没人挂牌再删的延迟回收机制。播放时按四步依次点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* 标题 */}
          <text
            x="20"
            y="32"
            fontSize="14"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            风险指针：动单子前先在「正在用」公告板挂牌，收单子的人见牌不扔
          </text>
          <text x="20" y="52" fontSize="11" fill="var(--text-secondary)">
            解无锁回收难题：pop 出的节点不能马上
            delete——别的线程可能正拿着指向它的指针
          </text>

          {/* 顶部公告板标题 */}
          <text
            x={BOARD_X + BOARD_W / 2}
            y={BOARD_Y - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            「正在使用」公告板（风险指针）
          </text>
          {/* 公告板底层常驻框 */}
          <rect
            x={BOARD_X}
            y={BOARD_Y}
            width={BOARD_W}
            height={BOARD_H}
            rx="10"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {/* 公告板状态层：4 拍交替点亮 */}
          {BOARD_AT.map((b, i) => (
            <g
              key={`board-${i}`}
              ref={(el) => {
                boardRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={BOARD_X}
                y={BOARD_Y}
                width={BOARD_W}
                height={BOARD_H}
                rx="10"
                fill={b.color}
                fillOpacity="0.16"
                stroke={b.color}
                strokeWidth="2.4"
              />
              <text
                x={BOARD_X + BOARD_W / 2}
                y={BOARD_Y + 26}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {b.val}
              </text>
              <text
                x={BOARD_X + BOARD_W / 2}
                y={BOARD_Y + 46}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {b.sub}
              </text>
            </g>
          ))}

          {/* 节点 N 标题 + 底层框 + 状态层 */}
          <text
            x={NODE_X + NODE_W / 2}
            y={NODE_Y - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            节点 N
          </text>
          <rect
            x={NODE_X}
            y={NODE_Y}
            width={NODE_W}
            height={NODE_H}
            rx="10"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {NODE_AT.map((n, i) => (
            <g
              key={`node-${i}`}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={NODE_X}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill={n.color}
                fillOpacity="0.16"
                stroke={n.color}
                strokeWidth="2.4"
              />
              <text
                x={NODE_X + NODE_W / 2}
                y={NODE_Y + NODE_H / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {n.val}
              </text>
            </g>
          ))}

          {/* 待回收队列标题 + 底层框 + 状态层 */}
          <text
            x={PEND_X + PEND_W / 2}
            y={PEND_Y - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            待回收队列
          </text>
          <rect
            x={PEND_X}
            y={PEND_Y}
            width={PEND_W}
            height={PEND_H}
            rx="10"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {PEND_AT.map((p, i) => (
            <g
              key={`pend-${i}`}
              ref={(el) => {
                pendRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={PEND_X}
                y={PEND_Y}
                width={PEND_W}
                height={PEND_H}
                rx="10"
                fill={p.color}
                fillOpacity="0.16"
                stroke={p.color}
                strokeWidth="2.4"
              />
              <text
                x={PEND_X + PEND_W / 2}
                y={PEND_Y + PEND_H / 2 + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {p.val}
              </text>
            </g>
          ))}

          {/* 两条泳道标签 */}
          <text
            x={20}
            y={laneStepY(0) + 22}
            fontSize="11"
            fontWeight="700"
            fill={USE_COLOR}
          >
            线程A
          </text>
          <text
            x={20}
            y={laneStepY(0) + 38}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            （使用者）
          </text>
          <text
            x={20}
            y={laneStepY(1) + 22}
            fontSize="11"
            fontWeight="700"
            fill={RECLAIM_COLOR}
          >
            线程B
          </text>
          <text
            x={20}
            y={laneStepY(1) + 38}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            （回收者）
          </text>

          {/* 四步框：按泳道 / 行排布，逐拍点亮 */}
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
                  fillOpacity="0.14"
                  stroke={s.color}
                  strokeWidth="2"
                />
                <text
                  x={x + 12}
                  y={y + 22}
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {s.text}
                </text>
                <text
                  x={x + 12}
                  y={y + 41}
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {s.sub}
                </text>
              </g>
            );
          })}

          {/* 底部要点提示 */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 18}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            规则：动节点前先挂牌登记，回收前先扫板——见牌就推迟，无牌才安全删
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="线程A 访问 N 前先在公告板挂牌 hazard→N；线程B 想删 N，扫板见牌→挂进「待回收」推迟；线程A 用完摘牌；线程B 重扫无牌→安全 delete N。挂牌登记、见牌不扔，就是风险指针解无锁回收难题的办法。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        风险指针解决无锁结构「弹出的节点不能马上
        delete」的难题：线程访问某节点前，先在公开的
        「正在使用」公告板登记一个指向它的风险指针（挂牌）；回收线程想 delete
        某节点前，先扫这块公告板——只要发现还有风险指针指向它，就把它挂进「待回收」推迟，等没有任何牌指向它时再安全删除。挂牌登记、见牌不扔，正是这套延迟回收的核心。
      </figcaption>
    </figure>
  );
}
