"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <SceneHierarchyDiagram>：Unity「资源 → 场景 → 对象 → 组件」层级链的可控教学动画（HEL-278）。
 *
 * 数字片场隐喻，分 5 步逐级点亮一条从仓库到组件的链：
 *  ① Project（道具仓库）—— 项目里所有资源躺在仓库里。
 *  ② 把资源拖入 → Scene（布景搭建台）—— 一个场景 = 一个关卡/界面。
 *  ③ Scene 里出现 GameObject 树（Player / Main Camera / Light）—— 场上的演员与道具。
 *  ④ 选中 Player 这个 GameObject。
 *  ⑤ 展开它挂着的 Component 列表（Transform / Renderer / PlayerScript）—— 给演员加的技能/装备。
 *
 * 时间线 = 一条 anime.js timeline（5 个 beat）。每个 step 的 label 锚定在「对应方块/箭头
 * 点亮到最亮」的时刻（lit = BEAT*(i+1)），与 ConcurrencyVsParallelismDiagram 同款写法，
 * 修正 label 落在淡入起点的 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline 内部
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

const VIEW_W = 700;
const VIEW_H = 340;

const PAD = 16;

// 三个层级横向列：Project 列 / Scene 列 / Component 列。
// 每列一个标题 + 若干卡片，箭头连接列与列。
const COL_W = 188;
const COL_GAP = 24;
// 同行节点单一公式：x = left + i*(w+gap)
const COL_X = (i: number) => PAD + i * (COL_W + COL_GAP);

const CARD_H = 38;
const CARD_GAP = 12;

// 各列卡片的纵向锚点。
const COL_TOP = 92; // 列内首卡 y

// Project 列：单个「资源仓库」卡 + 三个资源缩略小卡。
// Scene 列：Scene 标题卡 + GameObject 树三项。
// Component 列：被选中 GameObject 的组件三项。

type Card = {
  id: string;
  label: string;
  sub?: string;
  color: string;
};

// Scene 列的 GameObject 树。
const GAME_OBJECTS: readonly Card[] = [
  {
    id: "go-player",
    label: "Player",
    sub: "玩家（演员）",
    color: "var(--accent)",
  },
  {
    id: "go-camera",
    label: "Main Camera",
    sub: "摄影机",
    color: "var(--success)",
  },
  {
    id: "go-light",
    label: "Directional Light",
    sub: "灯光",
    color: "var(--warning)",
  },
];

// Component 列：选中 Player 后展开的组件。
const COMPONENTS: readonly Card[] = [
  {
    id: "co-transform",
    label: "Transform",
    sub: "位置/旋转/缩放",
    color: "var(--accent)",
  },
  {
    id: "co-renderer",
    label: "Mesh Renderer",
    sub: "怎么画出来",
    color: "var(--success)",
  },
  {
    id: "co-script",
    label: "PlayerScript",
    sub: "玩法逻辑",
    color: "var(--danger)",
  },
];

