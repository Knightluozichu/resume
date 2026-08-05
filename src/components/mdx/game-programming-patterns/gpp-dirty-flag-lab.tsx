"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

const T = TEACHING_BEAT_MS;
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";
const WARN = "#E5675C";
const VW = 900;
const VH = 420;

const ACCENT = "#E56A7A"; // deep rose
const STEPS: readonly TeachingStep[] = [
  { label: "change", caption: "① 状态变化：位置/朝向改变 → 置脏标志" },
  { label: "ask-clean", caption: "② 询问时未脏：直接返回缓存结果，零重算" },
  { label: "ask-dirty", caption: "③ 询问时已脏：重算派生结果并清标志" },
  { label: "benefit", caption: "④ 收益：每帧多数询问不重算，算力大幅节省" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppDirtyFlagLab() {
  const changeRef = useRef<SVGGElement>(null);
  const cleanRef = useRef<SVGGElement>(null);
  const dirtyRef = useRef<SVGGElement>(null);
  const benefitRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(changeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("change", 0);
      tl.add(cleanRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("ask-clean", T);
      tl.add(dirtyRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("ask-dirty", T * 2);
      tl.add(benefitRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("benefit", T * 3);
    },
  });
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Optimization Pattern · Dirty Flag</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Dirty Flag — 变了才重算</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Dirty Flag 模式定制图解：状态变化置脏标志，询问时未脏返回缓存、已脏才重算。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>主数据变化时标脏，派生结果只在被读取前才重算</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>渲染器每帧问"需要重算吗？"——绝大多数帧答案是否</text>

          <g ref={changeRef} style={{ opacity: 0 }}>
            <rect x={60} y={80} width={300} height={90} rx={10} fill="var(--bg)" stroke={WARN} strokeWidth={1.5} />
            <text x={210} y={108} textAnchor="middle" fontSize={12} fontWeight={600} fill={WARN}>Transform（主数据）</text>
            <text x={210} y={134} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill={INK}>pos=(10,20) rot=45°</text>
            <text x={210} y={156} textAnchor="middle" fontSize={11} fill={MUTE}>setPosition() 改变 → 置脏</text>
          </g>

          <g ref={dirtyRef} style={{ opacity: 0 }}>
            <text x={430} y={120} textAnchor="middle" fontSize={16} fill={WARN}>⟶</text>
            <rect x={500} y={80} width={300} height={90} rx={10} fill={WARN} opacity={0.1} stroke={WARN} strokeWidth={2} />
            <text x={650} y={110} textAnchor="middle" fontSize={12} fontWeight={700} fill={WARN}>dirty = true ⚑</text>
            <text x={650} y={134} textAnchor="middle" fontSize={11} fill={MUTE}>本地矩阵失效，等待重算</text>
            <text x={650} y={156} textAnchor="middle" fontSize={11} fill={MUTE}>（不立刻算，等被读取）</text>
          </g>

          <g ref={cleanRef} style={{ opacity: 0 }}>
            <rect x={60} y={210} width={360} height={80} rx={10} fill={OK} opacity={0.1} stroke={OK} strokeWidth={1.8} />
            <text x={240} y={238} textAnchor="middle" fontSize={12} fontWeight={700} fill={OK}>getLocalMatrix()：未变脏</text>
            <text x={240} y={262} textAnchor="middle" fontSize={11} fill={MUTE}>直接返回缓存矩阵 ✓ 零开销</text>
            <text x={240} y={282} textAnchor="middle" fontSize={11} fill={MUTE}>渲染器每帧询问都不重算</text>
          </g>

          <g ref={dirtyRef} style={{ opacity: 0 }}>
            <rect x={460} y={210} width={400} height={80} rx={10} fill={WARN} opacity={0.1} stroke={WARN} strokeWidth={1.8} />
            <text x={660} y={238} textAnchor="middle" fontSize={12} fontWeight={700} fill={WARN}>getLocalMatrix()：已变脏</text>
            <text x={660} y={262} textAnchor="middle" fontSize={11} fill={MUTE}>重算矩阵 → 清 dirty 标志</text>
            <text x={660} y={282} textAnchor="middle" fontSize={11} fill={MUTE}>只在真正需要时才花算力</text>
          </g>

          <g ref={benefitRef} style={{ opacity: 0 }}>
            <rect x={60} y={320} width={800} height={44} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.2} />
            <text x={460} y={346} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>层级渲染中多数节点未变化 → 只重算脏节点，全局矩阵链大幅提速</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="缓存 + 脏标志：算一次、用多次；变了才重算——把重复计算从 O(N) 降到 O(变化数)。" />
      </div>
    </div>
  );
}
