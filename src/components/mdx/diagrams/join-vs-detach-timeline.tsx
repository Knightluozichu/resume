"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <JoinVsDetachTimeline>：join vs detach 的双场景泳道动画（HEL-230，§5 辅 Demo）。
 *
 * 餐厅后厨隐喻：主线程 = 主厨，子线程 = 帮厨。两个场景上下并排：
 *  - 上场景 join：主厨泳道跑到「join()」处遇到一道 barrier 停住等待，帮厨泳道继续；
 *    帮厨干完后主厨才恢复继续——可视化「会合」（主厨被子线程拖住、要等它）。
 *  - 下场景 detach：主厨泳道不停、直接跑到底就结束；帮厨泳道在后台独立延续，
 *    甚至超出主厨的终点——可视化「不等、各跑各的」（放养后谁也不管谁）。
 *
 * 时间线分两段：先扫上场景 join（playhead 横扫 + 分段点亮，6 beat），
 * 再把第二条 playhead 拉回起点扫下场景 detach（6 beat）。每个 step 的 label
 * 锚定在「对应段点亮到最亮」的时刻（lit），修正 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 动态 import 切独立 chunk（硬规则 2/6），本组件经 mdx-components 注册时
 * next/dynamic(ssr:false) 懒加载，不进首屏。
 *
 * 视觉全部 DESIGN token（accent / danger / success / warning / border / text-* / bg），
 * 无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

const VIEW_W = 620;
const VIEW_H = 440;

// 时间轴几何：泳道内容区横向范围。
const TRACK_X = 116; // 泳道内容起点
const TRACK_W = 480; // 泳道内容宽
const LANE_H = 34; // 单条泳道高
const SEG_GAP = 6;

// 6 个时间槽（playhead 6 beat 扫满）。
const SLOTS = 6;
const SLOT_W = (TRACK_W - (SLOTS - 1) * SEG_GAP) / SLOTS;
const slotX = (i: number) => TRACK_X + i * (SLOT_W + SEG_GAP);

// —— 上场景 join 的泳道 y ——
const J_MAIN_Y = 76; // 主厨泳道
const J_CHILD_Y = J_MAIN_Y + LANE_H + 14; // 帮厨泳道
// —— 下场景 detach 的泳道 y ——
const D_MAIN_Y = 268;
const D_CHILD_Y = D_MAIN_Y + LANE_H + 14;

const MAIN_COLOR = "var(--danger)"; // 主厨（红，与全书主线程一致）
const CHILD_COLOR = "var(--success)"; // 帮厨（绿，与全书子线程一致）
const WAIT_COLOR = "var(--warning)"; // 等待 / barrier

// 每个分段：所在泳道行 y、起止槽、色、是否「等待」样式。
type Seg = {
  id: string;
  y: number;
  fromSlot: number;
  toSlot: number;
  color: string;
  wait?: boolean;
};

// 上场景 join：主厨槽 0-1 跑、槽 2-3 在 barrier 处等待、槽 4-5 恢复跑到底；
// 帮厨槽 0-3 一直跑（被等的那段它还在干），槽 3 末结束。
const JOIN_SEGS: readonly Seg[] = [
  { id: "j-main-run1", y: J_MAIN_Y, fromSlot: 0, toSlot: 2, color: MAIN_COLOR },
  {
    id: "j-main-wait",
    y: J_MAIN_Y,
    fromSlot: 2,
    toSlot: 4,
    color: WAIT_COLOR,
    wait: true,
  },
  { id: "j-main-run2", y: J_MAIN_Y, fromSlot: 4, toSlot: 6, color: MAIN_COLOR },
  {
    id: "j-child-run",
    y: J_CHILD_Y,
    fromSlot: 0,
    toSlot: 4,
    color: CHILD_COLOR,
  },
];

// 下场景 detach：主厨槽 0-3 跑完即结束（不等）；帮厨槽 0-6 后台独立跑，超出主厨终点。
const DETACH_SEGS: readonly Seg[] = [
  { id: "d-main-run", y: D_MAIN_Y, fromSlot: 0, toSlot: 3, color: MAIN_COLOR },
  {
    id: "d-child-run",
    y: D_CHILD_Y,
    fromSlot: 0,
    toSlot: 6,
    color: CHILD_COLOR,
  },
];