// 关键帧步骤（5 步）。caption 描述「当前点亮的是哪一步」。
const STEPS: readonly TeachingStep[] = [
  {
    label: "s-project",
    caption:
      "Project（道具仓库）：项目里所有资源——模型、贴图、脚本——都先躺在仓库",
  },
  {
    label: "s-drag",
    caption:
      "把资源拖进 Scene（布景搭建台）：一个 Scene 就是一个关卡或一个界面",
  },
  {
    label: "s-objects",
    caption: "Scene 里出现 GameObject：Player、摄影机、灯光——场上的演员与道具",
  },
  {
    label: "s-select",
    caption: "选中 Player 这个 GameObject——准备查看它身上挂了什么",
  },
  {
    label: "s-components",
    caption:
      "展开它的 Component 列表：Transform、Renderer、脚本——给演员加的技能与装备",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function SceneHierarchyDiagram() {
  // 各层高亮层 DOM 引用。
  const projectRef = useRef<SVGGElement | null>(null);
  const dragArrowRef = useRef<SVGGElement | null>(null);
  const sceneRef = useRef<SVGRectElement | null>(null);
  const objectRefs = useRef<Record<string, SVGGElement | null>>({});
  const selectRef = useRef<SVGRectElement | null>(null);
  const compArrowRef = useRef<SVGGElement | null>(null);
  const componentRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 通用淡入：在 [start, start+BEAT] 内 opacity 0→1，lit = start+BEAT 为 label 锚点。
      const fadeIn = (
        el: SVGElement | null,
        start: number,
        dur = TEACHING_BEAT_MS,
      ) => {
        if (!el) return;
        tl.add(el, { opacity: [0, 1], duration: dur, ease: "out(3)" }, start);
      };

      // ① Project 仓库点亮。
      fadeIn(projectRef.current, 0);
      tl.label("s-project", TEACHING_BEAT_MS);

      // ② 拖入箭头 + Scene 卡点亮。
      const t2 = TEACHING_BEAT_MS;
      fadeIn(dragArrowRef.current, t2);
      fadeIn(sceneRef.current, t2);
      tl.label("s-drag", TEACHING_BEAT_MS * 2);

      // ③ GameObject 树逐项点亮（三项在同一 beat 内错峰淡入，整体在 t4 点亮完成）。
      const t3 = TEACHING_BEAT_MS * 2;
      GAME_OBJECTS.forEach((go, i) => {
        // 三项均匀分布在这一 beat 内，最后一项在 beat 末点亮 → lit = t3+BEAT。
        const stagger = (TEACHING_BEAT_MS / GAME_OBJECTS.length) * i;
        fadeIn(
          objectRefs.current[go.id],
          t3 + stagger,
          TEACHING_BEAT_MS / GAME_OBJECTS.length,
        );
      });
      tl.label("s-objects", TEACHING_BEAT_MS * 3);

      // ④ 选中 Player 的高亮框点亮。
      const t4 = TEACHING_BEAT_MS * 3;
      fadeIn(selectRef.current, t4);
      tl.label("s-select", TEACHING_BEAT_MS * 4);

      // ⑤ 组件箭头 + 组件列表逐项点亮。
      const t5 = TEACHING_BEAT_MS * 4;
      fadeIn(compArrowRef.current, t5);
      COMPONENTS.forEach((co, i) => {
        const stagger = (TEACHING_BEAT_MS / COMPONENTS.length) * i;
        fadeIn(
          componentRefs.current[co.id],
          t5 + stagger,
          TEACHING_BEAT_MS / COMPONENTS.length,
        );
      });
      tl.label("s-components", TEACHING_BEAT_MS * 5);
    },
  });

  // 列标题 y。
  const HEAD_Y = 72;

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
          aria-label="Unity 资源到组件的层级链动画。从左到右三列：第一列 Project 道具仓库，项目里所有资源都先躺在这里；中间用一个箭头表示把资源拖进 Scene 布景搭建台，一个场景就是一个关卡或界面；Scene 里随后出现 GameObject 树，包含 Player 玩家、Main Camera 摄影机、Directional Light 灯光，它们是场上的演员与道具；接着选中 Player 这个 GameObject；最后一列展开它挂着的 Component 组件列表，包含 Transform 位置旋转缩放、Mesh Renderer 怎么画出来、PlayerScript 玩法逻辑，这些组件就是给演员加的技能与装备。动画分五步逐级点亮这条资源到场景到对象到组件的链，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[700px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={PAD}
            y={36}
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一条链：资源 → 场景 → 对象 → 组件
          </text>
          <text x={PAD} y={54} fontSize="11" fill="var(--text-secondary)">
            Unity 项目就是这样一层套一层组织起来的
          </text>

          {/* ===== 列标题 ===== */}
          <text
            x={COL_X(0) + COL_W / 2}
            y={HEAD_Y}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--danger)"
          >
            Project · 道具仓库
          </text>
          <text
            x={COL_X(1) + COL_W / 2}
            y={HEAD_Y}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--success)"
          >
            Scene · 布景台
          </text>
          <text
            x={COL_X(2) + COL_W / 2}
            y={HEAD_Y}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--accent)"
          >
            Component · 组件
          </text>

          {/* ===== ① Project 列 ===== */}
          <g ref={projectRef} opacity="0">
            <rect
              x={COL_X(0)}
              y={COL_TOP}
              width={COL_W}
              height={CARD_H}
              rx="7"
              fill="var(--danger)"
              fillOpacity="0.16"
              stroke="var(--danger)"
              strokeWidth="1.4"
            />
            <text
              x={COL_X(0) + COL_W / 2}
              y={COL_TOP + CARD_H / 2 + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--text-primary)"
            >
              Assets 资源根目录
            </text>
            {/* 三个资源缩略小卡 */}
            {["模型", "贴图", "脚本"].map((label, i) => {
              const cw = (COL_W - 2 * CARD_GAP) / 3;
              const cx = COL_X(0) + i * (cw + CARD_GAP);
              const cy = COL_TOP + CARD_H + CARD_GAP;
              return (
                <g key={label}>
                  <rect
                    x={cx}
                    y={cy}
                    width={cw}
                    height={CARD_H}
                    rx="6"
                    fill="var(--danger)"
                    fillOpacity="0.08"
                    stroke="var(--danger)"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                  <text
                    x={cx + cw / 2}
                    y={cy + CARD_H / 2 + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fill="var(--text-secondary)"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </g>

          {/* ===== ② 拖入箭头（Project → Scene）===== */}
          <g ref={dragArrowRef} opacity="0">
            <line
              x1={COL_X(0) + COL_W + 2}
              y1={COL_TOP + CARD_H / 2}
              x2={COL_X(1) - 4}
              y2={COL_TOP + CARD_H / 2}
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              markerEnd="url(#sh-arrow)"
            />
            <text
              x={(COL_X(0) + COL_W + COL_X(1)) / 2}
              y={COL_TOP + CARD_H / 2 - 8}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              拖入
            </text>
          </g>

          {/* ===== ② Scene 容器卡（GameObject 树的外框）===== */}
          <rect
            ref={sceneRef}
            x={COL_X(1)}
            y={COL_TOP}
            width={COL_W}
            height={CARD_H * 4 + CARD_GAP * 3 + 16}
            rx="8"
            fill="var(--success)"
            fillOpacity="0.06"
            stroke="var(--success)"
            strokeWidth="1.4"
            opacity="0"
          />

          {/* ===== ③ GameObject 树（三项）+ ④ 选中高亮 ===== */}
          {GAME_OBJECTS.map((go, i) => {
            const gy = COL_TOP + 12 + i * (CARD_H + CARD_GAP) + CARD_GAP;
            const gx = COL_X(1) + 12;
            const gw = COL_W - 24;
            return (
              <g
                key={go.id}
                ref={(el) => {
                  objectRefs.current[go.id] = el;
                }}
                opacity="0"
              >
                <rect
                  x={gx}
                  y={gy}
                  width={gw}
                  height={CARD_H}
                  rx="6"
                  fill={go.color}
                  fillOpacity="0.14"
                  stroke={go.color}
                  strokeWidth="1.2"
                />
                <circle
                  cx={gx + 14}
                  cy={gy + CARD_H / 2}
                  r="4"
                  fill={go.color}
                />
                <text
                  x={gx + 28}
                  y={gy + CARD_H / 2 - 2}
                  fontSize="12"
                  fontWeight="600"
                  fill="var(--text-primary)"
                >
                  {go.label}
                </text>
                <text
                  x={gx + 28}
                  y={gy + CARD_H / 2 + 12}
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {go.sub}
                </text>
              </g>
            );
          })}

          {/* ④ 选中 Player 的高亮框（描边加粗，叠在第一项上）*/}
          <rect
            ref={selectRef}
            x={COL_X(1) + 8}
            y={COL_TOP + 12 + CARD_GAP - 4}
            width={COL_W - 16}
            height={CARD_H + 8}
            rx="8"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.4"
            opacity="0"
          />

          {/* ===== ⑤ 组件箭头（Scene → Component）===== */}
          <g ref={compArrowRef} opacity="0">
            <line
              x1={COL_X(1) + COL_W + 2}
              y1={COL_TOP + CARD_H / 2 + CARD_GAP}
              x2={COL_X(2) - 4}
              y2={COL_TOP + CARD_H / 2 + CARD_GAP}
              stroke="var(--accent)"
              strokeWidth="1.6"
              markerEnd="url(#sh-arrow-accent)"
            />
            <text
              x={(COL_X(1) + COL_W + COL_X(2)) / 2}
              y={COL_TOP + CARD_H / 2 + CARD_GAP - 8}
              textAnchor="middle"
              fontSize="10"
              fill="var(--accent)"
            >
              查看组件
            </text>
          </g>

          {/* ===== ⑤ Component 列表（三项）===== */}
          {COMPONENTS.map((co, i) => {
            const cy = COL_TOP + i * (CARD_H + CARD_GAP);
            return (
              <g
                key={co.id}
                ref={(el) => {
                  componentRefs.current[co.id] = el;
                }}
                opacity="0"
              >
                <rect
                  x={COL_X(2)}
                  y={cy}
                  width={COL_W}
                  height={CARD_H}
                  rx="6"
                  fill={co.color}
                  fillOpacity="0.14"
                  stroke={co.color}
                  strokeWidth="1.2"
                />
                <text
                  x={COL_X(2) + 14}
                  y={cy + CARD_H / 2 - 2}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {co.label}
                </text>
                <text
                  x={COL_X(2) + 14}
                  y={cy + CARD_H / 2 + 12}
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {co.sub}
                </text>
              </g>
            );
          })}

          <defs>
            <marker
              id="sh-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="sh-arrow-accent"
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
          caption="猜一猜：选中一个 GameObject 后，Inspector 里显示的那一串「组件」是从哪冒出来的？单步看完这条链。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 项目的层级：资源在 Project 仓库里 → 拖进 Scene 变成 GameObject →
        每个 GameObject 身上挂着若干 Component（组件）。一层套一层，就是 Unity
        组织一切的方式。
      </figcaption>
    </figure>
  );
}
