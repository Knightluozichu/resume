"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <CASRetryLoopDiagram>：无锁栈 push 的 CAS 重试循环动画（HEL-236，§5 主 Demo）。
 *
 * 承接 ch5 <CASConceptDiagram>（CAS 单次成功/失败两支），本图把 CAS 放进**重试循环**里，
 * 演无锁栈 push 的完整自旋：读 head → 准备新节点 → CAS（被抢则失败回填 → 重做 → 再 CAS 成功）。
 *
 * 餐厅后厨隐喻：不上锁，靠「看一眼账（head）还是不是我以为的那个数，是才改、不是就重来」。
 *  ① 读 head（= 旧顶 N），记为 expected；
 *  ② 准备新节点 new，令 new->next = N；
 *  ③ CAS(head, expected=N, desired=new)——若 head 仍是 N → 成功，head 指向 new；
 *  ④ 但若另一线程抢先把 head 改成了 M（≠N）→ CAS **失败**，把真实 head(M) 回填进 expected；
 *  ⑤ 用新 head(M) 重做 ②：new->next = M；
 *  ⑥ 再 CAS → 这次 head 仍是 M → 成功，head 指向 new。
 *
 * 时间线 = 一条 anime.js timeline，6 个关键帧。每步点亮对应节点 / 高亮 head 当前值，
 * 失败拍把 head 标红（被别人改走）。label 锚在「该拍点亮到最亮」时刻（lit = beat*(i+1)），
 * 与 CASConceptDiagram / HandOverHandDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态 import
 * 切独立 chunk（硬规则 2/6），经 mdx-components 注册后 page 侧 next/dynamic(ssr:false) 懒加载。
 *
 * 视觉全部 DESIGN token（accent / success / danger / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 660;
const VIEW_H = 428;

const READ_COLOR = "var(--accent)"; // 读 / 准备
const OK_COLOR = "var(--success)"; // CAS 成功
const FAIL_COLOR = "var(--danger)"; // CAS 失败 / 被抢
const NODE_COLOR = "var(--warning)"; // 新节点

// —— 左侧「head 指针格」：演示 head 当前指向谁 ——
const HEAD_X = 32;
const HEAD_Y = 86;
const HEAD_W = 150;
const HEAD_H = 56;

// —— 右侧重试循环 6 步竖排 ——
const STEP_X = 222;
const STEP_W = 406;
const STEP_H = 44;
const STEP_GAP = 12;
const STEP_Y0 = 86;
const stepY = (i: number) => STEP_Y0 + i * (STEP_H + STEP_GAP);

type StepNode = {
  id: string;
  text: string;
  color: string;
};

// 6 步：读 head → 准备 new → CAS(失败) → 回填+重做 → 再 CAS(成功)。
// 拆成 6 个高亮节点对应 6 个关键帧。
const STEP_NODES: readonly StepNode[] = [
  { id: "read", text: "① 读 head，记为 expected = N", color: READ_COLOR },
  {
    id: "prepare",
    text: "② 准备新节点 new，令 new→next = N",
    color: NODE_COLOR,
  },
  {
    id: "cas-fail",
    text: "③ CAS(head, N, new)：此刻 head 已被抢走 = M ≠ N → 失败",
    color: FAIL_COLOR,
  },
  {
    id: "reload",
    text: "④ 失败把真实 head(M) 回填进 expected",
    color: FAIL_COLOR,
  },
  { id: "redo", text: "⑤ 用新 head 重做②：new→next = M", color: NODE_COLOR },
  {
    id: "cas-ok",
    text: "⑥ 再 CAS(head, M, new)：head 仍是 M → 成功",
    color: OK_COLOR,
  },
];

