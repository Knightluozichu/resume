"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <YieldKindsDiagram>：四种常见 yield 各自「何时恢复」的可控对照动画（HEL-283）。
 *
 * 协程的 `yield return XXX` 这一句决定「下一次什么时候轮到我接着跑」。本图用四条横向
 * 泳道，并排放在同一条「帧轴」上，让读者一眼分清这堆 yield 在帧 / 时间上恢复点的差异：
 *  - 泳道 1 `yield return null`：等到「下一帧」的 Update 阶段恢复（最常见的逐帧推进）。
 *  - 泳道 2 `WaitForSeconds(t)`：等约 t 秒（≈ 若干帧）后恢复——跨过中间一串帧。
 *  - 泳道 3 `WaitForFixedUpdate`：等到下一次「固定步长」FixedUpdate（物理节拍）恢复。
 *  - 泳道 4 `WaitForEndOfFrame`：等到「本帧渲染完、画面提交前」恢复（同一帧的最末尾）。
 *
 * 每条泳道在它的「恢复点」放一个高亮标记，分 4 步逐条点亮，让读者逐个看清各自落点。
 * label 锚定「该步动作完成」的时刻（lit = BEAT*(i+1)），修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互；anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时不进首屏关键路径。
 *
 * 视觉：全部 DESIGN token；无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥14px；四泳道两两不重叠。
 */

const VIEW_W = 720;
const VIEW_H = 420;

// 帧轴：每条泳道共用的横向刻度（一格 = 一帧的「这一帧内」时间）。
const AXIS_X0 = 196;
const AXIS_X1 = VIEW_W - 24;
const TICK_COUNT = 6; // 当前帧 + 之后 5 帧的刻度
const tickX = (i: number) =>
  AXIS_X0 + (i * (AXIS_X1 - AXIS_X0)) / (TICK_COUNT - 1);

// 泳道：左侧 196px 放 yield 名字，右侧画轴。
const LANE_LABEL_X = 24;
const LANE_LABEL_W = AXIS_X0 - LANE_LABEL_X - 12;
const LANE_Y0 = 110;
const LANE_H = 64;
const LANE_GAP = 8;
const laneY = (i: number) => LANE_Y0 + i * (LANE_H + LANE_GAP);
const laneCY = (i: number) => laneY(i) + LANE_H / 2;

