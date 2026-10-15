"use client";

import { useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";

// 独立需求分析：第一版4.1/4.2的核心差异是推理时提供示例与训练时更新权重。
// 三个旧export仅保留注册兼容；实际图形分别为token比例条、样本流向图、累计成本曲线。
// 不复用证据卡、不模拟模型质量：token、样本ID、费率均为显式教学假设。
const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const ROOT =
  "not-prose my-6 rounded-xl border border-border bg-bg p-4 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_ol[aria-hidden=true]]:hidden [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent";
const BUTTON = "rounded-lg border border-border px-3 py-2 text-sm";
const NOTE = "mt-3 text-sm leading-6 text-secondary";

/** 4.1.1 / 4.1.3：长度是真正按预算比例绘制，而非预制文字卡。 */
export function Lae04AdvancedTechniquesRequestContractLab() {
  const [examples, setExamples] = useState(2);
  const [contextLimit, setContextLimit] = useState(1024);
  const [longInput, setLongInput] = useState(false);
  const baseTokens = 400 + (longInput ? 480 : 0);
  const fewShotTokens = examples * 120;
  const outputReserve = 320;
  const promptTotal = baseTokens + fewShotTokens + outputReserve;
  const tunedTotal = baseTokens + outputReserve;
  const scale = 320 / 2048;
  const remaining = contextLimit - promptTotal;
  const reset = () => {
    setExamples(2);
    setContextLimit(1024);
    setLongInput(false);
  };

  return (
    <section
      className={ROOT}
      data-visual-kind="lae04-prompt-token-budget"
      aria-label="提示与微调的上下文预算实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold">01 / 示例留在请求里，还是用于训练？</h3>
        <button type="button" className={BUTTON} onClick={reset}>
          重置预算
        </button>
      </div>
      <p className={NOTE}>
        教学示意，不是真模型结果或 tokenizer
        测量。微调行仅假设省去示例，不代表质量等价；指令与本次输入仍须发送。
      </p>
      <svg
        viewBox="0 0 360 340"
        className="mx-auto mt-3 block w-full max-w-[480px]"
        role="img"
        aria-label={`上下文预算${contextLimit} token。少样本方案占用${promptTotal}，微调假设占用${tunedTotal}；竖线为容量，超出部分标红。`}
      >
        <text x="20" y="24" fill={C.text} fontSize="16">
          同一任务 · 按 token 数等比例
        </text>
        {[
          {
            name: "少样本提示",
            total: promptTotal,
            examples: fewShotTokens,
            y: 78,
          },
          {
            name: "微调后（假设无示例）",
            total: tunedTotal,
            examples: 0,
            y: 186,
          },
        ].map((row) => {
          const segments = [baseTokens, row.examples, outputReserve];
          return (
            <g key={row.name}>
              <text x="20" y={row.y - 14} fill={C.text} fontSize="16">
                {row.name}：{row.total}
              </text>
              <rect
                x="20"
                y={row.y}
                width="320"
                height="36"
                fill={C.elevated}
                stroke={C.border}
              />
              {segments.map((tokens, i) => (
                <rect
                  key={i}
                  x={
                    20 +
                    segments.slice(0, i).reduce((sum, n) => sum + n, 0) * scale
                  }
                  y={row.y}
                  width={tokens * scale}
                  height="36"
                  fill={i === 1 ? C.accent : i === 0 ? C.muted : C.bg}
                  stroke={C.text}
                  strokeDasharray={i === 2 ? "4 3" : undefined}
                />
              ))}
              {row.total > contextLimit && (
                <rect
                  x={20 + contextLimit * scale}
                  y={row.y}
                  width={(row.total - contextLimit) * scale}
                  height="36"
                  fill={C.danger}
                  opacity="0.65"
                />
              )}
              <text
                x="20"
                y={row.y + 60}
                fill={row.total > contextLimit ? C.danger : C.muted}
                fontSize="16"
              >
                {row.total > contextLimit
                  ? `超出 ${row.total - contextLimit}`
                  : `剩余 ${contextLimit - row.total}`}{" "}
                token
              </text>
            </g>
          );
        })}
        <line
          x1={20 + contextLimit * scale}
          x2={20 + contextLimit * scale}
          y1="70"
          y2="230"
          stroke={C.accent}
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        <text x="20" y="278" fill={C.accent} fontSize="16">
          虚线容量：{contextLimit} / 横轴上限 2048
        </text>
        <text x="20" y="306" fill={C.muted} fontSize="16">
          灰：指令与输入　实色：示例
        </text>
        <text x="20" y="330" fill={C.muted} fontSize="16">
          空心：输出预留　红：超出容量
        </text>
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          少样本数量：{examples} × 120 token
          <input
            className="block w-full accent-accent"
            type="range"
            min="0"
            max="6"
            value={examples}
            onChange={(e) => setExamples(Number(e.target.value))}
            aria-label="少样本数量"
          />
        </label>
        <label className="text-sm">
          上下文容量：{contextLimit} token
          <input
            className="block w-full accent-accent"
            type="range"
            min="640"
            max="1280"
            step="128"
            value={contextLimit}
            onChange={(e) => setContextLimit(Number(e.target.value))}
            aria-label="上下文容量"
          />
        </label>
      </div>
      <button
        className={`${BUTTON} mt-3 w-full`}
        type="button"
        aria-pressed={longInput}
        onClick={() => setLongInput(!longInput)}
      >
        故障：超长输入 +480 token（{longInput ? "开启" : "关闭"}）
      </button>
      <p className={NOTE} role="status">
        {baseTokens} + {fewShotTokens} + {outputReserve} = {promptTotal} token。
        {remaining < 0
          ? `预算拒绝：超出 ${-remaining} token；减少示例、压缩输入或换用合适容量。`
          : `预算可容纳，剩余 ${remaining} token；不代表内容正确。`}
      </p>
    </section>
  );
}

const SPLIT_STEPS = [
  { label: "冻结切分", caption: "先固定训练、开发、测试样本" },
  { label: "优化使用", caption: "训练样本进提示或训练，开发集选版本" },
  { label: "独立测试", caption: "锁定版本后才打开测试集" },
] as const;
const SAMPLE_IDS = ["T1", "T2", "T3", "T4", "T5", "T6", "D1", "D2", "E1", "E2"];

/** 4.1.4 / 4.2.1 / 4.2.4：点的身份与边的终点直接展示数据泄漏。 */
export function Lae04AdvancedTechniquesExecutionTraceLab() {
  const [leak, setLeak] = useState(false);
  const [route, setRoute] = useState<"prompt" | "training">("prompt");
  const timeline = useTeachingTimeline({
    steps: SPLIT_STEPS,
    build: (tl) => {
      const clock = { value: 0 };
      SPLIT_STEPS.forEach((step, i) => {
        // 标签放在该阶段起点；末阶段有独立时段，拖到100%仍可到达。
        tl.label(step.label, i * 1200);
        tl.add(
          clock,
          { value: i + 1, duration: 1200, ease: "linear" },
          i * 1200,
        );
      });
    },
  });
  const stage = timeline.currentStep;
  const optimizationCount = route === "prompt" ? 2 : 6;
  const exposed = leak && stage >= 1;
  const reset = () => {
    setLeak(false);
    setRoute("prompt");
    timeline.goToStep(0);
  };
  const changeLeak = () => {
    setLeak(!leak);
    timeline.goToStep(1);
  };

  return (
    <section
      className={ROOT}
      data-visual-kind="lae04-sample-isolation"
      aria-label="提示与微调的数据隔离实验"
    >
      <h3 className="font-semibold">02 / 同一测试样本不能走两条路</h3>
      <p className={NOTE}>
        10个固定ID只是示意，不是训练集规模建议。线表示实际使用路径；虚线框保留未打开的测试集，不生成准确率或模型输出。
      </p>
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label="优化路径"
      >
        <button
          type="button"
          className={`${BUTTON} ${route === "prompt" ? "border-accent text-accent" : ""}`}
          aria-pressed={route === "prompt"}
          onClick={() => setRoute("prompt")}
        >
          少样本提示路径
        </button>
        <button
          type="button"
          className={`${BUTTON} ${route === "training" ? "border-accent text-accent" : ""}`}
          aria-pressed={route === "training"}
          onClick={() => setRoute("training")}
        >
          微调训练路径
        </button>
      </div>
      <svg
        viewBox="0 0 360 390"
        className="mx-auto mt-3 block w-full max-w-[480px]"
        role="img"
        aria-label={`第${stage + 1}步：${SPLIT_STEPS[stage].caption}。${route === "prompt" ? "少样本提示" : "微调训练"}使用${optimizationCount}个训练样本。${exposed ? "故障：E1、E2也进入优化，独立测试剩余0个。" : "E1、E2独立保留，测试样本2个。"}`}
      >
        <text x="16" y="24" fill={C.text} fontSize="16">
          训练 T1–T6 / 开发 D1–D2 / 测试 E1–E2
        </text>
        {SAMPLE_IDS.map((id, i) => {
          const x = 24 + i * 34;
          const test = i >= 8;
          const destinationX =
            i < 6 ? 24 + i * 34 : test ? 262 + (i - 8) * 34 : 58 + (i - 6) * 34;
          const destinationY = i < 6 ? 188 : 310;
          // 开发/测试沿各自侧边走线，避免穿过训练样本的圆点。
          const laneX = test ? 322 + (i - 8) * 26 : 216 + (i - 6) * 16;
          const samplePath =
            i < 6
              ? `M ${x} 65 V ${destinationY - 16}`
              : `M ${x} 65 L ${laneX} 100 V 260 L ${destinationX} ${destinationY - 16}`;
          const showPath =
            i < 6
              ? stage >= 1 && i < optimizationCount
              : i < 8
                ? stage >= 1
                : stage >= 2;
          return (
            <g key={id}>
              {showPath && (
                <path
                  d={samplePath}
                  fill="none"
                  stroke={test && exposed ? C.danger : C.border}
                  strokeWidth="2"
                />
              )}
              {test && exposed && (
                <path
                  d={`M ${x} 65 L ${262 + (i - 8) * 34} 172`}
                  fill="none"
                  stroke={C.danger}
                  strokeWidth="3"
                  strokeDasharray="5 3"
                />
              )}
              <circle
                cx={x}
                cy="50"
                r="16"
                fill={test ? C.bg : C.elevated}
                stroke={test && exposed ? C.danger : C.muted}
              />
              <text
                x={x}
                y="55"
                textAnchor="middle"
                fill={C.text}
                fontSize="14"
              >
                {id}
              </text>
              {showPath && (
                <g>
                  <circle
                    cx={destinationX}
                    cy={destinationY}
                    r="16"
                    fill={C.bg}
                    stroke={test && exposed ? C.danger : C.accent}
                    strokeWidth="2"
                  />
                  <text
                    x={destinationX}
                    y={destinationY + 5}
                    textAnchor="middle"
                    fill={C.text}
                    fontSize="14"
                  >
                    {id}
                  </text>
                </g>
              )}
              {test && exposed && (
                <g>
                  <circle
                    cx={262 + (i - 8) * 34}
                    cy="188"
                    r="16"
                    fill={C.bg}
                    stroke={C.danger}
                    strokeWidth="2"
                  />
                  <text
                    x={262 + (i - 8) * 34}
                    y="193"
                    textAnchor="middle"
                    fill={C.danger}
                    fontSize="14"
                  >
                    {id}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <text
          paintOrder="stroke"
          stroke={C.bg}
          strokeWidth="6"
          strokeLinejoin="round"
          x="16"
          y="145"
          fill={C.accent}
          fontSize="16"
        >
          {route === "prompt"
            ? "推理时读示例 · 权重不变"
            : "训练时读样本 · 更新权重"}
        </text>
        <line
          x1="16"
          x2="340"
          y1="218"
          y2="218"
          stroke={exposed ? C.danger : C.border}
          strokeWidth="2"
        />
        <text
          paintOrder="stroke"
          stroke={C.bg}
          strokeWidth="6"
          strokeLinejoin="round"
          x="16"
          y="247"
          fill={exposed ? C.danger : C.muted}
          fontSize="16"
        >
          {stage === 0
            ? "尚未使用样本"
            : `优化接触 ${optimizationCount + (exposed ? 2 : 0)} 个样本${exposed ? "（含测试泄漏）" : ""}`}
        </text>
        <text
          paintOrder="stroke"
          stroke={C.bg}
          strokeWidth="6"
          strokeLinejoin="round"
          x="16"
          y="282"
          fill={C.text}
          fontSize="16"
        >
          开发集选版本
        </text>
        <text
          paintOrder="stroke"
          stroke={C.bg}
          strokeWidth="6"
          strokeLinejoin="round"
          x="226"
          y="282"
          fill={C.text}
          fontSize="16"
        >
          测试集验收
        </text>
        {stage < 2 && (
          <rect
            x="232"
            y="291"
            width="98"
            height="40"
            rx="8"
            fill="none"
            stroke={C.muted}
            strokeDasharray="5 4"
          />
        )}
        <text x="16" y="369" fill={exposed ? C.danger : C.text} fontSize="16">
          独立测试余量：{exposed ? 0 : 2} / 2（按ID交集核对）
        </text>
      </svg>
      <button
        type="button"
        className={`${BUTTON} w-full`}
        aria-pressed={leak}
        onClick={changeLeak}
      >
        故障：E1、E2混入优化（{leak ? "开启" : "关闭"}）
      </button>
      <TimelineControls
        timeline={timeline}
        labelText={Object.fromEntries(
          SPLIT_STEPS.map((s) => [s.label, s.caption]),
        )}
        reset={{ label: "重置数据实验", onClick: reset }}
      />
      <p className={NOTE} role="status">
        {exposed
          ? "测试ID与优化ID交集 = {E1, E2}。验收无效：真实修复需要清除泄漏、重新优化，并使用未接触的新测试集；关掉示意开关不能抹除真实训练影响。"
          : "测试ID与优化ID交集为空。仍需按客户、活动或语义近重复分组去重，ID不同不保证内容独立。"}
      </p>
    </section>
  );
}

/** 4.2.5：只计算明确假设下的成本，不凭参数伪造模型效果分。 */
export function Lae04AdvancedTechniquesAuthorizationGateLab() {
  const [epochs, setEpochs] = useState(2);
  const [requests, setRequests] = useState(400);
  const [expensiveInference, setExpensiveInference] = useState(false);
  const trainingCost = 1000 * 200 * epochs * 0.00002;
  const promptPerRequest = 0.06;
  const tunedPerRequest = expensiveInference ? 0.07 : 0.02;
  const saving = Math.round((promptPerRequest - tunedPerRequest) * 100) / 100;
  const crossover = saving > 0 ? trainingCost / saving : null;
  const promptCost = requests * promptPerRequest;
  const tunedCost = trainingCost + requests * tunedPerRequest;
  const maxCost = 80;
  const x = (n: number) => 52 + (n / 600) * 280;
  const y = (cost: number) => 294 - (cost / maxCost) * 238;
  const reset = () => {
    setEpochs(2);
    setRequests(400);
    setExpensiveInference(false);
  };

  return (
    <section
      className={ROOT}
      data-visual-kind="lae04-finetuning-cost-crossover"
      aria-label="提示与微调的累计成本实验"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold">03 / 多久才能摊回训练投入？</h3>
        <button type="button" className={BUTTON} onClick={reset}>
          重置成本
        </button>
      </div>
      <p className={NOTE}>
        全部使用虚构费用单位，不是OpenAI报价。固定1000条 × 200
        token；训练每token为0.00002单位，提示每请求0.06单位，微调推理每请求
        {tunedPerRequest.toFixed(2)}单位（均假设已含输入与输出）。
      </p>
      <svg
        viewBox="0 0 360 380"
        className="mx-auto mt-3 block w-full max-w-[480px]"
        role="img"
        aria-label={`${requests}次请求：提示成本${promptCost.toFixed(2)}，微调总成本${tunedCost.toFixed(2)}。${crossover === null ? "微调每请求更贵，无成本交点。" : `成本交点为${Math.ceil(crossover)}次请求。`}实线为提示，虚线为微调，圆点为当前请求量。`}
      >
        <text x="16" y="24" fill={C.text} fontSize="16">
          累计费用（虚构单位）
        </text>
        {[0, 20, 40, 60, 80].map((cost) => (
          <g key={cost}>
            <line
              x1="52"
              x2="332"
              y1={y(cost)}
              y2={y(cost)}
              stroke={C.border}
            />
            <text
              x="44"
              y={y(cost) + 5}
              textAnchor="end"
              fill={C.muted}
              fontSize="14"
            >
              {cost}
            </text>
          </g>
        ))}
        <path d="M 52 56 V 294 H 332" fill="none" stroke={C.text} />
        <path
          d={`M ${x(0)} ${y(0)} L ${x(600)} ${y(600 * promptPerRequest)}`}
          fill="none"
          stroke={C.muted}
          strokeWidth="3"
        />
        <path
          d={`M ${x(0)} ${y(trainingCost)} L ${x(600)} ${y(trainingCost + 600 * tunedPerRequest)}`}
          fill="none"
          stroke={expensiveInference ? C.danger : C.accent}
          strokeWidth="3"
          strokeDasharray="8 5"
        />
        {crossover !== null && (
          <g>
            <line
              x1={x(crossover)}
              x2={x(crossover)}
              y1={y(crossover * promptPerRequest)}
              y2="294"
              stroke={C.accent}
              strokeDasharray="3 4"
            />
            <circle
              cx={x(crossover)}
              cy={y(crossover * promptPerRequest)}
              r="7"
              fill={C.bg}
              stroke={C.accent}
              strokeWidth="2"
            />
          </g>
        )}
        <line
          x1={x(requests)}
          x2={x(requests)}
          y1="56"
          y2="294"
          stroke={C.border}
          strokeWidth="2"
        />
        <circle cx={x(requests)} cy={y(promptCost)} r="5" fill={C.muted} />
        <circle
          cx={x(requests)}
          cy={y(tunedCost)}
          r="5"
          fill={expensiveInference ? C.danger : C.accent}
        />
        {[0, 200, 400, 600].map((n) => (
          <text
            key={n}
            x={x(n)}
            y="318"
            textAnchor="middle"
            fill={C.muted}
            fontSize="14"
          >
            {n}
          </text>
        ))}
        <text x="332" y="344" textAnchor="end" fill={C.muted} fontSize="16">
          请求次数
        </text>
        <text x="16" y="372" fill={C.text} fontSize="16">
          实线：提示　虚线：训练 + 微调推理
        </text>
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          训练轮数：{epochs}
          <input
            className="block w-full accent-accent"
            type="range"
            min="1"
            max="5"
            value={epochs}
            onChange={(e) => setEpochs(Number(e.target.value))}
            aria-label="训练轮数"
          />
        </label>
        <label className="text-sm">
          累计请求量：{requests}
          <input
            className="block w-full accent-accent"
            type="range"
            min="0"
            max="600"
            step="10"
            value={requests}
            onChange={(e) => setRequests(Number(e.target.value))}
            aria-label="累计请求量"
          />
        </label>
      </div>
      <button
        type="button"
        className={`${BUTTON} mt-3 w-full`}
        aria-pressed={expensiveInference}
        onClick={() => setExpensiveInference(!expensiveInference)}
      >
        故障：微调推理涨至0.07单位/次（{expensiveInference ? "开启" : "关闭"}）
      </button>
      <p className={NOTE} role="status">
        训练投入 = {trainingCost.toFixed(2)}；提示总费 = {promptCost.toFixed(2)}
        ；微调总费 = {tunedCost.toFixed(2)}。
        {crossover === null
          ? "没有成本交点：微调固定投入更高，每请求也更贵。"
          : `成本交点 = ${trainingCost.toFixed(2)} ÷ ${saving.toFixed(2)} = ${Math.ceil(crossover)} 次请求。`}
      </p>
      <p className={NOTE}>
        只比较成本不构成微调资格。先在独立测试集证明质量达标，再比较费用、延迟、人工审核和回退成本；增加轮数不保证效果提高。
      </p>
    </section>
  );
}
