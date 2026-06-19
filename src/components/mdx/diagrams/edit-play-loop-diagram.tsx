"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <EditPlayLoopDiagram>：Unity 编辑-运行循环的可控教学动画（HEL-278）。
 *
 * 五个环节排成一个环，逐步点亮，演示 Unity 的核心工作流：
 *  ① 编辑模式：拖资源搭场景
 *  ② 挂脚本写逻辑
 *  ③ 点 Play 进运行模式测试（节点变色为「运行中」语义）
 *  ④ 观察问题
 *  ⑤ 点 Stop 回编辑模式改 → 回到 ①（环闭合）
 *
 * 第 ⑤ 步特别强调一个坑：Play 模式下改的属性，Stop 后会丢——节点旁挂一句警告，
 * 在该步点亮时一并出现，与正文「常见误区」呼应。
 *
 * 时间线 = 一条 anime.js timeline（5 个 beat）。节点淡入 + 连接弧逐段点亮；
 * label 锚定在「该环节点亮到最亮」的时刻（lit = BEAT*(i+1)），修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互（硬规则 2/6 由 useTeachingTimeline
 * 动态 import 保证 code-split）。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量。
 */

const VIEW_W = 640;
const VIEW_H = 440;

// 环的几何：圆心 + 半径。五节点等角分布，从正上方起顺时针。
const CX = 320;
const CY = 232;
const R = 138; // 节点中心所在圆的半径
const NODE_RX = 84; // 节点卡半宽
const NODE_RY = 30; // 节点卡半高

type LoopNode = {
  id: string;
  num: string;
  title: string;
  sub: string;
  color: string;
};

// 五环节，顺时针。颜色：编辑态用 accent/中性，运行态(③④)用 success，停止(⑤)用 warning。
const NODES: readonly LoopNode[] = [
  {
    id: "n-edit",
    num: "①",
    title: "搭场景",
    sub: "拖资源进 Scene",
    color: "var(--accent)",
  },
  {
    id: "n-script",
    num: "②",
    title: "挂脚本",
    sub: "写玩法逻辑",
    color: "var(--accent)",
  },
  {
    id: "n-play",
    num: "③",
    title: "点 Play 测试",
    sub: "进入运行模式",
    color: "var(--success)",
  },
  {
    id: "n-observe",
    num: "④",
    title: "观察问题",
    sub: "哪里不对？",
    color: "var(--success)",
  },
  {
    id: "n-stop",
    num: "⑤",
    title: "点 Stop 回去改",
    sub: "回到编辑模式",
    color: "var(--warning)",
  },
];

// 节点中心坐标（从正上方 -90° 起，顺时针每 72°）。
const angleOf = (i: number) =>
  (-90 + i * (360 / NODES.length)) * (Math.PI / 180);
const nodeCenter = (i: number) => ({
  x: CX + R * Math.cos(angleOf(i)),
  y: CY + R * Math.sin(angleOf(i)),
});

