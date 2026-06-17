"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AaStructuredOutputFlowDiagram>：「解析容错重试」分步可控教学动画旗舰图（HEL-295，结构化输出章）。
 *
 * 演一条「脏输出」怎么被剥壳、校验、不合规则回灌重试，到合规才产出结构化对象：
 *   ① 模型回话（可能带 ```json 围栏 / 夹废话，不能直接 parse）
 *   ② 剥壳 extract_json（从围栏 / 废话里抠出那段 JSON 文本）
 *   ③ 按 schema 校验（字段齐不齐、类型对不对）
 *   ④a 不合规 → 把错误回灌进 messages 再问一遍（回边，回到 ①）
 *   ④b 合规 → 产出结构化对象，交给下游程序 / Agent
 * 五个节点在画布上依次点亮（每步 1 beat），caption 用人话讲该步在干啥；
 * 第④步同时画出「回灌重试」的循环回边（从校验节点弯回模型节点）。
 *
 * 布局（§四几何，无容器框圈内容——靠标题 + 节点对齐分组，不用大 rect 把节点框住）：
 *   - 主流程四节点同一行，x 用单一公式 nodeX(i) = LEFT + i*(NODE_W + GAP)，等宽等距；
 *   - 节点间用箭头连接（先画在节点之下，不穿字）；
 *   - 「产出对象」节点单独放在校验节点右下方（合规出口）；
 *   - 回灌重试回边从校验节点上沿弯回模型节点上沿（在节点上方走，不压节点文字）；
 *   - 距 viewBox 边 ≥24px；字号 ≥10px；TimelineControls 在 viewBox 外（外层 div）。
 *   - label 锚在「该节点点亮完成」时刻 lit = BEAT*(i+1)，防单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 内部
 * 动态 import("animejs") 切独立 chunk（硬规则 2/6），不进首屏关键路径。
 * 视觉全走 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

// —— 布局常量（viewBox 内坐标，间距均 2 的倍数）——
const VIEW_W = 780;
const VIEW_H = 400;

const NODE_W = 150;
const NODE_H = 84;
const GAP = 36;
const LEFT = 28; // 第一节点左缘距 viewBox 边 28（≥24）
const ROW_Y = 150; // 主流程行节点顶 y
const nodeX = (i: number) => LEFT + i * (NODE_W + GAP);

// 合规出口节点（放在第三节点正下方）。
const OUT_X = nodeX(3);
const OUT_Y = ROW_Y + NODE_H + 60;

type FlowNode = {
  id: string;
  index: string; // 序号
  title: string; // 节点名
  sub: string; // 一句话
  color: string;
};

// 主流程四节点（顺序即时间顺序）。
const NODES: readonly FlowNode[] = [
  {
    id: "model",
    index: "①",
    title: "模型回话",
    sub: "可能带围栏 / 夹废话",
    color: "var(--text-secondary)",
  },
  {
    id: "extract",
    index: "②",
    title: "剥壳 extract_json",
    sub: "抠出那段 JSON 文本",
    color: "var(--accent)",
  },
  {
    id: "validate",
    index: "③",
    title: "按 schema 校验",
    sub: "字段齐不齐、类型对不对",
    color: "var(--warning)",
  },
  {
    id: "retry",
    index: "④",
    title: "不合规 → 回灌重试",
    sub: "把错误塞回去再问一遍",
    color: "var(--danger)",
  },
];

// 第五个「产出对象」节点（合规出口，独立画，不在主行）。
const OUT_NODE: FlowNode = {
  id: "object",
  index: "⑤",
  title: "产出结构化对象",
  sub: "交给下游程序 / Agent",
  color: "var(--success)",
};

const STEPS: readonly TeachingStep[] = [
  {
    label: "model",
    caption: "① 模型回话可能不干净——把 JSON 包在 ```json 围栏里，或前后多说一句废话",
  },
  {
    label: "extract",
    caption: "② extract_json 剥壳：从围栏和废话里抠出那段 JSON 文本，再 json.loads 解析",
  },
  {
    label: "validate",
    caption: "③ 按 schema 校验：检查每个必填字段在不在、类型对不对",
  },
  {
    label: "retry",
    caption: "④ 不合规就把「错在哪」回灌进 messages 再问一遍（回边回到①），到上限才放弃",
  },
  {
    label: "object",
    caption: "⑤ 一旦校验通过，就产出一个干净的结构化对象，交给下游程序或 Agent 直接用",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AaStructuredOutputFlowDiagram() {
  // 各节点高亮层引用（点亮动画驱动 opacity）。
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const all = [...NODES, OUT_NODE];
      all.forEach((n, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const el = nodeRefs.current[n.id];
        if (el) {
          tl.add(
            el,
            {
              opacity: [0.18, 1],
              translateY: [10, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label(n.id, lit);
      });
    },
  });

  function renderNode(n: FlowNode, x: number, y: number) {
    const cx = x + NODE_W / 2;
    return (
      <g
        key={n.id}
        ref={(el) => {
          nodeRefs.current[n.id] = el;
        }}
        opacity="0.18"
      >
        {/* 单节点 rect（仅圈自己——非「容器框圈别的内容」） */}
        <rect
          x={x}
          y={y}
          width={NODE_W}
          height={NODE_H}
          rx="10"
          fill={n.color}
          fillOpacity="0.1"
          stroke={n.color}
          strokeWidth="1.6"
        />
        <text
          x={cx}
          y={y + 24}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill={n.color}
        >
          {n.index}
        </text>
        <text
          x={cx}
          y={y + 44}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--text-primary)"
        >
          {n.title}
        </text>
        <text
          x={cx}
          y={y + 64}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-secondary)"
        >
          {n.sub}
        </text>
      </g>
    );
  }

  const rowMidY = ROW_Y + NODE_H / 2;

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
          aria-label="结构化输出的解析容错重试流程可控动画。第一步：模型回话可能不干净，把 JSON 包在 json 围栏里或前后夹了废话，不能直接解析。第二步：extract_json 剥壳，从围栏和废话里抠出那段 JSON 文本再解析。第三步：按 schema 校验，检查每个必填字段在不在、类型对不对。第四步：如果不合规，就把错在哪回灌进 messages 再问模型一遍，形成一条回到第一步的循环回边，到重试上限才放弃。第五步：一旦校验通过，就产出一个干净的结构化对象，交给下游程序或 Agent 直接使用。五步依次点亮，可播放、暂停、单步、拖动进度查看。"
          className="mx-auto block h-auto w-full max-w-[780px]"
        >
          <defs>
            <marker
              id="aasof-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
            <marker
              id="aasof-arrow-retry"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--danger)" />
            </marker>
            <marker
              id="aasof-arrow-ok"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={LEFT}
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            脏输出怎么变成干净结构化对象：剥壳 → 校验 → 不合规回灌重试
          </text>
          <text x={LEFT} y="50" fontSize="11" fill="var(--text-secondary)">
            模型回话 → extract_json 剥壳 → schema 校验 →（不合规回灌再试 / 合规产出对象）
          </text>

          {/* ===== 主行节点间箭头（先画，落在节点之下，不穿字）===== */}
          {NODES.slice(0, -1).map((n, i) => {
            const x1 = nodeX(i) + NODE_W;
            const x2 = nodeX(i + 1);
            return (
              <line
                key={`arr-${n.id}`}
                x1={x1 + 2}
                y1={rowMidY}
                x2={x2 - 6}
                y2={rowMidY}
                stroke="var(--text-secondary)"
                strokeWidth="1.6"
                markerEnd="url(#aasof-arrow)"
                opacity="0.55"
              />
            );
          })}

          {/* ===== 回灌重试回边：校验节点上沿 弯回 模型节点上沿（走节点上方，不压字）===== */}
          <path
            d={`M ${nodeX(2) + NODE_W / 2} ${ROW_Y}
                C ${nodeX(2) + NODE_W / 2} ${ROW_Y - 84},
                  ${nodeX(0) + NODE_W / 2} ${ROW_Y - 84},
                  ${nodeX(0) + NODE_W / 2} ${ROW_Y - 6}`}
            fill="none"
            stroke="var(--danger)"
            strokeWidth="1.6"
            strokeDasharray="5 4"
            markerEnd="url(#aasof-arrow-retry)"
            opacity="0.7"
          />
          <text
            x={(nodeX(0) + nodeX(2) + NODE_W) / 2}
            y={ROW_Y - 90}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--danger)"
          >
            ④ 不合规：把错误回灌进 messages，再问一遍
          </text>

          {/* ===== 合规出口箭头：校验节点底 → 产出对象节点顶 ===== */}
          <line
            x1={OUT_X + NODE_W / 2}
            y1={ROW_Y + NODE_H + 2}
            x2={OUT_X + NODE_W / 2}
            y2={OUT_Y - 6}
            stroke="var(--success)"
            strokeWidth="1.6"
            markerEnd="url(#aasof-arrow-ok)"
            opacity="0.8"
          />
          <text
            x={OUT_X + NODE_W / 2 + 10}
            y={ROW_Y + NODE_H + 36}
            fontSize="11"
            fontWeight="600"
            fill="var(--success)"
          >
            合规 ✓
          </text>

          {/* ===== 节点（无容器框：各节点独立 rect + 标题分组）===== */}
          {NODES.map((n, i) => renderNode(n, nodeX(i), ROW_Y))}
          {renderNode(OUT_NODE, OUT_X, OUT_Y)}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="解析容错重试五步：模型回话 → 剥壳 → 校验 →（不合规回灌再试 / 合规产出对象）。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模型回话常不干净——先剥壳抠出 JSON，再按 schema
        校验；不合规就把错误回灌进对话重试，到上限才放弃，合规才产出能被程序直接用的结构化对象。
      </figcaption>
    </figure>
  );
}
