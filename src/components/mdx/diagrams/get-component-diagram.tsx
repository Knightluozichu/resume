"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <GetComponentDiagram>：GetComponent<T>() 按类型取组件的可控教学动画（HEL-282）。
 *
 * 数字片场隐喻——脚本想用某件装备，得先「在这个演员身上按类型找到它」。
 * 一个 GameObject 的组件栈（Transform / Rigidbody / AudioSource），脚本发出一条
 * 「探针」按类型去栈里找，分 3 步：
 *  ① 这个 GameObject 上挂着三个组件（组件栈）。
 *  ② GetComponent<Rigidbody>()：探针伸进栈、命中 Rigidbody（高亮）并返回这个引用。
 *  ③ GetComponent<Light>()：栈里没有 Light，探针落空——返回 null（标红警示）。
 *
 * 每步用 anime.js timeline 控制探针线 + 命中高亮 / 落空红标的可见性。
 * label 锚定「该步动作完成」的时刻（lit = BEAT*(i+1)），修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；组件卡两两不重叠。
 */

const VIEW_W = 640;
const VIEW_H = 400;

// 组件栈：GameObject 卡头 + 三个组件卡，竖直堆叠在右侧。
const STACK_X = 360;
const STACK_W = 248;
const HEAD_Y = 78;
const HEAD_H = 40;
const CARD_H = 50;
const CARD_GAP = 12;
const FIRST_CARD_Y = HEAD_Y + HEAD_H + 18;
const cardY = (i: number) => FIRST_CARD_Y + i * (CARD_H + CARD_GAP);

// 探针发射点（左侧脚本调用处）。
const PROBE_X = 40;
const PROBE_W = 280;

type Comp = { name: string; note: string };
const COMPS: readonly Comp[] = [
  { name: "Transform", note: "位置 / 旋转 / 缩放" },
  { name: "Rigidbody", note: "物理：受力、速度" },
  { name: "AudioSource", note: "播放声音" },
];

// 命中的目标是 Rigidbody（索引 1）。
const HIT_INDEX = 1;

