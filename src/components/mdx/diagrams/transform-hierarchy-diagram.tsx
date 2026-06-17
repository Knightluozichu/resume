"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <TransformHierarchyDiagram>：父子层级「父动子跟」的可控教学动画（HEL-280，B 数学型辅图）。
 *
 * 数字片场隐喻：Player（演员）身上挂着两件道具——Weapon（武器）、Hat（帽子）。
 * 道具是 Player 的「子物体」，挂在它身上；Player 一移动 / 一转身，道具就跟着一起动，
 * 而道具相对 Player 的「局部位置」始终不变。这正是父子层级（parent-child）的核心。
 *
 * 左侧画一棵层级树（Player → Weapon、Hat），右侧画一个俯视小场景：
 *  ① 起始：Player 在原地，Weapon/Hat 各自挂在它身上（相对位置固定）。
 *  ② Player 整体向右平移——子物体跟着平移。
 *  ③ 高亮「子的局部位置没变」：Weapon/Hat 相对 Player 的偏移和第①步一模一样。
 *  ④ Player 绕自己转一个角度——子物体跟着绕 Player 一起转。
 *  ⑤ 收束：父动子跟，局部位置恒定——这就是层级变换。
 *
 * 时间线 = 一条 anime.js timeline（5 个 beat）。整组「Player + 两子物体」用一个 <g>
 * 一起平移 / 旋转（transform 作用于父，子自动跟随），与 SceneHierarchyDiagram 同款
 * label 锚点：lit = BEAT*(i+1)（落在该 beat 动作完成时刻，修正 off-by-one）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条是真交互。anime.js 经 useTeachingTimeline 内部
 * 动态 import 切独立 chunk（硬规则 2/6），经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / border / text-* / bg-elevated），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

const VIEW_W = 700;
const VIEW_H = 360;

// 右侧小场景里 Player 的初始锚点（场景局部坐标原点）。
const STAGE_X = 470;
const STAGE_Y = 210;

// 子物体相对 Player 的「局部偏移」（恒定，整个动画不变）。
const WEAPON_OFF = { x: 46, y: -8 };
const HAT_OFF = { x: 0, y: -42 };

