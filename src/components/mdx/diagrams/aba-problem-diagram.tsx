"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ABAProblemDiagram>：ABA 问题动画（HEL-236，§3 引出 / §5 辅 Demo）。
 *
 * 餐厅后厨隐喻：你离开一会儿，账上的数被改走又改回成原样，你以为没人动过其实暗地里换了内容。
 *
 * 栈 head→A→B。两条泳道（线程1 / 线程2）按拍交错：
 *  ① 线程1 读到 head = A（地址 0xA），准备 CAS(head, A, B)——想弹出 A、让 head 指向 B；
 *  ② 线程1 被打断（挂起）；
 *  ③ 线程2 趁机 pop A（head→B）；
 *  ④ 线程2 再 pop B（head→空），然后把 A 的内存还给分配器；
 *  ⑤ 线程2 push 一个**复用了 A 地址(0xA)** 的新节点 A'（内容已不同），此时 head 又 = 地址 0xA；
 *  ⑥ 线程1 恢复，CAS(head, A, B)：发现 head == 0xA（地址相同！）→ **误判「没人动过」→ 成功**，
 *     但 B 早被回收、结构已面目全非 → bug。
 *
 * 可视化「head 值 A→(被改走)→(地址复用变回 A) 骗过 CAS」：顶部一格显示 head 当前值/地址，
 * 关键在第⑤拍 head 地址变回 0xA（绿，看似没变）、第⑥拍 CAS 误判成功（红，其实坏了）。
 *
 * 时间线 = 一条 anime.js timeline，6 个关键帧。label 锚在「该拍点亮到最亮」时刻
 * （lit = beat*(i+1)），与同篇其它 anime 图同款，修正 off-by-one。
 *
 * 为何 client + DESIGN token + 动态 import 同 CASRetryLoopDiagram，不赘述。
 */

const VIEW_W = 660;
const VIEW_H = 430;

const T1_COLOR = "var(--accent)"; // 线程1（受害者）
const T2_COLOR = "var(--warning)"; // 线程2（暗地里换内容）
const OK_COLOR = "var(--success)"; // 「看似没变」的迷惑色
const FAIL_COLOR = "var(--danger)"; // 误判成功 = bug

// —— 顶部 head 值格 ——
const HEAD_X = 246;
const HEAD_W = 168;
const HEAD_Y = 74;
const HEAD_H = 52;

// —— 两条泳道 ——
const LANE_LABEL_W = 92;
const LANE1_Y = 168; // 线程1 行
const LANE2_Y = 168; // 同起点，但分两列摆放（见 stepX）
const STEP_W = 250;
const STEP_H = 50;
const ROW_GAP = 14;

// 每步落在哪条泳道（1 / 2）+ 行号（同泳道内自上而下）。
type AbaStep = TeachingStep & {
  id: string;
  lane: 1 | 2;
  row: number; // 该泳道内的行序
  text: string;
  sub?: string;
  color: string;
};

const STEPS_DATA: readonly AbaStep[] = [
  {
    id: "t1-read",
    label: "t1-read",
    lane: 1,
    row: 0,
    text: "① 读到 head = A，准备 CAS(head, A, B)",
    sub: "想弹出 A，让 head 指向 B",
    color: T1_COLOR,
    caption:
      "① 线程1 读到栈顶 head = A（地址 0xA），准备 CAS(head, 期望 A, 改成 B)",
  },
  {
    id: "t1-pause",
    label: "t1-pause",
    lane: 1,
    row: 1,
    text: "② 被操作系统打断，挂起……",
    sub: "CAS 还没执行，手里记着「head 应该是 A」",
    color: T1_COLOR,
    caption: "② 线程1 在 CAS 之前被打断挂起，手里仍记着「我以为 head 是 A」",
  },
  {
    id: "t2-popa",
    label: "t2-popa",
    lane: 2,
    row: 0,
    text: "③ pop A（head → B）",
    sub: "趁线程1 没动，先弹掉 A",
    color: T2_COLOR,
    caption: "③ 线程2 趁机 pop A，head 现在指向 B",
  },
  {
    id: "t2-popb",
    label: "t2-popb",
    lane: 2,
    row: 1,
    text: "④ pop B，把 A 的内存还给分配器",
    sub: "A 节点被回收，地址 0xA 空出来",
    color: T2_COLOR,
    caption: "④ 线程2 再 pop B，并把 A 节点的内存还给分配器——地址 0xA 空了出来",
  },
  {
    id: "t2-pusha2",
    label: "t2-pusha2",
    lane: 2,
    row: 2,
    text: "⑤ push A′：复用了 0xA 这个地址",
    sub: "head 地址又 = 0xA，但内容已不同",
    color: OK_COLOR,
    caption:
      "⑤ 线程2 push 一个新节点 A′，分配器**复用了 0xA 这个地址**——head 地址又变回 0xA，可内容已是另一个节点",
  },
  {
    id: "t1-cas",
    label: "t1-cas",
    lane: 1,
    row: 2,
    text: "⑥ 线程1 恢复，CAS(head, A, B)：误判成功！",
    sub: "head == 0xA → 以为没变过 → 改成 B（B 早被回收）",
    color: FAIL_COLOR,
    caption:
      "⑥ 线程1 恢复，CAS 发现 head == 0xA（地址相同！）→ 误判「没人动过」→ 成功，但 B 早被回收、结构已面目全非：这就是 ABA bug",
  },
];

