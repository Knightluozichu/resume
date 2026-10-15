"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

// 需求分析：用因果矩阵、条件概率柱图、事实对照连线分别解释注意力、逐 token 生成与幻觉交付。
// 所有词表、分数、权重及概率均为教学构造；不调用真实模型，也不按中文字符切 token。
// 保留旧导出名仅为兼容既有章节 registry，三个实验不再使用通用 EvidenceLab。
const C = {
  bg: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  warning: "var(--warning)",
};
const attentionSteps = [
  "读取位置 1",
  "读取位置 2",
  "读取位置 3",
  "读取位置 4",
].map((label) => ({ label }));
const predictionSteps = [
  "读取上下文",
  "回填第一个 token",
  "回填第二个 token",
].map((label) => ({ label }));
const evidenceSteps = ["生成候选回答", "逐条核对来源", "决定是否交付"].map(
  (label) => ({ label }),
);

function useLessonTimeline(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { beat: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * 1600);
        tl.add(
          clock,
          { beat: i + 1, duration: 1600, ease: "linear" },
          i * 1600,
        );
      });
    },
  });
}

function Lab({
  title,
  kind,
  children,
}: {
  title: string;
  kind: string;
  children: ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-bg p-3 sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_input]:shrink-0 [&_input[type=range]]:h-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent [&_select]:focus-visible:outline-2 [&_select]:focus-visible:outline-accent"
    >
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="my-2 text-sm text-secondary">
        教学示意：词表、分数、注意力权重和概率均非真实模型测量，不代表 GPT
        内部参数或事实置信度。
      </p>
      {children}
    </section>
  );
}

function softmax(logits: readonly number[], temperature = 1) {
  const max = Math.max(...logits);
  const weights = logits.map((score) => Math.exp((score - max) / temperature));
  const total = weights.reduce((a, b) => a + b, 0);
  return weights.map((weight) => weight / total);
}

const toyTokens = ["The", "␠cat", "␠sat", "."];
const attentionScores = [
  [2, 1, 0, 0],
  [1, 2, 0, 1],
  [1, 3, 2, 0],
  [0, 1, 3, 2],
];

