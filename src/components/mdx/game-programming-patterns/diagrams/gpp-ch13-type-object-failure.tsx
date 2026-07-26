"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh13TypeObjectFailure>：类型对象模式反例复位动画（GPP 第13章 · 图3）。
 *
 * 故事：Dragon 类型对象数据。
 *  ① 正常：类型数据完整（health=200, speed=12），运行时行为正确
 *  ② 反例：注入缺失字段（health/speed → undefined）
 *  ③ 反例结果：HP=NaN、speed=undefined → 行为未定义 ✗
 *  ④ 复位：schema 校验 + 默认值回退（health→100, speed→10）
 *  ⑤ 复位结果：日志警告 + 安全默认值，安全运行 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：Dragon 类型数据完整（health=200, speed=12），运行时行为正确" },
  { label: "missing", caption: "反例：注入缺失字段——health/speed 未定义" },
  { label: "broken", caption: "反例结果：HP=NaN、speed=undefined → 一击即死或瞬移，行为未定义 ✗" },
  { label: "reset", caption: "复位：schema 校验 + 默认值回退（health→100, speed→10）" },
  { label: "safe", caption: "复位结果：日志警告 + 安全默认值，安全运行 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh13TypeObjectFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const dataNormalRef = useRef<SVGGElement | null>(null);
  const dataBrokenRef = useRef<SVGGElement | null>(null);
  const runNormalRef = useRef<SVGGElement | null>(null);
  const runBrokenRef = useRef<SVGGElement | null>(null);
  const resetNoteRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：完整数据 + 正常行为
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(dataNormalRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.3);
      tl.add(runNormalRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② missing（t: T→2T）：完整数据淡出，缺字段数据（红）出现
      tl.add(dataNormalRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(dataBrokenRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("missing", T);

      // ③ broken（t: 2T→3T）：正常行为淡出，异常行为（红）出现 + 判定✗
      tl.add(runNormalRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(runBrokenRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("broken", T * 2);

      // ④ reset（t: 3T→4T）：异常/坏判定淡出，复位说明（绿）出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(runBrokenRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(resetNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.label("reset", T * 3);

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
          aria-label="类型对象模式反例复位动画。Dragon 类型对象数据。正常时类型数据完整 health 200 speed 12 运行时行为正确。反例注入缺失字段 health speed 未定义，HP 为 NaN speed 为 undefined 一击即死或瞬移行为未定义。复位 schema 校验加默认值回退 health 回退 100 speed 回退 10，日志警告加安全默认值安全运行。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：类型数据缺字段 → undefined → 行为未定义
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            类型对象 = 运行时数据，需要验证保障
          </text>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">类型数据：Dragon</text>
            <text x="400" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">运行时行为</text>
          </g>

          {/* 完整数据 */}
          <g ref={dataNormalRef} style={{ opacity: 0 }}>
            <rect x="60" y="96" width="280" height="120" rx="10" fill="rgba(255,255,255,0.03)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="76" y="122" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">name: "Dragon"</text>
            <text x="76" y="146" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">health: 200</text>
            <text x="76" y="170" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">attack: 45</text>
            <text x="76" y="194" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">speed: 12</text>
          </g>

          {/* 缺字段数据（红） */}
          <g ref={dataBrokenRef} style={{ opacity: 0 }}>
            <rect x="60" y="96" width="280" height="120" rx="10" fill={FAIL_COLOR} fillOpacity="0.05" stroke={FAIL_COLOR} strokeWidth="1.5" />
            <text x="76" y="122" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">name: "Dragon"</text>
            <text x="76" y="146" fontSize="11" fontFamily="monospace" fill={FAIL_COLOR}>health: undefined ⚠</text>
            <text x="76" y="170" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">attack: 45</text>
            <text x="76" y="194" fontSize="11" fontFamily="monospace" fill={FAIL_COLOR}>speed: undefined ⚠</text>
          </g>

          {/* 正常行为 */}
          <g ref={runNormalRef} style={{ opacity: 0 }}>
            <rect x="400" y="96" width="260" height="120" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="416" y="124" fontSize="11" fill="var(--text-primary)">Dragon 出现，HP=200</text>
            <text x="416" y="148" fontSize="11" fill="var(--text-primary)">移动速度=12，正常巡逻</text>
            <text x="416" y="172" fontSize="11" fill={OK_COLOR}>✓ 行为正确</text>
          </g>

          {/* 异常行为（红） */}
          <g ref={runBrokenRef} style={{ opacity: 0 }}>
            <rect x="400" y="96" width="260" height="120" rx="10" fill={FAIL_COLOR} fillOpacity="0.06" stroke={FAIL_COLOR} strokeWidth="1.5" />
            <text x="416" y="124" fontSize="11" fill={FAIL_COLOR}>HP=NaN → 一击即死或无敌</text>
            <text x="416" y="148" fontSize="11" fill={FAIL_COLOR}>speed=undefined → 瞬移/卡死</text>
            <text x="416" y="172" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>💥 行为未定义</text>
          </g>

          {/* 复位说明（绿） */}
          <g ref={resetNoteRef} style={{ opacity: 0 }}>
            <rect x="60" y="240" width="600" height="70" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="76" y="266" fontSize="11" fontWeight="700" fill={OK_COLOR}>复位：验证层防护</text>
            <text x="76" y="288" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">① 加载时 schema 校验：必填字段缺失 → 报错 + 回退默认值</text>
            <text x="76" y="304" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">② 运行时断言：health &gt; 0, speed ≥ 0 → 不满足则用安全值</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="330" width="600" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="76" y="357" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 缺字段 → undefined 蔓延 → 行为未定义</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="330" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="357" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ schema 验证 + 默认值回退 → 安全运行</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="386" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="409" fontSize="11" fontWeight="700" fill={OK_COLOR}>类型对象失去编译期检查 → 必须用验证层补回安全性</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：类型数据缺字段导致 undefined 蔓延、行为未定义。复位：schema 校验 + 默认值回退。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：类型对象数据缺字段导致 undefined 蔓延、行为未定义；加载时 schema 校验 + 运行时断言 + 默认值回退，补回编译期失去的安全性。
      </figcaption>
    </figure>
  );
}
