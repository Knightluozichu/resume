"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh13TypeObjectTradeoff>：类型对象模式取舍对照动画（GPP 第13章 · 图2）。
 *
 * 故事：怪物种类 Dragon/Troll/Ghost，现在要新增 Phoenix。
 *  ① 场景：3 种怪物
 *  ② 基线（继承类树）：加 Phoenix 要写新类 + 重编译 + 重部署 ✗
 *  ③ 候选（类型对象）：加 Phoenix 只需加一行数据，无需编译 ✓
 *  ④ 对照：类型对象把"种类"从编译期类层次搬到运行时数据
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "怪物种类 Dragon/Troll/Ghost，现在要新增 Phoenix" },
  { label: "inheritance", caption: "基线（继承类树）：加 Phoenix 要写新类 + 重编译 + 重部署 ✗" },
  { label: "typeobject", caption: "候选（类型对象）：加 Phoenix 只需加一行数据，无需编译 ✓" },
  { label: "insight", caption: "对照：类型对象把“种类”从编译期类层次搬到运行时数据" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh13TypeObjectTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const inheritanceBadgeRef = useRef<SVGGElement | null>(null);
  const typeobjectBadgeRef = useRef<SVGGElement | null>(null);
  const inheritNewRef = useRef<SVGGElement | null>(null);
  const typeobjNewRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：3 种怪物
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② inheritance（t: T→2T）：继承徽章 + Phoenix 新类（红）+ 判定✗
      tl.add(inheritanceBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(inheritNewRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("inheritance", T);

      // ③ typeobject（t: 2T→3T）：切候选——继承淡出，类型对象徽章 + Phoenix 数据（绿）+ 判定✓
      tl.add(inheritanceBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(inheritNewRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(typeobjectBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(typeobjNewRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("typeobject", T * 2);

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
          aria-label="类型对象模式取舍对照动画。怪物种类 Dragon Troll Ghost 现在要新增 Phoenix。基线继承类树加 Phoenix 要写新类加重编译加重部署。候选类型对象加 Phoenix 只需加一行数据无需编译。对照：类型对象把种类从编译期类层次搬到运行时数据。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：继承类树 vs 类型对象（种类即数据）
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            类型对象把"种类"从编译期类层次搬到运行时数据
          </text>

          {/* 方式徽章 */}
          <g ref={inheritanceBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 继承类树</text>
          </g>
          <g ref={typeobjectBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 类型对象</text>
          </g>

          {/* 场景：3 种怪物 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">怪物种类</text>
            {["Dragon", "Troll", "Ghost"].map((t, i) => (
              <g key={t}>
                <rect x={60 + i * 160} y="100" width="140" height="50" rx="8" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.2" />
                <text x={130 + i * 160} y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{t}</text>
                <text x={130 + i * 160} y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">已有</text>
              </g>
            ))}
          </g>

          {/* 继承：Phoenix 新类（红） */}
          <g ref={inheritNewRef} style={{ opacity: 0 }}>
            <rect x="540" y="100" width="140" height="50" rx="8" fill={WARN_COLOR} fillOpacity="0.12" stroke={WARN_COLOR} strokeWidth="2" />
            <text x="610" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fill={WARN_COLOR}>class Phoenix</text>
            <text x="610" y="140" textAnchor="middle" fontSize="11" fill={WARN_COLOR}>✗ 写新类+编译</text>
          </g>

          {/* 类型对象：Phoenix 数据（绿） */}
          <g ref={typeobjNewRef} style={{ opacity: 0 }}>
            <rect x="540" y="100" width="140" height="50" rx="8" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="610" y="122" textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="monospace" fill={OK_COLOR}>{'{ type: "Phoenix" }'}</text>
            <text x="610" y="140" textAnchor="middle" fontSize="11" fill={OK_COLOR}>✓ 加数据即可</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="200" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="227" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 继承类树：加新种类 = 写新类 + 重编译 + 重部署</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="200" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="227" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 类型对象：加新种类 = 加一行数据，无需编译</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="270" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="295" fontSize="13" fontWeight="700" fill={OK_COLOR}>类型对象：种类 = 运行时数据，可热更加新种类</text>
            <text x="76" y="317" fontSize="11" fill="var(--text-secondary)">代价：失去编译期类型检查，需手动管理类型数据（见反例）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（继承类树）加新种类要写类重编译；候选（类型对象）加新种类只需加一行数据。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：继承类树把种类固定在编译期，加新种类要写类重编译；类型对象把种类变成运行时数据，加新种类只需加配置。代价是失去编译期类型安全。
      </figcaption>
    </figure>
  );
}
