"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <LifecycleTimelineDiagram>：MonoBehaviour 生命周期回调顺序的可控教学动画（HEL-281）。
 *
 * 数字片场隐喻——一个演员从「进场准备 → 登台 → 每帧表演 → 谢幕退场」的完整流程。
 * 一条竖直时间线，回调节点按真实触发顺序自上而下逐个点亮，分 7 步：
 *  ① Awake —— 进场前准备：对象一被创建就调（哪怕禁用），最早，做自身初始化。
 *  ② OnEnable —— 登台亮相：对象/组件被启用时调，每次启用都会再调一次。
 *  ③ Start —— 正式开演前：首帧 Update 之前调且只调一次，做跨对象引用。
 *  ④ Update —— 每帧表演：每渲染帧调一次（随帧率变）；FixedUpdate 在旁标为后台物理排练。
 *  ⑤ LateUpdate —— 每帧收尾：所有 Update 跑完后调（相机跟随放这）。
 *  ⑥ OnDisable —— 谢幕前：对象/组件被禁用时调。
 *  ⑦ OnDestroy —— 退场：对象被销毁时调，做收尾清理。
 *
 * ④⑤ 用一个「每帧循环」回环括号标注，表示这两步会随每一帧反复重复，直到对象被禁用/销毁。
 *
 * 时间线 = 一条 anime.js timeline（7 个 beat）。节点 + 指向它的连线段同段淡入；
 * label 锚定在「该节点点亮到最亮」的时刻（lit = BEAT*(i+1)），修正 off-by-one。
 * 第 ④ 步点亮时，「每帧循环」回环括号与 FixedUpdate 旁标一并出现。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

const VIEW_W = 540;
const VIEW_H = 560;

// 时间线竖直走向：节点中心 x 固定一列，y 自上而下等距。
const NODE_CX = 188; // 节点卡中心 x（左侧一列）
const NODE_W = 188; // 节点卡宽
const NODE_H = 42; // 节点卡高
const FIRST_CY = 86; // 首节点中心 y
const ROW_GAP = 66; // 行间距（中心到中心）

const CAP_X = 308; // 右侧 caption 起始 x

type LifeNode = {
  id: string;
  name: string; // 回调名（等宽）
  stage: string; // 片场隐喻短语
  color: string;
};

// 7 个生命周期回调，自上而下即真实触发顺序。
// 进场/初始化用 accent；启用用 success；每帧表演用 warning；退场用 danger。
const NODES: readonly LifeNode[] = [
  { id: "awake", name: "Awake()", stage: "进场前准备", color: "var(--accent)" },
  {
    id: "onenable",
    name: "OnEnable()",
    stage: "登台亮相",
    color: "var(--success)",
  },
  { id: "start", name: "Start()", stage: "正式开演前", color: "var(--accent)" },
  {
    id: "update",
    name: "Update()",
    stage: "每帧表演",
    color: "var(--warning)",
  },
  {
    id: "lateupdate",
    name: "LateUpdate()",
    stage: "每帧收尾",
    color: "var(--warning)",
  },
  {
    id: "ondisable",
    name: "OnDisable()",
    stage: "谢幕前",
    color: "var(--danger)",
  },
  {
    id: "ondestroy",
    name: "OnDestroy()",
    stage: "退场",
    color: "var(--danger)",
  },
];

// 节点中心 y（同列单一公式：cy = FIRST_CY + i*ROW_GAP）。
const nodeCY = (i: number) => FIRST_CY + i * ROW_GAP;

