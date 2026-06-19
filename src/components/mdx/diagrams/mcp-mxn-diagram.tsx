"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <McpMxnDiagram>：MCP 怎么把 M×N 的集成噩梦变成 M+N（HEL-319，第 10 章主 viz）。
 *
 * 「可控教学动画」：左列 3 个 AI 应用、右列 3 个外部工具，演出标准协议如何省胶水——
 *   ① 没有标准时：每个应用要为每个工具单写一遍对接，3×3 = 9 条乱麻线（N×M）。
 *   ② 引入 MCP 标准：中间立起一根「MCP 标准协议」总线，乱麻线压暗。
 *   ③ 收口：每个应用收成 1 个 MCP Client、每个工具收成 1 个 MCP Server（徽标淡入）。
 *   ④ 清爽连接：每个 client 一条线接上总线、每个 server 一条线接上总线，
 *      3 + 3 = 6 条（M+N）——应用和工具经标准协议互通、可复用。
 *
 * 几何稳定策略（杜绝位移/重排）：所有节点（应用框 / 工具框 / 总线 / client·server 徽标）
 * 位置固定、各持 ref；乱麻线组、清爽线组、总线组、徽标组全程只切 opacity 淡入淡出。
 * 照 multi-turn-loop / tool-error-recovery 的「只动 opacity」铁律。
 *
 * 时序铁律照黄金范例：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * tl.label(name, BEAT*(i+1)) 落在呈现完成处，最后一步停在亮态不淡出（杜绝 off-by-one）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，
 * 几何布局常量均具名、为 4 的倍数（硬规则 5）。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 472;

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

// —— 左列「AI 应用」、右列「外部工具」各 3 个，竖直堆叠（单一 y 公式）。 ——
const NODE_W = 144;
const NODE_H = 56;
const ROW_Y0 = 124; // 第 0 行节点顶
const ROW_GAP = 48;

const APP_X = 28; // 左列 x（距左边 28 ≥14）
const TOOL_X = VIEW_W - NODE_W - 28; // 548，右列 x（距右边 28 ≥14）

/** 第 i 行节点左上角 y（单一公式；底行底 = 124 + 2*104 + 56 = 388 → 距底 84，给底注留位）。 */
function rowY(i: number): number {
  return ROW_Y0 + i * (NODE_H + ROW_GAP);
}

/** 节点垂直中心。 */
function rowCY(i: number): number {
  return rowY(i) + NODE_H / 2;
}

// —— 中央「MCP 标准协议」总线（竖直）。 ——
const BUS_W = 96;
const BUS_X = (VIEW_W - BUS_W) / 2; // 312
const BUS_Y = 112;
const BUS_H = 288; // 底 = 400 → 距底 72
const BUS_CX = BUS_X + BUS_W / 2; // 360

// —— client / server 小徽标（贴在应用 / 工具朝内的一侧）。 ——
const BADGE_W = 64;
const BADGE_H = 24;
const CLIENT_X = APP_X + NODE_W + 12; // 应用右侧
const SERVER_X = TOOL_X - BADGE_W - 12; // 工具左侧

/** 徽标垂直中心对齐对应行节点中心。 */
function badgeY(i: number): number {
  return rowCY(i) - BADGE_H / 2;
}

const APPS: readonly string[] = ["🖥️ Claude 桌面端", "💬 某聊天应用", "🧑‍💻 某 IDE"];
const TOOLS: readonly string[] = ["📁 文件系统", "🗂️ 数据库", "🔌 第三方 API"];

type McpStep = TeachingStep & {
  /** 乱麻 N×M 线是否亮。 */
  tangled: boolean;
  /** 中央 MCP 总线是否亮。 */
  bus: boolean;
  /** client / server 徽标是否亮。 */
  badges: boolean;
  /** 清爽 M+N 线是否亮。 */
  clean: boolean;
};

