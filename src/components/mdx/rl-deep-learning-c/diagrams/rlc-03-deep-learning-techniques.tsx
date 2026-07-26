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
 * 图1 机制图：分层神经网络前向传播
 * ============================================================ */

const STEPS1: readonly TeachingStep[] = [
  { label: "input", caption: "输入层：特征 x_i 进入网络" },
  { label: "neuron", caption: "神经元加权求和：z_j = Σ w_ji·x_i + b_j" },
  { label: "activate", caption: "激活函数：y_j = f(z_j)（如 sigmoid/ReLU）引入非线性" },
  { label: "hidden", caption: "隐藏层逐层重复同样计算，层数多即'深度'" },
  { label: "output", caption: "输出层给出最终结果（多输出对应多个 Q 值/类别）" },
  { label: "insight", caption: "前向传播：数据自输入经各层'加权+激活'流向输出" },
];
const LABEL1: Record<string, string> = Object.fromEntries(STEPS1.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc03ForwardPassDiagram() {
  const inputRef = useRef<SVGGElement | null>(null);
  const neuronRef = useRef<SVGGElement | null>(null);
  const activateRef = useRef<SVGGElement | null>(null);
  const hiddenRef = useRef<SVGGElement | null>(null);
  const outputRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS1,
    build: (tl) => {
      tl.add(inputRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("input", 0);
      tl.add(neuronRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("neuron", T);
      tl.add(activateRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("activate", T * 2);
      tl.add(hiddenRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("hidden", T * 3);
      tl.add(outputRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("output", T * 4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  const col = (x: number, ys: number[], color: string, labels: string[]) => (
    <>
      {ys.map((y, i) => (
        <g key={`${x}-${i}`}>
          <circle cx={x} cy={y} r="18" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.6" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{labels[i]}</text>
        </g>
      ))}
    </>
  );

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧠</span> 机制
          </span>
        </div>
        <svg viewBox="0 0 720 460" role="img"
          aria-label="分层神经网络前向传播机制动画。输入层特征 x i 进入网络，神经元加权求和 z j 等于 Σ w j i 乘 x i 加 b j，激活函数 y j 等于 f z j 如 sigmoid 或 ReLU 引入非线性，隐藏层逐层重复同样计算层数多即深度，输出层给出最终结果多输出对应多个 Q 值或类别。前向传播是数据自输入经各层加权加激活流向输出。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">机制：分层神经网络前向传播</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">每层：z = Σ w·x + b，y = f(z)；逐层流向输出</text>

          {/* 输入层 */}
          <g ref={inputRef} style={{ opacity: 0 }}>
            <text x="90" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">输入层</text>
            {col(90, [130, 190, 250], "#5AA9E6", ["x₀", "x₁", "x₂"])}
          </g>
          {/* 加权求和 + 激活说明 */}
          <g ref={neuronRef} style={{ opacity: 0 }}>
            <rect x="180" y="300" width="240" height="40" rx="8" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.4" />
            <text x="300" y="318" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">z_j = Σ w_ji·x_i + b_j</text>
            <text x="300" y="334" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">加权求和</text>
          </g>
          <g ref={activateRef} style={{ opacity: 0 }}>
            <rect x="440" y="300" width="240" height="40" rx="8" fill="#C792EA" fillOpacity="0.1" stroke="#C792EA" strokeWidth="1.4" />
            <text x="560" y="318" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">y_j = f(z_j)</text>
            <text x="560" y="334" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">激活（非线性）</text>
          </g>
          {/* 隐藏层 */}
          <g ref={hiddenRef} style={{ opacity: 0 }}>
            <text x="300" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">隐藏层</text>
            {col(300, [120, 175, 230, 285], ACCENT, ["h₀", "h₁", "h₂", "h₃"])}
            {/* 连线 输入→隐藏 */}
            {[130, 190, 250].map((y1) =>
              [120, 175, 230, 285].map((y2) => (
                <line key={`l-${y1}-${y2}`} x1="108" y1={y1} x2="282" y2={y2} stroke="var(--border)" strokeWidth="0.6" strokeOpacity="0.4" />
              )),
            )}
          </g>
          {/* 输出层 */}
          <g ref={outputRef} style={{ opacity: 0 }}>
            <text x="560" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">输出层</text>
            {col(560, [150, 210, 270], OK_COLOR, ["y₀", "y₁", "y₂"])}
            {[120, 175, 230, 285].map((y1) =>
              [150, 210, 270].map((y2) => (
                <line key={`o-${y1}-${y2}`} x1="318" y1={y1} x2="542" y2={y2} stroke="var(--border)" strokeWidth="0.6" strokeOpacity="0.4" />
              )),
            )}
          </g>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="360" width="640" height="56" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="384" fontSize="12" fontWeight="700" fill={OK_COLOR}>前向传播：数据自输入经各层'加权+激活'流向输出</text>
            <text x="56" y="404" fontSize="11" fill="var(--text-secondary)">深度 = 隐藏层多；在深度 RL 中输出 y 即各动作的 Q 值</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL1}
          caption="神经网络逐层计算 z=Σw·x+b 与 y=f(z)，把输入映射为输出；深度网络能近似复杂函数。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        前向传播：每个神经元加权求和后过激活函数，层层传递，从输入算出输出。
      </figcaption>
    </figure>
  );
}

/* ============================================================
 * 图2 取舍图：数值梯度（慢） vs 反向传播（一次反向遍历）
 * ============================================================ */

const STEPS2: readonly TeachingStep[] = [
  { label: "forward", caption: "先前向传播得到输出与误差 E" },
  { label: "numerical", caption: "数值梯度：逐个权重微扰、重算 E 估计 ∂E/∂w" },
  { label: "slow", caption: "权重成千上万 → 每个都要一次前向，极慢（O(权重数) 次前向）" },
  { label: "backprop", caption: "反向传播：一次反向遍历，用链式法则算出所有 δ" },
  { label: "update", caption: "w_ji ← w_ji − η·δ_j·x_i，一次性更新全部权重" },
  { label: "insight", caption: "取舍：反向传播一次反向传播算全部梯度，远快于数值梯度" },
];
const LABEL2: Record<string, string> = Object.fromEntries(STEPS2.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc03BackpropDiagram() {
  const forwardRef = useRef<SVGGElement | null>(null);
  const numericalRef = useRef<SVGGElement | null>(null);
  const slowRef = useRef<SVGGElement | null>(null);
  const backpropRef = useRef<SVGGElement | null>(null);
  const updateRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS2,
    build: (tl) => {
      tl.add(forwardRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("forward", 0);
      tl.add(numericalRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("numerical", T);
      tl.add(slowRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("slow", T * 2);
      tl.add(backpropRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("backprop", T * 3);
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
            <span aria-hidden="true">⚖️</span> 取舍
          </span>
        </div>
        <svg viewBox="0 0 720 460" role="img"
          aria-label="数值梯度与反向传播取舍动画。先前向传播得到输出与误差 E。数值梯度逐个权重微扰重算 E 来估计偏导，权重成千上万时每个都要一次前向极慢，是 O 权重数次前向。反向传播一次反向遍历用链式法则算出所有 δ，隐藏层 δ j 等于 f' z j 乘 Σ w k j δ k。然后 w j i 等于 w j i 减 η 乘 δ j 乘 x i 一次性更新全部权重。取舍是反向传播一次反向传播算全部梯度远快于数值梯度。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">取舍：数值梯度 vs 反向传播</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">如何高效求出所有权重对误差的梯度</text>

          <g ref={forwardRef} style={{ opacity: 0 }}>
            <rect x="40" y="76" width="640" height="44" rx="10" fill="#5AA9E6" fillOpacity="0.1" stroke="#5AA9E6" strokeWidth="1.5" />
            <text x="360" y="103" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5AA9E6">① 前向传播 → 输出 → 误差 E</text>
          </g>

          {/* 数值梯度 */}
          <g ref={numericalRef} style={{ opacity: 0 }}>
            <rect x="40" y="134" width="640" height="60" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.5" />
            <text x="56" y="158" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>数值梯度（baseline）：逐个权重微扰</text>
            <text x="56" y="180" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">∂E/∂w ≈ [E(w+ε) − E(w)] / ε，每个 w 都要重算前向</text>
          </g>
          <g ref={slowRef} style={{ opacity: 0 }}>
            <rect x="40" y="202" width="640" height="44" rx="8" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1.4" />
            <text x="56" y="229" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 权重上万 → 上万次前向传播，极慢</text>
          </g>

          {/* 反向传播 */}
          <g ref={backpropRef} style={{ opacity: 0 }}>
            <rect x="40" y="260" width="640" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="56" y="284" fontSize="11" fontWeight="700" fill={OK_COLOR}>反向传播（candidate）：一次反向遍历，链式法则</text>
            <text x="56" y="306" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">δ_j = f'(z_j)·Σ_k w_kj·δ_k（误差自输出层往回传）</text>
          </g>
          <g ref={updateRef} style={{ opacity: 0 }}>
            <rect x="40" y="328" width="640" height="44" rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="56" y="355" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">w_ji ← w_ji − η·δ_j·x_i（一次更新全部权重）</text>
          </g>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="384" width="640" height="44" rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x="360" y="411" textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>反向传播一次算出全部梯度，远快于数值梯度</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL2}
          caption="数值梯度要对每个权重做一次前向，极慢；反向传播用链式法则一次反向遍历算出所有梯度。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反向传播：用链式法则把输出误差逐层回传，一次得到所有权重的梯度，是训练网络的高效算法。
      </figcaption>
    </figure>
  );
}

/* ============================================================
 * 图3 反例图：卷积核越界；复位：padding 补零
 * ============================================================ */

const STEPS3: readonly TeachingStep[] = [
  { label: "conv", caption: "卷积核 K 在输入 x 上滑动：h = f(b + Σ K·x) → 特征图" },
  { label: "slide", caption: "核在内部位置滑动，索引 r+u、c+v 都在范围内，正常" },
  { label: "boundary", caption: "核滑到边界：r+u 或 c+v 超出输入数组范围" },
  { label: "fault", caption: "反例：无 padding → 数组越界，读到垃圾/崩溃 ✗" },
  { label: "reset", caption: "复位：边界补零（padding）或检查索引，越界处取 0 ✓" },
  { label: "insight", caption: "不变量：卷积索引必须落在数组范围内，边界用 padding 处理" },
];
const LABEL3: Record<string, string> = Object.fromEntries(STEPS3.map((s) => [s.label, s.caption ?? s.label]));

export function Rlc03ConvBoundsDiagram() {
  const convRef = useRef<SVGGElement | null>(null);
  const slideRef = useRef<SVGGElement | null>(null);
  const boundaryRef = useRef<SVGGElement | null>(null);
  const faultRef = useRef<SVGGElement | null>(null);
  const resetRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS3,
    build: (tl) => {
      tl.add(convRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("conv", 0);
      tl.add(slideRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T);
      tl.label("slide", T);
      tl.add(boundaryRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.label("boundary", T * 2);
      tl.add(faultRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("fault", T * 3);
      tl.add(resetRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4);
      tl.label("reset", T * 4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  const CELL = 34;
  const GX = 60;
  const GY = 100;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧪</span> 反例与复位
          </span>
        </div>
        <svg viewBox="0 0 720 460" role="img"
          aria-label="卷积核越界反例动画。卷积核 K 在输入 x 上滑动，h 等于 f b 加 Σ K 乘 x 得到特征图。核在内部位置滑动时索引 r 加 u、c 加 v 都在范围内正常。核滑到边界时 r 加 u 或 c 加 v 超出输入数组范围。反例是无 padding 导致数组越界读到垃圾或崩溃。复位是边界补零 padding 或检查索引，越界处取 0。不变量是卷积索引必须落在数组范围内边界用 padding 处理。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">反例：卷积核越界；复位：padding 补零</text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">h_(r,c,k) = f(b_k + Σ K_(u,v,d,k)·x_(r+u, c+v, d))</text>

          {/* 输入网格 */}
          <g ref={convRef} style={{ opacity: 0 }}>
            <text x={GX} y={GY - 12} fontSize="11" fontWeight="700" fill="var(--text-secondary)">输入 x（5×5）</text>
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((__, c) => (
                <rect key={`in-${r}-${c}`} x={GX + c * CELL} y={GY + r * CELL} width={CELL} height={CELL}
                  fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1" />
              )),
            )}
          </g>
          {/* 内部位置核（正常） */}
          <g ref={slideRef} style={{ opacity: 0 }}>
            <rect x={GX + 1 * CELL} y={GY + 1 * CELL} width={3 * CELL} height={3 * CELL} rx="4"
              fill={OK_COLOR} fillOpacity="0.15" stroke={OK_COLOR} strokeWidth="2.4" />
            <text x={GX + 2.5 * CELL} y={GY + 2.5 * CELL + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>核(内部)✓</text>
          </g>
          {/* 边界位置核 */}
          <g ref={boundaryRef} style={{ opacity: 0 }}>
            <rect x={GX + 3 * CELL} y={GY + 3 * CELL} width={3 * CELL} height={3 * CELL} rx="4"
              fill={WARN_COLOR} fillOpacity="0.15" stroke={WARN_COLOR} strokeWidth="2.4" strokeDasharray="5 3" />
            <text x={GX + 4.5 * CELL} y={GY + 4.5 * CELL + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>核(边界)</text>
            <text x={GX + 5 * CELL + 8} y={GY + 4.5 * CELL} fontSize="11" fill={WARN_COLOR}>← r+u 越界</text>
          </g>

          {/* 反例 */}
          <g ref={faultRef} style={{ opacity: 0 }}>
            <rect x="300" y="100" width="380" height="60" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1.8" />
            <text x="316" y="124" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>✗ 反例：无 padding</text>
            <text x="316" y="146" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">x[r+u][c+v] 越界 → 读垃圾/段错误</text>
          </g>
          {/* 复位 */}
          <g ref={resetRef} style={{ opacity: 0 }}>
            <rect x="300" y="172" width="380" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.8" />
            <text x="316" y="196" fontSize="11" fontWeight="700" fill={OK_COLOR}>✓ 复位：padding 补零 / 索引检查</text>
            <text x="316" y="218" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">越界处取 0 → 特征图尺寸稳定</text>
          </g>

          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="300" width="640" height="56" rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.6" />
            <text x="56" y="324" fontSize="12" fontWeight="700" fill={ACCENT}>不变量：卷积索引必须落在数组范围内</text>
            <text x="56" y="344" fontSize="11" fill="var(--text-secondary)">C 实现里用 padding 或显式边界检查，杜绝越界访问</text>
          </g>
        </svg>
        <TimelineControls timeline={timeline} labelText={LABEL3}
          caption="卷积核滑到边界时索引会越界。复位做法是 padding 补零或显式检查索引，越界处取 0。" />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：卷积在边界处索引越界是常见 bug，用 padding 或边界检查保证索引合法。
      </figcaption>
    </figure>
  );
}