const STEPS: readonly TeachingStep[] = [
  {
    label: "awake",
    caption:
      "① Awake：对象一被创建就调（最早），且只调一次——在这里做自身初始化（缓存自己的组件引用）",
  },
  {
    label: "onenable",
    caption:
      "② OnEnable：对象 / 组件每次被「启用」时调——注册事件、开启监听放这里",
  },
  {
    label: "start",
    caption:
      "③ Start：首帧 Update 之前调，只调一次——此时别的对象都 Awake 完了，跨对象引用放这里",
  },
  {
    label: "update",
    caption:
      "④ Update：每渲染帧调一次（次数随帧率变）；物理另走后台固定节拍的 FixedUpdate",
  },
  {
    label: "lateupdate",
    caption:
      "⑤ LateUpdate：所有 Update 跑完后才调——相机跟随这类「等别人动完我再动」放这里",
  },
  {
    label: "ondisable",
    caption: "⑥ OnDisable：对象 / 组件被「禁用」时调——注销事件、停监听",
  },
  {
    label: "ondestroy",
    caption: "⑦ OnDestroy：对象被销毁时调（最后一次）——做收尾清理、释放资源",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function LifecycleTimelineDiagram() {
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const segRefs = useRef<Record<string, SVGLineElement | null>>({});
  const loopRef = useRef<SVGGElement | null>(null);
  const fixedRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      NODES.forEach((node, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        // 指向该节点的竖直连线段（从上一节点连下来）：与节点同段淡入。
        const segEl = segRefs.current[node.id];
        if (segEl) {
          tl.add(
            segEl,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        // 节点卡淡入。
        const nodeEl = nodeRefs.current[node.id];
        if (nodeEl) {
          tl.add(
            nodeEl,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        // 第 ④ 步（Update，i===3）点亮时，「每帧循环」回环 + FixedUpdate 旁标一并出现。
        if (node.id === "update") {
          if (loopRef.current) {
            tl.add(
              loopRef.current,
              { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
              start,
            );
          }
          if (fixedRef.current) {
            tl.add(
              fixedRef.current,
              { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
              start,
            );
          }
        }
        tl.label(node.id, lit);
      });
    },
  });

  // 每帧循环回环：括住 Update(③后) 与 LateUpdate 两节点。
  const loopTop = nodeCY(3) - NODE_H / 2 - 6;
  const loopBottom = nodeCY(4) + NODE_H / 2 + 6;
  const loopLeft = NODE_CX - NODE_W / 2 - 16;

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
          aria-label="MonoBehaviour 生命周期回调顺序动画。一条竖直时间线，七个回调自上而下按真实触发顺序逐个点亮：第一是 Awake 进场前准备，对象一被创建就调、最早，只调一次，在这里做自身初始化；第二是 OnEnable 登台亮相，对象或组件每次被启用时调；第三是 Start 正式开演前，首帧之前调一次，此时别的对象都 Awake 完了，跨对象引用放这里；第四是 Update 每帧表演，每渲染帧调一次，次数随帧率变，物理另走后台固定节拍的 FixedUpdate；第五是 LateUpdate 每帧收尾，所有 Update 跑完后才调，相机跟随放这里；第四和第五两步被一个每帧循环的回环括号括住，表示它们随每一帧反复重复；第六是 OnDisable 谢幕前，对象或组件被禁用时调；第七是 OnDestroy 退场，对象被销毁时调，做收尾清理。动画分七步逐个点亮，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[540px]"
        >
          {/* ===== 主标题（居中于内容横向中心，避开窄 viewBox 左溢出）===== */}
          <text
            x={VIEW_W / 2}
            y={34}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个演员的完整流程：进场 → 登台 → 表演 → 退场
          </text>
          <text
            x={VIEW_W / 2}
            y={54}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            MonoBehaviour 生命周期回调，自上而下即触发顺序
          </text>

          {/* ===== 节点间竖直连线段（每段从上一节点底连到当前节点顶）===== */}
          {NODES.map((node, i) => {
            if (i === 0) return null; // 首节点无入边
            const yFrom = nodeCY(i - 1) + NODE_H / 2;
            const yTo = nodeCY(i) - NODE_H / 2;
            return (
              <line
                key={`seg-${node.id}`}
                ref={(el) => {
                  segRefs.current[node.id] = el;
                }}
                x1={NODE_CX}
                y1={yFrom}
                x2={NODE_CX}
                y2={yTo}
                stroke="var(--border)"
                strokeWidth="2"
                markerEnd="url(#ltl-arrow)"
                opacity="0"
              />
            );
          })}

          {/* ===== 每帧循环回环（括住 Update / LateUpdate）+ FixedUpdate 旁标 ===== */}
          <g ref={loopRef} opacity="0">
            {/* 左侧方括号：上横、竖、下横 */}
            <path
              d={`M ${loopLeft + 12} ${loopTop} L ${loopLeft} ${loopTop} L ${loopLeft} ${loopBottom} L ${loopLeft + 12} ${loopBottom}`}
              fill="none"
              stroke="var(--warning)"
              strokeWidth="2"
            />
            {/* 回环箭头：从底部弯回顶部，示意「重复」 */}
            <path
              d={`M ${loopLeft - 4} ${loopBottom - 8} Q ${loopLeft - 30} ${(loopTop + loopBottom) / 2} ${loopLeft - 4} ${loopTop + 8}`}
              fill="none"
              stroke="var(--warning)"
              strokeWidth="2"
              markerEnd="url(#ltl-loop-arrow)"
            />
            <text
              x={loopLeft - 34}
              y={(loopTop + loopBottom) / 2 - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--warning)"
            >
              每帧
            </text>
            <text
              x={loopLeft - 34}
              y={(loopTop + loopBottom) / 2 + 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--warning)"
            >
              循环
            </text>
          </g>

          {/* ===== 7 个回调节点 ===== */}
          {NODES.map((node, i) => {
            const cy = nodeCY(i);
            return (
              <g
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[node.id] = el;
                }}
                opacity="0"
              >
                <rect
                  x={NODE_CX - NODE_W / 2}
                  y={cy - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx="9"
                  fill={node.color}
                  fillOpacity="0.16"
                  stroke={node.color}
                  strokeWidth="1.6"
                />
                <text
                  x={NODE_CX}
                  y={cy - 3}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {node.name}
                </text>
                <text
                  x={NODE_CX}
                  y={cy + 13}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {node.stage}
                </text>
              </g>
            );
          })}

          {/* ===== FixedUpdate 旁标（与 Update 节点同高，挂在右侧）===== */}
          <g ref={fixedRef} opacity="0">
            <line
              x1={NODE_CX + NODE_W / 2}
              y1={nodeCY(3)}
              x2={CAP_X - 8}
              y2={nodeCY(3)}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
            <rect
              x={CAP_X - 4}
              y={nodeCY(3) - NODE_H / 2}
              width="176"
              height={NODE_H}
              rx="8"
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
              strokeWidth="1.4"
              strokeDasharray="5 3"
            />
            <text
              x={CAP_X + 84}
              y={nodeCY(3) - 3}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fontFamily="var(--font-mono)"
              fill="var(--text-primary)"
            >
              FixedUpdate()
            </text>
            <text
              x={CAP_X + 84}
              y={nodeCY(3) + 13}
              textAnchor="middle"
              fontSize="9.5"
              fill="var(--text-secondary)"
            >
              后台固定节拍 · 物理排练
            </text>
          </g>

          {/* ===== 右侧 caption：每节点何时触发 + 典型用途（静态常驻，对照点亮）===== */}
          {[
            { i: 0, l1: "对象创建即调，最早", l2: "做自身初始化" },
            { i: 1, l1: "每次被启用时调", l2: "注册事件 / 开监听" },
            { i: 2, l1: "首帧前调，仅一次", l2: "跨对象引用放这" },
            { i: 4, l1: "Update 全跑完后调", l2: "相机跟随放这" },
            { i: 5, l1: "被禁用时调", l2: "注销事件 / 停监听" },
            { i: 6, l1: "被销毁时调，最后", l2: "收尾清理资源" },
          ].map(({ i, l1, l2 }) => (
            <g key={`cap-${i}`}>
              <text
                x={CAP_X}
                y={nodeCY(i) - 3}
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                {l1}
              </text>
              <text
                x={CAP_X}
                y={nodeCY(i) + 12}
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                {l2}
              </text>
            </g>
          ))}

          <defs>
            <marker
              id="ltl-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="ltl-loop-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--warning)" />
            </marker>
          </defs>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：Awake 和 Start，哪个先执行？Update 一秒大概执行几次？单步走完时间线看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MonoBehaviour 的生命周期：Awake → OnEnable → Start → 每帧（Update →
        LateUpdate，物理走 FixedUpdate）→ OnDisable → OnDestroy。
        进场只一次、表演每帧重复、退场只一次。
      </figcaption>
    </figure>
  );
}
