"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh02CommandTradeoff>：命令模式取舍对照动画（GPP 第2章 · 图2）。
 *
 * 故事：对演员 Bjørn 下达 [右移, 右移] 两个动作。
 *  ① 场景建立：Bjørn 在 x=0，动作序列 [右移, 右移]
 *  ② 基线（硬编码）：执行右移右移 → Bjørn 到 x=2，动作转瞬即逝（无记录）
 *  ③ 基线想撤销 → 无任何记录，撤销不了 ✗
 *  ④ 候选（命令对象）：重新执行，每个动作封装成命令入 undo 栈 → Bjørn 到 x=2，栈 [右移, 右移]
 *  ⑤ 候选撤销 → 弹出命令，Bjørn 逐步退回 x=1 → x=0 ✓
 *  ⑥ 对照：命令对象把动作变成可撤销/重做/排队的"东西"
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const POS_X = [120, 190, 260]; // x=0,1,2

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "演员 Bjørn 在 x=0，待执行动作序列 [右移, 右移]" },
  { label: "baseline-run", caption: "基线（硬编码）：按键直接调方法，Bjørn 右移两次到 x=2，动作转瞬即逝" },
  { label: "baseline-fail", caption: "基线想撤销 → 动作没有留下任何记录，撤销不了 ✗" },
  { label: "candidate-run", caption: "候选（命令对象）：每个动作封装成命令执行后入 undo 栈，Bjørn 到 x=2" },
  { label: "candidate-undo", caption: "候选撤销 → 弹出栈顶命令并反向执行，Bjørn 逐步退回 x=1 → x=0 ✓" },
  { label: "insight", caption: "对照：命令对象把动作变成可撤销/重做/排队的“东西”，代价是每个动作多一个对象" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh02CommandTradeoff() {
  const stageRef = useRef<SVGGElement | null>(null);
  const bjornRef = useRef<SVGGElement | null>(null);
  const baselineBadgeRef = useRef<SVGGElement | null>(null);
  const candidateBadgeRef = useRef<SVGGElement | null>(null);
  const actionCardRefs = useRef<Record<string, SVGGElement | null>>({});
  const stackItemRefs = useRef<Record<string, SVGGElement | null>>({});
  const undoPressRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：舞台 + 动作卡片淡入，Bjørn 在 x=0
      tl.add(stageRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② baseline-run（t: T→3T）：基线徽章出现，Bjørn 右移两次，动作卡片闪后消失
      tl.add(baselineBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(bjornRef.current!, { x: [POS_X[0], POS_X[1]], duration: T * 0.6, ease: "inOut(2)" }, T * 1.2);
      tl.add(actionCardRefs.current["a0"]!, { opacity: [1, 0.3, 0], duration: T * 0.8, ease: "out(3)" }, T * 1.2);
      tl.add(bjornRef.current!, { x: [POS_X[1], POS_X[2]], duration: T * 0.6, ease: "inOut(2)" }, T * 2);
      tl.add(actionCardRefs.current["a1"]!, { opacity: [1, 0.3, 0], duration: T * 0.8, ease: "out(3)" }, T * 2);
      tl.label("baseline-run", T);

      // ③ baseline-fail（t: 3T→4T）：撤销按压出现但无反应，判定✗
      tl.add(undoPressRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.4);
      tl.label("baseline-fail", T * 3);

      // ④ candidate-run（t: 4T→6T）：切候选——基线徽章/撤销按压/坏判定淡出，Bjørn 回到 x=0，
      //    重新执行两个命令（卡片重现为命令），逐个入栈
      tl.add(baselineBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 4);
      tl.add(undoPressRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 4);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 4);
      tl.add(candidateBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.2);
      tl.add(bjornRef.current!, { x: [POS_X[2], POS_X[0]], duration: T * 0.4, ease: "inOut(2)" }, T * 4.2);
      tl.add(actionCardRefs.current["a0"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.7);
      tl.add(bjornRef.current!, { x: [POS_X[0], POS_X[1]], duration: T * 0.5, ease: "inOut(2)" }, T * 4.8);
      tl.add(stackItemRefs.current["s0"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 5);
      tl.add(actionCardRefs.current["a1"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 5.3);
      tl.add(bjornRef.current!, { x: [POS_X[1], POS_X[2]], duration: T * 0.5, ease: "inOut(2)" }, T * 5.4);
      tl.add(stackItemRefs.current["s1"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 5.6);
      tl.label("candidate-run", T * 4);

      // ⑤ candidate-undo（t: 6T→8T）：撤销两次——弹栈，Bjørn 反向退回
      tl.add(stackItemRefs.current["s1"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 6.2);
      tl.add(bjornRef.current!, { x: [POS_X[2], POS_X[1]], duration: T * 0.5, ease: "inOut(2)" }, T * 6.3);
      tl.add(stackItemRefs.current["s0"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 7);
      tl.add(bjornRef.current!, { x: [POS_X[1], POS_X[0]], duration: T * 0.5, ease: "inOut(2)" }, T * 7.1);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 7.5);
      tl.label("candidate-undo", T * 6);

      // ⑥ insight（t: 8T→8.6T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 8);
      tl.label("insight", T * 8);
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
          aria-label="命令模式取舍对照动画。演员 Bjørn 在 x 等于 0，待执行动作序列右移右移。基线硬编码：按键直接调方法，Bjørn 右移两次到 x 等于 2，动作转瞬即逝，想撤销没有任何记录撤销不了。候选命令对象：每个动作封装成命令执行后入 undo 栈，Bjørn 到 x 等于 2，撤销时弹出栈顶命令反向执行，Bjørn 逐步退回 x 等于 1 再到 x 等于 0。对照：命令对象把动作变成可撤销可重做可排队的东西。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：硬编码动作 vs 命令对象
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            命令对象把动作变成可撤销/重做/排队的“东西”
          </text>

          {/* 方式徽章 */}
          <g ref={baselineBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 硬编码动作</text>
          </g>
          <g ref={candidateBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 命令对象</text>
          </g>

          {/* 舞台 */}
          <g ref={stageRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">演员 Bjørn</text>
            <line x1="120" y1="130" x2="400" y2="130" stroke="var(--border)" strokeWidth="1.4" />
            {[0, 1, 2].map((p) => (
              <text key={p} x={POS_X[p]} y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">x={p}</text>
            ))}
            {/* Bjørn（动画移动） */}
            <g ref={bjornRef} style={{ transform: `translateX(${POS_X[0]}px)` }}>
              <circle cx="0" cy="112" r="16" fill={ACCENT} fillOpacity="0.2" stroke={ACCENT} strokeWidth="2" />
              <text x="0" y="118" textAnchor="middle" fontSize="14">🧝</text>
            </g>

            {/* 动作序列卡片 */}
            <text x="60" y="190" fontSize="11" fontWeight="700" fill="var(--text-secondary)">动作序列</text>
            {["右移", "右移"].map((a, i) => (
              <g key={`act-${i}`} ref={(el) => { actionCardRefs.current[`a${i}`] = el; }} style={{ opacity: 1 }}>
                <rect x={60 + i * 90} y="200" width={80} height={36} rx="7" fill={ACCENT} fillOpacity="0.15" stroke={ACCENT} strokeWidth="1.4" />
                <text x={100 + i * 90} y="223" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>{a}</text>
              </g>
            ))}

            {/* undo 栈 */}
            <text x="420" y="190" fontSize="11" fontWeight="700" fill={OK_COLOR}>undo 栈</text>
            {["右移命令", "右移命令"].map((s, i) => (
              <g key={`stk-${i}`} ref={(el) => { stackItemRefs.current[`s${i}`] = el; }} style={{ opacity: 0 }}>
                <rect x="420" y={200 + i * 30} width={120} height={26} rx="5" fill={OK_COLOR} fillOpacity="0.16" stroke={OK_COLOR} strokeWidth="1.2" />
                <text x="480" y={217 + i * 30} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{s}</text>
              </g>
            ))}

            {/* 撤销按压指示 */}
            <g ref={undoPressRef} style={{ opacity: 0 }}>
              <rect x="60" y="260" width="120" height="32" rx="7" fill={WARN_COLOR} fillOpacity="0.12" stroke={WARN_COLOR} strokeWidth="1.4" />
              <text x="120" y="281" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>按“撤销”</text>
              <text x="200" y="281" fontSize="11" fill={WARN_COLOR}>→ 无记录，没反应</text>
            </g>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="320" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="347" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 硬编码：动作转瞬即逝，想撤销却没有任何记录</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="320" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="347" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 命令对象：弹出栈顶命令反向执行，逐步撤销回 x=0</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="320" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="345" fontSize="13" fontWeight="700" fill={OK_COLOR}>命令对象把“动作”变成“东西”：可撤销、可重做、可排队</text>
            <text x="76" y="367" fontSize="11" fill="var(--text-secondary)">代价是每个动作多一个对象；硬编码只适合不需要回退的简单场景</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（硬编码）执行后动作即逝，撤销不了；候选（命令对象）把动作入 undo 栈，可逐步撤销退回。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：硬编码动作执行后即消失，无法撤销；命令对象把每个动作封装成对象并入栈，获得撤销/重做/排队能力。
      </figcaption>
    </figure>
  );
}
