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

const ACCENT = "#E5A54B"; // amber
const STEPS: readonly TeachingStep[] = [
  { label: "scatter", caption: "① 分散存储：每个实体带全部属性，遍历跳跃访问" },
  { label: "cache", caption: "② 缓存未命中：内存带宽吃紧，CPU 空等" },
  { label: "contig", caption: "③ 连续数组：按列分离，遍历顺序访问" },
  { label: "fast", caption: "④ 预取命中：吞吐量提升数倍" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

export function GppDataLocalityLab() {
  const scatterRef = useRef<SVGGElement>(null);
  const cacheRef = useRef<SVGGElement>(null);
  const contigRef = useRef<SVGGElement>(null);
  const fastRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(scatterRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("scatter", 0);
      tl.add(cacheRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("cache", T);
      tl.add(contigRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("contig", T * 2);
      tl.add(fastRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("fast", T * 3);
    },
  });
  const mem = ["pos", "hp", "sprite", "pos", "hp", "sprite", "pos", "hp"];
  const ents = ["E1", "E2", "E3", "E4", "E5", "E6"];
  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Optimization Pattern · Data Locality</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Data Locality — 让数据排列贴近访问方式</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Data Locality 模式定制图解：分散存储缓存未命中 vs 连续数组顺序访问。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>缓存友好性：游戏性能的隐形引擎</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>数据怎么排，决定遍历多快</text>

          <g ref={scatterRef} style={{ opacity: 0 }}>
            <text x={70} y={86} fontSize={11} fontWeight={600} fill={WARN}>✗ 分散存储（每实体一块，含全部属性）</text>
            <rect x={60} y={96} width={780} height={56} rx={8} fill="var(--bg)" stroke={LINE} strokeWidth={1} />
            {mem.map((m, i) => (
              <g key={i}>
                <rect x={68 + i * 96} y={104} width={88} height={40} rx={5} fill={WARN} opacity={0.12} stroke={WARN} strokeWidth={1} />
                <text x={112 + i * 96} y={129} textAnchor="middle" fontSize={11} fill={WARN}>{m}</text>
              </g>
            ))}
          </g>

          <g ref={cacheRef} style={{ opacity: 0 }}>
            <rect x={60} y={166} width={780} height={38} rx={8} fill={WARN} opacity={0.1} stroke={WARN} strokeWidth={1.2} />
            <text x={450} y={190} textAnchor="middle" fontSize={11} fontWeight={600} fill={WARN}>遍历只取 pos → 每步跳过 2 块 → 缓存几乎全未命中</text>
          </g>

          <g ref={contigRef} style={{ opacity: 0 }}>
            <text x={70} y={246} fontSize={11} fontWeight={600} fill={OK}>✓ 连续数组（pos 单独一块）</text>
            <rect x={60} y={256} width={780} height={44} rx={8} fill="var(--bg)" stroke={LINE} strokeWidth={1} />
            {ents.map((e, i) => (
              <g key={e}>
                <rect x={68 + i * 126} y={262} width={118} height={32} rx={5} fill={OK} opacity={0.12} stroke={OK} strokeWidth={1} />
                <text x={127 + i * 126} y={283} textAnchor="middle" fontSize={11} fill={OK}>{e}.pos</text>
              </g>
            ))}
          </g>

          <g ref={fastRef} style={{ opacity: 0 }}>
            <rect x={60} y={314} width={780} height={38} rx={8} fill={OK} opacity={0.1} stroke={OK} strokeWidth={1.2} />
            <text x={450} y={338} textAnchor="middle" fontSize={11} fontWeight={600} fill={OK}>顺序扫描一块连续内存 → 硬件预取生效 → 吞吐量提升数倍</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="同属性排成连续数组，遍历变顺序访问——缓存友好，性能翻倍。" />
      </div>
    </div>
  );
}