const STEPS: readonly TeachingStep[] = [
  {
    label: "stack",
    caption:
      "① 这个 GameObject 上挂着三个组件（组件栈）：Transform、Rigidbody、AudioSource",
  },
  {
    label: "hit",
    caption:
      "② GetComponent<Rigidbody>()：按「类型」去栈里找——命中 Rigidbody，返回这个组件的引用",
  },
  {
    label: "miss",
    caption:
      "③ GetComponent<Light>()：栈里根本没挂 Light——找不到，返回 null（用前不判空就 NullReference）",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GetComponentDiagram() {
  const hitProbeRef = useRef<SVGGElement | null>(null);
  const hitGlowRef = useRef<SVGRectElement | null>(null);
  const missProbeRef = useRef<SVGGElement | null>(null);
  const missMarkRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 步②：命中探针 + Rigidbody 高亮淡入（start = BEAT*1）。
      const s1 = TEACHING_BEAT_MS * 1;
      if (hitProbeRef.current) {
        tl.add(
          hitProbeRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      if (hitGlowRef.current) {
        tl.add(
          hitGlowRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s1,
        );
      }
      tl.label("hit", TEACHING_BEAT_MS * 2);

      // 步③：落空探针 + null 红标淡入（start = BEAT*2）。
      const s2 = TEACHING_BEAT_MS * 2;
      if (missProbeRef.current) {
        tl.add(
          missProbeRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      if (missMarkRef.current) {
        tl.add(
          missMarkRef.current,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          s2,
        );
      }
      tl.label("miss", TEACHING_BEAT_MS * 3);

      tl.label("stack", 0);
    },
  });

  const hitCardCY = cardY(HIT_INDEX) + CARD_H / 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GetComponent 按类型取组件的动画。右侧是一个 GameObject 的组件栈，从上到下挂着 Transform、Rigidbody、AudioSource 三个组件。左侧是脚本里的调用。动画分三步：第一步展示组件栈；第二步脚本调用 GetComponent<Rigidbody>()，一条探针按类型伸进栈，命中 Rigidbody 并把它高亮，返回这个组件的引用；第三步脚本调用 GetComponent<Light>()，但栈里根本没挂 Light，探针落空，返回 null，提示如果用前不判空就会 NullReference 异常。动画可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={32}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            GetComponent&lt;T&gt;()：按类型在这个对象身上找组件
          </text>
          <text
            x={VIEW_W / 2}
            y={54}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            找到 → 返回引用；没挂这个类型 → 返回 null
          </text>

          {/* ===== 右侧：GameObject 组件栈头 ===== */}
          <rect
            x={STACK_X}
            y={HEAD_Y}
            width={STACK_W}
            height={HEAD_H}
            rx="9"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={STACK_X + STACK_W / 2}
            y={HEAD_Y + HEAD_H / 2 + 4}
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            GameObject「Player」的组件栈
          </text>

          {/* ===== 三个组件卡 ===== */}
          {COMPS.map((c, i) => (
            <g key={c.name}>
              <rect
                x={STACK_X}
                y={cardY(i)}
                width={STACK_W}
                height={CARD_H}
                rx="8"
                fill="var(--text-secondary)"
                fillOpacity="0.07"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={STACK_X + 14}
                y={cardY(i) + CARD_H / 2 - 4}
                fontSize="12.5"
                fontWeight="600"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {c.name}
              </text>
              <text
                x={STACK_X + 14}
                y={cardY(i) + CARD_H / 2 + 13}
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {c.note}
              </text>
            </g>
          ))}

          {/* ===== 命中高亮：Rigidbody 卡描边变绿（覆在原卡上，同位叠加） ===== */}
          <rect
            ref={hitGlowRef}
            x={STACK_X}
            y={cardY(HIT_INDEX)}
            width={STACK_W}
            height={CARD_H}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.16"
            stroke="var(--success)"
            strokeWidth="2"
            opacity="0"
          />

          {/* ===== 步②：命中探针（脚本 → Rigidbody 卡，绿） ===== */}
          <g ref={hitProbeRef} opacity="0">
            <rect
              x={PROBE_X}
              y={hitCardCY - 26}
              width={PROBE_W}
              height={52}
              rx="8"
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x={PROBE_X + 14}
              y={hitCardCY - 6}
              fontSize="11.5"
              fontFamily="var(--font-mono)"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              GetComponent&lt;Rigidbody&gt;()
            </text>
            <text
              x={PROBE_X + 14}
              y={hitCardCY + 12}
              fontSize="10"
              fill="var(--success)"
            >
              命中 → 返回 Rigidbody 引用
            </text>
            <line
              x1={PROBE_X + PROBE_W + 4}
              y1={hitCardCY}
              x2={STACK_X - 4}
              y2={hitCardCY}
              stroke="var(--success)"
              strokeWidth="2"
              markerEnd="url(#gcd-hit-arrow)"
            />
          </g>

          {/* ===== 步③：落空探针（脚本 → 栈外，红，返回 null） ===== */}
          <g ref={missProbeRef} opacity="0">
            <rect
              x={PROBE_X}
              y={cardY(2) + CARD_H + 22}
              width={PROBE_W}
              height={52}
              rx="8"
              fill="var(--danger)"
              fillOpacity="0.1"
              stroke="var(--danger)"
              strokeWidth="1.6"
            />
            <text
              x={PROBE_X + 14}
              y={cardY(2) + CARD_H + 42}
              fontSize="11.5"
              fontFamily="var(--font-mono)"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              GetComponent&lt;Light&gt;()
            </text>
            <text
              x={PROBE_X + 14}
              y={cardY(2) + CARD_H + 60}
              fontSize="10"
              fill="var(--danger)"
            >
              栈里没有 Light → 返回 null
            </text>
            <line
              x1={PROBE_X + PROBE_W + 4}
              y1={cardY(2) + CARD_H + 48}
              x2={STACK_X - 4}
              y2={cardY(2) + CARD_H + 48}
              stroke="var(--danger)"
              strokeWidth="2"
              strokeDasharray="5 4"
              markerEnd="url(#gcd-miss-arrow)"
            />
          </g>

          {/* ===== null 红标（栈底外侧，提示没有该类型） ===== */}
          <g ref={missMarkRef} opacity="0">
            <rect
              x={STACK_X}
              y={cardY(2) + CARD_H + 22}
              width={STACK_W}
              height={52}
              rx="8"
              fill="var(--danger)"
              fillOpacity="0.08"
              stroke="var(--danger)"
              strokeWidth="1.6"
              strokeDasharray="5 4"
            />
            <text
              x={STACK_X + STACK_W / 2}
              y={cardY(2) + CARD_H + 44}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--danger)"
            >
              null
            </text>
            <text
              x={STACK_X + STACK_W / 2}
              y={cardY(2) + CARD_H + 61}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              栈里没挂 Light 这个类型
            </text>
          </g>

          <defs>
            <marker
              id="gcd-hit-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
            <marker
              id="gcd-miss-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：GetComponent 取一个对象身上「没挂」的组件类型，会返回什么？单步走到第③步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GetComponent&lt;T&gt;()
        按「类型」去对象的组件栈里找：挂着就返回那个组件的引用，
        没挂这个类型就返回 null。所以拿到结果先判空，再用。
      </figcaption>
    </figure>
  );
}
