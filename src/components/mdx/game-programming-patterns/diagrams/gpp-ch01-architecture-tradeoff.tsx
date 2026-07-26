"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh01ArchitectureTradeoff>：架构章取舍对照动画（GPP 第1章 · 图2）。
 *
 * 故事：游戏引擎是自底向上的分层结构——硬件 → 引擎核心 → 子系统 → 游戏逻辑。
 *  ① 分层栈建立（4 层）
 *  ② 轴向：越往上越抽象、越好维护；越往下越贴近硬件、性能越高
 *  ③ 把 4 层画到"抽象度 vs 性能"曲线上：二者大致反比
 *  ④ 顶层游戏逻辑：最抽象、最好维护，但离硬件最远、最慢
 *  ⑤ 底层硬件：最快、最底层，但最难写、最不可移植
 *  ⑥ 结论：没有最优架构，只有针对约束的取舍；模式是这些权衡的落点
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;

type Layer = {
  id: string;
  name: string;
  color: string;
  abstraction: number; // 0-10
  duty: string;
};

const LAYERS: readonly Layer[] = [
  { id: "gameplay", name: "游戏逻辑", color: "#C792EA", abstraction: 9, duty: "规则、关卡、玩法、AI 决策" },
  { id: "subsystems", name: "子系统（渲染/物理/音频/AI）", color: "#5AA9E6", abstraction: 6, duty: "把一类能力封装成可复用模块" },
  { id: "engine", name: "引擎核心（循环/内存/调度）", color: "#3FB97F", abstraction: 3, duty: "游戏循环、内存管理、任务调度" },
  { id: "hardware", name: "硬件 / 平台 API", color: "#E5B567", abstraction: 1, duty: "CPU/GPU/内存/操作系统" },
];

const LAYER_X = 48;
const LAYER_W = 330;
const LAYER_H = 62;
const LAYER_GAP = 12;
const LAYER_TOP = 104;