// head 指针格每一拍显示的值 + 颜色（强调「被抢走」那拍标红）。
type HeadState = { val: string; color: string };
const HEAD_AT: readonly HeadState[] = [
  { val: "head = N", color: READ_COLOR }, // ① 读到 N
  { val: "head = N", color: READ_COLOR }, // ② 仍 N（我以为）
  { val: "head = M", color: FAIL_COLOR }, // ③ 被别的线程抢成 M！
  { val: "head = M", color: FAIL_COLOR }, // ④ 真实值 M 回填
  { val: "head = M", color: FAIL_COLOR }, // ⑤ 重做，仍是 M
  { val: "head = new", color: OK_COLOR }, // ⑥ CAS 成功，head 指向 new
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "read",
    caption: "① 读出 head 当前值 N，记为 expected——「我以为的栈顶是 N」",
  },
  {
    label: "prepare",
    caption: "② 准备新节点 new，把它的 next 接到 N 上（new→next = N）",
  },
  {
    label: "cas-fail",
    caption:
      "③ CAS(head, 期望 N, 改成 new)：可此刻 head 已被别的线程抢成 M ≠ N → CAS 失败",
  },
  {
    label: "reload",
    caption: "④ 失败不报错：CAS 顺手把真实的 head(M) 回填进 expected，供重试",
  },
  {
    label: "redo",
    caption: "⑤ 拿新 head 重做②：new→next = M（自旋一圈，重新算 desired）",
  },
  {
    label: "cas-ok",
    caption: "⑥ 再 CAS(head, 期望 M, 改成 new)：head 仍是 M → 成功，push 完成",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

export function CASRetryLoopDiagram() {
  const stepRefs = useRef<Record<string, SVGGElement | null>>({});
  const headRefs = useRef<Record<number, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 右侧 6 步：逐拍点亮（opacity 0→1）。
      STEP_NODES.forEach((n) => {
        const el = stepRefs.current[n.id];
        if (!el) return;
        const beat = BEAT_OF[n.id] ?? 0;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label(n.id, TEACHING_BEAT_MS * (beat + 1));
      });
      // 左侧 head 格：每拍只显示「该拍的值」那一层，其余隐藏（交替点亮）。
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
          aria-label="无锁栈 push 的 CAS 重试循环动画。左边一格显示栈顶指针 head 当前指向谁。右边是六个步骤：第一步读出 head 当前值 N，记为 expected，意思是「我以为的栈顶是 N」。第二步准备一个新节点 new，把它的 next 接到 N 上。第三步执行 CAS，期望 head 还是 N、想把它改成 new，但此刻 head 已经被另一个线程抢先改成了 M，不等于 N，所以 CAS 失败，左边 head 格变红显示 head 等于 M。第四步 CAS 失败不报错，而是顺手把真实的 head 也就是 M 回填进 expected，供重试使用。第五步拿新的 head 重做第二步，把 new 的 next 改接到 M 上，这就是自旋一圈重新计算。第六步再执行一次 CAS，期望 head 是 M、改成 new，这次 head 确实还是 M，所以成功，head 指向 new，push 完成。整个过程演示了无锁栈不上锁、靠「看一眼账还是不是我以为的数，是才改、不是就重来」来协调。播放时按六步依次点亮，可播放、暂停、单步、拖动进度。"
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
            CAS 重试循环：读—改—CAS—失败就重来，直到成功
          </text>
          <text x="20" y="52" fontSize="11" fill="var(--text-secondary)">
            无锁栈 push：不上锁，靠「head 还是不是我以为的
            N，是才改、不是就重做」
          </text>

          {/* 左侧：head 指针格标题 */}
          <text
            x={HEAD_X + HEAD_W / 2}
            y={HEAD_Y - 10}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            栈顶指针 head
          </text>
          {/* head 格：底层常驻框 */}
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
          {/* head 值层：6 拍交替点亮 */}
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
                y={HEAD_Y + HEAD_H / 2 + 5}
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {h.val}
              </text>
            </g>
          ))}

          {/* 左侧 head 格下方：状态提示文字（两行，避免与步骤列重叠） */}
          <text
            x={HEAD_X + HEAD_W / 2}
            y={HEAD_Y + HEAD_H + 34}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill={FAIL_COLOR}
          >
            红 = 被别的线程
          </text>
          <text
            x={HEAD_X + HEAD_W / 2}
            y={HEAD_Y + HEAD_H + 50}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill={FAIL_COLOR}
          >
            抢先改走了
          </text>
          <text
            x={HEAD_X + HEAD_W / 2}
            y={HEAD_Y + HEAD_H + 78}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            CAS 只在 head
          </text>
          <text
            x={HEAD_X + HEAD_W / 2}
            y={HEAD_Y + HEAD_H + 94}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            == expected 时才改
          </text>

          {/* 右侧：6 步竖排，逐拍点亮 */}
          {STEP_NODES.map((n, i) => (
            <g
              key={n.id}
              ref={(el) => {
                stepRefs.current[n.id] = el;
              }}
              style={{ opacity: 0 }}
            >
              <rect
                x={STEP_X}
                y={stepY(i)}
                width={STEP_W}
                height={STEP_H}
                rx="8"
                fill={n.color}
                fillOpacity="0.14"
                stroke={n.color}
                strokeWidth="2"
              />
              <text
                x={STEP_X + 14}
                y={stepY(i) + STEP_H / 2 + 4}
                fontSize="11.5"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {n.text}
              </text>
            </g>
          ))}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="读 head(N) → 备 new(next=N) → CAS 失败(head 已被抢成 M) → 回填真实 head(M) → 重做(next=M) → 再 CAS 成功。失败不报错、只是带着真实值重来——这就是无锁的自旋。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CAS 重试循环是无锁栈 push 的核心：读一眼 head 当作
        expected、备好新节点，再用 CAS 试着把 head 换成新节点。只要 head 还是
        expected 就成功；被别的线程抢先改了就失败——失败不报错，CAS 顺手把真实
        head 回填进
        expected，重做一圈再试，直到成功。不上锁，靠「看一眼是不是原样」来协调。
      </figcaption>
    </figure>
  );
}
