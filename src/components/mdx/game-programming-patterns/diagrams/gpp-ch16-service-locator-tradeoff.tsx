"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh16ServiceLocatorTradeoff>：服务定位器模式取舍对照动画（GPP 第16章 · 图2）。
 *
 * 故事：GameLogic 需要音频服务。
 *  ① 场景：GameLogic（调用者）
 *  ② 基线（单例/硬编码具体类）：直接依赖 ConsoleAudio，编译期绑死 ✗
 *  ③ 候选（服务定位器）：按接口 IAudio* 查找，运行时绑定，可替换实现 ✓
 *  ④ 对照：定位器把"用哪个实现"从编译期推迟到运行时
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "GameLogic（调用者）需要音频服务" },
  { label: "singleton", caption: "基线（单例/硬编码具体类）：直接依赖 ConsoleAudio，编译期绑死，换平台要改代码 ✗" },
  { label: "locator", caption: "候选（服务定位器）：按接口 IAudio* 查找，运行时绑定，可替换实现 ✓" },
  { label: "insight", caption: "对照：定位器把“用哪个实现”从编译期推迟到运行时" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh16ServiceLocatorTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const singletonBadgeRef = useRef<SVGGElement | null>(null);
  const locatorBadgeRef = useRef<SVGGElement | null>(null);
  const singletonRef = useRef<SVGGElement | null>(null);
  const locatorRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：GameLogic
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② singleton（t: T→2T）：单例徽章 + 直连具体类（红）+ 判定✗
      tl.add(singletonBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(singletonRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("singleton", T);

      // ③ locator（t: 2T→3T）：切候选——单例淡出，定位器徽章 + 按接口查找（绿）+ 判定✓
      tl.add(singletonBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(singletonRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(locatorBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(locatorRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("locator", T * 2);

      // ④ insight（t: 3T→3.6T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("insight", T * 3);
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
          aria-label="服务定位器模式取舍对照动画。GameLogic 调用者需要音频服务。基线单例硬编码具体类，直接依赖 ConsoleAudio 编译期绑死换平台要改代码。候选服务定位器，按接口 IAudio 查找运行时绑定可替换实现。对照：定位器把用哪个实现从编译期推迟到运行时。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：单例（耦合具体类）vs 服务定位器（按接口）
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            定位器把"用哪个实现"从编译期推迟到运行时
          </text>

          {/* 方式徽章 */}
          <g ref={singletonBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 单例硬编码</text>
          </g>
          <g ref={locatorBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 服务定位器</text>
          </g>

          {/* 场景：GameLogic */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <rect x="80" y="90" width="140" height="44" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
            <text x="150" y="117" textAnchor="middle" fontSize="12" fill="var(--text-primary)">GameLogic</text>
          </g>

          {/* 单例直连（红） */}
          <g ref={singletonRef} style={{ opacity: 0 }}>
            <line x1="220" y1="112" x2="420" y2="112" stroke={WARN_COLOR} strokeWidth="2" />
            <text x="320" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>#include "ConsoleAudio.h"</text>
            <rect x="420" y="90" width="180" height="44" rx="8" fill={WARN_COLOR} fillOpacity="0.08" stroke={WARN_COLOR} strokeWidth="1.5" />
            <text x="510" y="117" textAnchor="middle" fontSize="12" fontWeight="600" fill={WARN_COLOR}>ConsoleAudio（具体类）</text>
            <text x="360" y="170" textAnchor="middle" fontSize="11" fill={WARN_COLOR}>编译期绑死：换平台要改代码重编译</text>
          </g>

          {/* 定位器（绿） */}
          <g ref={locatorRef} style={{ opacity: 0 }}>
            <line x1="220" y1="112" x2="320" y2="112" stroke={OK_COLOR} strokeWidth="1.5" />
            <rect x="320" y="90" width="120" height="44" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="380" y="117" textAnchor="middle" fontSize="11" fontWeight="600" fill={OK_COLOR}>Locator</text>
            <line x1="440" y1="112" x2="520" y2="112" stroke={OK_COLOR} strokeWidth="1.5" />
            <rect x="520" y="90" width="140" height="44" rx="8" fill="rgba(255,255,255,0.04)" stroke={OK_COLOR} strokeWidth="1.2" />
            <text x="590" y="112" textAnchor="middle" fontSize="11" fill="var(--text-primary)">IAudio*</text>
            <text x="590" y="128" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">运行时绑定</text>
            <text x="360" y="170" textAnchor="middle" fontSize="11" fill={OK_COLOR}>按接口查找：换平台只需注册不同实现</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="220" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="247" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 单例：调用者绑死具体类，换实现要改代码</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="220" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="247" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 定位器：调用者只依赖接口，实现可运行时替换</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="290" width="600" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="312" fontSize="12" fontWeight="700" fill={OK_COLOR}>定位器：按接口查找服务，实现可运行时替换</text>
            <text x="76" y="331" fontSize="11" fill="var(--text-secondary)">代价：服务未注册就查找 → 运行时错误（需 Null Object 防护，见反例）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（单例硬编码）调用者绑死具体类；候选（服务定位器）按接口查找、实现可运行时替换。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：单例让调用者绑死具体类，换实现要改代码重编译；服务定位器让调用者按接口查找，实现可运行时替换。代价是未注册时运行时出错。
      </figcaption>
    </figure>
  );
}