/** 权衡曲线坐标映射：x=抽象度，y=性能（顶部高）。 */
const CURVE = { x0: 478, y0: 300, w: 180, h: 150 };
function pointOf(l: Layer) {
  return {
    cx: CURVE.x0 + (l.abstraction / 10) * CURVE.w,
    cy: CURVE.y0 - ((10 - l.abstraction) / 10) * CURVE.h,
  };
}

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "游戏引擎是自底向上的分层结构：硬件 → 引擎核心 → 子系统 → 游戏逻辑" },
  { label: "axes", caption: "越往上越抽象、越好维护；越往下越贴近硬件、性能越高" },
  { label: "curve", caption: "把 4 层画到「抽象度 vs 性能」曲线上：二者大致反比" },
  { label: "top", caption: "顶层游戏逻辑：最抽象、最好维护，但离硬件最远、最慢" },
  { label: "bottom", caption: "底层硬件：最快、最底层，但最难写、最不可移植" },
  { label: "insight", caption: "没有最优架构，只有针对约束的取舍；模式正是这些权衡的落点" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh01ArchitectureTradeoff() {
  const stackRef = useRef<SVGGElement | null>(null);
  const axesRef = useRef<SVGGElement | null>(null);
  const curvePanelRef = useRef<SVGGElement | null>(null);
  const pointRefs = useRef<Record<string, SVGGElement | null>>({});
  const layerHiRefs = useRef<Record<string, SVGRectElement | null>>({});
  const ringRefs = useRef<Record<string, SVGCircleElement | null>>({});
  const topNoteRef = useRef<SVGGElement | null>(null);
  const bottomNoteRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：分层栈淡入
      tl.add(stackRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② axes（t: T→2T）：轴向标注淡入
      tl.add(axesRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("axes", T);

      // ③ curve（t: 2T→3T）：曲线面板淡入，4 个点依次绘出
      tl.add(curvePanelRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      LAYERS.forEach((l, i) => {
        tl.add(pointRefs.current[l.id]!, { opacity: [0, 1], scale: [0.4, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.25 + i * T * 0.15);
      });
      tl.label("curve", T * 2);

      // ④ top（t: 3T→4T）：高亮顶层 + 曲线环 + 说明
      tl.add(layerHiRefs.current["gameplay"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(ringRefs.current["gameplay"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.15);
      tl.add(topNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.3);
      tl.label("top", T * 3);

      // ⑤ bottom（t: 4T→5T）：高亮底层 + 曲线环 + 说明（顶层淡出）
      tl.add(layerHiRefs.current["gameplay"]!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 4);
      tl.add(ringRefs.current["gameplay"]!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 4);
      tl.add(topNoteRef.current!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 4);
      tl.add(layerHiRefs.current["hardware"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(ringRefs.current["hardware"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.25);
      tl.add(bottomNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4.4);
      tl.label("bottom", T * 4);

      // ⑥ insight（t: 5T→5.6T）：结论浮现
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚖️</span>
            取舍对照
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="架构章取舍对照动画。游戏引擎是自底向上的分层结构：硬件、引擎核心、子系统、游戏逻辑。越往上越抽象越好维护，越往下越贴近硬件性能越高。把四层画到抽象度与性能曲线上二者大致反比。顶层游戏逻辑最抽象最好维护但最慢；底层硬件最快但最难写最不可移植。结论：没有最优架构，只有针对约束的取舍，模式是这些权衡的落点。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：抽象 / 可维护性 vs 性能 / 控制
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            游戏引擎分层——每一层都在两端之间做权衡
          </text>

          {/* 轴向标注 */}
          <g ref={axesRef} style={{ opacity: 0 }}>
            <text x={LAYER_X} y={LAYER_TOP - 16} fontSize="11" fontWeight="700" fill={ACCENT}>↑ 抽象度高 · 好维护 · 慢</text>
            <text x={LAYER_X} y={LAYER_TOP + LAYERS.length * (LAYER_H + LAYER_GAP) + 2} fontSize="11" fontWeight="700" fill={ACCENT}>↓ 性能高 · 贴近硬件 · 难写</text>
          </g>

          {/* 分层栈 */}
          <g ref={stackRef} style={{ opacity: 0 }}>
            {LAYERS.map((l, i) => {
              const y = LAYER_TOP + i * (LAYER_H + LAYER_GAP);
              return (
                <g key={l.id}>
                  <rect x={LAYER_X} y={y} width={LAYER_W} height={LAYER_H} rx="10" fill={l.color} fillOpacity="0.1" stroke={l.color} strokeWidth="1.5" />
                  <text x={LAYER_X + 16} y={y + 26} fontSize="13" fontWeight="700" fill="var(--text-primary)">{l.name}</text>
                  <text x={LAYER_X + 16} y={y + 46} fontSize="11" fill="var(--text-secondary)">{l.duty}</text>
                  {/* 抽象度条 */}
                  <rect x={LAYER_X + LAYER_W - 84} y={y + 14} width={66} height={8} rx="4" fill="var(--text-secondary)" fillOpacity="0.15" />
                  <rect x={LAYER_X + LAYER_W - 84} y={y + 14} width={66 * (l.abstraction / 10)} height={8} rx="4" fill={l.color} />
                  <text x={LAYER_X + LAYER_W - 84} y={y + 40} fontSize="11" fill="var(--text-secondary)">抽象度 {l.abstraction}/10</text>
                  {/* 高亮框（动画） */}
                  <rect ref={(el) => { layerHiRefs.current[l.id] = el; }} x={LAYER_X - 4} y={y - 4} width={LAYER_W + 8} height={LAYER_H + 8} rx="12" fill="none" stroke={l.color} strokeWidth="3" style={{ opacity: 0 }} />
                </g>
              );
            })}
          </g>

          {/* 权衡曲线面板 */}
          <g ref={curvePanelRef} style={{ opacity: 0 }}>
            <rect x="440" y="104" width="248" height="230" rx="12" fill="var(--text-secondary)" fillOpacity="0.04" stroke="var(--border)" strokeWidth="1.4" />
            <text x="564" y="128" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">权衡曲线</text>
            <line x1={CURVE.x0} y1={CURVE.y0 - CURVE.h - 10} x2={CURVE.x0} y2={CURVE.y0} stroke="var(--text-secondary)" strokeWidth="1.4" />
            <line x1={CURVE.x0} y1={CURVE.y0} x2={CURVE.x0 + CURVE.w + 12} y2={CURVE.y0} stroke="var(--text-secondary)" strokeWidth="1.4" />
            <text x={CURVE.x0 - 8} y={CURVE.y0 - CURVE.h} textAnchor="end" fontSize="11" fill="var(--text-secondary)">性能</text>
            <text x={CURVE.x0 + CURVE.w + 10} y={CURVE.y0 + 16} textAnchor="end" fontSize="11" fill="var(--text-secondary)">抽象度</text>
            <text x="564" y="322" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">抽象度 ↑ 则性能 ↓（大致反比）</text>
          </g>

          {/* 曲线点 + 环 */}
          {LAYERS.map((l) => {
            const { cx, cy } = pointOf(l);
            return (
              <g key={`pt-${l.id}`}>
                <g ref={(el) => { pointRefs.current[l.id] = el; }} style={{ opacity: 0 }}>
                  <circle cx={cx} cy={cy} r="6" fill={l.color} />
                  <text x={cx} y={cy - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill={l.color}>{l.name.slice(0, 4)}</text>
                </g>
                <circle ref={(el) => { ringRefs.current[l.id] = el; }} cx={cx} cy={cy} r="11" fill="none" stroke={l.color} strokeWidth="2.5" style={{ opacity: 0 }} />
              </g>
            );
          })}

          {/* 顶层说明 */}
          <g ref={topNoteRef} style={{ opacity: 0 }}>
            <rect x="48" y="392" width="330" height="40" rx="8" fill="#C792EA" fillOpacity="0.1" stroke="#C792EA" strokeWidth="1.4" />
            <text x="64" y="410" fontSize="11" fontWeight="700" fill="#C792EA">游戏逻辑 · 典型模式：状态、组件、命令、观察者</text>
            <text x="64" y="425" fontSize="11" fill="var(--text-secondary)">最抽象、最好维护，但离硬件最远、最慢</text>
          </g>
          {/* 底层说明 */}
          <g ref={bottomNoteRef} style={{ opacity: 0 }}>
            <rect x="48" y="392" width="330" height="40" rx="8" fill="#E5B567" fillOpacity="0.1" stroke="#E5B567" strokeWidth="1.4" />
            <text x="64" y="410" fontSize="11" fontWeight="700" fill="#E5B567">硬件 · 典型模式：数据局部性、平台事件循环</text>
            <text x="64" y="425" fontSize="11" fill="var(--text-secondary)">最快、最底层，但最难写、最不可移植</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="400" y="352" width="288" height="80" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="416" y="376" fontSize="12" fontWeight="700" fill={OK_COLOR}>没有最优架构，只有针对约束的取舍</text>
            <text x="416" y="396" fontSize="11" fill="var(--text-secondary)">性能是贯穿全书的约束；本书的模式正是</text>
            <text x="416" y="410" fontSize="11" fill="var(--text-secondary)">这些权衡在具体场景下的落点</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="游戏引擎分层：越往上越抽象越好维护越慢，越往下越快越难写。抽象度与性能大致反比——没有最优架构，只有针对约束的取舍。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：架构（Architecture）每一层都在"抽象/可维护性"与"性能/控制"之间权衡——越往下越快越难写，越往上越好维护越慢。
      </figcaption>
    </figure>
  );
}
