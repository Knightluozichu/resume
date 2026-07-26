"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh01ArchitectureFailure>：架构章反例复位动画（GPP 第1章 · 图3）。
 *
 * 故事：清晰分层，依赖只向下（Gameplay → Engine → Platform）。
 *  ① 初始：三层 + 向下依赖
 *  ② 正常：每层只知道下面一层，改底层不影响高层 ✓
 *  ③ 反例：跨层调用——Gameplay 直调 Platform，绕过 Engine
 *  ④ 反例：Platform 反依赖 Gameplay → 循环依赖，耦合蔓延 ✗
 *  ⑤ 复位：恢复清晰分层，lint 拦截跨层，反向依赖用接口/回调解耦
 *  ⑥ 复位后：依赖只向下，改动重新被局部化 ✓
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const LAYERS = [
  { id: "gameplay", label: "Gameplay（高层）", y: 104 },
  { id: "engine", label: "Engine（中层）", y: 196 },
  { id: "platform", label: "Platform（底层）", y: 288 },
];

const BOX_X = 220;
const BOX_W = 280;
const BOX_H = 54;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "清晰分层：Gameplay → Engine → Platform，依赖只向下" },
  { label: "ok", caption: "正常：每层只知道下面一层，改底层不影响高层 ✓" },
  { label: "fault", caption: "反例：跨层调用——Gameplay 直调 Platform，绕过 Engine" },
  { label: "cycle", caption: "反例：Platform 反依赖 Gameplay → 循环依赖，耦合蔓延 ✗" },
  { label: "reset", caption: "复位：恢复清晰分层，lint 拦截跨层，反向依赖用接口/回调解耦" },
  { label: "fixed", caption: "复位后：依赖只向下，改动重新被局部化 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh01ArchitectureFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const downArrowsRef = useRef<SVGGElement | null>(null);
  const crossPathRef = useRef<SVGGElement | null>(null);
  const cyclePathRef = useRef<SVGGElement | null>(null);
  const resetNoteRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：三层 + 向下依赖淡入
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(downArrowsRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.3);
      tl.label("setup", 0);

      // ② ok（t: T→2T）：正常判定浮现
      tl.add(verdictRefs.current["ok"]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      tl.label("ok", T);

      // ③ fault（t: 2T→3T）：正常判定淡出，跨层路径绘出
      tl.add(verdictRefs.current["ok"]!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 2);
      tl.add(crossPathRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2.15);
      tl.label("fault", T * 2);

      // ④ cycle（t: 3T→4T）：反向路径绘出，故障判定浮现
      tl.add(cyclePathRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.4);
      tl.label("cycle", T * 3);

      // ⑤ reset（t: 4T→5T）：故障判定 + 两条坏路径淡出，复位说明浮现，箭头回绿
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 4);
      tl.add(crossPathRef.current!, { opacity: [1, 0], duration: T * 0.4, ease: "out(3)" }, T * 4.1);
      tl.add(cyclePathRef.current!, { opacity: [1, 0], duration: T * 0.4, ease: "out(3)" }, T * 4.1);
      tl.add(resetNoteRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.3);
      tl.label("reset", T * 4);

      // ⑥ fixed（t: 5T→5.6T）：复位判定浮现
      tl.add(verdictRefs.current["fixed"]!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 5);
      tl.label("fixed", T * 5);
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
          aria-label="架构章反例复位动画。清晰分层时 Gameplay 经 Engine 到 Platform 依赖只向下，每层只知道下面一层，改底层不影响高层。反例是跨层调用，Gameplay 直调 Platform 绕过 Engine，Platform 又反依赖 Gameplay 形成循环依赖耦合蔓延。复位后恢复清晰分层，lint 拦截跨层调用，反向依赖用接口或回调解耦，依赖只向下改动重新被局部化。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：跨层调用 + 循环依赖 → 复位清晰分层
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            好的架构：每层只知道下面一层，依赖只向下
          </text>

          {/* 三层 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {LAYERS.map((l) => (
              <g key={l.id}>
                <rect x={BOX_X} y={l.y} width={BOX_W} height={BOX_H} rx="10"
                  fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.5" />
                <text x={BOX_X + BOX_W / 2} y={l.y + 32} textAnchor="middle" fontSize="12" fontWeight="600"
                  fill="var(--text-primary)">
                  {l.label}
                </text>
              </g>
            ))}
          </g>

          {/* 向下依赖箭头 */}
          <g ref={downArrowsRef} style={{ opacity: 0 }}>
            <path d={`M 360 ${LAYERS[0].y + BOX_H} L 360 ${LAYERS[1].y - 6} M 354 ${LAYERS[1].y - 14} L 360 ${LAYERS[1].y - 6} L 366 ${LAYERS[1].y - 14}`}
              fill="none" stroke={OK_COLOR} strokeWidth="2" />
            <path d={`M 360 ${LAYERS[1].y + BOX_H} L 360 ${LAYERS[2].y - 6} M 354 ${LAYERS[2].y - 14} L 360 ${LAYERS[2].y - 6} L 366 ${LAYERS[2].y - 14}`}
              fill="none" stroke={OK_COLOR} strokeWidth="2" />
          </g>

          {/* 跨层调用（Gameplay → Platform，绕过 Engine） */}
          <g ref={crossPathRef} style={{ opacity: 0 }}>
            <path d={`M ${BOX_X + BOX_W} ${LAYERS[0].y + 27} Q 580 ${LAYERS[0].y + 27} 580 ${LAYERS[2].y + 27} Q 580 ${LAYERS[2].y + 27} ${BOX_X + BOX_W} ${LAYERS[2].y + 27}`}
              fill="none" stroke={FAIL_COLOR} strokeWidth="2.5" strokeDasharray="6 3" />
            <text x="600" y={LAYERS[1].y + 30} fontSize="11" fontWeight="700" fill={FAIL_COLOR} transform={`rotate(90, 600, ${LAYERS[1].y + 30})`}>
              跨层！
            </text>
          </g>

          {/* 循环依赖（Platform → Gameplay，反向） */}
          <g ref={cyclePathRef} style={{ opacity: 0 }}>
            <path d={`M ${BOX_X} ${LAYERS[2].y + 27} Q 140 ${LAYERS[2].y + 27} 140 ${LAYERS[0].y + 27} Q 140 ${LAYERS[0].y + 27} ${BOX_X} ${LAYERS[0].y + 27}`}
              fill="none" stroke={FAIL_COLOR} strokeWidth="2.5" strokeDasharray="6 3" />
            <text x="120" y={LAYERS[1].y + 30} fontSize="11" fontWeight="700" fill={FAIL_COLOR} transform={`rotate(-90, 120, ${LAYERS[1].y + 30})`}>
              循环！
            </text>
          </g>

          {/* 复位说明 */}
          <g ref={resetNoteRef} style={{ opacity: 0 }}>
            <text x="360" y="368" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>
              ✓ 依赖只向下：Gameplay → Engine → Platform
            </text>
            <text x="360" y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
              跨层调用被 lint 规则拦截；反向依赖通过接口/回调解耦
            </text>
          </g>

          {/* 判定（多状态） */}
          <g ref={(el) => { verdictRefs.current["ok"] = el; }} style={{ opacity: 0 }}>
            <rect x="120" y="404" width="480" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="360" y="431" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 清晰分层：改底层不影响高层</text>
          </g>
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="120" y="404" width="480" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="360" y="431" textAnchor="middle" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 跨层+循环：改一处 → 全部受影响</text>
          </g>
          <g ref={(el) => { verdictRefs.current["fixed"] = el; }} style={{ opacity: 0 }}>
            <rect x="120" y="404" width="480" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="360" y="431" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 复位：分层恢复，跨层被拦截，改动重新局部化</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：跨层调用绕过中间层、底层反向依赖高层形成循环，耦合蔓延。修复：恢复清晰分层（依赖只向下），lint 拦截跨层，反向依赖用接口/回调解耦。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：跨层调用 + 循环依赖让耦合蔓延；恢复依赖只向下的清晰分层，改动才能被局部化。
      </figcaption>
    </figure>
  );
}
