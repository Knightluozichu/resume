"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh12SubclassSandboxFailure>：子类沙箱模式反例复位动画（GPP 第12章 · 图3）。
 *
 * 故事：Sparkle 应该通过 Particle 沙箱调用 playSound()。
 *  ① 正常：Sparkle → Particle（沙箱）→ AudioEngine，隔离完好
 *  ② 反例：Sparkle 绕过沙箱，直接 #include <AudioEngine.h> 调用底层
 *  ③ 反例结果：沙箱被绕过，耦合重新蔓延 ✗
 *  ④ 复位：引擎指针 private、沙箱方法 protected、代码审查禁止 include 引擎头文件
 *  ⑤ 复位结果：子类无法绕过沙箱 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：Sparkle → Particle（沙箱）→ AudioEngine，隔离完好" },
  { label: "bypass", caption: "反例：Sparkle 绕过沙箱，直接 #include <AudioEngine.h> 调用底层" },
  { label: "coupled", caption: "反例结果：沙箱被绕过，耦合重新蔓延，一个破口全废 ✗" },
  { label: "reset", caption: "复位：引擎指针 private、沙箱方法 protected、代码审查禁止 include 引擎头文件" },
  { label: "sealed", caption: "复位结果：子类无法绕过沙箱，隔离恢复 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh12SubclassSandboxFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const normalPathRef = useRef<SVGGElement | null>(null);
  const bypassPathRef = useRef<SVGGElement | null>(null);
  const resetNoteRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：Sparkle + Particle + AudioEngine + 正常路径
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(normalPathRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② bypass（t: T→2T）：绕过路径（红虚线）出现
      tl.add(bypassPathRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.label("bypass", T);

      // ③ coupled（t: 2T→3T）：判定✗
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.label("coupled", T * 2);

      // ④ reset（t: 3T→4T）：绕过路径淡出，复位说明（绿）出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(bypassPathRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.1);
      tl.add(resetNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.3);
      tl.label("reset", T * 3);

      // ⑤ sealed（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("sealed", T * 4);
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
          aria-label="子类沙箱模式反例复位动画。正常时 Sparkle 通过 Particle 沙箱调用 AudioEngine 隔离完好。反例是 Sparkle 绕过沙箱直接 include AudioEngine 头文件调用底层，沙箱被绕过耦合重新蔓延。复位是引擎指针 private 沙箱方法 protected 代码审查禁止 include 引擎头文件，子类无法绕过沙箱隔离恢复。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：子类绕过沙箱直碰引擎 → 耦合蔓延
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            沙箱 = 子类与引擎之间的防火墙；一个破口就全废
          </text>

          {/* 场景：Sparkle + Particle + AudioEngine */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <rect x="80" y="80" width="120" height="40" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="140" y="105" textAnchor="middle" fontSize="12" fill="var(--text-primary)">Sparkle</text>

            <rect x="290" y="80" width="160" height="40" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="2" />
            <text x="370" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>Particle（沙箱）</text>

            <rect x="530" y="80" width="130" height="40" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="595" y="105" textAnchor="middle" fontSize="12" fill="var(--text-primary)">AudioEngine</text>
          </g>

          {/* 正常路径：Sparkle → Particle → AudioEngine */}
          <g ref={normalPathRef} style={{ opacity: 0 }}>
            <line x1="200" y1="100" x2="290" y2="100" stroke={OK_COLOR} strokeWidth="2" />
            <text x="245" y="92" textAnchor="middle" fontSize="11" fill={OK_COLOR}>playSound()</text>
            <line x1="450" y1="100" x2="530" y2="100" stroke={OK_COLOR} strokeWidth="1.5" opacity="0.7" />
          </g>

          {/* 绕过路径（红虚线） */}
          <g ref={bypassPathRef} style={{ opacity: 0 }}>
            <path d="M 140 120 Q 140 200 595 120" fill="none" stroke={FAIL_COLOR} strokeWidth="2.5" strokeDasharray="6 3" />
            <text x="360" y="185" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>
              #include &lt;AudioEngine.h&gt; → 直接调用!
            </text>
            <text x="360" y="205" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>沙箱被绕过，耦合重新蔓延</text>
          </g>

          {/* 复位说明（绿） */}
          <g ref={resetNoteRef} style={{ opacity: 0 }}>
            <rect x="120" y="160" width="480" height="100" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="136" y="186" fontSize="11" fontWeight="700" fill={OK_COLOR}>复位：强制沙箱隔离</text>
            <text x="136" y="210" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">① 引擎指针设为 private，子类拿不到</text>
            <text x="136" y="230" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">② 沙箱方法设为 protected，子类只能用这些</text>
            <text x="136" y="250" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">③ 代码审查：子类不允许 #include 引擎头文件</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="300" width="560" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="96" y="327" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 子类绕过沙箱直碰引擎 → 隔离失效，耦合蔓延</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="300" width="560" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="96" y="327" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 引擎 private + 沙箱 protected → 子类无法绕过</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="80" y="356" width="560" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="96" y="379" fontSize="11" fontWeight="700" fill={OK_COLOR}>沙箱的价值 = 所有子类都遵守；用访问控制从结构上杜绝绕过</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：子类绕过沙箱直碰引擎，隔离失效、耦合蔓延。复位：引擎 private、沙箱 protected，子类无法绕过。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：子类绕过沙箱直接调用引擎 API，隔离失效、耦合蔓延；引擎指针 private、沙箱方法 protected、代码审查禁止子类 include 引擎头文件。
      </figcaption>
    </figure>
  );
}
