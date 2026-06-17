"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <CASConceptDiagram>：compare_exchange_weak(expected, desired) 的分步流程动画（HEL-233）。
 *
 * 餐厅后厨隐喻：CAS = 「看一眼账上还是不是我以为的那个数，是才改、不是就把真实值记下来重来」。
 *  ① 读当前值 cur；② 比较 cur == expected？
 *  ③ 相等 → 把账上的值换成 desired，返回 true（改成功）；
 *  ④ 不等 → 把账上真实的 cur 写进 expected（更新「我以为的数」），返回 false（失败，调用方据此重试）。
 *
 * 一个原子操作里把「比较 + 交换」一气呵成，别的线程绝不会看到中间态——这正是上文
 * 「原子=要么全做要么全不做」的体现。两条分支动画分开点亮（成功绿 / 失败红）。
 *
 * 时间线 = 一条 anime.js timeline，6 拍：读 cur → 判等 → (相等支) 写 desired → 返回 true →
 * (不等支) 回填 expected → 返回 false。两条分支都点亮，让读者看清「成功改 / 失败回填重试」两条路。
 * label 锚定在「对应节点点亮到最亮」时刻（lit = beat 累加），与 CondVarWaitNotifyDiagram
 * 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 动态 import
 * 切独立 chunk（硬规则 2/6），经 mdx-components 注册后 page 侧懒加载。
 *
 * 视觉全部 DESIGN token（accent / success / danger / warning / border / text-* / bg），无裸 hex；
 * 时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 600;
const VIEW_H = 408; // 底部失败支节点底边 ~372，留 ~36px

const READ_COLOR = "var(--accent)"; // 读 / 比较
const OK_COLOR = "var(--success)"; // 成功支
const FAIL_COLOR = "var(--danger)"; // 失败支
const CMP_COLOR = "var(--warning)"; // 判等菱形

// —— 节点几何（流程：顶部读 → 判等菱形 → 左成功支 / 右失败支）——
const BOX_W = 224;
const BOX_H = 50;

// 顶部：读当前值。
const READ_X = (VIEW_W - BOX_W) / 2; // 居中
const READ_Y = 78;

// 判等菱形（中部居中）。
const DIA_CX = VIEW_W / 2;
const DIA_CY = 184;
const DIA_HALF = 56; // 菱形半宽/半高

// 成功支（左列）两步。
const OK_X = 40;
const OK_Y1 = 268; // 换成 desired
const OK_Y2 = 330; // 返回 true

// 失败支（右列）两步。
const FAIL_X = VIEW_W - 40 - BOX_W;
const FAIL_Y1 = 268; // 回填 expected
const FAIL_Y2 = 330; // 返回 false

type Node = {
  id: string;
  text: string;
  sub?: string;
  color: string;
  x: number;
  y: number;
};

const NODES: readonly Node[] = [
  {
    id: "read",
    text: "① 读当前值 cur",
    sub: "看一眼账上现在是多少",
    color: READ_COLOR,
    x: READ_X,
    y: READ_Y,
  },
  {
    id: "ok-swap",
    text: "③ 把值换成 desired",
    sub: "账上确实是我以为的数 → 改",
    color: OK_COLOR,
    x: OK_X,
    y: OK_Y1,
  },
  {
    id: "ok-return",
    text: "返回 true（成功）",
    color: OK_COLOR,
    x: OK_X,
    y: OK_Y2,
  },
  {
    id: "fail-store",
    text: "④ 把 cur 写进 expected",
    sub: "账上不是我以为的 → 记下真实值",
    color: FAIL_COLOR,
    x: FAIL_X,
    y: FAIL_Y1,
  },
  {
    id: "fail-return",
    text: "返回 false（失败 → 重试）",
    color: FAIL_COLOR,
    x: FAIL_X,
    y: FAIL_Y2,
  },
];

