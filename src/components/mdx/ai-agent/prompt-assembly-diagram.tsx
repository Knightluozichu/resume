"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AaPromptAssemblyDiagram>：「一张纸条怎么拼出来」可控教学动画旗舰图（HEL-293）。
 *
 * 失忆天才小屋隐喻 + tinyagent 主线：一条提示（messages）不是随手一句话，而是把三段
 * 消息块依次落位、堆叠组装出来的——
 *   ① system（岗位说明书）→ ② few-shot 示例（几个范例）→ ③ user（本次任务），
 * 三块按序滑入右侧的 messages 列表叠好，再由一支箭头喂给模型 → 模型按规矩回话。
 *
 * 每步 caption 用人话讲该段的作用，呼应正文：system=给失忆天才的岗位说明书、
 * few-shot=教它照做的范例、user=这次塞进门缝的纸条。
 *
 * 布局（§四几何）：左侧三个来源块用单一公式纵向排（srcTop(i)），等高等距；右侧 messages
 * 列表是一个高容器，三块「叠好后的副本」用同一纵向公式 slotTop(i) 落位，与左侧一一对应；
 * 连线先画（节点之下），箭头不穿字；最宽中文标签 textAnchor=middle 居中、盒宽足够不溢出；
 * TimelineControls 在 viewBox 外（外层 div）。label 锚在「该块落位完成」时刻 lit=BEAT*(i+1)，
 * 防 off-by-one（同 AaAgentAnatomyFlowDiagram）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条是真交互。anime.js 经 useTeachingTimeline 内部
 * 动态 import("animejs") 切独立 chunk（硬规则 2/6），注册后不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token（accent / success / warning / danger / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，无散落魔法数字（硬规则 5）。
 */

// —— 布局常量（viewBox 内坐标；间距均 2 的倍数）——
const VIEW_W = 760;
const VIEW_H = 512;

// 左侧来源块（纵向三块：system / few-shot / user）。
const SRC_W = 250;
const SRC_H = 80;
const SRC_GAP = 24;
const SRC_LEFT = 28; // 左缘距 viewBox 边 28（≥14）
const SRC_TOP0 = 96; // 第一块顶 y
const srcTop = (i: number) => SRC_TOP0 + i * (SRC_H + SRC_GAP);

// 右侧 messages 列表容器。
const LIST_W = 250;
const LIST_LEFT = VIEW_W - 28 - LIST_W; // 右缘距 viewBox 边 28 → 482
const LIST_TOP = 84; // 容器顶
const SLOT_H = 76;
const SLOT_GAP = 14;
const SLOT_TOP0 = LIST_TOP + 36; // 容器内首槽顶（给容器标题留 36）
const slotTop = (i: number) => SLOT_TOP0 + i * (SLOT_H + SLOT_GAP);
const LIST_H = 36 + 3 * SLOT_H + 2 * SLOT_GAP + 16; // 容器高（标题 + 3 槽 + 间隙 + 底白）

// 模型节点（右下，messages 喂进去）。
const MODEL_W = 250;
const MODEL_H = 64;
const MODEL_LEFT = LIST_LEFT;
const MODEL_TOP = LIST_TOP + LIST_H + 36; // 列表下方

type SrcBlock = {
  id: string;
  role: string; // 角色（messages 里的 role）
  metaphor: string; // 隐喻物 / 一句话作用
  color: string;
};

// 三段消息块（顺序即组装先后；脉冲按此序落位）。
const BLOCKS: readonly SrcBlock[] = [
  {
    id: "system",
    role: "system 岗位说明书",
    metaphor: "📋 你是谁、守什么规矩",
    color: "var(--accent)",
  },
  {
    id: "fewshot",
    role: "few-shot 示例",
    metaphor: "📝 几个范例，照着做",
    color: "var(--warning)",
  },
  {
    id: "user",
    role: "user 本次任务",
    metaphor: "🗒 这次要它干的活",
    color: "var(--success)",
  },
];

