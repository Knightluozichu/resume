"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh11BytecodeFailure>：字节码模式反例复位动画（GPP 第11章 · 图3）。
 *
 * 故事：虚拟机解释执行字节码。
 *  ① 正常：合法字节码 [LITERAL 3, LITERAL 5, ADD, SET_HEALTH]，栈 [3,5,8]
 *  ② 反例：注入畸形字节码 [LITERAL 3, POP, POP, UNKNOWN_OP]
 *  ③ 反例结果：POP 空栈 → 栈下溢，UNKNOWN_OP 不在白名单 → VM 崩溃 ✗
 *  ④ 复位：加边界检查（栈深 ≥1 才 POP、操作码白名单、执行预算）
 *  ⑤ 复位结果：错误被捕获，VM 安全停机，不崩溃 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：合法字节码 [LITERAL 3, LITERAL 5, ADD, SET_HEALTH]，栈 [3, 5, 8]" },
  { label: "inject", caption: "反例：注入畸形字节码 [LITERAL 3, POP, POP, UNKNOWN_OP]" },
  { label: "crash", caption: "反例结果：POP 空栈 → 栈下溢，UNKNOWN_OP 不在白名单 → VM 崩溃 ✗" },
  { label: "guard", caption: "复位：加边界检查——栈深 ≥1 才 POP、操作码在白名单内才执行、执行有预算" },
  { label: "safe", caption: "复位结果：错误被捕获，VM 安全停机，不崩溃 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh11BytecodeFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const normalProgRef = useRef<SVGGElement | null>(null);
  const brokenProgRef = useRef<SVGGElement | null>(null);
  const stackNormalRef = useRef<SVGGElement | null>(null);
  const crashRef = useRef<SVGGElement | null>(null);
  const guardRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：合法程序 + 栈 [3,5,8]
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(normalProgRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.3);
      tl.add(stackNormalRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② inject（t: T→2T）：合法程序淡出，畸形程序（红）出现
      tl.add(normalProgRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(stackNormalRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(brokenProgRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("inject", T);

      // ③ crash（t: 2T→3T）：崩溃提示（栈下溢 + 未知操作码）+ 判定✗
      tl.add(crashRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.label("crash", T * 2);

      // ④ guard（t: 3T→4T）：崩溃/坏判定淡出，防护说明（绿）出现
      tl.add(crashRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(guardRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.label("guard", T * 3);

      // ⑤ safe（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("safe", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧪</span>
            反例与复位
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="字节码模式反例复位动画。虚拟机解释执行字节码。正常时合法字节码 LITERAL 3 LITERAL 5 ADD SET_HEALTH 栈为 3 5 8。反例注入畸形字节码 LITERAL 3 POP POP UNKNOWN_OP，POP 空栈栈下溢，UNKNOWN_OP 不在白名单，VM 崩溃。复位加边界检查栈深大于等于 1 才 POP 操作码在白名单内才执行执行有预算，错误被捕获 VM 安全停机不崩溃。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：畸形字节码 → 栈下溢 / 未知操作码 → VM 崩溃
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            栈式 VM 逐条解释，边界检查守住不变量
          </text>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">指令序列</text>
          </g>

          {/* 合法程序 */}
          <g ref={normalProgRef} style={{ opacity: 0 }}>
            {["LITERAL 3", "LITERAL 5", "ADD", "SET_HEALTH"].map((inst, i) => (
              <g key={i}>
                <rect x={60 + i * 155} y="96" width="140" height="32" rx="6" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.2" />
                <text x={130 + i * 155} y="117" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{inst}</text>
              </g>
            ))}
          </g>

          {/* 畸形程序（红） */}
          <g ref={brokenProgRef} style={{ opacity: 0 }}>
            {["LITERAL 3", "POP", "POP", "UNKNOWN_OP"].map((inst, i) => {
              const isBad = inst === "POP" && i === 2 || inst === "UNKNOWN_OP";
              return (
                <g key={i}>
                  <rect x={60 + i * 155} y="96" width="140" height="32" rx="6" fill={FAIL_COLOR} fillOpacity={isBad ? 0.15 : 0.06} stroke={FAIL_COLOR} strokeWidth={isBad ? 2 : 1.2} />
                  <text x={130 + i * 155} y="117" textAnchor="middle" fontSize="11" fontFamily="monospace" fill={isBad ? FAIL_COLOR : "var(--text-primary)"}>{inst}</text>
                </g>
              );
            })}
          </g>

          {/* 正常栈 [3,5,8] */}
          <g ref={stackNormalRef} style={{ opacity: 0 }}>
            <text x="60" y="160" fontSize="11" fontWeight="700" fill="var(--text-secondary)">栈状态</text>
            <rect x="60" y="170" width="200" height="110" rx="8" fill="transparent" stroke="var(--border)" strokeWidth="1.5" />
            {[3, 5, 8].map((v, i) => (
              <g key={i}>
                <rect x="80" y={244 - i * 30} width="160" height="26" rx="4" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1" />
                <text x="160" y={261 - i * 30} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{v}</text>
              </g>
            ))}
          </g>

          {/* 崩溃提示 */}
          <g ref={crashRef} style={{ opacity: 0 }}>
            <rect x="60" y="170" width="200" height="110" rx="8" fill={FAIL_COLOR} fillOpacity="0.06" stroke={FAIL_COLOR} strokeWidth="1.5" />
            <text x="160" y="210" textAnchor="middle" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>⚠ POP → 栈空!</text>
            <text x="160" y="234" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>💥 VM 崩溃</text>
            <text x="160" y="258" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>UNKNOWN_OP 未知</text>
          </g>

          {/* 防护说明（绿） */}
          <g ref={guardRef} style={{ opacity: 0 }}>
            <rect x="320" y="170" width="340" height="110" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="336" y="194" fontSize="11" fontWeight="700" fill={OK_COLOR}>复位：边界检查防护</text>
            <text x="336" y="216" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">POP 前：assert(stack.size ≥ 1)</text>
            <text x="336" y="236" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">执行前：assert(op ∈ 白名单)</text>
            <text x="336" y="256" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">循环上限：assert(steps ≤ 预算)</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="76" y="327" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 畸形字节码：栈下溢 + 未知操作码 → VM 崩溃</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="76" y="327" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 边界检查捕获错误 → VM 安全停机，不崩溃</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="356" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="379" fontSize="11" fontWeight="700" fill={OK_COLOR}>不变量：任意输入都不能越过指令、栈和资源预算</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：畸形字节码（POP 空栈、未知操作码）让无防护的 VM 崩溃。复位：加边界检查，错误被捕获，VM 安全停机。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：畸形字节码（POP 空栈、未知操作码）让无防护的 VM 崩溃；加边界检查（栈深、操作码白名单、执行预算），错误被捕获，VM 安全停机。
      </figcaption>
    </figure>
  );
}
