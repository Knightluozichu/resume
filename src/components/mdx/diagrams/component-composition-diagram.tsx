"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ComponentCompositionDiagram>：「空壳 GameObject → 逐个挂组件、逐项点亮能力」的可控教学动画
 * （HEL-279，《Unity 5 权威讲解》第2章 §5 主图）。
 *
 * 数字片场隐喻：GameObject 是个什么都不会的空壳「演员」，给它挂一张张技能卡（Component），
 * 它才一项项有了本事。分 5 步：
 *  ① 初态：一个灰色空 GameObject —— 没有位置、画不出、不碰撞、没玩法（屏幕上看不到）。
 *  ② 挂 Transform → 它有了「位置/朝向/大小」这项能力。
 *  ③ 挂 MeshRenderer → 它「画得出来」（屏幕上才看得见）。
 *  ④ 挂 Collider → 它「能碰撞」。
 *  ⑤ 挂 PlayerScript → 它「有了玩法逻辑」。
 *
 * 每挂一个组件，右侧对应的组件卡淡入「亮起」，同时左侧空壳里对应的「能力徽标」点亮：
 * 组件卡与能力徽标一一对应，直观演示「能力靠挂组件来」。
 *
 * 时间线 = 一条 anime.js timeline（5 个 beat）。第 i 个组件在 [BEAT*i, BEAT*(i+1)] 淡入，
 * label 锚定在「该组件 + 对应能力徽标点亮到最亮」的时刻（lit = BEAT*(i+1)），
 * 与 SceneHierarchyDiagram / EditPlayLoopDiagram 同款写法，修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline 内部
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

const VIEW_W = 700;
const VIEW_H = 400;

const PAD = 18; // 内容距 viewBox 边的安全留白（≥14px 红线，留足余量）

// 左侧：空壳 GameObject 大框（含内部能力徽标列）。
const SHELL_X = PAD;
const SHELL_Y = 92;
const SHELL_W = 300;
const SHELL_H = 280;

// 右侧：组件卡列。
const CARD_W = 300;
const CARD_X = VIEW_W - PAD - CARD_W;
const CARD_H = 56;
const CARD_GAP = 12;
const CARD_TOP = 92; // 首张组件卡 y

// 每个组件：组件卡（右）+ 对应能力徽标（左壳内）一一对应。
type Comp = {
  id: string;
  name: string; // 组件名（等宽）
  note: string; // 组件一句作用
  ability: string; // 点亮的能力（左壳内徽标文案）
  color: string;
};