const STEPS: readonly McpStep[] = [
  {
    label: "chaos",
    caption:
      "① 没有标准时：3 个应用要接 3 个工具，每对都得单写一遍对接胶水——3×3 = 9 条线，一团乱麻。应用越多、工具越多，线越爆炸（N×M）。",
    tangled: true,
    bus: false,
    badges: false,
    clean: false,
  },
  {
    label: "standard",
    caption:
      "② 引入 MCP 标准协议：中间立起一根统一的「插座」——所有应用和工具不再各连各的，都改成接到这根标准总线上。乱麻线退场。",
    tangled: false,
    bus: true,
    badges: false,
    clean: false,
  },
  {
    label: "collapse",
    caption:
      "③ 收口：每个应用内置 1 个 MCP Client（用标准方式去连），每个工具包成 1 个 MCP Server（用标准方式把能力暴露出来）。各写一次、互不耦合。",
    tangled: false,
    bus: true,
    badges: true,
    clean: false,
  },
  {
    label: "mplusn",
    caption:
      "④ 清爽：每个 client 一条线接上总线、每个 server 一条线接上总线——3 + 3 = 6 条（M+N）。任一应用都能即插即用地复用任一工具，胶水从「乘法」降成「加法」。",
    tangled: false,
    bus: true,
    badges: true,
    clean: true,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function McpMxnDiagram() {
  const tangledRef = useRef<SVGGElement | null>(null);
  const busRef = useRef<SVGGElement | null>(null);
  const badgesRef = useRef<SVGGElement | null>(null);
  const cleanRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (el: SVGGElement | null, on: boolean, start: number) => {
        if (!el) return;
        tl.add(
          el,
          {
            opacity: on ? SHOWN : HIDDEN,
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          start,
        );
      };

      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        fade(tangledRef.current, step.tangled, start);
        fade(busRef.current, step.bus, start);
        fade(badgesRef.current, step.badges, start);
        fade(cleanRef.current, step.clean, start);

        tl.label(step.label, lit);
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签（与站内 Demo 容器气质一致） */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MCP 怎么把 M×N 的集成难题变成 M+N 的对照动画，共四步。画面左列从上到下是三个 AI 应用：Claude 桌面端、某聊天应用、某 IDE；右列从上到下是三个外部工具：文件系统、数据库、第三方 API。第一步，没有标准时：三个应用要接三个工具，每一对都得各自单写一遍对接胶水，三乘三等于九条线，连成一团乱麻；应用越多、工具越多，要写的线就越爆炸，这就是 N 乘 M。第二步，引入 MCP 标准协议：画面正中立起一根统一的标准总线，像一个通用插座，所有应用和工具不再各连各的，都改成接到这根总线上，原来的乱麻线退场。第三步，收口：每个应用内置一个 MCP Client，用标准方式去连接；每个工具包装成一个 MCP Server，用标准方式把自己的能力暴露出来；各写一次、互不耦合。第四步，清爽连接：每个 client 一条线接上总线、每个 server 一条线接上总线，三加三等于六条线，这就是 M 加 N；从此任何一个应用都能即插即用地复用任何一个工具，要写的胶水从乘法降成了加法。核心结论：MCP 用一套开放标准协议，让 AI 应用和外部工具之间从 N 乘 M 的重复对接，变成每个应用写一个 client、每个工具写一个 server 的 M 加 N，彼此即插即用、可复用。可以播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="mcp-mxn-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 顶部标题 —— */}
          <text
            x={APP_X + NODE_W / 2}
            y={40}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🖥️ N 个 AI 应用
          </text>
          <text
            x={TOOL_X + NODE_W / 2}
            y={40}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🔧 M 个外部工具
          </text>
          <text
            x={BUS_CX}
            y={40}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            标准协议
          </text>
          <text
            x={VIEW_W / 2}
            y={64}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            点播放：看「N×M 各写各的」如何收成「M+N 即插即用」
          </text>

          {/* —— 乱麻 N×M 线组（每个应用连每个工具，3×3=9 条；初始亮）—— */}
          <g
            ref={(el) => {
              tangledRef.current = el;
            }}
            opacity={SHOWN}
          >
            {APPS.map((_, ai) =>
              TOOLS.map((__, ti) => (
                <line
                  key={`tangle-${ai}-${ti}`}
                  x1={APP_X + NODE_W}
                  y1={rowCY(ai)}
                  x2={TOOL_X}
                  y2={rowCY(ti)}
                  stroke="var(--danger)"
                  strokeWidth="1.4"
                  opacity="0.55"
                />
              )),
            )}
            <text
              x={VIEW_W / 2}
              y={VIEW_H - 24}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--danger)"
            >
              😵 N×M = 3×3 = 9 套对接，一团乱麻
            </text>
          </g>

          {/* —— 中央 MCP 标准协议总线组（第②步起亮）—— */}
          <g
            ref={(el) => {
              busRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <rect
              x={BUS_X}
              y={BUS_Y}
              width={BUS_W}
              height={BUS_H}
              rx="12"
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x={BUS_CX}
              y={BUS_Y + BUS_H / 2 - 8}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              🔌 MCP
            </text>
            <text
              x={BUS_CX}
              y={BUS_Y + BUS_H / 2 + 14}
              textAnchor="middle"
              fontSize="11"
              fill="var(--text-secondary)"
            >
              标准总线
            </text>
          </g>

          {/* —— 清爽 M+N 线组（第④步亮）：每个 client / server 一条线接总线 —— */}
          <g
            ref={(el) => {
              cleanRef.current = el;
            }}
            opacity={HIDDEN}
          >
            {APPS.map((_, ai) => (
              <line
                key={`clean-app-${ai}`}
                x1={CLIENT_X + BADGE_W}
                y1={rowCY(ai)}
                x2={BUS_X - 4}
                y2={rowCY(ai)}
                stroke="var(--success)"
                strokeWidth="1.8"
                markerEnd="url(#mcp-mxn-arrow)"
              />
            ))}
            {TOOLS.map((_, ti) => (
              <line
                key={`clean-tool-${ti}`}
                x1={BUS_X + BUS_W + 4}
                y1={rowCY(ti)}
                x2={SERVER_X}
                y2={rowCY(ti)}
                stroke="var(--success)"
                strokeWidth="1.8"
                markerStart="url(#mcp-mxn-arrow)"
              />
            ))}
            <text
              x={VIEW_W / 2}
              y={VIEW_H - 24}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--success)"
            >
              😎 M+N = 3+3 = 6 条，即插即用、可复用
            </text>
          </g>

          {/* —— 左列应用框（常驻）—— */}
          {APPS.map((app, ai) => (
            <g key={`app-${ai}`}>
              <rect
                x={APP_X}
                y={rowY(ai)}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={APP_X + NODE_W / 2}
                y={rowCY(ai) + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {app}
              </text>
            </g>
          ))}

          {/* —— 右列工具框（常驻）—— */}
          {TOOLS.map((tool, ti) => (
            <g key={`tool-${ti}`}>
              <rect
                x={TOOL_X}
                y={rowY(ti)}
                width={NODE_W}
                height={NODE_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={TOOL_X + NODE_W / 2}
                y={rowCY(ti) + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {tool}
              </text>
            </g>
          ))}

          {/* —— client / server 徽标组（第③步起亮）—— */}
          <g
            ref={(el) => {
              badgesRef.current = el;
            }}
            opacity={HIDDEN}
          >
            {APPS.map((_, ai) => (
              <g key={`client-${ai}`}>
                <rect
                  x={CLIENT_X}
                  y={badgeY(ai)}
                  width={BADGE_W}
                  height={BADGE_H}
                  rx="6"
                  fill="var(--bg-elevated)"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
                <text
                  x={CLIENT_X + BADGE_W / 2}
                  y={badgeY(ai) + BADGE_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  Client
                </text>
              </g>
            ))}
            {TOOLS.map((_, ti) => (
              <g key={`server-${ti}`}>
                <rect
                  x={SERVER_X}
                  y={badgeY(ti)}
                  width={BADGE_W}
                  height={BADGE_H}
                  rx="6"
                  fill="var(--bg-elevated)"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                />
                <text
                  x={SERVER_X + BADGE_W / 2}
                  y={badgeY(ti) + BADGE_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  Server
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看 MCP 怎么把「3 个应用 × 3 个工具各写各的」9 条乱麻线（N×M），收成「每应用 1 个 client、每工具 1 个 server 都接标准总线」的 6 条清爽线（M+N）。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        MCP 把集成从「乘法」降成「加法」：没有标准时 N 个应用 × M
        个工具要各写一遍胶水（N×M）；有了 MCP，每个应用写一个 client、每个工具写一个
        server，都接到标准协议上，互相即插即用、可复用（M+N）。
      </figcaption>
    </figure>
  );
}
