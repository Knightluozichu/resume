"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";
const WARN_COLOR = "#E5B567";
const T = TEACHING_BEAT_MS;

/* ============================================================
 * 图1 机制图：Q-learning 智能体-环境循环 + Q 表更新
 * ============================================================ */

const STEPS1: readonly TeachingStep[] = [
  { label: "state", caption: "智能体从环境观察当前状态 s" },
  { label: "select", caption: "按 ε-greedy 从 Q 表选动作 a（探索或利用）" },
  { label: "act", caption: "执行动作 a，环境返回奖励 r 与下一状态 s'" },
  { label: "td", caption: "计算 TD 误差 δ = r + γ·max Q(s',a') − Q(s,a)" },
  { label: "update", caption: "更新 Q(s,a) ← Q(s,a) + α·δ（改写 Q 表对应单元）" },
  { label: "insight", caption: "每个 episode 反复循环，Q 表收敛到最优策略" },
];
const LABEL1: Record<string, string> = Object.fromEntries(STEPS1.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc02QLearningLoopDiagram() {
  const agentRef = useRef<SVGGElement | null>(null);
  const selectRef = useRef<SVGGElement | null>(null);
  const actRef = useRef<SVGGElement | null>(null);
  const tdRef = useRef<SVGGElement | null>(null);
  const updateRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS1,
    build: (tl) => {
      tl.add(agentRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("state", 0);
      tl.add(selectRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("select", T);
      tl.add(actRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("act", T * 2);
      tl.add(tdRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("td", T * 3);
      tl.add(updateRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("update", T * 4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🔁</span> 机制
          </span>
        </div>
        <svg viewBox="0 0 720 460" role="img"
          aria-label="Q 学习智能体环境循环机制动画。智能体从环境观察当前状态 s，按 ε-greedy 从 Q 表选动作 a 探索或利用，执行动作后环境返回奖励 r 与下一状态 s'，计算 TD 误差 δ 等于 r 加 γ 乘 max Q s' a' 减 Q s a，更新 Q s a 等于 Q s a 加 α 乘 δ 改写 Q 表对应单元。每个 episode 反复循环，Q 表收敛到最优策略。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">机制：Q-learning 智能体-环境循环</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">观察状态 → 选动作 → 得奖励 → 算 TD 误差 → 更新 Q 表</text>

          {/* 智能体 */}
          <g ref={agentRef} style={{ opacity: 0 }}>
            <rect x="60" y="90" width="150" height="80" rx="12" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="2" />
            <text x="135" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>🤖 智能体</text>
            <text x="135" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">观察状态 s</text>
          </g>
          {/* 环境 */}
          <g ref={actRef} style={{ opacity: 0 }}>
            <rect x="510" y="90" width="150" height="80" rx="12" fill="#5AA9E6" fillOpacity="0.1" stroke="#5AA9E6" strokeWidth="1.8" />
            <text x="585" y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5AA9E6">🌍 环境</text>
            <text x="585" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">返回 r, s'</text>
          </g>
          {/* 选动作箭头 智能体→环境 */}
          <g ref={selectRef} style={{ opacity: 0 }}>
            <path d="M 210 110 L 508 110" fill="none" stroke={ACCENT} strokeWidth="1.8" markerEnd="url(#rlc02-arr)" />
            <text x="360" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>动作 a（ε-greedy）</text>
          </g>
          {/* 奖励箭头 环境→智能体 */}
          <g ref={tdRef} style={{ opacity: 0 }}>
            <path d="M 508 150 L 212 150" fill="none" stroke="#5AA9E6" strokeWidth="1.8" markerEnd="url(#rlc02-arr-b)" />
            <text x="360" y="168" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5AA9E6">奖励 r + 下一状态 s'</text>
          </g>

          {/* Q 表 + 更新 */}
          <g ref={updateRef} style={{ opacity: 0 }}>
            <text x="60" y="220" fontSize="11" fontWeight="700" fill="var(--text-secondary)">Q 表 [状态][动作]</text>
            {Array.from({ length: 3 }).map((_, r) =>
              Array.from({ length: 4 }).map((__, c) => (
                <rect key={`q-${r}-${c}`} x={60 + c * 56} y={230 + r * 34} width={52} height={30} rx="4"
                  fill={r === 1 && c === 2 ? OK_COLOR : "var(--text-secondary)"}
                  fillOpacity={r === 1 && c === 2 ? 0.3 : 0.06}
                  stroke={r === 1 && c === 2 ? OK_COLOR : "var(--border)"} strokeWidth={r === 1 && c === 2 ? 2 : 1} />
              )),
            )}
            <text x="300" y="252" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">δ = r + γ·max Q(s',a') − Q(s,a)</text>
            <text x="300" y="276" fontSize="11" fontWeight="700" fontFamily="monospace" fill={OK_COLOR}>Q(s,a) ← Q(s,a) + α·δ</text>
            <text x="300" y="298" fontSize="11" fill={OK_COLOR}>↑ 改写选中单元（绿）</text>
          </g>

          <defs>
            <marker id="rlc02-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={ACCENT} />
            </marker>
            <marker id="rlc02-arr-b" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5AA9E6" />
            </marker>
          </defs>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="356" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="380" fontSize="12" fontWeight="700" fill={OK_COLOR}>每个 episode 反复循环，Q 表逐渐收敛</text>
            <text x="56" y="400" fontSize="11" fill="var(--text-secondary)">最终 argmax_a Q(s,a) 给出最优策略；α 学习率、γ 折扣因子控制收敛</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL1}
          caption="Q-learning 是离策略 TD 控制：每步用 TD 误差更新 Q 表，循环往复直到 Q 收敛到最优策略。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Q-learning 通过智能体-环境循环与 TD 更新，逐步学到每个状态-动作的长期价值。
      </figcaption>
    </figure>
  );
}

/* ============================================================
 * 图2 取舍图：探索 vs 利用（ε-greedy）
 * ============================================================ */

const STEPS2: readonly TeachingStep[] = [
  { label: "greedy", caption: "纯利用（ε=0）：总是 argmax，只走已知最好的动作" },
  { label: "greedy-bad", caption: "风险：可能错过更好的动作，卡在局部最优" },
  { label: "random", caption: "纯探索（ε=1）：总是随机，永远不收敛、不积累" },
  { label: "eps", caption: "ε-greedy：以概率 ε 随机探索，否则 argmax 利用" },
  { label: "balance", caption: "兼顾：既发现更优动作，又利用已知好动作" },
  { label: "insight", caption: "实践：ε 随时间衰减——早期多探索，后期多利用" },
];
const LABEL2: Record<string, string> = Object.fromEntries(STEPS2.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc02ExploreExploitDiagram() {
  const greedyRef = useRef<SVGGElement | null>(null);
  const greedyBadRef = useRef<SVGGElement | null>(null);
  const randomRef = useRef<SVGGElement | null>(null);
  const epsRef = useRef<SVGGElement | null>(null);
  const balanceRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS2,
    build: (tl) => {
      tl.add(greedyRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("greedy", 0);
      tl.add(greedyBadRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("greedy-bad", T);
      tl.add(randomRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("random", T * 2);
      tl.add(epsRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("eps", T * 3);
      tl.add(balanceRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("balance", T * 4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚖️</span> 取舍
          </span>
        </div>
        <svg viewBox="0 0 720 460" role="img"
          aria-label="探索与利用取舍动画。纯利用 ε 等于 0 总是 argmax 只走已知最好的动作，风险是可能错过更好的动作卡在局部最优。纯探索 ε 等于 1 总是随机，永远不收敛不积累。ε-greedy 以概率 ε 随机探索否则 argmax 利用，兼顾发现更优动作与利用已知好动作。实践中 ε 随时间衰减，早期多探索后期多利用。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">取舍：探索 vs 利用（ε-greedy）</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">a = 随机合法动作（u&lt;ε） 或 argmax Q(s,a)（u≥ε）</text>

          {/* 纯利用 */}
          <g ref={greedyRef} style={{ opacity: 0 }}>
            <rect x="40" y="80" width="310" height="70" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.5" />
            <text x="56" y="104" fontSize="11" fontWeight="700" fill={WARN_COLOR}>纯利用（ε=0）</text>
            <text x="56" y="126" fontSize="11" fill="var(--text-primary)">总是 argmax_a Q(s,a)</text>
            <text x="56" y="142" fontSize="11" fill="var(--text-secondary)">只走已知最好</text>
          </g>
          <g ref={greedyBadRef} style={{ opacity: 0 }}>
            <rect x="40" y="158" width="310" height="46" rx="8" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.4" />
            <text x="56" y="186" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 可能错过更优动作 → 局部最优</text>
          </g>

          {/* 纯探索 */}
          <g ref={randomRef} style={{ opacity: 0 }}>
            <rect x="370" y="80" width="310" height="70" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.5" />
            <text x="386" y="104" fontSize="11" fontWeight="700" fill={WARN_COLOR}>纯探索（ε=1）</text>
            <text x="386" y="126" fontSize="11" fill="var(--text-primary)">总是随机合法动作</text>
            <text x="386" y="142" fontSize="11" fill={FAIL_COLOR}>✗ 永不收敛、不积累</text>
          </g>

          {/* ε-greedy */}
          <g ref={epsRef} style={{ opacity: 0 }}>
            <rect x="40" y="222" width="640" height="66" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="56" y="248" fontSize="12" fontWeight="700" fill={OK_COLOR}>ε-greedy：以概率 ε 探索，否则利用</text>
            <text x="56" y="272" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">u&lt;ε → 随机合法动作；u≥ε → argmax_a Q(s,a)</text>
          </g>
          <g ref={balanceRef} style={{ opacity: 0 }}>
            <text x="360" y="312" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>兼顾：发现更优动作 + 利用已知好动作</text>
          </g>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="336" width="640" height="56" rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x="56" y="360" fontSize="12" fontWeight="700" fill={ACCENT}>实践：ε 随时间衰减</text>
            <text x="56" y="380" fontSize="11" fill="var(--text-secondary)">早期多探索（认识环境），后期多利用（收割已知最优）</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL2}
          caption="纯利用会卡局部最优，纯探索不收敛；ε-greedy 以概率 ε 探索、否则利用，并让 ε 随时间衰减。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        探索-利用困境：ε-greedy 用一个小概率 ε 保持探索，其余时间利用当前最优。
      </figcaption>
    </figure>
  );
}

/* ============================================================
 * 图3 反例图：argmax 选了非法动作；复位：掩码非法动作
 * ============================================================ */

const STEPS3: readonly TeachingStep[] = [
  { label: "qrow", caption: "状态 s 的 Q 表行：各动作的 Q 值（含非法动作）" },
  { label: "legal", caption: "合法动作掩码：某些动作非法（如撞墙），不可执行" },
  { label: "correct", caption: "正确 argmax：只遍历合法动作 → 选合法中最大者" },
  { label: "fault", caption: "反例：argmax 遍历全部动作 → 选中 Q 最高的非法动作 ✗" },
  { label: "reset", caption: "复位：把非法动作 Q 置 −∞，argmax 只可能选合法动作 ✓" },
  { label: "insight", caption: "不变量：argmax 只遍历合法动作，非法动作永远不被选" },
];
const LABEL3: Record<string, string> = Object.fromEntries(STEPS3.map((s) => [s.label, s.caption ?? s.label]));

const ACTIONS = [
  { name: "上", q: 0.3, legal: true },
  { name: "下", q: 0.5, legal: true },
  { name: "左", q: 0.9, legal: false },
  { name: "右", q: 0.4, legal: true },
];

export function Rlc02IllegalArgmaxDiagram() {
  const qrowRef = useRef<SVGGElement | null>(null);
  const legalRef = useRef<SVGGElement | null>(null);
  const correctRef = useRef<SVGGElement | null>(null);
  const faultRef = useRef<SVGGElement | null>(null);
  const resetRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS3,
    build: (tl) => {
      tl.add(qrowRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("qrow", 0);
      tl.add(legalRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("legal", T);
      tl.add(correctRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("correct", T * 2);
      tl.add(faultRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("fault", T * 3);
      tl.add(resetRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("reset", T * 4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧪</span> 反例与复位
          </span>
        </div>
        <svg viewBox="0 0 720 460" role="img"
          aria-label="argmax 非法动作反例动画。状态 s 的 Q 表行列出各动作 Q 值，其中左动作 Q 最高 0.9 但非法如撞墙。合法动作掩码标明某些动作非法不可执行。正确 argmax 只遍历合法动作，选合法中最大的下动作 0.5。反例是 argmax 遍历全部动作，选中 Q 最高的非法动作左，导致无效转移。复位是把非法动作 Q 置负无穷，argmax 只可能选合法动作。不变量是 argmax 只遍历合法动作。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">反例：argmax 选非法动作；复位：掩码非法动作</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">选动作时只能从合法动作里挑最大的</text>

          {/* Q 表行 */}
          <g ref={qrowRef} style={{ opacity: 0 }}>
            <text x="40" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">状态 s 的 Q 表行</text>
            {ACTIONS.map((a, i) => (
              <g key={a.name}>
                <rect x={40 + i * 120} y={96} width={108} height={54} rx="8" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.3" />
                <text x={94 + i * 120} y={118} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{a.name}</text>
                <text x={94 + i * 120} y={140} textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--text-primary)">Q={a.q}</text>
              </g>
            ))}
          </g>

          {/* 合法掩码 */}
          <g ref={legalRef} style={{ opacity: 0 }}>
            {ACTIONS.map((a, i) => (
              <text key={`leg-${a.name}`} x={94 + i * 120} y={170} textAnchor="middle" fontSize="11" fontWeight="700"
                fill={a.legal ? OK_COLOR : FAIL_COLOR}>{a.legal ? "合法 ✓" : "非法 ✗"}</text>
            ))}
            <text x="40" y="196" fontSize="11" fill="var(--text-secondary)">「左」Q 最高(0.9)但非法（撞墙）</text>
          </g>

          {/* 正确 */}
          <g ref={correctRef} style={{ opacity: 0 }}>
            <rect x="40" y="212" width="640" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="234" fontSize="11" fontWeight="700" fill={OK_COLOR}>✓ 正确 argmax：只遍历合法动作</text>
            <text x="56" y="254" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">合法中最大 = 下(0.5) → 选「下」</text>
          </g>

          {/* 反例 */}
          <g ref={faultRef} style={{ opacity: 0 }}>
            <rect x="40" y="272" width="640" height="50" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1.8" />
            <text x="56" y="294" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 反例：argmax 遍历全部动作</text>
            <text x="56" y="314" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">全局最大 = 左(0.9) → 选非法「左」→ 无效转移</text>
          </g>

          {/* 复位 */}
          <g ref={resetRef} style={{ opacity: 0 }}>
            <rect x="40" y="332" width="640" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.8" />
            <text x="56" y="354" fontSize="11" fontWeight="700" fill={OK_COLOR}>✓ 复位：非法动作 Q 置 −∞（mask）</text>
            <text x="56" y="374" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">左 → −∞，argmax 只能选合法动作</text>
          </g>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="392" width="640" height="40" rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x="360" y="417" textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>不变量：argmax 只遍历合法动作，非法动作永不被选</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL3}
          caption="若 argmax 不区分合法/非法，会选中 Q 最高的非法动作。复位做法是把非法动作 Q 掩为 −∞。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：动作选择必须在合法动作掩码内取 argmax，否则智能体会尝试非法动作。
      </figcaption>
    </figure>
  );
}