// 步骤：3 块落位 + 1 步喂给模型 + 1 步模型回话。
const STEPS: readonly TeachingStep[] = [
  {
    label: "system",
    caption: "① system：先放「岗位说明书」——告诉失忆天才它是谁、要守什么规矩",
  },
  {
    label: "fewshot",
    caption: "② few-shot：再塞几个「范例」——给它看几组示范，教它照着这个样子做",
  },
  {
    label: "user",
    caption: "③ user：最后写上「本次任务」——这一轮真正要它干的活",
  },
  {
    label: "feed",
    caption: "④ 三段叠成一份完整 messages，顺着门缝塞给模型",
  },
  {
    label: "reply",
    caption: "⑤ 模型读完整张纸条，按 system 的规矩、照 few-shot 的样子回话",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AaPromptAssemblyDiagram() {
  // 右侧「叠好后的副本」三槽高亮层引用（落位动画驱动）。
  const slotRefs = useRef<Record<string, SVGGElement | null>>({});
  // messages → 模型 的喂入箭头。
  const feedRef = useRef<SVGPathElement | null>(null);
  // 模型回话气泡。
  const replyRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 三块依次落位（每步 1 beat）。
      BLOCKS.forEach((b, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const el = slotRefs.current[b.id];
        if (el) {
          tl.add(
            el,
            {
              opacity: [0, 1],
              translateX: [-28, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label(b.id, lit);
      });

      // 第 4 步：喂入箭头点亮。
      const feedStart = TEACHING_BEAT_MS * BLOCKS.length;
      if (feedRef.current) {
        tl.add(
          feedRef.current,
          { opacity: [0.18, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          feedStart,
        );
      }
      tl.label("feed", TEACHING_BEAT_MS * (BLOCKS.length + 1));

      // 第 5 步：模型回话气泡浮现。
      const replyStart = TEACHING_BEAT_MS * (BLOCKS.length + 1);
      if (replyRef.current) {
        tl.add(
          replyRef.current,
          {
            opacity: [0, 1],
            translateY: [10, 0],
            duration: TEACHING_BEAT_MS,
            ease: "out(3)",
          },
          replyStart,
        );
      }
      tl.label("reply", TEACHING_BEAT_MS * (BLOCKS.length + 2));
    },
  });

  // 列表容器中心 x（喂入箭头起点）。
  const listCx = LIST_LEFT + LIST_W / 2;
  const modelCx = MODEL_LEFT + MODEL_W / 2;

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
          aria-label="一张提示纸条怎么拼出来的可控动画。左侧有三段消息块：system（岗位说明书，告诉模型它是谁、守什么规矩）、few-shot 示例（几个范例，教它照着做）、user（本次任务，这轮真正要它干的活）。动画依次把这三段滑入右侧的 messages 列表叠好，组装成一份完整的提示，再由一支箭头把整份 messages 喂给模型；模型读完整张纸条，按 system 的规矩、照 few-shot 的样子回话。可播放、暂停、单步、拖动进度查看。"
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <defs>
            <marker
              id="aapa-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x="24"
            y="34"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一张「纸条」是怎么拼出来的
          </text>
          <text x="24" y="56" fontSize="11" fill="var(--text-secondary)">
            system + few-shot + user 三段依次叠成一份 messages，再喂给模型
          </text>

          {/* ===== 来源块 → 列表槽 的对应连线（先画，落节点之下，不穿字）===== */}
          {BLOCKS.map((b, i) => {
            const y1 = srcTop(i) + SRC_H / 2;
            const y2 = slotTop(i) + SLOT_H / 2;
            return (
              <line
                key={`link-${b.id}`}
                x1={SRC_LEFT + SRC_W}
                y1={y1}
                x2={LIST_LEFT}
                y2={y2}
                stroke="var(--text-secondary)"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                opacity="0.4"
              />
            );
          })}

          {/* ===== 左侧三段来源块 ===== */}
          {BLOCKS.map((b, i) => {
            const y = srcTop(i);
            return (
              <g key={`src-${b.id}`}>
                <rect
                  x={SRC_LEFT}
                  y={y}
                  width={SRC_W}
                  height={SRC_H}
                  rx="10"
                  fill={b.color}
                  fillOpacity="0.1"
                  stroke={b.color}
                  strokeWidth="1.6"
                />
                <text
                  x={SRC_LEFT + SRC_W / 2}
                  y={y + 32}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {b.role}
                </text>
                <text
                  x={SRC_LEFT + SRC_W / 2}
                  y={y + 56}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {b.metaphor}
                </text>
              </g>
            );
          })}

          {/* ===== 右侧 messages 列表容器 ===== */}
          <rect
            x={LIST_LEFT - 8}
            y={LIST_TOP}
            width={LIST_W + 16}
            height={LIST_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={listCx}
            y={LIST_TOP + 22}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            messages（一份完整提示）
          </text>

          {/* 列表里三槽：叠好后的副本（落位动画驱动 opacity / translateX）。 */}
          {BLOCKS.map((b, i) => {
            const y = slotTop(i);
            return (
              <g
                key={`slot-${b.id}`}
                ref={(el) => {
                  slotRefs.current[b.id] = el;
                }}
                opacity="0"
              >
                <rect
                  x={LIST_LEFT}
                  y={y}
                  width={LIST_W}
                  height={SLOT_H}
                  rx="8"
                  fill={b.color}
                  fillOpacity="0.16"
                  stroke={b.color}
                  strokeWidth="1.6"
                />
                <text
                  x={LIST_LEFT + LIST_W / 2}
                  y={y + 30}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {b.role}
                </text>
                <text
                  x={LIST_LEFT + LIST_W / 2}
                  y={y + 52}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {b.metaphor}
                </text>
              </g>
            );
          })}

          {/* ===== messages → 模型 喂入箭头 ===== */}
          <path
            ref={feedRef}
            d={`M ${listCx} ${LIST_TOP + LIST_H} L ${modelCx} ${MODEL_TOP}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.2"
            markerEnd="url(#aapa-arrow)"
            opacity="0.18"
          />
          <text
            x={modelCx + 14}
            y={(LIST_TOP + LIST_H + MODEL_TOP) / 2 + 4}
            textAnchor="start"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            塞给模型
          </text>

          {/* ===== 模型节点 ===== */}
          <rect
            x={MODEL_LEFT}
            y={MODEL_TOP}
            width={MODEL_W}
            height={MODEL_H}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.14"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={modelCx}
            y={MODEL_TOP + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧠 模型（失忆天才）
          </text>
          <text
            x={modelCx}
            y={MODEL_TOP + 48}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            读整张纸条 → 按规矩回话
          </text>

          {/* ===== 模型回话气泡（左下，第 5 步浮现）===== */}
          <g
            ref={replyRef}
            opacity="0"
          >
            <rect
              x={SRC_LEFT}
              y={MODEL_TOP - 4}
              width={SRC_W + 60}
              height={MODEL_H + 4}
              rx="12"
              fill="var(--success)"
              fillOpacity="0.1"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x={SRC_LEFT + (SRC_W + 60) / 2}
              y={MODEL_TOP + 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              💬 回话：稳定、规整、按格式
            </text>
            <text
              x={SRC_LEFT + (SRC_W + 60) / 2}
              y={MODEL_TOP + 42}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              照着 system 的规矩与 few-shot 的样子答
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="一份提示 = system（岗位说明书）+ few-shot（范例）+ user（本次任务）三段叠起来，再喂给模型。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一张「纸条」不是随手一句话：先放 system 岗位说明书、再塞 few-shot 范例、最后写 user
        本次任务，三段叠成一份完整 messages 喂给模型——这就是 tinyagent 组装提示的全过程。
      </figcaption>
    </figure>
  );
}
