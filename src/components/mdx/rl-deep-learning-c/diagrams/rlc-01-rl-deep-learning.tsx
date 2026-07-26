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
const T = TEACHING_BEAT_MS;

/* ============================================================
 * 图1 机制图：概念层级 AI ⊃ ML ⊃ RL，神经网络→深度学习，汇聚为深度强化学习
 * ============================================================ */

const STEPS1: readonly TeachingStep[] = [
  { label: "ai", caption: "人工智能（AI）：让机器表现出智能行为的最大范畴" },
  { label: "ml", caption: "机器学习（ML）⊂ AI：从数据中自动学习规律，而非手写规则" },
  { label: "rl", caption: "强化学习（RL）⊂ ML：通过与环境交互、试错、最大化累计奖励来学习" },
  { label: "nn", caption: "神经网络 → 深度学习（DL）：层数多的神经网络，能近似复杂函数" },
  { label: "drl", caption: "深度强化学习（DRL）= RL + DL：用神经网络近似 Q(s,a) 价值函数" },
  { label: "insight", caption: "深度学习只承担'函数近似'，不改变 RL 的目标——最大化累计奖励 G_t" },
];
const LABEL1: Record<string, string> = Object.fromEntries(STEPS1.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc01ConceptHierarchyDiagram() {
  const aiRef = useRef<SVGGElement | null>(null);
  const mlRef = useRef<SVGGElement | null>(null);
  const rlRef = useRef<SVGGElement | null>(null);
  const nnRef = useRef<SVGGElement | null>(null);
  const drlRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS1,
    build: (tl) => {
      tl.add(aiRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("ai", 0);
      tl.add(mlRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("ml", T);
      tl.add(rlRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("rl", T * 2);
      tl.add(nnRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("nn", T * 3);
      tl.add(drlRef.current!, { opacity: [0, 1], scale: [0.7, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("drl", T * 4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧠</span> 机制
          </span>
        </div>
        <svg viewBox="0 0 720 460" role="img"
          aria-label="概念层级机制动画。人工智能是最大范畴，机器学习是它的子集即从数据中学习，强化学习又是机器学习的子集即通过交互试错最大化累计奖励。另一条线是神经网络到深度学习，层数多的神经网络能近似复杂函数。深度强化学习等于强化学习加深度学习，用神经网络近似 Q s a 价值函数。深度学习只承担函数近似，不改变强化学习最大化累计奖励的目标。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">概念层级：从 AI 到深度强化学习</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">AI ⊃ ML ⊃ RL；神经网络→深度学习；二者结合为深度强化学习</text>

          {/* 同心圆 AI ⊃ ML ⊃ RL */}
          <g ref={aiRef} style={{ opacity: 0 }}>
            <circle cx="200" cy="200" r="130" fill={ACCENT} fillOpacity="0.05" stroke={ACCENT} strokeWidth="1.6" />
            <text x="200" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>人工智能 AI</text>
          </g>
          <g ref={mlRef} style={{ opacity: 0 }}>
            <circle cx="200" cy="220" r="92" fill="#5AA9E6" fillOpacity="0.08" stroke="#5AA9E6" strokeWidth="1.6" />
            <text x="200" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5AA9E6">机器学习 ML</text>
          </g>
          <g ref={rlRef} style={{ opacity: 0 }}>
            <circle cx="200" cy="245" r="55" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="200" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>强化学习</text>
            <text x="200" y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>RL</text>
          </g>

          {/* 神经网络 → 深度学习 */}
          <g ref={nnRef} style={{ opacity: 0 }}>
            <rect x="420" y="110" width="260" height="120" rx="12" fill="#C792EA" fillOpacity="0.08" stroke="#C792EA" strokeWidth="1.6" />
            <text x="550" y="136" textAnchor="middle" fontSize="12" fontWeight="700" fill="#C792EA">神经网络 → 深度学习 DL</text>
            {[0, 1, 2, 3].map((c) =>
              [0, 1, 2].map((r) => (
                <circle key={`${c}-${r}`} cx={460 + c * 60} cy={165 + r * 22} r="7" fill="#C792EA" fillOpacity="0.3" stroke="#C792EA" strokeWidth="1" />
              )),
            )}
            <text x="550" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">层数多 → 近似复杂函数</text>
          </g>

          {/* 深度强化学习 = RL + DL */}
          <g ref={drlRef} style={{ opacity: 0 }}>
            <rect x="420" y="250" width="260" height="70" rx="12" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="2.4" />
            <text x="550" y="278" textAnchor="middle" fontSize="13" fontWeight="700" fill={ACCENT}>深度强化学习 DRL</text>
            <text x="550" y="300" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">Q(s,a) ≈ 神经网络</text>
            <path d="M 255 245 Q 340 285 418 285" fill="none" stroke={OK_COLOR} strokeWidth="1.6" strokeDasharray="4 3" />
            <path d="M 550 230 L 550 248" fill="none" stroke="#C792EA" strokeWidth="1.6" strokeDasharray="4 3" />
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="360" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="384" fontSize="12" fontWeight="700" fill={OK_COLOR}>深度学习只做函数近似，不改变 RL 的目标</text>
            <text x="56" y="404" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">目标仍是最大化累计奖励 G_t = Σ γᵏ r_(t+k+1)</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL1}
          caption="AI⊃ML⊃RL；神经网络发展为深度学习；深度强化学习用神经网络近似价值函数，但目标仍是最大化累计奖励。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        深度强化学习 = 强化学习（最大化累计奖励）+ 深度学习（神经网络函数近似）。
      </figcaption>
    </figure>
  );
}

/* ============================================================
 * 图2 取舍图：表格型 Q-learning（精确但不扩展） vs 深度 RL（近似但可扩展）
 * ============================================================ */

const STEPS2: readonly TeachingStep[] = [
  { label: "table", caption: "表格型：Q 表为每个 (状态, 动作) 存一个值，精确无误" },
  { label: "small", caption: "小状态空间没问题：100 状态 × 4 动作 = 400 个表格单元" },
  { label: "explode", caption: "大状态空间爆炸：10⁶ 状态 × 4 动作 = 4×10⁶ 单元，内存与样本都不够" },
  { label: "net", caption: "深度 RL：神经网络输入状态，输出各动作的 Q 值（参数固定）" },
  { label: "scale", caption: "同样的大状态空间，网络只用约 1 万个权重即可泛化" },
  { label: "insight", caption: "取舍：表格精确但不扩展；网络可扩展但是近似、需训练" },
];
const LABEL2: Record<string, string> = Object.fromEntries(STEPS2.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc01TabularVsDeepDiagram() {
  const tableRef = useRef<SVGGElement | null>(null);
  const smallRef = useRef<SVGGElement | null>(null);
  const explodeRef = useRef<SVGGElement | null>(null);
  const netRef = useRef<SVGGElement | null>(null);
  const scaleRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS2,
    build: (tl) => {
      tl.add(tableRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("table", 0);
      tl.add(smallRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("small", T);
      tl.add(explodeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("explode", T * 2);
      tl.add(netRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("net", T * 3);
      tl.add(scaleRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("scale", T * 4);
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
          aria-label="表格型与深度强化学习的取舍动画。表格型 Q 学习为每个状态动作对存一个值，精确无误；小状态空间如 100 状态乘 4 动作只需 400 个单元没问题；但大状态空间如 10 的 6 次方状态乘 4 动作需要 4 百万单元，内存与样本都不够而爆炸。深度强化学习用神经网络输入状态输出各动作 Q 值，参数固定；同样的大状态空间只需约 1 万个权重即可泛化。取舍是表格精确但不扩展，网络可扩展但是近似且需训练。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">取舍：表格型 Q 学习 vs 深度强化学习</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">精确但不扩展 vs 近似但可扩展</text>

          {/* 表格型 */}
          <g ref={tableRef} style={{ opacity: 0 }}>
            <text x="40" y="86" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>表格型 Q-learning（baseline）</text>
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 6 }).map((__, c) => (
                <rect key={`cell-${r}-${c}`} x={40 + c * 30} y={96 + r * 26} width={28} height={24} rx="3" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1" />
              )),
            )}
            <text x="40" y="222" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">Q[状态][动作]：每格一个值</text>
          </g>
          <g ref={smallRef} style={{ opacity: 0 }}>
            <rect x="240" y="96" width="200" height="40" rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="252" y="114" fontSize="11" fill="var(--text-primary)">小空间：100 状态 × 4 动作</text>
            <text x="252" y="130" fontSize="11" fontWeight="700" fill={OK_COLOR}>= 400 单元 ✓ 没问题</text>
          </g>
          <g ref={explodeRef} style={{ opacity: 0 }}>
            <rect x="240" y="150" width="200" height="56" rx="8" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="252" y="170" fontSize="11" fill="var(--text-primary)">大空间：10⁶ 状态 × 4 动作</text>
            <text x="252" y="188" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>= 4×10⁶ 单元 ✗ 爆炸</text>
            <text x="252" y="202" fontSize="11" fill="var(--text-secondary)">内存不够、样本不够</text>
          </g>

          {/* 深度 RL */}
          <g ref={netRef} style={{ opacity: 0 }}>
            <text x="480" y="86" fontSize="11" fontWeight="700" fill={ACCENT}>深度 RL（candidate）</text>
            <rect x="480" y="96" width="200" height="110" rx="10" fill={ACCENT} fillOpacity="0.08" stroke={ACCENT} strokeWidth="1.6" />
            <text x="492" y="118" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">state → [Q(a₀),Q(a₁),...]</text>
            {[0, 1, 2].map((c) =>
              [0, 1, 2].map((r) => (
                <circle key={`n-${c}-${r}`} cx={510 + c * 50} cy={140 + r * 20} r="6" fill={ACCENT} fillOpacity="0.3" stroke={ACCENT} strokeWidth="1" />
              )),
            )}
            <text x="492" y="196" fontSize="11" fill="var(--text-secondary)">神经网络近似 Q(s,a)</text>
          </g>
          <g ref={scaleRef} style={{ opacity: 0 }}>
            <rect x="480" y="216" width="200" height="40" rx="8" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="492" y="234" fontSize="11" fill="var(--text-primary)">同样 10⁶ 状态</text>
            <text x="492" y="250" fontSize="11" fontWeight="700" fill={OK_COLOR}>≈ 1 万权重 ✓ 可泛化</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="290" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="314" fontSize="12" fontWeight="700" fill={OK_COLOR}>表格精确但不扩展；网络可扩展但是近似、需训练</text>
            <text x="56" y="334" fontSize="11" fill="var(--text-secondary)">状态空间大（如游戏像素）时，用神经网络近似价值函数才可行</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL2}
          caption="表格型 Q 学习精确但随状态数爆炸；深度 RL 用固定参数的神经网络泛化到大状态空间，代价是近似与训练。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态空间巨大时，表格型 Q 学习不可行，深度强化学习用神经网络函数近似突破维数灾难。
      </figcaption>
    </figure>
  );
}

/* ============================================================
 * 图3 反例图：终止状态仍 bootstrap → Q 值漂移；复位：终止时切断 bootstrap
 * ============================================================ */

const STEPS3: readonly TeachingStep[] = [
  { label: "formula", caption: "TD 更新：Q(s,a) ← Q(s,a) + α·δ，其中 δ = r + γ·max Q(s',a') − Q(s,a)" },
  { label: "normal", caption: "正常转移 s→s'（非终止）：δ 含 γ·max Q(s',a')，Q 正确更新" },
  { label: "terminal", caption: "若 s' 是终止状态：没有未来奖励，正确目标应只有 r" },
  { label: "fault", caption: "反例：终止状态仍 bootstrap，加入 γ·max Q(终止)（垃圾值）→ Q 漂移失真 ✗" },
  { label: "reset", caption: "复位：终止时切断 bootstrap，δ = r − Q(s,a)，Q 收敛正确 ✓" },
  { label: "insight", caption: "不变量：终止状态没有未来奖励，必须把自举项掩掉" },
];
const LABEL3: Record<string, string> = Object.fromEntries(STEPS3.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc01TdBootstrapFailureDiagram() {
  const formulaRef = useRef<SVGGElement | null>(null);
  const normalRef = useRef<SVGGElement | null>(null);
  const terminalRef = useRef<SVGGElement | null>(null);
  const faultRef = useRef<SVGGElement | null>(null);
  const resetRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS3,
    build: (tl) => {
      tl.add(formulaRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("formula", 0);
      tl.add(normalRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("normal", T);
      tl.add(terminalRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("terminal", T * 2);
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
          aria-label="TD 更新终止状态自举反例动画。TD 更新公式 Q s a 等于 Q s a 加 α 乘 δ，δ 等于 r 加 γ 乘 max Q s' a' 减 Q s a。正常转移 s 到 s' 非终止时 δ 含未来自举项，Q 正确更新。若 s' 是终止状态则没有未来奖励，正确目标应只有 r。反例是终止状态仍然自举，加入 γ 乘 max Q 终止这个垃圾值，导致 Q 漂移失真。复位是终止时切断自举，δ 等于 r 减 Q s a，Q 收敛正确。不变量是终止状态没有未来奖励必须把自举项掩掉。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">反例：终止状态仍自举 → Q 漂移；复位：切断自举</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">终止状态没有未来奖励，TD 目标必须去掉 γ·max Q(s',a') 项</text>

          {/* 公式 */}
          <g ref={formulaRef} style={{ opacity: 0 }}>
            <rect x="40" y="70" width="640" height="48" rx="10" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.4" />
            <text x="360" y="100" textAnchor="middle" fontSize="13" fontFamily="monospace" fill="var(--text-primary)">Q(s,a) ← Q(s,a) + α·[ r + γ·max Q(s',a') − Q(s,a) ]</text>
          </g>

          {/* 正常 */}
          <g ref={normalRef} style={{ opacity: 0 }}>
            <rect x="40" y="134" width="310" height="64" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="56" y="158" fontSize="11" fontWeight="700" fill={OK_COLOR}>正常：s → s'（非终止）</text>
            <text x="56" y="180" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">δ = r + γ·max Q(s',a') − Q(s,a)</text>
          </g>

          {/* 终止 */}
          <g ref={terminalRef} style={{ opacity: 0 }}>
            <rect x="370" y="134" width="310" height="64" rx="10" fill="#5AA9E6" fillOpacity="0.1" stroke="#5AA9E6" strokeWidth="1.5" />
            <text x="386" y="158" fontSize="11" fontWeight="700" fill="#5AA9E6">s' 是终止状态</text>
            <text x="386" y="180" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">无未来奖励 → 目标应只有 r</text>
          </g>

          {/* 反例 */}
          <g ref={faultRef} style={{ opacity: 0 }}>
            <rect x="40" y="214" width="640" height="64" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1.8" />
            <text x="56" y="238" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 反例：终止仍自举，加入 γ·max Q(终止)（未初始化/垃圾值）</text>
            <text x="56" y="260" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">δ = r + γ·max Q(终止) − Q(s,a) → Q 值漂移、训练不收敛</text>
          </g>

          {/* 复位 */}
          <g ref={resetRef} style={{ opacity: 0 }}>
            <rect x="40" y="294" width="640" height="64" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.8" />
            <text x="56" y="318" fontSize="11" fontWeight="700" fill={OK_COLOR}>✓ 复位：终止时掩掉自举项（done ? 0 : γ·max Q(s',a')）</text>
            <text x="56" y="340" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">δ = r − Q(s,a) → Q 收敛到正确价值</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="374" width="640" height="44" rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x="360" y="401" textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>不变量：终止状态没有未来奖励，必须把自举项掩掉</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL3}
          caption="终止状态没有未来奖励。若仍自举会引入垃圾值使 Q 漂移；复位做法是终止时把 γ·max Q(s',a') 掩掉。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：终止状态继续 bootstrap 是常见 bug，用 done 标志掩掉自举项即可修复。
      </figcaption>
    </figure>
  );
}
