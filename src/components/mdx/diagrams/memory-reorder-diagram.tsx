"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <MemoryReorderDiagram>：relaxed 下重排序 / 可见性的「源码顺序 vs 实际可见顺序」对照动画（HEL-234，§3 辅 Demo）。
 *
 * 餐厅后厨隐喻：两个厨师各有一张「动作清单」（源码顺序写的是 A→B），但旁观者（另一线程）
 * 实际看到的发生顺序可能被编译器/CPU 为效率打乱成 B→A。
 *
 * 经典反直觉例子（两变量 x、y 初值 0，全用 memory_order_relaxed、无任何同步）：
 *  线程1 源码顺序：x = 1; y = 1;
 *  线程2 源码顺序：r1 = y; r2 = x;
 * 直觉以为「r1==1 就说明 x 也早写好了，r2 必为 1」。但 relaxed 不保证跨变量顺序/可见性：
 * 线程2 完全可能观察到 r1==1（看到了 y=1）却 r2==0（没看到 x=1）——因为写/读被重排或未及时可见。
 *
 * 时间线 = 一条 anime.js timeline，5 拍：
 *  ① 亮线程1 源码顺序 → ② 亮线程2 源码顺序 → ③ 重排发生（右栏：y=1 先可见、x=1 还没可见）→
 *  ④ 线程2 读 r1=y=1、r2=x=0 → ⑤ punchline「relaxed 不保证你以为的先后」高亮。
 * label 锚定在「对应元素点亮完成」时刻（lit = beat 累加），修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态 import 切
 * 独立 chunk（硬规则 2/6），经 mdx-components 注册后由 page 侧懒加载。
 *
 * 视觉全部 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS（硬规则 5）。
 * 几何：各 text 距 viewBox 任意边 ≥14px。
 */

const VIEW_W = 600;
const VIEW_H = 392; // 右栏末行底边 ~318，punchline 框底 ~366，留 ≥18px

const SRC_COLOR = "var(--accent)"; // 源码顺序
const SEEN_COLOR = "var(--warning)"; // 实际可见顺序（被重排）
const NEW_COLOR = "var(--success)"; // 看到了新值
const OLD_COLOR = "var(--danger)"; // 没看到（还是旧值 0）

// —— 两栏几何：左栏「你写的源码顺序」 / 右栏「线程2 实际可能看到」 ——
const COL_W = 264;
const LEFT_X = 28; // 左栏左缘
const RIGHT_X = VIEW_W - 28 - COL_W; // 右栏左缘 = 600-28-264 = 308

const LINE_H = 34; // 单条语句行高
const LINE_GAP = 8;

// 左栏：线程1 两行 + 线程2 两行（源码顺序）。
const L_T1_HEAD_Y = 96; // 「线程1 源码顺序」小标题 baseline
const L_T1_Y = 104; // 线程1 第一条语句框 y
const L_T2_HEAD_Y = 212;
const L_T2_Y = 220;

// 右栏：线程2 实际看到的事件（被重排/未及时可见）。
const R_HEAD_Y = 96;
const R_Y = 104; // 右栏第一条事件框 y

type Line = {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
  tag?: string; // 行尾小标（如「新值 ✓」「旧值 0 ✗」）
};

// 左栏源码顺序（4 行：线程1 两行、线程2 两行）。
const SRC_LINES: readonly Line[] = [
  { id: "s-x", text: "x = 1;", color: SRC_COLOR, x: LEFT_X, y: L_T1_Y },
  {
    id: "s-y",
    text: "y = 1;",
    color: SRC_COLOR,
    x: LEFT_X,
    y: L_T1_Y + LINE_H + LINE_GAP,
  },
  { id: "s-r1", text: "r1 = y;", color: SRC_COLOR, x: LEFT_X, y: L_T2_Y },
  {
    id: "s-r2",
    text: "r2 = x;",
    color: SRC_COLOR,
    x: LEFT_X,
    y: L_T2_Y + LINE_H + LINE_GAP,
  },
];

// 右栏「线程2 实际可能看到」（被重排：先看到 y=1，x=1 还没可见）。
const SEEN_LINES: readonly Line[] = [
  {
    id: "v-y",
    text: "看到 y = 1",
    color: NEW_COLOR,
    x: RIGHT_X,
    y: R_Y,
    tag: "→ r1 = 1（新值 ✓）",
  },
  {
    id: "v-x",
    text: "没看到 x = 1",
    color: OLD_COLOR,
    x: RIGHT_X,
    y: R_Y + LINE_H + LINE_GAP,
    tag: "→ r2 = 0（旧值 ✗）",
  },
];

