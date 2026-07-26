"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh10UpdateMethodFailure>：更新方法反例复位动画（GPP 第10章 · 图3）。
 *
 * 故事：遍历对象列表 [Bjørn, Skeleton, Mage, Slime]。
 *  ① 初始：4 个对象，迭代器在 i=0
 *  ② 遍历到 i=1（Skeleton）时把它删除 → 列表左移成 [Bjørn, Mage, Slime]
 *  ③ 反例结果：迭代器按原索引前进到 i=2，指向 Slime，Mage 被跳过 ✗
 *  ④ 复位：把增删延迟到帧边界，遍历期间列表不变
 *  ⑤ 复位结果：每个对象都被遍历到，无跳过 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "对象列表 [Bjørn, Skeleton, Mage, Slime]，迭代器在 i=0" },
  { label: "remove", caption: "遍历到 i=1（Skeleton）时把它删除 → 列表左移成 [Bjørn, Mage, Slime]" },
  { label: "skip", caption: "反例结果：迭代器按原索引前进到 i=2，指向 Slime，Mage 被跳过 ✗" },
  { label: "defer", caption: "复位：把增删延迟到帧边界，遍历期间列表不变" },
  { label: "noskip", caption: "复位结果：每个对象都被遍历到，无跳过 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh10UpdateMethodFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const skeletonRef = useRef<SVGGElement | null>(null);
  const cursorRef = useRef<SVGGElement | null>(null);
  const cursorLabelRef = useRef<SVGTextElement | null>(null);
  const mageSkipRef = useRef<SVGGElement | null>(null);
  const deferNoteRef = useRef<SVGGElement | null>(null);
  const allDoneRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：4 个对象 + 迭代器在 i=0
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(cursorRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② remove（t: T→2T）：迭代器移到 i=1，Skeleton 淡出（删除），后续左移
      tl.add(cursorRef.current!, { x: [0, 150], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(cursorLabelRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 1.2);
      tl.add(skeletonRef.current!, { opacity: [1, 0.15], duration: T * 0.4, ease: "out(3)" }, T * 1.3);
      tl.label("remove", T);

      // ③ skip（t: 2T→3T）：迭代器移到 i=2（指向 Slime），Mage 标红"被跳过" + 判定✗
      tl.add(cursorRef.current!, { x: [150, 300], duration: T * 0.3, ease: "out(3)" }, T * 2.1);
      tl.add(mageSkipRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.4);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("skip", T * 2);

      // ④ defer（t: 3T→4T）：复位——Skeleton 恢复，Mage 跳过提示/坏判定淡出，延迟提示出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(mageSkipRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(skeletonRef.current!, { opacity: [0.15, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.1);
      tl.add(cursorRef.current!, { x: [300, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.2);
      tl.add(deferNoteRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.4);
      tl.label("defer", T * 3);

      // ⑤ noskip（t: 4T→5T）：迭代器扫过全部 4 个，全部"已更新" + 判定✓ + 结论
      tl.add(cursorRef.current!, { x: [0, 450], duration: T * 0.7, ease: "inOut(2)" }, T * 4);
      tl.add(allDoneRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.5);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.6);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4.8);
      tl.label("noskip", T * 4);
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
          aria-label="更新方法反例复位动画。遍历对象列表 Bjørn Skeleton Mage Slime。遍历到 i 等于 1 的 Skeleton 时把它删除，列表左移成 Bjørn Mage Slime。反例结果是迭代器按原索引前进到 i 等于 2 指向 Slime，Mage 被跳过。复位是把增删延迟到帧边界，遍历期间列表不变，每个对象都被遍历到无跳过。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：遍历中删除对象 → 跳过对象
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            遍历中增删会让索引错位；延迟到帧边界可避免
          </text>

          {/* 场景：对象列表 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">对象列表</text>
            {/* Bjørn */}
            <rect x="60" y="100" width="135" height="50" rx="8" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.3" />
            <text x="127" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">Bjørn</text>
            <text x="127" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">i=0</text>
            {/* Skeleton（会被删除） */}
            <g ref={skeletonRef}>
              <rect x="210" y="100" width="135" height="50" rx="8" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.3" />
              <text x="277" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">Skeleton</text>
              <text x="277" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">i=1</text>
            </g>
            {/* Mage（会被跳过） */}
            <rect x="360" y="100" width="135" height="50" rx="8" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.3" />
            <text x="427" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">Mage</text>
            <text x="427" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">i=2</text>
            {/* Slime */}
            <rect x="510" y="100" width="135" height="50" rx="8" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.3" />
            <text x="577" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">Slime</text>
            <text x="577" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">i=3</text>

            {/* Mage 被跳过标记（红框） */}
            <g ref={mageSkipRef} style={{ opacity: 0 }}>
              <rect x="360" y="100" width="135" height="50" rx="8" fill={FAIL_COLOR} fillOpacity="0.16" stroke={FAIL_COLOR} strokeWidth="2" />
              <text x="427" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>Mage</text>
              <text x="427" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>被跳过!</text>
            </g>

            {/* 全部已更新（复位结果） */}
            <g ref={allDoneRef} style={{ opacity: 0 }}>
              {["Bjørn", "Skeleton", "Mage", "Slime"].map((name, i) => (
                <text key={name} x={127 + i * 150} y="168" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>✓ 已更新</text>
              ))}
            </g>

            {/* 迭代器光标 */}
            <g ref={cursorRef} style={{ opacity: 0 }}>
              <path d="M 127 180 l -8 14 l 16 0 z" fill={ACCENT} />
              <text ref={cursorLabelRef} x="127" y="210" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="monospace" fill={ACCENT}>i=0</text>
            </g>
          </g>

          {/* 延迟提示 */}
          <g ref={deferNoteRef} style={{ opacity: 0 }}>
            <text x="60" y="250" fontSize="11" fontWeight="700" fill={OK_COLOR}>复位：增删延迟到帧边界，遍历期间列表不变</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="290" width="600" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="76" y="317" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 遍历中删除：索引错位，Mage 被跳过未更新</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="290" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="76" y="317" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 延迟到帧边界：遍历期间列表不变，无跳过</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="346" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="369" fontSize="11" fontWeight="700" fill={OK_COLOR}>对象的增删延迟到帧边界统一处理，遍历期间列表保持不变</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：遍历中删除对象导致索引错位、跳过对象。复位：增删延迟到帧边界，遍历期间列表不变。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：遍历对象列表时删除当前对象会让后续元素左移、索引错位，从而跳过对象；把对象的增删延迟到帧边界统一处理，遍历期间列表保持不变。
      </figcaption>
    </figure>
  );
}