const STEPS: readonly TeachingStep[] = [
  { label: "n-edit", caption: "① 编辑模式：把资源拖进 Scene，把场景搭起来" },
  { label: "n-script", caption: "② 给 GameObject 挂上脚本，写下玩法逻辑" },
  {
    label: "n-play",
    caption: "③ 点工具栏的 Play 按钮——进入运行模式，游戏真的跑起来",
  },
  {
    label: "n-observe",
    caption: "④ 在 Game 窗口里观察：玩法对不对？哪里要调？",
  },
  {
    label: "n-stop",
    caption:
      "⑤ 点 Stop 回到编辑模式去改——⚠ 注意：运行模式下改的属性，Stop 后会丢！",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function EditPlayLoopDiagram() {
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const arcRefs = useRef<Record<string, SVGPathElement | null>>({});
  const warnRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      NODES.forEach((node, i) => {
        // 节点 i 在 [BEAT*i, BEAT*(i+1)] 淡入，lit = BEAT*(i+1) 为 label 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const nodeEl = nodeRefs.current[node.id];
        if (nodeEl) {
          tl.add(
            nodeEl,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        // 指向该节点的弧（从上一节点连过来）：与节点同段淡入。
        const arcEl = arcRefs.current[node.id];
        if (arcEl) {
          tl.add(
            arcEl,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        // 第 ⑤ 步（最后一个）点亮时，警告标语一并出现。
        if (i === NODES.length - 1 && warnRef.current) {
          tl.add(
            warnRef.current,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        tl.label(node.id, lit);
      });
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
          aria-label="Unity 编辑-运行循环动画。五个环节排成一个顺时针闭合的环。第一步在编辑模式把资源拖进 Scene 搭好场景；第二步给对象挂上脚本写玩法逻辑；第三步点工具栏的 Play 按钮进入运行模式，游戏真的跑起来；第四步在 Game 窗口里观察玩法对不对、哪里要调；第五步点 Stop 回到编辑模式去改，然后回到第一步形成循环。第五步特别提示一个坑：在运行模式下修改的属性，点 Stop 后会全部丢失。动画分五步逐环点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={30}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Unity 工作流：编辑 ⇄ 运行 的循环
          </text>

          {/* ===== 连接弧（每段从上一节点指向当前节点）===== */}
          {NODES.map((node, i) => {
            const from = nodeCenter((i + NODES.length - 1) % NODES.length);
            const to = nodeCenter(i);
            // 用一段略向圆心外凸的二次贝塞尔弧，端点收缩到节点边缘附近。
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            const sx = from.x + ux * (NODE_RX - 24);
            const sy = from.y + uy * NODE_RY;
            const ex = to.x - ux * (NODE_RX - 24);
            const ey = to.y - uy * NODE_RY;
            // 控制点：中点向圆外法线方向偏移，让弧呈环形。
            const mx = (sx + ex) / 2;
            const my = (sy + ey) / 2;
            const outX = mx - CX;
            const outY = my - CY;
            const outLen = Math.hypot(outX, outY) || 1;
            const ctrlX = mx + (outX / outLen) * 28;
            const ctrlY = my + (outY / outLen) * 28;
            return (
              <path
                key={`arc-${node.id}`}
                ref={(el) => {
                  arcRefs.current[node.id] = el;
                }}
                d={`M ${sx} ${sy} Q ${ctrlX} ${ctrlY} ${ex} ${ey}`}
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
                markerEnd="url(#epl-arrow)"
                opacity="0"
              />
            );
          })}

          {/* ===== 五个环节节点 ===== */}
          {NODES.map((node, i) => {
            const c = nodeCenter(i);
            return (
              <g
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                opacity="0"
              >
                <rect
                  x={c.x - NODE_RX}
                  y={c.y - NODE_RY}
                  width={NODE_RX * 2}
                  height={NODE_RY * 2}
                  rx="10"
                  fill={node.color}
                  fillOpacity="0.16"
                  stroke={node.color}
                  strokeWidth="1.6"
                />
                <text
                  x={c.x}
                  y={c.y - 4}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {node.num} {node.title}
                </text>
                <text
                  x={c.x}
                  y={c.y + 13}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {node.sub}
                </text>
              </g>
            );
          })}

          {/* ===== 中心说明 ===== */}
          <text
            x={CX}
            y={CY - 6}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            改 → 测 → 再改
          </text>
          <text
            x={CX}
            y={CY + 12}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            无限循环
          </text>

          {/* ===== ⑤ 步警告（Play 模式下改的会丢）===== */}
          <g ref={warnRef} opacity="0">
            <rect
              x={VIEW_W / 2 - 220}
              y={VIEW_H - 48}
              width="440"
              height="30"
              rx="6"
              fill="var(--danger)"
              fillOpacity="0.12"
              stroke="var(--danger)"
              strokeWidth="1.2"
            />
            <text
              x={VIEW_W / 2}
              y={VIEW_H - 22}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--danger)"
            >
              ⚠ 坑：运行模式（Play）下改的属性，点 Stop 后会全部丢回原样
            </text>
          </g>

          <defs>
            <marker
              id="epl-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：在 Play（运行模式）里把角色移动速度调大，点 Stop 之后这个改动还在吗？单步到第 ⑤ 步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 的核心工作流是一个「编辑 ⇄ 运行」的循环：搭场景 → 挂脚本 → Play
        测试 → 观察 → Stop 回去改。记住那个坑：运行模式下的修改 Stop 后不保留。
      </figcaption>
    </figure>
  );
}
