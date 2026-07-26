"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh05PrototypeTradeoff>：原型模式取舍对照动画（GPP 第5章 · 图2）。
 *
 * 故事：怪物有恶魔/幽灵两种，现在要新增"龙"。
 *  ① 场景：spawn 函数表（2 分支）与原型列表（2 原型）
 *  ② 基线（spawn 表）新增龙：要加一个 switch 分支，改既有代码 ✗
 *  ③ 候选（原型）新增龙：只加一个原型对象，零分支、不改既有代码 ✓
 *  ④ 对照：spawn 表随种类膨胀且每加一种要改代码；原型扁平
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "怪物有恶魔/幽灵两种：spawn 函数表 2 个分支，原型列表 2 个原型" },
  { label: "add-spawn", caption: "基线（spawn 表）新增龙：要加一个 switch 分支，改既有代码 ✗" },
  { label: "add-proto", caption: "候选（原型）新增龙：只加一个原型对象，零分支、不改既有代码 ✓" },
  { label: "insight", caption: "对照：spawn 表随种类膨胀、每加一种要改代码；原型方式扁平、零分支" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh05PrototypeTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const spawnNewRef = useRef<SVGGElement | null>(null);
  const protoNewRef = useRef<SVGGElement | null>(null);
  const spawnNoteRef = useRef<SVGTextElement | null>(null);
  const protoNoteRef = useRef<SVGTextElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② add-spawn（t: T→2T）：spawn 表新增"龙"分支（红）+ 提示
      tl.add(spawnNewRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.1);
      tl.add(spawnNoteRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.5);
      tl.label("add-spawn", T);

      // ③ add-proto（t: 2T→3T）：原型列表新增"龙"原型（绿）+ 提示
      tl.add(protoNewRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.1);
      tl.add(protoNoteRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.label("add-proto", T * 2);

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
          aria-label="原型模式取舍对照动画。怪物有恶魔幽灵两种，现在要新增龙。基线 spawn 函数表新增龙要加一个 switch 分支改既有代码。候选原型克隆新增龙只加一个原型对象零分支不改既有代码。对照：spawn 表随种类膨胀每加一种要改代码，原型方式扁平零分支。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：spawn 函数表 vs 原型克隆
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            新增种类：spawn 表要加分支，原型只加一个对象
          </text>

          {/* 场景 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {/* spawn 函数表（左） */}
            <text x="60" y="86" fontSize="11" fontWeight="700" fill={WARN_COLOR}>spawn 函数表（switch 分支）</text>
            <rect x="60" y="96" width="290" height="150" rx="10" fill={WARN_COLOR} fillOpacity="0.06" stroke={WARN_COLOR} strokeWidth="1.5" />
            <text x="76" y="118" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">switch (type) {"{"}</text>
            <text x="92" y="142" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">case "恶魔": return spawn恶魔();</text>
            <text x="92" y="168" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">case "幽灵": return spawn幽灵();</text>
            {/* 新增分支（红） */}
            <g ref={spawnNewRef} style={{ opacity: 0 }}>
              <text x="92" y="194" fontSize="11" fontWeight="700" fontFamily="monospace" fill={WARN_COLOR}>case "龙": return spawn龙();  ← 新增分支</text>
            </g>
            <text x="76" y="224" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">{"}"}</text>
            <text ref={spawnNoteRef} x="76" y="240" fontSize="11" fontWeight="700" fill={WARN_COLOR} style={{ opacity: 0 }}>✗ 要改既有代码、重新编译</text>

            {/* 原型列表（右） */}
            <text x="400" y="86" fontSize="11" fontWeight="700" fill={OK_COLOR}>原型对象（克隆）</text>
            <rect x="400" y="96" width="260" height="150" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <rect x="416" y="110" width="228" height="26" rx="5" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.2" />
            <text x="428" y="127" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">恶魔Prototype.clone()</text>
            <rect x="416" y="142" width="228" height="26" rx="5" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.2" />
            <text x="428" y="159" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">幽灵Prototype.clone()</text>
            {/* 新增原型（绿） */}
            <g ref={protoNewRef} style={{ opacity: 0 }}>
              <rect x="416" y="174" width="228" height="26" rx="5" fill={OK_COLOR} fillOpacity="0.2" stroke={OK_COLOR} strokeWidth="1.4" />
              <text x="428" y="191" fontSize="11" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>龙Prototype.clone()  ← 加个原型即可</text>
            </g>
            <text ref={protoNoteRef} x="416" y="240" fontSize="11" fontWeight="700" fill={OK_COLOR} style={{ opacity: 0 }}>✓ 零分支、不改既有代码</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="280" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="305" fontSize="13" fontWeight="700" fill={OK_COLOR}>spawn 表随种类膨胀、每加一种要改代码；原型方式新增种类零分支</text>
            <text x="76" y="327" fontSize="11" fill="var(--text-secondary)">原型把"如何创建"交给原型对象；代价是克隆要正确复制全部状态（见反例）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（spawn 表）新增种类要加分支、改既有代码；候选（原型）只加一个原型对象，零分支。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：spawn 函数表每加一种怪物就要新增函数与 switch 分支，代码膨胀且要改既有代码；原型克隆把"如何创建"交给原型对象，新增种类只需加一个原型，扁平且零分支。
      </figcaption>
    </figure>
  );
}