// 关键帧步骤（5 步）。caption 描述当前点亮 / 发生的事。
const STEPS: readonly TeachingStep[] = [
  {
    label: "s-rest",
    caption:
      "起始：Player 站在原地，Weapon、Hat 作为子物体挂在它身上（相对位置固定）",
  },
  {
    label: "s-move",
    caption: "Player 整体向右移动——Weapon、Hat 这两个子物体跟着一起平移过去",
  },
  {
    label: "s-keep",
    caption:
      "注意：子物体相对 Player 的「局部位置」没变，武器还在右手、帽子还在头顶",
  },
  {
    label: "s-rotate",
    caption: "Player 转身——子物体也跟着绕 Player 一起转，相对朝向依旧不变",
  },
  {
    label: "s-summary",
    caption: "父动，子跟着动；子的局部位置恒定——这就是父子层级变换",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function TransformHierarchyDiagram() {
  // 整组（Player + 两子物体）的 transform 容器：平移用它、旋转用它，子自动跟随。
  const rigRef = useRef<SVGGElement | null>(null);
  // 各高亮叠加层。
  const treeChildrenRef = useRef<SVGGElement | null>(null);
  const keepHintRef = useRef<SVGGElement | null>(null);
  const moveArrowRef = useRef<SVGGElement | null>(null);
  const rotateHintRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fadeIn = (
        el: SVGElement | null,
        start: number,
        dur = TEACHING_BEAT_MS,
      ) => {
        if (!el) return;
        tl.add(el, { opacity: [0, 1], duration: dur, ease: "out(3)" }, start);
      };

      // ① 起始：层级树两个子节点淡入（Player 根 + 场景始终可见）。
      fadeIn(treeChildrenRef.current, 0);
      tl.label("s-rest", TEACHING_BEAT_MS);

      // ② Player 整组向右平移（rig 的 translateX：0 → 110），同时移动箭头淡入。
      const t2 = TEACHING_BEAT_MS;
      fadeIn(moveArrowRef.current, t2);
      if (rigRef.current) {
        tl.add(
          rigRef.current,
          {
            translateX: [0, 110],
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          t2,
        );
      }
      tl.label("s-move", TEACHING_BEAT_MS * 2);

      // ③ 高亮「局部位置不变」提示（连接 Player 与子物体的等距虚线 + 文案）。
      const t3 = TEACHING_BEAT_MS * 2;
      fadeIn(keepHintRef.current, t3);
      tl.label("s-keep", TEACHING_BEAT_MS * 3);

      // ④ Player 整组旋转（rig 绕自身锚点旋转 0 → 32°，子物体随父转），旋转提示淡入。
      const t4 = TEACHING_BEAT_MS * 3;
      fadeIn(rotateHintRef.current, t4);
      if (rigRef.current) {
        tl.add(
          rigRef.current,
          { rotate: [0, 32], duration: TEACHING_BEAT_MS, ease: "inOut(2)" },
          t4,
        );
      }
      tl.label("s-rotate", TEACHING_BEAT_MS * 4);

      // ⑤ 收束：无新增动作，停在最终态供阅读小结文案。
      tl.label("s-summary", TEACHING_BEAT_MS * 5);
    },
  });

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
          aria-label="父子层级父动子跟的动画。左侧是一棵层级树：根节点 Player 玩家，下面挂着两个子节点 Weapon 武器和 Hat 帽子。右侧是一个俯视小场景，Player 用一个圆表示，武器和帽子作为子物体挂在它身上，相对位置固定。动画分五步：第一步起始，Player 站在原地，武器在右手、帽子在头顶；第二步 Player 整体向右移动，武器和帽子跟着一起平移；第三步强调子物体相对 Player 的局部位置没有改变；第四步 Player 转身，子物体也跟着绕 Player 一起旋转；第五步收束，父动子跟、子的局部位置恒定，这就是父子层级变换。可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x="24"
            y="34"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            父子层级：父动，子跟着动
          </text>
          <text x="24" y="54" fontSize="11" fill="var(--text-secondary)">
            道具挂在演员身上——演员一走一转，道具就跟着
          </text>

          {/* ===== 左侧层级树 ===== */}
          {/* Player 根节点 */}
          <rect
            x="40"
            y="96"
            width="150"
            height="40"
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.16"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x="115"
            y="121"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Player（父）
          </text>

          {/* 连线 + 两个子节点 */}
          <g ref={treeChildrenRef} opacity="0">
            <path
              d="M70 136 L70 176 L110 176"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
            />
            <path
              d="M70 136 L70 224 L110 224"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
            />
            <rect
              x="110"
              y="158"
              width="140"
              height="36"
              rx="7"
              fill="var(--warning)"
              fillOpacity="0.14"
              stroke="var(--warning)"
              strokeWidth="1.4"
            />
            <text
              x="180"
              y="181"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              Weapon（子）
            </text>
            <rect
              x="110"
              y="206"
              width="140"
              height="36"
              rx="7"
              fill="var(--success)"
              fillOpacity="0.14"
              stroke="var(--success)"
              strokeWidth="1.4"
            />
            <text
              x="180"
              y="229"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              Hat（子）
            </text>
          </g>

          {/* 分隔竖线 */}
          <line
            x1="292"
            y1="80"
            x2="292"
            y2="324"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* ===== 右侧小场景 ===== */}
          <text
            x="490"
            y="92"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            俯视小场景
          </text>

          {/* 移动箭头提示 */}
          <g ref={moveArrowRef} opacity="0">
            <line
              x1={STAGE_X - 30}
              y1={STAGE_Y + 60}
              x2={STAGE_X + 120}
              y2={STAGE_Y + 60}
              stroke="var(--accent)"
              strokeWidth="1.8"
              markerEnd="url(#th-arrow)"
            />
            <text
              x={STAGE_X + 45}
              y={STAGE_Y + 80}
              textAnchor="middle"
              fontSize="11"
              fill="var(--accent)"
            >
              Player 向右移动
            </text>
          </g>

          {/* 整组 rig：Player + 两子物体，一起平移 / 旋转 */}
          <g
            ref={rigRef}
            style={{ transformOrigin: `${STAGE_X}px ${STAGE_Y}px` }}
          >
            {/* Player 本体（圆 + 朝向短线） */}
            <circle
              cx={STAGE_X}
              cy={STAGE_Y}
              r="20"
              fill="var(--accent)"
              fillOpacity="0.2"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <line
              x1={STAGE_X}
              y1={STAGE_Y}
              x2={STAGE_X}
              y2={STAGE_Y - 30}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={STAGE_X}
              y={STAGE_Y + 5}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              P
            </text>

            {/* Weapon 子物体（挂在右手，恒定局部偏移） */}
            <rect
              x={STAGE_X + WEAPON_OFF.x - 10}
              y={STAGE_Y + WEAPON_OFF.y - 10}
              width="20"
              height="20"
              rx="4"
              fill="var(--warning)"
              fillOpacity="0.22"
              stroke="var(--warning)"
              strokeWidth="1.6"
            />
            <text
              x={STAGE_X + WEAPON_OFF.x}
              y={STAGE_Y + WEAPON_OFF.y + 4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              W
            </text>

            {/* Hat 子物体（挂在头顶，恒定局部偏移） */}
            <rect
              x={STAGE_X + HAT_OFF.x - 11}
              y={STAGE_Y + HAT_OFF.y - 9}
              width="22"
              height="18"
              rx="4"
              fill="var(--success)"
              fillOpacity="0.22"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x={STAGE_X + HAT_OFF.x}
              y={STAGE_Y + HAT_OFF.y + 4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              H
            </text>

            {/* ③ 局部位置不变提示：Player 到两子物体的等距虚线 */}
            <g ref={keepHintRef} opacity="0">
              <line
                x1={STAGE_X}
                y1={STAGE_Y}
                x2={STAGE_X + WEAPON_OFF.x}
                y2={STAGE_Y + WEAPON_OFF.y}
                stroke="var(--warning)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <line
                x1={STAGE_X}
                y1={STAGE_Y}
                x2={STAGE_X + HAT_OFF.x}
                y2={STAGE_Y + HAT_OFF.y}
                stroke="var(--success)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            </g>
          </g>

          {/* ③ 局部位置不变的文字说明（放在场景下方固定处，不随 rig 动） */}
          <text
            x="490"
            y="318"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            W 始终在右手、H 始终在头顶：局部偏移恒定
          </text>

          {/* ④ 旋转提示 */}
          <g ref={rotateHintRef} opacity="0">
            <text
              x="490"
              y="110"
              textAnchor="middle"
              fontSize="11"
              fill="var(--success)"
            >
              ↻ Player 转身，子物体随父一起转
            </text>
          </g>

          <defs>
            <marker
              id="th-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：让 Player 走两步、再转个身，挂在它身上的武器和帽子会怎样？单步看「父动子跟」。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        子物体（Weapon、Hat）挂在父物体（Player）身上：父一平移、一旋转，子就跟着一起动，而子相对父的「局部位置」始终不变——这就是父子层级变换。
      </figcaption>
    </figure>
  );
}
