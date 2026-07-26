"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh18DirtyFlagFailure>：脏标志模式反例复位动画（GPP 第18章 · 图3）。
 *
 * 故事：Transform 节点缓存 worldX，靠 dirty 标志决定要不要重算。
 *  ① 初始：local.x=5，缓存 worldX=5，脏灯灭
 *  ② 正常：setX(10) → 标脏（红灯）
 *  ③ 正常：渲染读取 → 重算 → 灯灭，worldX=10 ✓
 *  ④ 反例：忘了设脏——local.x 直接改成 20，脏灯没亮
 *  ⑤ 反例：渲染读取 → 以为缓存有效 → worldX 还是 10（过期）✗ 物体不跟手
 *  ⑥ 复位：把设脏封装进 setter，setX 自动亮灯
 *  ⑦ 复位：读取 → 重算 → worldX=20 ✓ 从结构上消除遗忘
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "初始：local.x=5，缓存 worldX=5，脏灯灭" },
  { label: "set-dirty", caption: "正常：setX(10) → 标脏（红灯亮起）" },
  { label: "read-ok", caption: "正常：渲染读取 → 重算 → 灯灭，worldX=10 ✓" },
  { label: "fault", caption: "反例：忘了设脏——local.x 直接改成 20，脏灯没亮" },
  { label: "stale", caption: "反例：渲染读取 → 以为缓存有效 → worldX 还是 10（过期）✗ 物体不跟手" },
  { label: "reset", caption: "复位：把设脏封装进 setter，setX 自动亮灯" },
  { label: "read-fixed", caption: "复位：读取 → 重算 → worldX=20 ✓ 从结构上消除遗忘" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh18DirtyFlagFailure() {
  const cardRef = useRef<SVGGElement | null>(null);
  const localRefs = useRef<Record<string, SVGTextElement | null>>({});
  const worldRefs = useRef<Record<string, SVGTextElement | null>>({});
  const dirtyLampRef = useRef<SVGCircleElement | null>(null);
  const readArrowRef = useRef<SVGGElement | null>(null);
  const faultBadgeRef = useRef<SVGGElement | null>(null);
  const setterRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：节点卡片淡入（local.x=5, worldX=5, 灯灭）
      tl.add(cardRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② set-dirty（t: T→2T）：local.x 5→10，脏灯亮红
      tl.add(localRefs.current["5"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T);
      tl.add(localRefs.current["10"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.2);
      tl.add(dirtyLampRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.3);
      tl.label("set-dirty", T);

      // ③ read-ok（t: 2T→3T）：读取箭头出现，重算，灯灭，worldX 5→10，判定✓
      tl.add(readArrowRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(dirtyLampRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2.3);
      tl.add(worldRefs.current["5"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.3);
      tl.add(worldRefs.current["10"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.4);
      tl.add(verdictRefs.current["ok"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("read-ok", T * 2);

      // ④ fault（t: 3T→4T）：反例徽章出现，local.x 10→20（偷偷改），灯保持灭
      tl.add(verdictRefs.current["ok"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(faultBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(localRefs.current["10"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.3);
      tl.add(localRefs.current["20"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.4);
      tl.label("fault", T * 3);

      // ⑤ stale（t: 4T→5T）：读取 → 灯仍灭（没重算）→ worldX 仍是 10（标红过期），判定✗
      tl.add(worldRefs.current["10"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 4.2);
      tl.add(worldRefs.current["stale"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.5);
      tl.label("stale", T * 4);

      // ⑥ reset（t: 5T→6T）：setter 封装出现，setX 自动亮灯，worldX stale 淡出
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 5);
      tl.add(faultBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 5);
      tl.add(setterRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 5.1);
      tl.add(dirtyLampRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 5.4);
      tl.label("reset", T * 5);

      // ⑦ read-fixed（t: 6T→6.6T）：读取 → 重算 → 灯灭，worldX stale→20，判定✓ + 结论
      tl.add(dirtyLampRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 6.1);
      tl.add(worldRefs.current["stale"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 6.1);
      tl.add(worldRefs.current["20"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 6.2);
      tl.add(verdictRefs.current["fixed"]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 6.3);
      tl.label("read-fixed", T * 6);
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
          aria-label="脏标志模式反例复位动画。Transform 节点缓存 worldX 靠 dirty 标志决定要不要重算。正常时 setX 10 标脏，渲染读取重算得 worldX 10 正确。反例是忘了设脏，local.x 直接改成 20 脏灯没亮，渲染读取以为缓存有效，worldX 还是 10 过期，物体不跟手。复位是把设脏封装进 setter，setX 自动亮灯，读取重算得 worldX 20 正确，从结构上消除遗忘。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：忘记设脏 → 读过期值 → 复位封装 setter
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            脏标志的正确性依赖：每次修改都必须设脏
          </text>

          {/* 反例徽章 */}
          <g ref={faultBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={FAIL_COLOR} fillOpacity="0.14" stroke={FAIL_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>反例 · 忘了设脏</text>
          </g>

          {/* 节点卡片 */}
          <g ref={cardRef} style={{ opacity: 0 }}>
            <rect x="80" y="80" width="340" height="150" rx="12" fill="rgba(255,255,255,0.03)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="96" y="104" fontSize="12" fontWeight="700" fill="var(--text-secondary)">Transform 节点</text>

            {/* local.x 各状态 */}
            <text x="96" y="132" fontSize="11" fill="var(--text-secondary)">local.x =</text>
            <text ref={(el) => { localRefs.current["5"] = el; }} x="170" y="132" fontSize="13" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)" style={{ opacity: 1 }}>5</text>
            <text ref={(el) => { localRefs.current["10"] = el; }} x="170" y="132" fontSize="13" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)" style={{ opacity: 0 }}>10</text>
            <text ref={(el) => { localRefs.current["20"] = el; }} x="170" y="132" fontSize="13" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>20</text>

            {/* dirty 灯 */}
            <text x="96" y="162" fontSize="11" fill="var(--text-secondary)">dirty</text>
            <circle cx="176" cy="158" r="7" fill="var(--text-secondary)" fillOpacity="0.15" stroke="var(--border)" strokeWidth="1" />
            <circle ref={dirtyLampRef} cx="176" cy="158" r="7" fill={FAIL_COLOR} stroke="var(--elevated)" strokeWidth="1.5" style={{ opacity: 0 }} />

            {/* cached worldX 各状态 */}
            <text x="96" y="196" fontSize="11" fill="var(--text-secondary)">cached.worldX =</text>
            <text ref={(el) => { worldRefs.current["5"] = el; }} x="210" y="196" fontSize="13" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)" style={{ opacity: 1 }}>5</text>
            <text ref={(el) => { worldRefs.current["10"] = el; }} x="210" y="196" fontSize="13" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)" style={{ opacity: 0 }}>10</text>
            <text ref={(el) => { worldRefs.current["stale"] = el; }} x="210" y="196" fontSize="13" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>10（过期!）</text>
            <text ref={(el) => { worldRefs.current["20"] = el; }} x="210" y="196" fontSize="13" fontWeight="700" fontFamily="monospace" fill={OK_COLOR} style={{ opacity: 0 }}>20</text>
          </g>

          {/* 渲染读取箭头 */}
          <g ref={readArrowRef} style={{ opacity: 0 }}>
            <path d="M 440 155 l 60 0 l -10 -8 m 10 8 l -10 8" fill="none" stroke={ACCENT} strokeWidth="2" />
            <text x="470" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>渲染读取</text>
            <text x="470" y="180" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">dirty? 重算</text>
          </g>

          {/* setter 封装（复位） */}
          <g ref={setterRef} style={{ opacity: 0 }}>
            <rect x="80" y="250" width="560" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.07" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="96" y="270" fontSize="11" fontWeight="700" fill={OK_COLOR}>复位：封装 setter</text>
            <text x="96" y="288" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">void setX(v) {"{ local.x = v; dirty = true; }"} ← 修改必经此路，自动设脏</text>
          </g>

          {/* 判定（多状态） */}
          <g ref={(el) => { verdictRefs.current["ok"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="320" width="560" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="96" y="347" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 修改后设脏，读取时重算，worldX 正确</text>
          </g>
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="320" width="560" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="96" y="347" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 忘设脏 → 缓存以为有效 → 读到过期值，物体不跟手</text>
          </g>
          <g ref={(el) => { verdictRefs.current["fixed"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="320" width="560" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="96" y="345" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ setter 自动设脏 → 读取重算 → worldX=20 正确</text>
            <text x="96" y="367" fontSize="11" fill="var(--text-secondary)">不变量：数据变 → 脏必设；封装 setter 从结构上消除遗忘</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：修改数据但忘设脏，读取时以为缓存有效，用到过期值。修复：把设脏封装进 setter，修改必经 setter，从结构上消除遗忘可能。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：忘设脏导致读到过期值；封装 setter 让设脏自动化，从结构上消除遗忘。
      </figcaption>
    </figure>
  );
}