// head 值格每拍显示。
type HeadState = { val: string; sub: string; color: string };
const HEAD_AT: readonly HeadState[] = [
  { val: "head = A", sub: "地址 0xA", color: T1_COLOR }, // ①
  { val: "head = A", sub: "线程1 挂起前看到的", color: T1_COLOR }, // ②
  { val: "head = B", sub: "线程2 弹掉了 A", color: T2_COLOR }, // ③
  { val: "head = 空", sub: "B 也弹掉，0xA 被回收", color: T2_COLOR }, // ④
  { val: "head = A′", sub: "复用 0xA！看似变回 A 了", color: OK_COLOR }, // ⑤
  { val: "head == 0xA ?", sub: "CAS 误判：没人动过 ✗", color: FAIL_COLOR }, // ⑥
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
function laneStepY(lane: 1 | 2, row: number): number {
  const base = lane === 1 ? LANE1_Y : LANE2_Y;
  return base + row * (STEP_H + ROW_GAP);
}
// 某泳道步骤框左 x。
function laneStepX(lane: 1 | 2): number {
  return lane === 1 ? LANE_LABEL_W + 8 : LANE_LABEL_W + 8 + STEP_W + 24;
}

export function ABAProblemDiagram() {
  const stepRefs = useRef<Record<string, SVGGElement | null>>({});
  const headRefs = useRef<Record<number, SVGGElement | null>>({});

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
      STEPS.forEach((_, beat) => {
        for (let i = 0; i < HEAD_AT.length; i++) {
          const el = headRefs.current[i];
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
          aria-label="ABA 问题动画。顶部一格显示栈顶指针 head 当前的值和地址。下方分两条泳道：左边是线程1，右边是线程2。第一步线程1 读到 head 等于 A、地址 0xA，准备执行 CAS，期望 A、改成 B，想弹出 A。第二步线程1 在 CAS 之前被操作系统打断挂起，手里仍记着「我以为 head 是 A」。第三步线程2 趁机 pop A，head 现在指向 B。第四步线程2 再 pop B，并把 A 节点的内存还给分配器，地址 0xA 空了出来。第五步线程2 push 一个新节点 A′，分配器复用了 0xA 这个地址，head 地址又变回 0xA，但内容已是另一个节点。第六步线程1 恢复，CAS 发现 head 等于 0xA、地址相同，于是误判没人动过、返回成功，可是 B 早被回收、结构已面目全非，这就是 ABA bug。这演示了你离开一会儿、账上的数被改走又改回成原样、你以为没人动过其实暗地里换了内容。解法是给指针带版本号或标签，让同地址但变过也能被 CAS 区分。播放时按六步依次点亮，可播放、暂停、单步、拖动进度。"
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
            ABA 问题：被改走又改回成原样，CAS 误判「没人动过」
          </text>
          <text x="20" y="52" fontSize="11" fill="var(--text-secondary)">
            栈 head→A→B：线程1 离开一会儿，账上的地址被换了内容却变回 0xA 骗过
            CAS
          </text>

          {/* 顶部 head 值格标题 */}
          <text
            x={HEAD_X + HEAD_W / 2}
            y={HEAD_Y - 8}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            栈顶指针 head
          </text>
          <rect
            x={HEAD_X}
            y={HEAD_Y}
            width={HEAD_W}
            height={HEAD_H}
            rx="10"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {HEAD_AT.map((h, i) => (
            <g
              key={`head-${i}`}
              ref={(el) => {
                headRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={HEAD_X}
                y={HEAD_Y}
                width={HEAD_W}
                height={HEAD_H}
                rx="10"
                fill={h.color}
                fillOpacity="0.16"
                stroke={h.color}
                strokeWidth="2.4"
              />
              <text
                x={HEAD_X + HEAD_W / 2}
                y={HEAD_Y + 22}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {h.val}
              </text>
              <text
                x={HEAD_X + HEAD_W / 2}
                y={HEAD_Y + 40}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {h.sub}
              </text>
            </g>
          ))}

          {/* 两条泳道标签 */}
          <text
            x={20}
            y={LANE1_Y + 18}
            fontSize="11"
            fontWeight="700"
            fill={T1_COLOR}
          >
            线程1
          </text>
          <text
            x={20}
            y={LANE1_Y + 34}
            fontSize="9.5"
            fill="var(--text-secondary)"
          >
            （受害者）
          </text>

          {/* 步骤框：按泳道 / 行排布，逐拍点亮 */}
          {STEPS_DATA.map((s) => {
            const x = laneStepX(s.lane);
            const y = laneStepY(s.lane, s.row);
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
                  y={y + (s.sub ? 20 : STEP_H / 2 + 4)}
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {s.text}
                </text>
                {s.sub && (
                  <text
                    x={x + 12}
                    y={y + 38}
                    fontSize="9.5"
                    fill="var(--text-secondary)"
                  >
                    {s.sub}
                  </text>
                )}
              </g>
            );
          })}

          {/* 底部解法提示 */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 20}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            解法：给指针带版本号 / 标签（标签指针）——让「同地址但变过」也能被
            CAS 区分
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="线程1 读到 head=A、准备 CAS 却被打断；线程2 pop A、pop B、又 push 复用 0xA 地址的 A′；线程1 恢复，CAS 见 head 地址仍是 0xA → 误判没人动过 → 成功，可结构已变 → bug。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ABA 问题：CAS
        只比较「值（这里是指针地址）相不相等」，看不出「被改走又改回」。线程1
        离开时 head 是地址 0xA；线程2 把 A、B 都弹掉、又 push 一个复用 0xA
        地址的新节点，head 地址又变回 0xA——线程1 的 CAS
        于是误判「没人动过」而成功，可栈结构早已面目全非。解法是给指针配版本号 /
        标签（标签指针）， 让「同地址但变过」也能被区分。
      </figcaption>
    </figure>
  );
}