type Lane = {
  name: string;
  desc: string;
  resumeTick: number; // 恢复点落在第几格刻度
  color: string;
  resumeNote: string;
};
const LANES: readonly Lane[] = [
  {
    name: "yield return null",
    desc: "等到「下一帧」",
    resumeTick: 1,
    color: "var(--accent)",
    resumeNote: "下一帧的 Update 恢复",
  },
  {
    name: "WaitForSeconds(t)",
    desc: "等约 t 秒（≈ 若干帧）",
    resumeTick: 4,
    color: "var(--warning)",
    resumeNote: "约 t 秒后那一帧恢复",
  },
  {
    name: "WaitForFixedUpdate",
    desc: "等到下次固定步长",
    resumeTick: 1,
    color: "var(--success)",
    resumeNote: "下一次 FixedUpdate（物理节拍）恢复",
  },
  {
    name: "WaitForEndOfFrame",
    desc: "等到本帧渲染完",
    resumeTick: 0,
    color: "var(--accent)",
    resumeNote: "本帧末尾、画面提交前恢复（仍是当前帧）",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "null",
    caption:
      "① yield return null：最常见——挂起到「下一帧」，下一帧的 Update 阶段接着跑（逐帧推进就靠它）",
  },
  {
    label: "seconds",
    caption:
      "② WaitForSeconds(t)：挂起约 t 秒（≈ 若干帧），跨过中间一串帧，到点那一帧才恢复（受 timeScale 影响）",
  },
  {
    label: "fixed",
    caption:
      "③ WaitForFixedUpdate：挂起到下一次「固定步长」FixedUpdate——和物理节拍对齐",
  },
  {
    label: "endframe",
    caption:
      "④ WaitForEndOfFrame：挂起到「本帧渲染完、画面提交前」——仍在当前帧的最末尾（常用于截屏）",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function YieldKindsDiagram() {
  const laneMarkRefs = [
    useRef<SVGGElement | null>(null),
    useRef<SVGGElement | null>(null),
    useRef<SVGGElement | null>(null),
    useRef<SVGGElement | null>(null),
  ];

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      LANES.forEach((_, i) => {
        const start = TEACHING_BEAT_MS * i;
        const ref = laneMarkRefs[i].current;
        if (ref) {
          tl.add(
            ref,
            { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
            start,
          );
        }
        tl.label(STEPS[i].label, TEACHING_BEAT_MS * (i + 1));
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
          aria-label="四种常见 yield 各自何时恢复的对照动画。左侧是四条泳道的名字，每条泳道右侧共用一条横向帧轴，左端是当前帧、向右是之后的几帧。第一条泳道是 yield return null，恢复点落在下一帧，表示挂起到下一帧的 Update 阶段接着跑，这是逐帧推进最常用的写法。第二条泳道是 WaitForSeconds t，恢复点落在右侧较远的一格，表示挂起约 t 秒也就是若干帧，跨过中间一串帧到点那一帧才恢复，而且受 timeScale 影响。第三条泳道是 WaitForFixedUpdate，恢复点落在下一次固定步长的 FixedUpdate，和物理节拍对齐。第四条泳道是 WaitForEndOfFrame，恢复点落在当前帧的最末尾、画面提交前，仍属于当前帧，常用于截屏。动画分四步逐条点亮各自的恢复点。动画可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
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
            四种 yield，各自「什么时候轮到我接着跑」
          </text>
          <text
            x={VIEW_W / 2}
            y={52}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            同一条帧轴上，看每种 yield 的「恢复点」落在哪
          </text>

          {/* ===== 帧轴刻度（顶部一条，四泳道共用参照） ===== */}
          <line
            x1={AXIS_X0}
            y1={84}
            x2={AXIS_X1}
            y2={84}
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {Array.from({ length: TICK_COUNT }, (_, i) => (
            <g key={i}>
              <line
                x1={tickX(i)}
                y1={80}
                x2={tickX(i)}
                y2={laneY(LANES.length - 1) + LANE_H}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
              <text
                x={tickX(i)}
                y={74}
                textAnchor="middle"
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {i === 0 ? "本帧" : `+${i}`}
              </text>
            </g>
          ))}

          {/* ===== 四条泳道 ===== */}
          {LANES.map((lane, i) => (
            <g key={lane.name}>
              {/* 泳道左侧名字框 */}
              <rect
                x={LANE_LABEL_X}
                y={laneY(i)}
                width={LANE_LABEL_W}
                height={LANE_H}
                rx="8"
                fill={lane.color}
                fillOpacity="0.1"
                stroke={lane.color}
                strokeWidth="1.4"
              />
              <text
                x={LANE_LABEL_X + 12}
                y={laneCY(i) - 6}
                fontSize="11"
                fontWeight="700"
                fontFamily="var(--font-mono)"
                fill="var(--text-primary)"
              >
                {lane.name}
              </text>
              <text
                x={LANE_LABEL_X + 12}
                y={laneCY(i) + 13}
                fontSize="9.5"
                fill="var(--text-secondary)"
              >
                {lane.desc}
              </text>

              {/* 泳道轨道线 */}
              <line
                x1={AXIS_X0}
                y1={laneCY(i)}
                x2={AXIS_X1}
                y2={laneCY(i)}
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              {/* 起点（当前帧 yield 处）小圆 */}
              <circle
                cx={AXIS_X0}
                cy={laneCY(i)}
                r="4"
                fill="var(--text-secondary)"
              />

              {/* 恢复点标记（动画逐条点亮） */}
              <g ref={laneMarkRefs[i]} opacity="0">
                <line
                  x1={AXIS_X0}
                  y1={laneCY(i)}
                  x2={tickX(lane.resumeTick)}
                  y2={laneCY(i)}
                  stroke={lane.color}
                  strokeWidth="2.4"
                />
                <circle
                  cx={tickX(lane.resumeTick)}
                  cy={laneCY(i)}
                  r="6"
                  fill={lane.color}
                />
                <text
                  x={
                    tickX(lane.resumeTick) +
                    (lane.resumeTick >= TICK_COUNT - 1 ? -8 : 12)
                  }
                  y={laneCY(i) - 12}
                  textAnchor={
                    lane.resumeTick >= TICK_COUNT - 1 ? "end" : "start"
                  }
                  fontSize="9.5"
                  fontWeight="600"
                  fill={lane.color}
                >
                  ▲ 在此恢复
                </text>
                <text
                  x={
                    tickX(lane.resumeTick) +
                    (lane.resumeTick >= TICK_COUNT - 1 ? -8 : 12)
                  }
                  y={laneCY(i) + 18}
                  textAnchor={
                    lane.resumeTick >= TICK_COUNT - 1 ? "end" : "start"
                  }
                  fontSize="9"
                  fill="var(--text-secondary)"
                >
                  {lane.resumeNote}
                </text>
              </g>
            </g>
          ))}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="猜一猜：想做「每一帧推进一点」的逐帧动画，该 yield return 哪个？单步走第①步看答案。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        yield return 后面跟什么，决定「下一次什么时候接着跑」：null
        等下一帧、WaitForSeconds(t) 等约 t 秒、 WaitForFixedUpdate
        等下次物理节拍、WaitForEndOfFrame
        等本帧渲染完。选错就会在错误的时机恢复。
      </figcaption>
    </figure>
  );
}
