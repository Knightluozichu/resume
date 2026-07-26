"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh09GameLoopFailure>：游戏循环反例复位动画（GPP 第9章 · 图3）。
 *
 * 故事：累积器攒够 dt 就 update。
 *  ① 初始：累积器 16ms（正常，1 次 update）
 *  ② 反例：来一个长帧 → 累积器暴涨到 80ms
 *  ③ 反例结果：累积器 200ms，要追 12 次 update → 帧更慢 → 死亡螺旋 ✗
 *  ④ 复位：clamp frameTime → 累积器封顶 48ms
 *  ⑤ 复位结果：update 追得动，游戏不卡 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

// 累积器条宽度映射（200ms → 560px）
const barW = (ms: number) => Math.min(560, (ms / 200) * 560);

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "累积器 16ms（正常，攒够 16ms 就 update 一次）" },
  { label: "longframe", caption: "反例：来一个长帧 → frameTime 暴涨，累积器涨到 80ms" },
  { label: "spiral", caption: "反例结果：累积器 200ms，要追 12 次 update → 帧更慢 → 死亡螺旋 ✗" },
  { label: "clamp", caption: "复位：clamp frameTime → 累积器封顶 48ms" },
  { label: "capped", caption: "复位结果：update 追得动，游戏不卡 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh09GameLoopFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const accBarRef = useRef<SVGRectElement | null>(null);
  const accLabelRef = useRef<SVGTextElement | null>(null);
  const updateCountRef = useRef<Record<string, SVGTextElement | null>>({});
  const spiralNoteRef = useRef<SVGGElement | null>(null);
  const clampNoteRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：累积器条 16ms
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(accBarRef.current!, { width: [0, barW(16)], duration: T * 0.5, ease: "out(3)" }, T * 0.4);
      tl.label("setup", 0);

      // ② longframe（t: T→2T）：累积器 16→80
      tl.add(accBarRef.current!, { width: [barW(16), barW(80)], duration: T * 0.6, ease: "out(3)" }, T * 1.1);
      tl.add(updateCountRef.current["u5"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.5);
      tl.label("longframe", T);

      // ③ spiral（t: 2T→3T）：累积器 80→200，update 数 5→12，螺旋提示 + 判定✗
      tl.add(accBarRef.current!, { width: [barW(80), barW(200)], duration: T * 0.6, ease: "out(3)" }, T * 2.1);
      tl.add(updateCountRef.current["u5"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.2);
      tl.add(updateCountRef.current["u12"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.4);
      tl.add(spiralNoteRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("spiral", T * 2);

      // ④ clamp（t: 3T→4T）：累积器 200→48（clamp），螺旋/坏判定淡出，clamp 提示出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(spiralNoteRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(updateCountRef.current["u12"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.1);
      tl.add(accBarRef.current!, { width: [barW(200), barW(48)], duration: T * 0.5, ease: "inOut(2)" }, T * 3.2);
      tl.add(updateCountRef.current["u3"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.5);
      tl.add(clampNoteRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.6);
      tl.label("clamp", T * 3);

      // ⑤ capped（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("capped", T * 4);
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
          aria-label="游戏循环反例复位动画。累积器攒够 dt 就 update。反例是来一个长帧，frameTime 暴涨，累积器涨到 80 再到 200 毫秒，要追 12 次 update，帧更慢，死亡螺旋。复位是 clamp frameTime，累积器封顶 48 毫秒，update 追得动，游戏不卡。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：长帧 → 累积器暴涨 → 死亡螺旋
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            累积器越大要追的 update 越多，帧越慢，恶性循环；clamp 可打断
          </text>

          {/* 场景：累积器条 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="90" fontSize="11" fontWeight="700" fill="var(--text-secondary)">累积器 accumulator（攒够 16ms 就 update 一次）</text>
            <rect x="60" y="100" width="560" height="30" rx="6" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.2" />
            <rect ref={accBarRef} x="60" y="100" width="0" height="30" rx="6" fill={FAIL_COLOR} fillOpacity="0.4" stroke={FAIL_COLOR} strokeWidth="1.4" />
            {/* dt 刻度 */}
            <line x1={60 + barW(16)} y1="98" x2={60 + barW(16)} y2="132" stroke={OK_COLOR} strokeWidth="1.4" strokeDasharray="3 2" />
            <text x={60 + barW(16)} y="146" textAnchor="middle" fontSize="11" fill={OK_COLOR}>dt=16</text>
          </g>

          {/* 需要追赶的 update 数 */}
          <text x="60" y="180" fontSize="11" fontWeight="700" fill="var(--text-secondary)">本帧需要追赶的 update 次数</text>
          <text ref={(el) => { updateCountRef.current["u5"] = el; }} x="60" y="212" fontSize="20" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>5 次</text>
          <text ref={(el) => { updateCountRef.current["u12"] = el; }} x="60" y="212" fontSize="20" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>12 次（越追越多!）</text>
          <text ref={(el) => { updateCountRef.current["u3"] = el; }} x="60" y="212" fontSize="20" fontWeight="700" fontFamily="monospace" fill={OK_COLOR} style={{ opacity: 0 }}>3 次（追得动）</text>

          {/* 螺旋提示 */}
          <g ref={spiralNoteRef} style={{ opacity: 0 }}>
            <text x="60" y="252" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>死亡螺旋</text>
            <text x="60" y="274" fontSize="11" fill="var(--text-secondary)">长帧 → 累积器↑ → update 多 → 帧更慢 → 累积器更大 → ……</text>
          </g>

          {/* clamp 提示 */}
          <g ref={clampNoteRef} style={{ opacity: 0 }}>
            <text x="60" y="252" fontSize="11" fontWeight="700" fill={OK_COLOR}>有防护：frameTime 被 clamp，累积器封顶</text>
            <text x="60" y="274" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">frameTime = min(frameTime, 48)</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="76" y="327" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 死亡螺旋：累积器暴涨，update 追不上，游戏卡死</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="76" y="327" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 累积器受控：update 追得动，游戏不卡</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="356" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="379" fontSize="11" fontWeight="700" fill={OK_COLOR}>给 frameTime / 累积器设上限（clamp），打断死亡螺旋</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：长帧让累积器暴涨、update 追不上，形成死亡螺旋。复位：clamp frameTime，累积器封顶。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：某一帧耗时过长会让累积器暴涨、需要更多 update 追赶、帧更慢，形成死亡螺旋；给 frameTime 或累积器设上限（clamp），打断螺旋。
      </figcaption>
    </figure>
  );
}
