"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "shape", caption: "先检查矩阵形状、秩与结构合同" },
  { label: "factor", caption: "用消去得到 PA = LU，并记录 permutation" },
  { label: "solve", caption: "复用 factorization，先解 Ly = Pb，再解 Ux = y" },
  { label: "inverse", caption: "把求逆拆成 n 个 basis-vector solves" },
  { label: "spd", caption: "利用对称正定结构改用 Cholesky：A = LLᵀ" },
  { label: "least-squares", caption: "用投影和 residual orthogonality 检查最小二乘解" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "solve" | "inverse" | "spd" | "least-squares" | "failure";

type ModeInfo = {
  title: string;
  input: string;
  evidence: string;
  warning: boolean;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  solve: {
    title: "solving systems of linear equations",
    input: "Ax = b",
    evidence: "PA ≈ LU · Ly = Pb · Ux = y",
    warning: false,
  },
  inverse: {
    title: "inverting matrices",
    input: "AX = I",
    evidence: "每一列 X[:,j] 都是一次 A xⱼ = eⱼ",
    warning: false,
  },
  spd: {
    title: "symmetric positive-definite matrices",
    input: "A = Aᵀ · xᵀAx > 0",
    evidence: "A = LLᵀ · 不必做 row permutation",
    warning: false,
  },
  "least-squares": {
    title: "least-squares approximation",
    input: "min ||Ax - b||₂²",
    evidence: "Aᵀ(b - A x̂) = 0",
    warning: false,
  },
  failure: {
    title: "failure injection",
    input: "先求 A⁻¹ 再乘 b",
    evidence: "多余工作 · 额外 storage · residual 证据缺失",
    warning: true,
  },
};

export function Clrs4Chapter28MatrixOperationsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("solve");

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const selected = MODE_COPY[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("solve");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch28-matrix-operations"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 28 · Matrix Operations
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先分解，再求解：矩阵结果如何留下证书？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换求解、求逆、SPD、最小二乘或故障注入模式，沿时间线观察形状、factorization、residual 与结构假设如何连接。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择矩阵操作模式</span>
          <select
            aria-label="选择解线性方程组、矩阵求逆、对称正定矩阵、最小二乘逼近或故障注入模式"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="solve">解线性方程组 · PA = LU</option>
            <option value="inverse">矩阵求逆 · AX = I</option>
            <option value="spd">对称正定矩阵 · Cholesky</option>
            <option value="least-squares">最小二乘逼近 · 正交投影</option>
            <option value="failure">故障注入 · 先求逆再乘 b</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 28 专属矩阵运算实验。覆盖 matrix operations、矩阵运算、solving systems of linear equations、解线性方程组、inverting matrices、矩阵求逆、symmetric positive-definite matrices、对称正定矩阵、least-squares approximation、最小二乘逼近。展示矩阵形状与秩、Gaussian elimination、LUP decomposition、partial pivoting、triangular solves、basis-vector solves、Cholesky、projection、residual 与验证证书，并支持模式切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch28-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch28-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch28-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="720" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            shape → factor → solve → inverse → SPD → least-squares
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            matrix operations · {selected.title} · {selected.evidence}
          </text>

          <rect x="30" y="78" width="258" height="112" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>shape · rank · structure · precision</text>
          <text x="52" y="178" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>

          <line x1="300" y1="134" x2="326" y2="134" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch28-success-arrow)" />

          <rect x="336" y="78" width="258" height="112" rx="12" fill={activeIndex >= 1 ? C.accent : C.elevated} fillOpacity={activeIndex >= 1 ? 0.12 : 1} stroke={activeIndex >= 1 ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={activeIndex >= 1 ? C.accent : C.primary}>中间状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{activeIndex >= 1 ? "factorization / structure" : "尚未分解"}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>P、L、U 或 L、Lᵀ 的 storage</text>
          <text x="358" y="178" fontSize="11" fill={C.secondary}>不是只输出一个黑箱 array</text>

          <line x1="606" y1="134" x2="632" y2="134" stroke={selected.warning ? C.warning : C.success} strokeWidth="2.5" markerEnd={selected.warning ? "url(#clrs4-ch28-warning-arrow)" : "url(#clrs4-ch28-success-arrow)"} />

          <rect x="642" y="78" width="228" height="112" rx="12" fill={selected.warning ? C.warning : C.success} fillOpacity="0.1" stroke={selected.warning ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={selected.warning ? C.warning : C.success}>输出证书</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.evidence}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={selected.warning ? C.warning : C.secondary}>{selected.warning ? "不要把逆当成默认求解路径" : "residual 与结构假设可复核"}</text>
          <text x="756" y="178" textAnchor="middle" fontSize="11" fill={C.secondary}>报告精度、范数与条件信息</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 3 || index === 5;
            const tone = isActive ? C.accent : isBoundary ? C.warning : C.border;
            return (
              <g
                key={`stage-${step.label}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y={208 + index * 46} width="840" height="38" rx="9" fill={isActive ? C.accent : isBoundary ? C.warning : C.elevated} fillOpacity={isActive || isBoundary ? 0.1 : 1} stroke={tone} strokeWidth={isActive ? 2.4 : 1.4} />
                <text x="52" y={232 + index * 46} fontSize="13" fontWeight="700" fill={isActive ? C.accent : isBoundary ? C.warning : C.primary}>{index + 1} · {step.label}</text>
                <text x="188" y={232 + index * 46} fontSize="11" fill={C.primary}>{step.caption}</text>
                <text x="850" y={232 + index * 46} textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index < activeIndex ? "已检查" : index === activeIndex ? "当前问题" : "等待"}</text>
              </g>
            );
          })}

          <text x="30" y="510" fontSize="13" fontWeight="700" fill={C.primary}>矩阵状态与可复核证据</text>
          <text x="870" y="510" textAnchor="end" fontSize="11" fill={C.secondary}>切换模式，保持同一组证据语言</text>

          {mode === "solve" && (
            <>
              <text x="54" y="544" fontSize="13" fontWeight="700" fill={C.primary}>解线性方程组：factor once，solve many</text>
              <rect x="54" y="568" width="180" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="270" y="568" width="180" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="486" y="568" width="180" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <rect x="702" y="568" width="144" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="598" fontSize="13" fontWeight="700" fill={C.primary}>PA = LU</text>
              <text x="76" y="626" fontSize="11" fill={C.secondary}>pivot 与 multiplier</text>
              <text x="292" y="598" fontSize="13" fontWeight="700" fill={C.accent}>Ly = Pb</text>
              <text x="292" y="626" fontSize="11" fill={C.secondary}>forward solve</text>
              <text x="508" y="598" fontSize="13" fontWeight="700" fill={C.success}>Ux = y</text>
              <text x="508" y="626" fontSize="11" fill={C.secondary}>back substitute</text>
              <text x="724" y="598" fontSize="13" fontWeight="700" fill={C.primary}>Ax ≈ b</text>
              <text x="724" y="626" fontSize="11" fill={C.secondary}>residual</text>
              <line x1="238" y1="610" x2="260" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
              <line x1="454" y1="610" x2="476" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
              <line x1="670" y1="610" x2="692" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
            </>
          )}

          {mode === "inverse" && (
            <>
              <text x="54" y="544" fontSize="13" fontWeight="700" fill={C.primary}>矩阵求逆：n 个 basis-vector solves，而不是黑箱公式</text>
              <rect x="54" y="568" width="172" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="262" y="568" width="172" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="470" y="568" width="172" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <rect x="678" y="568" width="168" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="598" fontSize="13" fontWeight="700" fill={C.primary}>I = [e₁ … eₙ]</text>
              <text x="76" y="626" fontSize="11" fill={C.secondary}>每列是一个 rhs</text>
              <text x="284" y="598" fontSize="13" fontWeight="700" fill={C.accent}>LUP</text>
              <text x="284" y="626" fontSize="11" fill={C.secondary}>只 factor 一次</text>
              <text x="492" y="598" fontSize="13" fontWeight="700" fill={C.success}>A xⱼ = eⱼ</text>
              <text x="492" y="626" fontSize="11" fill={C.secondary}>重复 triangular solve</text>
              <text x="700" y="598" fontSize="13" fontWeight="700" fill={C.primary}>X = A⁻¹</text>
              <text x="700" y="626" fontSize="11" fill={C.secondary}>检查 AX ≈ I</text>
              <line x1="230" y1="610" x2="252" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
              <line x1="438" y1="610" x2="460" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
              <line x1="646" y1="610" x2="668" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
            </>
          )}

          {mode === "spd" && (
            <>
              <text x="54" y="544" fontSize="13" fontWeight="700" fill={C.primary}>对称正定矩阵：结构换来更短、更稳定的路径</text>
              <rect x="54" y="568" width="228" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="320" y="568" width="228" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="586" y="568" width="260" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="76" y="598" fontSize="13" fontWeight="700" fill={C.primary}>A = Aᵀ</text>
              <text x="76" y="626" fontSize="11" fill={C.secondary}>xᵀAx &gt; 0，x ≠ 0</text>
              <text x="342" y="598" fontSize="13" fontWeight="700" fill={C.accent}>A = LLᵀ</text>
              <text x="342" y="626" fontSize="11" fill={C.secondary}>Cholesky factorization</text>
              <text x="608" y="598" fontSize="13" fontWeight="700" fill={C.success}>Ly = b → Lᵀx = y</text>
              <text x="608" y="626" fontSize="11" fill={C.secondary}>保持 symmetry，少存一半</text>
              <line x1="288" y1="610" x2="310" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
              <line x1="554" y1="610" x2="576" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
            </>
          )}

          {mode === "least-squares" && (
            <>
              <text x="54" y="544" fontSize="13" fontWeight="700" fill={C.primary}>最小二乘逼近：投影让 residual 与 column space 正交</text>
              <rect x="54" y="568" width="220" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="312" y="568" width="220" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="570" y="568" width="276" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="76" y="598" fontSize="13" fontWeight="700" fill={C.primary}>min ||Ax - b||₂²</text>
              <text x="76" y="626" fontSize="11" fill={C.secondary}>overdetermined system</text>
              <text x="334" y="598" fontSize="13" fontWeight="700" fill={C.accent}>AᵀA x̂ = Aᵀb</text>
              <text x="334" y="626" fontSize="11" fill={C.secondary}>normal equations</text>
              <text x="592" y="598" fontSize="13" fontWeight="700" fill={C.success}>Aᵀ(b - A x̂) = 0</text>
              <text x="592" y="626" fontSize="11" fill={C.secondary}>residual orthogonal · QR/SVD 更稳健</text>
              <line x1="280" y1="610" x2="302" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
              <line x1="538" y1="610" x2="560" y2="610" stroke={C.success} strokeWidth="2" markerEnd="url(#clrs4-ch28-success-arrow)" />
            </>
          )}

          {mode === "failure" && (
            <>
              <text x="54" y="544" fontSize="13" fontWeight="700" fill={C.warning}>故障注入：先求显式 inverse，再乘 b</text>
              <rect x="54" y="568" width="220" height="82" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <rect x="312" y="568" width="220" height="82" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <rect x="570" y="568" width="276" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="598" fontSize="13" fontWeight="700" fill={C.warning}>A⁻¹ = n solves</text>
              <text x="76" y="626" fontSize="11" fill={C.secondary}>目标只是一个 b</text>
              <text x="334" y="598" fontSize="13" fontWeight="700" fill={C.warning}>x = A⁻¹b</text>
              <text x="334" y="626" fontSize="11" fill={C.secondary}>额外 storage 与 roundoff path</text>
              <text x="592" y="598" fontSize="13" fontWeight="700" fill={C.primary}>正确替代：LUP-SOLVE</text>
              <text x="592" y="626" fontSize="11" fill={C.secondary}>直接解 Ly = Pb、Ux = y，再验 residual</text>
              <line x1="280" y1="610" x2="302" y2="610" stroke={C.warning} strokeWidth="2" markerEnd="url(#clrs4-ch28-warning-arrow)" />
              <line x1="538" y1="610" x2="560" y2="610" stroke={C.warning} strokeWidth="2" markerEnd="url(#clrs4-ch28-warning-arrow)" />
            </>
          )}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="矩阵算法的结果要带着 factorization、residual、结构假设与 precision 一起交付，才能被复查。"
          reset={{
            label: "重置演示",
            ariaLabel: "重置矩阵运算演示",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        矩阵运算证据链：先确认形状与结构，再分解并复用 factorization；求逆、SPD 和最小二乘都应留下可检查的 residual 或正交性证书。
      </figcaption>
    </figure>
  );
}