// 关键帧顺序：读 → 判等 → 成功支两步 → 失败支两步（6 拍）。
const STEPS: readonly TeachingStep[] = [
  {
    label: "read",
    caption: "① 读出原子变量当前值 cur——先看一眼账上现在到底是多少",
  },
  {
    label: "cmp",
    caption: "② 比较 cur == expected？看账上是不是我以为的那个数",
  },
  {
    label: "ok-swap",
    caption: "③ 相等：把值原子地换成 desired——比较和交换一气呵成，没有中间态",
  },
  {
    label: "ok-return",
    caption: "返回 true，告诉调用方「改成功了」",
  },
  {
    label: "fail-store",
    caption:
      "④ 不等：说明账被别人动过了。把真实的 cur 写进 expected，更新「我以为的数」",
  },
  {
    label: "fail-return",
    caption: "返回 false，调用方据此带着新的 expected 重来一次（重试循环）",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const BEAT_OF: Record<string, number> = Object.fromEntries(
  STEPS.map((s, i) => [s.label, i]),
);

export function CASConceptDiagram() {
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const diaRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 判等菱形（label "cmp"，第 2 拍）。
      if (diaRef.current) {
        const beat = BEAT_OF["cmp"] ?? 1;
        tl.add(
          diaRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label("cmp", TEACHING_BEAT_MS * (beat + 1));
      }
      NODES.forEach((n) => {
        const el = nodeRefs.current[n.id];
        if (!el) return;
        const beat = BEAT_OF[n.id] ?? 0;
        const lit = TEACHING_BEAT_MS * (beat + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label(n.id, lit);
      });
    },
  });

  const renderBox = (n: Node) => (
    <g
      key={n.id}
      ref={(el) => {
        nodeRefs.current[n.id] = el;
      }}
      style={{ opacity: 0 }}
    >
      <rect
        x={n.x}
        y={n.y}
        width={BOX_W}
        height={BOX_H}
        rx="8"
        fill={n.color}
        fillOpacity="0.16"
        stroke={n.color}
        strokeWidth="2"
      />
      <text
        x={n.x + BOX_W / 2}
        y={n.sub ? n.y + 20 : n.y + BOX_H / 2 + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill="var(--text-primary)"
      >
        {n.text}
      </text>
      {n.sub && (
        <text
          x={n.x + BOX_W / 2}
          y={n.y + 38}
          textAnchor="middle"
          fontSize="9.5"
          fill="var(--text-secondary)"
        >
          {n.sub}
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
          aria-label="compare_exchange_weak 的比较并交换流程动画。第一步读出原子变量的当前值 cur，看一眼账上现在是多少。第二步比较 cur 是否等于 expected。若相等，走左边成功分支：把原子变量的值原子地换成 desired，比较和交换一气呵成、没有中间态，然后返回 true 告诉调用方改成功了。若不等，走右边失败分支：说明账被别的线程动过了，于是把真实的 cur 写进 expected 更新「我以为的数」，然后返回 false，调用方据此带着新的 expected 重来一次，形成重试循环。播放时依次点亮读、判等、以及成功与失败两条分支，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="cas-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 标题 */}
          <text
            x="20"
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            CAS：看一眼是不是我以为的数，是才改
          </text>
          <text x="20" y="50" fontSize="11" fill="var(--text-secondary)">
            compare_exchange_weak(expected, desired)：比较 +
            交换，一个原子操作里完成
          </text>

          {/* 连线：读 → 菱形 */}
          <line
            x1={DIA_CX}
            y1={READ_Y + BOX_H}
            x2={DIA_CX}
            y2={DIA_CY - DIA_HALF}
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            markerEnd="url(#cas-arrow)"
            opacity="0.7"
          />

          {/* 连线：菱形左下 → 成功支（带「相等」标签） */}
          <path
            d={`M ${DIA_CX - DIA_HALF} ${DIA_CY} L ${OK_X + BOX_W / 2} ${DIA_CY} L ${OK_X + BOX_W / 2} ${OK_Y1}`}
            fill="none"
            stroke={OK_COLOR}
            strokeWidth="1.5"
            markerEnd="url(#cas-arrow)"
            opacity="0.8"
          />
          <text
            x={OK_X + BOX_W / 2 + 6}
            y={DIA_CY - 8}
            fontSize="11"
            fontWeight="700"
            fill={OK_COLOR}
          >
            相等 ✓
          </text>

          {/* 连线：菱形右下 → 失败支（带「不等」标签） */}
          <path
            d={`M ${DIA_CX + DIA_HALF} ${DIA_CY} L ${FAIL_X + BOX_W / 2} ${DIA_CY} L ${FAIL_X + BOX_W / 2} ${FAIL_Y1}`}
            fill="none"
            stroke={FAIL_COLOR}
            strokeWidth="1.5"
            markerEnd="url(#cas-arrow)"
            opacity="0.8"
          />
          <text
            x={FAIL_X + BOX_W / 2 - 6}
            y={DIA_CY - 8}
            textAnchor="end"
            fontSize="11"
            fontWeight="700"
            fill={FAIL_COLOR}
          >
            不等 ✗
          </text>

          {/* 连线：成功支两步之间 */}
          <line
            x1={OK_X + BOX_W / 2}
            y1={OK_Y1 + BOX_H}
            x2={OK_X + BOX_W / 2}
            y2={OK_Y2}
            stroke={OK_COLOR}
            strokeWidth="1.5"
            markerEnd="url(#cas-arrow)"
            opacity="0.8"
          />
          {/* 连线：失败支两步之间 */}
          <line
            x1={FAIL_X + BOX_W / 2}
            y1={FAIL_Y1 + BOX_H}
            x2={FAIL_X + BOX_W / 2}
            y2={FAIL_Y2}
            stroke={FAIL_COLOR}
            strokeWidth="1.5"
            markerEnd="url(#cas-arrow)"
            opacity="0.8"
          />

          {/* 顶部读节点 */}
          {renderBox(NODES[0])}

          {/* 判等菱形：底框常驻 + 高亮层 */}
          <polygon
            points={`${DIA_CX},${DIA_CY - DIA_HALF} ${DIA_CX + DIA_HALF},${DIA_CY} ${DIA_CX},${DIA_CY + DIA_HALF} ${DIA_CX - DIA_HALF},${DIA_CY}`}
            fill={CMP_COLOR}
            fillOpacity="0.08"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <g ref={diaRef} style={{ opacity: 0 }}>
            <polygon
              points={`${DIA_CX},${DIA_CY - DIA_HALF} ${DIA_CX + DIA_HALF},${DIA_CY} ${DIA_CX},${DIA_CY + DIA_HALF} ${DIA_CX - DIA_HALF},${DIA_CY}`}
              fill={CMP_COLOR}
              fillOpacity="0.2"
              stroke={CMP_COLOR}
              strokeWidth="2"
            />
            <text
              x={DIA_CX}
              y={DIA_CY - 6}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              ② cur ==
            </text>
            <text
              x={DIA_CX}
              y={DIA_CY + 12}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              expected ?
            </text>
          </g>

          {/* 成功支 / 失败支节点 */}
          {NODES.slice(1).map(renderBox)}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="读 cur → 比较 cur==expected：相等就换成 desired 返回 true（成功）；不等就把真实 cur 回填进 expected 返回 false（失败→重试）。比较与交换在一个原子操作里完成。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CAS（比较并交换）：compare_exchange_weak 把「比较 cur 是否等于
        expected」和「相等才换成 desired」打包成一个不可分割的原子操作。相等返回
        true（改成功）；不等返回 false，并把真实值回填进
        expected——调用方据此重试。这是后续无锁编程的基石。
      </figcaption>
    </figure>
  );
}
