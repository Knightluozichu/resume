"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import { useTeachingTimeline, type TeachingStep } from "../anim/use-teaching-timeline";

/**
 * <GppBytecodeLab> —— Ch11 Bytecode 模式定制图解。
 * 视觉隐喻「指令流水线」：法术脚本 → 编译为字节码指令流 → 栈式虚拟机逐条
 * 取指执行，行为由指令组合而成。单 accent（violet）+ 中性底，无 emoji。
 */

const T = TEACHING_BEAT_MS;
const ACCENT = "#9B7BE8"; // violet
const MUTE = "var(--text-secondary)";
const INK = "var(--text-primary)";
const LINE = "var(--border)";
const OK = "#3FB97F";

const STEPS: readonly TeachingStep[] = [
  { label: "script", caption: "① 法术脚本：数据驱动的行为描述（health=25, speed×1.5, fire）" },
  { label: "compile", caption: "② 编译：脚本被转成字节码指令流（LITERAL/SET/ADD...）" },
  { label: "stack", caption: "③ 栈式 VM：指令操作栈顶值——行为 = 指令组合" },
  { label: "run", caption: "④ 逐条取指执行：VM 解释器 while 循环推进指令指针" },
  { label: "benefit", caption: "⑤ 收益：改技能=改数据不改引擎，内容与代码彻底分离" },
];
const LABEL: Record<string, string> = Object.fromEntries(STEPS.map((s) => [s.label, s.caption ?? s.label]));

const VW = 900;
const VH = 420;

export function GppBytecodeLab() {
  const scriptRef = useRef<SVGGElement>(null);
  const compileRef = useRef<SVGGElement>(null);
  const stackRef = useRef<SVGGElement>(null);
  const runRef = useRef<SVGGElement>(null);
  const benefitRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(scriptRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("script", 0);
      tl.add(compileRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("compile", T);
      tl.add(stackRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("stack", T * 2);
      tl.add(runRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("run", T * 3);
      tl.add(benefitRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("benefit", T * 4);
    },
  });

  const instrs = [
    { ip: 0, op: "LITERAL 25", note: "压栈 25" },
    { ip: 1, op: "SET_HEALTH", note: "栈顶→health" },
    { ip: 2, op: "LITERAL 1.5", note: "压栈 1.5" },
    { ip: 3, op: "MUL_SPEED", note: "speed×1.5" },
    { ip: 4, op: "CALL fire", note: "调用施法" },
  ];

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: MUTE }}>Behavioral Pattern · Bytecode</span>
            <h4 className="mt-1 text-[15px] font-semibold" style={{ color: INK }}>Bytecode — 把行为变成虚拟机读得懂的指令</h4>
          </div>
          <span className="rounded-control border px-2 py-1 text-[11px]" style={{ color: ACCENT, borderColor: ACCENT }}>▷ 可交互</span>
        </div>
      </div>
      <div className="p-5">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" role="img" aria-label="Bytecode 模式定制图解：法术脚本编译为字节码指令流，栈式虚拟机逐条执行，行为由指令组合而成。可播放、暂停、单步、拖动进度。">
          <text x={VW/2} y={30} textAnchor="middle" fontSize={13} fontWeight={600} fill={INK}>技能是数据，引擎是解释器——加技能不再改引擎代码</text>
          <text x={VW/2} y={50} textAnchor="middle" fontSize={11} fill={MUTE}>脚本 → 字节码 → 栈式 VM 逐条解释</text>

          {/* 脚本 */}
          <g ref={scriptRef} style={{ opacity: 0 }}>
            <rect x={50} y={80} width={210} height={150} rx={10} fill="var(--bg)" stroke={ACCENT} strokeWidth={1.5} />
            <text x={155} y={106} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT}>法术脚本</text>
            <text x={66} y={140} fontSize={11} fontFamily="var(--font-mono)" fill={INK}>health = 25</text>
            <text x={66} y={164} fontSize={11} fontFamily="var(--font-mono)" fill={INK}>speed *= 1.5</text>
            <text x={66} y={188} fontSize={11} fontFamily="var(--font-mono)" fill={INK}>cast "fire"</text>
            <text x={155} y={216} textAnchor="middle" fontSize={11} fill={MUTE}>策划可编辑的数据</text>
          </g>

          {/* 编译箭头 */}
          <g ref={compileRef} style={{ opacity: 0 }}>
            <text x={330} y={130} textAnchor="middle" fontSize={16} fill={ACCENT}>⟶</text>
            <text x={330} y={152} textAnchor="middle" fontSize={11} fill={MUTE}>编译</text>
            {/* 指令流 */}
            <rect x={400} y={80} width={200} height={150} rx={10} fill="var(--bg)" stroke={LINE} strokeWidth={1.5} />
            <text x={500} y={106} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>字节码指令流</text>
            <line x1={410} y1={116} x2={590} y2={116} stroke={LINE} strokeWidth={1} />
            {instrs.map((ins) => (
              <text key={ins.ip} x={412} y={138 + ins.ip * 22} fontSize={11} fontFamily="var(--font-mono)" fill={MUTE}>
                {ins.ip}. {ins.op}
              </text>
            ))}
          </g>

          {/* 栈式 VM */}
          <g ref={stackRef} style={{ opacity: 0 }}>
            <rect x={660} y={80} width={190} height={70} rx={10} fill="var(--bg)" stroke={ACCENT} strokeWidth={1.5} />
            <text x={755} y={106} textAnchor="middle" fontSize={12} fontWeight={700} fill={ACCENT}>栈式 VM</text>
            <text x={755} y={128} textAnchor="middle" fontSize={11} fill={MUTE}>操作数栈</text>
            <rect x={700} y={140} width={110} height={42} rx={6} fill={ACCENT} opacity={0.1} stroke={ACCENT} strokeWidth={1} />
            <text x={755} y={166} textAnchor="middle" fontSize={11} fill={INK}>LITERAL 25 → 压栈</text>
          </g>

          {/* 执行 */}
          <g ref={runRef} style={{ opacity: 0 }}>
            <rect x={660} y={170} width={190} height={70} rx={10} fill="var(--bg)" stroke={LINE} strokeWidth={1.5} />
            <text x={755} y={196} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>解释器循环</text>
            <text x={755} y={218} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill={MUTE}>while (ip &lt; code.len)</text>
            <text x={755} y={234} textAnchor="middle" fontSize={11} fill={OK}>逐条取指 → 执行 → ip++</text>
          </g>

          {/* 收益 */}
          <g ref={benefitRef} style={{ opacity: 0 }}>
            <rect x={50} y={270} width={800} height={54} rx={10} fill={OK} opacity={0.08} stroke={OK} strokeWidth={1.4} />
            <text x={450} y={294} textAnchor="middle" fontSize={11} fontWeight={700} fill={OK}>改技能 = 改数据脚本，无需重编译引擎</text>
            <text x={450} y={314} textAnchor="middle" fontSize={11} fill={MUTE}>内容创作者（策划）与引擎程序员彻底分离——内容管线成为独立产品</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL} caption="行为被编码成指令序列，VM 只负责解释——数据驱动的内容与稳定的引擎各走各道。" />
      </div>
    </div>
  );
}