// 关键帧（6 beat × 2 段）。join 段 step 0..2 锚主厨三段、step 3 锚帮厨；
// 为让单步叙事顺，把 join 拆成 4 个关键点，detach 拆成 2 个关键点。
const STEPS: readonly TeachingStep[] = [
  {
    label: "j-main-run1",
    caption: "join｜主厨先干自己的活，跑到 t.join() 这一刻",
  },
  {
    label: "j-child-run",
    caption: "join｜帮厨还在后厨忙——主厨在 join() 处停下来等它",
  },
  {
    label: "j-main-wait",
    caption: "join｜主厨被 barrier 拦住空等：会合点，谁先到谁等谁",
  },
  {
    label: "j-main-run2",
    caption: "join｜帮厨干完了，两人会合，主厨这才恢复继续跑到底",
  },
  {
    label: "d-main-run",
    caption: "detach｜主厨一路不停直接跑到底就结束——根本不等帮厨",
  },
  {
    label: "d-child-run",
    caption: "detach｜帮厨在后台独立延续，甚至比主厨活得还久：各跑各的",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 两条 playhead 扫程端点。
const SWEEP_LEFT = TRACK_X - SEG_GAP;
const SWEEP_RIGHT = TRACK_X + TRACK_W + SEG_GAP;

// 一段在时间线上的「点亮时刻」：按它结束的槽位决定（段越靠后越晚亮）。
// 但叙事顺序由 STEPS 决定，这里只用于把 playhead 与段衔接的几何对齐。
function segLitBeatJoin(id: string): number {
  // 与 STEPS 顺序一致地排定每段淡入起点（beat）。
  switch (id) {
    case "j-main-run1":
      return 0;
    case "j-child-run":
      return 1;
    case "j-main-wait":
      return 2;
    case "j-main-run2":
      return 3;
    default:
      return 0;
  }
}

export function JoinVsDetachTimeline() {
  const segRefs = useRef<Record<string, SVGRectElement | null>>({});
  const joinPlayheadRef = useRef<SVGGElement | null>(null);
  const detachPlayheadRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // —— 第一段：join 场景，4 个关键帧（占 4 beat），playhead 同步横扫 ——
      if (joinPlayheadRef.current) {
        tl.add(
          joinPlayheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * 4,
            ease: "linear",
          },
          0,
        );
      }
      JOIN_SEGS.forEach((seg) => {
        const el = segRefs.current[seg.id];
        if (!el) return;
        const beat = segLitBeatJoin(seg.id);
        const lit = TEACHING_BEAT_MS * (beat + 1);
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          TEACHING_BEAT_MS * beat,
        );
        tl.label(seg.id, lit);
      });

      // —— 第二段：detach 场景，2 个关键帧（从 beat 4 起），新 playhead 横扫 ——
      const detachStart = TEACHING_BEAT_MS * 4;
      if (detachPlayheadRef.current) {
        tl.add(
          detachPlayheadRef.current,
          {
            translateX: [SWEEP_LEFT, SWEEP_RIGHT],
            duration: TEACHING_BEAT_MS * 2,
            ease: "linear",
          },
          detachStart,
        );
      }
      DETACH_SEGS.forEach((seg, i) => {
        const el = segRefs.current[seg.id];
        if (!el) return;
        const start = detachStart + TEACHING_BEAT_MS * i;
        const lit = start + TEACHING_BEAT_MS;
        tl.add(
          el,
          { opacity: [0, 1], duration: TEACHING_BEAT_MS, ease: "out(3)" },
          start,
        );
        tl.label(seg.id, lit);
      });
    },
  });

  // 一段矩形：横跨 [fromSlot, toSlot) 槽。
  const segRect = (seg: Seg) => {
    const x = slotX(seg.fromSlot);
    const w = slotX(seg.toSlot - 1) + SLOT_W - x;
    return { x, y: seg.y, w, h: LANE_H };
  };

  const renderSegs = (segs: readonly Seg[]) =>
    segs.map((seg) => {
      const { x, y, w, h } = segRect(seg);
      return (
        <g key={seg.id}>
          {/* 底层常驻低对比 */}
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            rx="6"
            fill={seg.color}
            fillOpacity="0.1"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray={seg.wait ? "5 4" : undefined}
          />
          {/* 高亮层（anime.js 点亮） */}
          <rect
            ref={(el) => {
              segRefs.current[seg.id] = el;
            }}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="6"
            fill={seg.color}
            fillOpacity={seg.wait ? 0.22 : 0.35}
            stroke={seg.color}
            strokeWidth="2"
            strokeDasharray={seg.wait ? "5 4" : undefined}
            opacity="0"
          />
          {seg.wait && (
            <text
              x={x + w / 2}
              y={y + h / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="var(--warning)"
            >
              ⏳ 等待
            </text>
          )}
        </g>
      );
    });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="join 与 detach 的双场景泳道对照动画。上半场景 join：主线程泳道先运行，到达 t.join() 处遇到一道屏障停下来等待，同时子线程泳道继续运行；子线程结束后主线程才恢复、继续跑到底——可视化「会合」，主线程被子线程拖住、必须等它。下半场景 detach：主线程泳道一路不停直接跑到终点就结束，根本不等；子线程泳道在后台独立延续，甚至比主线程活得更久——可视化「不等、各跑各的」。播放时先扫上场景再扫下场景，可播放、暂停、单步、拖动进度。"
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          <defs>
            <marker
              id="jvd-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ===== 上场景标题 ===== */}
          <text
            x="16"
            y="32"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            场景 ① join：主厨等帮厨会合
          </text>
          <text x="16" y="52" fontSize="11" fill="var(--text-secondary)">
            主线程在 join() 处停下来等子线程跑完，再继续
          </text>

          {/* 泳道标签（join） */}
          <text
            x="16"
            y={J_MAIN_Y + LANE_H / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={MAIN_COLOR}
          >
            主线程
          </text>
          <text
            x="16"
            y={J_CHILD_Y + LANE_H / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={CHILD_COLOR}
          >
            子线程
          </text>

          {/* join 段 */}
          {renderSegs(JOIN_SEGS)}

          {/* join() 会合点标注：barrier 竖线 */}
          <line
            x1={slotX(2) - SEG_GAP / 2}
            y1={J_MAIN_Y - 8}
            x2={slotX(2) - SEG_GAP / 2}
            y2={J_CHILD_Y + LANE_H + 8}
            stroke="var(--warning)"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text
            x={slotX(2) - SEG_GAP / 2}
            y={J_MAIN_Y - 12}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--warning)"
          >
            t.join()
          </text>

          {/* join playhead */}
          <g
            ref={joinPlayheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={J_MAIN_Y - 6}
              x2="0"
              y2={J_CHILD_Y + LANE_H + 6}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${J_MAIN_Y - 6} L 5 ${J_MAIN_Y - 6} L 0 ${J_MAIN_Y - 1} z`}
              fill="var(--accent)"
            />
          </g>

          {/* 时间轴（join 下方） */}
          <line
            x1={TRACK_X - SEG_GAP}
            y1={J_CHILD_Y + LANE_H + 30}
            x2={TRACK_X + TRACK_W + SEG_GAP}
            y2={J_CHILD_Y + LANE_H + 30}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            markerEnd="url(#jvd-arrow)"
            opacity="0.6"
          />
          <text
            x={TRACK_X + TRACK_W + SEG_GAP}
            y={J_CHILD_Y + LANE_H + 24}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            时间 →
          </text>

          {/* ===== 分隔线 ===== */}
          <line
            x1="16"
            y1="232"
            x2={VIEW_W - 16}
            y2="232"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* ===== 下场景标题 ===== */}
          <text
            x="16"
            y="260"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            场景 ② detach：放养，各跑各的
          </text>

          {/* 泳道标签（detach） */}
          <text
            x="16"
            y={D_MAIN_Y + LANE_H / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={MAIN_COLOR}
          >
            主线程
          </text>
          <text
            x="16"
            y={D_CHILD_Y + LANE_H / 2 + 4}
            fontSize="11"
            fontWeight="600"
            fill={CHILD_COLOR}
          >
            子线程
          </text>

          {/* detach 段 */}
          {renderSegs(DETACH_SEGS)}

          {/* 主厨终点标注（detach 主线程提前结束） */}
          <line
            x1={slotX(2) + SLOT_W + SEG_GAP / 2}
            y1={D_MAIN_Y - 8}
            x2={slotX(2) + SLOT_W + SEG_GAP / 2}
            y2={D_MAIN_Y + LANE_H + 8}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            strokeDasharray="4 3"
            opacity="0.7"
          />
          <text
            x={slotX(2) + SLOT_W + SEG_GAP / 2}
            y={D_MAIN_Y - 12}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            主厨收工
          </text>
          {/* 帮厨仍在跑标注 */}
          <text
            x={slotX(5) + SLOT_W / 2}
            y={D_CHILD_Y + LANE_H + 20}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill={CHILD_COLOR}
          >
            ↑ 帮厨仍在后台独立跑
          </text>

          {/* detach playhead */}
          <g
            ref={detachPlayheadRef}
            style={{ transform: `translateX(${SWEEP_LEFT}px)` }}
          >
            <line
              x1="0"
              y1={D_MAIN_Y - 6}
              x2="0"
              y2={D_CHILD_Y + LANE_H + 6}
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d={`M -5 ${D_MAIN_Y - 6} L 5 ${D_MAIN_Y - 6} L 0 ${D_MAIN_Y - 1} z`}
              fill="var(--accent)"
            />
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="join 让主厨在会合点停下来等帮厨；detach 让帮厨自己后台跑、主厨不等。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        join 是「会合」——主线程停在 join() 处等子线程结束才继续； detach
        是「放养」——主线程不等、各跑各的，子线程在后台独立延续。
      </figcaption>
    </figure>
  );
}