// 关键帧（5 拍）。
const STEPS: readonly TeachingStep[] = [
  {
    label: "src1",
    caption: "线程1 的源码清单：先写 x = 1，再写 y = 1（全用 relaxed）",
  },
  {
    label: "src2",
    caption: "线程2 的源码清单：先读 r1 = y，再读 r2 = x",
  },
  {
    label: "reorder",
    caption:
      "③ relaxed 无同步：编译器/CPU 可重排，写也可能不及时可见——右栏是线程2 实际可能看到的顺序",
  },
  {
    label: "observe",
    caption:
      "④ 线程2 看到 y=1（r1=1），却还没看到 x=1（r2=0）——出现「r1=1 但 r2=0」的反直觉结果",
  },
  {
    label: "punch",
    caption:
      "⑤ relaxed 只保证单变量原子性，不保证跨变量的顺序与可见性——你以为的先后并不成立",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function MemoryReorderDiagram() {
  const src1Ref = useRef<SVGGElement | null>(null); // 线程1 两行
  const src2Ref = useRef<SVGGElement | null>(null); // 线程2 两行
  const reorderRef = useRef<SVGGElement | null>(null); // 右栏框架（重排发生）
  const observeRef = useRef<SVGGElement | null>(null); // 右栏读到的两行结果
  const punchRef = useRef<SVGGElement | null>(null); // punchline

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (el: Element | null, beat: number, label: string) => {
        if (el) {
          tl.add(
            el,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            TEACHING_BEAT_MS * beat,
          );
        }
        tl.label(label, TEACHING_BEAT_MS * (beat + 1));
      };
      fade(src1Ref.current, 0, "src1");
      fade(src2Ref.current, 1, "src2");
      fade(reorderRef.current, 2, "reorder");
      fade(observeRef.current, 3, "observe");
      fade(punchRef.current, 4, "punch");
    },
  });

  const renderCodeLine = (l: Line) => (
    <g key={l.id}>
      <rect
        x={l.x}
        y={l.y}
        width={COL_W}
        height={LINE_H}
        rx="6"
        fill={l.color}
        fillOpacity="0.14"
        stroke={l.color}
        strokeWidth="1.5"
      />
      <text
        x={l.x + 14}
        y={l.y + LINE_H / 2 + 4}
        fontSize="12.5"
        fontWeight="700"
        fontFamily="var(--font-mono)"
        fill="var(--text-primary)"
      >
        {l.text}
      </text>
      {l.tag && (
        <text
          x={l.x + COL_W - 14}
          y={l.y + LINE_H / 2 + 4}
          textAnchor="end"
          fontSize="10"
          fontWeight="600"
          fill={l.color}
        >
          {l.tag}
        </text>
      )}
    </g>
  );

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
          aria-label="relaxed 内存序下重排序与可见性的对照动画。左栏是你写的源码顺序：线程1 先写 x 等于 1、再写 y 等于 1；线程2 先读 r1 等于 y、再读 r2 等于 x，全部使用 memory_order_relaxed 且无任何同步。右栏是线程2 实际可能看到的顺序：由于 relaxed 不保证跨变量的顺序与可见性，写可能被重排或未及时可见，线程2 可能看到 y 等于 1（于是 r1 等于 1，新值），却还没看到 x 等于 1（于是 r2 等于 0，旧值），出现反直觉的「r1 等于 1 但 r2 等于 0」。最后点出 relaxed 只保证单变量原子性，不保证你以为的先后。播放时依次点亮线程1 源码、线程2 源码、重排发生、线程2 的观察结果、结论。可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* 标题 */}
          <text
            x="20"
            y="31"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            relaxed：源码顺序 ≠ 别人看到的顺序
          </text>
          <text x="20" y="48" fontSize="11" fill="var(--text-secondary)">
            x、y 初值 0，全用 memory_order_relaxed，无任何同步
          </text>

          {/* ===== 左栏：你写的源码顺序 ===== */}
          <text
            x={LEFT_X}
            y={68}
            fontSize="12"
            fontWeight="700"
            fill={SRC_COLOR}
          >
            你写的源码顺序
          </text>

          {/* 线程1 两行 */}
          <g ref={src1Ref} style={{ opacity: 0 }}>
            <text
              x={LEFT_X}
              y={L_T1_HEAD_Y}
              fontSize="11"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              线程1（写）
            </text>
            {renderCodeLine(SRC_LINES[0])}
            {renderCodeLine(SRC_LINES[1])}
          </g>

          {/* 线程2 两行 */}
          <g ref={src2Ref} style={{ opacity: 0 }}>
            <text
              x={LEFT_X}
              y={L_T2_HEAD_Y}
              fontSize="11"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              线程2（读）
            </text>
            {renderCodeLine(SRC_LINES[2])}
            {renderCodeLine(SRC_LINES[3])}
          </g>

          {/* ===== 右栏：线程2 实际可能看到 ===== */}
          <text
            x={RIGHT_X}
            y={68}
            fontSize="12"
            fontWeight="700"
            fill={SEEN_COLOR}
          >
            线程2 实际可能看到
          </text>

          {/* 重排框架（③ 那拍出现）：右栏小标题 + 提示 */}
          <g ref={reorderRef} style={{ opacity: 0 }}>
            <text
              x={RIGHT_X}
              y={R_HEAD_Y}
              fontSize="11"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              写被重排 / 未及时可见
            </text>
          </g>

          {/* 线程2 观察到的两行结果（④ 那拍出现） */}
          <g ref={observeRef} style={{ opacity: 0 }}>
            {renderCodeLine(SEEN_LINES[0])}
            {renderCodeLine(SEEN_LINES[1])}
          </g>

          {/* punchline（⑤）：底部一条强调 */}
          <g ref={punchRef} style={{ opacity: 0 }}>
            <rect
              x={LEFT_X}
              y={328}
              width={VIEW_W - 2 * LEFT_X}
              height={36}
              rx="8"
              fill={SEEN_COLOR}
              fillOpacity="0.12"
              stroke={SEEN_COLOR}
              strokeWidth="1.5"
            />
            <text
              x={VIEW_W / 2}
              y={350}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              relaxed 只保证「单变量原子性」，不保证跨变量的顺序与可见性
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="左栏是你写的源码顺序，右栏是线程2 在 relaxed 下实际可能看到的顺序：r1=1（看到了 y=1）却 r2=0（没看到 x=1）。relaxed 不保证你以为的先后。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        重排序与可见性：在 memory_order_relaxed 下，编译器/CPU
        可为效率重排，且一个线程的写未必及时对另一个线程可见。所以线程2
        可能读到「r1=1 但 r2=0」这种违背源码先后的结果——这正是 relaxed
        不保证跨变量顺序的真相，要建立顺序必须靠 acquire-release 配对。
      </figcaption>
    </figure>
  );
}
