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
 * 图1 机制图：DQN 循环（状态→网络→Q值→动作→TD目标→更新）
 * ============================================================ */

const STEPS1: readonly TeachingStep[] = [
  { label: "state", caption: "状态 s → 特征向量 x(s)（如游戏像素/传感器）" },
  { label: "netq", caption: "神经网络 f_θ 输出各动作的网络 Q 值 q(s;θ)" },
  { label: "action", caption: "在网络输出上 ε-greedy 选动作 a 并执行" },
  { label: "target", caption: "计算 TD 目标 y = r + γ·max Q(s',a';θ)" },
  { label: "loss", caption: "损失 L = ½(y − Q(s,a;θ))²，梯度更新 θ ← θ − η·∇L" },
  { label: "insight", caption: "深度 RL = Q-learning + 神经网络函数近似，端到端训练" },
];
const LABEL1: Record<string, string> = Object.fromEntries(STEPS1.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc04DqnLoopDiagram() {
  const stateRef = useRef<SVGGElement | null>(null);
  const netqRef = useRef<SVGGElement | null>(null);
  const actionRef = useRef<SVGGElement | null>(null);
  const targetRef = useRef<SVGGElement | null>(null);
  const lossRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS1,
    build: (tl) => {
      tl.add(stateRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("state", 0);
      tl.add(netqRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("netq", T);
      tl.add(actionRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("action", T * 2);
      tl.add(targetRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("target", T * 3);
      tl.add(lossRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("loss", T * 4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🤖</span> 机制
          </span>
        </div>
        <svg viewBox="0 0 720 460" role="img"
          aria-label="DQN 循环机制动画。状态 s 转为特征向量 x s 如游戏像素或传感器，神经网络 f θ 输出各动作的网络 Q 值 q s θ，在网络输出上 ε-greedy 选动作 a 并执行，计算 TD 目标 y 等于 r 加 γ 乘 max Q s' a' θ，损失 L 等于 ½ 乘 y 减 Q s a θ 的平方，梯度更新 θ 等于 θ 减 η 乘 ∇L。深度强化学习等于 Q-learning 加神经网络函数近似，端到端训练。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">机制：DQN 深度强化学习循环</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">神经网络近似 Q(s,a;θ)，用 TD 目标做梯度下降训练</text>

          {/* 状态 */}
          <g ref={stateRef} style={{ opacity: 0 }}>
            <rect x="40" y="90" width="150" height="70" rx="10" fill="#5AA9E6" fillOpacity="0.1" stroke="#5AA9E6" strokeWidth="1.6" />
            <text x="115" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5AA9E6">状态 s</text>
            <text x="115" y="142" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">→ x(s) 特征</text>
          </g>
          {/* 网络 */}
          <g ref={netqRef} style={{ opacity: 0 }}>
            <rect x="240" y="80" width="200" height="90" rx="10" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="2" />
            <text x="340" y="106" textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>神经网络 f_θ</text>
            {[0, 1, 2].map((c) =>
              [0, 1].map((r) => (
                <circle key={`nn-${c}-${r}`} cx={280 + c * 40} cy={128 + r * 22} r="6" fill={ACCENT} fillOpacity="0.3" stroke={ACCENT} strokeWidth="1" />
              )),
            )}
            <text x="340" y="164" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">q(s;θ) = [Q(a₀),Q(a₁),...]</text>
          </g>
          {/* 动作 */}
          <g ref={actionRef} style={{ opacity: 0 }}>
            <rect x="490" y="90" width="190" height="70" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="585" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>选动作 a</text>
            <text x="585" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ε-greedy(argmax q)</text>
          </g>
          <path d="M 190 125 L 238 125" fill="none" stroke="var(--border)" strokeWidth="1.4" markerEnd="url(#rlc04-arr)" />
          <path d="M 440 125 L 488 125" fill="none" stroke="var(--border)" strokeWidth="1.4" markerEnd="url(#rlc04-arr)" />

          {/* TD 目标 */}
          <g ref={targetRef} style={{ opacity: 0 }}>
            <rect x="40" y="210" width="640" height="48" rx="10" fill="#C792EA" fillOpacity="0.1" stroke="#C792EA" strokeWidth="1.5" />
            <text x="360" y="240" textAnchor="middle" fontSize="12" fontFamily="monospace" fill="var(--text-primary)">TD 目标 y = r + γ·max Q(s',a';θ)</text>
          </g>
          {/* 损失 + 更新 */}
          <g ref={lossRef} style={{ opacity: 0 }}>
            <rect x="40" y="272" width="640" height="60" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="56" y="296" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">损失 L = ½(y − Q(s,a;θ))²</text>
            <text x="56" y="318" fontSize="11" fontWeight="700" fontFamily="monospace" fill={WARN_COLOR}>θ ← θ − η·∇_θ L（梯度下降训练网络）</text>
          </g>

          <defs>
            <marker id="rlc04-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--border)" />
            </marker>
          </defs>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="352" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="376" fontSize="12" fontWeight="700" fill={OK_COLOR}>深度 RL = Q-learning + 神经网络函数近似</text>
            <text x="56" y="396" fontSize="11" fill="var(--text-secondary)">用 TD 目标当监督信号，端到端训练网络参数 θ</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL1}
          caption="DQN 用神经网络输出各动作 Q 值，以 TD 目标为监督信号做梯度下降，端到端学习价值函数。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DQN：神经网络近似 Q(s,a;θ)，用 TD 目标 y 与损失 L 训练，实现深度强化学习。
      </figcaption>
    </figure>
  );
}

/* ============================================================
 * 图2 取舍图：朴素在线 DQN（不稳） vs 经验回放+目标网络（稳）
 * ============================================================ */

const STEPS2: readonly TeachingStep[] = [
  { label: "online", caption: "朴素在线 DQN：用连续采样的转移立即更新网络" },
  { label: "corr", caption: "问题①：相邻样本高度相关 → 学习有偏、震荡" },
  { label: "moving", caption: "问题②：TD 目标用正在更新的网络 → 目标漂移" },
  { label: "replay", caption: "经验回放：存转移进缓冲，随机采样打破相关" },
  { label: "targetnet", caption: "目标网络 θ⁻：定期拷贝，区间内目标固定" },
  { label: "insight", caption: "取舍：回放+目标网络让训练稳定，代价是额外内存与计算" },
];
const LABEL2: Record<string, string> = Object.fromEntries(STEPS2.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc04ReplayTargetDiagram() {
  const onlineRef = useRef<SVGGElement | null>(null);
  const corrRef = useRef<SVGGElement | null>(null);
  const movingRef = useRef<SVGGElement | null>(null);
  const replayRef = useRef<SVGGElement | null>(null);
  const targetnetRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS2,
    build: (tl) => {
      tl.add(onlineRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("online", 0);
      tl.add(corrRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("corr", T);
      tl.add(movingRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("moving", T * 2);
      tl.add(replayRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("replay", T * 3);
      tl.add(targetnetRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("targetnet", T * 4);
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
          aria-label="经验回放与目标网络取舍动画。朴素在线 DQN 用连续采样的转移立即更新网络。问题一是相邻样本高度相关学习有偏震荡。问题二是 TD 目标用正在更新的网络导致目标漂移。经验回放把转移存进缓冲随机采样打破相关。目标网络 θ 负定期拷贝，区间内目标固定。取舍是回放加目标网络让训练稳定，代价是额外内存与计算。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">取舍：朴素在线 DQN vs 经验回放+目标网络</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">两个技巧让深度 Q 学习稳定收敛</text>

          <g ref={onlineRef} style={{ opacity: 0 }}>
            <rect x="40" y="76" width="640" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.08" stroke={FAIL_COLOR} strokeWidth="1.4" />
            <text x="360" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>朴素在线 DQN：连续采样 → 立即更新</text>
          </g>
          <g ref={corrRef} style={{ opacity: 0 }}>
            <rect x="40" y="128" width="310" height="56" rx="8" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.4" />
            <text x="56" y="150" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 问题①：样本相关</text>
            <text x="56" y="170" fontSize="11" fill="var(--text-secondary)">相邻帧高度相关 → 学习有偏、震荡</text>
          </g>
          <g ref={movingRef} style={{ opacity: 0 }}>
            <rect x="370" y="128" width="310" height="56" rx="8" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.4" />
            <text x="386" y="150" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 问题②：目标漂移</text>
            <text x="386" y="170" fontSize="11" fill="var(--text-secondary)">目标用同一网络 → 边追边动</text>
          </g>

          <g ref={replayRef} style={{ opacity: 0 }}>
            <rect x="40" y="200" width="310" height="66" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="56" y="224" fontSize="11" fontWeight="700" fill={OK_COLOR}>✓ 经验回放</text>
            <text x="56" y="244" fontSize="11" fill="var(--text-secondary)">转移存入缓冲区，随机采样小批量</text>
            <text x="56" y="258" fontSize="11" fill={OK_COLOR}>打破样本相关</text>
          </g>
          <g ref={targetnetRef} style={{ opacity: 0 }}>
            <rect x="370" y="200" width="310" height="66" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="386" y="224" fontSize="11" fontWeight="700" fill={OK_COLOR}>✓ 目标网络 θ⁻</text>
            <text x="386" y="244" fontSize="11" fill="var(--text-secondary)">定期把 θ 拷贝给 θ⁻</text>
            <text x="386" y="258" fontSize="11" fill={OK_COLOR}>区间内 TD 目标固定</text>
          </g>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="286" width="640" height="56" rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x="56" y="310" fontSize="12" fontWeight="700" fill={ACCENT}>回放 + 目标网络 → 训练稳定收敛</text>
            <text x="56" y="330" fontSize="11" fill="var(--text-secondary)">代价：回放缓冲占内存、目标网络需定期同步</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL2}
          caption="朴素在线 DQN 因样本相关与目标漂移而不稳；经验回放打破相关、目标网络固定目标，二者带来稳定。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        DQN 的两大稳定技巧：经验回放（打破相关）+ 目标网络（固定 TD 目标）。
      </figcaption>
    </figure>
  );
}

/* ============================================================
 * 图3 反例图：移动目标（目标追自己）→ 发散；复位：目标网络固定
 * ============================================================ */

const STEPS3: readonly TeachingStep[] = [
  { label: "setup", caption: "同一网络 θ 既算预测 Q(s,a;θ)，又算目标 y = r + γ·max Q(s';θ)" },
  { label: "normal", caption: "若目标固定：预测逐步逼近目标，收敛" },
  { label: "fault", caption: "反例：目标与预测共用 θ —— 更新 θ 会同时移动目标" },
  { label: "chase", caption: "目标'追自己' → 预测与目标一起漂 → 震荡/发散 ✗" },
  { label: "reset", caption: "复位：目标网络 θ⁻（定期拷贝 θ），区间内目标固定 ✓" },
  { label: "insight", caption: "不变量：让 TD 目标在区间内固定，别让它追自己" },
];
const LABEL3: Record<string, string> = Object.fromEntries(STEPS3.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc04MovingTargetDiagram() {
  const setupRef = useRef<SVGGElement | null>(null);
  const normalRef = useRef<SVGGElement | null>(null);
  const faultRef = useRef<SVGGElement | null>(null);
  const chaseRef = useRef<SVGGElement | null>(null);
  const resetRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS3,
    build: (tl) => {
      tl.add(setupRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("setup", 0);
      tl.add(normalRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("normal", T);
      tl.add(faultRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("fault", T * 2);
      tl.add(chaseRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("chase", T * 3);
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
          aria-label="移动目标反例动画。同一网络 θ 既算预测 Q s a θ 又算目标 y 等于 r 加 γ 乘 max Q s' θ。若目标固定，预测逐步逼近目标收敛。反例是目标与预测共用 θ，更新 θ 会同时移动目标。目标追自己导致预测与目标一起漂，震荡或发散。复位是目标网络 θ 负定期拷贝 θ，区间内目标固定。不变量是让 TD 目标在区间内固定别让它追自己。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">反例：移动目标追自己 → 发散；复位：目标网络固定</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">预测和目标若共用同一套权重，更新会同时移动两者</text>

          <g ref={setupRef} style={{ opacity: 0 }}>
            <rect x="40" y="70" width="640" height="48" rx="10" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.4" />
            <text x="360" y="92" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">预测 Q(s,a;θ) 与 目标 y = r + γ·max Q(s';θ)</text>
            <text x="360" y="110" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">若都用同一 θ……</text>
          </g>

          {/* 正常：固定目标收敛 */}
          <g ref={normalRef} style={{ opacity: 0 }}>
            <rect x="40" y="130" width="310" height="70" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="56" y="154" fontSize="11" fontWeight="700" fill={OK_COLOR}>目标固定时</text>
            <line x1="60" y1="188" x2="330" y2="188" stroke="var(--border)" strokeWidth="1" />
            <line x1="60" y1="188" x2="60" y2="164" stroke="var(--border)" strokeWidth="1" />
            <line x1="60" y1="172" x2="330" y2="172" stroke={OK_COLOR} strokeWidth="1.4" strokeDasharray="4 3" />
            <path d="M 60 186 Q 160 184 320 173" fill="none" stroke="#5AA9E6" strokeWidth="2" />
            <text x="200" y="166" fontSize="11" fill={OK_COLOR}>目标(固定)</text>
          </g>

          {/* 反例：移动目标 */}
          <g ref={faultRef} style={{ opacity: 0 }}>
            <rect x="370" y="130" width="310" height="70" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="386" y="154" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 反例：目标与预测共用 θ</text>
            <text x="386" y="176" fontSize="11" fill="var(--text-secondary)">更新 θ → 目标也跟着动</text>
            <text x="386" y="192" fontSize="11" fill={FAIL_COLOR}>目标"逃跑"，预测追不上</text>
          </g>
          <g ref={chaseRef} style={{ opacity: 0 }}>
            <rect x="40" y="212" width="640" height="50" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1.8" />
            <text x="56" y="234" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 预测与目标一起漂 → 震荡 / 发散，训练不收敛</text>
            <text x="56" y="254" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">Q 值忽大忽小，损失不下降</text>
          </g>

          {/* 复位 */}
          <g ref={resetRef} style={{ opacity: 0 }}>
            <rect x="40" y="274" width="640" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.8" />
            <text x="56" y="298" fontSize="11" fontWeight="700" fill={OK_COLOR}>✓ 复位：目标网络 θ⁻，定期 θ⁻ ← θ</text>
            <text x="56" y="320" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">y = r + γ·max Q(s';θ⁻) —— 区间内目标固定，预测稳定逼近</text>
          </g>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="346" width="640" height="44" rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x="360" y="373" textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>不变量：让 TD 目标在区间内固定，别让它追自己</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL3}
          caption="预测与目标共用权重会让目标'追自己'而发散。复位做法是引入目标网络 θ⁻，区间内固定目标。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：移动目标导致 DQN 发散，目标网络通过定期同步权重把目标固定下来。
      </figcaption>
    </figure>
  );
}