export function Lae01Gpt4ChatgptEssentialsRequestContractLab() {
  const timeline = useLessonTimeline(attentionSteps);
  const [leakFuture, setLeakFuture] = useState(false);
  const row = timeline.currentStep;
  const weights = attentionScores.map((scores, i) =>
    softmax(
      scores.map((score, j) => (!leakFuture && j > i ? -Infinity : score)),
    ),
  );
  return (
    <Lab kind="causal-attention-matrix" title="实验一：因果注意力不是全句偷看">
      <p className="text-sm text-secondary">
        虚构词表：The→11，␠cat→12，␠sat→13，.→14。␠ 表示前导空格，不是额外
        token。选择步数改变查询行；每行权重之和为 1。
      </p>
      <label className="my-3 flex min-h-11 items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={leakFuture}
          onChange={(e) => setLeakFuture(e.target.checked)}
        />
        故障：错误开放未来位置
      </label>
      <svg
        viewBox="0 0 350 365"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label={`因果注意力矩阵：当前查询位置 ${row + 1}，${leakFuture ? "未来泄漏" : "屏蔽未来"}；格内为教学权重，斜线为不可读取`}
      >
        <text x="175" y="20" textAnchor="middle" fill={C.text} fontSize="14">
          列 = 被读取的 Key 位置
        </text>
        {toyTokens.map((token, j) => (
          <text
            key={token}
            x={115 + j * 57}
            y="49"
            textAnchor="middle"
            fill={C.text}
            fontSize="13"
          >
            {j + 1}:{token}
          </text>
        ))}
        {weights.map((values, i) => (
          <g key={i}>
            <text
              x="8"
              y={95 + i * 57}
              fill={i === row ? C.accent : C.muted}
              fontSize="13"
            >
              Q{i + 1} {toyTokens[i]}
            </text>
            {values.map((weight, j) => {
              const masked = !leakFuture && j > i;
              const x = 88 + j * 57,
                y = 63 + i * 57;
              return (
                <g key={j}>
                  <rect
                    x={x}
                    y={y}
                    width="53"
                    height="53"
                    rx="4"
                    fill={masked ? C.bg : j > i ? C.warning : C.accent}
                    fillOpacity={masked ? 1 : (0.08 + weight * 0.7).toFixed(4)}
                    stroke={i === row ? C.accent : C.border}
                    strokeWidth={i === row ? 2 : 1}
                  />
                  {masked ? (
                    <>
                      <path d={`M${x + 8} ${y + 40}l35 -28`} stroke={C.muted} />
                      <text
                        x={x + 26}
                        y={y + 28}
                        textAnchor="middle"
                        fontSize="13"
                        fill={C.muted}
                      >
                        屏蔽
                      </text>
                    </>
                  ) : (
                    <text
                      x={x + 26}
                      y={y + 32}
                      textAnchor="middle"
                      fontSize="14"
                      fill={C.text}
                    >
                      {weight.toFixed(2)}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        ))}
        <text x="10" y="315" fill={C.text} fontSize="13">
          Q{row + 1} 可读：位置{" "}
          {weights[row]
            .map((w, j) => (w > 0 ? j + 1 : null))
            .filter(Boolean)
            .join("、")}
        </text>
        <text
          x="10"
          y="343"
          fill={leakFuture ? C.warning : C.muted}
          fontSize="13"
        >
          {leakFuture
            ? "未来答案泄漏：训练时看见了不该看的位置"
            : "上三角被屏蔽：当前预测只依赖已有前缀"}
        </text>
      </svg>
      <p aria-live="polite" className="text-sm text-secondary">
        位置 {row + 1} 的读取权重：
        {weights[row].map((w, j) => `${j + 1}→${w.toFixed(2)}`).join("；")}
        。显示值经过四舍五入。注意力不是事实依据，也不是完整的模型解释。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置注意力实验",
          onClick: () => {
            setLeakFuture(false);
            timeline.goToStep(0);
          },
        }}
      />
    </Lab>
  );
}

export function Lae01Gpt4ChatgptEssentialsExecutionTraceLab() {
  const timeline = useLessonTimeline(predictionSteps);
  const [temperature, setTemperature] = useState(1);
  const [firstToken, setFirstToken] = useState("␠sat");
  const [truncate, setTruncate] = useState(false);
  const step = timeline.currentStep;
  const candidates =
    step === 0
      ? ["␠sat", "␠slept", "␠ran"]
      : step === 1
        ? [".", "␠quietly", "␠outside"]
        : ["<END>", "␠Then", "␠The"];
  const logits =
    step === 0
      ? truncate
        ? [0.5, 1.4, 1.1]
        : [2.4, 1.2, 0.3]
      : step === 1
        ? firstToken === "␠sat"
          ? [2, 1.2, 0.6]
          : [1.5, 2.2, 0.4]
        : [3, 1, 0];
  const probabilities = softmax(logits, temperature);
  const prefix = [
    "The",
    ...(truncate ? [] : ["␠cat"]),
    ...(step >= 1 ? [firstToken] : []),
    ...(step >= 2 ? ["."] : []),
  ];
  return (
    <Lab
      kind="autoregressive-token-distribution"
      title="实验二：下一 token 的分布与回填"
    >
      <p className="text-sm text-secondary">
        只展示三候选的封闭玩具词表，非真实全词表。步骤由人工选定，不模拟随机采样：第一次选择
        sat 或 slept，第二次固定选择句点，即使它不是最高概率。
      </p>
      <div className="my-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          温度 T = {temperature.toFixed(1)}
          <input
            aria-label="教学温度"
            className="block w-full accent-accent"
            type="range"
            min="0.2"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
          />
        </label>
        <label className="text-sm">
          第一个回填 token
          <select
            className="mt-1 block w-full rounded border border-border bg-bg px-2 text-primary"
            value={firstToken}
            onChange={(e) => {
              setFirstToken(e.target.value);
              timeline.goToStep(0);
            }}
          >
            <option value="␠sat">␠sat</option>
            <option value="␠slept">␠slept</option>
          </select>
        </label>
      </div>
      <label className="flex min-h-11 items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={truncate}
          onChange={(e) => {
            setTruncate(e.target.checked);
            timeline.goToStep(0);
          }}
        />
        故障：遗漏上下文 token「␠cat」
      </label>
      <svg
        viewBox="0 0 350 350"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label={`逐 token 生成第 ${step + 1} 步，上下文 ${prefix.join(" | ")}；下一 token 概率 ${probabilities.map((p, i) => `${candidates[i]} ${(p * 100).toFixed(1)}%`).join("，")}，均为教学计算`}
      >
        <text x="10" y="24" fill={C.text} fontSize="14">
          上下文序列（格子是玩具 token）
        </text>
        {prefix.map((token, i) => (
          <g key={i}>
            <rect
              x={10 + i * 84}
              y="39"
              width="78"
              height="42"
              rx="5"
              fill={C.bg}
              stroke={i >= (truncate ? 1 : 2) ? C.accent : C.border}
            />
            <text
              x={49 + i * 84}
              y="65"
              textAnchor="middle"
              fill={C.text}
              fontSize="14"
            >
              {token}
            </text>
          </g>
        ))}
        <path
          d="M175 88v28m-5 -6l5 6 5 -6"
          fill="none"
          stroke={C.accent}
          strokeWidth="2"
        />
        <text x="10" y="138" fill={C.muted} fontSize="13">
          p = softmax(教学 logits / T)
        </text>
        {candidates.map((token, i) => (
          <g key={token}>
            <text x="10" y={180 + i * 55} fill={C.text} fontSize="13">
              {token}
            </text>
            <rect
              x="86"
              y={159 + i * 55}
              width="190"
              height="29"
              fill={C.bg}
              stroke={C.border}
            />
            <rect
              x="86"
              y={159 + i * 55}
              width={(190 * probabilities[i]).toFixed(3)}
              height="29"
              fill={C.accent}
              fillOpacity="0.65"
            />
            <text x="285" y={179 + i * 55} fill={C.text} fontSize="13">
              {(100 * probabilities[i]).toFixed(1)}%
            </text>
          </g>
        ))}
        <text
          x="10"
          y="333"
          fill={truncate ? C.warning : C.muted}
          fontSize="13"
        >
          {truncate
            ? "缺少主语：首步分布换用另一组教学分数"
            : "选中 token → 追加到序列 → 重新计算分布"}
        </text>
      </svg>
      <p className="text-sm text-secondary" aria-live="polite">
        本步 logits：{logits.join(" / ")}；归一化概率总和为
        1。温度调整的是分布尖锐程度，不是事实正确率。
        {step === 2
          ? "已回填句点；<END> 仍是下一步候选，尚未选中。"
          : "点击下一步观察序列增长与条件分布改变。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置预测实验",
          onClick: () => {
            setTemperature(1);
            setFirstToken("␠sat");
            setTruncate(false);
            timeline.goToStep(0);
          },
        }}
      />
    </Lab>
  );
}

export function Lae01Gpt4ChatgptEssentialsAuthorizationGateLab() {
  const timeline = useLessonTimeline(evidenceSteps);
  const [missing, setMissing] = useState(false);
  const [bypass, setBypass] = useState(false);
  const checked = timeline.currentStep >= 1;
  const delivered = timeline.currentStep === 2;
  return (
    <Lab
      kind="hallucination-evidence-alignment"
      title="实验三：流畅候选如何变成错误交付"
    >
      <p className="text-sm text-secondary">
        虚构场景：澄河馆。两条候选陈述来自脚本，不是模型调用；下图按事实片段拆分，不表示中文
        token 边界。核验发生在应用层，不是注意力自动完成的工作。
      </p>
      <div className="my-3 flex flex-wrap gap-x-5">
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={missing}
            onChange={(e) => setMissing(e.target.checked)}
          />
          故障：移除来源
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={bypass}
            onChange={(e) => setBypass(e.target.checked)}
          />
          故障：绕过事实核验
        </label>
      </div>
      <svg
        viewBox="0 0 350 390"
        className="mx-auto w-full max-w-lg"
        role="img"
        aria-label={`候选与来源事实对照：${checked ? (missing ? "来源缺失，两项待核实" : "周一开放与周一闭馆矛盾，营业时段一致") : "尚未核验"}；${delivered ? (bypass ? "错误交付" : "暂缓交付") : "尚未交付"}`}
      >
        <text x="10" y="23" fontSize="14" fill={C.text}>
          流畅候选 ≠ 事实已确认
        </text>
        <text x="10" y="53" fontSize="13" fill={C.muted}>
          候选陈述
        </text>
        <text x="217" y="53" fontSize="13" fill={C.muted}>
          虚构馆方公告
        </text>
        {["周一开放", "时段 9–17"].map((claim, i) => (
          <g key={claim}>
            <rect
              x="10"
              y={69 + i * 88}
              width="122"
              height="45"
              rx="4"
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x="71"
              y={97 + i * 88}
              textAnchor="middle"
              fontSize="14"
              fill={C.text}
            >
              {claim}
            </text>
            <rect
              x="216"
              y={69 + i * 88}
              width="124"
              height="45"
              rx="4"
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x="278"
              y={97 + i * 88}
              textAnchor="middle"
              fontSize="14"
              fill={C.text}
            >
              {missing ? "来源缺失" : i === 0 ? "周一闭馆" : "时段 9–17"}
            </text>
            <path
              d={`M132 ${91 + i * 88}H216`}
              stroke={checked && (missing || i === 0) ? C.warning : C.accent}
              strokeWidth={checked ? 3 : 1}
              strokeDasharray={!checked || missing ? "4 4" : undefined}
            />
            <text
              x="174"
              y={133 + i * 88}
              textAnchor="middle"
              fontSize="13"
              fill={checked && (missing || i === 0) ? C.warning : C.muted}
            >
              {!checked
                ? "待核验"
                : missing
                  ? "无依据"
                  : i === 0
                    ? "× 矛盾"
                    : "一致"}
            </text>
          </g>
        ))}
        <path
          d="M175 233v39m-5 -6l5 6 5 -6"
          stroke={C.accent}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M175 279l155 45-155 45-155-45z"
          fill={C.bg}
          stroke={delivered && bypass ? C.warning : C.border}
          strokeWidth="2"
        />
        <text
          x="175"
          y="322"
          textAnchor="middle"
          fontSize="15"
          fill={delivered && bypass ? C.warning : C.text}
        >
          {!delivered
            ? "尚未交付"
            : bypass
              ? "错误交付：未核实回答"
              : "暂缓交付：需更正或复核"}
        </text>
        <text x="175" y="337" textAnchor="middle" fontSize="13" fill={C.muted}>
          {bypass ? "绕过核验不会使候选变真" : "来源是独立证据，不是生成概率"}
        </text>
      </svg>
      <p className="text-sm text-secondary" aria-live="polite">
        {!delivered
          ? "推进到核对和交付步骤，观察连线与决定。"
          : bypass
            ? "失败已复现：系统把未核实陈述展示为结论。关闭绕过开关恢复暂缓交付。"
            : missing
              ? "没有来源不能判定真伪；请求补充材料或交由人工，不编造引用。"
              : "已知候选与公告矛盾；按来源更正后还需重新核验，不能原样交付。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{
          label: "重置幻觉实验",
          onClick: () => {
            setMissing(false);
            setBypass(false);
            timeline.goToStep(0);
          },
        }}
      />
    </Lab>
  );
}
