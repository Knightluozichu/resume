"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh19ObjectPoolFailure>：对象池模式反例复位动画（GPP 第19章 · 图3）。
 *
 * 故事：从池 acquire 一个 Bullet 对象。
 *  ① 正常：acquire 后对象干净（damage=10, owner=null）
 *  ② 反例：复用未清空——上一发的 damage=999、owner="Boss" 残留
 *  ③ 反例结果：玩家子弹伤害 999 → 一击秒杀 Boss，数据污染 ✗
 *  ④ 复位：release 时强制 reset()，归还必清空
 *  ⑤ 复位结果：acquire 后对象保证干净 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：从池 acquire 一个 Bullet，对象干净（damage=10, owner=null）" },
  { label: "dirty", caption: "反例：复用未清空——上一发的 damage=999、owner=\"Boss\" 残留" },
  { label: "polluted", caption: "反例结果：玩家子弹伤害 999 → 一击秒杀 Boss，数据污染 ✗" },
  { label: "reset", caption: "复位：release 时强制 reset()，归还必清空" },
  { label: "clean", caption: "复位结果：acquire 后对象保证干净，状态 = 初始值 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh19ObjectPoolFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const stateCleanRef = useRef<SVGGElement | null>(null);
  const stateDirtyRef = useRef<SVGGElement | null>(null);
  const runCleanRef = useRef<SVGGElement | null>(null);
  const runDirtyRef = useRef<SVGGElement | null>(null);
  const resetNoteRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：干净状态 + 正常表现
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(stateCleanRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.3);
      tl.add(runCleanRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② dirty（t: T→2T）：干净状态淡出，脏状态（红）出现
      tl.add(stateCleanRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(runCleanRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(stateDirtyRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("dirty", T);

      // ③ polluted（t: 2T→3T）：异常表现（红）出现 + 判定✗
      tl.add(runDirtyRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("polluted", T * 2);

      // ④ reset（t: 3T→4T）：脏状态/异常/坏判定淡出，复位说明（绿）出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(stateDirtyRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(runDirtyRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(resetNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.label("reset", T * 3);

      // ⑤ clean（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("clean", T * 4);
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
          aria-label="对象池模式反例复位动画。从池 acquire 一个 Bullet 对象。正常时对象干净 damage 10 owner null。反例是复用未清空上一发的 damage 999 owner Boss 残留，玩家子弹伤害 999 一击秒杀 Boss 数据污染。复位是 release 时强制 reset 归还必清空，acquire 后对象保证干净状态等于初始值。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：复用未清空脏状态 → 数据污染
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            对象池的不变量：acquire 后对象状态 = 初始状态
          </text>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">Bullet 对象（从池 acquire）</text>
            <text x="400" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">游戏表现</text>
          </g>

          {/* 干净状态 */}
          <g ref={stateCleanRef} style={{ opacity: 0 }}>
            <rect x="60" y="96" width="280" height="110" rx="10" fill="rgba(255,255,255,0.03)" stroke="var(--border)" strokeWidth="1.5" />
            <text x="76" y="124" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">damage = 10（初始值）</text>
            <text x="76" y="150" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">owner = null（干净）</text>
            <text x="76" y="176" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">active = true</text>
          </g>

          {/* 脏状态（红） */}
          <g ref={stateDirtyRef} style={{ opacity: 0 }}>
            <rect x="60" y="96" width="280" height="110" rx="10" fill={FAIL_COLOR} fillOpacity="0.05" stroke={FAIL_COLOR} strokeWidth="1.5" />
            <text x="76" y="124" fontSize="11" fontFamily="monospace" fill={FAIL_COLOR}>damage = 999 ⚠（上一发的!）</text>
            <text x="76" y="150" fontSize="11" fontFamily="monospace" fill={FAIL_COLOR}>owner = "Boss" ⚠（残留）</text>
            <text x="76" y="176" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">active = true</text>
          </g>

          {/* 正常表现 */}
          <g ref={runCleanRef} style={{ opacity: 0 }}>
            <rect x="400" y="96" width="260" height="110" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="416" y="128" fontSize="11" fill="var(--text-primary)">玩家子弹伤害 10 → 正常</text>
            <text x="416" y="156" fontSize="11" fill={OK_COLOR}>✓ 行为正确</text>
          </g>

          {/* 异常表现（红） */}
          <g ref={runDirtyRef} style={{ opacity: 0 }}>
            <rect x="400" y="96" width="260" height="110" rx="10" fill={FAIL_COLOR} fillOpacity="0.06" stroke={FAIL_COLOR} strokeWidth="1.5" />
            <text x="416" y="128" fontSize="11" fill={FAIL_COLOR}>玩家子弹伤害 999 → 一击秒杀 Boss</text>
            <text x="416" y="156" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>💥 数据污染 bug</text>
          </g>

          {/* 复位说明（绿） */}
          <g ref={resetNoteRef} style={{ opacity: 0 }}>
            <rect x="60" y="230" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="76" y="256" fontSize="11" fontWeight="700" fill={OK_COLOR}>复位：release 时强制 reset</text>
            <text x="76" y="278" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">pool.release(obj) {"{ obj.reset(); freeList.push(obj); }"} ← 归还必清空</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="310" width="600" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="76" y="337" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 复用未清空 → 脏数据残留 → 数据污染</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="310" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="337" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ release 强制 reset → acquire 保证干净</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="370" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="393" fontSize="11" fontWeight="700" fill={OK_COLOR}>对象池的不变量：acquire 后状态 = 初始值；release 必须清空</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：复用未清空脏状态，新使用者看到前任数据。复位：release 时强制 reset()，acquire 后对象保证干净。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：复用对象时未清空旧状态，新使用者看到前任数据（伤害 999）；release 时强制调用 reset()，保证 acquire 后对象状态 = 初始状态。
      </figcaption>
    </figure>
  );
}
