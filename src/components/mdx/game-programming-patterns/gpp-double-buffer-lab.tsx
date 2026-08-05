"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

/**
 * <GppDoubleBufferLab> —— Ch08 Double Buffer 模式定制图解。
 * 视觉隐喻「读写双栏 + swap 闸门」：Buffer A 写 / Buffer B 读，中间 swap
 * 闸门指示交换方向；底部四阶段流程。单 accent（emerald）+ 中性底，无 emoji。
 */

const T = TEACHING_BEAT_MS;
const ACCENT = "#3FB97F"; // emerald
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const WARN = "#E5B567";

const STEPS: readonly TeachingStep[] = [
  { label: "write", caption: "① Buffer A 写入新帧（后台缓冲，读者看不到写到一半）" },
  { label: "read", caption: "② Buffer B 供读取：显示完整上一帧" },
  { label: "swap", caption: "③ swap()：一次性交换角色，读者看到完整新帧" },
  { label: "cycle", caption: "④ 四步循环：写入 → 交换 → 读取 → 重复" },
  { label: "tear", caption: "⑤ 单缓冲的撕裂：写到一半被读取 → 必须双缓冲" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

const VW = 900;
const VH = 420;

export function GppDoubleBufferLab() {
  const writeRef = useRef<SVGGElement>(null);
  const readRef = useRef<SVGGElement>(null);
  const swapRef = useRef<SVGGElement>(null);
  const cycleRef = useRef<SVGGElement>(null);
  const tearRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(writeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("write", 0);
      tl.add(readRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("read", T);
      tl.add(swapRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("swap", T * 2);
      tl.add(cycleRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("cycle", T * 3);
      tl.add(tearRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("tear", T * 4);
    },
  });

  const cells = [0, 1, 2, 3, 4, 5];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Sequencing Pattern · Double Buffer</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Double Buffer — 写完一整帧，再让读者看见</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Double Buffer 模式定制图解：写缓冲与读缓冲双栏，中间 swap 闸门，底部四阶段流程与单缓冲撕裂反例。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>写的那块读者看不见，读者看的那块没人写</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>读写隔离 + 一次性交换 = 读者永远看到完整状态</text>

          {/* Buffer A（写） */}
          <g ref={writeRef} style={{ opacity: 0 }}>
            <rect x={110} y={90} width={260} height={150} rx={12} fill="var(--bg)" stroke={ACCENT} strokeWidth={2} />
            <text x={240} y={120} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT}>Buffer A · 后台缓冲</text>
            <line x1={120} y1={130} x2={360} y2={130} stroke={LINE} strokeWidth={1} />
            {cells.map(i => <rect key={`w${i}`} x={120+i*40} y={142} width={36} height={40} rx={5} fill={ACCENT} opacity={0.25} />)}
            <text x={240} y={212} textAnchor="middle" fontSize={11} fill={MUTE}>写入中（写一半读者也看不见）</text>
          </g>

          {/* swap 闸门 */}
          <g ref={swapRef} style={{ opacity: 0 }}>
            <rect x={400} y={130} width={100} height={70} rx={10} fill={WARN} opacity={0.12} stroke={WARN} strokeWidth={1.8} />
            <text x={450} y={158} textAnchor="middle" fontSize={12} fontWeight={700} fill={WARN}>swap()</text>
            <text x={450} y={180} textAnchor="middle" fontSize={11} fill={MUTE}>角色互换</text>
          </g>

          {/* Buffer B（读） */}
          <g ref={readRef} style={{ opacity: 0 }}>
            <rect x={530} y={90} width={260} height={150} rx={12} fill="var(--bg)" stroke={LINE} strokeWidth={1.8} />
            <text x={660} y={120} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>Buffer B · 显示缓冲</text>
            <line x1={540} y1={130} x2={780} y2={130} stroke={LINE} strokeWidth={1} />
            {cells.map(i => <rect key={`r${i}`} x={540+i*40} y={142} width={36} height={40} rx={5} fill={INK} opacity={0.12} />)}
            <text x={660} y={212} textAnchor="middle" fontSize={11} fill={MUTE}>读者显示（完整上一帧）</text>
          </g>

          {/* 四阶段流程 */}
          <g ref={cycleRef} style={{ opacity: 0 }}>
            <rect x={110} y={270} width={680} height={52} rx={10} fill="var(--bg)" stroke={LINE} strokeWidth={1.2} />
            {["1. 写入 A", "2. swap()", "3. 读取 B", "4. 重复"].map((l, i) => (
              <g key={l}>
                <rect x={122+i*170} y={280} width={156} height={32} rx={7} fill={ACCENT} opacity={0.1} stroke={ACCENT} strokeWidth={1.2} />
                <text x={200+i*170} y={301} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK}>{l}</text>
                {i < 3 && <text x={286+i*170} y={299} textAnchor="middle" fontSize={13} fill={LINE}>→</text>}
              </g>
            ))}
          </g>

          {/* 撕裂反例 */}
          <g ref={tearRef} style={{ opacity: 0 }}>
            <rect x={110} y={340} width={680} height={44} rx={10} fill="#E5675C" opacity={0.08} stroke="#E5675C" strokeWidth={1.3} />
            <text x={450} y={367} textAnchor="middle" fontSize={11} fontWeight={700} fill="#E5675C">单缓冲撕裂：写入进行到一半被读取 → 画面上下两帧错位。双缓冲让读写永不互扰</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="两块缓冲轮换角色：写方永远写无人看的那块，读者永远读无人写的那块。" />
      </div>
    </div>
  );
}