// 顺序即挂载顺序，与步骤 ②③④⑤ 对齐。
const COMPS: readonly Comp[] = [
  {
    id: "c-transform",
    name: "Transform",
    note: "位置 / 朝向 / 大小",
    ability: "有了位置",
    color: "var(--accent)",
  },
  {
    id: "c-renderer",
    name: "MeshRenderer",
    note: "把网格画到屏幕上",
    ability: "画得出来",
    color: "var(--success)",
  },
  {
    id: "c-collider",
    name: "Collider",
    note: "占据空间、能被碰到",
    ability: "能碰撞",
    color: "var(--warning)",
  },
  {
    id: "c-script",
    name: "PlayerScript",
    note: "你写的玩法逻辑",
    ability: "有了玩法",
    color: "var(--danger)",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "s-empty",
    caption:
      "初态：一个空 GameObject——没位置、画不出、不碰撞、没玩法，屏幕上根本看不到它",
  },
  {
    label: "s-transform",
    caption:
      "挂上 Transform：它终于「有了位置」——Transform 是每个 GameObject 必有、删不掉的组件",
  },
  {
    label: "s-renderer",
    caption: "挂上 MeshRenderer：它「画得出来」了，这下屏幕上才看得见",
  },
  {
    label: "s-collider",
    caption: "挂上 Collider：它「能碰撞」了，会被其它物体撞到、能踩在地面上",
  },
  {
    label: "s-script",
    caption:
      "挂上 PlayerScript：它「有了玩法」——能读输入、能动起来。空壳变成了角色",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function ComponentCompositionDiagram() {
  const cardRefs = useRef<Record<string, SVGGElement | null>>({});
  const abilityRefs = useRef<Record<string, SVGGElement | null>>({});
  const arrowRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fadeIn = (el: SVGElement | null, start: number) => {
        if (!el) return;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          start,
        );
      };

      // ① 初态：空壳已在初始 DOM 里显示（opacity 1），此处只打 label。
      tl.label("s-empty", 0);

      // ②③④⑤ 第 i 个组件在 [BEAT*i, BEAT*(i+1)] 淡入，lit = BEAT*(i+1)。
      COMPS.forEach((comp, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        fadeIn(cardRefs.current[comp.id], start); // 右侧组件卡亮起
        fadeIn(arrowRefs.current[comp.id], start); // 挂载箭头亮起
        fadeIn(abilityRefs.current[comp.id], start); // 左壳对应能力徽标亮起
        tl.label(STEPS[i + 1].label, lit);
      });
    },
  });

  // 能力徽标列（左壳内）的纵向锚点：与右侧组件卡同高，方便视觉对位。
  const ABILITY_H = CARD_H;
  const ABILITY_X = SHELL_X + 16;
  const ABILITY_W = SHELL_W - 32;
  const ABILITY_TOP = CARD_TOP; // 与组件卡顶对齐

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
          aria-label="空壳 GameObject 逐个挂组件、逐项点亮能力的动画。左边是一个名为 Player 的 GameObject 空壳，初始状态什么能力都没有，所以屏幕上根本看不到它。右边竖排四张组件卡，按顺序逐张亮起被挂到 GameObject 上：第一张 Transform 提供位置朝向大小，挂上后左侧点亮「有了位置」；第二张 MeshRenderer 负责把网格画到屏幕上，挂上后点亮「画得出来」；第三张 Collider 让它占据空间、能被碰到，挂上后点亮「能碰撞」；第四张 PlayerScript 是你写的玩法逻辑，挂上后点亮「有了玩法」。右侧每张组件卡与左侧空壳里的一项能力徽标一一对应，直观说明 GameObject 的能力全靠挂组件来。动画分五步，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={PAD}
            y={32}
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            空壳 GameObject + 挂组件 = 一项项长出本事
          </text>
          <text x={PAD} y={52} fontSize="11" fill="var(--text-secondary)">
            GameObject 本身什么都不会，挂上组件（技能卡）才有能力
          </text>

          {/* ===== 列标题 ===== */}
          <text
            x={SHELL_X + SHELL_W / 2}
            y={78}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            GameObject「Player」（空壳 + 已点亮的能力）
          </text>
          <text
            x={CARD_X + CARD_W / 2}
            y={78}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            逐个挂上的组件（Component）
          </text>

          {/* ===== 左：空壳 GameObject 大框 ===== */}
          <rect
            x={SHELL_X}
            y={SHELL_Y}
            width={SHELL_W}
            height={SHELL_H}
            rx="10"
            fill="var(--text-secondary)"
            fillOpacity="0.05"
            stroke="var(--text-secondary)"
            strokeWidth="1.6"
            strokeOpacity="0.5"
            strokeDasharray="6 5"
          />

          {/* 左壳内：四个能力徽标（初始 opacity 0，挂对应组件时点亮）。
              未点亮时这里是「灰格子」底，点亮的彩色徽标叠在其上方淡入。 */}
          {COMPS.map((comp, i) => {
            const y = ABILITY_TOP + i * (ABILITY_H + CARD_GAP);
            return (
              <g key={`slot-${comp.id}`}>
                {/* 未点亮的灰底槽位（常驻，提示「这里待点亮一项能力」） */}
                <rect
                  x={ABILITY_X}
                  y={y}
                  width={ABILITY_W}
                  height={ABILITY_H}
                  rx="7"
                  fill="var(--text-secondary)"
                  fillOpacity="0.06"
                  stroke="var(--text-secondary)"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="4 4"
                />
                <text
                  x={ABILITY_X + ABILITY_W / 2}
                  y={y + ABILITY_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                  fillOpacity="0.7"
                >
                  待点亮
                </text>
              </g>
            );
          })}

          {/* 点亮态能力徽标（叠在灰槽上，同位置同尺寸 → 滤同位叠加范式，不算重叠） */}
          {COMPS.map((comp, i) => {
            const y = ABILITY_TOP + i * (ABILITY_H + CARD_GAP);
            return (
              <g
                key={`ability-${comp.id}`}
                ref={(el) => {
                  abilityRefs.current[comp.id] = el;
                }}
                opacity="0"
              >
                <rect
                  x={ABILITY_X}
                  y={y}
                  width={ABILITY_W}
                  height={ABILITY_H}
                  rx="7"
                  fill={comp.color}
                  fillOpacity="0.16"
                  stroke={comp.color}
                  strokeWidth="1.4"
                />
                <circle
                  cx={ABILITY_X + 18}
                  cy={y + ABILITY_H / 2}
                  r="5"
                  fill={comp.color}
                />
                <text
                  x={ABILITY_X + 34}
                  y={y + ABILITY_H / 2 + 4}
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {comp.ability}
                </text>
              </g>
            );
          })}

          {/* ===== 右：四张组件卡 + 各自挂载箭头 ===== */}
          {COMPS.map((comp, i) => {
            const y = CARD_TOP + i * (CARD_H + CARD_GAP);
            const abilityY = ABILITY_TOP + i * (ABILITY_H + CARD_GAP);
            return (
              <g key={comp.id}>
                {/* 挂载箭头：组件卡 → 左壳对应能力徽标（与组件同步淡入） */}
                <g
                  ref={(el) => {
                    arrowRefs.current[comp.id] = el;
                  }}
                  opacity="0"
                >
                  <line
                    x1={CARD_X - 4}
                    y1={y + CARD_H / 2}
                    x2={ABILITY_X + ABILITY_W + 6}
                    y2={abilityY + ABILITY_H / 2}
                    stroke={comp.color}
                    strokeWidth="1.6"
                    strokeOpacity="0.7"
                    markerEnd={`url(#cc-arrow-${comp.id})`}
                  />
                </g>

                {/* 组件卡本体 */}
                <g
                  ref={(el) => {
                    cardRefs.current[comp.id] = el;
                  }}
                  opacity="0"
                >
                  <rect
                    x={CARD_X}
                    y={y}
                    width={CARD_W}
                    height={CARD_H}
                    rx="8"
                    fill={comp.color}
                    fillOpacity="0.14"
                    stroke={comp.color}
                    strokeWidth="1.4"
                  />
                  <text
                    x={CARD_X + 16}
                    y={y + 24}
                    fontSize="13"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-primary)"
                  >
                    {comp.name}
                  </text>
                  <text
                    x={CARD_X + 16}
                    y={y + 42}
                    fontSize="11"
                    fill="var(--text-secondary)"
                  >
                    {comp.note}
                  </text>
                </g>
              </g>
            );
          })}

          <defs>
            {COMPS.map((comp) => (
              <marker
                key={`m-${comp.id}`}
                id={`cc-arrow-${comp.id}`}
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 z" fill={comp.color} />
              </marker>
            ))}
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：新建一个空 GameObject，它能在屏幕上看到吗？为什么？单步挂上组件看答案——只有挂了 MeshRenderer，它才画得出来。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GameObject 是个空壳，本身什么都不会。每挂上一个组件，它就长出一项能力：
        Transform 给位置、MeshRenderer 让它画得出、Collider
        让它能碰撞、脚本给它玩法。 这就是 Unity「组合优于继承」的核心。
      </figcaption>
    </figure>
  );
}
