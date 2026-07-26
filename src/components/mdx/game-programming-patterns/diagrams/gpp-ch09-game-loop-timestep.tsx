"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh09GameLoopTimestep>：游戏循环固定时间步长动画（GPP 第9章）。
 *
 * 核心：把游戏运行解耦成持续循环——处理输入、按固定时间步长 dt 推进状态、渲染。
 * 用累积器（accumulator）吸收帧率波动：frameTime 倒入累积器，攒够一个 dt 就 update(dt)
 * 一次并扣掉 dt。于是快机器（frameTime 小）每几帧 update 一次、慢机器（frameTime 大）
 * 一帧 update 多次，但游戏内时间始终按固定 dt 推进——游戏速度独立于硬件帧率。
 *
 * 节拍：
 *  ① 循环结构：输入 → 更新(update dt) → 渲染，周而复始
 *  ② 累积器：frameTime 倒入，攒够 dt(16ms) 就 update 一次
 *  ③ 快机器 frameTime=8ms：约每两帧 update 一次
 *  ④ 慢机器 frameTime=32ms：一帧 update 两次
 *  ⑤ 慢机器靠一帧多次 update 追上游戏时间
 *  ⑥ 结论：游戏内时间按固定 dt 推进，与帧率无关
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAST_COLOR = "#5AA9E6"; // 快机器（蓝）
const SLOW_COLOR = "#E5B567"; // 慢机器（黄）

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "loop", caption: "游戏循环周而复始：处理输入 → 按固定 dt 更新状态 → 渲染" },
  { label: "accum", caption: "累积器吸收帧率波动：frameTime 倒入，攒够一个 dt(16ms) 就 update 一次并扣掉 dt" },
  { label: "fast", caption: "快机器 frameTime=8ms：帧来得密，约每两帧才攒够一个 dt、update 一次" },
  { label: "slow", caption: "慢机器 frameTime=32ms：帧来得疏，一帧就超过两个 dt、update 两次" },
  { label: "catchup", caption: "慢机器靠一帧内多次 update 把游戏时间追平，不掉队" },
  { label: "constant", caption: "无论帧率高低，游戏内时间都按固定 dt 推进——游戏速度恒定，与硬件无关" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// ─── 循环三环布局 ────────────────────────────────────────────────────────────

const LOOP_Y = 118;
const LOOP_BOX_W = 120;
const LOOP_BOX_H = 46;
const LOOP_CENTERS = [140, 360, 580]; // 输入 / 更新 / 渲染 的中心 x

// ─── 累积器布局 ──────────────────────────────────────────────────────────────

const ACC_X = 140;
const ACC_Y = 210;
const ACC_W = 440;
const ACC_H = 30;
// dt 阈值刻度：累积器满格代表 32ms，dt=16ms 在中点
const DT_FRAC = 0.5;

// ─── 组件 ────────────────────────────────────────────────────────────────────

export function GppCh09GameLoopTimestep() {
  const loopRef = useRef<SVGGElement | null>(null);
  const updatePulseRef = useRef<SVGRectElement | null>(null);
  const accumRef = useRef<SVGGElement | null>(null);
  const accFillRef = useRef<SVGRectElement | null>(null);
  const fastRef = useRef<SVGGElement | null>(null);
  const slowRef = useRef<SVGGElement | null>(null);
  const gameTimeRef = useRef<SVGGElement | null>(null);
  const conclusionRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① loop（t: 0→T）：循环环淡入，更新框脉冲
      tl.add(loopRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.add(
        updatePulseRef.current!,
        { opacity: [0.25, 0.7, 0.25], duration: T, ease: "inOut(2)" },
        0,
      );
      tl.label("loop", 0);

      // ② accum（t: T→2T）：累积器淡入，填充动画到 dt 阈值
      tl.add(accumRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      tl.add(
        accFillRef.current!,
        { width: [0, ACC_W * DT_FRAC], duration: T * 0.6, ease: "out(3)" },
        T * 1.2,
      );
      tl.label("accum", T);

      // ③ fast（t: 2T→3T）：快机器泳道淡入
      tl.add(fastRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 2);
      tl.label("fast", T * 2);

      // ④ slow（t: 3T→4T）：慢机器泳道淡入
      tl.add(slowRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("slow", T * 3);

      // ⑤ catchup（t: 4T→5T）：游戏时间计数淡入（两者相同）
      tl.add(gameTimeRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 4);
      tl.label("catchup", T * 4);

      // ⑥ constant（t: 5T→6T）：结论横幅淡入
      tl.add(conclusionRef.current!, { opacity: [0, 1], duration: T * 0.7, ease: "out(3)" }, T * 5);
      tl.label("constant", T * 5);
    },
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
          aria-label="游戏循环固定时间步长动画。循环周而复始：处理输入、按固定 dt 更新状态、渲染。累积器吸收帧率波动：frameTime 倒入累积器，攒够一个 dt（16ms）就 update 一次并扣掉 dt。快机器帧间隔 8ms，约每两帧 update 一次；慢机器帧间隔 32ms，一帧 update 两次。两者游戏内时间都按固定 dt 推进，因此游戏速度恒定、与硬件帧率无关。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏循环：固定时间步长让游戏速度独立于帧率
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            累积器吸收帧率波动——update 永远按固定 dt 推进，快慢机器游戏时间一致
          </text>

          {/* 循环环 */}
          <g ref={loopRef} style={{ opacity: 0 }}>
            {["输入", "更新 update(dt)", "渲染"].map((label, i) => {
              const cx = LOOP_CENTERS[i];
              const isUpdate = i === 1;
              return (
                <g key={label}>
                  <rect
                    x={cx - LOOP_BOX_W / 2}
                    y={LOOP_Y - LOOP_BOX_H / 2}
                    width={LOOP_BOX_W}
                    height={LOOP_BOX_H}
                    rx="8"
                    fill={isUpdate ? ACCENT : "var(--text-secondary)"}
                    fillOpacity={isUpdate ? 0.14 : 0.06}
                    stroke={isUpdate ? ACCENT : "var(--border)"}
                    strokeWidth={isUpdate ? 2 : 1.4}
                  />
                  <text
                    x={cx}
                    y={LOOP_Y + 4}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill={isUpdate ? ACCENT : "var(--text-primary)"}
                  >
                    {label}
                  </text>
                </g>
              );
            })}
            {/* 更新框脉冲高亮 */}
            <rect
              ref={updatePulseRef}
              x={LOOP_CENTERS[1] - LOOP_BOX_W / 2}
              y={LOOP_Y - LOOP_BOX_H / 2}
              width={LOOP_BOX_W}
              height={LOOP_BOX_H}
              rx="8"
              fill={ACCENT}
              style={{ opacity: 0.25 }}
            />
            {/* 正向箭头 输入→更新→渲染 */}
            <line x1={LOOP_CENTERS[0] + LOOP_BOX_W / 2 + 4} y1={LOOP_Y - 8} x2={LOOP_CENTERS[1] - LOOP_BOX_W / 2 - 8} y2={LOOP_Y - 8} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#gpp09-arrow)" />
            <line x1={LOOP_CENTERS[1] + LOOP_BOX_W / 2 + 4} y1={LOOP_Y - 8} x2={LOOP_CENTERS[2] - LOOP_BOX_W / 2 - 8} y2={LOOP_Y - 8} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#gpp09-arrow)" />
            {/* 回流箭头 渲染→输入 */}
            <path
              d={`M ${LOOP_CENTERS[2]} ${LOOP_Y + LOOP_BOX_H / 2 + 4} C ${LOOP_CENTERS[2]} ${LOOP_Y + 60}, ${LOOP_CENTERS[0]} ${LOOP_Y + 60}, ${LOOP_CENTERS[0]} ${LOOP_Y + LOOP_BOX_H / 2 + 8}`}
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.6"
              strokeDasharray="4 3"
              markerEnd="url(#gpp09-arrow)"
            />
            <text x={360} y={LOOP_Y + 56} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              每帧循环
            </text>
          </g>

          <defs>
            <marker id="gpp09-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 累积器 */}
          <g ref={accumRef} style={{ opacity: 0 }}>
            <text x={ACC_X} y={ACC_Y - 12} fontSize="11" fontWeight="700" fill="var(--text-secondary)">
              累积器 accumulator —— frameTime 倒入，攒够 dt 就 update
            </text>
            <rect x={ACC_X} y={ACC_Y} width={ACC_W} height={ACC_H} rx="6" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.4" />
            {/* 填充（动画宽度） */}
            <rect ref={accFillRef} x={ACC_X} y={ACC_Y} width={0} height={ACC_H} rx="6" fill={ACCENT} fillOpacity="0.3" />
            {/* dt 阈值刻度（中点 = 16ms） */}
            <line x1={ACC_X + ACC_W * DT_FRAC} y1={ACC_Y - 4} x2={ACC_X + ACC_W * DT_FRAC} y2={ACC_Y + ACC_H + 4} stroke={OK_COLOR} strokeWidth="2" strokeDasharray="3 2" />
            <text x={ACC_X + ACC_W * DT_FRAC} y={ACC_Y + ACC_H + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>
              dt = 16ms（攒满一格 update 一次）
            </text>
            <text x={ACC_X} y={ACC_Y + ACC_H + 18} fontSize="11" fill="var(--text-secondary)">
              0
            </text>
            <text x={ACC_X + ACC_W} y={ACC_Y + ACC_H + 18} textAnchor="end" fontSize="11" fill="var(--text-secondary)">
              32ms
            </text>
          </g>

          {/* 快机器泳道 */}
          <g ref={fastRef} style={{ opacity: 0 }}>
            <text x={ACC_X} y={308} fontSize="11" fontWeight="700" fill={FAST_COLOR}>
              快机器 · frameTime = 8ms（帧密）
            </text>
            {/* 8 个窄帧 tick */}
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={`ff-${i}`} x={ACC_X + i * 28} y={316} width={24} height={20} rx="3" fill={FAST_COLOR} fillOpacity="0.16" stroke={FAST_COLOR} strokeWidth="1" />
            ))}
            {/* update 标记：每 2 帧一次 */}
            {[1, 3, 5, 7].map((i) => (
              <text key={`fu-${i}`} x={ACC_X + i * 28 + 12} y={352} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>
                U
              </text>
            ))}
            <text x={ACC_X + 240} y={352} fontSize="11" fill="var(--text-secondary)">
              约每 2 帧 update 一次
            </text>
          </g>

          {/* 慢机器泳道 */}
          <g ref={slowRef} style={{ opacity: 0 }}>
            <text x={ACC_X} y={384} fontSize="11" fontWeight="700" fill={SLOW_COLOR}>
              慢机器 · frameTime = 32ms（帧疏）
            </text>
            {/* 2 个宽帧 tick */}
            {Array.from({ length: 2 }).map((_, i) => (
              <rect key={`sf-${i}`} x={ACC_X + i * 112} y={392} width={104} height={20} rx="3" fill={SLOW_COLOR} fillOpacity="0.16" stroke={SLOW_COLOR} strokeWidth="1" />
            ))}
            {/* update 标记：每帧 2 次 */}
            {[0, 1].map((i) => (
              <g key={`su-${i}`}>
                <text x={ACC_X + i * 112 + 30} y={428} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>
                  U
                </text>
                <text x={ACC_X + i * 112 + 66} y={428} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>
                  U
                </text>
              </g>
            ))}
            <text x={ACC_X + 240} y={428} fontSize="11" fill="var(--text-secondary)">
              一帧 update 两次
            </text>
          </g>

          {/* 游戏时间计数（两者相同） */}
          <g ref={gameTimeRef} style={{ opacity: 0 }}>
            <rect x={470} y={300} width={180} height={128} rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={560} y={322} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>
              游戏内时间
            </text>
            <text x={560} y={352} textAnchor="middle" fontSize="11" fill={FAST_COLOR}>
              快机器：4 次 update
            </text>
            <text x={560} y={374} textAnchor="middle" fontSize="11" fill={SLOW_COLOR}>
              慢机器：4 次 update
            </text>
            <text x={560} y={404} textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)">
              都 = 4 × dt
            </text>
          </g>

          {/* 结论横幅 */}
          <g ref={conclusionRef} style={{ opacity: 0 }}>
            <rect x={ACC_X} y={452} width={ACC_W + 130} height={30} rx="8" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="1.6" />
            <text x={ACC_X + (ACC_W + 130) / 2} y={471} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              游戏速度恒定：update 按固定 dt 推进，与帧率高低无关
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="累积器把 frameTime 攒成固定 dt 的 update：快机器少 update、慢机器多 update，游戏内时间却始终一致。代价：需与平台事件循环协调、注意功耗与死亡螺旋。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏循环（Game Loop）：把游戏运行解耦为"输入 → 按固定 dt 更新 → 渲染"的持续循环。
        累积器吸收帧率波动——frameTime 倒入累积器，每攒够一个 dt 就 update(dt) 一次。
        于是游戏内时间按固定步长推进，快慢机器表现一致，游戏速度独立于硬件帧率。
      </figcaption>
    </figure>
  );
}
