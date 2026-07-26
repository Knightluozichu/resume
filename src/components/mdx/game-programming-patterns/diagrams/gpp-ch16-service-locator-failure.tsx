"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh16ServiceLocatorFailure>：服务定位器模式反例复位动画（GPP 第16章 · 图3）。
 *
 * 故事：GameLogic → Locator → 音频服务。
 *  ① 正常：服务已注册，查找返回 AudioImpl，正常播放
 *  ② 反例：服务未注册就查找
 *  ③ 反例结果：返回 nullptr → 调用 playSound() → 段错误崩溃 ✗
 *  ④ 复位：Null Object 兜底——未注册返回 NullAudio（静默）
 *  ⑤ 复位结果：安全降级，不崩溃 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：服务已注册，查找返回 AudioImpl，正常播放" },
  { label: "unregistered", caption: "反例：服务未注册就查找" },
  { label: "crash", caption: "反例结果：返回 nullptr → 调用 playSound() → 段错误崩溃 ✗" },
  { label: "nullobject", caption: "复位：Null Object 兜底——未注册返回 NullAudio（playSound() 什么都不做）" },
  { label: "safe", caption: "复位结果：安全降级，不崩溃 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh16ServiceLocatorFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const serviceNormalRef = useRef<SVGGElement | null>(null);
  const serviceNullRef = useRef<SVGGElement | null>(null);
  const serviceNullObjRef = useRef<SVGGElement | null>(null);
  const resetNoteRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：查找流程 + 已注册服务
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(serviceNormalRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② unregistered（t: T→2T）：已注册服务淡出，nullptr（红）出现
      tl.add(serviceNormalRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(serviceNullRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("unregistered", T);

      // ③ crash（t: 2T→3T）：判定✗（段错误）
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.label("crash", T * 2);

      // ④ nullobject（t: 3T→4T）：nullptr/坏判定淡出，Null Object 说明 + NullAudio（绿）出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(serviceNullRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(resetNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.add(serviceNullObjRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.4);
      tl.label("nullobject", T * 3);

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
          aria-label="服务定位器模式反例复位动画。GameLogic 通过 Locator 查找音频服务。正常时服务已注册查找返回 AudioImpl 正常播放。反例是服务未注册就查找，返回 nullptr 调用 playSound 段错误崩溃。复位是 Null Object 兜底未注册返回 NullAudio playSound 什么都不做，安全降级不崩溃。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：服务未注册就查找 → nullptr → 崩溃
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            定位器需要防护：未注册时不崩溃
          </text>

          {/* 场景：查找流程 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <rect x="80" y="80" width="140" height="44" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
            <text x="150" y="107" textAnchor="middle" fontSize="12" fill="var(--text-primary)">GameLogic</text>
            <line x1="220" y1="102" x2="310" y2="102" stroke="var(--border)" strokeWidth="1.5" />
            <rect x="310" y="80" width="120" height="44" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="370" y="107" textAnchor="middle" fontSize="11" fontWeight="600" fill={OK_COLOR}>Locator</text>
            <line x1="430" y1="102" x2="520" y2="102" stroke="var(--border)" strokeWidth="1.5" />
          </g>

          {/* 已注册服务（正常） */}
          <g ref={serviceNormalRef} style={{ opacity: 0 }}>
            <rect x="520" y="80" width="140" height="44" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="590" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">AudioImpl</text>
            <text x="590" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">正常播放</text>
          </g>

          {/* nullptr（红） */}
          <g ref={serviceNullRef} style={{ opacity: 0 }}>
            <rect x="520" y="80" width="140" height="44" rx="8" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.5" />
            <text x="590" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill={FAIL_COLOR}>nullptr!</text>
            <text x="590" y="116" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>💥 段错误</text>
          </g>

          {/* NullAudio（绿） */}
          <g ref={serviceNullObjRef} style={{ opacity: 0 }}>
            <rect x="520" y="80" width="140" height="44" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="590" y="100" textAnchor="middle" fontSize="11" fontWeight="600" fill={OK_COLOR}>NullAudio</text>
            <text x="590" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">静默（安全）</text>
          </g>

          {/* 复位说明（绿） */}
          <g ref={resetNoteRef} style={{ opacity: 0 }}>
            <rect x="80" y="160" width="560" height="80" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="96" y="186" fontSize="11" fontWeight="700" fill={OK_COLOR}>复位：Null Object 模式</text>
            <text x="96" y="208" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">① 未注册 → 返回 NullAudio（playSound() 什么都不做）</text>
            <text x="96" y="228" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">② Debug 模式：assert(registered) → 开发期早暴露</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="280" width="560" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="96" y="307" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 未注册 → nullptr → 调用者段错误崩溃</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="280" width="560" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="96" y="307" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ Null Object 兜底 → 安全降级，不崩溃</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="80" y="340" width="560" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="96" y="363" fontSize="11" fontWeight="700" fill={OK_COLOR}>定位器的不变量：查找永远不返回 nullptr；未注册 = 静默而非崩溃</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：服务未注册就查找返回 nullptr，调用者段错误崩溃。复位：Null Object 兜底，安全降级不崩溃。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：服务未注册就查找返回 nullptr，调用者段错误崩溃；用 Null Object 兜底（未注册返回静默实现），Debug 模式加断言早暴露。
      </figcaption>
    </figure>
  );
}
